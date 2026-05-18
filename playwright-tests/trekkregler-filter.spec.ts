import { expect, test } from "@playwright/test";

test.describe("Trekkregler filter", () => {
	test("shows matching row when filtering by trekktype", async ({ page }) => {
		await page.goto("/fastedata/trekkregler");
		await page.waitForLoadState("networkidle");

		const input = page.getByRole("combobox", { name: "Trekktype" });
		await input.fill("SKATT");
		await page.getByRole("option", { name: "SKATT" }).click();

		await expect(
			page.getByRole("button", { name: "Trekktype: SKATT" }),
		).toBeVisible();

		const table = page.getByRole("table");
		await expect(
			table.getByRole("cell", { name: "SKATT", exact: true }),
		).toBeVisible();
		await expect(
			table.getByRole("cell", { name: "BIDRAG", exact: true }),
		).toHaveCount(0);
	});

	test("shows matching rows when filtering by fagområde", async ({ page }) => {
		await page.goto("/fastedata/trekkregler");
		await page.waitForLoadState("networkidle");

		const input = page.getByRole("combobox", { name: "Fagområde" });
		await input.fill("PENAFP");
		await page.getByRole("option", { name: "PENAFP" }).click();

		await expect(
			page.getByRole("button", { name: "Fagområde: PENAFP" }),
		).toBeVisible();

		const table = page.getByRole("table");
		await expect(
			table.getByRole("cell", { name: "BIDRAG", exact: true }),
		).toBeVisible();
		await expect(
			table.getByRole("cell", { name: "KRED", exact: true }),
		).toBeVisible();
		await expect(
			table.getByRole("cell", { name: "SKATT", exact: true }),
		).toHaveCount(0);
		await expect(
			table.getByRole("cell", { name: "FEIL", exact: true }),
		).toHaveCount(0);
	});

	test("navigates to kjøreplan page and shows PLAN/AVSL tabs", async ({
		page,
	}) => {
		await page.goto("/fastedata/trekkregler");
		await page.waitForLoadState("networkidle");

		await page.getByRole("link", { name: "Kjøreplan" }).first().click();
		await page.waitForLoadState("networkidle");

		await expect(
			page.getByRole("heading", { name: "Faste data - Trekkregler" }),
		).toBeVisible();
		await expect(page.getByRole("tab", { name: "Planlagt" })).toBeVisible();
		await expect(page.getByRole("tab", { name: "Avsluttet" })).toBeVisible();

		const table = page.getByRole("table");
		await expect(
			table.getByRole("cell", { name: "PLAN", exact: true }).first(),
		).toBeVisible();

		await page.getByRole("tab", { name: "Avsluttet" }).click();
		await expect(
			table.getByRole("cell", { name: "AVSL", exact: true }).first(),
		).toBeVisible();
	});
});
