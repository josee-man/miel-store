// Données des produits de miel
// Configuration globale: numéro WhatsApp utilisé par tous les boutons
const WHATSAPP_NUMBER = '212695602327';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
const honeyProducts = [
    {
        id: 1,
        name: { fr: "Miel de Thym", ar: "عسل الزعتر" },
        price: "120 DH",
        description: {
            fr: "Un miel aromatique aux notes florales et herbacées.",
            ar: "عسل عطري بنكهات زهرية وعشبية."
        },
        origin: { fr: "Montagnes de l'Atlas, Maroc", ar: "جبال الأطلس، المغرب" },
        properties: {
            fr: "Antiseptique, apaisant pour la gorge, renforce le système immunitaire",
            ar: "مطهر، يهدئ الحلق، يقوي المناعة"
        }
    },
    {
        id: 2,
        name: { fr: "Miel d'Eucalyptus", ar: "عسل الكاليبتوس" },
        price: "140 DH",
        description: {
            fr: "Un miel riche aux notes boisées et mentholées.",
            ar: "عسل غني بنكهات خشبية ونعناعية."
        },
        origin: { fr: "Forêts d'eucalyptus du Maroc", ar: "غابات الكاليبتوس بالمغرب" },
        properties: {
            fr: "Propriétés expectorantes, soulage les voies respiratoires",
            ar: "يساعد على إخراج البلغم، يخفف مشاكل الجهاز التنفسي"
        }
    },
    {
        id: 3,
        name: { fr: "Miel de Lavande", ar: "عسل الخزامى" },
        price: "150 DH",
        description: {
            fr: "Un miel délicat aux arômes floraux et légèrement épicés.",
            ar: "عسل رقيق بنكهات زهرية وتوابل خفيفة."
        },
        origin: { fr: "Champs de lavande du Haut Atlas", ar: "حقول الخزامى في الأطلس العالي" },
        properties: {
            fr: "Relaxant, favorise le sommeil, propriétés calmantes",
            ar: "مهدئ، يساعد على النوم، خصائص مريحة"
        }
    },
    {
        id: 4,
        name: { fr: "Miel d'Oranger", ar: "عسل البرتقال" },
        price: "160 DH",
        description: {
            fr: "Un miel doux aux notes d'agrumes et de fleurs d'oranger.",
            ar: "عسل حلو بنكهات الحمضيات وزهر البرتقال."
        },
        origin: { fr: "Vergers d'orangers du Souss", ar: "بساتين البرتقال في سوس" },
        properties: {
            fr: "Apaisant, favorise la digestion, riche en antioxydants",
            ar: "مريح، يساعد على الهضم، غني بمضادات الأكسدة"
        }
    },
    {
        id: 5,
        name: { fr: "Miel de Montagne", ar: "عسل الجبل" },
        price: "130 DH",
        description: {
            fr: "Un miel polyfloral récolté dans les hauteurs de l'Atlas.",
            ar: "عسل متعدد الأزهار تم حصاده في مرتفعات الأطلس."
        },
        origin: { fr: "Hautes montagnes de l'Atlas", ar: "مرتفعات جبال الأطلس" },
        properties: {
            fr: "Fortifiant, énergisant, riche en minéraux",
            ar: "منشّط، يمنح الطاقة، غني بالمعادن"
        }
    },
    {
        id: 6,
        name: { fr: "Miel d'Acacia", ar: "عسل السنط" },
        price: "170 DH",
        description: {
            fr: "Un miel clair et délicat aux notes vanillées.",
            ar: "عسل فاتح ورقيق بنكهات الفانيليا."
        },
        origin: { fr: "Forêts d'acacias du Maroc", ar: "غابات السنط بالمغرب" },
        properties: {
            fr: "Facile à digérer, prébiotic naturel, faible index glycémique",
            ar: "سهل الهضم، بريبيوتيك طبيعي، مؤشر سكري منخفض"
        }
    },
    {
        id: 7,
        name: { fr: "Miel de Romarin", ar: "عسل إكليل الجبل" },
        price: "145 DH",
        description: {
            fr: "Un miel aux arômes herbacés et légèrement boisés.",
            ar: "عسل بنكهات عشبية وخشبية خفيفة."
        },
        origin: { fr: "Plateaux du Moyen Atlas", ar: "هضاب الأطلس المتوسط" },
        properties: {
            fr: "Stimule la circulation, tonifiant hépatique, antioxydant",
            ar: "ينشط الدورة الدموية، منشّط للكبد، مضاد للأكسدة"
        }
    },
    {
        id: 8,
        name: { fr: "Miel de Tilleul", ar: "عسل الزيزفون" },
        price: "155 DH",
        description: {
            fr: "Un miel aux notes fraîches et mentholées.",
            ar: "عسل بنكهات منعشة ونعناعية."
        },
        origin: { fr: "Forêts de tilleuls du Rif", ar: "غابات الزيزفون في الريف" },
        properties: {
            fr: "Calmant, favorise la relaxation, soulage les maux de tête",
            ar: "مهدئ، يساعد على الاسترخاء، يخفف الصداع"
        }
    },
    {
        id: 9,
        name: { fr: "Miel de Châtaignier", ar: "عسل الكستناء" },
        price: "165 DH",
        description: {
            fr: "Un miel corsé aux notes boisées et légèrement amères.",
            ar: "عسل قوي بنكهات خشبية ومرارة خفيفة."
        },
        origin: { fr: "Forêts de châtaigniers du Maroc", ar: "غابات الكستناء في المغرب" },
        properties: {
            fr: "Riche en minéraux, stimule la circulation sanguine, fortifiant",
            ar: "غني بالمعادن، ينشط الدورة الدموية، مقوٍ"
        }
    }
];

