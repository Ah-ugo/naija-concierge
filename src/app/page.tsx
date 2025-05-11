import { HeroSection } from "@/components/home/hero-section";
import { ServicesHighlight } from "@/components/home/services-highlight";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { FeaturesSection } from "@/components/home/features-section";
import { BlogPreview } from "@/components/home/blog-preview";
import { PricingSection } from "@/components/home/pricing-section";
import { NewsletterSection } from "@/components/home/newsletter-section";
import { CTASection } from "@/components/home/cta-section";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ServicesHighlight />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <BlogPreview />
      <CTASection />
      <NewsletterSection />
      <Footer />
    </main>
  );
}
