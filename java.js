
// كود جافاسكريبت لإضافة التفاعلية والترجمة
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const closeMenu = document.querySelector('.close-menu');
    const nav = document.querySelector('nav');
    const languageToggle = document.getElementById('language-toggle');
    const productItems = document.querySelectorAll('.product-item');
    const backToProducts = document.querySelector('.back-to-products');
    const productDetail = document.getElementById('electrical-detail');
    const body = document.body;
    
    // تحميل تفضيلات اللغة من localStorage
    let isEnglish = localStorage.getItem('language') === 'en';
    
    // تطبيق اللغة المحفوظة عند تحميل الصفحة
    if (isEnglish) {
        body.classList.add('english');
        languageToggle.querySelector('span').textContent = 'AR';
        translatePage('en');
    } else {
        body.classList.remove('english');
        languageToggle.querySelector('span').textContent = 'EN';
        translatePage('ar');
    }
    
    // تبديل القائمة
    menuToggle.addEventListener('click', function() {
        nav.classList.add('active');
        body.style.overflow = 'hidden';
    });
    
    closeMenu.addEventListener('click', function() {
        nav.classList.remove('active');
        body.style.overflow = 'auto';
    });
    
    // إغلاق القائمة عند النقر على رابط
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            body.style.overflow = 'auto';
        });
    });
    
    // تبديل اللغة
    languageToggle.addEventListener('click', function() {
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
    
    // وظيفة الترجمة
    function translatePage(lang) {
        const elements = document.querySelectorAll('.translate');
        
        elements.forEach(element => {
            if (lang === 'en') {
                if (element.dataset.en) {
                    element.textContent = element.dataset.en;
                }
            } else {
                // استعادة النص الأصلي (العربي)
                if (element.dataset.original) {
                    element.textContent = element.dataset.original;
                }
            }
        });
    }
    
    // حفظ النص الأصلي في dataset
    const translateElements = document.querySelectorAll('.translate');
    translateElements.forEach(element => {
        element.dataset.original = element.textContent;
    });
    
    // عرض تفاصيل المنتج
    productItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const product = this.dataset.product;
            
            if (product === 'electrical') {
                productDetail.classList.add('active');
                
                // التمرير إلى قسم المنتج
                productDetail.scrollIntoView({ behavior: 'smooth' });
            }
            // يمكن إضافة منتجات أخرى هنا
        });
    });
    
    // العودة إلى قائمة المنتجات
    if (backToProducts) {
        backToProducts.addEventListener('click', function(e) {
            e.preventDefault();
            productDetail.classList.remove('active');
            
            // التمرير إلى قسم المنتجات
            document.querySelector('.products').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // تأثير التظليل للشريط العلوي عند التمرير
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 70) {
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // التحقق من صحة النماذج
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert(isEnglish ? 'Thank you! Your message has been received and we will contact you soon.' : 'شكراً لك! تم استلام رسالتك وسنتواصل معك قريباً.');
            form.reset();
        });
    });
    
    // تفعيل القائمة المنسدلة على الهواتف
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                this.classList.toggle('active');
            }
        });
    });
    
    // نظام التعليقات والتقييمات
    initTestimonials();
});

// نظام التعليقات والتقييمات
function initTestimonials() {
    const testimonialForm = document.getElementById('testimonial-form');
    const testimonialGrid = document.querySelector('.testimonials-grid');
    const ratingInputs = document.querySelectorAll('.rating-input i');
    
    // تحميل التعليقات من localStorage
    loadTestimonials();
    
    // إضافة تفاعل لتقييم النجوم
    if (ratingInputs.length > 0) {
        ratingInputs.forEach(star => {
            star.addEventListener('click', function() {
                const rating = this.getAttribute('data-rating');
                setRating(rating);
            });
        });
    }
    
    // إرسال نموذج التعليق
    if (testimonialForm) {
        testimonialForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('testimonial-name');
            const commentInput = document.getElementById('testimonial-comment');
            const rating = document.querySelector('.rating-input i.active') ? 
                          document.querySelector('.rating-input i.active').getAttribute('data-rating') : 0;
            
            if (!nameInput.value || !commentInput.value || rating == 0) {
                alert(isEnglish ? 'Please fill all fields and select a rating' : 'يرجى ملء جميع الحقول وتحديد التقييم');
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
            
            alert(isEnglish ? 'Thank you for your feedback!' : 'شكراً لك على تعليقك!');
        });
    }
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
    
    if (testimonials.length === 0) {
        testimonialGrid.innerHTML = '<p class="translate" data-en="No testimonials yet. Be the first to leave a review!">لا توجد تعليقات بعد. كن أول من يترك تعليقاً!</p>';
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
    
    // إنشاء تقييم النجوم
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

// تفعيل أرقام التواصل
function initContactNumbers() {
    const numberItems = document.querySelectorAll('.number-item');
    
    numberItems.forEach(item => {
        // النقر للاتصال/المراسلة
        item.addEventListener('click', function(e) {
            // إذا كان الرابط موجوداً، دع المتصفح يتعامل معه
            if (this.getAttribute('href')) {
                return;
            }
            
            // إذا لم يكن هناك رابط، انسخ الرقم
            e.preventDefault();
            copyPhoneNumber(this);
        });
        
        // تأثيرات hover
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// نسخ رقم الهاتف
function copyPhoneNumber(element) {
    const phoneNumber = element.querySelector('span').textContent;
    
    // إنشاء عنصر إشعار
    const notification = document.createElement('div');
    notification.className = 'copy-notification';
    notification.textContent = isEnglish ? 'Copied!' : 'تم النسخ!';
    
    element.style.position = 'relative';
    element.appendChild(notification);
    
    // نسخ الرقم إلى الحافظة
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

// استدعاء الدالة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // ... الكود الحالي ...
    initContactNumbers(); // أضف هذا السطر
});

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const closeMenu = document.querySelector('.close-menu');
    const nav = document.querySelector('nav');
    const body = document.body;
    
    // فتح القائمة
    menuToggle.addEventListener('click', function() {
        nav.classList.add('active');
        body.style.overflow = 'hidden';
        // منع التمرير خلف القائمة
        document.documentElement.style.overflow = 'hidden';
    });
    
    // إغلاق القائمة عند النقر على زر الإغلاق
    closeMenu.addEventListener('click', function() {
        closeNavigation();
    });
    
    // إغلاق القائمة عند النقر على رابط
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // إذا كان الرابط من القائمة المنسدلة، لا تغلق القائمة الرئيسية
            if (!this.classList.contains('product-item')) {
                closeNavigation();
            }
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
    
    // إغلاق القائمة عند الضغط على زر ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            closeNavigation();
        }
    });
    
    // دالة إغلاق القائمة
    function closeNavigation() {
        nav.classList.remove('active');
        body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';
        
        // إغلاق جميع القوائم المنسدلة الفرعية
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
    
    // تفعيل القوائم المنسدلة على الجوال
    const dropdowns = document.querySelectorAll('.dropdown > a');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const parent = this.parentElement;
                parent.classList.toggle('active');
                
                // إغلاق القوائم المنسدلة الأخرى
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== this) {
                        otherDropdown.parentElement.classList.remove('active');
                    }
                });
            }
        });
    });
    
    // إغلاق القائمة عند تغيير حجم النافذة إلى حجم أكبر
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && nav.classList.contains('active')) {
            closeNavigation();
        }
    });
});


