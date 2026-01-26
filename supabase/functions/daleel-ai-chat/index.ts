import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SYSTEM_PROMPT = `أنت "Daleel AI" - مساعد ذكي متخصص ومتقدم للجامعات والتخصصات الأكاديمية في سوريا.

## هويتك:
- اسمك: Daleel AI (دليل)
- دورك: مستشار تعليمي ذكي يساعد الطلاب في اتخاذ قرارات أكاديمية مدروسة
- أسلوبك: ودود، محترف، ومفيد

## قدراتك الأساسية:

### 1. المعرفة بالجامعات السورية:
- جميع الجامعات الحكومية والخاصة
- الكليات والمعاهد والتخصصات
- المواقع الجغرافية والفروع
- تواريخ التأسيس والمعلومات العامة

### 2. التحليل والاستنتاج:
- ربط المعلومات بشكل ذكي
- تقديم مقارنات مفيدة بين الخيارات
- نصائح مبنية على احتياجات الطالب

### 3. الإرشاد التعليمي العام:
- أنظمة التعليم والقبول
- المسارات الأكاديمية
- نصائح لاختيار التخصص
- التوجيه المهني

## تعليمات الاستجابة:

### التنسيق:
- استخدم Markdown للتنسيق (عناوين، قوائم، نص عريض)
- نظم إجابتك بشكل واضح ومرتب
- استخدم العناوين الفرعية عند الحاجة
- اجعل الإجابة قابلة للقراءة بسهولة

### المحتوى:
- ابدأ بإجابة مباشرة ثم أضف التفاصيل
- قدم معلومات دقيقة من قاعدة البيانات
- إذا لم تجد معلومة، اذكر ذلك بوضوح
- لا تختلق معلومات غير موجودة

### الأسلوب:
- كن ودوداً ومحترفاً
- استخدم اللغة العربية الفصحى المبسطة
- تجنب الإجابات الطويلة جداً
- اختم بسؤال أو عرض للمساعدة الإضافية عند المناسب

## قاعدة البيانات المتاحة:
`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'يجب تسجيل الدخول لاستخدام Daleel AI' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
    
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'يجب تسجيل الدخول لاستخدام Daleel AI' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { message, conversationId } = await req.json();
    
    // Validate input
    if (!message || typeof message !== 'string') {
      return new Response(JSON.stringify({ error: 'الرسالة مطلوبة' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const trimmedMessage = message.trim();
    if (trimmedMessage.length < 2) {
      return new Response(JSON.stringify({ error: 'الرسالة قصيرة جداً' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (trimmedMessage.length > 2000) {
      return new Response(JSON.stringify({ error: 'الرسالة طويلة جداً (الحد الأقصى 2000 حرف)' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    // Get admin client for database queries
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    console.log(`Daleel AI request from user: ${user.id}, message: ${trimmedMessage.slice(0, 50)}...`);

    // Fetch universities data
    const { data: universities } = await supabaseAdmin
      .from('universities')
      .select(`
        *,
        faculties (
          *,
          majors (*)
        )
      `);

    // Build comprehensive context
    const context = universities?.map(uni => {
      const facultiesText = uni.faculties?.map((fac: any) => {
        const majorsText = fac.majors?.map((maj: any) => {
          let majorInfo = `- ${maj.name}`;
          if (maj.name_en) majorInfo += ` (${maj.name_en})`;
          if (maj.duration) majorInfo += ` | المدة: ${maj.duration}`;
          if (maj.description) majorInfo += ` | ${maj.description}`;
          return majorInfo;
        }).join('\n') || '';
        
        return `### ${fac.name}${fac.name_en ? ` (${fac.name_en})` : ''}
النوع: ${fac.type || 'كلية'}
${majorsText ? `التخصصات:\n${majorsText}` : 'لا توجد تخصصات مسجلة'}`;
      }).join('\n\n') || 'لا توجد كليات مسجلة';
      
      return `## ${uni.name} (${uni.name_en})
- النوع: ${uni.type === 'public' ? 'حكومية' : 'خاصة'}
- المدينة: ${uni.city}
- تأسست: ${uni.established || 'غير محدد'}
- الموقع: ${uni.website || 'غير متوفر'}
${uni.description ? `- الوصف: ${uni.description}` : ''}

${facultiesText}
`;
    }).join('\n---\n\n') || 'لا توجد بيانات';

    // Get conversation history if available
    let conversationHistory: Array<{role: string, content: string}> = [];
    if (conversationId) {
      const { data: previousMessages } = await supabaseAdmin
        .from('chat_messages')
        .select('role, content')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true })
        .limit(10); // Last 10 messages for context

      if (previousMessages) {
        conversationHistory = previousMessages.map(m => ({
          role: m.role as string,
          content: m.content
        }));
      }
    }

    // Build messages array
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT + context },
      ...conversationHistory,
      { role: 'user', content: trimmedMessage }
    ];

    // Call AI with streaming
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-3-flash-preview',
        messages,
        stream: true,
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ 
          error: 'تم تجاوز حد الاستخدام، يرجى المحاولة لاحقاً' 
        }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ 
          error: 'يرجى إضافة رصيد إلى حساب Lovable AI' 
        }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      return new Response(JSON.stringify({ error: 'خطأ في الاتصال بالذكاء الاصطناعي' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Stream the response
    return new Response(response.body, {
      headers: { 
        ...corsHeaders, 
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error('Error in daleel-ai-chat function:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'حدث خطأ غير متوقع' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
