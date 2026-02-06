// بيانات شهادات غير سورية - الحدود الدنيا وشروط التسجيل
// يمكن إضافة أنواع شهادات جديدة بإنشاء ملفات مماثلة

export interface AdmissionEntry {
  id: string;
  major: string;
  university: string;
  minScore: string;
  branch: 'علمي' | 'أدبي' | 'علمي وأدبي';
  notes?: string;
  category: string;
}

export interface CertificateType {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  requirements: string[];
  importantNotes: string[];
  registrationDates?: string;
  admissionEntries: AdmissionEntry[];
}

export const nonSyrianCertificate: CertificateType = {
  id: 'non-syrian',
  name: 'الشهادة الثانوية السورية المكتسبة من خارج سوريا',
  nameEn: 'Syrian Secondary Certificate (Abroad)',
  description: 'مفاضلة خاصة بالطلاب الحاصلين على شهادة الثانوية العامة السورية من مدارس خارج سوريا للعام الدراسي 2025-2026',
  requirements: [
    'الحصول على شهادة الثانوية العامة السورية (علمي أو أدبي) من خارج سوريا لعام 2025',
    'التقدم عبر بطاقة المفاضلة الإلكترونية مع إدراج الرغبات المطلوبة',
    'اختيار عدد كافٍ من الرغبات لضمان فرصة القبول',
    'الالتزام بمواعيد التسجيل المحددة في الإعلان الرسمي',
  ],
  importantNotes: [
    'الحد الأدنى للقبول في كليات الطب والصيدلة: 80%',
    'الحد الأدنى للقبول في كليات الهندسة: 75%',
    'الحد الأدنى للقبول في الطب البيطري والزراعة والتمريض: 60%',
    'الحد الأدنى للقبول في باقي الكليات والمعاهد: 50%',
    'رسم التقدم للمفاضلة: 10,000 ليرة سورية',
    'هذا الإعلان نهائي ولن يُفتح باب التسجيل مرة أخرى',
  ],
  registrationDates: 'راجع الإعلان الرسمي لمعرفة مواعيد التسجيل',
  admissionEntries: [
    // ═══════════════════════════════════════════════════════════════
    // كليات الطب والصيدلة - الحد الأدنى 80%
    // ═══════════════════════════════════════════════════════════════
    { id: '1', major: 'الطب البشري', university: 'جامعة دمشق', minScore: '80%', branch: 'علمي', category: 'طب', notes: 'سنة تحضيرية' },
    { id: '2', major: 'الطب البشري', university: 'جامعة حلب', minScore: '80%', branch: 'علمي', category: 'طب', notes: 'سنة تحضيرية' },
    { id: '3', major: 'الطب البشري', university: 'جامعة تشرين - اللاذقية', minScore: '80%', branch: 'علمي', category: 'طب', notes: 'سنة تحضيرية' },
    { id: '4', major: 'الطب البشري', university: 'جامعة البعث - حمص', minScore: '80%', branch: 'علمي', category: 'طب', notes: 'سنة تحضيرية' },
    { id: '5', major: 'الطب البشري', university: 'جامعة حماة', minScore: '80%', branch: 'علمي', category: 'طب', notes: 'سنة تحضيرية' },
    { id: '6', major: 'الطب البشري', university: 'جامعة طرطوس', minScore: '80%', branch: 'علمي', category: 'طب', notes: 'سنة تحضيرية' },
    { id: '7', major: 'الطب البشري', university: 'جامعة إدلب', minScore: '80%', branch: 'علمي', category: 'طب', notes: 'سنة تحضيرية' },
    { id: '8', major: 'طب الأسنان', university: 'جامعة دمشق', minScore: '80%', branch: 'علمي', category: 'طب', notes: 'سنة تحضيرية' },
    { id: '9', major: 'طب الأسنان', university: 'جامعة حلب', minScore: '80%', branch: 'علمي', category: 'طب', notes: 'سنة تحضيرية' },
    { id: '10', major: 'طب الأسنان', university: 'جامعة تشرين - اللاذقية', minScore: '80%', branch: 'علمي', category: 'طب', notes: 'سنة تحضيرية' },
    { id: '11', major: 'طب الأسنان', university: 'جامعة البعث - حمص', minScore: '80%', branch: 'علمي', category: 'طب', notes: 'سنة تحضيرية' },
    { id: '12', major: 'طب الأسنان', university: 'جامعة حماة', minScore: '80%', branch: 'علمي', category: 'طب', notes: 'سنة تحضيرية' },
    { id: '13', major: 'الصيدلة', university: 'جامعة دمشق', minScore: '80%', branch: 'علمي', category: 'طب', notes: 'سنة تحضيرية' },
    { id: '14', major: 'الصيدلة', university: 'جامعة حلب', minScore: '80%', branch: 'علمي', category: 'طب', notes: 'سنة تحضيرية' },
    { id: '15', major: 'الصيدلة', university: 'جامعة تشرين - اللاذقية', minScore: '80%', branch: 'علمي', category: 'طب', notes: 'سنة تحضيرية' },
    { id: '16', major: 'الصيدلة', university: 'جامعة البعث - حمص', minScore: '80%', branch: 'علمي', category: 'طب', notes: 'سنة تحضيرية' },
    
    // ═══════════════════════════════════════════════════════════════
    // كليات الهندسة - الحد الأدنى 75%
    // ═══════════════════════════════════════════════════════════════
    { id: '17', major: 'الهندسة المعلوماتية', university: 'جامعة دمشق', minScore: '75%', branch: 'علمي', category: 'هندسة' },
    { id: '18', major: 'الهندسة المعلوماتية', university: 'جامعة حلب', minScore: '75%', branch: 'علمي', category: 'هندسة' },
    { id: '19', major: 'الهندسة المعلوماتية', university: 'جامعة تشرين - اللاذقية', minScore: '75%', branch: 'علمي', category: 'هندسة' },
    { id: '20', major: 'الهندسة المعلوماتية', university: 'جامعة إدلب', minScore: '75%', branch: 'علمي', category: 'هندسة' },
    { id: '21', major: 'الهندسة المعلوماتية', university: 'جامعة البعث - حمص', minScore: '75%', branch: 'علمي', category: 'هندسة' },
    { id: '22', major: 'الهندسة المدنية', university: 'جامعة دمشق', minScore: '75%', branch: 'علمي', category: 'هندسة' },
    { id: '23', major: 'الهندسة المدنية', university: 'جامعة حلب', minScore: '75%', branch: 'علمي', category: 'هندسة' },
    { id: '24', major: 'الهندسة المدنية', university: 'جامعة تشرين - اللاذقية', minScore: '75%', branch: 'علمي', category: 'هندسة' },
    { id: '25', major: 'الهندسة المدنية', university: 'جامعة البعث - حمص', minScore: '75%', branch: 'علمي', category: 'هندسة' },
    { id: '26', major: 'الهندسة المدنية', university: 'جامعة حماة', minScore: '75%', branch: 'علمي', category: 'هندسة' },
    { id: '27', major: 'الهندسة المدنية', university: 'جامعة إدلب', minScore: '75%', branch: 'علمي', category: 'هندسة' },
    { id: '28', major: 'الهندسة المعمارية', university: 'جامعة دمشق', minScore: '75%', branch: 'علمي', category: 'هندسة', notes: 'يتطلب اختبار رسم' },
    { id: '29', major: 'الهندسة المعمارية', university: 'جامعة حلب', minScore: '75%', branch: 'علمي', category: 'هندسة', notes: 'يتطلب اختبار رسم' },
    { id: '30', major: 'الهندسة المعمارية', university: 'جامعة تشرين - اللاذقية', minScore: '75%', branch: 'علمي', category: 'هندسة', notes: 'يتطلب اختبار رسم' },
    { id: '31', major: 'الهندسة المعمارية', university: 'جامعة البعث - حمص', minScore: '75%', branch: 'علمي', category: 'هندسة', notes: 'يتطلب اختبار رسم' },
    { id: '32', major: 'الهندسة المعمارية', university: 'جامعة حماة', minScore: '75%', branch: 'علمي', category: 'هندسة', notes: 'يتطلب اختبار رسم' },
    { id: '33', major: 'الهندسة المعمارية', university: 'جامعة طرطوس', minScore: '75%', branch: 'علمي', category: 'هندسة', notes: 'يتطلب اختبار رسم' },
    { id: '34', major: 'الهندسة المعمارية', university: 'جامعة إدلب', minScore: '75%', branch: 'علمي', category: 'هندسة', notes: 'يتطلب اختبار رسم' },
    { id: '35', major: 'هندسة الاتصالات والإلكترونيات', university: 'جامعة دمشق', minScore: '75%', branch: 'علمي', category: 'هندسة' },
    { id: '36', major: 'هندسة الحواسيب والأتمتة', university: 'جامعة دمشق', minScore: '75%', branch: 'علمي', category: 'هندسة' },
    { id: '37', major: 'هندسة الطاقة الكهربائية', university: 'جامعة دمشق', minScore: '75%', branch: 'علمي', category: 'هندسة' },
    { id: '38', major: 'هندسة الطاقة الكهربائية', university: 'جامعة السويداء', minScore: '75%', branch: 'علمي', category: 'هندسة' },
    { id: '39', major: 'هندسة التصميم الميكانيكي', university: 'جامعة دمشق', minScore: '75%', branch: 'علمي', category: 'هندسة' },
    { id: '40', major: 'الهندسة الطبية', university: 'جامعة دمشق', minScore: '75%', branch: 'علمي', category: 'هندسة' },
    { id: '41', major: 'الهندسة الطبية', university: 'جامعة تشرين - اللاذقية', minScore: '75%', branch: 'علمي', category: 'هندسة' },
    { id: '42', major: 'الهندسة الميكانيكية', university: 'جامعة دمشق', minScore: '75%', branch: 'علمي', category: 'هندسة' },
    { id: '43', major: 'هندسة الاتصالات', university: 'جامعة حلب', minScore: '75%', branch: 'علمي', category: 'هندسة' },
    { id: '44', major: 'هندسة الحواسيب', university: 'جامعة حلب', minScore: '75%', branch: 'علمي', category: 'هندسة' },
    { id: '45', major: 'الهندسة الكهربائية', university: 'جامعة حلب', minScore: '75%', branch: 'علمي', category: 'هندسة' },
    { id: '46', major: 'الهندسة الميكاترونية', university: 'جامعة حلب', minScore: '75%', branch: 'علمي', category: 'هندسة' },
    { id: '47', major: 'الهندسة النووية', university: 'جامعة حلب', minScore: '75%', branch: 'علمي', category: 'هندسة' },
    { id: '48', major: 'الهندسة الصناعية', university: 'جامعة حلب', minScore: '75%', branch: 'علمي', category: 'هندسة' },
    { id: '49', major: 'الهندسة الكيميائية', university: 'جامعة البعث - حمص', minScore: '75%', branch: 'علمي', category: 'هندسة' },
    { id: '50', major: 'الهندسة البيئية', university: 'جامعة البعث - حمص', minScore: '75%', branch: 'علمي', category: 'هندسة' },
    { id: '51', major: 'الهندسة الغذائية', university: 'جامعة البعث - حمص', minScore: '75%', branch: 'علمي', category: 'هندسة' },
    { id: '52', major: 'الهندسة البحرية', university: 'جامعة تشرين - اللاذقية', minScore: '75%', branch: 'علمي', category: 'هندسة' },
    
    // ═══════════════════════════════════════════════════════════════
    // الطب البيطري والزراعة والتمريض - الحد الأدنى 60%
    // ═══════════════════════════════════════════════════════════════
    { id: '53', major: 'الطب البيطري', university: 'جامعة درعا', minScore: '60%', branch: 'علمي', category: 'زراعة وبيطرة' },
    { id: '54', major: 'الطب البيطري', university: 'جامعة إدلب', minScore: '60%', branch: 'علمي', category: 'زراعة وبيطرة' },
    { id: '55', major: 'الطب البيطري', university: 'جامعة حماة', minScore: '60%', branch: 'علمي', category: 'زراعة وبيطرة' },
    { id: '56', major: 'الطب البيطري', university: 'جامعة الفرات - دير الزور', minScore: '60%', branch: 'علمي', category: 'زراعة وبيطرة' },
    { id: '57', major: 'الهندسة الزراعية', university: 'جامعة دمشق', minScore: '60%', branch: 'علمي', category: 'زراعة وبيطرة' },
    { id: '58', major: 'الهندسة الزراعية', university: 'جامعة السويداء', minScore: '60%', branch: 'علمي', category: 'زراعة وبيطرة' },
    { id: '59', major: 'الهندسة الزراعية', university: 'جامعة القنيطرة', minScore: '60%', branch: 'علمي', category: 'زراعة وبيطرة' },
    { id: '60', major: 'الهندسة الزراعية', university: 'جامعة حلب', minScore: '60%', branch: 'علمي', category: 'زراعة وبيطرة' },
    { id: '61', major: 'الهندسة الزراعية', university: 'جامعة إدلب', minScore: '60%', branch: 'علمي', category: 'زراعة وبيطرة' },
    { id: '62', major: 'الهندسة الزراعية', university: 'جامعة تشرين - اللاذقية', minScore: '60%', branch: 'علمي', category: 'زراعة وبيطرة' },
    { id: '63', major: 'الهندسة الزراعية', university: 'جامعة طرطوس', minScore: '60%', branch: 'علمي', category: 'زراعة وبيطرة' },
    { id: '64', major: 'الهندسة الزراعية', university: 'جامعة البعث - حمص', minScore: '60%', branch: 'علمي', category: 'زراعة وبيطرة' },
    { id: '65', major: 'الهندسة الزراعية', university: 'جامعة حماة', minScore: '60%', branch: 'علمي', category: 'زراعة وبيطرة' },
    { id: '66', major: 'الهندسة الزراعية', university: 'جامعة الفرات - دير الزور', minScore: '60%', branch: 'علمي', category: 'زراعة وبيطرة' },
    { id: '67', major: 'التمريض', university: 'جامعة حلب', minScore: '60%', branch: 'علمي', category: 'صحة' },
    { id: '68', major: 'التمريض', university: 'جامعة تشرين - اللاذقية', minScore: '60%', branch: 'علمي', category: 'صحة' },
    { id: '69', major: 'التمريض', university: 'جامعة حماة', minScore: '60%', branch: 'علمي', category: 'صحة' },
    { id: '70', major: 'التمريض', university: 'جامعة الفرات - دير الزور', minScore: '60%', branch: 'علمي', category: 'صحة' },
    
    // ═══════════════════════════════════════════════════════════════
    // كليات العلوم والاقتصاد - الحد الأدنى 50%
    // ═══════════════════════════════════════════════════════════════
    { id: '71', major: 'الاقتصاد', university: 'جامعة دمشق', minScore: '50%', branch: 'علمي وأدبي', category: 'اقتصاد وإدارة' },
    { id: '72', major: 'الاقتصاد', university: 'جامعة درعا', minScore: '50%', branch: 'علمي وأدبي', category: 'اقتصاد وإدارة' },
    { id: '73', major: 'الاقتصاد', university: 'جامعة القنيطرة', minScore: '50%', branch: 'علمي وأدبي', category: 'اقتصاد وإدارة' },
    { id: '74', major: 'الاقتصاد', university: 'جامعة السويداء', minScore: '50%', branch: 'علمي وأدبي', category: 'اقتصاد وإدارة' },
    { id: '75', major: 'الاقتصاد', university: 'جامعة حلب', minScore: '50%', branch: 'علمي وأدبي', category: 'اقتصاد وإدارة' },
    { id: '76', major: 'الاقتصاد', university: 'جامعة حلب - فرع اعزاز', minScore: '50%', branch: 'علمي وأدبي', category: 'اقتصاد وإدارة' },
    { id: '77', major: 'الاقتصاد', university: 'جامعة تشرين - اللاذقية', minScore: '50%', branch: 'علمي وأدبي', category: 'اقتصاد وإدارة' },
    { id: '78', major: 'الاقتصاد', university: 'جامعة البعث - حمص', minScore: '50%', branch: 'علمي وأدبي', category: 'اقتصاد وإدارة' },
    { id: '79', major: 'الاقتصاد', university: 'جامعة طرطوس', minScore: '50%', branch: 'علمي وأدبي', category: 'اقتصاد وإدارة' },
    { id: '80', major: 'الاقتصاد', university: 'جامعة حماة', minScore: '50%', branch: 'علمي وأدبي', category: 'اقتصاد وإدارة' },
    { id: '81', major: 'الاقتصاد', university: 'جامعة الفرات - دير الزور', minScore: '50%', branch: 'علمي وأدبي', category: 'اقتصاد وإدارة' },
    { id: '82', major: 'الاقتصاد', university: 'جامعة إدلب', minScore: '50%', branch: 'علمي وأدبي', category: 'اقتصاد وإدارة' },
    
    // علوم الحياة
    { id: '83', major: 'علوم الحياة', university: 'جامعة دمشق', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '84', major: 'علوم الحياة', university: 'جامعة درعا', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '85', major: 'علوم الحياة', university: 'جامعة السويداء', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '86', major: 'علوم الحياة', university: 'جامعة حلب', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '87', major: 'علوم الحياة', university: 'جامعة إدلب', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '88', major: 'علوم الحياة', university: 'جامعة تشرين - اللاذقية', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '89', major: 'علوم الحياة', university: 'جامعة البعث - حمص', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '90', major: 'علوم الحياة', university: 'جامعة طرطوس', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '91', major: 'علوم الحياة', university: 'جامعة الفرات - دير الزور', minScore: '50%', branch: 'علمي', category: 'علوم' },
    
    // الجيولوجيا
    { id: '92', major: 'الجيولوجيا', university: 'جامعة دمشق', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '93', major: 'الجيولوجيا', university: 'جامعة حلب', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '94', major: 'الجيولوجيا', university: 'جامعة تشرين - اللاذقية', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '95', major: 'الجيولوجيا', university: 'جامعة البعث - حمص', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '96', major: 'الجيولوجيا', university: 'جامعة الفرات - دير الزور', minScore: '50%', branch: 'علمي', category: 'علوم' },
    
    // الرياضيات
    { id: '97', major: 'الرياضيات', university: 'جامعة دمشق', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '98', major: 'الرياضيات', university: 'جامعة القنيطرة', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '99', major: 'الرياضيات', university: 'جامعة درعا', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '100', major: 'الرياضيات', university: 'جامعة حلب', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '101', major: 'الرياضيات', university: 'جامعة إدلب', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '102', major: 'الرياضيات', university: 'جامعة تشرين - اللاذقية', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '103', major: 'الرياضيات', university: 'جامعة البعث - حمص', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '104', major: 'الرياضيات', university: 'جامعة حماة', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '105', major: 'الرياضيات', university: 'جامعة طرطوس', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '106', major: 'الرياضيات', university: 'جامعة الفرات - دير الزور', minScore: '50%', branch: 'علمي', category: 'علوم' },
    
    // الفيزياء
    { id: '107', major: 'الفيزياء', university: 'جامعة دمشق', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '108', major: 'الفيزياء', university: 'جامعة حلب', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '109', major: 'الفيزياء', university: 'جامعة إدلب', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '110', major: 'الفيزياء', university: 'جامعة تشرين - اللاذقية', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '111', major: 'الفيزياء', university: 'جامعة البعث - حمص', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '112', major: 'الفيزياء', university: 'جامعة حماة', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '113', major: 'الفيزياء', university: 'جامعة طرطوس', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '114', major: 'الفيزياء', university: 'جامعة الفرات - دير الزور', minScore: '50%', branch: 'علمي', category: 'علوم' },
    
    // الكيمياء
    { id: '115', major: 'الكيمياء', university: 'جامعة دمشق', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '116', major: 'الكيمياء', university: 'جامعة حلب', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '117', major: 'الكيمياء', university: 'جامعة إدلب', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '118', major: 'الكيمياء', university: 'جامعة تشرين - اللاذقية', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '119', major: 'الكيمياء', university: 'جامعة البعث - حمص', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '120', major: 'الكيمياء', university: 'جامعة طرطوس', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '121', major: 'الكيمياء', university: 'جامعة الفرات - دير الزور', minScore: '50%', branch: 'علمي', category: 'علوم' },
    
    // العلوم الصحية
    { id: '122', major: 'تقويم الكلام واللغة', university: 'جامعة دمشق', minScore: '50%', branch: 'علمي', category: 'صحة' },
    { id: '123', major: 'السمعيات', university: 'جامعة دمشق', minScore: '50%', branch: 'علمي', category: 'صحة' },
    { id: '124', major: 'العلاج الوظيفي', university: 'جامعة دمشق', minScore: '50%', branch: 'علمي', category: 'صحة' },
    { id: '125', major: 'علم النفس السريري', university: 'جامعة دمشق', minScore: '50%', branch: 'علمي', category: 'صحة' },
    { id: '126', major: 'الأجهزة التقويمية', university: 'جامعة دمشق', minScore: '50%', branch: 'علمي', category: 'صحة' },
    { id: '127', major: 'التشخيص والعلاج الشعاعي', university: 'جامعة دمشق', minScore: '50%', branch: 'علمي', category: 'صحة' },
    { id: '128', major: 'إدارة المعلومات الصحية', university: 'جامعة دمشق', minScore: '50%', branch: 'علمي', category: 'صحة' },
    { id: '129', major: 'العلوم الصحية', university: 'جامعة حلب', minScore: '50%', branch: 'علمي', category: 'صحة' },
    { id: '130', major: 'التغذية', university: 'جامعة البعث - حمص', minScore: '50%', branch: 'علمي', category: 'صحة' },
    { id: '131', major: 'المخابر', university: 'جامعة البعث - حمص', minScore: '50%', branch: 'علمي', category: 'صحة' },
    { id: '132', major: 'المعالجة الفيزيائية', university: 'جامعة البعث - حمص', minScore: '50%', branch: 'علمي', category: 'صحة' },
    { id: '133', major: 'التخدير', university: 'جامعة إدلب', minScore: '50%', branch: 'علمي', category: 'صحة' },
    { id: '134', major: 'الطوارئ', university: 'جامعة إدلب', minScore: '50%', branch: 'علمي', category: 'صحة' },
    { id: '135', major: 'التمريض', university: 'جامعة إدلب', minScore: '50%', branch: 'علمي', category: 'صحة' },
    { id: '136', major: 'العلوم البيئية', university: 'جامعة دمشق', minScore: '50%', branch: 'علمي', category: 'علوم' },
    
    // ═══════════════════════════════════════════════════════════════
    // كليات الآداب واللغات - الحد الأدنى 50%
    // ═══════════════════════════════════════════════════════════════
    { id: '137', major: 'اللغة العربية', university: 'جامعة دمشق', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '138', major: 'اللغة العربية', university: 'جامعة القنيطرة', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '139', major: 'اللغة العربية', university: 'جامعة درعا', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '140', major: 'اللغة العربية', university: 'جامعة السويداء', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '141', major: 'اللغة العربية', university: 'جامعة حلب', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '142', major: 'اللغة العربية', university: 'جامعة حلب - فرع اعزاز', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '143', major: 'اللغة العربية', university: 'جامعة إدلب', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '144', major: 'اللغة العربية', university: 'جامعة إدلب - فرع الدانا', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '145', major: 'اللغة العربية', university: 'جامعة تشرين - اللاذقية', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '146', major: 'اللغة العربية', university: 'جامعة البعث - حمص', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '147', major: 'اللغة العربية', university: 'جامعة حماة', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '148', major: 'اللغة العربية', university: 'جامعة طرطوس', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '149', major: 'اللغة العربية', university: 'جامعة الفرات - دير الزور', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    
    { id: '150', major: 'اللغة الإنكليزية', university: 'جامعة دمشق', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '151', major: 'اللغة الإنكليزية', university: 'جامعة درعا', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '152', major: 'اللغة الإنكليزية', university: 'جامعة حلب', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '153', major: 'اللغة الإنكليزية', university: 'جامعة حلب - فرع اعزاز', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '154', major: 'اللغة الإنكليزية', university: 'جامعة إدلب', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '155', major: 'اللغة الإنكليزية', university: 'جامعة إدلب - فرع الدانا', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '156', major: 'اللغة الإنكليزية', university: 'جامعة تشرين - اللاذقية', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '157', major: 'اللغة الإنكليزية', university: 'جامعة طرطوس', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '158', major: 'اللغة الإنكليزية', university: 'جامعة البعث - حمص', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '159', major: 'اللغة الإنكليزية', university: 'جامعة حماة', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '160', major: 'اللغة الإنكليزية', university: 'جامعة الفرات - دير الزور', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    
    { id: '161', major: 'اللغة الفرنسية', university: 'جامعة دمشق', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '162', major: 'اللغة الفرنسية', university: 'جامعة السويداء', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '163', major: 'اللغة الفرنسية', university: 'جامعة حلب', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '164', major: 'اللغة الفرنسية', university: 'جامعة تشرين - اللاذقية', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '165', major: 'اللغة الفرنسية', university: 'جامعة البعث - حمص', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '166', major: 'اللغة الفرنسية', university: 'جامعة طرطوس', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '167', major: 'اللغة الفرنسية', university: 'جامعة الفرات - دير الزور', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    
    // الحقوق والعلوم الإنسانية
    { id: '168', major: 'الحقوق', university: 'جامعة دمشق', minScore: '50%', branch: 'علمي وأدبي', category: 'حقوق' },
    { id: '169', major: 'الحقوق', university: 'جامعة درعا', minScore: '50%', branch: 'علمي وأدبي', category: 'حقوق' },
    { id: '170', major: 'الحقوق', university: 'جامعة القنيطرة', minScore: '50%', branch: 'علمي وأدبي', category: 'حقوق' },
    { id: '171', major: 'الحقوق', university: 'جامعة حلب', minScore: '50%', branch: 'علمي وأدبي', category: 'حقوق' },
    { id: '172', major: 'الحقوق', university: 'جامعة حلب - فرع اعزاز', minScore: '50%', branch: 'علمي وأدبي', category: 'حقوق' },
    { id: '173', major: 'الحقوق', university: 'جامعة إدلب', minScore: '50%', branch: 'علمي وأدبي', category: 'حقوق' },
    { id: '174', major: 'الحقوق', university: 'جامعة تشرين - اللاذقية', minScore: '50%', branch: 'علمي وأدبي', category: 'حقوق' },
    { id: '175', major: 'الحقوق', university: 'جامعة البعث - حمص', minScore: '50%', branch: 'علمي وأدبي', category: 'حقوق' },
    { id: '176', major: 'الحقوق', university: 'جامعة الفرات - دير الزور', minScore: '50%', branch: 'علمي وأدبي', category: 'حقوق' },
    
    { id: '177', major: 'الفلسفة', university: 'جامعة دمشق', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '178', major: 'الفلسفة', university: 'جامعة السويداء', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '179', major: 'الفلسفة', university: 'جامعة حلب', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '180', major: 'الفلسفة', university: 'جامعة تشرين - اللاذقية', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '181', major: 'الفلسفة', university: 'جامعة البعث - حمص', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    
    { id: '182', major: 'علم الاجتماع', university: 'جامعة دمشق', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '183', major: 'علم الاجتماع', university: 'جامعة السويداء', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '184', major: 'علم الاجتماع', university: 'جامعة درعا', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '185', major: 'علم الاجتماع', university: 'جامعة حلب', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '186', major: 'علم الاجتماع', university: 'جامعة حلب - فرع اعزاز', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '187', major: 'علم الاجتماع', university: 'جامعة تشرين - اللاذقية', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '188', major: 'علم الاجتماع', university: 'جامعة الفرات - دير الزور', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    
    { id: '189', major: 'الجغرافيا', university: 'جامعة دمشق', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '190', major: 'الجغرافيا', university: 'جامعة السويداء', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '191', major: 'الجغرافيا', university: 'جامعة حلب', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '192', major: 'الجغرافيا', university: 'جامعة حلب - فرع اعزاز', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '193', major: 'الجغرافيا', university: 'جامعة إدلب', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '194', major: 'الجغرافيا', university: 'جامعة تشرين - اللاذقية', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '195', major: 'الجغرافيا', university: 'جامعة طرطوس', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    
    { id: '196', major: 'التاريخ', university: 'جامعة دمشق', minScore: '50%', branch: 'أدبي', category: 'آداب' },
    { id: '197', major: 'التاريخ', university: 'جامعة السويداء', minScore: '50%', branch: 'أدبي', category: 'آداب' },
    { id: '198', major: 'التاريخ', university: 'جامعة حلب', minScore: '50%', branch: 'أدبي', category: 'آداب' },
    { id: '199', major: 'التاريخ', university: 'جامعة حلب - فرع اعزاز', minScore: '50%', branch: 'أدبي', category: 'آداب' },
    { id: '200', major: 'التاريخ', university: 'جامعة إدلب', minScore: '50%', branch: 'أدبي', category: 'آداب' },
    { id: '201', major: 'التاريخ', university: 'جامعة تشرين - اللاذقية', minScore: '50%', branch: 'أدبي', category: 'آداب' },
    { id: '202', major: 'التاريخ', university: 'جامعة البعث - حمص', minScore: '50%', branch: 'أدبي', category: 'آداب' },
    { id: '203', major: 'التاريخ', university: 'جامعة الفرات - دير الزور', minScore: '50%', branch: 'أدبي', category: 'آداب' },
    
    { id: '204', major: 'الآثار', university: 'جامعة دمشق', minScore: '50%', branch: 'أدبي', category: 'آداب' },
    { id: '205', major: 'الآثار', university: 'جامعة السويداء', minScore: '50%', branch: 'أدبي', category: 'آداب' },
    { id: '206', major: 'الآثار', university: 'جامعة حلب', minScore: '50%', branch: 'أدبي', category: 'آداب' },
    
    { id: '207', major: 'الإعلام', university: 'جامعة دمشق', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    
    // ═══════════════════════════════════════════════════════════════
    // كليات التربية - الحد الأدنى 50%
    // ═══════════════════════════════════════════════════════════════
    { id: '208', major: 'الإرشاد النفسي', university: 'جامعة دمشق', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية' },
    { id: '209', major: 'الإرشاد النفسي', university: 'جامعة درعا', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية' },
    { id: '210', major: 'الإرشاد النفسي', university: 'جامعة السويداء', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية' },
    { id: '211', major: 'الإرشاد النفسي', university: 'جامعة حلب', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية' },
    { id: '212', major: 'الإرشاد النفسي', university: 'جامعة حلب - فرع اعزاز', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية' },
    { id: '213', major: 'الإرشاد النفسي', university: 'جامعة إدلب', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية' },
    { id: '214', major: 'الإرشاد النفسي', university: 'جامعة تشرين - اللاذقية', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية' },
    { id: '215', major: 'الإرشاد النفسي', university: 'جامعة البعث - حمص', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية' },
    { id: '216', major: 'الإرشاد النفسي', university: 'جامعة طرطوس', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية' },
    
    { id: '217', major: 'معلم صف', university: 'جامعة دمشق', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية' },
    { id: '218', major: 'معلم صف', university: 'جامعة القنيطرة', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية' },
    { id: '219', major: 'معلم صف', university: 'جامعة درعا', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية' },
    { id: '220', major: 'معلم صف', university: 'جامعة السويداء', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية' },
    { id: '221', major: 'معلم صف', university: 'جامعة حلب', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية' },
    { id: '222', major: 'معلم صف', university: 'جامعة حلب - فرع اعزاز', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية' },
    { id: '223', major: 'معلم صف', university: 'جامعة إدلب', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية' },
    { id: '224', major: 'معلم صف', university: 'جامعة إدلب - فرع الدانا', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية' },
    { id: '225', major: 'معلم صف', university: 'جامعة تشرين - اللاذقية', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية' },
    { id: '226', major: 'معلم صف', university: 'جامعة البعث - حمص', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية' },
    { id: '227', major: 'معلم صف', university: 'جامعة حماة', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية' },
    { id: '228', major: 'معلم صف', university: 'جامعة طرطوس', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية' },
    { id: '229', major: 'معلم صف', university: 'جامعة الفرات - دير الزور', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية' },
    
    { id: '230', major: 'رياض الأطفال', university: 'جامعة دمشق', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية', notes: 'للإناث فقط' },
    { id: '231', major: 'رياض الأطفال', university: 'جامعة السويداء', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية', notes: 'للإناث فقط' },
    { id: '232', major: 'رياض الأطفال', university: 'جامعة حلب', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية', notes: 'للإناث فقط' },
    { id: '233', major: 'رياض الأطفال', university: 'جامعة إدلب', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية', notes: 'للإناث فقط' },
    { id: '234', major: 'رياض الأطفال', university: 'جامعة تشرين - اللاذقية', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية', notes: 'للإناث فقط' },
    { id: '235', major: 'رياض الأطفال', university: 'جامعة البعث - حمص', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية', notes: 'للإناث فقط' },
    { id: '236', major: 'رياض الأطفال', university: 'جامعة طرطوس', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية', notes: 'للإناث فقط' },
    { id: '237', major: 'رياض الأطفال', university: 'جامعة الفرات - دير الزور', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية', notes: 'للإناث فقط' },
    
    { id: '238', major: 'التربية الخاصة', university: 'جامعة دمشق', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية' },
    { id: '239', major: 'التربية الخاصة', university: 'جامعة حلب', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية' },
    { id: '240', major: 'التربية الخاصة', university: 'جامعة تشرين - اللاذقية', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية' },
    { id: '241', major: 'التربية الخاصة', university: 'جامعة البعث - حمص', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية' },
    
    // ═══════════════════════════════════════════════════════════════
    // كليات الشريعة والدراسات الإسلامية - الحد الأدنى 50%
    // ═══════════════════════════════════════════════════════════════
    { id: '242', major: 'الشريعة الإسلامية', university: 'جامعة دمشق', minScore: '50%', branch: 'علمي وأدبي', category: 'شريعة' },
    { id: '243', major: 'الشريعة الإسلامية', university: 'جامعة حلب', minScore: '50%', branch: 'علمي وأدبي', category: 'شريعة' },
    { id: '244', major: 'الشريعة الإسلامية', university: 'جامعة حلب - فرع اعزاز', minScore: '50%', branch: 'علمي وأدبي', category: 'شريعة' },
    { id: '245', major: 'الشريعة الإسلامية', university: 'جامعة إدلب', minScore: '50%', branch: 'علمي وأدبي', category: 'شريعة' },
    { id: '246', major: 'أصول الدين', university: 'جامعة دمشق', minScore: '50%', branch: 'علمي وأدبي', category: 'شريعة' },
    
    // ═══════════════════════════════════════════════════════════════
    // كليات الفنون والموسيقى - الحد الأدنى 50%
    // ═══════════════════════════════════════════════════════════════
    { id: '247', major: 'التربية الموسيقية', university: 'جامعة دمشق', minScore: '50%', branch: 'علمي وأدبي', category: 'فنون', notes: 'يتطلب اختبار قبول' },
    { id: '248', major: 'التربية الموسيقية', university: 'جامعة البعث - حمص', minScore: '50%', branch: 'علمي وأدبي', category: 'فنون', notes: 'يتطلب اختبار قبول' },
    { id: '249', major: 'الفنون الجميلة - العمارة الداخلية', university: 'جامعة دمشق', minScore: '50%', branch: 'علمي وأدبي', category: 'فنون', notes: 'يتطلب اختبار رسم' },
    { id: '250', major: 'الفنون الجميلة - الاتصال البصري', university: 'جامعة دمشق', minScore: '50%', branch: 'علمي وأدبي', category: 'فنون', notes: 'يتطلب اختبار رسم' },
    { id: '251', major: 'الفنون الجميلة - التصوير', university: 'جامعة دمشق', minScore: '50%', branch: 'علمي وأدبي', category: 'فنون', notes: 'يتطلب اختبار رسم' },
    { id: '252', major: 'الفنون الجميلة - الحفر', university: 'جامعة دمشق', minScore: '50%', branch: 'علمي وأدبي', category: 'فنون', notes: 'يتطلب اختبار رسم' },
    { id: '253', major: 'الفنون الجميلة - النحت', university: 'جامعة دمشق', minScore: '50%', branch: 'علمي وأدبي', category: 'فنون', notes: 'يتطلب اختبار رسم' },
    { id: '254', major: 'الفنون الجميلة', university: 'جامعة حلب', minScore: '50%', branch: 'علمي وأدبي', category: 'فنون', notes: 'يتطلب اختبار رسم' },
    { id: '255', major: 'التربية الفنية', university: 'جامعة دمشق', minScore: '50%', branch: 'علمي وأدبي', category: 'فنون', notes: 'يتطلب اختبار رسم' },
    { id: '256', major: 'التربية الفنية', university: 'جامعة تشرين - اللاذقية', minScore: '50%', branch: 'علمي وأدبي', category: 'فنون', notes: 'يتطلب اختبار رسم' },
    { id: '257', major: 'التربية الفنية', university: 'جامعة البعث - حمص', minScore: '50%', branch: 'علمي وأدبي', category: 'فنون', notes: 'يتطلب اختبار رسم' },
    
    // ═══════════════════════════════════════════════════════════════
    // المعاهد التقانية - الحد الأدنى 50%
    // ═══════════════════════════════════════════════════════════════
    { id: '258', major: 'المعهد التقاني للحاسوب', university: 'جامعة دمشق', minScore: '50%', branch: 'علمي', category: 'معاهد تقانية' },
    { id: '259', major: 'المعهد التقاني للحاسوب', university: 'جامعة حلب', minScore: '50%', branch: 'علمي', category: 'معاهد تقانية' },
    { id: '260', major: 'المعهد التقاني للحاسوب', university: 'جامعة تشرين - اللاذقية', minScore: '50%', branch: 'علمي', category: 'معاهد تقانية' },
    { id: '261', major: 'المعهد التقاني للحاسوب', university: 'جامعة البعث - حمص', minScore: '50%', branch: 'علمي', category: 'معاهد تقانية' },
    { id: '262', major: 'المعهد التقاني للحاسوب', university: 'جامعة طرطوس', minScore: '50%', branch: 'علمي', category: 'معاهد تقانية' },
    { id: '263', major: 'المعهد التقاني الصناعي', university: 'جامعة دمشق', minScore: '50%', branch: 'علمي', category: 'معاهد تقانية' },
    { id: '264', major: 'المعهد التقاني الصناعي', university: 'جامعة حلب', minScore: '50%', branch: 'علمي', category: 'معاهد تقانية' },
    { id: '265', major: 'المعهد التقاني الصناعي', university: 'جامعة تشرين - اللاذقية', minScore: '50%', branch: 'علمي', category: 'معاهد تقانية' },
    { id: '266', major: 'المعهد التقاني الصناعي', university: 'جامعة البعث - حمص', minScore: '50%', branch: 'علمي', category: 'معاهد تقانية' },
    { id: '267', major: 'المعهد التقاني الصناعي', university: 'جامعة حماة', minScore: '50%', branch: 'علمي', category: 'معاهد تقانية' },
    { id: '268', major: 'المعهد التقاني الطبي', university: 'جامعة دمشق', minScore: '50%', branch: 'علمي', category: 'معاهد تقانية' },
    { id: '269', major: 'المعهد التقاني الطبي', university: 'جامعة حلب', minScore: '50%', branch: 'علمي', category: 'معاهد تقانية' },
    { id: '270', major: 'المعهد التقاني الطبي', university: 'جامعة تشرين - اللاذقية', minScore: '50%', branch: 'علمي', category: 'معاهد تقانية' },
    { id: '271', major: 'المعهد التقاني الطبي', university: 'جامعة البعث - حمص', minScore: '50%', branch: 'علمي', category: 'معاهد تقانية' },
    { id: '272', major: 'المعهد التقاني الطبي', university: 'جامعة حماة', minScore: '50%', branch: 'علمي', category: 'معاهد تقانية' },
    { id: '273', major: 'المعهد التقاني للعلوم المالية والمصرفية', university: 'جامعة دمشق', minScore: '50%', branch: 'علمي وأدبي', category: 'معاهد تقانية' },
    { id: '274', major: 'المعهد التقاني للعلوم المالية والمصرفية', university: 'جامعة حلب', minScore: '50%', branch: 'علمي وأدبي', category: 'معاهد تقانية' },
    { id: '275', major: 'المعهد التقاني للعلوم المالية والمصرفية', university: 'جامعة تشرين - اللاذقية', minScore: '50%', branch: 'علمي وأدبي', category: 'معاهد تقانية' },
    { id: '276', major: 'المعهد التقاني للعلوم المالية والمصرفية', university: 'جامعة البعث - حمص', minScore: '50%', branch: 'علمي وأدبي', category: 'معاهد تقانية' },
    { id: '277', major: 'المعهد التقاني للسياحة والفنادق', university: 'جامعة دمشق', minScore: '50%', branch: 'علمي وأدبي', category: 'معاهد تقانية' },
    { id: '278', major: 'المعهد التقاني للسياحة والفنادق', university: 'جامعة حلب', minScore: '50%', branch: 'علمي وأدبي', category: 'معاهد تقانية' },
    { id: '279', major: 'المعهد التقاني للسياحة والفنادق', university: 'جامعة تشرين - اللاذقية', minScore: '50%', branch: 'علمي وأدبي', category: 'معاهد تقانية' },
    { id: '280', major: 'المعهد التقاني الزراعي', university: 'جامعة دمشق', minScore: '50%', branch: 'علمي', category: 'معاهد تقانية' },
    { id: '281', major: 'المعهد التقاني الزراعي', university: 'جامعة حلب', minScore: '50%', branch: 'علمي', category: 'معاهد تقانية' },
    { id: '282', major: 'المعهد التقاني الزراعي', university: 'جامعة تشرين - اللاذقية', minScore: '50%', branch: 'علمي', category: 'معاهد تقانية' },
    { id: '283', major: 'المعهد التقاني الزراعي', university: 'جامعة البعث - حمص', minScore: '50%', branch: 'علمي', category: 'معاهد تقانية' },
    { id: '284', major: 'المعهد التقاني للفنون التطبيقية', university: 'جامعة دمشق', minScore: '50%', branch: 'علمي وأدبي', category: 'معاهد تقانية', notes: 'يتطلب اختبار رسم' },
    { id: '285', major: 'المعهد التقاني للفنون التطبيقية', university: 'جامعة حلب', minScore: '50%', branch: 'علمي وأدبي', category: 'معاهد تقانية', notes: 'يتطلب اختبار رسم' },
    { id: '286', major: 'المعهد التقاني التجاري', university: 'جامعة دمشق', minScore: '50%', branch: 'علمي وأدبي', category: 'معاهد تقانية' },
    { id: '287', major: 'المعهد التقاني التجاري', university: 'جامعة حلب', minScore: '50%', branch: 'علمي وأدبي', category: 'معاهد تقانية' },
    { id: '288', major: 'المعهد التقاني التجاري', university: 'جامعة تشرين - اللاذقية', minScore: '50%', branch: 'علمي وأدبي', category: 'معاهد تقانية' },
    { id: '289', major: 'المعهد التقاني التجاري', university: 'جامعة البعث - حمص', minScore: '50%', branch: 'علمي وأدبي', category: 'معاهد تقانية' },
    { id: '290', major: 'المعهد التقاني التجاري', university: 'جامعة حماة', minScore: '50%', branch: 'علمي وأدبي', category: 'معاهد تقانية' },
  ],
};
