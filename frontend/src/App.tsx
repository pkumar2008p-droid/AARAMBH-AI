
import { useEffect, useState, type FormEvent } from 'react';
import './index.css';

type Portal = 'patient' | 'staff' | 'register' | null;

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=85',
    title: 'Care that continues beyond the hospital.',
    text: 'Keep follow-up plans, appointments and helpful next steps connected.',
  },
  {
    image: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=1400&q=85',
    title: 'A little support can make the next step easier.',
    text: 'Help patients understand their plan and find the right support.',
  },
  {
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1400&q=85',
    title: 'People first. Coordination made clearer.',
    text: 'Give care teams a shared view of follow-ups and unresolved tasks.',
  },
  {
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1400&q=85',
    title: 'Make every follow-up easier to navigate.',
    text: 'Bring care instructions, communication and coordination into one place.',
  },
  {
    image: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&w=1400&q=85',
    title: 'Support that meets people where they are.',
    text: 'Help coordinate appointments, accessibility needs and practical barriers.',
  },
];

const demoCases = [
  {
    id: 'AR-2048',
    name: 'Ananya Sharma',
    age: 42,
    condition: 'Post-operative follow-up',
    hospital: 'City Care Hospital',
    due: 'Today, 11:30 AM',
    status: 'Needs contact',
    risk: 'High',
  },
  {
    id: 'AR-2047',
    name: 'Rohan Mehta',
    age: 58,
    condition: 'Cardiac discharge',
    hospital: 'Northside Medical',
    due: 'Today, 1:00 PM',
    status: 'In progress',
    risk: 'Medium',
  },
  {
    id: 'AR-2046',
    name: 'Fatima Khan',
    age: 31,
    condition: 'Maternity follow-up',
    hospital: 'City Care Hospital',
    due: 'Tomorrow, 9:00 AM',
    status: 'Scheduled',
    risk: 'Low',
  },
];

function Brand() {
  return (
    <a href="#home" className="brand">
      <span className="brand-mark" aria-hidden="true">✚</span>
      <span>
        <b>AARAMBH</b>
        <small>FOLLOW-UP NAVIGATOR</small>
      </span>
    </a>
  );
}

