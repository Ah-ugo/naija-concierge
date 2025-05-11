"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import type { Package } from "@/types/package";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export function PricingSection() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    // In a real app, this would be fetched from the API
    const packageData: Package[] = [
      {
        id: "1",
        name: "Basic",
        description: "Essential services for a comfortable stay in Lagos",
        price: 50000,
        duration: "3 days",
        features: [
          "Airport pickup and drop-off",
          "Hotel booking assistance",
          "24/7 phone support",
          "Local SIM card",
          "City orientation guide",
        ],
        image: "/placeholder.svg?height=400&width=600",
        type: "Basic",
        isPopular: false,
        createdAt: "2023-01-01T00:00:00Z",
        updatedAt: "2023-01-01T00:00:00Z",
      },
      {
        id: "2",
        name: "Standard",
        description: "Enhanced services for a memorable Lagos experience",
        price: 120000,
        duration: "5 days",
        features: [
          "Airport pickup and drop-off",
          "Premium hotel booking",
          "24/7 dedicated concierge",
          "Local SIM card with data",
          "Guided city tour (half-day)",
          "Restaurant reservations",
          "Transportation for 3 days",
        ],
        image: "/placeholder.svg?height=400&width=600",
        type: "Standard",
        isPopular: true,
        createdAt: "2023-01-01T00:00:00Z",
        updatedAt: "2023-01-01T00:00:00Z",
      },
      {
        id: "3",
        name: "Premium",
        description: "Luxury services for an exceptional Lagos experience",
        price: 250000,
        duration: "7 days",
        features: [
          "VIP airport pickup and drop-off",
          "Luxury hotel or apartment",
          "24/7 personal concierge",
          "Premium SIM card with unlimited data",
          "Full-day private city tour",
          "Fine dining reservations",
          "Private chauffeur for duration",
          "Event access and tickets",
          "Shopping assistant",
          "Security personnel",
        ],
        image: "/placeholder.svg?height=400&width=600",
        type: "Premium",
        isPopular: false,
        createdAt: "2023-01-01T00:00:00Z",
        updatedAt: "2023-01-01T00:00:00Z",
      },
    ];

    setPackages(packageData);
    setLoading(false);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-20 bg-muted relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4">Choose Your Package</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Select from our carefully designed packages to enhance your Lagos
            experience. Each package is customizable to meet your specific
            needs.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="shimmer">
                <CardHeader>
                  <div className="h-6 bg-muted-foreground/20 rounded w-1/3 mb-2"></div>
                  <div className="h-8 bg-muted-foreground/20 rounded w-2/3 mb-2"></div>
                  <div className="h-4 bg-muted-foreground/20 rounded w-full"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-4 bg-muted-foreground/20 rounded mb-2"></div>
                  <div className="h-4 bg-muted-foreground/20 rounded mb-2"></div>
                  <div className="h-4 bg-muted-foreground/20 rounded mb-2"></div>
                  <div className="h-4 bg-muted-foreground/20 rounded mb-2"></div>
                  <div className="h-4 bg-muted-foreground/20 rounded"></div>
                </CardContent>
                <CardFooter>
                  <div className="h-10 bg-muted-foreground/20 rounded w-full"></div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={container}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
          >
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                variants={item}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card
                  className={`flex flex-col h-full hover-lift ${
                    pkg.isPopular ? "border-primary shadow-lg relative" : ""
                  }`}
                >
                  {pkg.isPopular && (
                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-lg rounded-tr-lg">
                      Most Popular
                    </div>
                  )}
                  <CardHeader>
                    <div className="text-sm uppercase font-medium text-muted-foreground">
                      {pkg.type}
                    </div>
                    <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                    <div className="mt-2">
                      <span className="text-3xl font-bold">
                        {formatCurrency(pkg.price)}
                      </span>
                      <span className="text-muted-foreground ml-1">
                        / {pkg.duration}
                      </span>
                    </div>
                    <CardDescription className="mt-2">
                      {pkg.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-2">
                      {pkg.features.map((feature, index) => (
                        <motion.li
                          key={index}
                          className="flex items-start"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + 0.5 }}
                        >
                          <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                          <span className="text-sm">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      variant={pkg.isPopular ? "default" : "outline"}
                      asChild
                    >
                      <Link href={`/packages/${pkg.id}`}>
                        Choose {pkg.name}
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <p className="text-muted-foreground mb-4">
            Need a custom package? We can tailor our services to your specific
            requirements.
          </p>
          <Button
            variant="outline"
            size="lg"
            asChild
            className="transition-all duration-300 hover:scale-105"
          >
            <Link href="/contact">Contact for Custom Package</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
