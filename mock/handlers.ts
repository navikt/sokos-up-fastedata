import { HttpResponse, http } from "msw";
import { fagomraaderList } from "./data/fagomraader";
import { ventekriterierList } from "./data/ventekriterier";
import { ventestatuskoderList } from "./data/ventestatuskoder";

const baseUrl = "/oppdrag-api/api/v1/fastedata";
const ventestatuskoderUrl = `${baseUrl}/ventestatuskoder`;
const ventekriterierUrl = `${baseUrl}/ventekriterier`;
const fagomraaderUrl = `${baseUrl}/fagomraader`;

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
];
