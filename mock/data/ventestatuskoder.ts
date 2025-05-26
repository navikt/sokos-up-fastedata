import { Ventestatuskoder } from "../../src/types/Ventestatuskoder";

export const ventestatuskoderList: Ventestatuskoder[] = [
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
];
