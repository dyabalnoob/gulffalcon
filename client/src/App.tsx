import { Route, Switch } from 'wouter'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'wouter'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import GalleryPage from './pages/GalleryPage'
import ContactPage from './pages/ContactPage'

export default function App() {
  const [location] = useLocation()

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        <Switch location={location}>
          <Route path="/">
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <HomePage />
            </motion.div>
          </Route>
          <Route path="/products">
            <motion.div
              key="products"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ProductsPage />
            </motion.div>
          </Route>
          <Route path="/gallery">
            <motion.div
              key="gallery"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <GalleryPage />
            </motion.div>
          </Route>
          <Route path="/contact">
            <motion.div
              key="contact"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ContactPage />
            </motion.div>
          </Route>
        </Switch>
      </AnimatePresence>
    </div>
  )
}