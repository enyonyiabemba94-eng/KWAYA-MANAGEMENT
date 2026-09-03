(function(){
  const SUPABASE_URL='https://xulnkdrgjgajmcqntwga.supabase.co';
  const SUPABASE_KEY='sb_publishable_J2OrXvOnQXxrf5t3XPmigg_5ULrsWO2';
  const db=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY);
  window.KWAYA_AUTH={db,isAdmin:async function(user){
    if(!user)return false;
    if(user.app_metadata?.role==='admin')return true;
    const {data,error}=await db.from('profiles').select('role').eq('id',user.id).maybeSingle();
    if(error)return false;
    return data?.role==='admin';
  }};
  db.auth.getSession().then(async ({data:{session}})=>{
    if(!session || !(await window.KWAYA_AUTH.isAdmin(session.user))) location.replace('login.html');
  });
})();