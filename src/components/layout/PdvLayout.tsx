import React from "react";
import {
  GlassBackground,
  GlassTopBar,
} from "@gaqno-development/frontcore/components/glass";
import { MobileBottomNav } from "@gaqno-development/frontcore/components/layout";
import { cn } from "@gaqno-development/frontcore/lib/utils";

const PDV_EYEBROW = "PDV · Operação";

export type PdvLayoutTab = {
  readonly id: string;
  readonly label: string;
  readonly icon: React.ReactNode;
};

export type PdvLayoutProps = {
  readonly children: React.ReactNode;
  readonly title: string;
  readonly tabs: readonly PdvLayoutTab[];
  readonly activeTab: string;
  readonly onTabChange: (id: string) => void;
  readonly description?: string;
};

export function PdvLayout({
  children,
  title,
  tabs,
  activeTab,
  onTabChange,
  description,
}: PdvLayoutProps) {
  const activeLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? title;
  return (
    <div className="relative flex h-full min-h-0 w-full flex-col">
      <GlassBackground intensity="subtle" />
      <div className="relative z-10 flex h-full min-h-0 w-full flex-col">
        <GlassTopBar
          eyebrow={PDV_EYEBROW}
          title={title}
          description={description ?? activeLabel}
        />
        <nav
          aria-label="PDV sections"
          className="hidden shrink-0 border-b border-border/50 bg-[color-mix(in_srgb,var(--card)_55%,transparent)] backdrop-blur-xl md:block"
        >
          <div className="flex items-center gap-1 overflow-x-auto px-6 py-2.5">
            {tabs.map((tab) => {
              const isActive = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onTabChange(tab.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "group inline-flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-all",
                    "text-muted-foreground hover:text-foreground",
                    isActive
                      ? "bg-[var(--pdv-accent-soft)] text-[var(--pdv-accent-strong)] shadow-[0_8px_24px_-14px_var(--pdv-accent-ring)] ring-1 ring-[var(--pdv-accent-ring)]"
                      : "hover:bg-[color-mix(in_srgb,var(--muted)_55%,transparent)]",
                  )}
                >
                  <span>{tab.icon}</span>
                  <span className="font-display tracking-tight">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
        <main className="mx-auto flex w-full min-h-0 flex-1 flex-col overflow-auto px-4 pb-20 pt-4 md:px-6 md:pb-6">
          {children}
        </main>
        {typeof document !== "undefined" && (
          <div className="md:hidden">
            <MobileBottomNav
              items={tabs.slice(0, 5).map((tab) => ({ id: tab.id, label: tab.label, icon: tab.icon }))}
              activeTab={activeTab}
              onTabChange={onTabChange}
              layoutId="pdvActiveTab"
            />
          </div>
        )}
      </div>
    </div>
  );
}
