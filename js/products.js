/* ==========================================================================
   FIREBURG - PRODUCTS DATABASE & PROMO CODES
   8 Categories: Burgerlar, Lavashlar, Hot-doglar, Pitsa, Fri va gazaklar,
                 Ichimliklar, Desertlar, Combo va setlar
   ========================================================================== */

const CATEGORIES = [
    { id: 'all', name: 'Barchasi', icon: 'bi-grid-fill' },
    { id: 'burgerlar', name: 'Burgerlar', icon: 'bi-fire' },
    { id: 'lavashlar', name: 'Lavashlar', icon: 'bi-layers-fill' },
    { id: 'hotdoglar', name: 'Hot-doglar', icon: 'bi-lightning-charge-fill' },
    { id: 'pitsa', name: 'Pitsa', icon: 'bi-pie-chart-fill' },
    { id: 'fri', name: 'Fri va gazaklar', icon: 'bi-box2-heart-fill' },
    { id: 'ichimliklar', name: 'Ichimliklar', icon: 'bi-cup-straw' },
    { id: 'desertlar', name: 'Desertlar', icon: 'bi-cake2-fill' },
    { id: 'combo', name: 'Combo va setlar', icon: 'bi-stars' }
];

const PRODUCTS = [
    // 1. BURGERLAR
    {
        id: 1,
        name: "Fireburg Double Smash",
        category: "burgerlar",
        categoryName: "Burgerlar",
        price: 46000,
        rating: 4.9,
        badge: "Xit savdo",
        featured: true,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80",
        description: "Ikki qavatli shirali mol go'shti kotleti, eritilgan Cheddar pishlog'i, tuzlangan bodring va maxsus olovli sous."
    },
    {
        id: 2,
        name: "BBQ Bacon Beef Burger",
        category: "burgerlar",
        categoryName: "Burgerlar",
        price: 42000,
        rating: 4.8,
        badge: "Yangi",
        featured: false,
        image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=700&q=80",
        description: "Ko'mirda pishirilgan mol go'shti, qarsildoq piyoz halqalari, dudlangan kurka go'shti va tutunli BBQ sousi."
    },
    {
        id: 3,
        name: "Crispy Chicken Royal",
        category: "burgerlar",
        categoryName: "Burgerlar",
        price: 35000,
        rating: 4.7,
        badge: "",
        featured: false,
        image: "https://images.unsplash.com/photo-1615297928064-24977384d0da?auto=format&fit=crop&w=700&q=80",
        description: "Maxsus ziravorlarda qovurilgan qarsildoq tovuq filesi, aysberg salati, pomidor va sarimsoqli qaymoq sousi."
    },

    // 2. LAVASHLAR
    {
        id: 4,
        name: "Tandir Mol Go'shtli Lavash",
        category: "lavashlar",
        categoryName: "Lavashlar",
        price: 36000,
        rating: 4.9,
        badge: "Top",
        featured: true,
        image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=700&q=80",
        description: "Yupqa qarsildoq xamir ichida barra mol go'shti bo'laklari, yangi bodring, pomidor, chips va firmenniy sous."
    },
    {
        id: 5,
        name: "Pishloqli Tovuq Lavash",
        category: "lavashlar",
        categoryName: "Lavashlar",
        price: 33000,
        rating: 4.8,
        badge: "",
        featured: false,
        image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=700&q=80",
        description: "Grilda pishgan mayin tovuq go'shti, ikki hissa Mozzarella pishlog'i va maxsus qaymoqli sous."
    },

    // 3. HOT-DOGLAR
    {
        id: 6,
        name: "King Chili Hot-Dog",
        category: "hotdoglar",
        categoryName: "Hot-doglar",
        price: 26000,
        rating: 4.8,
        badge: "Achchiq",
        featured: true,
        image: "https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=700&q=80",
        description: "Yumshoq bulochka, dudlangan Kanada sosiskasi, halapenyo qalampiri, xantal va pishloqli sous."
    },
    {
        id: 7,
        name: "Classic New York Hot-Dog",
        category: "hotdoglar",
        categoryName: "Hot-doglar",
        price: 22000,
        rating: 4.6,
        badge: "",
        featured: false,
        image: "https://images.unsplash.com/photo-1541214113241-21578d2d9b62?auto=format&fit=crop&w=700&q=80",
        description: "Klassik sersuv sosiska, karamellangan piyoz, tuzlangan bodring bo'laklari, ketchup va mayonez."
    },

    // 4. PITSA
    {
        id: 8,
        name: "Pepperoni Inferno (33 sm)",
        category: "pitsa",
        categoryName: "Pitsa",
        price: 78000,
        rating: 4.9,
        badge: "Xit savdo",
        featured: true,
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=700&q=80",
        description: "Italiya retsepti bo'yicha xamir, cho'ziluvchan Mozzarella pishlog'i, halol dudlangan kolbasa va tomat sousi."
    },
    {
        id: 9,
        name: "Kombo Go'shtli Pitsa (33 sm)",
        category: "pitsa",
        categoryName: "Pitsa",
        price: 85000,
        rating: 4.8,
        badge: "",
        featured: false,
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=80",
        description: "Mol go'shti qiymasi, tovuq filesi, qo'ziqorin, zaytun, bulg'or qalampiri va ko'p miqdorda pishloq."
    },

    // 5. FRI VA GAZAKLAR
    {
        id: 10,
        name: "Kartoshka Fri (Katta)",
        category: "fri",
        categoryName: "Fri va gazaklar",
        price: 18000,
        rating: 4.7,
        badge: "",
        featured: true,
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=700&q=80",
        description: "Oltin rangda qovurilgan, tashqarisi qarsildoq, ichi yumshoq dengiz tuzi sepilgan kartoshka fri."
    },
    {
        id: 11,
        name: "Tovuqli Naggetslar (9 dona)",
        category: "fri",
        categoryName: "Fri va gazaklar",
        price: 25000,
        rating: 4.8,
        badge: "Mashhur",
        featured: false,
        image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=700&q=80",
        description: "100% tabiiy tovuq ko'krak go'shtidan tayyorlangan qarsildoq naggetslar va maxsus pishloqli sous."
    },

    // 6. ICHIMLIKLAR
    {
        id: 12,
        name: "Coca-Cola (0.5 L)",
        category: "ichimliklar",
        categoryName: "Ichimliklar",
        price: 10000,
        rating: 4.9,
        badge: "Muzdek",
        featured: false,
        image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=700&q=80",
        description: "Fast food taomlari bilan ajoyib uyg'unlashuvchi muzdek tetiklantiruvchi gazlangan ichimlik."
    },
    {
        id: 13,
        name: "Rezavorli Moxito Limonad",
        category: "ichimliklar",
        categoryName: "Ichimliklar",
        price: 16000,
        rating: 4.9,
        badge: "Yangi",
        featured: true,
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=700&q=80",
        description: "Yangi yalpiz barglari, laym sharbati, qulupnay siropi va muz bo'laklari bilan tayyorlangan limonad."
    },

    // 7. DESERTLAR
    {
        id: 14,
        name: "Shokoladli Chizkeyk",
        category: "desertlar",
        categoryName: "Desertlar",
        price: 24000,
        rating: 4.9,
        badge: "Shirin",
        featured: false,
        image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=700&q=80",
        description: "Belgiya shokoladi va mayin tvorogli pishloqdan tayyorlangan klassik shokoladli chizkeyk."
    },
    {
        id: 15,
        name: "Qulupnayli Ponchik (Donut)",
        category: "desertlar",
        categoryName: "Desertlar",
        price: 14000,
        rating: 4.7,
        badge: "",
        featured: false,
        image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=700&q=80",
        description: "Qulupnayli glazur va rang-barang shirin bezaklar bilan qoplangan yumshoq ponchik."
    },

    // 8. COMBO VA SETLAR
    {
        id: 16,
        name: "Fireburg Mega Combo",
        category: "combo",
        categoryName: "Combo va setlar",
        price: 68000,
        rating: 5.0,
        badge: "-20% Tejamkor",
        featured: true,
        image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=700&q=80",
        description: "Fireburg Double Smash burgeri + Katta Kartoshka Fri + Coca-Cola 0.5L + 2 xil firmenniy sous."
    },
    {
        id: 17,
        name: "Do'stlar Seti (4 kishilik)",
        category: "combo",
        categoryName: "Combo va setlar",
        price: 155000,
        rating: 4.9,
        badge: "Super Set",
        featured: true,
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=700&q=80",
        description: "2 ta Double Burger, 2 ta Tandir Lavash, 2 ta katta Fri, 9 ta Naggets va 1.5L Coca-Cola."
    }
];

// Yaroqli promo-kodlar ro'yxati
const PROMO_CODES = {
    "FIRE20": {
        type: "percent",
        value: 20,
        description: "20% chegirma qo'llanildi!"
    },
    "BURGER15": {
        type: "percent",
        value: 15,
        description: "15% maxsus chegirma qo'llanildi!"
    },
    "YANGI25": {
        type: "fixed",
        value: 25000,
        description: "25 000 so'm chegirma qo'llanildi!"
    }
};

// Narxni chiroyli formatlash funksiyasi (masalan: 46 000 so'm)
function formatPrice(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " so'm";
}