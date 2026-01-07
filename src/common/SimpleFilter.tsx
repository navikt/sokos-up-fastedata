import { XMarkIcon } from "@navikt/aksel-icons";
import { Button, Chips } from "@navikt/ds-react";
import { useMemo } from "react";
import commonStyles from "./CommonFilterStyles.module.css";
import FilterInput from "./FilterInput";

interface SimpleFilterProps<T> {
	data: T[];
	activeFilters: string[];
	onFiltersChange: (filters: string[]) => void;
	label: string;
	getOptionText: (item: T) => string;
	autoFocus?: boolean;
}

const SimpleFilter = <T,>({
	data,
	activeFilters,
	onFiltersChange,
	label,
	getOptionText,
	autoFocus = true,
}: SimpleFilterProps<T>) => {
	const allOptions = useMemo(() => {
		return data.map(getOptionText);
	}, [data, getOptionText]);

	const handleAdd = (value: string) => {
		if (!activeFilters.includes(value)) {
			onFiltersChange([...activeFilters, value]);
		}
	};

	const handleRemove = (value: string) => {
		onFiltersChange(activeFilters.filter((f) => f !== value));
	};

	const handleResetFilters = () => {
		onFiltersChange([]);
	};

	return (
		<div className={commonStyles["filter-container"]}>
			<div className={commonStyles["search-bar-group"]}>
				<div
					className={`${commonStyles["search-container"]} ${commonStyles["wider-search-container"]}`}
				>
					<FilterInput
						label={label}
						options={allOptions}
						activeValues={activeFilters}
						onValueAdd={handleAdd}
						onValueRemove={handleRemove}
						autoFocus={autoFocus}
					/>
				</div>
			</div>

			{activeFilters.length > 0 && (
				<div className={commonStyles["filter-actions"]}>
					<Chips>
						{activeFilters.map((filter) => (
							<Chips.Removable
								key={filter}
								onClick={() => handleRemove(filter)}
							>
								{filter}
							</Chips.Removable>
						))}
					</Chips>

					<Button
						variant="tertiary"
						size="small"
						onClick={handleResetFilters}
						iconPosition="right"
						icon={<XMarkIcon />}
					>
						Nullstill Filter
					</Button>
				</div>
			)}
		</div>
	);
};

export default SimpleFilter;
