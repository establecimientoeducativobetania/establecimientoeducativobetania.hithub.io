
(function(){
  const root=document.documentElement;
  const body=document.body;
  const menuButton=document.querySelector('.menu-toggle');
  const menu=document.querySelector('.main-menu');
  if(menuButton&&menu){menuButton.addEventListener('click',()=>{const open=menu.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));});}

  let scale=parseFloat(localStorage.getItem('betania-font-scale')||'1');
  function applyScale(){scale=Math.min(1.35,Math.max(.9,scale));root.style.setProperty('--font-scale',String(scale));localStorage.setItem('betania-font-scale',String(scale));}
  document.querySelector('[data-font="increase"]')?.addEventListener('click',()=>{scale+=.1;applyScale();});
  document.querySelector('[data-font="decrease"]')?.addEventListener('click',()=>{scale-=.1;applyScale();});
  document.querySelector('[data-font="reset"]')?.addEventListener('click',()=>{scale=1;applyScale();});
  applyScale();

  const contrast=localStorage.getItem('betania-contrast')==='high';
  if(contrast)body.classList.add('high-contrast');
  document.querySelector('[data-contrast]')?.addEventListener('click',()=>{body.classList.toggle('high-contrast');localStorage.setItem('betania-contrast',body.classList.contains('high-contrast')?'high':'normal');});

  document.querySelector('[data-print]')?.addEventListener('click',()=>window.print());

  const search=document.querySelector('.search-form');
  if(search){search.addEventListener('submit',(e)=>{e.preventDefault();const q=search.querySelector('input').value.trim();if(q)location.href='busqueda.html?q='+encodeURIComponent(q);});}

  const pqrs=document.querySelector('#pqrs-form');
  const anonymous=document.querySelector('#anonima');
  const identityFields=document.querySelectorAll('[data-identity]');
  function updateIdentity(){if(!anonymous)return;identityFields.forEach(el=>{el.hidden=anonymous.checked;el.querySelectorAll('input,select').forEach(field=>{field.disabled=anonymous.checked;field.required=!anonymous.checked&&field.dataset.required==='true';});});}
  anonymous?.addEventListener('change',updateIdentity);updateIdentity();
  if(pqrs){pqrs.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=document.querySelector('#pqrs-message');
    if(!pqrs.checkValidity()){pqrs.reportValidity();return;}
    if(pqrs.website?.value)return;
    message.classList.add('show');
    message.innerHTML='<strong>Formulario de demostración.</strong> La interfaz está validada, pero aún debe conectarse al sistema institucional de gestión documental para generar radicado, acuse de recibo y seguimiento real.';
    message.focus();
  });}

  const tracking=document.querySelector('#tracking-form');
  if(tracking){tracking.addEventListener('submit',(e)=>{e.preventDefault();const m=document.querySelector('#tracking-message');m.classList.add('show');m.textContent='La consulta de radicados estará disponible cuando se conecte el módulo al sistema institucional.';m.focus();});}
})();
