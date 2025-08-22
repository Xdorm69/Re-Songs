import { getBackendUrl } from "@/lib/utils";
import { toast } from "sonner";

export const FetchArtists = async ({
  sortParams,
}: {
  sortParams: { category: string; artist: string, page: number };

}) => {
  try {
    const res = await fetch(
      getBackendUrl() +
        "/api/artists?category=" +
        sortParams.category +
        "&artist=" +
        sortParams.artist +
        "&page=" +
        sortParams.page +
        "&limit=10"
    );
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Failed to fetch artists");
    }
    
    const data = await res.json();
    return data;
  } catch (err: any) {
    console.error("Error fetching artists", err?.message);
    toast.error(err?.message || "Failed to fetch artists", {
      id: "artists",
    });
  }
};
