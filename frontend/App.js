/* ================= CONFIG ================= */
const H={name:'District Civil Hospital (Demo)',city:'Ludhiana, Punjab',lat:30.9097,lng:75.8527};
const LS='aarambh_demo_v2',LANG_KEY='aarambh_lang',SES_KEY='aarambh_session',OTP_DEMO='123456';
const $=s=>document.querySelector(s);
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const store={get(k,d){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}},del(k){try{localStorage.removeItem(k)}catch(e){}}};

/* ================= i18n (patient portal) ================= */
const T={
en:{nav_home:'Home',nav_problem:'The Problem',nav_how:'How It Works',nav_roles:'AI & Humans',nav_roadmap:'Roadmap & Impact',patient_portal:'Patient Portal',hospital_admin:'Hospital Administration',hero_1:'Follow-up care that fits',hero_2:'real life',hero_desc:'AARAMBH finds out why a patient may miss a follow-up and helps the hospital team remove that barrier — before the visit is lost.',login_title:'Patient login',mobile:'Registered mobile number',send_otp:'Send OTP',otp:'Enter OTP',verify:'Verify & login',logout:'Logout',hello:'Hello',your_followups:'Your follow-ups',due_today:'Due today',overdue_by:'Overdue by {n} day(s)',due_in:'Due in {n} day(s)',completed:'Completed',distance:'Distance from hospital',plan_travel:'Plan my travel',view:'View details',confirm:'I will come',reschedule:'Ask to reschedule',barrier:'Report a problem',assist:'Ask for help at hospital',emergency:'In an emergency call 112 (or 108 for an ambulance). This portal does not give medical advice.',next_followup:'Next follow-up',doctor:'Doctor',date:'Date',time:'Time',dept:'Department',instructions:'Instructions from your doctor',docs:'Bring these with you',history:'Completed visits',staff_id:'Staff ID',password:'Password',login:'Login',back:'Back',profile:'My contact details',overdue_alert:'You have an overdue follow-up. Please confirm your visit or ask for help.',msgs:'Messages from the hospital'},
hi:{nav_home:'होम',nav_problem:'समस्या',nav_how:'कैसे काम करता है',nav_roles:'AI और इंसान',nav_roadmap:'रोडमैप और प्रभाव',patient_portal:'रोगी पोर्टल',hospital_admin:'अस्पताल प्रशासन',hero_1:'फॉलो-अप देखभाल जो',hero_2:'आपकी असल ज़िंदगी में फिट हो',hero_desc:'AARAMBH पता लगाता है कि मरीज़ फॉलो-अप क्यों चूक सकता है और अस्पताल की टीम को वह बाधा हटाने में मदद करता है — विज़िट छूटने से पहले।',login_title:'रोगी लॉगिन',mobile:'पंजीकृत मोबाइल नंबर',send_otp:'OTP भेजें',otp:'OTP दर्ज करें',verify:'सत्यापित करें और लॉगिन करें',logout:'लॉगआउट',hello:'नमस्ते',your_followups:'आपके फॉलो-अप',due_today:'आज देय',overdue_by:'{n} दिन से बकाया',due_in:'{n} दिन में देय',completed:'पूर्ण',distance:'अस्पताल से दूरी',plan_travel:'यात्रा की योजना',view:'विवरण देखें',confirm:'मैं आऊँगा/आऊँगी',reschedule:'तारीख बदलने का अनुरोध',barrier:'समस्या बताएँ',assist:'अस्पताल में मदद माँगें',emergency:'आपातकाल में 112 (एम्बुलेंस के लिए 108) पर कॉल करें। यह पोर्टल चिकित्सा सलाह नहीं देता।',next_followup:'अगला फॉलो-अप',doctor:'डॉक्टर',date:'तारीख',time:'समय',dept:'विभाग',instructions:'डॉक्टर के निर्देश',docs:'साथ लाएँ',history:'पूरी हुई विज़िट',staff_id:'स्टाफ आईडी',password:'पासवर्ड',login:'लॉगिन',back:'वापस',profile:'मेरे संपर्क विवरण',overdue_alert:'आपका एक फॉलो-अप बकाया है। कृपया विज़िट की पुष्टि करें या मदद माँगें।',msgs:'अस्पताल के संदेश'},
pa:{nav_home:'ਹੋਮ',nav_problem:'ਸਮੱਸਿਆ',nav_how:'ਇਹ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ',nav_roles:'AI ਅਤੇ ਇਨਸਾਨ',nav_roadmap:'ਰੋਡਮੈਪ ਅਤੇ ਪ੍ਰਭਾਵ',patient_portal:'ਮਰੀਜ਼ ਪੋਰਟਲ',hospital_admin:'ਹਸਪਤਾਲ ਪ੍ਰਸ਼ਾਸਨ',hero_1:'ਫਾਲੋ-ਅੱਪ ਦੇਖਭਾਲ ਜੋ',hero_2:'ਤੁਹਾਡੀ ਅਸਲ ਜ਼ਿੰਦਗੀ ਵਿੱਚ ਫਿੱਟ ਹੋਵੇ',hero_desc:'AARAMBH ਇਹ ਪਤਾ ਲਗਾਉਂਦਾ ਹੈ ਕਿ ਮਰੀਜ਼ ਫਾਲੋ-ਅੱਪ ਕਿਉਂ ਖੁੰਝ ਸਕਦਾ ਹੈ ਅਤੇ ਹਸਪਤਾਲ ਟੀਮ ਨੂੰ ਇਹ ਰੁਕਾਵਟ ਦੂਰ ਕਰਨ ਵਿੱਚ ਮਦਦ ਕਰਦਾ ਹੈ — ਵਿਜ਼ਿਟ ਖੁੰਝਣ ਤੋਂ ਪਹਿਲਾਂ।',login_title:'ਮਰੀਜ਼ ਲੌਗਇਨ',mobile:'ਰਜਿਸਟਰਡ ਮੋਬਾਈਲ ਨੰਬਰ',send_otp:'OTP ਭੇਜੋ',otp:'OTP ਦਰਜ ਕਰੋ',verify:'ਪੁਸ਼ਟੀ ਕਰੋ ਅਤੇ ਲੌਗਇਨ ਕਰੋ',logout:'ਲੌਗਆਊਟ',hello:'ਸਤ ਸ੍ਰੀ ਅਕਾਲ',your_followups:'ਤੁਹਾਡੇ ਫਾਲੋ-ਅੱਪ',due_today:'ਅੱਜ ਦੇਣ ਯੋਗ',overdue_by:'{n} ਦਿਨ ਤੋਂ ਬਕਾਇਆ',due_in:'{n} ਦਿਨਾਂ ਵਿੱਚ',completed:'ਮੁਕੰਮਲ',distance:'ਹਸਪਤਾਲ ਤੋਂ ਦੂਰੀ',plan_travel:'ਸਫ਼ਰ ਦੀ ਯੋਜਨਾ',view:'ਵੇਰਵੇ ਵੇਖੋ',confirm:'ਮੈਂ ਆਵਾਂਗਾ/ਆਵਾਂਗੀ',reschedule:'ਤਾਰੀਖ਼ ਬਦਲਣ ਦੀ ਬੇਨਤੀ',barrier:'ਸਮੱਸਿਆ ਦੱਸੋ',assist:'ਹਸਪਤਾਲ ਵਿੱਚ ਮਦਦ ਮੰਗੋ',emergency:'ਐਮਰਜੈਂਸੀ ਵਿੱਚ 112 (ਐਂਬੂਲੈਂਸ ਲਈ 108) ਤੇ ਕਾਲ ਕਰੋ। ਇਹ ਪੋਰਟਲ ਮੈਡੀਕਲ ਸਲਾਹ ਨਹੀਂ ਦਿੰਦਾ।',next_followup:'ਅਗਲਾ ਫਾਲੋ-ਅੱਪ',doctor:'ਡਾਕਟਰ',date:'ਤਾਰੀਖ਼',time:'ਸਮਾਂ',dept:'ਵਿਭਾਗ',instructions:'ਡਾਕਟਰ ਦੀਆਂ ਹਦਾਇਤਾਂ',docs:'ਨਾਲ ਲਿਆਓ',history:'ਮੁਕੰਮਲ ਵਿਜ਼ਿਟਾਂ',staff_id:'ਸਟਾਫ਼ ਆਈਡੀ',password:'ਪਾਸਵਰਡ',login:'ਲੌਗਇਨ',back:'ਵਾਪਸ',profile:'ਮੇਰੇ ਸੰਪਰਕ ਵੇਰਵੇ',overdue_alert:'ਤੁਹਾਡਾ ਇੱਕ ਫਾਲੋ-ਅੱਪ ਬਕਾਇਆ ਹੈ। ਕਿਰਪਾ ਕਰਕੇ ਵਿਜ਼ਿਟ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ ਜਾਂ ਮਦਦ ਮੰਗੋ।',msgs:'ਹਸਪਤਾਲ ਦੇ ਸੁਨੇਹੇ'}
};
let LANG=store.get(LANG_KEY,'en');
const t=k=>(T[LANG]&&T[LANG][k])||T.en[k]||k;
const LNAME={en:'English',hi:'Hindi',pa:'Punjabi'};

/* ================= date helpers ================= */
const DAY=86400000;
const sod=d=>{const x=new Date(d);x.setHours(0,0,0,0);return x};
const isoOf=d=>{const x=sod(d);return x.getFullYear()+'-'+String(x.getMonth()+1).padStart(2,'0')+'-'+String(x.getDate()).padStart(2,'0')};
const plusDays=n=>{const d=sod(new Date());d.setDate(d.getDate()+n);return isoOf(d)};
const parseISO=s=>{const [y,m,d]=s.split('-').map(Number);return new Date(y,m-1,d)};
const addDaysISO=(s,n)=>{const d=parseISO(s);d.setDate(d.getDate()+n);return isoOf(d)};
const diffDays=s=>Math.round((parseISO(s)-sod(new Date()))/DAY);
const fmtDate=s=>parseISO(s).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'});
const shortD=s=>parseISO(s).toLocaleDateString('en-IN',{day:'numeric',month:'short'});
function fmtTime(s){const [h,m]=s.split(':').map(Number);return ((h%12)||12)+':'+String(m).padStart(2,'0')+' '+(h<12?'AM':'PM')}
function fmtMin(x){x=Math.max(0,Math.round(x));return fmtTime(Math.floor(x/60)%24+':'+(x%60))}
const inMin=m=>Date.now()+m*60000;
const fmtDT=ts=>new Date(ts).toLocaleString('en-IN',{day:'numeric',month:'short',hour:'numeric',minute:'2-digit',hour12:true});
const fmtHM=ts=>new Date(ts).toLocaleTimeString('en-IN',{hour:'numeric',minute:'2-digit',hour12:true});
const monthLabels=n=>{const o=[],d=new Date();for(let i=n-1;i>=0;i--)o.push(new Date(d.getFullYear(),d.getMonth()-i,1).toLocaleDateString('en-IN',{month:'short'}));return o};

/* ================= static data ================= */
const ROLES={
 doctor:{label:'Doctor',icon:'🩺',group:'Doctor',desc:'Patient record, diagnosis, prescriptions, admissions and AI decision support'},
 coordinator:{label:'Follow-up Coordinator',icon:'📞',group:'Staff',desc:'Calls, SMS / WhatsApp, follow-up analytics and approvals (no diagnosis access)'},
 nurse:{label:'Nurse',icon:'👩‍⚕️',group:'Staff',desc:'Admitted patients: scheduled checks, medicines given, actions taken'},
 pharmacist:{label:'Pharmacist (Medicine Counter)',icon:'💊',group:'Staff',desc:'Prescriptions, dispensing history and safety checks'},
 ward:{label:'Ward Boy / Patient Assistant',icon:'🧑‍🔧',group:'Staff',desc:'Escort and wheelchair tasks only'},
 admin:{label:'Administrator',icon:'🏥',group:'Administration',desc:'Hospital-wide overview, audit log and AI feedback'}
};
const STAFF=[
 {id:'DOC101',pw:'doc@123',role:'doctor',name:'Dr. Harpreet Singh',dept:'Medicine OPD'},
 {id:'DOC103',pw:'doc@123',role:'doctor',name:'Dr. Rajiv Mehta',dept:'Surgery OPD'},
 {id:'DOC104',pw:'doc@123',role:'doctor',name:'Dr. Anil Verma',dept:'Cardiology OPD'},
 {id:'CRD401',pw:'coord@123',role:'coordinator',name:'Coordinator Manpreet',dept:'Follow-up Desk'},
 {id:'NUR201',pw:'nurse@123',role:'nurse',name:'Nurse Simran Kaur',dept:'Medicine / Surgery Ward'},
 {id:'PH501',pw:'pharma@123',role:'pharmacist',name:'Pharmacist Rohit',dept:'Hospital Pharmacy'},
 {id:'WB301',pw:'ward@123',role:'ward',name:'Ward Boy Sukhdev',dept:'Patient Assistance'},
 {id:'ADM001',pw:'admin@123',role:'admin',name:'Hospital Administrator',dept:'Administration'}
];
const BARRIERS=['Shared phone','Long distance','Unclear instructions','Cost of travel','Needs escort / wheelchair','No one to accompany','Language support needed','Long waiting time'];
const FAILED=['No answer','Wrong number','Switched off'];
const CONTACT_RESULTS=['Answered – will come','Answered – needs help','No answer','Wrong number','Switched off','SMS delivered','WhatsApp message sent'];
const SLIDES=[
 {ico:'🩺',title:'Patient visit',text:'The patient consults at the district hospital and a follow-up is advised.',bg:['#168c88','#0e5f7a'],photo:''},
 {ico:'📅',title:'Follow-up due',text:'The clinician’s instruction becomes a dated task with required documents.',bg:['#2b6cb0','#1a4a7a'],photo:''},
 {ico:'⚠️',title:'Barrier identified',text:'Shared phone, distance or unclear instructions are flagged early.',bg:['#d9822b','#a4561a'],photo:''},
 {ico:'🎧',title:'Support offered',text:'Staff review and offer practical help: callback, escort, travel options.',bg:['#6b46c1','#43307f'],photo:''},
 {ico:'📲',title:'Reminder / coordination',text:'A staff-approved reminder reaches the patient in their own language.',bg:['#0f8f6f','#0a5c4a'],photo:''},
 {ico:'✅',title:'Care completed',text:'The visit is verified and the follow-up loop is closed.',bg:['#2f855a','#1c5a3a'],photo:''}
];

/* who must approve each kind of AI suggestion (change here to adjust the rules) */
const REQ={expedite:['doctor','coordinator'],sms:['coordinator'],wheelchair:['coordinator'],note:['doctor'],order:['doctor']};
const TYPEL={expedite:'Follow-up scheduling',sms:'Patient message',wheelchair:'Assistance task',note:'Clinical decision support',order:'Ward order'};
const ROLEL={doctor:'Doctor',coordinator:'Follow-up Coordinator'};

/* message templates (privacy-safe text is used automatically for shared phones) */
const TPL={
reminder:{en:'Hello {name}, reminder: your {title} is on {date} at {time} ({dept}, {hospital}). Please bring: {docs}. Reply HELP if you need assistance.',hi:'नमस्ते {name}, याद दिलाना: आपका {title} {date} को {time} बजे ({dept}, {hospital}) है। साथ लाएँ: {docs}। मदद चाहिए तो HELP लिखें।',pa:'ਸਤ ਸ੍ਰੀ ਅਕਾਲ {name}, ਯਾਦ ਦਿਵਾਉਣਾ: ਤੁਹਾਡਾ {title} {date} ਨੂੰ {time} ਵਜੇ ({dept}, {hospital}) ਹੈ। ਨਾਲ ਲਿਆਓ: {docs}। ਮਦਦ ਚਾਹੀਦੀ ਹੋਵੇ ਤਾਂ HELP ਲਿਖੋ।'},
missed:{en:'Hello {name}, we could not reach you about your {title} (due {date}). Please call the hospital or reply HELP. We can help with a new date, travel or a wheelchair.',hi:'नमस्ते {name}, आपके {title} ({date}) के बारे में हम आप तक नहीं पहुँच सके। कृपया अस्पताल को कॉल करें या HELP लिखें। हम नई तारीख, यात्रा या व्हीलचेयर में मदद कर सकते हैं।',pa:'ਸਤ ਸ੍ਰੀ ਅਕਾਲ {name}, ਤੁਹਾਡੇ {title} ({date}) ਬਾਰੇ ਅਸੀਂ ਤੁਹਾਡੇ ਨਾਲ ਸੰਪਰਕ ਨਹੀਂ ਕਰ ਸਕੇ। ਕਿਰਪਾ ਕਰਕੇ ਹਸਪਤਾਲ ਨੂੰ કਾਲ ਕਰੋ ਜਾਂ HELP ਲਿਖੋ। ਅਸੀਂ ਨਵੀਂ ਤਾਰੀਖ਼, ਸਫ਼ਰ ਜਾਂ ਵ੍ਹੀਲਚੇਅਰ ਵਿੱਚ ਮਦਦ ਕਰ ਸਕਦੇ ਹਾਂ।'},
instructions:{en:'Hello {name}, for your visit on {date}: {instructions}',hi:'नमस्ते {name}, {date} की आपकी विज़िट के लिए: {instructions}',pa:'ਸਤ ਸ੍ਰੀ ਅਕਾਲ {name}, {date} ਦੀ ਤੁਹਾਡੀ ਵਿਜ਼ਿਟ ਲਈ: {instructions}'},
private:{en:'Hello, this is {hospital}. Please ask {name} to call us or visit on {date} at {time}. Reply HELP for assistance.',hi:'नमस्ते, यह {hospital} है। कृपया {name} से कहें कि {date} को {time} बजे हमें कॉल करें या आएँ। मदद के लिए HELP लिखें।',pa:'ਸਤ ਸ੍ਰੀ ਅਕਾਲ, ਇਹ {hospital} ਹੈ। ਕਿਰਪਾ ਕਰਕੇ {name} ਨੂੰ ਕਹੋ ਕਿ {date} ਨੂੰ {time} ਵਜੇ ਸਾਨੂੰ ਕਾਲ ਕਰਨ ਜਾਂ ਆਉਣ। ਮਦਦ ਲਈ HELP ਲਿਖੋ।'}
};
function fillTpl(key,p,f){
 const k=p.sharedPhone?'private':key,L=(TPL[k][p.lang]||TPL[k].en);
 const m={name:p.name.split(' ')[0],title:f.title,date:fmtDate(f.due),time:fmtTime(f.time),dept:f.dept,hospital:H.name,docs:f.docs.join(', ')||'your ID card',instructions:f.instructions};
 return L.replace(/\{(\w+)\}/g,(x,y)=>m[y]||'');
}

