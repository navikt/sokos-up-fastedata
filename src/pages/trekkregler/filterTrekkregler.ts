import type { Trekkregel } from "../../types/Trekkregel";

export interface TrekkregelFilters {
	trekktype: string[];
	fagomraade: string[];
}

export const filterTrekkregler = (
	data: Trekkregel[],
	filters: TrekkregelFilters,
): Trekkregel[] => {
	return data.filter((item) => {
		const matchesTrekktype =
			filters.trekktype.length === 0 ||
			filters.trekktype.some((f) =>
				item.kodeTrekktype.toLowerCase().includes(f.toLowerCase()),
			);

		const matchesFagomraade =
			filters.fagomraade.length === 0 ||
			filters.fagomraade.some((f) =>
				item.fagomraader.some((fo) =>
					fo.toLowerCase().includes(f.toLowerCase()),
				),
			);

		return matchesTrekktype && matchesFagomraade;
	});
};

export const getAvailableOptions = (data: Trekkregel[]) => {
	return {
		trekktype: [...new Set(data.map((item) => item.kodeTrekktype))].sort(),
		fagomraade: [...new Set(data.flatMap((item) => item.fagomraader))].sort(),
	};
};
