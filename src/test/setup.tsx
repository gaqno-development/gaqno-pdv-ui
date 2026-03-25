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

vi.mock("@gaqno-development/frontcore/components/ui", () => ({
  Card: ({ children, ...props }: any) => <div data-testid="card" {...props}>{children}</div>,
  CardContent: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  CardHeader: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  CardTitle: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  CardDescription: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  Button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  Badge: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  AnimatedEntry: ({ children }: any) => <div>{children}</div>,
  Skeleton: (props: any) => <div data-testid="skeleton" {...props} />,
  StatCard: ({ title, value }: any) => <div data-testid="stat-card">{title}: {value}</div>,
  SearchField: ({ value, onChange, placeholder }: any) => (
    <input data-testid="search-field" value={value} onChange={(e: any) => onChange(e.target.value)} placeholder={placeholder} />
  ),
  EmptyState: ({ title }: any) => <div data-testid="empty-state">{title}</div>,
  LoadingSkeleton: () => <div data-testid="loading-skeleton" />,
  DataTable: () => <div data-testid="data-table" />,
  Input: (props: any) => <input {...props} />,
  Label: ({ children, ...props }: any) => <label {...props}>{children}</label>,
  ChartConfig: {},
  ChartContainer: ({ children }: any) => <div>{children}</div>,
  ChartTooltip: () => null,
  ChartTooltipContent: () => null,
  ToastContainer: () => null,
  Dialog: ({ children, open, onOpenChange }: any) =>
    open ? <div data-testid="dialog">{children}</div> : null,
  DialogContent: ({ children }: any) => <div>{children}</div>,
  DialogHeader: ({ children }: any) => <div>{children}</div>,
  DialogTitle: ({ children }: any) => <div>{children}</div>,
  DialogFooter: ({ children }: any) => <div>{children}</div>,
}));

vi.mock("@gaqno-development/frontcore/utils", () => ({
  formatCurrency: (v: number) => `R$ ${v.toFixed(2)}`,
  formatDate: (v: string) => v,
  formatDateTime: (v: string) => v,
  formatRelativeTime: (v: string) => v,
}));

vi.mock("@gaqno-development/frontcore/config/erp-status", () => ({
  ERP_ORDER_STATUS_LABEL: {},
  ERP_ORDER_STATUS_VARIANT: {},
}));

vi.mock("@gaqno-development/frontcore/hooks/erp", () => ({
  useErpProducts: () => ({ data: [], isLoading: false, isError: false }),
  useErpOrders: () => ({ data: [], isLoading: false, isError: false }),
}));

vi.mock("@gaqno-development/frontcore/utils/api", () => ({
  coreAxiosClient: {
    erp: { get: vi.fn(), post: vi.fn() },
  },
}));

vi.mock("@tanstack/react-query", () => ({
  useQuery: () => ({ data: undefined, isLoading: false, isError: false }),
  useMutation: () => ({ mutateAsync: vi.fn(), isPending: false, error: null }),
  useQueryClient: () => ({ invalidateQueries: vi.fn() }),
  QueryClient: vi.fn(),
  QueryClientProvider: ({ children }: any) => <>{children}</>,
}));