/* ================= database (demo, localStorage) ================= */
function seed(){
 let n=0;const oid=()=>'O'+(++n);
 const P=(id,name,sex,phone,age,area,lat,lng,lang,shared,missed,allergies,cons,vit,dx,ck)=>({id,name,sex,phone,age,area,lat,lng,lang,sharedPhone:shared,missedBefore:missed,altPhone:'',allergies,consistency:cons,
  vitals:vit.map(v=>({date:plusDays(v[0]),sys:v[1],dia:v[2],sugar:v[3],wt:v[4],spo2:v[5],pulse:v[6]})),
  dx:dx.map((x,i)=>({id:id+'d'+i,date:plusDays(x[0]),text:x[1],by:x[2]})),
  checkups:ck.map((x,i)=>({id:id+'c'+i,date:plusDays(x[0]),type:x[1],note:x[2],by:x[3]}))});
 const F=(id,pid,title,dept,doctor,off,time,ins,docs,barriers,contacts,extra)=>Object.assign({id,pid,title,dept,doctor,due:plusDays(off),time,instructions:ins,docs,docsReady:[],barriers,contacts:contacts.map(c=>Object.assign({},c,{date:plusDays(c.d)})),status:'pending',confirmed:false,planApproved:false,reschedReq:null,callback:false,note:''},extra||{});
 const O=(type,title,min,status,extra)=>Object.assign({id:oid(),type,title,dueTs:inMin(min),status,by:'Doctor'},status==='done'?{doneTs:inMin(min+3),doneBy:'Nurse Simran Kaur',note:''}:{},extra||{});
 const W=['W-7','W-6','W-5','W-4','W-3','W-2','W-1','This'],SC=[110,118,121,125,130,128,134,92],DN=[74,80,84,90,96,97,104,58];
 return {nextId:100,
 patients:[
  P('P1','Gurpreet Kaur','F','9000000001',58,'Jagraon',30.7886,75.4725,'pa',true,1,'Penicillin',[100,100,90,80,60,40],
   [[-150,138,88,104,72,97,76],[-120,142,90,108,72,97,78],[-90,146,92,110,71,97,80],[-60,150,94,112,71,96,80],[-30,154,96,115,70,96,82],[-8,162,100,118,70,96,84]],
   [[-150,'Essential hypertension (stage 2)','Dr. Harpreet Singh']],[[-30,'BP check','BP 154/96. Medicines continued, review in 30 days.','Dr. Harpreet Singh']]),
  P('P2','Ramesh Kumar','M','9000000002',64,'Haibowal, Ludhiana',30.9330,75.8210,'hi',false,0,'None known',[100,100,100,90,90,100],
   [[-120,128,82,150,80,97,74],[-90,130,84,162,80,97,74],[-60,130,82,171,81,97,76],[-30,132,84,183,81,97,76],[-7,134,84,196,82,97,78]],
   [[-200,'Type 2 diabetes mellitus','Dr. Harpreet Singh'],[-60,'Early diabetic retinopathy suspected – eye referral','Dr. Harpreet Singh']],[[-60,'Eye referral','Referred to ophthalmology OPD','Dr. Harpreet Singh']]),
  P('P3','Sunita Devi','F','9000000003',41,'Doraha',30.7967,76.0267,'hi',false,0,'Sulfa drugs',[100,100,100,100,100,80],
   [[-12,118,76,96,64,98,72],[-3,120,78,98,63,98,76]],[[-12,'Post-operative wound care (appendectomy)','Dr. Rajiv Mehta']],[[-3,'Wound check','Dressing changed; no discharge','Nurse Simran Kaur']]),
  P('P4','Baljit Singh','M','9000000004',72,'Khanna',30.7058,76.2219,'pa',true,2,'Aspirin intolerance (GI)',[90,90,70,60,50,30],
   [[-150,132,82,98,70,95,70],[-100,136,84,100,69,94,72],[-50,140,86,102,68,94,76],[-10,144,88,104,68,93,80]],
   [[-180,'Ischaemic heart disease – stable angina','Dr. Anil Verma']],[[-50,'ECG','Old inferior T-wave changes; no acute changes','Dr. Anil Verma']]),
  P('P5','Anita Sharma','F','9000000005',29,'Model Town, Ludhiana',30.8890,75.8420,'en',false,0,'None known',[100,100,100,100,100,100],
   [[-20,110,70,88,60,99,82],[-6,112,72,90,61,99,84]],[[-20,'Pregnancy – 24 weeks, routine antenatal care','Dr. Kavita Gill']],[]),
  P('P6','Mohd. Irfan','M','9000000006',35,'Sahnewal',30.8403,75.9529,'hi',false,1,'None known',[100,80,70,70,60,60],
   [[-40,120,78,92,66,95,88],[-10,118,76,94,65,94,92]],[[-40,'Pulmonary tuberculosis – on treatment (DOTS)','Dr. Sandeep Bedi']],[]),
  P('P7','Kuldeep Singh','M','9000000007',67,'Civil Lines, Ludhiana',30.9010,75.8573,'pa',false,0,'None known',[100,100,100,100,100,100],
   [[-3,128,80,140,74,91,98],[-2,130,82,132,74,93,94],[-1,126,78,128,74,94,90]],[[-3,'Community-acquired pneumonia','Dr. Harpreet Singh']],[]),
  P('P8','Meena Rani','F','9000000008',55,'Salem Tabri, Ludhiana',30.9150,75.8700,'pa',false,0,'Penicillin',[100,100,100,100,100,100],
   [[-5,138,86,260,68,97,92],[-3,134,84,230,68,97,90],[-1,132,82,204,68,97,88]],[[-5,'Diabetic foot infection (left foot)','Dr. Rajiv Mehta'],[-5,'Type 2 diabetes mellitus','Dr. Rajiv Mehta']],[])],
 followups:[
  F('F1','P1','BP review + blood test','Medicine OPD','Dr. Harpreet Singh',-4,'10:30','Come for the blood test as instructed by the lab desk. Bring your previous prescription and lab slip.',['Previous prescription','Lab slip','ID card'],['Shared phone','Long distance'],[{d:-5,by:'Coordinator Manpreet',mode:'Call',result:'No answer',note:''}]),
  F('F2','P2','Diabetes review','Medicine OPD','Dr. Harpreet Singh',3,'11:00','Bring your glucose diary and all current medicines.',['Glucose diary','Current medicines'],[],[]),
  F('F3','P2','Eye check-up (referral)','Ophthalmology OPD','Dr. Neha Arora',10,'12:00','Referral visit. Bring your previous eye reports if any.',['Referral slip'],[],[]),
  F('F4','P3','Post-discharge wound check','Surgery OPD','Dr. Rajiv Mehta',0,'09:30','Bring the discharge summary. Wear loose clothing.',['Discharge summary'],['Unclear instructions'],[{d:-1,by:'Coordinator Manpreet',mode:'Call',result:'Answered – needs help',note:'Asked what to bring'}]),
  F('F5','P4','Cardiology clinic follow-up','Cardiology OPD','Dr. Anil Verma',-9,'10:00','Bring your ECG report and medicine strips.',['ECG report','Medicine strips'],['Long distance','Needs escort / wheelchair'],[{d:-7,by:'Coordinator Manpreet',mode:'Call',result:'No answer',note:''},{d:-4,by:'Coordinator Manpreet',mode:'Call',result:'Wrong number',note:'Number belongs to a neighbour'}]),
  F('F6','P5','Antenatal check-up','Gynaecology OPD','Dr. Kavita Gill',7,'09:00','Bring your maternity card and previous reports.',['Maternity card','Previous reports'],[],[]),
  F('F7','P6','Chest clinic review','Chest OPD','Dr. Sandeep Bedi',-2,'11:30','Bring your treatment card and reports.',['Treatment card'],['Cost of travel'],[{d:-3,by:'Coordinator Manpreet',mode:'SMS',result:'SMS delivered',note:''}]),
  F('F8','P1','Medication review','Medicine OPD','Dr. Harpreet Singh',-30,'10:00','Routine review.',[],[],[],{status:'completed',outcome:'Attended at this hospital',completedOn:plusDays(-30),confirmed:true}),
  F('F9','P4','Physiotherapy session','Physiotherapy','Dr. Anil Verma',-20,'12:00','Routine session.',[],[],[],{status:'completed',outcome:'Attended at this hospital',completedOn:plusDays(-20),confirmed:true})],
 rx:[
  {id:'R1',pid:'P1',by:'Dr. Harpreet Singh',date:plusDays(-35),ward:false,status:'active',notes:'Continue for 30 days, then review.',items:[{name:'Amlodipine 5 mg',dose:'1 tablet',freq:'Once daily (morning)',days:30,qty:30},{name:'Telmisartan 40 mg',dose:'1 tablet',freq:'Once daily (morning)',days:30,qty:30}]},
  {id:'R2',pid:'P2',by:'Dr. Harpreet Singh',date:plusDays(-28),ward:false,status:'active',notes:'Check sugar before breakfast.',items:[{name:'Metformin 500 mg',dose:'1 tablet',freq:'Twice daily after meals',days:30,qty:60},{name:'Glucose test strips',dose:'1 strip per test',freq:'As advised',days:30,qty:50}]},
  {id:'R3',pid:'P4',by:'Dr. Anil Verma',date:plusDays(-50),ward:false,status:'active',notes:'',items:[{name:'Atorvastatin 20 mg',dose:'1 tablet',freq:'Once daily (night)',days:30,qty:30},{name:'Aspirin 75 mg',dose:'1 tablet',freq:'Once daily after food',days:30,qty:30}]},
  {id:'R4',pid:'P3',by:'Dr. Rajiv Mehta',date:plusDays(-12),ward:false,status:'active',notes:'',items:[{name:'Paracetamol 500 mg',dose:'1 tablet',freq:'Three times daily if pain',days:5,qty:15},{name:'Dressing kit',dose:'1 kit',freq:'As shown by nurse',days:7,qty:2}]},
  {id:'R5',pid:'P7',by:'Dr. Harpreet Singh',date:plusDays(-3),ward:true,status:'active',notes:'Ward medication for admission A1.',items:[{name:'Ceftriaxone 1 g IV',dose:'1 g IV',freq:'Every 12 h',days:5,qty:10},{name:'Paracetamol 500 mg',dose:'1 tablet',freq:'Three times daily if fever',days:5,qty:15}]},
  {id:'R6',pid:'P8',by:'Dr. Rajiv Mehta',date:plusDays(-5),ward:true,status:'active',notes:'Ward medication for admission A2.',items:[{name:'Clindamycin 600 mg IV',dose:'600 mg IV',freq:'Every 8 h',days:7,qty:21},{name:'Insulin regular (human)',dose:'Per sliding scale',freq:'Before meals',days:7,qty:1}]}],
 disp:[
  {id:'S1',rid:'R1',pid:'P1',date:plusDays(-34),by:'Pharmacist Rohit',items:[{name:'Amlodipine 5 mg',qty:30},{name:'Telmisartan 40 mg',qty:30}]},
  {id:'S2',rid:'R2',pid:'P2',date:plusDays(-27),by:'Pharmacist Rohit',items:[{name:'Metformin 500 mg',qty:60}]},
  {id:'S3',rid:'R3',pid:'P4',date:plusDays(-49),by:'Pharmacist Rohit',items:[{name:'Atorvastatin 20 mg',qty:30}]},
  {id:'S4',rid:'R4',pid:'P3',date:plusDays(-12),by:'Pharmacist Rohit',items:[{name:'Paracetamol 500 mg',qty:15},{name:'Dressing kit',qty:2}]},
  {id:'S5',rid:'R5',pid:'P7',date:plusDays(-3),by:'Pharmacist Rohit',items:[{name:'Ceftriaxone 1 g IV',qty:6}]},
  {id:'S6',rid:'R6',pid:'P8',date:plusDays(-5),by:'Pharmacist Rohit',items:[{name:'Clindamycin 600 mg IV',qty:15}]}],
 admissions:[
  {id:'A1',pid:'P7',ward:'Medicine Ward',bed:'M-12',date:plusDays(-3),doctor:'Dr. Harpreet Singh',reason:'Community-acquired pneumonia',status:'admitted',notes:[],orders:[
   O('vitals','Vitals check (BP, pulse, SpO2)',-240,'done',{result:'BP 126/78 · pulse 90 · SpO2 94%'}),
   O('med','Ceftriaxone 1 g IV',-120,'done'),
   O('vitals','Vitals check (BP, pulse, SpO2)',-35,'pending'),
   O('med','Paracetamol 500 mg (if fever)',-25,'pending'),
   O('med','Ceftriaxone 1 g IV',420,'pending'),
   O('checkup','Doctor round – review chest X-ray',600,'pending')]},
  {id:'A2',pid:'P8',ward:'Surgery Ward',bed:'S-04',date:plusDays(-5),doctor:'Dr. Rajiv Mehta',reason:'Diabetic foot infection',status:'admitted',notes:[],orders:[
   O('vitals','Blood sugar check (before meals)',-300,'done',{result:'Sugar 204'}),
   O('vitals','Blood sugar check (before meals)',-70,'pending'),
   O('med','Clindamycin 600 mg IV',-8,'pending'),
   O('vitals','Vitals check (BP, pulse, SpO2)',300,'pending'),
   O('med','Clindamycin 600 mg IV',360,'pending')]}],
 tasks:[
  {id:'T1',pid:'P4',fid:'F5',type:'Wheelchair + escort',from:'OPD Registration',to:'Cardiology OPD, Room 7',when:'On arrival',status:'open',source:'Care plan'},
  {id:'T2',pid:'P3',fid:'F4',type:'Guide to department',from:'OPD Registration',to:'Surgery OPD',when:'Today 09:30',status:'open',source:'Care plan'},
  {id:'T3',pid:'P1',fid:'F1',type:'Escort to lab (sample collection)',from:'OPD Registration',to:'Pathology Lab',when:'On arrival',status:'open',source:'Care plan'}],
 ai:[],fb:[],stats:{},audit:[],msgs:[],
 weekly:W.map((w,i)=>({w:w,sched:SC[i],done:DN[i]}))};
}
let DB=store.get(LS,null)||seed();
function save(){store.set(LS,DB)}
let SESSION=store.get(SES_KEY,null);
const uid=p=>{DB.nextId=(DB.nextId||100)+1;return p+DB.nextId};
const pt=id=>DB.patients.find(p=>p.id===id);
const fu=id=>DB.followups.find(f=>f.id===id);
const adm=id=>DB.admissions.find(a=>a.id===id);
const me=()=>SESSION&&SESSION.type==='patient'?pt(SESSION.id):null;
const staff=()=>SESSION&&SESSION.type==='staff'?STAFF.find(s=>s.id===SESSION.id):null;
const addContact=(f,o)=>f.contacts.push({date:plusDays(0),by:o.by,mode:o.mode,result:o.result,note:o.note||''});
function audit(action,pid){const u=staff(),pp=me();DB.audit.unshift({at:Date.now(),by:u?u.name:pp?pp.name+' (patient)':'System',role:u?u.role:pp?'patient':'system',action,pid:pid||''});if(DB.audit.length>500)DB.audit.length=500;save()}
const initials=n=>n.split(' ').filter(w=>!/^(dr|mohd)\.?$/i.test(w)).map(w=>w[0].toUpperCase()+'.').join(' ');
const token=pid=>'OPD-'+String(pid.replace(/\D/g,'')).padStart(4,'0');
function sendMsg(p,f,ch,text,by){DB.msgs.push({id:uid('M'),pid:p.id,fid:f?f.id:'',ch,to:p.phone,lang:p.lang,text,by,at:Date.now(),status:'Sent (simulated – no gateway connected)'});if(f)addContact(f,{by,mode:ch,result:ch+' sent',note:text.slice(0,70)+'…'})}

/* ================= risk engine (transparent rules, administrative) ================= */
const hav=(a,b,c,d)=>{const R=6371,r=x=>x*Math.PI/180,dl=r(c-a),dn=r(d-b);const x=Math.sin(dl/2)**2+Math.cos(r(a))*Math.cos(r(c))*Math.sin(dn/2)**2;return 2*R*Math.asin(Math.sqrt(x))};
const roadKm=(lat,lng)=>Math.max(.5,Math.round(hav(lat,lng,H.lat,H.lng)*1.3*10)/10);
const distKm=p=>roadKm(p.lat,p.lng);
function riskOf(f){
 if(f.status!=='pending')return{score:0,level:'low',reasons:[],actions:[]};
 const p=pt(f.pid),d=diffDays(f.due),R=[],A=[];let s=0;
 if(d<0){s+=Math.min(40,10+(-d)*3);R.push('Overdue by '+(-d)+' day(s)');A.push('Call the patient today and offer the earliest available slot')}
 else if(d<=2&&!f.confirmed){s+=10;R.push('Due within 2 days and not yet confirmed');A.push('Send a reminder with clear instructions')}
 if(p.sharedPhone&&!p.altPhone){s+=15;R.push('Shared phone number – message may not reach the patient');A.push('Ask who answers this phone and record an alternate contact')}
 const km=distKm(p);
 if(km>40){s+=20;R.push('Lives about '+km+' km from the hospital');A.push('Share travel / ride options and bundle lab + consultation on one day')}
 else if(km>20){s+=10;R.push('Lives about '+km+' km from the hospital');A.push('Share travel options and expected leave-by time')}
 const bp={'Unclear instructions':[10,'Instructions unclear to the patient','Send simplified instructions in the patient’s language'],'Needs escort / wheelchair':[10,'Needs escort / wheelchair','Book a ward-boy escort and wheelchair at arrival'],'Cost of travel':[10,'Travel cost is a concern','Share low-cost ride options'],'No one to accompany':[8,'No one to accompany the patient','Ask the community health worker / family to help'],'Language support needed':[6,'Needs language support','Assign a staff member who speaks the patient’s language'],'Long waiting time':[6,'Long waiting time reported','Offer a timed slot to cut waiting']};
 f.barriers.forEach(b=>{if(bp[b]){s+=bp[b][0];R.push(bp[b][1]);A.push(bp[b][2])}});
 if(p.missedBefore>=1){s+=15;R.push('Missed '+p.missedBefore+' earlier follow-up(s)')}
 const last=f.contacts.filter(c=>c.by!=='Patient (portal)').slice(-1)[0];
 if(last&&FAILED.includes(last.result)){s+=10;R.push('Last contact attempt failed ('+last.result+')');A.push('Retry at a different time, or reach the family / community health worker')}
 if(f.escalated){s+=10;R.push('Escalated by staff')}
 if(f.confirmed)s-=25;
 s=Math.max(0,Math.min(100,s));
 return{score:s,level:s>=60?'high':s>=30?'medium':'low',reasons:R,actions:[...new Set(A)]};
}
function statusOf(f){
 if(f.status==='completed')return{label:'Completed',cls:'Completed'};
 if(f.status==='closed')return{label:'Closed',cls:'Closed'};
 if(f.reschedReq)return{label:'Reschedule requested',cls:'Reschedule'};
 const d=diffDays(f.due);
 if(d<0)return{label:'Overdue',cls:'Overdue'};
 if(d===0)return{label:'Due today',cls:'Duetoday'};
 return f.confirmed?{label:'Confirmed',cls:'Confirmed'}:{label:'Upcoming',cls:'Upcoming'};
}
const cases=()=>DB.followups.map(f=>({f,p:pt(f.pid),r:riskOf(f),st:statusOf(f),d:diffDays(f.due)})).sort((a,b)=>(a.f.status==='pending'?0:1)-(b.f.status==='pending'?0:1)||b.r.score-a.r.score);
function dueText(f){const d=diffDays(f.due);if(f.status!=='pending')return t('completed');if(d<0)return t('overdue_by').replace('{n}',-d);if(d===0)return t('due_today');return t('due_in').replace('{n}',d)}
const dueCls=f=>f.status!=='pending'?'done':diffDays(f.due)<0?'late':diffDays(f.due)===0?'today':'';

/* ================= medicine safety helpers ================= */
const ALG={penicillin:['penicillin','amoxicillin','ampicillin','piperacillin','cloxacillin'],aspirin:['aspirin','acetylsalicylic'],sulfa:['sulfa','cotrimoxazole','sulfamethoxazole'],nsaid:['ibuprofen','diclofenac','naproxen','aspirin']};
function allergyHits(p,name){const n=name.toLowerCase(),a=(p.allergies||'').toLowerCase(),h=[];Object.keys(ALG).forEach(k=>{if(a.includes(k)&&ALG[k].some(w=>n.includes(w)))h.push(k)});return h}
function itemStat(rx,it){
 let disp=0,first=null;
 DB.disp.filter(d=>d.rid===rx.id).forEach(d=>d.items.forEach(x=>{if(x.name===it.name){disp+=x.qty;if(!first||d.date<first)first=d.date}}));
 const rem=Math.max(0,it.qty-disp),daily=it.qty/Math.max(1,it.days),ends=first?addDaysISO(first,Math.floor(disp/daily)):null;
 return{disp,rem,first,ends,left:ends?diffDays(ends):null};
}
function rxChecks(p,rx,it){
 const o=[],s=itemStat(rx,it);
 allergyHits(p,it.name).forEach(h=>o.push({level:'bad',text:'ALLERGY CONFLICT: patient has "'+p.allergies+'"'}));
 const base=it.name.split(' ')[0].toLowerCase();
 DB.rx.filter(r=>r.pid===p.id&&r.id!==rx.id&&r.status==='active').forEach(r=>r.items.forEach(x=>{if(x.name.split(' ')[0].toLowerCase()===base&&itemStat(r,x).rem>0)o.push({level:'warn',text:'Possible duplicate therapy with another active prescription ('+x.name+')'})}));
 if(s.disp>0&&s.rem>0&&s.left!=null&&s.left>7)o.push({level:'warn',text:'Earlier supply still has about '+s.left+' day(s) left – check before refilling'});
 if(s.rem===0)o.push({level:'ok',text:'Fully dispensed as prescribed'});
 return o;
}
function supplyNote(p){const o=[];DB.rx.filter(r=>r.pid===p.id&&!r.ward).forEach(r=>r.items.forEach(it=>{const s=itemStat(r,it);if(s.rem===0&&s.left!=null&&s.left<0&&it.days>=7)o.push(it.name+' supply ended ~'+(-s.left)+' day(s) ago')}));return o}
const flagHTML=a=>a.map(c=>`<span class="flag ${c.level}">${esc(c.text)}</span>`).join('');

