
// حالة المستخدم الحالي
let currentUser = null;
let isManager = false;

// تحميل البيانات وعرضها
function loadData() {
    const data = initializeData();
    
    // تحميل الأخبار في الصفحة الرئيسية
    const homeNewsContainer = document.getElementById('homeNewsContainer');
    if (homeNewsContainer) {
        homeNewsContainer.innerHTML = '';
        data.news.slice(0, 3).forEach(newsItem => {
            homeNewsContainer.innerHTML += `
                <div class="card">
                    <div class="card-content">
                        <h3>${newsItem.title}</h3>
                        <p><strong>التاريخ:</strong> ${newsItem.date}</p>
                        <p>${newsItem.content}</p>
                        <a href="news.html" class="btn" style="margin-top: 15px;">قراءة المزيد</a>
                    </div>
                </div>
            `;
        });
    }
    
    // تحميل الأعضاء
    const membersTable = document.querySelector('#membersTable tbody');
    if (membersTable) {
        membersTable.innerHTML = '';
        data.members.forEach(member => {
            membersTable.innerHTML += `
                <tr>
                    <td>${member.name}</td>
                    <td>${member.number}</td>
                    <td>${member.type}</td>
                    <td>${member.joinDate}</td>
                    <td>${member.status}</td>
                </tr>
            `;
        });
    }
    
    // تحميل المدراء
    const managersContainer = document.getElementById('managersContainer');
    if (managersContainer) {
        managersContainer.innerHTML = '';
        data.managers.forEach(manager => {
            managersContainer.innerHTML += `
                <div class="card">
                    <div class="card-content">
                        <h3>${manager.name}</h3>
                        <p><strong>المنصب:</strong> ${manager.position}</p>
                        <p><strong>البريد الإلكتروني:</strong> ${manager.email}</p>
                        <p><strong> الهاتف:</strong> ${manager.phone}</p>
                    </div>
                </div>
            `;
        });
    }
    
    // تحميل الأخبار
    const newsContainer = document.getElementById('newsContainer');
    if (newsContainer) {
        newsContainer.innerHTML = '';
        data.news.forEach(newsItem => {
            newsContainer.innerHTML += `
                <div class="card">
                    <div class="card-content">
                        <h3>${newsItem.title}</h3>
                        <p><strong>التاريخ:</strong> ${newsItem.date}</p>
                        <p>${newsItem.content}</p>
                    </div>
                </div>
            `;
        });
    }
    
    // تحميل التصويتات
    const votesTable = document.querySelector('#votesTable tbody');
    if (votesTable) {
        votesTable.innerHTML = '';
        data.votes.forEach(vote => {
            votesTable.innerHTML += `
                <tr>
                    <td>${vote.decision}</td>
                    <td>${vote.date}</td>
                    <td>${vote.voters}</td>
                    <td>${vote.percentage}%</td>
                    <td>${vote.status}</td>
                </tr>
            `;
        });
    }
    
    // تحميل التعليقات
    const commentsContainer = document.getElementById('commentsContainer');
    if (commentsContainer) {
        commentsContainer.innerHTML = '';
        data.comments.forEach(comment => {
            commentsContainer.innerHTML += `
                <div style="padding: 15px; border-bottom: 1px solid #eee;">
                    <h4>${comment.author}</h4>
                    <p>${comment.content}</p>
                    <small>${comment.date}</small>
                </div>
            `;
        });
    }
    
    // تحميل التقارير المالية
    const financialReportsTable = document.querySelector('#financialReportsTable tbody');
    if (financialReportsTable) {
        financialReportsTable.innerHTML = '';
        data.financialReports.forEach(report => {
            financialReportsTable.innerHTML += `
                <tr>
                    <td>${report.period}</td>
                    <td>${report.revenue.toLocaleString()} ريال</td>
                    <td>${report.expenses.toLocaleString()} ريال</td>
                    <td>${report.profit.toLocaleString()} ريال</td>
                    <td><a href="#">تحميل</a></td>
                </tr>
            `;
        });
    }
    
    // تحديث حالة التصويت
    updateVotingStatus(data.settings.votingEnabled);
}

// تحديث حالة التصويت
function updateVotingStatus(votingEnabled) {
    const voteSection = document.getElementById('voteSection');
    const voteNotification = document.getElementById('voteNotification');
    const toggleVotingBtn = document.getElementById('toggleVotingBtn');
    
    if (voteSection && voteNotification && toggleVotingBtn) {
        if (votingEnabled) {
            voteSection.style.display = 'block';
            voteNotification.style.display = 'none';
            toggleVotingBtn.textContent = 'إلغاء التصويت';
        } else {
            voteSection.style.display = 'none';
            voteNotification.style.display = 'block';
            toggleVotingBtn.textContent = 'تفعيل التصويت';
        }
    }
}

