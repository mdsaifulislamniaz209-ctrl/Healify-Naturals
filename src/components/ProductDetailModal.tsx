import React from 'react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onOrderOnWhatsApp: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onOrderOnWhatsApp,
}) => {
  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white max-w-lg w-full rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col gap-5 relative border border-[#e8ece3] my-8 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-5 right-5 text-[#405342] hover:text-[#1b4332] p-1.5 rounded-full hover:bg-[#f4f7f2] transition-colors cursor-pointer"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <span className="material-symbols-outlined text-[22px]">close</span>
        </button>

        {/* Top purity badge */}
        <div className="flex items-center gap-1.5 text-[#2e7d32] text-xs font-bold uppercase tracking-wider">
          <span className="material-symbols-outlined text-[18px]">verified</span>
          <span>100% Pure & Lab Tested Organic</span>
        </div>

        {/* Product Image preview */}
        <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#f4f7f2] border border-[#e8ece3]">
          <img
            src={product.image}
            alt={product.alt}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-semibold text-[#1b4332] shadow-xs border border-[#e8ece3]">
            {product.craftLocation}
          </div>
          {product.organicCert && (
            <div className="absolute top-3 right-3 bg-[#e8f5e9] text-[#1b5e20] border border-[#c8e6c9] px-2.5 py-1 rounded-full text-[11px] font-bold shadow-xs">
              {product.organicCert}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-xs font-bold text-[#52b788] uppercase tracking-wider">
            {product.collection}
          </span>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-[#1b4332] leading-snug">
            {product.name}
          </h3>
          {product.banglaName && (
            <p className="text-sm font-semibold text-[#2e7d32]">{product.banglaName}</p>
          )}
        </div>

        {/* Story / Description */}
        <p className="text-xs sm:text-sm text-[#405342] leading-relaxed">
          {product.artisanStory}
        </p>

        {/* Health Benefits Pills */}
        {product.benefits && product.benefits.length > 0 && (
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-bold text-[#1b4332]">উপকারিতা ও পুষ্টিগুণ (Health Benefits):</span>
            <div className="flex flex-wrap gap-1.5">
              {product.benefits.map((benefit, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-[#e8f5e9] text-[#1b5e20] px-2.5 py-1 rounded-lg font-medium border border-[#c8e6c9]"
                >
                  ✓ {benefit}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Specs breakdown */}
        {(product.materials || product.dimensions || product.dosage || product.ailment) && (
          <div className="grid grid-cols-1 gap-2 p-3.5 bg-[#fbfbfa] rounded-xl text-xs text-[#405342] border border-[#e8ece3]">
            {product.ailment && (
              <div className="flex items-start gap-2">
                <strong className="text-[#1b4332] font-semibold shrink-0">যে রোগের জন্য:</strong>
                <span className="text-[#b45309] font-medium">{product.ailment}</span>
              </div>
            )}
            {product.dosage && (
              <div className="flex items-start gap-2">
                <strong className="text-[#1b4332] font-semibold shrink-0">সেবনবিধি ও মাত্রা:</strong>
                <span className="text-[#1b5e20] font-medium">{product.dosage}</span>
              </div>
            )}
            {product.materials && (
              <div className="flex items-start gap-2">
                <strong className="text-[#1b4332] font-semibold shrink-0">উপাদান / সোর্সিং:</strong>
                <span>{product.materials}</span>
              </div>
            )}
            {product.dimensions && (
              <div className="flex items-start gap-2">
                <strong className="text-[#1b4332] font-semibold shrink-0">পরিমাণ / নেট ওজন:</strong>
                <span>{product.dimensions}</span>
              </div>
            )}
          </div>
        )}

        {/* Price & Delivery pill */}
        <div className="p-4 bg-[#f4f7f2] rounded-2xl flex items-center justify-between border border-[#e0e8db]">
          <div>
            <span className="text-xs text-[#405342] block font-semibold">Price / মূল্য</span>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl text-[#1b4332] font-bold">
                {product.priceBangla}
              </span>
              {product.originalPriceBangla && (
                <span className="text-xs text-[#708272] line-through">
                  {product.originalPriceBangla}
                </span>
              )}
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs text-[#405342] block font-semibold">ডেলিভারি</span>
            <span className="text-xs text-[#2e7d32] font-bold">
              ক্যাশ অন ডেলিভারি (COD)
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 pt-1">
          <button
            onClick={() => {
              onOrderOnWhatsApp(product);
              onClose();
            }}
            className="w-full bg-[#25d366] hover:bg-[#1ebe5d] text-[#005523] hover:text-white py-3 rounded-full text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-[0_4px_16px_rgba(37,211,102,0.25)] cursor-pointer active:scale-98"
          >
            <span className="material-symbols-outlined text-[20px]">chat</span>
            <span>অর্ডার করুন হোয়াটসঅ্যাপে (Order on WhatsApp)</span>
          </button>
          <button
            className="w-full py-2 text-xs font-bold text-[#405342] hover:text-[#1b4332] cursor-pointer transition-colors"
            onClick={onClose}
          >
            বন্ধ করুন (Close)
          </button>
        </div>
      </div>
    </div>
  );
};
