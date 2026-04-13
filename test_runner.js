const fs = require('fs');
const path = 'C:/coder/LeadScript_v2/index.html';
const html = fs.readFileSync(path, 'utf8');
const match = html.match(/<script>([\s\S]*?)<\/script>/);
if (!match) throw new Error('script not found');
const code = match[1];

class ClassList {
  constructor(){ this.set=new Set(); }
  add(c){ this.set.add(c); }
  remove(c){ this.set.delete(c); }
  toggle(c,v){ if(v===undefined){ this.set.has(c)?this.set.delete(c):this.set.add(c);} else {v?this.set.add(c):this.set.delete(c);} }
}
class Element {
  constructor(id=''){ this.id=id; this.value=''; this.textContent=''; this.children=[]; this.options=[]; this.className=''; this.classList=new ClassList(); this.onclick=null; this.onsubmit=null; this.style={}; this._innerHTML=''; }
  appendChild(el){ this.children.push(el); return el; }
  scrollIntoView(){}
  set innerHTML(v){ this._innerHTML=String(v); this.children=[]; }
  get innerHTML(){ return this._innerHTML; }
}

const ids = new Set();
for (const m of code.matchAll(/q\('([^']+)'\)/g)) ids.add(m[1]);
const byId = {};
for (const id of ids) byId[id] = new Element(id);

// Configure select options used by script
if (byId.atype) byId.atype.options = [{textContent:''},{textContent:''}];
if (byId.mode) byId.mode.value = 'default';
if (byId.submode) byId.submode.value = 'universal';
if (byId.niche) byId.niche.value = 'expert blog';
if (byId.audience) byId.audience.value = 'entrepreneurs 25-40';
if (byId.tone) byId.tone.value = 'friendly and confident';
if (byId.goal) byId.goal.value = 'get more leads';
if (byId.platform) byId.platform.value = 'Netflix';
if (byId.budget) byId.budget.value = 'mid';
if (byId.atype) byId.atype.value = 'platform_check';

const document = {
  getElementById(id){ if(!byId[id]) byId[id]=new Element(id); return byId[id]; },
  createElement(){ return new Element(); }
};
const store = new Map();
const localStorage = {
  getItem(k){ return store.has(k)?store.get(k):null; },
  setItem(k,v){ store.set(k, String(v)); }
};
function assert(c,m){ if(!c) throw new Error(m); }

global.document = document;
global.localStorage = localStorage;
global.crypto = require('crypto');
global.window = { scrollTo(){} };
global.setTimeout = (fn)=>fn();

try { eval(code); } catch(e){ throw new Error('Init failed: '+e.message); }

// 1) Send and autosave chat
byId.q.value = 'Need a commercial script';
byId.send.onclick();
let chats = JSON.parse(localStorage.getItem('ls2_chats') || '[]');
assert(chats.length >= 1, 'autosave chat failed');
assert(byId.convList.children.length >= 1, 'left conversations list empty');

// 2) Generate script
byId.idea.value = 'Promo for coffee app';
byId.genForm.onsubmit({preventDefault(){}});
assert((byId.result.textContent||'').length > 20, 'generate failed');

// 3) Save script
byId.saveScript.onclick();
let scripts = JSON.parse(localStorage.getItem('ls2_scripts') || '[]');
assert(scripts.length >= 1, 'save script failed');
assert(byId.scripts.children.length >= 1, 'scripts UI list empty');

// 4) Language switch
byId.ru.onclick();
assert((byId.txResult.textContent||'').includes('Результат'), 'RU switch failed');
byId.en.onclick();
assert((byId.txResult.textContent||'') === 'Result', 'EN switch failed');

// 5) Platform QA
byId.atype.value = 'platform_check';
byId.platform.value = 'Netflix';
byId.script.value = 'Character has conflict and arc. Visual beats. CTA finale.';
byId.qaForm.onsubmit({preventDefault(){}});
assert(/Score:|Скоринг:/.test(byId.analysis.textContent||''), 'platform scoring missing');

// 6) Budget QA
byId.atype.value = 'budget_estimate';
byId.budget.value = 'high';
byId.script.value = 'Scene 1\nINT. ROOM\nDialogue\nScene 2\nEXT. STREET\nCrowd and chase\nScene 3\nNight rain car';
byId.qaForm.onsubmit({preventDefault(){}});
assert(/Total:|Итог:/.test(byId.analysis.textContent||''), 'budget total missing');

// 7) Conversation delete
const firstConv = byId.convList.children[0];
assert(!!firstConv, 'no conversation item rendered');
// find delete button inside first conversation item
let delBtn = null;
for(const ch of firstConv.children){ if(ch.className==='r'){ for(const b of ch.children){ if((b.textContent||'').toLowerCase().includes('delete') || (b.textContent||'').includes('Удалить')) delBtn=b; } } }
assert(!!delBtn, 'delete conversation button missing');
delBtn.onclick();
chats = JSON.parse(localStorage.getItem('ls2_chats') || '[]');
assert(chats.length === 0, 'conversation delete failed');

console.log('LEADSCRIPT_V2_ALL_TESTS_PASSED');
