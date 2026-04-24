import { XMarkIcon } from "@navikt/aksel-icons";
import { Button, Chips, TextField } from "@navikt/ds-react";
import { useMemo, useState } from "react";
import commonStyles from "../../common/CommonFilterStyles.module.css";
import type { Trekkgruppe } from "../../types/Trekkgruppe";

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
	const [isOpen, setIsOpen] = useState(false);

	const options = useMemo(() => {
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

	const filteredOptions = useMemo(() => {
		const normalizedSearch = inputValue.trim().toLowerCase();

		if (!normalizedSearch) {
			return options;
		}

		return options.filter((option) =>
			option.value.toLowerCase().includes(normalizedSearch),
		);
	}, [inputValue, options]);

	const handleSelect = (option: TrekkgrupperFilterOption) => {
		onFilterChange(option);
		setInputValue("");
		setIsOpen(false);
	};

	const handleReset = () => {
		onFilterChange(null);
		setInputValue("");
		setIsOpen(false);
	};

	return (
		<div className={commonStyles["filter-container"]}>
			<div className={commonStyles["search-bar-group"]}>
				<div
					className={`${commonStyles["search-container"]} ${commonStyles["wider-search-container"]}`}
				>
					<TextField
						size="small"
						label="Filtrer på trekkgruppe eller fagområde"
						value={inputValue}
						autoComplete="off"
						onFocus={() => setIsOpen(true)}
						onChange={(event) => {
							setInputValue(event.target.value);
							setIsOpen(true);
						}}
						onBlur={() => {
							window.setTimeout(() => setIsOpen(false), 100);
						}}
					/>

					{isOpen && (
						<ul className={commonStyles["suggestions-list"]}>
							{filteredOptions.length > 0 ? (
								filteredOptions.map((option) => (
									<li key={`${option.type}-${option.value}`}>
										<button
											type="button"
											className={commonStyles["suggestion-item"]}
											onMouseDown={(event) => {
												event.preventDefault();
												handleSelect(option);
											}}
										>
											{option.displayLabel}
										</button>
									</li>
								))
							) : (
								<li className={commonStyles["no-results"]}>Ingen treff</li>
							)}
						</ul>
					)}
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
