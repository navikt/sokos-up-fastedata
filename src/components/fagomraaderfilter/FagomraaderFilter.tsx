import { useMemo, useState } from "react";
import { BodyShort, Chips, Search } from "@navikt/ds-react";
import { Fagomraader } from "../../types/Fagomraader";
import styles from "./FagomraaderFilter.module.css";

interface FagomraaderFilterProps {
  data: Fagomraader[];
  onFilter: (filteredData: Fagomraader[]) => void;
}

const FagomraaderFilter = ({ data, onFilter }: FagomraaderFilterProps) => {
  const [inputValue, setInputValue] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      activeFilters.every(
        (filter) =>
          item.kodeFagomraade.toLowerCase().includes(filter.toLowerCase()) ||
          item.navnFagomraade.toLowerCase().includes(filter.toLowerCase()),
      ),
    );
  }, [activeFilters, data]);

  useMemo(() => {
    onFilter(filteredData);
  }, [filteredData, onFilter]);

  const suggestions = inputValue.trim()
    ? [
        ...new Set(
          data
            .map((item) => [item.kodeFagomraade, item.navnFagomraade])
            .flat()
            .filter((option) =>
              option.toLowerCase().includes(inputValue.toLowerCase()),
            ),
        ),
      ]
    : [];

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

  const handleSuggestionClick = (suggestion: string) => {
    if (!activeFilters.includes(suggestion)) {
      setActiveFilters((prev) => [...prev, suggestion]);
    }
    setInputValue("");
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
        {suggestions.length > 0 && (
          <ul className={styles["suggestions-list"]}>
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                className={styles["suggestion-item"]}
                onClick={() => handleSuggestionClick(suggestion)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleSuggestionClick(suggestion);
                  }
                }}
              >
                {suggestion}
              </button>
            ))}
          </ul>
        )}
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
