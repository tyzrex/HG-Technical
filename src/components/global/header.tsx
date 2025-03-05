"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Menu, ShoppingCart, Search, Bell, Sun, Moon } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { useTheme } from "@/providers/theme-provider";

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [email, setEmail] = useState("");
  const cart = useSelector((state: RootState) => state.cart);
  const { theme, toggleTheme } = useTheme();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Subscribed with email: ${email}`);
    setEmail("");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] p-5 sm:w-[350px]">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>

                {/* Main Navigation */}
                <nav className="mt-6 flex flex-col gap-4">
                  <SheetClose asChild>
                    <Link
                      href="/"
                      className="flex items-center py-2 text-blue-600 font-medium"
                    >
                      Home
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/showcase"
                      className="flex items-center py-2 hover:text-blue-600 transition-colors"
                    >
                      Showcase
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/product"
                      className="flex items-center py-2 hover:text-blue-600 transition-colors"
                    >
                      Product
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/offer"
                      className="flex items-center py-2 hover:text-blue-600 transition-colors"
                    >
                      Offer
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/brand"
                      className="flex items-center py-2 hover:text-blue-600 transition-colors"
                    >
                      Brand
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/job"
                      className="flex items-center py-2 hover:text-blue-600 transition-colors"
                    >
                      Job
                    </Link>
                  </SheetClose>
                </nav>

                <Separator className="my-6" />

                {/* Theme Toggle */}
                <div className="flex items-center justify-between py-4">
                  <span className="text-sm font-medium">Dark Mode</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={toggleTheme}
                    aria-label={
                      theme === "dark"
                        ? "Switch to light mode"
                        : "Switch to dark mode"
                    }
                  >
                    {theme === "dark" ? (
                      <Sun className="h-5 w-5" />
                    ) : (
                      <Moon className="h-5 w-5" />
                    )}
                  </Button>
                </div>

                <Separator className="my-2" />

                {/* Newsletter Subscription */}
                <div className="py-4">
                  <h3 className="text-sm font-medium mb-2">
                    Join Our Newsletter
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get updates on new products and offers.
                  </p>
                  <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                    <Input
                      type="email"
                      placeholder="Your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <Button type="submit" className="w-full">
                      Subscribe
                    </Button>
                  </form>
                </div>
              </SheetContent>
            </Sheet>

            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-blue-600">ShopNow</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/showcase"
              className="text-sm font-medium hover:text-blue-600 transition-colors"
            >
              Showcase
            </Link>
            <Link
              href="/product"
              className="text-sm font-medium hover:text-blue-600 transition-colors"
            >
              Product
            </Link>
            <Link
              href="/offer"
              className="text-sm font-medium hover:text-blue-600 transition-colors"
            >
              Offer
            </Link>
            <Link
              href="/brand"
              className="text-sm font-medium hover:text-blue-600 transition-colors"
            >
              Brand
            </Link>
            <Link
              href="/job"
              className="text-sm font-medium hover:text-blue-600 transition-colors"
            >
              Job
            </Link>
          </nav>

          <div className="flex items-center space-x-2">
            <div
              className={`transition-all duration-300 ${
                isSearchOpen ? "w-48 md:w-64" : "w-0"
              } overflow-hidden`}
            >
              <Input
                placeholder="Search products..."
                className={`h-9 ${isSearchOpen ? "opacity-100" : "opacity-0"}`}
              />
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="w-9 h-9"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Only show theme toggle on desktop */}
            <div className="hidden md:block">
              <Button
                variant="ghost"
                size="icon"
                className="w-9 h-9"
                onClick={toggleTheme}
                aria-label={
                  theme === "dark"
                    ? "Switch to light mode"
                    : "Switch to dark mode"
                }
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            </div>

            {/* Only show newsletter button on desktop */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-9 h-9 hidden md:flex"
                >
                  <Bell className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Join Our Newsletter</SheetTitle>
                </SheetHeader>
                <div className="py-6">
                  <p className="text-sm text-muted-foreground mb-4">
                    Subscribe to our newsletter to receive updates on new
                    products, offers, and more.
                  </p>
                  <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                    <Input
                      type="email"
                      placeholder="Your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <Button type="submit" className="w-full">
                      Subscribe
                    </Button>
                  </form>
                </div>
              </SheetContent>
            </Sheet>

            <Link href="/cart">
              <Button variant="ghost" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cart.totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cart.totalItems}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