/* ================= AI decision-support ================= */
function addAI(o){if(DB.ai.some(a=>a.key===o.key))return;DB.ai.push(Object.assign({id:uid('AI'),at:Date.now(),status:'pending',approvals:{},requires:REQ[o.type].slice()},o))}
function genAI(){
 const n=DB.ai.length;
 DB.followups.forEach(f=>{
  if(f.status!=='pending')return;
  const p=pt(f.pid),r=riskOf(f),d=diffDays(f.due);
  if(r.level==='high'&&d<0)addAI({key:'exp:'+f.id,type:'expedite',kind:'followup',pid:f.pid,fid:f.id,title:'Offer the earliest slot for an overdue follow-up ('+f.title+')',detail:'The follow-up is '+(-d)+' day(s) overdue and several barriers are present. Moving it to an earlier slot and contacting the patient may help.',reasons:r.reasons,strength:r.score,payload:{date:plusDays(d<-7?1:2)}});
  if(f.barriers.includes('Unclear instructions')&&d>=-3)addAI({key:'sms:'+f.id,type:'sms',kind:'outreach',pid:f.pid,fid:f.id,title:'Send simplified instructions in '+LNAME[p.lang],detail:'The patient reported unclear instructions. A short message in their language is drafted below.',reasons:['Instructions unclear to the patient'],strength:55,payload:{text:fillTpl('instructions',p,f)}});
  if(f.barriers.includes('Needs escort / wheelchair')&&!DB.tasks.some(x=>x.fid===f.id&&x.status==='open'))addAI({key:'wc:'+f.id,type:'wheelchair',kind:'logistics',pid:f.pid,fid:f.id,title:'Arrange wheelchair + escort on arrival',detail:'The patient needs an escort / wheelchair. A ward-assistance task will be created.',reasons:['Needs escort / wheelchair'],strength:50,payload:{}});
 });
 DB.patients.forEach(p=>{
  const bp=p.vitals.filter(v=>v.sys!=null).slice(-3),sn=supplyNote(p);
  if(bp.length===3&&bp[0].sys<bp[1].sys&&bp[1].sys<bp[2].sys&&bp[2].sys>=140)addAI({key:'bp:'+p.id,type:'note',kind:'clinical',pid:p.id,title:'Rising blood-pressure trend',detail:'Systolic BP has risen across the last 3 readings ('+bp.map(x=>x.sys).join(' → ')+' mmHg).',reasons:['Last 3 systolic readings are increasing','Latest reading is 140 mmHg or higher'].concat(sn),strength:Math.min(90,50+(bp[2].sys-bp[0].sys)),payload:{text:'AI-assisted note: systolic BP rose across the last 3 readings ('+bp.map(x=>x.sys).join(' → ')+' mmHg). '+(sn.length?'Dispensing records show: '+sn.join('; ')+'. ':'')+'Consider reviewing adherence and the current regimen at the next consultation.'}});
  const sg=p.vitals.filter(v=>v.sugar!=null).slice(-3);
  if(sg.length===3&&sg[2].sugar>=180&&sg[0].sugar<sg[2].sugar)addAI({key:'sug:'+p.id,type:'note',kind:'clinical',pid:p.id,title:'Rising blood-sugar trend',detail:'Blood sugar has risen across the last 3 readings ('+sg.map(x=>x.sugar).join(' → ')+' mg/dL).',reasons:['Last 3 sugar readings are increasing','Latest reading is 180 mg/dL or higher'].concat(sn),strength:Math.min(90,45+Math.round((sg[2].sugar-sg[0].sugar)/2)),payload:{text:'AI-assisted note: blood sugar rose across the last 3 readings ('+sg.map(x=>x.sugar).join(' → ')+' mg/dL). Consider reviewing therapy, diet adherence and the eye-referral status.'}});
  const sp=p.vitals.filter(v=>v.spo2!=null).slice(-1)[0];
  if(sp&&sp.spo2<94&&!DB.admissions.some(a=>a.pid===p.id&&a.status==='admitted'))addAI({key:'spo:'+p.id,type:'note',kind:'clinical',pid:p.id,title:'Low oxygen saturation in last reading',detail:'Latest SpO2 is '+sp.spo2+'%, below the usual 94% reference.',reasons:['Latest SpO2 < 94%'],strength:60,payload:{text:'AI-assisted note: latest SpO2 was '+sp.spo2+'%. Consider clinical review at the next contact.'}});
 });
 DB.admissions.filter(a=>a.status==='admitted').forEach(a=>{
  const od=a.orders.filter(o=>o.status==='pending'&&Date.now()-o.dueTs>30*60000);
  if(od.length)addAI({key:'ward:'+a.id+':'+od[0].id,type:'order',kind:'clinical',pid:a.pid,aid:a.id,title:'Overdue scheduled care on the ward ('+a.ward+' '+a.bed+')',detail:od.length+' scheduled item(s) are more than 30 minutes overdue. A repeat vitals check can be ordered and the doctor can review missed doses.',reasons:od.map(o=>o.title+' – overdue '+Math.round((Date.now()-o.dueTs)/60000)+' min'),strength:Math.min(95,50+od.length*15),payload:{title:'Repeat vitals check (BP, pulse, SpO2) – AI suggested',inMin:15}});
 });
 if(DB.ai.length!==n)save();
}
function applyAI(s){
 const p=pt(s.pid),f=s.fid?fu(s.fid):null,pl=s.payload;
 if(s.type==='expedite'){f.due=pl.date;f.escalated=true;f.confirmed=false;addContact(f,{by:'Doctor + Coordinator',mode:'Review',result:'Follow-up moved to '+fmtDate(pl.date)+' (approved AI suggestion)'})}
 if(s.type==='sms')sendMsg(p,f,'SMS',pl.text,s.approvals.coordinator.by);
 if(s.type==='wheelchair')DB.tasks.push({id:uid('T'),pid:p.id,fid:f.id,type:'Wheelchair + escort',from:'OPD Registration',to:f.dept,when:'On arrival, '+fmtDate(f.due),status:'open',source:'Approved AI suggestion'});
 if(s.type==='note')p.checkups.push({id:uid('C'),date:plusDays(0),type:'AI-assisted note (doctor approved)',note:pl.text,by:s.approvals.doctor.by});
 if(s.type==='order')adm(s.aid).orders.push({id:uid('O'),type:'vitals',title:pl.title,dueTs:inMin(+pl.inMin||15),status:'pending',by:s.approvals.doctor.by});
}
const payloadText=s=>s.type==='expedite'?'Move follow-up to '+fmtDate(s.payload.date):s.type==='sms'||s.type==='note'?s.payload.text:s.type==='order'?s.payload.title+' (in '+(s.payload.inMin||15)+' min)':'Create a wheelchair + escort task for arrival day';
const aiRate=ty=>{const x=DB.stats[ty];if(!x)return'No decisions yet';const tot=x.a+x.m+x.r;return Math.round((x.a+x.m)/tot*100)+'% accepted ('+(x.a+x.m)+' of '+tot+')'};
function myPatients(u){const s=new Set();DB.followups.forEach(f=>{if(f.doctor===u.name)s.add(f.pid)});DB.admissions.forEach(a=>{if(a.doctor===u.name)s.add(a.pid)});DB.rx.forEach(r=>{if(r.by===u.name)s.add(r.pid)});return [...s].map(pt)}
function visibleAI(u){
 if(u.role==='doctor'){const ids=new Set(myPatients(u).map(p=>p.id));return DB.ai.filter(s=>s.requires.includes('doctor')&&ids.has(s.pid))}
 if(u.role==='coordinator')return DB.ai.filter(s=>s.requires.includes('coordinator'));
 if(u.role==='admin')return DB.ai.filter(s=>!['note','order'].includes(s.type));
 return [];
}

/* ================= charts (inline SVG) ================= */
const COL=['#168c88','#d9822b','#2b6cb0','#c14e35'];
function lineSVG(series,labels,o){
 o=o||{};const W=520,Ht=o.h||200,L=40,R=14,T=16,B=28,iw=W-L-R,ih=Ht-T-B;
 const vals=series.flatMap(s=>s.data.filter(v=>v!=null));
 if(!vals.length)return'<p class="sub">No readings recorded yet.</p>';
 let mn=Math.min(...vals),mx=Math.max(...vals);
 (o.refs||[]).forEach(r=>{mn=Math.min(mn,r.v);mx=Math.max(mx,r.v)});
 const pad=(mx-mn)*.12||4;mn=Math.floor(mn-pad);mx=Math.ceil(mx+pad);
 const X=i=>L+(labels.length<2?iw/2:i*iw/(labels.length-1)),Y=v=>T+ih-(v-mn)/(mx-mn)*ih;
 let g='';
 for(let k=0;k<=4;k++){const v=mn+(mx-mn)*k/4,y=Y(v);g+=`<line x1="${L}" x2="${W-R}" y1="${y}" y2="${y}" stroke="#e3ebed"/><text x="${L-6}" y="${y+3}" text-anchor="end" font-size="10" fill="#7b8d92">${Math.round(v)}</text>`}
 (o.refs||[]).forEach(r=>{const y=Y(r.v);g+=`<line x1="${L}" x2="${W-R}" y1="${y}" y2="${y}" stroke="#c14e35" stroke-dasharray="4 4"/><text x="${W-R}" y="${y-4}" text-anchor="end" font-size="10" fill="#c14e35">${esc(r.l)}</text>`});
 const step=Math.ceil(labels.length/6);
 labels.forEach((l,i)=>{if(i%step===0||i===labels.length-1)g+=`<text x="${X(i)}" y="${Ht-8}" text-anchor="middle" font-size="10" fill="#7b8d92">${esc(l)}</text>`});
 series.forEach((s,si)=>{
  const c=s.color||COL[si%4],pts=s.data.map((v,i)=>v==null?null:[X(i),Y(v),v,i]).filter(Boolean);
  if(pts.length>1)g+=`<polyline fill="none" stroke="${c}" stroke-width="2.4" points="${pts.map(p=>p[0]+','+p[1]).join(' ')}"/>`;
  pts.forEach(p=>{g+=`<circle cx="${p[0]}" cy="${p[1]}" r="3.6" fill="${c}"><title>${esc(s.name)}: ${p[2]} (${esc(labels[p[3]])})</title></circle>`});
 });
 const lg=series.length>1?`<div class="legend">${series.map((s,si)=>`<span><i style="background:${s.color||COL[si%4]}"></i>${esc(s.name)}</span>`).join('')}</div>`:'';
 return lg+`<svg class="chart" viewBox="0 0 ${W} ${Ht}" role="img" aria-label="${esc(o.title||'chart')}">${g}</svg>`;
}
function colSVG(vals,labels,o){
 o=o||{};const W=520,Ht=170,L=38,B=26,T=14,iw=W-L-10,ih=Ht-T-B,mx=100,bw=iw/vals.length*.55;let g='';
 [0,50,100].forEach(v=>{const y=T+ih-(v/mx)*ih;g+=`<line x1="${L}" x2="${W-10}" y1="${y}" y2="${y}" stroke="#e3ebed"/><text x="${L-6}" y="${y+3}" text-anchor="end" font-size="10" fill="#7b8d92">${v}%</text>`});
 vals.forEach((v,i)=>{const x=L+i*iw/vals.length+(iw/vals.length-bw)/2,h=v/mx*ih,c=v>=80?'#168c88':v>=60?'#d9822b':'#c14e35';g+=`<rect x="${x}" y="${T+ih-h}" width="${bw}" height="${h}" rx="5" fill="${c}"><title>${esc(labels[i])}: ${v}%</title></rect><text x="${x+bw/2}" y="${T+ih-h-4}" text-anchor="middle" font-size="10" fill="#48656b">${v}%</text><text x="${x+bw/2}" y="${Ht-8}" text-anchor="middle" font-size="10" fill="#7b8d92">${esc(labels[i])}</text>`});
 return`<svg class="chart" viewBox="0 0 ${W} ${Ht}" role="img" aria-label="${esc(o.title||'chart')}">${g}</svg>`;
}
const hbars=(rows)=>{const mx=Math.max(1,...rows.map(r=>r[1]));return rows.length?rows.map(r=>`<div class="bar-row" style="grid-template-columns:170px 1fr 40px"><span>${esc(r[0])}</span><div class="bar"><i style="width:${r[1]/mx*100}%"></i></div><b>${r[1]}</b></div>`).join(''):'<p class="sub">No data yet.</p>'};
const avgCons=p=>{const a=p.consistency.slice(-3);return Math.round(a.reduce((x,y)=>x+y,0)/a.length)};
const consBadge=p=>{const c=avgCons(p);return`<span class="risk ${c>=80?'low':c>=60?'medium':'high'}">${c}%</span>`};

/* ================= UI state ================= */
const UI={menu:false,slide:0,otp:false,phone:'',round:false,chat:false,geoMsg:'',msgs:[{t:'Hi! I can help with login, follow-ups, travel and ambulance info. I cannot give medical advice.'}]};
let GEO=null,slideTimer=null;
function toast(m){const e=$('#toast');e.textContent=m;e.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove('show'),3800)}
function go(h){if(location.hash===h)render();else location.hash=h}

/* ================= shared layout ================= */
function announce(){return`<div class="announcement"><span class="announcement-pill">DEMO</span>AI Synergy Hackathon 2026 · Team AARAMBH · Case 03 · Sample data only</div>`}
function header(){
 const cur=location.hash||'#/';
 const L=[['#/',t('nav_home')],['#/problem',t('nav_problem')],['#/how',t('nav_how')],['#/roles',t('nav_roles')],['#/roadmap',t('nav_roadmap')]];
 const nav=L.map(l=>`<a href="${l[0]}" class="${cur===l[0]||(l[0]!=='#/'&&cur.startsWith(l[0]))?'active':''}">${l[1]}</a>`).join('');
 return`<header class="site-header"><a class="brand" href="#/"><span class="brand-mark">A</span><span><strong>AARAMBH</strong><small>Follow-up Navigator</small></span></a>
 <nav class="desktop-nav">${nav}</nav>
 <div class="header-actions"><select class="lang" data-change="lang" aria-label="Language"><option value="en"${LANG==='en'?' selected':''}>English</option><option value="hi"${LANG==='hi'?' selected':''}>हिन्दी</option><option value="pa"${LANG==='pa'?' selected':''}>ਪੰਜਾਬੀ</option></select>
 <a class="btn btn-outline" href="#/patient">${t('patient_portal')}</a><a class="btn btn-primary" href="#/admin">${t('hospital_admin')}</a>
 <button class="menu-btn" data-act="menu" aria-label="Menu">${UI.menu?'×':'☰'}</button></div></header>
 ${UI.menu?`<nav class="mobile-nav">${nav}<a href="#/patient"><b>${t('patient_portal')}</b></a><a href="#/admin"><b>${t('hospital_admin')}</b></a></nav>`:''}`;
}
function footer(){return`<footer class="footer"><div><a class="brand" href="#/"><span class="brand-mark">A</span><span><strong>AARAMBH</strong><small>Care That Fits Real Life</small></span></a><p>Prototype for AI Synergy Hackathon 2026. AI supports coordination and decision support — it never diagnoses, prescribes or decides alone. Every AI action needs human approval.</p></div><div class="footer-links"><a href="#/patient">${t('patient_portal')}</a><a href="#/admin">${t('hospital_admin')}</a><button data-act="reset">Reset demo data</button></div></footer>`}
const notFound=()=>`<div class="page"><h1>Page not found</h1><p class="lead">This page does not exist.</p><a class="btn btn-primary" href="#/">Go home</a></div>`;
const deny=()=>`<div class="page"><h1>Not available for your role</h1><p class="lead">For privacy and safety, this page is restricted. Please use the options on your dashboard.</p><a class="btn btn-primary" href="#/admin">Back to dashboard</a></div>`;

/* ================= HOME ================= */
function slideHTML(){
 const s=SLIDES[UI.slide],n=UI.slide+1;
 return`<div class="photo-frame" style="background:linear-gradient(135deg,${s.bg[0]},${s.bg[1]})"><div class="deco d1"></div><div class="deco d2"></div>
 ${s.photo?`<img src="${s.photo}" alt="${esc(s.title)}" onerror="this.remove()">`:''}
 <div class="slide-ico">${s.ico}</div><div class="photo-wash"></div><span class="photo-label">STEP ${n} OF 6</span>
 <div class="photo-caption"><div><h3>${s.title}</h3><p>${s.text}</p></div><span class="caption-number">${n}/6</span></div></div>
 <div class="slide-controls">${SLIDES.map((_,i)=>`<button class="${i===UI.slide?'selected':''}" data-act="slide" data-i="${i}" aria-label="Step ${i+1}"></button>`).join('')}</div>
 <div class="journey-chips">${SLIDES.map((x,i)=>`<span class="${i<=UI.slide?'on':''}">${x.title}</span>`).join('')}</div>`;
}
function paintSlide(){const e=$('#hero-visual');if(e)e.innerHTML=slideHTML()}
function startSlides(){slideTimer=setInterval(()=>{UI.slide=(UI.slide+1)%SLIDES.length;paintSlide()},4500)}
function pageHome(){
 return`<section class="hero"><div><p class="eyebrow">AI-POWERED CARE NAVIGATOR</p><h1>${t('hero_1')} <span>${t('hero_2')}</span></h1><p class="hero-description">${t('hero_desc')}</p>
 <div class="hero-actions"><a class="btn btn-primary btn-large" href="#/patient">${t('patient_portal')} →</a><a class="btn btn-dark btn-large" href="#/admin">${t('hospital_admin')}</a></div>
 <div class="hero-points"><div>Barrier-aware support</div><div>Human review of every AI action</div><div>Closed-loop tracking</div></div></div>
 <div class="hero-visual" id="hero-visual">${slideHTML()}</div></section>
 <div class="strip"><div class="strip-item"><i>📵</i><div><strong>Shared phones</strong><small>Privacy-safe messages</small></div></div><div class="strip-item"><i>📍</i><div><strong>Distance & GPS</strong><small>Travel plan with ETA</small></div></div><div class="strip-item"><i>🗣️</i><div><strong>3 languages</strong><small>English · हिन्दी · ਪੰਜਾਬੀ</small></div></div><div class="strip-item"><i>🧑‍⚕️</i><div><strong>Human in loop</strong><small>Doctor + Coordinator approve</small></div></div></div>
 <section class="section portals"><div class="section-heading"><h2>Choose your portal</h2><p>Patients see their follow-ups and travel options. Hospital teams see only what their role needs.</p></div>
 <div class="portal-grid"><div class="portal-card patient"><span class="portal-kicker">FOR PATIENTS</span><h3>${t('patient_portal')}</h3><p>Log in with your registered mobile number to see what is due and how to reach the hospital.</p><ul><li>Follow-ups, due dates and what to bring</li><li>Distance from the hospital and GPS-based travel time</li><li>Ride and ambulance options with estimated cost</li><li>Ask for a new date, a wheelchair or a callback</li></ul><a class="btn btn-primary" href="#/patient">${t('patient_portal')}</a></div>
 <div class="portal-card"><span class="portal-kicker">FOR HOSPITAL TEAMS</span><h3>${t('hospital_admin')}</h3><p>Role-based access for everyone who touches a follow-up.</p><ul><li>Doctor – clinical record, graphs, diagnosis, prescriptions, admissions, AI decision support</li><li>Staff – Follow-up Coordinator, Nurse, Pharmacist, Ward Boy</li><li>AI suggests, humans decide: Doctor + Coordinator approvals</li><li>Complete audit trail of every action</li></ul><a class="btn btn-dark" href="#/admin">${t('hospital_admin')}</a></div></div></section>
 <section class="section"><div class="support-band" style="margin:0"><div><h2>Emergency? Do not wait for a follow-up.</h2><p>${t('emergency')}</p></div><div class="support-actions"><a class="btn btn-white" href="tel:108">Call 108</a><a class="btn btn-outline-white" href="tel:112">Call 112</a></div></div></section>`;
}

/* ================= INFO PAGES ================= */
function pageProblem(){
 const R=[['Lack of perceived illness',24.8],['Distance / travel',22.2],['Lack of guidance / reminders',15.2],['Acute illness / disability',8.2],['Long waiting time',7.0]];
 return`<div class="page"><h1>Missed follow-ups: a hidden gap in patient care</h1><p class="lead">Patients may leave a busy hospital with instructions that are unclear or difficult to follow, while practical barriers and imperfect records make unresolved follow-up hard for staff to identify.</p>
 <div class="grid g2"><div class="card"><div class="big-stat">900</div><p>outpatient visits daily at a typical district hospital (case scenario)</p></div><div class="card"><div class="big-stat">28%</div><p>of patients marked for follow-up do not return within the recommended period (case scenario)</p></div></div>
 <div class="card" style="margin-top:16px"><h3>Reported reasons for missed visits</h3><p style="margin-bottom:10px">Source: Das et al., 2021 – Punjab study (hypertension patients)</p>${R.map(r=>`<div class="bar-row"><span>${r[0]}</span><div class="bar"><i style="width:${r[1]/30*100}%"></i></div><b>${r[1]}%</b></div>`).join('')}</div>
 <div class="grid g3" style="margin-top:16px"><div class="card"><h3>Access barriers</h3><p>Distance, disability, acute illness and long waiting time make follow-up difficult.</p></div><div class="card"><h3>Communication gaps</h3><p>Patients may lack clear guidance, reminders, or understanding of why follow-up matters.</p></div><div class="card"><h3>Incomplete records</h3><p>A missing hospital record does not always mean the patient missed care — they may have been treated elsewhere.</p></div></div>
 <div class="grid g4" style="margin-top:16px">${[['Missed follow-ups','Patients often fail to return on time.'],['Hidden barriers','Cost, distance, fear and confusion go unnoticed.'],['Late danger detection','Hospitals discover delays only after they occur.'],['One-size-fits-all reminders','Generic messages fail to address personal barriers.']].map(x=>`<div class="card"><h3>${x[0]}</h3><p>${x[1]}</p></div>`).join('')}</div>
 <div class="insight">KEY INSIGHT: A missed follow-up can signal an unresolved barrier — not simply a lack of motivation. It is not just about reminding patients; it is about understanding barriers, getting them the right support and verifying the outcome.</div></div>`;
}
function pageHow(){
 const S=[['01','Capture the care plan','Convert clinician-recorded follow-up instructions into structured tasks, timelines and required documents.'],['02','Detect follow-up risks','Identify patient-specific barriers and gaps that may delay follow-up care.'],['03','Personalize the support','AI suggests practical next steps; the Doctor and Follow-up Coordinator review and approve them.'],['04','Close the follow-up loop','Track contact attempts and outcomes, flag unresolved cases for staff review and keep the care team informed.']];
 const W=['Patient visit','Data processing','Data validation','Preprocessing','Feature engineering','AI risk flagging (rules + validated ML)','Explanation of the flag','Human review & approval','Personalized navigation & support','Outcome tracking','Monitor & improve (feedback from reviewers)'];
 return`<div class="page"><h1>How AARAMBH works</h1><p class="lead">From the patient visit to a verified outcome — with humans reviewing before anything reaches the patient or changes a record.</p>
 <div class="grid g4">${S.map(s=>`<div class="card"><div class="num">${s[0]}</div><h3>${s[1]}</h3><p>${s[2]}</p></div>`).join('')}</div>
 <h2 style="margin:34px 0 14px">11-step workflow</h2><div class="grid g4">${W.map((w,i)=>`<div class="card" style="padding:16px"><div class="num" style="width:30px;height:30px;margin-bottom:8px">${i+1}</div><p style="color:#21464d;font-weight:600">${w}</p></div>`).join('')}</div>
 <div class="safe-note"><b>What makes it different:</b> beyond reminders (finds <i>why</i> a patient may not return) · barrier-aware (shared phones, travel, unclear instructions) · actionable (recommends next steps, not just scores) · closed-loop (records whether the follow-up actually happened).</div>
 <div class="grid g2" style="margin-top:16px"><a class="btn btn-primary" href="#/patient">Try the Patient Portal</a><a class="btn btn-dark" href="#/admin">Open Hospital Administration</a></div></div>`;
}
function pageRoles(){
 const L=[['Data availability & accuracy','Incomplete or outdated data.'],['Language & communication','Many local languages; risk of misinterpretation.'],['Digital access','Many patients lack smartphones or stable internet.'],['Privacy & security','Sensitive health data must be protected – every role sees only what it needs.'],['Human dependency','Staff must monitor and act on alerts.'],['Implementation & adoption','Training, change management and patient trust.']];
 return`<div class="page"><h1>AI & Humans — different strengths, a shared goal</h1><p class="lead">AI handles data and coordination. Humans provide judgment, empathy and clinical expertise.</p>
 <div class="grid g2"><div class="card"><h3>🤖 AI — analyse · identify · recommend</h3><ul><li>Detects risks and barriers</li><li>Prioritizes high-risk or overdue follow-ups</li><li>Suggests next steps to the Doctor and Coordinator</li><li>Learns from every approval, edit and rejection</li></ul></div>
 <div class="card"><h3>🧑‍⚕️ Humans — empathize · decide · support</h3><ul><li>Doctor decides clinical matters</li><li>Coordinator decides outreach and scheduling</li><li>Both must approve before a shared decision is applied</li><li>Anyone can edit or reject an AI suggestion, with a reason</li></ul></div></div>
 <div class="safe-note"><b>Safety first:</b> AI never diagnoses, prescribes or acts on its own. Clinical suggestions go to the Doctor only; scheduling changes need Doctor + Coordinator.</div>
 <h2 style="margin:30px 0 14px">Limitations & mitigation</h2><div class="grid g3">${L.map(l=>`<div class="card"><h3>${l[0]}</h3><p>${l[1]}</p></div>`).join('')}</div></div>`;
}
function pageRoadmap(){
 const R=[['Pilot & validate','0–3 months','Test in a selected district clinic, collect user feedback, refine workflow'],['AI-powered enhancements','3–6 months','Trained risk model, personalised messages, smart reminders'],['Multi-channel access','6–9 months','IVR / voice calls, SMS / WhatsApp / app, low-data mode'],['Ecosystem integration','9–12 months','Hospital information system, pharmacy & lab partners, transport'],['User expansion','9–12 months','Caregivers & families, health-worker communication, chronic care'],['Advanced analytics','12–18 months','Predict no-shows, identify barriers, improve resource allocation'],['Measure impact','18–24 months','Completion rates, satisfaction, health outcomes'],['Scale & sustain','24+ months','More districts, continuous monitoring, long-term sustainability']];
 const I=[['Follow-up completion','↑ 30–50%'],['Time management','↑ 20–40%'],['Missed appointments','↓ 25–40%'],['Patient satisfaction','↑ 40–60%'],['Staff workload','↓ 30–50%'],['Health outcomes','↑ 15–30%']];
 return`<div class="page"><h1>Roadmap & expected impact</h1><p class="lead">From pilot to scale — step by step.</p><div class="tl">${R.map((r,i)=>`<div class="card"><b>${r[1]}</b><h3>${i+1}. ${r[0]}</h3><p>${r[2]}</p></div>`).join('')}</div>
 <h2 style="margin:30px 0 14px">Expected impact</h2><div class="grid g3">${I.map(x=>`<div class="card"><p>${x[0]}</p><div class="big-stat" style="font-size:30px;margin-top:8px">${x[1]}</div></div>`).join('')}</div>
 <div class="warn-note">These are <b>projected targets</b> to be validated during the pilot — not measured results.</div></div>`;
}

