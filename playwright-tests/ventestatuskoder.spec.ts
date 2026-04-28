import { expect, test } from "@playwright/test";

test.describe("Ventestatuskoder", () => {
	test("shows ventestatuskoder data", async ({ page }) => {
		await page.goto("/fastedata/ventestatuskoder");
		await page.waitForLoadState("networkidle");

		const table = page.getByRole("table");
		await expect(table.getByRole("cell", { name: "ADAG" })).toBeVisible();
	});

	test("can sort ventestatuskoder by column", async ({ page }) => {
		await page.goto("/fastedata/ventestatuskoder");
		await page.waitForLoadState("networkidle");

		// Click the sort button inside the column header
		await page
			.getByRole("columnheader", { name: "Ventestatuskode" })
			.getByRole("button")
			.click();

		// URL should reflect sort state
		await expect(page).toHaveURL(/sort=kodeVentestatus/);
	});
});
