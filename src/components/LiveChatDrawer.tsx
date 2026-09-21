import React, { useState, useEffect, useRef } from 'react';
import {
  subscribeToChatMessages,
  sendChatMessageToFirebase,
  ChatMessage
} from '../firebase/db';
import { BRAND_NAME, WHATSAPP_NUMBER, WHATSAPP_DISPLAY } from '../data/products';
import { useAuth } from '../firebase/AuthContext';

interface LiveChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  productContext?: string;
}

const QUICK_PROMPTS = [
  '🌿 স্বাস্থ্য ও সেবন পরামর্শ নিতে চাই',
  '📦 ডেলিভারি চার্জ ও ডেলিভারির সময় কত?',
  '🍯 খাঁটি পণ্যের অর্ডার করতে চাই',
  '🩺 শারীরিক সমস্যার জন্য সঠিক ভেষজ দাওয়াই কোনটা?',
];

export const LiveChatDrawer: React.FC<LiveChatDrawerProps> = ({
  isOpen,
  onClose,
  productContext,
}) => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [customerName, setCustomerName] = useState(() => {
    return localStorage.getItem('healify_user_name') || '';
  });
  const [customerPhone, setCustomerPhone] = useState(() => {
    return localStorage.getItem('healify_user_phone') || '';
  });
  const [lastSentWaUrl, setLastSentWaUrl] = useState<string | null>(null);
  const [sentSuccessNotice, setSentSuccessNotice] = useState(false);

  useEffect(() => {
    if (currentUser) {
      if (currentUser.displayName && !customerName) {
        setCustomerName(currentUser.displayName);
      }
    }
  }, [currentUser]);

  const [isSending, setIsSending] = useState(false);
  const [showIdentityInputs, setShowIdentityInputs] = useState(!customerName || !customerPhone);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Real-time Firestore sync
  useEffect(() => {
    if (!isOpen) return;
    const unsubscribe = subscribeToChatMessages((fetchedMsgs) => {
      setMessages(fetchedMsgs);
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    });
    return () => unsubscribe();
  }, [isOpen]);

  const formatWhatsAppMessage = (text: string, name: string, phone: string) => {
    const lines = [
      `💬 *${BRAND_NAME} লাইভ চ্যাট মেসেজ*`,
      `━━━━━━━━━━━━━━━━━━━━`,
      `👤 *গ্রাহকের নাম:* ${name || 'সম্মানিত গ্রাহক'}`,
    ];

    if (phone.trim()) {
      lines.push(`📱 *মোবাইল নম্বর:* ${phone.trim()}`);
    } else {
      lines.push(`📱 *মোবাইল নম্বর:* ওয়েব ইউজার`);
    }

    if (productContext) {
      lines.push(`🌿 *পণ্য/বিষয়:* ${productContext}`);
    }

    lines.push(`━━━━━━━━━━━━━━━━━━━━`);
    lines.push(`📝 *বার্তা:*`);
    lines.push(`"${text.trim()}"`);
    lines.push(`━━━━━━━━━━━━━━━━━━━━`);
    lines.push(`(ওয়েবসাইট লাইভ চ্যাট থেকে প্রেরিত — সরাসরি এখানে রিপ্লাই দিন)`);

    return lines.join('\n');
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const textToSend = inputText.trim();
    if (!textToSend) return;

    const senderDisplayName = customerName.trim() || 'সম্মানিত গ্রাহক';
    if (customerName.trim()) {
      localStorage.setItem('healify_user_name', customerName.trim());
    }
    if (customerPhone.trim()) {
      localStorage.setItem('healify_user_phone', customerPhone.trim());
    }

    // Build WhatsApp URL
    const fullWaText = formatWhatsAppMessage(textToSend, senderDisplayName, customerPhone);
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(fullWaText)}`;
    setLastSentWaUrl(waUrl);

    // 1. Immediately open WhatsApp so message lands directly in Admin's WhatsApp
    try {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.error('Failed to open WhatsApp window:', err);
    }

    setIsSending(true);
    setSentSuccessNotice(true);

    // 2. Also log to Firebase Firestore for real-time history
    try {
      const chatPayload: {
        sender: 'user';
        senderName: string;
        text: string;
        phone?: string;
        productContext?: string;
      } = {
        sender: 'user',
        senderName: senderDisplayName,
        text: textToSend,
      };
      if (customerPhone.trim()) {
        chatPayload.phone = customerPhone.trim();
      }
      if (productContext && productContext.trim()) {
        chatPayload.productContext = productContext.trim();
      }

      await sendChatMessageToFirebase(chatPayload);
      setInputText('');
    } catch (err) {
      console.error('Failed to send to Firestore:', err);
    } finally {
      setIsSending(false);
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleQuickPromptClick = (prompt: string) => {
    setInputText(prompt);
  };

  const handleDirectWhatsAppClick = () => {
    const senderDisplayName = customerName.trim() || 'সম্মানিত গ্রাহক';
    const waText = `Hello ${BRAND_NAME}!\n\nআমি ওয়েবসাইট লাইভ চ্যাট থেকে সরাসরি যোগাযোগ করছি।\n👤 নাম: ${senderDisplayName}${customerPhone.trim() ? `\n📱 মোবাইল: ${customerPhone.trim()}` : ''}${productContext ? `\n🌿 বিষয়: ${productContext}` : ''}\n\nঅনুগ্রহ করে আমার সাথে যোগাযোগ করুন।`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`, '_blank', 'noopener,noreferrer');
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-end"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md h-full flex flex-col justify-between shadow-2xl border-l border-[#e8ece3] animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#e8ece3] bg-[#fbfbfa] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#25d366]/15 flex items-center justify-center text-[#1b5e20] shadow-xs">
              <span className="material-symbols-outlined text-[24px] text-[#25d366]">chat</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-display text-base font-bold text-[#1b4332]">
                  লাইভ চ্যাট ও সাপোর্ট
                </h3>
                <span className="inline-block w-2 h-2 rounded-full bg-[#25d366] animate-pulse" />
              </div>
              <p className="text-[11px] text-[#2e7d32] font-semibold flex items-center gap-1">
                <span>🟢 WhatsApp এ কানেক্টেড</span>
                <span className="text-[#708272] font-normal">• সরাসরি রিপ্লাই পাবেন</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowIdentityInputs(!showIdentityInputs)}
              className="p-1.5 text-[#405342] hover:text-[#1b4332] rounded-full hover:bg-white transition-colors"
              title="নাম ও মোবাইল নম্বর পরিবর্তন"
            >
              <span className="material-symbols-outlined text-[20px]">badge</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-[#405342] hover:text-[#1b4332] rounded-full hover:bg-white transition-colors"
            >
              <span className="material-symbols-outlined text-[22px]">close</span>
            </button>
          </div>
        </div>

        {/* WhatsApp Sync Info Notice */}
        <div className="bg-[#e8f5e9] px-4 py-2 border-b border-[#c8e6c9] flex items-center justify-between text-xs text-[#1b5e20]">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-[#25d366]">sync</span>
            <span className="font-medium text-[11px]">মেসেজ সরাসরি আমাদের WhatsApp-এ যাবে ও রিপ্লাই পাবেন</span>
          </div>
          <button
            onClick={handleDirectWhatsAppClick}
            className="text-[11px] font-bold text-[#005523] hover:underline shrink-0 flex items-center gap-1"
          >
            <span>{WHATSAPP_DISPLAY}</span>
          </button>
        </div>

        {/* Identity Inputs (Customer Name & Phone) */}
        {showIdentityInputs && (
          <div className="p-3.5 bg-[#f4f7f2] border-b border-[#d8ded3] flex flex-col gap-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#1b4332] text-[11px] flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-[#2e7d32]">person</span>
                আপনার নাম ও মোবাইল নম্বর (যাতে WhatsApp এ রিপ্লাই দিতে পারি):
              </span>
              <button
                onClick={() => setShowIdentityInputs(false)}
                className="text-[10px] text-[#2e7d32] hover:underline font-bold"
              >
                সংরক্ষণ
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="আপনার নাম"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="p-2 rounded-lg bg-white border border-[#d8ded3] text-xs text-[#1b4332] focus:outline-[#2e7d32] focus:border-[#2e7d32]"
              />
              <input
                type="tel"
                placeholder="মোবাইল নম্বর (017...)"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="p-2 rounded-lg bg-white border border-[#d8ded3] text-xs text-[#1b4332] focus:outline-[#2e7d32] focus:border-[#2e7d32]"
              />
            </div>
          </div>
        )}

        {/* Product Context Pill */}
        {productContext && (
          <div className="px-4 py-2 bg-[#f4f7f2] border-b border-[#e8ece3] text-[11px] text-[#1b4332] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-[#2e7d32]">eco</span>
            <span className="font-semibold">আলোচনাধীন পণ্য:</span>
            <span className="truncate font-bold text-[#1b4332]">{productContext}</span>
          </div>
        )}

        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-[#fafbfa]">
          {/* Welcome Message */}
          <div className="flex gap-2.5 items-start">
            <div className="w-8 h-8 rounded-full bg-[#1b4332] text-white flex items-center justify-center text-xs shrink-0 font-bold shadow-xs">
              H
            </div>
            <div className="max-w-[85%] bg-white border border-[#e8ece3] p-3.5 rounded-2xl rounded-tl-xs text-xs text-[#1b4332] leading-relaxed shadow-xs">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="font-bold text-[11px] text-[#2e7d32]">
                  {BRAND_NAME} কাস্টমার সাপোর্ট
                </span>
                <span className="text-[10px] bg-[#e8f5e9] text-[#1b5e20] font-semibold px-1.5 py-0.2 rounded-sm">
                  WhatsApp Connected
                </span>
              </div>
              <p className="text-[#2d3748]">
                আসসালামু আলাইকুম! যেকোনো প্রাকৃতিক পণ্য, রোগ অনুযায়ী আয়ুর্বেদিক ঔষধ, সেবনবিধি বা অর্ডারের বিষয়ে নিচে লিখে পাঠান। আপনার মেসেজ সরাসরি আমাদের WhatsApp এ চলে আসবে এবং আমরা সাথে সাথে আপনাকে সরাসরি WhatsApp এ রিপ্লাই করব।
              </p>
            </div>
          </div>

          {/* Quick Prompts */}
          <div className="my-1">
            <span className="text-[10px] font-semibold text-[#708272] uppercase tracking-wider block mb-1.5">
              দ্রুত প্রশ্ন নির্বাচন করুন:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {QUICK_PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleQuickPromptClick(prompt)}
                  className="text-[11px] text-[#1b4332] bg-white hover:bg-[#e8f5e9] hover:text-[#1b5e20] border border-[#e8ece3] px-2.5 py-1.5 rounded-full text-left transition-all cursor-pointer shadow-xs active:scale-97"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {messages.map((msg) => {
            const isMe = msg.sender === 'user';
            return (
              <div
                key={msg.id || Math.random().toString()}
                className={`flex gap-2 items-end ${isMe ? 'justify-end' : 'justify-start'}`}
              >
                {!isMe && (
                  <div className="w-7 h-7 rounded-full bg-[#1b4332] text-white flex items-center justify-center text-xs shrink-0 font-bold">
                    H
                  </div>
                )}
                <div
                  className={`max-w-[82%] p-3 rounded-2xl text-xs leading-relaxed ${
                    isMe
                      ? 'bg-[#1b4332] text-white rounded-br-xs shadow-xs'
                      : 'bg-white text-[#1b4332] border border-[#e8ece3] rounded-bl-xs shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span
                      className={`text-[10px] font-bold ${
                        isMe ? 'text-[#b7e4c7]' : 'text-[#2e7d32]'
                      }`}
                    >
                      {msg.senderName}
                    </span>
                    <div className="flex items-center gap-1">
                      {isMe && (
                        <span className="text-[10px] text-[#25d366] flex items-center" title="WhatsApp এ পাঠানো হয়েছে">
                          <span className="material-symbols-outlined text-[13px]">done_all</span>
                        </span>
                      )}
                      {msg.createdAtText && (
                        <span
                          className={`text-[9px] ${
                            isMe ? 'text-white/70' : 'text-[#708272]'
                          }`}
                        >
                          {msg.createdAtText}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            );
          })}

          {/* Notice after sending */}
          {sentSuccessNotice && lastSentWaUrl && (
            <div className="bg-[#e8f5e9] border border-[#a5d6a7] p-3 rounded-xl text-xs text-[#1b5e20] flex flex-col gap-1.5 animate-in fade-in">
              <div className="flex items-center gap-1.5 font-bold">
                <span className="material-symbols-outlined text-[18px] text-[#25d366]">check_circle</span>
                <span>বার্তাটি হোয়াটসঅ্যাপে পাঠানো হয়েছে!</span>
              </div>
              <p className="text-[11px] text-[#2e7d32]">
                অ্যাডমিন সরাসরি আপনার হোয়াটসঅ্যাপে রিপ্লাই দেবেন। হোয়াটসঅ্যাপ চালু না হয়ে থাকলে নিচের বাটনে ক্লিক করুন:
              </p>
              <a
                href={lastSentWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 bg-[#25d366] hover:bg-[#1ebe5d] text-[#005523] hover:text-white font-bold px-3 py-1.5 rounded-lg text-xs transition-colors mt-0.5"
              >
                <span className="material-symbols-outlined text-[15px]">chat</span>
                হোয়াটসঅ্যাপে চ্যাট চালিয়ে যান
              </a>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Footer Input */}
        <div className="p-3.5 sm:p-4 border-t border-[#e8ece3] bg-[#fbfbfa] flex flex-col gap-2">
          <div className="flex items-center justify-between text-[11px] text-[#708272]">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#25d366]" />
              মেসেজ সরাসরি WhatsApp এ যাবে
            </span>
            <button
              onClick={handleDirectWhatsAppClick}
              className="text-[#25d366] hover:underline font-bold flex items-center gap-1 text-[11px]"
            >
              <span className="material-symbols-outlined text-[13px]">chat</span>
              সরাসরি WhatsApp খুলুন
            </button>
          </div>

          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <input
              type="text"
              required
              placeholder="আপনার বার্তা লিখুন (যেমন: অর্ডারের নিয়ম বা পণ্য জানতে চাই)..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-3.5 py-2.5 rounded-full bg-white border border-[#d8ded3] text-xs text-[#1b4332] focus:outline-[#2e7d32] focus:border-[#2e7d32] shadow-2xs"
            />
            <button
              type="submit"
              disabled={isSending || !inputText.trim()}
              className="h-10 px-4 rounded-full bg-[#25d366] hover:bg-[#1ebe5d] disabled:opacity-50 text-[#005523] hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all shrink-0 active:scale-95 shadow-sm"
              title="WhatsApp এ পাঠান"
            >
              <span>পাঠান</span>
              <span className="material-symbols-outlined text-[16px]">send</span>
            </button>
          </form>
          <span className="text-[10px] text-[#708272] text-center">
            পাঠানোর সাথে সাথে আমাদের WhatsApp ({WHATSAPP_DISPLAY})-এ বার্তা চলে যাবে
          </span>
        </div>
      </div>
    </div>
  );
};
