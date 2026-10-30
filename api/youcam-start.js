// Server-side YouCam skin simulation for hosted demo avatars only.
// Not a dietary outcome forecast. Keep YOUCAM_API_KEY in Vercel environment settings.
const base='https://yce-api-01.makeupar.com/s2s/v2.0/task/skin-simulation';
module.exports=async function handler(req,res){
 res.setHeader('Cache-Control','no-store');
 if(req.method!=='POST')return res.status(405).json({error:'Method not allowed'});
 if(process.env.YOUCAM_DEMO_ENABLED!=='true')return res.status(503).json({error:'Live AI demo is not enabled yet. The illustrative demo remains available.'});
 if(!process.env.YOUCAM_API_KEY)return res.status(503).json({error:'YouCam API key is not configured.'});
 const {gender,age,consent}=req.body||{};
 if(consent!==true)return res.status(400).json({error:'Please accept the remote AI processing notice before continuing.'});
 if(!['female','male'].includes(gender)||!['18-25','26-40','41-60','61-80'].includes(age))return res.status(400).json({error:'Select a supported demo avatar.'});
 // Fixed public demo assets only. Uploaded private photos are NEVER sent through this endpoint.
 const host='https://face-body-twin.vercel.app';
 const src_file_url=host+'/assets/avatars/face/'+gender+'-'+age+'-face.jpg';
 try{
  const upstream=await fetch(base,{method:'POST',headers:{Authorization:'Bearer '+process.env.YOUCAM_API_KEY,'Content-Type':'application/json'},body:JSON.stringify({src_file_url,radiance:0.25,texture:0.2}) ,signal:AbortSignal.timeout(12000)});
  const body=await upstream.json().catch(()=>({}));
  if(!upstream.ok||!body?.data?.task_id)return res.status(upstream.status>=500?502:400).json({error:upstream.status===401?'YouCam authorization failed. Please check the API key.':'YouCam could not start the simulation.'});
  return res.status(200).json({taskId:body.data.task_id,disclaimer:'Cosmetic enhancement demo, NOT a prediction of food effects.'});
 }catch(e){return res.status(502).json({error:'Could not contact YouCam. Please retry later.'});}
};
