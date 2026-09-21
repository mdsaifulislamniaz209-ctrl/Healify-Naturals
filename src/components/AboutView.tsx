import React from 'react';
import { STUDIO_LOCATION, WHATSAPP_DISPLAY, BRAND_NAME } from '../data/products';
import honeyAboutImg from '../assets/images/organic_raw_honey_1789982237941.jpg';

interface AboutViewProps {
  onOpenWhatsApp: (message?: string) => void;
  onExploreProducts: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onOpenWhatsApp, onExploreProducts }) => {
  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-12 max-w-5xl mx-auto flex flex-col gap-16">
      {/* Intro Editorial */}
      <div className="flex flex-col gap-4 text-left">
        <div className="inline-flex items-center gap-2 bg-[#e8f5e9] border border-[#c8e6c9] px-4 py-1.5 rounded-full w-fit">
          <span className="w-2 h-2 rounded-full bg-[#2e7d32]" />
          <span className="text-xs font-bold text-[#1b5e20] uppercase tracking-wider">
            About {BRAND_NAME} • হিলিফাই ন্যাচারালস
          </span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#1b4332] tracking-tight leading-tight">
          প্রকৃতির নির্ভেজাল শক্তিতে সুস্থ ও দীর্ঘায়ু জীবন।
        </h1>

        <p className="text-base sm:text-lg text-[#405342] leading-relaxed">
          বর্তমান বাজারে রাসায়নিক ও কৃত্রিম ভেজালের ভিড়ে পরিবারকে সুরক্ষিত রাখতে <strong>Healify Naturals</strong>-এর জন্ম। আমরা বিশ্বাস করি, প্রকৃতিতে বিদ্যমান ভেষজ ও জৈব উপাদানই মানবদেহের সর্বোত্তম আরোগ্যকারী। তাই সুন্দরবনের গভীর অরণ্যের কাঁচা মধু থেকে শুরু করে ঐতিহ্যবাহী কাঠের ঘানিভাঙা তেল—সবকিছুই শতভাগ খাঁটি ও পরীক্ষিত।
        </p>
      </div>

      {/* Hero Visual Pair */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-md bg-[#f4f7f2] border-2 border-white">
          <img
            src={honeyAboutImg}
            alt="১০০% খাঁটি সুন্দরবনের কাঁচা মধু ও প্রাকৃতিক চাক"
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="p-4 sm:p-6 flex flex-col gap-4">
          <span className="text-xs font-bold text-[#2e7d32] uppercase tracking-widest">
            আমাদের দর্শন • Zero Compromise on Purity
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1b4332]">
            সরাসরি উৎস থেকে আপনার টেবিলে
          </h2>
          <p className="text-sm sm:text-base text-[#405342] leading-relaxed">
            আমরা কোনো মধ্যস্বত্বভোগী বা কৃত্রিম প্রিজারভেটিভ ব্যবহার করি না। প্রতিটি পণ্য সরাসরি সংগ্রহ করা হয় কৃষক ও মৌয়ালদের থেকে। কাঠের ঘানিতে ধীরগতিতে তেল ভাঙা হয় যাতে তাপের কারণে মূল্যবান অ্যান্টিঅক্সিডেন্ট নষ্ট না হয়।
          </p>
        </div>
      </div>

      {/* 4 Pillars of Health */}
      <div className="flex flex-col gap-8">
        <div className="text-left">
          <span className="text-xs font-bold text-[#2e7d32] uppercase tracking-widest block mb-1">
            সোর্সিং ও শুদ্ধতা • Natural Heritage
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1b4332]">
            আমাদের ৪টি প্রধান প্রাকৃতিক উৎস
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-[#e8ece3] shadow-xs flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[#d97706]">
              <span className="material-symbols-outlined">hive</span>
              <h3 className="font-display text-lg font-bold text-[#1b4332]">
                ১. সুন্দরবনের গভীর অরণ্যের মধু
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#405342] leading-relaxed">
              সুন্দরবনের বাওয়ালি ও মৌয়ালদের সহায়তায় সংগৃহীত বুনো ফুলের খাঁটি মধু। কোনো চিনি বা হিট ট্রিটমেন্ট ছাড়া কাঁচা ও পুষ্টিসমৃদ্ধ।
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#e8ece3] shadow-xs flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[#0284c7]">
              <span className="material-symbols-outlined">water_drop</span>
              <h3 className="font-display text-lg font-bold text-[#1b4332]">
                ২. নাটোরের খাঁটি কালোজিরা তেল
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#405342] leading-relaxed">
              ঐতিহ্যবাহী কাঠের ঘানিতে ভাঙা কোল্ড-প্রেসড কালোজিরা তেল, যাতে রয়েছে সর্বোচ্চ থাইমোকুইনোন (TQ), যা রোগ প্রতিরোধে অতুলনীয়।
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#e8ece3] shadow-xs flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[#16a34a]">
              <span className="material-symbols-outlined">spa</span>
              <h3 className="font-display text-lg font-bold text-[#1b4332]">
                ৩. পঞ্চগড়ের অর্গানিক তুলসী ও ভেষজ চা
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#405342] leading-relaxed">
              হিমালয় পাদদেশের চা বাগান থেকে সংগৃহীত অর্গানিক তুলসী, আদা ও গ্রিন টির প্রাকৃতিক ব্লেন্ড যা মানসিক ক্লান্তি দূর করে।
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#e8ece3] shadow-xs flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[#eab308]">
              <span className="material-symbols-outlined">eco</span>
              <h3 className="font-display text-lg font-bold text-[#1b4332]">
                ৪. পাহাড়ি কাঁচা হলুদ ও সুপারফুডস
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#405342] leading-relaxed">
              বান্দরবানের উর্বর পাহাড়ি মাটির অর্গানিক কাঁচা হলুদ গুঁড়া (হাই কারকিউমিন) ও পুষ্টিসমৃদ্ধ মরিঙ্গা লিফ পাউডার।
            </p>
          </div>
        </div>
      </div>

      {/* Concierge Consultation CTA */}
      <div className="bg-[#1b4332] text-white p-8 sm:p-10 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex flex-col gap-2 text-center md:text-left">
          <span className="text-xs font-bold text-[#52b788] uppercase tracking-widest">
            Live Wellness Consultation
          </span>
          <h3 className="font-display text-2xl sm:text-3xl font-bold">
            আপনার স্বাস্থ্য অনুযায়ী সঠিক পণ্য বেছে নিন
          </h3>
          <p className="text-sm text-[#b7e4c7] max-w-xl">
            ডায়াবেটিস, গ্যাস্ট্রিক, প্রেসার বা সাধারণ সুস্থতায় কোন ভেষজ উপাদানটি কতটুকু খাবেন—তা জানতে আমাদের হোয়াটসঅ্যাপে নক দিন।
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <button
            onClick={() => onOpenWhatsApp(`Hello ${BRAND_NAME}, I would like to consult about holistic wellness.`)}
            className="bg-[#25d366] hover:bg-[#1ebe5d] text-[#005523] hover:text-white px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md active:scale-98"
          >
            <span className="material-symbols-outlined text-[20px]">chat</span>
            <span>WhatsApp Consultation</span>
          </button>
          <button
            onClick={onExploreProducts}
            className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full text-sm font-semibold transition-colors cursor-pointer"
          >
            View Catalog
          </button>
        </div>
      </div>
    </div>
  );
};
