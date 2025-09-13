import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";
import { LanguageProvider } from "@/contexts/language-context";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import ScrollProgress from "@/components/scroll-progress";
import WhatsAppFloat from "@/components/whatsapp-float";
import Home from "@/pages/home";
import About from "@/pages/about";
import Products from "@/pages/products";
import ProductDetail from "@/pages/product-detail";
import Brands from "@/pages/brands";
import Gallery from "@/pages/gallery";
import Contact from "@/pages/contact";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <AnimatePresence mode="wait">
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/products" component={Products} />
        <Route path="/product/:slug" component={ProductDetail} />
        <Route path="/brands" component={Brands} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <div className="min-h-screen bg-background text-foreground">
            <ScrollProgress />
            <Navbar />
            <motion.main
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Router />
            </motion.main>
            <Footer />
            <WhatsAppFloat />
          </div>
          <Toaster />
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
