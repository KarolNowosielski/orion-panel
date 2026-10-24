# ADR-0005-pdf-pattern-matching

Data: 2026-10-24
Status: zaakceptowana

## Kontekst

Dowolny projekt PDF może być wektorowy lub skanowany, z niestandardową legendą. Brak zgody na backend.

## Decyzja

Lokalny PDF.js 6.4.299, render strony do obrazu, wybór wzorca, dopasowanie próbek czerni i bieli oraz eliminacja nakładających się wyników. Każdy wynik wymaga zatwierdzenia. Odczyt etykiet z warstwy tekstowej.

## Alternatywy

Chmurowe modele AI/OCR i automatyczna interpretacja nieznanych legend odrzucone.

## Konsekwencje

Ta sama skala i obrót, wzorce 8–240 px, limit 300 wyników na przebieg. Punkty graficzne są kandydatami na obwody, nie rozpoznaniem połączeń elektrycznych. PDF do 40 MB tylko w pamięci. Zatwierdzone pozycje i nazwa pliku w JSON. Nowy import to nowa sesja, bez deduplikacji między sesjami.

