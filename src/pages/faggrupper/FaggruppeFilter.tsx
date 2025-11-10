import SimpleFilter from "../../common/SimpleFilter";
import { Faggruppe } from "../../types/Faggruppe";

interface FaggruppeFilterProps {
  data: Faggruppe[];
  activeFilters: string[];
  onFiltersChange: (filters: string[]) => void;
}

const FaggruppeFilter = ({
  data,
  activeFilters,
  onFiltersChange,
}: FaggruppeFilterProps) => {
  return (
    <SimpleFilter
      data={data}
      activeFilters={activeFilters}
      onFiltersChange={onFiltersChange}
      label="Filtrer på faggruppekode og navn"
      getOptionText={(item) => `${item.kodeFaggruppe} - ${item.navnFaggruppe}`}
    />
  );
};

export default FaggruppeFilter;
