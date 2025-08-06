import { useMemo } from "react";
import { Chips } from "@navikt/ds-react";
import { Fagomraader } from "../../../types/Fagomraader";
import commonStyles from "../CommonFilterStyles.module.css";
import FilterInput from "../FilterInput";
import styles from "./FagomraaderFilter.module.css";

interface FagomraaderFilterProps {
  data: Fagomraader[];
  activeFilters: string[];
  onFiltersChange: (filters: string[]) => void;
}

const FagomraaderFilter = ({
  data,
  activeFilters,
  onFiltersChange,
}: FagomraaderFilterProps) => {
  const allOptions = useMemo(() => {
    return data.map(
      (item) => `${item.kodeFagomraade} - ${item.navnFagomraade}`,
    );
  }, [data]);

  const handleAdd = (value: string) => {
    if (!activeFilters.includes(value)) {
      onFiltersChange([...activeFilters, value]);
    }
  };

  const handleRemove = (value: string) => {
    onFiltersChange(activeFilters.filter((f) => f !== value));
  };

  return (
    <div className={commonStyles["filter-container"]}>
      <FilterInput
        label="Filtrer på fagområdekode og navn"
        options={allOptions}
        activeValues={activeFilters}
        onValueAdd={handleAdd}
      />

      {activeFilters.length > 0 && (
        <Chips className={styles["filter-tags"]}>
          {activeFilters.map((filter) => (
            <Chips.Removable
              key={filter}
              onClick={() => handleRemove(filter)}
              className={styles["custom-chip"]}
            >
              {filter}
            </Chips.Removable>
          ))}
        </Chips>
      )}
    </div>
  );
};

export default FagomraaderFilter;
