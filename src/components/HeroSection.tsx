import React from 'react';
import {
  WHATSAPP_DISPLAY,
  WHATSAPP_NUMBER,
  HOTLINE_NUMBER_2,
  HOTLINE_DISPLAY_2,
  BRAND_NAME,
} from '../data/products';

interface HeroSectionProps {
  onBrowseCatalog: () => void;
  onOpenWhatsApp: (message?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onBrowseCatalog, onOpenWhatsApp }) => {
  return (
    <section className="relative w-full overflow-hidden px-4 sm:px-8 lg:px-14 pt-8 sm:pt-12 pb-16 bg-gradient-to-b from-[#f4f7f2] to-[#fbfbfa]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Headline & Natural Health Narrative */}
        <div className="lg:col-span-7 flex flex-col items-start gap-6">
          <div className="inline-flex items-center gap-2 bg-[#e8f5e9] border border-[#c8e6c9] px-4 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#2e7d32] animate-pulse" />
            <span className="text-xs font-bold text-[#1b5e20] uppercase tracking-wider">
              খাঁটি আয়ুর্বেদিক ঔষধ ও প্রাকৃতিক সুস্থতা • Healify Naturals
            </span>
          </div>

          <div className="flex flex-col gap-2.5">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.6rem] font-bold text-[#1b4332] tracking-tight leading-[1.1]">
              সুস্থ জীবনের জন্য খাঁটি আয়ুর্বেদিক দাওয়াই
            </h1>
            <p className="font-display text-xl sm:text-2xl font-semibold text-[#2d6a4f]">
              Authentic Ayurvedic Medicines & Holistic Remedies
            </p>
          </div>

          <p className="text-base sm:text-lg text-[#2d4030] max-w-2xl leading-relaxed">
            Healify Naturals নিয়ে এসেছে পার্শ্বপ্রতিক্রিয়ামুক্ত শাস্ত্রীয় আয়ুর্বেদিক ঔষধ ও প্রাকৃতিক উপাদান—যা মূল থেকে রোগ নিরাময় করে আপনার শরীর ও মনে ফিরিয়ে আনে প্রাকৃতিক ভারসাম্য।
          </p>

          {/* Direct Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
            <button
              onClick={onBrowseCatalog}
              className="inline-flex items-center justify-center gap-2 bg-[#1b4332] hover:bg-[#2d6a4f] text-white px-7 py-3.5 rounded-full shadow-md transition-all text-center text-sm font-semibold cursor-pointer active:scale-98"
            >
              <span className="material-symbols-outlined text-[18px]">medication</span>
              <span>আয়ুর্বেদিক ঔষধ সম্ভার দেখুন</span>
            </button>

            <button
              onClick={() =>
                onOpenWhatsApp(`Hello ${BRAND_NAME}, আমি আয়ুর্বেদিক চিকিৎসা ও ভেষজ ঔষধ সম্পর্কে পরামর্শ নিতে চাই।`)
              }
              className="group inline-flex items-center justify-center gap-2.5 bg-[#25d366] hover:bg-[#1ebe5d] text-[#005523] hover:text-white px-7 py-3.5 rounded-full shadow-[0_8px_24px_-4px_rgba(37,211,102,0.3)] transition-all text-sm font-bold cursor-pointer active:scale-98"
            >
              <span className="material-symbols-outlined text-[22px]">chat</span>
              <span>ফ্রি স্বাস্থ্য পরামর্শ (WhatsApp)</span>
            </button>
          </div>

          {/* Inline Reassurance Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-[#2d4030] text-xs font-semibold w-full">
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-xs p-2.5 rounded-xl border border-[#e2e8dc]">
              <span className="material-symbols-outlined text-[#2e7d32] text-[18px]">verified</span>
              <span>০% স্টেরয়েড ও কেমিক্যালমুক্ত</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-xs p-2.5 rounded-xl border border-[#e2e8dc]">
              <span className="material-symbols-outlined text-[#25d366] text-[18px]">support_agent</span>
              <span>হোয়াটসঅ্যাপে ফ্রি স্বাস্থ্য পরামর্শ</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-xs p-2.5 rounded-xl border border-[#e2e8dc] col-span-2 sm:col-span-1">
              <span className="material-symbols-outlined text-[#f59e0b] text-[18px]">local_shipping</span>
              <span>ক্যাশ অন ডেলিভারি (সারা দেশ)</span>
            </div>
          </div>
        </div>

        {/* Natural Health Assurance & Purity Card (No Photos) */}
        <div className="lg:col-span-5 relative mt-6 lg:mt-0">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#e2e8dc] flex flex-col gap-6 relative overflow-hidden">
            {/* Top Badge */}
            <div className="flex items-center justify-between pb-4 border-b border-[#eef2ea]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#2e7d32] animate-pulse" />
                <span className="text-xs font-bold text-[#1b5e20] uppercase tracking-wider">
                  ১০০% শাস্ত্রীয় আয়ুর্বেদিক নিশ্চয়তা
                </span>
              </div>
              <span className="text-[11px] font-bold text-[#2d6a4f] bg-[#e8f5e9] px-2.5 py-1 rounded-full border border-[#c8e6c9]">
                Classical Formula
              </span>
            </div>

            {/* Core Commitments */}
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#e8f5e9] text-[#1b5e20] flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[22px]">prescriptions</span>
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#1b4332]">শাস্ত্রীয় ভেষজ ফর্মুলেশন</h3>
                  <p className="text-xs text-[#405342] mt-0.5">চূর্ণ, ক্বাথ, রসায়ন ও তেল—চরক ও সুশ্রুত সংহিতার নির্দেশনা অনুযায়ী শোধনকৃত।</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#fee2e2] text-[#b91c1c] flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[22px]">health_and_safety</span>
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#1b4332]">সম্পূর্ণ পার্শ্বপ্রতিক্রিয়ামুক্ত</h3>
                  <p className="text-xs text-[#405342] mt-0.5">কোনো ক্ষতিকারক রাসায়নিক, কৃত্রিম ড্রাগ বা স্টেরয়েড নেই। সব বয়সের জন্য নিরাপদ।</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#e0f2fe] text-[#0369a1] flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[22px]">support_agent</span>
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#1b4332]">ব্যক্তিগত পথ্য ও সেবন গাইডলাইন</h3>
                  <p className="text-xs text-[#405342] mt-0.5">রোগীর শারীরিক অবস্থা বিবেচনা করে সঠিক ডোজ ও অনুপানের (দুধ/মধু/পানি) পরামর্শ।</p>
                </div>
              </div>
            </div>

            {/* Quick Contact & Purity Tag */}
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 bg-[#f8faf7] p-3.5 rounded-2xl border border-[#e8ece3]">
              <div className="flex flex-col gap-1">
                <span className="text-[11px] text-[#405342] font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-[#2e7d32]">phone_in_talk</span>
                  ফ্রি স্বাস্থ্য হটলাইন কল:
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={`tel:${WHATSAPP_NUMBER}`}
                    className="text-xs sm:text-sm font-bold text-[#1b4332] hover:text-[#2e7d32] flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-[#e0e6db] shadow-2xs transition-colors"
                    title="হটলাইন ১ কল করুন"
                  >
                    <span className="material-symbols-outlined text-[14px] text-[#25d366]">call</span>
                    <span>{WHATSAPP_DISPLAY}</span>
                  </a>
                  <a
                    href={`tel:${HOTLINE_NUMBER_2}`}
                    className="text-xs sm:text-sm font-bold text-[#1b4332] hover:text-[#2e7d32] flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-[#e0e6db] shadow-2xs transition-colors"
                    title="হটলাইন ২ কল করুন"
                  >
                    <span className="material-symbols-outlined text-[14px] text-[#0284c7]">call</span>
                    <span>{HOTLINE_DISPLAY_2}</span>
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#2e7d32] shrink-0 self-end sm:self-center">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>বিশ্বস্ত আয়ুর্বেদ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
