const workData = [
    // Array de objetos que contiene los datos de cada obra del portafolio
    // Cada objeto tiene propiedades: title, category, description, image, date, tools
    // Se relaciona con el HTML del portafolio donde se cargan dinámicamente
    {
        title: 'Violet Evergarden',
        category: 'Retrato abstracto',
        description: 'Diseño surrealista de una amiga cercana, siendo de ella como un demonio que se parece a Violet Evergarden.',
        image: 'assets/img/demon_green.jpg',
        date: '2025',
        tools: 'Cámara · Photoshop'
    },
     {
        title: 'Gemelas ',
        category: 'Retrato digital',
        description: 'Inmortalización de la hermandad y conexión entre dos personas idénticas.',
        image: 'assets/img/gemelas.png',
        date: '2025',
        tools: 'Cámara · Photoshop'
    },
    {
        title: 'Firulais',
        category: 'Retrato mascotas',
        description: 'Inmortalización digital de mi perro Firulais, capturando su personalidad y esencia.',
        image: 'assets/img/firu.jpg',
        date: '2024',
        tools: 'Illustrator · InDesign'
    },
    {
        title: 'Rave Men',
        category: 'Realidad alterna',
        description: 'Versión masculina de Rave, de la serie Jóvenes Titanes.',
        image: 'assets/img/ravemen.jpg',
        date: '2024',
        tools: 'Adobe XD · After Effects'
    },
    {
        title: 'Encuentro de dos mundos',
        category: 'Realidad alterna',
        description: 'Tippyer Pecosa de otro universo se encuentra con un hada.',
        image: 'assets/img/tippy_hada.png',
        date: '2025',
        tools: 'Figma · Sketch'
    },
    {
        title: 'Fantasías animadas',
        category: 'Furros',
        description: 'La vaca lola tiene cachos y tiene cola.',
        image: 'assets/img/vaca_lola.jpg',
        date: '2024',
        tools: 'Orgasmo · Hentai'
    }
    // ... más obras
];

const portfolioGrid = document.getElementById('portfolio-grid');
// Referencia al elemento HTML donde se insertan las tarjetas de obras, id definido en portfolio.html
const loadState = document.getElementById('load-state');
// Elemento que muestra el estado de carga, se oculta/muestra según el proceso
const loadText = document.getElementById('load-text');
// Texto que cambia según el estado: "Cargando..." o "Has llegado al final..."
const loadingSpinner = document.getElementById('loading-spinner');
// Spinner animado que se muestra durante la carga
const workModal = document.getElementById('work-modal');
// Modal para vista ampliada de obras, se muestra/oculta con clases CSS
const modalTitle = document.getElementById('work-modal-title');
// Elemento donde se inserta el título de la obra seleccionada
const modalImage = document.getElementById('work-modal-image');
// Imagen ampliada en el modal
const modalDescription = document.getElementById('work-modal-description');
// Descripción de la obra
const modalCategory = document.getElementById('work-modal-category');
// Categoría
const modalDate = document.getElementById('work-modal-date');
// Fecha
const modalTools = document.getElementById('work-modal-tools');
// Herramientas usadas
const modalClose = document.getElementById('work-modal-close');
// Botón para cerrar el modal
let currentIndex = 0;
// Índice actual de las obras cargadas, se incrementa con cada batch
let isLoading = false;
// Flag para evitar cargas simultáneas
const batchSize = 3;
// Número de obras a cargar por vez

function createCard(work, index) {
    // Función que crea un elemento article para cada obra
    // Parámetros: work (objeto con datos), index (índice para dataset)
    // Retorna el elemento DOM listo para insertar
    const article = document.createElement('article');
    article.className = 'work-card';
    // Clase CSS para estilizar la tarjeta
    article.dataset.index = index;
    // Atributo data-index para identificar la obra al hacer click
    article.innerHTML = `
        <img class="work-image" src="${work.image}" alt="${work.title}">
        <div class="work-content">
            <span class="work-tag">${work.category}</span>
            <h3 class="work-title">${work.title}</h3>
            <p class="work-description">${work.description}</p>
            <div class="work-meta">
                <span>${work.date}</span>
                <span>${work.tools}</span>
            </div>
        </div>
    `;
    // HTML interno con interpolación de datos
    return article;
}

