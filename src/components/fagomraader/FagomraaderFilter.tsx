import { useMemo } from "react";
import { XMarkIcon } from "@navikt/aksel-icons";
import { Button, Chips } from "@navikt/ds-react";
import { Fagomraader } from "../../types/Fagomraader";
import commonStyles from "../CommonFilterStyles.module.css";
import FilterInput from "../FilterInput";

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

  const handleResetFilters = () => {
    onFiltersChange([]);
  };

  return (
    <div className={commonStyles["filter-container"]}>
      <div className={commonStyles["search-bar-group"]}>
        <div
          className={`${commonStyles["search-container"]} ${commonStyles["fagomraade-search-container"]}`}
        >
          <FilterInput
            label="Filtrer på fagområdekode og navn"
            options={allOptions}
            activeValues={activeFilters}
            onValueAdd={handleAdd}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus={true}
          />
        </div>
      </div>

      {activeFilters.length > 0 && (
        <div className={commonStyles["filter-actions"]}>
          <Chips>
            {activeFilters.map((filter) => (
              <Chips.Removable
                key={filter}
                onClick={() => handleRemove(filter)}
              >
                {filter}
              </Chips.Removable>
            ))}
          </Chips>

          <Button
            variant="tertiary"
            size="small"
            onClick={handleResetFilters}
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

export default FagomraaderFilter;
