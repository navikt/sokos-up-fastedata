import { expect, test } from "@playwright/test";

test.describe("Fagomraader filter", () => {
  test("should filter table results when a filter is applied", async ({
    page,
  }) => {
    await page.goto("/fastedata/fagomraader");
    await page.waitForLoadState("networkidle");

    await page
      .getByLabel("Filtrer på fagområdekode og navn")
      .fill("some filter value");

    const rows = await page.locator("table tbody tr").count();
    expect(rows).toBeGreaterThan(0);
  });
});
