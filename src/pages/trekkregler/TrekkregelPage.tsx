import { Alert, Heading } from "@navikt/ds-react";
import { useMemo, useState } from "react";
import { useGetTrekkregler } from "../../api/apiService";
import BackHomeBox from "../../common/BackHomeBox";
import ContentLoader from "../../common/ContentLoader";
import commonstyles from "../../styles/commonstyles.module.css";
import type { TrekkregelFilterKey } from "./fieldConfig";
import { filterTrekkregler, getAvailableOptions } from "./filterTrekkregler";
import TrekkregelFilter from "./TrekkregelFilter";
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
					Faste data - Trekkregler
				</Heading>

				<BackHomeBox />

				{data && (
					<TrekkregelFilter
						options={availableOptions}
						activeFilters={filters}
						onFiltersChange={handleFilterChange}
					/>
				)}

				{error ? (
					<Alert variant="error">Nettverksfeil</Alert>
				) : filteredData.length > 0 ? (
					<TrekkregelTable data={filteredData} />
				) : (
					<Alert variant="info">Ingen data tilgjengelig</Alert>
				)}
			</div>
		</div>
	);
};

export default TrekkregelPage;
