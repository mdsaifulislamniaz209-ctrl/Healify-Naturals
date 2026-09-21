import React from 'react';
import { Product } from '../types';

interface FeaturedGridProps {
  products: Product[];
  onOpenModal: (product: Product) => void;
  onOpenWhatsApp: (product: Product) => void;
  onViewAll: () => void;
}

export const FeaturedGrid: React.FC<FeaturedGridProps> = ({
  products,
  onOpenModal,
  onOpenWhatsApp,
  onViewAll,
}) => {
  const featured = products.filter((p) => p.featured);
  const displayItems = featured.length > 0 ? featured : products.slice(0, 4);

  if (products.length === 0) {
    return (
      <section className="w-full px-4 sm:px-8 lg:px-14 py-16 bg-[#fbfbfa]" id="featured-collection">
        <div className="max-w-2xl mx-auto text-center flex flex-col items-center gap-4 py-14 px-6 bg-white rounded-3xl border border-[#e8ece3] shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-[#e8f5e9] flex items-center justify-center text-[#2e7d32]">
            <span className="material-symbols-outlined text-[32px]">inventory_2</span>
          </div>
          <h2 className="font-display text-2xl font-bold text-[#1b4332]">
            নতুন প্রাকৃতিক স্বাস্থ্যপণ্য শীঘ্রই আসছে
          </h2>
          <p className="text-sm text-[#405342] max-w-md leading-relaxed">
            বর্তমানে ওয়েবসাইটটির পণ্য সম্ভার নতুন করে সাজানো হচ্ছে। অ্যাডমিন প্যানেল থেকে সরাসরি যেকোনো সময় নতুন পণ্য যোগ করা যাবে।
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full px-4 sm:px-8 lg:px-14 py-16 bg-[#fbfbfa]" id="featured-collection">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-2 border-b border-[#e9ede4]">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[#2e7d32] text-xs font-bold tracking-wider uppercase mb-1">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span>বিশেষ সিলেকশন • Best of Organic Harvest</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1b4332]">
              Featured Health Essentials
            </h2>
          </div>
          <button
            onClick={onViewAll}
            className="text-sm font-bold text-[#1b4332] hover:text-[#2e7d32] transition-colors flex items-center gap-1 cursor-pointer w-fit"
          >
            <span>View All Products ({products.length} Items)</span>
            <span className="material-symbols-outlined text-[18px]">arrow_outward</span>
          </button>
        </div>

        {/* 4 Premium Health Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayItems.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between border border-[#e8ece3] hover:border-[#b7e4c7] group"
            >
              <div className="flex flex-col gap-4">
                <div
                  className="relative overflow-hidden rounded-xl bg-[#f4f7f2] aspect-square cursor-pointer"
                  onClick={() => onOpenModal(product)}
                >
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt={product.alt}
                    src={product.image}
                  />

                  {product.badge && (
                    <span className="absolute top-3 left-3 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs bg-[#e8f5e9] text-[#1b5e20] border border-[#c8e6c9]">
                      {product.badge}
                    </span>
                  )}

                  {product.discountText && (
                    <span className="absolute top-3 right-3 bg-[#ffebee] text-[#c62828] text-[11px] px-2.5 py-1 rounded-full font-bold shadow-xs">
                      {product.discountText}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-semibold text-[#52b788] uppercase tracking-wider">
                    {product.collection}
                  </span>
                  <h3
                    onClick={() => onOpenModal(product)}
                    className="font-display text-base font-bold text-[#1b4332] leading-snug cursor-pointer hover:text-[#2e7d32] transition-colors line-clamp-2"
                  >
                    {product.name}
                  </h3>
                  {product.banglaName && (
                    <p className="text-xs text-[#2e7d32] font-medium line-clamp-1">
                      {product.banglaName}
                    </p>
                  )}

                  {product.benefits && product.benefits.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {product.benefits.slice(0, 2).map((b, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] bg-[#f4f7f2] text-[#2e7d32] px-2 py-0.5 rounded-md font-medium"
                        >
                          ✓ {b}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-baseline gap-2 pt-2">
                    <span className="font-display text-xl text-[#1b4332] font-bold">
                      {product.priceBangla}
                    </span>
                    {product.originalPriceBangla && (
                      <span className="text-xs text-[#708272] line-through">
                        {product.originalPriceBangla}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-4 mt-2">
                <button
                  onClick={() => onOpenWhatsApp(product)}
                  className="w-full bg-[#25d366] hover:bg-[#1ebe5d] text-[#005523] hover:text-white py-2.5 px-4 rounded-full text-sm font-bold flex items-center justify-center gap-1.5 transition-all shadow-[0_4px_16px_rgba(37,211,102,0.2)] cursor-pointer active:scale-98"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  <span>Order on WhatsApp</span>
                </button>

                <button
                  onClick={() => onOpenModal(product)}
                  className="text-center text-xs font-semibold text-[#405342] hover:text-[#1b4332] py-1 transition-colors cursor-pointer"
                >
                  উপকারিতা ও বিস্তারিত বিবরণ
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
