import React from 'react';
import { CATEGORIES } from '../data/products';
import { Category } from '../types';

interface CategoryGridProps {
  onSelectCategory: (categoryId: Category['id']) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ onSelectCategory }) => {
  return (
    <section className="w-full px-4 sm:px-8 lg:px-14 py-16 bg-white border-y border-[#e9ede4]">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-[#2e7d32] uppercase tracking-widest block mb-1">
              প্রকৃতির পুষ্টি ও চিকিৎসা সম্ভার • 100% Ayurvedic & Organic
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1b4332]">
              Health, Ayurvedic & Wellness Categories
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#405342] max-w-md">
            শাস্ত্রীয় আয়ুর্বেদিক ঔষধ, সুন্দরবনের কাঁচা মধু, পুষ্টিগুণে সমৃদ্ধ ঘানিভাঙা তেল, ভেষজ চা এবং দৈনন্দিন রোগপ্রতিরোধক সুপারফুড।
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {CATEGORIES.map((cat) => {
            const categoryIcons: { [key: string]: { icon: string; bg: string; text: string } } = {
              ayurvedic: { icon: 'medication', bg: 'bg-[#dcfce7]', text: 'text-[#15803d]' },
              honey: { icon: 'nutrition', bg: 'bg-[#fef3c7]', text: 'text-[#b45309]' },
              oils: { icon: 'water_drop', bg: 'bg-[#e0f2fe]', text: 'text-[#0369a1]' },
              teas: { icon: 'emoji_food_beverage', bg: 'bg-[#e8f5e9]', text: 'text-[#1b5e20]' },
              superfoods: { icon: 'spa', bg: 'bg-[#f3e8ff]', text: 'text-[#7e22ce]' },
            };
            const meta = categoryIcons[cat.id] || { icon: 'eco', bg: 'bg-[#e8f5e9]', text: 'text-[#1b5e20]' };

            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className="group flex flex-col justify-between bg-[#fbfbfa] rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-all cursor-pointer border border-[#e8ece3] hover:border-[#b7e4c7] hover:bg-white"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-14 h-14 rounded-2xl ${meta.bg} ${meta.text} flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs`}>
                      <span className="material-symbols-outlined text-[28px]">{meta.icon}</span>
                    </div>
                    <span className="text-[11px] font-bold text-[#405342] bg-[#f4f7f2] px-2.5 py-1 rounded-full border border-[#e8ece3]">
                      {cat.num}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1 mt-2">
                    <h3 className="font-display text-xl font-bold text-[#1b4332] group-hover:text-[#2e7d32] transition-colors">
                      {cat.banglaSubtitle}
                    </h3>
                    <p className="text-sm font-semibold text-[#2d6a4f]">
                      {cat.name}
                    </p>
                    <p className="text-xs text-[#708272] mt-1 line-clamp-2">
                      {cat.englishSubtitle}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-[#f0f4ee] flex items-center justify-between text-xs font-bold text-[#2e7d32]">
                  <span>পণ্য দেখুন</span>
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
