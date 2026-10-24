# ADR-0007-pr-and-review

Data: 2026-10-24
Status: zaakceptowana

## Kontekst

Użytkownik upoważnił automatyczne commity, PR, przegląd i zatwierdzanie.

## Decyzja

Gałęzie feature/fix, CI na Node 22, testy algorytmu i importu, template PR, przegląd różnic. Wynik samodzielnego przeglądu zapisujemy jako COMMENT; po zielonym CI squash z kontrolą SHA.

## Alternatywy

Pozorowane self-approval i dodatkowa tożsamość do obchodzenia GitHub są odrzucone.

## Konsekwencje

GitHub blokuje APPROVE własnego PR. Formalna niezależna akceptacja wymaga drugiego konta. Zasady zapisane w repo; ochrona gałęzi zależy od możliwości konta i musi zostać osobno potwierdzona serwerowo.

