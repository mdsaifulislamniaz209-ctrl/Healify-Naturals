import React from 'react';
import { WHATSAPP_DISPLAY, BRAND_NAME } from '../data/products';

interface AyurvedicStandardsSectionProps {
  onOpenWhatsApp: (message?: string) => void;
  onExploreMedicines: () => void;
}

export const AyurvedicStandardsSection: React.FC<AyurvedicStandardsSectionProps> = ({
  onOpenWhatsApp,
  onExploreMedicines,
}) => {
  return (
    <section className="w-full px-4 sm:px-8 lg:px-14 py-16 bg-white border-b border-[#e2e8dc]">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto flex flex-col items-center gap-3">
          <div className="inline-flex items-center gap-2 bg-[#dcfce7] border border-[#bbf7d0] px-3.5 py-1 rounded-full text-[#15803d] text-xs font-bold">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            <span>খাঁটি আয়ুর্বেদিক গুণমান ও নিরাপত্তা অঙ্গীকার</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1b4332]">
            কেন আমাদের আয়ুর্বেদিক ভেষজ ঔষধ অনন্য?
          </h2>
          <p className="text-sm sm:text-base text-[#405342]">
            সুস্থতার প্রাচীন ভারতীয় চিকিৎসা বিজ্ঞান "আয়ুর্বেদ"-এর মূল কথা হলো মূল থেকে রোগের কারণ দূর করা। আমরা বজায় রাখি সর্বোচ্চ বিশুদ্ধতা ও শাস্ত্রীয় মান।
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#fbfbfa] rounded-3xl p-6 border border-[#e2e8dc] flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#dcfce7] text-[#15803d] flex items-center justify-center">
              <span className="material-symbols-outlined text-[26px]">potted_plant</span>
            </div>
            <h3 className="font-bold text-base text-[#1b4332]">
              ১০০% খাঁটি ভেষজ উপাদান
            </h3>
            <p className="text-xs text-[#52796f] leading-relaxed">
              সরাসরি অরণ্য ও পাহাড়ি অঞ্চল থেকে সংগৃহীত খাঁটি ভেষজ লতাপাতা, শিকড় ও ফলমূল। কোনো কৃত্রিম নির্যাস বা রাসায়নিক নয়।
            </p>
          </div>

          <div className="bg-[#fbfbfa] rounded-3xl p-6 border border-[#e2e8dc] flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#fee2e2] text-[#b91c1c] flex items-center justify-center">
              <span className="material-symbols-outlined text-[26px]">no_sim</span>
            </div>
            <h3 className="font-bold text-base text-[#1b4332]">
              স্টেরয়েড ও পেইনকিলার মুক্ত
            </h3>
            <p className="text-xs text-[#52796f] leading-relaxed">
              সাময়িক উপশমের জন্য ক্ষতিকারক কোনো স্টেরয়েড, ব্যথানাশক ড্রাগ বা কেমিক্যাল মেশানো হয় না। নিরাপদ দীর্ঘমেয়াদী আরোগ্য।
            </p>
          </div>

          <div className="bg-[#fbfbfa] rounded-3xl p-6 border border-[#e2e8dc] flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#fef3c7] text-[#b45309] flex items-center justify-center">
              <span className="material-symbols-outlined text-[26px]">menu_book</span>
            </div>
            <h3 className="font-bold text-base text-[#1b4332]">
              শাস্ত্রীয় শোধন ও প্রস্তুত প্রণালী
            </h3>
            <p className="text-xs text-[#52796f] leading-relaxed">
              চরক সংহিতা ও সারঙ্গধর সংহিতার মূল পদ্ধতি মেনে কাষ্ঠ চূর্ণন, ভাবনামিশ্রণ ও সনাতন ঘানি দ্বারা প্রস্তুতকৃত।
            </p>
          </div>

          <div className="bg-[#fbfbfa] rounded-3xl p-6 border border-[#e2e8dc] flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#e0f2fe] text-[#0369a1] flex items-center justify-center">
              <span className="material-symbols-outlined text-[26px]">assignment</span>
            </div>
            <h3 className="font-bold text-base text-[#1b4332]">
              সঠিক অনুপান ও পথ্য নির্দেশিকা
            </h3>
            <p className="text-xs text-[#52796f] leading-relaxed">
              প্রতিটি দাওয়াইয়ের সাথে রোগ অনুযায়ী কখন গরম পানি, মধু বা দুধ দিয়ে সেবন করবেন এবং কি কি খাওয়া বারণ তার বিস্তারিত নির্দেশ।
            </p>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="bg-[#f4f7f2] rounded-3xl p-6 sm:p-8 border border-[#d8e2dc] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#1b4332] text-white flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">verified_user</span>
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-[#1b4332]">
                কোনো রোগের জন্য কোন দাওয়াই দরকার তা নিয়ে দ্বিধাগ্রস্ত?
              </h4>
              <p className="text-xs text-[#405342] mt-0.5">
                সরাসরি প্রেসক্রিপশন বা সমস্যার বর্ণনা লিখে আমাদের জানান — অভিজ্ঞ পরামর্শ সম্পূর্ণ ফ্রি।
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() =>
                onOpenWhatsApp(
                  `Hello ${BRAND_NAME}, আমি আমার শারীরিক সমস্যার প্রেসক্রিপশন/বিবরণ দিয়ে পরামর্শ নিতে চাই।`
                )
              }
              className="px-6 py-2.5 bg-[#25d366] hover:bg-[#1ebe5d] text-[#005523] font-bold text-xs rounded-full shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              <span>প্রেসক্রিপশন পাঠান</span>
            </button>
            <button
              onClick={onExploreMedicines}
              className="px-5 py-2.5 bg-[#1b4332] hover:bg-[#2d6a4f] text-white font-bold text-xs rounded-full shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">inventory_2</span>
              <span>ঔষধ সম্ভার দেখুন</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
