import { toast } from "sonner";
import { getBackendUrl } from "@/lib/utils";

export const handleSortDialogButton = async (
  secret: string,
  queryClient: any,
  setSecret: React.Dispatch<React.SetStateAction<string>>,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
): Promise<void> => {
  toast.loading("Sorting Songs", { id: "songs" });
  try {
    const res = await fetch(getBackendUrl() + "/api/rename", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ secret }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Error sorting songs");
    }

    // Update UI state first
    setSecret("");
    setOpen(false);

    // Show success message
    toast.success(data.message || "Songs sorted successfully!", {
      id: "songs",
    });

    // Then trigger refetch
    await queryClient.refetchQueries({
      queryKey: ["songs"],
    });
  } catch (error: any) {
    console.error("Error sorting songs:", error);
    toast.error(
      `Failed to sort songs: ${error?.message || "Unknown error occurred"}`,
      {
        id: "songs",
        duration: 5000,
      }
    );
    // Ensure dialog stays open on error
    setSecret("");
    setOpen(false);
  }
};
