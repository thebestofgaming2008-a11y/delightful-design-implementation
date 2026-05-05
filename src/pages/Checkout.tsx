import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { useShop } from "@/store/shop";
import { useFormatPrice } from "@/store/currency";

const Checkout = () => {
  const { cartLines, cartSubtotal, clearCart } = useShop();
  const formatPrice = useFormatPrice();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const shipping = cartSubtotal > 999 || cartSubtotal === 0 ? 0 : 99;
  const total = cartSubtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const orderId = `HE-${Date.now().toString().slice(-8)}`;
    setTimeout(() => {
      clearCart();
      navigate(`/order-confirmation?id=${orderId}`);
    }, 700);
  };

  return (
    <SiteLayout>
      <div className="mx-auto max-w-[1100px] px-4 md:px-8 py-8 md:py-12">
        <h1 className="text-foreground italic font-bold tracking-tight text-2xl md:text-4xl mb-6 md:mb-10">
          Checkout
        </h1>
        <form onSubmit={handleSubmit} className="grid lg:grid-cols-[1fr_380px] gap-8">
          <div className="space-y-8">
            <Section title="Contact">
              <Field label="Email" type="email" required />
              <Field label="Phone" type="tel" required />
            </Section>

            <Section title="Shipping address">
              <div className="grid grid-cols-2 gap-3">
                <Field label="First name" required />
                <Field label="Last name" required />
              </div>
              <Field label="Address" required />
              <Field label="Apartment, suite (optional)" />
              <div className="grid grid-cols-2 gap-3">
                <Field label="City" required />
                <Field label="Postal code" required />
              </div>
              <Field label="Country" defaultValue="India" required />
            </Section>

            <Section title="Payment">
              <p className="text-xs text-foreground/55 inline-flex items-center gap-1 mb-3">
                <Lock className="h-3 w-3" /> All payments are encrypted.
              </p>
              <Field label="Card number" placeholder="1234 1234 1234 1234" required />
              <div className="grid grid-cols-2 gap-3">
                <Field label="Expiry" placeholder="MM/YY" required />
                <Field label="CVC" placeholder="123" required />
              </div>
              <Field label="Name on card" required />
            </Section>
          </div>

          <aside className="rounded-2xl border border-border bg-hero/30 p-5 md:p-6 h-fit lg:sticky lg:top-6">
            <h2 className="font-semibold text-foreground text-lg">Order summary</h2>
            <ul className="mt-4 space-y-3">
              {cartLines.map(({ product, qty }) => (
                <li key={product.id} className="flex items-center gap-3 text-sm">
                  <span className="h-12 w-10 rounded bg-placeholder shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground line-clamp-1">{product.title}</p>
                    <p className="text-xs text-foreground/55">Qty {qty}</p>
                  </div>
                  <span className="font-medium">{formatPrice(product.price * qty)}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-4 space-y-2 text-sm border-t border-border pt-4">
              <div className="flex justify-between"><dt className="text-foreground/65">Subtotal</dt><dd className="font-medium">{formatPrice(cartSubtotal)}</dd></div>
              <div className="flex justify-between"><dt className="text-foreground/65">Shipping</dt><dd className="font-medium">{shipping === 0 ? "Free" : formatPrice(shipping)}</dd></div>
              <div className="border-t border-border pt-3 mt-3 flex justify-between text-base">
                <dt className="font-semibold">Total</dt>
                <dd className="font-bold text-hero-foreground">{formatPrice(total)}</dd>
              </div>
            </dl>
            <button
              type="submit"
              disabled={submitting || cartLines.length === 0}
              className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-md bg-brand text-brand-foreground font-semibold py-3 hover:opacity-95 transition-opacity disabled:opacity-50"
            >
              {submitting ? "Placing order…" : `Pay ${formatPrice(total)}`}
            </button>
          </aside>
        </form>
      </div>
    </SiteLayout>
  );
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-background p-5 md:p-6 space-y-3">
      <h2 className="font-semibold text-foreground text-lg">{title}</h2>
      {children}
    </section>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block text-sm">
      <span className="block text-foreground/70 mb-1.5">{label}</span>
      <input
        {...props}
        className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-foreground outline-none focus:border-brand transition-colors"
      />
    </label>
  );
}

export default Checkout;