(function(){
  if(!location.pathname.endsWith('/sacraments.html')) return;
  const URL='https://xulnkdrgjgajmcqntwga.supabase.co';
  const KEY='sb_publishable_J2OrXvOnQXxrf5t3XPmigg_5ULrsWO2';
  const db=window.supabase.createClient(URL,KEY);
  let members=[];
  const name=x=>[x.first_name,x.middle_name,x.last_name].filter(Boolean).join(' ');
  const complete=x=>!!(x.baptism_date&&x.first_communion_date&&x.confirmation_date&&x.church_marriage_date);
  async function refresh(){
    const {data,error}=await db.from('members').select('id,first_name,middle_name,last_name,baptism_date,first_communion_date,confirmation_date,church_marriage_date').order('first_name');
    if(error)return;
    members=data||[];
    apply();
  }
  function apply(){
    const sel=document.getElementById('member');
    if(!sel||!members.length)return;
    const selected=sel.value;
    const q=(document.getElementById('search')?.value||'').toLowerCase();
    const incomplete=members.filter(x=>!complete(x)&&name(x).toLowerCase().includes(q));
    const html='<option value="">Chagua mwimbaji</option>'+incomplete.map(x=>'<option value="'+x.id+'">'+String(name(x)).replace(/[&<>\"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#039;'}[m]))+'</option>').join('');
    if(sel.innerHTML!==html)sel.innerHTML=html;
    if(incomplete.some(x=>x.id===selected))sel.value=selected;
  }
  function boot(){
    refresh();
    const search=document.getElementById('search');
    if(search)search.addEventListener('input',()=>setTimeout(apply,50));
    const sel=document.getElementById('member');
    if(sel){new MutationObserver(()=>apply()).observe(sel,{childList:true});}
    const form=document.querySelector('form[onsubmit="save(event)"]');
    if(form)form.addEventListener('submit',()=>setTimeout(refresh,1000));
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
