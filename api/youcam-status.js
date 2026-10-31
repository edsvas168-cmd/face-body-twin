/* Poll YouCam for the task kind returned by the start endpoint. */
const {timingSafeEqual}=require('node:crypto');
function allowedAccess(input){
 const code=process.env.YOUCAM_DEMO_ACCESS_CODE;
 if(typeof code!=='string'||code.length<16||typeof input!=='string')return false;
 const a=Buffer.from(code),b=Buffer.from(input);
 return a.length===b.length&&timingSafeEqual(a,b);
}
function extractUrl(value,depth=0){
 if(depth>3||!value)return null;
 if(typeof value==='string')return /^https:\/\//i.test(value)?value:null;
 if(Array.isArray(value))return value.map(x=>extractUrl(x,depth+1)).find(Boolean)||null;
 if(typeof value==='object'){
  for(const key of ['url','image_url','dst_file_url','output_url','file_url','result_url','results','result']){
   if(key in value){const found=extractUrl(value[key],depth+1);if(found)return found;}
  }
 }
 return null;
}
module.exports=async function handler(req,res){
 res.setHeader('Cache-Control','no-store');
 if(req.method!=='GET')return res.status(405).json({error:'Method not allowed'});
 if(process.env.YOUCAM_LEGACY_ENABLED!=='true')return res.status(410).json({error:'Legacy face-reshape tests are retired. Use the new Skin Journey workflow.'});
 if(process.env.YOUCAM_DEMO_ENABLED!=='true'||!process.env.YOUCAM_API_KEY)return res.status(503).json({error:'Private YouCam demo is disabled.'});
 if(!allowedAccess(req.headers?.['x-demo-access-code']))return res.status(403).json({error:'Unauthorized private test.'});
 const kind=String(req.query?.kind||'');
 const taskId=String(req.query?.taskId||'');
 if(!['face-reshape','skin-simulation'].includes(kind)||!/^[A-Za-z0-9_-]{10,220}$/.test(taskId))
  return res.status(400).json({error:'Invalid task type or reference.'});
 try{
  const up=await fetch('https://yce-api-01.makeupar.com/s2s/v2.0/task/'+kind+'/'+encodeURIComponent(taskId),{
   headers:{Authorization:'Bearer '+process.env.YOUCAM_API_KEY},signal:AbortSignal.timeout(12000)
  });
  const body=await up.json().catch(()=>({}));
  if(!up.ok)return res.status(502).json({error:'Could not retrieve the YouCam task status.'});
  const data=body.data||{};
  const current=String(data.task_status||'running').toLowerCase();
  if(current==='error'||current==='failed')return res.status(200).json({status:'error',error:'The photo could not be processed. Try a clear, front-facing demo image.'});
  if(current!=='success')return res.status(200).json({status:'running'});
  const resultUrl=extractUrl(data.results)||extractUrl(data.result)||extractUrl(data);
  return res.status(200).json({status:'success',resultUrl,
   note:resultUrl?'Cosmetic illustration, not a predicted consequence of food.':'Result image URL requires response-schema verification.'});
 }catch(e){return res.status(502).json({error:'YouCam request timed out or failed.'});}
};
