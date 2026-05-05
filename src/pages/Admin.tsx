import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard, Package, ShoppingBag, Users, Settings, TrendingUp, IndianRupee,
  Search, Filter, Bell, Menu, X, Home, Star, Tag, Truck, BarChart3, FileText,
  Plus, MoreHorizontal, ArrowUpRight, ArrowDownRight, Boxes, MessageSquare,
  Globe, CreditCard, Shield, Mail, ChevronDown, Eye, Pencil, Download, LogOut,
} from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { cn } from "@/lib/utils";

type TabKey =
  | "dash" | "orders" | "products" | "inventory" | "customers"
  | "reviews" | "discounts" | "shipping" | "analytics" | "pages" | "settings";

const NAV_GROUPS: { label: string; items: { key: TabKey; label: string; Icon: any; badge?: string }[] }[] = [
  {
    label: "Overview",
    items: [
      { key: "dash", label: "Dashboard", Icon: LayoutDashboard },
      { key: "analytics", label: "Analytics", Icon: BarChart3 },
    ],
  },
  {
    label: "Selling",
    items: [
      { key: "orders", label: "Orders", Icon: ShoppingBag, badge: "12" },
      { key: "products", label: "Products", Icon: Package },
      { key: "inventory", label: "Inventory", Icon: Boxes },
      { key: "discounts", label: "Discounts", Icon: Tag },
    ],
  },
  {
    label: "Customers",
    items: [
      { key: "customers", label: "Customers", Icon: Users },
      { key: "reviews", label: "Reviews", Icon: Star, badge: "3" },
    ],
  },
  {
    label: "Configuration",
    items: [
      { key: "shipping", label: "Shipping & zones", Icon: Truck },
      { key: "pages", label: "Pages & content", Icon: FileText },
      { key: "settings", label: "Settings", Icon: Settings },
    ],
  },
];

const STATS = [
  { label: "Revenue (30d)", value: "₹1,28,400", trend: "+12.4%", up: true, Icon: IndianRupee },
  { label: "Orders (30d)", value: "284", trend: "+8.2%", up: true, Icon: ShoppingBag },
  { label: "Customers", value: "1,204", trend: "+4.1%", up: true, Icon: Users },
  { label: "Conversion", value: "3.6%", trend: "-0.2%", up: false, Icon: TrendingUp },
];

const RECENT_ORDERS = [
  { id: "HE-12048293", customer: "Yusuf R.",   email: "yusuf@mail.com",   total: "₹1,398", status: "Paid",    date: "May 5, 2026", items: 2 },
  { id: "HE-12048291", customer: "Amina S.",   email: "amina@mail.com",   total: "₹749",   status: "Shipped", date: "May 4, 2026", items: 1 },
  { id: "HE-12048289", customer: "Khadija M.", email: "khadija@mail.com", total: "₹2,397", status: "Pending", date: "May 4, 2026", items: 3 },
  { id: "HE-12048285", customer: "Ahmad B.",   email: "ahmad@mail.com",   total: "₹499",   status: "Paid",    date: "May 3, 2026", items: 1 },
  { id: "HE-12048281", customer: "Layla H.",   email: "layla@mail.com",   total: "₹3,148", status: "Refunded",date: "May 2, 2026", items: 4 },
];

const SPARK = [12, 18, 14, 22, 19, 28, 24, 32, 30, 38, 36, 44, 41, 52];

