import MultiFieldFilter from "../../common/MultiFieldFilter";
import { type TrekkregelFilterKey, trekkregelFields } from "./fieldConfig";
import styles from "./TrekkregelFilter.module.css";

interface TrekkregelFilterProps {
	options: Record<TrekkregelFilterKey, string[]>;
	activeFilters: Record<TrekkregelFilterKey, string[]>;
	onFiltersChange: (field: TrekkregelFilterKey, values: string[]) => void;
}

const TrekkregelFilter = ({
	options,
	activeFilters,
	onFiltersChange,
}: TrekkregelFilterProps) => (
	<MultiFieldFilter
		fields={trekkregelFields}
		options={options}
		activeFilters={activeFilters}
		onFiltersChange={onFiltersChange}
		searchBarGroupClassName={styles["search-bar-group"]}
		searchContainerClassName={styles["search-container"]}
	/>
);

export default TrekkregelFilter;
