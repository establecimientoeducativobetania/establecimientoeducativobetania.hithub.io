
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




// =====================================================
// ACCESO GLOBAL AL SISTEMA PQRSD
// Se aplica automáticamente en todas las páginas
// =====================================================

function instalarAccesoPqrsd() {

  const pqrsdUrl =
    'https://script.google.com/macros/s/AKfycbwzpNYGwPuKNLlCTUc6e6iPlXWlI2WLOG08TJypL1MFpsFh1L20Q_V6AYbnDzYcBay4FQ/exec';


  // -----------------------------------------------------
  // 1. AGREGAR PQRSD AL MENÚ PRINCIPAL SI NO EXISTE
  // -----------------------------------------------------

  const menu =
    document.querySelector('.main-menu');


  if (menu) {

    const enlaces =
      Array.from(
        menu.querySelectorAll('a')
      );


    const yaExiste =
      enlaces.some(function(enlace) {

        return (
          enlace.textContent
            .trim()
            .toUpperCase()
            .includes('PQRSD') ||

          enlace.href === pqrsdUrl
        );

      });


    if (!yaExiste) {

      const elementoLista =
        document.createElement('li');


      const enlacePqrsd =
        document.createElement('a');


      enlacePqrsd.href =
        pqrsdUrl;

      enlacePqrsd.target =
        '_blank';

      enlacePqrsd.rel =
        'noopener';

      enlacePqrsd.className =
        'pqrsd-nav-link';

      enlacePqrsd.textContent =
        'PQRSD';


      elementoLista.appendChild(
        enlacePqrsd
      );


      // Intentar colocarlo antes del calendario escolar.

      const enlaceCalendario =
        enlaces.find(function(enlace) {

          return (
            enlace
              .getAttribute('href') || ''
          )
            .toLowerCase()
            .includes('calendario');

        });


      if (
        enlaceCalendario &&
        enlaceCalendario.parentElement
      ) {

        menu.insertBefore(
          elementoLista,
          enlaceCalendario.parentElement
        );

      } else {

        menu.appendChild(
          elementoLista
        );

      }

    }

  }


  // -----------------------------------------------------
  // 2. CREAR BOTÓN FLOTANTE PQRSD
  // -----------------------------------------------------

  if (
    !document.querySelector(
      '.pqrsd-flotante'
    )
  ) {

    const boton =
      document.createElement('a');


    boton.href =
      pqrsdUrl;

    boton.target =
      '_blank';

    boton.rel =
      'noopener';

    boton.className =
      'pqrsd-flotante';

    boton.setAttribute(
      'aria-label',
      'Radicar o consultar PQRSD'
    );


    boton.innerHTML =
      '<span aria-hidden="true">✉</span>' +
      '<span>PQRSD</span>';


    document.body.appendChild(
      boton
    );

  }

}


// Ejecutar cuando la página esté lista

if (
  document.readyState === 'loading'
) {

  document.addEventListener(
    'DOMContentLoaded',
    instalarAccesoPqrsd
  );

} else {

  instalarAccesoPqrsd();

}


// =====================================================
// MOSTRAR NOTICIAS AUTOMÁTICAMENTE EN INICIO
// =====================================================

