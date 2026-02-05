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
  name: 'الشهادة الثانوية السورية المكتسبة من غير سورية',
  nameEn: 'Syrian Secondary Certificate (Non-Syrian)',
  description: 'مفاضلة الطلاب الحاصلين على شهادة الدراسة الثانوية العامة السورية (الأدبي أو العلمي) المكتسبة من خارج سورية للعام الدراسي 2025-2026',
  requirements: [
    'يكون الطالب حاصلاً على شهادة الدراسة الثانوية العامة السورية (الأدبي أو العلمي) حصراً لعام 2025',
    'يتقدم الطلاب بموجب بطاقة مفاضلة إلكترونية برغباتهم',
    'تعامل الشهادات الصادرة من المدارس السورية غير الثانوية معاملة الشهادة الثانوية العامة السورية',
    'يجب أن يكون الطالب قد أنهى المرحلة الدراسية كاملة لدى المدرسة الثانوية',
    'سيتم اعتماد معدل الشهادة الثانوية العامة السورية في المفاضلة',
    'يجب على الطالب إدراج رغباته في بطاقة المفاضلة',
    'يتوجب على الطالب إدراج عدد كاف من الرغبات بكافة أنواع المفاضلات',
  ],
  importantNotes: [
    'الحد الأدنى للقبول في كليات الطب البشري وطب الأسنان والصيدلة: 80%',
    'الحد الأدنى للقبول في كليات الهندسة: 75%',
    'الحد الأدنى للقبول في الطب البيطري والزراعة: 60%',
    'الحد الأدنى للقبول في الكليات والمعاهد الأخرى: 50%',
    'يجب قراءة الإعلان جيداً والتقيد بالمواعيد المحددة فيه',
    'هذا الإعلان هو الإعلان النهائي للقبول الجامعي ولن يكون هناك فتح باب للقبول مرة ثانية',
    'رسم التقدم للمفاضلة: 10000 ليرة سورية',
  ],
  registrationDates: 'راجع الإعلان الرسمي للمواعيد المحددة',
  admissionEntries: [
    // كليات الطب والصيدلة - 80%
    { id: '1', major: 'الطب البشري', university: 'دمشق', minScore: '80%', branch: 'علمي', category: 'طب', notes: 'سنة تحضيرية' },
    { id: '2', major: 'الطب البشري', university: 'حلب', minScore: '80%', branch: 'علمي', category: 'طب', notes: 'سنة تحضيرية' },
    { id: '3', major: 'الطب البشري', university: 'تشرين', minScore: '80%', branch: 'علمي', category: 'طب', notes: 'سنة تحضيرية' },
    { id: '4', major: 'الطب البشري', university: 'البعث', minScore: '80%', branch: 'علمي', category: 'طب', notes: 'سنة تحضيرية' },
    { id: '5', major: 'الطب البشري', university: 'حماه', minScore: '80%', branch: 'علمي', category: 'طب', notes: 'سنة تحضيرية' },
    { id: '6', major: 'الطب البشري', university: 'طرطوس', minScore: '80%', branch: 'علمي', category: 'طب', notes: 'سنة تحضيرية' },
    { id: '7', major: 'الطب البشري', university: 'ادلب', minScore: '80%', branch: 'علمي', category: 'طب', notes: 'سنة تحضيرية' },
    { id: '8', major: 'طب الأسنان', university: 'دمشق', minScore: '80%', branch: 'علمي', category: 'طب', notes: 'سنة تحضيرية' },
    { id: '9', major: 'طب الأسنان', university: 'حلب', minScore: '80%', branch: 'علمي', category: 'طب', notes: 'سنة تحضيرية' },
    { id: '10', major: 'طب الأسنان', university: 'تشرين', minScore: '80%', branch: 'علمي', category: 'طب', notes: 'سنة تحضيرية' },
    { id: '11', major: 'طب الأسنان', university: 'البعث', minScore: '80%', branch: 'علمي', category: 'طب', notes: 'سنة تحضيرية' },
    { id: '12', major: 'طب الأسنان', university: 'حماه', minScore: '80%', branch: 'علمي', category: 'طب', notes: 'سنة تحضيرية' },
    { id: '13', major: 'الصيدلة', university: 'دمشق', minScore: '80%', branch: 'علمي', category: 'طب', notes: 'سنة تحضيرية' },
    { id: '14', major: 'الصيدلة', university: 'حلب', minScore: '80%', branch: 'علمي', category: 'طب', notes: 'سنة تحضيرية' },
    { id: '15', major: 'الصيدلة', university: 'تشرين', minScore: '80%', branch: 'علمي', category: 'طب', notes: 'سنة تحضيرية' },
    { id: '16', major: 'الصيدلة', university: 'البعث', minScore: '80%', branch: 'علمي', category: 'طب', notes: 'سنة تحضيرية' },
    
    // كليات الهندسة - 75%
    { id: '17', major: 'الهندسة المعلوماتية', university: 'دمشق', minScore: '75%', branch: 'علمي', category: 'هندسة' },
    { id: '18', major: 'الهندسة المعلوماتية', university: 'حلب', minScore: '75%', branch: 'علمي', category: 'هندسة' },
    { id: '19', major: 'الهندسة المعلوماتية', university: 'اللاذقية', minScore: '75%', branch: 'علمي', category: 'هندسة' },
    { id: '20', major: 'الهندسة المعلوماتية', university: 'ادلب', minScore: '75%', branch: 'علمي', category: 'هندسة' },
    { id: '21', major: 'الهندسة المعلوماتية', university: 'حمص', minScore: '75%', branch: 'علمي', category: 'هندسة' },
    { id: '22', major: 'الهندسة المدنية', university: 'دمشق', minScore: '75%', branch: 'علمي', category: 'هندسة' },
    { id: '23', major: 'الهندسة المدنية', university: 'حلب', minScore: '75%', branch: 'علمي', category: 'هندسة' },
    { id: '24', major: 'الهندسة المدنية', university: 'اللاذقية', minScore: '75%', branch: 'علمي', category: 'هندسة' },
    { id: '25', major: 'الهندسة المدنية', university: 'حمص', minScore: '75%', branch: 'علمي', category: 'هندسة' },
    { id: '26', major: 'الهندسة المدنية', university: 'حماه', minScore: '75%', branch: 'علمي', category: 'هندسة' },
    { id: '27', major: 'الهندسة المدنية', university: 'ادلب', minScore: '75%', branch: 'علمي', category: 'هندسة' },
    { id: '28', major: 'الهندسة المعمارية', university: 'دمشق', minScore: '75%', branch: 'علمي', category: 'هندسة', notes: 'يتطلب اختبار رسم' },
    { id: '29', major: 'الهندسة المعمارية', university: 'حلب', minScore: '75%', branch: 'علمي', category: 'هندسة', notes: 'يتطلب اختبار رسم' },
    { id: '30', major: 'الهندسة المعمارية', university: 'اللاذقية', minScore: '75%', branch: 'علمي', category: 'هندسة', notes: 'يتطلب اختبار رسم' },
    { id: '31', major: 'الهندسة المعمارية', university: 'حمص', minScore: '75%', branch: 'علمي', category: 'هندسة', notes: 'يتطلب اختبار رسم' },
    { id: '32', major: 'الهندسة المعمارية', university: 'حماه', minScore: '75%', branch: 'علمي', category: 'هندسة', notes: 'يتطلب اختبار رسم' },
    { id: '33', major: 'الهندسة المعمارية', university: 'طرطوس', minScore: '75%', branch: 'علمي', category: 'هندسة', notes: 'يتطلب اختبار رسم' },
    { id: '34', major: 'الهندسة المعمارية', university: 'ادلب', minScore: '75%', branch: 'علمي', category: 'هندسة', notes: 'يتطلب اختبار رسم' },
    { id: '35', major: 'هندسة الاتصالات والإلكترونيات', university: 'دمشق', minScore: '75%', branch: 'علمي', category: 'هندسة' },
    { id: '36', major: 'هندسة الحواسيب والأتمتة', university: 'دمشق', minScore: '75%', branch: 'علمي', category: 'هندسة' },
    { id: '37', major: 'هندسة الطاقة الكهربائية', university: 'دمشق', minScore: '75%', branch: 'علمي', category: 'هندسة' },
    { id: '38', major: 'هندسة الطاقة الكهربائية', university: 'السويداء', minScore: '75%', branch: 'علمي', category: 'هندسة' },
    { id: '39', major: 'هندسة التصميم الميكانيكي', university: 'دمشق', minScore: '75%', branch: 'علمي', category: 'هندسة' },
    { id: '40', major: 'الهندسة الطبية', university: 'دمشق', minScore: '75%', branch: 'علمي', category: 'هندسة' },
    { id: '41', major: 'الهندسة الطبية', university: 'اللاذقية', minScore: '75%', branch: 'علمي', category: 'هندسة' },
    { id: '42', major: 'الهندسة الميكانيكية', university: 'دمشق', minScore: '75%', branch: 'علمي', category: 'هندسة' },
    { id: '43', major: 'هندسة الاتصالات', university: 'حلب', minScore: '75%', branch: 'علمي', category: 'هندسة' },
    { id: '44', major: 'هندسة الحواسيب', university: 'حلب', minScore: '75%', branch: 'علمي', category: 'هندسة' },
    { id: '45', major: 'الهندسة الكهربائية', university: 'حلب', minScore: '75%', branch: 'علمي', category: 'هندسة' },
    { id: '46', major: 'الهندسة الميكاترونية', university: 'حلب', minScore: '75%', branch: 'علمي', category: 'هندسة' },
    { id: '47', major: 'الهندسة النووية', university: 'حلب', minScore: '75%', branch: 'علمي', category: 'هندسة' },
    { id: '48', major: 'الهندسة الصناعية', university: 'حلب', minScore: '75%', branch: 'علمي', category: 'هندسة' },
    { id: '49', major: 'الهندسة الكيميائية', university: 'حمص', minScore: '75%', branch: 'علمي', category: 'هندسة' },
    { id: '50', major: 'الهندسة البيئية', university: 'حمص', minScore: '75%', branch: 'علمي', category: 'هندسة' },
    { id: '51', major: 'الهندسة الغذائية', university: 'حمص', minScore: '75%', branch: 'علمي', category: 'هندسة' },
    { id: '52', major: 'الهندسة البحرية', university: 'اللاذقية', minScore: '75%', branch: 'علمي', category: 'هندسة' },
    
    // الطب البيطري والزراعة - 60%
    { id: '53', major: 'الطب البيطري', university: 'درعا', minScore: '60%', branch: 'علمي', category: 'زراعة وبيطرة' },
    { id: '54', major: 'الطب البيطري', university: 'ادلب', minScore: '60%', branch: 'علمي', category: 'زراعة وبيطرة' },
    { id: '55', major: 'الطب البيطري', university: 'حماه', minScore: '60%', branch: 'علمي', category: 'زراعة وبيطرة' },
    { id: '56', major: 'الطب البيطري', university: 'دير الزور', minScore: '60%', branch: 'علمي', category: 'زراعة وبيطرة' },
    { id: '57', major: 'الهندسة الزراعية', university: 'دمشق', minScore: '60%', branch: 'علمي', category: 'زراعة وبيطرة' },
    { id: '58', major: 'الهندسة الزراعية', university: 'السويداء', minScore: '60%', branch: 'علمي', category: 'زراعة وبيطرة' },
    { id: '59', major: 'الهندسة الزراعية', university: 'القنيطرة', minScore: '60%', branch: 'علمي', category: 'زراعة وبيطرة' },
    { id: '60', major: 'الهندسة الزراعية', university: 'حلب', minScore: '60%', branch: 'علمي', category: 'زراعة وبيطرة' },
    { id: '61', major: 'الهندسة الزراعية', university: 'ادلب', minScore: '60%', branch: 'علمي', category: 'زراعة وبيطرة' },
    { id: '62', major: 'الهندسة الزراعية', university: 'اللاذقية', minScore: '60%', branch: 'علمي', category: 'زراعة وبيطرة' },
    { id: '63', major: 'الهندسة الزراعية', university: 'طرطوس', minScore: '60%', branch: 'علمي', category: 'زراعة وبيطرة' },
    { id: '64', major: 'الهندسة الزراعية', university: 'حمص', minScore: '60%', branch: 'علمي', category: 'زراعة وبيطرة' },
    { id: '65', major: 'الهندسة الزراعية', university: 'حماه', minScore: '60%', branch: 'علمي', category: 'زراعة وبيطرة' },
    { id: '66', major: 'الهندسة الزراعية', university: 'دير الزور', minScore: '60%', branch: 'علمي', category: 'زراعة وبيطرة' },
    { id: '67', major: 'التمريض', university: 'حلب', minScore: '60%', branch: 'علمي', category: 'صحة' },
    { id: '68', major: 'التمريض', university: 'اللاذقية', minScore: '60%', branch: 'علمي', category: 'صحة' },
    { id: '69', major: 'التمريض', university: 'حماه', minScore: '60%', branch: 'علمي', category: 'صحة' },
    { id: '70', major: 'التمريض', university: 'دير الزور', minScore: '60%', branch: 'علمي', category: 'صحة' },
    
    // كليات العلوم - 50%
    { id: '71', major: 'الاقتصاد', university: 'دمشق', minScore: '50%', branch: 'علمي وأدبي', category: 'اقتصاد وإدارة' },
    { id: '72', major: 'الاقتصاد', university: 'درعا', minScore: '50%', branch: 'علمي وأدبي', category: 'اقتصاد وإدارة' },
    { id: '73', major: 'الاقتصاد', university: 'القنيطرة', minScore: '50%', branch: 'علمي وأدبي', category: 'اقتصاد وإدارة' },
    { id: '74', major: 'الاقتصاد', university: 'السويداء', minScore: '50%', branch: 'علمي وأدبي', category: 'اقتصاد وإدارة' },
    { id: '75', major: 'الاقتصاد', university: 'حلب', minScore: '50%', branch: 'علمي وأدبي', category: 'اقتصاد وإدارة' },
    { id: '76', major: 'الاقتصاد', university: 'اعزاز / حلب', minScore: '50%', branch: 'علمي وأدبي', category: 'اقتصاد وإدارة' },
    { id: '77', major: 'الاقتصاد', university: 'اللاذقية', minScore: '50%', branch: 'علمي وأدبي', category: 'اقتصاد وإدارة' },
    { id: '78', major: 'الاقتصاد', university: 'حمص', minScore: '50%', branch: 'علمي وأدبي', category: 'اقتصاد وإدارة' },
    { id: '79', major: 'الاقتصاد', university: 'طرطوس', minScore: '50%', branch: 'علمي وأدبي', category: 'اقتصاد وإدارة' },
    { id: '80', major: 'الاقتصاد', university: 'حماه', minScore: '50%', branch: 'علمي وأدبي', category: 'اقتصاد وإدارة' },
    { id: '81', major: 'الاقتصاد', university: 'دير الزور', minScore: '50%', branch: 'علمي وأدبي', category: 'اقتصاد وإدارة' },
    { id: '82', major: 'الاقتصاد', university: 'ادلب', minScore: '50%', branch: 'علمي وأدبي', category: 'اقتصاد وإدارة' },
    
    // علوم الحياة
    { id: '83', major: 'علوم الحياة', university: 'دمشق', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '84', major: 'علوم الحياة', university: 'درعا', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '85', major: 'علوم الحياة', university: 'السويداء', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '86', major: 'علوم الحياة', university: 'حلب', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '87', major: 'علوم الحياة', university: 'ادلب', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '88', major: 'علوم الحياة', university: 'اللاذقية', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '89', major: 'علوم الحياة', university: 'حمص', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '90', major: 'علوم الحياة', university: 'طرطوس', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '91', major: 'علوم الحياة', university: 'دير الزور', minScore: '50%', branch: 'علمي', category: 'علوم' },
    
    // الجيولوجيا
    { id: '92', major: 'الجيولوجيا', university: 'دمشق', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '93', major: 'الجيولوجيا', university: 'حلب', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '94', major: 'الجيولوجيا', university: 'اللاذقية', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '95', major: 'الجيولوجيا', university: 'حمص', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '96', major: 'الجيولوجيا', university: 'دير الزور', minScore: '50%', branch: 'علمي', category: 'علوم' },
    
    // الرياضيات
    { id: '97', major: 'الرياضيات', university: 'دمشق', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '98', major: 'الرياضيات', university: 'القنيطرة', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '99', major: 'الرياضيات', university: 'درعا', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '100', major: 'الرياضيات', university: 'حلب', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '101', major: 'الرياضيات', university: 'ادلب', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '102', major: 'الرياضيات', university: 'اللاذقية', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '103', major: 'الرياضيات', university: 'حمص', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '104', major: 'الرياضيات', university: 'حماه', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '105', major: 'الرياضيات', university: 'طرطوس', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '106', major: 'الرياضيات', university: 'دير الزور', minScore: '50%', branch: 'علمي', category: 'علوم' },
    
    // الفيزياء
    { id: '107', major: 'الفيزياء', university: 'دمشق', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '108', major: 'الفيزياء', university: 'حلب', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '109', major: 'الفيزياء', university: 'ادلب', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '110', major: 'الفيزياء', university: 'اللاذقية', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '111', major: 'الفيزياء', university: 'حمص', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '112', major: 'الفيزياء', university: 'حماه', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '113', major: 'الفيزياء', university: 'طرطوس', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '114', major: 'الفيزياء', university: 'دير الزور', minScore: '50%', branch: 'علمي', category: 'علوم' },
    
    // الكيمياء
    { id: '115', major: 'الكيمياء', university: 'دمشق', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '116', major: 'الكيمياء', university: 'حلب', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '117', major: 'الكيمياء', university: 'ادلب', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '118', major: 'الكيمياء', university: 'اللاذقية', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '119', major: 'الكيمياء', university: 'حمص', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '120', major: 'الكيمياء', university: 'طرطوس', minScore: '50%', branch: 'علمي', category: 'علوم' },
    { id: '121', major: 'الكيمياء', university: 'دير الزور', minScore: '50%', branch: 'علمي', category: 'علوم' },
    
    // العلوم الصحية
    { id: '122', major: 'العلوم الصحية - تقويم الكلام واللغة', university: 'دمشق', minScore: '50%', branch: 'علمي', category: 'صحة' },
    { id: '123', major: 'العلوم الصحية - السمعيات', university: 'دمشق', minScore: '50%', branch: 'علمي', category: 'صحة' },
    { id: '124', major: 'العلوم الصحية - العلاج الوظيفي', university: 'دمشق', minScore: '50%', branch: 'علمي', category: 'صحة' },
    { id: '125', major: 'العلوم الصحية - علم النفس السريري', university: 'دمشق', minScore: '50%', branch: 'علمي', category: 'صحة' },
    { id: '126', major: 'العلوم الصحية - الأجهزة التقويمية', university: 'دمشق', minScore: '50%', branch: 'علمي', category: 'صحة' },
    { id: '127', major: 'العلوم الصحية - التشخيص والعلاج الشعاعي', university: 'دمشق', minScore: '50%', branch: 'علمي', category: 'صحة' },
    { id: '128', major: 'العلوم الصحية - إدارة معلومات صحية', university: 'دمشق', minScore: '50%', branch: 'علمي', category: 'صحة' },
    { id: '129', major: 'العلوم الصحية', university: 'حلب', minScore: '50%', branch: 'علمي', category: 'صحة' },
    { id: '130', major: 'العلوم الصحية - تغذية', university: 'حمص', minScore: '50%', branch: 'علمي', category: 'صحة' },
    { id: '131', major: 'العلوم الصحية - مخابر', university: 'حمص', minScore: '50%', branch: 'علمي', category: 'صحة' },
    { id: '132', major: 'العلوم الصحية - معالجة فيزيائية', university: 'حمص', minScore: '50%', branch: 'علمي', category: 'صحة' },
    { id: '133', major: 'العلوم الصحية - التخدير', university: 'ادلب', minScore: '50%', branch: 'علمي', category: 'صحة' },
    { id: '134', major: 'العلوم الصحية - الطوارئ', university: 'ادلب', minScore: '50%', branch: 'علمي', category: 'صحة' },
    { id: '135', major: 'العلوم الصحية - التمريض', university: 'ادلب', minScore: '50%', branch: 'علمي', category: 'صحة' },
    { id: '136', major: 'العلوم البيئية', university: 'دمشق', minScore: '50%', branch: 'علمي', category: 'علوم' },
    
    // اللغات - علمي وأدبي
    { id: '137', major: 'اللغة العربية', university: 'دمشق', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '138', major: 'اللغة العربية', university: 'القنيطرة', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '139', major: 'اللغة العربية', university: 'درعا', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '140', major: 'اللغة العربية', university: 'السويداء', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '141', major: 'اللغة العربية', university: 'حلب', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '142', major: 'اللغة العربية', university: 'اعزاز / حلب', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '143', major: 'اللغة العربية', university: 'ادلب', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '144', major: 'اللغة العربية', university: 'الدانا / ادلب', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '145', major: 'اللغة العربية', university: 'اللاذقية', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '146', major: 'اللغة العربية', university: 'حمص', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '147', major: 'اللغة العربية', university: 'حماه', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '148', major: 'اللغة العربية', university: 'طرطوس', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '149', major: 'اللغة العربية', university: 'دير الزور', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    
    { id: '150', major: 'اللغة الإنكليزية', university: 'دمشق', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '151', major: 'اللغة الإنكليزية', university: 'درعا', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '152', major: 'اللغة الإنكليزية', university: 'حلب', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '153', major: 'اللغة الإنكليزية', university: 'اعزاز / حلب', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '154', major: 'اللغة الإنكليزية', university: 'ادلب', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '155', major: 'اللغة الإنكليزية', university: 'الدانا / ادلب', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '156', major: 'اللغة الإنكليزية', university: 'اللاذقية', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '157', major: 'اللغة الإنكليزية', university: 'طرطوس', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '158', major: 'اللغة الإنكليزية', university: 'حمص', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '159', major: 'اللغة الإنكليزية', university: 'حماه', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '160', major: 'اللغة الإنكليزية', university: 'دير الزور', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    
    { id: '161', major: 'اللغة الفرنسية', university: 'دمشق', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '162', major: 'اللغة الفرنسية', university: 'السويداء', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '163', major: 'اللغة الفرنسية', university: 'حلب', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '164', major: 'اللغة الفرنسية', university: 'اللاذقية', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '165', major: 'اللغة الفرنسية', university: 'حمص', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '166', major: 'اللغة الفرنسية', university: 'طرطوس', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '167', major: 'اللغة الفرنسية', university: 'دير الزور', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    
    // الحقوق والعلوم الإنسانية
    { id: '168', major: 'الحقوق', university: 'دمشق', minScore: '50%', branch: 'علمي وأدبي', category: 'حقوق' },
    { id: '169', major: 'الحقوق', university: 'درعا', minScore: '50%', branch: 'علمي وأدبي', category: 'حقوق' },
    { id: '170', major: 'الحقوق', university: 'القنيطرة', minScore: '50%', branch: 'علمي وأدبي', category: 'حقوق' },
    { id: '171', major: 'الحقوق', university: 'حلب', minScore: '50%', branch: 'علمي وأدبي', category: 'حقوق' },
    { id: '172', major: 'الحقوق', university: 'اعزاز / حلب', minScore: '50%', branch: 'علمي وأدبي', category: 'حقوق' },
    { id: '173', major: 'الحقوق', university: 'ادلب', minScore: '50%', branch: 'علمي وأدبي', category: 'حقوق' },
    { id: '174', major: 'الحقوق', university: 'اللاذقية', minScore: '50%', branch: 'علمي وأدبي', category: 'حقوق' },
    { id: '175', major: 'الحقوق', university: 'حمص', minScore: '50%', branch: 'علمي وأدبي', category: 'حقوق' },
    { id: '176', major: 'الحقوق', university: 'دير الزور', minScore: '50%', branch: 'علمي وأدبي', category: 'حقوق' },
    
    { id: '177', major: 'الفلسفة', university: 'دمشق', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '178', major: 'الفلسفة', university: 'السويداء', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '179', major: 'الفلسفة', university: 'حلب', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '180', major: 'الفلسفة', university: 'اللاذقية', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '181', major: 'الفلسفة', university: 'حمص', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    
    { id: '182', major: 'علم الاجتماع', university: 'دمشق', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '183', major: 'علم الاجتماع', university: 'السويداء', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '184', major: 'علم الاجتماع', university: 'درعا', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '185', major: 'علم الاجتماع', university: 'حلب', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '186', major: 'علم الاجتماع', university: 'اعزاز / حلب', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '187', major: 'علم الاجتماع', university: 'اللاذقية', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '188', major: 'علم الاجتماع', university: 'دير الزور', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    
    { id: '189', major: 'الجغرافية', university: 'دمشق', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '190', major: 'الجغرافية', university: 'السويداء', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '191', major: 'الجغرافية', university: 'حلب', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '192', major: 'الجغرافية', university: 'اعزاز / حلب', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '193', major: 'الجغرافية', university: 'ادلب', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '194', major: 'الجغرافية', university: 'اللاذقية', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    { id: '195', major: 'الجغرافية', university: 'طرطوس', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    
    { id: '196', major: 'التاريخ', university: 'دمشق', minScore: '50%', branch: 'أدبي', category: 'آداب' },
    { id: '197', major: 'التاريخ', university: 'السويداء', minScore: '50%', branch: 'أدبي', category: 'آداب' },
    { id: '198', major: 'التاريخ', university: 'حلب', minScore: '50%', branch: 'أدبي', category: 'آداب' },
    { id: '199', major: 'التاريخ', university: 'اعزاز / حلب', minScore: '50%', branch: 'أدبي', category: 'آداب' },
    { id: '200', major: 'التاريخ', university: 'ادلب', minScore: '50%', branch: 'أدبي', category: 'آداب' },
    { id: '201', major: 'التاريخ', university: 'اللاذقية', minScore: '50%', branch: 'أدبي', category: 'آداب' },
    { id: '202', major: 'التاريخ', university: 'حمص', minScore: '50%', branch: 'أدبي', category: 'آداب' },
    { id: '203', major: 'التاريخ', university: 'دير الزور', minScore: '50%', branch: 'أدبي', category: 'آداب' },
    
    { id: '204', major: 'الآثار', university: 'دمشق', minScore: '50%', branch: 'أدبي', category: 'آداب' },
    { id: '205', major: 'الآثار', university: 'السويداء', minScore: '50%', branch: 'أدبي', category: 'آداب' },
    { id: '206', major: 'الآثار', university: 'حلب', minScore: '50%', branch: 'أدبي', category: 'آداب' },
    
    { id: '207', major: 'الإعلام', university: 'دمشق', minScore: '50%', branch: 'علمي وأدبي', category: 'آداب' },
    
    // التربية
    { id: '208', major: 'التربية - الإرشاد النفسي', university: 'دمشق', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية' },
    { id: '209', major: 'التربية - الإرشاد النفسي', university: 'درعا', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية' },
    { id: '210', major: 'التربية - الإرشاد النفسي', university: 'السويداء', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية' },
    { id: '211', major: 'التربية - الإرشاد النفسي', university: 'حلب', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية' },
    { id: '212', major: 'التربية - الإرشاد النفسي', university: 'اعزاز / حلب', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية' },
    { id: '213', major: 'التربية - الإرشاد النفسي', university: 'ادلب', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية' },
    { id: '214', major: 'التربية - الإرشاد النفسي', university: 'اللاذقية', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية' },
    { id: '215', major: 'التربية - الإرشاد النفسي', university: 'حمص', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية' },
    { id: '216', major: 'التربية - الإرشاد النفسي', university: 'طرطوس', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية' },
    
    { id: '217', major: 'التربية - معلم صف', university: 'دمشق', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية' },
    { id: '218', major: 'التربية - معلم صف', university: 'القنيطرة', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية' },
    { id: '219', major: 'التربية - معلم صف', university: 'درعا', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية' },
    { id: '220', major: 'التربية - معلم صف', university: 'السويداء', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية' },
    { id: '221', major: 'التربية - معلم صف', university: 'حلب', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية' },
    { id: '222', major: 'التربية - معلم صف', university: 'اعزاز / حلب', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية' },
    { id: '223', major: 'التربية - معلم صف', university: 'ادلب', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية' },
    { id: '224', major: 'التربية - معلم صف', university: 'الدانا / ادلب', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية' },
    { id: '225', major: 'التربية - معلم صف', university: 'اللاذقية', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية' },
    { id: '226', major: 'التربية - معلم صف', university: 'حمص', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية' },
    { id: '227', major: 'التربية - معلم صف', university: 'حماه', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية' },
    { id: '228', major: 'التربية - معلم صف', university: 'طرطوس', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية' },
    { id: '229', major: 'التربية - معلم صف', university: 'دير الزور', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية' },
    
    { id: '230', major: 'رياض الأطفال', university: 'دمشق', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية', notes: 'فقط إناث' },
    { id: '231', major: 'رياض الأطفال', university: 'حمص', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية', notes: 'فقط إناث' },
    { id: '232', major: 'رياض الأطفال', university: 'دير الزور', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية', notes: 'فقط إناث' },
    
    { id: '233', major: 'علم النفس', university: 'دمشق', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية' },
    { id: '234', major: 'علم النفس', university: 'القنيطرة', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية' },
    { id: '235', major: 'علم النفس', university: 'حمص', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية' },
    
    { id: '236', major: 'التربية الخاصة', university: 'دمشق', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية' },
    { id: '237', major: 'التربية الخاصة', university: 'اعزاز / حلب', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية' },
    { id: '238', major: 'التربية الخاصة', university: 'حماه', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية' },
    
    { id: '239', major: 'طرائق التدريس والمناهج', university: 'دمشق', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية' },
    { id: '240', major: 'طرائق التدريس والمناهج', university: 'حلب', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية' },
    { id: '241', major: 'طرائق التدريس والمناهج', university: 'اللاذقية', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية' },
    { id: '242', major: 'طرائق التدريس والمناهج', university: 'حمص', minScore: '50%', branch: 'علمي وأدبي', category: 'تربية' },
    
    // الشريعة والعلوم السياسية
    { id: '243', major: 'الشريعة', university: 'دمشق', minScore: '50%', branch: 'علمي وأدبي', category: 'شريعة' },
    { id: '244', major: 'الشريعة', university: 'حلب', minScore: '50%', branch: 'علمي وأدبي', category: 'شريعة' },
    { id: '245', major: 'الشريعة', university: 'ادلب', minScore: '50%', branch: 'علمي وأدبي', category: 'شريعة' },
    
    { id: '246', major: 'العلوم السياسية', university: 'دمشق', minScore: '50%', branch: 'علمي وأدبي', category: 'حقوق' },
    { id: '247', major: 'العلوم السياسية', university: 'ادلب', minScore: '50%', branch: 'علمي وأدبي', category: 'حقوق' },
    
    // السياحة
    { id: '248', major: 'السياحة', university: 'دمشق', minScore: '50%', branch: 'علمي وأدبي', category: 'سياحة' },
    { id: '249', major: 'السياحة', university: 'حمص', minScore: '50%', branch: 'علمي وأدبي', category: 'سياحة' },
    { id: '250', major: 'السياحة', university: 'طرطوس', minScore: '50%', branch: 'علمي وأدبي', category: 'سياحة' },
    
    // الفنون الجميلة
    { id: '251', major: 'الفنون الجميلة', university: 'دمشق', minScore: '50%', branch: 'علمي وأدبي', category: 'فنون', notes: 'يتطلب اختبار' },
    { id: '252', major: 'الفنون الجميلة', university: 'السويداء', minScore: '50%', branch: 'علمي وأدبي', category: 'فنون', notes: 'يتطلب اختبار' },
    { id: '253', major: 'الفنون الجميلة التطبيقية', university: 'حلب', minScore: '50%', branch: 'علمي وأدبي', category: 'فنون', notes: 'يتطلب اختبار' },
    { id: '254', major: 'الفنون الجميلة', university: 'اللاذقية', minScore: '50%', branch: 'علمي وأدبي', category: 'فنون', notes: 'يتطلب اختبار' },
    
    // المعاهد التقانية
    { id: '255', major: 'المعهد التقاني الهندسي', university: 'دمشق', minScore: '50%', branch: 'علمي', category: 'معاهد' },
    { id: '256', major: 'المعهد التقاني الهندسي', university: 'درعا', minScore: '50%', branch: 'علمي', category: 'معاهد' },
    { id: '257', major: 'المعهد التقاني الهندسي', university: 'حلب', minScore: '50%', branch: 'علمي', category: 'معاهد' },
    { id: '258', major: 'المعهد التقاني الهندسي', university: 'ادلب', minScore: '50%', branch: 'علمي', category: 'معاهد' },
    { id: '259', major: 'المعهد التقاني الهندسي', university: 'اللاذقية', minScore: '50%', branch: 'علمي', category: 'معاهد' },
    { id: '260', major: 'المعهد التقاني الهندسي', university: 'حمص', minScore: '50%', branch: 'علمي', category: 'معاهد' },
    { id: '261', major: 'المعهد التقاني الهندسي', university: 'حماه', minScore: '50%', branch: 'علمي', category: 'معاهد' },
    { id: '262', major: 'المعهد التقاني الهندسي', university: 'طرطوس', minScore: '50%', branch: 'علمي', category: 'معاهد' },
    { id: '263', major: 'المعهد التقاني الهندسي', university: 'دير الزور', minScore: '50%', branch: 'علمي', category: 'معاهد' },
    { id: '264', major: 'المعهد التقاني الهندسي', university: 'الحسكة', minScore: '50%', branch: 'علمي', category: 'معاهد' },
    
    { id: '265', major: 'المعهد التقاني لطب الأسنان (تعويضات)', university: 'دمشق', minScore: '50%', branch: 'علمي', category: 'معاهد' },
    { id: '266', major: 'المعهد التقاني لطب الأسنان (تعويضات)', university: 'حلب', minScore: '50%', branch: 'علمي', category: 'معاهد' },
    { id: '267', major: 'المعهد التقاني لطب الأسنان (تعويضات)', university: 'اللاذقية', minScore: '50%', branch: 'علمي', category: 'معاهد' },
    { id: '268', major: 'المعهد التقاني لطب الأسنان (تعويضات)', university: 'حماه', minScore: '50%', branch: 'علمي', category: 'معاهد' },
    
    { id: '269', major: 'المعهد التقاني لطب الأسنان (مساعد طبيب)', university: 'دمشق', minScore: '50%', branch: 'علمي', category: 'معاهد' },
    { id: '270', major: 'المعهد التقاني لطب الأسنان (مساعد طبيب)', university: 'حلب', minScore: '50%', branch: 'علمي', category: 'معاهد' },
    { id: '271', major: 'المعهد التقاني لطب الأسنان (مساعد طبيب)', university: 'حمص', minScore: '50%', branch: 'علمي', category: 'معاهد' },
    { id: '272', major: 'المعهد التقاني لطب الأسنان (مساعد طبيب)', university: 'اللاذقية', minScore: '50%', branch: 'علمي', category: 'معاهد' },
    { id: '273', major: 'المعهد التقاني لطب الأسنان (مساعد طبيب)', university: 'حماه', minScore: '50%', branch: 'علمي', category: 'معاهد' },
    
    { id: '274', major: 'المعهد التقاني للعلوم المالية والمصرفية', university: 'دمشق', minScore: '50%', branch: 'علمي وأدبي', category: 'معاهد' },
    { id: '275', major: 'المعهد التقاني للعلوم المالية والمصرفية', university: 'درعا', minScore: '50%', branch: 'علمي وأدبي', category: 'معاهد' },
    { id: '276', major: 'المعهد التقاني للعلوم المالية والمصرفية', university: 'حلب', minScore: '50%', branch: 'علمي وأدبي', category: 'معاهد' },
    { id: '277', major: 'المعهد التقاني للعلوم المالية والمصرفية', university: 'اللاذقية', minScore: '50%', branch: 'علمي وأدبي', category: 'معاهد' },
    { id: '278', major: 'المعهد التقاني للعلوم المالية والمصرفية', university: 'دير الزور', minScore: '50%', branch: 'علمي وأدبي', category: 'معاهد' },
    { id: '279', major: 'المعهد التقاني للعلوم المالية والمصرفية', university: 'ادلب', minScore: '50%', branch: 'علمي وأدبي', category: 'معاهد' },
    
    { id: '280', major: 'المعهد التقاني الزراعي', university: 'دمشق', minScore: '50%', branch: 'علمي', category: 'معاهد' },
    { id: '281', major: 'المعهد التقاني الزراعي', university: 'القنيطرة', minScore: '50%', branch: 'علمي', category: 'معاهد' },
    { id: '282', major: 'المعهد التقاني الزراعي', university: 'درعا', minScore: '50%', branch: 'علمي', category: 'معاهد' },
    { id: '283', major: 'المعهد التقاني الزراعي', university: 'السويداء', minScore: '50%', branch: 'علمي', category: 'معاهد' },
    { id: '284', major: 'المعهد التقاني الزراعي', university: 'حلب', minScore: '50%', branch: 'علمي', category: 'معاهد' },
    { id: '285', major: 'المعهد التقاني الزراعي', university: 'حمص', minScore: '50%', branch: 'علمي', category: 'معاهد' },
    { id: '286', major: 'المعهد التقاني الزراعي', university: 'حماه', minScore: '50%', branch: 'علمي', category: 'معاهد' },
    { id: '287', major: 'المعهد التقاني الزراعي', university: 'طرطوس', minScore: '50%', branch: 'علمي', category: 'معاهد' },
    { id: '288', major: 'المعهد التقاني الزراعي', university: 'دير الزور', minScore: '50%', branch: 'علمي', category: 'معاهد' },
    { id: '289', major: 'المعهد التقاني الزراعي', university: 'الحسكة', minScore: '50%', branch: 'علمي', category: 'معاهد' },
    
    { id: '290', major: 'المعهد التقاني الطبي - مخابر', university: 'دمشق', minScore: '50%', branch: 'علمي', category: 'معاهد' },
    { id: '291', major: 'المعهد التقاني الطبي - تخدير', university: 'دمشق', minScore: '50%', branch: 'علمي', category: 'معاهد' },
    { id: '292', major: 'المعهد التقاني الطبي - أشعة', university: 'دمشق', minScore: '50%', branch: 'علمي', category: 'معاهد' },
    { id: '293', major: 'المعهد التقاني الطبي - بصريات', university: 'دمشق', minScore: '50%', branch: 'علمي', category: 'معاهد' },
    { id: '294', major: 'المعهد التقاني الطبي - طوارئ', university: 'دمشق', minScore: '50%', branch: 'علمي', category: 'معاهد' },
    { id: '295', major: 'المعهد التقاني الطبي - معالجة فيزيائية', university: 'دمشق', minScore: '50%', branch: 'علمي', category: 'معاهد' },
    
    { id: '296', major: 'معهد العلوم السياحية والفندقية', university: 'دمشق', minScore: '50%', branch: 'علمي وأدبي', category: 'معاهد' },
    { id: '297', major: 'معهد العلوم السياحية والفندقية', university: 'ريف دمشق', minScore: '50%', branch: 'علمي وأدبي', category: 'معاهد' },
    { id: '298', major: 'معهد العلوم السياحية والفندقية', university: 'السويداء', minScore: '50%', branch: 'علمي وأدبي', category: 'معاهد' },
    { id: '299', major: 'معهد العلوم السياحية والفندقية', university: 'حلب', minScore: '50%', branch: 'علمي وأدبي', category: 'معاهد' },
    { id: '300', major: 'معهد العلوم السياحية والفندقية', university: 'اللاذقية', minScore: '50%', branch: 'علمي وأدبي', category: 'معاهد' },
    { id: '301', major: 'معهد العلوم السياحية والفندقية', university: 'حمص', minScore: '50%', branch: 'علمي وأدبي', category: 'معاهد' },
    { id: '302', major: 'معهد العلوم السياحية والفندقية', university: 'طرطوس', minScore: '50%', branch: 'علمي وأدبي', category: 'معاهد' },
    { id: '303', major: 'معهد العلوم السياحية والفندقية', university: 'حماه', minScore: '50%', branch: 'علمي وأدبي', category: 'معاهد' },
    { id: '304', major: 'معهد العلوم السياحية والفندقية', university: 'دير الزور', minScore: '50%', branch: 'علمي وأدبي', category: 'معاهد' },
    
    { id: '305', major: 'معهد الفنون التطبيقية', university: 'دمشق', minScore: '50%', branch: 'علمي وأدبي', category: 'معاهد', notes: 'يتطلب اختبار' },
    { id: '306', major: 'معهد الآثار والمتاحف', university: 'دمشق', minScore: '50%', branch: 'أدبي', category: 'معاهد' },
    { id: '307', major: 'معهد الإحصاء', university: 'دمشق', minScore: '50%', branch: 'علمي', category: 'معاهد' },
    { id: '308', major: 'معهد الإحصاء', university: 'اللاذقية', minScore: '50%', branch: 'علمي', category: 'معاهد' },
    { id: '309', major: 'معهد القانون', university: 'دمشق', minScore: '50%', branch: 'أدبي', category: 'معاهد' },
    
    { id: '310', major: 'معهد الشريعة للعلوم المتوسطة', university: 'دمشق', minScore: '50%', branch: 'علمي وأدبي', category: 'معاهد' },
    { id: '311', major: 'معهد الشريعة للعلوم المتوسطة', university: 'ريف دمشق', minScore: '50%', branch: 'علمي وأدبي', category: 'معاهد' },
    { id: '312', major: 'معهد الشريعة للعلوم المتوسطة', university: 'حلب', minScore: '50%', branch: 'علمي وأدبي', category: 'معاهد' },
    { id: '313', major: 'معهد الشريعة للعلوم المتوسطة', university: 'اللاذقية', minScore: '50%', branch: 'علمي وأدبي', category: 'معاهد' },
    { id: '314', major: 'معهد الشريعة للعلوم المتوسطة', university: 'حماه', minScore: '50%', branch: 'علمي وأدبي', category: 'معاهد' },
    { id: '315', major: 'معهد الشريعة للعلوم المتوسطة', university: 'ادلب', minScore: '50%', branch: 'علمي وأدبي', category: 'معاهد' },
    
    // معاهد ملتزمة
    { id: '316', major: 'المعهد التقاني للنفط والغاز', university: 'حمص', minScore: '50%', branch: 'علمي', category: 'معاهد', notes: 'ملتزم - فقط ذكور' },
    { id: '317', major: 'المعهد التقاني للنفط والغاز', university: 'دير الزور', minScore: '50%', branch: 'علمي', category: 'معاهد', notes: 'ملتزم - ذكور وإناث' },
    { id: '318', major: 'المعهد التقاني للنفط والغاز', university: 'بانياس / طرطوس', minScore: '50%', branch: 'علمي', category: 'معاهد', notes: 'ملتزم - ذكور وإناث' },
    { id: '319', major: 'المعهد التقاني للنفط والغاز', university: 'الرميلان / الحسكة', minScore: '50%', branch: 'علمي', category: 'معاهد', notes: 'ملتزم - فقط ذكور' },
    { id: '320', major: 'المعهد التقاني للخطوط الحديدية', university: 'حلب', minScore: '50%', branch: 'علمي', category: 'معاهد', notes: 'ملتزم - فقط ذكور' },
  ],
};
