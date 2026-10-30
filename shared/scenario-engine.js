/* Shared, deterministic food-to-visual-scenario engine.
 * The mapping is an editorial visual preset, NOT a clinical sodium-to-swelling model.
 * UMD makes exactly the same logic available to the browser and Vercel server functions.
 */
(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  else root.FBTScenarioEngine=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const SODIUM_REFERENCE_MG=2000;
  const SODIUM_EXCESS_CEILING_MG=4000;
  const MAX_ITEM_AMOUNT=100;
  const MAX_ITEMS=25;
  const VALID_SCENARIOS=['salt','fastfood','transfat','energy','balanced','sun'];
  const clamp=(value,min,max)=>Math.min(max,Math.max(min,value));
  const round=(value,places=2)=>Number(value.toFixed(places));

  function calculateNutrition(items,catalog){
    if(!Array.isArray(items)||items.length>MAX_ITEMS)throw new Error('Choose up to 25 food items.');
    const totals={kcal:0,sugar:0,sodium:0,saltG:0,granulatedSugarG:0,hasUnknownSodium:false,hasUnknownSugar:false,hasUnknownKcal:false,itemsCount:items.length};
    for(const item of items){
      const food=catalog[item?.food];
      const qty=Number(item?.amount);
      if(!food||!Number.isFinite(qty)||qty<0.1||qty>MAX_ITEM_AMOUNT||
         !Object.prototype.hasOwnProperty.call(food.units,item?.unit))
        throw new Error('Choose a listed food, supported unit, and amount between 0.1 and 100.');
      const portions=qty*food.units[item.unit];
      for(const [field,unknownField] of [['kcal','hasUnknownKcal'],['sugar','hasUnknownSugar'],['sodium','hasUnknownSodium']]){
        if(food[field]===null||!Number.isFinite(food[field]))totals[unknownField]=true;
        else totals[field]+=portions*food[field];
      }
      if(item.food==='salt')totals.saltG+=portions;
      if(item.food==='sugar')totals.granulatedSugarG+=portions;
    }
    totals.kcal=round(totals.kcal);
    totals.sugar=round(totals.sugar);
    totals.sodium=round(totals.sodium);
    totals.saltG=round(totals.saltG);
    totals.granulatedSugarG=round(totals.granulatedSugarG);
    return totals;
  }

  function sodiumIntensity(sodiumMg){
    if(!Number.isFinite(sodiumMg)||sodiumMg<0)throw new Error('Sodium must be non-negative.');
    const excess=Math.max(0,sodiumMg-SODIUM_REFERENCE_MG);
    return round(clamp(excess/SODIUM_EXCESS_CEILING_MG,0,1),4);
  }
  // Calibratable visual presets, not percentages of physiological swelling.
  const SALT_PRESETS={
    none:{face_width:0,face_reshape_left:0,face_reshape_right:0},
    low:{face_width:6,face_reshape_left:3,face_reshape_right:3},
    medium:{face_width:12,face_reshape_left:6,face_reshape_right:6},
    high:{face_width:18,face_reshape_left:9,face_reshape_right:9}
  };
  function sodiumPreset(intensity){
    if(intensity<0.25)return 'none';
    if(intensity<0.5)return 'low';
    if(intensity<0.75)return 'medium';
    return 'high';
  }
  function saltVisualization(sodiumMg){
    const intensity=sodiumIntensity(sodiumMg),tier=sodiumPreset(intensity);
    return {intensity,tier,features:{...SALT_PRESETS[tier]}};
  }
  const SKIN_PRESET={radiance:0.25,texture:0.20,pores:0.15};
  const DESCRIPTIONS={
    salt:'Possible temporary facial puffiness: face width is an illustrative contour edit, not a physiological prediction.',
    balanced:'An optional brighter/smoother skin appearance edit, not a guaranteed outcome of balanced eating.',
    fastfood:'No verified API mapping from fast food to acne or other skin changes.',
    energy:'No verified API mapping from energy drinks to acne, oiliness or skin changes.',
    transfat:'There is no validated face-appearance transformation for trans-fat exposure.',
    sun:'UV exposure can contribute to photoaging, but this demo does not predict your appearance from sunlight.'
  };
  function resolveScenario({scenarioId=null,items=[],catalog}){
    if(scenarioId!==null&&!VALID_SCENARIOS.includes(scenarioId))throw new Error('Unknown scenario.');
    if(scenarioId!==null&&items.length)throw new Error('Choose a preset or a food combination, not both.');
    const totals=calculateNutrition(scenarioId===null?items:[],catalog);
    const risky=totals.saltG>=15||totals.sodium>=10000||totals.granulatedSugarG>=500;
    let kind=scenarioId,apiKind=null,parameters=null,intensity=0,tier='none',reason='';
    if(scenarioId==='salt'){
      // A fixed visual intensity for one-tap mode; no claim about amounts consumed.
      kind='salt';intensity=0.5;tier='medium';apiKind='face-reshape';parameters={...SALT_PRESETS.medium};
      reason='The preset uses a fixed medium-strength illustration, not an inferred personal sodium intake.';
    }else if(scenarioId==='balanced'){
      kind='balanced';apiKind='skin-simulation';parameters={...SKIN_PRESET};tier='illustrative';
      reason='Skin enhancement is a cosmetic example, not an effect caused by a specific meal.';
    }else if(scenarioId===null){
      if(!items.length){kind='neutral';reason='Select a scenario or add food.';}
      else if(risky){kind='safety';reason='Extreme amount: visual API generation is disabled for safety.';}
      else if(totals.sodium>SODIUM_REFERENCE_MG){
        kind='salt';const v=saltVisualization(totals.sodium);
        intensity=v.intensity;tier=v.tier;
        if(totals.hasUnknownSodium){reason='Some foods have unknown sodium; totals are partial. Visual mapping is disabled.';}
        else if(tier==='none'){reason='Computed intensity is below the first visual preset.';}
        else {apiKind='face-reshape';parameters=v.features;reason='Derived from known sodium using an illustrative, capped mapping.';}
      }else{kind='neutral';reason=totals.hasUnknownSodium?'Sodium information is incomplete, so no precise salt mapping is available.':'No supported appearance-change mapping for this combination.';}
    }else{reason='No verified adverse-skin API effect for this scenario.';}
    const apiEligible=Boolean(apiKind&&!risky);
    return {kind,scenarioId:scenarioId||null,totals,risky,apiKind,apiEligible,parameters,intensity,tier,reason,explanation:DESCRIPTIONS[kind]||'Illustrative information; not an individualized physiological forecast.'};
  }
  function buildYouCamTask(srcFileUrl,plan){
    if(!plan||!plan.apiEligible)throw new Error('This scenario has no verified API visualization.');
    if(typeof srcFileUrl!=='string'||!/^https:\/\//.test(srcFileUrl))throw new Error('A public HTTPS demo image URL is required.');
    if(plan.apiKind==='face-reshape'){
      // Fields and schema from Perfect Corp AI Face Reshape overview.
      return {kind:'face-reshape',endpoint:'/s2s/v2.0/task/face-reshape',payload:{
        src_file_url:srcFileUrl,version:'1.0',source:'yco',
        features:{...plan.parameters}
      }};
    }
    if(plan.apiKind==='skin-simulation'){
      return {kind:'skin-simulation',endpoint:'/s2s/v2.0/task/skin-simulation',payload:{
        src_file_url:srcFileUrl,...plan.parameters
      }};
    }
    throw new Error('Unsupported YouCam endpoint.');
  }
  return Object.freeze({SODIUM_REFERENCE_MG,SODIUM_EXCESS_CEILING_MG,MAX_ITEM_AMOUNT,
    calculateNutrition,sodiumIntensity,sodiumPreset,saltVisualization,resolveScenario,buildYouCamTask});
});
