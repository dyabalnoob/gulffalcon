import Layout from '../../../components/layout/Layout'
import { Link } from 'wouter'
import { Button } from '../../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Badge } from '../../../components/ui/badge'

export default function HomePage() {
  return (
    <Layout>
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 px-6 text-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <img 
                src="/logo.png" 
                alt="مؤسسة الصقر الخليجي" 
                className="w-32 h-32 mx-auto mb-6 rounded-lg shadow-lg"
                data-testid="logo-image"
              />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6" data-testid="hero-title">
              مؤسسة الصقر الخليجي
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed" data-testid="hero-subtitle">
              مشالح فاخرة للنخبة… علامة تجارية سعودية بواجهة محلية وعالمية، مع شبكة جملة وقطاع فردي، ووكلاء وموزعين
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" className="bg-yellow-600 hover:bg-yellow-700 text-white" data-testid="button-products">
                  استعرض المنتجات
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white" data-testid="button-contact">
                  تواصل معنا
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white" data-testid="about-title">
              نبذة عن المؤسسة
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card data-testid="card-history">
                <CardHeader>
                  <CardTitle className="text-yellow-600">التاريخ</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    انطلقت مؤسسة الصقر الخليجي للتجارة من مدينة الرياض عام 1979م على يد مؤسسها عايض بن دليم فهد النوب
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card data-testid="card-brand">
                <CardHeader>
                  <CardTitle className="text-yellow-600">العلامة التجارية</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    في عام 1986م، جاءت النقلة النوعية مع إطلاق براند الصقر الخليجي كهوية تجارية بارزة
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card data-testid="card-today">
                <CardHeader>
                  <CardTitle className="text-yellow-600">اليوم</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    أكثر من أربعة عقود من العمل والإنجاز، مع مقر رئيسي في أسواق القرية الشعبية بالرياض
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Featured Categories */}
        <section className="py-16 px-6 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white" data-testid="categories-title">
              منتجاتنا المميزة
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'مشالح فاخرة', count: '12+', category: 'cloaks' },
                { name: 'سديريات', count: '8+', category: 'vests' },
                { name: 'سبح رجالي', count: '15+', category: 'prayer-beads' },
                { name: 'عصي فاخرة', count: '6+', category: 'walking-sticks' }
              ].map((item, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow" data-testid={`category-${item.category}`}>
                  <CardHeader>
                    <CardTitle className="text-yellow-600">{item.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="secondary" className="text-lg">{item.count}</Badge>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">منتج متوفر</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Link href="/products">
                <Button className="bg-yellow-600 hover:bg-yellow-700" data-testid="button-view-all">
                  عرض جميع المنتجات
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  )
}