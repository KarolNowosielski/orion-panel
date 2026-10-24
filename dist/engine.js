export const TYPES={main:'Oświetlenie główne',sconce:'Kinkiet',led:'Taśma LED',blind:'Roleta',curtain:'Karnisz',input:'Wejście binarne'};
export const uid=()=>globalThis.crypto.randomUUID();
export function validChannels(type,n){return Number.isInteger(n)&&(type==='dimmer'?n>=1&&n<=24:n>=2&&n<=24&&n%2===0);}
export const isMotor=c=>c.type==='blind'||(c.type==='curtain'&&c.motor!=='impulse');
export const moduleType=c=>c.type==='input'?'input':c.control==='dim'?'dimmer':'relay';
export function validateProject(p){
 if(!p||p.version!==1||!Array.isArray(p.circuits)||!Array.isArray(p.modules)||p.circuits.length>3000||p.modules.length>500)throw Error('Nieprawidłowy format lub rozmiar projektu.');
 if(typeof p.name!=='string'||p.name.length>150)throw Error('Nieprawidłowa nazwa projektu.');
 for(const m of p.modules)if(!m||!['relay','dimmer','input'].includes(m.type)||!validChannels(m.type,m.channels)||!['KNX','LOXONE'].includes(m.system)||typeof m.name!=='string'||typeof m.id!=='string'||typeof m.blindCapable!=='boolean')throw Error('Nieprawidłowa konfiguracja modułu.');
 for(const c of p.circuits)if(!c||!Object.hasOwn(TYPES,c.type)||typeof c.id!=='string'||typeof c.room!=='string'||typeof c.name!=='string'||!['KNX','LOXONE'].includes(c.system)||!['relay','dim'].includes(c.control)||!Number.isFinite(c.watts)||c.watts<0||c.watts>100000||(isMotor(c)||c.type==='input')&&c.control==='dim')throw Error('Nieprawidłowy obwód.');
 if(new Set(p.circuits.map(c=>c.id)).size!==p.circuits.length||new Set(p.modules.map(m=>m.id)).size!==p.modules.length)throw Error('Powtórzone identyfikatory.');
 if(!p.settings||!Number.isInteger(p.settings.rcds)||p.settings.rcds<2||p.settings.rcds>12||!Number.isInteger(p.settings.maxPerBreaker)||p.settings.maxPerBreaker<1||p.settings.maxPerBreaker>20)throw Error('Nieprawidłowe ustawienia zabezpieczeń.');
 return p;
}
export function plan(p){
 const used=new Map(p.modules.map(m=>[m.id,Array(m.channels).fill(null)])),assignments=[],breakers=[];
 const priority={main:0,sconce:1,led:2,blind:3,curtain:4,input:5};
 const sorted=[...p.circuits].sort((a,b)=>priority[a.type]-priority[b.type]||a.room.localeCompare(b.room,'pl')||a.id.localeCompare(b.id));
 const roomRcd=new Map();
 for(const c of sorted){
  const a={...c,channels:[],moduleId:null,breaker:null,rcd:null,terminal:null};
  const count=isMotor(c)?2:1,type=moduleType(c);
  for(const m of p.modules.filter(m=>m.type===type&&m.system===c.system&&(!isMotor(c)||m.blindCapable))){
   const slots=used.get(m.id);let start=-1;
   for(let i=0;i<=slots.length-count;i++){if(count===2&&i%2!==0)continue;if(slots.slice(i,i+count).every(x=>x===null)){start=i;break;}}
   if(start<0)continue;a.moduleId=m.id;a.channels=Array.from({length:count},(_,i)=>start+i+1);for(const ch of a.channels)slots[ch-1]=c.id;break;
  }
  if(c.type!=='input'){
   const seen=roomRcd.get(c.room)||new Map(),lighting=['main','sconce','led'].includes(c.type);let rcd=seen.get(c.type);
   if(rcd===undefined){const prior=[...seen.values()];const candidates=Array.from({length:p.settings.rcds},(_,i)=>i+1);rcd=candidates.sort((a,b)=>prior.filter(x=>x===a).length-prior.filter(x=>x===b).length||breakers.filter(x=>x.rcd===a).length-breakers.filter(x=>x.rcd===b).length||a-b)[0];if(lighting){seen.set(c.type,rcd);roomRcd.set(c.room,seen);}}
   let b=breakers.find(x=>x.rcd===rcd&&x.type===c.type&&x.system===c.system&&x.ids.length<p.settings.maxPerBreaker);
   if(!b){b={id:'F'+String(breakers.length+1).padStart(2,'0'),rcd,type:c.type,system:c.system,ids:[],watts:0};breakers.push(b);}b.ids.push(c.id);b.watts+=c.watts;a.breaker=b.id;a.rcd=rcd;
  }
  assignments.push(a);
 }
 assignments.forEach((a,i)=>a.terminal='X'+String(i+1).padStart(3,'0'));
 const warnings=[];
 for(const a of assignments)if(!a.moduleId)warnings.push({id:a.id,text:`${a.room} · ${a.name}: brak wolnych, zgodnych kanałów ${moduleType(a)} (${a.system})${isMotor(a)?' z obsługą rolet':''}.`});
 for(const [room,types]of roomRcd){const vals=[...types.values()];if(new Set(vals).size<vals.length)warnings.push({text:`${room}: ${vals.length} grup oświetlenia na ${p.settings.rcds} RCD — pełna separacja wymaga większej liczby grup RCD.`});}
 return {assignments,used,breakers,warnings};
}
export function demo(){
 const circuits=[];for(const room of ['Salon','Kuchnia','Sypialnia','Łazienka'])for(const [type,name,watts,control] of [['main','Oświetlenie główne',100,'relay'],['sconce','Kinkiety',40,'relay'],['led','LED dekoracyjny',60,'dim'],['blind','Roleta okienna',150,'relay']])circuits.push({id:uid(),room,name,type,watts,control,system:'KNX',motor:'directional'});
 circuits.push({id:uid(),room:'Salon',name:'Przycisk przy wejściu',type:'input',watts:0,control:'relay',system:'KNX'});
 return {version:1,name:'Dom pod gwiazdami',circuits,modules:[{id:uid(),name:'A1 · Aktor przełączający',type:'relay',system:'KNX',channels:24,blindCapable:true},{id:uid(),name:'D1 · Aktor ściemniający',type:'dimmer',system:'KNX',channels:4,blindCapable:false},{id:uid(),name:'B1 · Wejścia binarne',type:'input',system:'KNX',channels:4,blindCapable:false}],settings:{rcds:3,maxPerBreaker:4}};
}
export function csv(rows){const safe=x=>{let s=String(x??'');if(/^[=+@\-\t\r]/.test(s))s="'"+s;return '"'+s.replaceAll('"','""')+'"';};return '\uFEFF'+rows.map(r=>r.map(safe).join(';')).join('\r\n');}


