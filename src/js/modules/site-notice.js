/**
 * Pasek o zakonczeniu dzialalnosci jest przypiety (position: fixed), wiec nie
 * zajmuje miejsca w ukladzie. Jego wysokosc zalezy od tego, na ile linii zawinie
 * sie tekst, dlatego mierzymy ja i publikujemy jako --notice-height zamiast
 * wpisywac na sztywno. Z tej zmiennej korzysta odstep body, przesuniecie
 * przypietej nawigacji na mobile i scroll-padding dla kotwic z menu.
 */
export function initSiteNotice() {
  const notice = document.getElementById("site-notice");
  if (!notice) return;

  const publishHeight = () => {
    document.documentElement.style.setProperty(
      "--notice-height",
      `${notice.offsetHeight}px`
    );
  };

  publishHeight();
  new ResizeObserver(publishHeight).observe(notice);
}
