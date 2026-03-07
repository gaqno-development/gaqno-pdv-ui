import { describe, it, expect } from "vitest";
import { MENU_ITEMS, type MenuItem } from "../menu";
import { FeaturePermissionLevel } from "@gaqno-development/frontcore/types/user";

describe("MENU_ITEMS", () => {
  it("contains 6 menu items", () => {
    expect(MENU_ITEMS).toHaveLength(6);
  });

  it("has unique hrefs", () => {
    const hrefs = MENU_ITEMS.map((item) => item.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });

  it("each item has required properties", () => {
    MENU_ITEMS.forEach((item: MenuItem) => {
      expect(item.label).toBeDefined();
      expect(item.href).toBeDefined();
      expect(item.icon).toBeDefined();
      expect(item.requiredFeature).toBeDefined();
      expect(item.requiredPermission).toBeDefined();
    });
  });

  it("maps known route labels", () => {
    const labels = MENU_ITEMS.map((i) => i.label);
    expect(labels).toContain("Caixa");
    expect(labels).toContain("Nova Venda");
    expect(labels).toContain("Produtos");
    expect(labels).toContain("Histórico");
    expect(labels).toContain("Fechamento");
    expect(labels).toContain("Configurações");
  });

  it("restricts admin items to ADMIN permission level", () => {
    const adminItems = MENU_ITEMS.filter((i) => i.label === "Fechamento" || i.label === "Configurações");
    adminItems.forEach((item) => {
      expect(item.requiredPermission).toBe(FeaturePermissionLevel.ADMIN);
    });
  });
});
