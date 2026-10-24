# Orion Panel

Przeglądarkowy projektant rozdzielni automatyki domowej KNX i Loxone. Bez backendu, kont i API. Dane projektu zapisują się w localStorage; przenośna kopia to JSON.

## Uruchomienie

Wymagany Node.js 22 lub nowszy. W paczce do pobrania PDF.js jest już w `dist/vendor/`. Po sklonowaniu repozytorium wykonaj `npm ci` i `npm run build`, aby przygotować tę bibliotekę lokalnie.

```sh
npm ci
npm run build
npm run dev
# http://127.0.0.1:4173
npm test
```

## Cloudflare Workers

```sh
npx wrangler login
npx wrangler deploy
```

`wrangler.jsonc` używa Workers Static Assets, bez funkcji serwerowych, bazy danych i sekretów. Można też wskazać repozytorium w Cloudflare Workers Builds: katalog główny tego projektu, komenda budowania `npm ci && npm run build`, komenda wdrożenia `npx wrangler deploy`. Nie używać przestarzałego Workers Sites.

## Funkcje

- Edycja obwodów, pomieszczeń, mocy i systemu KNX/LOXONE.
- Przekaźniki: parzyste 2–24, domyślnie 24. Wejścia binarne: parzyste 2–24, domyślnie 4. Ściemniacze: domyślnie 4, edytowalne 1–24.
- Profile Gira 24/12 oraz Loxone Relay Extension 14. Profile opisują liczbę kanałów, nie pełne parametry aparatów.
- Rolety i dwukierunkowe karnisze: pary A1/A2, A3/A4 itd.; wymagany moduł z obsługą napędów. Karnisz impulsowy: jeden kanał.
- Przydział: główne oświetlenie, kinkiety, LED, napędy, wejścia. Oddzielne MCB według rodzaju; różne RCD dla grup światła w tym samym pomieszczeniu, gdy liczba grup na to pozwala. Braki są jawnie raportowane.
- Widok logiczny DIN, wykorzystanie kanałów, plan zacisków WAGO 2003-76xx.
- Import/eksport JSON, CSV obwodów i zacisków z ochroną przed formułami arkusza.

## Import PDF

1. Wybierz PDF (do 40 MB). Plik nie opuszcza przeglądarki.
2. Wybierz stronę. Zaznacz przeciągnięciem sam symbol z małym białym marginesem (8–240 px).
3. Wyszukaj powtórzenia, sprawdź położenia i odznacz fałszywe trafienia.
4. Podaj pomieszczenie, typ i system dla danej partii. Dodaj zaznaczone wyniki.
5. Edytuj nazwy, moc, sterowanie i przypisanie do pomieszczeń w liście obwodów. Kilka punktów świetlnych może należeć do jednego obwodu — usuń nadmiarowe kandydatury.

Dopasowanie wzorca działa na obrazie strony, więc obsługuje też skany. Zakłada jednak tę samą skalę i orientację; dla innych symboli lub stron wskaż nowy wzorzec. Nie jest to uniwersalne rozpoznawanie legendy, OCR ani automatyczne śledzenie przewodów. Odczyt etykiet wykorzystuje istniejącą warstwę tekstową. Ponowny import tego samego PDF rozpoczyna nową sesję rozpoznawania; wyniki zaakceptowane w poprzedniej sesji należy kontrolować ręcznie. PDF pozostaje tylko w pamięci; JSON zawiera pozycje zaakceptowanych symboli, bez samego PDF.

## Granice projektu

To narzędzie koncepcyjne, nie dokumentacja wykonawcza. Nie dobiera przekrojów, charakterystyk MCB, prądów znamionowych, typów RCD, bilansu faz, prądów rozruchowych, obciążeń zacisków wspólnych ani zasilaczy LED. Rysunek DIN nie przedstawia wymiarów fizycznych. Plan WAGO dla napędów, LED i sygnałów wymaga doboru konkretnych wariantów i mostków; nie jest gotowym BOM. Separacja RCD musi obejmować przewody neutralne. Blokady kierunków trzeba skonfigurować w aktorze / Loxone Config.

## Źródła

- [Gira 24 wyjścia / 12 napędów: sąsiednie pary i praca mieszana](https://katalog.gira.de/en-GB/datenblatt/4010337060987)
- [Loxone Relay Extension: 14 wyjść](https://pim.loxone.com/datasheet/100038-relay-extension)
- [WAGO 2003-7646: N/L/PE](https://www.wago.com/gb/rail-mount-terminal-blocks/multilevel-installation-terminal-block/p/2003-7646)
- [Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/)
- [PDF.js](https://mozilla.github.io/pdf.js/)

PDF.js 6.4.299 (Apache-2.0) jest przechowywany lokalnie w `dist/vendor/`; licencja w `LICENSE-pdfjs.txt`. Decyzje architektoniczne: `docs/adr/`. Zasady współpracy i PR: `CONTRIBUTING.md`.

