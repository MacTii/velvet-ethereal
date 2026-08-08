/**
 * Pasek o zakonczeniu dzialalnosci jest przypiety (position: fixed), wiec nie
 * zajmuje miejsca w ukladzie. Jego wysokosc zalezy od tego, na ile linii zawinie
 * sie tekst, dlatego mierzymy ja i publikujemy jako --notice-height zamiast
 * wpisywac na sztywno. Z tej zmiennej korzysta odstep body, przesuniecie
 * przypietej nawigacji na mobile i scroll-padding dla kotwic z menu.
 *
 * Pomiar jest powtarzany z kilku zrodel, bo pojedynczy ResizeObserver okazal sie
 * zawodny: na waskich ekranach tekst potrafi przeskoczyc o jedna linie juz po
 * pierwszym pomiarze (dociagniecie kroju pisma, pojawienie sie paska przewijania),
 * a kazdy niedoszacowany piksel to nawigacja wchodzaca na pasek.
 */
export function initSiteNotice() {
  const notice = document.getElementById("site-notice");
  if (!notice) return;

  let ostatnia = -1;

  const publishHeight = () => {
    const wysokosc = notice.offsetHeight;
    if (wysokosc === ostatnia) return;
    ostatnia = wysokosc;
    document.documentElement.style.setProperty("--notice-height", `${wysokosc}px`);
  };

  publishHeight();

  new ResizeObserver(publishHeight).observe(notice);
  window.addEventListener("resize", publishHeight);
  window.addEventListener("load", publishHeight);

  // Zmiana kroju pisma z zapasowego na docelowy przelicza zawijanie tekstu
  document.fonts?.ready.then(publishHeight);
}
