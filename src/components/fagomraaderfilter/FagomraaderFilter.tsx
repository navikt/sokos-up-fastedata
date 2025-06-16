import React, { useState } from "react";
import { XMarkIcon } from "@navikt/aksel-icons";
import { BodyShort, Search, Tag } from "@navikt/ds-react";
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
    if (inputValue.trim()) {
      onSearch(inputValue.trim());
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
          size="small" // Updated to use the small variant
          value={inputValue}
          onChange={(val) => setInputValue(val)}
          onSearchClick={handleSearch}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
      </div>

      <div className={styles["filter-tags"]}>
        {activeFilters.map((filter) => (
          <Tag
            key={filter}
            variant="alt2"
            size="medium"
            icon={<XMarkIcon aria-hidden />}
            onClick={() => onRemoveFilter(filter)}
          >
            {filter}
          </Tag>
        ))}
      </div>
    </div>
  );
};

export default FagomraaderFilter;
