/* ============================================================
   BGSCET | MBA — Shared interactions
   ============================================================ */
(function(){
  'use strict';

  /* ---- navbar shadow on scroll ---- */
  var nav=document.querySelector('.nav');
  if(nav){
    var onScroll=function(){nav.classList.toggle('scrolled',window.scrollY>8);};
    window.addEventListener('scroll',onScroll,{passive:true});onScroll();
  }

  /* ---- mobile drawer ---- */
  var toggle=document.querySelector('.nav-toggle');
  var drawer=document.querySelector('.drawer');
  if(toggle&&drawer){
    var open=function(){drawer.classList.add('open');drawer.setAttribute('aria-hidden','false');toggle.setAttribute('aria-expanded','true');document.body.style.overflow='hidden';};
    var close=function(){drawer.classList.remove('open');drawer.setAttribute('aria-hidden','true');toggle.setAttribute('aria-expanded','false');document.body.style.overflow='';};
    toggle.setAttribute('aria-expanded','false');
    toggle.addEventListener('click',open);
    document.addEventListener('keydown',function(e){if(e.key==='Escape')close();});
    drawer.addEventListener('click',function(e){
      if(e.target.matches('.drawer-veil,.drawer-close,.drawer-close *')||e.target.closest('.drawer-panel a')) close();
    });
  }

  /* ---- hero photo loop (crossfade) ---- */
  var slides=document.querySelectorAll('.hero-bg .slide');
  if(slides.length>1){
    /* hydrate deferred slide images (data-src) after first paint so they
       don't compete with the hero image / critical content on load */
    var hydrate=function(){
      slides.forEach(function(s){
        var im=s.querySelector('img[data-src]');
        if(im){ im.src=im.getAttribute('data-src'); im.removeAttribute('data-src'); }
      });
    };
    if('requestIdleCallback' in window){ requestIdleCallback(hydrate,{timeout:2500}); }
    else { window.addEventListener('load',function(){ setTimeout(hydrate,400); }); }
    var i=0;
    setInterval(function(){
      slides[i].classList.remove('on');
      i=(i+1)%slides.length;
      slides[i].classList.add('on');
    },4200);
  }

  /* ---- reveal on scroll ---- */
  var revs=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && revs.length){
    var io=new IntersectionObserver(function(es){
      es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
    },{threshold:.12,rootMargin:'0px 0px -8% 0px'});
    revs.forEach(function(el){io.observe(el);});
  }else{revs.forEach(function(el){el.classList.add('in');});}

  /* ---- counters ---- */
  function animateCount(el){
    var target=parseFloat(el.getAttribute('data-count'));
    var dec=(el.getAttribute('data-dec')==='1');
    var suffix=el.getAttribute('data-suffix')||'';
    var prefix=el.getAttribute('data-prefix')||'';
    var dur=1400,start=null;
    function step(ts){
      if(!start)start=ts;
      var p=Math.min((ts-start)/dur,1);
      var eased=1-Math.pow(1-p,3);
      var val=target*eased;
      el.textContent=prefix+(dec?val.toFixed(1):Math.round(val).toLocaleString('en-IN'))+suffix;
      if(p<1)requestAnimationFrame(step);
      else el.textContent=prefix+(dec?target.toFixed(1):Math.round(target).toLocaleString('en-IN'))+suffix;
    }
    requestAnimationFrame(step);
  }
  var counters=document.querySelectorAll('[data-count]');
  if('IntersectionObserver' in window && counters.length){
    var cio=new IntersectionObserver(function(es){
      es.forEach(function(e){if(e.isIntersecting){animateCount(e.target);cio.unobserve(e.target);}});
    },{threshold:.5});
    counters.forEach(function(el){cio.observe(el);});
  }

  /* ---- placement bars ---- */
  var bars=document.querySelectorAll('.pb .bar i');
  if('IntersectionObserver' in window && bars.length){
    var bio=new IntersectionObserver(function(es){
      es.forEach(function(e){if(e.isIntersecting){e.target.style.width=e.target.getAttribute('data-w');bio.unobserve(e.target);}});
    },{threshold:.4});
    bars.forEach(function(el){bio.observe(el);});
  }

  /* ---- journey active toggle ---- */
  var jcards=document.querySelectorAll('.jr-card');
  jcards.forEach(function(c){
    c.addEventListener('click',function(){
      jcards.forEach(function(x){x.classList.remove('active');});
      c.classList.add('active');
    });
  });

  /* ---- FAQ accordion ---- */
  document.querySelectorAll('.faq-item').forEach(function(item){
    var q=item.querySelector('.faq-q');
    var a=item.querySelector('.faq-a');
    q.addEventListener('click',function(){
      var isOpen=item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(function(x){x.classList.remove('open');x.querySelector('.faq-a').style.maxHeight=null;});
      if(!isOpen){item.classList.add('open');a.style.maxHeight=a.scrollHeight+'px';}
    });
  });

  /* ---- program detail accordion ---- */
  document.querySelectorAll('.pd-item').forEach(function(item){
    var head=item.querySelector('.pd-head');
    var body=item.querySelector('.pd-body');
    if(item.classList.contains('open'))body.style.maxHeight=body.scrollHeight+'px';
    head.addEventListener('click',function(){
      var isOpen=item.classList.contains('open');
      document.querySelectorAll('.pd-item').forEach(function(x){x.classList.remove('open');x.querySelector('.pd-body').style.maxHeight=null;});
      if(!isOpen){item.classList.add('open');body.style.maxHeight=body.scrollHeight+'px';}
    });
  });

  /* ---- field filled state for selects ---- */
  document.querySelectorAll('.field select').forEach(function(sel){
    var sync=function(){sel.parentElement.classList.toggle('filled',!!sel.value);};
    sel.addEventListener('change',sync);sync();
  });

  /* ---- multi-step lead form ---- */
  var lead=document.querySelector('#leadForm');
  if(lead){
    var pages=lead.querySelectorAll('.lc-page');
    var steps=document.querySelectorAll('#leadSteps .st');
    var stepLabels=document.querySelectorAll('#leadSteps .lbl');
    var cur=0;
    function showPage(n){
      pages.forEach(function(p,idx){p.classList.toggle('show',idx===n);});
      steps.forEach(function(s,idx){s.classList.toggle('on',idx<=n);});
      stepLabels.forEach(function(s,idx){s.classList.toggle('on',idx<=n);});
      cur=n;
    }
    function validatePage(n){
      var ok=true;
      pages[n].querySelectorAll('input[required],select[required]').forEach(function(f){
        if(!f.value || (f.type==='email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.value)) || (f.type==='tel' && f.value.replace(/\D/g,'').length<10)){
          ok=false;f.style.borderColor='var(--magenta)';
        }else{f.style.borderColor='';}
      });
      return ok;
    }
    lead.querySelectorAll('[data-next]').forEach(function(b){
      b.addEventListener('click',function(){if(validatePage(cur))showPage(cur+1);});
    });
    lead.querySelectorAll('[data-prev]').forEach(function(b){
      b.addEventListener('click',function(){showPage(cur-1);});
    });
    lead.addEventListener('submit',function(e){
      e.preventDefault();
      if(!validatePage(cur))return;
      var name=(lead.querySelector('[name=name]')||{}).value||'there';
      lead.querySelector('.lc-form-inner').style.display='none';
      var ok=lead.querySelector('.lc-success');
      ok.style.display='block';
      var nm=ok.querySelector('[data-name]');if(nm)nm.textContent=name.split(' ')[0];
      document.getElementById('leadSteps').style.display='none';
    });
  }

  /* ---- login tabs ---- */
  var loginTabs=document.querySelectorAll('.login-tabs button');
  if(loginTabs.length){
    var setTab=function(key){
      loginTabs.forEach(function(b){b.classList.toggle('active',b.getAttribute('data-tab')===key);});
      document.querySelectorAll('.login-panel').forEach(function(p){p.classList.toggle('active',p.getAttribute('data-panel')===key);});
    };
    loginTabs.forEach(function(b){b.addEventListener('click',function(){setTab(b.getAttribute('data-tab'));});});
    if(location.hash==='#faculty')setTab('faculty');
  }

  /* ---- generic login form mock ---- */
  document.querySelectorAll('[data-login]').forEach(function(f){
    f.addEventListener('submit',function(e){
      e.preventDefault();
      var btn=f.querySelector('button[type=submit]');
      var orig=btn.textContent;
      btn.textContent='Signing in…';btn.disabled=true;
      setTimeout(function(){
        var msg=f.querySelector('.login-msg');
        if(msg){msg.style.display='flex';}
        btn.textContent=orig;btn.disabled=false;
      },1100);
    });
  });

  /* ---- newsletter subscribe mock ---- */
  document.querySelectorAll('[data-newsletter]').forEach(function(f){
    f.addEventListener('submit',function(e){
      e.preventDefault();
      f.classList.add('is-done');
    });
  });

  /* ---- blog filters ---- */
  var fbtns=document.querySelectorAll('.blog-filters button');
  if(fbtns.length){
    fbtns.forEach(function(b){
      b.addEventListener('click',function(){
        fbtns.forEach(function(x){x.classList.remove('active');});
        b.classList.add('active');
        var cat=b.getAttribute('data-filter');
        document.querySelectorAll('.blog-grid .bp-card').forEach(function(c){
          var show=(cat==='all'||c.getAttribute('data-cat')===cat);
          c.style.display=show?'flex':'none';
        });
      });
    });
  }

  /* ---- testimonials filtered by graduating year ---- */
  var tYears=document.getElementById('testiYears');
  var tGrid=document.getElementById('testiGrid');
  if(tYears&&tGrid){
    var tBtns=tYears.querySelectorAll('.testi-year');
    var tCards=tGrid.querySelectorAll('.testi-card');
    var filterTesti=function(year){
      tBtns.forEach(function(b){
        var on=b.getAttribute('data-grad-year')===year;
        b.classList.toggle('is-on',on);
        b.setAttribute('aria-selected',on?'true':'false');
      });
      tCards.forEach(function(c){
        var match=c.getAttribute('data-grad-year')===year;
        c.classList.remove('is-show');
        c.classList.toggle('is-hidden',!match);
        if(match){void c.offsetWidth;c.classList.add('is-show');}
      });
    };
    tBtns.forEach(function(b){
      b.addEventListener('click',function(){filterTesti(b.getAttribute('data-grad-year'));});
    });
    var tInit=tYears.querySelector('.testi-year.is-on')||tBtns[tBtns.length-1];
    filterTesti(tInit.getAttribute('data-grad-year'));
  }

  /* ---- year ---- */
  document.querySelectorAll('[data-year]').forEach(function(el){el.textContent=new Date().getFullYear();});

  /* ---- floating brochure button (all pages) ---- */
  if(!document.querySelector('.brochure-fab')){
    var fab=document.createElement('a');
    fab.className='brochure-fab';
    fab.href='#';
    fab.setAttribute('aria-label','Download Brochure');
    fab.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14"/></svg>Download Brochure';
    document.body.appendChild(fab);
  }

  /* ---- brochure button: show after hero (if any) and STOP above the footer line ---- */
  var bFab=document.querySelector('.brochure-fab');
  var hero=document.querySelector('.hero');
  var foot=document.querySelector('.footer');
  if(bFab){
    var onFabScroll=function(){
      // on hero pages, stay hidden until the hero is scrolled past
      var pastHero=hero?hero.getBoundingClientRect().bottom<=90:true;
      // hide once the footer's top line reaches the bottom of the viewport,
      // so the button ends just above the footer rather than overlapping it
      var hitFooter=foot?foot.getBoundingClientRect().top<=window.innerHeight-16:false;
      bFab.classList.toggle('fab-hidden',!pastHero||hitFooter);
    };
    bFab.classList.add('fab-hidden');
    window.addEventListener('scroll',onFabScroll,{passive:true});
    window.addEventListener('resize',onFabScroll,{passive:true});
    onFabScroll();
  }

  /* ---- guest faculty flip cards: tap to flip on touch devices ---- */
  document.querySelectorAll('.gf-card').forEach(function(card){
    card.addEventListener('click',function(){
      if(window.matchMedia('(hover:none)').matches) card.classList.toggle('is-flipped');
    });
    card.addEventListener('keydown',function(e){
      if(e.key==='Enter'||e.key===' '){e.preventDefault();card.classList.toggle('is-flipped');}
    });
  });
})();
