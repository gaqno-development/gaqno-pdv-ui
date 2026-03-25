import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { usePdvClosing } from "./usePdvClosing";

const mocks = vi.hoisted(() => ({
  bumpShiftAfterClose: vi.fn(),
  appendClosingRecord: vi.fn(),
}));

vi.mock("./usePdvHistory", () => ({
  usePdvHistory: () => ({
    todaySales: [
      {
        id: "o1",
        total: 10,
        notes: "Venda PDV - CASH | Total: 10.00",
        createdAt: "2025-03-15T10:00:00.000Z",
      },
    ],
    todayTotal: 10,
    isLoading: false,
    bumpShiftAfterClose: mocks.bumpShiftAfterClose,
  }),
}));

vi.mock("../utils/pdvShiftStorage", () => ({
  appendClosingRecord: (...args: unknown[]) => mocks.appendClosingRecord(...args),
  loadClosingHistory: () => [],
}));

describe("usePdvClosing", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("closeTurn registra fechamento e avança o turno", async () => {
    const client = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(QueryClientProvider, { client }, children);

    const { result } = renderHook(() => usePdvClosing(), { wrapper });

    await act(async () => {
      await result.current.closeTurn();
    });

    expect(mocks.appendClosingRecord).toHaveBeenCalled();
    expect(mocks.bumpShiftAfterClose).toHaveBeenCalled();
  });
});
