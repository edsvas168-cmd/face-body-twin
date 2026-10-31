/* Private skin journey: only whitelisted demo avatars, no public or personal-photo API calls. */
'use strict';
const {timingSafeEqual}=require('node:crypto');
const {avatarUrl,taskDefinition}=require('../shared/skin-journey.js');
function authorized(code){const expected=process.env.YOUCAM_DEMO_ACCESS_CODE;if(typeof expected!=='string'||expected.length<16||typeof code!=='string')return false;const a=Buffer.from(expected),b=Buffer.from(code);return a.length===b.length&&timingSafeEqual(a,b);}
module.exports=async function(req,res){
 res.setHeader('Cache-Control','no-store');
 if(req.method!=='POST')return res.status(405).json({error:'Only POST supported'});
 if(process.env.YOUCAM_DEMO_ENABLED!=='true'||!process.env.YOUCAM_API_KEY)return res.status(503).json({error:'YouCam private tests are switched off or unconfigured.'});
 const body=req.body&&typeof req.body==='object'?req.body:{};
 if(!authorized(body.accessCode))return res.status(403).json({error:'Incorrect private test access code.'});
 if(body.consent!==true)return res.status(400).json({error:'Consent is required before sending the public demo character to YouCam.'});
 if(!['analyze','improve'].includes(body.action)||body.scenarioPhoto!==true&&body.scenarioPhoto!==false)return res.status(400).json({error:'Invalid action or image state'});
 let src,task;
 try{src=avatarUrl(body.gender,body.age,body.scenario,body.scenarioPhoto);task=taskDefinition(body.action,src,body.scenario);}
 catch(e){return res.status(400).json({error:'Choose a supported public demo model and scenario.'});}
 try{
  if(body.scenarioPhoto){
   const check=await fetch(src,{method:'HEAD',signal:AbortSignal.timeout(7000)});
   if(!check.ok||!String(check.headers.get('content-type')||'').startsWith('image/'))return res.status(409).json({error:'The edited scenario photo is unavailable. Use the original demo character.'});
  }
  const up=await fetch('https://yce-api-01.makeupar.com/s2s/'+task.version+'/task/'+task.kind,{method:'POST',
   headers:{Authorization:'Bearer '+process.env.YOUCAM_API_KEY,'Content-Type':'application/json'},
   body:JSON.stringify(task.payload),signal:AbortSignal.timeout(20000)});
  const result=await up.json().catch(()=>({}));
  if(!up.ok||typeof result?.data?.task_id!=='string')return res.status(up.status===429?429:502).json({error:up.status===429?'API quota or rate limit reached.':up.status===401?'Check your new YouCam API key.':'YouCam could not start this task. Verify account access and photo quality.'});
  return res.status(200).json({taskId:result.data.task_id,kind:task.kind,action:body.action,note:'Actual YouCam processing of a public demo character; billed units may apply.'});
 }catch(e){return res.status(502).json({error:'Could not connect to YouCam, or the source image could not be checked.'});}
};