/* ================= PATIENT PORTAL ================= */
function pagePatientLogin(){
 return`<section class="auth-page"><div class="auth-card"><span class="auth-eyebrow">PATIENT PORTAL</span><h1>${t('login_title')}</h1><p class="auth-intro">Use the mobile number registered at the hospital OPD.</p>
 ${!UI.otp?`<form data-form="p-otp"><label class="field">${t('mobile')}<input name="phone" inputmode="numeric" maxlength="10" pattern="[0-9]{10}" placeholder="10-digit number" required value="${esc(UI.phone)}"></label><button class="btn btn-primary btn-large" style="width:100%">${t('send_otp')}</button></form>`
 :`<form data-form="p-verify"><div class="safe-note" style="margin:0 0 16px">OTP sent to +91 ${esc(UI.phone)} (demo)</div><label class="field">${t('otp')}<input name="otp" inputmode="numeric" maxlength="6" required autofocus></label><button class="btn btn-primary btn-large" style="width:100%">${t('verify')}</button><p class="auth-intro" style="text-align:center;margin:14px 0 0"><button type="button" class="btn btn-sm btn-outline" data-act="otp-back">Change number</button></p></form>`}
 <div class="demo-box"><b>Demo only.</b> OTP: ${OTP_DEMO}<br>${DB.patients.map(p=>`${p.phone} – ${esc(p.name)}`).join('<br>')}</div></div></section>`;
}
function routePatient(b,c,d){
 if(!me())return pagePatientLogin();
 if(!b)return pagePatientHome();
 if(b==='profile')return pagePatientProfile();
 if(b==='followup'&&c){const f=fu(c);if(!f||f.pid!==me().id)return notFound();return d?pageFollowupAction(f,d):pageFollowup(f)}
 if(b==='travel'&&c){const f=fu(c);if(!f||f.pid!==me().id)return notFound();return pageTravel(f)}
 return notFound();
}
function pagePatientHome(){
 const p=me(),L=DB.followups.filter(f=>f.pid===p.id),open=L.filter(f=>f.status==='pending').sort((a,b)=>a.due.localeCompare(b.due)),done=L.filter(f=>f.status!=='pending'),next=open[0],km=distKm(p);
 const late=open.some(f=>diffDays(f.due)<0),ms=DB.msgs.filter(m=>m.pid===p.id).slice(-3).reverse();
 const card=f=>`<a class="fu-card" href="#/patient/followup/${f.id}"><span class="due-pill ${dueCls(f)}">${dueText(f)}</span><h3>${esc(f.title)}</h3><p style="margin:0;color:#6d8187;font-size:13px">${esc(f.dept)} · ${esc(f.doctor)}</p><div class="pill-row"><span class="pill">📅 ${fmtDate(f.due)}</span><span class="pill">🕘 ${fmtTime(f.time)}</span>${f.confirmed?'<span class="pill" style="background:#e7f5ed;color:#317b59">Visit confirmed</span>':''}</div></a>`;
 return`<section class="dash"><div class="dash-top"><div><h1>${t('hello')}, ${esc(p.name)}</h1><p>${esc(p.area)} · ${esc(H.name)}</p></div><div class="actions"><a class="btn btn-outline" href="#/patient/profile">${t('profile')}</a><button class="btn btn-outline" data-act="logout">${t('logout')}</button></div></div>
 ${late?`<div class="alert">⚠️ ${t('overdue_alert')}</div>`:''}
 <div class="stats"><div class="stat-card"><span>${t('next_followup')}</span><strong style="font-size:20px">${next?fmtDate(next.due):'—'}</strong><small>${next?dueText(next):''}</small></div><div class="stat-card"><span>${t('your_followups')}</span><strong>${open.length}</strong><small>pending</small></div><div class="stat-card"><span>${t('distance')}</span><strong>${km} km</strong><small>approx. road distance from saved address</small></div><div class="stat-card"><span>${t('plan_travel')}</span><strong style="font-size:18px">GPS · Traffic · Rides</strong>${next?`<small><a href="#/patient/travel/${next.id}" style="font-weight:800">Open travel plan →</a></small>`:''}</div></div>
 <h2 style="margin:0 0 14px">${t('your_followups')}</h2>${open.length?`<div class="grid g2">${open.map(card).join('')}</div>`:'<div class="card empty-state">No pending follow-ups 🎉</div>'}
 ${ms.length?`<h2 style="margin:28px 0 14px">${t('msgs')}</h2><div class="card">${ms.map(m=>`<p style="margin-bottom:10px;color:#35575e">${esc(m.text)}<span class="sub">${m.ch} · ${fmtDT(m.at)}</span></p>`).join('')}</div>`:''}
 ${done.length?`<h2 style="margin:28px 0 14px">${t('history')}</h2><div class="grid g2">${done.map(card).join('')}</div>`:''}
 <div class="warn-note">${t('emergency')}</div></section>`;
}
function pagePatientProfile(){
 const p=me();
 return`<section class="auth-page"><div class="auth-card"><span class="auth-eyebrow">${t('profile').toUpperCase()}</span><h1>${t('profile')}</h1><p class="auth-intro">Correct details help the hospital reach you.</p>
 <form data-form="p-profile"><label class="field">Registered mobile<input value="${esc(p.phone)}" disabled></label><label class="field">Alternate mobile number (family / neighbour)<input name="alt" inputmode="numeric" maxlength="10" pattern="[0-9]{10}" value="${esc(p.altPhone)}" placeholder="Optional"></label><label class="field">Preferred language<select name="lang"><option value="en"${p.lang==='en'?' selected':''}>English</option><option value="hi"${p.lang==='hi'?' selected':''}>हिन्दी</option><option value="pa"${p.lang==='pa'?' selected':''}>ਪੰਜਾਬੀ</option></select></label><button class="btn btn-primary btn-large" style="width:100%">Save</button></form><p class="auth-intro" style="margin:16px 0 0"><a class="btn btn-sm btn-outline" href="#/patient">${t('back')}</a></p></div></section>`;
}
function stepper(f){
 const st=[['Visit',true],['Due',true],['Barrier found',f.barriers.length>0],['Support offered',f.planApproved],['Reminder',f.contacts.length>0||f.confirmed],['Care completed',f.status==='completed']];
 return`<div class="journey">${st.map((s,i)=>`<div class="j ${s[1]?'on':''}"><b>${s[1]?'✓':i+1}</b><span>${s[0]}</span></div>`).join('')}</div>`;
}
function pageFollowup(f){
 const msg=`Hospital follow-up: ${f.title} at ${H.name} on ${fmtDate(f.due)}, ${fmtTime(f.time)} (${f.dept}). Please help me reach on time.`;
 return`<div class="page"><a class="btn btn-sm btn-outline" href="#/patient">← ${t('back')}</a><h1 style="margin-top:16px">${esc(f.title)}</h1><span class="due-pill ${dueCls(f)}">${dueText(f)}</span>${stepper(f)}
 <div class="two"><div class="card"><h3>Appointment</h3><div class="kv"><b>${t('date')}</b><span>${fmtDate(f.due)}</span><b>${t('time')}</b><span>${fmtTime(f.time)}</span><b>${t('dept')}</b><span>${esc(f.dept)}</span><b>${t('doctor')}</b><span>${esc(f.doctor)}</span><b>Hospital</b><span>${esc(H.name)}, ${esc(H.city)}</span></div>
  <h3 style="margin-top:20px">${t('instructions')}</h3><p style="color:#35575e">${esc(f.instructions)}</p>
  ${f.docs.length?`<h3 style="margin-top:20px">${t('docs')}</h3>${f.docs.map((d,i)=>`<label class="check"><input type="checkbox" data-change="doc" data-id="${f.id}" data-i="${i}" ${f.docsReady.includes(i)?'checked':''}>${esc(d)}</label>`).join('')}`:''}
  ${f.reschedReq?`<div class="warn-note">Reschedule requested for ${fmtDate(f.reschedReq.date)} — waiting for hospital staff to confirm.</div>`:''}</div>
 <div class="card"><h3>What would you like to do?</h3><div class="grid" style="margin-top:12px">
  ${f.status==='pending'?`<button class="btn btn-primary" data-act="p-confirm" data-id="${f.id}" ${f.confirmed?'disabled':''}>${f.confirmed?'✓ Visit confirmed':t('confirm')}</button>
  <a class="btn btn-outline" href="#/patient/travel/${f.id}">📍 ${t('plan_travel')}</a>
  <a class="btn btn-outline" href="#/patient/followup/${f.id}/reschedule">${t('reschedule')}</a>
  <a class="btn btn-outline" href="#/patient/followup/${f.id}/barrier">${t('barrier')}</a>
  <a class="btn btn-outline" href="#/patient/followup/${f.id}/assist">${t('assist')}</a>`:`<p style="color:#6d8187;font-size:13px">Outcome: ${esc(f.outcome||'')}</p>`}
  <a class="btn btn-outline" target="_blank" rel="noopener" href="https://wa.me/?text=${encodeURIComponent(msg)}">Share with family on WhatsApp</a></div>
  <div class="warn-note" style="margin-top:16px">${t('emergency')}</div></div></div></div>`;
}
function pageFollowupAction(f,kind){
 const back=`<p class="auth-intro" style="margin:16px 0 0"><a class="btn btn-sm btn-outline" href="#/patient/followup/${f.id}">${t('back')}</a></p>`;
 if(kind==='reschedule')return`<section class="auth-page"><div class="auth-card"><span class="auth-eyebrow">RESCHEDULE</span><h1>${t('reschedule')}</h1><p class="auth-intro">${esc(f.title)} — currently ${fmtDate(f.due)}. Staff will confirm the new date with you.</p><form data-form="p-resched" data-id="${f.id}"><label class="field">Preferred new date<input type="date" name="date" min="${plusDays(1)}" required></label><label class="field">Reason<select name="reason"><option>Cannot travel on that day</option><option>No one to accompany me</option><option>Not feeling well enough to travel</option><option>Other</option></select></label><button class="btn btn-primary btn-large" style="width:100%">Send request</button></form>${back}</div></section>`;
 if(kind==='barrier')return`<section class="auth-page"><div class="auth-card"><span class="auth-eyebrow">TELL US WHAT IS STOPPING YOU</span><h1>${t('barrier')}</h1><p class="auth-intro">This helps the hospital offer the right support. It is not a medical report.</p><form data-form="p-barrier" data-id="${f.id}">${BARRIERS.filter(b=>b!=='Needs escort / wheelchair').map(b=>`<label class="check"><input type="checkbox" name="b" value="${b}">${b}</label>`).join('')}<label class="field">Anything else (optional)<textarea name="note" rows="2"></textarea></label><button class="btn btn-primary btn-large" style="width:100%">Send to hospital team</button></form>${back}</div></section>`;
 if(kind==='assist')return`<section class="auth-page"><div class="auth-card"><span class="auth-eyebrow">HELP AT HOSPITAL</span><h1>${t('assist')}</h1><p class="auth-intro">Our ward staff will be ready when you arrive on ${fmtDate(f.due)}.</p><form data-form="p-assist" data-id="${f.id}"><label class="check"><input type="checkbox" name="a" value="wheel">Wheelchair + escort at arrival</label><label class="check"><input type="checkbox" name="a" value="lang">Someone who speaks my language</label><label class="check"><input type="checkbox" name="a" value="call">Please call me back</label><button class="btn btn-primary btn-large" style="width:100%">Request help</button></form>${back}</div></section>`;
 return notFound();
}

/* ---- Travel: GPS, traffic, rides, ambulance ---- */
function traffic(h){if((h>=8&&h<11)||(h>=17&&h<20))return{label:'Heavy',mult:1.6,cls:'high'};if((h>=7&&h<8)||(h>=11&&h<17)||(h>=20&&h<21))return{label:'Moderate',mult:1.25,cls:'medium'};return{label:'Light',mult:1,cls:'low'}}
const RIDES=[
 {k:'bike',name:'Rapido Bike taxi',icon:'🏍️',base:20,perKm:8,note:'1 person · quickest in traffic · not for patients who cannot sit upright'},
 {k:'auto',name:'Rapido Auto',icon:'🛺',base:30,perKm:13,note:'Up to 3 · patient + attendant'},
 {k:'cab',name:'Rapido Cab',icon:'🚕',base:60,perKm:16,note:'Up to 4 · comfortable for elderly patients'},
 {k:'amb',name:'Private ambulance (non-emergency transfer)',icon:'🚑',base:700,perKm:25,note:'Stretcher / wheelchair access · availability through partner operator, 24×7'}];
function pageTravel(f){
 const p=me(),o=GEO?{lat:GEO.lat,lng:GEO.lng,label:'Your live GPS location'+(GEO.acc?' (±'+GEO.acc+' m)':'')}:{lat:p.lat,lng:p.lng,label:'Saved address – '+p.area};
 const km=roadKm(o.lat,o.lng),now=traffic(new Date().getHours()),apt=traffic(parseInt(f.time)),eta=m=>Math.max(5,Math.round(km/30*60*m));
 const apMin=parseInt(f.time)*60+parseInt(f.time.split(':')[1]),leave=apMin-eta(apt.mult)-30;
 const fare=r=>{const e=(r.base+r.perKm*km)*(1+(now.mult-1)*.2)*(UI.round?2:1);return'₹'+Math.round(e*.9/5)*5+' – ₹'+Math.round(e*1.15/5)*5};
 const gm=`https://www.google.com/maps/dir/?api=1&origin=${o.lat},${o.lng}&destination=${H.lat},${H.lng}&travelmode=driving`;
 const emb=`https://maps.google.com/maps?saddr=${o.lat},${o.lng}&daddr=${H.lat},${H.lng}&output=embed`;
 return`<div class="page"><a class="btn btn-sm btn-outline" href="#/patient/followup/${f.id}">← ${t('back')}</a><h1 style="margin-top:16px">${t('plan_travel')}</h1><p class="lead">${esc(f.title)} · ${fmtDate(f.due)}, ${fmtTime(f.time)} · ${esc(H.name)}</p>
 <div class="stats"><div class="stat-card"><span>${t('distance')}</span><strong>${km} km</strong><small>approx. by road</small></div><div class="stat-card"><span>Travel time now</span><strong>${eta(now.mult)} min</strong><small>${now.label} traffic (estimate)</small></div><div class="stat-card"><span>Traffic at appointment time</span><strong><span class="risk ${apt.cls}">${apt.label}</span></strong><small>typical daily pattern</small></div><div class="stat-card"><span>Suggested leave-by</span><strong style="font-size:22px">${fmtMin(leave)}</strong><small>includes 30 min for registration</small></div></div>
 <div class="two"><div class="card"><h3>📍 Route from your location</h3><p style="margin-bottom:12px">Starting point: <b>${esc(o.label)}</b></p><div class="actions" style="margin-bottom:14px"><button class="btn btn-primary" data-act="gps">${UI.geoMsg||'Connect to my GPS'}</button><a class="btn btn-outline" target="_blank" rel="noopener" href="${gm}">Open live traffic in Google Maps ↗</a></div><iframe class="map" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="${emb}" title="Route to hospital"></iframe><p style="margin-top:10px;font-size:11.5px;color:#8a9a9e">Traffic level above is an estimate from time of day. Tap “Open live traffic” for real-time traffic and exact ETA from Google Maps.</p></div>
 <div class="card"><h3>🚑 Emergency</h3><p style="margin-bottom:12px">For an emergency, do not wait for a ride app. Call the free government ambulance.</p><div class="actions"><a class="btn btn-danger" href="tel:108">Call 108</a><a class="btn btn-outline" href="tel:112">Call 112</a></div><div class="warn-note">This portal gives travel help only — no medical advice.</div></div></div>
 <div class="card" style="margin-top:20px"><div class="case-head" style="padding:0 0 14px;border:0"><h3>Rides & ambulance — estimated cost to ${esc(H.name)}</h3><label class="check" style="margin:0"><input type="checkbox" data-change="round" ${UI.round?'checked':''}>Include return trip</label></div>
 ${RIDES.map(r=>`<div class="ride"><i>${r.icon}</i><div><b>${r.name}</b><small>${r.note}</small></div><div><span class="fare">${fare(r)}</span><small style="display:block">~${Math.round(eta(now.mult)*(r.k==='bike'?.8:1))} min · estimate</small></div><div class="actions"><a class="btn btn-sm btn-primary" target="_blank" rel="noopener" href="https://www.rapido.bike/">${r.k==='amb'?'Find ambulance':'Open Rapido'}</a><button class="btn btn-sm btn-outline" data-act="req-transport" data-id="${f.id}" data-ride="${esc(r.name)}">Ask hospital to arrange</button></div></div>`).join('')}
 <p style="margin-top:12px;font-size:11.5px;color:#8a9a9e">Fares are estimates (base + per-km, adjusted for traffic). The final fare is shown by the ride provider. Government ambulance 108 is free for emergencies.</p></div></div>`;
}

