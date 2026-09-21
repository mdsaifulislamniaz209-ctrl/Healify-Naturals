import React, { useState } from 'react';
import {
  AYURVEDIC_HEALTH_CONCERNS,
  AyurvedicHealthConcern,
  BRAND_NAME,
  WHATSAPP_NUMBER,
  WHATSAPP_DISPLAY,
  HOTLINE_NUMBER_2,
  HOTLINE_DISPLAY_2,
} from '../data/products';
import { Product } from '../types';

interface AyurvedicRemedyFinderProps {
  products: Product[];
  onSelectAyurvedicCategory: () => void;
  onOpenWhatsApp: (message?: string) => void;
  onOpenProductModal?: (product: Product) => void;
}

export const AyurvedicRemedyFinder: React.FC<AyurvedicRemedyFinderProps> = ({
  products,
  onSelectAyurvedicCategory,
  onOpenWhatsApp,
  onOpenProductModal,
}) => {
  const [selectedConcern, setSelectedConcern] = useState<AyurvedicHealthConcern | null>(
    AYURVEDIC_HEALTH_CONCERNS[0]
  );
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConcerns = AYURVEDIC_HEALTH_CONCERNS.filter(
    (c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.commonRemedies.some((r) => r.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Find products matching the selected concern (if any matching name or ailment in store)
  const matchingProducts = selectedConcern
    ? products.filter((p) => {
        const titleMatch = selectedConcern.commonRemedies.some(
          (rem) =>
            p.name.toLowerCase().includes(rem.toLowerCase()) ||
            (p.banglaName && p.banglaName.toLowerCase().includes(rem.toLowerCase()))
        );
        const ailmentMatch =
          p.ailment && p.ailment.toLowerCase().includes(selectedConcern.title.toLowerCase());
        const categoryMatch = p.category === 'ayurvedic';
        return titleMatch || ailmentMatch || categoryMatch;
      })
    : [];

  const handleConsultForConcern = (concern: AyurvedicHealthConcern) => {
    const message = `Hello ${BRAND_NAME}!\n\nআমি আয়ুর্বেদিক চিকিৎসা পরামর্শ নিতে চাই:\n▶ শারীরিক সমস্যা: ${concern.title} (${concern.subtitle})\n\nঅনুগ্রহ করে এই সমস্যার জন্য কার্যকরী আয়ুর্বেদিক ভেষজ ঔষধ ও সঠিক সেবনবিধি জানান।`;
    onOpenWhatsApp(message);
  };

  return (
    <section className="w-full px-4 sm:px-8 lg:px-14 py-16 bg-[#f7f9f5] border-b border-[#e2e8dc]">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#dcfce7] border border-[#bbf7d0] px-3.5 py-1 rounded-full text-[#15803d] text-xs font-bold mb-3">
              <span className="material-symbols-outlined text-[16px]">local_pharmacy</span>
              <span>আয়ুর্বেদিক ভেষজ দাওয়াই ও প্রেসক্রিপশন গাইড</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1b4332]">
              রোগ ও স্বাস্থ্য সমস্যা ভিত্তিক আয়ুর্বেদিক সমাধান
            </h2>
            <p className="text-sm sm:text-base text-[#405342] mt-2 max-w-2xl">
              প্রাচীন চরক ও সুশ্রুত সংহিতার নির্দেশনা অনুযায়ী আপনার শারীরিক সমস্যা নির্বাচন করুন। পার্শ্বপ্রতিক্রিয়ামুক্ত খাঁটি ভেষজ দাওয়াই ও বিশেষজ্ঞের নির্দেশিকা জানুন।
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-80 shrink-0">
            <span className="material-symbols-outlined absolute left-3.5 top-3 text-[#708272] text-[20px]">
              search
            </span>
            <input
              type="text"
              placeholder="সমস্যা বা ঔষধি গাছ খুঁজুন (যেমন: গ্যাস, বাত, ডায়াবেটিস...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-[#e2e8dc] focus:border-[#2e7d32] focus:ring-1 focus:ring-[#2e7d32] text-xs sm:text-sm outline-hidden shadow-xs"
            />
          </div>
        </div>

        {/* Concerns Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {filteredConcerns.map((concern) => {
            const isSelected = selectedConcern?.id === concern.id;
            return (
              <button
                key={concern.id}
                onClick={() => setSelectedConcern(concern)}
                className={`flex flex-col items-center text-center p-3 rounded-2xl transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-white border-[#2e7d32] shadow-md scale-102 ring-2 ring-[#2e7d32]/20'
                    : 'bg-white/70 hover:bg-white border-[#e2e8dc] hover:border-[#b7e4c7] hover:shadow-xs'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2 shrink-0 ${concern.colorBg} ${concern.colorText}`}
                >
                  <span className="material-symbols-outlined text-[24px]">{concern.icon}</span>
                </div>
                <span className="text-xs font-bold text-[#1b4332] line-clamp-2 leading-snug">
                  {concern.title.split(',')[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Detailed Focus Card for Selected Concern */}
        {selectedConcern && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e2e8dc] shadow-sm flex flex-col lg:flex-row items-start justify-between gap-8">
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center ${selectedConcern.colorBg} ${selectedConcern.colorText}`}
                >
                  <span className="material-symbols-outlined text-[26px]">
                    {selectedConcern.icon}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#1b4332]">
                    {selectedConcern.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#52796f]">
                    {selectedConcern.subtitle}
                  </p>
                </div>
              </div>

              <p className="text-sm text-[#354f52] leading-relaxed">
                {selectedConcern.description}
              </p>

              {/* Recommended Ayurvedic Ingredients & Herbs */}
              <div className="pt-2">
                <span className="text-xs font-bold text-[#1b4332] block mb-2">
                  কার্যকরী শাস্ত্রীয় ভেষজ উপাদান ও দাওয়াই:
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedConcern.commonRemedies.map((remedy, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#e8f5e9] text-[#1b5e20] text-xs font-bold border border-[#c8e6c9]"
                    >
                      <span className="material-symbols-outlined text-[14px]">eco</span>
                      <span>{remedy}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Ayurvedic Safety & Authentic Quality Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 text-xs text-[#2d4030]">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#f7f9f5] border border-[#e2e8dc]">
                  <span className="material-symbols-outlined text-[#2e7d32] text-[18px]">
                    verified
                  </span>
                  <span className="font-semibold">১০০% প্রাকৃতিক ভেষজ</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#f7f9f5] border border-[#e2e8dc]">
                  <span className="material-symbols-outlined text-[#2e7d32] text-[18px]">
                    block
                  </span>
                  <span className="font-semibold">কোনো কেমিক্যাল বা স্টেরয়েড নেই</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#f7f9f5] border border-[#e2e8dc]">
                  <span className="material-symbols-outlined text-[#2e7d32] text-[18px]">
                    health_and_safety
                  </span>
                  <span className="font-semibold">সঠিক অনুপান ও সেবন গাইড</span>
                </div>
              </div>
            </div>

            {/* Action Card: WhatsApp Consultation & Store Check */}
            <div className="w-full lg:w-80 bg-[#fbfbfa] rounded-2xl p-5 sm:p-6 border border-[#e2e8dc] flex flex-col gap-4 shrink-0">
              <div className="flex items-center gap-2 text-[#1b5e20] text-xs font-bold">
                <span className="material-symbols-outlined text-[18px]">medical_services</span>
                <span>ফ্রি আয়ুর্বেদিক কনসালটেশন</span>
              </div>

              <h4 className="font-bold text-base text-[#1b4332]">
                এই সমস্যার সঠিক ভেষজ ঔষধ ও পথ্য জানতে চান?
              </h4>

              <p className="text-xs text-[#52796f]">
                আমাদের অভিজ্ঞ ভেষজ গবেষক ও স্বাস্থ্য বিশেষজ্ঞের সাথে কথা বলে জেনে নিন আপনার জন্য কোন ঔষধটি সবচেয়ে নিরাপদ ও দ্রুত ফলদায়ক।
              </p>

              <button
                onClick={() => handleConsultForConcern(selectedConcern)}
                className="w-full py-3 px-4 bg-[#25d366] hover:bg-[#1ebe5d] text-[#005523] hover:text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                <span>হোয়াটসঅ্যাপে সমাধান জানুন</span>
              </button>

              <button
                onClick={onSelectAyurvedicCategory}
                className="w-full py-2.5 px-4 bg-white hover:bg-[#e8f5e9] text-[#1b4332] font-bold text-xs rounded-xl border border-[#e2e8dc] hover:border-[#b7e4c7] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">medication</span>
                <span>আয়ুর্বেদিক ঔষধ সম্ভার দেখুন</span>
              </button>
            </div>
          </div>
        )}

        {/* Free Ayurvedic Doctor Helpline Callout */}
        <div className="bg-gradient-to-r from-[#1b4332] to-[#2d6a4f] rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[32px] text-[#4ade80]">
                support_agent
              </span>
            </div>
            <div>
              <span className="text-xs font-bold text-[#86efac] uppercase tracking-wider block">
                বিনামূল্যে স্বাস্থ্য পরামর্শ সেবা
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-bold mt-0.5">
                কোন ঔষধটি আপনার জন্য উপযুক্ত? সরাসরি কথা বলুন
              </h3>
              <p className="text-xs sm:text-sm text-[#d8f3dc] mt-1">
                আপনার শারীরিক সমস্যা, লক্ষণ বা পূর্বের প্রেসক্রিপশন পাঠিয়ে অভিজ্ঞ পরামর্শ নিন।
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto shrink-0">
            <button
              onClick={() =>
                onOpenWhatsApp(
                  `Hello ${BRAND_NAME}!\n\nআমি একজন আয়ুর্বেদিক স্বাস্থ্য বিশেষজ্ঞের সাথে বিনামূল্যে স্বাস্থ্য পরামর্শ করতে চাই।`
                )
              }
              className="w-full sm:w-auto px-5 py-2.5 bg-[#25d366] hover:bg-[#1ebe5d] text-[#005523] hover:text-white font-bold text-xs rounded-full shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
            >
              <span className="material-symbols-outlined text-[17px]">chat</span>
              <span>পরামর্শ (WhatsApp)</span>
            </button>
            <a
              href={`tel:${WHATSAPP_NUMBER}`}
              className="w-full sm:w-auto px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-full border border-white/20 transition-colors flex items-center justify-center gap-1.5"
              title="হটলাইন ১ কল করুন"
            >
              <span className="material-symbols-outlined text-[16px] text-[#86efac]">call</span>
              <span>হটলাইন ১: {WHATSAPP_DISPLAY}</span>
            </a>
            <a
              href={`tel:${HOTLINE_NUMBER_2}`}
              className="w-full sm:w-auto px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-full border border-white/20 transition-colors flex items-center justify-center gap-1.5"
              title="হটলাইন ২ কল করুন"
            >
              <span className="material-symbols-outlined text-[16px] text-[#7dd3fc]">call</span>
              <span>হটলাইন ২: {HOTLINE_DISPLAY_2}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
