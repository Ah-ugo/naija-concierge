"use client";

import type React from "react";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Shield,
  Clock,
  Globe,
  Award,
  Users,
  HeartHandshake,
} from "lucide-react";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const Feature = ({ icon, title, description, index }: FeatureProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex gap-4"
    >
      <div className="flex-shrink-0 mt-1">
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  );
};

export function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Safety & Security",
      description:
        "Your safety is our priority. We provide vetted drivers, secure accommodations, and 24/7 emergency support.",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Time Efficiency",
      description:
        "We handle the logistics so you can focus on what matters, whether it's business meetings or family time.",
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Local Expertise",
      description:
        "Our team has deep knowledge of Lagos and Nigerian culture, providing authentic experiences and insider access.",
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Premium Quality",
      description:
        "We partner only with the best service providers to ensure a luxury experience throughout your stay.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Personalized Service",
      description:
        "Every client receives a customized experience tailored to their specific needs and preferences.",
    },
    {
      icon: <HeartHandshake className="h-6 w-6" />,
      title: "Cultural Connection",
      description:
        "We help Nigerians in diaspora reconnect with their roots through meaningful cultural experiences.",
    },
  ];

  return (
    <section ref={containerRef} className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Why Choose Naija Concierge?
            </h2>
            <p className="text-muted-foreground mb-12 text-lg">
              We understand the unique needs of Nigerians in diaspora returning
              home. Our services are designed to make your Lagos experience
              seamless, safe, and memorable.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <Feature
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  index={index}
                />
              ))}
            </div>
          </motion.div>

          <motion.div style={{ y }} className="relative hidden lg:block">
            <div className="relative h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/placeholder.svg?height=1200&width=800"
                alt="Naija Concierge Services"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="bg-background/80 backdrop-blur-sm p-6 rounded-xl">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl">
                      NC
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Naija Concierge</h3>
                      <p className="text-sm text-muted-foreground">
                        Premium Services
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Client Satisfaction</p>
                      <p className="text-2xl font-bold">98%</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Years of Service</p>
                      <p className="text-2xl font-bold">10+</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Happy Clients</p>
                      <p className="text-2xl font-bold">5000+</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-8 -right-8 w-16 h-16 bg-primary/10 rounded-full"></div>
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-primary/10 rounded-full"></div>
            <div className="absolute top-1/4 -left-12 w-12 h-12 bg-primary/20 rounded-full"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