// Fonction pour ouvrir la modal avec les détails du miel (via API avec repli local)
async function openHoneyModal(honeyId) {
    let honey = null;
    try {
        const resp = await fetch(`/api/products/${honeyId}`);
        if (resp.ok) {
            honey = await resp.json();
        }
    } catch (e) {
        // Ignore network errors, fallback to local data
    }
    if (!honey) {
        honey = honeyProducts.find(product => product.id === honeyId);
    }
    if (!honey) return;
    const currentLang = (typeof localStorage !== 'undefined' && localStorage.getItem('lang'))
        || (document.getElementById('lang-toggle')?.getAttribute('data-current'))
        || 'fr';
    
    // Remplir la modal avec les détails du miel
    document.getElementById('modal-name').textContent = honey.name[currentLang];
    document.getElementById('modal-price').textContent = honey.price;
    document.getElementById('modal-description').textContent = honey.description[currentLang];
    document.getElementById('modal-origin').textContent = honey.origin[currentLang];
    document.getElementById('modal-properties').textContent = honey.properties[currentLang];
    document.getElementById('modal-image').src = honey.image || "images/honey-pot.jpg";
    document.getElementById('modal-image').alt = honey.name[currentLang];
    
    // Afficher la modal
    const modal = document.getElementById('honey-modal');
    modal.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Language switch functionality with persistence
    const langToggle = document.getElementById('lang-toggle');
    const langElements = document.querySelectorAll('[data-fr][data-ar]');

    // Helper: apply language to DOM
    const applyLanguage = (lang) => {
        if (langToggle) {
            langToggle.setAttribute('data-current', lang);
        }
        document.documentElement.setAttribute('lang', lang);
        document.body.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

        // Update all translatable elements' text
        langElements.forEach(element => {
            const value = element.getAttribute(`data-${lang}`);
            if (value !== null) {
                element.textContent = value;
            }
        });

        // Update WhatsApp links for product ordering
        const whatsappBtns = document.querySelectorAll('.whatsapp-btn');
        whatsappBtns.forEach(btn => {
            const productName = btn.closest('.product-info')?.querySelector('h3')?.textContent || (lang === 'fr' ? 'produit' : 'منتج');

            const messageText = lang === 'fr'
                ? `Bonjour je souhaite commander le produit ${productName}`
                : `مرحبا أود طلب المنتج ${productName}`;

            btn.setAttribute('href', `${WHATSAPP_URL}?text=${encodeURIComponent(messageText)}`);
        });
    };

    // Apply saved language on load
    const savedLang = (typeof localStorage !== 'undefined' && localStorage.getItem('lang'))
        || (langToggle ? langToggle.getAttribute('data-current') : 'fr')
        || 'fr';
    applyLanguage(savedLang);

    // Toggle handler: switch and persist
    if (langToggle) {
        langToggle.addEventListener('click', function() {
            const currentLang = langToggle.getAttribute('data-current');
            const newLang = currentLang === 'fr' ? 'ar' : 'fr';
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem('lang', newLang);
            }
            applyLanguage(newLang);
        });
    }

    // Footer language links
    const footerLangLinks = document.querySelectorAll('.footer-languages .lang-link');
    footerLangLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetLang = this.getAttribute('data-lang') || 'fr';
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem('lang', targetLang);
            }
            applyLanguage(targetLang);
        });
    });

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Get current language
            const currentLang = langToggle.getAttribute('data-current');
            
            // Create WhatsApp message
            const whatsappMessage = currentLang === 'fr'
                ? `Nom: ${name}%0AEmail: ${email}%0AMessage: ${message}`
                : `الاسم: ${name}%0Aالبريد الإلكتروني: ${email}%0Aالرسالة: ${message}`;
            
            // Open WhatsApp with the form data using global number
            window.open(`${WHATSAPP_URL}?text=${whatsappMessage}`, '_blank');
            
            // Reset form
            contactForm.reset();
        });
    }

    // Dynamic products rendering
    async function loadProducts() {
        const grid = document.getElementById('products-grid');
        if (!grid) return; // Not on produits page
        let list = [];
        try {
            const resp = await fetch('/api/products');
            if (resp.ok) list = await resp.json();
        } catch (e) {
            list = honeyProducts; // fallback to local
        }
        grid.innerHTML = '';
        const currentLang = (typeof localStorage !== 'undefined' && localStorage.getItem('lang')) || (document.getElementById('lang-toggle')?.getAttribute('data-current')) || 'fr';
        list.forEach(p => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.onclick = () => openHoneyModal(p.id);
            card.innerHTML = `
                <div class="product-image">
                    <img src="${p.image || 'images/honey-pot.jpg'}" alt="${p.name[currentLang]}">
                </div>
                <div class="product-info">
                    <h3 data-fr="${p.name.fr}" data-ar="${p.name.ar}">${p.name[currentLang]}</h3>
                    <p class="description" data-fr="${p.description.fr}" data-ar="${p.description.ar}">${p.description[currentLang]}</p>
                    <p class="price">${p.price}</p>
                    <a href="${WHATSAPP_URL}" class="btn whatsapp-btn" data-fr="Commander via WhatsApp" data-ar="اطلب عبر واتساب" onclick="event.stopPropagation()">
                        <i class="fab fa-whatsapp"></i> Commander via WhatsApp
                    </a>
                </div>`;
            grid.appendChild(card);
        });
        // Re-apply language to update texts and WhatsApp links
        const lang = (typeof localStorage !== 'undefined' && localStorage.getItem('lang')) || 'fr';
        const langToggle = document.getElementById('lang-toggle');
        if (langToggle) langToggle.setAttribute('data-current', lang);
        const langElements = document.querySelectorAll('[data-fr][data-ar]');
        langElements.forEach(element => {
            const value = element.getAttribute(`data-${lang}`);
            if (value !== null) {
                element.textContent = value;
            }
        });
        const whatsappBtns = document.querySelectorAll('.whatsapp-btn');
        whatsappBtns.forEach(btn => {
            const productName = btn.closest('.product-info')?.querySelector('h3')?.textContent || (lang === 'fr' ? 'produit' : 'منتج');
            const messageText = lang === 'fr'
                ? `Bonjour je souhaite commander le produit ${productName}`
                : `مرحبا أود طلب المنتج ${productName}`;
            btn.setAttribute('href', `${WHATSAPP_URL}?text=${encodeURIComponent(messageText)}`);
        });
    }

    loadProducts();
});
