import React, { useState, useMemo } from 'react';
import { Product, Category } from '../types';
import { CATEGORIES } from '../data/products';

interface ProductsViewProps {
  products: Product[];
  initialCategory?: Category['id'] | 'all';
  onOpenModal: (product: Product) => void;
  onOpenWhatsApp: (product: Product) => void;
}

export const ProductsView: React.FC<ProductsViewProps> = ({
  products,
  initialCategory = 'all',
  onOpenModal,
  onOpenWhatsApp,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  const availableCategories = useMemo(() => {
    const list: { id: string; name: string }[] = CATEGORIES.map((c) => ({
      id: c.id,
      name: c.name,
    }));
    products.forEach((p) => {
      if (
        p.category &&
        !list.some(
          (c) =>
            c.id.toLowerCase() === p.category.toLowerCase() ||
            c.name.toLowerCase() === p.category.toLowerCase()
        )
      ) {
        list.push({
          id: p.category,
          name: p.categoryLabel || p.category,
        });
      }
    });
    return list;
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory =
          selectedCategory === 'all' ||
          p.category.toLowerCase() === selectedCategory.toLowerCase();
        const matchesSearch =
          searchQuery === '' ||
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.collection.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.banglaName && p.banglaName.includes(searchQuery)) ||
          p.craftLocation.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <section className="w-full px-4 sm:px-8 lg:px-14 py-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-4 pb-8 border-b border-[#eeeeee]">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-bold text-[#2e7d32] uppercase tracking-widest">
            ১০০% খাঁটি ও অর্গানিক ক্যাটালগ • Healify Naturals
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#1b4332]">
            Pure Organic Wellness Collection
          </h1>
          <p className="text-sm sm:text-base text-[#405342] max-w-2xl">
            সুন্দরবনের চাকভাঙা কাঁচা মধু, কাঠের ঘানিভাঙা খাঁটি সরিষা ও কালোজিরা তেল, অর্গানিক মরিঙ্গা পাউডার এবং প্রাকৃতিক ভেষজ চা।
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-[#1a1c1c] text-white shadow-xs'
                  : 'bg-[#eeeeee] text-[#3c4a3d] hover:bg-[#e2e2e2]'
              }`}
            >
              All Pieces ({products.length})
            </button>
            {availableCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer ${
                  selectedCategory.toLowerCase() === cat.id.toLowerCase()
                    ? 'bg-[#1a1c1c] text-white shadow-xs'
                    : 'bg-[#eeeeee] text-[#3c4a3d] hover:bg-[#e2e2e2]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search & Sort controls */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-60">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#3c4a3d] text-[18px]">
                search
              </span>
              <input
                type="text"
                placeholder="Search pieces or craft..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs pl-9 pr-4 py-2 rounded-full bg-white border border-[#eeeeee] focus:outline-[#006d2f] text-[#1a1c1c]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-[#3c4a3d] hover:text-[#1a1c1c] text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs px-3 py-2 rounded-full bg-white border border-[#eeeeee] text-[#1a1c1c] font-semibold focus:outline-none cursor-pointer"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center flex flex-col items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-[#e8f5e9] flex items-center justify-center text-[#2e7d32]">
            <span className="material-symbols-outlined text-3xl">inventory_2</span>
          </div>
          <h3 className="font-display text-xl font-bold text-[#1a1c1c]">
            {products.length === 0 ? 'বর্তমানে কোনো প্রোডাক্ট নেই' : 'কোনো প্রোডাক্ট খুঁজে পাওয়া যায়নি'}
          </h3>
          <p className="text-sm text-[#3c4a3d] max-w-md">
            {products.length === 0
              ? 'সকল পূর্বের প্রোডাক্ট রিমুভ করা হয়েছে। অ্যাডমিন প্যানেল থেকে নতুন প্রোডাক্ট যোগ করুন।'
              : 'ফিল্টার রিসেট করে পুনরায় চেষ্টা করুন।'}
          </p>
          {products.length > 0 && (
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-2 px-5 py-2 rounded-full bg-[#eeeeee] text-xs font-bold text-[#1a1c1c] hover:bg-[#e2e2e2]"
            >
              Reset Filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between border border-[#eeeeee] group"
            >
              <div className="flex flex-col gap-3">
                <div
                  className="relative overflow-hidden rounded-xl bg-[#f9f9f9] aspect-square cursor-pointer"
                  onClick={() => onOpenModal(product)}
                >
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt={product.alt}
                    src={product.image}
                  />

                  {product.badge && (
                    <span
                      className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full shadow-xs ${
                        product.badgeType === 'bestseller'
                          ? 'bg-[#f4e1b2] text-[#241a00]'
                          : product.badgeType === 'new'
                          ? 'bg-[#dae2fd] text-[#5c647a]'
                          : product.badgeType === 'limited'
                          ? 'bg-[#e8e8e8] text-[#1a1c1c]'
                          : 'bg-white/95 text-[#1a1c1c]'
                      }`}
                    >
                      {product.badge}
                    </span>
                  )}

                  {product.discountText && (
                    <span className="absolute top-3 right-3 bg-[#ffdad6] text-[#93000a] text-xs px-3 py-1 rounded-full font-bold shadow-xs">
                      {product.discountText}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-[#3c4a3d]">
                      {product.collection}
                    </span>
                    <span className="text-[10px] text-[#6b5d38] font-bold">
                      {product.craftLocation.split(',')[0]}
                    </span>
                  </div>
                  <h3
                    onClick={() => onOpenModal(product)}
                    className="font-display text-base font-bold text-[#1a1c1c] leading-snug cursor-pointer hover:text-[#006d2f] transition-colors"
                  >
                    {product.name}
                  </h3>
                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="font-display text-xl text-[#1a1c1c] font-bold">
                      {product.priceBangla}
                    </span>
                    {product.originalPriceBangla && (
                      <span className="text-xs text-[#3c4a3d] line-through">
                        {product.originalPriceBangla}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-4 mt-2">
                <button
                  onClick={() => onOpenWhatsApp(product)}
                  className="w-full bg-[#25d366] hover:bg-[#1ebe5d] text-[#005523] hover:text-white py-2.5 px-4 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-[0_4px_16px_rgba(37,211,102,0.2)] cursor-pointer active:scale-98"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  <span>Order on WhatsApp</span>
                </button>

                <button
                  onClick={() => onOpenModal(product)}
                  className="text-center text-xs font-semibold text-[#3c4a3d] hover:text-[#1a1c1c] py-1 transition-colors cursor-pointer"
                >
                  View Details & Artisan Story
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
