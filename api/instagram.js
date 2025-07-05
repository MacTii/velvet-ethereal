import { StatusCodes } from "http-status-codes";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const limitParam = searchParams.get("limit");
  const limit = limitParam !== null ? parseInt(limitParam, 10) : null;

  console.log("Instagram API request:", { userId, limit });

  // Refresh token endpoint for Instagram API
  // https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=YOUR_ACCESS_TOKEN
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  console.log("Access Token:", accessToken);

  if (!accessToken) {
    return Response.json(
      { error: "Instagram token nie jest skonfigurowany" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }

  try {
    const response = await fetch(
      `https://graph.instagram.com/${userId}/media?fields=id,media_type,media_url,children{media_url}&access_token=${accessToken}`
    );

    if (!response.ok) {
      const errorData = await response.json();

      const isExpired =
        errorData.error.code === 190 &&
        errorData.error.message.includes("expired");

      if (isExpired) {
        return Response.json(
          {
            error: errorData.error.message,
            expired: true,
          },
          { status: StatusCodes.UNAUTHORIZED }
        );
      }

      return Response.json(
        { error: "Błąd Instagram API", details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();

    const filteredData = [];
    let photoCount = 0;

    for (const post of data.data) {
      if (limit !== null && photoCount >= limit) break;

      if (post.media_type === "CAROUSEL_ALBUM" && post.children) {
        for (const child of post.children.data) {
          if (limit !== null && photoCount >= limit) break;
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
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
