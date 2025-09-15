import { useEffect } from "react";
import { useLanguage } from "@/lib/contexts/language-context";

interface SEOMetaProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "product";
  price?: string;
  currency?: string;
  availability?: string;
  brand?: string;
  category?: string;
  sku?: string;
  jsonLd?: Record<string, any>;
}

export default function SEOMeta({
  title,
  description,
  image,
  url,
  type = "website",
  price,
  currency = "SAR",
  availability,
  brand,
  category,
  sku,
  jsonLd
}: SEOMetaProps) {
  const { isRTL, language } = useLanguage();
  
  const siteName = isRTL ? "مؤسسة الصقر الخليجي" : "Gulf Falcon Corporation";
  const defaultDescription = isRTL 
    ? "متجر فاخر للأزياء الرجالية العربية - ثياب، مشالح، سديريات، وإكسسوارات راقية"
    : "Luxury Arabic men's fashion store - Thobes, Mishlahs, Vests, and premium accessories";
  
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const finalDescription = description || defaultDescription;
  const finalUrl = url || window.location.href;
  const finalImage = image || "/images/logo.png";
  
  useEffect(() => {
    // Update document title
    document.title = fullTitle;
    
    // Update meta tags
    const updateMetaTag = (property: string, content: string, isProperty = false) => {
      const attrName = isProperty ? "property" : "name";
      let meta = document.querySelector(`meta[${attrName}="${property}"]`) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attrName, property);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };
    
    // Basic meta tags
    updateMetaTag("description", finalDescription);
    updateMetaTag("keywords", isRTL 
      ? "أزياء رجالية, ثوب, مشلح, سديرية, بشت, عقال, شماغ, غترة, ملابس خليجية, أزياء سعودية"
      : "Men's fashion, Thobe, Mishlah, Vest, Bisht, Agal, Shemagh, Ghutra, Gulf clothing, Saudi fashion"
    );
    
    // Open Graph tags
    updateMetaTag("og:title", fullTitle, true);
    updateMetaTag("og:description", finalDescription, true);
    updateMetaTag("og:image", finalImage, true);
    updateMetaTag("og:url", finalUrl, true);
    updateMetaTag("og:type", type, true);
    updateMetaTag("og:site_name", siteName, true);
    updateMetaTag("og:locale", isRTL ? "ar_SA" : "en_US", true);
    
    // Twitter Card tags
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", fullTitle);
    updateMetaTag("twitter:description", finalDescription);
    updateMetaTag("twitter:image", finalImage);
    
    // Product-specific meta tags
    if (type === "product") {
      if (price) updateMetaTag("product:price:amount", price, true);
      if (currency) updateMetaTag("product:price:currency", currency, true);
      if (availability) updateMetaTag("product:availability", availability, true);
      if (brand) updateMetaTag("product:brand", brand, true);
      if (category) updateMetaTag("product:category", category, true);
    }
    
    // Language and direction
    document.documentElement.lang = language;
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    
    // Add JSON-LD structured data
    if (jsonLd) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(jsonLd);
      script.id = "json-ld-data";
      
      // Remove existing JSON-LD if present
      const existing = document.getElementById("json-ld-data");
      if (existing) {
        existing.remove();
      }
      
      document.head.appendChild(script);
    }
    
    // Cleanup function
    return () => {
      // Restore default title when component unmounts
      document.title = siteName;
      
      // Remove JSON-LD script
      const jsonLdScript = document.getElementById("json-ld-data");
      if (jsonLdScript) {
        jsonLdScript.remove();
      }
    };
  }, [fullTitle, finalDescription, finalImage, finalUrl, type, price, currency, availability, brand, category, sku, jsonLd, isRTL, language, siteName]);
  
  return null;
}