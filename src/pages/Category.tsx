import { useParams, Navigate, Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ProductCard } from "@/components/shop/ProductCard";
import { CATEGORIES, productsByCategory, type CategoryKey } from "@/data/products";

const VALID: CategoryKey[] = ["books", "clothes", "essentials", "kufi", "women"];

const Category = () => {
  const { key } = useParams<{ key: string }>();
  if (!key || !VALID.includes(key as CategoryKey)) return <Navigate to="/shop" replace />;

  const meta = CATEGORIES.find((c) => c.key === key)!;
  const products = productsByCategory(key as CategoryKey);

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="bg-hero border-b border-border">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8 py-12 md:py-16 text-center">
          <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.18em] text-brand">Collection</p>
          <h1 className="mt-2 text-foreground italic font-bold tracking-tight text-3xl md:text-5xl lg:text-6xl">
            {meta.label}
          </h1>
          <p className="mt-3 text-foreground/65 text-sm md:text-lg max-w-2xl mx-auto">{meta.blurb}</p>
          <p className="mt-2 text-xs text-foreground/50">{products.length} products</p>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8 py-10 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              to="/shop"
              className="group inline-flex items-center gap-2 rounded-md border border-border px-6 py-3 text-sm font-semibold hover:border-brand hover:text-brand transition-colors"
            >
              Browse all products
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Category;