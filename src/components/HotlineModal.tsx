import React from 'react';
import {
  BRAND_NAME,
  WHATSAPP_NUMBER,
  WHATSAPP_DISPLAY,
  HOTLINE_NUMBER_2,
  HOTLINE_DISPLAY_2,
} from '../data/products';

interface HotlineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWhatsApp?: (customMsg?: string) => void;
}

export const HotlineModal: React.FC<HotlineModalProps> = ({
  isOpen,
  onClose,
  onOpenWhatsApp,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-[#e8ece3] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#1b4332] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#86efac]">
              <span className="material-symbols-outlined text-[24px]">phone_in_talk</span>
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-white">
                হটলাইন ও সরাসরি কল
              </h3>
              <p className="text-[11px] text-[#b7e4c7]">
                {BRAND_NAME} কাস্টমার কেয়ার ও স্বাস্থ্য পরামর্শ
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            title="বন্ধ করুন"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 flex flex-col gap-4 bg-[#fafbfa]">
          <p className="text-xs text-[#405342] leading-relaxed">
            যেকোনো পণ্য সংক্রান্ত তথ্য, দ্রুত অর্ডার অথবা বিনামূল্যে স্বাস্থ্য পরামর্শের জন্য আমাদের নিচের যেকোনো একটি নম্বরে সরাসরি কল করুন:
          </p>

          {/* Number 1: WhatsApp + Call */}
          <div className="bg-white p-4 rounded-2xl border border-[#d8ded3] shadow-xs flex flex-col gap-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#25d366] shrink-0" />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#2e7d32]">
                    হটলাইন ১ (কল ও WhatsApp)
                  </span>
                  <h4 className="text-base font-bold text-[#1b4332]">
                    {WHATSAPP_DISPLAY}
                  </h4>
                </div>
              </div>
              <span className="text-[10px] bg-[#e8f5e9] text-[#1b5e20] font-semibold px-2 py-0.5 rounded-full">
                সকাল ৯টা – রাত ১১টা
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#f0f4ee]">
              <a
                href={`tel:${WHATSAPP_NUMBER}`}
                className="px-3 py-2 bg-[#1b4332] hover:bg-[#2d6a4f] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <span className="material-symbols-outlined text-[16px]">call</span>
                <span>সরাসরি কল</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onOpenWhatsApp) {
                    onOpenWhatsApp(`Hello ${BRAND_NAME}, আমি হটলাইন সংক্রান্ত তথ্য ও অর্ডার করতে চাই।`);
                  } else {
                    window.open(`https://wa.me/${WHATSAPP_NUMBER}`, '_blank');
                  }
                }}
                className="px-3 py-2 bg-[#25d366] hover:bg-[#1ebe5d] text-[#005523] hover:text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">chat</span>
                <span>WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Number 2: Dedicated Hotline Call */}
          <div className="bg-white p-4 rounded-2xl border border-[#d8ded3] shadow-xs flex flex-col gap-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0284c7] shrink-0" />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#0284c7]">
                    হটলাইন ২ (সরাসরি কল)
                  </span>
                  <h4 className="text-base font-bold text-[#1b4332]">
                    {HOTLINE_DISPLAY_2}
                  </h4>
                </div>
              </div>
              <span className="text-[10px] bg-[#e0f2fe] text-[#0369a1] font-semibold px-2 py-0.5 rounded-full">
                যেকোনো সময়
              </span>
            </div>

            <div className="pt-1 border-t border-[#f0f4ee]">
              <a
                href={`tel:${HOTLINE_NUMBER_2}`}
                className="w-full px-4 py-2.5 bg-[#0284c7] hover:bg-[#0369a1] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <span className="material-symbols-outlined text-[18px]">call</span>
                <span>কল করুন ({HOTLINE_DISPLAY_2})</span>
              </a>
            </div>
          </div>

          {/* Bottom Info note */}
          <div className="flex items-center gap-2 p-2.5 bg-[#f4f7f2] rounded-xl text-[11px] text-[#405342]">
            <span className="material-symbols-outlined text-[18px] text-[#2e7d32] shrink-0">
              support_agent
            </span>
            <span>
              আমাদের অভিজ্ঞ স্বাস্থ্য টিম আপনাকে সঠিক প্রাকৃতিক পণ্য নির্বাচনে সহায়তা করতে প্রস্তুত।
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
