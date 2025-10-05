import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get auth token from request
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'يجب تسجيل الدخول للاستخدام' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Verify user is authenticated
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
    
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'يجب تسجيل الدخول للاستخدام' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { message } = await req.json();
    
    // Input validation
    if (!message || typeof message !== 'string') {
      throw new Error('الرسالة مطلوبة');
    }
    
    const trimmedMessage = message.trim();
    
    if (trimmedMessage.length < 3) {
      throw new Error('الرسالة قصيرة جداً (الحد الأدنى 3 أحرف)');
    }
    
    if (trimmedMessage.length > 1000) {
      throw new Error('الرسالة طويلة جداً (الحد الأقصى 1000 حرف)');
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    // Initialize admin Supabase client for database queries
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Log usage for audit trail
    console.log(`AI Chat request from user: ${user.id}, message length: ${trimmedMessage.length}`);

    // Fetch all universities data
    const { data: universities } = await supabaseAdmin
      .from('universities')
      .select(`
        *,
        faculties (
          *,
          majors (*)
        )
      `);

    // Create context from database
    const context = universities?.map(uni => {
      const facultiesText = uni.faculties?.map((fac: any) => {
        const majorsText = fac.majors?.map((maj: any) => `      - ${maj.name}`).join('\n') || '';
        return `    كلية: ${fac.name}${fac.name_en ? ` (${fac.name_en})` : ''}\n${majorsText ? `    التخصصات:\n${majorsText}` : ''}`;
      }).join('\n') || '';
      
      return `جامعة: ${uni.name} (${uni.name_en})
  المدينة: ${uni.city}
  تأسست: ${uni.established}
  ${uni.description}
  
الكليات والتخصصات:
${facultiesText}
`;
    }).join('\n\n---\n\n');

    // System prompt with context
    const systemPrompt = `أنت مساعد ذكي متخصص في تقديم معلومات عن الجامعات السورية. 
لديك معلومات كاملة عن جميع الجامعات والكليات والتخصصات في سوريا.

معلومات قاعدة البيانات:
${context}

عند الإجابة:
- كن دقيقاً ومحدداً
- أجب بالعربية فقط
- إذا كان السؤال عن جامعة أو كلية أو تخصص معين، ابحث في المعلومات أعلاه
- إذا لم تجد المعلومة، قل بصراحة أنها غير متوفرة
- قدم معلومات مفيدة وموجزة`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: trimmedMessage }
        ],
        temperature: 0.7,
        max_tokens: 1000,
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
          error: 'يرجى إضافة رصيد إلى حساب Lovable AI الخاص بك' 
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

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in ai-chat function:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'حدث خطأ غير متوقع' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});