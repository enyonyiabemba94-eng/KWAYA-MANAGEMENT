(function(){
  const SUPABASE_URL='https://xulnkdrgjgajmcqntwga.supabase.co';
  const SUPABASE_KEY='sb_publishable_J2OrXvOnQXxrf5t3XPmigg_5ULrsWO2';
  const db=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY);

  async function getProfile(user){
    if(!user) return null;
    const {data}=await db.from('profiles').select('id,full_name,role').eq('id',user.id).maybeSingle();
    return data || null;
  }

  window.KWAYA_AUTH={
    db,
    getProfile,
    getRole:async function(user){
      if(!user) return null;
      if(user.app_metadata?.role==='super_admin') return 'super_admin';
      if(user.app_metadata?.role==='admin') return 'admin';
      const profile=await getProfile(user);
      return profile?.role || null;
    },
    isAdmin:async function(user){
      const role=await this.getRole(user);
      return role==='admin' || role==='super_admin';
    },
    isSuperAdmin:async function(user){
      return (await this.getRole(user))==='super_admin';
    }
  };

  db.auth.getSession().then(async ({data:{session}})=>{
    if(!session || !(await window.KWAYA_AUTH.isAdmin(session.user))){
      location.replace('login.html');
      return;
    }

    // Hide Super Admin-only UI from the second admin.
    const isSuper=await window.KWAYA_AUTH.isSuperAdmin(session.user);
    document.querySelectorAll('[data-super-admin-only]').forEach(el=>{
      if(!isSuper) el.remove();
    });
  });
})();