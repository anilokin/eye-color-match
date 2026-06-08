import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { SiteFooter } from "./SiteFooter";

export function LegalLayout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4">
          <Link to="/" className="text-sm font-semibold text-primary hover:underline">
            Eye Color Match
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Начало
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-10">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">{title}</h1>
        <article className="legal-prose mt-6 space-y-4 text-base leading-relaxed text-foreground">
          {children}
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
