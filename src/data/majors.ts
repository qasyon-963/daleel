export interface Major {
  id: string;
  name: string;
  nameEn: string;
  category: string;
  duration: string;
  description: string;
  careerOpportunities: string[];
  prerequisites?: string[];
}

export const majorCategories = [
  { id: "medical", name: "العلوم الطبية", color: "text-red-600" },
  { id: "engineering", name: "الهندسة", color: "text-blue-600" },
  { id: "science", name: "العلوم", color: "text-green-600" },
  { id: "humanities", name: "العلوم الإنسانية", color: "text-purple-600" },
  { id: "social", name: "العلوم الاجتماعية", color: "text-orange-600" },
  { id: "agriculture", name: "الزراعة", color: "text-emerald-600" },
  { id: "business", name: "إدارة الأعمال", color: "text-indigo-600" },
];

export const majorsData: Major[] = [
  {
    id: "medicine",
    name: "الطب العام",
    nameEn: "General Medicine",
    category: "medical",
    duration: "6 سنوات",
    description: "تخصص الطب العام يهدف إلى إعداد أطباء مؤهلين لتشخيص وعلاج الأمراض المختلفة، ويشمل دراسة علوم التشريح والفيزيولوجيا والمرضية والدواء.",
    careerOpportunities: [
      "طبيب عام في المستشفيات والعيادات",
      "طبيب في القطاع الخاص",
      "طبيب في المراكز الصحية الحكومية",
      "الاختصاص في فروع الطب المختلفة",
      "العمل في مجال الطب الوقائي"
    ],
    prerequisites: ["الثانوية العلمية", "شهادة البكالوريا العلمية"]
  },
  {
    id: "dentistry",
    name: "طب الأسنان",
    nameEn: "Dentistry",
    category: "medical",
    duration: "5 سنوات",
    description: "تخصص طب الأسنان يركز على دراسة وعلاج أمراض الفم والأسنان واللثة، ويشمل الوقاية والعلاج والجراحة وتقويم الأسنان.",
    careerOpportunities: [
      "طبيب أسنان في العيادات الخاصة",
      "طبيب أسنان في المستشفيات",
      "اختصاصي في جراحة الفم والوجه والفكين",
      "اختصاصي في تقويم الأسنان",
      "العمل في مجال طب أسنان الأطفال"
    ]
  },
  {
    id: "pharmacy",
    name: "الصيدلة",
    nameEn: "Pharmacy",
    category: "medical",
    duration: "5 سنوات",
    description: "تخصص الصيدلة يهتم بدراسة الأدوية وتحضيرها وتصنيعها وتأثيراتها على الجسم، بالإضافة إلى دراسة الكيمياء الدوائية والسموم.",
    careerOpportunities: [
      "صيدلي في الصيدليات المجتمعية",
      "صيدلي في المستشفيات",
      "العمل في شركات الأدوية",
      "الرقابة الدوائية",
      "البحث والتطوير الدوائي"
    ]
  },
  {
    id: "civil-engineering",
    name: "الهندسة المدنية",
    nameEn: "Civil Engineering",
    category: "engineering",
    duration: "5 سنوات",
    description: "تخصص الهندسة المدنية يشمل تصميم وتنفيذ المشاريع الإنشائية مثل الجسور والمباني والطرق والسدود وأنظمة المياه والصرف الصحي.",
    careerOpportunities: [
      "مهندس في شركات المقاولات",
      "مهندس في الدوائر الحكومية",
      "مهندس استشاري",
      "مدير مشاريع إنشائية",
      "مهندس في شركات التطوير العقاري"
    ]
  },
  {
    id: "computer-science",
    name: "علوم الحاسوب",
    nameEn: "Computer Science",
    category: "science",
    duration: "4 سنوات",
    description: "تخصص علوم الحاسوب يركز على دراسة الخوارزميات وهياكل البيانات والبرمجة وتطوير البرامج والذكاء الاصطناعي وأمن المعلومات.",
    careerOpportunities: [
      "مطور برمجيات",
      "مهندس أنظمة",
      "محلل أنظمة",
      "مختص في أمن المعلومات",
      "مطور مواقع ويب وتطبيقات"
    ]
  },
  {
    id: "arabic-language",
    name: "اللغة العربية",
    nameEn: "Arabic Language",
    category: "humanities",
    duration: "4 سنوات",
    description: "تخصص اللغة العربية يهتم بدراسة النحو والصرف والبلاغة والأدب العربي والنقد الأدبي والشعر والنثر عبر العصور المختلفة.",
    careerOpportunities: [
      "مدرس في المدارس والجامعات",
      "باحث في التراث العربي",
      "كاتب ومؤلف",
      "محرر في دور النشر والصحف",
      "مترجم من وإلى اللغة العربية"
    ]
  },
  {
    id: "law",
    name: "القانون",
    nameEn: "Law",
    category: "social",
    duration: "4 سنوات",
    description: "تخصص القانون يدرس النظم القانونية والتشريعات والقوانين المدنية والجنائية والإدارية والدولية وأصول المحاكمات.",
    careerOpportunities: [
      "محامي في المحاكم",
      "مستشار قانوني في الشركات",
      "قاضي في المحاكم",
      "موظف في النيابة العامة",
      "مستشار قانوني في الدوائر الحكومية"
    ]
  },
  {
    id: "agriculture",
    name: "الإنتاج النباتي",
    nameEn: "Plant Production",
    category: "agriculture",
    duration: "4 سنوات",
    description: "تخصص الإنتاج النباتي يهتم بدراسة زراعة المحاصيل المختلفة وحمايتها من الآفات والأمراض وتحسين إنتاجيتها.",
    careerOpportunities: [
      "مهندس زراعي",
      "مرشد زراعي",
      "باحث في مجال الزراعة",
      "مدير مزرعة",
      "العمل في وزارة الزراعة"
    ]
  },
  {
    id: "business-admin",
    name: "إدارة الأعمال",
    nameEn: "Business Administration",
    category: "business",
    duration: "4 سنوات",
    description: "تخصص إدارة الأعمال يدرس مبادئ الإدارة والتسويق والمحاسبة والموارد البشرية والاقتصاد وإدارة المشاريع.",
    careerOpportunities: [
      "مدير في الشركات والمؤسسات",
      "مستشار إداري",
      "محلل مالي",
      "مسؤول تسويق",
      "رائد أعمال"
    ]
  }
];