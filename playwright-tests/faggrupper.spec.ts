import { expect, test } from "@playwright/test";

test.describe("Faggrupper", () => {
	test("shows faggrupper data and can filter by name", async ({ page }) => {
		await page.goto("/fastedata/faggrupper");
		await page.waitForLoadState("networkidle");

		const table = page.getByRole("table");
		await expect(table.getByRole("cell", { name: "KORONA3" })).toBeVisible();

		const input = page.getByLabel("Filtrer på faggruppekode og navn");
		await input.fill("BARNBRIL");
		await input.press("Enter");

		await expect(table.getByRole("cell", { name: "BARNBRIL" })).toBeVisible();
		await expect(
			table.getByRole("cell", { name: "KORONA3" }),
		).not.toBeVisible();
	});

	test("navigates from faggrupper to fagomraader detail page", async ({
		page,
	}) => {
		await page.goto("/fastedata/faggrupper");
		await page.waitForLoadState("networkidle");

		await page.getByRole("link", { name: "Fagområder" }).first().click();

		await expect(
			page.getByText("Fagområder som tilhører Faggruppen:"),
		).toBeVisible();
	});

	test("navigates from faggrupper to kjoreplaner detail page", async ({
		page,
	}) => {
		await page.goto("/fastedata/faggrupper");
		await page.waitForLoadState("networkidle");

		// KORONA3 has kjoreplaner in mock data
		const kjoreplanLink = page.getByRole("link", { name: /2025/ }).first();
		await kjoreplanLink.click();

		await expect(page.getByText("Kjøreplaner for KORONA3")).toBeVisible();
	});
});
