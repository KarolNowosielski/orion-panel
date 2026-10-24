# ADR-0004-protection-groups

Data: 2026-10-24
Status: zaakceptowana

## Kontekst

Użytkownik wymaga głównego światła, kinkietów i LED na kolejnych grupach oraz odporności na pojedynczą awarię.

## Decyzja

Sortowanie: main, sconce, led, blind, curtain, input. MCB osobne dla rodzaju i systemu; limit obwodów konfigurowalny. Dla każdego pomieszczenia kolejne rodzaje światła otrzymują najmniej używany odmienny RCD. Przy 2 RCD i 3 rodzajach zgłaszamy ograniczenie.

## Alternatywy

Losowy przydział i jeden RCD dla pomieszczenia odrzucono.

## Konsekwencje

To grupowanie koncepcyjne, bez doboru prądów, charakterystyk, faz i typów RCD. Przewody N, wspólne zasilania aktorów i zasilacze LED wymagają kontroli. Binarne wejścia nie dostają MCB obwodu sieciowego.

