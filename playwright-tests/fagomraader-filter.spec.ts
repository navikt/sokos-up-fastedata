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
  test("tests korreringsårsak and bilagstype buttons aswell as the link to klassekoder", async ({
    page,
  }) => {
    await page.goto("/fastedata/fagomraader");
    await page.waitForLoadState("networkidle");

    const input = page.getByLabel("Filtrer på fagområdekode og navn");
    await input.fill("MSKATT");
    await input.press("Enter");

    const table = page.getByRole("table");
    await expect(
      table.getByRole("cell", { name: "Manuell opprydding skatt" }),
    ).toBeVisible();

    await page.getByRole("button", { name: "Korrigeringsårsak" }).click();

    await expect(
      table.getByRole("cell", { name: "etteroppgjør" }),
    ).toBeVisible();

    await page.getByRole("button", { name: "Lukk" }).first().click();

    await expect(table.getByRole("cell", { name: "MSKATT" })).toBeVisible();

    await page.getByRole("button", { name: "Bilagstype" }).click();

    await expect(table.getByRole("cell", { name: "MEMO" })).toBeVisible();

    await page.getByRole("button", { name: "Lukk" }).first().click();

    await page.getByRole("link", { name: "Klassekode" }).first().click();

    await expect(page.getByText("Faste data - Klassekoder")).toBeVisible();
  });
});
