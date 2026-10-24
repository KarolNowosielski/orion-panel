# ADR-0002-channel-allocation

Data: 2026-10-24
Status: zaakceptowana

## Kontekst

Różne moduły mają różne pojemności i systemy sterowania.

## Decyzja

Przekaźniki 2–24 parzyste (24 domyślnie), binarne 2–24 parzyste (4 domyślnie), ściemniacze 1–24 (4 domyślnie). Kanały KNX i LOXONE są oddzielne. Profil Loxone Relay Extension ma 14 wyjść.

## Alternatywy

Założenie 24 kanałów dla każdego fizycznego urządzenia odrzucono.

## Konsekwencje

Profile reprezentują logiczną pojemność; parametry wspólnych zacisków i obciążeń wymagają weryfikacji. Algorytm first-fit jest deterministyczny, zgłasza braki i przelicza przydział po edycji; brak przypięć ręcznych.

