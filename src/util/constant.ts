export const BASENAME = "/";
export const ROOT = "/fastedata";
export const VENTEKRITERIER = "/fastedata/ventekriterier";
export const VENTESTATUSKODER = "/fastedata/ventestatuskoder";
export const FAGOMRAADER = "/fastedata/fagomraader";
export const KLASSEKODER = "/fastedata/klassekoder";

export const appList = [
  {
    title: "Faggrupper",
    description: "Oppslag og forklaring på faggrupper.",
    route: "",
    disabled: true,
  },
  {
    title: "Fagområder",
    description: "Fagområder og motregningsgrupper",
    route: "fagomraader",
    disabled: false,
  },
  {
    title: "Klassekoder",
    description: "Klassekoder med tilhørende kontonummer",
    route: "klassekoder",
    disabled: false,
  },
  {
    title: "Ventestatuskoder",
    description: "Forklaring og oppslag",
    route: "ventestatuskoder",
    disabled: false,
  },
  {
    title: "Ventekriterier",
    description: "Forklaring og oppslag",
    route: "ventekriterier",
    disabled: false,
  },
];
