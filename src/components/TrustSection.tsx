import React from 'react';

export const TrustSection: React.FC = () => {
  return (
    <section className="w-full px-4 sm:px-8 lg:px-14 py-16 bg-[#fbfbfa]">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        <div className="text-center max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-[#2e7d32] text-xs font-bold tracking-wider uppercase mb-1">
            <span className="material-symbols-outlined text-[16px]">verified_user</span>
            <span>আমাদের অঙ্গীকার • The Healify Promise</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1b4332]">
            নিখাদ বিশুদ্ধতার ৪টি স্তম্ভ
          </h2>
          <p className="text-sm sm:text-base text-[#405342] mt-1.5">
            আপনার পরিবারের সুস্বাস্থ্য নিশ্চিত করতে কোনো রাসায়নিক বা প্রিজারভেটিভ ছাড়াই শতভাগ ন্যাচারাল পুষ্টি।
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Benefit 1 */}
          <div className="p-7 bg-white rounded-2xl shadow-xs flex flex-col gap-3 text-left border border-[#e8ece3] hover:border-[#b7e4c7] transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#e8f5e9] flex items-center justify-center text-[#2e7d32]">
              <span className="material-symbols-outlined text-[28px]">biotech</span>
            </div>
            <h3 className="font-display text-base font-bold text-[#1b4332]">
              ল্যাব টেস্টে ১০০% খাঁটি
            </h3>
            <p className="text-xs sm:text-sm text-[#405342] leading-relaxed">
              চিনির সিরা বা কৃত্রিম ফ্লেভার মুক্ত। প্রতিটি ব্যাচ আধুনিক ল্যাব টেস্টে উত্তীর্ণ হয়ে প্যাকেজিং করা হয়।
            </p>
          </div>

          {/* Benefit 2 */}
          <div className="p-7 bg-white rounded-2xl shadow-xs flex flex-col gap-3 text-left border border-[#e8ece3] hover:border-[#b7e4c7] transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#fef3c7] flex items-center justify-center text-[#d97706]">
              <span className="material-symbols-outlined text-[28px]">nature_people</span>
            </div>
            <h3 className="font-display text-base font-bold text-[#1b4332]">
              সরাসরি কৃষক ও মৌয়াল
            </h3>
            <p className="text-xs sm:text-sm text-[#405342] leading-relaxed">
              মধ্যস্বত্বভোগী ছাড়া সুন্দরবনের মৌয়াল এবং প্রান্তিক জৈব কৃষকদের থেকে সরাসরি সংগৃহীত।
            </p>
          </div>

          {/* Benefit 3 */}
          <div className="p-7 bg-white rounded-2xl shadow-xs flex flex-col gap-3 text-left border border-[#e8ece3] hover:border-[#b7e4c7] transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#e0f2fe] flex items-center justify-center text-[#0284c7]">
              <span className="material-symbols-outlined text-[28px]">water_drop</span>
            </div>
            <h3 className="font-display text-base font-bold text-[#1b4332]">
              কাঠের ঘানি ও কোল্ড-প্রেস
            </h3>
            <p className="text-xs sm:text-sm text-[#405342] leading-relaxed">
              অতিরিক্ত তাপ প্রয়োগ ছাড়া তেল ভাঙা হয়, ফলে ওমেগা ফ্যাটি এসিড ও ভিটামিন শতভাগ সংরক্ষিত থাকে।
            </p>
          </div>

          {/* Benefit 4 */}
          <div className="p-7 bg-white rounded-2xl shadow-xs flex flex-col gap-3 text-left border border-[#e8ece3] hover:border-[#b7e4c7] transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#dcfce7] flex items-center justify-center text-[#16a34a]">
              <span className="material-symbols-outlined text-[28px]">payments</span>
            </div>
            <h3 className="font-display text-base font-bold text-[#1b4332]">
              হাতে পেয়ে মূল্য দিন (COD)
            </h3>
            <p className="text-xs sm:text-sm text-[#405342] leading-relaxed">
              পণ্য দেখে বুঝে নেওয়ার শতভাগ নিরাপত্তা। কোনো ভেজাল প্রমাণে তাৎক্ষণিক ফুল রিফান্ড গ্যারান্টি।
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
