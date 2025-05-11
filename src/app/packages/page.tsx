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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { PACKAGE_TYPES } from "@/lib/constants";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Check, ArrowRight, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import type { Package } from "@/types/package";

export default function PackagesPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [filteredPackages, setFilteredPackages] = useState<Package[]>([]);
  const [selectedType, setSelectedType] = useState("all");
  const [loading, setLoading] = useState(true);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    // In a real app, this would fetch from the API
    const fetchPackages = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock data
        const mockPackages: Package[] = [
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
          {
            id: "4",
            name: "VIP",
            description:
              "Ultra-luxury services for the most discerning clients",
            price: 500000,
            duration: "7 days",
            features: [
              "Private jet airport pickup and drop-off",
              "Presidential suite accommodation",
              "24/7 personal butler and concierge",
              "Premium SIM card with unlimited data",
              "Customized private tours",
              "VIP access to exclusive clubs and events",
              "Luxury vehicle with chauffeur",
              "Private chef for in-suite dining",
              "Personal shopping assistant",
              "Private security detail",
              "Yacht excursion",
            ],
            image: "/placeholder.svg?height=400&width=600",
            type: "VIP",
            isPopular: false,
            createdAt: "2023-01-01T00:00:00Z",
            updatedAt: "2023-01-01T00:00:00Z",
          },
          {
            id: "5",
            name: "Corporate",
            description:
              "Tailored services for business travelers and corporate groups",
            price: 350000,
            duration: "5 days",
            features: [
              "Airport pickup and drop-off",
              "Business hotel accommodation",
              "24/7 business concierge",
              "Meeting room arrangements",
              "Business equipment rental",
              "Translation services",
              "Executive transportation",
              "Corporate dining reservations",
              "Business networking assistance",
              "Document preparation and printing",
            ],
            image: "/placeholder.svg?height=400&width=600",
            type: "Corporate",
            isPopular: false,
            createdAt: "2023-01-01T00:00:00Z",
            updatedAt: "2023-01-01T00:00:00Z",
          },
        ];

        setPackages(mockPackages);
        setFilteredPackages(mockPackages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching packages:", error);
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  useEffect(() => {
    if (selectedType === "all") {
      setFilteredPackages(packages);
    } else {
      setFilteredPackages(packages.filter((pkg) => pkg.type === selectedType));
    }
  }, [selectedType, packages]);

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
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 bg-muted">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
          </div>

          <div className="container mx-auto px-4">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h1
                className="text-4xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Choose Your Package
              </motion.h1>
              <motion.p
                className="text-lg text-muted-foreground mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Select from our carefully designed packages to enhance your
                Lagos experience. Each package is customizable to meet your
                specific needs.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Packages Section */}
        <section className="py-16" ref={ref}>
          <div className="container mx-auto px-4">
            <Tabs
              defaultValue="all"
              onValueChange={setSelectedType}
              className="w-full"
            >
              <motion.div
                className="mb-8 overflow-x-auto pb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
              >
                <TabsList className="flex w-full justify-start">
                  <TabsTrigger value="all" className="px-4">
                    All
                  </TabsTrigger>
                  {PACKAGE_TYPES.map((type) => (
                    <TabsTrigger key={type} value={type} className="px-4">
                      {type}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </motion.div>

              <TabsContent value={selectedType} className="mt-0">
                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                ) : filteredPackages.length > 0 ? (
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={container}
                    initial="hidden"
                    animate={inView ? "show" : "hidden"}
                  >
                    {filteredPackages.map((pkg, index) => (
                      <motion.div
                        key={pkg.id}
                        variants={item}
                        whileHover={{ y: -10 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Card
                          className={`flex flex-col h-full hover-lift ${
                            pkg.isPopular
                              ? "border-primary shadow-lg relative"
                              : ""
                          }`}
                        >
                          {pkg.isPopular && (
                            <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-lg rounded-tr-lg">
                              Most Popular
                            </div>
                          )}
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <div className="text-sm uppercase font-medium text-muted-foreground">
                                {pkg.type}
                              </div>
                              <Badge
                                variant="outline"
                                className="flex items-center"
                              >
                                <Calendar className="h-3 w-3 mr-1" />
                                {pkg.duration}
                              </Badge>
                            </div>
                            <CardTitle className="text-2xl mt-2">
                              {pkg.name}
                            </CardTitle>
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
                                  transition={{ delay: index * 0.05 + 0.5 }}
                                >
                                  <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                                  <span className="text-sm">{feature}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </CardContent>
                          <CardFooter>
                            <Button
                              className="w-full group"
                              variant={pkg.isPopular ? "default" : "outline"}
                              asChild
                            >
                              <Link href={`/packages/${pkg.id}`}>
                                Choose {pkg.name}
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                              </Link>
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-semibold mb-2">
                      No packages found
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      We couldn't find any packages matching your criteria.
                      Please try a different type.
                    </p>
                    <Button onClick={() => setSelectedType("all")}>
                      View All Packages
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Custom Package Section */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-4">
                Need a Custom Package?
              </h2>
              <p className="text-muted-foreground mb-8">
                We can create a tailored package that perfectly matches your
                requirements and preferences.
              </p>
              <Button
                size="lg"
                asChild
                className="bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105"
              >
                <Link href="/contact">Request Custom Package</Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
