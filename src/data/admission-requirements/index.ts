// ملف التصدير الرئيسي لجميع أنواع الشهادات
// لإضافة نوع شهادة جديد:
// 1. أنشئ ملف جديد بنفس البنية (مثل: arab-certificates.ts)
// 2. أضف import و export هنا

import { nonSyrianCertificate, type CertificateType, type AdmissionEntry } from './non-syrian-certificates';

export type { CertificateType, AdmissionEntry };

// قائمة جميع أنواع الشهادات المتاحة
export const certificateTypes: CertificateType[] = [
  nonSyrianCertificate,
  // أضف أنواع شهادات جديدة هنا:
  // arabCertificates,
  // regularSyrianCertificate,
];

// دالة للحصول على شهادة بواسطة المعرف
export const getCertificateById = (id: string): CertificateType | undefined => {
  return certificateTypes.find(cert => cert.id === id);
};

// قائمة الجامعات الفريدة
export const getUniqueUniversities = (entries: AdmissionEntry[]): string[] => {
  return [...new Set(entries.map(e => e.university))].sort();
};

// قائمة التخصصات الفريدة
export const getUniqueMajors = (entries: AdmissionEntry[]): string[] => {
  return [...new Set(entries.map(e => e.major))].sort();
};

// قائمة الفئات الفريدة
export const getUniqueCategories = (entries: AdmissionEntry[]): string[] => {
  return [...new Set(entries.map(e => e.category))].sort();
};

// فلترة البيانات
export const filterAdmissionEntries = (
  entries: AdmissionEntry[],
  filters: {
    search?: string;
    branch?: string;
    university?: string;
    category?: string;
  }
): AdmissionEntry[] => {
  return entries.filter(entry => {
    // فلترة البحث النصي
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesMajor = entry.major.toLowerCase().includes(searchLower);
      const matchesUniversity = entry.university.toLowerCase().includes(searchLower);
      const matchesNotes = entry.notes?.toLowerCase().includes(searchLower);
      if (!matchesMajor && !matchesUniversity && !matchesNotes) {
        return false;
      }
    }

    // فلترة الفرع
    if (filters.branch && filters.branch !== 'all') {
      if (entry.branch !== filters.branch && entry.branch !== 'علمي وأدبي') {
        return false;
      }
    }

    // فلترة الجامعة
    if (filters.university && filters.university !== 'all') {
      if (entry.university !== filters.university) {
        return false;
      }
    }

    // فلترة الفئة
    if (filters.category && filters.category !== 'all') {
      if (entry.category !== filters.category) {
        return false;
      }
    }

    return true;
  });
};
