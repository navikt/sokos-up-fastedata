import { Switch } from "@navikt/ds-react";
import styles from "./HistoricalDataToggle.module.css";

interface HistoricalDataToggleProps {
  checked: boolean;
  onChange: (value: boolean) => void;
  totalCount: number;
  currentPage?: number;
  pageCount?: number;
  rowsPerPage?: number;
}

export default function HistoricalDataToggle({
  checked,
  onChange,
  totalCount,
  currentPage,
  pageCount,
  rowsPerPage,
}: HistoricalDataToggleProps) {
  return (
    <div className={styles["toggle-container"]}>
      <Switch checked={checked} onChange={(e) => onChange(e.target.checked)}>
        Vis historiske data
      </Switch>

      <p className={styles["treff-info"]}>
        {`${totalCount} treff`}
        {rowsPerPage &&
          totalCount > rowsPerPage &&
          currentPage &&
          pageCount &&
          `, ${currentPage} av ${pageCount} sider`}
      </p>
    </div>
  );
}
