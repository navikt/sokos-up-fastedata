import { expect, test } from "@playwright/test";

test.describe("Klassekode filter", () => {
	test("Shows a row with VALUTAGEVINST when correct data is typed in filter", async ({
		page,
	}) => {
		await page.goto("/fastedata/klassekoder");
		await page.waitForLoadState("networkidle");

		const klassekodeinput = page.getByLabel("Klassekode");
		await klassekodeinput.fill("VALUTAGEVINST");
		await klassekodeinput.press("Enter");

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

		const artidinput = page.getByLabel("Art-ID");
		await artidinput.fill("80");
		await page.getByRole("option", { name: "80" }).click();

		const klassekodeinput = page.getByLabel("Klassekode");
		await klassekodeinput.fill("BANKSROCR");
		await page.getByRole("option", { name: /Legg til.*BANKSROCR/i }).click();
		await page.getByText("Faste data - Klassekoder").click();

		await expect(page.getByText("Ingen data tilgjengelig")).toBeVisible();

		await page.getByRole("button", { name: "Art-ID: 80" }).click();

		await expect(table.getByRole("cell", { name: "BANKSROCR" })).toBeVisible();
	});

	test("Tests link from klassekoder to fagomraader", async ({ page }) => {
		await page.goto("/fastedata/klassekoder");
		await page.waitForLoadState("networkidle");

		const underkontoinput = page.getByLabel("Underkontonr");
		await underkontoinput.fill("8900");
		await page.getByRole("option", { name: "8900" }).click();

		const fagomraadeinput = page.getByLabel("Fagområde");
		await fagomraadeinput.fill("MPENBAL");
		await page.getByRole("option", { name: "MPENBAL" }).click();

		await page.getByRole("link", { name: "Fagområder" }).click();

		const table = page.getByRole("table");
		await expect(table.getByRole("cell", { name: "MOSALLE" })).toBeVisible();
	});
});
