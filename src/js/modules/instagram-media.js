/**
 * Renderuje zdjecia do wskazanego kontenera.
 * @param {Array<{media_url: string}>} images - lista zdjec do wyrenderowania
 * @param {string} containerId - ID kontenera w DOM
 * @param {{duplicate?: boolean}} [options] - duplicate powiela zdjecia,
 *   co jest potrzebne do plynnej petli w przewijanym pasku instagramowym
 */
export function loadInstagramMedia(images, containerId, { duplicate = false } = {}) {
  const container = document.getElementById(containerId);

  if (!container) {
    console.error(`Kontener o ID "${containerId}" nie istnieje!`);
    return;
  }

  container.replaceChildren();

  images.forEach((img, index) => {
    container.appendChild(createImageElement(img.media_url, index));
  });

  if (duplicate) {
    images.forEach((img, index) => {
      const clone = createImageElement(img.media_url, index);
      clone.setAttribute("aria-hidden", "true");
      container.appendChild(clone);
    });
  }
}

/**
 * @param {string} url - URL zdjecia
 * @param {number} index - pozycja zdjecia, uzywana przez modal galerii
 * @returns {HTMLImageElement}
 */
function createImageElement(url, index) {
  const img = document.createElement("img");
  img.src = url;
  img.alt = "Wnętrze studia fotograficznego Aksamitna Eteryka";
  img.loading = "lazy";
  img.decoding = "async";
  img.dataset.index = String(index);
  return img;
}
