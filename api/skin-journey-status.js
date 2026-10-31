/* Restricted status and carefully parsed YouCam results, without exposing full raw response. */
'use strict';
const {timingSafeEqual}=require('node:crypto');
const {parseAnalysis,careForAnalysis}=require('../shared/skin-journey.js');
function authorized(code){const expected=process.env.YOUCAM_DEMO_ACCESS_CODE;if(typeof expected!=='string'||expected.length<16||typeof code!=='string')return false;const a=Buffer.from(expected),b=Buffer.from(code);return a.length===b.length&&timingSafeEqual(a,b);}
function imageUrl(value,depth=0){if(depth>5||!value)return null;if(typeof value==='string')return /^https:\/\//.test(value)?value:null;
 if(Array.isArray(value))return value.map(x=>imageUrl(x,depth+1)).find(Boolean)||null;
 if(typeof value==='object')for(const key of ['image_url','dst_file_url','output_url','url','result_url','results','result','output']){if(key in value){const x=imageUrl(value[key],depth+1);if(x)return x;}}return null;}
module.exports=async function(req,res){
 res.setHeader('Cache-Control','no-store');
 if(req.method!=='GET')return res.status(405).json({error:'Only GET supported'});
 if(process.env.YOUCAM_DEMO_ENABLED!=='true'||!process.env.YOUCAM_API_KEY)return res.status(503).json({error:'YouCam private tests disabled.'});
 if(!authorized(req.headers['x-demo-access-code']))return res.status(403).json({error:'Private test access denied.'});
 const action=String(req.query?.action||''),id=String(req.query?.taskId||''),scenario=String(req.query?.scenario||'');
 if(!['analyze','improve'].includes(action)||!/^[A-Za-z0-9_-]{10,220}$/.test(id)||!['salt','fastfood','transfat','energy','balanced','sun'].includes(scenario))return res.status(400).json({error:'Invalid task reference.'});
 const version=action==='analyze'?'v2.1':'v2.0',kind=action==='analyze'?'skin-analysis':'skin-simulation';
 try{
  const up=await fetch('https://yce-api-01.makeupar.com/s2s/'+version+'/task/'+kind+'/'+encodeURIComponent(id),{headers:{Authorization:'Bearer '+process.env.YOUCAM_API_KEY},signal:AbortSignal.timeout(15000)});
  const result=await up.json().catch(()=>({}));
  if(!up.ok)return res.status(502).json({error:'YouCam status is temporarily unavailable.'});
  const data=result.data||{};
  const phase=String(data.task_status||'running').toLowerCase();
  if(phase==='error'||phase==='failed')return res.status(200).json({status:'error',error:'YouCam could not process the character photo. Check framing and dimensions.'});
  if(phase!=='success')return res.status(200).json({status:'running'});
  if(action==='analyze'){
   const results=data.results&&typeof data.results==='object'?data.results:data.result&&typeof data.result==='object'?data.result:{};
   const analysis=parseAnalysis(results);
   return res.status(200).json({status:'success',analysis,care:careForAnalysis(analysis,scenario),note:'Scores describe an edited illustrative character, not a real person or a dietary effect.'});
  }
  const url=imageUrl(data.results)||imageUrl(data.result);
  return res.status(200).json({status:'success',resultUrl:url,note:'YouCam cosmetic image edit only. It does not show recovery from sodium-related water retention.'});
 }catch(e){return res.status(502).json({error:'YouCam status check failed.'});}
};
