import { XMarkIcon } from "@navikt/aksel-icons";
import { Button, Chips } from "@navikt/ds-react";
import FilterInput from "../FilterInput";
import styles from "./KlassekoderFilter.module.css";

const fields = [
  { key: "klassekoder", label: "Klassekode", isSmall: false },
  { key: "hovedkontoNr", label: "Hovedkontonr", isSmall: true },
  { key: "underkontoNr", label: "Underkontonr", isSmall: true },
  { key: "artID", label: "Art-ID", isSmall: true },
  { key: "fagomraade", label: "Fagområde", isSmall: false },
] as const;

type FilterKey = (typeof fields)[number]["key"];

interface ActiveFilters {
  klassekoder: string[];
  hovedkontoNr: string[];
  underkontoNr: string[];
  artID: string[];
  fagomraade: string[];
}

interface KlassekoderFilterProps {
  options: ActiveFilters;
  activeFilters: ActiveFilters;
  onFiltersChange: (field: FilterKey, values: string[]) => void;
}

const KlassekoderFilter = ({
  options,
  activeFilters,
  onFiltersChange,
}: KlassekoderFilterProps) => {
  const handleAdd = (field: FilterKey, value: string) => {
    if (field === "artID" && isNaN(Number(value))) return;
    if (!activeFilters[field].includes(value)) {
      onFiltersChange(field, [...activeFilters[field], value]);
    }
  };

  const handleRemove = (field: FilterKey, value: string) => {
    onFiltersChange(
      field,
      activeFilters[field].filter((f) => f !== value),
    );
  };

  const handleResetFilters = () => {
    fields.forEach(({ key }) => {
      onFiltersChange(key, []);
    });
  };

  const labelPrefix = (key: FilterKey) => {
    switch (key) {
      case "klassekoder":
        return "Klassekode";
      case "hovedkontoNr":
        return "Hovedkontonr";
      case "underkontoNr":
        return "Underkontonr";
      case "artID":
        return "Art-ID";
      case "fagomraade":
        return "Fagområde";
    }
  };

  return (
    <div className={styles["filter-container"]}>
      <div className={styles["filter-group"]}>
        {fields.map(({ key, label, isSmall }) => (
          <div
            key={key}
            className={`${styles["filter-field"]} ${
              key === "fagomraade"
                ? styles["fagomraade-filter-field"]
                : isSmall
                  ? styles["small-filter-field"]
                  : ""
            }`}
          >
            <FilterInput
              label={label}
              options={options[key]}
              activeValues={activeFilters[key]}
              onValueAdd={(val) => handleAdd(key, val)}
            />
          </div>
        ))}
      </div>

      {fields.some(({ key }) => activeFilters[key].length > 0) && (
        <div className={styles["filter-actions"]}>
          <Chips className={styles["filter-tags"]}>
            {fields.flatMap(({ key }) =>
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
            className={styles["reset-button"]}
            iconPosition="right"
            icon={<XMarkIcon aria-hidden />}
          >
            Nullstill Filter
          </Button>
        </div>
      )}
    </div>
  );
};

export default KlassekoderFilter;
