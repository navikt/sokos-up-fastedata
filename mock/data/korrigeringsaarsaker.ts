import type { Korrigeringsaarsak } from "../../src/types/Korrigeringsaarsak";

export const korrigeringsaarsakerAAP: Korrigeringsaarsak[] = [
	{
		kodeAarsakKorr: "0001",
		beskrivelse: "Linjestatus endret",
		medforerKorr: true,
	},
	{
		kodeAarsakKorr: "0002",
		beskrivelse: "Skyldner-id endret",
		medforerKorr: true,
	},
	{
		kodeAarsakKorr: "0003",
		beskrivelse: "Utbetales-til-id endret",
		medforerKorr: true,
	},
	{
		kodeAarsakKorr: "0004",
		beskrivelse: "Kode-klassefik endret",
		medforerKorr: true,
	},
	{
		kodeAarsakKorr: "0025",
		beskrivelse: "etteroppgjør",
		medforerKorr: false,
	},
];
