import { XMarkIcon } from "@navikt/aksel-icons";
import { Button, Chips } from "@navikt/ds-react";
import commonStyles from "./CommonFilterStyles.module.css";
import FilterInput from "./FilterInput";

interface FieldConfig<K extends string> {
	key: K;
	label: string;
}

interface MultiFieldFilterProps<K extends string> {
	fields: readonly FieldConfig<K>[];
	options: Record<K, string[]>;
	activeFilters: Record<K, string[]>;
	onFiltersChange: (field: K, values: string[]) => void;
	searchBarGroupClassName: string;
	searchContainerClassName: string;
	canAdd?: (field: K, value: string) => boolean;
}

const MultiFieldFilter = <K extends string>({
	fields,
	options,
	activeFilters,
	onFiltersChange,
	searchBarGroupClassName,
	searchContainerClassName,
	canAdd,
}: MultiFieldFilterProps<K>) => {
	const handleAdd = (field: K, value: string) => {
		if (canAdd && !canAdd(field, value)) return;
		if (!activeFilters[field].includes(value)) {
			onFiltersChange(field, [...activeFilters[field], value]);
		}
	};

	const handleRemove = (field: K, value: string) => {
		onFiltersChange(
			field,
			activeFilters[field].filter((f) => f !== value),
		);
	};

	const handleReset = () => {
		fields.forEach(({ key }) => {
			onFiltersChange(key, []);
		});
	};

	const hasActiveFilters = fields.some(
		({ key }) => activeFilters[key].length > 0,
	);

	return (
		<div className={commonStyles["filter-container"]}>
			<div className={searchBarGroupClassName}>
				{fields.map(({ key, label }, index) => (
					<div key={key} className={searchContainerClassName}>
						<FilterInput
							label={label}
							options={options[key]}
							activeValues={activeFilters[key]}
							onValueAdd={(val) => handleAdd(key, val)}
							onValueRemove={(val) => handleRemove(key, val)}
							autoFocus={index === 0}
						/>
					</div>
				))}
			</div>

			{hasActiveFilters && (
				<div className={commonStyles["filter-actions"]}>
					<Chips>
						{fields.flatMap(({ key, label }) =>
							activeFilters[key].map((value) => (
								<Chips.Removable
									key={`${key}-${value}`}
									onClick={() => handleRemove(key, value)}
								>
									{`${label}: ${value}`}
								</Chips.Removable>
							)),
						)}
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

export default MultiFieldFilter;
