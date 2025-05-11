"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  image: string;
  quote: string;
}

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    // In a real app, this would fetch from the API
    const testimonialData: Testimonial[] = [
      {
        id: "1",
        name: "Dr. Oluwaseun Adeyemi",
        position: "CEO",
        company: "TechNigeria",
        image: "/placeholder.svg?height=200&width=200",
        quote:
          "Naija Concierge transformed my business trip to Lagos. From airport pickup to meeting arrangements, everything was flawless. Their attention to detail and professionalism is unmatched in Nigeria.",
      },
      {
        id: "2",
        name: "Chioma Okafor",
        position: "Fashion Designer",
        company: "ChiStyles",
        image: "/placeholder.svg?height=200&width=200",
        quote:
          "As someone who travels frequently between London and Lagos, having Naija Concierge handle all my logistics has been a game-changer. Their team anticipates needs I didn't even know I had!",
      },
      {
        id: "3",
        name: "James Adebayo",
        position: "Director",
        company: "Global Investments Ltd",
        image: "/placeholder.svg?height=200&width=200",
        quote:
          "The VIP package exceeded all expectations. From the moment I landed until my departure, I felt like royalty. Their connections in Lagos opened doors I didn't know existed.",
      },
      {
        id: "4",
        name: "Sarah Johnson",
        position: "Nigerian-American",
        company: "First-time visitor",
        image: "/placeholder.svg?height=200&width=200",
        quote:
          "Visiting Nigeria for the first time was intimidating, but Naija Concierge made it feel like home. Their cultural insights and personalized tour gave me a connection to my heritage I'll cherish forever.",
      },
    ];

    setTestimonials(testimonialData);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 8000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="py-24 bg-gradient-to-b from-white to-muted dark:from-background dark:to-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-muted to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-muted to-transparent" />
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold mb-6">What Our Clients Say</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
            Hear from our satisfied clients about their experiences with Naija
            Concierge services.
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            {testimonials.length > 0 && (
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <Card className="border-none shadow-lg bg-background/80 backdrop-blur-sm">
                  <CardContent className="p-8 md:p-12">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                      <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 flex-shrink-0">
                        <Image
                          src={
                            testimonials[currentIndex].image ||
                            "/placeholder.svg"
                          }
                          alt={testimonials[currentIndex].name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <Quote className="h-12 w-12 text-primary/20 mb-4" />
                        <p className="text-xl md:text-2xl italic mb-6 leading-relaxed">
                          "{testimonials[currentIndex].quote}"
                        </p>
                        <div>
                          <h4 className="text-xl font-bold">
                            {testimonials[currentIndex].name}
                          </h4>
                          <p className="text-muted-foreground">
                            {testimonials[currentIndex].position},{" "}
                            {testimonials[currentIndex].company}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Navigation dots */}
                <div className="flex justify-center mt-8 space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        currentIndex === index
                          ? "bg-primary w-8"
                          : "bg-primary/30"
                      }`}
                      onClick={() => setCurrentIndex(index)}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute top-1/2 -left-4 md:-left-8 transform -translate-y-1/2 bg-background rounded-full p-2 shadow-lg hover:bg-primary/10 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute top-1/2 -right-4 md:-right-8 transform -translate-y-1/2 bg-background rounded-full p-2 shadow-lg hover:bg-primary/10 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
