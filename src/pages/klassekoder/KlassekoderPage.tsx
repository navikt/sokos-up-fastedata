import { Alert, Heading } from "@navikt/ds-react";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { useGetKlassekoder } from "../../api/apiService";
import BackHomeBox from "../../common/BackHomeBox";
import ContentLoader from "../../common/ContentLoader";
import commonstyles from "../../styles/commonstyles.module.css";
import { type FilterKey } from "./fieldConfig";
import { filterKlassekoder, getAvailableOptions } from "./filterKlassekoder";
import KlassekoderFilter from "./KlassekoderFilter";
import KlassekoderTable from "./KlassekoderTable";

const filterKeyToUrlParam: Record<FilterKey, string> = {
	klassekoder: "klassekode",
	hovedkontoNr: "hovedkonto",
	underkontoNr: "underkonto",
	artID: "artid",
	fagomraade: "fagomraade",
};

const readUrlParam = (urlParameters: URLSearchParams, paramName: string) => {
	const val = urlParameters.get(paramName);
	if (!val) return [];
	return val
		.split(",")
		.map((s) => s.trim())
		.filter(Boolean);
};

export const KlassekoderPage = () => {
	const { data, error, isLoading } = useGetKlassekoder();
	const [urlParameters, setUrlParameters] = useSearchParams();

	const [filters, setFilters] = useState(() => {
		return {
			klassekoder: readUrlParam(urlParameters, filterKeyToUrlParam.klassekoder),
			hovedkontoNr: readUrlParam(
				urlParameters,
				filterKeyToUrlParam.hovedkontoNr,
			),
			underkontoNr: readUrlParam(
				urlParameters,
				filterKeyToUrlParam.underkontoNr,
			),
			artID: readUrlParam(urlParameters, filterKeyToUrlParam.artID),
			fagomraade: readUrlParam(urlParameters, filterKeyToUrlParam.fagomraade),
		};
	});

	const handleFilterChange = (
		field: keyof typeof filters,
		values: string[],
	) => {
		setFilters((prev) => ({
			...prev,
			[field]: values,
		}));

		const paramName = filterKeyToUrlParam[field];
		const newUrlParameter = new URLSearchParams(urlParameters);
		if (values.length === 0) {
			newUrlParameter.delete(paramName);
		} else {
			newUrlParameter.set(paramName, values.join(","));
		}
		setUrlParameters(newUrlParameter, { replace: true });
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
