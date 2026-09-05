(function(){
  const SUPABASE_URL='https://xulnkdrgjgajmcqntwga.supabase.co';
  const SUPABASE_KEY='sb_publishable_J2OrXvOnQXxrf5t3XPmigg_5ULrsWO2';
  let db;
  const esc=s=>String(s??'').replace(/[&<>\"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#039;'}[m]));
  function openSong(x){
    const old=document.getElementById('memberSongDetails'); if(old) old.remove();
    const d=document.createElement('div'); d.id='memberSongDetails';
    d.style.cssText='position:fixed;inset:0;background:#0008;z-index:9999;display:flex;align-items:center;justify-content:center;padding:14px';
    const links=(x.score_url?'<a href="'+esc(x.score_url)+'" target="_blank" rel="noopener" style="display:inline-block;padding:10px 12px;border-radius:9px;background:#ede9fe;color:#5b21b6;text-decoration:none;font-weight:800;margin:4px">🎼 Fungua Noti</a>':'')+
      (x.midi_url?'<a href="'+esc(x.midi_url)+'" target="_blank" download style="display:inline-block;padding:10px 12px;border-radius:9px;background:#dcfce7;color:#166534;text-decoration:none;font-weight:800;margin:4px">⬇️ Pakua MIDI</a>':'')+
      (x.audio_url?'<a href="'+esc(x.audio_url)+'" target="_blank" style="display:inline-block;padding:10px 12px;border-radius:9px;background:#e0f2fe;color:#075985;text-decoration:none;font-weight:800;margin:4px">🔊 Audio</a>':'');
    d.innerHTML='<div style="background:#fff;width:100%;max-width:520px;max-height:88vh;overflow:auto;border-radius:16px;padding:18px"><div style="display:flex;justify-content:space-between;align-items:center"><h2 style="margin:0;color:#25133f">'+esc((x.song_number?x.song_number+'. ':'')+(x.title||'Wimbo'))+'</h2><button id="closeMemberSong" style="border:0;background:#f3f4f6;border-radius:8px;width:36px;height:36px;font-size:20px">×</button></div><p style="color:#6b7280;font-size:12px">'+esc([x.composer?'Mtunzi: '+x.composer:'',x.language?'Lugha: '+x.language:'',x.category?'Kundi: '+x.category:'',x.key_signature?'Key: '+x.key_signature:''].filter(Boolean).join(' • '))+'</p><div style="margin:12px 0">'+(links||'<span style="color:#9ca3af">Hakuna faili la wimbo huu bado.</span>')+'</div><h3>📝 Maneno ya wimbo</h3><div style="white-space:pre-wrap;background:#fafafa;border:1px solid #eee;border-radius:10px;padding:13px;line-height:1.6;font-size:13px">'+esc(x.lyrics||'Hakuna maneno yaliyowekwa.')+'</div></div>';
    document.body.appendChild(d); document.getElementById('closeMemberSong').onclick=()=>d.remove(); d.onclick=e=>{if(e.target===d)d.remove()};
  }
  async function bind(){
    if(!location.pathname.endsWith('/member-dashboard.html')) return;
    db=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY);
    const container=document.getElementById('songs'); if(!container) return;
    container.addEventListener('click',async e=>{
      const item=e.target.closest('.song'); if(!item) return;
      e.preventDefault();
      const title=item.querySelector('b')?.textContent?.replace(/^\d+\.\s*/,'').trim();
      if(!title) return;
      const {data,error}=await db.from('songs').select('id,song_number,title,composer,language,category,key_signature,lyrics,score_url,midi_url,audio_url').eq('title',title).maybeSingle();
      if(error||!data){location.href='songs.html';return;}
      openSong(data);
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind,{once:true});else bind();
})();
