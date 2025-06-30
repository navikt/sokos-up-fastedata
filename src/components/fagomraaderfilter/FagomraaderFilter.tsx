import { useMemo, useState } from "react";
import { BodyShort, Chips, Search } from "@navikt/ds-react";
import { Fagomraader } from "../../types/Fagomraader";
import { getSortedSuggestions } from "../../util/suggestionUtil";
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
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const allOptions = useMemo(() => {
    const sourceData =
      activeFilters.length > 0
        ? data.filter((item) => {
            const combined = `${item.kodeFagomraade} - ${item.navnFagomraade}`;
            return activeFilters.some((filter) =>
              combined.toLowerCase().includes(filter.toLowerCase()),
            );
          })
        : data;
    return sourceData.map(
      (item) => `${item.kodeFagomraade} - ${item.navnFagomraade}`,
    );
  }, [data, activeFilters]);

  const suggestions = useMemo(() => {
    return getSortedSuggestions(allOptions, inputValue.trim(), isFocused);
  }, [inputValue, isFocused, allOptions]);

  const handleSearch = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !activeFilters.includes(trimmed)) {
      onFiltersChange([...activeFilters, trimmed]);
      setInputValue("");
    }
  };

  const handleRemoveFilter = (filter: string) => {
    onFiltersChange(activeFilters.filter((f) => f !== filter));
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (!activeFilters.includes(suggestion)) {
      onFiltersChange([...activeFilters, suggestion]);
    }
    setInputValue("");
  };

  const shouldShowSuggestionBox = isFocused || inputValue.trim().length > 0;

  return (
    <div className={styles["filter-container"]}>
      <BodyShort weight="semibold">Filtrer på fagområdekode og navn</BodyShort>

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
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        />
        {shouldShowSuggestionBox && (
          <ul className={styles["suggestions-list"]}>
            {suggestions.length > 0 ? (
              suggestions.map((suggestion) => (
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
              ))
            ) : (
              <li className={styles["no-results"]}>Ingen treff</li>
            )}
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
