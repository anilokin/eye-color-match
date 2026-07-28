import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-3xl px-5 py-8 text-sm text-muted-foreground">
        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <Link to="/" className="hover:text-foreground hover:underline">
            Начало
          </Link>
          <Link to="/about" className="hover:text-foreground hover:underline">
            За нас
          </Link>
          <Link to="/contact" className="hover:text-foreground hover:underline">
            Контакти
          </Link>
          <Link to="/privacy" className="hover:text-foreground hover:underline">
            Поверителност
          </Link>
          <Link to="/terms" className="hover:text-foreground hover:underline">
            Условия
          </Link>
          <Link to="/disclaimer" className="hover:text-foreground hover:underline">
            Отказ от отговорност
          </Link>

        </nav>
        <p className="mt-4 text-center text-xs">
          © {new Date().getFullYear()} Eye Color Match. Всички права запазени.
        </p>
      </div>
    </footer>
  );
}
