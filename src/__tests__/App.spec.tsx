import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import App from "../App";

describe("App", () => {
  it("renders PDV shell title", () => {
    render(<App />);
    expect(screen.getByText("Ponto de Venda")).toBeInTheDocument();
  });

  it("shows Caixa as the active section tab", () => {
    render(<App />);
    const nav = screen.getByRole("navigation", { name: "PDV sections" });
    expect(within(nav).getByRole("button", { name: "Caixa" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });
});
