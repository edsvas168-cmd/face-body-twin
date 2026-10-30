const test=require('node:test');
const assert=require('node:assert/strict');
const {catalog}=require('../shared/catalog.js');
const E=require('../shared/scenario-engine.js');
const food=(name,amount,unit)=>({food:name,amount,unit});
const plan=(input)=>E.resolveScenario({...input,catalog});
test('one and ten 330ml cans use known reference label',()=>{
 const one=E.calculateNutrition([food('cola',1,'can')],catalog);
 const ten=E.calculateNutrition([food('cola',10,'can')],catalog);
 assert.equal(one.sugar,35);assert.equal(one.kcal,139);
 assert.equal(ten.sugar,350);assert.equal(ten.kcal,1390);
 assert.equal(one.hasUnknownSodium,true);
});
test('salt converts g to mg sodium, with no calories',()=>{
 const t=E.calculateNutrition([food('salt',10,'g')],catalog);
 assert.equal(t.sodium,4000);assert.equal(t.kcal,0);assert.equal(t.saltG,10);
});
test('sodium mapping saturates, and is zero at WHO reference threshold',()=>{
 assert.equal(E.sodiumIntensity(2000),0);
 assert.equal(E.sodiumIntensity(4000),0.5);
 assert.equal(E.sodiumIntensity(6000),1);
 assert.equal(E.sodiumIntensity(40000),1);
 assert.deepEqual(E.saltVisualization(4000).features,{face_width:12,face_reshape_left:6,face_reshape_right:6});
});
test('preset salt is an independent medium illustration, not a measured intake',()=>{
 const r=plan({scenarioId:'salt',items:[]});
 assert.equal(r.apiKind,'face-reshape');assert.equal(r.totals.sodium,0);
 assert.equal(r.tier,'medium');assert.equal(r.intensity,0.5);
});
test('manual salt supports face reshape but extreme dose is blocked',()=>{
 const normal=plan({items:[food('salt',10,'g')]});
 assert.equal(normal.apiEligible,true);assert.equal(normal.tier,'medium');
 const extreme=plan({items:[food('salt',15,'g')]});
 assert.equal(extreme.apiEligible,false);assert.equal(extreme.risky,true);
});
test('incomplete sodium records do not give a misleading precise visual map',()=>{
 const mixed=plan({items:[food('cola',1,'can'),food('salt',10,'g')]});
 assert.equal(mixed.totals.hasUnknownSodium,true);assert.equal(mixed.apiEligible,false);
});
test('balanced is a cosmetic Skin Simulation example',()=>{
 const p=plan({scenarioId:'balanced',items:[]});
 assert.equal(p.apiKind,'skin-simulation');
 assert.deepEqual(p.parameters,{radiance:.25,texture:.20,pores:.15});
});
test('unverified adverse-skin scenarios cannot generate YouCam requests',()=>{
 for(const scenarioId of ['fastfood','energy','transfat','sun']){
  const p=plan({scenarioId,items:[]});assert.equal(p.apiEligible,false);
  assert.throws(()=>E.buildYouCamTask('https://example.com/face.jpg',p));
 }
});
test('sugar remains an informative no-API scenario',()=>{
 const p=plan({items:[food('cola',1,'can')]});
 assert.equal(p.kind,'sugar');assert.equal(p.apiEligible,false);
});
test('actual API payload uses documented face reshape feature names',()=>{
 const req=E.buildYouCamTask('https://example.com/face.jpg',plan({scenarioId:'salt',items:[]}));
 assert.equal(req.endpoint,'/s2s/v2.0/task/face-reshape');
 assert.deepEqual(req.payload.features,{face_width:12,face_reshape_left:6,face_reshape_right:6});
 assert.equal(req.payload.version,'1.0');
 assert.deepEqual(req.payload.global,{skin_smooth_strength:0,skin_smooth_color_intensity:0});
});
test('client cannot supply arbitrary food ids, units or quantities',()=>{
 for(const items of [[food('unknown',1,'g')],[food('salt',101,'g')],[food('salt',-1,'g')],[food('salt',1,'not_a_unit')]]){
  assert.throws(()=>E.calculateNutrition(items,catalog));
 }
});
test('cannot combine an explicit preset and a custom meal',()=>{
 assert.throws(()=>plan({scenarioId:'salt',items:[food('salt',10,'g')]}));
});
