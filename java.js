// كود مبسط للتأكد من عمل الأساسيات
document.addEventListener('DOMContentLoaded', function() {
    console.log('بدء التحميل...');
    
    // القائمة المتنقلة
    const menuToggle = document.querySelector('.menu-toggle');
    const closeMenu = document.querySelector('.close-menu');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            console.log('فتح القائمة');
            nav.classList.add('active');
        });
    }
    
    if (closeMenu) {
        closeMenu.addEventListener('click', function() {
            console.log('إغلاق القائمة');
            nav.classList.remove('active');
        });
    }
    
    // تبديل اللغة
    const languageToggle = document.getElementById('language-toggle');
    if (languageToggle) {
        languageToggle.addEventListener('click', function() {
            console.log('تبديل اللغة');
            const body = document.body;
            const isEnglish = body.classList.contains('english');
            
            if (isEnglish) {
                body.classList.remove('english');
                this.querySelector('span').textContent = 'EN';
            } else {
                body.classList.add('english');
                this.querySelector('span').textContent = 'AR';
            }
        });
    }
    
    console.log('تم التحميل بنجاح');
});