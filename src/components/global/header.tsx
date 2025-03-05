"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingCart, Search, Bell } from "lucide-react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Subscribed with email: ${email}`);
    setEmail("");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
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

          <div className="flex items-center space-x-4">
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

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="w-9 h-9">
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
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container mx-auto px-4 py-3">
            <nav className="grid gap-2">
              <Link
                href="/showcase"
                className="p-2 hover:bg-muted rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Showcase
              </Link>
              <Link
                href="/product"
                className="p-2 hover:bg-muted rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Product
              </Link>
              <Link
                href="/offer"
                className="p-2 hover:bg-muted rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Offer
              </Link>
              <Link
                href="/brand"
                className="p-2 hover:bg-muted rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Brand
              </Link>
              <Link
                href="/job"
                className="p-2 hover:bg-muted rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Job
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
