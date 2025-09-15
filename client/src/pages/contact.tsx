import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, ExternalLink, MessageCircle } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactMessageSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import type { InsertContactMessage } from "@shared/schema";

export default function Contact() {
  const { toast } = useToast();

  const form = useForm<InsertContactMessage>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "استفسار عام",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: (data: InsertContactMessage) =>
      apiRequest("POST", "/api/contact", data),
    onSuccess: () => {
      toast({
        title: "تم إرسال رسالتك بنجاح!",
        description: "سنتواصل معك قريباً.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "خطأ في الإرسال",
        description: "يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContactMessage) => {
    contactMutation.mutate(data);
  };

  return (
    <motion.main
      className="min-h-screen pt-24 pb-10 brand-gradient relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-golden/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-golden/5 to-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block mb-6">
            <div className="shimmer-text text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent via-golden to-accent mb-4">
              تواصل معنا
            </div>
            <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-golden to-transparent"></div>
          </div>
          
          <p className="text-xl opacity-90 max-w-3xl mx-auto font-arabic leading-relaxed">
            نحن في خدمتكم دائماً. تواصلوا معنا لأي استفسار أو لحجز موعد للقياس والتفصيل الحصري
          </p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            className="glass-card p-8 md:p-10 rounded-3xl luxury-border"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-golden to-accent grid place-items-center">
                <MessageCircle className="w-6 h-6 text-black" />
              </div>
              <h2 className="text-2xl font-bold text-white font-arabic">أرسل لنا رسالة</h2>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-arabic font-semibold">الاسم الكامل</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="أدخل اسمك الكامل"
                          className="rounded-2xl bg-white/10 border-golden/30 text-white placeholder-white/60 focus:border-golden focus:ring-golden/20 font-arabic"
                          data-testid="input-contact-name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-arabic font-semibold">البريد الإلكتروني</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="example@email.com"
                          className="rounded-2xl bg-white/10 border-golden/30 text-white placeholder-white/60 focus:border-golden focus:ring-golden/20"
                          data-testid="input-contact-email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-arabic font-semibold">رقم الهاتف</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="+966 55 554 4571"
                          className="rounded-2xl bg-white/10 border-golden/30 text-white placeholder-white/60 focus:border-golden focus:ring-golden/20"
                          data-testid="input-contact-phone"
                          {...field}
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-arabic font-semibold">الموضوع</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="rounded-2xl bg-white/10 border-golden/30 text-white focus:border-golden focus:ring-golden/20" data-testid="select-contact-subject">
                            <SelectValue placeholder="اختر الموضوع" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-gray-900 border-golden/30">
                          <SelectItem value="استفسار عام">استفسار عام</SelectItem>
                          <SelectItem value="حجز موعد للقياس">حجز موعد للقياس</SelectItem>
                          <SelectItem value="طلب مخصص">طلب مخصص</SelectItem>
                          <SelectItem value="شكوى أو اقتراح">شكوى أو اقتراح</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-arabic font-semibold">الرسالة</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="اكتب رسالتك هنا..."
                          className="rounded-2xl bg-white/10 border-golden/30 text-white placeholder-white/60 focus:border-golden focus:ring-golden/20 resize-none min-h-[120px] font-arabic"
                          data-testid="textarea-contact-message"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={contactMutation.isPending}
                  className="w-full px-8 py-4 rounded-2xl bg-gradient-to-r from-golden to-accent text-black font-bold hover:scale-105 transition-all duration-300 shadow-lg shadow-golden/25 font-arabic"
                  data-testid="button-submit-contact"
                >
                  {contactMutation.isPending ? "جاري الإرسال..." : "إرسال الرسالة"}
                </Button>
              </form>
            </Form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Address */}
            <motion.div 
              className="glass-card p-6 rounded-3xl luxury-border hover:scale-105 transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-golden to-accent grid place-items-center flex-shrink-0">
                  <MapPin className="w-7 h-7 text-black" />
                </div>
                <div>
                  <h3 className="font-bold mb-2 text-white text-lg font-arabic">العنوان</h3>
                  <p className="text-white/90 leading-relaxed font-arabic">
                    المملكة العربية السعودية<br />
                    الرياض - أسواق القرية الشعبية
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Phone */}
            <motion.div 
              className="glass-card p-6 rounded-3xl luxury-border hover:scale-105 transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-golden to-accent grid place-items-center">
                  <Phone className="w-7 h-7 text-black" />
                </div>
                <div>
                  <h3 className="font-bold mb-2 text-white text-lg font-arabic">الهاتف المباشر</h3>
                  <a href="tel:+966555454571" className="text-golden text-xl font-bold hover:text-accent transition-colors">
                    055544571
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Email */}
            <motion.div 
              className="glass-card p-6 rounded-3xl luxury-border hover:scale-105 transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-golden to-accent grid place-items-center">
                  <Mail className="w-7 h-7 text-black" />
                </div>
                <div>
                  <h3 className="font-bold mb-2 text-white text-lg font-arabic">البريد للإدارة</h3>
                  <a href="mailto:gulffalcon.net@gmail.com" className="text-golden hover:text-accent transition-colors break-all">
                    gulffalcon.net@gmail.com
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Working Hours */}
            <motion.div 
              className="glass-card p-6 rounded-3xl luxury-border hover:scale-105 transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-golden to-accent grid place-items-center">
                  <Clock className="w-7 h-7 text-black" />
                </div>
                <div>
                  <h3 className="font-bold mb-2 text-white text-lg font-arabic">ساعات العمل</h3>
                  <p className="text-white/90 font-arabic">السبت - الخميس: 9:00 ص - 10:00 م</p>
                  <p className="text-white/90 font-arabic">الجمعة: 2:00 م - 10:00 م</p>
                </div>
              </div>
            </motion.div>

            {/* Interactive Map */}
            <motion.div 
              className="glass-card p-6 rounded-3xl luxury-border hover:scale-105 transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-golden to-accent grid place-items-center">
                  <MapPin className="w-7 h-7 text-black" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg font-arabic">خريطة الموقع</h3>
                  <p className="text-white/80 font-arabic">اضغط لفتح الخريطة التفاعلية</p>
                </div>
              </div>
              
              <div className="relative overflow-hidden rounded-2xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.4!2d46.6753!3d24.7136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQyJzQ5LjAiTiA0NsKwNDAnMzEuMSJF!5e0!3m2!1sar!2ssa!4v1234567890123"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-2xl"
                ></iframe>
                
                <a
                  href="https://maps.app.goo.gl/TMJo8D5eYk9X3DsT8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 bg-transparent hover:bg-black/20 transition-colors flex items-center justify-center group"
                  data-testid="link-google-maps"
                >
                  <div className="bg-black/60 backdrop-blur-sm rounded-2xl px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex items-center gap-2 text-white">
                      <ExternalLink className="w-5 h-5" />
                      <span className="font-arabic font-semibold">افتح في خرائط جوجل</span>
                    </div>
                  </div>
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.main>
  );
}