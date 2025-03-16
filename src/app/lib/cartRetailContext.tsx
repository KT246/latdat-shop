"use client";
import { createContext, useContext, useState, ReactNode } from "react";
interface ProductAttributes {
  barcode: string;
  page: string | null;
  No: string | null;
  code: string | null;
  size: string | null;
  title: string;
  use_for: string | null;
  unit: string;
  category: string;
  cost_thb: number | 0;
  cost_lak: number | 0;
  wholesale_thb: number | 0;
  wholesale_lak: number | 0;
  retail_thb: number | 0;
  retail_lak: number | 0;
  discount: number | 0;
  num_of_discount: number | 0;
  qty_start: number | 0;
  qty_in: number | 0;
  qty_out: number | 0;
  qty_balance: number | 0;
  status: string;
}

export interface CartItem {
  barcode: string;
  title: string;
  cost_lak: number;
  cost_thb: number;
  price_lak: number;
  price_thb: number;
  discount: number;
  qty: number;
  total: number;
  total_pay: number
}

interface CartContextType {
  cart: CartItem[];
  addProduct: (product: ProductAttributes, qty: number) => void;
  removeProduct: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  clearCart: () => void;
  exchange: number,
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const exchange = Number(localStorage.getItem("exchange"));
  const [cart, setCart] = useState<CartItem[]>([]);

  const calculateTotal = (product: ProductAttributes, qty: number) => {
    const unitPrice = (product.retail_lak > 0 ? product.retail_lak : product.retail_thb * exchange);
    const discount = qty >= product.num_of_discount ? product.discount : 0;
    const discountAmount = (unitPrice * (discount / 100)) * qty
    const totalPay = Math.max(0, unitPrice * qty - discountAmount);
    return {
      barcode: product.barcode,
      title: product.title,
      cost_lak: product.cost_lak,
      cost_thb: product.cost_thb,
      price_lak: unitPrice,
      price_thb: product.retail_thb,
      qty: qty,
      discount: discount,
      total: unitPrice * qty,
      total_pay: totalPay
    };
  };

  const addProduct = (product: ProductAttributes, qty: number) => {
    setCart((prev) => {
      const existingProduct = prev.find((item) => item.barcode === product.barcode);
      if (existingProduct) {
        return prev.map((item) =>
          item.barcode === product.barcode
            ? calculateTotal(product, item.qty + qty)
            : item
        );
      } else {
        return [...prev, calculateTotal(product, qty)];
      }

    });
  };

  const removeProduct = (barcode: string) => {
    setCart((prev) => prev.filter((item) => item.barcode !== barcode));
  };

  const increaseQuantity = (barcode: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.barcode === barcode ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQuantity = (barcode: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.barcode === barcode ? { ...item, qty: Math.max(1, item.qty - 1) } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const total = cart.reduce((acc, item) => acc + item.price_lak * item.qty, 0);

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, increaseQuantity, decreaseQuantity, clearCart, total, exchange }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