/* ================= HOSPITAL ADMINISTRATION ================= */
function pageRolePicker(){
 return`<div class="page"><h1>${t('hospital_admin')}</h1><p class="lead">Choose your role to continue. Each role sees only what it needs.</p>
 ${['Doctor','Staff','Administration'].map(g=>`<h3 style="margin:22px 0 12px">${g}</h3><div class="grid g3">${Object.entries(ROLES).filter(([k,r])=>r.group===g).map(([k,r])=>`<a class="fu-card" href="#/admin/login/${k}"><div style="font-size:30px;margin-bottom:10px">${r.icon}</div><h3>${r.label}</h3><p style="margin:0;color:#6d8187;font-size:12.5px;line-height:1.7">${r.desc}</p></a>`).join('')}</div>`).join('')}</div>`;
}
function pageStaffLogin(role){
 const r=ROLES[role],ex=STAFF.filter(s=>s.role===role);
 return`<section class="auth-page"><div class="auth-card"><span class="auth-eyebrow">${r.label.toUpperCase()}</span><h1>${r.icon} ${t('login')}</h1><p class="auth-intro">${r.desc}</p>
 <form data-form="s-login" data-role="${role}"><label class="field">${t('staff_id')}<input name="id" required autocomplete="username"></label><label class="field">${t('password')}<input type="password" name="pw" required autocomplete="current-password"></label><button class="btn btn-primary btn-large" style="width:100%">${t('login')}</button></form>
 <div class="demo-box"><b>Demo credentials</b><br>${ex.map(s=>`${s.id} / ${s.pw} – ${esc(s.name)}`).join('<br>')}</div><p class="auth-intro" style="margin:16px 0 0"><a class="btn btn-sm btn-outline" href="#/admin">${t('back')}</a></p></div></section>`;
}
function adminNav(u){
 const M={doctor:[['#/admin','Dashboard'],['#/admin/ward','Ward / admitted'],['#/admin/ai','AI review']],coordinator:[['#/admin','Dashboard'],['#/admin/analytics','Analytics'],['#/admin/messages','Messages'],['#/admin/ai','AI review']],nurse:[['#/admin','Ward patients']],pharmacist:[['#/admin','Prescriptions']],admin:[['#/admin','Overview'],['#/admin/analytics','Analytics'],['#/admin/ai','AI review'],['#/admin/audit','Audit log & AI feedback']],ward:[]}[u.role];
 if(!M.length)return'';
 const cur=location.hash||'';
 return`<div class="subnav">${M.map(x=>`<a href="${x[0]}" class="${cur===x[0]||(x[0]!=='#/admin'&&cur.startsWith(x[0]))?'on':''}">${x[1]}</a>`).join('')}</div>`;
}
function routeAdmin(b,c){
 const u=staff();
 if(!u){if(b==='login'&&c&&ROLES[c])return pageStaffLogin(c);return pageRolePicker()}
 let body;
 if(!b)body=pageDash(u);
 else if(b==='case'&&c)body=pageCase(u,c);
 else if(b==='patient'&&c)body=pagePatientRecord(u,c);
 else if(b==='new')body=['doctor','coordinator'].includes(u.role)?pageNewPlan(u):deny();
 else if(b==='ai')body=c?pageAIReview(u,c):pageAIList(u);
 else if(b==='ward')body=c?pageAdmission(u,c):pageWard(u);
 else if(b==='admit'&&c)body=pageAdmit(u,c);
 else if(b==='rx'&&c)body=pageNewRx(u,c);
 else if(b==='pharmacy'&&c)body=pagePharmPatient(u,c);
 else if(b==='analytics')body=['coordinator','admin'].includes(u.role)?pageAnalytics(u):deny();
 else if(b==='messages')body=u.role==='coordinator'?pageMessages(u):deny();
 else if(b==='audit')body=u.role==='admin'?pageAudit(u):deny();
 else body=notFound();
 return adminNav(u)+body;
}
const stat=(l,v,s)=>`<div class="stat-card"><span>${l}</span><strong>${v}</strong><small>${s||''}</small></div>`;
function dashTop(u){
 return`<div class="dash-top"><div><h1>${ROLES[u.role].icon} ${esc(u.name)}</h1><p>${ROLES[u.role].label} · ${esc(u.dept)} · ${esc(H.name)}</p></div><div class="actions"><span class="demo-tag">DEMO DATA</span>${['doctor','coordinator'].includes(u.role)?'<a class="btn btn-primary" href="#/admin/new">+ New follow-up plan</a>':''}<button class="btn btn-outline" data-act="logout">${t('logout')}</button></div></div>`;
}
const sugCard=(s,u)=>{
 const p=pt(s.pid),mine=u&&s.requires.includes(u.role)&&!s.approvals[u.role]&&s.status==='pending';
 return`<div class="sug ${s.status!=='pending'?'done':''}"><div class="sug-top"><span class="tag">🤖 ${TYPEL[s.type]}</span><span class="risk ${s.strength>=60?'high':s.strength>=40?'medium':'low'}">Signal ${s.strength}</span></div>
 <h3>${esc(s.title)}</h3><p class="sub" style="margin:0 0 6px">${u&&u.role==='admin'?'Patient '+esc(p.id):esc(p.name)+' · '+p.age+' yrs'}</p><p>${esc(s.detail)}</p>
 <div>${s.requires.map(r=>{const a=s.approvals[r];return a?`<span class="chip ${a.decision==='reject'?'bad':'ok'}">${a.decision==='reject'?'✗':'✓'} ${ROLEL[r]}: ${esc(a.by)}</span>`:`<span class="chip">⏳ ${ROLEL[r]} pending</span>`}).join('')}<span class="chip ${s.status==='approved'?'ok':s.status==='rejected'?'bad':''}">Status: ${s.status}</span></div>
 <a class="btn btn-sm ${mine?'btn-primary':'btn-outline'}" style="margin-top:10px" href="#/admin/ai/${s.id}">${mine?'Review & decide':'View'}</a></div>`;
};

/* ---- case table (follow-ups) ---- */
function caseTable(rows,title){
 if(!rows.length)return'<div class="case-card"><div class="empty-state">No follow-ups to show.</div></div>';
 return`<div class="case-card"><div class="case-head"><h3>${title||'Follow-up cases'}</h3><div class="filters"><input data-filter="q" placeholder="Search patient, department…"><select data-filter="r"><option value="">All risk</option><option value="high">High</option><option value="medium">Medium</option><option value="low">Low</option></select><select data-filter="s"><option value="">All status</option>${['Overdue','Due today','Upcoming','Confirmed','Reschedule requested','Completed','Closed'].map(s=>`<option>${s}</option>`).join('')}</select></div></div>
 <div class="table-wrap"><table id="cases"><thead><tr><th>Patient</th><th>Follow-up</th><th>Due</th><th>Distance</th><th>Risk (administrative)</th><th>Status</th><th>Last contact</th><th></th></tr></thead><tbody>
 ${rows.map(({f,p,r,st})=>{const lc=f.contacts.slice(-1)[0];return`<tr data-q="${esc((p.name+' '+f.title+' '+f.dept+' '+p.area).toLowerCase())}" data-r="${r.level}" data-s="${st.label}"><td><b>${esc(p.name)}</b><span class="sub">${p.age} yrs · ${esc(p.area)}</span></td><td>${esc(f.title)}<span class="sub">${esc(f.dept)} · ${esc(f.doctor)}</span></td><td>${fmtDate(f.due)}<span class="sub">${dueText(f)}</span></td><td>${distKm(p)} km</td><td>${f.status==='pending'?`<span class="risk ${r.level}">${r.level.toUpperCase()} · ${r.score}</span>`:'—'}</td><td><span class="status ${st.cls}">${st.label}</span></td><td>${lc?esc(lc.result)+`<span class="sub">${fmtDate(lc.date)}</span>`:'<span class="sub">No attempt yet</span>'}</td><td><a class="btn btn-sm btn-outline" href="#/admin/case/${f.id}">Open</a></td></tr>`}).join('')}</tbody></table></div></div>`;
}
function applyFilters(){
 const q=($('[data-filter=q]')||{}).value||'',r=($('[data-filter=r]')||{}).value||'',s=($('[data-filter=s]')||{}).value||'';
 document.querySelectorAll('#cases tbody tr').forEach(tr=>{tr.hidden=!((!q||tr.dataset.q.includes(q.toLowerCase()))&&(!r||tr.dataset.r===r)&&(!s||tr.dataset.s===s))});
}

/* ---- analytics (coordinator / admin) ---- */
function analyticsBlock(full){
 const all=cases(),open=all.filter(c=>c.f.status==='pending'),W=DB.weekly,rate=W.map(w=>Math.round(w.done/w.sched*100)),lab=W.map(w=>w.w);
 const sc={},bc={},oc={},md={};
 all.forEach(c=>{sc[c.st.label]=(sc[c.st.label]||0)+1});
 open.forEach(c=>c.f.barriers.forEach(b=>{bc[b]=(bc[b]||0)+1}));
 DB.followups.flatMap(f=>f.contacts).filter(c=>c.by!=='Patient (portal)').forEach(c=>{oc[c.result]=(oc[c.result]||0)+1;md[c.mode]=(md[c.mode]||0)+1});
 const sorted=o=>Object.entries(o).sort((a,b)=>b[1]-a[1]);
 let h=`<div class="grid g2" style="margin-bottom:20px"><div class="card"><h3>Follow-up completion rate (weekly, %)</h3>${lineSVG([{name:'Completion %',data:rate}],lab,{refs:[{v:90,l:'target 90%'}],title:'Weekly completion rate'})}<p class="sub">Earlier weeks are sample history until real data is connected. “This” week is partial.</p></div>
 <div class="card"><h3>Barriers among open cases</h3>${hbars(sorted(bc))}</div></div>`;
 if(full)h+=`<div class="grid g2" style="margin-bottom:20px"><div class="card"><h3>Scheduled vs completed visits (weekly)</h3>${lineSVG([{name:'Scheduled',data:W.map(w=>w.sched),color:'#2b6cb0'},{name:'Completed',data:W.map(w=>w.done),color:'#168c88'}],lab,{title:'Scheduled vs completed'})}</div>
 <div class="card"><h3>Current follow-up status</h3>${hbars(sorted(sc))}</div>
 <div class="card"><h3>Contact outcomes</h3>${hbars(sorted(oc))}</div>
 <div class="card"><h3>Contact channels used</h3>${hbars(sorted(md))}<h3 style="margin-top:18px">Messages sent</h3><p class="big-stat" style="font-size:30px">${DB.msgs.length}</p></div>
 <div class="card"><h3>AI suggestions – human acceptance rate</h3>${Object.keys(TYPEL).map(k=>`<div class="kv" style="margin-bottom:6px"><b>${TYPEL[k]}</b><span>${aiRate(k)}</span></div>`).join('')}</div></div>`;
 return h;
}
function pageAnalytics(u){return`<section class="dash"><div class="dash-top"><div><h1>Follow-up analytics</h1><p>Completion, barriers, contact results and AI acceptance. No clinical data is shown here.</p></div></div>${analyticsBlock(true)}</section>`}

/* ---- dashboards ---- */
function pageDash(u){
 if(u.role==='nurse')return pageWard(u);
 if(u.role==='pharmacist')return pagePharmacy(u);
 let inner='';
 if(u.role==='doctor')inner=docDash(u);
 else if(u.role==='coordinator')inner=coordDash(u);
 else if(u.role==='ward')inner=wardView();
 else inner=adminDash(u);
 return`<section class="dash">${dashTop(u)}${inner}<div class="warn-note">AI suggests; people decide. Risk scores show follow-up completion risk, not clinical urgency.</div></section>`;
}
function docDash(u){
 const mine=myPatients(u),ads=DB.admissions.filter(a=>a.status==='admitted'&&a.doctor===u.name);
 const fl=cases().filter(c=>c.f.doctor===u.name),open=fl.filter(c=>c.f.status==='pending');
 const waiting=visibleAI(u).filter(s=>s.status==='pending'&&!s.approvals.doctor);
 const alerts=ads.flatMap(a=>a.notes.map((n,i)=>({a,n,i})).filter(x=>x.n.esc&&!x.n.resolved));
 return`<div class="stats">${stat('My patients',mine.length,'with records')}${stat('Admitted',ads.length,'under my care')}${stat('Waiting for my AI decision',waiting.length,'review & approve')}${stat('Nurse alerts',alerts.length,'need attention')}</div>
 ${alerts.length?`<div class="card" style="margin-bottom:20px;border-color:#f0c5b9"><h3>🔔 Nurse alerts</h3>${alerts.map(({a,n,i})=>`<div class="reason" style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;align-items:center"><span><b>${esc(pt(a.pid).name)}</b> (${esc(a.bed)}): ${esc(n.text)} <span class="sub">${esc(n.by)} · ${fmtDT(n.at)}</span></span><span class="actions"><a class="btn btn-sm btn-outline" href="#/admin/ward/${a.id}">Open chart</a><button class="btn btn-sm btn-dark" data-act="a-resolve" data-aid="${a.id}" data-i="${i}">Mark reviewed</button></span></div>`).join('')}</div>`:''}
 ${waiting.length?`<h2 class="sec-title">🤖 AI suggestions waiting for you</h2>${waiting.map(s=>sugCard(s,u)).join('')}`:''}
 <div class="case-card"><div class="case-head"><h3>My patients</h3><select class="lang" data-change="openpt"><option value="">Open another patient…</option>${DB.patients.map(p=>`<option value="${p.id}">${esc(p.name)} (${p.age}, ${p.sex})</option>`).join('')}</select></div><div class="table-wrap"><table><thead><tr><th>Patient</th><th>Latest diagnosis</th><th>Last BP</th><th>Follow-up consistency</th><th>Open follow-ups</th><th></th></tr></thead><tbody>
 ${mine.map(p=>{const b=p.vitals.filter(v=>v.sys!=null).slice(-1)[0],d=p.dx[p.dx.length-1];return`<tr><td><b>${esc(p.name)}</b><span class="sub">${p.age} yrs · ${p.sex}${DB.admissions.some(a=>a.pid===p.id&&a.status==='admitted')?' · <b style="color:#c14e35">Admitted</b>':''}</span></td><td>${d?esc(d.text):'—'}</td><td>${b?b.sys+'/'+b.dia:'—'}</td><td>${consBadge(p)}</td><td>${DB.followups.filter(f=>f.pid===p.id&&f.status==='pending').length}</td><td><a class="btn btn-sm btn-primary" href="#/admin/patient/${p.id}">Open record</a></td></tr>`}).join('')}</tbody></table></div></div>
 ${ads.length?`<div class="case-card"><div class="case-head"><h3>Admitted under me</h3><a class="btn btn-sm btn-outline" href="#/admin/ward">Ward overview</a></div><div class="table-wrap"><table><thead><tr><th>Patient</th><th>Bed</th><th>Reason</th><th>Overdue checks</th><th></th></tr></thead><tbody>${ads.map(a=>{const od=overdueOf(a).length;return`<tr><td><b>${esc(pt(a.pid).name)}</b></td><td>${esc(a.ward)} · ${esc(a.bed)}</td><td>${esc(a.reason)}</td><td>${od?`<span class="risk high">${od} overdue</span>`:'<span class="risk low">On time</span>'}</td><td><a class="btn btn-sm btn-outline" href="#/admin/ward/${a.id}">Open chart</a></td></tr>`}).join('')}</tbody></table></div></div>`:''}
 ${caseTable(fl,'Follow-up cases of my patients')}`;
}
function coordDash(u){
 const all=cases(),open=all.filter(c=>c.f.status==='pending'),waiting=visibleAI(u).filter(s=>s.status==='pending'&&!s.approvals.coordinator);
 return`<div class="stats">${stat('Open follow-ups',open.length,'pending')}${stat('Overdue',open.filter(c=>c.d<0).length,'need action today')}${stat('High risk',open.filter(c=>c.r.level==='high').length,'administrative risk')}${stat('AI waiting for me',waiting.length,'review & approve')}</div>
 ${waiting.length?`<h2 class="sec-title">🤖 AI suggestions waiting for you</h2>${waiting.map(s=>sugCard(s,u)).join('')}`:''}
 ${analyticsBlock(false)}${caseTable(open,'Priority call list (highest risk first)')}`;
}
function wardView(){
 const tasks=DB.tasks;
 return`<div class="warn-note" style="margin:0 0 18px">🔒 For patient privacy you only see a token, initials and the task. Diagnosis, phone number and records are not available to this role.</div>
 <div class="stats">${stat('Open tasks',tasks.filter(x=>x.status==='open').length,'assistance')}${stat('Completed',tasks.filter(x=>x.status==='done').length,'')}${stat('Wheelchair requests',tasks.filter(x=>x.status==='open'&&/Wheelchair/.test(x.type)).length,'')}${stat('Language help',tasks.filter(x=>x.status==='open'&&pt(x.pid).lang!=='en').length,'non-English')}</div>
 <div class="case-card"><div class="case-head"><h3>Assistance tasks</h3></div><div class="table-wrap"><table><thead><tr><th>Token</th><th>Patient</th><th>Task</th><th>From → To</th><th>When</th><th>Language</th><th>Status</th><th></th></tr></thead><tbody>${tasks.map(k=>{const p=pt(k.pid);return`<tr><td><b>${token(p.id)}</b></td><td>${esc(initials(p.name))}</td><td>${esc(k.type)}</td><td>${esc(k.from)} → ${esc(k.to)}</td><td>${esc(k.when)}</td><td>${LNAME[p.lang]}</td><td><span class="status ${k.status==='done'?'Completed':''}">${k.status==='done'?'Done':'Open'}</span></td><td>${k.status==='open'?`<button class="btn btn-sm btn-primary" data-act="task-done" data-id="${k.id}">Mark done</button>`:''}</td></tr>`}).join('')}</tbody></table></div></div>`;
}
function adminDash(u){
 const all=cases(),open=all.filter(c=>c.f.status==='pending'),att=DB.followups.flatMap(f=>f.contacts).filter(c=>c.by!=='Patient (portal)'),ok=att.filter(c=>/^(Answered|SMS delivered|WhatsApp)/.test(c.result)).length;
 const bc={};open.forEach(c=>c.f.barriers.forEach(b=>{bc[b]=(bc[b]||0)+1}));
 const ai=DB.ai;
 return`<div class="stats">${stat('Open follow-ups',open.length,'pending')}${stat('Overdue',open.filter(c=>c.d<0).length,'need action')}${stat('Contact success',att.length?Math.round(ok/att.length*100)+'%':'—',att.length+' attempts logged')}${stat('Admitted patients',DB.admissions.filter(a=>a.status==='admitted').length,'in wards')}</div>
 <div class="grid g2" style="margin-bottom:22px"><div class="card"><h3>Barriers among open cases</h3>${hbars(Object.entries(bc).sort((a,b)=>b[1]-a[1]))}</div>
 <div class="card"><h3>Workload & AI review</h3><div class="kv"><b>Open ward tasks</b><span>${DB.tasks.filter(x=>x.status==='open').length}</span><b>Messages sent</b><span>${DB.msgs.length}</span><b>AI suggestions</b><span>${ai.length} (${ai.filter(s=>s.status==='pending').length} pending)</span><b>AI approved / rejected</b><span>${ai.filter(s=>s.status==='approved').length} / ${ai.filter(s=>s.status==='rejected').length}</span><b>Feedback records</b><span>${DB.fb.length}</span></div></div></div>${caseTable(all)}`;
}

/* ---- AI review pages ---- */
function pageAIList(u){
 if(!['doctor','coordinator','admin'].includes(u.role))return deny();
 const L=visibleAI(u).slice().reverse(),canAct=u.role!=='admin';
 const wait=L.filter(s=>s.status==='pending'&&canAct&&!s.approvals[u.role]),oth=L.filter(s=>s.status==='pending'&&!wait.includes(s)),dec=L.filter(s=>s.status!=='pending');
 return`<section class="dash"><div class="dash-top"><div><h1>🤖 AI suggestions – human review</h1><p>AI only suggests. Nothing changes in the portal until the required people approve. You can approve, edit then approve, or reject with a reason – every choice becomes training feedback.</p></div></div>
 <div class="safe-note" style="margin:0 0 20px"><b>Who approves what:</b> Follow-up date changes → Doctor + Coordinator · Patient messages & assistance → Coordinator · Clinical notes & ward orders → Doctor. If one reviewer edits a suggestion, the other must approve it again.</div>
 ${canAct?`<h2 class="sec-title" style="margin-top:0">Waiting for you (${wait.length})</h2>${wait.map(s=>sugCard(s,u)).join('')||'<div class="card empty-state">Nothing waiting for you.</div>'}`:''}
 <h2 class="sec-title">Waiting for others (${oth.length})</h2>${oth.map(s=>sugCard(s,u)).join('')||'<div class="card empty-state">None.</div>'}
 <h2 class="sec-title">Decided (${dec.length})</h2>${dec.map(s=>sugCard(s,u)).join('')||'<div class="card empty-state">No decisions yet.</div>'}</section>`;
}
function pageAIReview(u,id){
 const s=DB.ai.find(a=>a.id===id);
 if(!s||!visibleAI(u).includes(s))return s?deny():notFound();
 const p=pt(s.pid),mine=s.requires.includes(u.role)&&!s.approvals[u.role]&&s.status==='pending';
 const fields=s.type==='expedite'?`<label class="field">New follow-up date<input type="date" name="date" min="${plusDays(0)}" value="${s.payload.date}"></label>`:(s.type==='sms'||s.type==='note')?`<label class="field">${s.type==='sms'?'Message to the patient':'Note that will be added to the record'}<textarea name="text" rows="5">${esc(s.payload.text)}</textarea></label>`:s.type==='order'?`<label class="field">Order<input name="title" value="${esc(s.payload.title)}"></label><label class="field">Due in (minutes)<input type="number" name="inMin" min="5" value="${s.payload.inMin||15}"></label>`:'<p class="sub">No editable fields.</p>';
 return`<section class="dash"><a class="btn btn-sm btn-outline" href="#/admin/ai">← All AI suggestions</a>
 <div class="dash-top" style="margin-top:16px"><div><h1>${esc(s.title)}</h1><p>${TYPEL[s.type]} · ${u.role==='admin'?'Patient '+esc(p.id):esc(p.name)+', '+p.age+' yrs'} · suggested ${fmtDT(s.at)}</p></div><span class="chip ${s.status==='approved'?'ok':s.status==='rejected'?'bad':''}">Status: ${s.status}</span></div>
 <div class="two"><div><div class="card" style="margin-bottom:20px"><h3>What the AI noticed</h3><p style="margin-bottom:10px">${esc(s.detail)}</p>${s.reasons.map(r=>`<div class="reason">${esc(r)}</div>`).join('')}<p class="sub" style="margin-top:8px">Signal strength ${s.strength}/100 (rule-based placeholder; will be replaced by the trained model). Past acceptance for this type: ${aiRate(s.type)}.</p></div>
 <div class="card"><h3>Proposed action</h3><div class="action-i">${esc(payloadText(s))}</div><p style="margin-top:12px">${s.requires.map(r=>{const a=s.approvals[r];return a?`<span class="chip ${a.decision==='reject'?'bad':'ok'}">${a.decision==='reject'?'✗ Rejected':a.decision==='modify'?'✓ Edited & approved':'✓ Approved'} – ${ROLEL[r]}: ${esc(a.by)} (${fmtDT(a.at)})${a.note?' – '+esc(a.note):''}</span>`:`<span class="chip">⏳ ${ROLEL[r]} pending</span>`}).join('')}</p></div></div>
 <div class="card">${mine?`<h3>Your decision as ${ROLEL[u.role]}</h3><form data-form="ai-review" data-id="${s.id}" style="margin-top:12px"><div class="radio-row"><label class="check"><input type="radio" name="dec" value="approve" checked>Approve as suggested</label><label class="check"><input type="radio" name="dec" value="modify">Edit and approve (other reviewer must re-approve)</label><label class="check"><input type="radio" name="dec" value="reject">Reject (reason required)</label></div>${fields}<label class="field">Note / reason (required for edit or reject)<textarea name="note" rows="2"></textarea></label><button class="btn btn-primary btn-large" style="width:100%">Submit decision</button></form>`:`<h3>Review status</h3><p>${s.status==='pending'?'You have no action here. Waiting for: '+s.requires.filter(r=>!s.approvals[r]).map(r=>ROLEL[r]).join(', ')+'.':'This suggestion is closed. The decision and your team’s feedback were saved.'}</p>`}
 <div class="warn-note">The action is applied only after <b>all required reviewers</b> approve. A rejection stops it and is saved as feedback for model training.</div></div></div></section>`;
}

