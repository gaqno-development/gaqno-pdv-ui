import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PdvLayout } from "../PdvLayout";

describe("PdvLayout", () => {
  it("renders children inside a FeatureGuard", () => {
    render(
      <PdvLayout>
        <span data-testid="child">content</span>
      </PdvLayout>
    );
    expect(screen.getByTestId("feature-guard")).toBeInTheDocument();
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });
});
