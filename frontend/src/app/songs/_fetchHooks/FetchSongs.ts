import { getBackendUrl } from "@/lib/utils";
import { toast } from "sonner";

export async function FetchSongs() {
  try {
    toast.loading("Fetching Songs", { id: "songs" });
    const res = await fetch(getBackendUrl() + "/api/songs");

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Failed to fetch songs");
    }

    const data = await res.json();
    toast.success("Songs Fetched Successfully", { id: "songs" });
    return data;
    
  } catch (err: any) {
    console.error("Error fetching songs", err?.message);
    toast.error(err?.message || "Failed to fetch songs", { id: "songs" });
  }
}