function openWorkModal(index) {
    // Función para abrir el modal con la obra seleccionada
    // Parámetro: index del array workData
    // Se relaciona con el evento click en las tarjetas
    const work = workData[index];
    if (!work || !workModal) return;
    // Verificación de existencia

    modalTitle.textContent = work.title;
    // Asigna título
    modalImage.src = work.image;
    modalImage.alt = work.title;
    // Asigna imagen y alt
    modalDescription.textContent = work.description;
    // Descripción
    modalCategory.textContent = work.category;
    // Categoría
    modalDate.textContent = work.date;
    // Fecha
    modalTools.textContent = work.tools;
    // Herramientas

    workModal.classList.add('visible');
    // Agrega clase para mostrar modal
    workModal.setAttribute('aria-hidden', 'false');
    // Atributo de accesibilidad
}

function closeWorkModal() {
    // Función para cerrar el modal
    // Remueve clases y atributos
    if (!workModal) return;
    workModal.classList.remove('visible');
    workModal.setAttribute('aria-hidden', 'true');
}

function loadWorks() {
    // Función para cargar un batch de obras
    // Se llama al inicio y al hacer scroll
    if (isLoading) return;
    // Evita llamadas simultáneas
    isLoading = true;
    loadingSpinner.style.display = 'inline-block';
    // Muestra spinner
    loadText.textContent = 'Cargando más obras...';
    // Cambia texto

    setTimeout(() => {
        // Simula carga asíncrona con setTimeout
        const slice = workData.slice(currentIndex, currentIndex + batchSize);
        // Obtiene el siguiente batch
        slice.forEach((work, index) => portfolioGrid.appendChild(createCard(work, currentIndex + index)));
        // Crea y agrega tarjetas
        currentIndex += slice.length;
        // Incrementa índice
        isLoading = false;
        if (currentIndex >= workData.length) {
            // Si no hay más obras
            loadingSpinner.style.display = 'none';
            loadText.textContent = 'Has llegado al final de la galería.';
            window.removeEventListener('scroll', onScroll);
            // Remueve listener de scroll
        }
    }, 600);
    // Retraso de 600ms para simular carga
}

function onScroll() {
    // Función manejadora del evento scroll
    // Calcula si el usuario llegó cerca del final para cargar más
    const position = window.innerHeight + window.scrollY;
    // Posición actual del scroll
    const threshold = document.body.offsetHeight - 120;
    // Umbral: altura total menos 120px
    if (position >= threshold) {
        loadWorks();
        // Carga más obras
    }
}

if (portfolioGrid) {
    // Si existe el grid (está en portfolio.html)
    loadWorks();
    // Carga inicial
    window.addEventListener('scroll', onScroll);
    // Agrega listener de scroll

    portfolioGrid.addEventListener('click', (event) => {
        // Listener para clicks en el grid
        const card = event.target.closest('.work-card');
        // Encuentra la tarjeta clickeada
        if (!card) return;
        const index = Number(card.dataset.index);
        // Obtiene índice
        openWorkModal(index);
        // Abre modal
    });
}

if (workModal) {
    // Si existe el modal
    workModal.addEventListener('click', (event) => {
        // Listener para clicks en el modal
        if (event.target === workModal || event.target === modalClose) {
            // Si click en fondo o botón cerrar
            closeWorkModal();
            // Cierra modal
        }
    });

    window.addEventListener('keydown', (event) => {
        // Listener para tecla Escape
        if (event.key === 'Escape') {
            closeWorkModal();
            // Cierra modal
        }
    });
}
