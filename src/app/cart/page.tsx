"use client";

import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store/store";
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} from "@/store/cart/cart-slice";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingCart,
  ArrowLeft,
  CreditCard,
} from "lucide-react";
import { toast } from "sonner";

export default function Cart() {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id));
    toast.success("Item removed from cart");
  };

  const handleIncrement = (id: number) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id: number) => {
    dispatch(decrementQuantity(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success("Cart cleared");
  };

  const subtotal = cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const tax = subtotal * 0.1; // 10% tax
  const shipping = subtotal > 0 ? 10 : 0; // $10 shipping fee if cart is not empty
  const total = subtotal + tax + shipping;

  if (cart.items.length === 0) {
    return (
      <div className="container my-16 text-center">
        <div className="flex flex-col items-center justify-center space-y-4">
          <ShoppingCart className="h-16 w-16 text-muted-foreground" />
          <h1 className="text-2xl font-bold">Your cart is empty</h1>
          <p className="text-muted-foreground">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link href="/">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-16">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">
          Shopping Cart ({cart.totalItems} items)
        </h1>
        <Button variant="outline" onClick={handleClearCart}>
          <Trash2 className="mr-2 h-4 w-4" />
          Clear Cart
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-card rounded-lg shadow-sm">
            {cart.items.map((item) => (
              <div
                key={item.id}
                className="p-4 border-b last:border-b-0 flex flex-col sm:flex-row items-start sm:items-center gap-4"
              >
                <div className="bg-white rounded-md p-2 w-24 h-24 flex-shrink-0 mx-auto sm:mx-0">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    width={80}
                    height={80}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <Link
                    href={`/product/${item.id}`}
                    className="text-lg font-medium line-clamp-1 hover:text-primary"
                  >
                    {item.title}
                  </Link>
                  <p className="text-sm text-muted-foreground capitalize">
                    {item.category}
                  </p>
                  <p className="font-medium mt-1">${item.price.toFixed(2)}</p>
                </div>

                <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleDecrement(item.id)}
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleIncrement(item.id)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="text-right mt-2 sm:mt-0">
                  <p className="font-bold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 mt-1 h-8 px-2"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="ml-1">Remove</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <Link
              href="/"
              className="flex items-center text-primary hover:underline"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </Link>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-card rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Button className="w-full" size="lg">
              <CreditCard className="mr-2 h-5 w-5" />
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
