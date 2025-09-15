import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'ar' | 'en';

interface Translations {
  nav: {
    home: string;
    about: string;
    products: string;
    brands: string;
    gallery: string;
    contact: string;
  };
  hero: {
    title: string;
    subtitle: string;
    ctaCatalog: string;
    ctaContact: string;
  };
  about: {
    title: string;
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
    readMore: string;
  };
  brands: {
    title: string;
    partners: string;
  };
  products: {
    title: string;
    featured: string;
  };
  contact: {
    title: string;
    subtitle: string;
    form: {
      name: string;
      email: string;
      phone: string;
      subject: string;
      message: string;
      submit: string;
      generalInquiry: string;
      productInquiry: string;
      customDesign: string;
      other: string;
    };
    info: {
      address: string;
      phone: string;
      email: string;
      workingHours: string;
    };
  };
  footer: {
    description: string;
    quickLinks: string;
    services: string;
    customMeasurement: string;
    customDesign: string;
    delivery: string;
    fashionConsulting: string;
    afterSales: string;
    rights: string;
  };
}

const translations: Record<Language, Translations> = {
  ar: {
    nav: {
      home: 'الرئيسية',
      about: 'من نحن',
      products: 'المنتجات',
      brands: 'الماركات',
      gallery: 'المعرض',
      contact: 'تواصل',
    },
    hero: {
      title: 'الصقر الخليجي للتجارة',
      subtitle: 'مشالح فاخرة للنخبة… علامة تجارية سعودية بواجهة محلية وعالمية، مع شبكة جملة وقطاع فردي، ووكلاء وموزعين.',
      ctaCatalog: 'استعرض الكتالوج',
      ctaContact: 'تواصل معنا',
    },
    about: {
      title: 'نبذة عن المؤسسة',
      paragraph1: 'انطلقت مؤسسة الصقر الخليجي للتجارة من مدينة الرياض عام 1979م على يد مؤسسها عايض بن دليم فهد النوب، برؤية تجارية طموحة جمعت بين الأصالة والابتكار.',
      paragraph2: 'وفي عام 1986م، جاءت النقلة النوعية مع إطلاق براند الصقر الخليجي كهوية تجارية بارزة، جعلت من المؤسسة اسمًا راسخًا في السوق السعودي.',
      paragraph3: 'اليوم، وبعد أكثر من أربعة عقود من العمل والإنجاز، تتمركز إدارة المؤسسة ومقرها الرئيسي في أسواق القرية الشعبية بالرياض، حيث تمتلك مركزًا تجاريًا كبيرًا بفتحات متعددة يخدم جميع سكان منطقة الرياض والمناطق المجاورة.',
      readMore: 'اقرأ المزيد',
    },
    brands: {
      title: 'الماركات',
      partners: 'شركاؤنا المتميزون',
    },
    products: {
      title: 'المنتجات',
      featured: 'مختارات',
    },
    contact: {
      title: 'تواصل معنا',
      subtitle: 'نحن هنا لخدمتك. تواصل معنا لأي استفسار أو لحجز موعد للقياس',
      form: {
        name: 'الاسم',
        email: 'البريد الإلكتروني',
        phone: 'رقم الهاتف',
        subject: 'الموضوع',
        message: 'الرسالة',
        submit: 'إرسال',
        generalInquiry: 'استفسار عام',
        productInquiry: 'استفسار عن منتج',
        customDesign: 'تصميم خاص',
        other: 'أخرى',
      },
      info: {
        address: 'العنوان',
        phone: 'الهاتف',
        email: 'البريد',
        workingHours: 'ساعات العمل',
      },
    },
    footer: {
      description: 'رائدة في عالم الأناقة الرجالية، نقدم أفضل الأزياء التقليدية والعصرية بجودة عالية وتصاميم فريدة.',
      quickLinks: 'روابط سريعة',
      services: 'خدماتنا',
      customMeasurement: 'قياس مخصص',
      customDesign: 'تصميم حسب الطلب',
      delivery: 'خدمة التوصيل',
      fashionConsulting: 'استشارة أزياء',
      afterSales: 'خدمة ما بعد البيع',
      rights: '© 2024 مؤسسة الصقر الخليجي. جميع الحقوق محفوظة.',
    },
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About Us',
      products: 'Products',
      brands: 'Brands',
      gallery: 'Gallery',
      contact: 'Contact',
    },
    hero: {
      title: 'Gulf Falcon Trading',
      subtitle: 'Premium Mishlahs for the Elite… A Saudi brand with local and international presence, wholesale network, retail sector, agents and distributors.',
      ctaCatalog: 'Browse Catalog',
      ctaContact: 'Contact Us',
    },
    about: {
      title: 'About Us',
      paragraph1: 'Gulf Falcon Trading Corporation was launched from Riyadh in 1979 by its founder Ayed bin Dalim Fahad Al-Noub, with an ambitious commercial vision that combined authenticity and innovation.',
      paragraph2: 'In 1986, a qualitative leap came with the launch of the Gulf Falcon brand as a prominent commercial identity, making the corporation a well-established name in the Saudi market.',
      paragraph3: 'Today, after more than four decades of work and achievement, the corporation\'s management and headquarters are centered in the Folk Village Markets in Riyadh, where it owns a large commercial center with multiple outlets serving all residents of the Riyadh region and neighboring areas.',
      readMore: 'Read More',
    },
    brands: {
      title: 'Brands',
      partners: 'Our Distinguished Partners',
    },
    products: {
      title: 'Products',
      featured: 'Featured',
    },
    contact: {
      title: 'Contact Us',
      subtitle: 'We are here to serve you. Contact us for any inquiry or to book a measurement appointment',
      form: {
        name: 'Name',
        email: 'Email',
        phone: 'Phone Number',
        subject: 'Subject',
        message: 'Message',
        submit: 'Send',
        generalInquiry: 'General Inquiry',
        productInquiry: 'Product Inquiry',
        customDesign: 'Custom Design',
        other: 'Other',
      },
      info: {
        address: 'Address',
        phone: 'Phone',
        email: 'Email',
        workingHours: 'Working Hours',
      },
    },
    footer: {
      description: 'Leading in men\'s elegance, we offer the finest traditional and modern fashion with high quality and unique designs.',
      quickLinks: 'Quick Links',
      services: 'Our Services',
      customMeasurement: 'Custom Measurement',
      customDesign: 'Custom Design',
      delivery: 'Delivery Service',
      fashionConsulting: 'Fashion Consulting',
      afterSales: 'After Sales Service',
      rights: '© 2024 Gulf Falcon Corporation. All rights reserved.',
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Initialize language from localStorage or default to 'ar'
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLang = localStorage.getItem('language');
    return (savedLang === 'en' || savedLang === 'ar') ? savedLang : 'ar';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  // Update document direction when language changes
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
    isRTL: language === 'ar',
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}