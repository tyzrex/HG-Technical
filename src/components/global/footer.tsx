"use client";

import type React from "react";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    alert(`Subscribed with email: ${email}`);
    setEmail("");
  };

  return (
    <footer className="bg-blue-600 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 xl:gap-32">
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold mb-4">Join Our Newsletter</h3>
            <p className="mb-4 text-blue-100">
              Subscribe to our newsletter to receive updates on new products,
              offers, and more.
            </p>
            <form onSubmit={handleSubmit} className="flex items-center gap-3">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-1 px-4 py-5 rounded-l-md bg-white focus:outline-none border-0"
              />
              <Button
                type="submit"
                className="bg-blue-800 hover:bg-blue-900 px-4 py-5 rounded-r-md flex items-center justify-center border-0"
              >
                <Send size={18} />
              </Button>
            </form>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/showcase" className="hover:underline">
                  Showcase
                </Link>
              </li>
              <li>
                <Link href="/product" className="hover:underline">
                  Product
                </Link>
              </li>
              <li>
                <Link href="/offer" className="hover:underline">
                  Offer
                </Link>
              </li>
              <li>
                <Link href="/brand" className="hover:underline">
                  Brand
                </Link>
              </li>
              <li>
                <Link href="/job" className="hover:underline">
                  Job
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="hover:underline">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:underline">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:underline">
                  Shipping & Returns
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="hover:underline">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:underline">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-blue-500 flex flex-col md:flex-row justify-between items-center">
          <p className="mb-4 md:mb-0">© 2024 ShopNow. All rights reserved.</p>
          <div className="flex space-x-4">
            <Link href="#" className="hover:text-blue-300">
              <Facebook size={20} />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="#" className="hover:text-blue-300">
              <Twitter size={20} />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="hover:text-blue-300">
              <Instagram size={20} />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="#" className="hover:text-blue-300">
              <Linkedin size={20} />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
