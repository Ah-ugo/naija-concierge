"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Car,
  Home,
  Shield,
  Utensils,
  Map,
  Calendar,
} from "lucide-react";

export function ServicesHighlight() {
  const [services, setServices] = useState([
    {
      id: 1,
      title: "Airport Pickup",
      description:
        "Luxury transportation from the airport to your accommodation",
      icon: Car,
      link: "/services/airport-pickup",
    },
    {
      id: 2,
      title: "Accommodation",
      description: "Premium hotels and apartments in the best locations",
      icon: Home,
      link: "/services/accommodation",
    },
    {
      id: 3,
      title: "Emergency Assistance",
      description: "24/7 support for any emergency during your stay",
      icon: Shield,
      link: "/services/emergency",
    },
    {
      id: 4,
      title: "Restaurant Reservations",
      description: "Access to the finest dining experiences in Lagos",
      icon: Utensils,
      link: "/services/dining",
    },
    {
      id: 5,
      title: "City Tours",
      description: "Guided tours to the best attractions in Lagos",
      icon: Map,
      link: "/services/tours",
    },
    {
      id: 6,
      title: "Event Planning",
      description: "Custom event planning and coordination services",
      icon: Calendar,
      link: "/services/events",
    },
  ]);

  // Simulate fetching services from API
  useEffect(() => {
    // This would be replaced with an actual API call
    const fetchServices = async () => {
      try {
        // const response = await fetch('/api/services')
        // const data = await response.json()
        // setServices(data)
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    // fetchServices()
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="services-section" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Our Premium Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Experience Lagos with our comprehensive range of concierge services
            designed for Nigerians in diaspora.
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.div key={service.id} variants={item} className="h-full">
              <Card className="h-full hover-lift card-hover border border-border dark:border-border">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button asChild variant="ghost" className="group">
                    <Link href={service.link}>
                      Learn More{" "}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <Button asChild size="lg" className="animate-fade-in">
            <Link href="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
