export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const limit = parseInt(searchParams.get("limit") || "8", 10);

    console.log("Instagram API request:", { userId, limit });

    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    console.log("Access Token:", accessToken);

    if (!accessToken) {
        return Response.json(
            { error: "Instagram token nie jest skonfigurowany" },
            { status: 500 }
        );
    }

    try {
        const response = await fetch(
            `https://graph.instagram.com/${userId}/media?fields=id,media_type,media_url,children{media_url}&access_token=${accessToken}`
        );

        if (!response.ok) throw new Error("Błąd Instagram API");

        const data = await response.json();

        const filteredData = [];
        let photoCount = 0;

        for (const post of data.data) {
            if (photoCount >= limit) break;

            if (post.media_type === "CAROUSEL_ALBUM" && post.children) {
                for (const child of post.children.data) {
                    if (photoCount >= limit) break;
                    filteredData.push({ media_url: child.media_url });
                    photoCount++;
                }
            } else if (post.media_type === "IMAGE") {
                filteredData.push({ media_url: post.media_url });
                photoCount++;
            }
        }

        return Response.json(filteredData);
    } catch (error) {
        console.error("Instagram API error:", error);
        return Response.json(
            { error: "Nie udało się pobrać danych z Instagrama" },
            { status: 500 }
        );
    }
}
