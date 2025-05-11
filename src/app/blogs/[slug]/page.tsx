"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate } from "@/lib/utils";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import {
  Calendar,
  ArrowLeft,
  Share,
  Bookmark,
  MessageSquare,
} from "lucide-react";
import { motion } from "framer-motion";
import type { Blog } from "@/types/blog";

export default function BlogPostPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch from the API
    const fetchBlog = async () => {
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
        ];

        const currentBlog = mockBlogs.find((b) => b.slug === slug);
        setBlog(currentBlog || null);

        if (currentBlog) {
          // Find related posts based on tags
          const related = mockBlogs
            .filter(
              (b) =>
                b.id !== currentBlog.id &&
                b.tags.some((tag) => currentBlog.tags.includes(tag))
            )
            .slice(0, 2);
          setRelatedPosts(related);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog:", error);
        setLoading(false);
      }
    };

    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="h-80 bg-muted rounded-lg shimmer mb-8"></div>
              <div className="h-10 bg-muted rounded w-3/4 shimmer mb-4"></div>
              <div className="h-6 bg-muted rounded w-1/2 shimmer mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-muted rounded shimmer"></div>
                <div className="h-4 bg-muted rounded shimmer"></div>
                <div className="h-4 bg-muted rounded shimmer"></div>
                <div className="h-4 bg-muted rounded w-2/3 shimmer"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!blog) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The blog post you're looking for doesn't exist or has been
              removed.
            </p>
            <Button asChild>
              <Link href="/blogs">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

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
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center space-x-2 mb-6">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/blogs">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Blog
                  </Link>
                </Button>
              </div>
              <motion.h1
                className="text-4xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {blog.title}
              </motion.h1>
              <motion.div
                className="flex flex-wrap items-center gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-2">
                    <AvatarImage
                      src={blog.author.image || "/placeholder.svg"}
                      alt={blog.author.name}
                    />
                    <AvatarFallback>
                      {blog.author.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{blog.author.name}</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(blog.createdAt)}
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Blog Content Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-3">
                <motion.div
                  className="max-w-4xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="relative h-[400px] w-full rounded-lg overflow-hidden mb-8">
                    <Image
                      src={blog.coverImage || "/placeholder.svg"}
                      alt={blog.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    {blog.content.split("\n\n").map((paragraph, index) => (
                      <p key={index} className="mb-6">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Share and Actions */}
                  <div className="flex items-center justify-between mt-12 pt-6 border-t">
                    <div className="flex items-center space-x-4">
                      <Button variant="outline" size="sm">
                        <Share className="mr-2 h-4 w-4" />
                        Share
                      </Button>
                      <Button variant="outline" size="sm">
                        <Bookmark className="mr-2 h-4 w-4" />
                        Save
                      </Button>
                    </div>
                    <div className="flex items-center">
                      <Button variant="ghost" size="sm">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Comments
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <motion.div
                  className="sticky top-24 space-y-8"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Related Articles
                    </h3>
                    <div className="space-y-4">
                      {relatedPosts.length > 0 ? (
                        relatedPosts.map((post) => (
                          <Link
                            key={post.id}
                            href={`/blogs/${post.slug}`}
                            className="flex items-start space-x-2 group"
                          >
                            <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                              <Image
                                src={post.coverImage || "/placeholder.svg"}
                                alt={post.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="text-sm font-medium group-hover:text-primary transition-colors">
                                {post.title}
                              </h4>
                              <p className="text-xs text-muted-foreground">
                                {formatDate(post.createdAt)}
                              </p>
                            </div>
                          </Link>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          No related articles found.
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {blog.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="cursor-pointer"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-4">
                        Subscribe to Our Newsletter
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Get the latest articles and travel tips delivered to
                        your inbox.
                      </p>
                      <div className="space-y-2">
                        <input
                          type="email"
                          placeholder="Your email address"
                          className="w-full px-3 py-2 border rounded-md"
                        />
                        <Button className="w-full">Subscribe</Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* More Articles Section */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-4">More Articles</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore more insights and stories about Lagos and Nigerian
                culture.
              </p>
            </motion.div>
            <div className="text-center">
              <Button size="lg" asChild>
                <Link href="/blogs">View All Articles</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
