import React from 'react';
import { PageTab } from '../types';
import {
  WHATSAPP_DISPLAY,
  WHATSAPP_NUMBER,
  HOTLINE_NUMBER_2,
  HOTLINE_DISPLAY_2,
  STUDIO_LOCATION,
  BRAND_NAME,
  BRAND_TAGLINE,
} from '../data/products';
import { useAuth } from '../firebase/AuthContext';

interface FooterProps {
  setActiveTab: (tab: PageTab) => void;
  onOpenWhatsApp: (message?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenWhatsApp }) => {
  const { isAdmin } = useAuth();

  const handleNavClick = (tab: PageTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-white mt-16 border-t border-[#e9ede4] shadow-[0_-1px_12px_rgba(0,0,0,0.03)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-14 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-[#1b4332] flex items-center justify-center text-white shadow-xs">
                <span className="material-symbols-outlined text-[20px]">nature</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-xl font-bold tracking-tight text-[#1b4332] leading-tight">
                  {BRAND_NAME}
                </span>
                <span className="text-[10px] font-bold text-[#2e7d32] uppercase tracking-wider">
                  হিলিফাই ন্যাচারালস
                </span>
              </div>
            </div>

            <p className="text-sm font-semibold text-[#1b4332]">
              {BRAND_TAGLINE}
            </p>
            <p className="text-xs sm:text-sm text-[#405342] leading-relaxed">
              সুন্দরবনের কাঁচা মধু, কাঠের ঘানিভাঙা খাঁটি তেল, পাহাড়ি অর্গানিক হলুদ ও সুপারফুডের নির্ভরযোগ্য প্রতিষ্ঠান। কোনো রাসায়নিক ভেজাল ছাড়াই বিশুদ্ধ পুষ্টির নিশ্চয়তা।
            </p>
          </div>

          {/* Quick Navigation Col */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-display text-base font-bold text-[#1b4332]">Quick Links</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-semibold">
              <li>
                <button
                  onClick={() => handleNavClick('home')}
                  className="text-[#405342] hover:text-[#1b4332] transition-colors cursor-pointer"
                >
                  Home / প্রথম পাতা
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('products')}
                  className="text-[#405342] hover:text-[#1b4332] transition-colors cursor-pointer"
                >
                  All Products / পণ্যের তালিকা
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    handleNavClick('home');
                    setTimeout(() => {
                      document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="text-[#405342] hover:text-[#1b4332] transition-colors cursor-pointer"
                >
                  How WhatsApp Order Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('about')}
                  className="text-[#405342] hover:text-[#1b4332] transition-colors cursor-pointer"
                >
                  Our Pure Story / আমাদের কথা
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('contact')}
                  className="text-[#405342] hover:text-[#1b4332] transition-colors cursor-pointer"
                >
                  Contact & Location / যোগাযোগ
                </button>
              </li>
              {isAdmin && (
                <li>
                  <button
                    onClick={() => handleNavClick('admin')}
                    className="text-[#2e7d32] hover:text-[#1b4332] font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[14px]">admin_panel_settings</span>
                    <span>Admin Panel / অ্যাডমিন</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Store Concierge Col */}
          <div className="md:col-span-5 space-y-4">
            <h4 className="font-display text-base font-bold text-[#1b4332]">Health Desk & Orders</h4>
            <div className="space-y-3 text-xs sm:text-sm text-[#405342]">
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[#2e7d32] text-[20px] shrink-0 mt-0.5">
                  location_on
                </span>
                <span>{STUDIO_LOCATION}</span>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#2e7d32] text-[20px] shrink-0">
                    phone_in_talk
                  </span>
                  <span className="font-semibold text-xs text-[#1b4332]">হটলাইন কল ও পরামর্শ:</span>
                </div>
                <div className="pl-7 flex flex-wrap items-center gap-2 text-xs">
                  <a
                    href={`tel:${WHATSAPP_NUMBER}`}
                    className="font-bold text-[#1b4332] hover:text-[#2e7d32] flex items-center gap-1 bg-[#f0f4ee] px-2.5 py-1 rounded-md transition-colors"
                    title="হটলাইন ১ কল করুন"
                  >
                    <span className="material-symbols-outlined text-[14px] text-[#25d366]">call</span>
                    <span>১: {WHATSAPP_DISPLAY}</span>
                  </a>
                  <a
                    href={`tel:${HOTLINE_NUMBER_2}`}
                    className="font-bold text-[#1b4332] hover:text-[#2e7d32] flex items-center gap-1 bg-[#f0f4ee] px-2.5 py-1 rounded-md transition-colors"
                    title="হটলাইন ২ কল করুন"
                  >
                    <span className="material-symbols-outlined text-[14px] text-[#0284c7]">call</span>
                    <span>২: {HOTLINE_DISPLAY_2}</span>
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#25d366] text-[20px] shrink-0">
                  chat
                </span>
                <span>
                  WhatsApp:{' '}
                  <button
                    onClick={() =>
                      onOpenWhatsApp(`Hello ${BRAND_NAME}, I would like to place an order.`)
                    }
                    className="font-bold text-[#1b4332] hover:underline cursor-pointer"
                  >
                    {WHATSAPP_DISPLAY}
                  </button>{' '}
                  (সকাল ৯টা – রাত ১১টা)
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[#52b788] text-[20px] shrink-0 mt-0.5">
                  local_shipping
                </span>
                <span>
                  সারা বাংলাদেশে দ্রুততম হোম ডেলিভারি ও ক্যাশ অন ডেলিভারি (COD)। পণ্য দেখে বুঝে মূল্য পরিশোধ করুন।
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sub-footer banner */}
        <div className="mt-12 pt-6 border-t border-[#e9ede4] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left bg-[#f4f7f2] px-6 py-4 rounded-full">
          <p className="text-xs font-semibold text-[#405342]">
            © {new Date().getFullYear()} {BRAND_NAME}. All rights reserved • ১০০% খাঁটি প্রাকৃতিক স্বাস্থ্যসেবা
          </p>
          <p className="text-xs font-semibold text-[#1b4332] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#2e7d32] inline-block" />
            100% Pure Organic Lab Tested Guarantee
          </p>
        </div>
      </div>
    </footer>
  );
};
