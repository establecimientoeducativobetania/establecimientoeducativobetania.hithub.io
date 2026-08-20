
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




// =====================================================
// BOTÓN FLOTANTE PQRSD
// =====================================================

function instalarAccesoPqrsd() {

  const pqrsdUrl =
    'https://script.google.com/macros/s/AKfycbwzpNYGwPuKNLlCTUc6e6iPlXWlI2WLOG08TJypL1MFpsFh1L20Q_V6AYbnDzYcBay4FQ/exec';


  // Evitar crear dos botones flotantes
  if (document.querySelector('.pqrsd-flotante')) {
    return;
  }


  const boton =
    document.createElement('a');


  boton.className =
    'pqrsd-flotante';


  boton.href =
    pqrsdUrl;


  boton.target =
    '_blank';


  boton.rel =
    'noopener';


  boton.setAttribute(
    'aria-label',
    'Radicar o consultar PQRSD'
  );


  boton.textContent =
    'PQRSD';


  document.body.appendChild(
    boton
  );

}


// Ejecutar al cargar la página

if (document.readyState === 'loading') {

  document.addEventListener(
    'DOMContentLoaded',
    instalarAccesoPqrsd
  );

} else {

  instalarAccesoPqrsd();

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


      // Crear automáticamente el botón "Ver todas las noticias"
if (!document.querySelector('.acciones-noticias')) {

  contenedor.insertAdjacentHTML(
    'afterend',
    `
      <div class="acciones-noticias">
        <a class="btn btn-primary" href="noticias.html">
          Ver todas las noticias
        </a>
      </div>
    `
  );

}

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


// =====================================================
// BOTÓN FLOTANTE - SOFTWARE INSTITUCIONAL DE NOTAS SINAÍ
// =====================================================

function instalarAccesoSinai() {

  // Evitar que el botón se cree dos veces
  if (document.querySelector('.sinai-flotante')) {
    return;
  }

  const sinaiUrl =
    'https://iebetania.sinai.net.co/Web/Default.aspx?ReturnUrl=%2fDocente%2fDefault.aspx';


  const botonSinai =
    document.createElement('a');


  botonSinai.className =
    'sinai-flotante';


  botonSinai.href =
    sinaiUrl;


  botonSinai.target =
    '_blank';


  botonSinai.rel =
    'noopener';


  botonSinai.setAttribute(
    'aria-label',
    'Ingresar al Software Institucional de Notas SINAÍ'
  );


  botonSinai.innerHTML = `
    <img
      src="assets/img/sinai.png"
      alt=""
      class="sinai-flotante-icono">

    <span>
      SINAÍ · Notas
    </span>
  `;


  document.body.appendChild(
    botonSinai
  );

}


// Ejecutar al cargar la página

if (document.readyState === 'loading') {

  document.addEventListener(
    'DOMContentLoaded',
    instalarAccesoSinai
  );

} else {

  instalarAccesoSinai();

}



// =====================================================
// CORREGIR TODOS LOS ENLACES ANTIGUOS DE PQRS
// =====================================================

function corregirEnlacesPqrsd() {

  const pqrsdUrl =
    'https://script.google.com/macros/s/AKfycbwzpNYGwPuKNLlCTUc6e6iPlXWlI2WLOG08TJypL1MFpsFh1L20Q_V6AYbnDzYcBay4FQ/exec';


  // Buscar todos los enlaces de la página
  const enlaces = document.querySelectorAll('a');


  enlaces.forEach(function(enlace) {

    const href =
      enlace.getAttribute('href') || '';

    const texto =
      enlace.textContent.trim().toLowerCase();


    // Detectar enlaces antiguos al PQRS de muestra
    if (
      href === 'pqrs.html' ||
      href.endsWith('/pqrs.html') ||
      texto === 'pqrs' ||
      texto === 'pqrsd' ||
      texto === 'radicar pqrsd'
    ) {

      enlace.href = pqrsdUrl;

      enlace.textContent =
        'Radicar o consultar PQRSD';

      enlace.target = '_blank';

      enlace.rel = 'noopener';

    }

  });


// Eliminar posibles PQRSD duplicados del menú principal

const menuPrincipal =
  document.getElementById('main-menu');

if (menuPrincipal) {

  const accesosPqrsd =
    Array.from(
      menuPrincipal.querySelectorAll('a')
    ).filter(function(enlace) {

      return enlace.textContent
        .trim()
        .toLowerCase()
        .includes('radicar o consultar pqrsd');

    });


  // Conservar solamente el primero

  accesosPqrsd
    .slice(1)
    .forEach(function(enlace) {

      const elementoLista =
        enlace.closest('li');

      if (elementoLista) {
        elementoLista.remove();
      }

    });

}



}


// Ejecutar automáticamente
if (document.readyState === 'loading') {

  document.addEventListener(
    'DOMContentLoaded',
    corregirEnlacesPqrsd
  );

} else {

  corregirEnlacesPqrsd();

}




// =====================================================
// CRONOGRAMA INSTITUCIONAL 2026
// =====================================================

function cargarCronogramaInstitucional2026() {

  const contenedor =
    document.getElementById(
      'cronograma-institucional-2026'
    );


  // Si estamos en otra página, no hacer nada.
  if (!contenedor) {
    return;
  }


  const cronograma =
    window.CRONOGRAMA_INSTITUCIONAL_2026 || [];


  // Si no hay información registrada.
  if (cronograma.length === 0) {

    contenedor.innerHTML = `

      <div class="notice">

        <strong>
          Cronograma Institucional 2026
        </strong>

        <p>
          Actualmente no hay actividades registradas.
        </p>

      </div>

    `;

    return;
  }


  // Nombre público de cada categoría.

  const nombresTipos = {

    academico:
      'Académico',

    institucional:
      'Institucional',

    actividad:
      'Actividad',

    comunidad:
      'Comunidad educativa',

    conmemoracion:
      'Conmemoración',

    vacaciones:
      'Vacaciones',

    festivo:
      'Festivo'

  };


  // ===================================================
  // CREAR LOS 12 MESES
  // ===================================================

  contenedor.innerHTML =
    cronograma
      .map(function(mes) {


        const eventos =
          mes.eventos
            .map(function(evento) {


              const tipo =
                evento.tipo || 'institucional';


              const nombreTipo =
                nombresTipos[tipo] ||
                'Institucional';


              const detalle =
                evento.detalle
                  ? `
                    <p class="cronograma-detalle">
                      ${evento.detalle}
                    </p>
                  `
                  : '';


              return `

                <li class="cronograma-evento">

                  <div class="cronograma-evento-fecha">
                    ${evento.fecha}
                  </div>


                  <div class="cronograma-evento-contenido">

                    <span
                      class="
                        cronograma-tipo
                        cronograma-tipo-${tipo}
                      ">

                      ${nombreTipo}

                    </span>


                    <h4>
                      ${evento.titulo}
                    </h4>


                    ${detalle}

                  </div>

                </li>

              `;

            })
            .join('');


        return `

          <article class="cronograma-mes-card">

            <header class="cronograma-mes-header">

              <span class="cronograma-mes-anio">
                2026
              </span>

              <h3>
                ${mes.mes}
              </h3>

            </header>


            <ul class="cronograma-eventos">

              ${eventos}

            </ul>

          </article>

        `;

      })
      .join('');

}


// =====================================================
// EJECUTAR AL CARGAR LA PÁGINA
// =====================================================

if (document.readyState === 'loading') {

  document.addEventListener(
    'DOMContentLoaded',
    cargarCronogramaInstitucional2026
  );

} else {

  cargarCronogramaInstitucional2026();

}




// =====================================================
// VISOR DE IMÁGENES PARA NOTICIAS
// =====================================================

function instalarVisorNoticias() {

  // Crear el visor una sola vez
  if (!document.getElementById('visor-noticias')) {

    const visor = document.createElement('div');

    visor.id = 'visor-noticias';
    visor.className = 'visor-noticias';
    visor.setAttribute('aria-hidden', 'true');

    visor.innerHTML = `

      <div class="visor-noticias-contenido">

        <button
          class="visor-noticias-cerrar"
          type="button"
          aria-label="Cerrar imagen">
          ×
        </button>

        <img
          class="visor-noticias-imagen"
          src=""
          alt="">

        <div class="visor-noticias-pie">
          <span class="visor-noticias-titulo"></span>
        </div>

      </div>

    `;

    document.body.appendChild(visor);
  }


  const visor =
    document.getElementById('visor-noticias');

  const imagenGrande =
    visor.querySelector('.visor-noticias-imagen');

  const titulo =
    visor.querySelector('.visor-noticias-titulo');

  const botonCerrar =
    visor.querySelector('.visor-noticias-cerrar');


  // ===================================================
  // ABRIR AL HACER CLIC EN UNA FOTO DE NOTICIA
  // ===================================================

  document.addEventListener('click', function(evento) {

    const imagen =
      evento.target.closest('.noticia-imagen');

    if (!imagen) {
      return;
    }


    imagenGrande.src =
      imagen.src;

    imagenGrande.alt =
      imagen.alt || 'Imagen de noticia';


    // Buscar el título de la noticia correspondiente

    const tarjeta =
      imagen.closest('.noticia-card');

    const tituloNoticia =
      tarjeta
        ? tarjeta.querySelector('h3')
        : null;


    titulo.textContent =
      tituloNoticia
        ? tituloNoticia.textContent
        : 'Institución Educativa Betania';


    visor.classList.add('activo');

    visor.setAttribute(
      'aria-hidden',
      'false'
    );


    // Evitar desplazamiento de la página
    document.body.classList.add(
      'visor-abierto'
    );

  });


  // ===================================================
  // CERRAR VISOR
  // ===================================================

  function cerrarVisorNoticias() {

    visor.classList.remove('activo');

    visor.setAttribute(
      'aria-hidden',
      'true'
    );

    imagenGrande.src = '';

    document.body.classList.remove(
      'visor-abierto'
    );

  }


  // Botón X

  botonCerrar.addEventListener(
    'click',
    cerrarVisorNoticias
  );


  // Clic fuera de la fotografía

  visor.addEventListener('click', function(evento) {

    if (evento.target === visor) {

      cerrarVisorNoticias();

    }

  });


  // Tecla ESC

  document.addEventListener(
    'keydown',
    function(evento) {

      if (
        evento.key === 'Escape' &&
        visor.classList.contains('activo')
      ) {

        cerrarVisorNoticias();

      }

    }
  );

}


// Ejecutar automáticamente

if (document.readyState === 'loading') {

  document.addEventListener(
    'DOMContentLoaded',
    instalarVisorNoticias
  );

} else {

  instalarVisorNoticias();

}