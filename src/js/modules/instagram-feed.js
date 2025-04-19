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

    const data = await response.json();

    container.innerHTML = ""; // Czyścimy kontener

    // Dodajemy zdjęcia do kontenera
    data.forEach((item) => {
      container.appendChild(createImageElement(item.media_url));
    });

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
  img.className = "instagram-image";
  img.loading = "lazy";
  return img;
}