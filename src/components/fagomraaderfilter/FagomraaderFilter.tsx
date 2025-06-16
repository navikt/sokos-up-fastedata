import { useState } from "react";
import { BodyShort, Chips, Search } from "@navikt/ds-react";
import styles from "./FagomraaderFilter.module.css";

interface Props {
  activeFilters: string[];
  onSearch: (query: string) => void;
  onRemoveFilter: (filter: string) => void;
}

const FagomraaderFilter = ({
  activeFilters,
  onSearch,
  onRemoveFilter,
}: Props) => {
  const [inputValue, setInputValue] = useState("");

  const handleSearch = () => {
    const trimmed = inputValue.trim();
    if (trimmed) {
      onSearch(trimmed);
      setInputValue("");
    }
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
              onClick={() => onRemoveFilter(filter)}
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
