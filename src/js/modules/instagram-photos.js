const STATIC_PHOTO_COUNT = 16;

// Jedno zapytanie po wszystkie zdjecia, limitowane pozniej per sekcja
export async function fetchInstagramPhotos() {
  try {
    const response = await fetch("/api/instagram");
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Błąd podczas pobierania zdjęć z Instagrama");
    }

    // Pusty feed tez traktujemy jak awarie - lepsze statyczne zdjecia niz pusta galeria
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("Instagram zwrócił pustą listę zdjęć");
    }

    return data;
  } catch (error) {
    console.error("fetchInstagramPhotos error:", error);
    return getStaticInstagramPhotos();
  }
}

function getStaticInstagramPhotos() {
  return Array.from({ length: STATIC_PHOTO_COUNT }, (_, i) => ({
    media_url: `/assets/image-${i + 1}.jpg`,
  }));
}
