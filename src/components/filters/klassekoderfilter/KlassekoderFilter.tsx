import { useMemo, useState } from "react";
import { BodyShort, Chips, Search } from "@navikt/ds-react";
import { getSortedSuggestions } from "../../../util/suggestionUtil";
import styles from "./KlassekoderFilter.module.css";

interface KlassekoderFilterProps {
  options: string[];
  activeFilters: string[];
  onFiltersChange: (filters: string[]) => void;
  onFieldValuesChange?: (fields: {
    hovedkonto: string;
    underkonto: string;
    artId: string;
  }) => void; // Optional if lifting state
}

const KlassekoderFilter = ({
  options,
  activeFilters,
  onFiltersChange,
  onFieldValuesChange,
}: KlassekoderFilterProps) => {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [fields, setFields] = useState({
    hovedkonto: "",
    underkonto: "",
    artId: "",
  });

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

  const handleFieldChange = (key: keyof typeof fields, value: string) => {
    const updated = { ...fields, [key]: value };
    setFields(updated);
    onFieldValuesChange?.(updated);
  };

  const shouldShowSuggestionBox = isFocused || inputValue.trim().length > 0;

  return (
    <div className={styles["filter-container"]}>
      <div className={styles["filter-group"]}>
        <div className={styles["filter-field"]}>
          <BodyShort size="small">Klassekode</BodyShort>
          <div className={styles["search-container"]}>
            <Search
              label="Søk"
              size="small"
              value={inputValue}
              onChange={setInputValue}
              onSearchClick={handleSearch}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
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
        </div>

        {["Hovedkontonr", "Underkontonr", "Art-ID"].map((label) => {
          const key = label
            .toLowerCase()
            .replace("-", "") as keyof typeof fields;
          return (
            <div key={label} className={styles["filter-field"]}>
              <BodyShort size="small">{label}</BodyShort>
              <input
                className={styles["input"]}
                type="text"
                value={fields[key]}
                onChange={(e) => handleFieldChange(key, e.target.value)}
              />
            </div>
          );
        })}
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

export default KlassekoderFilter;
