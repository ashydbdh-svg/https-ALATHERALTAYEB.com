// كود جافاسكريبت لإضافة التفاعلية والترجمة
document.addEventListener('DOMContentLoaded', function() {
    console.log('تم تحميل الصفحة - بدء التهيئة');
    
    // تعريف المتغيرات الأساسية
    const menuToggle = document.querySelector('.menu-toggle');
    const closeMenu = document.querySelector('.close-menu');
    const nav = document.querySelector('nav');
    const languageToggle = document.getElementById('language-toggle');
    const body = document.body;

    // ========== الترجمة ==========
    // حفظ النص الأصلي في dataset
    const translateElements = document.querySelectorAll('.translate');
    translateElements.forEach(element => {
        element.dataset.original = element.textContent;
    });

    // تحميل تفضيلات اللغة من localStorage
    let isEnglish = localStorage.getItem('language') === 'en';
    
    // تطبيق اللغة المحفوظة عند تحميل الصفحة
    if (isEnglish) {
        body.classList.add('english');
        if (languageToggle) {
            languageToggle.querySelector('span').textContent = 'AR';
        }
        translatePage('en');
    }

    // وظيفة الترجمة
    function translatePage(lang) {
        console.log('ترجمة الصفحة إلى:', lang);
        const elements = document.querySelectorAll('.translate');
        
        elements.forEach(element => {
            if (lang === 'en') {
                if (element.dataset.en) {
                    element.textContent = element.dataset.en;
                }
            } else {
                if (element.dataset.original) {
                    element.textContent = element.dataset.original;
                }
            }
        });
    }

    // ========== القائمة المتنقلة ==========
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            console.log('فتح القائمة');
            e.stopPropagation();
            nav.classList.add('active');
            body.style.overflow = 'hidden';
        });
    }

    if (closeMenu) {
        closeMenu.addEventListener('click', function(e) {
            console.log('إغلاق القائمة');
            e.stopPropagation();
            closeNavigation();
        });
    }

    // إغلاق القائمة عند النقر على الروابط (باستثناء القوائم المنسدلة)
    const navLinks = document.querySelectorAll('nav ul li a:not(.dropdown > a)');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            console.log('نقر على رابط قائمة:', this.href);
            // السماح للرابط بالعمل بشكل طبيعي
            // إغلاق القائمة بعد تأخير بسيط
            setTimeout(() => {
                closeNavigation();
            }, 300);
        });
    });

    // إغلاق القائمة عند النقر خارجها
    document.addEventListener('click', function(e) {
        if (nav.classList.contains('active') && 
            !nav.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            closeNavigation();
        }
    });

    // إغلاق القائمة بزر ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            closeNavigation();
        }
    });

    function closeNavigation() {
        nav.classList.remove('active');
        body.style.overflow = 'auto';
        // إغلاق القوائم المنسدلة الفرعية
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }

    // ========== القوائم المنسدلة للجوال ==========
    const dropdowns = document.querySelectorAll('.dropdown > a');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                e.stopPropagation();
                const parent = this.parentElement;
                const isActive = parent.classList.contains('active');
                
                // إغلاق جميع القوائم المنسدلة الأخرى
                dropdowns.forEach(otherDropdown => {
                    otherDropdown.parentElement.classList.remove('active');
                });
                
                // تبديل الحالة الحالية
                if (!isActive) {
                    parent.classList.add('active');
                }
            }
        });
    });

    // ========== تبديل اللغة ==========
    if (languageToggle) {
        languageToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('تبديل اللغة');
            
            isEnglish = !isEnglish;
            
            if (isEnglish) {
                body.classList.add('english');
                languageToggle.querySelector('span').textContent = 'AR';
                translatePage('en');
                localStorage.setItem('language', 'en');
            } else {
                body.classList.remove('english');
                languageToggle.querySelector('span').textContent = 'EN';
                translatePage('ar');
                localStorage.setItem('language', 'ar');
            }
        });
    }

    // ========== المنتجات ==========
    const productItems = document.querySelectorAll('.product-item');
    const productDetail = document.getElementById('electrical-detail');
    
    productItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const product = this.dataset.product;
            console.log('نقر على منتج:', product);
            
            if (product === 'electrical' && productDetail) {
                productDetail.classList.add('active');
                productDetail.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    const backToProducts = document.querySelector('.back-to-products');
    if (backToProducts) {
        backToProducts.addEventListener('click', function(e) {
            e.preventDefault();
            if (productDetail) {
                productDetail.classList.remove('active');
                document.querySelector('.products').scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // ========== تأثير التمرير على الهيدر ==========
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 70) {
                header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
            }
        });
    }

    // ========== النماذج ==========
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const message = isEnglish ? 
                'Thank you! Your message has been received and we will contact you soon.' : 
                'شكراً لك! تم استلام رسالتك وسنتواصل معك قريباً.';
            alert(message);
            form.reset();
        });
    });

    // ========== تهيئة المكونات الإضافية ==========
    initTestimonials();
    initContactNumbers();
    
    console.log('تم الانتهاء من التهيئة');
});

