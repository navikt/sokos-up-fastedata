import { expect, test } from "@playwright/test";

test.describe("URL state persistence", () => {
	test("fagomraader filter persists in URL and survives reload", async ({
		page,
	}) => {
		await page.goto("/fastedata/fagomraader");
		await page.waitForLoadState("networkidle");

		const input = page.getByLabel("Filtrer på fagområdekode og navn");
		await input.fill("AAP");
		await input.press("Enter");

		// URL should contain the filter param
		await expect(page).toHaveURL(/fagomraade=AAP/);

		// Reload and verify filter is restored
		await page.reload();
		await page.waitForLoadState("networkidle");

		const table = page.getByRole("table");
		await expect(
			table.getByRole("cell", { name: "AAP", exact: true }),
		).toBeVisible();
	});

	test("faggrupper filter persists in URL and survives reload", async ({
		page,
	}) => {
		await page.goto("/fastedata/faggrupper");
		await page.waitForLoadState("networkidle");

		const input = page.getByLabel("Filtrer på faggruppekode og navn");
		await input.fill("BARNBRIL");
		await input.press("Enter");

		await expect(page).toHaveURL(/faggruppe=BARNBRIL/);

		await page.reload();
		await page.waitForLoadState("networkidle");

		const table = page.getByRole("table");
		await expect(table.getByRole("cell", { name: "BARNBRIL" })).toBeVisible();
	});

	test("sort state persists in URL", async ({ page }) => {
		await page.goto("/fastedata/ventestatuskoder");
		await page.waitForLoadState("networkidle");

		// Sort by clicking the sort button in the column header
		await page
			.getByRole("columnheader", { name: "Ventestatuskode" })
			.getByRole("button")
			.click();
		await expect(page).toHaveURL(/sort=kodeVentestatus/);

		// Reload and verify sort param persists
		await page.reload();
		await page.waitForLoadState("networkidle");
		await expect(page).toHaveURL(/sort=kodeVentestatus/);
	});

	test("klassekoder filters persist in URL across reload", async ({ page }) => {
		await page.goto("/fastedata/klassekoder");
		await page.waitForLoadState("networkidle");

		const klassekodeinput = page.getByLabel("Klassekode");
		await klassekodeinput.fill("VALUTAG");
		await page.getByRole("option", { name: /VALUTAGEVINST/ }).click();

		await expect(page).toHaveURL(/klassekode=VALUTAGEVINST/);

		await page.reload();
		await page.waitForLoadState("networkidle");

		const table = page.getByRole("table");
		await expect(
			table.getByRole("cell", { name: "VALUTAGEVINST" }),
		).toBeVisible();

		// Verify filter chip is restored from URL
		await expect(
			page.getByRole("button", { name: /Klassekode: VALUTAGEVINST/ }),
		).toBeVisible();
	});

	test("klassekoder historical toggle persists in URL", async ({ page }) => {
		await page.goto("/fastedata/klassekoder");
		await page.waitForLoadState("networkidle");

		// Toggle historical data on
		await page.getByLabel("Vis historiske data").click();
		await expect(page).toHaveURL(/historisk=true/);

		// Reload and verify toggle is still on
		await page.reload();
		await page.waitForLoadState("networkidle");
		await expect(page.getByLabel("Vis historiske data")).toBeChecked();
	});

	test("cross-page navigation preserves query params (fagomraader → klassekoder)", async ({
		page,
	}) => {
		await page.goto("/fastedata/fagomraader");
		await page.waitForLoadState("networkidle");

		// Filter to MSKATT which has klassekodeFinnes=true
		const input = page.getByLabel("Filtrer på fagområdekode og navn");
		await input.fill("MSKATT");
		await input.press("Enter");

		// Click the Klassekode link for MSKATT row
		await page
			.getByRole("row", { name: /MSKATT/ })
			.getByRole("link", { name: "Klassekode" })
			.click();
		await page.waitForLoadState("networkidle");

		// Should arrive at klassekoder page with fagomraade param
		await expect(page).toHaveURL(/klassekoder.*fagomraade=MSKATT/);
	});

	test("removing all filters clears URL params", async ({ page }) => {
		await page.goto("/fastedata/fagomraader?fagomraade=AAP");
		await page.waitForLoadState("networkidle");

		// Remove the filter chip
		await page.getByRole("button", { name: /AAP/ }).click();

		// URL should no longer have the param
		await expect(page).not.toHaveURL(/fagomraade=/);
	});
});
