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
    throw error;
  }
}
