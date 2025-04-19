/**
 * Pobiera zdjęcia z Instagrama i wyświetla je w kontenerze
 * @param {string} accessToken - Token dostępu do Instagram API
 * @param {string} userId - Instagram User ID (np. '17841400000000000')
 * @param {string} containerId - ID elementu HTML, gdzie mają być zdjęcia (np. 'instagram-feed')
 * @param {number} limit - Maksymalna liczba zdjęć do wyświetlenia
 */
export function loadInstagramFeed(
  accessToken,
  userId,
  containerId = "instagram-feed",
  limit = 8
) {
  const container = document.getElementById(containerId);

  if (!container) {
    console.error(`Kontener o ID "${containerId}" nie istnieje!`);
    return;
  }

  // Tymczasowy loader (opcjonalnie)
  container.innerHTML = "<p>Ładowanie zdjęć z Instagrama...</p>";

  fetch(
    `https://graph.instagram.com/${userId}/media?fields=id,media_type,media_url,children{media_url}&access_token=${accessToken}`
  )
    .then((response) => {
      if (!response.ok) throw new Error("Błąd sieci lub API");
      return response.json();
    })
    .then((data) => {
      container.innerHTML = ""; // Czyścimy kontener
      let photoCount = 0;
      console.log(data);
      // Przetwarzamy każdy post
      data.data.forEach((post) => {
        if (photoCount >= limit) return;

        // Post typu CAROUSEL (wiele zdjęć)
        if (post.media_type === "CAROUSEL_ALBUM" && post.children) {
          post.children.data.forEach((child) => {
            if (photoCount >= limit) return;
            container.appendChild(createImageElement(child.media_url));
            photoCount++;
          });
        }
        // Zwykły post (1 zdjęcie)
        else if (post.media_type === "IMAGE") {
          container.appendChild(createImageElement(post.media_url));
          photoCount++;
        }
      });
    })
    .catch((error) => {
      console.error("Błąd ładowania Instagram feed:", error);
      container.innerHTML =
        "<p>Nie udało się załadować zdjęć. Odśwież stronę.</p>";
    });
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
  img.loading = "lazy"; // Lazy loading
  return img;
}
