import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { useShop } from "@/store/shop";
import { useFormatPrice } from "@/store/currency";

const Cart = () => {
  const { cartLines, cartSubtotal, updateQty, removeFromCart } = useShop();
  const formatPrice = useFormatPrice();
  const navigate = useNavigate();
  const shipping = cartSubtotal > 999 || cartSubtotal === 0 ? 0 : 99;
  const total = cartSubtotal + shipping;

  return (
    <SiteLayout>
      <div className="mx-auto max-w-[1200px] px-4 md:px-8 py-8 md:py-12">
        <h1 className="text-foreground italic font-bold tracking-tight text-2xl md:text-4xl mb-6 md:mb-10">
          Your cart
        </h1>

        {cartLines.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-10 md:p-16 text-center">
            <ShoppingBag className="h-10 w-10 mx-auto text-foreground/30" />
            <h2 className="mt-4 text-lg font-semibold">Your cart is empty</h2>
            <p className="mt-1 text-sm text-foreground/60">Find something you'll love.</p>
            <Link
              to="/shop"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-brand text-brand-foreground font-semibold px-6 py-3 hover:opacity-95 transition-opacity"
            >
              Browse products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_360px] gap-8">
            <ul className="divide-y divide-border rounded-2xl border border-border bg-background">
              {cartLines.map(({ product, qty }) => (
                <li key={product.id} className="p-4 md:p-5 flex gap-4">
                  <Link to={`/product/${product.id}`} className="shrink-0 h-24 w-20 md:h-28 md:w-24 rounded-lg bg-placeholder" />
                  <div className="flex-1 min-w-0">
                    <Link to={`/product/${product.id}`} className="block">
                      <h3 className="text-sm md:text-base font-medium text-foreground hover:text-brand line-clamp-1">
                        {product.title}
                      </h3>
                    </Link>
                    <p className="text-xs md:text-sm text-foreground/55 line-clamp-1">{product.author}</p>
                    <p className="mt-1 text-sm md:text-base font-semibold text-hero-foreground">
                      {formatPrice(product.price)}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="inline-flex items-center rounded-full border border-border">
                        <button onClick={() => updateQty(product.id, qty - 1)} aria-label="Decrease" className="h-8 w-8 grid place-items-center hover:bg-foreground/5 rounded-l-full"><Minus className="h-3.5 w-3.5" /></button>
                        <span className="w-8 text-center text-sm font-medium">{qty}</span>
                        <button onClick={() => updateQty(product.id, qty + 1)} aria-label="Increase" className="h-8 w-8 grid place-items-center hover:bg-foreground/5 rounded-r-full"><Plus className="h-3.5 w-3.5" /></button>
                      </div>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="text-xs text-foreground/55 hover:text-destructive inline-flex items-center gap-1"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="rounded-2xl border border-border bg-hero/30 p-5 md:p-6 h-fit">
              <h2 className="font-semibold text-foreground text-lg">Order summary</h2>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between"><dt className="text-foreground/65">Subtotal</dt><dd className="font-medium">{formatPrice(cartSubtotal)}</dd></div>
                <div className="flex justify-between"><dt className="text-foreground/65">Shipping</dt><dd className="font-medium">{shipping === 0 ? "Free" : formatPrice(shipping)}</dd></div>
                <div className="border-t border-border pt-3 mt-3 flex justify-between text-base">
                  <dt className="font-semibold">Total</dt>
                  <dd className="font-bold text-hero-foreground">{formatPrice(total)}</dd>
                </div>
              </dl>
              <button
                onClick={() => navigate("/checkout")}
                className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-md bg-brand text-brand-foreground font-semibold py-3 hover:opacity-95 transition-opacity"
              >
                Checkout
                <ArrowRight className="h-4 w-4" />
              </button>
              <p className="mt-3 text-xs text-foreground/55 text-center">Secure encrypted checkout · 7-day returns</p>
            </aside>
          </div>
        )}
      </div>
    </SiteLayout>
  );
};

export default Cart;