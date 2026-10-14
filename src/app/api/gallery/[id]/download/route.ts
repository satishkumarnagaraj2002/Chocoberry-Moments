import { galleryItems } from "@/data/gallery";

const extensions: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export async function GET(_request: Request, { params }: RouteContext<"/api/gallery/[id]/download">) {
  const { id } = await params;
  const item = galleryItems.find((galleryItem) => galleryItem.id === id);
  if (!item) return new Response("Image not found", { status: 404 });

  const imageUrl = new URL(item.image);
  imageUrl.searchParams.delete("auto");
  imageUrl.searchParams.set("fm", "jpg");

  try {
    const imageResponse = await fetch(imageUrl, { headers: { Accept: "image/jpeg" }, cache: "force-cache" });
    const contentType = imageResponse.headers.get("content-type")?.split(";")[0] ?? "";
    const extension = extensions[contentType];
    if (!imageResponse.ok || !imageResponse.body || !extension) {
      return new Response("Image download is unavailable", { status: 502 });
    }

    const filename = `${item.id}.${extension}`;
    return new Response(imageResponse.body, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch {
    return new Response("Image download is unavailable", { status: 502 });
  }
}
