import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { WHATSAPP_NUMBER, WHATSAPP_DISPLAY, BRAND_NAME } from '../data/products';
import { saveOrderInquiryToFirebase } from '../firebase/db';
import { useAuth } from '../firebase/AuthContext';

interface WhatsAppOrderDrawerProps {
  isOpen: boolean;
  product: Product | null;
  initialMessage?: string;
  onClose: () => void;
}

export const WhatsAppOrderDrawer: React.FC<WhatsAppOrderDrawerProps> = ({
  isOpen,
  product,
  initialMessage,
  onClose,
}) => {
  const { currentUser } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [deliveryArea, setDeliveryArea] = useState<'dhaka' | 'outside'>('dhaka');
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customNote, setCustomNote] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      setCopied(false);
      if (currentUser && currentUser.displayName && !customerName) {
        setCustomerName(currentUser.displayName);
      }
    }
  }, [isOpen, product, currentUser]);

  if (!isOpen) return null;

  const deliveryCost = deliveryArea === 'dhaka' ? 60 : 120;
  const deliveryLabel =
    deliveryArea === 'dhaka' ? 'Inside Dhaka (২৪-৪৮ ঘণ্টা)' : 'Outside Dhaka (২-৩ দিন)';

  const itemTotal = product ? product.price * quantity : 0;
  const grandTotal = itemTotal > 0 ? itemTotal + deliveryCost : 0;

  // Build the message
  let message = '';
  if (product) {
    message = `Hello ${BRAND_NAME}!\n\nআমি এই প্রাকৃতিক স্বাস্থ্যপণ্যটি অর্ডার করতে চাই (Order Request):\n• পণ্য / Product: ${product.name} ${product.banglaName ? `(${product.banglaName})` : ''}\n• পরিমাণ / Quantity: ${quantity} ${product.dimensions ? `[${product.dimensions}]` : ''}\n• মূল্য / Price: ৳ ${(product.price * quantity).toLocaleString('en-IN')}\n• ডেলিভারি এলাকা / Delivery: ${deliveryLabel} (৳ ${deliveryCost})\n• মোট প্রদেয় মূল্য / Total: ৳ ${grandTotal.toLocaleString('en-IN')} (Cash on Delivery)\n`;

    if (customerName.trim()) {
      message += `• নাম / Customer Name: ${customerName.trim()}\n`;
    }
    if (customerPhone.trim()) {
      message += `• মোবাইল / Contact Phone: ${customerPhone.trim()}\n`;
    }
    if (customerAddress.trim()) {
      message += `• ঠিকানা / Delivery Address: ${customerAddress.trim()}\n`;
    }
    if (customNote.trim()) {
      message += `• বিশেষ নোট / Note: ${customNote.trim()}\n`;
    }
    message += `\nঅনুগ্রহ করে অর্ডারটি নিশ্চিত করুন। ধন্যবাদ!`;
  } else if (initialMessage) {
    message = initialMessage;
  } else {
    message = `Hello ${BRAND_NAME}! I would like to consult and order natural health products.`;
  }

  const encodedUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md h-full overflow-y-auto p-6 flex flex-col justify-between shadow-2xl border-l border-[#e8ece3] animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#e8ece3]">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-[#25d366] flex items-center justify-center text-[#005523]">
                <span className="material-symbols-outlined text-[20px]">chat</span>
              </div>
              <div>
                <h3 className="font-display text-base font-bold text-[#1b4332]">
                  WhatsApp Quick Order
                </h3>
                <p className="text-[11px] font-semibold text-[#2e7d32] flex items-center gap-1.5 flex-wrap">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#25d366] inline-block animate-pulse" />
                    Live Desk • {WHATSAPP_DISPLAY}
                  </span>
                  <span className="text-[10px] bg-[#e8f5e9] text-[#1b5e20] px-1.5 py-0.5 rounded font-bold">
                    লগইন ছাড়াও সরাসরি অর্ডার
                  </span>
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-[#405342] hover:text-[#1b4332] p-1.5 rounded-full hover:bg-[#f4f7f2] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[22px]">close</span>
            </button>
          </div>

          {/* Product selected summary */}
          {product ? (
            <div className="mt-4 p-4 bg-[#fbfbfa] rounded-2xl border border-[#e8ece3] flex flex-col gap-3">
              <div className="flex gap-3 items-center">
                <img
                  src={product.image}
                  alt={product.alt}
                  className="w-16 h-16 rounded-xl object-cover bg-white shrink-0 border border-[#e8ece3]"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-[#2e7d32] uppercase tracking-wider block">
                    {product.collection}
                  </span>
                  <h4 className="font-display text-sm font-bold text-[#1b4332] truncate">
                    {product.name}
                  </h4>
                  {product.banglaName && (
                    <p className="text-xs text-[#405342] truncate">{product.banglaName}</p>
                  )}
                  <p className="text-xs font-bold text-[#1b4332]">{product.priceBangla}</p>
                </div>
              </div>

              {/* Quantity selector */}
              <div className="flex items-center justify-between pt-2 border-t border-[#e8ece3] text-xs">
                <span className="font-semibold text-[#405342]">পরিমাণ / Quantity:</span>
                <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-full border border-[#e2e8dc]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="w-6 h-6 rounded-full flex items-center justify-center text-[#1b4332] hover:bg-[#f4f7f2] disabled:opacity-30 cursor-pointer font-bold"
                  >
                    -
                  </button>
                  <span className="font-bold text-sm px-1.5 text-[#1b4332]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-6 h-6 rounded-full flex items-center justify-center text-[#1b4332] hover:bg-[#f4f7f2] cursor-pointer font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Delivery Destination selection */}
              <div className="flex flex-col gap-1.5 text-xs pt-2 border-t border-[#e8ece3]">
                <span className="font-semibold text-[#405342]">ডেলিভারি এলাকা (Delivery Area):</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDeliveryArea('dhaka')}
                    className={`p-2.5 rounded-xl text-left border cursor-pointer transition-all ${
                      deliveryArea === 'dhaka'
                        ? 'border-[#2e7d32] bg-[#e8f5e9] text-[#1b5e20] font-bold'
                        : 'border-[#e8ece3] bg-white text-[#405342]'
                    }`}
                  >
                    <div className="font-semibold text-[11px]">ঢাকা সিটি (Dhaka)</div>
                    <div className="text-[10px] opacity-85">২৪-৪৮ ঘণ্টা • ৳৬০</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryArea('outside')}
                    className={`p-2.5 rounded-xl text-left border cursor-pointer transition-all ${
                      deliveryArea === 'outside'
                        ? 'border-[#2e7d32] bg-[#e8f5e9] text-[#1b5e20] font-bold'
                        : 'border-[#e8ece3] bg-white text-[#405342]'
                    }`}
                  >
                    <div className="font-semibold text-[11px]">ঢাকার বাইরে (All BD)</div>
                    <div className="text-[10px] opacity-85">২-৩ দিন • ৳১২০</div>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-4 p-4 bg-[#fbfbfa] rounded-2xl border border-[#e8ece3] text-xs text-[#405342]">
              আমাদের স্বাস্থ্য কনসালট্যান্টের সাথে সরাসরি হোয়াটসঅ্যাপে কথা বলুন। যেকোনো স্বাস্থ্যপণ্য বা সেবন পদ্ধতি নিয়ে পরামর্শ নিন।
            </div>
          )}

          {/* Quick optional customer details */}
          <div className="mt-4 flex flex-col gap-2.5">
            <label className="text-xs font-semibold text-[#1b4332]">
              অর্ডার তথ্য (স্বয়ংক্রিয়ভাবে মেসেজে যুক্ত হবে):
            </label>
            <input
              type="text"
              placeholder="আপনার নাম (যেমন: মোঃ সাইফুল ইসলাম)"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl bg-[#fbfbfa] border border-[#e8ece3] focus:outline-[#2e7d32] text-[#1b4332]"
            />
            <input
              type="text"
              placeholder="মোবাইল নম্বর (যেমন: 017XXXXXXXX)"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl bg-[#fbfbfa] border border-[#e8ece3] focus:outline-[#2e7d32] text-[#1b4332]"
            />
            <textarea
              rows={2}
              placeholder="সম্পূর্ণ ডেলিভারি ঠিকানা..."
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl bg-[#fbfbfa] border border-[#e8ece3] focus:outline-[#2e7d32] text-[#1b4332] resize-none"
            />
          </div>

          {/* Message Preview Box */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs mb-1 font-semibold text-[#405342]">
              <span>WhatsApp Message Preview:</span>
              <button
                onClick={handleCopy}
                className="text-[#2e7d32] hover:underline flex items-center gap-1 cursor-pointer font-bold text-[11px]"
              >
                <span className="material-symbols-outlined text-[14px]">
                  {copied ? 'check' : 'content_copy'}
                </span>
                <span>{copied ? 'কপি হয়েছে!' : 'মেসেজ কপি করুন'}</span>
              </button>
            </div>
            <pre className="text-[11px] font-sans p-3 bg-[#f4f7f2] text-[#1b4332] rounded-xl border border-[#e0e8db] whitespace-pre-wrap max-h-36 overflow-y-auto leading-relaxed">
              {message}
            </pre>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 pt-4 border-t border-[#e8ece3] flex flex-col gap-2">
          <a
            href={encodedUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              if (product) {
                saveOrderInquiryToFirebase({
                  customerName: customerName.trim() || 'Guest Customer',
                  customerPhone: customerPhone.trim() || 'Not provided',
                  customerAddress: customerAddress.trim() || 'Not provided',
                  productName: product.name,
                  productId: product.id,
                  quantity,
                  deliveryArea,
                  deliveryCost,
                  grandTotal,
                  notes: customNote.trim() || '',
                  rawWhatsAppMessage: message,
                });
              }
            }}
            className="w-full bg-[#25d366] hover:bg-[#1ebe5d] text-[#005523] hover:text-white py-3 px-4 rounded-full text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-[0_4px_16px_rgba(37,211,102,0.28)] active:scale-98 text-center"
          >
            <span className="material-symbols-outlined text-[20px]">chat</span>
            <span>Order on WhatsApp ({WHATSAPP_DISPLAY})</span>
          </a>

          <button
            onClick={handleCopy}
            className="w-full py-2.5 rounded-full text-xs font-semibold text-[#405342] bg-[#f4f7f2] hover:bg-[#e8ece3] transition-colors cursor-pointer"
          >
            {copied ? '✓ মেসেজ ক্লিপবোর্ডে কপি করা হয়েছে' : 'মেসেজ কপি করুন'}
          </button>
        </div>
      </div>
    </div>
  );
};
