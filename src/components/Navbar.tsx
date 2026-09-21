import React, { useState } from 'react';
import { PageTab } from '../types';
import {
  WHATSAPP_DISPLAY,
  WHATSAPP_NUMBER,
  HOTLINE_NUMBER_2,
  HOTLINE_DISPLAY_2,
} from '../data/products';
import { useAuth } from '../firebase/AuthContext';

interface NavbarProps {
  activeTab: PageTab;
  setActiveTab: (tab: PageTab) => void;
  onOpenWhatsApp: (message?: string) => void;
  onOpenChat: () => void;
  onOpenAuth: () => void;
  onOpenHotline?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenWhatsApp,
  onOpenChat,
  onOpenAuth,
  onOpenHotline,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { currentUser, userProfile, isAdmin, logout } = useAuth();

  const handleNavClick = (tab: PageTab) => {
    if (tab === 'admin') {
      if (!currentUser) {
        setActiveTab('admin');
        onOpenAuth();
        setMobileMenuOpen(false);
        setUserDropdownOpen(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
    }
    setActiveTab(tab);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = async () => {
    setUserDropdownOpen(false);
    await logout();
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#fbfbfa]/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#e9ede4]">
      {/* Top Banner */}
      <div className="bg-[#1b4332] text-white px-4 sm:px-6 py-1.5 text-center text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 sm:gap-4 flex-wrap font-semibold">
          <span className="flex items-center gap-1 text-[#86efac]">
            <span className="material-symbols-outlined text-[15px]">eco</span>
            ১০০% খাঁটি ও নির্ভেজাল স্বাস্থ্যপণ্য
          </span>
          <span className="hidden sm:inline opacity-40">•</span>
          <div className="flex items-center gap-1.5 flex-wrap justify-center">
            <span className="material-symbols-outlined text-[#86efac] text-[15px]">phone_in_talk</span>
            <span className="text-[#e8f5e9]">হটলাইন কল:</span>
            <a
              href={`tel:${WHATSAPP_NUMBER}`}
              className="font-bold text-[#b7e4c7] hover:underline flex items-center gap-0.5"
              title="হটলাইন ১ (কল ও WhatsApp)"
            >
              <span>{WHATSAPP_DISPLAY}</span>
            </a>
            <span className="opacity-40">/</span>
            <a
              href={`tel:${HOTLINE_NUMBER_2}`}
              className="font-bold text-[#b7e4c7] hover:underline flex items-center gap-0.5"
              title="হটলাইন ২ (সরাসরি কল)"
            >
              <span>{HOTLINE_DISPLAY_2}</span>
            </a>
            {onOpenHotline && (
              <button
                type="button"
                onClick={onOpenHotline}
                className="ml-1 bg-white/15 hover:bg-white/25 text-white text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors cursor-pointer"
              >
                কল অপশন
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="h-20 max-w-7xl mx-auto px-4 sm:px-8 lg:px-14 flex items-center justify-between gap-4">
        {/* Brand Logo & Bangla Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 group text-left cursor-pointer"
            aria-label="Go to homepage"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#2d6a4f] flex items-center justify-center text-white shadow-sm group-hover:bg-[#1b4332] transition-colors">
              <span className="material-symbols-outlined text-[22px]">nature</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl font-bold tracking-tight text-[#1b4332] leading-none group-hover:text-[#2d6a4f] transition-colors">
                Healify Naturals
              </span>
              <span className="text-[11px] font-semibold text-[#52b788] tracking-widest uppercase mt-1 leading-none">
                হিলিফাই ন্যাচারালস
              </span>
            </div>
          </button>
        </div>

        {/* Center Desktop Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1.5 bg-[#f4f7f2] p-1.5 rounded-full border border-[#e8ece3]">
          <button
            onClick={() => handleNavClick('home')}
            className={`px-4 py-2 text-sm font-semibold rounded-full transition-all cursor-pointer ${
              activeTab === 'home'
                ? 'bg-[#1b4332] text-white shadow-xs'
                : 'text-[#405342] hover:text-[#1b4332] hover:bg-[#e8ece3]'
            }`}
          >
            Home / প্রথম পাতা
          </button>

          <button
            onClick={() => handleNavClick('products')}
            className={`px-4 py-2 text-sm font-semibold rounded-full transition-all cursor-pointer ${
              activeTab === 'products'
                ? 'bg-[#1b4332] text-white shadow-xs'
                : 'text-[#405342] hover:text-[#1b4332] hover:bg-[#e8ece3]'
            }`}
          >
            Products / সম্ভার
          </button>

          <button
            onClick={() => handleNavClick('about')}
            className={`px-4 py-2 text-sm font-semibold rounded-full transition-all cursor-pointer ${
              activeTab === 'about'
                ? 'bg-[#1b4332] text-white shadow-xs'
                : 'text-[#405342] hover:text-[#1b4332] hover:bg-[#e8ece3]'
            }`}
          >
            About / আমাদের কথা
          </button>

          <button
            onClick={() => handleNavClick('contact')}
            className={`px-4 py-2 text-sm font-semibold rounded-full transition-all cursor-pointer ${
              activeTab === 'contact'
                ? 'bg-[#1b4332] text-white shadow-xs'
                : 'text-[#405342] hover:text-[#1b4332] hover:bg-[#e8ece3]'
            }`}
          >
            Contact / যোগাযোগ
          </button>

          {isAdmin && (
            <button
              onClick={() => handleNavClick('admin')}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'admin'
                  ? 'bg-[#1a1c1c] text-white shadow-xs'
                  : 'text-[#3c4a3d] hover:text-[#1a1c1c] hover:bg-[#eeeeee]'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">admin_panel_settings</span>
              <span>Admin</span>
            </button>
          )}
        </nav>

        {/* Right Action: WhatsApp + Live Chat + Auth / Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Live Chat Button */}
          <button
            onClick={onOpenChat}
            className="flex items-center gap-1.5 bg-[#e8f5e9] hover:bg-[#c8e6c9] text-[#1b5e20] px-3 sm:px-4 py-2 rounded-full transition-all cursor-pointer font-bold text-xs border border-[#a5d6a7]"
            title="লাইভ চ্যাট (সরাসরি WhatsApp-এ যুক্ত)"
          >
            <span className="material-symbols-outlined text-[17px] text-[#25d366]">chat</span>
            <span className="hidden sm:inline">লাইভ চ্যাট</span>
            <span className="w-2 h-2 rounded-full bg-[#25d366] animate-pulse" />
          </button>

          {/* WhatsApp Order Button */}
          <button
            onClick={() => onOpenWhatsApp('Hello Healify Naturals, I would like to inquire about your natural health products.')}
            className="group flex items-center gap-2 bg-[#25d366] hover:bg-[#1ebe5d] text-[#005523] hover:text-[#ffffff] px-3.5 sm:px-5 py-2 rounded-full shadow-[0_8px_24px_-4px_rgba(37,211,102,0.28)] transition-all cursor-pointer active:scale-98"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
            <div className="flex flex-col text-left">
              <span className="text-sm font-bold leading-none">Order on WhatsApp</span>
              <span className="text-[11px] font-semibold text-[#005523] group-hover:text-white leading-none mt-0.5 opacity-90 hidden sm:inline">
                Direct Support
              </span>
            </div>
          </button>

          {/* Authentication Pill / User Dropdown */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-[#f4f7f2] hover:bg-[#e8ece3] border border-[#e8ece3] cursor-pointer transition-all"
              >
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt="User"
                    className="w-7 h-7 rounded-full object-cover ring-1 ring-[#2e7d32]"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-[#1b4332] text-white flex items-center justify-center text-xs font-bold">
                    {(currentUser.displayName || currentUser.email || 'U')[0].toUpperCase()}
                  </div>
                )}
                <span className="text-xs font-bold text-[#1b4332] max-w-[90px] truncate hidden sm:inline">
                  {currentUser.displayName || currentUser.email?.split('@')[0]}
                </span>
                <span className="material-symbols-outlined text-[16px] text-[#708272]">
                  expand_more
                </span>
              </button>

              {userDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#e8ece3] p-2 flex flex-col gap-1 animate-in fade-in slide-in-from-top-2 duration-150 z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="px-3 py-2 border-b border-[#e8ece3]">
                    <p className="text-xs font-bold text-[#1b4332] truncate">
                      {currentUser.displayName || 'সম্মানিত গ্রাহক'}
                    </p>
                    <p className="text-[11px] text-[#708272] truncate">{currentUser.email}</p>
                    {userProfile?.role === 'admin' && (
                      <span className="inline-block mt-1 text-[10px] uppercase font-extrabold bg-[#1b4332] text-white px-2 py-0.5 rounded">
                        Administrator
                      </span>
                    )}
                  </div>

                  {isAdmin && (
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        handleNavClick('admin');
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-[#1b4332] hover:bg-[#f4f7f2] flex items-center gap-2 cursor-pointer transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px] text-[#2e7d32]">
                        admin_panel_settings
                      </span>
                      <span>অ্যাডমিন ড্যাশবোর্ড</span>
                    </button>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-[#c62828] hover:bg-[#ffebee] flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">logout</span>
                    <span>লগআউট (Logout)</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full bg-[#1b4332] hover:bg-[#2d6a4f] text-white text-xs font-bold cursor-pointer transition-all shadow-xs active:scale-98"
            >
              <span className="material-symbols-outlined text-[16px]">account_circle</span>
              <span>লগইন</span>
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#1a1c1c] hover:bg-[#eeeeee]"
            aria-label="Toggle Navigation"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#f9f9f9] border-t border-[#e2e2e2] px-6 py-4 flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <button
            onClick={() => handleNavClick('home')}
            className={`text-left px-4 py-2.5 rounded-xl font-semibold text-sm ${
              activeTab === 'home' ? 'bg-[#e8e8e8] text-[#1a1c1c]' : 'text-[#3c4a3d]'
            }`}
          >
            Home / প্রথম পাতা
          </button>
          <button
            onClick={() => handleNavClick('products')}
            className={`text-left px-4 py-2.5 rounded-xl font-semibold text-sm ${
              activeTab === 'products' ? 'bg-[#e8e8e8] text-[#1a1c1c]' : 'text-[#3c4a3d]'
            }`}
          >
            Products / সম্ভার
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className={`text-left px-4 py-2.5 rounded-xl font-semibold text-sm ${
              activeTab === 'about' ? 'bg-[#e8e8e8] text-[#1a1c1c]' : 'text-[#3c4a3d]'
            }`}
          >
            About / আমাদের কথা
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className={`text-left px-4 py-2.5 rounded-xl font-semibold text-sm ${
              activeTab === 'contact' ? 'bg-[#e8e8e8] text-[#1a1c1c]' : 'text-[#3c4a3d]'
            }`}
          >
            Contact / যোগাযোগ
          </button>
          {isAdmin && (
            <button
              onClick={() => handleNavClick('admin')}
              className={`text-left px-4 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 ${
                activeTab === 'admin' ? 'bg-[#1a1c1c] text-white' : 'text-[#3c4a3d]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">admin_panel_settings</span>
              <span>Admin Panel / অ্যাডমিন প্যানেল</span>
            </button>
          )}

          <div className="pt-2 border-t border-[#e8ece3] mt-2">
            {currentUser ? (
              <div className="flex items-center justify-between p-2 bg-white rounded-xl border border-[#e8ece3]">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#1b4332]">
                    {currentUser.displayName || currentUser.email}
                  </span>
                  <span className="text-[10px] text-[#708272]">লগইন আছেন</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 rounded-lg bg-[#ffebee] text-[#c62828] text-xs font-bold cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth();
                }}
                className="w-full py-2.5 rounded-xl bg-[#1b4332] text-white text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[18px]">account_circle</span>
                <span>লগইন বা রেজিস্টার করুন</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