// تبديل حالة التصويت
function toggleVoting() {
    const data = initializeData();
    data.settings.votingEnabled = !data.settings.votingEnabled;
    saveData(data);
    updateVotingStatus(data.settings.votingEnabled);
}

// إضافة مدير جديد
function addNewManager() {
    const name = document.getElementById('newManagerName').value;
    const position = document.getElementById('newManagerPosition').value;
    const email = document.getElementById('newManagerEmail').value;
    const phone = document.getElementById('newManagerPhone').value;
    
    if (!name || !position || !email || !phone) {
        alert('يرجى ملء جميع الحقول');
        return;
    }
    
    const data = initializeData();
    const newManager = {
        id: data.managers.length + 1,
        name: name,
        position: position,
        email: email,
        phone: phone,
        username: `manager${data.managers.length + 1}`,
        password: 'password123'
    };
    
    data.managers.push(newManager);
    saveData(data);
    loadData();
    
    document.getElementById('addManagerForm').reset();
    alert('تم إضافة المدير بنجاح!');
}

// إضافة خبر جديد
function addNews() {
    const title = document.getElementById('newsTitle').value;
    const content = document.getElementById('newsContent').value;
    
    if (!title || !content) {
        alert('يرجى ملء جميع الحقول');
        return;
    }
    
    const data = initializeData();
    const newNews = {
        id: data.news.length + 1,
        title: title,
        date: new Date().toLocaleDateString(),
        content: content
    };
    
    data.news.unshift(newNews); // إضافة الخبر في البداية
    saveData(data);
    loadData();
    
    document.getElementById('addNewsForm').reset();
    alert('تم نشر الخبر بنجاح!');
}

// تحديث الميزانية
function updateFinance() {
    const revenue = parseInt(document.getElementById('revenueAmount').value);
    const expenses = parseInt(document.getElementById('expensesAmount').value);
    
    if (isNaN(revenue) || isNaN(expenses)) {
        alert('يرجى إدخال قيم رقمية صحيحة');
        return;
    }
    
    document.getElementById('totalRevenue').textContent = revenue.toLocaleString() + ' ريال';
    document.getElementById('totalExpenses').textContent = expenses.toLocaleString() + ' ريال';
    document.getElementById('netIncome').textContent = (revenue - expenses).toLocaleString() + ' ريال';
    
    alert('تم تحديث الميزانية بنجاح!');
}

// إضافة تقرير مالي
function addFinancialReport() {
    const period = document.getElementById('reportPeriod').value;
    const revenue = parseInt(document.getElementById('reportRevenue').value);
    const expenses = parseInt(document.getElementById('reportExpenses').value);
    const profit = parseInt(document.getElementById('reportProfit').value);
    
    if (!period || isNaN(revenue) || isNaN(expenses) || isNaN(profit)) {
        alert('يرجى ملء جميع الحقول بشكل صحيح');
        return;
    }
    
    const data = initializeData();
    const newReport = {
        id: data.financialReports.length + 1,
        period: period,
        revenue: revenue,
        expenses: expenses,
        profit: profit
    };
    
    data.financialReports.push(newReport);
    saveData(data);
    loadData();
    
    document.getElementById('reportForm').reset();
    alert('تم إضافة التقرير بنجاح!');
}

// الانضمام للجمعية
function joinAssociation() {
    const name = document.getElementById('joinName').value;
    const phone = document.getElementById('joinPhone').value;
    const type = document.getElementById('joinMembershipType').value;
    
    if (!name || !phone || !type) {
        alert('يرجى ملء جميع الحقول');
        return;
    }
    
    const data = initializeData();
    const newMember = {
        id: data.members.length + 1,
        name: name,
        number: `M${(data.members.length + 1).toString().padStart(3, '0')}`,
        type: type,
        joinDate: new Date().toLocaleDateString(),
        status: "نشط",
        phone: phone
    };
    
    data.members.push(newMember);
    saveData(data);
    
    closeModal('joinModal');
    alert(`شكراً لك ${name} على انضمامك إلى جمعيتنا! رقم عضويتك هو: ${newMember.number}`);
}

// تسجيل الدخول
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const isManagerLogin = document.getElementById('managerBtn').classList.contains('active');
    
    if (!username || !password) {
        alert('يرجى ملء جميع الحقول');
        return;
    }
    
    const data = initializeData();
    
    if (isManagerLogin) {
        // تسجيل دخول مدير
        const manager = data.managers.find(m => m.username === username && m.password === password);
        if (manager) {
            currentUser = manager;
            isManager = true;
            localStorage.setItem('currentUser', JSON.stringify(manager));
            alert(`مرحباً ${manager.name}! تم تسجيل الدخول بنجاح كمدير.`);
            
            // الانتقال إلى الصفحة الرئيسية
            window.location.href = 'index.html';
        } else {
            alert('اسم المستخدم أو كلمة المرور غير صحيحة');
        }
    } else {
        // تسجيل دخول عضو
        const member = data.members.find(m => m.number === username);
        if (member) {
            currentUser = member;
            isManager = false;
            localStorage.setItem('currentUser', JSON.stringify(member));
            alert(`مرحباً ${member.name}! تم تسجيل الدخول بنجاح كعضو.`);
            
            // الانتقال إلى الصفحة الرئيسية
            window.location.href = 'index.html';
        } else {
            alert('رقم العضوية غير صحيح');
        }
    }
}

