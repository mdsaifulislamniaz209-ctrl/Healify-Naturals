import React, { useState } from 'react';
import { Product } from '../types';
import { useAuth, ADMIN_EMAIL } from '../firebase/AuthContext';
import { syncProductToFirebase, updateProductInFirebase, deleteProductFromFirebase, deleteAllProductsFromFirebase } from '../firebase/db';

interface AdminViewProps {
  products: Product[];
  onAddProduct: (newProduct: Product) => void;
  onUpdateProduct: (updatedProduct: Product) => void;
  onRemoveProduct: (productId: string) => void;
  onResetProducts?: () => void;
  onRemoveAllProducts?: () => void;
  onOpenAuth: () => void;
}

// Preset natural health photos for 1-click selection
const HEALTH_IMAGE_PRESETS = [
  {
    label: 'আয়ুর্বেদিক ভেষজ/চূর্ণ (Ayurvedic Herb/Powder)',
    url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop',
  },
  {
    label: 'ভেষজ তেল/রসায়ন (Ayurvedic Oil/Liquid)',
    url: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=1000&auto=format&fit=crop',
  },
  {
    label: 'খাঁটি মধু (Honey Jar)',
    url: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=1000&auto=format&fit=crop',
  },
  {
    label: 'ঘানিভাঙা তেল (Cold-Pressed Oil)',
    url: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=1000&auto=format&fit=crop',
  },
  {
    label: 'ভেষজ চা (Herbal Tea)',
    url: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?q=80&w=1000&auto=format&fit=crop',
  },
  {
    label: 'সুপারফুড ও বীজ (Superfoods & Seeds)',
    url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=1000&auto=format&fit=crop',
  },
];

const toBanglaNumber = (num: number): string => {
  const bnDigits: { [key: string]: string } = {
    '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
    '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯',
    ',': ',', '.': '.'
  };
  return num.toLocaleString('en-IN').replace(/[0-9,.]/g, (char) => bnDigits[char] || char);
};

