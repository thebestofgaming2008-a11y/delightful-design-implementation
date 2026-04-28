import { Link } from "react-router-dom";
import { useState } from "react";
import { User, Package, Heart, MapPin, LogOut } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { cn } from "@/lib/utils";

const TABS = [
  { key: "overview", label: "Overview", Icon: User },
  { key: "orders", label: "Orders", Icon: Package },
  { key: "wishlist", label: "Wishlist", Icon: Heart },
  { key: "addresses", label: "Addresses", Icon: MapPin },
] as const;

const ORDERS = [
  { id: "HE-12048293", date: "Apr 21, 2026", total: "₹1,398", status: "Delivered" },
  { id: "HE-12041102", date: "Apr 02, 2026", total: "₹749", status: "Shipped" },
  { id: "HE-12029881", date: "Mar 14, 2026", total: "₹2,397", status: "Delivered" },
];

const Account = () => {
  const [tab, setTab] = useState<(typeof TABS)[number]["key"]>("overview");

  return (
    <SiteLayout>
      <div className="mx-auto max-w-[1200px] px-4 md:px-8 py-8 md:py-12">
        <div className="flex items-end justify-between mb-6 md:mb-10">
          <div>
            <h1 className="text-foreground italic font-bold tracking-tight text-2xl md:text-4xl">My account</h1>
            <p className="text-foreground/60 text-sm mt-1">Welcome back, Yusuf</p>
          </div>
          <Link to="/login" className="text-sm text-foreground/60 hover:text-brand inline-flex items-center gap-1">
            <LogOut className="h-4 w-4" /> Sign out
          </Link>
        </div>

        <div className="grid md:grid-cols-[220px_1fr] gap-8">
          <aside className="rounded-2xl border border-border bg-background p-2 h-fit">
            {TABS.map(({ key, label, Icon }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={cn(
                  "w-full text-left px-3 py-2.5 rounded-md text-sm font-medium flex items-center gap-2 transition-colors",
                  tab === key ? "bg-brand text-brand-foreground" : "text-foreground/75 hover:bg-foreground/5",
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </aside>

          <div>
            {tab === "overview" && (
              <div className="grid sm:grid-cols-2 gap-4">
                <Card title="Profile">
                  <p className="text-sm"><span className="text-foreground/60">Name:</span> Yusuf Rahman</p>
                  <p className="text-sm"><span className="text-foreground/60">Email:</span> yusuf@example.com</p>
                  <button className="mt-3 text-sm text-brand font-medium hover:underline">Edit profile</button>
                </Card>
                <Card title="Default address">
                  <p className="text-sm text-foreground/75">221B Baker Street<br/>Mumbai, 400001<br/>India</p>
                </Card>
                <Card title="Recent orders" className="sm:col-span-2">
                  <OrdersTable />
                </Card>
              </div>
            )}
            {tab === "orders" && (
              <Card title="All orders"><OrdersTable /></Card>
            )}
            {tab === "wishlist" && (
              <Card title="Wishlist">
                <Link to="/wishlist" className="text-sm text-brand hover:underline font-medium">Open full wishlist →</Link>
              </Card>
            )}
            {tab === "addresses" && (
              <Card title="Saved addresses">
                <p className="text-sm text-foreground/75">221B Baker Street, Mumbai, 400001, India</p>
                <button className="mt-3 text-sm text-brand font-medium hover:underline">+ Add new address</button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </SiteLayout>
  );
};

function Card({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={cn("rounded-2xl border border-border bg-background p-5 md:p-6", className)}>
      <h2 className="font-semibold text-foreground text-base mb-3">{title}</h2>
      {children}
    </section>
  );
}

function OrdersTable() {
  return (
    <div className="overflow-x-auto -mx-2">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-foreground/55 border-b border-border">
            <th className="font-medium py-2 px-2">Order</th>
            <th className="font-medium py-2 px-2">Date</th>
            <th className="font-medium py-2 px-2">Total</th>
            <th className="font-medium py-2 px-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {ORDERS.map((o) => (
            <tr key={o.id} className="border-b border-border last:border-0">
              <td className="py-3 px-2 font-mono">{o.id}</td>
              <td className="py-3 px-2 text-foreground/70">{o.date}</td>
              <td className="py-3 px-2 font-medium">{o.total}</td>
              <td className="py-3 px-2">
                <span className="inline-block rounded-full bg-brand/10 text-brand px-2.5 py-0.5 text-xs font-medium">
                  {o.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Account;