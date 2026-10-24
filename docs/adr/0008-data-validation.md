# ADR-0008-data-validation

Data: 2026-10-24
Status: zaakceptowana

## Kontekst

Pliki JSON, etykiety PDF i CSV są niezaufanym wejściem.

## Decyzja

Walidacja wersji, liczby rekordów, kanałów, typów, systemów, mocy i unikalności identyfikatorów. Escapowanie HTML. CSV z cytowaniem i neutralizacją formuł. Limity JSON 10 MB, 3000 obwodów, 500 modułów.

## Alternatywy

Bezpośrednie renderowanie treści importu i uruchamianie kodu z PDF odrzucono.

## Konsekwencje

Import błędnego JSON jest odrzucany przed zastąpieniem projektu. Wyłączenie ewaluacji w PDF.js i lokalne zasoby zmniejszają powierzchnię ataku. Aktualizacje PDF.js wymagają ponownego testu.

