# ADR-0001-static-local-first

Data: 2026-10-24
Status: zaakceptowana

## Kontekst

Brak backendu i kont jest wymaganiem użytkownika.

## Decyzja

HTML, CSS i moduły JavaScript; Workers Static Assets, konfiguracja wrangler.jsonc. Stan w localStorage, przenośna kopia JSON. PDF i projekty nie są wysyłane.

## Alternatywy

React/Vite oraz backend odrzucono jako zbędne w tym zakresie.

## Konsekwencje

Prosty hosting i brak kosztów API. localStorage zależy od przeglądarki i originu; konieczne kopie JSON. Prywatny podgląd Sites może mieć bramkę platformy, sama aplikacja nie ma logowania.

