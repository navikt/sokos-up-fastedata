import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { XMarkIcon } from "@navikt/aksel-icons";
import { Button, Chips } from "@navikt/ds-react";
import { Fagomraader } from "../../../types/Fagomraader";
import { filterData, uniqueOptions } from "../../../util/filterCommon";
import commonStyles from "../CommonFilterStyles.module.css";
import FilterInput from "../FilterInput";

interface FagomraaderFilterProps {
  data: Fagomraader[];
  onDataChange: (filtered: Fagomraader[]) => void;
}

const FagomraaderFilter = ({ data, onDataChange }: FagomraaderFilterProps) => {
  const [urlParameters, setUrlParameters] = useSearchParams();

  const [activeFilters, setActiveFilters] = useState<string[]>(() => {
    const fagomraadeUrlParam = urlParameters.get("fagomraade");
    if (!fagomraadeUrlParam) return [];
    return [fagomraadeUrlParam];
  });

  const toHaystack = (i: Fagomraader) =>
    `${i.kodeFagomraade} ${i.navnFagomraade}`;

  const filteredData = useMemo(() => {
    return filterData(data, activeFilters, toHaystack);
  }, [data, activeFilters]);

  useEffect(() => {
    onDataChange(filteredData);
  }, [filteredData, onDataChange]);

  const allOptions = useMemo(
    () =>
      uniqueOptions(
        filteredData,
        (i) => `${i.kodeFagomraade} - ${i.navnFagomraade}`,
      ),
    [filteredData],
  );

  const toTerm = (value: string) =>
    value.includes(" - ") ? value.split(" - ")[0] : value;

  const handleAdd = (value: string) => {
    const term = toTerm(value);
    const exists = activeFilters.some(
      (f) => f.toLowerCase() === term.toLowerCase(),
    );
    if (!exists) {
      const next = [...activeFilters, term];
      setActiveFilters(next);
    }
  };

  const handleRemove = (value: string) => {
    const next = activeFilters.filter((f) => f !== value);
    setActiveFilters(next);
    if (next.length === 0) {
      const newUrlParams = new URLSearchParams(urlParameters);
      newUrlParams.delete("fagomraade");
      setUrlParameters(newUrlParams, { replace: true });
    }
  };

  const handleResetFilters = () => {
    setActiveFilters([]);
    const newUrlParams = new URLSearchParams(urlParameters);
    newUrlParams.delete("fagomraade");
    setUrlParameters(newUrlParams, { replace: true });
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
