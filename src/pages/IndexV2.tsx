import { ArrowRight, ChevronDown, Heart, Search, ShoppingBag, Sparkles, User } from "lucide-react";
import { Link } from "react-router-dom";
import calligraphyLeft from "@/assets/calligraphy-left.png";
import calligraphyRight from "@/assets/calligraphy-right.png";
import logo from "@/assets/logo-header.png";

const NAV_LINKS = ["All products", "Books", "Clothing", "Track order"];
const GUARANTEES = [
  { label: "Authentic titles", icon: Sparkles },
  { label: "International shipping", icon: ArrowRight },
  { label: "Secure checkout", icon: Heart },
];

const IndexV2 = () => {
  return (
    <main className="min-h-screen bg-background">
      {/* Notice bar */}
      <div className="bg-brand text-brand-foreground relative z-30">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-1.5 text-[11px] sm:text-xs md:text-sm">
          <span className="hidden sm:block w-[60px]" aria-hidden />
          <p className="flex-1 text-center tracking-wide">
            Free worldwide shipping over ₹2,500 — International orders may incur customs duties
          </p>
          <button
            type="button"
            className="flex items-center gap-1 rounded-full border border-brand-foreground/20 px-2.5 py-0.5 hover:bg-brand-foreground/10 transition-colors"
            aria-label="Select currency"
          >
            <span>INR ₹</span>
            <ChevronDown className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Header */}
      <header className="relative z-20 border-b border-border bg-header-surface/80 backdrop-blur-md">
        <div className="mx-auto max-w-[1440px] grid grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 py-3 md:px-8 md:py-4">
          {/* Search left */}
          <div className="hidden md:flex justify-start">
            <label className="group flex items-center gap-2 rounded-full bg-background/80 border border-border px-4 py-2 w-full max-w-[360px] focus-within:border-brand transition-colors">
              <Search className="h-4 w-4 text-muted-foreground group-focus-within:text-brand transition-colors" />
              <input
                type="search"
                placeholder="Search the book of monotheism…"
                className="bg-transparent flex-1 text-sm outline-none placeholder:text-muted-foreground"
                aria-label="Search products"
              />
            </label>
          </div>

          {/* Centered logo */}
          <Link to="/v2" className="flex justify-center" aria-label="Hurayrah Essentials home">
            <img src={logo} alt="Hurayrah Essentials" className="h-11 md:h-14 w-auto object-contain" />
          </Link>

          {/* Account / Cart right */}
          <div className="flex items-center justify-end gap-1 md:gap-2">
            <button
              type="button"
              aria-label="Wishlist"
              className="hidden md:inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground hover:bg-foreground/5 transition-colors"
            >
              <Heart className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Account"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground hover:bg-foreground/5 transition-colors"
            >
              <User className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Cart"
              className="relative inline-flex h-10 items-center gap-2 rounded-full bg-brand text-brand-foreground px-3 md:px-4 hover:opacity-90 transition-opacity"
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="text-sm font-medium hidden sm:inline">Cart</span>
              <span className="absolute -top-1 -right-1 md:static md:ml-1 h-5 min-w-[20px] px-1 grid place-items-center rounded-full bg-background text-foreground text-[10px] font-semibold border border-brand">
                0
              </span>
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="md:hidden px-4 pb-3">
          <label className="flex items-center gap-2 rounded-full bg-background/80 border border-border px-4 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search…"
              className="bg-transparent flex-1 text-sm outline-none placeholder:text-muted-foreground"
              aria-label="Search products"
            />
          </label>
        </div>

        {/* Nav */}
        <nav className="border-t border-border/60">
          <ul className="mx-auto max-w-[1440px] flex items-center justify-center gap-6 md:gap-12 px-4 md:px-8 text-sm md:text-base">
            {NAV_LINKS.map((link, i) => {
              const active = i === 0;
              return (
                <li key={link}>
                  <a
                    href="#"
                    className={`relative inline-block py-3 transition-colors ${
                      active ? "text-hero-foreground font-semibold" : "text-foreground/70 hover:text-brand"
                    }`}
                  >
                    {link}
                    {active && (
                      <span className="absolute -bottom-[1px] left-0 h-[2px] w-full bg-hero-foreground rounded-full" />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-hero">
        {/* Decorative calligraphy */}
        <img
          src={calligraphyLeft}
          alt=""
          aria-hidden
          className="pointer-events-none select-none absolute opacity-80"
          style={{ top: "-5vw", left: "-9vw", width: "26vw", height: "auto" }}
        />
        <img
          src={calligraphyRight}
          alt=""
          aria-hidden
          className="pointer-events-none select-none absolute opacity-80"
          style={{ top: "-5vw", right: "-12vw", width: "26vw", height: "auto" }}
        />

        {/* Soft glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 30%, hsl(0 0% 100% / 0.55), transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-[1440px] px-4 py-14 md:py-20 lg:py-28 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-hero-foreground/20 bg-background/50 px-3 py-1 text-xs md:text-sm text-hero-foreground backdrop-blur-sm mb-5 md:mb-7">
            <Sparkles className="h-3.5 w-3.5" />
            New arrivals — Spring collection
          </span>

          <h1 className="font-bold italic tracking-tight text-foreground text-[clamp(1.75rem,5vw,5.125rem)] leading-[0.95]">
            SEEK KNOWLEDGE
          </h1>
          <p className="text-hero-foreground tracking-tight text-[clamp(2.5rem,8vw,7.625rem)] leading-[0.95] -mt-1 md:-mt-2">
            AFFORDABLY.
          </p>

          <p className="mt-5 md:mt-7 mx-auto max-w-2xl text-foreground/70 text-base md:text-xl tracking-tight">
            Carefully curated Islamic books and essentials — delivered worldwide at honest prices.
          </p>

          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
            <a
              href="#products"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand text-brand-foreground font-semibold tracking-tight text-base md:text-lg px-7 md:px-9 py-3.5 md:py-4 shadow-lg shadow-brand/20 hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              Browse products
              <ArrowRight className="h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#categories"
              className="inline-flex items-center justify-center rounded-full border border-hero-foreground/30 bg-background/40 backdrop-blur-sm text-hero-foreground font-semibold tracking-tight text-base md:text-lg px-7 md:px-9 py-3.5 md:py-4 hover:bg-background/70 transition-colors"
            >
              Check out categories
            </a>
          </div>

          <ul className="mt-10 md:mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-foreground/70 text-xs sm:text-sm md:text-base">
            {GUARANTEES.map(({ label, icon: Icon }) => (
              <li key={label} className="flex items-center gap-1.5">
                <Icon className="h-3.5 w-3.5 md:h-4 md:w-4 text-hero-foreground" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Categories strip */}
      <section id="categories" className="bg-background border-b border-border">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8 py-10 md:py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            {["Quran & Tafsir", "Hadith", "Fiqh", "Clothing"].map((cat) => (
              <a
                key={cat}
                href="#"
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-placeholder hover:shadow-lg transition-shadow"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-background">
                  <span className="font-semibold text-sm md:text-lg">{cat}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section id="products" className="bg-background pb-16 md:pb-24">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8 pt-12 md:pt-16">
          <div className="flex items-end justify-between mb-6 md:mb-10">
            <div>
              <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-foreground/50 mb-2">
                Handpicked
              </p>
              <h2 className="text-foreground tracking-tight text-2xl md:text-3xl lg:text-4xl font-semibold">
                Featured Products
              </h2>
            </div>
            <a
              href="#"
              className="group inline-flex items-center gap-1 text-foreground/80 text-sm md:text-base hover:text-brand transition-colors"
            >
              View all
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <article
                key={i}
                className="group cursor-pointer"
                aria-label={`Featured product ${i + 1}`}
              >
                <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-placeholder">
                  <button
                    type="button"
                    aria-label="Add to wishlist"
                    className="absolute top-3 right-3 h-9 w-9 grid place-items-center rounded-full bg-background/90 text-foreground hover:bg-background transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Heart className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-3">
                  <h3 className="text-sm md:text-base text-foreground font-medium truncate">
                    Product title {i + 1}
                  </h3>
                  <p className="text-xs md:text-sm text-foreground/60">Author name</p>
                  <p className="mt-1 text-sm md:text-base text-hero-foreground font-semibold">
                    ₹{(499 + i * 100).toLocaleString()}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand text-brand-foreground">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8 py-10 md:py-14 grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="font-bold italic text-xl mb-2">Hurayrah Essentials</h3>
            <p className="text-brand-foreground/70 text-sm">
              Seeking knowledge, made affordable.
            </p>
          </div>
          {[
            { title: "Shop", links: ["All products", "Books", "Clothing", "New arrivals"] },
            { title: "Help", links: ["Track order", "Shipping", "Returns", "Contact"] },
            { title: "Company", links: ["About", "Blog", "Privacy", "Terms"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-semibold mb-3">{col.title}</h4>
              <ul className="space-y-2 text-sm text-brand-foreground/70">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="hover:text-brand-foreground transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-brand-foreground/10">
          <div className="mx-auto max-w-[1440px] px-4 md:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-brand-foreground/60">
            <p>© {new Date().getFullYear()} Hurayrah Essentials. All rights reserved.</p>
            <Link to="/" className="hover:text-brand-foreground transition-colors">
              View v1 design →
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default IndexV2;