import { Product, Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'ayurvedic',
    num: '01 / Ayurvedic Medicine',
    name: 'Classical Ayurvedic Medicine',
    banglaSubtitle: 'আয়ুর্বেদিক ঔষধ ও দাওয়াই',
    englishSubtitle: 'Churna, Kwath, Arishta, Vati & Taila',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop',
    alt: 'Authentic classical Ayurvedic herbs, mortar and pestle, organic herbal formulation',
  },
  {
    id: 'honey',
    num: '02 / Honey',
    name: 'Raw Forest Honey',
    banglaSubtitle: 'খাঁটি বুনো মধু',
    englishSubtitle: 'Sundarban & Wild Floral Nectar',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=1000&auto=format&fit=crop',
    alt: 'Natural raw honeycomb jar with wooden honey dipper catching golden sunlight, organic raw unprocessed honey.',
  },
  {
    id: 'oils',
    num: '03 / Cold-Pressed Oils',
    name: 'Pure Cold-Pressed Oils',
    banglaSubtitle: 'ঘানিভাঙা খাঁটি তেল',
    englishSubtitle: 'Black seed, mustard & coconut oils',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=1000&auto=format&fit=crop',
    alt: 'Pure cold-pressed amber oil in minimalist glass apothecary bottle with dropper surrounded by natural botanical herbs.',
  },
  {
    id: 'teas',
    num: '04 / Herbal Teas',
    name: 'Organic Herbal Infusions',
    banglaSubtitle: 'প্রাকৃতিক ভেষজ চা',
    englishSubtitle: 'Tulsi, green tea & detox blends',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=1000&auto=format&fit=crop',
    alt: 'Fresh organic herbal tea steeping in clear glass cup with fresh green mint leaves and chamomile blossoms.',
  },
  {
    id: 'superfoods',
    num: '05 / Superfoods',
    name: 'Herbal Superfoods',
    banglaSubtitle: 'সুপারফুড ও পুষ্টিকর খাদ্য',
    englishSubtitle: 'Moringa, chia seeds & turmeric',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop',
    alt: 'Vibrant organic moringa green powder and holistic health superfoods placed on clean minimalist ceramic bowls.',
  },
];

// Common Ayurvedic Health Concerns with remedies and symptoms
export interface AyurvedicHealthConcern {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  colorBg: string;
  colorText: string;
  commonRemedies: string[];
  description: string;
  consultationText: string;
}

