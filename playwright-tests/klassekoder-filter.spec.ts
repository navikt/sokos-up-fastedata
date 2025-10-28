import { expect, test } from "@playwright/test";

test.describe("Klassekode filter", () => {
  test("Shows a row with VALUTAGEVINST when correct data is typed in filter", async ({
    page,
  }) => {
    await page.goto("/fastedata/klassekoder");
    await page.waitForLoadState("networkidle");

    const klassekodeInput = page.getByLabel("Klassekode");
    await klassekodeInput.fill("VALUTAGEVINST");
    await klassekodeInput.press("Enter");

    const table = page.getByRole("table");
    await expect(
      table.getByRole("cell", { name: "VALUTAGEVINST" }),
    ).toBeVisible();
  });

  test("Shows 'Ingen data tilgjengelig' when wrong inputs are put into the filter", async ({
    page,
  }) => {
    await page.goto("/fastedata/klassekoder");
    await page.waitForLoadState("networkidle");
    const table = page.getByRole("table");

    const artIdInput = page.getByLabel("Art-ID");
    await artIdInput.fill("80");
    await page.getByRole("option", { name: "80" }).click();

    const klassekodeInput = page.getByLabel("Klassekode");
    await klassekodeInput.fill("BANKSROCR");
    await page.getByRole("option", { name: /Legg til.*BANKSROCR/i }).click();
    await page.getByText("Faste data - Klassekoder").click();

    await expect(page.getByText("Ingen data tilgjengelig")).toBeVisible();

    await page.getByRole("button", { name: "Art-ID: 80" }).click();

    await expect(table.getByRole("cell", { name: "BANKSROCR" })).toBeVisible();
  });
});
