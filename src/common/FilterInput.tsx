import { UNSAFE_Combobox } from "@navikt/ds-react";

interface FilterInputProps {
	label: string;
	options: string[];
	activeValues: string[];
	onValueAdd: (value: string) => void;
	onValueRemove: (value: string) => void;
	autoFocus?: boolean;
}

const FilterInput = ({
	label,
	options,
	activeValues,
	onValueAdd,
	onValueRemove,
	autoFocus = false,
}: FilterInputProps) => {
	const handleToggleSelected = (option: string, isSelected: boolean) => {
		if (isSelected) {
			onValueAdd(option);
		} else {
			onValueRemove(option);
		}
	};

	return (
		<UNSAFE_Combobox
			size="small"
			label={label}
			options={options}
			isMultiSelect
			allowNewValues
			selectedOptions={activeValues}
			onToggleSelected={handleToggleSelected}
			shouldShowSelectedOptions={false}
			// eslint-disable-next-line jsx-a11y/no-autofocus
			autoFocus={autoFocus}
		/>
	);
};

export default FilterInput;