export const AYURVEDIC_HEALTH_CONCERNS: AyurvedicHealthConcern[] = [
  {
    id: 'digestive',
    title: 'গ্যাস্ট্রিক, অম্বল ও হজম সমস্যা',
    subtitle: 'Acidity, Gas, Constipation & IBS',
    icon: 'medication_liquid',
    colorBg: 'bg-[#fef3c7]',
    colorText: 'text-[#b45309]',
    commonRemedies: ['ত্রিফলা চূর্ণ', 'আমলকী রসায়ন', 'হিঙ্গ্বষ্টক চূর্ণ', 'জীরা রিষ্ট'],
    description: 'পেট ফাঁপা, বুকজ্বালা, কোষ্ঠকাঠিন্য ও বদহজম নিরাময়ে সম্পূর্ণ প্রাকৃতিকভাবে পাকস্থলী ও অন্ত্রের ভারসাম্য ফিরিয়ে আনে।',
    consultationText: 'আমি পেটের গ্যাস, অ্যাসিডিটি ও হজম সমস্যার জন্য আয়ুর্বেদিক পরামর্শ ও ঔষধ জানতে চাই।',
  },
  {
    id: 'joint-pain',
    title: 'বাত-ব্যথা, মাজা ও জয়েন্ট পেইন',
    subtitle: 'Arthritis, Sciatica & Joint Stiffness',
    icon: 'personal_injury',
    colorBg: 'bg-[#fee2e2]',
    colorText: 'text-[#b91c1c]',
    commonRemedies: ['মহানারায়ণ তেল', 'শাল্লাকী ক্যাপসুল', 'যোগরাজ গুগ্গুলু', 'অশ্বগন্ধা'],
    description: 'হাড়ের গিঁটের ব্যথা, ইউরিক এসিড, রিউমাটয়েড বাত ও পিঠের ব্যথায় প্রদাহ দূর করে পেশী শক্ত ও কর্মক্ষম রাখে।',
    consultationText: 'আমি বাত-ব্যথা, মাজা ও জয়েন্টের ব্যথার জন্য সঠিক আয়ুর্বেদিক তেল ও ঔষধ জানতে চাই।',
  },
  {
    id: 'diabetes',
    title: 'ডায়াবেটিস ও সুগার নিয়ন্ত্রণ',
    subtitle: 'Blood Sugar & Metabolic Balance',
    icon: 'vital_signs',
    colorBg: 'bg-[#e0f2fe]',
    colorText: 'text-[#0369a1]',
    commonRemedies: ['মেথি চূর্ণ', 'জামবীজ রসায়ন', 'চিরতা পাউডার', 'মধুমেহ সঞ্জীবনী'],
    description: 'রক্তের গ্লুকোজ লেভেল প্রাকৃতিকভাবে নিয়ন্ত্রণে রাখে এবং ইনসুলিন সংবেদনশীলতা বৃদ্ধি করতে সহায়ক।',
    consultationText: 'আমি ডায়াবেটিস ও ব্লাড সুগার প্রাকৃতিকভাবে নিয়ন্ত্রণে রাখার জন্য আয়ুর্বেদিক ঔষধ পরামর্শ চাই।',
  },
  {
    id: 'stress-sleep',
    title: 'অনিদ্রা, মানসিক চাপ ও স্নায়বিক ক্লান্তি',
    subtitle: 'Insomnia, Stress, Memory & Vata Balance',
    icon: 'bedtime',
    colorBg: 'bg-[#f3e8ff]',
    colorText: 'text-[#7e22ce]',
    commonRemedies: ['অশ্বগন্ধা মূল চূর্ণ', 'ব্রাহ্মী রসায়ন', 'সর্পগন্ধা বটি', 'শঙ্খপুষ্পী'],
    description: 'মস্তিষ্ক শান্ত করে গভীর ও প্রশান্তির ঘুম নিশ্চিত করে, মানসিক ক্লান্তি দূর করে স্মরণশক্তি বৃদ্ধি করে।',
    consultationText: 'আমি অতিরিক্ত মানসিক চাপ, অনিদ্রা ও স্নায়বিক ক্লান্তির জন্য কার্যকর আয়ুর্বেদিক পথ্য জানতে চাই।',
  },
  {
    id: 'respiratory',
    title: 'কাশি, অ্যালার্জি ও ফুসফুসের যত্ন',
    subtitle: 'Cold, Cough, Asthma & Bronchial Care',
    icon: 'pulmonology',
    colorBg: 'bg-[#ecfdf5]',
    colorText: 'text-[#047857]',
    commonRemedies: ['বাসক পাতার রস', 'যষ্টিমধু চূর্ণ', 'তালিসাদি চূর্ণ', 'তুলসী অরিষ্ট'],
    description: 'শ্বাসনালীর কফ পরিষ্কার করে, ঘন ঘন সর্দি-কাশি ও ঋতু পরিবর্তনের অ্যালার্জির বিরুদ্ধে স্থায়ী রোগপ্রতিরোধ গড়ে তোলে।',
    consultationText: 'আমি দীর্ঘদিনের কাশি, শ্বাসকষ্ট ও কফের জন্য আয়ুর্বেদিক সমাধান ও ঔষধ জানতে চাই।',
  },
  {
    id: 'vitality',
    title: 'শারীরিক দুর্বলতা ও জীবনীশক্তি বৃদ্ধি',
    subtitle: 'Energy, Stamina & Rasayana Therapy',
    icon: 'bolt',
    colorBg: 'bg-[#fef9c3]',
    colorText: 'text-[#a16207]',
    commonRemedies: ['বিশুদ্ধ শিলাজিৎ', 'অশ্বগন্ধা ও শিমুল মূল', 'চ্যবনপ্রাশ', 'সফেদ মুসলি'],
    description: 'দেহের ক্লান্তি ও দুর্বলতা দূর করে অসীম বল, স্ট্যামিনা, হরমোনাল ব্যালেন্স এবং দীর্ঘায়ুর প্রাকৃতিক রসায়ন প্রদান করে।',
    consultationText: 'আমি শারীরিক দুর্বলতা দূর করে জীবনীশক্তি ও স্ট্যামিনা বৃদ্ধির জন্য নির্ভরযোগ্য আয়ুর্বেদিক ঔষধ জানতে চাই।',
  },
  {
    id: 'liver-detox',
    title: 'লিভার সুরক্ষা ও রক্ত পরিশোধন',
    subtitle: 'Liver Function, Fatty Liver & Detox',
    icon: 'local_pharmacy',
    colorBg: 'bg-[#e0e7ff]',
    colorText: 'text-[#3730a3]',
    commonRemedies: ['কালমেঘ পাতার গুঁড়া', 'ভূই আমলা', 'পুনর্নবা রিষ্ট', 'নিম চূর্ণ'],
    description: 'লিভারে জমে থাকা বিষাক্ত পদার্থ ডিটক্স করে, ফ্যাটি লিভার প্রতিরোধে সাহায্য করে এবং ত্বক ভেতর থেকে উজ্জ্বল করে।',
    consultationText: 'আমি লিভারের সুস্থতা ও শরীর ডিটক্সের জন্য উপযুক্ত আয়ুর্বেদিক ঔষধ পরামর্শ চাই।',
  },
  {
    id: 'hair-skin',
    title: 'চুল পড়া বন্ধ ও ত্বকের অ্যালার্জি দূর',
    subtitle: 'Hair Fall, Dandruff & Skin Allergy',
    icon: 'spa',
    colorBg: 'bg-[#fce7f3]',
    colorText: 'text-[#be185d]',
    commonRemedies: ['ভৃঙ্গরাজ তেল', 'মঞ্জিষ্ঠা চূর্ণ', 'আমলকী-শিকাকাই প্যাক', 'নিম তেল'],
    description: 'চুলের গোড়া শক্ত করে নতুন চুল গজাতে সহায়তা করে এবং ত্বকের একজিমা, চুলকানি ও ব্রণের সমাধান দেয়।',
    consultationText: 'আমি চুল পড়া রোধ এবং ত্বকের এলার্জির জন্য প্রাকৃতিক আয়ুর্বেদিক ভেষজ সম্পর্কে পরামর্শ চাই।',
  },
];

