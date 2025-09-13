import { MessageCircle } from "lucide-react";

export default function WhatsAppFloat() {
  const phoneNumber = "966501234567";
  const message = "مرحبا، أريد الاستفسار عن منتجاتكم";
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      data-testid="link-whatsapp"
    >
      <div className="w-14 h-14 rounded-full bg-green-500 shadow-lg flex items-center justify-center text-white hover:scale-110 transition-all">
        <MessageCircle className="w-7 h-7" />
      </div>
    </a>
  );
}
