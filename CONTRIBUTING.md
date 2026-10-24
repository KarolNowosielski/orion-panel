# Współpraca i pull requesty

1. Zmiany funkcjonalne na gałęzi `feature/*` lub `fix/*`; `main` utrzymuj gotowy do wdrożenia.
2. Małe, tematyczne commity. Użytkownik upoważnił automatyczne commitowanie i obsługę PR bez każdorazowego pytania.
3. PR opisuje docelowe zachowanie, testy, ograniczenia i ADR. Sprawdzenie `Verify / test` musi przejść przed scaleniem.
4. Przegląd obejmuje algorytm przydziału, separację KNX/Loxone, pary silników, walidację importu, bezpieczeństwo HTML/CSV i zapis lokalny. Zapisz wynik przeglądu i popraw uwagi przed scaleniem.
5. Scalaj przez squash po sprawdzeniu dokładnego SHA. Nie wymuszaj push na main i nie zapisuj sekretów ani rzeczywistych planów użytkownika.
6. GitHub nie pozwala autorowi zatwierdzić własnego PR. Samodzielny przegląd zapisujemy jako COMMENT, nigdy jako pozorowane niezależne APPROVE. Formalne zatwierdzenie wymaga innego uprawnionego konta; nie tworzymy dodatkowej tożsamości do obchodzenia tej zasady. Nie wymagamy fikcyjnego self-approval w jednoosobowym repozytorium.
7. CI jest automatycznym sprawdzeniem, nie recenzją elektryczną. Publikacja zmian wykonawczych wymaga weryfikacji projektanta instalacji poza tym procesem.

Ochrona gałęzi zależy od planu GitHub. Jeśli jest dostępna: wymagaj PR, testów CI i rozwiązania rozmów, blokuj usuwanie/force push. Nie wymagaj jednego APPROVE w repozytorium obsługiwanym wyłącznie przez autora. Dokumentacja zasad nie oznacza automatycznie włączonej ochrony serwerowej.
