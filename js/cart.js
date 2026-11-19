/* ==========================================================================
   FIREBURG - SHOPPING CART & LOCALSTORAGE LOGIC
   ========================================================================== */

const CART_STORAGE_KEY = 'fireburg_cart_v1';

// Savatchani localStorage dan o'qish
function getCart() {
    try {
        const data = localStorage.getItem(CART_STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.error("Savatchani o'qishda xatolik:", e);
        return [];
    }
}

// Savatchani localStorage ga saqlash
function saveCart(cart) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    updateCartUI();
}

// Savatchaga mahsulot qo'shish
function addToCart(productId, quantity = 1) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const cart = getCart();
    const existingIndex = cart.findIndex(item => item.id === productId);

    if (existingIndex > -1) {
        cart[existingIndex].quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            categoryName: product.categoryName,
            quantity: quantity
        });
    }

    saveCart(cart);
    showToast(`"${product.name}" savatchaga qo'shildi!`);
}

// "Sotib olish" tugmasi bosilganda: mahsulotni qo'shib to'g'ridan-to'g'ri checkout.html ga o'tish
function buyNow(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const cart = getCart();
    const existingIndex = cart.findIndex(item => item.id === productId);

    if (existingIndex === -1) {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            categoryName: product.categoryName,
            quantity: 1
        });
        saveCart(cart);
    }

    window.location.href = 'checkout.html';
}

// Mahsulot miqdorini o'zgartirish (+1 yoki -1)
function changeQuantity(productId, delta) {
    let cart = getCart();
    const index = cart.findIndex(item => item.id === productId);
    if (index === -1) return;

    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    saveCart(cart);
}

// Mahsulotni savatchadan butunlay o'chirish
function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
}

// Savatchani tozalash
function clearCart() {
    localStorage.removeItem(CART_STORAGE_KEY);
    updateCartUI();
}

// Savatchadagi umumiy mahsulotlar soni va narxini hisoblash
function getCartTotals() {
    const cart = getCart();
    let totalItems = 0;
    let subtotal = 0;

    cart.forEach(item => {
        totalItems += item.quantity;
        subtotal += item.price * item.quantity;
    });

    return { totalItems, subtotal };
}

// Navbar badge va Offcanvas savatcha oynasini yangilash
function updateCartUI() {
    const cart = getCart();
    const { totalItems, subtotal } = getCartTotals();

    // Barcha navbar badge elementlarini yangilash
    document.querySelectorAll('.cart-badge').forEach(badge => {
        badge.textContent = totalItems;
        badge.style.display = totalItems > 0 ? 'flex' : 'none';
    });

    // Offcanvas ichidagi elementlarni yangilash
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const cartEmptyState = document.getElementById('cartEmptyState');
    const cartFooter = document.getElementById('cartDrawerFooter');
    const cartSubtotalEl = document.getElementById('cartSubtotal');

    if (!cartItemsContainer) return;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '';
        if (cartEmptyState) cartEmptyState.classList.remove('d-none');
        if (cartFooter) cartFooter.classList.add('d-none');
    } else {
        if (cartEmptyState) cartEmptyState.classList.add('d-none');
        if (cartFooter) cartFooter.classList.remove('d-none');
        if (cartSubtotalEl) cartSubtotalEl.textContent = formatPrice(subtotal);

        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item-row">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="flex-grow-1">
                    <h6 class="mb-1 fw-bold text-dark" style="font-size: 0.95rem;">${item.name}</h6>
                    <div class="text-danger fw-bold small mb-2">${formatPrice(item.price)}</div>
                    <div class="d-flex align-items-center justify-content-between">
                        <div class="qty-control">
                            <button type="button" class="qty-btn" onclick="changeQuantity(${item.id}, -1)" aria-label="Kamaytirish">
                                <i class="bi bi-dash"></i>
                            </button>
                            <span class="px-2 fw-bold small">${item.quantity}</span>
                            <button type="button" class="qty-btn" onclick="changeQuantity(${item.id}, 1)" aria-label="Oshirish">
                                <i class="bi bi-plus"></i>
                            </button>
                        </div>
                        <button type="button" class="btn btn-sm text-muted p-1" onclick="removeFromCart(${item.id})" title="O'chirish">
                            <i class="bi bi-trash3-fill text-danger"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Chiroyli Toast xabarnoma ko'rsatish
function showToast(message) {
    let container = document.querySelector('.custom-toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'custom-toast-container';
        document.body.appendChild(container);
    }

    const toastEl = document.createElement('div');
    toastEl.className = 'toast align-items-center text-bg-dark border-0 show mb-2 shadow-lg';
    toastEl.style.borderRadius = '14px';
    toastEl.innerHTML = `
        <div class="d-flex align-items-center p-2">
            <div class="toast-body d-flex align-items-center gap-2 fw-semibold">
                <i class="bi bi-check-circle-fill text-warning fs-5"></i>
                <span>${message}</span>
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" onclick="this.parentElement.parentElement.remove()"></button>
        </div>
    `;

    container.appendChild(toastEl);
    setTimeout(() => {
        if (toastEl.parentElement) toastEl.remove();
    }, 3000);
}

// Sahifa yuklanganda savatchani ishga tushirish
document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();
});