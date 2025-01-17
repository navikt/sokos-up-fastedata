# Faste data mikrofrontend

Faste data gir saksbehandler innsikt i hvilke oppsettsregler som til enhver tid er gjeldende i Oppdragssystemet.
Hensikten er å avhjelpe saksbehandler med hvilke verdier som er gyldige og kan brukes sammen

</br>Backend til applikasjonen er [sokos-oppdrag](https://github.com/navikt/sokos-oppdrag)

## Miljøer

- [Q1-miljø](https://utbetalingsportalen.intern.dev.nav.no/fastedata)

## Tilganger

### Hvordan få tilgang

For å få tilgang til skjermbildet:

- `0000-GA-SOKOS-MF-Fastedata` (applikasjon i Utbetalingsportalen)

Tilgang fås ved ta kontakt med din identansvarlig. Det kan noen ganger være en strevsomt å få på plass tilganger
i identrutinene. Det er derfor viktig å benytte riktig begrep i kommunikasjon med dem.

### Beskrivelse av AD-grupper og hva de heter i identrutinen

| Navn Identrutinen                                    | AD-gruppe                  | Beskrivelse           |
| ---------------------------------------------------- | -------------------------- | --------------------- |
| Utbetalingsportalen - fastedata - Applikasjontilgang | 0000-GA-SOKOS-MF-Fastedata | Tilgang til fastedata |

## Kom i gang

1. Installere [Node.js](https://nodejs.dev/en/)
2. Installer [pnpm](https://pnpm.io/)
3. Installere dependencies `pnpm install`
4. Start appen lokalt `pnpm run dev` (Mock Service Worker) eller mot backend lokalt `pnpm run dev:backend` [sokos-oppdrag](https://github.com/navikt/sokos-oppdrag)
5. Appen nås på <http://localhost:5173/fastedata>

NB! Anbefaler sette opp [ModHeader](https://modheader.com/) extension på Chrome for å sende med Obo-token i `Authorization` header når du kjører mot backend lokalt da den krever at token inneholder NavIdent.

# Henvendelser

Spørsmål knyttet til koden eller prosjektet kan stilles som issues her på Github.
Interne henvendelser kan sendes via Slack i kanalen #po-utbetaling.