const Admin = () => {
  const [tab, setTab] = useState<TabKey>("dash");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [productQuery, setProductQuery] = useState("");
  const [orderStatus, setOrderStatus] = useState<"all" | "Paid" | "Shipped" | "Pending" | "Refunded">("all");

  const filteredProducts = useMemo(
    () =>
      PRODUCTS.filter(
        (p) =>
          p.title.toLowerCase().includes(productQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(productQuery.toLowerCase()),
      ),
    [productQuery],
  );
  const filteredOrders = useMemo(
    () => (orderStatus === "all" ? RECENT_ORDERS : RECENT_ORDERS.filter((o) => o.status === orderStatus)),
    [orderStatus],
  );

  const activeLabel = NAV_GROUPS.flatMap((g) => g.items).find((i) => i.key === tab)?.label ?? "Dashboard";

  return (
    <div className="min-h-screen bg-muted/30 text-foreground flex">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed md:static inset-y-0 left-0 z-40 w-64 bg-foreground text-background flex-col transition-transform md:translate-x-0",
          sidebarOpen ? "translate-x-0 flex" : "-translate-x-full hidden md:flex",
        )}
      >
        <div className="h-14 px-4 flex items-center justify-between border-b border-background/10">
          <Link to="/" className="font-bold tracking-tight italic text-base">Hurayrah <span className="text-brand">·</span> Admin</Link>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden p-1.5 rounded hover:bg-background/10">
            <X className="h-4 w-4" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-4">
          {NAV_GROUPS.map((group) => (
            <div key={group.label}>
              <p className="px-3 text-[10px] uppercase tracking-wider text-background/40 mb-1.5 font-semibold">{group.label}</p>
              <ul className="space-y-0.5">
                {group.items.map(({ key, label, Icon, badge }) => (
                  <li key={key}>
                    <button
                      onClick={() => { setTab(key); setSidebarOpen(false); }}
                      className={cn(
                        "w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                        tab === key
                          ? "bg-brand text-brand-foreground"
                          : "text-background/75 hover:text-background hover:bg-background/10",
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span className="flex-1 text-left">{label}</span>
                      {badge && (
                        <span className={cn(
                          "text-[10px] font-semibold rounded-full px-1.5 py-0.5",
                          tab === key ? "bg-brand-foreground/20 text-brand-foreground" : "bg-background/15 text-background/85",
                        )}>{badge}</span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <div className="p-3 border-t border-background/10 flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-brand text-brand-foreground grid place-items-center text-xs font-bold">A</div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold truncate">Admin user</p>
            <p className="text-[10px] text-background/50 truncate">owner@hurayrah.shop</p>
          </div>
          <Link to="/" title="Back to store" className="p-1.5 rounded hover:bg-background/10">
            <LogOut className="h-3.5 w-3.5" />
          </Link>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top bar */}
        <header className="h-14 bg-background border-b border-border flex items-center gap-3 px-4 md:px-6 sticky top-0 z-20">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden p-1.5 rounded hover:bg-foreground/5">
            <Menu className="h-5 w-5" />
          </button>
          <div className="hidden md:flex items-center gap-1.5 text-xs text-foreground/55">
            <Home className="h-3.5 w-3.5" /> <span>/</span> <span className="text-foreground font-medium">{activeLabel}</span>
          </div>
          <div className="flex-1 max-w-md mx-auto md:mx-0 md:ml-6">
            <label className="flex items-center gap-2 rounded-md bg-muted/60 border border-transparent focus-within:border-brand focus-within:bg-background px-3 h-9 transition-colors">
              <Search className="h-4 w-4 text-foreground/50" />
              <input placeholder="Search orders, products, customers…" className="bg-transparent flex-1 text-sm outline-none" />
              <kbd className="hidden md:inline text-[10px] text-foreground/40 border border-border rounded px-1">⌘K</kbd>
            </label>
          </div>
          <div className="flex items-center gap-1">
            <button className="relative p-2 rounded-md hover:bg-foreground/5" title="Notifications">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-brand" />
            </button>
            <Link to="/" className="hidden md:inline-flex items-center gap-1.5 text-xs font-medium text-foreground/70 hover:text-foreground border border-border rounded-md px-2.5 h-8">
              <Eye className="h-3.5 w-3.5" /> View store
            </Link>
            <div className="h-8 w-8 rounded-full bg-brand text-brand-foreground grid place-items-center text-xs font-bold ml-1">A</div>
          </div>
        </header>

        {/* Page header */}
        <div className="px-4 md:px-6 py-5 border-b border-border bg-background">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight italic">{activeLabel}</h1>
              <p className="text-xs text-foreground/55 mt-1">
                {tab === "dash" && "Today's snapshot of your store performance."}
                {tab === "orders" && "Manage, fulfill and track every order."}
                {tab === "products" && "Your catalog — edit, organize and publish."}
                {tab === "inventory" && "Stock levels and low-stock alerts."}
                {tab === "customers" && "Everyone who's shopped with you."}
                {tab === "reviews" && "Moderate customer reviews and replies."}
                {tab === "discounts" && "Coupons, automatic discounts and campaigns."}
                {tab === "shipping" && "Zones, rates and carrier configuration."}
                {tab === "analytics" && "Deep insights across sales and traffic."}
                {tab === "pages" && "Static pages, banners and homepage sections."}
                {tab === "settings" && "Store preferences, payments and team."}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-1.5 text-xs font-medium border border-border rounded-md h-9 px-3 hover:bg-foreground/5">
                <Download className="h-3.5 w-3.5" /> Export
              </button>
              <button className="inline-flex items-center gap-1.5 text-xs font-semibold bg-brand text-brand-foreground rounded-md h-9 px-3 hover:opacity-95">
                <Plus className="h-3.5 w-3.5" /> {tab === "products" ? "Add product" : tab === "discounts" ? "New discount" : tab === "pages" ? "New page" : "New"}
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <main className="flex-1 p-4 md:p-6 space-y-6">
          {tab === "dash" && (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {STATS.map((s) => (
                  <div key={s.label} className="rounded-xl border border-border bg-background p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] uppercase tracking-wider text-foreground/55 font-semibold">{s.label}</span>
                      <div className="h-7 w-7 rounded-md bg-brand/10 grid place-items-center"><s.Icon className="h-3.5 w-3.5 text-brand" /></div>
                    </div>
                    <p className="mt-3 text-xl md:text-2xl font-bold">{s.value}</p>
                    <p className={cn("text-[11px] mt-1 font-medium inline-flex items-center gap-1", s.up ? "text-brand" : "text-destructive")}>
                      {s.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />} {s.trend} <span className="text-foreground/40 font-normal">vs prev</span>
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-3 gap-4">
                <Section title="Revenue trend" subtitle="Last 14 days" className="lg:col-span-2">
                  <Sparkline data={SPARK} />
                </Section>
                <Section title="Top products" subtitle="By units sold">
                  <ul className="divide-y divide-border">
                    {PRODUCTS.slice(0, 5).map((p, i) => (
                      <li key={p.id} className="py-2.5 flex items-center gap-3">
                        <span className="text-xs font-mono text-foreground/40 w-4">{i + 1}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{p.title}</p>
                          <p className="text-[11px] text-foreground/50 capitalize">{p.category}</p>
                        </div>
                        <span className="text-xs font-semibold">₹{p.price.toLocaleString()}</span>
                      </li>
                    ))}
                  </ul>
                </Section>
              </div>

              <Section title="Recent orders" action={<button onClick={() => setTab("orders")} className="text-xs text-brand font-semibold hover:underline">View all →</button>}>
                <OrdersTable rows={RECENT_ORDERS} />
              </Section>
            </>
          )}

          {tab === "orders" && (
            <Section title="All orders">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Filter className="h-4 w-4 text-foreground/55" />
                {(["all", "Paid", "Shipped", "Pending", "Refunded"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setOrderStatus(s)}
                    className={cn(
                      "rounded-full px-3 py-1 text-xs font-medium border transition-colors",
                      orderStatus === s
                        ? "bg-foreground text-background border-foreground"
                        : "border-border text-foreground/70 hover:bg-foreground/5",
                    )}
                  >
                    {s === "all" ? "All" : s}
                  </button>
                ))}
              </div>
              <OrdersTable rows={filteredOrders} />
            </Section>
          )}

          {tab === "products" && (
            <Section title={`${filteredProducts.length} products`}>
              <label className="flex items-center gap-2 rounded-md border border-border px-3 h-10 mb-4 focus-within:border-brand transition-colors">
                <Search className="h-4 w-4 text-foreground/55" />
                <input
                  value={productQuery}
                  onChange={(e) => setProductQuery(e.target.value)}
                  placeholder="Search by name or category…"
                  className="bg-transparent flex-1 text-sm outline-none"
                />
                {productQuery && (
                  <button onClick={() => setProductQuery("")} className="text-xs text-foreground/55 hover:text-foreground">Clear</button>
                )}
              </label>
              <div className="overflow-x-auto -mx-2">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-[11px] uppercase tracking-wider text-foreground/55 border-b border-border">
                      <th className="font-semibold py-2.5 px-2">Product</th>
                      <th className="font-semibold py-2.5 px-2">Category</th>
                      <th className="font-semibold py-2.5 px-2">Price</th>
                      <th className="font-semibold py-2.5 px-2">Stock</th>
                      <th className="font-semibold py-2.5 px-2">Status</th>
                      <th className="font-semibold py-2.5 px-2 w-10"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.slice(0, 14).map((p, i) => (
                      <tr key={p.id} className="border-b border-border last:border-0 hover:bg-muted/40">
                        <td className="py-3 px-2 font-medium">{p.title}</td>
                        <td className="py-3 px-2 capitalize text-foreground/70">{p.category}</td>
                        <td className="py-3 px-2">₹{p.price.toLocaleString()}</td>
                        <td className="py-3 px-2 text-foreground/70">{20 + (i % 8) * 5}</td>
                        <td className="py-3 px-2"><Badge tone="brand">Active</Badge></td>
                        <td className="py-3 px-2 text-foreground/40">
                          <button className="p-1 hover:text-foreground"><Pencil className="h-3.5 w-3.5" /></button>
                        </td>
                      </tr>
                    ))}
                    {filteredProducts.length === 0 && (
                      <tr><td colSpan={6} className="py-10 text-center text-sm text-foreground/55">No products match "{productQuery}"</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Section>
          )}

          {tab === "inventory" && (
            <div className="grid md:grid-cols-3 gap-4">
              <Section title="In stock"><p className="text-3xl font-bold">142</p><p className="text-xs text-foreground/55 mt-1">SKUs with healthy stock</p></Section>
              <Section title="Low stock"><p className="text-3xl font-bold text-destructive">8</p><p className="text-xs text-foreground/55 mt-1">Below reorder threshold</p></Section>
              <Section title="Out of stock"><p className="text-3xl font-bold">3</p><p className="text-xs text-foreground/55 mt-1">Hidden from shop</p></Section>
              <Section title="Low-stock items" className="md:col-span-3">
                <ul className="divide-y divide-border">
                  {PRODUCTS.slice(0, 5).map((p, i) => (
                    <li key={p.id} className="py-3 flex items-center gap-3">
                      <Boxes className="h-4 w-4 text-foreground/40" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{p.title}</p>
                        <p className="text-[11px] text-foreground/50">SKU: HE-{p.id.toUpperCase().slice(0, 8)}</p>
                      </div>
                      <span className="text-xs font-semibold text-destructive">{3 + i} left</span>
                      <button className="text-xs font-medium border border-border rounded-md px-2.5 py-1 hover:bg-foreground/5">Restock</button>
                    </li>
                  ))}
                </ul>
              </Section>
            </div>
          )}

          {tab === "customers" && (
            <Section title="Customers">
              <div className="grid sm:grid-cols-3 gap-3 mb-5">
                <Stat label="Total" value="1,204" />
                <Stat label="New (30d)" value="48" />
                <Stat label="Repeat rate" value="22%" />
              </div>
              <ul className="divide-y divide-border">
                {RECENT_ORDERS.map((o) => (
                  <li key={o.id} className="py-3 flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-brand/15 text-brand grid place-items-center font-bold text-xs">{o.customer[0]}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{o.customer}</p>
                      <p className="text-[11px] text-foreground/55">{o.email}</p>
                    </div>
                    <span className="text-xs text-foreground/60">{o.items} orders</span>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {tab === "reviews" && (
            <Section title="Pending reviews">
              <ul className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <li key={i} className="rounded-lg border border-border p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-full bg-foreground/10 grid place-items-center text-xs font-bold">U</div>
                        <span className="text-sm font-semibold">User {i}</span>
                        <span className="flex items-center gap-0.5 text-brand">{Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-3 w-3 fill-current" />)}</span>
                      </div>
                      <span className="text-[11px] text-foreground/50">2 days ago</span>
                    </div>
                    <p className="text-sm text-foreground/80">"Excellent quality and fast shipping. Highly recommend."</p>
                    <div className="flex items-center gap-2 mt-3">
                      <button className="text-xs font-semibold bg-brand text-brand-foreground rounded-md px-3 py-1.5">Approve</button>
                      <button className="text-xs font-medium border border-border rounded-md px-3 py-1.5 hover:bg-foreground/5">Reply</button>
                      <button className="text-xs font-medium text-destructive ml-auto">Reject</button>
                    </div>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {tab === "discounts" && (
            <Section title="Active discounts">
              <table className="w-full text-sm">
                <thead><tr className="text-left text-[11px] uppercase tracking-wider text-foreground/55 border-b border-border">
                  <th className="py-2.5 px-2 font-semibold">Code</th><th className="py-2.5 px-2 font-semibold">Type</th>
                  <th className="py-2.5 px-2 font-semibold">Value</th><th className="py-2.5 px-2 font-semibold">Used</th><th className="py-2.5 px-2 font-semibold">Status</th>
                </tr></thead>
                <tbody>
                  {[
                    { c: "WELCOME10", t: "Percentage", v: "10%", u: "128", s: "Active" },
                    { c: "FREESHIP", t: "Free shipping", v: "—", u: "84", s: "Active" },
                    { c: "EID2026",  t: "Fixed",      v: "₹200", u: "0",  s: "Scheduled" },
                  ].map((d) => (
                    <tr key={d.c} className="border-b border-border last:border-0">
                      <td className="py-3 px-2 font-mono font-semibold">{d.c}</td>
                      <td className="py-3 px-2 text-foreground/70">{d.t}</td>
                      <td className="py-3 px-2">{d.v}</td>
                      <td className="py-3 px-2 text-foreground/70">{d.u}</td>
                      <td className="py-3 px-2"><Badge tone={d.s === "Active" ? "brand" : "muted"}>{d.s}</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Section>
          )}

          {tab === "shipping" && (
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { z: "India (Domestic)", r: "₹49 standard · Free over ₹999", d: "3–6 business days" },
                { z: "GCC", r: "₹899 standard · ₹1,499 express", d: "5–9 business days" },
                { z: "Europe", r: "₹1,299 standard · ₹2,199 express", d: "7–14 business days" },
                { z: "North America", r: "₹1,499 standard · ₹2,499 express", d: "8–15 business days" },
                { z: "Rest of world", r: "₹1,799 standard", d: "10–21 business days" },
              ].map((z) => (
                <Section key={z.z} title={z.z} action={<button className="text-xs text-brand font-semibold hover:underline">Edit</button>}>
                  <p className="text-sm">{z.r}</p>
                  <p className="text-xs text-foreground/55 mt-1 inline-flex items-center gap-1"><Truck className="h-3 w-3" /> {z.d}</p>
                </Section>
              ))}
            </div>
          )}

          {tab === "analytics" && (
            <div className="grid md:grid-cols-2 gap-4">
              <Section title="Sessions" subtitle="Last 14 days"><Sparkline data={SPARK} /></Section>
              <Section title="Conversion" subtitle="Last 14 days"><Sparkline data={[2,3,2.5,3.2,3.6,3.4,3.8,3.6,4,3.9,4.2,4,4.3,4.5]} /></Section>
              <Section title="Top channels" className="md:col-span-2">
                <ul className="divide-y divide-border">
                  {[{n:"Direct",v:"42%"},{n:"Organic search",v:"28%"},{n:"Instagram",v:"18%"},{n:"Referral",v:"12%"}].map((c) => (
                    <li key={c.n} className="py-2.5 flex items-center justify-between"><span className="text-sm">{c.n}</span><span className="text-sm font-semibold">{c.v}</span></li>
                  ))}
                </ul>
              </Section>
            </div>
          )}

          {tab === "pages" && (
            <Section title="Pages">
              <ul className="divide-y divide-border">
                {[
                  { t: "Home", p: "/" },
                  { t: "About", p: "/about" },
                  { t: "Contact", p: "/contact" },
                  { t: "Shipping & returns", p: "/shipping" },
                  { t: "Privacy policy", p: "/privacy" },
                  { t: "Terms", p: "/terms" },
                ].map((pg) => (
                  <li key={pg.p} className="py-3 flex items-center gap-3">
                    <FileText className="h-4 w-4 text-foreground/40" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{pg.t}</p>
                      <p className="text-[11px] text-foreground/50 font-mono">{pg.p}</p>
                    </div>
                    <Badge tone="brand">Published</Badge>
                    <button className="p-1.5 hover:bg-foreground/5 rounded"><Pencil className="h-3.5 w-3.5" /></button>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {tab === "settings" && (
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { Icon: Globe, t: "Store details", d: "Name, contact, address, currency (INR base)." },
                { Icon: CreditCard, t: "Payments", d: "Razorpay, Stripe, COD configuration." },
                { Icon: Truck, t: "Shipping", d: "Zones, carriers, packaging defaults." },
                { Icon: Mail, t: "Notifications", d: "Order, shipping and review emails." },
                { Icon: Users, t: "Team & roles", d: "Invite staff, set permissions." },
                { Icon: Shield, t: "Security", d: "2FA, sessions and audit log." },
              ].map((s) => (
                <button key={s.t} className="text-left rounded-xl border border-border bg-background p-4 hover:border-brand transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-md bg-brand/10 grid place-items-center"><s.Icon className="h-4 w-4 text-brand" /></div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{s.t}</p>
                      <p className="text-xs text-foreground/55 mt-0.5">{s.d}</p>
                    </div>
                    <ChevronDown className="h-4 w-4 text-foreground/40 -rotate-90" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

function Section({ title, subtitle, children, action, className }: { title: string; subtitle?: string; children: React.ReactNode; action?: React.ReactNode; className?: string }) {
  return (
    <section className={cn("rounded-xl border border-border bg-background p-5", className)}>
      <div className="flex items-start justify-between mb-4 gap-3">
        <div>
          <h2 className="font-semibold text-base">{title}</h2>
          {subtitle && <p className="text-[11px] text-foreground/55 mt-0.5">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border p-3">
      <p className="text-[11px] uppercase tracking-wider text-foreground/55 font-semibold">{label}</p>
      <p className="text-xl font-bold mt-1">{value}</p>
    </div>
  );
}

function Badge({ children, tone = "muted" }: { children: React.ReactNode; tone?: "brand" | "muted" | "warn" | "danger" }) {
  const map = {
    brand: "bg-brand/12 text-brand",
    muted: "bg-foreground/8 text-foreground/70",
    warn:  "bg-amber-500/12 text-amber-600",
    danger:"bg-destructive/12 text-destructive",
  } as const;
  return <span className={cn("inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold", map[tone])}>{children}</span>;
}

function statusTone(s: string): "brand" | "muted" | "warn" | "danger" {
  if (s === "Paid") return "brand";
  if (s === "Shipped") return "muted";
  if (s === "Pending") return "warn";
  if (s === "Refunded") return "danger";
  return "muted";
}

function OrdersTable({ rows }: { rows: { id: string; customer: string; email?: string; total: string; status: string; date?: string; items?: number }[] }) {
  return (
    <div className="overflow-x-auto -mx-2">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-[11px] uppercase tracking-wider text-foreground/55 border-b border-border">
            <th className="font-semibold py-2.5 px-2">Order</th>
            <th className="font-semibold py-2.5 px-2">Customer</th>
            <th className="font-semibold py-2.5 px-2 hidden md:table-cell">Date</th>
            <th className="font-semibold py-2.5 px-2 hidden md:table-cell">Items</th>
            <th className="font-semibold py-2.5 px-2">Total</th>
            <th className="font-semibold py-2.5 px-2">Status</th>
            <th className="font-semibold py-2.5 px-2 w-10"></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-b border-border last:border-0 hover:bg-muted/40">
              <td className="py-3 px-2 font-mono text-xs">{r.id}</td>
              <td className="py-3 px-2">
                <p className="font-medium">{r.customer}</p>
                {r.email && <p className="text-[11px] text-foreground/50">{r.email}</p>}
              </td>
              <td className="py-3 px-2 hidden md:table-cell text-foreground/70">{r.date ?? "—"}</td>
              <td className="py-3 px-2 hidden md:table-cell text-foreground/70">{r.items ?? "—"}</td>
              <td className="py-3 px-2 font-semibold">{r.total}</td>
              <td className="py-3 px-2"><Badge tone={statusTone(r.status)}>{r.status}</Badge></td>
              <td className="py-3 px-2 text-foreground/40"><button className="p-1 hover:text-foreground"><MoreHorizontal className="h-4 w-4" /></button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Sparkline({ data }: { data: number[] }) {
  const w = 600, h = 140, pad = 8;
  const max = Math.max(...data), min = Math.min(...data);
  const xs = data.map((_, i) => pad + (i * (w - pad * 2)) / (data.length - 1));
  const ys = data.map((v) => h - pad - ((v - min) / (max - min || 1)) * (h - pad * 2));
  const path = xs.map((x, i) => `${i === 0 ? "M" : "L"}${x},${ys[i]}`).join(" ");
  const area = `${path} L${xs[xs.length - 1]},${h - pad} L${xs[0]},${h - pad} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-32">
      <defs>
        <linearGradient id="sparkFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--brand))" stopOpacity="0.25" />
          <stop offset="100%" stopColor="hsl(var(--brand))" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#sparkFill)" />
      <path d={path} fill="none" stroke="hsl(var(--brand))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default Admin;