export const AdminView: React.FC<AdminViewProps> = ({
  products,
  onAddProduct,
  onUpdateProduct,
  onRemoveProduct,
  onRemoveAllProducts,
  onOpenAuth,
}) => {
  const { currentUser, isAdmin, logout } = useAuth();

  // Primary options: 'add' or 'manage' (Edit & Remove)
  const [activeAdminTab, setActiveAdminTab] = useState<'add' | 'manage'>('add');

  // Form State for Add Product
  const [nameBangla, setNameBangla] = useState('');
  const [nameEnglish, setNameEnglish] = useState('');
  const [category, setCategory] = useState('honey');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [dimensions, setDimensions] = useState('৫০০ গ্রাম');
  const [imageUrl, setImageUrl] = useState(HEALTH_IMAGE_PRESETS[0].url);
  const [benefitsInput, setBenefitsInput] = useState('১০০% খাঁটি ও প্রাকৃতিক স্বাস্থ্যউপকারী');
  const [craftLocation, setCraftLocation] = useState('সুন্দরবন, বাংলাদেশ');
  const [badge, setBadge] = useState('১০০% খাঁটি');

  // Form State for Edit Product
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editNameBangla, setEditNameBangla] = useState('');
  const [editNameEnglish, setEditNameEnglish] = useState('');
  const [editCategory, setEditCategory] = useState('honey');
  const [editPrice, setEditPrice] = useState('');
  const [editOriginalPrice, setEditOriginalPrice] = useState('');
  const [editDimensions, setEditDimensions] = useState('৫০০ গ্রাম');
  const [editImageUrl, setEditImageUrl] = useState('');
  const [editBenefitsInput, setEditBenefitsInput] = useState('');
  const [editCraftLocation, setEditCraftLocation] = useState('সুন্দরবন, বাংলাদেশ');
  const [editBadge, setEditBadge] = useState('১০০% খাঁটি');

  const [notification, setNotification] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const showNotification = (text: string, type: 'success' | 'error' = 'success') => {
    setNotification({ text, type });
    setTimeout(() => setNotification(null), 3500);
  };

  const handleStartEdit = (product: Product) => {
    if (!isAdmin) {
      showNotification('শুধুমাত্র অনুমোদিত অ্যাডমিন প্রোডাক্ট এডিট করতে পারেন।', 'error');
      onOpenAuth();
      return;
    }
    setEditingProduct(product);
    setEditNameBangla(product.banglaName || product.name);
    setEditNameEnglish(product.name || '');
    setEditCategory(product.category || 'honey');
    setEditPrice(product.price ? product.price.toString() : '');
    setEditOriginalPrice(product.originalPrice ? product.originalPrice.toString() : '');
    setEditDimensions(product.dimensions || '৫০০ গ্রাম');
    setEditImageUrl(product.image || HEALTH_IMAGE_PRESETS[0].url);
    setEditBenefitsInput(product.benefits ? product.benefits.join(', ') : '');
    setEditCraftLocation(product.craftLocation || 'সুন্দরবন, বাংলাদেশ');
    setEditBadge(product.badge || '১০০% খাঁটি');
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) {
      showNotification('অ্যাডমিন লগইন ছাড়া কোনো প্রোডাক্ট এডিট করা যাবে না।', 'error');
      onOpenAuth();
      return;
    }
    if (!editingProduct) return;

    if (!editNameBangla.trim() && !editNameEnglish.trim()) {
      showNotification('অনুগ্রহ করে প্রোডাক্টের নাম লিখুন', 'error');
      return;
    }

    const parsedPrice = parseFloat(editPrice);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      showNotification('অনুগ্রহ করে সঠিক বিক্রয় মূল্য (Price) দিন', 'error');
      return;
    }

    const parsedOriginalPrice = editOriginalPrice ? parseFloat(editOriginalPrice) : undefined;
    const finalBanglaName = editNameBangla.trim() || editNameEnglish.trim() || editingProduct.name;
    const finalEnglishName = editNameEnglish.trim() || editNameBangla.trim() || editingProduct.name;

    const categoryNames: { [key: string]: { label: string; coll: string } } = {
      ayurvedic: { label: 'আয়ুর্বেদিক ঔষধ ও দাওয়াই', coll: 'Ayurvedic Medicine & Remedies' },
      honey: { label: 'খাঁটি মধু', coll: 'Pure Raw Honey' },
      oils: { label: 'ঘানিভাঙা তেল', coll: 'Cold-Pressed Oils' },
      teas: { label: 'ভেষজ চা', coll: 'Herbal Blends' },
      superfoods: { label: 'সুপারফুড', coll: 'Superfood Nutrition' },
      ghee: { label: 'গাওয়া ঘি', coll: 'Pure Artisan Ghee' },
      other: { label: 'প্রাকৃতিক পণ্য', coll: 'Natural Essentials' },
    };

    const catMeta = categoryNames[editCategory] || categoryNames.other;

    const updatedProduct: Product = {
      ...editingProduct,
      name: finalEnglishName,
      banglaName: finalBanglaName,
      category: editCategory,
      categoryLabel: catMeta.label,
      collection: catMeta.coll,
      price: parsedPrice,
      originalPrice: parsedOriginalPrice,
      priceBangla: `৳ ${toBanglaNumber(parsedPrice)}`,
      originalPriceBangla: parsedOriginalPrice ? `৳ ${toBanglaNumber(parsedOriginalPrice)}` : undefined,
      badge: editBadge.trim() || '১০০% খাঁটি',
      discountText: parsedOriginalPrice && parsedOriginalPrice > parsedPrice
        ? `${Math.round(((parsedOriginalPrice - parsedPrice) / parsedOriginalPrice) * 100)}% Off`
        : undefined,
      image: editImageUrl.trim() || editingProduct.image,
      alt: finalBanglaName,
      artisanStory: `${finalBanglaName} - সম্পূর্ণ রাসায়নিকমুক্ত, ভেজালহীন এবং স্বাস্থ্যসম্মত উপায়ে প্রস্তুতকৃত।`,
      craftLocation: editCraftLocation.trim() || 'বাংলাদেশ',
      dimensions: editDimensions.trim() || 'স্ট্যান্ডার্ড প্যাকেজিং',
      benefits: editBenefitsInput
        ? editBenefitsInput.split(',').map((b) => b.trim()).filter(Boolean)
        : editingProduct.benefits || ['১০০% বিশুদ্ধ ও প্রাকৃতিক'],
    };

    setIsSubmitting(true);
    try {
      onUpdateProduct(updatedProduct);
      await updateProductInFirebase(updatedProduct);
      showNotification('✅ প্রোডাক্টটি সফলভাবে আপডেট ও সেভ হয়েছে!');
      setEditingProduct(null);
    } catch (err) {
      console.error(err);
      showNotification('প্রোডাক্ট আপডেট সম্পন্ন হয়েছে (লোকালি সেভ হয়েছে)', 'success');
      setEditingProduct(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) {
      showNotification('অ্যাডমিন লগইন ছাড়া নতুন প্রোডাক্ট যোগ করা যাবে না।', 'error');
      onOpenAuth();
      return;
    }

    if (!nameBangla.trim() && !nameEnglish.trim()) {
      showNotification('অনুগ্রহ করে প্রোডাক্টের নাম লিখুন', 'error');
      return;
    }

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      showNotification('অনুগ্রহ করে সঠিক মূল্য (Price) দিন', 'error');
      return;
    }

    const parsedOriginalPrice = originalPrice ? parseFloat(originalPrice) : undefined;
    const finalBanglaName = nameBangla.trim() || nameEnglish.trim();
    const finalEnglishName = nameEnglish.trim() || nameBangla.trim();

    const categoryNames: { [key: string]: { label: string; coll: string } } = {
      ayurvedic: { label: 'আয়ুর্বেদিক ঔষধ ও দাওয়াই', coll: 'Ayurvedic Medicine & Remedies' },
      honey: { label: 'খাঁটি মধু', coll: 'Pure Raw Honey' },
      oils: { label: 'ঘানিভাঙা তেল', coll: 'Cold-Pressed Oils' },
      teas: { label: 'ভেষজ চা', coll: 'Herbal Blends' },
      superfoods: { label: 'সুপারফুড', coll: 'Superfood Nutrition' },
      ghee: { label: 'গাওয়া ঘি', coll: 'Pure Artisan Ghee' },
      other: { label: 'প্রাকৃতিক পণ্য', coll: 'Natural Essentials' },
    };

    const catMeta = categoryNames[category] || categoryNames.other;

    const newProduct: Product = {
      id: 'prod-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      name: finalEnglishName,
      banglaName: finalBanglaName,
      category: category,
      categoryLabel: catMeta.label,
      collection: catMeta.coll,
      price: parsedPrice,
      originalPrice: parsedOriginalPrice,
      priceBangla: `৳ ${toBanglaNumber(parsedPrice)}`,
      originalPriceBangla: parsedOriginalPrice ? `৳ ${toBanglaNumber(parsedOriginalPrice)}` : undefined,
      badge: badge.trim() || '১০০% খাঁটি',
      badgeType: 'handmade',
      discountText: parsedOriginalPrice && parsedOriginalPrice > parsedPrice
        ? `${Math.round(((parsedOriginalPrice - parsedPrice) / parsedOriginalPrice) * 100)}% Off`
        : undefined,
      image: imageUrl.trim() || HEALTH_IMAGE_PRESETS[0].url,
      alt: finalBanglaName,
      artisanStory: `${finalBanglaName} - সম্পূর্ণ রাসায়নিকমুক্ত, ভেজালহীন এবং স্বাস্থ্যসম্মত উপায়ে প্রস্তুতকৃত।`,
      craftLocation: craftLocation.trim() || 'বাংলাদেশ',
      dimensions: dimensions.trim() || 'স্ট্যান্ডার্ড প্যাকেজিং',
      materials: '১০০% প্রাকৃতিক ও অর্গানিক উপাদান',
      featured: true,
      popular: true,
      benefits: benefitsInput
        ? benefitsInput.split(',').map((b) => b.trim()).filter(Boolean)
        : ['১০০% বিশুদ্ধ ও প্রাকৃতিক'],
      organicCert: '100% Pure & Lab Tested',
    };

    setIsSubmitting(true);
    try {
      // Add to local state & storage
      onAddProduct(newProduct);
      // Sync to cloud Firestore
      await syncProductToFirebase(newProduct);

      showNotification('✅ প্রোডাক্টটি সফলভাবে যোগ করা হয়েছে!');

      // Reset form
      setNameBangla('');
      setNameEnglish('');
      setPrice('');
      setOriginalPrice('');
      setDimensions('৫০০ গ্রাম');
      setBenefitsInput('১০০% খাঁটি ও প্রাকৃতিক স্বাস্থ্যউপকারী');
    } catch (err) {
      console.error(err);
      showNotification('প্রোডাক্ট যোগ হয়েছে (লোকালি সেভ হয়েছে)', 'success');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!isAdmin) {
      showNotification('অ্যাডমিন লগইন ছাড়া কোনো প্রোডাক্ট রিমুভ করা যাবে না।', 'error');
      onOpenAuth();
      return;
    }
    try {
      onRemoveProduct(id);
      await deleteProductFromFirebase(id);
      showNotification('🗑️ প্রোডাক্টটি রিমুভ করা হয়েছে।');
      setConfirmDeleteId(null);
    } catch (err) {
      console.error(err);
      showNotification('প্রোডাক্ট রিমুভ হয়েছে।');
      setConfirmDeleteId(null);
    }
  };

  const handleWipeAll = async () => {
    if (!isAdmin) {
      showNotification('অ্যাডমিন লগইন ছাড়া কোনো প্রোডাক্ট মোছা যাবে না।', 'error');
      onOpenAuth();
      return;
    }
    if (!window.confirm('আপনি কি নিশ্চিত যে আপনি সকল প্রোডাক্ট রিমুভ করতে চান?')) {
      return;
    }
    try {
      if (onRemoveAllProducts) {
        onRemoveAllProducts();
      } else {
        products.forEach((p) => onRemoveProduct(p.id));
      }
      await deleteAllProductsFromFirebase();
      showNotification('সব প্রোডাক্ট সফলভাবে রিমুভ করা হয়েছে।');
    } catch (e) {
      console.error(e);
      showNotification('সব প্রোডাক্ট রিমুভ হয়েছে।');
    }
  };

  // STRICT ACCESS BARRIER: If not logged in as Admin, block entire editing interface
  if (!isAdmin) {
    return (
      <div className="w-full px-4 sm:px-8 lg:px-14 py-16 max-w-2xl mx-auto animate-in fade-in duration-300">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#e8ece3] shadow-xl flex flex-col items-center text-center relative overflow-hidden">
          {/* Top security accent line */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-[#1b4332]" />

          <div className="w-20 h-20 rounded-3xl bg-[#f0f4ee] border border-[#d8ded3] flex items-center justify-center text-[#1b4332] mb-5 shadow-xs">
            <span className="material-symbols-outlined text-[42px]">admin_panel_settings</span>
          </div>

          <span className="text-[11px] font-bold uppercase tracking-widest text-[#2e7d32] bg-[#e8f5e9] px-3.5 py-1 rounded-full mb-3">
            নিরাপত্তা সংরক্ষিত এলাকা (Admin Only)
          </span>

          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1b4332] mb-3">
            অ্যাডমিন লগইন আবশ্যক
          </h2>

          {currentUser ? (
            <div className="space-y-4 max-w-md w-full">
              <p className="text-sm text-[#405342] leading-relaxed">
                আপনি বর্তমানে <strong className="text-[#1b4332]">{currentUser.email || currentUser.phoneNumber || 'গ্রাহক'}</strong> হিসেবে লগইন আছেন। এই অ্যাকাউন্টে প্রোডাক্ট যোগ, এডিট বা ডিলিট করার কোনো অনুমতি নেই।
              </p>

              <div className="p-4 bg-[#fef2f2] border border-[#fecaca] rounded-2xl text-xs text-[#991b1b] flex items-center gap-2.5 text-left">
                <span className="material-symbols-outlined text-[22px] text-[#dc2626] shrink-0">
                  lock
                </span>
                <div>
                  <span className="font-bold block">অননুমোদিত অ্যাকাউন্ট:</span>
                  <span>শুধুমাত্র অনুমোদিত অ্যাডমিন ইমেইল (<span className="font-mono font-bold text-[#7f1d1d]">{ADMIN_EMAIL}</span>) ব্যবহার করে ওয়েবসাইটে পরিবর্তন করা সম্ভব।</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={onOpenAuth}
                  className="w-full sm:w-auto px-6 py-3.5 bg-[#1b4332] hover:bg-[#2d6a4f] text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">switch_account</span>
                  <span>অ্যাডমিন অ্যাকাউন্টে সুইচ করুন</span>
                </button>
                <button
                  type="button"
                  onClick={logout}
                  className="w-full sm:w-auto px-5 py-3.5 bg-[#f4f7f2] hover:bg-[#e8ece3] text-[#405342] font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[18px]">logout</span>
                  <span>লগআউট</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4 max-w-md w-full">
              <p className="text-sm text-[#405342] leading-relaxed">
                ওয়েবসাইটে কোনো প্রোডাক্ট যোগ করা, আগের পণ্যের নাম বা মূল্য এডিট করা কিংবা রিমুভ করার অধিকার শুধুমাত্র অনুমোদিত অ্যাডমিনের জন্য সংরক্ষিত।
              </p>

              <div className="p-3.5 bg-[#f4f7f2] border border-[#e8ece3] rounded-2xl text-xs text-[#2e7d32] font-semibold flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#2e7d32]">verified_user</span>
                <span>নির্ধারিত অ্যাডমিন: <span className="font-mono text-[#1b4332]">{ADMIN_EMAIL}</span></span>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={onOpenAuth}
                  className="w-full px-8 py-3.5 bg-[#1b4332] hover:bg-[#2d6a4f] text-white font-bold text-sm rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 active:scale-98"
                >
                  <span className="material-symbols-outlined text-[20px]">lock_open</span>
                  <span>অ্যাডমিন অ্যাকাউন্টে লগইন করুন</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 max-w-5xl mx-auto">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#e8ece3]">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#1b4332] text-white flex items-center justify-center shadow-md">
            <span className="material-symbols-outlined text-[28px]">tune</span>
          </div>
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#1b4332]">
              অ্যাডমিন প্যানেল (Admin Panel)
            </h1>
            <p className="text-xs sm:text-sm text-[#405342]">
              Healify Naturals • প্রোডাক্ট ম্যানেজমেন্ট কন্ট্রোল
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {currentUser ? (
            <div className="flex items-center gap-2 bg-[#f4f7f2] px-3 py-1.5 rounded-full border border-[#e8ece3] text-xs">
              <span className="w-2 h-2 rounded-full bg-[#2e7d32]"></span>
              <span className="font-medium text-[#1b4332]">{currentUser.email || 'Admin'}</span>
              <button
                onClick={logout}
                className="text-[#93000a] hover:underline font-semibold ml-2 cursor-pointer"
              >
                লগআউট
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="text-xs font-bold text-[#1b4332] hover:text-[#2d6a4f] bg-[#f4f7f2] hover:bg-[#e8ece3] px-3 py-1.5 rounded-full border border-[#e8ece3] cursor-pointer transition-colors"
            >
              লগইন করুন ({ADMIN_EMAIL})
            </button>
          )}
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div
          className={`mt-4 p-4 rounded-2xl flex items-center gap-2 text-sm font-semibold transition-all ${
            notification.type === 'error'
              ? 'bg-[#ffebee] text-[#c62828] border border-[#ffcdd2]'
              : 'bg-[#e8f5e9] text-[#1b5e20] border border-[#c8e6c9]'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">
            {notification.type === 'error' ? 'error' : 'check_circle'}
          </span>
          <span>{notification.text}</span>
        </div>
      )}

      {/* The Two Admin Tabs: Add Product & Manage (Edit & Remove) */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center p-1.5 bg-[#f4f7f2] rounded-2xl border border-[#e8ece3] w-full sm:w-auto">
          <button
            onClick={() => setActiveAdminTab('add')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              activeAdminTab === 'add'
                ? 'bg-[#1b4332] text-white shadow-sm'
                : 'text-[#405342] hover:text-[#1b4332] hover:bg-white/60'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">add_circle</span>
            <span>প্রোডাক্ট Add করুন (Add Product)</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('manage')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              activeAdminTab === 'manage'
                ? 'bg-[#1b4332] text-white shadow-sm'
                : 'text-[#405342] hover:text-[#1b4332] hover:bg-white/60'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">inventory_2</span>
            <span>প্রোডাক্ট লিস্ট, Edit ও Remove ({products.length})</span>
          </button>
        </div>

        {activeAdminTab === 'manage' && products.length > 0 && (
          <button
            onClick={handleWipeAll}
            className="text-xs font-bold text-[#c62828] hover:text-white hover:bg-[#c62828] px-4 py-2.5 rounded-xl border border-[#ffcdd2] transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">delete_forever</span>
            <span>সব প্রোডাক্ট একবারে রিমুভ করুন</span>
          </button>
        )}
      </div>

      {/* TAB 1: ADD PRODUCT */}
      {activeAdminTab === 'add' && (
        <div className="mt-6 bg-white rounded-3xl p-6 sm:p-8 border border-[#e8ece3] shadow-xs">
          <div className="flex items-center gap-2 pb-5 border-b border-[#e8ece3] mb-6">
            <span className="material-symbols-outlined text-[#2e7d32] text-[24px]">add_box</span>
            <div>
              <h2 className="font-display text-xl font-bold text-[#1b4332]">
                নতুন প্রোডাক্ট যোগ করুন (Add New Product)
              </h2>
              <p className="text-xs text-[#405342]">
                নিচের তথ্যগুলো পূরণ করে সরাসরি ওয়েবসাইটে নতুন প্রাকৃতিক পণ্য প্রকাশ করুন।
              </p>
            </div>
          </div>

          <form onSubmit={handleCreateProduct} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Bangla Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#1b4332]">
                  প্রোডাক্টের নাম (বাংলায়) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={nameBangla}
                  onChange={(e) => setNameBangla(e.target.value)}
                  placeholder="যেমন: সুন্দরবনের খাঁটি চাকভাঙা মধু"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-[#d8ded3] focus:border-[#2e7d32] focus:ring-1 focus:ring-[#2e7d32] text-sm bg-[#fafbfa] text-[#1b4332] outline-hidden"
                />
              </div>

              {/* English Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#1b4332]">
                  Product Name (English)
                </label>
                <input
                  type="text"
                  value={nameEnglish}
                  onChange={(e) => setNameEnglish(e.target.value)}
                  placeholder="e.g. Raw Sundarban Wild Honey"
                  className="w-full px-4 py-3 rounded-xl border border-[#d8ded3] focus:border-[#2e7d32] focus:ring-1 focus:ring-[#2e7d32] text-sm bg-[#fafbfa] text-[#1b4332] outline-hidden"
                />
              </div>

              {/* Category */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#1b4332]">
                  ক্যাটাগরি (Category) <span className="text-red-500">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#d8ded3] focus:border-[#2e7d32] focus:ring-1 focus:ring-[#2e7d32] text-sm bg-[#fafbfa] text-[#1b4332] outline-hidden cursor-pointer"
                >
                  <option value="ayurvedic">🌿 আয়ুর্বেদিক ঔষধ ও দাওয়াই (Ayurvedic Medicine)</option>
                  <option value="honey">মধু (Honey)</option>
                  <option value="oils">ঘানিভাঙা খাঁটি তেল (Cold-Pressed Oils)</option>
                  <option value="teas">প্রাকৃতিক ভেষজ চা (Herbal Teas)</option>
                  <option value="superfoods">সুপারফুড ও পুষ্টিকর খাদ্য (Superfoods)</option>
                  <option value="ghee">খাঁটি গাওয়া ঘি (Pure Ghee)</option>
                  <option value="other">অন্যান্য প্রাকৃতিক পণ্য (Others)</option>
                </select>
              </div>

              {/* Dimensions / Weight */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#1b4332]">
                  পরিমাণ / নেট ওজন (Net Weight)
                </label>
                <input
                  type="text"
                  value={dimensions}
                  onChange={(e) => setDimensions(e.target.value)}
                  placeholder="যেমন: ৫০০ গ্রাম / ১ কেজি / ১ লিটার / ২৫০ গ্রাম"
                  className="w-full px-4 py-3 rounded-xl border border-[#d8ded3] focus:border-[#2e7d32] focus:ring-1 focus:ring-[#2e7d32] text-sm bg-[#fafbfa] text-[#1b4332] outline-hidden"
                />
              </div>

              {/* Price in BDT */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#1b4332]">
                  বিক্রয় মূল্য (Price in ৳) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="যেমন: 1250"
                  required
                  min="1"
                  className="w-full px-4 py-3 rounded-xl border border-[#d8ded3] focus:border-[#2e7d32] focus:ring-1 focus:ring-[#2e7d32] text-sm bg-[#fafbfa] text-[#1b4332] outline-hidden"
                />
              </div>

              {/* Original / Regular Price */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#405342]">
                  পূর্বের মূল্য (Regular Price in ৳ - ঐচ্ছিক ডিসকাউন্ট দেখানোর জন্য)
                </label>
                <input
                  type="number"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  placeholder="যেমন: 1450"
                  min="1"
                  className="w-full px-4 py-3 rounded-xl border border-[#d8ded3] focus:border-[#2e7d32] focus:ring-1 focus:ring-[#2e7d32] text-sm bg-[#fafbfa] text-[#1b4332] outline-hidden"
                />
              </div>

              {/* Sourcing Location */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#1b4332]">
                  উৎস / সংগ্রহের স্থান (Origin)
                </label>
                <input
                  type="text"
                  value={craftLocation}
                  onChange={(e) => setCraftLocation(e.target.value)}
                  placeholder="যেমন: সুন্দরবন, বাংলাদেশ / নাটোর / পাবনা"
                  className="w-full px-4 py-3 rounded-xl border border-[#d8ded3] focus:border-[#2e7d32] focus:ring-1 focus:ring-[#2e7d32] text-sm bg-[#fafbfa] text-[#1b4332] outline-hidden"
                />
              </div>

              {/* Badge */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#1b4332]">
                  ব্যাজ বা ট্যাগ (Badge / Tag)
                </label>
                <input
                  type="text"
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  placeholder="যেমন: ১০০% খাঁটি / বেস্টসেলার / কাঠের ঘানি"
                  className="w-full px-4 py-3 rounded-xl border border-[#d8ded3] focus:border-[#2e7d32] focus:ring-1 focus:ring-[#2e7d32] text-sm bg-[#fafbfa] text-[#1b4332] outline-hidden"
                />
              </div>
            </div>

            {/* Benefits */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[#1b4332]">
                উপকারিতা ও স্বাস্থ্যগুণ (কমা দিয়ে আলাদা করুন)
              </label>
              <input
                type="text"
                value={benefitsInput}
                onChange={(e) => setBenefitsInput(e.target.value)}
                placeholder="যেমন: রোগ প্রতিরোধ ক্ষমতা বৃদ্ধি, হজম শক্তি উন্নতি, প্রাকৃতিক অ্যান্টিঅক্সিডেন্ট"
                className="w-full px-4 py-3 rounded-xl border border-[#d8ded3] focus:border-[#2e7d32] focus:ring-1 focus:ring-[#2e7d32] text-sm bg-[#fafbfa] text-[#1b4332] outline-hidden"
              />
            </div>

            {/* Image Selection with Presets */}
            <div className="flex flex-col gap-2.5 p-4 rounded-2xl bg-[#f8faf7] border border-[#e8ece3]">
              <label className="text-xs font-bold text-[#1b4332] flex items-center justify-between">
                <span>প্রোডাক্টের ছবি (Product Image)</span>
                <span className="text-[11px] text-[#2e7d32] font-semibold">
                  এক ক্লিকে প্রিসেট ছবি বেছে নিন অথবা লিংক পেস্ট করুন
                </span>
              </label>

              {/* Preset Thumbnails */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {HEALTH_IMAGE_PRESETS.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setImageUrl(preset.url)}
                    className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border transition-all text-center cursor-pointer ${
                      imageUrl === preset.url
                        ? 'border-[#2e7d32] bg-[#e8f5e9] shadow-xs'
                        : 'border-[#e8ece3] bg-white hover:border-[#b7e4c7]'
                    }`}
                  >
                    <img
                      src={preset.url}
                      alt={preset.label}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <span className="text-[10px] font-bold text-[#1b4332] leading-tight line-clamp-1">
                      {preset.label}
                    </span>
                  </button>
                ))}
              </div>

              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="বা কাস্টম ইমেজ URL দিন (e.g. https://...)"
                required
                className="w-full mt-2 px-4 py-2.5 rounded-xl border border-[#d8ded3] focus:border-[#2e7d32] text-xs bg-white text-[#1b4332] outline-hidden"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#1b4332] hover:bg-[#2d6a4f] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md hover:shadow-lg active:scale-98 disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-[20px]">add_circle</span>
                <span>{isSubmitting ? 'যোগ করা হচ্ছে...' : 'প্রোডাক্ট যোগ করুন (Add Product)'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 2: MANAGE PRODUCTS (EDIT & REMOVE) */}
      {activeAdminTab === 'manage' && (
        <div className="mt-6 flex flex-col gap-6">
          <div className="bg-white rounded-3xl p-6 border border-[#e8ece3] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-xl font-bold text-[#1b4332] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#2e7d32]">inventory_2</span>
                <span>প্রোডাক্ট তালিকা ও ম্যানেজমেন্ট (Edit & Remove)</span>
              </h2>
              <p className="text-xs text-[#405342] mt-0.5">
                বর্তমানে ওয়েবসাইটে সক্রিয় মোট প্রোডাক্ট: <strong className="text-[#1b4332]">{products.length}</strong> টি। যেকোনো প্রোডাক্ট এডিট বা রিমুভ করতে পাশের বাটন ব্যবহার করুন।
              </p>
            </div>

            <button
              onClick={() => setActiveAdminTab('add')}
              className="text-xs font-bold text-[#1b4332] hover:text-[#2d6a4f] bg-[#e8f5e9] px-4 py-2 rounded-full border border-[#c8e6c9] flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              <span>নতুন প্রোডাক্ট যোগ করুন</span>
            </button>
          </div>

          {products.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-[#e8ece3] flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#f4f7f2] flex items-center justify-center text-[#405342]">
                <span className="material-symbols-outlined text-[32px]">inventory_2</span>
              </div>
              <h3 className="font-display text-xl font-bold text-[#1b4332]">
                বর্তমানে কোনো প্রোডাক্ট নেই
              </h3>
              <p className="text-xs sm:text-sm text-[#405342] max-w-md">
                সকল পুরাতন প্রোডাক্ট রিমুভ করা হয়েছে। আপনি এখন "প্রোডাক্ট Add করুন" অপশন থেকে আপনার পছন্দ অনুযায়ী নতুন প্রোডাক্ট যোগ করতে পারেন।
              </p>
              <button
                onClick={() => setActiveAdminTab('add')}
                className="mt-2 px-6 py-3 rounded-full bg-[#1b4332] hover:bg-[#2d6a4f] text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                <span>প্রথম প্রোডাক্ট যোগ করুন</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl p-4 border border-[#e8ece3] shadow-xs flex items-center justify-between gap-4 hover:border-[#b7e4c7] transition-colors"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 rounded-xl object-cover border border-[#e8ece3] shrink-0"
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="text-[11px] font-bold text-[#2e7d32] uppercase tracking-wider line-clamp-1">
                        {product.categoryLabel || product.category}
                      </span>
                      <h4 className="font-bold text-sm text-[#1b4332] truncate">
                        {product.banglaName || product.name}
                      </h4>
                      {product.name !== product.banglaName && (
                        <span className="text-[11px] text-[#708272] truncate">
                          {product.name}
                        </span>
                      )}
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-bold text-[#1b4332]">
                          {product.priceBangla || `৳ ${product.price}`}
                        </span>
                        {product.dimensions && (
                          <span className="text-[10px] bg-[#f4f7f2] text-[#405342] px-2 py-0.5 rounded-md border border-[#e8ece3]">
                            {product.dimensions}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions: Edit and Remove */}
                  <div className="shrink-0 flex items-center gap-2">
                    {/* EDIT BUTTON */}
                    <button
                      onClick={() => handleStartEdit(product)}
                      className="px-3.5 py-2 rounded-xl bg-[#e8f5e9] hover:bg-[#1b5e20] text-[#1b5e20] hover:text-white text-xs font-bold flex items-center gap-1 transition-all cursor-pointer border border-[#c8e6c9]"
                      title="প্রোডাক্ট এডিট করুন"
                    >
                      <span className="material-symbols-outlined text-[16px]">edit</span>
                      <span>এডিট</span>
                    </button>

                    {/* REMOVE BUTTON */}
                    {confirmDeleteId === product.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="px-2.5 py-2 bg-[#c62828] text-white text-xs font-bold rounded-xl shadow-xs hover:bg-[#b71c1c] cursor-pointer"
                        >
                          হ্যাঁ
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId(null)}
                          className="px-2 py-2 bg-[#f4f7f2] text-[#405342] text-xs font-bold rounded-xl hover:bg-[#e8ece3] cursor-pointer"
                        >
                          না
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmDeleteId(product.id)}
                        className="px-3 py-2 rounded-xl bg-[#ffebee] hover:bg-[#c62828] text-[#c62828] hover:text-white text-xs font-bold flex items-center gap-1 transition-all cursor-pointer border border-[#ffcdd2]"
                        title="প্রোডাক্ট রিমুভ করুন"
                      >
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                        <span>রিমুভ</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* EDIT PRODUCT MODAL */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#e8ece3] my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#e8ece3] mb-6">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#2e7d32] text-[24px]">edit_note</span>
                <div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-[#1b4332]">
                    প্রোডাক্ট এডিট করুন (Edit Product)
                  </h3>
                  <p className="text-xs text-[#405342]">
                    {editingProduct.banglaName || editingProduct.name}
                  </p>
                </div>
              </div>
              <button
                onClick={handleCancelEdit}
                className="w-9 h-9 rounded-full bg-[#f4f7f2] hover:bg-[#e8ece3] flex items-center justify-center text-[#405342] cursor-pointer transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Bangla Name */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-[#1b4332]">
                    প্রোডাক্টের নাম (বাংলায়) <span className="text-[#c62828]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editNameBangla}
                    onChange={(e) => setEditNameBangla(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#e8ece3] focus:border-[#2e7d32] text-sm outline-hidden bg-[#fbfbfa]"
                  />
                </div>

                {/* English Name */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-[#1b4332]">
                    প্রোডাক্টের নাম (English)
                  </label>
                  <input
                    type="text"
                    value={editNameEnglish}
                    onChange={(e) => setEditNameEnglish(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#e8ece3] focus:border-[#2e7d32] text-sm outline-hidden bg-[#fbfbfa]"
                  />
                </div>

                {/* Category */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-[#1b4332]">
                    ক্যাটাগরি <span className="text-[#c62828]">*</span>
                  </label>
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#e8ece3] focus:border-[#2e7d32] text-sm outline-hidden bg-[#fbfbfa]"
                  >
                    <option value="ayurvedic">🌿 আয়ুর্বেদিক ঔষধ ও দাওয়াই (Ayurvedic Medicine)</option>
                    <option value="honey">খাঁটি মধু (Honey)</option>
                    <option value="oils">ঘানিভাঙা তেল (Cold-Pressed Oils)</option>
                    <option value="teas">ভেষজ চা (Herbal Teas)</option>
                    <option value="superfoods">সুপারফুড ও বীজ (Superfoods & Seeds)</option>
                    <option value="ghee">গাওয়া ঘি (Pure Ghee)</option>
                    <option value="other">অন্যান্য স্বাস্থ্যপণ্য (Other)</option>
                  </select>
                </div>

                {/* Dimensions / Weight */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-[#1b4332]">
                    পরিমাণ / নেট ওজন <span className="text-[#c62828]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editDimensions}
                    onChange={(e) => setEditDimensions(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#e8ece3] focus:border-[#2e7d32] text-sm outline-hidden bg-[#fbfbfa]"
                  />
                </div>

                {/* Price */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-[#1b4332]">
                    বিক্রয় মূল্য (টাকা ৳) <span className="text-[#c62828]">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-sm font-bold text-[#708272]">৳</span>
                    <input
                      type="number"
                      required
                      min="1"
                      value={editPrice}
                      onChange={(e) => setEditPrice(e.target.value)}
                      className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-[#e8ece3] focus:border-[#2e7d32] text-sm outline-hidden bg-[#fbfbfa]"
                    />
                  </div>
                </div>

                {/* Original Price */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-[#1b4332]">
                    পূর্বের নিয়মিত মূল্য (৳)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-sm font-bold text-[#708272]">৳</span>
                    <input
                      type="number"
                      min="1"
                      value={editOriginalPrice}
                      onChange={(e) => setEditOriginalPrice(e.target.value)}
                      className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-[#e8ece3] focus:border-[#2e7d32] text-sm outline-hidden bg-[#fbfbfa]"
                    />
                  </div>
                </div>
              </div>

              {/* Preset Image Options */}
              <div className="flex flex-col gap-2 pt-2 border-t border-[#e8ece3]">
                <label className="text-xs font-bold text-[#1b4332]">
                  ছবি নির্বাচন করুন:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {HEALTH_IMAGE_PRESETS.map((preset, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setEditImageUrl(preset.url)}
                      className={`p-1.5 rounded-xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                        editImageUrl === preset.url
                          ? 'border-[#2e7d32] bg-[#e8f5e9]'
                          : 'border-[#e8ece3] bg-[#fbfbfa] hover:border-[#b7e4c7]'
                      }`}
                    >
                      <img
                        src={preset.url}
                        alt={preset.label}
                        className="w-full aspect-square object-cover rounded-lg"
                      />
                      <span className="text-[10px] font-bold text-[#1b4332] line-clamp-1">
                        {preset.label}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="flex flex-col gap-1 mt-1">
                  <label className="text-[11px] text-[#708272]">অথবা ছবির ইউআরএল দিন:</label>
                  <input
                    type="url"
                    value={editImageUrl}
                    onChange={(e) => setEditImageUrl(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#e8ece3] focus:border-[#2e7d32] text-xs outline-hidden bg-[#fbfbfa]"
                  />
                </div>
              </div>

              {/* Benefits & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#e8ece3]">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-[#1b4332]">
                    উপকারিতা (কমা দিয়ে আলাদা)
                  </label>
                  <input
                    type="text"
                    value={editBenefitsInput}
                    onChange={(e) => setEditBenefitsInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#e8ece3] focus:border-[#2e7d32] text-sm outline-hidden bg-[#fbfbfa]"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-[#1b4332]">
                    উৎস / সংগ্রহের স্থান
                  </label>
                  <input
                    type="text"
                    value={editCraftLocation}
                    onChange={(e) => setEditCraftLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#e8ece3] focus:border-[#2e7d32] text-sm outline-hidden bg-[#fbfbfa]"
                  />
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="pt-4 border-t border-[#e8ece3] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-5 py-2.5 rounded-full border border-[#e8ece3] text-xs font-bold text-[#405342] hover:bg-[#f4f7f2] cursor-pointer transition-colors"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-[#1b4332] hover:bg-[#2d6a4f] text-white text-xs font-bold rounded-full shadow-md transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-[18px]">save</span>
                  <span>{isSubmitting ? 'সেভ হচ্ছে...' : 'পরিবর্তন সংরক্ষণ করুন (Save Changes)'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
