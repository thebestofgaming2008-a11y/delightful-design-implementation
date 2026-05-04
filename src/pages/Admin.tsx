import { useMemo, useState } from "react";
import { LayoutDashboard, Package, ShoppingBag, Users, Settings, TrendingUp, IndianRupee, Search, Filter } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PRODUCTS } from "@/data/products";
import { cn } from "@/lib/utils";

const NAV = [
  { key: "dash", label: "Dashboard", Icon: LayoutDashboard },
  { key: "orders", label: "Orders", Icon: ShoppingBag },
  { key: "products", label: "Products", Icon: Package },
  { key: "customers", label: "Customers", Icon: Users },
  { key: "settings", label: "Settings", Icon: Settings },
] as const;

const STATS = [
  { label: "Revenue (30d)", value: "₹1,28,400", trend: "+12.4%", Icon: IndianRupee },
  { label: "Orders (30d)", value: "284", trend: "+8.2%", Icon: ShoppingBag },
  { label: "Customers", value: "1,204", trend: "+4.1%", Icon: Users },
  { label: "Conversion", value: "3.6%", trend: "+0.4%", Icon: TrendingUp },
];

const RECENT_ORDERS = [
  { id: "HE-12048293", customer: "Yusuf R.", total: "₹1,398", status: "Paid" },
  { id: "HE-12048291", customer: "Amina S.", total: "₹749", status: "Shipped" },
  { id: "HE-12048289", customer: "Khadija M.", total: "₹2,397", status: "Pending" },
  { id: "HE-12048285", customer: "Ahmad B.", total: "₹499", status: "Paid" },
];

const Admin = () => {
  const [tab, setTab] = useState<(typeof NAV)[number]["key"]>("dash");
  const [productQuery, setProductQuery] = useState("");
  const [orderStatus, setOrderStatus] = useState<"all" | "Paid" | "Shipped" | "Pending">("all");

  const filteredProducts = useMemo(
    () =>
      PRODUCTS.filter((p) =>
        p.title.toLowerCase().includes(productQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(productQuery.toLowerCase()),
      ),
    [productQuery],
  );
  const filteredOrders = useMemo(
    () => (orderStatus === "all" ? RECENT_ORDERS : RECENT_ORDERS.filter((o) => o.status === orderStatus)),
    [orderStatus],
  );

  return (
    <SiteLayout>
      <div className="mx-auto max-w-[1440px] px-4 md:px-8 py-8 md:py-12">
        <div className="flex items-end justify-between mb-6 md:mb-8">
          <div>
            <h1 className="text-foreground italic font-bold tracking-tight text-2xl md:text-4xl">Admin</h1>
            <p className="text-foreground/60 text-sm mt-1">Hurayrah Essentials control room</p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-brand/10 text-brand px-3 py-1 text-xs font-semibold">
            <span className="h-2 w-2 rounded-full bg-brand" />
            All systems operational
          </span>
        </div>

        <div className="grid md:grid-cols-[220px_1fr] gap-6">
          <aside className="rounded-2xl border border-border bg-background p-2 h-fit md:sticky md:top-4 flex md:block overflow-x-auto no-scrollbar">
            {NAV.map(({ key, label, Icon }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={cn(
                  "text-left px-3 py-2.5 rounded-md text-sm font-medium flex items-center gap-2 transition-colors shrink-0 md:w-full",
                  tab === key ? "bg-brand text-brand-foreground" : "text-foreground/75 hover:bg-foreground/5",
                )}
              >
                <Icon className="h-4 w-4" /> {label}
              </button>
            ))}
          </aside>

          <div className="space-y-6">
            {tab === "dash" && (
              <>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                  {STATS.map((s) => (
                    <div key={s.label} className="rounded-2xl border border-border bg-background p-4 md:p-5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-foreground/55">{s.label}</span>
                        <s.Icon className="h-4 w-4 text-brand" />
                      </div>
                      <p className="mt-2 text-xl md:text-2xl font-semibold text-foreground">{s.value}</p>
                      <p className="text-xs text-brand mt-1 font-medium">{s.trend}</p>
                    </div>
                  ))}
                </div>
                <Section title="Recent orders">
                  <OrdersTable rows={RECENT_ORDERS} />
                </Section>
              </>
            )}
            {tab === "orders" && (
              <Section title="All orders">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Filter className="h-4 w-4 text-foreground/55" />
                  {(["all", "Paid", "Shipped", "Pending"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setOrderStatus(s)}
                      className={cn(
                        "rounded-full px-3 py-1 text-xs font-medium border transition-colors",
                        orderStatus === s
                          ? "bg-brand text-brand-foreground border-brand"
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
              <Section
                title="Products"
                action={<button className="rounded-md bg-brand text-brand-foreground text-sm font-semibold px-4 py-2 hover:opacity-95">+ Add product</button>}
              >
                <label className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 mb-3 focus-within:border-brand transition-colors">
                  <Search className="h-4 w-4 text-foreground/55" />
                  <input
                    value={productQuery}
                    onChange={(e) => setProductQuery(e.target.value)}
                    placeholder="Search products by name or category..."
                    className="bg-transparent flex-1 text-sm outline-none"
                  />
                  {productQuery && (
                    <button onClick={() => setProductQuery("")} className="text-xs text-foreground/55 hover:text-foreground">
                      Clear
                    </button>
                  )}
                </label>
                <div className="overflow-x-auto -mx-2">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-foreground/55 border-b border-border">
                        <th className="font-medium py-2 px-2">Product</th>
                        <th className="font-medium py-2 px-2">Category</th>
                        <th className="font-medium py-2 px-2">Price</th>
                        <th className="font-medium py-2 px-2">Stock</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.slice(0, 12).map((p) => (
                        <tr key={p.id} className="border-b border-border last:border-0">
                          <td className="py-3 px-2 font-medium">{p.title}</td>
                          <td className="py-3 px-2 capitalize text-foreground/70">{p.category}</td>
                          <td className="py-3 px-2">₹{p.price.toLocaleString()}</td>
                          <td className="py-3 px-2 text-foreground/70">In stock</td>
                        </tr>
                      ))}
                      {filteredProducts.length === 0 && (
                        <tr>
                          <td colSpan={4} className="py-8 text-center text-sm text-foreground/55">
                            No products match "{productQuery}"
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </Section>
            )}
            {tab === "customers" && (
              <Section title="Customers">
                <p className="text-sm text-foreground/65">1,204 customers · UI placeholder.</p>
              </Section>
            )}
            {tab === "settings" && (
              <Section title="Store settings">
                <p className="text-sm text-foreground/65">General, payments and shipping settings live here.</p>
              </Section>
            )}
          </div>
        </div>
      </div>
    </SiteLayout>
  );
};

function Section({ title, children, action }: { title: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-background p-5 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-foreground text-base md:text-lg">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function OrdersTable({ rows }: { rows: { id: string; customer: string; total: string; status: string }[] }) {
  return (
    <div className="overflow-x-auto -mx-2">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-foreground/55 border-b border-border">
            <th className="font-medium py-2 px-2">Order</th>
            <th className="font-medium py-2 px-2">Customer</th>
            <th className="font-medium py-2 px-2">Total</th>
            <th className="font-medium py-2 px-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-b border-border last:border-0">
              <td className="py-3 px-2 font-mono">{r.id}</td>
              <td className="py-3 px-2">{r.customer}</td>
              <td className="py-3 px-2 font-medium">{r.total}</td>
              <td className="py-3 px-2">
                <span className="inline-block rounded-full bg-brand/10 text-brand px-2.5 py-0.5 text-xs font-medium">{r.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;