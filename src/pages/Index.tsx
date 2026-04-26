import {
  ArrowRight,
  ChevronDown,
  Heart,
  Mail,
  Menu,
  Search,
  ShoppingBag,
  Star,
  Truck,
  Shield,
  RotateCcw,
  Headphones,
  X,
} from "lucide-react";
import { useState } from "react";
import calligraphyLeft from "@/assets/calligraphy-left.png";
import calligraphyRight from "@/assets/calligraphy-right.png";
import logo from "@/assets/logo-header.png";

const NAV_LINKS = ["All products", "Books", "Clothing", "Track order"];
const GUARANTEES = ["Authentic titles", "International shipping", "Secure checkout"];

const CATEGORIES = [
  { name: "Books", desc: "Aqeedah, Seerah, Tafsir & more" },
  { name: "Clothing", desc: "Modest, comfortable, refined" },
  { name: "Essentials", desc: "Daily companions for the seeker" },
];

const FEATURED = [
  { title: "The Book of Monotheism", author: "Sh. Muhammad ibn Abdul Wahhab", price: 499 },
  { title: "Riyad as-Salihin", author: "Imam An-Nawawi", price: 899 },
  { title: "Fortress of the Muslim", author: "Sa'id ibn Ali al-Qahtani", price: 249 },
  { title: "Stories of the Prophets", author: "Ibn Kathir", price: 749 },
];

const VALUE_PROPS = [
  { Icon: Truck, title: "Worldwide shipping", desc: "Delivered to over 30 countries." },
  { Icon: Shield, title: "Secure checkout", desc: "Encrypted payments, every order." },
  { Icon: RotateCcw, title: "Easy returns", desc: "7-day hassle-free returns." },
  { Icon: Headphones, title: "Real support", desc: "Friendly help, when you need it." },
];

