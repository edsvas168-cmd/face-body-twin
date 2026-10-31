/* YouCam tasks: private, budget-protected demo avatars only.
 * No client-supplied YouCam effects or arbitrary image URLs are accepted.
 */
const {timingSafeEqual}=require('node:crypto');
const {catalog}=require('../shared/catalog.js');
const engine=require('../shared/scenario-engine.js');
const origin='https://yce-api-01.makeupar.com';
const host='https://face-body-twin.vercel.app';
function isAuthorized(input){
 const secret=process.env.YOUCAM_DEMO_ACCESS_CODE;
 if(typeof secret!=='string'||secret.length<16||typeof input!=='string')return false;
 const a=Buffer.from(secret),b=Buffer.from(input);
 return a.length===b.length&&timingSafeEqual(a,b);
}
module.exports=async function handler(req,res){
 res.setHeader('Cache-Control','no-store');
 res.setHeader('X-Content-Type-Options','nosniff');
 if(req.method!=='POST')return res.status(405).json({error:'Method not allowed'});
 if(process.env.YOUCAM_LEGACY_ENABLED!=='true')return res.status(410).json({error:'Legacy face-reshape tests are retired. Use the new Skin Journey workflow.'});
 if(process.env.YOUCAM_DEMO_ENABLED!=='true')return res.status(503).json({error:'Private YouCam tests are disabled until the owner enables them.'});
 if(!process.env.YOUCAM_API_KEY)return res.status(503).json({error:'YouCam API key is not configured.'});
 const input=req.body&&typeof req.body==='object'?req.body:{};
 if(!isAuthorized(input.accessCode))return res.status(403).json({error:'Private test access code is missing or incorrect.'});
 if(input.consent!==true)return res.status(400).json({error:'Please agree to the YouCam public-demo-image processing notice.'});
 if(!['female','male'].includes(input.gender)||!['18-25','26-40','41-60','61-80'].includes(input.age))
  return res.status(400).json({error:'Choose a supported public demo avatar.'});
 if(input.scenarioId!==null&&typeof input.scenarioId!=='string')return res.status(400).json({error:'Invalid scenario.'});
 const items=Array.isArray(input.items)?input.items:[];
 let plan;
 try{plan=engine.resolveScenario({scenarioId:input.scenarioId||null,items,catalog});}
 catch(e){return res.status(400).json({error:e.message});}
 if(plan.risky)return res.status(400).json({error:'The selected amount exceeds the visual demo safety threshold.'});
 if(!plan.apiEligible)return res.status(400).json({error:plan.reason||'This scenario has no available YouCam visual effect.'});
 const src=host+'/assets/avatars/face/'+input.gender+'-'+input.age+'-face.jpg';
 const task=engine.buildYouCamTask(src,plan);
 try{
  const upstream=await fetch(origin+task.endpoint,{
   method:'POST',headers:{Authorization:'Bearer '+process.env.YOUCAM_API_KEY,'Content-Type':'application/json'},
   body:JSON.stringify(task.payload),signal:AbortSignal.timeout(15000)
  });
  const result=await upstream.json().catch(()=>({}));
  const taskId=result?.data?.task_id;
  if(!upstream.ok||typeof taskId!=='string'||!taskId)return res.status(upstream.status===429?429:502).json({
   error:upstream.status===401?'YouCam authorization failed. Check the API key.':upstream.status===429?'YouCam rate or quota limit reached.':'YouCam could not start the visual scenario. Please review API access and the demo photo.'
  });
  return res.status(200).json({taskId,kind:task.kind,tier:plan.tier,intensity:plan.intensity,
   disclaimer:'Illustrative visual edit; NOT an individualized food-to-skin medical prediction.'});
 }catch(e){return res.status(502).json({error:'Unable to reach YouCam. Please try again later.'});}
};
