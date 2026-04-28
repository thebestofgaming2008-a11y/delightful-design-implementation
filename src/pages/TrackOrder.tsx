import { useState } from "react";
import { Package, Truck, CheckCircle2, Search } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";

const STEPS = [
  { Icon: CheckCircle2, label: "Order placed", done: true },
  { Icon: Package, label: "Packed", done: true },
  { Icon: Truck, label: "Shipped", done: true },
  { Icon: CheckCircle2, label: "Delivered", done: false },
];

const TrackOrder = () => {
  const [id, setId] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <SiteLayout>
      <div className="mx-auto max-w-[720px] px-4 md:px-8 py-12 md:py-20">
        <h1 className="text-foreground italic font-bold tracking-tight text-3xl md:text-4xl text-center">Track your order</h1>
        <p className="mt-2 text-center text-foreground/60">Enter your order ID and email to see status.</p>

        <form
          onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
          className="mt-8 rounded-2xl border border-border bg-background p-5 md:p-6 space-y-3"
        >
          <label className="block text-sm">
            <span className="block text-foreground/70 mb-1.5">Order ID</span>
            <input value={id} onChange={(e) => setId(e.target.value)} placeholder="HE-XXXXXXXX" required className="w-full rounded-md border border-border bg-background px-3 py-2.5 outline-none focus:border-brand" />
          </label>
          <label className="block text-sm">
            <span className="block text-foreground/70 mb-1.5">Email</span>
            <input type="email" required className="w-full rounded-md border border-border bg-background px-3 py-2.5 outline-none focus:border-brand" />
          </label>
          <button className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-brand text-brand-foreground font-semibold py-3 hover:opacity-95">
            <Search className="h-4 w-4" /> Track order
          </button>
        </form>

        {submitted && (
          <div className="mt-8 rounded-2xl border border-border bg-hero/30 p-6">
            <p className="text-sm text-foreground/65">Order <span className="font-mono font-semibold">{id || "HE-XXXXXXXX"}</span></p>
            <h2 className="mt-1 text-xl font-semibold">Out for delivery</h2>
            <ol className="mt-6 grid grid-cols-4 gap-2 text-center">
              {STEPS.map((s, i) => (
                <li key={i} className="flex flex-col items-center gap-2">
                  <span className={`h-10 w-10 grid place-items-center rounded-full ${s.done ? "bg-brand text-brand-foreground" : "bg-background border border-border text-foreground/40"}`}>
                    <s.Icon className="h-5 w-5" />
                  </span>
                  <span className={`text-xs ${s.done ? "text-foreground" : "text-foreground/50"}`}>{s.label}</span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </SiteLayout>
  );
};

export default TrackOrder;