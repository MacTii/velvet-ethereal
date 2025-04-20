/**
 * Wyświetla zdjęcia z Instagrama w kontenerze
 * @param {string} userId - Instagram User ID (np. '17841400000000000')
 * @param {string} containerId - ID elementu HTML, gdzie mają być zdjęcia (np. 'instagram-feed')
 * @param {number} limit - Maksymalna liczba zdjęć do wyświetlenia
 */
export async function loadInstagramFeed(
  userId,
  containerId = "instagram-feed",
  limit = 8
) {
  const container = document.getElementById(containerId);

  if (!container) {
    console.error(`Kontener o ID "${containerId}" nie istnieje!`);
    return;
  }

  // Tymczasowy loader
  container.innerHTML = "<p>Ładowanie zdjęć z Instagrama...</p>";

  try {
    const response = await fetch(`/api/instagram?userId=${userId}&limit=${limit}`);

    if (!response.ok) throw new Error("Błąd podczas pobierania danych");

    const images = await response.json();

    container.innerHTML = ""; // Czyścimy kontener

    // 1. Dodaj oryginalne zdjęcia
    images.forEach((img) => {
      container.appendChild(createImageElement(img.media_url));
    });

    // 2. Dodaj KOPIE wszystkich zdjęć z aria-hidden
    if(containerId === "instagram-feed") {
      images.forEach(img => {
        const clone = createImageElement(img.media_url);
        clone.setAttribute('aria-hidden', 'true');
        container.appendChild(clone);
      });
    }

  } catch (error) {
    console.error("Błąd ładowania Instagram feed:", error);
    container.innerHTML =
      "<p>Nie udało się załadować zdjęć. Odśwież stronę.</p>";
  }
}

/**
 * Tworzy element <img> dla zdjęcia
 * @param {string} url - URL zdjęcia
 * @returns {HTMLElement} Element <img>
 */
function createImageElement(url) {
  const img = document.createElement("img");
  img.src = url;
  img.alt = "Instagram post";
  //img.className = "instagram-image";
  //img.loading = "lazy";
  return img;
}