import { XMarkIcon } from "@navikt/aksel-icons";
import { Button, Chips } from "@navikt/ds-react";
import { useMemo } from "react";
import commonStyles from "./CommonFilterStyles.module.css";
import FilterInput from "./FilterInput";

function defaultExtractCode(optionText: string): string {
	const dashIndex = optionText.indexOf(" - ");
	return dashIndex >= 0
		? optionText.substring(0, dashIndex).trim()
		: optionText.trim();
}

interface SimpleFilterProps<T> {
	data: T[];
	activeFilters: string[];
	onFiltersChange: (filters: string[]) => void;
	label: string;
	getOptionText: (item: T) => string;
	getOptionCode?: (optionText: string) => string;
	autoFocus?: boolean;
}

const SimpleFilter = <T,>({
	data,
	activeFilters,
	onFiltersChange,
	label,
	getOptionText,
	getOptionCode = defaultExtractCode,
	autoFocus = true,
}: SimpleFilterProps<T>) => {
	const allOptions = useMemo(() => {
		return data.map(getOptionText);
	}, [data, getOptionText]);

	const codeToOption = useMemo(() => {
		const map = new Map<string, string>();
		for (const opt of allOptions) {
			map.set(getOptionCode(opt), opt);
		}
		return map;
	}, [allOptions, getOptionCode]);

	const selectedOptions = useMemo(() => {
		return activeFilters
			.map((code) => codeToOption.get(code))
			.filter((opt): opt is string => opt !== undefined);
	}, [activeFilters, codeToOption]);

	const handleAdd = (value: string) => {
		const code = getOptionCode(value);
		if (!activeFilters.includes(code)) {
			onFiltersChange([...activeFilters, code]);
		}
	};

	const handleRemove = (value: string) => {
		const code = getOptionCode(value);
		onFiltersChange(activeFilters.filter((f) => f !== code));
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
						activeValues={selectedOptions}
						onValueAdd={handleAdd}
						onValueRemove={handleRemove}
						autoFocus={autoFocus}
					/>
				</div>
			</div>

			{activeFilters.length > 0 && (
				<div className={commonStyles["filter-actions"]}>
					<Chips>
						{activeFilters.map((code) => (
							<Chips.Removable
								key={code}
								onClick={() =>
									onFiltersChange(activeFilters.filter((f) => f !== code))
								}
							>
								{codeToOption.get(code) ?? code}
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
