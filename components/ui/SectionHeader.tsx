"use client";

// Shared header for large sections such as "Referanslar" or "Projeler"
// Keeping a single component avoids duplicated markup across pages and
// ensures visual consistency.

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface SectionHeaderProps {
  subtitle?: string;
  title: string;
  actionText?: string;
  actionHref?: string;
}

export default function SectionHeader({
  subtitle = '',
  title,
  actionText,
  actionHref,
}: SectionHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
      <div>
        {subtitle && (
          <span className="text-sm font-black text-secondary tracking-[0.2em] uppercase mb-4 block">
            {subtitle}
          </span>
        )}
        <h3 className="text-5xl font-black text-primary">{title}</h3>
      </div>
      {actionText && actionHref && (
        <Link
          href={actionHref}
          className="hidd
den md:flex items-center gap-2 text-secondary font-medium uppercase tracking-widest text-xs hover:text-primary transition-colors"
        >
          {actionText} <ArrowUpRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
}