// تسجيل الخروج
function logout() {
    currentUser = null;
    isManager = false;
    localStorage.removeItem('currentUser');
    
    // الانتقال إلى الصفحة الرئيسية
    window.location.href = 'index.html';
    
    alert('تم تسجيل الخروج بنجاح');
}

// إغلاق النافذة المنبثقة
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// تحديد نوع المستخدم في تسجيل الدخول
function setUserType(type) {
    document.getElementById('memberBtn').classList.toggle('active', type === 'member');
    document.getElementById('managerBtn').classList.toggle('active', type === 'manager');
}

// تحديد مرشح في التصويت
let selectedCandidate = null;

function selectCandidate(element, candidateName) {
    // إلغاء التحديد السابق
    document.querySelectorAll('.vote-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // تحديد الجديد
    element.classList.add('selected');
    selectedCandidate = candidateName;
}

// إرسال التصويت
function submitVote() {
    const data = initializeData();
    
    if (!data.settings.votingEnabled) {
        alert('التصويت غير مفعل حالياً. يرجى الانتظار حتى يقوم المدير بتفعيل التصويت.');
        return;
    }
    
    const name = document.getElementById('voterName').value;
    const number = document.getElementById('voterNumber').value;
    const membership = document.getElementById('membershipType').value;
    
    if (!name || !number || !membership) {
        alert('يرجى ملء جميع الحقول الإلزامية');
        return;
    }
    
    if (!selectedCandidate) {
        alert('يرجى اختيار مرشح للتصويت');
        return;
    }
    
    // حفظ التصويت
    const newVote = {
        id: data.votes.length + 1,
        voterName: name,
        voterNumber: number,
        membershipType: membership,
        candidate: selectedCandidate,
        notes: document.getElementById('voterNotes').value,
        date: new Date().toLocaleDateString()
    };
    
    // هنا يمكن إضافة التصويت إلى البيانات
    
    alert(`شكراً لك ${name} على المشاركة في التصويت!`);
    
    // إعادة تعيين النموذج
    document.getElementById('voteForm').reset();
    document.querySelectorAll('.vote-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    selectedCandidate = null;
}

// إنشاء PDF من استمارة التصويت
function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    doc.setFontSize(22);
    doc.text('استمارة التصويت - جمعية الإبداع', 105, 15, { align: 'center' });
    
    doc.setFontSize(16);
    doc.text('معلومات المصوت:', 20, 30);
    
    doc.setFontSize(12);
    doc.text(`اسم المصوت: ${document.getElementById('voterName').value}`, 20, 40);
    doc.text(`رقم العضوية: ${document.getElementById('voterNumber').value}`, 20, 50);
    doc.text(`نوع العضوية: ${document.getElementById('membershipType').value}`, 20, 60);
    
    if (selectedCandidate) {
        doc.text(`المرشح المختار: ${selectedCandidate}`, 20, 70);
    }
    
    const notes = document.getElementById('voterNotes').value;
    if (notes) {
        doc.text('ملاحظات المصوت:', 20, 85);
        const splitNotes = doc.splitTextToSize(notes, 170);
        doc.text(splitNotes, 20, 95);
    }
    
    doc.save('استمارة_التصويت.pdf');
}

// إضافة تعليق
function addComment() {
    const commentText = document.getElementById('comment').value;
    if (!commentText) {
        alert('يرجى كتابة تعليق');
        return;
    }
    
    const data = initializeData();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const newComment = {
        id: data.comments.length + 1,
        author: currentUser ? currentUser.name : "زائر",
        content: commentText,
        date: new Date().toLocaleDateString()
    };
    
    data.comments.push(newComment);
    saveData(data);
    loadData();
    
    document.getElementById('comment').value = '';
    alert('تم إضافة تعليقك بنجاح!');
}

// تبديل الوضع الليلي
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const themeIcon = document.querySelector('.theme-toggle i');
    
    if (document.body.classList.contains('dark-mode')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('darkMode', 'enabled');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('darkMode', 'disabled');
    }
}

// تحميل الوضع الليلي من التخزين
function loadDarkMode() {
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        const themeIcon = document.querySelector('.theme-toggle i');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
}

// عرض نافذة الانضمام
function showJoinModal() {
    document.getElementById('joinModal').style.display = 'flex';
}