"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { SERVICES_CATEGORIES } from "@/lib/constants";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Search, Clock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import type { Service } from "@/types/service";

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    // In a real app, this would fetch from the API
    const fetchServices = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock data
        const mockServices: Service[] = [
          {
            id: "1",
            name: "VIP Airport Pickup",
            description:
              "Luxury airport pickup service with professional chauffeur and premium vehicle.",
            category: "Airport Pickup",
            price: 35000,
            image: "/placeholder.svg?height=400&width=600",
            duration: "3 hours",
            isAvailable: true,
            createdAt: "2023-01-01T00:00:00Z",
            updatedAt: "2023-01-01T00:00:00Z",
          },
          {
            id: "2",
            name: "Standard Airport Pickup",
            description:
              "Comfortable airport pickup service with professional driver.",
            category: "Airport Pickup",
            price: 25000,
            image: "/placeholder.svg?height=400&width=600",
            duration: "3 hours",
            isAvailable: true,
            createdAt: "2023-01-01T00:00:00Z",
            updatedAt: "2023-01-01T00:00:00Z",
          },
          {
            id: "3",
            name: "Luxury Hotel Booking",
            description:
              "Premium hotel booking service at the best luxury hotels in Lagos.",
            category: "Accommodation",
            price: 15000,
            image: "/placeholder.svg?height=400&width=600",
            duration: "Service fee only",
            isAvailable: true,
            createdAt: "2023-01-01T00:00:00Z",
            updatedAt: "2023-01-01T00:00:00Z",
          },
          {
            id: "4",
            name: "Daily Transportation",
            description:
              "Dedicated vehicle with driver for your daily transportation needs.",
            category: "Transportation",
            price: 50000,
            image: "/placeholder.svg?height=400&width=600",
            duration: "10 hours",
            isAvailable: true,
            createdAt: "2023-01-01T00:00:00Z",
            updatedAt: "2023-01-01T00:00:00Z",
          },
          {
            id: "5",
            name: "Lagos City Tour",
            description:
              "Comprehensive tour of Lagos with knowledgeable guide.",
            category: "Tour Guide",
            price: 45000,
            image: "/placeholder.svg?height=400&width=600",
            duration: "8 hours",
            isAvailable: true,
            createdAt: "2023-01-01T00:00:00Z",
            updatedAt: "2023-01-01T00:00:00Z",
          },
          {
            id: "6",
            name: "Fine Dining Reservation",
            description:
              "Secure reservations at the most exclusive restaurants in Lagos.",
            category: "Restaurant Booking",
            price: 10000,
            image: "/placeholder.svg?height=400&width=600",
            duration: "Service fee only",
            isAvailable: true,
            createdAt: "2023-01-01T00:00:00Z",
            updatedAt: "2023-01-01T00:00:00Z",
          },
          {
            id: "7",
            name: "Event Tickets",
            description:
              "Access to exclusive events, concerts, and shows in Lagos.",
            category: "Event Tickets",
            price: 15000,
            image: "/placeholder.svg?height=400&width=600",
            duration: "Service fee only",
            isAvailable: true,
            createdAt: "2023-01-01T00:00:00Z",
            updatedAt: "2023-01-01T00:00:00Z",
          },
          {
            id: "8",
            name: "Business Meeting Setup",
            description:
              "Complete business meeting arrangement including venue and equipment.",
            category: "Business Meeting",
            price: 75000,
            image: "/placeholder.svg?height=400&width=600",
            duration: "4 hours",
            isAvailable: true,
            createdAt: "2023-01-01T00:00:00Z",
            updatedAt: "2023-01-01T00:00:00Z",
          },
        ];

        setServices(mockServices);
        setFilteredServices(mockServices);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching services:", error);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    let result = services;

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter(
        (service) => service.category === selectedCategory
      );
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (service) =>
          service.name.toLowerCase().includes(query) ||
          service.description.toLowerCase().includes(query) ||
          service.category.toLowerCase().includes(query)
      );
    }

    setFilteredServices(result);
  }, [selectedCategory, searchQuery, services]);

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
                Our Premium Services
              </motion.h1>
              <motion.p
                className="text-lg text-muted-foreground mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Discover our range of concierge services designed to make your
                Lagos experience seamless and memorable.
              </motion.p>
              <motion.div
                className="relative max-w-md mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search services..."
                  className="pl-10 py-6"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16" ref={ref}>
          <div className="container mx-auto px-4">
            <Tabs
              defaultValue="all"
              onValueChange={setSelectedCategory}
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
                  {SERVICES_CATEGORIES.map((category) => (
                    <TabsTrigger
                      key={category}
                      value={category}
                      className="px-4"
                    >
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </motion.div>

              <TabsContent value={selectedCategory} className="mt-0">
                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <Card key={i} className="shimmer">
                        <div className="h-48 bg-muted"></div>
                        <CardHeader>
                          <div className="h-6 bg-muted-foreground/20 rounded w-3/4 mb-2"></div>
                          <div className="h-4 bg-muted-foreground/20 rounded w-1/2"></div>
                        </CardHeader>
                        <CardContent>
                          <div className="h-4 bg-muted-foreground/20 rounded mb-2"></div>
                          <div className="h-4 bg-muted-foreground/20 rounded mb-2"></div>
                          <div className="h-4 bg-muted-foreground/20 rounded w-2/3"></div>
                        </CardContent>
                        <CardFooter>
                          <div className="h-10 bg-muted-foreground/20 rounded w-full"></div>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : filteredServices.length > 0 ? (
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={container}
                    initial="hidden"
                    animate={inView ? "show" : "hidden"}
                  >
                    {filteredServices.map((service) => (
                      <motion.div
                        key={service.id}
                        variants={item}
                        whileHover={{ y: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Card className="overflow-hidden h-full flex flex-col hover-lift card-hover">
                          <div className="relative h-48 w-full overflow-hidden">
                            <Image
                              src={service.image || "/placeholder.svg"}
                              alt={service.name}
                              fill
                              className="object-cover transition-transform duration-500 hover:scale-105"
                            />
                            <div className="absolute top-2 right-2">
                              <Badge className="bg-primary text-primary-foreground">
                                {service.category}
                              </Badge>
                            </div>
                          </div>
                          <CardHeader>
                            <CardTitle>{service.name}</CardTitle>
                            <CardDescription>
                              {service.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="flex-grow">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Clock className="h-4 w-4 mr-1" />
                                <span>{service.duration}</span>
                              </div>
                              <div className="font-bold text-lg">
                                {formatCurrency(service.price)}
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button asChild className="w-full group">
                              <Link href={`/services/${service.id}`}>
                                Book Now
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
                      No services found
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      We couldn't find any services matching your criteria.
                      Please try a different search or category.
                    </p>
                    <Button
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedCategory("all");
                      }}
                    >
                      View All Services
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* CTA Section */}
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
                Need a Custom Service?
              </h2>
              <p className="text-muted-foreground mb-8">
                Don't see what you're looking for? We can create a custom
                service package tailored to your specific needs.
              </p>
              <Button
                size="lg"
                asChild
                className="bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
