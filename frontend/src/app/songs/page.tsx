"use client";
import { getBackendUrl } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import SongTable from "./_components/SongTable";
import SongTableSkeleton from "./_components/SongTableSkeleton";
import { toast } from "sonner";

const Songs = () => {
  const SongsQuery = useQuery({
    queryKey: ["songs"],
    queryFn: async () => {
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
    },
    refetchOnWindowFocus: false,
    gcTime: 10 * 60 * 1000,
    staleTime: 10 * 60 * 1000,
  });
  return (
    <div className="py-15 max-w-6xl mx-auto bg-card/70 m-5 px-4 rounded-lg shadow-xl">
      {SongsQuery.isLoading ? (
        <SongTableSkeleton />
      ) : (
        <SongTable data={SongsQuery.data} />
      )}
    </div>
  );
};

export default Songs;
