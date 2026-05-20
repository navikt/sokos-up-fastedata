import MultiFieldFilter from "../../common/MultiFieldFilter";
import { type FilterKey, klassekoderFields } from "./fieldConfig";
import styles from "./KlassekoderFilter.module.css";

interface KlassekoderFilterProps {
	options: Record<FilterKey, string[]>;
	activeFilters: Record<FilterKey, string[]>;
	onFiltersChange: (field: FilterKey, values: string[]) => void;
}

const KlassekoderFilter = ({
	options,
	activeFilters,
	onFiltersChange,
}: KlassekoderFilterProps) => (
	<MultiFieldFilter
		fields={klassekoderFields}
		options={options}
		activeFilters={activeFilters}
		onFiltersChange={onFiltersChange}
		searchBarGroupClassName={styles["search-bar-group"]}
		searchContainerClassName={styles["search-container"]}
		canAdd={(field, value) => field !== "artID" || !Number.isNaN(Number(value))}
	/>
);

export default KlassekoderFilter;
