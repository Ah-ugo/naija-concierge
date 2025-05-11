"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm dark:bg-background/95"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span
                className={cn(
                  "text-2xl font-bold transition-colors",
                  isScrolled ? "text-foreground" : "text-white"
                )}
              >
                Naija Concierge
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent hover:bg-accent/50",
                        isActive("/") && "font-medium",
                        !isScrolled &&
                          "text-white hover:text-white hover:bg-white/10"
                      )}
                    >
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={cn(
                      "bg-transparent hover:bg-accent/50",
                      !isScrolled &&
                        "text-white hover:text-white hover:bg-white/10"
                    )}
                  >
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/50 to-primary p-6 no-underline outline-none focus:shadow-md"
                            href="/services"
                          >
                            <div className="mt-4 mb-2 text-lg font-medium text-white">
                              All Services
                            </div>
                            <p className="text-sm leading-tight text-white/90">
                              Explore our complete range of premium concierge
                              services
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <Link
                          href="/services/airport-pickup"
                          legacyBehavior
                          passHref
                        >
                          <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">
                              Airport Pickup
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Luxury transportation from the airport
                            </p>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/services/accommodation"
                          legacyBehavior
                          passHref
                        >
                          <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">
                              Accommodation
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Premium hotels and apartments
                            </p>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/services/emergency"
                          legacyBehavior
                          passHref
                        >
                          <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">
                              Emergency Assistance
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              24/7 support during your stay
                            </p>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/packages" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent hover:bg-accent/50",
                        isActive("/packages") && "font-medium",
                        !isScrolled &&
                          "text-white hover:text-white hover:bg-white/10"
                      )}
                    >
                      Packages
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/blogs" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent hover:bg-accent/50",
                        isActive("/blogs") && "font-medium",
                        !isScrolled &&
                          "text-white hover:text-white hover:bg-white/10"
                      )}
                    >
                      Blog
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/contact" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent hover:bg-accent/50",
                        isActive("/contact") && "font-medium",
                        !isScrolled &&
                          "text-white hover:text-white hover:bg-white/10"
                      )}
                    >
                      Contact
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <div className="flex items-center space-x-2">
              <ModeToggle />
              <Button asChild variant="default" className="ml-4">
                <Link href="/login">Login</Link>
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center space-x-2">
            <ModeToggle />
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={!isScrolled ? "text-white" : ""}
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Naija Concierge</SheetTitle>
                  <SheetDescription>
                    Premium services for Nigerians in diaspora
                  </SheetDescription>
                </SheetHeader>
                <nav className="flex flex-col gap-4 mt-8">
                  <Link
                    href="/"
                    className={cn(
                      "px-4 py-2 rounded-md text-gray-300 hover:bg-accent",
                      isActive("/") && "underline text-gray-50 font-medium"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <div className="px-4 py-2">
                    <div className="flex items-center justify-between">
                      <Link
                        href="/services"
                        className={cn(
                          "hover:underline text-gray-300",
                          isActive("/services") &&
                            "font-medium underline text-gray-50"
                        )}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Services
                      </Link>
                      <ChevronDown className="h-4 w-4" />
                    </div>
                    <div className="mt-2 ml-4 flex flex-col gap-2">
                      <Link
                        href="/services/airport-pickup"
                        className="text-sm text-muted-foreground hover:text-foreground text-white"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Airport Pickup
                      </Link>
                      <Link
                        href="/services/accommodation"
                        className="text-sm text-muted-foreground hover:text-foreground text-white"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Accommodation
                      </Link>
                      <Link
                        href="/services/emergency"
                        className="text-sm text-muted-foreground hover:text-foreground text-white"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Emergency Assistance
                      </Link>
                    </div>
                  </div>
                  <Link
                    href="/packages"
                    className={cn(
                      "px-4 py-2 rounded-md hover:bg-accent text-gray-300",
                      isActive("/packages") &&
                        "bg-accent font-medium underline text-gray-50"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Packages
                  </Link>
                  <Link
                    href="/blogs"
                    className={cn(
                      "px-4 py-2 rounded-md hover:bg-accent text-gray-300",
                      isActive("/blogs") &&
                        "bg-accent font-medium underline text-gray-50"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Blog
                  </Link>
                  <Link
                    href="/contact"
                    className={cn(
                      "px-4 py-2 rounded-md hover:bg-accent text-gray-300",
                      isActive("/contact") &&
                        "bg-accent font-medium underline text-gray-50"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Contact
                  </Link>
                  <div className="mt-4">
                    <Button asChild className="w-full">
                      <Link
                        href="/login"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Login
                      </Link>
                    </Button>
                  </div>
                  <div className="mt-2">
                    <Button asChild variant="outline" className="w-full">
                      <Link
                        href="/register"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Register
                      </Link>
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
