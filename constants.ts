
import type { Language } from './types';

export const ART_STYLES: Record<string, string> = {
    'Photorealistic': 'ultra realistic, 8k, detailed, professional photography',
    'Anime': 'anime style, vibrant, detailed illustration, by Studio Ghibli',
    'Fantasy Art': 'fantasy art, epic, detailed, magical, by Greg Rutkowski',
    'Watercolor': 'watercolor painting, soft edges, vibrant colors',
    'Pixel Art': 'pixel art, 16-bit, retro gaming style',
    'Cyberpunk': 'cyberpunk, neon lighting, futuristic city, dystopian',
    'Steampunk': 'steampunk, gears, brass, Victorian era, mechanical',
    'Minimalist': 'minimalist, simple, clean lines, abstract'
};

export const UI_TEXT: Record<Language, Record<string, string>> = {
    en: {
        title: 'AI Prompt Artisan',
        subtitle: 'Craft the perfect prompt for your AI image generator.',
        language: 'العربية',
        generate: 'Generate Prompt',
        generating: 'Generating...',
        subject: 'Main Subject',
        subjectPlaceholder: 'e.g., A majestic lion in a futuristic city',
        style: 'Art Style',
        styleSelect: 'Select a style or describe your own',
        colors: 'Color Palette',
        colorsPlaceholder: 'e.g., Vibrant neon, pastel, monochromatic blue',
        lighting: 'Lighting',
        lightingPlaceholder: 'e.g., Cinematic lighting, soft morning light',
        composition: 'Composition & Framing',
        compositionPlaceholder: 'e.g., Wide-angle shot, close-up portrait',
        negative: 'Negative Prompt (optional)',
        negativePlaceholder: 'e.g., blurry, ugly, text, watermark',
        generatedPrompt: 'Your Generated Prompt',
        copy: 'Copy',
        copied: 'Copied!',
        history: 'Prompt History',
        historyEmpty: 'Your generated prompts will appear here.',
        clearHistory: 'Clear History',
        usePrompt: 'Use',
        errorGeneral: 'An unexpected error occurred. Please try again.',
        errorApiKey: 'API Key not configured. Please contact the administrator.',
        footer: 'Powered by Gemini API. Designed for creativity.'
    },
    ar: {
        title: 'صانع البرومبت الذكي',
        subtitle: 'اصنع البرومبت المثالي لمولد الصور بالذكاء الاصطناعي.',
        language: 'English',
        generate: 'توليد البرومبت',
        generating: 'جاري التوليد...',
        subject: 'الموضوع الرئيسي',
        subjectPlaceholder: 'مثال: أسد مهيب في مدينة مستقبلية',
        style: 'النمط الفني',
        styleSelect: 'اختر نمطًا أو صف النمط الخاص بك',
        colors: 'لوحة الألوان',
        colorsPlaceholder: 'مثال: ألوان نيون زاهية، باستيل، أزرق أحادي اللون',
        lighting: 'الإضاءة',
        lightingPlaceholder: 'مثال: إضاءة سينمائية، ضوء الصباح الناعم',
        composition: 'التكوين والإطار',
        compositionPlaceholder: 'مثال: لقطة بزاوية واسعة، صورة شخصية مقربة',
        negative: 'البرومبت السلبي (اختياري)',
        negativePlaceholder: 'مثال: ضبابي، قبيح، نص، علامة مائية',
        generatedPrompt: 'البرومبت الذي تم إنشاؤه',
        copy: 'نسخ',
        copied: 'تم النسخ!',
        history: 'سجل البرومبتات',
        historyEmpty: 'ستظهر البرومبتات التي أنشأتها هنا.',
        clearHistory: 'مسح السجل',
        usePrompt: 'استخدام',
        errorGeneral: 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.',
        errorApiKey: 'مفتاح API غير مهيأ. يرجى الاتصال بالمسؤول.',
        footer: 'مدعوم بواسطة Gemini API. مصمم للإبداع.'
    }
};
