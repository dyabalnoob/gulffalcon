import Layout from '../../../components/layout/Layout'
import { useMutation } from '@tanstack/react-query'
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
import type { z } from 'zod'

type ContactFormData = z.infer<typeof insertContactMessageSchema>

export default function ContactPage() {
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
        title: "تم الإرسال بنجاح",
        description: "شكراً لتواصلكم معنا. سنرد عليكم قريباً",
      })
      form.reset()
    },
    onError: (error: any) => {
      console.error('Contact form error:', error)
      toast({
        variant: "destructive",
        title: "خطأ في الإرسال",
        description: "حدث خطأ أثناء إرسال رسالتك. يرجى المحاولة مرة أخرى",
      })
    },
  })

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data)
  }

  const contactInfo = [
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "العنوان",
      content: "المملكة العربية السعودية، الرياض، أسواق القرية الشعبية",
    },
    {
      icon: <Phone className="w-5 h-5" />,
      title: "الهاتف",
      content: "+966 50 123 4567",
    },
    {
      icon: <Mail className="w-5 h-5" />,
      title: "البريد الإلكتروني",
      content: "info@gulffalcon.sa",
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "ساعات العمل",
      content: "السبت - الخميس: 9:00 ص - 6:00 م",
    },
  ]

  return (
    <Layout>
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4" data-testid="contact-title">
            تواصل معنا
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto" data-testid="contact-subtitle">
            نحن هنا لخدمتك. تواصل معنا لأي استفسار أو لحجز موعد للقياس
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl" data-testid="form-title">
                  <MessageSquare className="w-6 h-6" />
                  أرسل لنا رسالة
                </CardTitle>
                <CardDescription data-testid="form-description">
                  املأ النموذج أدناه وسنتواصل معك في أقرب وقت ممكن
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="contact-form">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>الاسم *</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="اسمك الكامل"
                                {...field}
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
                            <FormLabel>البريد الإلكتروني *</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="your@email.com"
                                {...field}
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
                            <FormLabel>رقم الهاتف</FormLabel>
                            <FormControl>
                              <Input
                                type="tel"
                                placeholder="+966 50 123 4567"
                                {...field}
                                value={field.value || ''}
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
                            <FormLabel>الموضوع *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-contact-subject">
                                  <SelectValue placeholder="اختر موضوع الرسالة" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="general">استفسار عام</SelectItem>
                                <SelectItem value="product">استفسار عن منتج</SelectItem>
                                <SelectItem value="custom">تصميم خاص</SelectItem>
                                <SelectItem value="other">أخرى</SelectItem>
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
                          <FormLabel>الرسالة *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="اكتب رسالتك هنا..."
                              {...field}
                              rows={6}
                              className="resize-none"
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
                      className="w-full bg-yellow-600 hover:bg-yellow-700 font-bold text-lg h-12"
                      disabled={contactMutation.isPending}
                      data-testid="button-contact-submit"
                    >
                      {contactMutation.isPending ? (
                        "جاري الإرسال..."
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          إرسال الرسالة
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle data-testid="contact-info-title">معلومات التواصل</CardTitle>
                <CardDescription data-testid="contact-info-description">
                  يمكنك التواصل معنا مباشرة عبر المعلومات التالية
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-3" data-testid={`contact-info-${index}`}>
                    <div className="text-yellow-600 mt-1">
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white" data-testid={`contact-info-title-${index}`}>
                        {info.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400" data-testid={`contact-info-content-${index}`}>
                        {info.content}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Map Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle data-testid="map-title">موقعنا</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full h-48 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center" data-testid="map-placeholder">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">خريطة الموقع</p>
                    <p className="text-gray-400 text-xs">أسواق القرية الشعبية، الرياض</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </Layout>
  )
}