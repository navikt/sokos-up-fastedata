import { expect, test } from "@playwright/test";

test.describe("Fagomraader filter", () => {
  test("shows a row with Kode 'AAP' when filtering by AAP", async ({
    page,
  }) => {
    await page.goto("/fastedata/fagomraader");
    await page.waitForLoadState("networkidle");

    const input = page.getByLabel("Filtrer på fagområdekode og navn");
    await input.fill("AAP");
    await input.press("Enter");

    const table = page.getByRole("table");
    await expect(
      table.getByRole("cell", { name: "AAP", exact: true }),
    ).toBeVisible();
  });
});
