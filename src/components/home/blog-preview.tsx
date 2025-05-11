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
import { formatDate, truncateText } from "@/lib/utils";
import type { Blog } from "@/types/blog";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export function BlogPreview() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    // In a real app, this would be fetched from the API
    const blogData: Blog[] = [
      {
        id: "1",
        title: "Top 10 Places to Visit in Lagos",
        slug: "top-10-places-to-visit-in-lagos",
        content:
          "Lagos, the vibrant economic capital of Nigeria, offers a plethora of exciting destinations for visitors...",
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
          "Nigerian cuisine is as diverse as its culture, offering a rich tapestry of flavors, spices, and cooking techniques...",
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
          "Lagos is not just a tourist destination but also a hub for business and investment opportunities...",
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

    setBlogs(blogData);
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
    <section className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-bl-full" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-primary/5 rounded-tr-full" />
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4">Latest from Our Blog</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stay updated with insights, tips, and stories about Lagos and
            Nigerian culture.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-muted"></div>
                <CardHeader>
                  <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-4 bg-muted rounded w-2/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={container}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
          >
            {blogs.map((blog, index) => (
              <motion.div key={blog.id} variants={item} className="h-full">
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
                    <div className="text-sm text-muted-foreground mb-2">
                      {formatDate(blog.createdAt)}
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
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center space-x-2">
                        <div className="relative h-8 w-8 rounded-full overflow-hidden">
                          <Image
                            src={blog.author.image || "/placeholder.svg"}
                            alt={blog.author.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="text-sm font-medium">
                          {blog.author.name}
                        </span>
                      </div>
                      <Link
                        href={`/blogs/${blog.slug}`}
                        className="text-sm text-primary hover:underline group"
                      >
                        Read More
                        <span className="inline-block transition-transform group-hover:translate-x-1 ml-1">
                          →
                        </span>
                      </Link>
                    </div>
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
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Button
            variant="outline"
            size="lg"
            asChild
            className="transition-all duration-300 hover:scale-105"
          >
            <Link href="/blogs">View All Articles</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
