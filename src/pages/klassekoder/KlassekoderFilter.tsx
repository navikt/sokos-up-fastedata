import { XMarkIcon } from "@navikt/aksel-icons";
import { Button, Chips } from "@navikt/ds-react";
import commonStyles from "../../common/CommonFilterStyles.module.css";
import FilterInput from "../../common/FilterInput";
import styles from "./KlassekoderFilter.module.css";
import { FilterKey, klassekoderFields } from "./fieldConfig";

interface KlassekoderFilterProps {
  options: Record<FilterKey, string[]>;
  activeFilters: Record<FilterKey, string[]>;
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
    klassekoderFields.forEach(({ key }) => {
      onFiltersChange(key, []);
    });
  };

  const labelPrefix = (key: FilterKey) => {
    const label = klassekoderFields.find((f) => f.key === key)?.label;
    return label || key;
  };

  return (
    <div className={commonStyles["filter-container"]}>
      <div className={styles["search-bar-group"]}>
        {klassekoderFields.map(({ key, label, name }, inputFieldIndex) => (
          <div
            key={key}
            className={`${styles["search-container"]} ${styles[`${name}-search-container`] || ""}`}
          >
            <FilterInput
              label={label}
              options={options[key]}
              activeValues={activeFilters[key]}
              onValueAdd={(val) => handleAdd(key, val)}
              onValueRemove={(val) => handleRemove(key, val)}
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus={inputFieldIndex === 0}
            />
          </div>
        ))}
      </div>
      {klassekoderFields.some(({ key }) => activeFilters[key].length > 0) && (
        <div className={commonStyles["filter-actions"]}>
          <Chips>
            {klassekoderFields.flatMap(({ key }) =>
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

export default KlassekoderFilter;
