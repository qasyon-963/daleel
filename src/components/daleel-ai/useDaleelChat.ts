import { useState, useCallback, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Message, Conversation } from "./types";

export const useDaleelChat = (userId: string | null) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const { toast } = useToast();

  // Load conversations
  const loadConversations = useCallback(async () => {
    if (!userId) return;
    
    setIsLoadingHistory(true);
    try {
      const { data, error } = await supabase
        .from('conversations')
        .select('*')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setConversations(data || []);
    } catch (error) {
      console.error('Error loading conversations:', error);
    } finally {
      setIsLoadingHistory(false);
    }
  }, [userId]);

  // Load messages for a conversation
  const loadMessages = useCallback(async (conversationId: string) => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      
      // Map database messages to our Message type
      const mappedMessages: Message[] = (data || []).map(m => ({
        id: m.id,
        role: m.role as 'user' | 'assistant',
        content: m.content,
        created_at: m.created_at,
      }));
      
      setMessages(mappedMessages);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  }, []);

  // Select a conversation
  const selectConversation = useCallback(async (conversationId: string) => {
    const conversation = conversations.find(c => c.id === conversationId);
    if (conversation) {
      setCurrentConversation(conversation);
      await loadMessages(conversationId);
    }
  }, [conversations, loadMessages]);

  // Create new conversation
  const createConversation = useCallback(async (title: string = 'محادثة جديدة'): Promise<Conversation | null> => {
    if (!userId) return null;

    try {
      const { data, error } = await supabase
        .from('conversations')
        .insert({ user_id: userId, title })
        .select()
        .single();

      if (error) throw error;
      
      setConversations(prev => [data, ...prev]);
      setCurrentConversation(data);
      setMessages([]);
      return data;
    } catch (error) {
      console.error('Error creating conversation:', error);
      toast({
        title: "خطأ",
        description: "فشل إنشاء محادثة جديدة",
        variant: "destructive",
      });
      return null;
    }
  }, [userId, toast]);

  // Delete conversation
  const deleteConversation = useCallback(async (conversationId: string) => {
    try {
      const { error } = await supabase
        .from('conversations')
        .delete()
        .eq('id', conversationId);

      if (error) throw error;

      setConversations(prev => prev.filter(c => c.id !== conversationId));
      
      if (currentConversation?.id === conversationId) {
        setCurrentConversation(null);
        setMessages([]);
      }
      
      toast({
        title: "تم الحذف",
        description: "تم حذف المحادثة بنجاح",
      });
    } catch (error) {
      console.error('Error deleting conversation:', error);
      toast({
        title: "خطأ",
        description: "فشل حذف المحادثة",
        variant: "destructive",
      });
    }
  }, [currentConversation, toast]);

  // Update conversation title
  const updateConversationTitle = useCallback(async (conversationId: string, title: string) => {
    try {
      const { error } = await supabase
        .from('conversations')
        .update({ title })
        .eq('id', conversationId);

      if (error) throw error;

      setConversations(prev =>
        prev.map(c => c.id === conversationId ? { ...c, title } : c)
      );
      
      if (currentConversation?.id === conversationId) {
        setCurrentConversation(prev => prev ? { ...prev, title } : null);
      }
    } catch (error) {
      console.error('Error updating conversation title:', error);
    }
  }, [currentConversation]);

  // Send message
  const sendMessage = useCallback(async (content: string) => {
    if (!userId || isLoading) return;

    // Validate input
    if (content.length < 2) {
      toast({
        title: "خطأ",
        description: "الرسالة قصيرة جداً",
        variant: "destructive",
      });
      return;
    }

    if (content.length > 2000) {
      toast({
        title: "خطأ",
        description: "الرسالة طويلة جداً (الحد الأقصى 2000 حرف)",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Create conversation if needed
      let conversationId = currentConversation?.id;
      if (!conversationId) {
        // Use first part of message as title
        const title = content.slice(0, 50) + (content.length > 50 ? '...' : '');
        const newConversation = await createConversation(title);
        if (!newConversation) {
          setIsLoading(false);
          return;
        }
        conversationId = newConversation.id;
      }

      // Add user message to UI immediately
      const userMessage: Message = {
        id: crypto.randomUUID(),
        role: 'user',
        content,
        created_at: new Date().toISOString(),
      };
      setMessages(prev => [...prev, userMessage]);

      // Save user message to DB
      await supabase
        .from('chat_messages')
        .insert({
          conversation_id: conversationId,
          role: 'user',
          content,
        });

      // Call AI function with streaming
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/daleel-ai-chat`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
          },
          body: JSON.stringify({ 
            message: content,
            conversationId,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'فشل الاتصال بالذكاء الاصطناعي');
      }

      // Handle streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      
      let assistantContent = '';
      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: '',
        created_at: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);

      if (reader) {
        let buffer = '';
        
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          buffer += decoder.decode(value, { stream: true });
          
          // Process complete lines
          let newlineIndex: number;
          while ((newlineIndex = buffer.indexOf('\n')) !== -1) {
            let line = buffer.slice(0, newlineIndex);
            buffer = buffer.slice(newlineIndex + 1);
            
            if (line.endsWith('\r')) line = line.slice(0, -1);
            if (line.startsWith(':') || line.trim() === '') continue;
            if (!line.startsWith('data: ')) continue;
            
            const jsonStr = line.slice(6).trim();
            if (jsonStr === '[DONE]') continue;
            
            try {
              const parsed = JSON.parse(jsonStr);
              const delta = parsed.choices?.[0]?.delta?.content;
              if (delta) {
                assistantContent += delta;
                setMessages(prev => 
                  prev.map((m, i) => 
                    i === prev.length - 1 
                      ? { ...m, content: assistantContent }
                      : m
                  )
                );
              }
            } catch {
              // Incomplete JSON, put back and wait
              buffer = line + '\n' + buffer;
              break;
            }
          }
        }
      }

      // Save assistant message to DB
      if (assistantContent) {
        await supabase
          .from('chat_messages')
          .insert({
            conversation_id: conversationId,
            role: 'assistant',
            content: assistantContent,
          });
      }

      // Refresh conversations to update order
      loadConversations();

    } catch (error: any) {
      console.error('Error sending message:', error);
      
      let errorMessage = 'حدث خطأ في معالجة طلبك';
      if (error.message?.includes('429')) {
        errorMessage = 'تم تجاوز عدد الطلبات المسموح، يرجى الانتظار قليلاً';
      } else if (error.message?.includes('402')) {
        errorMessage = 'خدمة الذكاء الاصطناعي تتطلب إضافة رصيد';
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast({
        title: "خطأ",
        description: errorMessage,
        variant: "destructive",
      });

      // Add error message to chat
      setMessages(prev => [...prev, {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: `عذراً، ${errorMessage}. يرجى المحاولة مرة أخرى.`,
        created_at: new Date().toISOString(),
      }]);
    } finally {
      setIsLoading(false);
    }
  }, [userId, isLoading, currentConversation, createConversation, loadConversations, toast]);

  // Start new conversation
  const startNewConversation = useCallback(() => {
    setCurrentConversation(null);
    setMessages([]);
  }, []);

  // Load conversations on mount
  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  return {
    conversations,
    currentConversation,
    messages,
    isLoading,
    isLoadingHistory,
    sendMessage,
    selectConversation,
    deleteConversation,
    startNewConversation,
  };
};
