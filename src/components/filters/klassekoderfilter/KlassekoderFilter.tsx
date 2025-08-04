import { useMemo, useState } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@navikt/aksel-icons";
import { BodyShort, Chips } from "@navikt/ds-react";
import { getSortedSuggestions } from "../../../util/suggestionUtil";
import styles from "./KlassekoderFilter.module.css";

interface KlassekoderFilterProps {
  options: string[]; // List of all kodeKlasse values
  activeFilters: string[];
  onFiltersChange: (filters: string[]) => void;
}

const KlassekoderFilter = ({
  options,
  activeFilters,
  onFiltersChange,
}: KlassekoderFilterProps) => {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const suggestions = useMemo(() => {
    return getSortedSuggestions(options, inputValue.trim(), isFocused);
  }, [inputValue, isFocused, options]);

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
      <div className={styles["filter-group"]}>
        <div className={styles["filter-field"]}>
          <BodyShort size="small">Klassekode</BodyShort>
          <div className={styles["input-wrapper"]}>
            <input
              className={styles["input"]}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
            <button
              className={styles["icon-button"]}
              onClick={() => setInputValue("")}
            >
              <XMarkIcon />
            </button>
            <button className={styles["icon-button"]} onClick={handleSearch}>
              <MagnifyingGlassIcon />
            </button>
          </div>
          {shouldShowSuggestionBox && (
            <ul className={styles["suggestions-list"]}>
              {suggestions.length > 0 ? (
                suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    className={styles["suggestion-item"]}
                    onClick={() => handleSuggestionClick(suggestion)}
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

        {/* Static fields (no functionality) */}
        {["Hovedkontonr", "Underkontonr", "Art-ID"].map((label) => (
          <div key={label} className={styles["filter-field"]}>
            <BodyShort size="small">{label}</BodyShort>
            <div className={styles["input-wrapper"]}>
              <input className={styles["input"]} type="text" />
              <button className={styles["icon-button"]}>
                <XMarkIcon />
              </button>
              <button className={styles["icon-button"]}>
                <MagnifyingGlassIcon />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Active filters display */}
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

export default KlassekoderFilter;
