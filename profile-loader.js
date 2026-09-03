(function(){
  const URL='https://xulnkdrgjgajmcqntwga.supabase.co';
  const KEY='sb_publishable_J2OrXvOnQXxrf5t3XPmigg_5ULrsWO2';
  function esc(s){return String(s??'').replace(/[&<>\"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#039;'}[m]));}
  function fmt(v){return v?new Date(v+'T00:00:00').toLocaleDateString('sw-TZ',{day:'2-digit',month:'2-digit',year:'numeric'}):'—';}
  function full(m){return [m.first_name,m.middle_name,m.last_name].filter(Boolean).join(' ')||'Mwimbaji';}
  function field(label,value){return value?'<small><b>'+esc(label)+':</b> '+esc(value)+'</small>':'';}
  async function run(){
    if(!location.pathname.endsWith('/member-profile.html')) return;
    const app=document.getElementById('app'); if(!app) return;
    const db=window.supabase.createClient(URL,KEY);
    try{
      const {data:{session}}=await db.auth.getSession();
      if(!session){app.innerHTML='<div class="error">Session haipo. Rudi kwenye Login.</div>';return;}
      let id=new URLSearchParams(location.search).get('id')||new URLSearchParams(location.search).get('member_id');
      if(!id){const p=await db.from('profiles').select('member_id').eq('id',session.user.id).maybeSingle(); id=p.data?.member_id||null; if(id) history.replaceState(null,'','member-profile.html?id='+encodeURIComponent(id));}
      if(!id){app.innerHTML='<div class="error">Profile haijafunguka: mwanachama huyu hajaunganishwa na akaunti.</div>';return;}
      const mr=await db.from('members').select('*').eq('id',id).maybeSingle();
      if(mr.error) throw mr.error;
      if(!mr.data){app.innerHTML='<div class="error">Mwimbaji hakupatikana.</div>';return;}
      const m=mr.data;
      const vr=await db.from('voice_parts').select('id,name').order('name');
      const voice=(vr.data||[]).find(v=>v.id===m.voice_part_id)?.name||'Sauti haijawekwa';
      const [br,cr,er,mar]=await Promise.all([
        db.from('baptism_records').select('*').eq('member_id',id).limit(1),
        db.from('confirmation_records').select('*').eq('member_id',id).limit(1),
        db.from('eucharist_records').select('*').eq('member_id',id).limit(1),
        db.from('marriage_records').select('*').eq('member_id',id).limit(1)
      ]);
      const b=br.data?.[0],c=cr.data?.[0],e=er.data?.[0],n=mar.data?.[0];
      const sacr=[
        {name:'Ubatizo',date:b?.baptism_date,details:field('Mahali',b?.location||b?.parish_church)+field('Kanisa/Kigango',b?.parish_church)+field('Jimbo',b?.diocese)+field('Baba/Mama wa Ubatizo',b?.spiritual_parent_name)+(b?.father_name||b?.mother_name?field('Wazazi',[(b?.father_name&&'Baba: '+b.father_name),(b?.mother_name&&'Mama: '+b.mother_name)].filter(Boolean).join(' • ')):'')},
        {name:'Kipaimara',date:c?.confirmation_date,details:field('Mahali',c?.location||c?.parish_church)+field('Kanisa/Kigango',c?.parish_church)+field('Jimbo',c?.diocese)+field('Msimamizi/Mhudumu',c?.minister_name)},
        {name:'Ekaristi ya Kwanza',date:e?.eucharist_date,details:field('Mahali',e?.location||e?.parish_church)+field('Kanisa/Kigango',e?.parish_church)+field('Jimbo',e?.diocese)+field('Padre',e?.priest_name)},
        {name:'Ndoa',date:n?.marriage_date,details:field('Mwenzi wa Ndoa',n?.spouse_name)+field('Mahali',n?.location||n?.parish_church)+field('Kanisa/Kigango',n?.parish_church)+field('Jimbo',n?.diocese)+field('Padre',n?.priest_name)}
      ];
      app.innerHTML='<div class="hero"><div class="photo">'+(m.photo_url?'<img src="'+esc(m.photo_url)+'" alt="">':esc((m.first_name||'?').charAt(0).toUpperCase()))+'</div><div><h2>'+esc(full(m))+'</h2><p>'+esc(m.phone||'Simu haijawekwa')+'</p><span class="badge">🎵 '+esc(voice)+'</span><span class="badge">'+esc(m.status||'active')+'</span></div></div><div class="grid"><div class="card"><h3>👤 Taarifa Binafsi</h3><div class="info"><div class="item"><span>Jinsia</span><b>'+esc(m.gender||'—')+'</b></div><div class="item"><span>Tarehe ya kuzaliwa</span><b>'+fmt(m.date_of_birth)+'</b></div><div class="item"><span>Mahali pa kuzaliwa</span><b>'+esc(m.place_of_birth||'—')+'</b></div></div></div><div class="card"><h3>📞 Mawasiliano</h3><div class="info"><div class="item"><span>Simu</span><b>'+esc(m.phone||'—')+'</b></div><div class="item"><span>Makazi</span><b>'+esc(m.residence||'—')+'</b></div><div class="item"><span>Barua pepe</span><b>—</b></div></div></div><div class="card"><h3>🎵 Taarifa za Kwaya</h3><div class="info"><div class="item"><span>Sauti</span><b>'+esc(voice)+'</b></div><div class="item"><span>Wajibu</span><b>'+esc(m.choir_role||'—')+'</b></div><div class="item"><span>Tarehe ya kujiunga</span><b>'+fmt(m.joined_date)+'</b></div><div class="item"><span>Hali</span><b>'+esc(m.status==='active'?'Active':m.status||'—')+'</b></div></div></div><div class="card wide"><h3>⛪ Sakramenti za Mwimbaji</h3><div class="sacrament-grid">'+sacr.map(x=>'<div class="sacrament"><h4>⛪ '+esc(x.name)+'</h4><div class="status '+(x.date?'ok':'no')+'">'+(x.date?'✓ Imesajiliwa':'✕ Haijasajiliwa')+'</div>'+(x.date?'<small><b>Tarehe:</b> '+fmt(x.date)+'</small>'+x.details:'')+'</div>').join('')+'</div></div>'+(m.notes?'<div class="card wide"><h3>📝 Maelezo ya Mwimbaji</h3><div>'+esc(m.notes)+'</div></div>':'')+'</div>';
    }catch(err){console.error(err);app.innerHTML='<div class="error">Profile haijafunguka. Kuna hitilafu wakati wa kusoma taarifa za mwimbaji. Tafadhali jaribu Refresh.</div>';}
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',run); else run();
})();
