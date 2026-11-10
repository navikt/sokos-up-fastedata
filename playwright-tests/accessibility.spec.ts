import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = [
	{ path: "/faggrupper", heading: "Faste data - Faggrupper" },
	{ path: "/fagomraader", heading: "Faste data - Fagområde" },
	{ path: "/ventestatuskoder", heading: "Faste data - Ventestatuskoder" },
	{ path: "/klassekoder", heading: "Faste data - Klassekoder" },
	{ path: "/ventekriterier", heading: "Faste data - Ventekriterier" },
];

test.describe("Axe a11y", () => {
	for (const { path, heading } of routes) {
		test(`should not have any automatically detectable accessibility issues on ${path}`, async ({
			page,
		}) => {
			await page.goto(`/fastedata${path}`);

			await expect(
				page.getByRole("heading", { name: heading, exact: true }),
			).toBeVisible();

			const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

			expect(accessibilityScanResults.violations).toEqual([]);
		});
	}
});
