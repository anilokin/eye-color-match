import { Link } from "@tanstack/react-router";

const LINKS = [
  { to: "/", label: "Начало" },
  { to: "/about", label: "За нас" },
  { to: "/contact", label: "Контакти" },
  { to: "/privacy", label: "Поверителност" },
] as const;

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-2 px-5 py-3">
        <Link to="/" className="text-sm font-bold text-primary">
          Eye Color Match
        </Link>
        <nav aria-label="Основна навигация" className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
          {LINKS.map((l) => (
            <Link key={l.to} to={l.to} className="text-muted-foreground hover:text-foreground hover:underline">
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
