import { Route } from 'wouter'
import ContactStandalone from '../../components/ContactStandalone'
import Layout from '../../components/layout/Layout'

// Simple page components
function HomePage() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Gulf Falcon Trading</h1>
      <p>Welcome to our website</p>
      <nav style={{ marginTop: '20px' }}>
        <a href="/contact" style={{ marginRight: '10px', padding: '10px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>Contact Us</a>
        <a href="/products" style={{ marginRight: '10px', padding: '10px', backgroundColor: '#28a745', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>Products</a>
        <a href="/gallery" style={{ padding: '10px', backgroundColor: '#6c757d', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>Gallery</a>
      </nav>
    </div>
  )
}

function ProductsPage() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Products</h1>
      <p>Our products will be displayed here</p>
      <nav style={{ marginTop: '20px' }}>
        <a href="/" style={{ marginRight: '10px', padding: '10px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>Home</a>
        <a href="/contact" style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>Contact</a>
      </nav>
    </div>
  )
}

function GalleryPage() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Gallery</h1>
      <p>Our gallery will be displayed here</p>
      <nav style={{ marginTop: '20px' }}>
        <a href="/" style={{ marginRight: '10px', padding: '10px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>Home</a>
        <a href="/contact" style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>Contact</a>
      </nav>
    </div>
  )
}

export default function App() {
  return (
    <div>
      <Route path="/">
        <HomePage />
      </Route>
      <Route path="/contact">
        <Layout>
          <ContactStandalone />
        </Layout>
      </Route>
      <Route path="/products">
        <ProductsPage />
      </Route>
      <Route path="/gallery">
        <GalleryPage />
      </Route>
    </div>
  )
}