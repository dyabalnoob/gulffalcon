import { Route } from 'wouter'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import GalleryPage from './pages/GalleryPage'
import ContactPage from './pages/ContactPage'

export default function App() {
  return (
    <div>
      <Route path="/" component={HomePage} />
      <Route path="/products" component={ProductsPage} />
      <Route path="/gallery" component={GalleryPage} />
      <Route path="/contact" component={ContactPage} />
    </div>
  )
}