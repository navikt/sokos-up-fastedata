import useSWRImmutable from "swr/immutable";
import { Bilagstype } from "../types/Bilagstype";
import { Fagomraader } from "../types/Fagomraader";
import { Klassekoder } from "../types/Klassekoder";
import { Korrigeringsaarsak } from "../types/Korrigeringsaarsak";
import { Ventekriterier } from "../types/Ventekriterier";
import { Ventestatuskoder } from "../types/Ventestatuskoder";
import { axiosFetcher } from "./config/apiConfig";

const BASE_URI = {
  BACKEND_API: "/oppdrag-api/api/v1/fastedata",
  FAGOMRAADER_API: "/oppdrag-api/api/v1/fastedata/fagomraader",
};

function swrConfig<T>(fetcher: (uri: string) => Promise<T>) {
  return {
    fetcher,
    errorRetryCount: 2,
    errorRetryInterval: 1000,
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

export function useGetFagomraader() {
  const { data, error, isValidating } = useSWRImmutable<Fagomraader[]>(
    `/fagomraader`,
    swrConfig<Fagomraader[]>((url) =>
      axiosFetcher<Fagomraader[]>(BASE_URI.BACKEND_API, url),
    ),
  );
  const isLoading = (!error && !data) || isValidating;
  return { data, error, isLoading };
}

export function useGetKorrigeringsaarsaker(kodeFagomraade: string) {
  const { data, error, isValidating } = useSWRImmutable<Korrigeringsaarsak[]>(
    kodeFagomraade
      ? `/fagomraader/${kodeFagomraade}/korrigeringsaarsaker`
      : null,
    swrConfig<Korrigeringsaarsak[]>((url) =>
      axiosFetcher<Korrigeringsaarsak[]>(BASE_URI.BACKEND_API, url),
    ),
  );
  const isLoading = (!error && !data) || isValidating;
  return { data, error, isLoading };
}

export function useGetBilagstyper(kodeFagomraade: string) {
  const { data, error, isValidating } = useSWRImmutable<Bilagstype[]>(
    kodeFagomraade ? `/fagomraader/${kodeFagomraade}/bilagstyper` : null,
    swrConfig<Bilagstype[]>((url) =>
      axiosFetcher<Bilagstype[]>(BASE_URI.BACKEND_API, url),
    ),
  );
  const isLoading = (!error && !data) || isValidating;
  return { data, error, isLoading };
}

export function useGetKlassekoder() {
  const { data, error, isValidating } = useSWRImmutable<Klassekoder[]>(
    `/klassekoder`,
    swrConfig<Klassekoder[]>((url) =>
      axiosFetcher<Klassekoder[]>(BASE_URI.BACKEND_API, url),
    ),
  );
  const isLoading = (!error && !data) || isValidating;
  return { data, error, isLoading };
}
