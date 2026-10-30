const base='https://yce-api-01.makeupar.com/s2s/v2.0/task/skin-simulation/';
module.exports=async function handler(req,res){
 res.setHeader('Cache-Control','no-store');
 if(req.method!=='GET')return res.status(405).json({error:'Method not allowed'});
 if(process.env.YOUCAM_DEMO_ENABLED!=='true'||!process.env.YOUCAM_API_KEY)return res.status(503).json({error:'Live AI demo is not configured.'});
 const taskId=String(req.query?.taskId||'');
 if(!/^[A-Za-z0-9_\-]{10,220}$/.test(taskId))return res.status(400).json({error:'Invalid task reference.'});
 try{const up=await fetch(base+encodeURIComponent(taskId),{headers:{Authorization:'Bearer '+process.env.YOUCAM_API_KEY},signal:AbortSignal.timeout(12000)});
 const body=await up.json().catch(()=>({}));
 if(!up.ok)return res.status(502).json({error:'Could not retrieve the YouCam result.'});
 const d=body.data||{},taskStatus=d.task_status||'running';
 if(taskStatus==='error')return res.status(200).json({status:'error',error:'YouCam could not process this image.'});
 if(taskStatus!=='success')return res.status(200).json({status:'running'});
 const raw=d.results;
 const url=typeof raw==='string'?raw:(raw?.url||raw?.image_url||raw?.dst_file_url||null);
 return res.status(200).json({status:'success',resultUrl:typeof url==='string'&&url.startsWith('https://')?url:null,unparsedResult:!url});
 }catch(e){return res.status(502).json({error:'YouCam status check timed out.'});}
};
