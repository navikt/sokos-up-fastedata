import { Alert, Heading } from "@navikt/ds-react";
import { useMemo } from "react";
import { useSearchParams } from "react-router";
import { useGetKlassekoder } from "../../api/apiService";
import BackHomeBox from "../../common/BackHomeBox";
import ContentLoader from "../../common/ContentLoader";
import commonstyles from "../../styles/commonstyles.module.css";
import type { FilterKey } from "./fieldConfig";
import { filterKlassekoder, getAvailableOptions } from "./filterKlassekoder";
import KlassekoderFilter from "./KlassekoderFilter";
import KlassekoderTable from "./KlassekoderTable";

const FILTER_URL_KEYS: Record<FilterKey, string> = {
	klassekoder: "klassekode",
	hovedkontoNr: "hovedkonto",
	underkontoNr: "underkonto",
	artID: "artid",
	fagomraade: "fagomraade",
};

function parseArrayParam(params: URLSearchParams, key: string): string[] {
	const raw = params.get(key);
	if (!raw) return [];
	return raw
		.split(",")
		.map((s) => s.trim())
		.filter(Boolean);
}

export const KlassekoderPage = () => {
	const { data, error, isLoading } = useGetKlassekoder();
	const [searchParams, setSearchParams] = useSearchParams();

	const filters = useMemo(
		() => ({
			klassekoder: parseArrayParam(searchParams, "klassekode"),
			hovedkontoNr: parseArrayParam(searchParams, "hovedkonto"),
			underkontoNr: parseArrayParam(searchParams, "underkonto"),
			artID: parseArrayParam(searchParams, "artid"),
			fagomraade: parseArrayParam(searchParams, "fagomraade"),
		}),
		[searchParams],
	);

	const handleFilterChange = (field: FilterKey, values: string[]) => {
		setSearchParams(
			(prev) => {
				const next = new URLSearchParams(prev);
				const urlKey = FILTER_URL_KEYS[field];
				if (values.length === 0) {
					next.delete(urlKey);
				} else {
					next.set(urlKey, values.join(","));
				}
				next.delete("side");
				return next;
			},
			{ replace: true },
		);
	};

	const handleResetAllFilters = () => {
		setSearchParams(
			(prev) => {
				const next = new URLSearchParams(prev);
				for (const urlKey of Object.values(FILTER_URL_KEYS)) {
					next.delete(urlKey);
				}
				next.delete("side");
				return next;
			},
			{ replace: true },
		);
	};

	const filteredData = useMemo(() => {
		if (!data) return [];
		return filterKlassekoder(data, filters);
	}, [data, filters]);

	const availableOptions = useMemo(() => {
		return getAvailableOptions(filteredData);
	}, [filteredData]);

	if (isLoading) return <ContentLoader />;

	return (
		<div className={commonstyles.container}>
			<div className={commonstyles["content-wrapper"]}>
				<Heading
					spacing
					size="medium"
					level="1"
					className={commonstyles["page-heading"]}
				>
					Faste data - Klassekoder
				</Heading>

				<BackHomeBox />

				{data && (
					<KlassekoderFilter
						options={availableOptions}
						activeFilters={filters}
						onFiltersChange={handleFilterChange}
						onResetAllFilters={handleResetAllFilters}
					/>
				)}

				{error ? (
					<Alert variant="error">Nettverksfeil</Alert>
				) : filteredData.length > 0 ? (
					<KlassekoderTable data={filteredData} />
				) : (
					<Alert variant="info">Ingen data tilgjengelig</Alert>
				)}
			</div>
		</div>
	);
};

export default KlassekoderPage;
