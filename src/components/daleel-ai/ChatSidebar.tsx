import { Plus, MessageSquare, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { Conversation } from "./types";
import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";

interface ChatSidebarProps {
  conversations: Conversation[];
  currentConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
  onDeleteConversation: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const ChatSidebar = ({
  conversations,
  currentConversationId,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation,
  isOpen,
  onClose,
}: ChatSidebarProps) => {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed md:relative inset-y-0 right-0 z-50 w-72 bg-card border-l border-border",
          "flex flex-col transition-transform duration-300 ease-in-out",
          "md:translate-x-0",
          isOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"
        )}
      >
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h2 className="font-bold text-foreground">سجل المحادثات</h2>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={onNewConversation}
              className="h-8 w-8"
            >
              <Plus size={18} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 md:hidden"
            >
              <X size={18} />
            </Button>
          </div>
        </div>

        {/* Conversations List */}
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {conversations.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground text-sm">
                <MessageSquare className="mx-auto mb-2 opacity-50" size={32} />
                <p>لا توجد محادثات سابقة</p>
                <p className="text-xs mt-1">ابدأ محادثة جديدة!</p>
              </div>
            ) : (
              conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={cn(
                    "group relative rounded-lg cursor-pointer transition-colors",
                    currentConversationId === conversation.id
                      ? "bg-primary/10"
                      : "hover:bg-muted"
                  )}
                >
                  <button
                    onClick={() => onSelectConversation(conversation.id)}
                    className="w-full text-right p-3 pr-4"
                  >
                    <div className="flex items-start gap-2">
                      <MessageSquare
                        size={16}
                        className="mt-0.5 flex-shrink-0 text-muted-foreground"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {conversation.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {formatDistanceToNow(new Date(conversation.updated_at), {
                            addSuffix: true,
                            locale: ar,
                          })}
                        </p>
                      </div>
                    </div>
                  </button>

                  {/* Delete button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteConversation(conversation.id);
                    }}
                    className={cn(
                      "absolute left-2 top-1/2 -translate-y-1/2 h-7 w-7",
                      "opacity-0 group-hover:opacity-100 transition-opacity",
                      "text-muted-foreground hover:text-destructive"
                    )}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              ))
            )}
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <Button
            onClick={onNewConversation}
            className="w-full gap-2"
            variant="outline"
          >
            <Plus size={16} />
            محادثة جديدة
          </Button>
        </div>
      </aside>
    </>
  );
};
