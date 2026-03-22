import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PdvLayout } from "../PdvLayout";

describe("PdvLayout", () => {
  it("renders children", () => {
    render(
      <PdvLayout>
        <span data-testid="child">content</span>
      </PdvLayout>
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });
});
