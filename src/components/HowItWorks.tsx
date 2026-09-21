import React from 'react';
import { WHATSAPP_DISPLAY, BRAND_NAME } from '../data/products';

interface HowItWorksProps {
  onOpenWhatsApp: (message?: string) => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenWhatsApp }) => {
  return (
    <section className="w-full px-4 sm:px-8 lg:px-14 py-16 bg-white border-y border-[#e9ede4]">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-2">
          <span className="text-xs font-bold text-[#2e7d32] uppercase tracking-widest">
            সহজ ৩ ধাপে অর্ডার ও পরামর্শ
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1b4332]">
            How WhatsApp Order Works
          </h2>
          <p className="text-sm sm:text-base text-[#405342]">
            কোনো জটিল সাইন-আপ বা কার্টের ঝামেলা ছাড়াই সরাসরি পুষ্টিবিদের পরামর্শ নিয়ে নির্ভেজাল স্বাস্থ্যপণ্য অর্ডার করুন।
          </p>
        </div>

        {/* 3 Flow Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Step 1 */}
          <div className="relative bg-[#fbfbfa] p-8 rounded-2xl shadow-xs flex flex-col gap-4 border border-[#e8ece3]">
            <div className="w-12 h-12 rounded-full bg-[#e8f5e9] flex items-center justify-center text-[#1b5e20] font-display text-xl font-bold">
              ১
            </div>
            <div className="flex flex-col gap-1.5">
              <h3 className="font-display text-lg font-bold text-[#1b4332]">1. পণ্য পছন্দ করুন</h3>
              <p className="text-sm text-[#405342] leading-relaxed">
                আপনার পছন্দের খাঁটি মধু, তেল বা সুপারফুডের পাশে{' '}
                <strong className="text-[#1b4332] font-semibold">"Order on WhatsApp"</strong> বাটনে ক্লিক করুন।
              </p>
            </div>
            <div className="mt-auto pt-4 flex items-center gap-2 text-[#405342] text-xs font-semibold">
              <span className="material-symbols-outlined text-[#2e7d32] text-[18px]">
                check_circle
              </span>
              <span>পণ্যের বিবরণ স্বয়ংক্রিয়ভাবে যুক্ত হয়</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative bg-[#fbfbfa] p-8 rounded-2xl shadow-xs flex flex-col gap-4 border border-[#25d366]/40">
            <div className="w-12 h-12 rounded-full bg-[#25d366] text-[#005523] flex items-center justify-center font-display text-xl font-bold">
              ২
            </div>
            <div className="flex flex-col gap-1.5">
              <h3 className="font-display text-lg font-bold text-[#1b4332]">
                2. হোয়াটসঅ্যাপে নিশ্চিত করুন
              </h3>
              <p className="text-sm text-[#405342] leading-relaxed">
                আমাদের স্বাস্থ্য প্রতিনিধিকে (<strong className="text-[#1b4332]">{WHATSAPP_DISPLAY}</strong>) আপনার নাম, ঠিকানা ও ফোন নম্বর পাঠিয়ে অর্ডার কনফার্ম করুন। কোনো স্বাস্থ্য জিজ্ঞাসা থাকলে জেনে নিন।
              </p>
            </div>
            <div className="mt-auto pt-4 flex items-center gap-2 text-[#405342] text-xs font-semibold">
              <span className="material-symbols-outlined text-[#25d366] text-[18px]">chat</span>
              <span>ফ্রি স্বাস্থ্য ও সেবন পরামর্শ</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative bg-[#fbfbfa] p-8 rounded-2xl shadow-xs flex flex-col gap-4 border border-[#e8ece3]">
            <div className="w-12 h-12 rounded-full bg-[#e8f5e9] flex items-center justify-center text-[#1b5e20] font-display text-xl font-bold">
              ৩
            </div>
            <div className="flex flex-col gap-1.5">
              <h3 className="font-display text-lg font-bold text-[#1b4332]">
                3. হাতে পেয়ে মূল্য পরিশোধ (COD)
              </h3>
              <p className="text-sm text-[#405342] leading-relaxed">
                ঢাকার ভেতর ২৪-৪৮ ঘণ্টায় এবং ঢাকার বাইরে ২-৩ দিনে নিরাপদ প্যাকেটজাত ডেলিভারি। পণ্য হাতে পেয়ে দেখে ক্যাশ অন ডেলিভারিতে মূল্য দিন।
              </p>
            </div>
            <div className="mt-auto pt-4 flex items-center gap-2 text-[#405342] text-xs font-semibold">
              <span className="material-symbols-outlined text-[#2e7d32] text-[18px]">
                local_shipping
              </span>
              <span>১০০% খাঁটি ও সন্তুষ্টির গ্যারান্টি</span>
            </div>
          </div>
        </div>

        {/* Action callout banner */}
        <div className="bg-[#1b4332] text-white p-6 sm:p-8 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <h4 className="font-display text-xl font-bold">
              কোন পণ্যটি আপনার স্বাস্থ্যের জন্য উপযুক্ত বুঝতে পারছেন না?
            </h4>
            <p className="text-sm text-[#b7e4c7]">
              আমাদের স্বাস্থ্য কনসালট্যান্টের সাথে সরাসরি হোয়াটসঅ্যাপে পরামর্শ করুন।
            </p>
          </div>
          <button
            onClick={() =>
              onOpenWhatsApp(`Hello ${BRAND_NAME}, I need guidance on which natural products suit my health.`)
            }
            className="bg-[#25d366] hover:bg-[#1ebe5d] text-[#005523] hover:text-white px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2 shrink-0 transition-all cursor-pointer shadow-md active:scale-98"
          >
            <span className="material-symbols-outlined text-[20px]">support_agent</span>
            <span>Free Health Consultation</span>
          </button>
        </div>
      </div>
    </section>
  );
};
