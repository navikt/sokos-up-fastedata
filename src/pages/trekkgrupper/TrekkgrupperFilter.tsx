import { XMarkIcon } from "@navikt/aksel-icons";
import { Button, Chips } from "@navikt/ds-react";
import { useMemo } from "react";
import commonStyles from "../../common/CommonFilterStyles.module.css";
import FilterInput from "../../common/FilterInput";
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
	const allOptions = useMemo(() => {
		const trekkgruppeOptions = Array.from(
			new Set(data.map((item) => item.kodeTrekkgruppe)),
		)
			.sort()
			.map((code) => `Trekkgruppe: ${code}`);

		const fagomraadeOptions = Array.from(
			new Set(data.map((item) => item.kodeFagomraade)),
		)
			.sort()
			.map((code) => `Fagområde: ${code}`);

		return [...trekkgruppeOptions, ...fagomraadeOptions];
	}, [data]);

	const handleAdd = (value: string) => {
		if (allOptions.includes(value)) {
			if (!activeFilters.includes(value)) {
				onFiltersChange([...activeFilters, value]);
			}
			return;
		}

		const upperValue = value.toUpperCase();
		const trekkgruppeMatch = allOptions.find(
			(opt) => opt === `Trekkgruppe: ${upperValue}`,
		);
		if (trekkgruppeMatch && !activeFilters.includes(trekkgruppeMatch)) {
			onFiltersChange([...activeFilters, trekkgruppeMatch]);
			return;
		}

		const fagomraadeMatch = allOptions.find(
			(opt) => opt === `Fagområde: ${upperValue}`,
		);
		if (fagomraadeMatch && !activeFilters.includes(fagomraadeMatch)) {
			onFiltersChange([...activeFilters, fagomraadeMatch]);
		}
	};

	const handleRemove = (value: string) => {
		onFiltersChange(activeFilters.filter((f) => f !== value));
	};

	const handleReset = () => onFiltersChange([]);

	return (
		<div className={commonStyles["filter-container"]}>
			<div className={commonStyles["search-bar-group"]}>
				<div
					className={`${commonStyles["search-container"]} ${commonStyles["wider-search-container"]}`}
				>
					<FilterInput
						label="Filtrer på trekkgruppe eller fagområde"
						options={allOptions}
						activeValues={activeFilters}
						onValueAdd={handleAdd}
						onValueRemove={handleRemove}
						autoFocus
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
						onClick={handleReset}
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

export default TrekkgrupperFilter;
