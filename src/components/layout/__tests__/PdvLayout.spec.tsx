import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { PdvLayout } from "../PdvLayout";

vi.mock("@gaqno-development/frontcore/components/glass", () => ({
  GlassBackground: () => <div data-testid="glass-background" />,
  GlassTopBar: ({ title }: Record<string, unknown>) => (
    <header data-testid="glass-top-bar">{title as string}</header>
  ),
}));
vi.mock("@gaqno-development/frontcore/components/layout", () => ({
  MobileBottomNav: () => <nav data-testid="mobile-nav" />,
}));
vi.mock("@gaqno-development/frontcore/lib/utils", () => ({
  cn: (...args: unknown[]) => args.filter(Boolean).join(" "),
}));

describe("PdvLayout", () => {
  it("renders children inside glass chrome with title", () => {
    render(
      <PdvLayout
        title="Ponto de Venda"
        tabs={[
          { id: "caixa", label: "Caixa", icon: null },
          { id: "historico", label: "Histórico", icon: null },
        ]}
        activeTab="caixa"
        onTabChange={() => undefined}
      >
        <span data-testid="child">content</span>
      </PdvLayout>,
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
    expect(screen.getByTestId("glass-top-bar")).toHaveTextContent("Ponto de Venda");
  });
});
