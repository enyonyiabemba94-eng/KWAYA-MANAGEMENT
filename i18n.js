(function(){
  const KEY='choirLanguage';
  const LANGS={sw:'🇹🇿 Kiswahili',fr:'🇫🇷 Français',en:'🇬🇧 English'};
  const T={
    sw:{dashboard:'Dashboard',logout:'Toka',welcome:'Karibu kwenye Dashboard',management:'Usimamizi wa Kwaya ya Kristu Mfalme',active:'Waimbaji Hai',songs:'Nyimbo',sessions:'Vipindi vya Mahudhurio',news:'Taarifa',upcoming:'Ratiba Zinazokuja',newNews:'Taarifa Mpya',quick:'Ufikiaji wa Haraka',members:'Waimbaji',attendance:'Mahudhurio',mass:'Mpango wa Misa',contributions:'Michango',reports:'Ripoti',schedule:'Ratiba',documents:'Nyaraka',chat:'Chat',settings:'Mipangilio',announcements:'Taarifa',account:'Unganisha Akaunti',linkTitle:'Unganisha Akaunti ya Mwimbaji',accountLabel:'Akaunti',memberLabel:'Member',chooseAccount:'Chagua akaunti...',chooseMember:'Chagua member...',connect:'Unganisha',ready:'Tayari.',noEvents:'Hakuna ratiba inayokuja.',noNews:'Hakuna taarifa mpya.'},
    fr:{dashboard:'Tableau de bord',logout:'Déconnexion',welcome:'Bienvenue sur le tableau de bord',management:'Gestion de la Chorale du Christ Roi',active:'Choristes actifs',songs:'Chants',sessions:"Séances de présence",news:'Annonces',upcoming:'Prochains événements',newNews:'Nouvelles annonces',quick:'Accès rapide',members:'Choristes',attendance:'Présences',mass:'Programme de messe',contributions:'Contributions',reports:'Rapports',schedule:'Calendrier',documents:'Documents',chat:'Chat',settings:'Paramètres',announcements:'Annonces',account:'Lier un compte',linkTitle:'Lier le compte du choriste',accountLabel:'Compte',memberLabel:'Choriste',chooseAccount:'Choisir un compte...',chooseMember:'Choisir un choriste...',connect:'Lier',ready:'Prêt.',noEvents:'Aucun événement à venir.',noNews:'Aucune nouvelle annonce.'},
    en:{dashboard:'Dashboard',logout:'Logout',welcome:'Welcome to the Dashboard',management:'Christ the King Choir Management',active:'Active Singers',songs:'Songs',sessions:'Attendance Sessions',news:'Announcements',upcoming:'Upcoming Events',newNews:'Latest Announcements',quick:'Quick Access',members:'Singers',attendance:'Attendance',mass:'Mass Programme',contributions:'Contributions',reports:'Reports',schedule:'Schedule',documents:'Documents',chat:'Chat',settings:'Settings',announcements:'Announcements',account:'Link Account',linkTitle:'Link Singer Account',accountLabel:'Account',memberLabel:'Member',chooseAccount:'Choose account...',chooseMember:'Choose member...',connect:'Link',ready:'Ready.',noEvents:'No upcoming events.',noNews:'No new announcements.'}
  };
  function lang(){return localStorage.getItem(KEY)||'sw'}
  function t(k){return (T[lang()]&&T[lang()][k])||T.sw[k]||k}
  window.choirI18n={lang,t,langs:LANGS,set:function(l){if(!T[l])return;localStorage.setItem(KEY,l);location.reload()}};
  window.addEventListener('DOMContentLoaded',function(){
    document.documentElement.lang=lang();
    document.querySelectorAll('[data-i18n]').forEach(function(el){el.textContent=t(el.dataset.i18n)});
    const host=document.querySelector('[data-language-selector]');
    if(host){host.innerHTML=''; const s=document.createElement('select');s.className='language-select';s.setAttribute('aria-label','Language');Object.keys(LANGS).forEach(function(k){const o=document.createElement('option');o.value=k;o.textContent=LANGS[k];o.selected=k===lang();s.appendChild(o)});s.onchange=function(){window.choirI18n.set(this.value)};host.appendChild(s)}
  });
})();