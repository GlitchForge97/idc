// Nav scroll
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>nav.classList.toggle('solid',scrollY>80),{passive:true});

// Scroll reveal
const reveals=document.querySelectorAll('.reveal');
const ro=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const siblings=[...(e.target.parentElement?.querySelectorAll('.reveal:not(.up)')||[])];
      const i=Math.max(0,siblings.indexOf(e.target));
      setTimeout(()=>{e.target.classList.add('up');ro.unobserve(e.target)},Math.min(i,6)*80);
    }
  });
},{threshold:.08,rootMargin:'0px 0px -45px 0px'});
reveals.forEach(el=>ro.observe(el));

// Stat counters
const nums=document.querySelectorAll('.stn:not(.no-count)');
const co=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const el=e.target,raw=el.textContent,num=parseInt(raw),suf=raw.replace(/\d/g,'');
      let c=0;const step=num/60;
      const t=setInterval(()=>{c+=step;if(c>=num){c=num;clearInterval(t)}el.textContent=Math.floor(c)+suf},20);
      co.unobserve(el);
    }
  });
},{threshold:.6});
nums.forEach(n=>co.observe(n));

// Mouse blob parallax
const blobs=document.querySelectorAll('.blob');
window.addEventListener('mousemove',e=>{
  const cx=e.clientX/innerWidth-.5,cy=e.clientY/innerHeight-.5;
  blobs.forEach((b,i)=>{const f=(i+1)*9;b.style.transform=`translate(${cx*f}px,${cy*f}px)`});
},{passive:true});

// Gallery: if you get direct image URLs from Drive, swap them in like:
// document.querySelector('#gal-national .gal-item:nth-child(1)').innerHTML = '<img src="YOUR_DIRECT_URL" alt="..."><div class="gal-label-badge">Nationals</div>';
