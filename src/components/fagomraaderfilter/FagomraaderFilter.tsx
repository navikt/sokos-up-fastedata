import { useEffect, useState } from "react";
import { BodyShort, Chips, Search } from "@navikt/ds-react";
import { Fagomraader } from "../../types/Fagomraader";
import styles from "./FagomraaderFilter.module.css";

interface Props {
  data: Fagomraader[];
  onFilter: (filteredData: Fagomraader[]) => void;
}

const FagomraaderFilter = ({ data, onFilter }: Props) => {
  const [inputValue, setInputValue] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  useEffect(() => {
    const filteredData = data.filter((item) =>
      activeFilters.every(
        (filter) =>
          item.kodeFagomraade.toLowerCase().includes(filter.toLowerCase()) ||
          item.navnFagomraade.toLowerCase().includes(filter.toLowerCase()),
      ),
    );
    onFilter(filteredData);
  }, [activeFilters, data, onFilter]);

  const handleSearch = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !activeFilters.includes(trimmed)) {
      setActiveFilters((prev) => [...prev, trimmed]);
      setInputValue("");
    }
  };

  const handleRemoveFilter = (filter: string) => {
    setActiveFilters((prev) => prev.filter((f) => f !== filter));
  };

  return (
    <div className={styles["filter-container"]}>
      <BodyShort weight="semibold">
        Filtrer på fagområdekode eller navn
      </BodyShort>

      <div className={styles["search-container"]}>
        <Search
          label="Søk"
          size="small"
          value={inputValue}
          onChange={(val) => setInputValue(val)}
          onSearchClick={handleSearch}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
      </div>

      {activeFilters.length > 0 && (
        <Chips className={styles["filter-tags"]}>
          {activeFilters.map((filter) => (
            <Chips.Removable
              key={filter}
              onClick={() => handleRemoveFilter(filter)}
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
