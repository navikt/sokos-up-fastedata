import { Switch } from "@navikt/ds-react";

interface HistoricalDataToggleProps {
  checked: boolean;
  onChange: (value: boolean) => void;
}

export default function HistoricalDataToggle({
  checked,
  onChange,
}: HistoricalDataToggleProps) {
  return (
    <Switch checked={checked} onChange={(e) => onChange(e.target.checked)}>
      Vis historiske data
    </Switch>
  );
}