/* ---- follow-up case (coordinator / doctor / admin) ---- */
function pageCase(u,id){
 if(!['doctor','coordinator','admin'].includes(u.role))return deny();
 const f=fu(id);if(!f)return notFound();
 const p=pt(f.pid),r=riskOf(f),st=statusOf(f),open=f.status==='pending',isDoc=u.role==='doctor',canAct=u.role!=='admin';
 const sugs=DB.ai.filter(a=>a.fid===f.id&&visibleAI(u).includes(a));
 return`<section class="dash"><a class="btn btn-sm btn-outline" href="#/admin">← Dashboard</a>
 <div class="dash-top" style="margin-top:16px"><div><h1>${esc(p.name)} — ${esc(f.title)}</h1><p>${esc(f.dept)} · ${esc(f.doctor)} · Due ${fmtDate(f.due)}, ${fmtTime(f.time)}</p></div><div class="actions"><span class="status ${st.cls}">${st.label}</span>${open?`<span class="risk ${r.level}">${r.level.toUpperCase()} · ${r.score}</span>`:''}${isDoc?`<a class="btn btn-sm btn-primary" href="#/admin/patient/${p.id}">Open clinical record</a>`:''}</div></div>
 <div class="card" style="margin-bottom:20px"><h3>Care journey</h3>${stepper(f)}</div>
 <div class="two"><div>
  <div class="card" style="margin-bottom:20px"><h3>Patient & plan</h3><div class="kv"><b>Patient</b><span>${esc(p.name)}, ${p.age} yrs</span><b>Phone</b><span>${esc(p.phone)}${p.sharedPhone?' <span class="pill">Shared phone</span>':''}${p.altPhone?' · Alt: '+esc(p.altPhone):''}</span><b>Language</b><span>${LNAME[p.lang]}</span><b>Area / distance</b><span>${esc(p.area)} · ${distKm(p)} km</span><b>Earlier missed</b><span>${p.missedBefore}</span><b>Instructions</b><span>${esc(f.instructions)}</span><b>Documents</b><span>${f.docs.map(esc).join(', ')||'—'}</span><b>Barriers</b><span>${f.barriers.length?f.barriers.map(b=>`<span class="pill">${esc(b)}</span>`).join(' '):'None recorded'}</span><b>Plan approval</b><span>${f.planApproved?'✓ Approved by '+esc(f.planApprovedBy):'Pending staff approval'}</span>${f.callback?'<b>Callback</b><span>Patient asked for a callback</span>':''}${isDoc&&f.note?'<b>Doctor note</b><span>'+esc(f.note)+'</span>':''}</div></div>
  ${f.reschedReq?`<div class="card" style="margin-bottom:20px"><h3>Reschedule request</h3><p>Patient asked for <b>${fmtDate(f.reschedReq.date)}</b> — ${esc(f.reschedReq.reason)}</p>${canAct?`<div class="actions" style="margin-top:12px"><button class="btn btn-primary btn-sm" data-act="resched-ok" data-id="${f.id}">Approve new date</button><button class="btn btn-outline btn-sm" data-act="resched-no" data-id="${f.id}">Decline</button></div>`:''}</div>`:''}
  <div class="card" style="margin-bottom:20px"><h3>Contact log</h3><div class="log" style="margin-top:14px">${f.contacts.length?f.contacts.map(c=>`<div><b>${esc(c.mode)} – ${esc(c.result)}</b>${c.note?'<br>'+esc(c.note):''}<small>${fmtDate(c.date)} · ${esc(c.by)}</small></div>`).join(''):'<div>No contact attempts yet.</div>'}</div>
  ${open&&canAct?`<form data-form="c-contact" data-id="${f.id}"><div class="grid g2"><label class="field">Mode<select name="mode"><option>Call</option><option>SMS</option><option>WhatsApp</option><option>Home / ASHA visit</option></select></label><label class="field">Result<select name="result">${CONTACT_RESULTS.map(x=>`<option>${x}</option>`).join('')}</select></label></div><label class="field">Note<input name="note" placeholder="Optional"></label><button class="btn btn-primary btn-sm">Add to log</button></form>`:''}</div>
  ${open&&u.role==='coordinator'?`<div class="card"><h3>Send SMS / WhatsApp</h3><p class="sub" style="margin:4px 0 12px">${p.sharedPhone?'🔒 Shared phone: a privacy-safe message with no health details is used.':'Message is prepared in the patient’s language ('+LNAME[p.lang]+'). You can edit it.'}</p><form data-form="c-msg" data-id="${f.id}"><div class="grid g2"><label class="field">Channel<select name="ch"><option>SMS</option><option>WhatsApp</option></select></label><label class="field">Template<select name="tpl" data-change="tpl" data-fid="${f.id}"><option value="reminder">Reminder</option><option value="missed">Missed follow-up</option><option value="instructions">Simple instructions</option></select></label></div><label class="field">Message<textarea name="text" rows="4">${esc(fillTpl('reminder',p,f))}</textarea></label><button class="btn btn-primary btn-sm">Send (simulated)</button><p class="sub" style="margin-top:8px">No SMS gateway is connected yet; the message is saved in the log. Connect a provider in the backend later.</p></form></div>`:''}
 </div><div>
  <div class="card" style="margin-bottom:20px"><h3>Why this was flagged</h3>${open?(r.reasons.length?r.reasons.map(x=>`<div class="reason">${esc(x)}</div>`).join(''):'<p>No risk factors found.</p>'):'<p>Follow-up closed.</p>'}<p style="margin-top:8px;font-size:11px">Transparent rules · administrative risk, not clinical urgency.</p></div>
  ${open?`<div class="card" style="margin-bottom:20px"><h3>Suggested next steps (staff decide)</h3>${r.actions.length?r.actions.map(x=>`<div class="action-i">${esc(x)}</div>`).join(''):'<p>No action suggested.</p>'}${canAct&&!f.planApproved?`<button class="btn btn-primary" style="width:100%;margin-top:8px" data-act="approve-plan" data-id="${f.id}">Approve navigation plan</button>`:''}</div>`:''}
  ${sugs.length?`<h3 style="margin:0 0 10px">🤖 AI suggestions for this case</h3>${sugs.map(s=>sugCard(s,u)).join('')}`:''}
  ${isDoc?`<div class="card" style="margin-bottom:20px"><h3>Doctor note</h3><form data-form="c-note" data-id="${f.id}"><label class="field"><textarea name="note" rows="3">${esc(f.note)}</textarea></label><button class="btn btn-dark btn-sm">Save note</button></form></div>`:''}
  ${open&&canAct?`<div class="card"><h3>Record verified outcome</h3><form data-form="c-outcome" data-id="${f.id}" style="margin-top:12px"><label class="field"><select name="o"><option value="attended">Attended at this hospital</option><option value="elsewhere">Received care elsewhere (verified)</option><option value="cancelled">Cancelled by doctor</option><option value="escalate">Not reachable – escalate</option></select></label><button class="btn btn-dark btn-sm">Save outcome</button></form></div>`:''}
 </div></div></section>`;
}
function pageNewPlan(u){
 return`<section class="auth-page"><div class="auth-card" style="max-width:560px"><span class="auth-eyebrow">CARE PLAN</span><h1>New follow-up plan</h1><p class="auth-intro">Converts the clinician’s instruction into a tracked follow-up with documents. Prescriptions are written from the doctor’s patient record.</p>
 <form data-form="c-new"><label class="field">Patient<select name="pid">${DB.patients.map(p=>`<option value="${p.id}">${esc(p.name)} – ${esc(p.area)}</option>`).join('')}</select></label><label class="field">Follow-up title<input name="title" required placeholder="e.g. BP review"></label><div class="grid g2"><label class="field">Department<input name="dept" required value="${esc(u.role==='doctor'?u.dept:'')}"></label><label class="field">Doctor<input name="doctor" required value="${esc(u.role==='doctor'?u.name:'')}"></label></div><div class="grid g2"><label class="field">Due date<input type="date" name="due" min="${plusDays(0)}" required></label><label class="field">Time<input type="time" name="time" value="10:00" required></label></div><label class="field">Instructions (plain language)<textarea name="ins" rows="3" required></textarea></label><label class="field">Documents to bring (comma separated)<input name="docs"></label><button class="btn btn-primary btn-large" style="width:100%">Create plan</button></form><p class="auth-intro" style="margin:16px 0 0"><a class="btn btn-sm btn-outline" href="#/admin">${t('back')}</a></p></div></section>`;
}
function pageMessages(u){
 const L=DB.msgs.slice().reverse();
 return`<section class="dash"><div class="dash-top"><div><h1>Message log</h1><p>Every SMS / WhatsApp sent to patients. Simulated until a gateway is connected.</p></div></div><div class="case-card"><div class="table-wrap"><table><thead><tr><th>When</th><th>Patient</th><th>Channel</th><th>Language</th><th>Message</th><th>Sent by</th><th>Status</th></tr></thead><tbody>${L.map(m=>`<tr><td>${fmtDT(m.at)}</td><td>${esc(pt(m.pid).name)}<span class="sub">${esc(m.to)}</span></td><td>${m.ch}</td><td>${LNAME[m.lang]}</td><td style="white-space:normal;min-width:260px">${esc(m.text)}</td><td>${esc(m.by)}</td><td>${esc(m.status)}</td></tr>`).join('')||'<tr><td colspan="7" class="empty-state">No messages sent yet.</td></tr>'}</tbody></table></div></div></section>`;
}
function pageAudit(u){
 const fb=DB.fb;
 return`<section class="dash"><div class="dash-top"><div><h1>Audit log & AI feedback</h1><p>Every important action is recorded with who, what and when.</p></div><button class="btn btn-primary" data-act="export-fb">Download AI feedback (JSON)</button></div>
 <div class="stats">${stat('Audit entries',DB.audit.length,'latest 500 kept')}${stat('AI feedback records',fb.length,'for training')}${stat('Approved',fb.filter(x=>x.decision==='approve').length,'as suggested')}${stat('Edited / rejected',fb.filter(x=>x.decision!=='approve').length,'AI learns from these')}</div>
 <div class="case-card"><div class="case-head"><h3>Activity log</h3></div><div class="table-wrap"><table><thead><tr><th>Time</th><th>User</th><th>Role</th><th>Action</th><th>Patient ID</th></tr></thead><tbody>${DB.audit.slice(0,200).map(a=>`<tr><td>${fmtDT(a.at)}</td><td>${esc(a.by)}</td><td>${esc(a.role)}</td><td style="white-space:normal;min-width:300px">${esc(a.action)}</td><td>${esc(a.pid||'—')}</td></tr>`).join('')||'<tr><td colspan="5" class="empty-state">No activity yet.</td></tr>'}</tbody></table></div></div>
 <div class="warn-note">The feedback file contains patient IDs only (no names) plus the AI input signals, what was proposed and what the humans finally decided. Use it later to train and evaluate the model.</div></section>`;
}

/* ---- DOCTOR: clinical patient record ---- */
function pagePatientRecord(u,id){
 if(u.role!=='doctor')return deny();
 const p=pt(id);if(!p)return notFound();
 const V=p.vitals,lab=V.map(v=>shortD(v.date)),ad=DB.admissions.find(a=>a.pid===p.id&&a.status==='admitted');
 const ser=k=>V.map(v=>v[k]),last=k=>{const x=V.filter(v=>v[k]!=null).slice(-1)[0];return x?x[k]:null};
 const sugs=DB.ai.filter(a=>a.pid===p.id&&a.requires.includes('doctor')&&a.status==='pending'),fus=DB.followups.filter(f=>f.pid===p.id),rxs=DB.rx.filter(r=>r.pid===p.id).slice().reverse();
 const noAl=/none/i.test(p.allergies);
 return`<section class="dash"><a class="btn btn-sm btn-outline" href="#/admin">← Dashboard</a>
 <div class="dash-top" style="margin-top:16px"><div><h1>${esc(p.name)}</h1><p>${p.age} yrs · ${p.sex==='F'?'Female':'Male'} · ${esc(p.area)} · ${esc(LNAME[p.lang])} · Token ${token(p.id)}</p></div><div class="actions"><a class="btn btn-primary" href="#/admin/rx/${p.id}">+ Prescribe</a>${ad?`<a class="btn btn-danger" href="#/admin/ward/${ad.id}">Admitted – open ward chart</a>`:`<a class="btn btn-dark" href="#/admin/admit/${p.id}">Admit patient</a>`}</div></div>
 ${noAl?`<div class="safe-note" style="margin:0 0 18px">Allergies: ${esc(p.allergies)}</div>`:`<div class="alert">⚠️ Allergy / intolerance: ${esc(p.allergies)}</div>`}
 <div class="stats">${stat('Follow-up consistency',avgCons(p)+'%','average of last 3 months')}${stat('Last BP',last('sys')?last('sys')+'/'+last('dia'):'—','mmHg')}${stat('Last blood sugar',last('sugar')!=null?last('sugar'):'—','mg/dL')}${stat('Last SpO2',last('spo2')!=null?last('spo2')+'%':'—','')}</div>
 ${sugs.length?`<h2 class="sec-title" style="margin-top:0">🤖 AI decision support – needs your review</h2>${sugs.map(s=>sugCard(s,u)).join('')}`:''}
 <h2 class="sec-title">Trends</h2>
 <div class="grid g2"><div class="card"><h3>Blood pressure (mmHg)</h3>${lineSVG([{name:'Systolic',data:ser('sys'),color:'#c14e35'},{name:'Diastolic',data:ser('dia'),color:'#2b6cb0'}],lab,{refs:[{v:140,l:'140'}],title:'Blood pressure'})}</div>
 <div class="card"><h3>Blood sugar (mg/dL)</h3>${lineSVG([{name:'Sugar',data:ser('sugar'),color:'#d9822b'}],lab,{refs:[{v:180,l:'180'}],title:'Blood sugar'})}</div>
 <div class="card"><h3>SpO2 (%) and pulse</h3>${lineSVG([{name:'SpO2',data:ser('spo2'),color:'#168c88'},{name:'Pulse',data:ser('pulse'),color:'#6b46c1'}],lab,{title:'SpO2 and pulse'})}</div>
 <div class="card"><h3>Weight (kg)</h3>${lineSVG([{name:'Weight',data:ser('wt'),color:'#2f855a'}],lab,{title:'Weight'})}</div>
 <div class="card" style="grid-column:1/-1"><h3>Follow-up consistency (% of planned visits kept, by month)</h3>${colSVG(p.consistency,monthLabels(p.consistency.length),{title:'Consistency'})}<p class="sub">Falling consistency together with a rising BP / sugar trend is worth a closer look.</p></div></div>
 <div class="grid g2" style="margin-top:20px"><div class="card"><h3>Diagnosis (you can edit)</h3>
  ${p.dx.map(x=>`<form class="inline-form" data-form="d-save" data-pid="${p.id}" data-id="${x.id}"><input name="text" value="${esc(x.text)}" required><button class="btn btn-sm btn-primary">Save</button><button type="button" class="btn btn-sm btn-outline" data-act="d-del" data-pid="${p.id}" data-id="${x.id}">Remove</button></form><span class="sub">${fmtDate(x.date)} · ${esc(x.by)}</span>`).join('')||'<p>No diagnosis recorded.</p>'}
  <form class="inline-form" data-form="d-add" data-pid="${p.id}" style="margin-top:14px"><input name="text" placeholder="Add a diagnosis" required><button class="btn btn-sm btn-dark">Add</button></form>
  <form class="inline-form" data-form="allergy" data-pid="${p.id}" style="margin-top:18px"><input name="al" value="${esc(p.allergies)}" required><button class="btn btn-sm btn-outline">Update allergies</button></form></div>
 <div class="card"><h3>Check-ups & clinical notes</h3>
  <form data-form="ck-add" data-pid="${p.id}"><div class="grid g2"><label class="field">Type<select name="type"><option>Routine check-up</option><option>Lab review</option><option>Imaging review</option><option>ECG</option><option>Clinical note</option></select></label><label class="field">Note<input name="note" required placeholder="Findings / plan"></label></div><button class="btn btn-sm btn-dark">Add check-up</button></form>
  <div class="log" style="margin-top:16px">${p.checkups.slice().reverse().map(c=>`<div><b>${esc(c.type)}</b><br>${esc(c.note)}<small>${fmtDate(c.date)} · ${esc(c.by)}</small></div>`).join('')||'<div>No check-ups yet.</div>'}</div></div></div>
 <div class="grid g2" style="margin-top:20px"><div class="card"><h3>Add vital readings</h3><form data-form="v-add" data-pid="${p.id}"><div class="grid g3"><label class="field">Systolic<input type="number" name="sys"></label><label class="field">Diastolic<input type="number" name="dia"></label><label class="field">Sugar (mg/dL)<input type="number" name="sugar"></label><label class="field">Weight (kg)<input type="number" step="0.1" name="wt"></label><label class="field">SpO2 (%)<input type="number" name="spo2"></label><label class="field">Pulse<input type="number" name="pulse"></label></div><button class="btn btn-sm btn-dark">Save reading</button></form></div>
 <div class="card"><h3>Recent readings</h3><div class="table-wrap"><table class="mini"><thead><tr><th>Date</th><th>BP</th><th>Sugar</th><th>SpO2</th><th>Pulse</th><th>Wt</th></tr></thead><tbody>${V.slice(-8).reverse().map(v=>`<tr><td>${shortD(v.date)}</td><td>${v.sys!=null?v.sys+'/'+v.dia:'—'}</td><td>${v.sugar!=null?v.sugar:'—'}</td><td>${v.spo2!=null?v.spo2:'—'}</td><td>${v.pulse!=null?v.pulse:'—'}</td><td>${v.wt!=null?v.wt:'—'}</td></tr>`).join('')}</tbody></table></div></div></div>
 <h2 class="sec-title">Prescriptions</h2><div class="card">${rxs.map(r=>{const fl=[];r.items.forEach(it=>rxChecks(p,r,it).filter(c=>c.level==='bad').forEach(c=>fl.push({level:'bad',text:it.name+': '+c.text})));return`<div style="padding:10px 0;border-top:1px solid #edf1f2"><b>${fmtDate(r.date)}</b> · ${esc(r.by)} ${r.ward?'<span class="pill">Ward</span>':''}<span class="pill">${r.status}</span><br>${r.items.map(it=>{const s=itemStat(r,it);return`${esc(it.name)} – ${esc(it.freq)}, ${it.days} d <span class="sub" style="display:inline">(dispensed ${s.disp}/${it.qty})</span>`}).join('<br>')}<div>${flagHTML(fl)}</div></div>`}).join('')||'<p>No prescriptions yet.</p>'}</div>
 <h2 class="sec-title">Follow-ups</h2><div class="grid g2">${fus.map(f=>`<a class="fu-card" href="#/admin/case/${f.id}"><span class="due-pill ${dueCls(f)}">${dueText(f)}</span><h3>${esc(f.title)}</h3><p style="margin:0;color:#6d8187;font-size:13px">${esc(f.dept)} · ${fmtDate(f.due)}</p></a>`).join('')||'<div class="card empty-state">No follow-ups.</div>'}</div></section>`;
}
function pageNewRx(u,pid){
 if(u.role!=='doctor')return deny();
 const p=pt(pid);if(!p)return notFound();
 const row=i=>`<div class="grid g4" style="grid-template-columns:2fr 1fr 1.4fr .7fr .7fr;gap:8px;margin-bottom:8px"><input class="rxin" name="n${i}" placeholder="Medicine & strength"><input class="rxin" name="d${i}" placeholder="Dose"><input class="rxin" name="f${i}" placeholder="Frequency"><input class="rxin" type="number" name="y${i}" placeholder="Days" min="1"><input class="rxin" type="number" name="q${i}" placeholder="Qty" min="1"></div>`;
 return`<section class="auth-page"><div class="auth-card" style="max-width:780px"><span class="auth-eyebrow">PRESCRIPTION</span><h1>New prescription – ${esc(p.name)}</h1><p class="auth-intro">${p.age} yrs · Allergies: <b>${esc(p.allergies)}</b>. The pharmacist will see exactly what you write here and cannot dispense more than the quantity prescribed.</p>
 <form data-form="rx-new" data-pid="${p.id}">${[0,1,2,3].map(row).join('')}<label class="field" style="margin-top:10px">Notes for pharmacist (optional)<input name="notes"></label><label class="check"><input type="checkbox" name="override">I have reviewed any allergy warning and still want to prescribe</label><button class="btn btn-primary btn-large" style="width:100%">Save prescription</button></form><p class="auth-intro" style="margin:16px 0 0"><a class="btn btn-sm btn-outline" href="#/admin/patient/${p.id}">${t('back')}</a></p></div></section>`;
}

