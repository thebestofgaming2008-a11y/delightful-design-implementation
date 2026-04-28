import { useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ProductCard } from "@/components/shop/ProductCard";
import { CATEGORIES, PRODUCTS, SUBJECTS, type CategoryKey } from "@/data/products";

const SORTS = [
  { key: "featured", label: "Featured" },
  { key: "price-asc", label: "Price: low to high" },
  { key: "price-desc", label: "Price: high to low" },
  { key: "rating", label: "Top rated" },
] as const;

type SortKey = (typeof SORTS)[number]["key"];

const Shop = () => {
  const [params, setParams] = useSearchParams();
  const q = params.get("q")?.toLowerCase() ?? "";
  const subject = params.get("subject") ?? "";
  const initialCat = (params.get("category") as CategoryKey | null) ?? null;

  const [cat, setCat] = useState<CategoryKey | null>(initialCat);
  const [sort, setSort] = useState<SortKey>("featured");
  const [maxPrice, setMaxPrice] = useState<number>(2500);
  const [open, setOpen] = useState(false);

  const products = useMemo(() => {
    let list = [...PRODUCTS];
    if (cat) list = list.filter((p) => p.category === cat);
    if (subject) list = list.filter((p) => p.subject === subject);
    if (q) list = list.filter((p) => `${p.title} ${p.author}`.toLowerCase().includes(q));
    list = list.filter((p) => p.price <= maxPrice);
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [cat, subject, q, maxPrice, sort]);

  const clearSubject = () => {
    const next = new URLSearchParams(params);
    next.delete("subject");
    setParams(next, { replace: true });
  };

  const FiltersInner = (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">Category</h3>
        <div className="flex flex-col gap-1.5">
          <button
            onClick={() => setCat(null)}
            className={`text-left text-sm py-1.5 ${cat === null ? "text-brand font-semibold" : "text-foreground/70 hover:text-brand"}`}
          >
            All
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              onClick={() => setCat(c.key)}
              className={`text-left text-sm py-1.5 ${cat === c.key ? "text-brand font-semibold" : "text-foreground/70 hover:text-brand"}`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">Max price</h3>
        <input
          type="range"
          min={100}
          max={2500}
          step={50}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-brand"
        />
        <p className="text-xs text-foreground/60 mt-1">Up to ₹{maxPrice.toLocaleString()}</p>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">Subject</h3>
        <div className="flex flex-wrap gap-2">
          {SUBJECTS.map((s) => (
            <Link
              key={s}
              to={`/shop?subject=${encodeURIComponent(s)}`}
              className={`text-xs rounded-full border px-3 py-1.5 transition-colors ${
                subject === s ? "bg-brand text-brand-foreground border-brand" : "border-border text-foreground/70 hover:border-brand"
              }`}
            >
              {s}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <SiteLayout>
      <div className="mx-auto max-w-[1440px] px-4 md:px-8 py-8 md:py-12">
        <div className="mb-6 md:mb-10">
          <h1 className="text-foreground tracking-tight text-2xl md:text-4xl">All products</h1>
          <p className="mt-1 text-foreground/60 text-sm md:text-base">
            {products.length} item{products.length === 1 ? "" : "s"}
            {subject && (
              <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-brand/10 text-brand px-2.5 py-0.5 text-xs font-medium">
                Subject: {subject}
                <button onClick={clearSubject} aria-label="Clear subject"><X className="h-3 w-3" /></button>
              </span>
            )}
          </p>
        </div>

        <div className="grid md:grid-cols-[220px_1fr] gap-8">
          <aside className="hidden md:block">{FiltersInner}</aside>
          <div>
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setOpen(true)}
                className="md:hidden inline-flex items-center gap-2 text-sm rounded-md border border-border px-3 py-2"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </button>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="ml-auto text-sm rounded-md border border-border bg-background px-3 py-2 focus:outline-none focus:border-brand"
              >
                {SORTS.map((s) => (
                  <option key={s.key} value={s.key}>Sort: {s.label}</option>
                ))}
              </select>
            </div>

            {products.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border p-10 text-center text-foreground/60">
                No products match your filters.
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-foreground/40 md:hidden" onClick={() => setOpen(false)}>
          <aside
            className="absolute right-0 top-0 h-full w-[85%] max-w-[320px] bg-background p-5 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Filters</h2>
              <button onClick={() => setOpen(false)} className="h-9 w-9 grid place-items-center rounded-md hover:bg-foreground/5">
                <X className="h-5 w-5" />
              </button>
            </div>
            {FiltersInner}
          </aside>
        </div>
      )}
    </SiteLayout>
  );
};

export default Shop;