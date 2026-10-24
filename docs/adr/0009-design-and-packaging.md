# ADR-0009-design-and-packaging

Data: 2026-10-24
Status: zaakceptowana

## Kontekst

Użytkownik wybrał Orion Panel. Aplikacja ma być prosta, przeglądarkowa i gotowa do Cloudflare.

## Decyzja

Polski interfejs o charakterze narzędzia projektowego: ciemny panel boczny, jasna przestrzeń robocza, akcent zielony, widok DIN. Bez zewnętrznych fontów i obrazów. PDF.js przypięty w package-lock; build kopiuje go do dist/vendor.

## Alternatywy

Dekoracyjna strona marketingowa i zasoby z CDN przy każdym użyciu odrzucone.

## Konsekwencje

Kod źródłowy nie przechowuje wygenerowanego vendor; npm ci i npm run build odtwarzają go. Paczka użytkowa zawiera gotowy dist. Hosting Sites i samodzielny Cloudflare mają osobne pochodzenia i osobny localStorage.

