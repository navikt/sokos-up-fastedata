import { useState } from "react";
import { BodyShort, Search } from "@navikt/ds-react";
import styles from "./KlassekoderFilter.module.css";

const KlassekoderFilter = () => {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className={styles["filter-container"]}>
      <BodyShort weight="semibold">Filtrer på klassekode</BodyShort>

      <div className={styles["search-container"]}>
        <Search
          label="Søk"
          size="small"
          value={inputValue}
          onChange={(val) => setInputValue(val)}
        />
      </div>
    </div>
  );
};

export default KlassekoderFilter;
