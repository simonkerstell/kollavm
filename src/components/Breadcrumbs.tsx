import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Crumb {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "KollaVM", item: "https://kollavm.se" },
      ...crumbs.map((crumb, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: crumb.label,
        ...(crumb.href ? { item: `https://kollavm.se${crumb.href}` } : {}),
      })),
    ],
  };

  return (
    <nav className="mb-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ol className="flex items-center gap-1 text-xs text-gray-500 flex-wrap">
        <li>
          <Link href="/" className="hover:text-[#f5c518] transition-colors">KollaVM</Link>
        </li>
        {crumbs.map((crumb, i) => (
          <li key={i} className="flex items-center gap-1">
            <ChevronRight size={10} className="text-gray-700" />
            {crumb.href ? (
              <Link href={crumb.href} className="hover:text-[#f5c518] transition-colors">{crumb.label}</Link>
            ) : (
              <span className="text-gray-400">{crumb.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
