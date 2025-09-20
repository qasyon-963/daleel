export interface University {
  id: string;
  name: string;
  nameEn: string;
  city: string;
  established: number;
  description: string;
  logo?: string;
  banner?: string;
  website?: string;
  faculties: Faculty[];
}

export interface Faculty {
  id: string;
  name: string;
  nameEn: string;
  majors: string[];
}

export const syrianUniversities: University[] = [
  {
    id: "damascus",
    name: "جامعة دمشق",
    nameEn: "University of Damascus",
    city: "دمشق",
    established: 1923,
    description: "أقدم وأعرق الجامعات السورية، تأسست عام 1923 وتضم العديد من الكليات والمعاهد المتخصصة في مختلف المجالات العلمية والإنسانية.",
    logo: "/src/assets/damascus-logo.png",
    banner: "/src/assets/damascus-university-banner.jpg",
    website: "www.damascusuniversity.edu.sy",
    faculties: [
      {
        id: "medicine",
        name: "كلية الطب",
        nameEn: "Faculty of Medicine",
        majors: ["الطب العام", "طب الأسنان", "الصيدلة"]
      },
      {
        id: "engineering",
        name: "كلية الهندسة المدنية",
        nameEn: "Faculty of Civil Engineering",
        majors: ["الهندسة المدنية", "الهندسة المعمارية", "هندسة المياه"]
      },
      {
        id: "letters",
        name: "كلية الآداب والعلوم الإنسانية",
        nameEn: "Faculty of Arts and Humanities",
        majors: ["اللغة العربية", "التاريخ", "الجغرافيا", "الفلسفة"]
      },
      {
        id: "science",
        name: "كلية العلوم",
        nameEn: "Faculty of Science",
        majors: ["الرياضيات", "الفيزياء", "الكيمياء", "علوم الحاسوب"]
      },
      {
        id: "law",
        name: "كلية الحقوق",
        nameEn: "Faculty of Law",
        majors: ["القانون", "العلوم السياسية"]
      }
    ]
  },
  {
    id: "aleppo",
    name: "جامعة حلب",
    nameEn: "University of Aleppo", 
    city: "حلب",
    established: 1958,
    description: "ثاني أكبر الجامعات السورية، تأسست عام 1958 وتشتهر بكلياتها الهندسية والطبية المتميزة.",
    logo: "/src/assets/aleppo-logo.png",
    banner: "/src/assets/aleppo-university-banner.jpg",
    website: "www.alepuniv.edu.sy",
    faculties: [
      {
        id: "medicine",
        name: "كلية الطب",
        nameEn: "Faculty of Medicine",
        majors: ["الطب العام", "طب الأسنان", "الصيدلة"]
      },
      {
        id: "engineering",
        name: "كلية الهندسة التقنية",
        nameEn: "Faculty of Technical Engineering",
        majors: ["الهندسة الميكانيكية", "الهندسة الكهربائية", "هندسة الحاسوب"]
      },
      {
        id: "science",
        name: "كلية العلوم",
        nameEn: "Faculty of Science",
        majors: ["الرياضيات", "الفيزياء", "الكيمياء", "علوم الحياة"]
      },
      {
        id: "agriculture",
        name: "كلية الزراعة",
        nameEn: "Faculty of Agriculture",
        majors: ["الإنتاج النباتي", "الإنتاج الحيواني", "علوم التربة"]
      }
    ]
  },
  {
    id: "tishreen",
    name: "جامعة تشرين",
    nameEn: "Tishreen University",
    city: "اللاذقية",
    established: 1971,
    description: "جامعة تشرين هي جامعة حكومية تقع في مدينة اللاذقية، تأسست عام 1971 وتشتهر بكلياتها البحرية والزراعية.",
    logo: "/src/assets/tishreen-logo.png",
    banner: "/src/assets/tishreen-university-banner.jpg",
    website: "www.tishreen.edu.sy",
    faculties: [
      {
        id: "medicine",
        name: "كلية الطب",
        nameEn: "Faculty of Medicine",
        majors: ["الطب العام", "طب الأسنان", "الصيدلة"]
      },
      {
        id: "engineering",
        name: "كلية الهندسة التقنية",
        nameEn: "Faculty of Technical Engineering",
        majors: ["الهندسة المدنية", "الهندسة البحرية", "هندسة البترول"]
      },
      {
        id: "agriculture",
        name: "كلية الزراعة",
        nameEn: "Faculty of Agriculture",
        majors: ["الإنتاج النباتي", "الإنتاج الحيواني", "الموارد الطبيعية"]
      },
      {
        id: "arts",
        name: "كلية الآداب",
        nameEn: "Faculty of Arts",
        majors: ["اللغة العربية", "اللغة الإنجليزية", "التاريخ"]
      }
    ]
  },
  {
    id: "baath",
    name: "جامعة البعث",
    nameEn: "Al-Baath University",
    city: "حمص",
    established: 1979,
    description: "جامعة البعث تقع في محافظة حمص، تأسست عام 1979 وتضم العديد من الكليات التخصصية.",
    website: "www.albaath-univ.edu.sy",
    faculties: [
      {
        id: "medicine",
        name: "كلية الطب",
        nameEn: "Faculty of Medicine",
        majors: ["الطب العام", "طب الأسنان", "الصيدلة"]
      },
      {
        id: "engineering",
        name: "كلية الهندسة",
        nameEn: "Faculty of Engineering",
        majors: ["الهندسة المدنية", "الهندسة الميكانيكية", "الهندسة الكهربائية"]
      },
      {
        id: "veterinary",
        name: "كلية الطب البيطري",
        nameEn: "Faculty of Veterinary Medicine",
        majors: ["الطب البيطري"]
      },
      {
        id: "science",
        name: "كلية العلوم",
        nameEn: "Faculty of Science",
        majors: ["الكيمياء", "الفيزياء", "الرياضيات", "علوم الحاسوب"]
      }
    ]
  },
  {
    id: "furat",
    name: "جامعة الفرات",
    nameEn: "Al-Furat University",
    city: "دير الزور",
    established: 2006,
    description: "جامعة الفرات تقع في محافظة دير الزور، تأسست عام 2006 وتخدم المنطقة الشرقية من سوريا.",
    website: "www.alfuratuniv.edu.sy",
    faculties: [
      {
        id: "medicine",
        name: "كلية الطب",
        nameEn: "Faculty of Medicine",
        majors: ["الطب العام"]
      },
      {
        id: "engineering",
        name: "كلية الهندسة التقنية",
        nameEn: "Faculty of Technical Engineering",
        majors: ["هندسة البترول", "الهندسة الميكانيكية"]
      },
      {
        id: "agriculture",
        name: "كلية الزراعة",
        nameEn: "Faculty of Agriculture",
        majors: ["الإنتاج النباتي", "الإنتاج الحيواني"]
      },
      {
        id: "arts",
        name: "كلية الآداب",
        nameEn: "Faculty of Arts",
        majors: ["اللغة العربية", "التاريخ"]
      }
    ]
  }
];