// ========== نظام التعليقات ==========
function initTestimonials() {
    const testimonialForm = document.getElementById('testimonial-form');
    const testimonialGrid = document.querySelector('.testimonials-grid');
    
    if (!testimonialForm || !testimonialGrid) return;

    const ratingInputs = document.querySelectorAll('.rating-input i');
    
    // تحميل التعليقات
    loadTestimonials();
    
    // النجوم التفاعلية
    ratingInputs.forEach(star => {
        star.addEventListener('click', function() {
            const rating = this.getAttribute('data-rating');
            setRating(rating);
        });
    });
    
    // إرسال التعليق
    testimonialForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nameInput = document.getElementById('testimonial-name');
        const commentInput = document.getElementById('testimonial-comment');
        const rating = document.querySelector('.rating-input i.active') ? 
                      document.querySelector('.rating-input i.active').getAttribute('data-rating') : 0;
        
        const isEnglish = localStorage.getItem('language') === 'en';
        
        if (!nameInput.value || !commentInput.value || rating == 0) {
            alert(isEnglish ? 
                'Please fill all fields and select a rating' : 
                'يرجى ملء جميع الحقول وتحديد التقييم');
            return;
        }
        
        const testimonial = {
            id: Date.now(),
            name: nameInput.value,
            comment: commentInput.value,
            rating: rating,
            date: new Date().toLocaleDateString()
        };
        
        saveTestimonial(testimonial);
        addTestimonialToDOM(testimonial);
        
        nameInput.value = '';
        commentInput.value = '';
        resetRating();
        
        alert(isEnglish ? 
            'Thank you for your feedback!' : 
            'شكراً لك على تعليقك!');
    });
}

function setRating(rating) {
    const stars = document.querySelectorAll('.rating-input i');
    stars.forEach(star => {
        const starRating = star.getAttribute('data-rating');
        if (starRating <= rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

function resetRating() {
    const stars = document.querySelectorAll('.rating-input i');
    stars.forEach(star => {
        star.classList.remove('active');
    });
}

function saveTestimonial(testimonial) {
    let testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
    testimonials.push(testimonial);
    localStorage.setItem('testimonials', JSON.stringify(testimonials));
}

function loadTestimonials() {
    const testimonialGrid = document.querySelector('.testimonials-grid');
    if (!testimonialGrid) return;
    
    testimonialGrid.innerHTML = '';
    
    let testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
    const isEnglish = localStorage.getItem('language') === 'en';
    
    if (testimonials.length === 0) {
        testimonialGrid.innerHTML = isEnglish ? 
            '<p>No testimonials yet. Be the first to leave a review!</p>' : 
            '<p>لا توجد تعليقات بعد. كن أول من يترك تعليقاً!</p>';
        return;
    }
    
    testimonials.forEach(testimonial => {
        addTestimonialToDOM(testimonial);
    });
}

function addTestimonialToDOM(testimonial) {
    const testimonialGrid = document.querySelector('.testimonials-grid');
    if (!testimonialGrid) return;
    
    const testimonialCard = document.createElement('div');
    testimonialCard.className = 'testimonial-card';
    
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
        starsHtml += `<i class="fas fa-star${i <= testimonial.rating ? ' active' : ''}"></i>`;
    }
    
    testimonialCard.innerHTML = `
        <div class="testimonial-header">
            <div class="testimonial-avatar">${testimonial.name.charAt(0)}</div>
            <div>
                <div class="testimonial-name">${testimonial.name}</div>
                <div class="testimonial-date">${testimonial.date}</div>
            </div>
        </div>
        <div class="testimonial-rating">${starsHtml}</div>
        <div class="testimonial-text">${testimonial.comment}</div>
    `;
    
    testimonialGrid.appendChild(testimonialCard);
}

// ========== أرقام التواصل ==========
function initContactNumbers() {
    const numberItems = document.querySelectorAll('.number-item');
    
    numberItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // إذا كان هناك رابط، دع المتصفح يتعامل معه
            if (this.getAttribute('href')) {
                return;
            }
            
            // إذا لم يكن هناك رابط، انسخ الرقم
            e.preventDefault();
            copyPhoneNumber(this);
        });
        
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

function copyPhoneNumber(element) {
    const phoneNumber = element.querySelector('span').textContent;
    const isEnglish = localStorage.getItem('language') === 'en';
    
    const notification = document.createElement('div');
    notification.className = 'copy-notification';
    notification.textContent = isEnglish ? 'Copied!' : 'تم النسخ!';
    
    element.style.position = 'relative';
    element.appendChild(notification);
    
    navigator.clipboard.writeText(phoneNumber).then(() => {
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (element.contains(notification)) {
                    element.removeChild(notification);
                }
            }, 300);
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
        notification.textContent = isEnglish ? 'Copy failed!' : 'فشل النسخ!';
        notification.classList.add('show');
    });
}