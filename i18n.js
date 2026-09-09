/* KWAYA-MANAGEMENT: multilingual support removed. Kiswahili is the only supported interface language. */
(function(){
  const sw = s => String(s ?? '');
  window.t = window.t || sw;
  window.translate = window.translate || sw;
  window.setLanguage = window.setLanguage || function(){ return 'sw'; };
  window.getLanguage = window.getLanguage || function(){ return 'sw'; };
  window.choirI18n = window.choirI18n || {
    language: 'sw',
    getLanguage: function(){ return 'sw'; },
    setLanguage: function(){ return 'sw'; },
    t: sw,
    translate: sw
  };
})();
