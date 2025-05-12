import { HttpResponse, http } from "msw";

export const handlers = [
  http.get("/fastedata-api/api/v1/ventekriterier", () => {
    return HttpResponse.json(
      [
        {
          kodeFaggruppe: "GH",
          typeBilag: "O",
          datoFom: "1900-01-01",
          belopBrutto: null,
          belopNetto: 100000.0,
          antDagerEldreenn: null,
          tidligereAar: false,
        },
        {
          kodeFaggruppe: "AY",
          typeBilag: "I",
          datoFom: "2020-01-01",
          belopBrutto: 50000.0,
          belopNetto: null,
          antDagerEldreenn: 30,
          tidligereAar: true,
        },
        {
          kodeFaggruppe: "TR",
          typeBilag: "K",
          datoFom: "2015-06-15",
          belopBrutto: 250000.0,
          belopNetto: 150000.0,
          antDagerEldreenn: 60,
          tidligereAar: false,
        },
      ],
      { status: 200 },
    );
  }),
  http.get("/fastedata-api/api/v1/ventestatuskoder", () => {
    return HttpResponse.json(
      [
        {
          kodeVentestatus: "ADAG",
          beskrivelse: "Periode ikke utbet, navn/adresse mangler",
          prioritet: 120,
          settesManuelt: "N",
          kodeArvesTil: "AVAG",
          kanManueltEndresTil: "AVVE, REAK, REBE, STOP",
        },
        {
          kodeVentestatus: "ADDR",
          beskrivelse: "Periode ikke utbet, navn/adresse mangler",
          prioritet: 120,
          settesManuelt: "N",
          kodeArvesTil: "",
          kanManueltEndresTil: "AVVE, REAK, REBE, STOP",
        },
        {
          kodeVentestatus: "ANRE",
          beskrivelse: "Man. postering samme periode/ytelse",
          prioritet: 130,
          settesManuelt: "N",
          kodeArvesTil: "REBE",
          kanManueltEndresTil: "AVVE, REAK, REBE, STOP",
        },
        {
          kodeVentestatus: "AVAG",
          beskrivelse: "Midlertidig stopp av overfør UR, arb.g.",
          prioritet: 140,
          settesManuelt: "J",
          kodeArvesTil: "STOP",
          kanManueltEndresTil: "AVVE, REAK, REBE, STOP",
        },
      ],
      { status: 200 },
    );
  }),
];
