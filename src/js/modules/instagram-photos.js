// One request to fetch all instagram photos and then limit them for components
export async function fetchInstagramPhotos(userId, limit = null) {
  try {
    const params = new URLSearchParams({ userId });
    if (limit !== null) {
      params.append("limit", limit);
    }

    const response = await fetch(`/api/instagram?${params.toString()}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || "Błąd podczas pobierania zdjęć z Instagrama"
      );
    }

    return data;
  } catch (error) {
    console.error("fetchInstagramPhotos error:", error);

    // Fallback – static images
    return getStaticInstagramPhotos(limit);
  }
}

function getStaticInstagramPhotos(limit) {
  const staticPhotos = [];

  for (let i = 1; i <= 16; i++) {
    staticPhotos.push({ media_url: `/assets/image-${i}.jpg` });
  }

  return limit ? staticPhotos.slice(0, limit) : staticPhotos;
}
