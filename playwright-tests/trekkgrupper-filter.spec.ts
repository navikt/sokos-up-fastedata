import { expect, test } from "@playwright/test";

test.describe("Trekkgrupper filter", () => {
	test("shows matching fagomraader when filtering by trekkgruppe", async ({
		page,
	}) => {
		await page.goto("/fastedata/trekkgrupper");
		await page.waitForLoadState("networkidle");

		const input = page.getByLabel("Filtrer på trekkgruppe eller fagområde");
		await input.fill("AVRG");
		await input.press("Enter");

		await expect(
			page.getByRole("button", { name: "Trekkgruppe: AVRG" }),
		).toBeVisible();

		const table = page.getByRole("table");
		await expect(
			table.getByRole("cell", { name: "MEFOGNY", exact: true }),
		).toBeVisible();
		await expect(
			table.getByRole("cell", { name: "EFOGNY", exact: true }),
		).toBeVisible();
		await expect(
			table.getByRole("cell", { name: "PENAFP", exact: true }),
		).toHaveCount(0);
	});

	test("shows matching trekkgruppe when filtering by fagomraade", async ({
		page,
	}) => {
		await page.goto("/fastedata/trekkgrupper");
		await page.waitForLoadState("networkidle");

		const input = page.getByLabel("Filtrer på trekkgruppe eller fagområde");
		await input.fill("IT18");
		await input.press("Enter");

		await expect(
			page.getByRole("button", { name: "Fagområde: IT18" }),
		).toBeVisible();

		const table = page.getByRole("table");
		await expect(
			table.getByRole("cell", { name: "LIV", exact: true }),
		).toBeVisible();
		await expect(
			table.getByRole("cell", { name: "IT18", exact: true }),
		).toBeVisible();
		await expect(
			table.getByRole("cell", { name: "AVRG", exact: true }),
		).toHaveCount(0);
	});
});