// All existing mock products removed as per user request. Products can be added freshly from Admin Panel.
export const PRODUCTS: Product[] = [];

export const WHATSAPP_NUMBER = '8801636767383';
export const WHATSAPP_DISPLAY = '+880 1636-767383';
export const HOTLINE_NUMBER_2 = '+8809638852352';
export const HOTLINE_DISPLAY_2 = '+880 9638-852352';

export const HOTLINE_NUMBERS = [
  {
    id: 'hotline-1',
    title: 'হটলাইন ১ (কল ও WhatsApp)',
    number: WHATSAPP_NUMBER,
    display: WHATSAPP_DISPLAY,
    tel: '+8801636767383',
    isWhatsApp: true,
    note: 'সকাল ৯টা – রাত ১১টা (কল ও হোয়াটসঅ্যাপ)',
  },
  {
    id: 'hotline-2',
    title: 'হটলাইন ২ (সরাসরি কল)',
    number: '8809638852352',
    display: HOTLINE_DISPLAY_2,
    tel: '+8809638852352',
    isWhatsApp: false,
    note: 'সরাসরি যেকোনো সময় হটলাইন সংযোগ',
  },
];
export const STUDIO_LOCATION = 'House 14, Road 7, Dhanmondi, Dhaka — 1205';
export const BRAND_NAME = 'Healify Naturals';
export const BRAND_TAGLINE = '100% Pure, Organic & Holistic Health Essentials';
