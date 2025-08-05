import { Chips } from "@navikt/ds-react";
import FilterInputWithSuggestions from "./FilterInputWithSuggestions";
import styles from "./KlassekoderFilter.module.css";

interface ActiveFilters {
  klassekoder: string[];
  hovedkontoNr: string[];
  underkontoNr: string[];
  artID: string[];
}

interface KlassekoderFilterProps {
  options: {
    klassekoder: string[];
    hovedkontoNr: string[];
    underkontoNr: string[];
    artID: string[];
  };
  activeFilters: ActiveFilters;
  onFiltersChange: (field: keyof ActiveFilters, values: string[]) => void;
}

const KlassekoderFilter = ({
  options,
  activeFilters,
  onFiltersChange,
}: KlassekoderFilterProps) => {
  const handleAddFilter = (field: keyof ActiveFilters, value: string) => {
    if (field === "artID" && isNaN(Number(value))) return;

    const currentValues = activeFilters[field];
    if (!currentValues.includes(value)) {
      onFiltersChange(field, [...currentValues, value]);
    }
  };

  const handleRemoveFilter = (field: keyof ActiveFilters, value: string) => {
    const updated = activeFilters[field].filter((f) => f !== value);
    onFiltersChange(field, updated);
  };

  return (
    <div className={styles["filter-container"]}>
      <div className={styles["filter-group"]}>
        <FilterInputWithSuggestions
          label="Klassekode"
          options={options.klassekoder}
          activeValues={activeFilters.klassekoder}
          onValueAdd={(val) => handleAddFilter("klassekoder", val)}
        />
        <FilterInputWithSuggestions
          label="Hovedkontonr"
          options={options.hovedkontoNr}
          activeValues={activeFilters.hovedkontoNr}
          onValueAdd={(val) => handleAddFilter("hovedkontoNr", val)}
        />
        <FilterInputWithSuggestions
          label="Underkontonr"
          options={options.underkontoNr}
          activeValues={activeFilters.underkontoNr}
          onValueAdd={(val) => handleAddFilter("underkontoNr", val)}
        />
        <FilterInputWithSuggestions
          label="Art-ID"
          options={options.artID}
          activeValues={activeFilters.artID}
          onValueAdd={(val) => handleAddFilter("artID", val)}
        />
      </div>

      {Object.entries(activeFilters).some(
        ([, values]) => values.length > 0,
      ) && (
        <Chips className={styles["filter-tags"]}>
          {Object.entries(activeFilters).map(([field, values]) =>
            (values as string[]).map((value: string) => (
              <Chips.Removable
                key={`${field}-${value}`}
                onClick={() =>
                  handleRemoveFilter(field as keyof ActiveFilters, value)
                }
                className={styles["custom-chip"]}
              >
                {value}
              </Chips.Removable>
            )),
          )}
        </Chips>
      )}
    </div>
  );
};

export default KlassekoderFilter;
