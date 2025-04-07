import useSWRImmutable from "swr/immutable";
import { Ventekriterier } from "../types/Ventekriterier";
import { axiosFetcher } from "./config/apiConfig";

const BASE_URI = {
  BACKEND_API: "/fastedata-api/api/v1",
};

function swrConfig<T>(fetcher: (uri: string) => Promise<T>) {
  return {
    fetcher,
    suspense: true,
    revalidateOnFocus: false,
    refreshInterval: 600000,
  };
}

export function useGetVentekriterier() {
  const { data, error, isValidating } = useSWRImmutable<Ventekriterier>(
    `/ventekriterier`,
    swrConfig<Ventekriterier>((url) =>
      axiosFetcher<Ventekriterier>(BASE_URI.BACKEND_API, url),
    ),
  );
  const isLoading = (!error && !data) || isValidating;

  return { data, error, isLoading };
}