function cargarNoticiasInicio() {

  const contenedor =
    document.getElementById('noticias-inicio');

  if (!contenedor) {
    return;
  }

  const noticias =
    window.NOTICIAS_IEB || [];

  if (noticias.length === 0) {

    contenedor.innerHTML = `
      <article class="card">
        <span class="tag">Institucional</span>
        <h3>Próximamente</h3>
        <p>
          En este espacio se publicarán las principales
          noticias y actividades de la Institución Educativa Betania.
        </p>
      </article>
    `;

    return;
  }

  const noticiasRecientes =
    noticias.slice(0, 3);

  contenedor.innerHTML =
    noticiasRecientes
      .map(function(noticia) {

        const imagen =
          noticia.imagen
            ? `
              <img
                src="${noticia.imagen}"
                alt="${noticia.titulo}"
                class="noticia-imagen"
                loading="lazy">
            `
            : '';

        const enlace =
          noticia.enlace
            ? `
              <a
                class="btn btn-outline"
                href="${noticia.enlace}">
                ${noticia.textoEnlace || 'Ver más'}
              </a>
            `
            : '';

        return `

          <article class="card noticia-card">

            ${imagen}

            <span class="tag">
              ${noticia.categoria || 'Institucional'}
            </span>

            <p class="noticia-fecha">
              ${noticia.fechaTexto || ''}
            </p>

            <h3>
              ${noticia.titulo}
            </h3>

            <p>
              ${noticia.resumen}
            </p>

            ${enlace}

          </article>

        `;

      })
      .join('');

}

if (document.readyState === 'loading') {

  document.addEventListener(
    'DOMContentLoaded',
    cargarNoticiasInicio
  );

} else {

  cargarNoticiasInicio();

}


// =====================================================
// DOCUMENTOS INSTITUCIONALES AUTOMÁTICOS
// =====================================================

function cargarDocumentosInstitucionales() {

  const contenedor =
    document.getElementById(
      'documentos-institucionales'
    );


  // Si estamos en otra página, no hacer nada.

  if (!contenedor) {
    return;
  }


  const documentos =
    window.DOCUMENTOS_IEB || [];


  if (documentos.length === 0) {

    contenedor.innerHTML = `

      <div class="notice">

        No hay documentos institucionales
        registrados actualmente.

      </div>

    `;

    return;

  }


  // =====================================================
  // ORDEN EN QUE APARECERÁN LAS CATEGORÍAS
  // =====================================================

  const categorias = [

    "INSTITUCIONAL",

    "ACADÉMICO",

    "PROTECCIÓN Y SEGURIDAD",

    "GESTIÓN DOCUMENTAL",

    "GESTIÓN Y TRANSPARENCIA"

  ];


  let contenido = '';


  categorias.forEach(function(categoria) {


    const documentosCategoria =
      documentos.filter(function(documento) {

        return documento.categoria === categoria;

      });


    if (documentosCategoria.length === 0) {
      return;
    }


    contenido += `

      <section class="grupo-documentos">

        <h3 class="titulo-categoria-documentos">
          ${categoria}
        </h3>

        <ul class="doc-list">

    `;


    documentosCategoria.forEach(function(documento) {


      // ===============================================
      // DOCUMENTO PUBLICADO
      // ===============================================

      if (
        documento.disponible &&
        documento.archivo
      ) {

        contenido += `

          <li class="doc-item documento-disponible">

            <div class="documento-info">

              <strong>
                ${documento.titulo}
              </strong>

              <div class="meta">

                Documento publicado

                ${
                  documento.anio
                    ? ' · ' + documento.anio
                    : ''
                }

                · Formato PDF

              </div>


              ${
                documento.descripcion
                  ? `
                    <div class="descripcion-documento">
                      ${documento.descripcion}
                    </div>
                  `
                  : ''
              }

            </div>


            <a
              class="btn btn-outline"
              href="${documento.archivo}"
              target="_blank"
              rel="noopener">

              Consultar documento

            </a>

          </li>

        `;

      }


      // ===============================================
      // DOCUMENTO PENDIENTE
      // ===============================================

      else {

        contenido += `

          <li class="doc-item documento-pendiente">

            <div class="documento-info">

              <strong>
                ${documento.titulo}
              </strong>

              <div class="meta">

                ${
                  documento.descripcion || ''
                }

              </div>

            </div>


            <span class="status status-pending">
              Pendiente de publicación
            </span>

          </li>

        `;

      }


    });


    contenido += `

        </ul>

      </section>

    `;


  });


  contenedor.innerHTML =
    contenido;

}


