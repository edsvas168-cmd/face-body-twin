/* Public demo-avatar skincare workflow. API results are aesthetic estimates, not diagnoses. */
'use strict';
const genders=['female','male'], ages=['18-25','26-40','41-60','61-80'], scenarios=['salt','fastfood','transfat','energy','balanced','sun'];
function avatarUrl(gender,age,scenario,scenarioPhoto,host='https://face-body-twin.vercel.app'){
 if(!genders.includes(gender)||!ages.includes(age)||!scenarios.includes(scenario))throw Error('Invalid public demo selection');
 const filename=gender+'-'+age+'-face.jpg';
 return host+(scenarioPhoto?'/assets/scenarios/'+scenario+'/':'/assets/avatars/face/')+filename;
}
function taskDefinition(action,src,scenario){
 if(!/^https:\/\//.test(src))throw Error('Public HTTPS avatar required');
 if(action==='analyze')return {kind:'skin-analysis',version:'v2.1',payload:{
  src_file_url:src,format:'json',
  dst_actions:['skin_type','moisture','texture','redness','acne','eye_bag','dark_circle_v2','radiance','oiliness','pore']
 }};
 if(action==='improve')return {kind:'skin-simulation',version:'v2.0',payload:{
  src_file_url:src, eye_bags:scenario==='salt'?0.5:0.25, dark_circle:0.25,
  redness:0.2, texture:0.3, radiance:0.3
 }};
 throw Error('Unknown action');
}
const names={moisture:'Увлажнённость',texture:'Текстура',redness:'Покраснение',acne:'Высыпания',eye_bag:'Зона под глазами',dark_circle_v2:'Тёмные круги',dark_circle:'Тёмные круги',radiance:'Сияние',oiliness:'Жирность',pore:'Поры'};
function parseAnalysis(results){
 if(!results||typeof results!=='object'||Array.isArray(results))return {scores:[],skinType:null,overall:null};
 const raw=results.results&&typeof results.results==='object'?results.results:results;
 const items=Array.isArray(raw.output)?raw.output:(Array.isArray(raw)?raw:[]);
 const all=[...items];
 for(const k of Object.keys(names)){
  if(raw[k]&&typeof raw[k]==='object')all.push({...raw[k],type:k});
 }
 const scores=[];const seen=new Set();
 for(const x of all){
  if(!x||typeof x!=='object'||typeof x.type!=='string')continue;
  const type=x.type.startsWith('hd_')?x.type.slice(3):x.type;
  if(!names[type]||seen.has(type))continue;
  const score=Number(x.ui_score??x.raw_score);
  if(!Number.isFinite(score)||score<0||score>100)continue;
  scores.push({type,label:names[type],score:Math.round(score)});seen.add(type);
 }
 const obj=raw.skin_type||all.find(x=>x?.type==='skin_type');
 const st=typeof obj==='string'?obj:obj?.whole??obj?.result?.whole??null;
 let overall=Number(raw.all??raw.overall?.ui_score??raw.overall);
 if(!Number.isFinite(overall)||overall<0||overall>100)overall=null;
 return {scores:scores.sort((a,b)=>a.score-b.score),skinType:typeof st==='string'?st.slice(0,60):null,overall:overall===null?null:Math.round(overall)};
}
function careForAnalysis(parsed,scenario){
 const basics=[
  {name:'Мягкое очищающее средство',detail:'Без агрессивного скрабирования; по переносимости кожи.'},
  {name:'Увлажняющий крем',detail:'Без отдушки; для защиты кожного барьера.'},
  {name:'Солнцезащитное средство SPF 30+',detail:'Широкого спектра для дневного использования.'}
 ];
 if(parsed?.scores?.length){
  const concern=parsed.scores[0];
  if(concern.score<70){
   const specific={
    moisture:{name:'Увлажняющий крем с церамидами',detail:'Для поддержки барьера при ощущении сухости; не лечение внутренних причин.'},
    acne:{name:'Некомедогенный уход',detail:'Лёгкий крем и мягкое очищение; при стойких высыпаниях — дерматолог.'},
    redness:{name:'Уход без отдушек',detail:'Минималистичные формулы для чувствительной кожи.'},
    eye_bag:{name:'Лёгкий крем для кожи вокруг глаз',detail:'Косметический комфорт; не устраняет задержку жидкости из-за натрия.'},
    texture:{name:'Бережный увлажняющий крем',detail:'Прежде всего поддержка кожного барьера.'},
    oiliness:{name:'Лёгкий некомедогенный крем',detail:'Без ощущения плотной плёнки.'}
   }[concern.type];
   if(specific)basics.splice(1,1,specific);
  }
 }
 return {products:basics,source:parsed?.scores?.length?'Категории средств подобраны нашими правилами по оценкам YouCam, без подбора конкретных брендов.':'Базовый уход: оценок YouCam пока нет, персонализация не выполнена.',
 note:scenario==='salt'?'Косметика не лечит отёчность от избытка натрия. Не используйте уход вместо консультации при выраженном/стойком отёке.':'Уход не заменяет лечение; реакция кожи индивидуальна.'};
}
module.exports={avatarUrl,taskDefinition,parseAnalysis,careForAnalysis};
