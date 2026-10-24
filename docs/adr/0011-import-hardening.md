# ADR-0011: Dodatkowa ochrona importowanych identyfikatorów

Data: 2026-10-24
Status: zaakceptowana

## Kontekst

Identyfikatory z JSON są tekstem niezaufanym, także przy budowaniu atrybutów przycisków modułów. Deklaracja obsługi napędów musi mieć jednoznaczny typ.

## Decyzja

Escapujemy również nazwy akcji w atrybucie data-action. Walidator wymaga logicznego boolean dla blindCapable. Wprowadzamy poprawkę przez osobny PR po pierwszym scaleniu.

## Alternatywy

Zaufanie identyfikatorom z lokalnych plików odrzucono, ponieważ mogą zostać udostępnione przez osoby trzecie.

## Konsekwencje

Nietypowe identyfikatory pozostają tekstem i nie mogą tworzyć atrybutów HTML. Import modułu bez jawnej flagi napędu jest odrzucany. Dotychczasowe pliki tworzone przez aplikację zawierają tę flagę.
