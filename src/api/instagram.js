/**
 * Pobiera dane z Instagram API
 * @param {string} userId - Instagram User ID
 * @param {number} limit - Maksymalna liczba zdjęć
 */
export default async function handler(req, res) {
    const { userId, limit = 8 } = req.query;

    console.log("Instagram API request:", { userId, limit });

    // Token powinien być w zmiennych środowiskowych
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

    if (!accessToken) {
        return res.status(500).json({ error: "Instagram token nie jest skonfigurowany" });
    }

    try {
        const response = await fetch(
            `https://graph.instagram.com/${userId}/media?fields=id,media_type,media_url,children{media_url}&access_token=${accessToken}`
        );

        if (!response.ok) throw new Error("Błąd Instagram API");

        const data = await response.json();

        // Filtrujemy i formatujemy dane
        const filteredData = [];
        let photoCount = 0;

        for (const post of data.data) {
            if (photoCount >= limit) break;

            // Post typu CAROUSEL (wiele zdjęć)
            if (post.media_type === "CAROUSEL_ALBUM" && post.children) {
                for (const child of post.children.data) {
                    if (photoCount >= limit) break;
                    filteredData.push({ media_url: child.media_url });
                    photoCount++;
                }
            }
            // Zwykły post (1 zdjęcie)
            else if (post.media_type === "IMAGE") {
                filteredData.push({ media_url: post.media_url });
                photoCount++;
            }
        }

        res.status(200).json(filteredData);
    } catch (error) {
        console.error("Instagram API error:", error);
        res.status(500).json({ error: "Nie udało się pobrać danych z Instagrama" });
    }
}