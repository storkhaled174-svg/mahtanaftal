"use client";

import React, { useState, useEffect } from "react";
import Hero from "@/frontend/components/HomePage/Hero";
import PlatformMatrix from "@/frontend/components/HomePage/PlatformMatrix";
import HowItWorks from "@/frontend/components/HomePage/HowItWorks";
import WhyNaftalMhatati from "@/frontend/components/HomePage/WhyNaftalMhatati";
import TireCatalog from "@/frontend/components/HomePage/TireCatalog";
import OrderFormSection from "@/frontend/components/HomePage/OrderFormSection";
import AboutNaftal from "@/frontend/components/HomePage/AboutNaftal";
import ContactAndFaq from "@/frontend/components/HomePage/ContactAndFaq";
import OrderReceiptModal from "@/frontend/components/HomePage/OrderReceiptModal";
import { getHomePageData } from "@/frontend/actions/HomePage";
import { BrandType, TireSizeOption, OrderFormData, WilayaItem, OrderReceipt, TireCategoryType, PlatformFaqItem, SupportChannelItem } from "@/frontend/types/HomePage";
export default function HomePage() {
  const [sizeOptions, setSizeOptions] = useState<TireSizeOption[]>([]);
  const [wilayas, setWilayas] = useState<WilayaItem[]>([]);
  const [faqs, setFaqs] = useState<PlatformFaqItem[]>([]);
  const [supportChannels, setSupportChannels] = useState<SupportChannelItem[]>([]);

  // Interactive UI state
  const [selectedBrand, setSelectedBrand] = useState<BrandType>("continental");
  const [selectedSizeId, setSelectedSizeId] = useState<string>("");
  const [formData, setFormData] = useState<OrderFormData>({
    fullName: "",
    primaryPhone: "",
    secondaryPhone: "",
    wilayaCode: "16",
    commune: "",
    brand: "continental",
    selectedSizeId: "",
    quantity: 2,
    nidNumber: "",
    edahabiaNumber: "",
    edahabiaExpiry: "",
    registrationDate: new Date().toISOString().split("T")[0]
  });
  const [confirmedReceipt, setConfirmedReceipt] = useState<OrderReceipt | null>(null);
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const data = await getHomePageData();
        if (!isMounted) return;
        const mappedSizeOptions: TireSizeOption[] = data.tires.map((t, index) => {
          let cat: TireCategoryType = "tourisme";
          if (t.category === "SUV") cat = "suv";else if (t.category === "UTILITY") cat = "utilitaire";
          const brand: BrandType = t.brand.toLowerCase() === "iris" ? "iris" : "continental";
          return {
            id: t.id,
            brand,
            dimension: t.size,
            loadSpeed: t.speedIndex || "",
            season: "كل الفصول",
            inStock: t.isAvailable && t.availableStock > 0,
            availableStock: t.availableStock,
            priceDzd: t.priceDzd,
            category: cat
          };
        });
        setSizeOptions(mappedSizeOptions);
        setWilayas(data.wilayas);
        setFaqs(data.faqs);
        setSupportChannels(data.supportChannels);
        const defaultTire = mappedSizeOptions.find(t => t.brand === "continental" && t.inStock) || mappedSizeOptions[0];
        const initialSizeId = defaultTire ? defaultTire.id : "";
        const initialWilaya = data.wilayas.find(w => w.code === "16") || data.wilayas[0];
        const initialCommune = initialWilaya && initialWilaya.communes.length > 0 ? initialWilaya.communes[0] : "";
        setSelectedSizeId(prev => prev || initialSizeId);
        setFormData(prev => ({
          ...prev,
          fullName: prev.fullName || data.customerProfile?.fullName || "",
          primaryPhone: prev.primaryPhone || data.customerProfile?.phoneNumber || "",
          nidNumber: prev.nidNumber || data.customerProfile?.nationalIdNumber || "",
          selectedSizeId: prev.selectedSizeId || initialSizeId,
          wilayaCode: prev.wilayaCode || initialWilaya?.code || "16",
          commune: prev.commune || initialCommune
        }));
      } catch (err) {
        console.error("Failed to load home page data", err);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);
  const handleBrandChange = (brand: BrandType) => {
    setSelectedBrand(brand);
    const matched = sizeOptions.find(t => t.brand === brand && t.inStock) || sizeOptions.find(t => t.brand === brand);
    const newSizeId = matched ? matched.id : "";
    setSelectedSizeId(newSizeId);
    setFormData(prev => ({
      ...prev,
      brand,
      selectedSizeId: newSizeId
    }));
  };
  const handleSizeChange = (sizeId: string) => {
    setSelectedSizeId(sizeId);
    const found = sizeOptions.find(t => t.id === sizeId);
    setFormData(prev => ({
      ...prev,
      selectedSizeId: sizeId,
      ...(found ? {
        brand: found.brand
      } : {})
    }));
  };
  const handleFormChange = (updated: Partial<OrderFormData>) => {
    setFormData(prev => {
      const next = {
        ...prev,
        ...updated
      };
      if (updated.brand && updated.brand !== prev.brand) {
        setSelectedBrand(updated.brand);
        const matched = sizeOptions.find(t => t.brand === updated.brand && t.inStock) || sizeOptions.find(t => t.brand === updated.brand);
        if (matched && (!updated.selectedSizeId || updated.selectedSizeId === prev.selectedSizeId)) {
          next.selectedSizeId = matched.id;
          setSelectedSizeId(matched.id);
        }
      }
      if (updated.selectedSizeId && updated.selectedSizeId !== prev.selectedSizeId) {
        setSelectedSizeId(updated.selectedSizeId);
      }
      return next;
    });
  };
  const scrollToCatalog = () => {
    const el = document.getElementById("catalog-section");
    if (el) {
      el.scrollIntoView({
        behavior: "smooth"
      });
    }
  };
  const scrollToOrderForm = () => {
    const el = document.getElementById("order-section");
    if (el) {
      el.scrollIntoView({
        behavior: "smooth"
      });
    }
  };
  const handleNewOrder = () => {
    setConfirmedReceipt(null);
    const defaultTire = sizeOptions.find(t => t.brand === selectedBrand && t.inStock) || sizeOptions[0];
    const initialWilaya = wilayas.find(w => w.code === "16") || wilayas[0];
    const initialCommune = initialWilaya && initialWilaya.communes.length > 0 ? initialWilaya.communes[0] : "";
    setFormData({
      fullName: "",
      primaryPhone: "",
      secondaryPhone: "",
      wilayaCode: initialWilaya ? initialWilaya.code : "16",
      commune: initialCommune,
      brand: selectedBrand,
      selectedSizeId: defaultTire ? defaultTire.id : "",
      quantity: 2,
      nidNumber: "",
      edahabiaNumber: "",
      edahabiaExpiry: "",
      registrationDate: new Date().toISOString().split("T")[0]
    });
    scrollToOrderForm();
  };
  return <div className="flex min-h-screen flex-col bg-background font-body text-foreground antialiased selection:bg-primary selection:text-primary-foreground">
      {/* 1. Hero Section with official branding, claim & dual actions */}
      <Hero onOrderClick={scrollToOrderForm} onCatalogClick={scrollToCatalog} />

      {/* 2. Platform Matrix Banner with core capabilities */}
      <PlatformMatrix />

      {/* 3. How It Works (3 Steps) */}
      <HowItWorks />

      {/* 4. Why Naftal Mhatati (3 Pillars) */}
      <WhyNaftalMhatati />

      {/* 5. Direct Tire Catalog (Continental & Iris only with dynamic dropdown) */}
      <TireCatalog selectedBrand={selectedBrand} onBrandChange={handleBrandChange} selectedSizeId={selectedSizeId} onSizeChange={handleSizeChange} sizeOptions={sizeOptions} onProceedToOrder={scrollToOrderForm} />

      {/* 6. Comprehensive Order Form Section */}
      <OrderFormSection formData={formData} onFormChange={handleFormChange} sizeOptions={sizeOptions} wilayas={wilayas} onSubmitSuccess={receipt => setConfirmedReceipt(receipt)} />

      {/* 7. About Naftal & Digital Vision */}
      <AboutNaftal />

      {/* 8. Contact Hub & FAQ Accordion */}
      <ContactAndFaq faqs={faqs} supportChannels={supportChannels} />

      {/* Order Confirmation Receipt Modal / Ticket */}
      <OrderReceiptModal receipt={confirmedReceipt} onClose={() => setConfirmedReceipt(null)} onNewOrder={handleNewOrder} />
    </div>;
}
