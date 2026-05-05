import { ChevronDown, Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "@/assets/logo-header.png";
import { useShop } from "@/store/shop";
import { useCurrency, CURRENCIES, type CurrencyCode } from "@/store/currency";
import { SUBJECTS } from "@/data/products";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [booksOpen, setBooksOpen] = useState(false);
  const [mobileBooksOpen, setMobileBooksOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { cartCount, wishlist, setCartOpen, setWishOpen } = useShop();
  const { currency, setCurrency, symbol, loading, updatedAt } = useCurrency();
  const booksRef = useRef<HTMLLIElement>(null);
  const currencyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setBooksOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (booksRef.current && !booksRef.current.contains(e.target as Node)) setBooksOpen(false);
      if (currencyRef.current && !currencyRef.current.contains(e.target as Node)) setCurrencyOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, []);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/shop?q=${encodeURIComponent(query)}`);
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "relative inline-block py-2.5 transition-colors text-sm md:text-[15px]",
      isActive ? "text-hero-foreground font-semibold" : "text-foreground/80 hover:text-brand",
    );

  return (
    <>
      {/* Top notice bar */}
      <div className="bg-brand text-brand-foreground relative z-30">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-2 px-3 sm:px-4 py-2 text-[11px] sm:text-xs md:text-sm">
          <span className="hidden sm:block w-[80px]" aria-hidden />
          <p className="flex-1 text-center truncate">International orders may incur customs/import duties</p>
          <div className="relative shrink-0" ref={currencyRef}>
            <button
              type="button"
              onClick={() => setCurrencyOpen((v) => !v)}
              className="flex items-center gap-1 rounded-sm px-2 py-0.5 hover:bg-white/10 transition-colors"
              aria-label="Select currency"
              aria-expanded={currencyOpen}
            >
              <ChevronDown className={cn("h-3 w-3 transition-transform", currencyOpen && "rotate-180")} />
              <span className="font-medium">{currency}</span>
              <span>{symbol}</span>
            </button>
            {currencyOpen && (
              <div className="absolute top-full right-0 mt-1.5 z-40 w-[240px] rounded-xl border border-border bg-background text-foreground shadow-2xl overflow-hidden">
                <div className="px-3 py-2 border-b border-border flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-foreground/55">Currency</span>
                  <span className="text-[10px] text-foreground/45">
                    {loading ? "Updating…" : updatedAt ? `Live · ${new Date(updatedAt).toLocaleDateString()}` : "Live rates"}
                  </span>
                </div>
                <ul className="max-h-[260px] overflow-y-auto py-1">
                  {CURRENCIES.map((c) => (
                    <li key={c.code}>
                      <button
                        type="button"
                        onClick={() => { setCurrency(c.code as CurrencyCode); setCurrencyOpen(false); }}
                        className={cn(
                          "w-full flex items-center justify-between gap-2 px-3 py-2 text-sm text-left hover:bg-hero/60 transition-colors",
                          currency === c.code && "bg-hero/40 font-semibold text-brand",
                        )}
                      >
                        <span className="flex items-center gap-2">
                          <span className="w-6 text-foreground/60">{c.symbol}</span>
                          <span>{c.code}</span>
                        </span>
                        <span className="text-xs text-foreground/55 truncate">{c.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <header className="relative z-20 bg-hero border-b border-[hsl(0_0%_0%_/_0.17)]">
        {/* Top row: hamburger / logo / icons */}
        <div className="mx-auto max-w-[1440px] grid grid-cols-[auto_1fr_auto] items-center gap-2 sm:gap-4 px-3 sm:px-4 py-2.5 sm:py-3 md:px-8 md:py-4">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground hover:bg-foreground/5 transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>

          <Link to="/" className="flex justify-center min-w-0" aria-label="Hurayrah Essentials home">
            <img src={logo} alt="Hurayrah Essentials" className="h-10 sm:h-12 md:h-14 w-auto object-contain" />
          </Link>

          <div className="flex items-center gap-0.5 sm:gap-1">
            <button
              type="button"
              onClick={() => setWishOpen(true)}
              aria-label="Open wishlist"
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground hover:bg-foreground/5 transition-colors"
            >
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 min-w-[16px] px-1 grid place-items-center rounded-full bg-brand text-brand-foreground text-[10px] font-semibold">
                  {wishlist.length}
                </span>
              )}
            </button>
            <Link
              to="/account"
              aria-label="Account"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground hover:bg-foreground/5 transition-colors"
            >
              <User className="h-5 w-5" />
            </Link>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label="Open cart"
              className="relative inline-flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-full text-foreground hover:bg-foreground/5 transition-colors"
            >
              <ShoppingBag className="h-5 w-5 md:h-6 md:w-6" />
              <span className="absolute -top-0.5 -right-0.5 h-4 min-w-[16px] px-1 grid place-items-center rounded-full bg-brand text-brand-foreground text-[10px] font-semibold">
                {cartCount}
              </span>
            </button>
          </div>
        </div>

        {/* Search */}
        <form onSubmit={submitSearch} className="mx-auto max-w-[1440px] px-3 sm:px-4 md:px-8 pb-2.5 sm:pb-3 md:pb-4">
          <label className="mx-auto flex items-center gap-2 rounded-xl bg-header-surface border-2 border-[hsl(220_18%_85%)] px-3 py-2 sm:py-2.5 md:py-3 max-w-[640px] focus-within:border-brand transition-colors">
            <Search className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground shrink-0" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="bg-transparent flex-1 min-w-0 text-sm md:text-base outline-none placeholder:text-[hsl(225_8%_45%)]"
              aria-label="Search products"
            />
          </label>
        </form>

        {/* Nav: scrollable on small screens, centered on md+ */}
        <nav className="mx-auto max-w-[1440px] px-3 sm:px-4 md:px-8">
          <ul className="flex md:justify-center items-center gap-4 sm:gap-6 md:gap-9 overflow-x-auto no-scrollbar -mx-1 px-1">
            <li className="shrink-0">
              <NavLink to="/shop" className={navLinkClass} end>
                Shop all
              </NavLink>
            </li>

            <li className="shrink-0 relative" ref={booksRef}>
              <button
                type="button"
                onClick={() => setBooksOpen((v) => !v)}
                className={cn(
                  "inline-flex items-center gap-1 py-2.5 text-sm md:text-[15px] transition-colors",
                  booksOpen ? "text-brand" : "text-foreground/80 hover:text-brand",
                )}
                aria-haspopup="menu"
                aria-expanded={booksOpen}
              >
                Books
                <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", booksOpen && "rotate-180")} />
              </button>
              {booksOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-30">
                  <div className="min-w-[220px] rounded-xl border border-border bg-background shadow-xl py-2">
                    <Link
                      to="/category/books"
                      onClick={() => setBooksOpen(false)}
                      className="block px-4 py-2 text-sm font-semibold text-foreground hover:bg-hero/60 hover:text-brand transition-colors"
                    >
                      All books
                    </Link>
                    <div className="my-1 mx-3 border-t border-border" />
                    <p className="px-4 pt-1 pb-1 text-[10px] uppercase tracking-wider text-foreground/50">Subjects</p>
                    {SUBJECTS.map((s) => (
                      <Link
                        key={s}
                        to={`/shop?category=books&subject=${encodeURIComponent(s)}`}
                        onClick={() => setBooksOpen(false)}
                        className="block px-4 py-1.5 text-sm text-foreground/80 hover:bg-hero/60 hover:text-brand transition-colors"
                      >
                        {s}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </li>

            <li className="shrink-0">
              <NavLink to="/category/clothes" className={navLinkClass}>Clothes</NavLink>
            </li>
            <li className="shrink-0">
              <NavLink to="/category/essentials" className={navLinkClass}>Essentials</NavLink>
            </li>
            <li className="shrink-0">
              <NavLink to="/category/kufi" className={navLinkClass}>Kufi</NavLink>
            </li>
            <li className="shrink-0">
              <NavLink to="/category/women" className={navLinkClass}>Women</NavLink>
            </li>
            <li className="shrink-0">
              <NavLink to="/track" className={navLinkClass}>Track order</NavLink>
            </li>
          </ul>
        </nav>
      </header>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        >
          <aside
            className="absolute left-0 top-0 h-full w-[85%] max-w-[340px] bg-background shadow-xl p-5 flex flex-col gap-1 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-2">
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
              <Link to="/shop" onClick={() => setMenuOpen(false)} className="py-3 border-b border-border text-base text-foreground hover:text-brand">
                Shop all
              </Link>

              <button
                type="button"
                onClick={() => setMobileBooksOpen((v) => !v)}
                className="flex items-center justify-between py-3 border-b border-border text-base text-foreground hover:text-brand"
                aria-expanded={mobileBooksOpen}
              >
                Books
                <ChevronDown className={cn("h-4 w-4 transition-transform", mobileBooksOpen && "rotate-180")} />
              </button>
              {mobileBooksOpen && (
                <div className="flex flex-col bg-hero/40 border-b border-border">
                  <Link
                    to="/category/books"
                    onClick={() => setMenuOpen(false)}
                    className="py-2.5 pl-4 text-sm font-semibold text-foreground hover:text-brand"
                  >
                    All books
                  </Link>
                  {SUBJECTS.map((s) => (
                    <Link
                      key={s}
                      to={`/shop?category=books&subject=${encodeURIComponent(s)}`}
                      onClick={() => setMenuOpen(false)}
                      className="py-2 pl-6 text-sm text-foreground/75 hover:text-brand"
                    >
                      {s}
                    </Link>
                  ))}
                </div>
              )}

              <Link to="/category/clothes" onClick={() => setMenuOpen(false)} className="py-3 border-b border-border text-base text-foreground hover:text-brand">
                Clothes
              </Link>
              <Link to="/category/essentials" onClick={() => setMenuOpen(false)} className="py-3 border-b border-border text-base text-foreground hover:text-brand">
                Essentials
              </Link>
              <Link to="/category/kufi" onClick={() => setMenuOpen(false)} className="py-3 border-b border-border text-base text-foreground hover:text-brand">
                Kufi
              </Link>
              <Link to="/category/women" onClick={() => setMenuOpen(false)} className="py-3 border-b border-border text-base text-foreground hover:text-brand">
                Women
              </Link>
              <Link to="/track" onClick={() => setMenuOpen(false)} className="py-3 border-b border-border text-base text-foreground hover:text-brand">
                Track order
              </Link>
              <Link to="/account" onClick={() => setMenuOpen(false)} className="py-3 border-b border-border text-base text-foreground hover:text-brand">
                Account
              </Link>
              <Link to="/wishlist" onClick={() => setMenuOpen(false)} className="py-3 border-b border-border text-base text-foreground hover:text-brand">
                Wishlist
              </Link>
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}
