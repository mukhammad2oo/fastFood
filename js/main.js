/* ==========================================================================
   FIREBURG - MAIN UI, MENU FILTERING & SCROLL ANIMATIONS
   ========================================================================== */

// Bitta mahsulot kartochkasi HTML shabloni
function createProductCardHTML(product) {
    return `
        <div class="col-12 col-sm-6 col-lg-4 col-xl-3 reveal active">
            <div class="product-card">
                <div class="product-img-box">
                    ${product.badge ? `<span class="product-badge-top">${product.badge}</span>` : ''}
                    <span class="product-rating-badge">
                        <i class="bi bi-star-fill"></i> ${product.rating.toFixed(1)}
                    </span>
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                </div>
                <div class="product-body">
                    <div class="product-category-label">${product.categoryName}</div>
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-desc">${product.description}</p>
                    <div class="product-price-row">
                        <div class="product-price">
                            ${product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} <small>so'm</small>
                        </div>
                        <span class="badge bg-light text-dark border">Tayyor: 15 daq</span>
                    </div>
                    <div class="product-actions">
                        <button type="button" class="btn-add-cart" onclick="addToCart(${product.id})">
                            <i class="bi bi-bag-plus-fill"></i> Savatga
                        </button>
                        <button type="button" class="btn-buy-now" onclick="buyNow(${product.id})">
                            <i class="bi bi-lightning-fill"></i> Sotib olish
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Kategoriya tugmalarini chizish
function renderCategoryTabs(containerId, activeCategory = 'all', onSelectCallback) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = CATEGORIES.map(cat => `
        <button type="button" 
                class="cat-btn ${cat.id === activeCategory ? 'active' : ''}" 
                data-category="${cat.id}">
            <i class="bi ${cat.icon}"></i>
            <span>${cat.name}</span>
        </button>
    `).join('');

    container.querySelectorAll('.cat-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            container.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const selectedCat = btn.getAttribute('data-category');
            onSelectCallback(selectedCat);
        });
    });
}

// Mahsulotlarni ekranga chiqarish (Home va Menu sahifalari uchun)
function renderProductsGrid(gridId, category = 'all', searchQuery = '', sortBy = 'default', limit = null) {
    const grid = document.getElementById(gridId);
    if (!grid) return;

    let filtered = [...PRODUCTS];

    // Kategoriya bo'yicha filter
    if (category !== 'all') {
        filtered = filtered.filter(p => p.category === category);
    }

    // Qidiruv bo'yicha filter
    if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.categoryName.toLowerCase().includes(q)
        );
    }

    // Saralash (Narx yoki Reyting)
    if (sortBy === 'price-asc') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
        filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
        filtered.sort((a, b) => b.rating - a.rating);
    }

    // Agar asosiy sahifada bo'lsa va limit berilgan bo'lsa
    if (limit && category === 'all' && searchQuery === '') {
        filtered = filtered.slice(0, limit);
    }

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="bi bi-search fs-1 text-muted d-block mb-3"></i>
                <h4 class="fw-bold">Hech qanday mahsulot topilmadi</h4>
                <p class="text-muted">Boshqa kategoriya yoki qidiruv so'zini tanlab ko'ring.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = filtered.map(product => createProductCardHTML(product)).join('');
}

// Sticky Navbar va Scroll Reveal animatsiyalari
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar-custom');
    window.addEventListener('scroll', () => {
        if (navbar) {
            if (window.scrollY > 40) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // Scroll Reveal Observer
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.12 });

    revealElements.forEach(el => observer.observe(el));

    // 1. Agar INDEX.HTML sahifasida bo'lsak
    const homeProductsGrid = document.getElementById('homeProductsGrid');
    if (homeProductsGrid) {
        renderCategoryTabs('homeCategoryTabs', 'all', (selectedCat) => {
            renderProductsGrid('homeProductsGrid', selectedCat, '', 'default', 8);
        });
        renderProductsGrid('homeProductsGrid', 'all', '', 'default', 8);
    }

    // 2. Agar MENU.HTML sahifasida bo'lsak
    const fullMenuGrid = document.getElementById('fullMenuGrid');
    if (fullMenuGrid) {
        // URL dan kategoriya parametrini tekshirish (masalan: menu.html?cat=burgerlar)
        const urlParams = new URLSearchParams(window.location.search);
        let currentCategory = urlParams.get('cat') || 'all';
        if (!CATEGORIES.some(c => c.id === currentCategory)) {
            currentCategory = 'all';
        }

        let currentSearch = '';
        let currentSort = 'default';

        const updateFullMenu = () => {
            renderProductsGrid('fullMenuGrid', currentCategory, currentSearch, currentSort, null);
        };

        renderCategoryTabs('menuCategoryTabs', currentCategory, (selectedCat) => {
            currentCategory = selectedCat;
            updateFullMenu();
        });

        const searchInput = document.getElementById('menuSearchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                currentSearch = e.target.value;
                updateFullMenu();
            });
        }

        const sortSelect = document.getElementById('menuSortSelect');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                currentSort = e.target.value;
                updateFullMenu();
            });
        }

        updateFullMenu();
    }
});