export interface PdvClosingBreakdownEntry {
  method: string;
  label: string;
  total: number;
  count: number;
}

export interface PdvClosingRecord {
  id: string;
  closedAt: string;
  transactionCount: number;
  totalAmount: number;
  breakdown: PdvClosingBreakdownEntry[];
}

const SHIFT_KEY = "pdv-shift-started-at";
const HISTORY_KEY = "pdv-closing-history";

export function startOfLocalDay(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

export function getShiftStartedAt(): string {
  if (typeof window === "undefined") return startOfLocalDay().toISOString();
  try {
    const raw = localStorage.getItem(SHIFT_KEY);
    if (raw) return raw;
    const iso = startOfLocalDay().toISOString();
    localStorage.setItem(SHIFT_KEY, iso);
    return iso;
  } catch {
    return startOfLocalDay().toISOString();
  }
}

export function setShiftStartedAt(iso: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SHIFT_KEY, iso);
  } catch {
    throw new Error("Não foi possível atualizar o turno.");
  }
}

export function effectiveShiftStartISO(shiftIso: string): string {
  const dayStart = startOfLocalDay();
  const shift = new Date(shiftIso);
  return shift.getTime() >= dayStart.getTime() ? shiftIso : dayStart.toISOString();
}

function isValidRecord(x: unknown): x is PdvClosingRecord {
  if (!x || typeof x !== "object") return false;
  const o = x as Record<string, unknown>;
  return (
    typeof o.id === "string" &&
    typeof o.closedAt === "string" &&
    typeof o.transactionCount === "number" &&
    typeof o.totalAmount === "number" &&
    Array.isArray(o.breakdown)
  );
}

export function loadClosingHistory(): PdvClosingRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isValidRecord);
  } catch {
    return [];
  }
}

export function appendClosingRecord(record: PdvClosingRecord): void {
  if (typeof window === "undefined") return;
  try {
    const prev = loadClosingHistory();
    const next = [record, ...prev].slice(0, 100);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
  } catch {
    throw new Error("Não foi possível salvar o fechamento.");
  }
}