function App() {
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [portal, setPortal] = useState<Portal>(null);
  const [lang, setLang] = useState('English');
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [notice, setNotice] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [mobile, setMobile] = useState('');
  const [staffId, setStaffId] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const timer = window.setInterval(() => {
      setSlide((current) => (current + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [paused]);

  function openPortal(value: Portal) {
    setPortal(value);
    setNotice('');
    setOtpSent(false);
  }

  function submitOtp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!/^\+?[0-9\s-]{10,15}$/.test(mobile)) {
      setNotice('Please enter a valid mobile number.');
      return;
    }

    setOtpSent(true);
    setNotice('Demo mode: OTP delivery is not connected. No SMS has been sent.');
  }

  function verifyOtp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice('OTP verification is not connected yet. Patient access remains locked.');
  }

  function submitStaff(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice('Staff credentials cannot be verified until the secure backend is connected.');
  }

  if (loggedIn) {
    return (
      <div className="demo-dashboard">
        <header className="dash-top">
          <Brand />
          <span className="demo-tag">SYNTHETIC DEMO</span>
          <button
            className="btn btn-light"
            onClick={() => setLoggedIn(false)}
          >
            Sign out
          </button>
        </header>

        <main className="dash-content">
          <div className="eyebrow">CARE COORDINATION WORKSPACE</div>
          <h1>Care team dashboard</h1>
          <p className="subhead">
            A clearer view of follow-ups and the next steps that matter.
          </p>

          <div className="stats">
            <article><small>Active cases</small><b>128</b><span>Demo data</span></article>
            <article><small>Follow-ups due today</small><b>24</b><span>Illustrative metric</span></article>
            <article><small>Records to validate</small><b>09</b><span>Review required</span></article>
            <article><small>Follow-up completion</small><b>86%</b><span>Demo metric</span></article>
          </div>

          <section className="case-card">
            <div className="case-head">
              <div>
                <h2>Follow-up case registry</h2>
                <p>Fictional patient records for demonstration only.</p>
              </div>
              <input
                placeholder="Search cases..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>

            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Patient / Case ID</th>
                    <th>Follow-up</th>
                    <th>Due</th>
                    <th>Status</th>
                    <th>Priority</th>
                  </tr>
                </thead>
                <tbody>
                  {demoCases
                    .filter((item) =>
                      `${item.name} ${item.id} ${item.condition}`
                        .toLowerCase()
                        .includes(query.toLowerCase())
                    )
                    .map((item) => (
                      <tr key={item.id}>
                        <td><b>{item.name}</b><small>{item.id}</small></td>
                        <td>{item.condition}</td>
                        <td>{item.due}</td>
                        <td><span className="status">{item.status}</span></td>
                        <td><span className={`risk ${item.risk.toLowerCase()}`}>{item.risk}</span></td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </section>

          <p className="safety-note">
            Demo workspace · Synthetic data only · Risk flags are coordination
            signals, not medical diagnoses.
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="site" id="home">
      <div className="announcement">
        <span className="announcement-dot" />
        Connected, compassionate healthcare follow-up
        <span className="announcement-pill">HACKATHON DEMO 2026</span>
      </div>

      <header className="site-header">
        <Brand />

        <nav className="desktop-nav">
          <a href="#how">How it works</a>
          <a href="#portals">Portals</a>
          <a href="#support">Help &amp; support</a>
        </nav>

        <div className="header-actions">
          <label className="lang">
            <span className="sr-only">Language</span>
            <select value={lang} onChange={(event) => setLang(event.target.value)}>
              <option>English</option>
              <option>हिंदी</option>
            </select>
          </label>

          <button className="btn btn-outline" onClick={() => openPortal('staff')}>
            Hospital login ↗
          </button>
          <button className="btn btn-primary" onClick={() => openPortal('patient')}>
            Patient portal →
          </button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow">A MORE HUMAN FOLLOW-UP JOURNEY</div>
            <h1>Care that fits <em>real life.</em></h1>
            <p className="hero-description">
              AARAMBH helps patients and hospitals bridge the follow-up gap
              with clearer instructions, personalized support and transparent
              coordination.
            </p>

            <div className="hero-actions">
              <button className="btn btn-primary btn-large" onClick={() => openPortal('patient')}>
                Open patient portal →
              </button>
              <button className="btn btn-outline btn-large" onClick={() => openPortal('staff')}>
                Hospital administration ↗
              </button>
            </div>

            <div className="trust-line">✓ Designed around privacy, clarity and human care</div>

            <div className="hero-points">
              <div><span>01</span>Track follow-ups</div>
              <div><span>02</span>Understand next steps</div>
              <div><span>03</span>Coordinate support</div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="photo-frame">
              <img
                src={slides[slide].image}
                alt="Healthcare consultation"
                key={slides[slide].image}
              />
              <div className="photo-wash" />
              <div className="photo-label">✳ CARE, CONNECTED</div>

              <div className="photo-caption">
                <span className="caption-number">0{slide + 1} / 05</span>
                <h2>{slides[slide].title}</h2>
                <p>{slides[slide].text}</p>
              </div>

              <div className="slide-controls">
                <button aria-label="Previous slide" onClick={() => setSlide((s) => (s + slides.length - 1) % slides.length)}>←</button>
                <button aria-label={paused ? 'Resume slideshow' : 'Pause slideshow'} onClick={() => setPaused((p) => !p)}>{paused ? '▶' : 'Ⅱ'}</button>
                <button aria-label="Next slide" onClick={() => setSlide((s) => (s + 1) % slides.length)}>→</button>
              </div>
            </div>
            <div className="floating-note">
              <b>One connected journey</b>
              <small>People, plans and next steps</small>
            </div>
          </div>
        </section>

        <section className="photo-strip">
          <div className="strip-intro">
            <span>CARE IN EVERY STEP</span>
            <b>Support that moves with you.</b>
          </div>
          <div className="strip-track">
            {slides.map((item, index) => (
              <button
                className={`strip-item ${slide === index ? 'selected' : ''}`}
                key={item.title}
                onClick={() => setSlide(index)}
              >
                <img src={item.image} alt="" />
                <span>0{index + 1}</span>
                <b>{['Doctor consultation', 'Follow-up visit', 'Care team coordination', 'Care plan review', 'Practical support'][index]}</b>
              </button>
            ))}
          </div>
        </section>

        <section className="section portals" id="portals">
          <div className="section-heading">
            <div>
              <div className="eyebrow">YOUR JOURNEY, YOUR WAY</div>
              <h2>One platform. Two connected experiences.</h2>
            </div>
            <p>Start in the space designed for your role.</p>
          </div>

          <div className="portal-grid">
            <article className="portal-card patient-card">
              <span className="portal-kicker">FOR PATIENTS &amp; FAMILIES</span>
              <h3>Your care, made easier to follow.</h3>
              <p>Appointments, follow-up instructions and support in one place.</p>
              <ul>
                <li>Upcoming follow-ups and reminders</li>
                <li>Understand your next steps</li>
                <li>Ask for coordination help</li>
              </ul>
              <button className="btn btn-primary" onClick={() => openPortal('patient')}>
                Continue as patient →
              </button>
              <small>Mobile number and OTP sign-in</small>
              <button className="text-button" onClick={() => openPortal('register')}>
                New patient? Register here
              </button>
            </article>

            <article className="portal-card hospital-card">
              <span className="portal-kicker">FOR AUTHORIZED HOSPITAL STAFF</span>
              <h3>Keep every follow-up in view.</h3>
              <p>Manage cases, validate records and coordinate support.</p>
              <ul>
                <li>Follow-up case registry</li>
                <li>Record validation and task tracking</li>
                <li>Role-based staff workspace</li>
              </ul>
              <button className="btn btn-dark" onClick={() => openPortal('staff')}>
                Access hospital portal ↗
              </button>
              <small>Staff ID and password</small>
            </article>
          </div>
        </section>

        <section className="section how" id="how">
          <div className="eyebrow">SIMPLE BY DESIGN</div>
          <h2>From a care plan to the next right step.</h2>
          <div className="steps">
            {[
              ['01', 'Record', 'Capture the clinician-provided follow-up plan.'],
              ['02', 'Validate', 'Identify missing or conflicting information.'],
              ['03', 'Flag', 'Highlight possible coordination delays for review.'],
              ['04', 'Coordinate', 'Help staff arrange practical support.'],
              ['05', 'Close the loop', 'Record verified follow-up outcomes.'],
            ].map(([number, title, description]) => (
              <article className="step" key={number}>
                <span>{number}</span>
                <div><h3>{title}</h3><p>{description}</p></div>
              </article>
            ))}
          </div>
          <p className="human-note">
            Technology supports care teams. It does not replace clinical judgment.
          </p>
        </section>

        <section className="support-band" id="support">
          <div>
            <div className="eyebrow">HERE FOR EVERY STEP</div>
            <h2>Not sure where to begin?</h2>
            <p>Choose your portal to find the right next step.</p>
          </div>
          <div className="support-actions">
            <button className="btn btn-white" onClick={() => openPortal('patient')}>I’m a patient →</button>
            <button className="btn btn-outline-white" onClick={() => openPortal('staff')}>I’m hospital staff ↗</button>
          </div>
        </section>
      </main>

      <footer className="footer">
        <Brand />
        <p>© 2026 AARAMBH · AI Synergy Hackathon</p>
        <small>Demonstration only · Synthetic data · No live hospital integrations configured</small>
      </footer>

      {portal && (
        <div className="modal-backdrop" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setPortal(null);
        }}>
          <section className="auth-modal" role="dialog" aria-modal="true" aria-labelledby="auth-title">
            <button className="modal-close" onClick={() => setPortal(null)} aria-label="Close">×</button>
            <Brand />

            <div className="auth-eyebrow">
              {portal === 'staff' ? 'AUTHORIZED STAFF ACCESS' : portal === 'register' ? 'PATIENT REGISTRATION' : 'PATIENT SECURE ACCESS'}
            </div>

            <h2 id="auth-title">
              {portal === 'staff' ? 'Welcome back, care team.' : portal === 'register' ? 'Let’s get you started.' : 'Your care journey, in reach.'}
            </h2>

            <p className="auth-intro">
              {portal === 'staff'
                ? 'Sign in using your unique staff ID.'
                : portal === 'register'
                  ? 'Create a patient profile after mobile verification.'
                  : 'Enter your mobile number to request a one-time password.'}
            </p>

            {portal === 'staff' ? (
              <form onSubmit={submitStaff}>
                <label className="field">
                  Staff ID
                  <input value={staffId} onChange={(event) => setStaffId(event.target.value)} placeholder="Enter your staff ID" required autoComplete="username" />
                </label>
                <label className="field">
                  Password
                  <div className="password-wrap">
                    <input type={showPassword ? 'text' : 'password'} placeholder="Enter password" required autoComplete="current-password" />
                    <button type="button" onClick={() => setShowPassword((value) => !value)}>{showPassword ? 'Hide' : 'Show'}</button>
                  </div>
                </label>
                <button type="button" className="text-button" onClick={() => setNotice('Account recovery will be available after secure authentication is configured.')}>
                  Forgot password?
                </button>
                <button className="btn btn-dark auth-submit" type="submit">Sign in securely →</button>
                <p className="auth-hint">Staff accounts must be created and authorized by the hospital administrator.</p>
              </form>
            ) : portal === 'register' ? (
              <form onSubmit={submitOtp}>
                <label className="field">
                  Full name
                  <input placeholder="Enter your full name" required />
                </label>
                <label className="field">
                  Mobile number
                  <input value={mobile} onChange={(event) => setMobile(event.target.value)} placeholder="+91 98765 43210" required inputMode="tel" autoComplete="tel" />
                </label>
                <label className="field">
                  Preferred language
                  <select value={lang} onChange={(event) => setLang(event.target.value)}>
                    <option>English</option>
                    <option>हिंदी</option>
                  </select>
                </label>
                <label className="consent">
                  <input type="checkbox" required />
                  I agree to the privacy notice for follow-up coordination.
                </label>
                <button className="btn btn-primary auth-submit" type="submit">Verify mobile number →</button>
                <button type="button" className="text-button centered" onClick={() => openPortal('patient')}>
                  Already registered? Sign in
                </button>
              </form>
            ) : (
              <form onSubmit={otpSent ? verifyOtp : submitOtp}>
                <label className="field">
                  Mobile number
                  <input value={mobile} onChange={(event) => setMobile(event.target.value)} placeholder="+91 98765 43210" required inputMode="tel" autoComplete="tel" />
                </label>
                {otpSent && (
                  <label className="field">
                    One-time password (OTP)
                    <input placeholder="Enter OTP" inputMode="numeric" autoComplete="one-time-code" minLength={4} maxLength={8} required />
                  </label>
                )}
                <button className="btn btn-primary auth-submit" type="submit">
                  {otpSent ? 'Verify OTP' : 'Send OTP'} →
                </button>
                <button type="button" className="text-button centered" onClick={() => openPortal('register')}>
                  New patient? Register here
                </button>
              </form>
            )}

            {notice && <div className="auth-notice" role="status">{notice}</div>}

            <div className="demo-disclosure">
              <b>Demo mode:</b> Real SMS/OTP verification and staff authentication are not connected. No real patient access is enabled.
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
