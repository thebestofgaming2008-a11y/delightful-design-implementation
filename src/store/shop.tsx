import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { PRODUCTS, type Product } from "@/data/products";

export interface CartItem {
  productId: string;
  qty: number;
}

interface ShopState {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (id: string, qty?: number) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  cartCount: number;
  cartSubtotal: number;
  cartLines: { product: Product; qty: number }[];
}

const ShopContext = createContext<ShopState | null>(null);

const KEY_CART = "he_cart_v1";
const KEY_WISH = "he_wishlist_v1";

function load<T>(k: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(k);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => load<CartItem[]>(KEY_CART, []));
  const [wishlist, setWishlist] = useState<string[]>(() => load<string[]>(KEY_WISH, []));

  useEffect(() => {
    localStorage.setItem(KEY_CART, JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    localStorage.setItem(KEY_WISH, JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = useCallback((id: string, qty = 1) => {
    setCart((prev) => {
      const found = prev.find((c) => c.productId === id);
      if (found) return prev.map((c) => (c.productId === id ? { ...c, qty: c.qty + qty } : c));
      return [...prev, { productId: id, qty }];
    });
    const p = PRODUCTS.find((x) => x.id === id);
    toast({ title: "Added to cart", description: p?.title ?? "Item added" });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((c) => c.productId !== id));
  }, []);

  const updateQty = useCallback((id: string, qty: number) => {
    setCart((prev) =>
      qty <= 0 ? prev.filter((c) => c.productId !== id) : prev.map((c) => (c.productId === id ? { ...c, qty } : c)),
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((id: string) => {
    setWishlist((prev) => {
      if (prev.includes(id)) {
        toast({ title: "Removed from wishlist" });
        return prev.filter((x) => x !== id);
      }
      toast({ title: "Saved to wishlist" });
      return [...prev, id];
    });
  }, []);

  const isWishlisted = useCallback((id: string) => wishlist.includes(id), [wishlist]);

  const cartLines = useMemo(
    () =>
      cart
        .map((c) => {
          const product = PRODUCTS.find((p) => p.id === c.productId);
          return product ? { product, qty: c.qty } : null;
        })
        .filter((x): x is { product: Product; qty: number } => x !== null),
    [cart],
  );

  const cartCount = useMemo(() => cart.reduce((s, c) => s + c.qty, 0), [cart]);
  const cartSubtotal = useMemo(
    () => cartLines.reduce((s, l) => s + l.product.price * l.qty, 0),
    [cartLines],
  );

  const value: ShopState = {
    cart,
    wishlist,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    toggleWishlist,
    isWishlisted,
    cartCount,
    cartSubtotal,
    cartLines,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used within ShopProvider");
  return ctx;
}