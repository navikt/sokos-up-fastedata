import SimpleFilter from "../../common/SimpleFilter";
import type { Trekkgruppe } from "../../types/Trekkgruppe";

interface TrekkgrupperFilterProps {
	data: Trekkgruppe[];
	activeFilters: string[];
	onFiltersChange: (filters: string[]) => void;
}

const TrekkgrupperFilter = ({
	data,
	activeFilters,
	onFiltersChange,
}: TrekkgrupperFilterProps) => {
	return (
		<SimpleFilter
			data={data}
			activeFilters={activeFilters}
			onFiltersChange={onFiltersChange}
			label="Filtrer på trekkgruppe eller fagområde"
			getOptionText={(item) =>
				`${item.kodeTrekkgruppe} - ${item.kodeFagomraade}`
			}
		/>
	);
};

export default TrekkgrupperFilter;
