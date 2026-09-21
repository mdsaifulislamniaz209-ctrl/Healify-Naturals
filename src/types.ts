export type HealthCategoryType = 'ayurvedic' | 'honey' | 'oils' | 'teas' | 'superfoods' | string;

export interface Product {
  id: string;
  name: string;
  banglaName?: string;
  category: HealthCategoryType;
  categoryLabel: string;
  collection: string;
  price: number;
  originalPrice?: number;
  priceBangla: string;
  originalPriceBangla?: string;
  badge?: string;
  badgeType?: 'handmade' | 'bestseller' | 'new' | 'limited' | 'discount';
  discountText?: string;
  specLabel?: string;
  image: string;
  alt: string;
  artisanStory: string;
  craftLocation: string;
  dimensions?: string;
  materials?: string;
  featured?: boolean;
  popular?: boolean;
  benefits?: string[];
  organicCert?: string;
  dosage?: string; // সেবনবিধি ও মাত্রা
  ailment?: string; // রোগ বা সমস্যার বিবরণ
}

export interface Category {
  id: HealthCategoryType;
  num: string;
  name: string;
  banglaSubtitle: string;
  englishSubtitle: string;
  image: string;
  alt: string;
}

export type PageTab = 'home' | 'products' | 'about' | 'contact' | 'admin';
