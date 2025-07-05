/**
 * Renderuje zdjęcia do kontenera na podstawie przekazanej listy
 * @param {Array} images - Tablica zdjęć (np. z fetchInstagramPhotos)
 * @param {string} containerId - ID kontenera w DOM
 * @param {number} limit - Ile zdjęć wyrenderować (z początku listy)
 */
export function loadInstagramMedia(images, containerId, limit) {
  const container = document.getElementById(containerId);

  if (!container) {
    console.error(`Kontener o ID "${containerId}" nie istnieje!`);
    return;
  }

  container.innerHTML = ""; // Czyścimy kontener

  const selectedImages = images.slice(0, limit);

  // 1. Dodaj oryginalne zdjęcia
  selectedImages.forEach((img) => {
    container.appendChild(createImageElement(img.media_url));
  });

  // 2. Dodaj kopie dla instafeed
  if (containerId === "instagram-feed") {
    selectedImages.forEach((img) => {
      const clone = createImageElement(img.media_url);
      clone.setAttribute("aria-hidden", "true");
      container.appendChild(clone);
    });
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
  // img.className = "instagram-image";
  // img.loading = "lazy";
  return img;
}
