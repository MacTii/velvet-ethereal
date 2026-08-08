const BASE_OPTIONS = {
  distance: "40px",
  origin: "bottom",
  duration: 600,
  easing: "cubic-bezier(0.2, 0, 0.2, 1)",
};

// ScrollReveal liczy `delay` od chwili wejscia elementu w kadr, nie od zaladowania
// strony. Dlatego opoznienia zeruja sie w kazdej grupie wizualnej - kaskada ma sens
// tylko miedzy elementami, ktore pojawiaja sie razem. Do tego sluzy `interval`.
const REVEALS = [
  // --- O nas ---
  [".about__container .section__header", {}],
  [".about__container .section__description", { delay: 120, interval: 120 }],
  [".about__container img", { delay: 240 }],

  // --- Cennik: naglowek sekcji ---
  [".service__container .section__header", {}],
  [".service__container .section__description", { delay: 120 }],

  // --- Cennik: tabela (wlasny blok, wchodzi w kadr osobno) ---
  [".pricing-table", {}],

  // --- Cennik: kafelki pakietow (na desktopie caly rzad wchodzi naraz) ---
  [".packages-header", {}],
  [".service__card", { delay: 120, interval: 120 }],

  // --- Cennik: dodatkowe oplaty (osobny blok pod kafelkami) ---
  [".additional-fees", {}],

  // --- Porady ---
  [".blog__content .section__header", {}],
  [".blog__content h4", { delay: 120 }],
  [".blog__content p", { delay: 240 }],
  [".blog__content .blog__btn", { delay: 360 }],
];

export function initAnimations() {
  if (typeof ScrollReveal !== "function") return;

  // Przy wlaczonej redukcji ruchu nie chowamy niczego - tresc ma byc od razu widoczna
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const sr = ScrollReveal();

  for (const [selector, options] of REVEALS) {
    sr.reveal(selector, { ...BASE_OPTIONS, ...options });
  }
}
