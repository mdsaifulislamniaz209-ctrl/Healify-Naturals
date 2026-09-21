import React from 'react';
import { Product } from '../types';

interface PopularGridProps {
  products: Product[];
  onOpenModal: (product: Product) => void;
  onOpenWhatsApp: (product: Product) => void;
}

export const PopularGrid: React.FC<PopularGridProps> = ({
  products,
  onOpenModal,
  onOpenWhatsApp,
}) => {
  const popular = products.filter((p) => p.popular);
  const displayItems = popular.length > 0 ? popular : products.slice(4, 8);

  if (displayItems.length === 0) {
    return null;
  }

  return (
    <section className="w-full px-4 sm:px-8 lg:px-14 py-16 bg-[#f4f7f2]">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-bold text-[#2e7d32] uppercase tracking-widest block mb-1">
              গ্রাহকপ্রিয় স্বাস্থ্যপণ্য • Daily Wellness
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1b4332]">
              Popular In Store
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#405342]">
            নিত্যদিনের স্বাস্থ্যচর্চায় হাজারো পরিবারের নির্ভরযোগ্য ও খাঁটি পছন্দ।
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayItems.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-2xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-4 border border-[#e8ece3] hover:border-[#b7e4c7] group"
            >
              <div className="flex flex-col gap-3">
                <div
                  className="relative aspect-square rounded-xl overflow-hidden bg-[#f4f7f2] cursor-pointer"
                  onClick={() => onOpenModal(item)}
                >
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt={item.alt}
                    src={item.image}
                  />
                  {item.badge && (
                    <span className="absolute top-2.5 left-2.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/95 text-[#1b5e20] shadow-xs">
                      {item.badge}
                    </span>
                  )}
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-[#52b788] uppercase tracking-wider">
                    {item.categoryLabel}
                  </span>
                  <h4
                    onClick={() => onOpenModal(item)}
                    className="font-display text-base font-bold text-[#1b4332] hover:text-[#2e7d32] cursor-pointer transition-colors line-clamp-1"
                  >
                    {item.name}
                  </h4>
                  {item.banglaName && (
                    <p className="text-xs text-[#2e7d32] line-clamp-1">{item.banglaName}</p>
                  )}
                  <p className="font-display text-base font-bold text-[#1b4332] mt-1.5">
                    {item.priceBangla}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-1.5 pt-2">
                <button
                  onClick={() => onOpenWhatsApp(item)}
                  className="inline-flex items-center justify-center gap-1.5 bg-[#25d366]/15 hover:bg-[#25d366] text-[#005523] hover:text-white px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer active:scale-98"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  <span>Order via WhatsApp</span>
                </button>
                <button
                  onClick={() => onOpenModal(item)}
                  className="text-[11px] text-center text-[#405342] hover:text-[#1b4332] font-semibold py-0.5 transition-colors cursor-pointer"
                >
                  বিস্তারিত দেখুন
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
