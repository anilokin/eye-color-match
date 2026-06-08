import { createFileRoute } from "@tanstack/react-router";

const BASE = "https://eye-color-match.lovable.app";
const PAGES = ["/", "/about", "/contact", "/privacy", "/terms"];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const today = new Date().toISOString().split("T")[0];
        const urls = PAGES.map(
          (p) =>
            `  <url><loc>${BASE}${p}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>${p === "/" ? "1.0" : "0.6"}</priority></url>`,
        ).join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml" },
        });
      },
    },
  },
});
