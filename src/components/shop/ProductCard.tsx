import { Heart, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useShop } from "@/store/shop";
import { type Product, formatPrice } from "@/data/products";
import { cn } from "@/lib/utils";

interface Props {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: Props) {
  const { toggleWishlist, isWishlisted, addToCart } = useShop();
  const wished = isWishlisted(product.id);

  return (
    <article className={cn("group", className)}>
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-placeholder shadow-sm group-hover:shadow-lg transition-shadow">
        <Link to={`/product/${product.id}`} className="absolute inset-0" aria-label={product.title} />
        {product.badge && (
          <span className="absolute top-3 left-3 rounded-full bg-brand text-brand-foreground text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1">
            {product.badge}
          </span>
        )}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          className={cn(
            "absolute top-3 right-3 h-9 w-9 grid place-items-center rounded-full bg-background/90 text-foreground hover:bg-background transition-all",
            wished ? "opacity-100" : "opacity-0 group-hover:opacity-100",
          )}
        >
          <Heart className={cn("h-4 w-4", wished && "fill-current text-brand")} />
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            addToCart(product.id);
          }}
          className="absolute inset-x-3 bottom-3 inline-flex items-center justify-center gap-2 rounded-md bg-brand text-brand-foreground text-xs md:text-sm font-semibold py-2.5 shadow-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all"
        >
          <ShoppingBag className="h-4 w-4" />
          Add to cart
        </button>
      </div>
      <div className="mt-3">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="text-sm md:text-base text-foreground font-medium line-clamp-1 hover:text-brand transition-colors">
            {product.title}
          </h3>
        </Link>
        <p className="text-xs md:text-sm text-foreground/60 line-clamp-1">{product.author}</p>
        <div className="mt-1 flex items-baseline gap-2">
          <p className="text-sm md:text-base text-hero-foreground font-semibold">{formatPrice(product.price)}</p>
          {product.compareAt && (
            <p className="text-xs text-foreground/40 line-through">{formatPrice(product.compareAt)}</p>
          )}
        </div>
      </div>
    </article>
  );
}