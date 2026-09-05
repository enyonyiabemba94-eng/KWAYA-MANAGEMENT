(function(){
  const db=window.supabase.createClient('https://xulnkdrgjgajmcqntwga.supabase.co','sb_publishable_J2OrXvOnQXxrf5t3XPmigg_5ULrsWO2');
  function esc(s){return String(s??'').replace(/[&<>\"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#039;'}[m])}
  function statusLabel(s){const v=String(s||'').toLowerCase();if(v.includes('present')||v==='po'||v==='yes'||v.includes('hudhur'))return 'Alikuwepo';if(v.includes('permission')||v.includes('ruhusa'))return 'Ruhusa';if(v.includes('sick')||v.includes('mgonjwa'))return 'Mgonjwa';return 'Hayupo'}
  function statusClass(s){const v=statusLabel(s);return v==='Alikuwepo'?'present':v==='Ruhusa'?'permission':v==='Mgonjwa'?'sick':'absent'}
  async function getData(){
    const {data:{session}}=await db.auth.getSession();
    if(!session){location.href='login.html';return null}
    const role=(await db.rpc('get_my_role')).data;
    if(role!=='member'){location.href='dashboard.html';return null}
    const [p,r,s,m]=await Promise.all([
      db.from('profiles').select('full_name,member_id').eq('id',session.user.id).maybeSingle(),
      db.from('attendance_records').select('member_id,status,session_id,marked_at,notes').order('marked_at',{ascending:false}).limit(5000),
      db.from('attendance_sessions').select('id,attendance_date,title,activity_type').order('attendance_date',{ascending:false}),
      db.from('members').select('id,first_name,middle_name,last_name').order('first_name')
    ]);
    if(p.error)throw p.error;if(r.error)throw r.error;if(s.error)throw s.error;if(m.error)throw m.error;
    const names={};(m.data||[]).forEach(x=>names[x.id]=[x.first_name,x.middle_name,x.last_name].filter(Boolean).join(' '));
    const sessions={};(s.data||[]).forEach(x=>sessions[x.id]=x);
    const records=(r.data||[]).map(x=>({...x,name:names[x.member_id]||'Mwimbaji',session:sessions[x.session_id]||{}}));
    return {profile:p.data,records,sessions:s.data||[],members:m.data||[]};
  }
  function render(data){
    const mine=data.records.filter(x=>x.member_id===data.profile?.member_id);
    const present=mine.filter(x=>statusLabel(x.status)==='Alikuwepo').length;
    const total=data.sessions.length;
    document.getElementById('memberName').textContent='Mahudhurio — '+(data.profile?.full_name||'Mwimbaji');
    document.getElementById('total').textContent=total;
    document.getElementById('mine').textContent=mine.length;
    document.getElementById('present').textContent=mine.length?Math.round(present/mine.length*100)+'%':'—';
    document.getElementById('members').textContent=data.members.length;
    const rows=document.getElementById('rows');
    const q=(document.getElementById('search').value||'').toLowerCase();
    const filtered=data.records.filter(x=>[x.name,x.status,x.session.title,x.session.activity_type,x.session.attendance_date].some(v=>String(v||'').toLowerCase().includes(q)));
    rows.innerHTML=filtered.length?filtered.map(x=>{const c=statusClass(x.status);const d=x.session.attendance_date?new Date(x.session.attendance_date+'T00:00:00').toLocaleDateString('sw-TZ',{day:'2-digit',month:'short',year:'numeric'}):'—';return `<tr><td>${esc(d)}</td><td>${esc(x.session.title||x.session.activity_type||'Mahudhurio')}</td><td><b>${esc(x.name)}</b></td><td class="status ${c}">${esc(statusLabel(x.status))}</td></tr>`}).join(''):'<tr><td colspan="4" class="empty">Hakuna rekodi inayolingana.</td></tr>';
  }
  async function init(){
    try{const data=await getData();if(!data)return;window.__memberAttendanceData=data;render(data);document.getElementById('search').addEventListener('input',()=>render(data));}
    catch(e){console.error(e);const r=document.getElementById('rows');if(r)r.innerHTML='<tr><td colspan="4" class="empty">Hitilafu: '+esc(e.message)+'</td></tr>'}
  }
  window.downloadPDF=async function(){
    const data=window.__memberAttendanceData||await getData();if(!data)return;
    if(!window.jspdf){const s=document.createElement('script');s.src='https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';document.head.appendChild(s);await new Promise((res,rej)=>{s.onload=res;s.onerror=rej})}
    const {jsPDF}=window.jspdf;const doc=new jsPDF({orientation:'landscape'});const mine=data.records.filter(x=>x.member_id===data.profile?.member_id);const present=mine.filter(x=>statusLabel(x.status)==='Alikuwepo').length;
    doc.setFontSize(16);doc.text('KWAYA YA KRISTO MFALME',14,15);doc.setFontSize(12);doc.text('RIPOTI YA MAHUDHURIO YA MWIMBAJI',14,23);doc.setFontSize(10);doc.text('Jina: '+(data.profile?.full_name||'Mwimbaji'),14,31);doc.text('Vipindi: '+data.sessions.length+'   Rekodi yangu: '+mine.length+'   Asilimia: '+(mine.length?Math.round(present/mine.length*100):0)+'%',14,38);
    let y=48;doc.setFontSize(9);doc.text('Tarehe',14,y);doc.text('Shughuli',43,y);doc.text('Mwimbaji',105,y);doc.text('Hali',220,y);y+=6;
    data.records.forEach(x=>{if(y>195){doc.addPage();y=15}const d=x.session.attendance_date||'—';doc.text(String(d),14,y);doc.text(String(x.session.title||x.session.activity_type||'Mahudhurio').slice(0,35),43,y);doc.text(String(x.name).slice(0,42),105,y);doc.text(statusLabel(x.status),220,y);y+=5});
    doc.save('ripoti-mahudhurio-kwaya.pdf');
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();