const TESTIMONIALS = [
  {
    quote:
      "Beautifully curated collection. The shipping was faster than I expected and the books arrived in perfect condition.",
    name: "Amina S.",
    role: "Verified buyer",
  },
  {
    quote:
      "Authentic titles at honest prices. Hurayrah Essentials has become my go-to for building my library.",
    name: "Yusuf R.",
    role: "Verified buyer",
  },
  {
    quote:
      "Quality of the clothing is excellent. Modest, comfortable and well-priced — exactly what I was looking for.",
    name: "Khadija M.",
    role: "Verified buyer",
  },
];

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background">
      {/* Top notice bar — dark navy */}
      <div className="bg-brand text-brand-foreground relative z-30">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-2 px-4 py-2 text-[11px] sm:text-xs md:text-sm">
          <span className="hidden sm:block w-[80px]" aria-hidden />
          <p className="flex-1 text-center">
            International orders may incur customs/import duties
          </p>
          <button
            type="button"
            className="flex items-center gap-1 rounded-sm px-2 py-0.5 hover:bg-white/10 transition-colors"
            aria-label="Select currency"
          >
            <ChevronDown className="h-3 w-3" />
            <span className="font-medium">INR</span>
            <span>₹</span>
          </button>
        </div>
      </div>

      {/* Header */}
      <header className="relative z-20 bg-hero border-b border-[hsl(0_0%_0%_/_0.17)]">
        <div className="mx-auto max-w-[1440px] grid grid-cols-[auto_1fr_auto] items-center gap-3 md:gap-6 px-4 py-3 md:px-8 md:py-4">
          {/* Hamburger left (per Figma) */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground hover:bg-foreground/5 transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Centered logo */}
          <a href="/" className="flex justify-center" aria-label="Hurayrah Essentials home">
            <img
              src={logo}
              alt="Hurayrah Essentials"
              className="h-12 md:h-14 w-auto object-contain"
            />
          </a>

          {/* Cart right */}
          <button
            type="button"
            aria-label="Cart"
            className="relative inline-flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-full text-foreground hover:bg-foreground/5 transition-colors"
          >
            <ShoppingBag className="h-5 w-5 md:h-6 md:w-6" />
            <span className="absolute -top-0.5 -right-0.5 h-4 min-w-[16px] px-1 grid place-items-center rounded-full bg-brand text-brand-foreground text-[10px] font-semibold">
              0
            </span>
          </button>
        </div>

        {/* Search bar — matches Figma rounded outlined input */}
        <div className="mx-auto max-w-[1440px] px-4 md:px-8 pb-3 md:pb-4">
          <label className="mx-auto flex items-center gap-2 rounded-xl bg-header-surface border-2 border-[hsl(220_18%_85%)] px-3 py-2.5 md:py-3 max-w-[640px] focus-within:border-brand transition-colors">
            <Search className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
            <input
              type="search"
              placeholder="the book of monotheism..."
              className="bg-transparent flex-1 text-sm md:text-base outline-none placeholder:text-[hsl(225_8%_45%)]"
              aria-label="Search products"
            />
          </label>
        </div>

        {/* Nav with active underline flush to header bottom */}
        <nav className="mx-auto max-w-[1440px] px-4 md:px-8">
          <ul className="flex items-center justify-center gap-6 sm:gap-10 md:gap-16 text-sm md:text-base overflow-x-auto">
            {NAV_LINKS.map((link, i) => {
              const active = i === 0;
              return (
                <li key={link} className="shrink-0">
                  <a
                    href="#"
                    className={`relative inline-block py-2.5 transition-colors ${
                      active
                        ? "text-hero-foreground font-semibold"
                        : "text-foreground/80 hover:text-brand"
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

      {/* Mobile menu drawer */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        >
          <aside
            className="absolute left-0 top-0 h-full w-[80%] max-w-[320px] bg-background shadow-xl p-5 flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold italic text-lg">Menu</span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="h-9 w-9 grid place-items-center rounded-md hover:bg-foreground/5"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col">
              {NAV_LINKS.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="py-3 border-b border-border text-base text-foreground hover:text-brand transition-colors"
                >
                  {link}
                </a>
              ))}
            </nav>
          </aside>
        </div>
      )}

      {/* Hero */}
      <section className="relative overflow-hidden bg-hero">
        <img
          src={calligraphyLeft}
          alt=""
          aria-hidden
          className="pointer-events-none select-none absolute opacity-90"
          style={{ top: "-10vw", left: "-11.04vw", width: "29.04vw", height: "auto" }}
        />
        <img
          src={calligraphyRight}
          alt=""
          aria-hidden
          className="pointer-events-none select-none absolute opacity-90"
          style={{ top: "-10vw", right: "-11vw", width: "28.84vw", height: "auto" }}
        />

        {/* Soft glow behind text */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 35%, hsl(0 0% 100% / 0.45), transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-[1440px] px-4 py-12 md:py-20 lg:py-24 text-center">
          <h1 className="font-bold italic tracking-tight text-foreground text-[clamp(1.75rem,5vw,5.125rem)] leading-[0.95]">
            SEEK KNOWLEDGE
          </h1>
          <p className="text-hero-foreground tracking-tight text-[clamp(2.5rem,8vw,7.625rem)] leading-[0.95] -mt-1 md:-mt-2">
            AFFORDABLY.
          </p>

          <p className="mt-4 md:mt-6 text-[hsl(0_0%_0%_/_0.65)] text-[clamp(0.875rem,1.6vw,2.375rem)] tracking-tight">
            Seeking knowledge made easy.
          </p>

          <ul className="mt-3 md:mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[hsl(0_0%_0%_/_0.6)] text-xs sm:text-sm md:text-base">
            {GUARANTEES.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>

          <div className="mt-7 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
            <a
              href="#products"
              className="group inline-flex items-center justify-center gap-2 rounded-md bg-brand text-brand-foreground font-bold tracking-tight text-base md:text-lg px-10 md:px-14 py-3.5 md:py-4 shadow-2xl hover:opacity-95 transition-opacity"
            >
              Browse products
              <ArrowRight className="h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#categories"
              className="inline-flex items-center justify-center rounded-2xl text-hero-foreground font-bold tracking-tight text-base md:text-lg px-10 md:px-14 py-3.5 md:py-4 hover:bg-white/40 transition-colors shadow-inner"
            >
              Check out categories
            </a>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="bg-hero pb-16 md:pb-24">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8">
          <div className="flex items-end justify-between mb-6 md:mb-10">
            <h2 className="text-foreground tracking-tight text-2xl md:text-3xl lg:text-4xl">
              Featured Products
            </h2>
            <a
              href="#"
              className="group inline-flex items-center gap-1 text-foreground text-sm md:text-base hover:text-brand transition-colors"
            >
              View all
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {FEATURED.map((p, i) => (
              <article key={i} className="group cursor-pointer">
                <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-placeholder shadow-sm group-hover:shadow-lg transition-shadow">
                  <button
                    type="button"
                    aria-label="Add to wishlist"
                    className="absolute top-3 right-3 h-9 w-9 grid place-items-center rounded-full bg-background/90 text-foreground hover:bg-background transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Heart className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-3">
                  <h3 className="text-sm md:text-base text-foreground font-medium line-clamp-1">
                    {p.title}
                  </h3>
                  <p className="text-xs md:text-sm text-foreground/60 line-clamp-1">
                    {p.author}
                  </p>
                  <p className="mt-1 text-sm md:text-base text-hero-foreground font-semibold">
                    ₹{p.price.toLocaleString()}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Categories — Books, Clothing, Essentials */}
      <section id="categories" className="bg-background border-t border-border">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8 py-14 md:py-20">
          <div className="flex items-end justify-between mb-6 md:mb-10">
            <div>
              <h2 className="text-foreground tracking-tight text-2xl md:text-3xl lg:text-4xl">
                Shop by category
              </h2>
              <p className="mt-2 text-foreground/60 text-sm md:text-base">
                Three collections, one purpose.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
            {CATEGORIES.map((cat) => (
              <a
                key={cat.name}
                href="#"
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-placeholder hover:shadow-xl transition-all"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-brand/80 via-brand/20 to-transparent" />
                <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-end text-brand-foreground">
                  <h3 className="font-bold italic text-xl md:text-2xl">{cat.name}</h3>
                  <p className="text-xs md:text-sm text-brand-foreground/80 mt-1">
                    {cat.desc}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold">
                    Explore
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="bg-hero/40 border-y border-border">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8 py-10 md:py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {VALUE_PROPS.map(({ Icon, title, desc }) => (
              <div key={title} className="flex flex-col items-start gap-2">
                <span className="h-10 w-10 grid place-items-center rounded-full bg-brand text-brand-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="font-semibold text-foreground text-sm md:text-base">{title}</h3>
                <p className="text-xs md:text-sm text-foreground/60">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-background">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8 py-14 md:py-20">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-foreground tracking-tight text-2xl md:text-3xl lg:text-4xl">
              Loved by readers worldwide
            </h2>
            <p className="mt-2 text-foreground/60 text-sm md:text-base">
              Honest words from our growing community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {TESTIMONIALS.map((t) => (
              <figure
                key={t.name}
                className="rounded-2xl border border-border bg-hero/30 p-6 md:p-7 flex flex-col gap-4"
              >
                <div className="flex gap-0.5 text-hero-foreground" aria-label="5 star rating">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="text-foreground/85 text-sm md:text-base leading-relaxed">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-auto">
                  <p className="font-semibold text-foreground text-sm">{t.name}</p>
                  <p className="text-xs text-foreground/55">{t.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-brand text-brand-foreground">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8 py-12 md:py-16 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="font-bold italic tracking-tight text-2xl md:text-3xl lg:text-4xl">
              Join the Hurayrah newsletter
            </h2>
            <p className="mt-2 text-brand-foreground/70 text-sm md:text-base">
              New arrivals, restocks and reader-only offers — straight to your inbox.
            </p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row items-stretch gap-2"
          >
            <label className="flex flex-1 items-center gap-2 rounded-md bg-brand-foreground/10 border border-brand-foreground/20 px-3 py-3">
              <Mail className="h-4 w-4 text-brand-foreground/70" />
              <input
                type="email"
                required
                placeholder="you@example.com"
                aria-label="Email address"
                className="bg-transparent flex-1 text-sm outline-none placeholder:text-brand-foreground/50 text-brand-foreground"
              />
            </label>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md bg-brand-foreground text-brand font-semibold text-sm px-6 py-3 hover:opacity-90 transition-opacity"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8 py-12 md:py-16 grid gap-10 md:grid-cols-4">
          <div>
            <img src={logo} alt="Hurayrah Essentials" className="h-10 w-auto object-contain mb-3" />
            <p className="text-foreground/60 text-sm max-w-xs">
              Seeking knowledge, made affordable. Authentic books, clothing and essentials shipped worldwide.
            </p>
          </div>
          {[
            { title: "Shop", links: ["All products", "Books", "Clothing", "Essentials"] },
            { title: "Help", links: ["Track order", "Shipping", "Returns", "Contact"] },
            { title: "Company", links: ["About", "Reviews", "Privacy", "Terms"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-semibold text-foreground mb-3 text-sm">{col.title}</h4>
              <ul className="space-y-2 text-sm text-foreground/60">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="hover:text-brand transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-border">
          <div className="mx-auto max-w-[1440px] px-4 md:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-foreground/55">
            <p>© {new Date().getFullYear()} Hurayrah Essentials. All rights reserved.</p>
            <p>Made with care for the seekers of knowledge.</p>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Index;