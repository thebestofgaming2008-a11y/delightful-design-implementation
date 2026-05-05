import { Link } from "react-router-dom";
import { Heart, Minus, Plus, ShoppingBag, Trash2, X, ArrowRight } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { useShop } from "@/store/shop";
import { PRODUCTS } from "@/data/products";
import { useFormatPrice } from "@/store/currency";

export function CartPeek() {
  const { cartOpen, setCartOpen, cartLines, cartSubtotal, updateQty, removeFromCart, cartCount } = useShop();
  const formatPrice = useFormatPrice();
  const shipping = cartSubtotal > 999 || cartSubtotal === 0 ? 0 : 99;
  const total = cartSubtotal + shipping;

  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col p-0 gap-0">
        <SheetHeader className="px-5 py-4 border-b border-border flex-row items-center justify-between space-y-0">
          <SheetTitle className="text-base font-semibold flex items-center gap-2">
            <ShoppingBag className="h-4 w-4" /> Your cart
            <span className="text-xs font-normal text-foreground/55">({cartCount})</span>
          </SheetTitle>
          <SheetClose className="h-8 w-8 grid place-items-center rounded-md hover:bg-foreground/5">
            <X className="h-4 w-4" />
          </SheetClose>
        </SheetHeader>

        {cartLines.length === 0 ? (
          <div className="flex-1 grid place-items-center px-6 text-center">
            <div>
              <ShoppingBag className="h-10 w-10 mx-auto text-foreground/25" />
              <p className="mt-3 text-sm font-medium">Your cart is empty</p>
              <p className="text-xs text-foreground/55 mt-1">Add something you love.</p>
              <Link
                to="/shop"
                onClick={() => setCartOpen(false)}
                className="mt-5 inline-flex items-center gap-2 rounded-md bg-brand text-brand-foreground font-semibold px-5 py-2.5 text-sm"
              >
                Browse products <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto divide-y divide-border">
              {cartLines.map(({ product, qty }) => (
                <li key={product.id} className="p-4 flex gap-3">
                  <Link
                    to={`/product/${product.id}`}
                    onClick={() => setCartOpen(false)}
                    className="shrink-0 h-20 w-16 rounded-md bg-placeholder"
                  />
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/product/${product.id}`}
                      onClick={() => setCartOpen(false)}
                      className="block text-sm font-medium text-foreground hover:text-brand line-clamp-1"
                    >
                      {product.title}
                    </Link>
                    <p className="text-xs text-foreground/55 line-clamp-1">{product.author}</p>
                    <p className="mt-1 text-sm font-semibold">{formatPrice(product.price)}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="inline-flex items-center rounded-full border border-border">
                        <button onClick={() => updateQty(product.id, qty - 1)} aria-label="Decrease" className="h-7 w-7 grid place-items-center hover:bg-foreground/5 rounded-l-full">
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-medium">{qty}</span>
                        <button onClick={() => updateQty(product.id, qty + 1)} aria-label="Increase" className="h-7 w-7 grid place-items-center hover:bg-foreground/5 rounded-r-full">
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="text-xs text-foreground/55 hover:text-destructive inline-flex items-center gap-1"
                      >
                        <Trash2 className="h-3 w-3" /> Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-border p-4 space-y-3 bg-hero/30">
              <div className="flex justify-between text-sm">
                <span className="text-foreground/65">Subtotal</span>
                <span className="font-medium">{formatPrice(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-foreground/65">Shipping</span>
                <span className="font-medium">{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between text-base pt-2 border-t border-border">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-hero-foreground">{formatPrice(total)}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link
                  to="/cart"
                  onClick={() => setCartOpen(false)}
                  className="text-center rounded-md border border-border py-2.5 text-sm font-semibold hover:bg-foreground/5"
                >
                  View cart
                </Link>
                <Link
                  to="/checkout"
                  onClick={() => setCartOpen(false)}
                  className="text-center rounded-md bg-brand text-brand-foreground py-2.5 text-sm font-semibold hover:opacity-95"
                >
                  Checkout
                </Link>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

export function WishlistPeek() {
  const { wishOpen, setWishOpen, wishlist, toggleWishlist, addToCart } = useShop();
  const formatPrice = useFormatPrice();
  const items = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <Sheet open={wishOpen} onOpenChange={setWishOpen}>
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col p-0 gap-0">
        <SheetHeader className="px-5 py-4 border-b border-border flex-row items-center justify-between space-y-0">
          <SheetTitle className="text-base font-semibold flex items-center gap-2">
            <Heart className="h-4 w-4" /> Wishlist
            <span className="text-xs font-normal text-foreground/55">({items.length})</span>
          </SheetTitle>
          <SheetClose className="h-8 w-8 grid place-items-center rounded-md hover:bg-foreground/5">
            <X className="h-4 w-4" />
          </SheetClose>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 grid place-items-center px-6 text-center">
            <div>
              <Heart className="h-10 w-10 mx-auto text-foreground/25" />
              <p className="mt-3 text-sm font-medium">Nothing saved yet</p>
              <p className="text-xs text-foreground/55 mt-1">Tap the heart on any product.</p>
              <Link
                to="/shop"
                onClick={() => setWishOpen(false)}
                className="mt-5 inline-flex items-center gap-2 rounded-md bg-brand text-brand-foreground font-semibold px-5 py-2.5 text-sm"
              >
                Browse products <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto divide-y divide-border">
              {items.map((p) => (
                <li key={p.id} className="p-4 flex gap-3">
                  <Link
                    to={`/product/${p.id}`}
                    onClick={() => setWishOpen(false)}
                    className="shrink-0 h-20 w-16 rounded-md bg-placeholder"
                  />
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/product/${p.id}`}
                      onClick={() => setWishOpen(false)}
                      className="block text-sm font-medium text-foreground hover:text-brand line-clamp-1"
                    >
                      {p.title}
                    </Link>
                    <p className="text-xs text-foreground/55 line-clamp-1">{p.author}</p>
                    <p className="mt-1 text-sm font-semibold">{formatPrice(p.price)}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        onClick={() => addToCart(p.id)}
                        className="rounded-md bg-brand text-brand-foreground text-xs font-semibold px-3 py-1.5 hover:opacity-95"
                      >
                        Add to cart
                      </button>
                      <button
                        onClick={() => toggleWishlist(p.id)}
                        className="text-xs text-foreground/55 hover:text-destructive"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-border p-4 bg-hero/30">
              <Link
                to="/wishlist"
                onClick={() => setWishOpen(false)}
                className="block text-center rounded-md bg-brand text-brand-foreground py-2.5 text-sm font-semibold hover:opacity-95"
              >
                Open full wishlist
              </Link>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}