/* ---- WARD / IPD ---- */
const overdueOf=a=>a.orders.filter(o=>o.status==='pending'&&Date.now()-o.dueTs>15*60000);
function ordState(o){
 if(o.status==='done')return{cls:'ok',label:'Done '+fmtHM(o.doneTs)+' · '+o.doneBy};
 if(o.status==='skipped')return{cls:'warn',label:'Not given · '+(o.note||'')};
 const m=Math.round((o.dueTs-Date.now())/60000);
 if(m<-15)return{cls:'bad',label:'OVERDUE by '+(-m)+' min'};
 if(m<=0)return{cls:'warn',label:'Due now'};
 return{cls:'',label:'Due in '+(m<60?m+' min':(Math.round(m/6)/10)+' h')};
}
function pageWard(u){
 if(!['doctor','nurse'].includes(u.role))return deny();
 const L=DB.admissions.filter(a=>u.role==='nurse'||a.doctor===u.name),cur=L.filter(a=>a.status==='admitted'),old=L.filter(a=>a.status!=='admitted');
 const odAll=cur.reduce((n,a)=>n+overdueOf(a).length,0),esc2=cur.reduce((n,a)=>n+a.notes.filter(x=>x.esc&&!x.resolved).length,0);
 return`<section class="dash">${u.role==='nurse'?dashTop(u):'<div class="dash-top"><div><h1>Ward / admitted patients</h1><p>Scheduled checks, medicines and actions for admitted patients.</p></div></div>'}
 <div class="stats">${stat('Admitted',cur.length,'in wards')}${stat('Overdue checks / medicines',odAll,odAll?'act now':'all on time')}${stat('Open escalations',esc2,'to doctor')}${stat('Pending items today',cur.reduce((n,a)=>n+a.orders.filter(o=>o.status==='pending').length,0),'scheduled')}</div>
 <div class="case-card"><div class="case-head"><h3>Admitted patients</h3></div><div class="table-wrap"><table><thead><tr><th>Patient</th><th>Ward / bed</th><th>Reason</th><th>Doctor</th><th>Day</th><th>Status of care</th><th>Next due</th><th></th></tr></thead><tbody>
 ${cur.map(a=>{const p=pt(a.pid),od=overdueOf(a),nx=a.orders.filter(o=>o.status==='pending').sort((x,y)=>x.dueTs-y.dueTs)[0];return`<tr><td><b>${esc(p.name)}</b><span class="sub">${p.age} yrs · ${p.sex}</span></td><td>${esc(a.ward)} · ${esc(a.bed)}</td><td>${esc(a.reason)}</td><td>${esc(a.doctor)}</td><td>${Math.max(1,1-diffDays(a.date))}</td><td>${od.length?`<span class="risk high">${od.length} overdue</span>`:'<span class="risk low">On time</span>'}</td><td>${nx?esc(nx.title)+`<span class="sub">${ordState(nx).label}</span>`:'—'}</td><td><a class="btn btn-sm btn-primary" href="#/admin/ward/${a.id}">Open chart</a></td></tr>`}).join('')||'<tr><td colspan="8" class="empty-state">No admitted patients.</td></tr>'}</tbody></table></div></div>
 ${old.length?`<h2 class="sec-title">Discharged</h2><div class="card">${old.map(a=>`<p>${esc(pt(a.pid).name)} – ${esc(a.reason)} <span class="sub">discharged ${a.dischargedOn?fmtDate(a.dischargedOn):''}</span></p>`).join('')}</div>`:''}</section>`;
}
function pageAdmission(u,id){
 if(!['doctor','nurse'].includes(u.role))return deny();
 const a=adm(id);if(!a)return notFound();
 if(u.role==='doctor'&&a.doctor!==u.name)return deny();
 const p=pt(a.pid),isN=u.role==='nurse',isD=u.role==='doctor',orders=a.orders.slice().sort((x,y)=>x.dueTs-y.dueTs),V=p.vitals,lab=V.map(v=>shortD(v.date)),adSugs=DB.ai.filter(s=>s.aid===a.id&&s.status==='pending'&&visibleAI(u).includes(s));
 const rxs=DB.rx.filter(r=>r.pid===p.id&&r.ward),noAl=/none/i.test(p.allergies),open=a.status==='admitted';
 const form=o=>{
  if(!isN||!open||o.status!=='pending')return'';
  const vit=o.type==='vitals'?`<input type="number" name="sys" placeholder="Sys"><input type="number" name="dia" placeholder="Dia"><input type="number" name="pulse" placeholder="Pulse"><input type="number" name="spo2" placeholder="SpO2"><input type="number" name="sugar" placeholder="Sugar">`:'';
  const med=o.type==='med'?`<label class="check" style="margin:0"><input type="checkbox" name="verify">Checked patient, drug, dose, route & time</label>`:'';
  return`<form class="ord-form" data-form="o-done" data-aid="${a.id}" data-oid="${o.id}">${vit}${med}<input name="note" placeholder="Note / reason if not done"><button class="btn btn-sm btn-primary" name="res" value="done">Mark done</button><button class="btn btn-sm btn-outline" name="res" value="skip">Not given / skipped</button></form>`;
 };
 return`<section class="dash"><a class="btn btn-sm btn-outline" href="#/admin/ward">← Ward</a>
 <div class="dash-top" style="margin-top:16px"><div><h1>${esc(p.name)} – ${esc(a.ward)} · ${esc(a.bed)}</h1><p>${p.age} yrs · ${p.sex} · ${esc(a.reason)} · ${esc(a.doctor)} · Admitted ${fmtDate(a.date)}${open?'':' · <b>Discharged</b>'}</p></div>${isD?`<a class="btn btn-primary" href="#/admin/patient/${p.id}">Full clinical record</a>`:''}</div>
 ${noAl?'':`<div class="alert">⚠️ Allergy / intolerance: ${esc(p.allergies)}</div>`}
 <div class="stats">${stat('Overdue',overdueOf(a).length,'checks / medicines')}${stat('Done',a.orders.filter(o=>o.status==='done').length,'completed')}${stat('Pending',a.orders.filter(o=>o.status==='pending').length,'scheduled')}${stat('Not given',a.orders.filter(o=>o.status==='skipped').length,'with reason')}</div>
 ${adSugs.length?`<h2 class="sec-title" style="margin-top:0">🤖 AI suggestion</h2>${adSugs.map(s=>sugCard(s,u)).join('')}`:''}
 <div class="two"><div><h2 class="sec-title" style="margin-top:0">Scheduled care & medicines</h2>${orders.map(o=>{const s=ordState(o),ic={vitals:'📈',med:'💊',checkup:'🩺',diet:'🍽️'}[o.type]||'•';return`<div class="ord ${s.cls}"><div class="ord-top"><span><b>${ic} ${esc(o.title)}</b><span class="sub">${fmtDT(o.dueTs)} · ordered by ${esc(o.by||'Doctor')}${o.source?' · '+esc(o.source):''}</span></span><span class="state ${s.cls}">${esc(s.label)}</span></div>${o.result?`<span class="sub">Result: ${esc(o.result)}</span>`:''}${o.status==='done'&&o.note?`<span class="sub">Note: ${esc(o.note)}</span>`:''}${form(o)}</div>`}).join('')||'<div class="card empty-state">No orders.</div>'}</div>
 <div><div class="card" style="margin-bottom:20px"><h3>Vitals trend</h3>${lineSVG([{name:'Systolic',data:V.map(v=>v.sys),color:'#c14e35'},{name:'SpO2',data:V.map(v=>v.spo2),color:'#168c88'},{name:'Pulse',data:V.map(v=>v.pulse),color:'#6b46c1'}],lab,{h:190,title:'Vitals'})}</div>
 <div class="card" style="margin-bottom:20px"><h3>Doctor’s prescription vs pharmacy supply</h3>${rxs.map(r=>r.items.map(it=>{const s=itemStat(r,it);return`<div class="kv" style="margin-bottom:6px"><b>${esc(it.name)}</b><span>${esc(it.freq)} · supplied ${s.disp}/${it.qty}</span></div>`}).join('')).join('')||'<p>No ward prescription yet.</p>'}</div>
 <div class="card"><h3>Nurse & doctor notes</h3><div class="log" style="margin-top:12px">${a.notes.slice().reverse().map(n=>`<div><b>${n.esc?'🔔 Escalated: ':''}</b>${esc(n.text)}${n.resolved?' <span class="pill">Reviewed</span>':''}<small>${fmtDT(n.at)} · ${esc(n.by)}</small></div>`).join('')||'<div>No notes yet.</div>'}</div>
 ${open?`<form data-form="a-note" data-aid="${a.id}"><label class="field"><textarea name="text" rows="2" required placeholder="Observation or action taken"></textarea></label>${isN?'<label class="check"><input type="checkbox" name="esc">Escalate to the doctor (urgent)</label>':''}<button class="btn btn-sm btn-dark">Add note</button></form>`:''}</div></div></div>
 ${isD&&open?`<div class="grid g2" style="margin-top:20px"><div class="card"><h3>Add an order</h3><form data-form="o-add" data-aid="${a.id}"><div class="grid g2"><label class="field">Type<select name="type"><option value="vitals">Vitals / sugar check</option><option value="med">Medicine</option><option value="checkup">Check-up / review</option><option value="diet">Diet</option></select></label><label class="field">Due in (minutes)<input type="number" name="min" min="5" value="30" required></label></div><label class="field">Order<input name="title" required placeholder="e.g. Pantoprazole 40 mg IV"></label><button class="btn btn-sm btn-primary">Add order</button></form></div>
 <div class="card"><h3>Discharge & create follow-up</h3><form data-form="a-discharge" data-aid="${a.id}"><div class="grid g2"><label class="field">Follow-up date<input type="date" name="due" min="${plusDays(1)}" required></label><label class="field">Department<input name="dept" required value="${esc(u.dept)}"></label></div><label class="field">Discharge instructions (plain language)<textarea name="ins" rows="3" required></textarea></label><label class="field">Documents to bring<input name="docs" placeholder="Discharge summary, reports"></label><button class="btn btn-sm btn-dark">Discharge & schedule follow-up</button></form></div></div>`:''}</section>`;
}
function pageAdmit(u,pid){
 if(u.role!=='doctor')return deny();
 const p=pt(pid);if(!p)return notFound();
 if(DB.admissions.some(a=>a.pid===p.id&&a.status==='admitted'))return`<div class="page"><h1>Already admitted</h1><a class="btn btn-primary" href="#/admin/patient/${p.id}">Back to record</a></div>`;
 const d=p.dx[p.dx.length-1];
 return`<section class="auth-page"><div class="auth-card" style="max-width:600px"><span class="auth-eyebrow">ADMISSION</span><h1>Admit ${esc(p.name)}</h1><p class="auth-intro">Nurses will see timed checks and medicines for this patient. Allergies: <b>${esc(p.allergies)}</b></p>
 <form data-form="admit" data-pid="${p.id}"><div class="grid g2"><label class="field">Ward<select name="ward"><option>Medicine Ward</option><option>Surgery Ward</option><option>Cardiology Ward</option><option>Gynaecology Ward</option></select></label><label class="field">Bed<input name="bed" required placeholder="e.g. M-14"></label></div>
 <label class="field">Reason for admission<input name="reason" required value="${esc(d?d.text:'')}"></label>
 <label class="field">Vitals check every<select name="vh"><option value="2">2 hours</option><option value="4" selected>4 hours</option><option value="6">6 hours</option></select></label>
 <label class="field">Medicines (one per line: <i>name & dose | every N h</i>)<textarea name="meds" rows="4" placeholder="Ceftriaxone 1 g IV | every 12 h&#10;Paracetamol 500 mg | every 8 h"></textarea></label>
 <label class="check"><input type="checkbox" name="override">I have reviewed any allergy warning and still want to proceed</label>
 <button class="btn btn-primary btn-large" style="width:100%">Admit & create care schedule</button></form><p class="auth-intro" style="margin:16px 0 0"><a class="btn btn-sm btn-outline" href="#/admin/patient/${p.id}">${t('back')}</a></p></div></section>`;
}

/* ---- PHARMACY ---- */
function pagePharmacy(u){
 if(u.role!=='pharmacist')return deny();
 const rows=DB.patients.map(p=>{
  const rxs=DB.rx.filter(r=>r.pid===p.id&&r.status==='active');if(!rxs.length)return null;
  let rem=0,flags=0;rxs.forEach(r=>r.items.forEach(it=>{if(itemStat(r,it).rem>0)rem++;flags+=rxChecks(p,r,it).filter(c=>c.level==='bad').length}));
  const ds=DB.disp.filter(d=>d.pid===p.id);return{p,rxs,rem,flags,visits:ds.length,last:ds.slice(-1)[0]};
 }).filter(Boolean).sort((a,b)=>b.flags-a.flags||b.rem-a.rem);
 return`<section class="dash">${dashTop(u)}<div class="stats">${stat('Patients with active prescriptions',rows.length,'')}${stat('Items still to dispense',rows.reduce((n,r)=>n+r.rem,0),'')}${stat('Safety flags',rows.reduce((n,r)=>n+r.flags,0),'allergy conflicts – do not dispense')}${stat('Dispensed today',DB.disp.filter(d=>d.date===plusDays(0)).length,'')}</div>
 <div class="case-card"><div class="case-head"><h3>Prescriptions (as written by the doctor)</h3></div><div class="table-wrap"><table><thead><tr><th>Patient</th><th>Prescriptions</th><th>Items to dispense</th><th>Times collected</th><th>Last dispensed</th><th>Safety</th><th></th></tr></thead><tbody>
 ${rows.map(r=>`<tr><td><b>${esc(r.p.name)}</b><span class="sub">${r.p.age} yrs · allergies: ${esc(r.p.allergies)}</span></td><td>${r.rxs.length}${r.rxs.some(x=>x.ward)?' <span class="pill">Ward</span>':''}</td><td>${r.rem}</td><td>${r.visits}</td><td>${r.last?fmtDate(r.last.date):'Never'}</td><td>${r.flags?`<span class="risk high">${r.flags} conflict</span>`:'<span class="risk low">OK</span>'}</td><td><a class="btn btn-sm btn-primary" href="#/admin/pharmacy/${r.p.id}">Open</a></td></tr>`).join('')||'<tr><td colspan="7" class="empty-state">No prescriptions.</td></tr>'}</tbody></table></div></div>
 <div class="warn-note">You only see what is needed for safe dispensing: name, age, allergies and prescriptions. Diagnosis and clinical notes are not shown to this role.</div></section>`;
}
function pagePharmPatient(u,pid){
 if(u.role!=='pharmacist')return deny();
 const p=pt(pid);if(!p)return notFound();
 const rxs=DB.rx.filter(r=>r.pid===p.id).slice().reverse(),ds=DB.disp.filter(d=>d.pid===p.id).slice().reverse(),tot={};
 ds.forEach(d=>d.items.forEach(x=>{tot[x.name]=(tot[x.name]||0)+x.qty}));
 return`<section class="dash"><a class="btn btn-sm btn-outline" href="#/admin">← Prescriptions</a>
 <div class="dash-top" style="margin-top:16px"><div><h1>${esc(p.name)}</h1><p>${p.age} yrs · ${p.sex==='F'?'Female':'Male'} · Token ${token(p.id)}</p></div></div>
 ${/none/i.test(p.allergies)?'<div class="safe-note" style="margin:0 0 18px">Allergies: None known</div>':`<div class="alert">⚠️ Allergy / intolerance: ${esc(p.allergies)}</div>`}
 <div class="stats">${stat('Times medicines collected',ds.length,'dispensing visits')}${stat('Last dispensed',ds[0]?fmtDate(ds[0].date):'Never','')}${stat('Different medicines taken',Object.keys(tot).length,'so far')}${stat('Active prescriptions',rxs.filter(r=>r.status==='active').length,'')}</div>
 ${rxs.map(r=>`<div class="card" style="margin-bottom:20px"><div class="case-head" style="padding:0 0 12px;border:0"><h3>Prescription ${fmtDate(r.date)} · ${esc(r.by)} ${r.ward?'<span class="pill">Ward supply</span>':''}</h3><span class="pill">${r.status}</span></div>${r.notes?`<p class="sub" style="margin-bottom:10px">Doctor’s note: ${esc(r.notes)}</p>`:''}
 <form data-form="ph-disp" data-id="${r.id}"><div class="table-wrap"><table class="mini"><thead><tr><th>Medicine</th><th>Dose · frequency</th><th>Prescribed</th><th>Given so far</th><th>Remaining</th><th>Supply</th><th>Safety checks</th>${r.status==='active'?'<th>Give now</th>':''}</tr></thead><tbody>
 ${r.items.map((it,i)=>{const s=itemStat(r,it),ck=rxChecks(p,r,it);return`<tr><td><b>${esc(it.name)}</b></td><td>${esc(it.dose)} · ${esc(it.freq)} · ${it.days} d</td><td>${it.qty}</td><td>${s.disp}</td><td><b>${s.rem}</b></td><td>${s.left==null?'Not started':s.left>=0?s.left+' day(s) left':'Ended '+(-s.left)+' day(s) ago'}</td><td style="white-space:normal;min-width:220px">${flagHTML(ck)||'<span class="flag ok">No issues found</span>'}</td>${r.status==='active'?`<td>${s.rem>0?`<input type="number" name="q${i}" min="0" max="${s.rem}" value="0" style="width:74px;min-height:34px;padding:6px;border:1px solid #dce7e9;border-radius:8px">`:'—'}</td>`:''}</tr>`}).join('')}</tbody></table></div>
 ${r.status==='active'?`<label class="check" style="margin-top:12px"><input type="checkbox" name="verify">I verified the patient’s identity and this prescription</label><label class="field">If an allergy conflict is flagged: prescriber who confirmed it is safe<input name="presc" placeholder="Name of prescriber (otherwise do not dispense)"></label><button class="btn btn-primary btn-sm">Record dispensing</button>`:''}</form></div>`).join('')||'<div class="card empty-state">No prescriptions.</div>'}
 <div class="grid g2"><div class="card"><h3>Medicines taken so far (total dispensed)</h3>${hbars(Object.entries(tot).sort((a,b)=>b[1]-a[1]))}</div><div class="card"><h3>Dispensing history</h3><div class="log" style="margin-top:12px">${ds.map(d=>`<div><b>${d.items.map(x=>esc(x.name)+' × '+x.qty).join(', ')}</b>${d.override?'<br><span class="flag warn">Allergy flag – confirmed by '+esc(d.override)+'</span>':''}<small>${fmtDate(d.date)} · ${esc(d.by)}</small></div>`).join('')||'<div>Nothing dispensed yet.</div>'}</div></div></div></section>`;
}

