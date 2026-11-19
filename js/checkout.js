/* ==========================================================================
   FIREBURG - CHECKOUT PAGE, PROMO CODE & FORM VALIDATION
   ========================================================================== */

const DELIVERY_FEE = 15000;
const FREE_DELIVERY_THRESHOLD = 100000; // 100 000 so'mdan oshsa yetkazib berish bepul
let appliedPromo = null;

document.addEventListener('DOMContentLoaded', () => {
    renderCheckoutSummary();

    const applyPromoBtn = document.getElementById('applyPromoBtn');
    if (applyPromoBtn) {
        applyPromoBtn.addEventListener('click', handlePromoCode);
    }

    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleOrderSubmit);
    }

    // Telefon raqami kiritilganda avtomatik formatlash (+998 ...)
    const phoneInput = document.getElementById('customerPhone');
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            let val = e.target.value.replace(/[^\d+]/g, '');
            if (!val.startsWith('+998') && val.length > 0) {
                if (val.startsWith('998')) val = '+' + val;
                else if (val.startsWith('9') || val.startsWith('8') || val.startsWith('3') || val.startsWith('7') || val.startsWith('5')) {
                    val = '+998' + val;
                }
            }
            e.target.value = val.slice(0, 13);
        });
    }
});

// Promo kodni tekshirish va qo'llash
function handlePromoCode() {
    const input = document.getElementById('promoCodeInput');
    const feedback = document.getElementById('promoFeedback');
    if (!input || !feedback) return;

    const code = input.value.trim().toUpperCase();

    if (!code) {
        feedback.innerHTML = `<span class="text-danger small fw-semibold"><i class="bi bi-exclamation-circle"></i> Iltimos, promo kodni kiriting.</span>`;
        return;
    }

    if (PROMO_CODES[code]) {
        appliedPromo = { code, ...PROMO_CODES[code] };
        feedback.innerHTML = `<span class="text-success small fw-bold"><i class="bi bi-check-circle-fill"></i> ${code}: ${appliedPromo.description}</span>`;
        renderCheckoutSummary();
    } else {
        appliedPromo = null;
        feedback.innerHTML = `<span class="text-danger small fw-semibold"><i class="bi bi-x-circle-fill"></i> Noto'g'ri promo kod! (Masalan: FIRE20)</span>`;
        renderCheckoutSummary();
    }
}

// Buyurtma xulosasi va narxlarni hisoblash
function renderCheckoutSummary() {
    const cart = getCart();
    const listContainer = document.getElementById('checkoutItemsList');
    const emptyAlert = document.getElementById('emptyCheckoutAlert');
    const checkoutContent = document.getElementById('checkoutMainContent');

    if (!listContainer) return;

    if (cart.length === 0) {
        if (emptyAlert) emptyAlert.classList.remove('d-none');
        if (checkoutContent) checkoutContent.classList.add('d-none');
        return;
    }

    if (emptyAlert) emptyAlert.classList.add('d-none');
    if (checkoutContent) checkoutContent.classList.remove('d-none');

    let subtotal = 0;
    listContainer.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        return `
            <div class="d-flex align-items-center justify-content-between py-2 border-bottom">
                <div class="d-flex align-items-center gap-3">
                    <img src="${item.image}" alt="${item.name}" style="width:52px; height:52px; object-fit:cover; border-radius:10px;">
                    <div>
                        <div class="fw-bold text-dark small">${item.name}</div>
                        <div class="text-muted" style="font-size: 0.8rem;">${item.quantity} x ${formatPrice(item.price)}</div>
                    </div>
                </div>
                <div class="fw-bold text-dark small">${formatPrice(itemTotal)}</div>
            </div>
        `;
    }).join('');

    // Yetkazib berish narxi
    const delivery = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;

    // Promo chegirma hisoblash
    let discount = 0;
    if (appliedPromo) {
        if (appliedPromo.type === 'percent') {
            discount = Math.round((subtotal * appliedPromo.value) / 100);
        } else if (appliedPromo.type === 'fixed') {
            discount = Math.min(appliedPromo.value, subtotal);
        }
    }

    const finalTotal = Math.max(0, subtotal + delivery - discount);

    // UI ga yozish
    document.getElementById('summarySubtotal').textContent = formatPrice(subtotal);
    document.getElementById('summaryDelivery').innerHTML = delivery === 0
        ? `<span class="text-success fw-bold">Bepul</span>`
        : formatPrice(delivery);

    const discountRow = document.getElementById('discountRow');
    if (discount > 0) {
        discountRow.classList.remove('d-none');
        document.getElementById('summaryDiscount').textContent = `-${formatPrice(discount)}`;
    } else {
        discountRow.classList.add('d-none');
    }

    document.getElementById('summaryTotal').textContent = formatPrice(finalTotal);
}

// Formani tekshirish (Validatsiya) va buyurtmani tasdiqlash
function handleOrderSubmit(e) {
    e.preventDefault();

    const cart = getCart();
    if (cart.length === 0) {
        alert("Savatchangiz bo'sh!");
        return;
    }

    const fullNameInput = document.getElementById('customerName');
    const phoneInput = document.getElementById('customerPhone');
    const addressInput = document.getElementById('customerAddress');
    const commentInput = document.getElementById('customerComment');
    const paymentRadio = document.querySelector('input[name="paymentMethod"]:checked');

    let isValid = true;

    // 1. Ism va familiya validatsiyasi
    if (!fullNameInput.value.trim() || fullNameInput.value.trim().length < 3) {
        fullNameInput.classList.add('is-invalid');
        isValid = false;
    } else {
        fullNameInput.classList.remove('is-invalid');
        fullNameInput.classList.add('is-valid');
    }

    // 2. O'zbekiston telefon raqami formati validatsiyasi (+998XXXXXXXXX)
    const phoneRegex = /^\+998\d{9}$/;
    const cleanPhone = phoneInput.value.replace(/\s+/g, '');
    if (!phoneRegex.test(cleanPhone)) {
        phoneInput.classList.add('is-invalid');
        isValid = false;
    } else {
        phoneInput.classList.remove('is-invalid');
        phoneInput.classList.add('is-valid');
    }

    // 3. Manzil validatsiyasi
    if (!addressInput.value.trim() || addressInput.value.trim().length < 5) {
        addressInput.classList.add('is-invalid');
        isValid = false;
    } else {
        addressInput.classList.remove('is-invalid');
        addressInput.classList.add('is-valid');
    }

    if (!isValid) {
        return;
    }

    // Buyurtma raqami generatsiya qilish
    const orderNumber = "FB-" + Math.floor(100000 + Math.random() * 900000);
    const totalPaidText = document.getElementById('summaryTotal').textContent;

    // Modal ichidagi ma'lumotlarni to'ldirish
    document.getElementById('modalOrderNumber').textContent = orderNumber;
    document.getElementById('modalCustomerName').textContent = fullNameInput.value.trim();
    document.getElementById('modalCustomerPhone').textContent = cleanPhone;
    document.getElementById('modalCustomerAddress').textContent = addressInput.value.trim();
    document.getElementById('modalPaymentMethod').textContent = paymentRadio ? paymentRadio.value : 'Naqd pul';
    document.getElementById('modalTotalAmount').textContent = totalPaidText;

    // Savatchani tozalash
    clearCart();

    // Success Modal oynasini ochish
    const successModal = new bootstrap.Modal(document.getElementById('orderSuccessModal'));
    successModal.show();
}