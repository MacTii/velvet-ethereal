const BASE_OPTIONS = {
  distance: "24px",
  origin: "bottom",
  duration: 400,
  easing: "cubic-bezier(0.2, 0, 0.2, 1)",
};

// ScrollReveal liczy `delay` od chwili wejscia elementu w kadr, nie od zaladowania
// strony, wiec kazde opoznienie to czas, przez ktory patrzysz na puste miejsce po
// dojechaniu do sekcji. Suma delay + duration musi zostac wyraznie ponizej pol
// sekundy, inaczej tresc nie nadaza za przewijaniem. Kafelki w rzedzie pojawiaja
// sie razem - kaskada miala sens przy wolnym wjezdzie, teraz tylko przeszkadza.
const REVEALS = [
  // --- O nas ---
  [".about__container .section__header", {}],
  [".about__container .section__description", { interval: 60 }],
  [".about__container img", { delay: 60 }],

  // --- Cennik ---
  [".service__container .section__header", {}],
  [".service__container .section__description", { delay: 60 }],
  [".pricing-table", {}],
  [".packages-header", {}],
  [".service__card", {}],
  [".additional-fees", {}],

  // --- Porady ---
  [".blog__content .section__header", {}],
  [".blog__content h4", { delay: 60 }],
  [".blog__content p", { delay: 120 }],
  [".blog__content .blog__btn", { delay: 180 }],
];

export function initAnimations() {
  if (typeof ScrollReveal !== "function") return;

  const sr = ScrollReveal();

  for (const [selector, options] of REVEALS) {
    sr.reveal(selector, { ...BASE_OPTIONS, ...options });
  }
}
