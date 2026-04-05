const workData = [
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
];

const portfolioGrid = document.getElementById('portfolio-grid');
const loadState = document.getElementById('load-state');
const loadText = document.getElementById('load-text');
const loadingSpinner = document.getElementById('loading-spinner');
const workModal = document.getElementById('work-modal');
const modalTitle = document.getElementById('work-modal-title');
const modalImage = document.getElementById('work-modal-image');
const modalDescription = document.getElementById('work-modal-description');
const modalCategory = document.getElementById('work-modal-category');
const modalDate = document.getElementById('work-modal-date');
const modalTools = document.getElementById('work-modal-tools');
const modalClose = document.getElementById('work-modal-close');
let currentIndex = 0;
let isLoading = false;
const batchSize = 3;

function createCard(work, index) {
    const article = document.createElement('article');
    article.className = 'work-card';
    article.dataset.index = index;
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
    return article;
}

function openWorkModal(index) {
    const work = workData[index];
    if (!work || !workModal) return;

    modalTitle.textContent = work.title;
    modalImage.src = work.image;
    modalImage.alt = work.title;
    modalDescription.textContent = work.description;
    modalCategory.textContent = work.category;
    modalDate.textContent = work.date;
    modalTools.textContent = work.tools;

    workModal.classList.add('visible');
    workModal.setAttribute('aria-hidden', 'false');
}

function closeWorkModal() {
    if (!workModal) return;
    workModal.classList.remove('visible');
    workModal.setAttribute('aria-hidden', 'true');
}

function loadWorks() {
    if (isLoading) return;
    isLoading = true;
    loadingSpinner.style.display = 'inline-block';
    loadText.textContent = 'Cargando más obras...';

    setTimeout(() => {
        const slice = workData.slice(currentIndex, currentIndex + batchSize);
        slice.forEach((work, index) => portfolioGrid.appendChild(createCard(work, currentIndex + index)));
        currentIndex += slice.length;
        isLoading = false;
        if (currentIndex >= workData.length) {
            loadingSpinner.style.display = 'none';
            loadText.textContent = 'Has llegado al final de la galería.';
            window.removeEventListener('scroll', onScroll);
        }
    }, 600);
}

function onScroll() {
    const position = window.innerHeight + window.scrollY;
    const threshold = document.body.offsetHeight - 120;
    if (position >= threshold) {
        loadWorks();
    }
}

if (portfolioGrid) {
    loadWorks();
    window.addEventListener('scroll', onScroll);

    portfolioGrid.addEventListener('click', (event) => {
        const card = event.target.closest('.work-card');
        if (!card) return;
        const index = Number(card.dataset.index);
        openWorkModal(index);
    });
}

if (workModal) {
    workModal.addEventListener('click', (event) => {
        if (event.target === workModal || event.target === modalClose) {
            closeWorkModal();
        }
    });

    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeWorkModal();
        }
    });
}
