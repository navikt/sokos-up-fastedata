import { useEffect, useMemo, useRef, useState } from "react";
import { BodyShort, Search } from "@navikt/ds-react";
import { getSortedSuggestions } from "../../util/suggestionUtil";
import styles from "./CommonFilterStyles.module.css";

interface FilterInputProps {
  label: string;
  options: string[];
  activeValues: string[];
  onValueAdd: (value: string) => void;
  shouldFocus?: boolean;
}

const FilterInput = ({
  label,
  options,
  activeValues,
  onValueAdd,
  shouldFocus = false,
}: FilterInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (shouldFocus) {
      inputRef.current?.focus();
    }
  }, [shouldFocus]);

  const suggestions = useMemo(() => {
    return getSortedSuggestions(options, inputValue.trim(), isFocused);
  }, [inputValue, isFocused, options]);

  const handleSearch = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !activeValues.includes(trimmed)) {
      onValueAdd(trimmed);
      setInputValue("");
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (!activeValues.includes(suggestion)) {
      onValueAdd(suggestion);
    }
    setInputValue("");
  };

  const shouldShowSuggestionBox = inputValue.trim().length > 0 && isFocused;

  return (
    <div>
      <BodyShort weight="semibold" size="small">
        {label}
      </BodyShort>
      <div className={styles["search-container"]}>
        <Search
          ref={inputRef}
          variant="simple"
          label={label}
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
  );
};

export default FilterInput;
