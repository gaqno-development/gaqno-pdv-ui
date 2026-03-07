import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App";

describe("App", () => {
  it("renders the page layout with PDV title", () => {
    render(<App />);
    expect(screen.getByTestId("page-layout")).toBeInTheDocument();
  });

  it("displays placeholder text", () => {
    render(<App />);
    expect(screen.getByTestId("pdv-placeholder")).toBeInTheDocument();
  });
});
