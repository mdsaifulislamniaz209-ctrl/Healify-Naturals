import React from 'react';
import { BRAND_NAME } from '../data/products';
import { useAuth } from '../firebase/AuthContext';

interface MobileBottomBarProps {
  onOpenWhatsApp: (message?: string) => void;
  onOpenChat: () => void;
  onOpenAuth: () => void;
  onOpenHotline?: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  onOpenWhatsApp,
  onOpenChat,
  onOpenAuth,
  onOpenHotline,
}) => {
  const { currentUser, logout } = useAuth();

  return (
    <div className="fixed bottom-4 inset-x-3 z-40 md:hidden">
      <div className="bg-white/95 backdrop-blur-lg shadow-2xl p-1.5 rounded-full flex items-center justify-between gap-1 border border-[#e8ece3]">
        {/* Hotline Call Pill */}
        {onOpenHotline && (
          <button
            onClick={onOpenHotline}
            className="flex items-center gap-1.5 pl-1.5 pr-2 py-1 rounded-full hover:bg-[#f4f7f2] text-left cursor-pointer transition-colors"
            title="হটলাইন কল"
          >
            <div className="w-8 h-8 rounded-full bg-[#e0f2fe] flex items-center justify-center text-[#0284c7] shrink-0">
              <span className="material-symbols-outlined text-[17px]">call</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-[11px] font-bold text-[#1b4332]">হটলাইন</span>
              <span className="text-[9px] text-[#0284c7] font-semibold">কল করুন</span>
            </div>
          </button>
        )}

        {/* Chat Pill */}
        <button
          onClick={onOpenChat}
          className="flex items-center gap-1.5 pl-1.5 pr-2 py-1 rounded-full hover:bg-[#f4f7f2] text-left cursor-pointer transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-[#e8f5e9] flex items-center justify-center text-[#25d366] shrink-0">
            <span className="material-symbols-outlined text-[17px]">chat</span>
          </div>
          <div className="flex flex-col leading-tight">
            <div className="flex items-center gap-1">
              <span className="text-[11px] font-bold text-[#1b4332]">চ্যাট</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#25d366] animate-pulse" />
            </div>
            <span className="text-[9px] text-[#25d366] font-semibold">WhatsApp</span>
          </div>
        </button>

        {/* Auth / Account Pill */}
        {currentUser ? (
          <button
            onClick={() => logout()}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-[#f4f7f2] hover:bg-[#ffebee] text-[#405342] hover:text-[#c62828] text-[11px] font-bold cursor-pointer transition-colors border border-[#e8ece3]"
            title="Logout"
          >
            <span className="material-symbols-outlined text-[15px]">logout</span>
            <span className="truncate max-w-[65px]">
              {currentUser.displayName || currentUser.email?.split('@')[0]}
            </span>
          </button>
        ) : (
          <button
            onClick={onOpenAuth}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-[#1b4332] text-white text-[11px] font-bold cursor-pointer transition-colors shadow-xs"
          >
            <span className="material-symbols-outlined text-[15px]">login</span>
            <span>লগইন</span>
          </button>
        )}

        {/* WhatsApp Order Pill */}
        <button
          onClick={() =>
            onOpenWhatsApp(`Hello ${BRAND_NAME}, I am browsing your natural health store and need assistance.`)
          }
          className="bg-[#25d366] hover:bg-[#1ebe5d] text-[#005523] hover:text-white px-3.5 py-2 rounded-full text-[11px] font-bold flex items-center gap-1 shadow-md transition-colors cursor-pointer active:scale-98 shrink-0"
        >
          <span className="material-symbols-outlined text-[15px]">chat</span>
          <span>WhatsApp</span>
        </button>
      </div>
    </div>
  );
};
