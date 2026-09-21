/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageTab, Product, Category } from './types';
import { PRODUCTS, WHATSAPP_NUMBER, BRAND_NAME } from './data/products';
import { subscribeToProducts } from './firebase/db';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AyurvedicRemedyFinder } from './components/AyurvedicRemedyFinder';
import { CategoryGrid } from './components/CategoryGrid';
import { FeaturedGrid } from './components/FeaturedGrid';
import { PopularGrid } from './components/PopularGrid';
import { AyurvedicStandardsSection } from './components/AyurvedicStandardsSection';
import { HowItWorks } from './components/HowItWorks';
import { TrustSection } from './components/TrustSection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { WhatsAppOrderDrawer } from './components/WhatsAppOrderDrawer';
import { ProductsView } from './components/ProductsView';
import { AboutView } from './components/AboutView';
import { ContactView } from './components/ContactView';
import { AdminView } from './components/AdminView';
import { MobileBottomBar } from './components/MobileBottomBar';
import { LiveChatDrawer } from './components/LiveChatDrawer';
import { AuthModal } from './components/AuthModal';
import { HotlineModal } from './components/HotlineModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<PageTab>('home');
  const [selectedCatalogCategory, setSelectedCatalogCategory] = useState<Category['id'] | 'all'>('all');
  const [modalProduct, setModalProduct] = useState<Product | null>(null);

  // Dynamic products state with local persistence & Firestore sync
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      // Clear previous mock products cache as explicitly requested by user
      localStorage.removeItem('shomahar_products');
      const saved = localStorage.getItem('healify_products_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load stored products', e);
    }
    return PRODUCTS; // currently empty []
  });

  // Keep synced with cloud Firestore
  useEffect(() => {
    const unsub = subscribeToProducts((cloudProducts) => {
      if (cloudProducts && Array.isArray(cloudProducts)) {
        setProducts(cloudProducts);
        try {
          localStorage.setItem('healify_products_v2', JSON.stringify(cloudProducts));
        } catch (e) {
          console.error(e);
        }
      }
    });
    return () => unsub();
  }, []);

  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => {
      const updated = [newProduct, ...prev.filter((p) => p.id !== newProduct.id)];
      try {
        localStorage.setItem('healify_products_v2', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts((prev) => {
      const updated = prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p));
      try {
        localStorage.setItem('healify_products_v2', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const handleRemoveProduct = (productId: string) => {
    setProducts((prev) => {
      const updated = prev.filter((p) => p.id !== productId);
      try {
        localStorage.setItem('healify_products_v2', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const handleRemoveAllProducts = () => {
    setProducts([]);
    try {
      localStorage.setItem('healify_products_v2', JSON.stringify([]));
    } catch (e) {
      console.error(e);
    }
  };

  const handleResetProducts = () => {
    setProducts(PRODUCTS);
    try {
      localStorage.setItem('healify_products_v2', JSON.stringify(PRODUCTS));
    } catch (e) {
      console.error(e);
    }
  };
  
  // WhatsApp Order Drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerProduct, setDrawerProduct] = useState<Product | null>(null);
  const [drawerMessage, setDrawerMessage] = useState<string | undefined>(undefined);

  // Firebase Live Chat Drawer
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatProductContext, setChatProductContext] = useState<string | undefined>(undefined);

  // Firebase Authentication Modal
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Hotline Call Modal (2 numbers: WhatsApp Hotline + +8809638852352)
  const [isHotlineModalOpen, setIsHotlineModalOpen] = useState(false);

  // Direct WhatsApp order with product details & link
  const handleOpenWhatsAppProduct = (product: Product) => {
    const productUrl = `${window.location.origin}/?product=${encodeURIComponent(product.id)}`;
    const message = `Hello ${BRAND_NAME}!\n\nআমি এই প্রাকৃতিক পণ্যটি অর্ডার করতে চাই:\n• পণ্য: ${product.banglaName || product.name}\n• মূল্য: ${product.priceBangla || '৳ ' + product.price}\n• সাইজ: ${product.dimensions || 'স্ট্যান্ডার্ড'}\n\nপ্রোডাক্ট লিংক: ${productUrl}`;
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  };

  const handleOpenWhatsAppGeneral = (message?: string) => {
    const text = message || `Hello ${BRAND_NAME}!\nআমি আপনাদের প্রাকৃতিক স্বাস্থ্যপণ্য সম্পর্কে জানতে ও অর্ডার করতে চাই।`;
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
  };

  const handleOpenLiveChat = (productName?: string) => {
    setChatProductContext(productName);
    setIsChatOpen(true);
  };

  const handleCategorySelect = (categoryId: Category['id']) => {
    setSelectedCatalogCategory(categoryId);
    setActiveTab('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewAllProducts = () => {
    setSelectedCatalogCategory('all');
    setActiveTab('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f9f9f9] text-[#1a1c1c] selection:bg-[#25d366] selection:text-[#005523]">
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenWhatsApp={handleOpenWhatsAppGeneral}
        onOpenChat={() => handleOpenLiveChat()}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenHotline={() => setIsHotlineModalOpen(true)}
      />

      {/* Main View Router */}
      <main className="w-full pt-28 flex-1">
        {activeTab === 'home' && (
          <div className="flex flex-col w-full">
            {/* Editorial Hero */}
            <HeroSection
              onBrowseCatalog={handleViewAllProducts}
              onOpenWhatsApp={handleOpenWhatsAppGeneral}
            />

            {/* Ayurvedic Health Concerns & Remedy Guide */}
            <AyurvedicRemedyFinder
              products={products}
              onSelectAyurvedicCategory={() => handleCategorySelect('ayurvedic')}
              onOpenWhatsApp={handleOpenWhatsAppGeneral}
              onOpenProductModal={(prod) => setModalProduct(prod)}
            />

            {/* Curated Product Categories */}
            <CategoryGrid onSelectCategory={handleCategorySelect} />

            {/* Featured Collection Grid */}
            <FeaturedGrid
              products={products}
              onOpenModal={(prod) => setModalProduct(prod)}
              onOpenWhatsApp={handleOpenWhatsAppProduct}
              onViewAll={handleViewAllProducts}
            />

            {/* Popular In Store */}
            <PopularGrid
              products={products}
              onOpenModal={(prod) => setModalProduct(prod)}
              onOpenWhatsApp={handleOpenWhatsAppProduct}
            />

            {/* Ayurvedic Purity & Classical Standards Section */}
            <AyurvedicStandardsSection
              onOpenWhatsApp={handleOpenWhatsAppGeneral}
              onExploreMedicines={() => handleCategorySelect('ayurvedic')}
            />

            {/* How WhatsApp Order Works */}
            <div id="how-it-works">
              <HowItWorks onOpenWhatsApp={handleOpenWhatsAppGeneral} />
            </div>

            {/* Trust & Reassurance Section */}
            <TrustSection />
          </div>
        )}

        {activeTab === 'products' && (
          <ProductsView
            products={products}
            initialCategory={selectedCatalogCategory}
            onOpenModal={(prod) => setModalProduct(prod)}
            onOpenWhatsApp={handleOpenWhatsAppProduct}
          />
        )}

        {activeTab === 'about' && (
          <AboutView
            onOpenWhatsApp={handleOpenWhatsAppGeneral}
            onExploreProducts={handleViewAllProducts}
          />
        )}

        {activeTab === 'contact' && (
          <ContactView onOpenWhatsApp={handleOpenWhatsAppGeneral} />
        )}

        {activeTab === 'admin' && (
          <AdminView
            products={products}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            onRemoveProduct={handleRemoveProduct}
            onRemoveAllProducts={handleRemoveAllProducts}
            onResetProducts={handleResetProducts}
            onOpenAuth={() => setIsAuthModalOpen(true)}
          />
        )}
      </main>

      {/* Brand Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenWhatsApp={handleOpenWhatsAppGeneral}
      />

      {/* Persistent Mobile Bottom Pill */}
      <MobileBottomBar
        onOpenWhatsApp={handleOpenWhatsAppGeneral}
        onOpenChat={() => handleOpenLiveChat()}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenHotline={() => setIsHotlineModalOpen(true)}
      />

      {/* Interactive Modal Sheet for Product & Artisan Story */}
      <ProductDetailModal
        product={modalProduct}
        onClose={() => setModalProduct(null)}
        onOrderOnWhatsApp={(prod) => handleOpenWhatsAppProduct(prod)}
      />

      {/* Interactive WhatsApp Order Configurator Drawer */}
      <WhatsAppOrderDrawer
        isOpen={isDrawerOpen}
        product={drawerProduct}
        initialMessage={drawerMessage}
        onClose={() => setIsDrawerOpen(false)}
      />

      {/* Firebase Firestore Live Chat Drawer */}
      <LiveChatDrawer
        isOpen={isChatOpen}
        productContext={chatProductContext}
        onClose={() => setIsChatOpen(false)}
      />

      {/* Firebase Login / Register Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      {/* Hotline Call Options Modal */}
      <HotlineModal
        isOpen={isHotlineModalOpen}
        onClose={() => setIsHotlineModalOpen(false)}
        onOpenWhatsApp={handleOpenWhatsAppGeneral}
      />
    </div>
  );
}
