"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import SongTable from "./_components/SongTable";
import SongTableSkeleton from "./_components/SongTableSkeleton";
import { FetchSongs } from "./_fetchHooks/FetchSongs";

const Songs = () => {
  const SongsQuery = useQuery({
    queryKey: ["songs"],
    queryFn: FetchSongs,
    refetchOnWindowFocus: false,
    gcTime: 10 * 60 * 1000,
    staleTime: 10 * 60 * 1000,
  });
  return (
    <div className="py-15 max-w-6xl mx-auto bg-card/70 m-5 px-4 rounded-lg shadow-xl">
      {SongsQuery.isLoading ? (
        <SongTableSkeleton />
      ) : SongsQuery.isSuccess ? (
        <SongTable data={SongsQuery.data} />
      ) : SongsQuery.isError ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-red-500">Failed to fetch songs</p>
        </div>
      ) : null}
    </div>
  );
};

export default Songs;
