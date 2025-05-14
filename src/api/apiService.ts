import useSWRImmutable from "swr/immutable";
import { Ventekriterier } from "../types/Ventekriterier";
import { Ventestatuskoder } from "../types/Ventestatuskoder";
import { axiosFetcher } from "./config/apiConfig";

const BASE_URI = {
  BACKEND_API: "/oppdrag-api/api/v1/fastedata",
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
  const { data, error, isValidating } = useSWRImmutable<Ventekriterier[]>(
    `/ventekriterier`,
    swrConfig<Ventekriterier[]>((url) =>
      axiosFetcher<Ventekriterier[]>(BASE_URI.BACKEND_API, url),
    ),
  );
  const isLoading = (!error && !data) || isValidating;

  return { data, error, isLoading };
}

export function useGetVentestatuskoder() {
  const { data, error, isValidating } = useSWRImmutable<Ventestatuskoder[]>(
    `/ventestatuskoder`,
    swrConfig<Ventestatuskoder[]>((url) =>
      axiosFetcher<Ventestatuskoder[]>(BASE_URI.BACKEND_API, url),
    ),
  );
  const isLoading = (!error && !data) || isValidating;

  return { data, error, isLoading };
}
