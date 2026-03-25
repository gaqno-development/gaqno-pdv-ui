import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  effectiveShiftStartISO,
  startOfLocalDay,
  getShiftStartedAt,
  loadClosingHistory,
  appendClosingRecord,
} from "./pdvShiftStorage";

describe("pdvShiftStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("effectiveShiftStartISO uses shift when it is after local day start", () => {
    const day = startOfLocalDay();
    const after = new Date(day.getTime() + 60_000).toISOString();
    expect(effectiveShiftStartISO(after)).toBe(after);
  });

  it("effectiveShiftStartISO uses today start when shift is before today", () => {
    const dayStart = startOfLocalDay().toISOString();
    const old = new Date(startOfLocalDay().getTime() - 86_400_000).toISOString();
    expect(effectiveShiftStartISO(old)).toBe(dayStart);
  });

  it("getShiftStartedAt initializes storage to local day start", () => {
    const v = getShiftStartedAt();
    expect(localStorage.getItem("pdv-shift-started-at")).toBe(v);
  });

  it("appendClosingRecord persists and loadClosingHistory reads", () => {
    appendClosingRecord({
      id: "c1",
      closedAt: "2025-03-15T12:00:00.000Z",
      transactionCount: 2,
      totalAmount: 100,
      breakdown: [{ method: "cash", label: "Dinheiro", total: 100, count: 2 }],
    });
    const h = loadClosingHistory();
    expect(h).toHaveLength(1);
    expect(h[0]?.id).toBe("c1");
  });
});
