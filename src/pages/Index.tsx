import { ArrowRight, ChevronDown, Search, ShoppingCart, User } from "lucide-react";
import calligraphyLeft from "@/assets/calligraphy-left.png";
import calligraphyRight from "@/assets/calligraphy-right.png";
import logo from "@/assets/logo-header.png";

const NAV_LINKS = ["All products", "Books", "Clothing", "Track order"];
const GUARANTEES = ["Authentic titles", "International shipping", "Secure checkout"];

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      {/* Notice bar */}
      <div className="bg-hero shadow-[0_4px_4px_rgba(0,0,0,0.08)] relative z-30">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-1 text-[11px] sm:text-xs md:text-sm">
          <span className="hidden sm:block w-[60px]" aria-hidden />
          <p className="flex-1 text-center text-foreground">
            International orders may incur customs/import duties
          </p>
          <button
            type="button"
            className="flex items-center gap-1 rounded-sm border border-transparent px-2 py-0.5 text-foreground hover:border-border"
            aria-label="Select currency"
          >
            <ChevronDown className="h-3 w-3" />
            <span>INR</span>
            <span>₹</span>
          </button>
        </div>
      </div>

      {/* Header */}
      <header className="relative z-20 border-b border-[hsl(0_0%_0%_/_0.17)] bg-header-surface shadow-[0_8px_40px_rgba(0,0,0,0.06)]">
        <div className="mx-auto max-w-[1440px] px-4 pt-2 pb-2 md:px-8 md:pt-3 md:pb-3 relative">
          {/* Account / Cart - top right */}
          <div className="absolute right-4 md:right-8 top-2 md:top-3 gap-3 md:gap-5 flex-row flex items-center justify-center px-0 my-[56px]">
            <button type="button" aria-label="Account" className="text-foreground hover:text-brand transition-colors">
              <User className="h-5 w-5 md:h-6 md:w-6" />
            </button>
            <button type="button" aria-label="Cart" className="text-foreground hover:text-brand transition-colors">
              <ShoppingCart className="h-5 w-5 md:h-6 md:w-6" />
            </button>
          </div>

          {/* Centered logo */}
          <a href="/" className="flex justify-center" aria-label="Hurayrah Essentials home">
            <img
              src={logo}
              alt="Hurayrah Essentials"
              className="h-10 md:h-12 w-auto object-contain"
            />
          </a>

          {/* Centered search */}
          <div className="mt-1 flex justify-center">
            <label className="flex items-center gap-2 rounded-full bg-placeholder/70 py-1 w-full max-w-[520px] border border-[hsl(0_0%_60%_/_0.3)] mr-0 mx-[5px] ml-px px-[11px]">
              <Search className="h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="search"
                placeholder="the book of monotheism..."
                className="bg-transparent flex-1 md:text-sm outline-none placeholder:text-[hsl(225_8%_33%)] text-xs"
                aria-label="Search products"
              />
            </label>
          </div>
        </div>

        {/* Nav */}
        <nav className="mx-auto max-w-[1440px] px-4 pb-2 md:px-8 md:pb-2">
           <ul className="md:gap-10 text-sm md:text-base gap-[40px] flex-row flex items-center justify-center">
            {NAV_LINKS.map((link, i) => {
              const active = i === 0;
              return (
                <li key={link}>
                  <a
                    href="#"
                    className={`relative inline-block py-1 transition-colors ${
                      active ? "text-hero-foreground" : "text-foreground hover:text-brand"
                    }`}
                  >
                    {link}
                    {active && (
                      <span className="absolute -bottom-0.5 left-0 h-[2px] w-full bg-hero-foreground rounded-full my-0 mt-[16px] mb-[3px] mr-0 ml-0 px-0 py-0" />
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
        {/* Decorative calligraphy - matches Figma 1920 frame: container left -212, top 26, sides 557/553 wide */}
        <img
          src={calligraphyLeft}
          alt=""
          aria-hidden
          className="pointer-events-none select-none absolute opacity-90"
          style={{
            top: "-1vw",
            left: "-11.04vw",
            width: "29.04vw",
            height: "auto",
            objectFit: "contain",
          }}
        />
        <img
          src={calligraphyRight}
          alt=""
          aria-hidden
          className="pointer-events-none select-none absolute opacity-90"
          style={{
            top: "-1vw",
            right: "-18vw",
            width: "28.84vw",
            height: "auto",
            objectFit: "contain",
          }}
        />

            <div className="relative mx-auto max-w-[1440px] px-4 py-10 md:py-16 lg:py-20 text-center">
           <h1 className="font-bold italic tracking-tight text-foreground text-[clamp(1.75rem,5vw,5.125rem)] leading-[0.95] text-center">
            SEEK KNOWLEDGE
          </h1>
           <p className="text-hero-foreground tracking-tight text-[clamp(2.5rem,8vw,7.625rem)] leading-[0.95] text-center -mt-1 md:-mt-2">
            AFFORDABLY.
          </p>

           <p className="mt-4 md:mt-6 text-[hsl(0_0%_0%_/_0.6)] text-[clamp(0.875rem,1.6vw,2.375rem)] tracking-tight text-center">
            Seeking knowledge made easy.
          </p>

          <ul className="mt-3 md:mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[hsl(0_0%_0%_/_0.55)] text-xs sm:text-sm md:text-base">
            {GUARANTEES.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>

          <div className="mt-8 md:mt-10 flex flex-col items-center gap-3 md:gap-4">
             <a
               href="#products"
               className="group inline-flex items-center justify-center gap-2 bg-brand md:px-16 md:py-4 text-brand-foreground font-bold tracking-tight text-base md:text-xl transition-shadow shadow-2xl py-[11px] my-0 px-[47px] rounded text-center"
             >
              Browse products
              <ArrowRight className="h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:translate-x-0.5" />
            </a>
             <a
               href="#categories"
               className="inline-flex items-center justify-center rounded-full md:px-16 md:py-4 text-hero-foreground font-bold tracking-tight md:text-xl hover:bg-white/40 transition-colors border-0 shadow-inner border-primary-foreground mx-0 my-0 mt-px mb-0 py-[9px] text-lg px-[35px]"
             >
              Check out categories
            </a>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section id="products" className="bg-hero pb-16 md:pb-24">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8">
          <div className="flex items-end justify-between mb-5 md:mb-8">
            <h2 className="text-foreground tracking-tight text-xl md:text-3xl lg:text-4xl">
              Featured Products
            </h2>
            <a
              href="#"
              className="group inline-flex items-center gap-1 text-foreground text-xs md:text-base hover:text-brand transition-colors"
            >
              View all
              <ArrowRight className="h-3 w-3 md:h-4 md:w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className={`aspect-[2/3] rounded-md md:rounded-lg bg-placeholder ${
                  i === 3 ? "hidden md:block" : ""
                }`}
                aria-label={`Featured product ${i + 1} placeholder`}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
