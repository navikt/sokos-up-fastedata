import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = [
	"./fagrupper",
	"./fagomraader",
	"./ventestatuskoder",
	"./klassekoder",
	"./ventekriterier",
];

test.describe("Axe a11y", () => {
	for (const path of routes) {
		test(`should not have any automatically detectable accessibility issues on ${path}`, async ({
			page,
		}) => {
			await page.goto(`/fastedata${path}`);

			await page.waitForLoadState("networkidle");

			const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

			expect(accessibilityScanResults.violations).toEqual([]);
		});
	}
});
