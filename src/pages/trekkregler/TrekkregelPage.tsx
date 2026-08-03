import { Alert, LocalAlert } from "@navikt/ds-react";
import { useMemo, useState } from "react";
import { useGetTrekkregler } from "../../api/apiService";
import ContentLoader from "../../components/ContentLoader";
import MultiFieldFilter from "../../components/MultiFieldFilter";
import PageLayout from "../../components/PageLayout";
import { type TrekkregelFilterKey, trekkregelFields } from "./fieldConfig";
import { filterTrekkregler, getAvailableOptions } from "./filterTrekkregler";
import filterStyles from "./TrekkregelFilter.module.css";
import styles from "./TrekkregelPage.module.css";
import TrekkregelTable from "./TrekkregelTable";

export const TrekkregelPage = () => {
	const { data, error, isLoading } = useGetTrekkregler();

	const [filters, setFilters] = useState({
		trekktype: [] as string[],
		fagomraade: [] as string[],
	});

	const handleFilterChange = (field: TrekkregelFilterKey, values: string[]) => {
		setFilters((prev) => ({
			...prev,
			[field]: values,
		}));
	};

	const filteredData = useMemo(() => {
		if (!data) return [];
		return filterTrekkregler(data, filters);
	}, [data, filters]);

	const availableOptions = useMemo(() => {
		return getAvailableOptions(filteredData);
	}, [filteredData]);

	if (isLoading) return <ContentLoader />;

	return (
		<PageLayout
			title="Faste data - Trekkregler"
			contentWrapperClassName={styles["content-wrapper"]}
		>
			{data && (
				<MultiFieldFilter
					fields={trekkregelFields}
					options={availableOptions}
					activeFilters={filters}
					onFiltersChange={handleFilterChange}
					searchBarGroupClassName={filterStyles["search-bar-group"]}
					searchContainerClassName={filterStyles["search-container"]}
				/>
			)}

			{error ? (
				<LocalAlert status="error">
					<LocalAlert.Header>
						<LocalAlert.Title>Nettverksfeil</LocalAlert.Title>
					</LocalAlert.Header>
				</LocalAlert>
			) : filteredData.length > 0 ? (
				<TrekkregelTable data={filteredData} />
			) : (
				<Alert variant="info">Ingen data tilgjengelig</Alert>
			)}
		</PageLayout>
	);
};

export default TrekkregelPage;
