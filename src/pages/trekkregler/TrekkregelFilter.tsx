import { XMarkIcon } from "@navikt/aksel-icons";
import { Button, Chips } from "@navikt/ds-react";
import commonStyles from "../../common/CommonFilterStyles.module.css";
import FilterInput from "../../common/FilterInput";
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
}: TrekkregelFilterProps) => {
	const handleAdd = (field: TrekkregelFilterKey, value: string) => {
		if (!activeFilters[field].includes(value)) {
			onFiltersChange(field, [...activeFilters[field], value]);
		}
	};

	const handleRemove = (field: TrekkregelFilterKey, value: string) => {
		onFiltersChange(
			field,
			activeFilters[field].filter((f) => f !== value),
		);
	};

	const handleResetFilters = () => {
		trekkregelFields.forEach(({ key }) => {
			onFiltersChange(key, []);
		});
	};

	const labelPrefix = (key: TrekkregelFilterKey) => {
		const label = trekkregelFields.find((f) => f.key === key)?.label;
		return label || key;
	};

	return (
		<div className={commonStyles["filter-container"]}>
			{trekkregelFields.map(({ key, label }, inputFieldIndex) => (
				<div key={key} className={styles["search-container"]}>
					<FilterInput
						label={label}
						options={options[key]}
						activeValues={activeFilters[key]}
						onValueAdd={(val) => handleAdd(key, val)}
						onValueRemove={(val) => handleRemove(key, val)}
						autoFocus={inputFieldIndex === 0}
					/>
				</div>
			))}
			{trekkregelFields.some(({ key }) => activeFilters[key].length > 0) && (
				<div className={commonStyles["filter-actions"]}>
					<Chips>
						{trekkregelFields.flatMap(({ key }) =>
							activeFilters[key].map((value) => (
								<Chips.Removable
									key={`${key}-${value}`}
									onClick={() => handleRemove(key, value)}
								>
									{`${labelPrefix(key)}: ${value}`}
								</Chips.Removable>
							)),
						)}
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

export default TrekkregelFilter;
