"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatDate, truncateText } from "@/lib/utils";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Search, Calendar, User } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import type { Blog } from "@/types/blog";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState<string[]>([]);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    // In a real app, this would fetch from the API
    const fetchBlogs = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock data
        const mockBlogs: Blog[] = [
          {
            id: "1",
            title: "Top 10 Places to Visit in Lagos",
            slug: "top-10-places-to-visit-in-lagos",
            content:
              "Lagos, the vibrant economic capital of Nigeria, offers a plethora of exciting destinations for visitors. From the serene beaches of Lekki to the bustling markets of Yaba, there's something for everyone in this dynamic city. This guide will take you through the must-visit locations that showcase the best of Lagos culture, history, and entertainment.\n\nFirst on our list is the iconic Lekki Conservation Centre, a natural haven within the urban landscape. Here, you can walk on the longest canopy walkway in Africa while observing the rich biodiversity of the Lagos wetlands. Next, the Nike Art Gallery presents an impressive collection of Nigerian art across five floors, making it a cultural landmark for art enthusiasts.\n\nFor history buffs, the National Museum in Onikan provides insights into Nigeria's rich heritage through its collection of artifacts and exhibitions. Meanwhile, those seeking relaxation can head to Tarkwa Bay, a sheltered beach accessible by boat, offering a perfect escape from the city's hustle and bustle.",
            excerpt:
              "Discover the most exciting destinations in Lagos that you shouldn't miss during your visit.",
            coverImage: "/placeholder.svg?height=400&width=600",
            author: {
              name: "Adebayo Johnson",
              image: "/placeholder.svg?height=100&width=100",
            },
            tags: ["Travel", "Lagos", "Tourism"],
            createdAt: "2023-05-15T10:00:00Z",
            updatedAt: "2023-05-15T10:00:00Z",
          },
          {
            id: "2",
            title: "Nigerian Cuisine: A Culinary Journey",
            slug: "nigerian-cuisine-culinary-journey",
            content:
              "Nigerian cuisine is as diverse as its culture, offering a rich tapestry of flavors, spices, and cooking techniques. Each region of Nigeria has its unique culinary traditions, influenced by local ingredients, cultural practices, and historical interactions with other cultures.\n\nIn the southwest, dishes like Amala (yam flour) served with Ewedu (jute leaves soup) and Gbegiri (beans soup) showcase the Yoruba culinary heritage. The southeast is known for dishes like Ofe Akwu (palm nut soup) and Abacha (African salad), reflecting Igbo food traditions. Northern Nigerian cuisine features dishes like Tuwo Shinkafa (rice pudding) and Miyan Kuka (baobab leaf soup), influenced by Hausa-Fulani culture.\n\nOne dish that unites Nigerians across regions is Jollof Rice, a flavorful one-pot rice dish cooked with tomatoes, peppers, and various spices. The friendly 'Jollof Wars' between Nigeria, Ghana, and other West African countries highlight the dish's cultural significance and regional variations.",
            excerpt:
              "Explore the rich and diverse culinary landscape of Nigerian cuisine and its cultural significance.",
            coverImage: "/placeholder.svg?height=400&width=600",
            author: {
              name: "Chioma Okafor",
              image: "/placeholder.svg?height=100&width=100",
            },
            tags: ["Food", "Culture", "Nigeria"],
            createdAt: "2023-06-22T14:30:00Z",
            updatedAt: "2023-06-22T14:30:00Z",
          },
          {
            id: "3",
            title: "Business Opportunities in Lagos",
            slug: "business-opportunities-lagos",
            content:
              "Lagos is not just a tourist destination but also a hub for business and investment opportunities. As Africa's largest city and Nigeria's economic powerhouse, Lagos offers numerous sectors ripe for entrepreneurship and investment.\n\nThe technology sector in Lagos, often referred to as 'Yabacon Valley' (named after the Yaba district), has seen exponential growth with startups attracting significant venture capital. Fintech, e-commerce, and health tech are particularly thriving, supported by a growing ecosystem of incubators, accelerators, and co-working spaces.\n\nReal estate development presents another lucrative opportunity, with demand for residential, commercial, and mixed-use properties consistently high. The retail sector is expanding with shopping malls and supermarkets catering to the growing middle class.\n\nThe entertainment industry, nicknamed 'Nollywood,' is the second-largest film industry globally by volume, offering opportunities in production, distribution, and supporting services. Additionally, the agricultural value chain, from production to processing and distribution, remains underdeveloped relative to its potential.",
            excerpt:
              "Learn about the thriving business ecosystem in Lagos and potential investment opportunities.",
            coverImage: "/placeholder.svg?height=400&width=600",
            author: {
              name: "Oluwaseun Adeyemi",
              image: "/placeholder.svg?height=100&width=100",
            },
            tags: ["Business", "Investment", "Lagos"],
            createdAt: "2023-07-10T09:15:00Z",
            updatedAt: "2023-07-10T09:15:00Z",
          },
          {
            id: "4",
            title: "Navigating Transportation in Lagos",
            slug: "navigating-transportation-lagos",
            content:
              "Lagos, with its population of over 20 million people, presents unique transportation challenges and solutions. Understanding the various transportation options can significantly enhance your experience in this bustling metropolis.\n\nThe Bus Rapid Transit (BRT) system offers a relatively efficient way to move around, with dedicated lanes that help bypass the notorious Lagos traffic. For shorter distances, yellow taxis and ride-hailing services like Uber and Bolt provide convenient options, though prices can surge during peak hours.\n\nWater transportation via ferries is an underutilized but growing alternative, connecting areas like Ikorodu, Victoria Island, and Badagry while offering scenic views and avoiding road congestion. For those looking to experience local culture, the iconic 'danfo' (yellow minibusses) and 'keke' (tricycles) provide affordable, if somewhat adventurous, transportation options.\n\nNavigating Lagos traffic requires patience, strategic timing, and local knowledge. Most locals avoid traveling during the morning (7-10 AM) and evening (4-8 PM) rush hours when possible. Alternative routes and real-time traffic apps like Google Maps or Waze are essential tools for efficient movement around the city.",
            excerpt:
              "Essential tips for getting around Lagos efficiently using various transportation options.",
            coverImage: "/placeholder.svg?height=400&width=600",
            author: {
              name: "Tunde Bakare",
              image: "/placeholder.svg?height=100&width=100",
            },
            tags: ["Travel", "Transportation", "Lagos"],
            createdAt: "2023-08-05T11:45:00Z",
            updatedAt: "2023-08-05T11:45:00Z",
          },
          {
            id: "5",
            title: "Nigerian Fashion: Traditional to Contemporary",
            slug: "nigerian-fashion-traditional-contemporary",
            content:
              "Nigerian fashion represents a vibrant blend of traditional heritage and contemporary innovation, gaining increasing recognition on global runways. The country's diverse ethnic groups each contribute unique textile traditions, designs, and cultural symbolism to the rich tapestry of Nigerian fashion.\n\nTraditional attire varies by region and occasion. In the southwest, the Yoruba 'aso-oke' fabric is woven into elaborate 'agbada' (flowing robes), 'buba' (tops), and 'iro' (wraps) for men and women. The Igbo of southeastern Nigeria are known for their 'isiagu' (lion head) shirts and 'akwete' cloth, while northern Nigerian fashion features embroidered 'babban riga' robes and colorful caps.\n\nContemporary Nigerian designers like Lisa Folawiyo, Deola Sagoe, and Kenneth Ize have successfully merged these traditional elements with modern silhouettes and techniques, creating pieces that honor cultural heritage while appealing to global fashion sensibilities. Lagos Fashion Week has become a significant platform showcasing this fusion, attracting international buyers and media attention.\n\nBeyond clothing, Nigerian fashion encompasses elaborate headwraps ('gele'), beaded accessories, and intricate hairstyles that serve as important cultural expressions. The industry continues to grow, supported by increasing local manufacturing capacity and a growing appreciation for 'Made in Nigeria' products.",
            excerpt:
              "Explore the evolution and global influence of Nigerian fashion from traditional attire to contemporary designs.",
            coverImage: "/placeholder.svg?height=400&width=600",
            author: {
              name: "Amina Ibrahim",
              image: "/placeholder.svg?height=100&width=100",
            },
            tags: ["Fashion", "Culture", "Nigeria"],
            createdAt: "2023-09-18T13:20:00Z",
            updatedAt: "2023-09-18T13:20:00Z",
          },
          {
            id: "6",
            title: "Safety Tips for Visitors to Lagos",
            slug: "safety-tips-visitors-lagos",
            content:
              "Lagos, like any major global city, requires visitors to exercise certain precautions to ensure a safe and enjoyable experience. With proper preparation and awareness, you can navigate Nigeria's commercial capital with confidence.\n\nResearch and planning are essential before your trip. Choose accommodations in safer areas like Victoria Island, Ikoyi, or Lekki. Arrange airport pickup through your hotel or a reputable service to avoid transportation scams upon arrival.\n\nWhile exploring the city, maintain situational awareness, especially in crowded areas. Keep valuables secure and avoid displaying expensive items or large amounts of cash. Using ride-hailing apps rather than hailing taxis on the street provides an added layer of security and price transparency.\n\nIt's advisable to carry photocopies of important documents while leaving originals in your hotel safe. Register with your country's embassy or consulate upon arrival, and save emergency contacts, including local police (112) and your embassy's number.\n\nEngage with locals respectfully to learn about areas to avoid, particularly after dark. Many Lagos residents are friendly and willing to offer guidance to visitors. When dining out or shopping, stick to established restaurants and markets initially before venturing into more local experiences as you become more comfortable.",
            excerpt:
              "Essential safety advice for first-time visitors to Lagos to ensure a secure and pleasant stay.",
            coverImage: "/placeholder.svg?height=400&width=600",
            author: {
              name: "Daniel Okonkwo",
              image: "/placeholder.svg?height=100&width=100",
            },
            tags: ["Travel", "Safety", "Lagos"],
            createdAt: "2023-10-30T16:45:00Z",
            updatedAt: "2023-10-30T16:45:00Z",
          },
        ];

        setBlogs(mockBlogs);
        setFilteredBlogs(mockBlogs);

        // Extract all unique tags
        const allTags = Array.from(
          new Set(mockBlogs.flatMap((blog) => blog.tags))
        );
        setTags(allTags);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    let result = blogs;

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (blog) =>
          blog.title.toLowerCase().includes(query) ||
          blog.excerpt.toLowerCase().includes(query) ||
          blog.content.toLowerCase().includes(query) ||
          blog.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Filter by tag
    if (selectedTag) {
      result = result.filter((blog) => blog.tags.includes(selectedTag));
    }

    setFilteredBlogs(result);
  }, [searchQuery, selectedTag, blogs]);

  const handleTagClick = (tag: string) => {
    setSelectedTag(selectedTag === tag ? null : tag);
  };

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
                Our Blog
              </motion.h1>
              <motion.p
                className="text-lg text-muted-foreground mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Stay updated with insights, tips, and stories about Lagos and
                Nigerian culture.
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
                  placeholder="Search articles..."
                  className="pl-10 py-6"
                  value={searchQuery}
                  onChange={(e: any) => setSearchQuery(e.target.value)}
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Blog Posts Section */}
        <section className="py-16" ref={ref}>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <motion.div
                  className="sticky top-24 space-y-8"
                  initial={{ opacity: 0, x: -20 }}
                  animate={
                    inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                  }
                  transition={{ duration: 0.5 }}
                >
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant={selectedTag === tag ? "default" : "outline"}
                          className="cursor-pointer transition-all duration-300"
                          onClick={() => handleTagClick(tag)}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Recent Posts</h3>
                    <div className="space-y-4">
                      {blogs.slice(0, 3).map((blog) => (
                        <Link
                          key={blog.id}
                          href={`/blogs/${blog.slug}`}
                          className="flex items-start space-x-2 group"
                        >
                          <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                            <Image
                              src={blog.coverImage || "/placeholder.svg"}
                              alt={blog.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium group-hover:text-primary transition-colors">
                              {truncateText(blog.title, 50)}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {formatDate(blog.createdAt)}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Blog Posts */}
              <div className="lg:col-span-3">
                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[1, 2, 3, 4].map((i) => (
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
                      </Card>
                    ))}
                  </div>
                ) : filteredBlogs.length > 0 ? (
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    variants={container}
                    initial="hidden"
                    animate={inView ? "show" : "hidden"}
                  >
                    {filteredBlogs.map((blog) => (
                      <motion.div key={blog.id} variants={item}>
                        <Card className="overflow-hidden h-full flex flex-col hover-lift card-hover">
                          <div className="relative h-48 w-full overflow-hidden">
                            <Image
                              src={blog.coverImage || "/placeholder.svg"}
                              alt={blog.title}
                              fill
                              className="object-cover transition-transform duration-500 hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                              <div className="absolute bottom-3 left-3">
                                <div className="flex gap-2">
                                  {blog.tags.map((tag) => (
                                    <span
                                      key={tag}
                                      className="text-xs bg-primary/80 text-white px-2 py-1 rounded-full"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                          <CardHeader>
                            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {formatDate(blog.createdAt)}
                              </div>
                              <div className="flex items-center">
                                <User className="h-4 w-4 mr-1" />
                                {blog.author.name}
                              </div>
                            </div>
                            <Link
                              href={`/blogs/${blog.slug}`}
                              className="text-xl font-semibold hover:text-primary transition-colors"
                            >
                              {blog.title}
                            </Link>
                          </CardHeader>
                          <CardContent className="flex-grow">
                            <p className="text-muted-foreground">
                              {truncateText(blog.excerpt, 120)}
                            </p>
                          </CardContent>
                          <CardFooter className="border-t pt-4">
                            <Button
                              variant="ghost"
                              asChild
                              className="ml-auto group"
                            >
                              <Link href={`/blogs/${blog.slug}`}>
                                Read More
                                <span className="inline-block transition-transform group-hover:translate-x-1 ml-1">
                                  →
                                </span>
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
                      No articles found
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      We couldn't find any articles matching your search
                      criteria. Please try a different search or tag.
                    </p>
                    <Button
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedTag(null);
                      }}
                    >
                      View All Articles
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
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
                Subscribe to Our Newsletter
              </h2>
              <p className="text-muted-foreground mb-8">
                Get the latest articles, travel tips, and exclusive offers
                delivered directly to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow"
                />
                <Button>Subscribe</Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
