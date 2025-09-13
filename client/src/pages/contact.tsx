import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
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
      className="min-h-screen pt-24 pb-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-accent">
            تواصل معنا
          </h1>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            نحن هنا لخدمتك. تواصل معنا لأي استفسار أو لحجز موعد للقياس
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            className="glass-card p-8 rounded-3xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الاسم الكامل</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="أدخل اسمك الكامل"
                          className="rounded-2xl bg-input border-border"
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
                      <FormLabel>البريد الإلكتروني</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="example@email.com"
                          className="rounded-2xl bg-input border-border"
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
                      <FormLabel>رقم الهاتف</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="+966 50 123 4567"
                          className="rounded-2xl bg-input border-border"
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
                      <FormLabel>الموضوع</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="rounded-2xl bg-input border-border" data-testid="select-contact-subject">
                            <SelectValue placeholder="اختر الموضوع" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
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
                      <FormLabel>الرسالة</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="اكتب رسالتك هنا..."
                          className="rounded-2xl bg-input border-border resize-none min-h-[120px]"
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
                  className="w-full px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-bold hover:scale-105 transition-all"
                  data-testid="button-submit-contact"
                >
                  {contactMutation.isPending ? "جاري الإرسال..." : "إرسال الرسالة"}
                </Button>
              </form>
            </Form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Address */}
            <div className="glass-card p-6 rounded-3xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 grid place-items-center text-primary">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">العنوان</h3>
                  <p className="opacity-80">
                    شارع الملك عبدالعزيز، الرياض 12345، المملكة العربية السعودية
                  </p>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="glass-card p-6 rounded-3xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 grid place-items-center text-primary">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">الهاتف</h3>
                  <p className="opacity-80">+966 11 123 4567</p>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="glass-card p-6 rounded-3xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 grid place-items-center text-primary">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">البريد الإلكتروني</h3>
                  <p className="opacity-80">info@gulf-falcon.com</p>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="glass-card p-6 rounded-3xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 grid place-items-center text-primary">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">ساعات العمل</h3>
                  <p className="opacity-80">السبت - الخميس: 9:00 ص - 10:00 م</p>
                  <p className="opacity-80">الجمعة: 2:00 م - 10:00 م</p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="glass-card p-6 rounded-3xl">
              <div className="w-full h-48 bg-muted/20 dark:bg-muted/20 light:bg-muted/40 rounded-2xl flex items-center justify-center">
                <p className="text-muted-foreground">خريطة الموقع</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.main>
  );
}
