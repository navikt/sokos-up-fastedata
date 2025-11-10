import SimpleFilter from "../../common/SimpleFilter";
import { Fagomraader } from "../../types/Fagomraader";

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
  return (
    <SimpleFilter
      data={data}
      activeFilters={activeFilters}
      onFiltersChange={onFiltersChange}
      label="Filtrer på fagområdekode og navn"
      getOptionText={(item) =>
        `${item.kodeFagomraade} - ${item.navnFagomraade}`
      }
    />
  );
};

export default FagomraaderFilter;
