(function(){
  const db=window.supabase.createClient('https://xulnkdrgjgajmcqntwga.supabase.co','sb_publishable_J2OrXvOnQXxrf5t3XPmigg_5ULrsWO2');
  async function getRole(){const {data,error}=await db.rpc('get_my_role');if(error)throw error;return data||null}
  async function check(){
    const {data:{session}}=await db.auth.getSession();
    if(!session){if(!location.pathname.endsWith('/login.html'))location.replace('login.html');return null}
    const r=await getRole();
    if(!['admin','super_admin','member'].includes(r)){location.replace('login.html');return null}
    if(location.pathname.endsWith('/dashboard.html')&&r==='member')location.replace('member-dashboard.html');
    if(location.pathname.endsWith('/member-dashboard.html')&&['admin','super_admin'].includes(r))location.replace('dashboard.html');
    document.querySelectorAll('[data-super-admin-only]').forEach(e=>{if(r!=='super_admin')e.remove()});
    document.querySelectorAll('[data-admin-only]').forEach(e=>{if(!['admin','super_admin'].includes(r))e.remove()});
    return r;
  }
  window.KWAYA_AUTH={db,getRole,isAdmin:async()=>['admin','super_admin'].includes(await getRole()),isSuperAdmin:async()=>await getRole()==='super_admin',isMember:async()=>await getRole()==='member',check};
  db.auth.onAuthStateChange((event)=>{if(event==='SIGNED_OUT'&&!location.pathname.endsWith('/login.html'))location.replace('login.html')});
  check().catch(e=>console.error('Auth guard:',e));
  window.addEventListener('pageshow',()=>{check().catch(()=>{})});
})();