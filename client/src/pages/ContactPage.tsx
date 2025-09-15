import Layout from '../../../components/layout/Layout'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { insertContactMessageSchema } from '../../../shared/schema'
import { apiRequest } from '../../../lib/queryClient'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Textarea } from '../../../components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../components/ui/form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { useToast } from '../../../lib/hooks/use-toast'
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useLanguage } from '@/lib/contexts/language-context'
import type { z } from 'zod'

type ContactFormData = z.infer<typeof insertContactMessageSchema>

export default function ContactPage() {
  const { t, isRTL } = useLanguage()
  const { toast } = useToast()

  const form = useForm<ContactFormData>({
    resolver: zodResolver(insertContactMessageSchema.extend({
      subject: insertContactMessageSchema.shape.subject.default('general')
    })),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: 'general',
      message: '',
    },
  })

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest('POST', '/api/contact', data)
      return response.json()
    },
    onSuccess: () => {
      toast({
        title: isRTL ? "تم الإرسال بنجاح" : "Sent Successfully",
        description: isRTL ? "شكراً لتواصلكم معنا. سنرد عليكم قريباً" : "Thank you for contacting us. We'll get back to you soon.",
      })
      form.reset()
    },
    onError: (error: any) => {
      console.error('Contact form error:', error)
      toast({
        variant: "destructive",
        title: isRTL ? "خطأ في الإرسال" : "Send Error",
        description: isRTL ? "حدث خطأ أثناء إرسال رسالتك. يرجى المحاولة مرة أخرى" : "An error occurred while sending your message. Please try again.",
      })
    },
  })

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data)
  }

  const contactInfo = [
    {
      icon: <MapPin className="w-5 h-5" />,
      title: t.contact.info.address,
      content: "المملكة العربية السعودية، الرياض",
    },
    {
      icon: <Phone className="w-5 h-5" />,
      title: t.contact.info.phone,
      content: "+966 50 123 4567",
    },
    {
      icon: <Mail className="w-5 h-5" />,
      title: t.contact.info.email,
      content: "info@gulffalcon.sa",
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: t.contact.info.workingHours,
      content: isRTL ? "السبت - الخميس: 9:00 ص - 6:00 م" : "Saturday - Thursday: 9:00 AM - 6:00 PM",
    },
  ]

  return (
    <>
      <Helmet>
        <title>تواصل معنا - مؤسسة الصقر الخليجي</title>
        <meta name="description" content="تواصل مع مؤسسة الصقر الخليجي للاستفسارات والطلبات الخاصة" />
      </Helmet>
      <Layout>
        <motion.div
          className="container mx-auto px-4 py-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
              {t.contact.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t.contact.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="glass-card professional-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <MessageSquare className="w-6 h-6" />
                    أرسل لنا رسالة
                  </CardTitle>
                  <CardDescription>
                    املأ النموذج أدناه وسنتواصل معك في أقرب وقت ممكن
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t.contact.form.name} *</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="اسمك الكامل"
                                  {...field}
                                  className="rounded-xl"
                                  data-testid="input-contact-name"
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
                              <FormLabel>{t.contact.form.email} *</FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="your@email.com"
                                  {...field}
                                  className="rounded-xl"
                                  data-testid="input-contact-email"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t.contact.form.phone}</FormLabel>
                              <FormControl>
                                <Input
                                  type="tel"
                                  placeholder="+966 50 123 4567"
                                  {...field}
                                  value={field.value || ''}
                                  className="rounded-xl"
                                  data-testid="input-contact-phone"
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
                              <FormLabel>{t.contact.form.subject} *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="rounded-xl" data-testid="select-contact-subject">
                                    <SelectValue placeholder="اختر موضوع الرسالة" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="general">{t.contact.form.generalInquiry}</SelectItem>
                                  <SelectItem value="product">{t.contact.form.productInquiry}</SelectItem>
                                  <SelectItem value="custom">{t.contact.form.customDesign}</SelectItem>
                                  <SelectItem value="other">{t.contact.form.other}</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t.contact.form.message} *</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="اكتب رسالتك هنا..."
                                {...field}
                                rows={6}
                                className="rounded-xl resize-none"
                                data-testid="input-contact-message"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full rounded-xl font-bold text-lg h-12"
                        disabled={contactMutation.isPending}
                        data-testid="button-contact-submit"
                      >
                        {contactMutation.isPending ? (
                          "جاري الإرسال..."
                        ) : (
                          <>
                            <Send className="w-5 h-5 ml-2" />
                            {t.contact.form.submit}
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  className="glass-card p-6 rounded-2xl professional-border"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg professional-border bg-gradient-to-br from-green-500/10 to-teal-600/10 grid place-items-center text-primary">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">{info.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{info.content}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </Layout>
    </>
  )
}