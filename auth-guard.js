(function(){
  const db=window.supabase.createClient('https://xulnkdrgjgajmcqntwga.supabase.co','sb_publishable_J2OrXvOnQXxrf5t3XPmigg_5ULrsWO2');

  // Load the global translation engine on every authenticated page.
  // The user's own data/content is not translated; only system UI strings are.
  (function loadI18n(){
    if(window.choirI18n || document.querySelector('script[data-choir-i18n]')) return;
    const s=document.createElement('script');
    s.src='./i18n.js?v=20260904';
    s.async=false;
    s.setAttribute('data-choir-i18n','1');
    document.head.appendChild(s);
  })();

  async function getRole(){const {data,error}=await db.rpc('get_my_role');if(error)throw error;return data||null}
  async function check(){
    const {data:{session}}=await db.auth.getSession();
    if(!session){return null}
    const r=await getRole();
    if(!['admin','super_admin','member'].includes(r)){await db.auth.signOut();return null}
    if(location.pathname.endsWith('/dashboard.html')&&r==='member')location.replace('member-dashboard.html');
    if(location.pathname.endsWith('/member-dashboard.html')&&['admin','super_admin'].includes(r))location.replace('dashboard.html');
    document.querySelectorAll('[data-super-admin-only]').forEach(e=>{if(r!=='super_admin')e.remove()});
    document.querySelectorAll('[data-admin-only]').forEach(e=>{if(!['admin','super_admin'].includes(r))e.remove()});
    return r;
  }
  window.KWAYA_AUTH={db,getRole,isAdmin:async()=>['admin','super_admin'].includes(await getRole()),isSuperAdmin:async()=>await getRole()==='super_admin',isMember:async()=>await getRole()==='member',check};
  db.auth.onAuthStateChange((event)=>{if(event==='SIGNED_OUT'&&!location.pathname.endsWith('/login.html'))location.replace('login.html')});
  check().then((role)=>{
    // Dashboard data must load only after the authenticated session/role is ready.
    // This prevents the profiles query from running as an anonymous user during startup.
    if(role && location.pathname.endsWith('/dashboard.html') && typeof window.load==='function'){
      window.load().catch(e=>{console.error('Dashboard load after auth:',e);const s=document.getElementById('linkStatus');if(s)s.textContent='Hitilafu: '+e.message});
    }
    if(location.pathname.endsWith('/member-profile.html')){
      const s=document.createElement('script');s.src='./profile-loader.js?v=3';document.head.appendChild(s);
    }
    if(location.pathname.endsWith('/sacraments.html')){
      const s=document.createElement('script');s.src='./sacraments-filter.js?v=1';document.head.appendChild(s);
    }
  }).catch(e=>console.error('Auth guard:',e));
})();
