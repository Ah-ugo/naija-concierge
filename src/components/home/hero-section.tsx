"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const slides = [
  {
    title: "Premium Concierge Services in Nigeria",
    description:
      "Experience the finest concierge services tailored for expatriates and locals in Nigeria. We handle everything so you don't have to.",
    image:
      "https://img.freepik.com/free-photo/guest-filling-registration-forms_482257-96635.jpg",
    cta: "Explore Services",
    link: "/services",
  },
  {
    title: "Your Personal Assistant in Lagos",
    description:
      "From airport pickups to emergency assistance, we're available 24/7 to make your stay in Nigeria comfortable and stress-free.",
    image:
      "https://img.freepik.com/free-photo/african-woman-sitting-computer-science-class-lady-with-glasses-female-student-sitting-computer_1157-42317.jpg",
    cta: "View Packages",
    link: "/packages",
  },
  {
    title: "Exclusive Access & VIP Treatment",
    description:
      "Gain access to exclusive events, premium venues, and VIP services throughout Nigeria with our premium membership packages.",
    image:
      "https://img.freepik.com/free-photo/low-angle-man-working-hotel_23-2149963931.jpg",
    cta: "Join Now",
    link: "/register",
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden">
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            unoptimized
            src={slide.image || "/placeholder.svg"}
            alt={slide.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      ))}

      {/* Content */}
      <div className="container relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`transition-all duration-700 ${
              index === currentSlide
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
            style={{ display: index === currentSlide ? "block" : "none" }}
          >
            <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              {slide.title}
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-200 sm:text-xl">
              {slide.description}
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href={slide.link}>
                <Button size="lg" className="gap-2 text-base">
                  {slide.cta}
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2 border-white bg-transparent text-base text-white hover:bg-white/10"
                >
                  Contact Us
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        ))}

        {/* Slide indicators */}
        <div className="absolute bottom-8 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 w-8 rounded-full transition-all ${
                index === currentSlide ? "bg-white" : "bg-white/40"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
