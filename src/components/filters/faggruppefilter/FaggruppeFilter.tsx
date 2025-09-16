import { useMemo } from "react";
import { Chips } from "@navikt/ds-react";
import { Faggruppe } from "../../../types/Faggruppe";
import commonStyles from "../CommonFilterStyles.module.css";
import FilterInput from "../FilterInput";

interface FaggruppeFilterProps {
  data: Faggruppe[];
  activeFilters: string[];
  onFiltersChange: (filters: string[]) => void;
}

const FaggruppeFilter = ({
  data,
  activeFilters,
  onFiltersChange,
}: FaggruppeFilterProps) => {
  const allOptions = useMemo(() => {
    return data.map((item) => `${item.kodeFaggruppe} - ${item.navnFaggruppe}`);
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
      <div>
        <FilterInput
          label="Filtrer på fagområdekode og navn"
          options={allOptions}
          activeValues={activeFilters}
          onValueAdd={handleAdd}
        />

        {activeFilters.length > 0 && (
          <Chips style={{ marginTop: "1.5rem" }}>
            {activeFilters.map((filter) => (
              <Chips.Removable
                key={filter}
                onClick={() => handleRemove(filter)}
              >
                {filter}
              </Chips.Removable>
            ))}
          </Chips>
        )}
      </div>
    </div>
  );
};

export default FaggruppeFilter;
