(function(){
  const KEY='choirLanguage';
  const LANGS={sw:'🇹🇿 Kiswahili',fr:'🇫🇷 Français',en:'🇬🇧 English'};
  const T={
    sw:{Dashboard:'Dashboard',Toka:'Toka','Karibu kwenye Dashboard':'Karibu kwenye Dashboard','Usimamizi wa Kwaya ya Kristu Mfalme':'Usimamizi wa Kwaya ya Kristu Mfalme','Waimbaji Hai':'Waimbaji Hai',Nyimbo:'Nyimbo','Vipindi vya Mahudhurio':'Vipindi vya Mahudhurio',Taarifa:'Taarifa','Ratiba Zinazokuja':'Ratiba Zinazokuja','Taarifa Mpya':'Taarifa Mpya','Ufikiaji wa Haraka':'Ufikiaji wa Haraka',Waimbaji:'Waimbaji',Mahudhurio:'Mahudhurio','Mpango wa Misa':'Mpango wa Misa',Michango:'Michango',Ripoti:'Ripoti',Ratiba:'Ratiba',Nyaraka:'Nyaraka',Chat:'Chat',Mipangilio:'Mipangilio','Unganisha Akaunti':'Unganisha Akaunti'},
    fr:{Dashboard:'Tableau de bord',Toka:'Déconnexion','Karibu kwenye Dashboard':'Bienvenue sur le tableau de bord','Usimamizi wa Kwaya ya Kristu Mfalme':'Gestion de la Chorale du Christ Roi','Waimbaji Hai':'Choristes actifs',Nyimbo:'Chants','Vipindi vya Mahudhurio':'Séances de présence',Taarifa:'Annonces','Ratiba Zinazokuja':'Prochains événements','Taarifa Mpya':'Nouvelles annonces','Ufikiaji wa Haraka':'Accès rapide',Waimbaji:'Choristes',Mahudhurio:'Présences','Mpango wa Misa':'Programme de messe',Michango:'Contributions',Ripoti:'Rapports',Ratiba:'Calendrier',Nyaraka:'Documents',Chat:'Chat',Mipangilio:'Paramètres','Unganisha Akaunti':'Lier un compte'},
    en:{Dashboard:'Dashboard',Toka:'Logout','Karibu kwenye Dashboard':'Welcome to the Dashboard','Usimamizi wa Kwaya ya Kristu Mfalme':'Christ the King Choir Management','Waimbaji Hai':'Active Singers',Nyimbo:'Songs','Vipindi vya Mahudhurio':'Attendance Sessions',Taarifa:'Announcements','Ratiba Zinazokuja':'Upcoming Events','Taarifa Mpya':'Latest Announcements','Ufikiaji wa Haraka':'Quick Access',Waimbaji:'Singers',Mahudhurio:'Attendance','Mpango wa Misa':'Mass Programme',Michango:'Contributions',Ripoti:'Reports',Ratiba:'Schedule',Nyaraka:'Documents',Chat:'Chat',Mipangilio:'Settings','Unganisha Akaunti':'Link Account'}
  };
  function lang(){return localStorage.getItem(KEY)||'sw'}
  function translateText(el){if(el.children.length)return;const raw=(el.textContent||'').trim();const map=T[lang()]||T.sw;if(map[raw])el.textContent=map[raw]}
  function buildSelector(){
    if(document.querySelector('[data-language-selector]')||document.getElementById('choir-language-floating'))return;
    const box=document.createElement('div');box.id='choir-language-floating';box.style.cssText='position:fixed;right:14px;top:14px;z-index:99999;background:#fff;padding:5px 7px;border-radius:10px;box-shadow:0 3px 14px rgba(0,0,0,.16);font:12px Arial';
    const s=document.createElement('select');s.style.cssText='border:0;outline:0;background:#fff;font-weight:700;cursor:pointer';s.setAttribute('aria-label','Language');
    Object.keys(LANGS).forEach(k=>{const o=document.createElement('option');o.value=k;o.textContent=LANGS[k];o.selected=k===lang();s.appendChild(o)});
    s.onchange=function(){localStorage.setItem(KEY,this.value);location.reload()};box.appendChild(s);document.body.appendChild(box);
  }
  window.choirI18n={lang,t:function(k){return (T[lang()]&&T[lang()][k])||T.sw[k]||k},langs:LANGS,set:function(l){if(T[l]){localStorage.setItem(KEY,l);location.reload()}}};
  window.addEventListener('DOMContentLoaded',function(){
    document.documentElement.lang=lang();
    document.querySelectorAll('[data-i18n]').forEach(el=>{const key=el.dataset.i18n;el.textContent=window.choirI18n.t(key)});
    document.querySelectorAll('body *').forEach(translateText);
    buildSelector();
  });
})();