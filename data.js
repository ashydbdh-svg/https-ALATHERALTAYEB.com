
// البيانات الأولية
const initialData = {
    members: [
        { id: 1, name: "أحمد محمد", number: "M001", type: "منتسب", joinDate: "2022-01-15", status: "نشط", phone: "0551234567" },
        { id: 2, name: "فاطمة عبدالله", number: "M002", type: "مساهم", joinDate: "2021-08-22", status: "نشط", phone: "0557654321" },
        { id: 3, name: "خالد سعيد", number: "M003", type: "منتسب", joinDate: "2023-03-10", status: "نشط", phone: "0551122334" },
        { id: 4, name: "سارة أحمد", number: "M004", type: "مساهم", joinDate: "2020-11-05", status: "نشط", phone: "0554433221" }
    ],
    managers: [
        { id: 1, name: "محمد علي", position: "رئيس الجمعية", email: "m.ali@jamy3a.com", phone: "0551234567", username: "admin", password: "admin123" },
        { id: 2, name: "لينا حسن", position: "نائب الرئيس", email: "l.hassan@jamy3a.com", phone: "0557654321", username: "manager1", password: "manager123" },
        { id: 3, name: "يوسف أحمد", position: "أمين الصندوق", email: "y.ahmed@jamy3a.com", phone: "0551122334", username: "manager2", password: "manager123" }
    ],
    news: [
        { id: 1, title: "افتتاح مشروع جديد للجمعية", date: "2023-05-15", content: "تم اليوم افتتاح مشروع 'يداً بيد' الذي يهدف إلى دعم الأسر المحتاجة في المجتمع." },
        { id: 2, title: "حفل تكريم المتطوعين", date: "2023-04-20", content: "نظمت الجمعية حفلاً لتكريم متطوعيها البارزين في أنشطة العام الماضي." },
        { id: 3, title: "ورشة عمل لتطوير المهارات", date: "2023-03-08", content: "عقدت الجمعية ورشة عمل حول تطوير المهارات القيادية لأعضائها." }
    ],
    votes: [
        { id: 1, decision: "انتخاب مدير الجمعية", date: "2023-03-15", voters: 145, percentage: 78, status: "مكتمل" },
        { id: 2, decision: "اعتماد الميزانية السنوية", date: "2023-02-10", voters: 132, percentage: 92, status: "مكتمل" },
        { id: 3, decision: "تعديل نظام الجمعية", date: "2023-01-05", voters: 128, percentage: 65, status: "مكتمل" }
    ],
    comments: [
        { id: 1, author: "محمد أحمد", content: "أشكر الجمعية على هذه الجهود الرائعة في خدمة المجتمع.", date: "2023-05-18" },
        { id: 2, author: "سارة خالد", content: "أتمنى لكم التوفيق في المشروع الجديد، وأنا مستعدة للمساعدة في أي وقت.", date: "2023-05-12" }
    ],
    financialReports: [
        { id: 1, period: "ربع الأول 2023", revenue: 65000, expenses: 42000, profit: 23000 },
        { id: 2, period: "ربع الثاني 2023", revenue: 72000, expenses: 58000, profit: 14000 },
        { id: 3, period: "ربع الثالث 2023", revenue: 68000, expenses: 45000, profit: 23000 }
    ],
    settings: {
        votingEnabled: false
    }
};

// تهيئة البيانات إذا لم تكن موجودة
function initializeData() {
    if (!localStorage.getItem('associationData')) {
        localStorage.setItem('associationData', JSON.stringify(initialData));
    }
    return JSON.parse(localStorage.getItem('associationData'));
}

// حفظ البيانات
function saveData(data) {
    localStorage.setItem('associationData', JSON.stringify(data));
}
