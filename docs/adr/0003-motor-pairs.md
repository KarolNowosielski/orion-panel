# ADR-0003-motor-pairs

Data: 2026-10-24
Status: zaakceptowana

## Kontekst

Gira 24/12 łączy sąsiednie wyjścia A1/A2, A3/A4 w kanały napędowe.

## Decyzja

Napęd dwukierunkowy zajmuje 2 sąsiednie kanały od nieparzystego numeru w kompatybilnym module. Karnisz impulsowy zajmuje 1 kanał. Obsługa napędów jest jawną flagą urządzenia.

## Alternatywy

Dowolne 2 kanały, dzielenie między moduły i sterowanie silników ze ściemniacza odrzucono.

## Konsekwencje

Plan rezerwuje pary, lecz nie programuje blokad kierunków ani ETS/Loxone Config. Blokadę i czas przełączenia należy ustawić zgodnie z dokumentacją producenta.

