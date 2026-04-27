import { Alert, Heading } from "@navikt/ds-react";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { useGetTrekkgrupper } from "../../api/apiService";
import BackHomeBox from "../../common/BackHomeBox";
import ContentLoader from "../../common/ContentLoader";
import commonstyles from "../../styles/commonstyles.module.css";
import TrekkgrupperFilter, {
	type TrekkgrupperFilterOption,
} from "./TrekkgrupperFilter";
import styles from "./TrekkgrupperPage.module.css";
import TrekkgrupperTable from "./TrekkgrupperTable";

export const TrekkgrupperPage = () => {
	const { data, error, isLoading } = useGetTrekkgrupper();
	const [urlParameters, setUrlParameters] = useSearchParams();

	const [selectedFilter, setSelectedFilter] =
		useState<TrekkgrupperFilterOption | null>(() => {
			const filterType = urlParameters.get("filterType");
			const filterValue = urlParameters.get("filterValue");

			if (!filterType || !filterValue) {
				return null;
			}

			if (filterType === "trekkgruppe") {
				return {
					displayLabel: `Trekkgruppe: ${filterValue}`,
					type: "trekkgruppe",
					value: filterValue,
				};
			}

			if (filterType === "fagomraade") {
				return {
					displayLabel: `Fagområde: ${filterValue}`,
					type: "fagomraade",
					value: filterValue,
				};
			}

			return null;
		});

	const handleFilterChange = (filter: TrekkgrupperFilterOption | null) => {
		setSelectedFilter(filter);

		const newUrlParams = new URLSearchParams(urlParameters);

		if (!filter) {
			newUrlParams.delete("filterType");
			newUrlParams.delete("filterValue");
			setUrlParameters(newUrlParams, { replace: true });
			return;
		}

		newUrlParams.set("filterType", filter.type);
		newUrlParams.set("filterValue", filter.value);
		setUrlParameters(newUrlParams, { replace: true });
	};

	const filteredData = useMemo(() => {
		if (!data) {
			return [];
		}

		if (!selectedFilter) {
			return data;
		}

		if (selectedFilter.type === "trekkgruppe") {
			return data.filter(
				(item) => item.kodeTrekkgruppe === selectedFilter.value,
			);
		}

		return data.filter((item) => item.kodeFagomraade === selectedFilter.value);
	}, [data, selectedFilter]);

	if (isLoading) return <ContentLoader />;

	return (
		<div className={commonstyles.container}>
			<div
				className={`${commonstyles["content-wrapper"]} ${styles["content-wrapper"]}`}
			>
				<Heading
					spacing
					size="medium"
					level="1"
					className={commonstyles["page-heading"]}
				>
					Faste data - Trekkgrupper
				</Heading>

				<BackHomeBox />

				{data && (
					<TrekkgrupperFilter
						data={data}
						selectedOption={selectedFilter}
						onFilterChange={handleFilterChange}
					/>
				)}

				{error ? (
					<Alert variant="error">Nettverksfeil</Alert>
				) : filteredData.length > 0 ? (
					<TrekkgrupperTable
						key={selectedFilter?.displayLabel ?? "trekkgrupper"}
						data={filteredData}
					/>
				) : (
					<Alert variant="info">Ingen data tilgjengelig</Alert>
				)}
			</div>
		</div>
	);
};

export default TrekkgrupperPage;
