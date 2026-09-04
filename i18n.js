(function(){
  const KEY='choirLanguage';
  const LANGS={sw:'🇹🇿 Kiswahili',fr:'🇫🇷 Français',en:'🇬🇧 English'};
  const T={
    sw:{
      'Dashboard':'Dashboard','Toka':'Toka','Karibu kwenye Dashboard':'Karibu kwenye Dashboard','Usimamizi wa Kwaya ya Kristu Mfalme':'Usimamizi wa Kwaya ya Kristu Mfalme','Waimbaji Hai':'Waimbaji Hai','Nyimbo':'Nyimbo','Vipindi vya Mahudhurio':'Vipindi vya Mahudhurio','Taarifa':'Taarifa','Ratiba Zinazokuja':'Ratiba Zinazokuja','Taarifa Mpya':'Taarifa Mpya','Ufikiaji wa Haraka':'Ufikiaji wa Haraka','Waimbaji':'Waimbaji','Mahudhurio':'Mahudhurio','Mpango wa Misa':'Mpango wa Misa','Michango':'Michango','Ripoti':'Ripoti','Ratiba':'Ratiba','Nyaraka':'Nyaraka','Chat':'Chat','Mipangilio':'Mipangilio','Sakramenti':'Sakramenti','Vitabu vya Nyimbo':'Vitabu vya Nyimbo','Misa':'Misa','Taarifa Zote':'Taarifa Zote','Zilizochapishwa':'Zilizochapishwa','Rasimu':'Rasimu','Muhimu':'Muhimu','Tafuta':'Tafuta','Ongeza':'Ongeza','Hariri':'Hariri','Futa':'Futa','Hifadhi':'Hifadhi','Ghairi':'Ghairi','Funga':'Funga','Rudi':'Rudi','Pakua':'Pakua','Chapisha':'Chapisha','Pakia':'Pakia','Refresh':'Refresh','Jina':'Jina','Simu':'Simu','Barua pepe':'Barua pepe','Namba ya simu':'Namba ya simu','Nenosiri':'Nenosiri','Jina kamili':'Jina kamili','Tarehe':'Tarehe','Hali':'Hali','Akaunti':'Akaunti','Mwanachama':'Mwanachama','Mwimbaji':'Mwimbaji','Msimamizi':'Msimamizi','Hakuna taarifa mpya.':'Hakuna taarifa mpya.','Hakuna ratiba inayokuja.':'Hakuna ratiba inayokuja.','Unganisha Akaunti':'Unganisha Akaunti','Chagua':'Chagua','Mwezi':'Mwezi','Kiasi':'Kiasi','Maelezo':'Maelezo','Aina':'Aina','Kitendo':'Kitendo','Jumla':'Jumla','Inapakia...':'Inapakia...','Tayari.':'Tayari.','Imefanikiwa':'Imefanikiwa','Hitilafu':'Hitilafu','Ndiyo':'Ndiyo','Hapana':'Hapana','Msaada':'Msaada','Wasifu':'Wasifu','Ondoka':'Ondoka'
    },
    fr:{
      'Dashboard':'Tableau de bord','Toka':'Déconnexion','Karibu kwenye Dashboard':'Bienvenue sur le tableau de bord','Usimamizi wa Kwaya ya Kristu Mfalme':'Gestion de la Chorale du Christ Roi','Waimbaji Hai':'Choristes actifs','Nyimbo':'Chants','Vipindi vya Mahudhurio':'Séances de présence','Taarifa':'Annonces','Ratiba Zinazokuja':'Événements à venir','Taarifa Mpya':'Dernières annonces','Ufikiaji wa Haraka':'Accès rapide','Waimbaji':'Choristes','Mahudhurio':'Présences','Mpango wa Misa':'Programme de messe','Michango':'Contributions','Ripoti':'Rapports','Ratiba':'Calendrier','Nyaraka':'Documents','Chat':'Chat','Mipangilio':'Paramètres','Sakramenti':'Sacrements','Vitabu vya Nyimbo':'Livres de chants','Misa':'Messe','Taarifa Zote':'Toutes les annonces','Zilizochapishwa':'Publiées','Rasimu':'Brouillons','Muhimu':'Important','Tafuta':'Rechercher','Ongeza':'Ajouter','Hariri':'Modifier','Futa':'Supprimer','Hifadhi':'Enregistrer','Ghairi':'Annuler','Funga':'Fermer','Rudi':'Retour','Pakua':'Télécharger','Chapisha':'Imprimer','Pakia':'Téléverser','Refresh':'Actualiser','Jina':'Nom','Simu':'Téléphone','Barua pepe':'E-mail','Namba ya simu':'Numéro de téléphone','Nenosiri':'Mot de passe','Jina kamili':'Nom complet','Tarehe':'Date','Hali':'Statut','Akaunti':'Compte','Mwanachama':'Membre','Mwimbaji':'Choriste','Msimamizi':'Administrateur','Hakuna taarifa mpya.':'Aucune nouvelle annonce.','Hakuna ratiba inayokuja.':'Aucun événement à venir.','Unganisha Akaunti':'Lier un compte','Chagua':'Choisir','Mwezi':'Mois','Kiasi':'Montant','Maelezo':'Description','Aina':'Type','Kitendo':'Action','Jumla':'Total','Inapakia...':'Chargement...','Tayari.':'Prêt.','Imefanikiwa':'Réussi','Hitilafu':'Erreur','Ndiyo':'Oui','Hapana':'Non','Msaada':'Aide','Wasifu':'Profil','Ondoka':'Quitter'
    },
    en:{
      'Dashboard':'Dashboard','Toka':'Logout','Karibu kwenye Dashboard':'Welcome to the Dashboard','Usimamizi wa Kwaya ya Kristu Mfalme':'Christ the King Choir Management','Waimbaji Hai':'Active Singers','Nyimbo':'Songs','Vipindi vya Mahudhurio':'Attendance Sessions','Taarifa':'Announcements','Ratiba Zinazokuja':'Upcoming Events','Taarifa Mpya':'Latest Announcements','Ufikiaji wa Haraka':'Quick Access','Waimbaji':'Singers','Mahudhurio':'Attendance','Mpango wa Misa':'Mass Programme','Michango':'Contributions','Ripoti':'Reports','Ratiba':'Schedule','Nyaraka':'Documents','Chat':'Chat','Mipangilio':'Settings','Sakramenti':'Sacraments','Vitabu vya Nyimbo':'Song Books','Misa':'Mass','Taarifa Zote':'All Announcements','Zilizochapishwa':'Published','Rasimu':'Drafts','Muhimu':'Important','Tafuta':'Search','Ongeza':'Add','Hariri':'Edit','Futa':'Delete','Hifadhi':'Save','Ghairi':'Cancel','Funga':'Close','Rudi':'Back','Pakua':'Download','Chapisha':'Print','Pakia':'Upload','Refresh':'Refresh','Jina':'Name','Simu':'Phone','Barua pepe':'Email','Namba ya simu':'Phone number','Nenosiri':'Password','Jina kamili':'Full name','Tarehe':'Date','Hali':'Status','Akaunti':'Account','Mwanachama':'Member','Mwimbaji':'Singer','Msimamizi':'Administrator','Hakuna taarifa mpya.':'No new announcements.','Hakuna ratiba inayokuja.':'No upcoming events.','Unganisha Akaunti':'Link Account','Chagua':'Choose','Mwezi':'Month','Kiasi':'Amount','Maelezo':'Description','Aina':'Type','Kitendo':'Action','Jumla':'Total','Inapakia...':'Loading...','Tayari.':'Ready.','Imefanikiwa':'Successful','Hitilafu':'Error','Ndiyo':'Yes','Hapana':'No','Msaada':'Help','Wasifu':'Profile','Ondoka':'Exit'
    }
  };
  function lang(){return localStorage.getItem(KEY)||'sw'}
  function t(k){const m=T[lang()]||T.sw;return m[k]||T.sw[k]||k}
  function translateElement(el){
    if(!el||el.nodeType!==1)return;
    if(el.matches('[data-i18n]')) el.textContent=t(el.dataset.i18n);
    if(el.hasAttribute('placeholder')){const v=el.getAttribute('placeholder');if(T.sw[v])el.setAttribute('placeholder',t(v))}
    if(el.hasAttribute('title')){const v=el.getAttribute('title');if(T.sw[v])el.setAttribute('title',t(v))}
    if(el.children.length===0){const raw=(el.textContent||'').trim();if(T.sw[raw])el.textContent=t(raw)}
  }
  function translatePage(){
    document.documentElement.lang=lang();
    document.title=t(document.title);
    document.querySelectorAll('body *').forEach(translateElement);
  }
  function buildSelector(){
    if(document.querySelector('[data-language-selector]')||document.getElementById('choir-language-floating'))return;
    const box=document.createElement('div');box.id='choir-language-floating';box.style.cssText='position:fixed;right:14px;top:14px;z-index:99999;background:#fff;padding:5px 7px;border-radius:10px;box-shadow:0 3px 14px rgba(0,0,0,.16);font:12px Arial';
    const s=document.createElement('select');s.style.cssText='border:0;outline:0;background:#fff;font-weight:700;cursor:pointer';s.setAttribute('aria-label','Language');
    Object.keys(LANGS).forEach(k=>{const o=document.createElement('option');o.value=k;o.textContent=LANGS[k];o.selected=k===lang();s.appendChild(o)});
    s.onchange=function(){localStorage.setItem(KEY,this.value);location.reload()};box.appendChild(s);document.body.appendChild(box);
  }
  window.choirI18n={lang,t,langs:LANGS,set:function(l){if(T[l]){localStorage.setItem(KEY,l);location.reload()}}};
  window.addEventListener('DOMContentLoaded',function(){
    translatePage();
    buildSelector();
    const observer=new MutationObserver(function(mutations){mutations.forEach(m=>m.addedNodes.forEach(n=>{if(n.nodeType===1){translateElement(n);n.querySelectorAll&&n.querySelectorAll('*').forEach(translateElement)}}))});
    observer.observe(document.body,{childList:true,subtree:true});
  });
})();