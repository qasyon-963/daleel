import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const MIND_MAP_SYSTEM_PROMPT = `أنت خبير في إنشاء الخرائط الذهنية التعليمية. مهمتك هي تحليل المحتوى الأكاديمي وتحويله إلى هيكل خريطة ذهنية منظم.

## مهمتك:
1. تحليل المحتوى المقدم بدقة
2. استخراج الفكرة الرئيسية كعنوان مركزي
3. تحديد الأفكار الفرعية الرئيسية (3-6 أفكار)
4. تحديد التفاصيل لكل فكرة فرعية
5. إنشاء وصف نصي دقيق للخريطة الذهنية

## قواعد مهمة:
- اجعل الهيكل واضح ومنطقي
- استخدم عبارات قصيرة ومختصرة
- رتب الأفكار من الأهم إلى الأقل أهمية
- تأكد من الترابط المنطقي بين العناصر

## تنسيق الإخراج:
أرسل الإجابة بتنسيق JSON فقط:
{
  "title": "العنوان المركزي",
  "branches": [
    {
      "name": "الفرع الأول",
      "subbranches": ["تفصيل 1", "تفصيل 2"]
    }
  ],
  "imagePrompt": "وصف تفصيلي باللغة الإنجليزية لإنشاء صورة الخريطة الذهنية"
}`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'يجب تسجيل الدخول' }), {
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
      return new Response(JSON.stringify({ error: 'يجب تسجيل الدخول' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { content, contentType, purpose, userId } = await req.json();
    
    // Validate input
    if (!content || typeof content !== 'string') {
      return new Response(JSON.stringify({ error: 'المحتوى مطلوب' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    console.log(`Mind map request from user: ${user.id}, purpose: ${purpose}`);

    // Extract text from PDF if needed
    let textContent = content;
    if (contentType === 'pdf') {
      // For PDF, we'll ask the AI to describe what it can interpret
      // In production, you'd use a PDF parsing library
      textContent = `محتوى ملف PDF: ${content.slice(0, 5000)}`;
    }

    // Add purpose context
    const purposeContext = {
      understanding: 'ركز على شرح المفاهيم الأساسية وتبسيطها',
      summarization: 'استخرج النقاط الرئيسية والأفكار المحورية فقط',
      revision: 'نظم المحتوى بشكل يسهل المراجعة السريعة',
      exam_prep: 'ركز على المعلومات المهمة التي قد تأتي في الامتحانات',
    };

    // Step 1: Analyze content and get structure
    const analysisResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-3-flash-preview',
        messages: [
          { role: 'system', content: MIND_MAP_SYSTEM_PROMPT },
          { 
            role: 'user', 
            content: `الهدف: ${purposeContext[purpose as keyof typeof purposeContext] || purposeContext.understanding}

المحتوى:
${textContent.slice(0, 8000)}

قم بتحليل هذا المحتوى وإنشاء هيكل خريطة ذهنية. أرسل JSON فقط.` 
          }
        ],
        temperature: 0.5,
        max_tokens: 2000,
      }),
    });

    if (!analysisResponse.ok) {
      const errorText = await analysisResponse.text();
      console.error('Analysis error:', analysisResponse.status, errorText);
      throw new Error('فشل في تحليل المحتوى');
    }

    const analysisData = await analysisResponse.json();
    const analysisText = analysisData.choices?.[0]?.message?.content || '';
    
    // Parse the JSON from the response
    let mindMapStructure;
    try {
      // Extract JSON from the response (handle markdown code blocks)
      const jsonMatch = analysisText.match(/```json\s*([\s\S]*?)\s*```/) || 
                        analysisText.match(/```\s*([\s\S]*?)\s*```/) ||
                        [null, analysisText];
      const jsonStr = jsonMatch[1] || analysisText;
      mindMapStructure = JSON.parse(jsonStr.trim());
    } catch (e) {
      console.error('Failed to parse mind map structure:', e, analysisText);
      throw new Error('فشل في تحليل بنية الخريطة الذهنية');
    }

    // Step 2: Generate the mind map image
    const imagePrompt = `Create a professional, clean mind map diagram with the following structure. The mind map should have a central node with the title "${mindMapStructure.title}" and branches extending outward. Style: modern, colorful but professional, educational, easy to read Arabic text, white background, high contrast colors for branches. Structure: ${JSON.stringify(mindMapStructure.branches)}. Make it visually appealing for students studying. Ultra high resolution, 16:9 aspect ratio.`;

    const imageResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash-image',
        messages: [
          {
            role: 'user',
            content: imagePrompt,
          }
        ],
        modalities: ['image', 'text'],
      }),
    });

    if (!imageResponse.ok) {
      const errorText = await imageResponse.text();
      console.error('Image generation error:', imageResponse.status, errorText);
      throw new Error('فشل في إنشاء صورة الخريطة الذهنية');
    }

    const imageData = await imageResponse.json();
    const generatedImage = imageData.choices?.[0]?.message?.images?.[0]?.image_url?.url;

    if (!generatedImage) {
      throw new Error('لم يتم إنشاء الصورة');
    }

    // Step 3: Upload image to storage
    const base64Data = generatedImage.replace(/^data:image\/\w+;base64,/, '');
    const imageBytes = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
    const fileName = `${user.id}/${Date.now()}.png`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from('mind-maps')
      .upload(fileName, imageBytes, {
        contentType: 'image/png',
        upsert: false,
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      throw new Error('فشل في حفظ الصورة');
    }

    // Get public URL
    const { data: urlData } = supabaseAdmin.storage
      .from('mind-maps')
      .getPublicUrl(fileName);

    const imageUrl = urlData.publicUrl;

    // Step 4: Save to database
    const { error: dbError } = await supabaseAdmin
      .from('mind_maps')
      .insert({
        user_id: user.id,
        title: mindMapStructure.title,
        content_preview: textContent.slice(0, 200),
        purpose,
        image_url: imageUrl,
      });

    if (dbError) {
      console.error('Database error:', dbError);
      // Don't throw - the image was already created
    }

    return new Response(JSON.stringify({
      imageUrl,
      title: mindMapStructure.title,
      structure: mindMapStructure,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-mind-map function:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'حدث خطأ غير متوقع' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
