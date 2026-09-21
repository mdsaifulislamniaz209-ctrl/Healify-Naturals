import React, { useState } from 'react';
import {
  WHATSAPP_DISPLAY,
  WHATSAPP_NUMBER,
  HOTLINE_NUMBER_2,
  HOTLINE_DISPLAY_2,
  STUDIO_LOCATION,
  BRAND_NAME,
} from '../data/products';
import { saveContactSubmissionToFirebase } from '../firebase/db';

interface ContactViewProps {
  onOpenWhatsApp: (message?: string) => void;
}

export const ContactView: React.FC<ContactViewProps> = () => {
  const [inquiryType, setInquiryType] = useState('পণ্য অর্ডার ও ডেলিভারি তথ্য');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Save to Firestore
    saveContactSubmissionToFirebase({
      name: name.trim(),
      phone: phone.trim(),
      inquiryType,
      message: notes.trim(),
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);

    let msg = `Hello ${BRAND_NAME} Health Desk!\n\nবিষয় / Topic: ${inquiryType}\n`;
    if (name.trim()) msg += `• নাম / Name: ${name.trim()}\n`;
    if (phone.trim()) msg += `• মোবাইল / Phone: ${phone.trim()}\n`;
    if (notes.trim()) msg += `• জিজ্ঞাসা / Details: ${notes.trim()}\n`;
    msg += `\nঅনুগ্রহ করে আমার সাথে যোগাযোগ করুন। ধন্যবাদ!`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-12 max-w-5xl mx-auto flex flex-col gap-12">
      <div className="flex flex-col gap-2 text-left">
        <span className="text-xs font-bold text-[#2e7d32] uppercase tracking-widest">
          যোগাযোগ ও স্বাস্থ্যসেবা ডেস্ক
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#1b4332]">
          Healify Naturals Health Desk
        </h1>
        <p className="text-sm sm:text-base text-[#405342] max-w-2xl">
          পণ্য অর্ডার, হোম ডেলিভারি ট্র্যাকিং বা আপনার স্বাস্থ্যের জন্য কোন প্রাকৃতিক উপাদানটি সেরা হবে—তা জানতে সরাসরি আমাদের সাথে যোগাযোগ করুন।
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Contact Info Cards */}
        <div className="md:col-span-5 flex flex-col gap-4">
          <div className="p-6 bg-white rounded-2xl border border-[#e8ece3] flex flex-col gap-2 shadow-xs">
            <div className="flex items-center gap-2 text-[#2e7d32]">
              <span className="material-symbols-outlined text-[22px]">storefront</span>
              <span className="font-display text-base font-bold text-[#1b4332]">
                Our Location
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#405342]">{STUDIO_LOCATION}</p>
            <p className="text-[11px] text-[#52b788] font-semibold">
              সকাল ১০টা থেকে রাত ৯টা (সরাসরি পিকআপের সুবিধা রয়েছে)
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-[#e8ece3] flex flex-col gap-3 shadow-xs">
            <div className="flex items-center gap-2 text-[#1b4332]">
              <span className="material-symbols-outlined text-[22px] text-[#25d366]">phone_in_talk</span>
              <span className="font-display text-base font-bold text-[#1b4332]">
                হটলাইন ও সরাসরি হেল্পলাইন
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#405342]">
              আমাদের স্বাস্থ্য ও সাপোর্ট টিম দ্রুততম সময়ে আপনার কল ও বার্তার উত্তর দিয়ে থাকে।
            </p>

            <div className="flex flex-col gap-2 pt-1 border-t border-[#f0f4ee]">
              {/* Hotline 1 */}
              <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-[#f8faf7] border border-[#e8ece3]">
                <div>
                  <span className="text-[10px] font-bold text-[#2e7d32] uppercase block">
                    হটলাইন ১ (কল ও WhatsApp)
                  </span>
                  <span className="text-sm font-bold text-[#1b4332]">{WHATSAPP_DISPLAY}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <a
                    href={`tel:${WHATSAPP_NUMBER}`}
                    className="p-2 bg-[#1b4332] text-white rounded-lg hover:bg-[#2d6a4f] transition-colors"
                    title="সরাসরি কল করুন"
                  >
                    <span className="material-symbols-outlined text-[16px]">call</span>
                  </a>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 bg-[#25d366] text-white rounded-lg hover:bg-[#1ebe5d] transition-colors"
                    title="হোয়াটসঅ্যাপে নক দিন"
                  >
                    <span className="material-symbols-outlined text-[16px]">chat</span>
                  </a>
                </div>
              </div>

              {/* Hotline 2 */}
              <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-[#f0f9ff] border border-[#bae6fd]">
                <div>
                  <span className="text-[10px] font-bold text-[#0369a1] uppercase block">
                    হটলাইন ২ (সরাসরি কল)
                  </span>
                  <span className="text-sm font-bold text-[#1b4332]">{HOTLINE_DISPLAY_2}</span>
                </div>
                <a
                  href={`tel:${HOTLINE_NUMBER_2}`}
                  className="px-3 py-2 bg-[#0284c7] hover:bg-[#0369a1] text-white rounded-lg font-bold text-xs flex items-center gap-1 transition-colors"
                  title="হটলাইন ২ নম্বরে কল করুন"
                >
                  <span className="material-symbols-outlined text-[16px]">call</span>
                  <span>কল</span>
                </a>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-[#e8ece3] flex flex-col gap-2 shadow-xs">
            <div className="flex items-center gap-2 text-[#0284c7]">
              <span className="material-symbols-outlined text-[22px]">local_shipping</span>
              <span className="font-display text-base font-bold text-[#1b4332]">
                ডেলিভারি ও ক্যাশ অন ডেলিভারি
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#405342]">
              ঢাকা সিটির ভেতর ২৪-৪৮ ঘণ্টা, ঢাকার বাইরে সারা দেশে ২-৩ দিনের মধ্যে নির্ভরযোগ্য হোম ডেলিভারি।
            </p>
          </div>
        </div>

        {/* Instant WhatsApp Inquiry Form */}
        <div className="md:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#e8ece3] shadow-xs flex flex-col gap-5">
          <div className="flex flex-col gap-1 border-b border-[#e8ece3] pb-4">
            <h2 className="font-display text-xl font-bold text-[#1b4332]">
              Send Instant Message / দ্রুত বার্তা পাঠান
            </h2>
            <p className="text-xs text-[#405342]">
              ফরমটি পূরণ করে সাবমিট করলে সরাসরি হোয়াটসঅ্যাপ চ্যাট ওপেন হবে।
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs sm:text-sm">
            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-[#1b4332]">বিষয় সিলেক্ট করুন (Inquiry Type)</label>
              <select
                value={inquiryType}
                onChange={(e) => setInquiryType(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#fbfbfa] border border-[#e8ece3] text-[#1b4332] font-semibold focus:outline-[#2e7d32]"
              >
                <option value="পণ্য অর্ডার ও ডেলিভারি তথ্য">পণ্য অর্ডার ও ডেলিভারি তথ্য (Order & Delivery)</option>
                <option value="স্বাস্থ্য ও ভেষজ সেবন পরামর্শ">স্বাস্থ্য ও ভেষজ সেবন পরামর্শ (Health Consultation)</option>
                <option value="পাইকারি ও বাল্ক অর্ডার">পাইকারি ও বাল্ক অর্ডার (Wholesale / Bulk Order)</option>
                <option value="অন্যান্য জিজ্ঞাসা">অন্যান্য জিজ্ঞাসা (General Inquiry)</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-[#1b4332]">আপনার নাম</label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: মোঃ সাইফুল ইসলাম"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#fbfbfa] border border-[#e8ece3] text-[#1b4332] focus:outline-[#2e7d32]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-[#1b4332]">মোবাইল নম্বর</label>
                <input
                  type="tel"
                  required
                  placeholder="যেমন: 017XXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#fbfbfa] border border-[#e8ece3] text-[#1b4332] focus:outline-[#2e7d32]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-[#1b4332]">আপনার বার্তা বা ঠিকানা (Message / Address)</label>
              <textarea
                rows={3}
                required
                placeholder="কোন পণ্যটি কত পরিমাণ প্রয়োজন বা আপনার স্বাস্থ্য জিজ্ঞাসা লিখুন..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#fbfbfa] border border-[#e8ece3] text-[#1b4332] focus:outline-[#2e7d32] resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#25d366] hover:bg-[#1ebe5d] text-[#005523] hover:text-white py-3 rounded-full font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md active:scale-98 mt-2"
            >
              <span className="material-symbols-outlined text-[20px]">chat</span>
              <span>Send Message to WhatsApp</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
