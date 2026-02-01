import { useState } from "react";
import { Download, ZoomIn, ZoomOut, RotateCcw, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface MindMapResultProps {
  imageUrl: string;
  title: string;
  onReset: () => void;
}

export const MindMapResult = ({ imageUrl, title, onReset }: MindMapResultProps) => {
  const [zoom, setZoom] = useState(1);
  const { toast } = useToast();

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.25, 0.5));
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${title || 'mind-map'}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast({
        title: "تم التحميل",
        description: "تم حفظ الخريطة الذهنية بنجاح",
      });
    } catch (error) {
      toast({
        title: "خطأ في التحميل",
        description: "حدث خطأ أثناء تحميل الصورة",
        variant: "destructive",
      });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const file = new File([blob], `${title || 'mind-map'}.png`, { type: 'image/png' });
        
        await navigator.share({
          title: title || 'خريطة ذهنية',
          files: [file],
        });
      } catch (error) {
        // User cancelled or share failed
      }
    } else {
      // Copy image URL to clipboard
      try {
        await navigator.clipboard.writeText(imageUrl);
        toast({
          title: "تم النسخ",
          description: "تم نسخ رابط الصورة",
        });
      } catch {
        toast({
          title: "خطأ",
          description: "لا يمكن نسخ الرابط",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleZoomOut}
            disabled={zoom <= 0.5}
          >
            <ZoomOut size={18} />
          </Button>
          <span className="text-sm font-medium w-16 text-center">
            {Math.round(zoom * 100)}%
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={handleZoomIn}
            disabled={zoom >= 3}
          >
            <ZoomIn size={18} />
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            className="gap-2"
          >
            <Share2 size={16} />
            <span className="hidden sm:inline">مشاركة</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            className="gap-2"
          >
            <Download size={16} />
            <span className="hidden sm:inline">تحميل</span>
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={onReset}
            className="gap-2"
          >
            <RotateCcw size={16} />
            <span className="hidden sm:inline">خريطة جديدة</span>
          </Button>
        </div>
      </div>

      {/* Image Container */}
      <div className="border border-border rounded-xl overflow-hidden bg-muted/30">
        <div 
          className="overflow-auto max-h-[60vh] p-4"
          style={{ cursor: zoom > 1 ? 'grab' : 'default' }}
        >
          <div 
            className="transition-transform duration-200 origin-top-left flex items-center justify-center min-h-[300px]"
            style={{ transform: `scale(${zoom})` }}
          >
            <img
              src={imageUrl}
              alt={title || "خريطة ذهنية"}
              className="max-w-full h-auto rounded-lg shadow-lg"
              draggable={false}
            />
          </div>
        </div>
      </div>

      {/* Title */}
      {title && (
        <div className="text-center">
          <h3 className="font-semibold text-lg text-foreground">{title}</h3>
        </div>
      )}
    </div>
  );
};
