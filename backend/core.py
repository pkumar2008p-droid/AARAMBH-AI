"""Core: Supabase client, encryption, validation, sessions, audit. Secrets come ONLY from environment variables."""
import os, re, hmac, hashlib, secrets, json, logging
from datetime import datetime, timedelta, timezone, date
from zoneinfo import ZoneInfo
from cryptography.fernet import Fernet, InvalidToken
from supabase import create_client

log = logging.getLogger("aarambh")
IST = ZoneInfo("Asia/Kolkata")
DEV = os.getenv("APP_ENV", "production") == "development"


def need(k):
    v = os.getenv(k)
    if not v:
        raise RuntimeError(f"Missing environment variable: {k}")
    return v


sb = create_client(need("SUPABASE_URL"), need("SUPABASE_SERVICE_KEY"))
_fernet = Fernet(need("DATA_KEY").encode())
_PEPPER = need("PEPPER").encode()

# ---------- time ----------
def now_utc(): return datetime.now(timezone.utc)
def today(): return datetime.now(IST).date()
def iso(d): return d.isoformat()
def ts(s): return datetime.fromisoformat(s.replace("Z", "+00:00"))

# ---------- crypto ----------
def enc(obj): return _fernet.encrypt(json.dumps(obj, separators=(",", ":")).encode()).decode()

def dec(tok):
    try:
        return json.loads(_fernet.decrypt(tok.encode()))
    except (InvalidToken, AttributeError, ValueError):
        return {}

def hmac_hex(s): return hmac.new(_PEPPER, s.encode(), hashlib.sha256).hexdigest()
def sha(s): return hashlib.sha256(s.encode()).hexdigest()

# ---------- validation ----------
_CTRL = re.compile(r"[\x00-\x08\x0b-\x1f\x7f<>]")
def clean(x, n=200):
    return "" if x is None else _CTRL.sub("", str(x)).strip()[:n]

_PH = re.compile(r"^[6-9]\d{9}$")
def phone_ok(x):
    x = clean(x, 10)
    return x if _PH.match(x) else None

_TM = re.compile(r"^([01]\d|2[0-3]):[0-5]\d$")
def time_ok(x):
    x = clean(x, 5)
    return x if _TM.match(x) else None

def date_ok(x):
    try:
        return date.fromisoformat(clean(x, 10))
    except ValueError:
        return None

# ---------- db helpers ----------
def paged(make):
    """PostgREST returns max 1000 rows per call; loop until all rows are read."""
    out, i = [], 0
    while True:
        rows = make().range(i, i + 999).execute().data
        out += rows
        if len(rows) < 1000:
            return out
        i += 1000

def by_ids(table, col, ids):
    ids, out = list(ids), []
    for i in range(0, len(ids), 80):
        chunk = ids[i:i + 80]
        out += paged(lambda c=chunk: sb.table(table).select("*").in_(col, c))
    return out

def one(table, id_):
    r = sb.table(table).select("*").eq("id", id_).limit(1).execute().data
    return r[0] if r else None

# ---------- sessions (server-side, opaque token, only its hash is stored) ----------
COOKIE = "aarambh_sid" if DEV else "__Host-aarambh"
IDLE = timedelta(minutes=30)
ABSOLUTE = {"patient": timedelta(hours=2), "staff": timedelta(hours=8)}

def create_session(kind, subject, ip):
    token = secrets.token_urlsafe(48)
    n = now_utc()
    sb.table("sessions").delete().lt("expires_at", iso(n)).execute()   # housekeeping
    sb.table("sessions").insert({
        "token_hash": sha(token), "kind": kind, "subject": subject, "ip_hash": hmac_hex(ip or ""),
        "created_at": iso(n), "last_seen": iso(n), "expires_at": iso(n + ABSOLUTE[kind])}).execute()
    return token

def get_session(token):
    if not token or len(token) > 120:
        return None
    r = sb.table("sessions").select("*").eq("token_hash", sha(token)).limit(1).execute().data
    if not r:
        return None
    s, n = r[0], now_utc()
    if n > ts(s["expires_at"]) or n - ts(s["last_seen"]) > IDLE:
        sb.table("sessions").delete().eq("id", s["id"]).execute()
        return None
    if n - ts(s["last_seen"]) > timedelta(seconds=60):
        sb.table("sessions").update({"last_seen": iso(n)}).eq("id", s["id"]).execute()
    return s

def drop_session(token):
    if token:
        sb.table("sessions").delete().eq("token_hash", sha(token)).execute()

# ---------- audit trail ----------
def audit(actor, role, action, entity="", entity_id="", ip=""):
    try:
        sb.table("audit_logs").insert({"actor": actor, "role": role, "action": action,
                                       "entity": entity, "entity_id": str(entity_id), "ip": ip}).execute()
    except Exception:
        log.exception("audit failed")
