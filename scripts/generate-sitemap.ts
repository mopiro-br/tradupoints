// Runs before `vite dev` and `vite build` (predev/prebuild hooks); writes public/sitemap.xml.

import { writeFileSync } from "fs";
import { resolve } from "path";

const BASE_URL = "https://tradupoints.com.br";

const SUPABASE_URL = "https://nmgdnsbtgvbvcnyjtnus.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tZ2Ruc2J0Z3ZidmNueWp0bnVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA5MzI1NDIsImV4cCI6MjA4NjUwODU0Mn0.kCkGkMGVUn-3sYpAf494Bgp3JieSGBinTOFp_u2cEsU";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const staticEntries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/quem-somos", changefreq: "monthly", priority: "0.8" },
  { path: "/servicos", changefreq: "monthly", priority: "0.9" },
  { path: "/cursos", changefreq: "monthly", priority: "0.8" },
  { path: "/depoimentos", changefreq: "monthly", priority: "0.6" },
  { path: "/blog", changefreq: "weekly", priority: "0.7" },
  { path: "/contato", changefreq: "yearly", priority: "0.7" },
  { path: "/politica-de-privacidade", changefreq: "yearly", priority: "0.3" },
  { path: "/politica-de-cookies", changefreq: "yearly", priority: "0.3" },
];

async function fetchBlogEntries(): Promise<SitemapEntry[]> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/blog_posts?select=slug,updated_at&published=eq.true`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      },
    );
    if (!res.ok) return [];
    const rows = (await res.json()) as { slug: string; updated_at: string }[];
    return rows.map((r) => ({
      path: `/blog/${r.slug}`,
      lastmod: r.updated_at ? r.updated_at.slice(0, 10) : undefined,
      changefreq: "monthly" as const,
      priority: "0.6",
    }));
  } catch {
    return [];
  }
}

function generateSitemap(entries: SitemapEntry[]) {
  const urls = entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n"),
  );

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
  ].join("\n");
}

const entries = [...staticEntries, ...(await fetchBlogEntries())];
writeFileSync(resolve("public/sitemap.xml"), generateSitemap(entries));
console.log(`sitemap.xml written (${entries.length} entries)`);
