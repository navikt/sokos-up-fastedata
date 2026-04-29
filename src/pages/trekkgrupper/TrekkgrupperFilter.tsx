import { XMarkIcon } from "@navikt/aksel-icons";
import { Button, Chips, UNSAFE_Combobox } from "@navikt/ds-react";
import { type KeyboardEventHandler, useMemo, useState } from "react";
import commonStyles from "../../common/CommonFilterStyles.module.css";
import type { Trekkgruppe } from "../../types/Trekkgruppe";

type ComboboxOption = {
	label: string;
	value: string;
};

export interface TrekkgrupperFilterOption {
	displayLabel: string;
	type: "trekkgruppe" | "fagomraade";
	value: string;
}

interface TrekkgrupperFilterProps {
	data: Trekkgruppe[];
	selectedOption: TrekkgrupperFilterOption | null;
	onFilterChange: (filter: TrekkgrupperFilterOption | null) => void;
}

const TrekkgrupperFilter = ({
	data,
	selectedOption,
	onFilterChange,
}: TrekkgrupperFilterProps) => {
	const [inputValue, setInputValue] = useState("");
	const [comboboxKey, setComboboxKey] = useState(0);

	const options = useMemo<TrekkgrupperFilterOption[]>(() => {
		const trekkgruppeOptions: TrekkgrupperFilterOption[] = Array.from(
			new Set(data.map((item) => item.kodeTrekkgruppe)),
		)
			.sort()
			.map((kodeTrekkgruppe) => ({
				displayLabel: `Trekkgruppe: ${kodeTrekkgruppe}`,
				type: "trekkgruppe" as const,
				value: kodeTrekkgruppe,
			}));

		const fagomraadeOptions: TrekkgrupperFilterOption[] = Array.from(
			new Set(data.map((item) => item.kodeFagomraade)),
		)
			.sort()
			.map((kodeFagomraade) => ({
				displayLabel: `Fagområde: ${kodeFagomraade}`,
				type: "fagomraade" as const,
				value: kodeFagomraade,
			}));

		return [...trekkgruppeOptions, ...fagomraadeOptions];
	}, [data]);

	const comboboxOptions = useMemo<ComboboxOption[]>(
		() =>
			options.map((option) => ({
				label: option.displayLabel,
				value: `${option.type}:${option.value}`,
			})),
		[options],
	);

	const filteredOptions = useMemo<ComboboxOption[]>(() => {
		const normalizedSearch = inputValue.trim().toLowerCase();

		if (!normalizedSearch) {
			return comboboxOptions;
		}

		return comboboxOptions.filter((option) => {
			const [, codeValue] = option.value.split(":");
			return codeValue.toLowerCase().includes(normalizedSearch);
		});
	}, [comboboxOptions, inputValue]);

	const selectedComboboxOptions = selectedOption
		? [
				{
					label: selectedOption.displayLabel,
					value: `${selectedOption.type}:${selectedOption.value}`,
				},
			]
		: [];

	const handleToggleSelected = (optionValue: string, isSelected: boolean) => {
		if (!isSelected) {
			onFilterChange(null);
			return;
		}

		const [type, value] = optionValue.split(":");
		const option = options.find(
			(item) => item.type === type && item.value === value,
		);

		if (option) {
			onFilterChange(option);
			setInputValue("");
			setComboboxKey((currentKey) => currentKey + 1);
		}
	};

	const handleReset = () => {
		onFilterChange(null);
		setInputValue("");
	};

	const handleKeyDownCapture: KeyboardEventHandler<HTMLDivElement> = (
		event,
	) => {
		if (event.key !== "Enter" || filteredOptions.length === 0) {
			return;
		}

		event.preventDefault();
		event.stopPropagation();
		handleToggleSelected(filteredOptions[0].value, true);
	};

	return (
		<div
			className={commonStyles["filter-container"]}
			onKeyDownCapture={handleKeyDownCapture}
		>
			<div className={commonStyles["search-bar-group"]}>
				<div
					className={`${commonStyles["search-container"]} ${commonStyles["wider-search-container"]}`}
				>
					<UNSAFE_Combobox
						key={comboboxKey}
						size="small"
						label="Filtrer på trekkgruppe eller fagområde"
						options={comboboxOptions}
						filteredOptions={filteredOptions}
						selectedOptions={selectedComboboxOptions}
						value={inputValue}
						onChange={setInputValue}
						onToggleSelected={handleToggleSelected}
						shouldShowSelectedOptions={false}
					/>
				</div>
			</div>

			{selectedOption && (
				<div className={commonStyles["filter-actions"]}>
					<Chips>
						<Chips.Removable onClick={handleReset}>
							{selectedOption.displayLabel}
						</Chips.Removable>
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
