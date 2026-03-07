import "@testing-library/jest-dom";
import React from "react";
import { vi } from "vitest";

vi.mock("@gaqno-development/frontcore/i18n", () => ({
  initI18n: vi.fn(),
  I18nProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useTranslation: () => ({ t: (key: string) => key }),
}));

vi.mock("@gaqno-development/frontcore/components/layout", () => ({
  PageLayout: ({ children, title }: { children: React.ReactNode; title?: string }) => (
    <div data-testid="page-layout" data-title={title}>
      {children}
    </div>
  ),
}));

vi.mock("@gaqno-development/frontcore/components/guards", () => ({
  FeatureGuard: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="feature-guard">{children}</div>
  ),
}));
