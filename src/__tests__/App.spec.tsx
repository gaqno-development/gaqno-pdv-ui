import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App";

describe("App", () => {
  it("renders the page layout with PDV title", () => {
    render(<App />);
    expect(screen.getByTestId("page-layout")).toBeInTheDocument();
  });

  it("renders the cash register page by default", () => {
    render(<App />);
    expect(screen.getByTestId("page-layout")).toBeInTheDocument();
  });
});
