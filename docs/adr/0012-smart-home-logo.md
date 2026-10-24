# ADR-0012: Logo inteligentnego domu i uproszczenie menu

Data: 2026-10-24
Status: zaakceptowana

## Kontekst

Użytkownik wybrał propozycję logo nr 4 (inteligentny dom ze ścieżkami i gwiazdą) i poprosił o usunięcie wpisu KNX / LOXONE z dolnej części lewego menu.

## Decyzja

Zastępujemy dotychczasowy symbol i napis marki oryginalną grafiką nr 4, przechowywaną lokalnie w dist/assets/orion-panel-logo.png. Logo pokazujemy na jasnym polu z zachowaniem proporcji. Na wąskim ekranie pole odsłania sam znak domu, bez drobnego napisu. CSS kadruje wyłącznie sposób wyświetlania; oryginalny plik pozostaje niezmieniony. Usuwamy wskazany wpis z dolnej części menu. Zmiana trafia przez PR z CI i przeglądem autora.

## Alternatywy

Uproszczona konstelacja z poprzedniej propozycji została odrzucona przez użytkownika. Nie odrysowujemy logo, aby zachować wybraną grafikę.

## Konsekwencje

Zmiana dotyczy identyfikacji wizualnej i treści menu. Logo jest lokalnym PNG, bez zewnętrznych zasobów. Oznaczenia systemów w modułach i obwodach zachowują swoje funkcjonalne znaczenie. Pole marki ma tekst alternatywny; boczne menu może przewijać się na niskich ekranach.
