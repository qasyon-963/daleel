export interface MindMapRequest {
  type: 'text' | 'pdf';
  content: string;
  purpose: 'revision' | 'summarization' | 'exam_prep' | 'understanding';
  language: 'ar' | 'en';
}

export interface MindMapResult {
  id: string;
  imageUrl: string;
  title: string;
  createdAt: Date;
}

export interface MindMapHistory {
  id: string;
  title: string;
  imageUrl: string;
  purpose: string;
  createdAt: string;
}
