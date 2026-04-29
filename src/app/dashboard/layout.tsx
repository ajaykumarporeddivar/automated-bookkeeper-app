'use client'
import { AppSidebar, AppHeader, DemoBanner } from '@/components/layout';
import { FORGE } from '@/lib/data';

const navItems = FORGE.map((item) => ({
  icon: <LucideIcon size={16} />,
  label: item.name,
  href: `/dashboard/${item.slug}`,
}));

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-zinc-50 pt-9">
      <AppSidebar items={navItems} projectName="Automated Bookkeeper" />
      <div className="flex-1 ml-64 flex flex-col min-h-full">
        <DemoBanner />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}