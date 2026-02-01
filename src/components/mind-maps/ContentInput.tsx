import { useState, useRef } from "react";
import { FileText, Upload, X, Type, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface ContentInputProps {
  onContentChange: (content: string, type: 'text' | 'pdf') => void;
  isLoading?: boolean;
}

export const ContentInput = ({ onContentChange, isLoading }: ContentInputProps) => {
  const [inputType, setInputType] = useState<'text' | 'pdf'>('text');
  const [textContent, setTextContent] = useState('');
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [isExtractingPdf, setIsExtractingPdf] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleTextChange = (text: string) => {
    setTextContent(text);
    onContentChange(text, 'text');
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      toast({
        title: "نوع ملف غير مدعوم",
        description: "يرجى رفع ملف PDF فقط",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast({
        title: "حجم الملف كبير جداً",
        description: "الحد الأقصى لحجم الملف هو 10 ميجابايت",
        variant: "destructive",
      });
      return;
    }

    setPdfFile(file);
    setIsExtractingPdf(true);

    try {
      // Convert PDF to base64 for processing
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64 = event.target?.result as string;
        onContentChange(base64, 'pdf');
        setIsExtractingPdf(false);
      };
      reader.onerror = () => {
        toast({
          title: "خطأ في قراءة الملف",
          description: "حدث خطأ أثناء قراءة الملف، يرجى المحاولة مرة أخرى",
          variant: "destructive",
        });
        setIsExtractingPdf(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء معالجة الملف",
        variant: "destructive",
      });
      setIsExtractingPdf(false);
    }
  };

  const removePdf = () => {
    setPdfFile(null);
    onContentChange('', 'text');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      {/* Input Type Toggle */}
      <div className="flex gap-2 p-1 bg-muted rounded-lg">
        <button
          type="button"
          onClick={() => setInputType('text')}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-md text-sm font-medium transition-all",
            inputType === 'text'
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Type size={18} />
          <span>كتابة نص</span>
        </button>
        <button
          type="button"
          onClick={() => setInputType('pdf')}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-md text-sm font-medium transition-all",
            inputType === 'pdf'
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <FileText size={18} />
          <span>رفع PDF</span>
        </button>
      </div>

      {/* Text Input */}
      {inputType === 'text' && (
        <div className="space-y-2">
          <Textarea
            placeholder="الصق أو اكتب المحتوى الذي تريد تحويله إلى خريطة ذهنية..."
            value={textContent}
            onChange={(e) => handleTextChange(e.target.value)}
            className="min-h-[200px] resize-none text-base leading-relaxed"
            dir="auto"
            disabled={isLoading}
          />
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span>الحد الأدنى: 50 حرف</span>
            <span>{textContent.length} حرف</span>
          </div>
        </div>
      )}

      {/* PDF Upload */}
      {inputType === 'pdf' && (
        <div className="space-y-3">
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileSelect}
            className="hidden"
            disabled={isLoading || isExtractingPdf}
          />
          
          {!pdfFile ? (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
              className="w-full border-2 border-dashed border-border rounded-xl p-8 hover:border-primary/50 hover:bg-muted/50 transition-all duration-200 group"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Upload className="w-7 h-7 text-primary" />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-foreground">اضغط لرفع ملف PDF</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    الحد الأقصى: 10 ميجابايت
                  </p>
                </div>
              </div>
            </button>
          ) : (
            <div className="border border-border rounded-xl p-4 bg-muted/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    {isExtractingPdf ? (
                      <Loader2 className="w-5 h-5 text-primary animate-spin" />
                    ) : (
                      <FileText className="w-5 h-5 text-primary" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-sm text-foreground line-clamp-1">
                      {pdfFile.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {isExtractingPdf ? 'جاري القراءة...' : `${(pdfFile.size / 1024).toFixed(1)} KB`}
                    </p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={removePdf}
                  disabled={isLoading || isExtractingPdf}
                  className="hover:bg-destructive/10 hover:text-destructive"
                >
                  <X size={18} />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
