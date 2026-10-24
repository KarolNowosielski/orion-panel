# ADR-0010: Dokładność dopasowania i reguły repozytorium

Data: 2026-10-24
Status: zaakceptowana

## Kontekst

Test PDF w przeglądarce ujawnił pomijanie cienkich linii przy skokowym przeszukiwaniu obrazu. Repozytorium zostało utworzone jako publiczne; plan GitHub Free umożliwia w nim wymuszenie ochrony gałęzi.

## Decyzja

Przeszukujemy obraz co 1 piksel, z okresowym oddaniem sterowania interfejsowi. Wyniki zawsze wymagają kontroli użytkownika. Utrzymujemy bieżącą publiczną widoczność repozytorium z kodem, bez planów użytkownika i danych instalacji. Gałąź main wymaga PR, testu CI, aktualności względem main i rozwiązania rozmów; force push i usuwanie są zabronione, reguły obejmują administratora. Nie wymagamy formalnych approvals w jednoosobowym repozytorium.

## Alternatywy

Skok 2–3 pikseli jest szybszy, lecz może omijać cienkie symbole. Prywatne repozytorium w obecnym planie GitHub nie egzekwuje ochrony gałęzi; wcześniej proponowana prywatna widoczność nie została zastosowana przy utworzeniu repozytorium.

## Konsekwencje

Większy koszt CPU, ale mniej pominięć. Dostępne pozostają progi podobieństwa i ręczne odrzucanie wyników. Dane projektów pozostają wyłącznie lokalnie. Chroniony main uniemożliwia bezpośrednie wprowadzanie zmian z pominięciem PR.