/* ================= router + render ================= */
function render(){
 clearInterval(slideTimer);
 const parts=(location.hash||'#/').replace(/^#/,'').split('/').filter(Boolean),[a,b,c]=parts;let body;
 if(staff())genAI();
 if(!a)body=pageHome();else if(a==='problem')body=pageProblem();else if(a==='how')body=pageHow();else if(a==='roles')body=pageRoles();else if(a==='roadmap')body=pageRoadmap();
 else if(a==='patient')body=routePatient(b,c,parts[3]);else if(a==='admin')body=routeAdmin(b,c);else body=notFound();
 $('#app').innerHTML=announce()+header()+'<main>'+body+'</main>'+footer();
 if(!a)startSlides();
 renderChat();
}
window.addEventListener('hashchange',()=>{UI.menu=false;render();window.scrollTo(0,0)});

/* ================= chat assistant (rules, no medical advice) ================= */
function renderChat(){
 const r=$('#chat-root');
 if(!UI.chat){r.innerHTML='<button class="chat-launcher" data-act="chat">💬 Help</button>';return}
 r.innerHTML=`<div class="chat-panel"><div class="chat-head"><div><strong>AARAMBH Assistant</strong><small>Admin & travel help · no medical advice</small></div><button class="modal-close" data-act="chat" aria-label="Close">×</button></div><div class="chat-body" id="chat-body">${UI.msgs.map(m=>`<div class="chat-bubble ${m.u?'chat-user':''}">${esc(m.t)}</div>`).join('')}</div><form class="chat-compose" data-form="chat"><input name="q" placeholder="Ask about login, travel, follow-ups…" autocomplete="off"><button class="btn btn-primary">Send</button></form></div>`;
 const b=$('#chat-body');b.scrollTop=b.scrollHeight;
}
function botReply(q){
 q=q.toLowerCase();
 if(/ambulance|emergency|chest|bleed|accident/.test(q))return'If this is an emergency, call 108 (ambulance) or 112 right now. I cannot give medical advice.';
 if(/rapido|ride|cab|auto|bike|fare|cost/.test(q))return'Open your follow-up → “Plan my travel”. You will see GPS distance, estimated fares for bike, auto, cab and non-emergency ambulance, and a button to open Rapido.';
 if(/otp|login|password/.test(q))return'Patients: use the registered mobile number and the demo OTP '+OTP_DEMO+'. Staff: choose your role in Hospital Administration and use the demo credentials shown on the login page.';
 if(/gps|location|traffic|distance/.test(q))return'On the travel page tap “Connect to my GPS”. Allow location access in your browser. Use “Open live traffic” for real-time traffic.';
 if(/resched|date|change/.test(q))return'Open the follow-up and choose “Ask to reschedule”. Hospital staff will confirm the new date.';
 if(/wheelchair|escort|help/.test(q))return'Open the follow-up and choose “Ask for help at hospital” to request a wheelchair, escort, language help or a callback.';
 return'I can help with login, follow-up dates, travel and ride options, and requesting help at the hospital. For medical questions please contact your doctor.';
}

/* ================= events ================= */
const handlers={
 menu(){UI.menu=!UI.menu;render()},
 slide(el){UI.slide=+el.dataset.i;paintSlide()},
 chat(){UI.chat=!UI.chat;renderChat()},
 'otp-back'(){UI.otp=false;render()},
 logout(){SESSION=null;store.del(SES_KEY);go('#/')},
 reset(){if(!confirm('Reset all demo data?'))return;store.del(LS);DB=seed();SESSION=null;store.del(SES_KEY);toast('Demo data reset');go('#/')},
 'p-confirm'(el){const f=fu(el.dataset.id);f.confirmed=true;addContact(f,{by:'Patient (portal)',mode:'Portal',result:'Patient confirmed the visit'});save();toast('Thank you! Your visit is confirmed.');render()},
 gps(){
  if(!navigator.geolocation){toast('GPS is not supported on this device');return}
  UI.geoMsg='Locating…';render();
  navigator.geolocation.getCurrentPosition(pos=>{GEO={lat:pos.coords.latitude,lng:pos.coords.longitude,acc:Math.round(pos.coords.accuracy)};UI.geoMsg='Update my location';render();toast('Location connected')},
  err=>{UI.geoMsg='';toast('Could not get location ('+(err.code===1?'permission denied':'unavailable')+'). Using saved address.');render()},{enableHighAccuracy:true,timeout:12000,maximumAge:60000});
 },
 'req-transport'(el){const f=fu(el.dataset.id),p=pt(f.pid);addContact(f,{by:'Patient (portal)',mode:'Portal',result:'Requested transport help',note:el.dataset.ride+' to hospital on '+fmtDate(f.due)});f.callback=true;if(!f.barriers.includes('Long distance')&&distKm(p)>20)f.barriers.push('Long distance');save();toast('Request sent. Hospital staff will call you.')},
 'approve-plan'(el){const f=fu(el.dataset.id);f.planApproved=true;f.planApprovedBy=staff().name;addContact(f,{by:staff().name,mode:'Review',result:'Navigation plan approved'});audit('Navigation plan approved for '+f.title,f.pid);toast('Plan approved');render()},
 'resched-ok'(el){const f=fu(el.dataset.id);addContact(f,{by:staff().name,mode:'Review',result:'Reschedule approved to '+fmtDate(f.reschedReq.date)});audit('Reschedule approved: '+f.title+' → '+f.reschedReq.date,f.pid);f.due=f.reschedReq.date;f.reschedReq=null;f.confirmed=false;save();toast('New date set');render()},
 'resched-no'(el){const f=fu(el.dataset.id);addContact(f,{by:staff().name,mode:'Review',result:'Reschedule declined – call patient'});f.reschedReq=null;audit('Reschedule declined: '+f.title,f.pid);toast('Request declined');render()},
 'task-done'(el){const k=DB.tasks.find(x=>x.id===el.dataset.id);k.status='done';audit('Assistance task completed: '+k.type,k.pid);toast('Task marked done');render()},
 'd-del'(el){if(!confirm('Remove this diagnosis entry? It stays in the audit log.'))return;const p=pt(el.dataset.pid),x=p.dx.find(d=>d.id===el.dataset.id);p.dx=p.dx.filter(d=>d.id!==x.id);audit('Diagnosis removed: "'+x.text+'"',p.id);toast('Removed');render()},
 'a-resolve'(el){const a=adm(el.dataset.aid);a.notes[+el.dataset.i].resolved=true;audit('Nurse alert reviewed by doctor',a.pid);toast('Marked as reviewed');render()},
 'export-fb'(){const blob=new Blob([JSON.stringify({exportedAt:new Date().toISOString(),feedback:DB.fb,acceptanceStats:DB.stats},null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='aarambh_ai_feedback.json';document.body.appendChild(a);a.click();a.remove();toast('Feedback file downloaded')}
};

/* ================= FORMS (Modified logic for Backend API) ================= */
const forms={
 'p-otp'(fm){const ph=new FormData(fm).get('phone').trim(),p=DB.patients.find(x=>x.phone===ph);if(!p){toast('This number is not registered. Please contact OPD registration.');return}UI.phone=ph;UI.otp=true;render()},
 'p-verify'(fm){if(new FormData(fm).get('otp').trim()!==OTP_DEMO){toast('Incorrect OTP');return}const p=DB.patients.find(x=>x.phone===UI.phone);SESSION={type:'patient',id:p.id};store.set(SES_KEY,SESSION);UI.otp=false;LANG=p.lang;store.set(LANG_KEY,LANG);go('#/patient')},
 'p-profile'(fm){const fd=new FormData(fm),p=me();p.altPhone=fd.get('alt').trim();p.lang=fd.get('lang');LANG=p.lang;store.set(LANG_KEY,LANG);save();toast('Details saved');go('#/patient')},
 'p-resched'(fm){const f=fu(fm.dataset.id),fd=new FormData(fm);f.reschedReq={date:fd.get('date'),reason:fd.get('reason')};addContact(f,{by:'Patient (portal)',mode:'Portal',result:'Reschedule requested to '+fmtDate(fd.get('date')),note:fd.get('reason')});save();toast('Request sent to the hospital');go('#/patient/followup/'+f.id)},
 'p-barrier'(fm){const f=fu(fm.dataset.id),fd=new FormData(fm),v=fd.getAll('b');if(!v.length&&!fd.get('note')){toast('Please select at least one option');return}f.barriers=[...new Set(f.barriers.concat(v))];addContact(f,{by:'Patient (portal)',mode:'Portal',result:'Barrier reported: '+(v.join(', ')||'other'),note:fd.get('note')});save();toast('Thank you. The hospital team will help.');go('#/patient/followup/'+f.id)},
 'p-assist'(fm){const f=fu(fm.dataset.id),fd=new FormData(fm),v=fd.getAll('a');if(!v.length){toast('Please select at least one option');return}
  if(v.includes('wheel')){DB.tasks.push({id:uid('T'),pid:f.pid,fid:f.id,type:'Wheelchair + escort',from:'OPD Registration',to:f.dept,when:'On arrival, '+fmtDate(f.due),status:'open',source:'Patient request'});if(!f.barriers.includes('Needs escort / wheelchair'))f.barriers.push('Needs escort / wheelchair')}
  if(v.includes('lang')&&!f.barriers.includes('Language support needed'))f.barriers.push('Language support needed');
  if(v.includes('call'))f.callback=true;
  addContact(f,{by:'Patient (portal)',mode:'Portal',result:'Help requested',note:v.join(', ')});save();toast('Request sent. Staff will be ready for you.');go('#/patient/followup/'+f.id)},
 
 /* ===== LOGIN FIXED - CONNECTED TO FLASK BACKEND ===== */
 /* ===== LOGIN FIXED - CONNECTED TO FLASK BACKEND ===== */
 async 's-login'(fm){
  const fd = new FormData(fm);
  const staff_id = fd.get('id').trim().toUpperCase();
  const password = fd.get('pw');
  const role = fm.dataset.role;

  try {
   const response = await fetch('http://127.0.0.1:5000/api/auth/staff/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // Yahan JSON keys 'id' aur 'pw' kar di hain jo Flask ko chahiye
    body: JSON.stringify({ id: staff_id, pw: password, role: role }) 
   });

   if (!response.ok) {
    toast('Incorrect ID or password from Backend');
    return;
   }

   const data = await response.json();
   const u = STAFF.find(s => s.id === staff_id) || { id: staff_id, role: role, name: data.user.name, dept: data.user.dept };
   SESSION = { type: 'staff', id: u.id };
   store.set(SES_KEY, SESSION);
   audit('Logged in via Flask Backend');
   
   toast('Connected to Flask Backend! 🎉');
   go('#/admin');

  } catch (error) {
   toast('Backend Error! Ensure Flask is running on Port 5000.');
   console.error('Login Fetch Error:', error);
  }
 },
 
 'c-contact'(fm){const f=fu(fm.dataset.id),fd=new FormData(fm);addContact(f,{by:staff().name,mode:fd.get('mode'),result:fd.get('result'),note:fd.get('note')});if(fd.get('result')==='Answered – will come')f.confirmed=true;if(fd.get('result')==='Answered – needs help')f.callback=false;audit(fd.get('mode')+' – '+fd.get('result')+' ('+f.title+')',f.pid);toast('Contact attempt logged');render()},
 'c-msg'(fm){const f=fu(fm.dataset.id),p=pt(f.pid),fd=new FormData(fm),tx=(fd.get('text')||'').trim();if(!tx){toast('Message is empty');return}sendMsg(p,f,fd.get('ch'),tx,staff().name);audit(fd.get('ch')+' sent (simulated): '+f.title,p.id);toast(fd.get('ch')+' saved in the log (no gateway connected yet)');render()},
 'c-note'(fm){const f=fu(fm.dataset.id);f.note=new FormData(fm).get('note');audit('Doctor note updated on follow-up',f.pid);toast('Note saved')},
 'c-outcome'(fm){const f=fu(fm.dataset.id),o=new FormData(fm).get('o'),by=staff().name;
  if(o==='attended'||o==='elsewhere'){f.status='completed';f.outcome=o==='attended'?'Attended at this hospital':'Received care elsewhere (verified)';f.completedOn=plusDays(0)}
  else if(o==='cancelled'){f.status='closed';f.outcome='Cancelled by doctor'}
  else{f.escalated=true;addContact(f,{by:by,mode:'Review',result:'Escalated to follow-up desk'})}
  if(o!=='escalate')addContact(f,{by:by,mode:'Review',result:'Outcome recorded: '+f.outcome});audit('Outcome recorded: '+(f.outcome||'escalated')+' ('+f.title+')',f.pid);toast('Outcome saved');go('#/admin')},
 'c-new'(fm){const fd=new FormData(fm),id=uid('F');
  DB.followups.push({id,pid:fd.get('pid'),title:fd.get('title'),dept:fd.get('dept'),doctor:fd.get('doctor'),due:fd.get('due'),time:fd.get('time'),instructions:fd.get('ins'),docs:fd.get('docs').split(',').map(s=>s.trim()).filter(Boolean),docsReady:[],barriers:[],contacts:[],status:'pending',confirmed:false,planApproved:false,reschedReq:null,callback:false,note:''});
  audit('Follow-up plan created: '+fd.get('title'),fd.get('pid'));toast('Follow-up plan created');go('#/admin/case/'+id)},
 chat(fm){const q=new FormData(fm).get('q').trim();if(!q)return;UI.msgs.push({u:1,t:q},{t:botReply(q)});renderChat()},
 /* --- doctor: clinical record edits --- */
 'd-save'(fm){const p=pt(fm.dataset.pid),x=p.dx.find(d=>d.id===fm.dataset.id),nv=new FormData(fm).get('text').trim();if(nv===x.text){toast('No change');return}audit('Diagnosis edited: "'+x.text+'" → "'+nv+'"',p.id);x.text=nv;x.by=staff().name;x.date=plusDays(0);save();toast('Diagnosis updated');render()},
 'd-add'(fm){const p=pt(fm.dataset.pid),tx=new FormData(fm).get('text').trim();p.dx.push({id:uid('D'),date:plusDays(0),text:tx,by:staff().name});audit('Diagnosis added: "'+tx+'"',p.id);toast('Diagnosis added');render()},
 'allergy'(fm){const p=pt(fm.dataset.pid),v=new FormData(fm).get('al').trim();audit('Allergies changed: "'+p.allergies+'" → "'+v+'"',p.id);p.allergies=v;save();toast('Allergies updated');render()},
 'ck-add'(fm){const p=pt(fm.dataset.pid),fd=new FormData(fm);p.checkups.push({id:uid('C'),date:plusDays(0),type:fd.get('type'),note:fd.get('note').trim(),by:staff().name});audit('Check-up added: '+fd.get('type'),p.id);toast('Check-up recorded');render()},
 'v-add'(fm){const p=pt(fm.dataset.pid),fd=new FormData(fm),g=k=>fd.get(k)!==''&&fd.get(k)!=null?Number(fd.get(k)):null;const v={date:plusDays(0),sys:g('sys'),dia:g('dia'),sugar:g('sugar'),wt:g('wt'),spo2:g('spo2'),pulse:g('pulse')};
  if(v.sys==null&&v.dia==null&&v.sugar==null&&v.wt==null&&v.spo2==null&&v.pulse==null){toast('Enter at least one value');return}
  p.vitals.push(v);audit('Vital readings added',p.id);toast('Reading saved');render()},
 'rx-new'(fm){const p=pt(fm.dataset.pid),fd=new FormData(fm),items=[],conf=[];
  for(let i=0;i<4;i++){const n=(fd.get('n'+i)||'').trim();if(!n)continue;const days=+fd.get('y'+i),qty=+fd.get('q'+i);if(!(days>0)||!(qty>0)){toast('Enter days and quantity for '+n);return}items.push({name:n,dose:(fd.get('d'+i)||'As directed').trim()||'As directed',freq:(fd.get('f'+i)||'As directed').trim()||'As directed',days,qty});if(allergyHits(p,n).length)conf.push(n)}
  if(!items.length){toast('Add at least one medicine');return}
  if(conf.length&&!fd.get('override')){toast('Allergy warning for: '+conf.join(', ')+'. Review it and tick the confirmation box to continue.');return}
  DB.rx.push({id:uid('R'),pid:p.id,by:staff().name,date:plusDays(0),ward:false,status:'active',notes:(fd.get('notes')||'').trim(),items});
  audit('Prescription created: '+items.map(i=>i.name).join(', ')+(conf.length?' (allergy warning overridden for '+conf.join(', ')+')':''),p.id);toast('Prescription saved. Pharmacy can see it now.');go('#/admin/patient/'+p.id)},
 'admit'(fm){const p=pt(fm.dataset.pid),fd=new FormData(fm),u=staff(),vh=+fd.get('vh')||4,lines=(fd.get('meds')||'').split('\n').map(s=>s.trim()).filter(Boolean),conf=[];
  lines.forEach(l=>{const nm=l.split('|')[0].trim();if(allergyHits(p,nm).length)conf.push(nm)});
  if(conf.length&&!fd.get('override')){toast('Allergy warning for: '+conf.join(', ')+'. Review it and tick the confirmation box to continue.');return}
  const id=uid('A'),orders=[],items=[],O=(type,title,min)=>orders.push({id:uid('O'),type,title,dueTs:inMin(min),status:'pending',by:u.name});
  for(let m=30;m<=24*60;m+=vh*60)O('vitals','Vitals check (BP, pulse, SpO2, sugar if diabetic)',m);
  lines.forEach(l=>{const pr=l.split('|'),nm=pr[0].trim(),h=Math.max(1,parseInt((pr[1]||'').replace(/\D/g,''))||8);for(let m=30;m<=24*60;m+=h*60)O('med',nm,m);items.push({name:nm,dose:'As ordered',freq:'Every '+h+' h',days:3,qty:Math.ceil(24/h)*3})});
  O('checkup','Doctor review round',12*60);
  DB.admissions.push({id,pid:p.id,ward:fd.get('ward'),bed:fd.get('bed').trim(),date:plusDays(0),doctor:u.name,reason:fd.get('reason').trim(),status:'admitted',orders,notes:[]});
  if(items.length)DB.rx.push({id:uid('R'),pid:p.id,by:u.name,date:plusDays(0),ward:true,status:'active',notes:'Ward medication for admission '+id,items});
  p.checkups.push({id:uid('C'),date:plusDays(0),type:'Admission',note:'Admitted to '+fd.get('ward')+' – '+fd.get('reason'),by:u.name});
  audit('Patient admitted: '+fd.get('ward')+' '+fd.get('bed')+' – '+fd.get('reason'),p.id);toast('Admitted. Nurses can now see the care schedule.');go('#/admin/ward/'+id)},
 'o-add'(fm){const a=adm(fm.dataset.aid),fd=new FormData(fm),u=staff(),title=fd.get('title').trim();
  if(fd.get('type')==='med'&&allergyHits(pt(a.pid),title).length){toast('Allergy conflict for '+title+'. Order not added.');return}
  a.orders.push({id:uid('O'),type:fd.get('type'),title,dueTs:inMin(+fd.get('min')||30),status:'pending',by:u.name});audit('Order added: '+title,a.pid);toast('Order added');render()},
 'o-done'(fm,sb){
  const a=adm(fm.dataset.aid),o=a.orders.find(x=>x.id===fm.dataset.oid),fd=new FormData(fm),u=staff(),res=sb&&sb.value||'done',note=(fd.get('note')||'').trim();
  if(res==='skip'){if(!note){toast('Please write the reason for not giving / skipping');return}o.status='skipped';o.note=note;o.doneTs=Date.now();o.doneBy=u.name;a.notes.push({at:Date.now(),by:u.name,text:'Not done: '+o.title+' — '+note,esc:true,resolved:false});audit('Order not completed: '+o.title+' – '+note,a.pid);toast('Recorded. The doctor has been alerted.');render();return}
  if(o.type==='med'&&!fd.get('verify')){toast('Please confirm the medicine check first');return}
  if(o.type==='vitals'){
   const g=k=>fd.get(k)?Number(fd.get(k)):null,v={date:plusDays(0),sys:g('sys'),dia:g('dia'),sugar:g('sugar'),wt:null,spo2:g('spo2'),pulse:g('pulse')};
   if(v.sys==null&&v.sugar==null&&v.spo2==null&&v.pulse==null){toast('Enter at least one reading');return}
   pt(a.pid).vitals.push(v);o.result=[v.sys!=null?'BP '+v.sys+'/'+(v.dia||'?'):'',v.pulse!=null?'pulse '+v.pulse:'',v.spo2!=null?'SpO2 '+v.spo2+'%':'',v.sugar!=null?'sugar '+v.sugar:''].filter(Boolean).join(' · ');
  }
  o.status='done';o.doneTs=Date.now();o.doneBy=u.name;o.note=note;audit('Completed: '+o.title+(o.result?' ('+o.result+')':''),a.pid);toast('Recorded');render();
 },
 'a-note'(fm){const a=adm(fm.dataset.aid),fd=new FormData(fm),u=staff();a.notes.push({at:Date.now(),by:u.name,text:fd.get('text').trim(),esc:!!fd.get('esc'),resolved:false});audit((fd.get('esc')?'Escalated to doctor: ':'Ward note: ')+fd.get('text').trim().slice(0,80),a.pid);toast(fd.get('esc')?'Doctor alerted':'Note added');render()},
 'a-discharge'(fm){const a=adm(fm.dataset.aid),fd=new FormData(fm),u=staff(),fid=uid('F');
  a.status='discharged';a.dischargedOn=plusDays(0);
  DB.followups.push({id:fid,pid:a.pid,title:'Post-discharge review – '+a.reason,dept:fd.get('dept'),doctor:u.name,due:fd.get('due'),time:'10:00',instructions:fd.get('ins'),docs:fd.get('docs').split(',').map(s=>s.trim()).filter(Boolean),docsReady:[],barriers:[],contacts:[],status:'pending',confirmed:false,planApproved:false,reschedReq:null,callback:false,note:''});
  audit('Patient discharged; follow-up scheduled for '+fd.get('due'),a.pid);toast('Discharged. Follow-up created for the coordinator.');go('#/admin/case/'+fid)},
 'ph-disp'(fm){
  const rx=DB.rx.find(r=>r.id===fm.dataset.id),p=pt(rx.pid),fd=new FormData(fm),u=staff(),items=[];let flagged=false;
  for(let i=0;i<rx.items.length;i++){const it=rx.items[i],q=+fd.get('q'+i)||0;if(q<=0)continue;const s=itemStat(rx,it);if(q>s.rem){toast('Quantity for '+it.name+' is more than the remaining prescribed amount ('+s.rem+')');return}if(allergyHits(p,it.name).length)flagged=true;items.push({name:it.name,qty:q})}
  if(!items.length){toast('Enter a quantity to dispense');return}
  if(!fd.get('verify')){toast('Please confirm identity and prescription check');return}
  const presc=(fd.get('presc')||'').trim();
  if(flagged&&!presc){toast('Allergy conflict: dispense only after the prescriber confirms. Enter the prescriber name or do not dispense.');return}
  DB.disp.push({id:uid('S'),rid:rx.id,pid:p.id,date:plusDays(0),by:u.name,items,override:flagged?presc:''});
  if(rx.items.every(it=>itemStat(rx,it).rem===0))rx.status='completed';
  audit('Dispensed: '+items.map(x=>x.name+' × '+x.qty).join(', ')+(flagged?' (allergy flag, prescriber '+presc+')':''),p.id);toast('Dispensing recorded');render()},
 'ai-review'(fm){
  const s=DB.ai.find(x=>x.id===fm.dataset.id),u=staff(),fd=new FormData(fm),dec=fd.get('dec'),note=(fd.get('note')||'').trim();
  if(!s||s.status!=='pending'||!s.requires.includes(u.role)||s.approvals[u.role]){toast('This suggestion is no longer waiting for you');return}
  if((dec==='reject'||dec==='modify')&&!note){toast('Please add a note / reason');return}
  const orig=JSON.stringify(s.payload);
  if(dec==='modify'){
   if(s.type==='expedite')s.payload.date=fd.get('date')||s.payload.date;
   else if(s.type==='sms'||s.type==='note')s.payload.text=(fd.get('text')||'').trim()||s.payload.text;
   else if(s.type==='order'){s.payload.title=(fd.get('title')||'').trim()||s.payload.title;s.payload.inMin=+fd.get('inMin')||s.payload.inMin}
   Object.keys(s.approvals).forEach(r=>{if(r!==u.role)delete s.approvals[r]});
  }
  s.approvals[u.role]={by:u.name,at:Date.now(),decision:dec,note};
  const st=DB.stats[s.type]||(DB.stats[s.type]={a:0,m:0,r:0});st[dec==='approve'?'a':dec==='modify'?'m':'r']++;
  DB.fb.push({id:uid('FB'),at:Date.now(),suggestion:s.id,type:s.type,kind:s.kind,patientId:s.pid,role:u.role,decision:dec,note,signals:{strength:s.strength,reasons:s.reasons},proposed:JSON.parse(orig),final:s.payload});
  let msg;
  if(dec==='reject'){s.status='rejected';msg='Rejected. Your reason is saved as AI feedback.'}
  else if(s.requires.every(r=>s.approvals[r])){s.status='approved';applyAI(s);msg='All required approvals done – action applied and portal updated.'}
  else msg='Recorded. Waiting for: '+s.requires.filter(r=>!s.approvals[r]).map(r=>ROLEL[r]).join(', ')+'.';
  audit('AI suggestion '+(dec==='approve'?'approved':dec==='modify'?'edited & approved':'rejected')+': '+s.title+(note?' – '+note:''),s.pid);toast(msg);go('#/admin/ai')}
};
document.addEventListener('click',e=>{const el=e.target.closest('[data-act]');if(el&&handlers[el.dataset.act]){e.preventDefault();handlers[el.dataset.act](el)}});
document.addEventListener('submit',e=>{const fm=e.target.closest('form[data-form]');if(fm&&forms[fm.dataset.form]){e.preventDefault();forms[fm.dataset.form](fm,e.submitter)}});
document.addEventListener('input',e=>{if(e.target.dataset&&e.target.dataset.filter)applyFilters()});
document.addEventListener('change',e=>{
 const el=e.target,c=el.dataset&&el.dataset.change;if(!c)return;
 if(c==='lang'){LANG=el.value;store.set(LANG_KEY,LANG);document.documentElement.lang=LANG;render()}
 else if(c==='doc'){const f=fu(el.dataset.id),i=+el.dataset.i;f.docsReady=el.checked?[...new Set(f.docsReady.concat(i))]:f.docsReady.filter(x=>x!==i);save()}
 else if(c==='round'){UI.round=el.checked;render()}
 else if(c==='tpl'){const f=fu(el.dataset.fid),ta=el.closest('form').querySelector('[name=text]');ta.value=fillTpl(el.value,pt(f.pid),f)}
 else if(c==='openpt'){if(el.value)go('#/admin/patient/'+el.value)}
});
document.documentElement.lang=LANG;
render();