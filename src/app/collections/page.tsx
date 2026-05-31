import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { COLLECTIONS } from "@/constants";

export default function CollectionsPage1() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-text font-sans">
      <main className="pt-28 px-5 sm:px-10 pb-20 max-w-6xl mx-auto">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.24em] text-brand-accent mb-3">Collections</p>
          <h1 className="text-4xl sm:text-5xl font-light tracking-[0.01em]">Shop MOXY</h1>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {COLLECTIONS.map((collection) => (
            <Link
              key={collection.slug}
              href={`/${collection.slug}`}
              className="group border border-brand-text/10 bg-white/30 p-6 min-h-56 flex flex-col justify-end no-underline text-brand-text hover:border-brand-accent transition-colors"
            >
              <p className="text-[10px] uppercase tracking-[0.24em] text-brand-accent mb-3">{collection.eyebrow}</p>
              <h2 className="text-3xl font-light mb-3">{collection.title}</h2>
              <p className="text-sm text-brand-muted leading-7">{collection.description}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