if (document.readyState === 'loading') {

  document.addEventListener(
    'DOMContentLoaded',
    cargarDocumentosInstitucionales
  );

} else {

  cargarDocumentosInstitucionales();

}

// =====================================================
// DOCUMENTOS INSTITUCIONALES AUTOMÁTICOS
// =====================================================

function cargarDocumentosInstitucionales() {

  const contenedor =
    document.getElementById(
      'documentos-institucionales'
    );


  // Si estamos en otra página, no hacemos nada.
  if (!contenedor) {
    return;
  }


  const documentos =
    window.DOCUMENTOS_IEB || [];


  // Si todavía no hay documentos registrados.
  if (documentos.length === 0) {

    contenedor.innerHTML = `

      <li class="doc-item">

        <div>

          <strong>
            Documentos institucionales
          </strong>

          <div class="meta">
            Próximamente se publicarán documentos institucionales.
          </div>

        </div>

      </li>

    `;

    return;

  }


  // Crear automáticamente cada documento.

  contenedor.innerHTML =
    documentos
      .map(function(documento) {

        return `

          <li class="doc-item">

            <div>

              <strong>
                ${documento.titulo}
              </strong>

              <div class="meta">

                ${documento.categoria || 'Institucional'}

                ${documento.anio
                  ? ' · ' + documento.anio
                  : ''}

                · Formato PDF

              </div>

              ${
                documento.descripcion
                  ? `
                    <div class="meta"
                         style="margin-top:6px;">
                      ${documento.descripcion}
                    </div>
                  `
                  : ''
              }

            </div>


            <a
              class="btn btn-outline"
              href="${documento.archivo}"
              target="_blank"
              rel="noopener">

              Consultar documento

            </a>

          </li>

        `;

      })
      .join('');

}


// Ejecutar cuando la página termine de cargar.

if (document.readyState === 'loading') {

  document.addEventListener(
    'DOMContentLoaded',
    cargarDocumentosInstitucionales
  );

} else {

  cargarDocumentosInstitucionales();

}





// =====================================================
// PÁGINA GENERAL DE NOTICIAS Y ACTIVIDADES
// =====================================================

function cargarTodasLasNoticias() {

  const contenedor =
    document.getElementById('todas-las-noticias');


  // Si no estamos en noticias.html, no hacemos nada.
  if (!contenedor) {
    return;
  }


  const noticias =
    window.NOTICIAS_IEB || [];


  // Si no hay noticias registradas.
  if (noticias.length === 0) {

    contenedor.innerHTML = `

      <article class="card">

        <span class="tag">
          Institucional
        </span>

        <h3>
          Próximamente
        </h3>

        <p>
          En este espacio se publicarán las noticias,
          actividades y acontecimientos de la
          Institución Educativa Betania.
        </p>

      </article>

    `;

    return;

  }


  // Crear todas las noticias automáticamente.

  contenedor.innerHTML =
    noticias
      .map(function(noticia) {


        const imagen = noticia.imagen
          ? `
            <img
              src="${noticia.imagen}"
              alt="${noticia.titulo}"
              class="noticia-imagen"
              loading="lazy">
          `
          : '';


        const enlace = noticia.enlace
          ? `
            <a
              class="btn btn-outline"
              href="${noticia.enlace}">
              ${noticia.textoEnlace || 'Ver más'}
            </a>
          `
          : '';


        return `

          <article class="card noticia-card">

            ${imagen}

            <span class="tag">
              ${noticia.categoria || 'Institucional'}
            </span>

            <p class="noticia-fecha">
              ${noticia.fechaTexto || ''}
            </p>

            <h3>
              ${noticia.titulo}
            </h3>

            <p>
              ${noticia.resumen}
            </p>

            ${enlace}

          </article>

        `;

      })
      .join('');

}


// Ejecutar después de cargar la página.

if (document.readyState === 'loading') {

  document.addEventListener(
    'DOMContentLoaded',
    cargarTodasLasNoticias
  );

} else {

  cargarTodasLasNoticias();

}