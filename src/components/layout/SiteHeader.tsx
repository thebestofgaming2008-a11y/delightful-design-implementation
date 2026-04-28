import { ChevronDown, Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "@/assets/logo-header.png";
import { useShop } from "@/store/shop";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "All products", to: "/shop" },
  { label: "Books", to: "/category/books" },
  { label: "Clothing", to: "/category/clothes" },
  { label: "Kufi", to: "/category/kufi" },
  { label: "Women", to: "/category/women" },
  { label: "Track order", to: "/track" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { cartCount, wishlist } = useShop();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/shop?q=${encodeURIComponent(query)}`);
  };

  return (
    <>
      {/* Top notice bar */}
      <div className="bg-brand text-brand-foreground relative z-30">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-2 px-4 py-2 text-[11px] sm:text-xs md:text-sm">
          <span className="hidden sm:block w-[80px]" aria-hidden />
          <p className="flex-1 text-center">International orders may incur customs/import duties</p>
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

      <header className="relative z-20 bg-hero border-b border-[hsl(0_0%_0%_/_0.17)]">
        <div className="mx-auto max-w-[1440px] grid grid-cols-[auto_1fr_auto] items-center gap-3 md:gap-6 px-4 py-3 md:px-8 md:py-4">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground hover:bg-foreground/5 transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>

          <Link to="/" className="flex justify-center" aria-label="Hurayrah Essentials home">
            <img src={logo} alt="Hurayrah Essentials" className="h-12 md:h-14 w-auto object-contain" />
          </Link>

          <div className="flex items-center gap-1">
            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="relative hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground hover:bg-foreground/5 transition-colors"
            >
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 min-w-[16px] px-1 grid place-items-center rounded-full bg-brand text-brand-foreground text-[10px] font-semibold">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link
              to="/account"
              aria-label="Account"
              className="hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground hover:bg-foreground/5 transition-colors"
            >
              <User className="h-5 w-5" />
            </Link>
            <Link
              to="/cart"
              aria-label="Cart"
              className="relative inline-flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-full text-foreground hover:bg-foreground/5 transition-colors"
            >
              <ShoppingBag className="h-5 w-5 md:h-6 md:w-6" />
              <span className="absolute -top-0.5 -right-0.5 h-4 min-w-[16px] px-1 grid place-items-center rounded-full bg-brand text-brand-foreground text-[10px] font-semibold">
                {cartCount}
              </span>
            </Link>
          </div>
        </div>

        <form
          onSubmit={submitSearch}
          className="mx-auto max-w-[1440px] px-4 md:px-8 pb-3 md:pb-4"
        >
          <label className="mx-auto flex items-center gap-2 rounded-xl bg-header-surface border-2 border-[hsl(220_18%_85%)] px-3 py-2.5 md:py-3 max-w-[640px] focus-within:border-brand transition-colors">
            <Search className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="the book of monotheism..."
              className="bg-transparent flex-1 text-sm md:text-base outline-none placeholder:text-[hsl(225_8%_45%)]"
              aria-label="Search products"
            />
          </label>
        </form>

        <nav className="mx-auto max-w-[1440px] px-4 md:px-8 overflow-x-auto">
          <ul className="flex items-center justify-center gap-6 sm:gap-8 md:gap-12 text-sm md:text-base whitespace-nowrap">
            {NAV.map((link) => (
              <li key={link.to} className="shrink-0">
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    cn(
                      "relative inline-block py-2.5 transition-colors",
                      isActive ? "text-hero-foreground font-semibold" : "text-foreground/80 hover:text-brand",
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      {isActive && (
                        <span className="absolute -bottom-[1px] left-0 h-[2px] w-full bg-hero-foreground rounded-full" />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {menuOpen && (
        <div
          className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        >
          <aside
            className="absolute left-0 top-0 h-full w-[85%] max-w-[340px] bg-background shadow-xl p-5 flex flex-col gap-2 overflow-y-auto"
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
              {NAV.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className="py-3 border-b border-border text-base text-foreground hover:text-brand transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/account"
                onClick={() => setMenuOpen(false)}
                className="py-3 border-b border-border text-base text-foreground hover:text-brand transition-colors"
              >
                Account
              </Link>
              <Link
                to="/wishlist"
                onClick={() => setMenuOpen(false)}
                className="py-3 border-b border-border text-base text-foreground hover:text-brand transition-colors"
              >
                Wishlist
              </Link>
              <Link
                to="/about"
                onClick={() => setMenuOpen(false)}
                className="py-3 border-b border-border text-base text-foreground hover:text-brand transition-colors"
              >
                About
              </Link>
              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="py-3 border-b border-border text-base text-foreground hover:text-brand transition-colors"
              >
                Contact
              </Link>
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}