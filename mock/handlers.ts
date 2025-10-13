import { HttpResponse, http } from "msw";
import { bilagstyperMAAP } from "./data/bilagstyper";
import { faggrupper } from "./data/faggrupper";
import { fagomraaderList } from "./data/fagomraader";
import { kjoreplanList } from "./data/kjoreplaner";
import { klassekoderList } from "./data/klassekoder";
import { korrigeringsaarsakerAAP } from "./data/korrigeringsaarsaker";
import { ventekriterierList } from "./data/ventekriterier";
import { ventestatuskoderList } from "./data/ventestatuskoder";

const baseUrl = "/oppdrag-api/api/v1/fastedata";
const ventestatuskoderUrl = `${baseUrl}/ventestatuskoder`;
const ventekriterierUrl = `${baseUrl}/ventekriterier`;
const fagomraaderUrl = `${baseUrl}/fagomraader`;
const faggrupperUrl = `${baseUrl}/faggrupper`;
const klassekoderUrl = `${baseUrl}/klassekoder`;

export const handlers = [
  http.get(ventekriterierUrl, () => {
    return HttpResponse.json(ventekriterierList, { status: 200 });
  }),
  http.get(ventestatuskoderUrl, () => {
    return HttpResponse.json(ventestatuskoderList, { status: 200 });
  }),
  http.get(fagomraaderUrl, () => {
    return HttpResponse.json(fagomraaderList, { status: 200 });
  }),
  http.get(faggrupperUrl, () => {
    return HttpResponse.json(faggrupper, { status: 200 });
  }),
  http.get(klassekoderUrl, () => {
    return HttpResponse.json(klassekoderList, { status: 200 });
  }),
  http.get(`${baseUrl}/:faggruppe/kjoreplaner`, () => {
    return HttpResponse.json(kjoreplanList, { status: 200 });
  }),
  http.get(`${fagomraaderUrl}/:kode/korrigeringsaarsaker`, ({ params }) => {
    const { kode } = params;

    if (kode === "AAP") {
      return HttpResponse.json(korrigeringsaarsakerAAP, { status: 200 });
    }

    return HttpResponse.json([], { status: 200 });
  }),
  http.get(`${fagomraaderUrl}/:kode/bilagstyper`, ({ params }) => {
    const { kode } = params;

    if (kode === "MAAP") {
      return HttpResponse.json(bilagstyperMAAP, { status: 200 });
    }

    return HttpResponse.json([], { status: 200 });
  }),
];
