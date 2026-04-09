import { MetadataRoute } from "next";
import { articles } from "@/data/mock-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://kollavm.se";

  const staticPages = [
    { url: base, priority: 1.0, changeFrequency: "daily" as const },
    { url: `${base}/matcher`, priority: 0.9, changeFrequency: "hourly" as const },
    { url: `${base}/hemma`, priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${base}/restauranger`, priority: 0.7, changeFrequency: "weekly" as const },
    { url: `${base}/artiklar`, priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${base}/tippa`, priority: 0.7, changeFrequency: "daily" as const },
    { url: `${base}/faq`, priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${base}/villkor`, priority: 0.3, changeFrequency: "yearly" as const },
  ];

  const articlePages = articles.map((article) => ({
    url: `${base}/artiklar/${article.slug}`,
    lastModified: new Date(article.date),
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));

  return [...staticPages, ...articlePages];
}
