import { expect, test } from "@playwright/test";

test.describe("Ventekriterier", () => {
	test("shows ventekriterier data", async ({ page }) => {
		await page.goto("/fastedata/ventekriterier");
		await page.waitForLoadState("networkidle");

		const table = page.getByRole("table");
		await expect(table.getByRole("cell", { name: "GH" })).toBeVisible();
		await expect(table.getByRole("cell", { name: "AY" })).toBeVisible();
	});
});
