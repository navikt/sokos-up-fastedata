import { MagnifyingGlassIcon, XMarkIcon } from "@navikt/aksel-icons";
import { BodyShort } from "@navikt/ds-react";
import styles from "./KlassekoderFilter.module.css";

const KlassekoderFilter = () => {
  return (
    <div className={styles["filter-container"]}>
      <div className={styles["filter-group"]}>
        <div className={styles["filter-field"]}>
          <BodyShort size="small">Klassekode</BodyShort>
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

        <div className={styles["filter-field"]}>
          <BodyShort size="small">Hovedkontonr</BodyShort>
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

        <div className={styles["filter-field"]}>
          <BodyShort size="small">Underkontonr</BodyShort>
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

        <div className={styles["filter-field"]}>
          <BodyShort size="small">Art-ID</BodyShort>
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
      </div>
    </div>
  );
};

export default KlassekoderFilter;
