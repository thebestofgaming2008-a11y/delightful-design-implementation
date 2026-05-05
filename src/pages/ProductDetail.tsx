import { useParams, Navigate, Link } from "react-router-dom";
import { useState } from "react";
import { Heart, ShoppingBag, Star, Truck, RotateCcw, Shield, ChevronRight, Minus, Plus } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ProductCard } from "@/components/shop/ProductCard";
import { getProduct, productsByCategory } from "@/data/products";
import { useShop } from "@/store/shop";
import { useFormatPrice } from "@/store/currency";
import { cn } from "@/lib/utils";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = id ? getProduct(id) : undefined;
  const { addToCart, toggleWishlist, isWishlisted } = useShop();
  const formatPrice = useFormatPrice();
  const [qty, setQty] = useState(1);

  if (!product) return <Navigate to="/shop" replace />;
  const wished = isWishlisted(product.id);
  const related = productsByCategory(product.category).filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <SiteLayout>
      <div className="mx-auto max-w-[1440px] px-4 md:px-8 py-6 md:py-10">
        <nav className="text-xs md:text-sm text-foreground/55 flex items-center gap-1 mb-6 flex-wrap">
          <Link to="/" className="hover:text-brand">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to={`/category/${product.category}`} className="hover:text-brand capitalize">
            {product.category}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground/80 line-clamp-1">{product.title}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Gallery */}
          <div className="space-y-3">
            <div className="aspect-square rounded-2xl bg-placeholder shadow-sm" />
            <div className="grid grid-cols-4 gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <button
                  key={i}
                  className="aspect-square rounded-lg bg-placeholder/80 hover:ring-2 hover:ring-brand transition-all"
                  aria-label={`Gallery image ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            {product.badge && (
              <span className="inline-block rounded-full bg-brand text-brand-foreground text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 mb-3">
                {product.badge}
              </span>
            )}
            <h1 className="text-foreground italic font-bold tracking-tight text-2xl md:text-4xl">
              {product.title}
            </h1>
            <p className="text-foreground/60 text-sm md:text-base mt-1">{product.author}</p>

            <div className="mt-3 flex items-center gap-2 text-sm text-foreground/70">
              <span className="flex gap-0.5 text-hero-foreground">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={cn("h-4 w-4", i < Math.round(product.rating) && "fill-current")} />
                ))}
              </span>
              <span className="font-medium text-foreground">{product.rating.toFixed(1)}</span>
              <span className="text-foreground/50">· {product.reviews} reviews</span>
            </div>

            <div className="mt-5 flex items-baseline gap-3">
              <span className="text-2xl md:text-3xl font-semibold text-hero-foreground">
                {formatPrice(product.price)}
              </span>
              {product.compareAt && (
                <span className="text-base text-foreground/40 line-through">{formatPrice(product.compareAt)}</span>
              )}
            </div>

            <p className="mt-5 text-foreground/75 leading-relaxed text-sm md:text-base">{product.description}</p>

            {/* Qty */}
            <div className="mt-6 flex items-center gap-3">
              <span className="text-sm font-medium text-foreground/70">Quantity</span>
              <div className="inline-flex items-center rounded-full border border-border">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="h-9 w-9 grid place-items-center hover:bg-foreground/5 rounded-l-full"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center text-sm font-medium">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="h-9 w-9 grid place-items-center hover:bg-foreground/5 rounded-r-full"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => addToCart(product.id, qty)}
                className="group flex-1 inline-flex items-center justify-center gap-2 rounded-md bg-brand text-brand-foreground font-semibold text-base px-6 py-3.5 hover:opacity-95 transition-opacity"
              >
                <ShoppingBag className="h-5 w-5" />
                Add to cart
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                aria-label="Toggle wishlist"
                className={cn(
                  "inline-flex items-center justify-center gap-2 rounded-md border px-5 py-3.5 font-semibold text-sm transition-all",
                  wished
                    ? "bg-brand/10 border-brand text-brand"
                    : "border-border text-foreground/80 hover:border-brand hover:text-brand",
                )}
              >
                <Heart className={cn("h-5 w-5", wished && "fill-current")} />
                {wished ? "Saved" : "Save"}
              </button>
            </div>

            <ul className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs md:text-sm">
              <li className="flex items-center gap-2 text-foreground/70"><Truck className="h-4 w-4 text-brand" /> Free shipping over ₹999</li>
              <li className="flex items-center gap-2 text-foreground/70"><RotateCcw className="h-4 w-4 text-brand" /> 7-day returns</li>
              <li className="flex items-center gap-2 text-foreground/70"><Shield className="h-4 w-4 text-brand" /> Secure checkout</li>
            </ul>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-16 md:mt-24">
            <h2 className="text-foreground tracking-tight text-xl md:text-3xl mb-6">You may also like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </SiteLayout>
  );
};

export default ProductDetail;