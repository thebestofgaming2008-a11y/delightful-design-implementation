import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: mode === "signin" ? "Signed in" : "Account created", description: "Welcome to Hurayrah Essentials." });
    navigate("/account");
  };

  return (
    <SiteLayout>
      <div className="mx-auto max-w-[460px] px-4 md:px-8 py-12 md:py-20">
        <div className="rounded-2xl border border-border bg-background p-6 md:p-8 shadow-sm">
          <h1 className="text-foreground italic font-bold tracking-tight text-2xl md:text-3xl text-center">
            {mode === "signin" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mt-1 text-center text-sm text-foreground/60">
            {mode === "signin" ? "Sign in to continue" : "Join the Hurayrah Essentials family"}
          </p>

          <form onSubmit={submit} className="mt-6 space-y-3">
            {mode === "signup" && (
              <Field label="Full name" required />
            )}
            <Field label="Email" type="email" required />
            <Field label="Password" type="password" required />
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center rounded-md bg-brand text-brand-foreground font-semibold py-3 hover:opacity-95 transition-opacity"
            >
              {mode === "signin" ? "Sign in" : "Create account"}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-foreground/65">
            {mode === "signin" ? "New here?" : "Already a member?"}{" "}
            <button onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="text-brand font-semibold hover:underline">
              {mode === "signin" ? "Create an account" : "Sign in"}
            </button>
          </p>
          <p className="mt-3 text-center text-xs text-foreground/50">
            <Link to="/" className="hover:text-brand">← Back to home</Link>
          </p>
        </div>
      </div>
    </SiteLayout>
  );
};

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

export default Login;