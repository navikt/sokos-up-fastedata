import { Switch } from "@navikt/ds-react";
import styles from "./HistoricalDataToggle.module.css";

interface HistoricalDataToggleProps {
  checked: boolean;
  onChange: (value: boolean) => void;
}

export default function HistoricalDataToggle({
  checked,
  onChange,
}: HistoricalDataToggleProps) {
  return (
    <div className={styles["toggle-container"]}>
      <Switch
        position="right"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      >
        Vis historiske data
      </Switch>
    </div>
  );
}
