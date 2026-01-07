import type { Ventekriterier } from "../../src/types/Ventekriterier";

export const ventekriterierList: Ventekriterier[] = [
	{
		kodeFaggruppe: "GH",
		typeBilag: "O",
		datoFom: "1900-01-01",
		belopBrutto: undefined,
		belopNetto: 100000.0,
		antDagerEldreenn: undefined,
		tidligereAar: false,
	},
	{
		kodeFaggruppe: "AY",
		typeBilag: "I",
		datoFom: "2020-01-01",
		belopBrutto: 50000.0,
		belopNetto: undefined,
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
];
