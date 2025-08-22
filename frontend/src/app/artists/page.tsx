"use client";
import React, { useEffect, useState } from "react";
import HoverCard from "./_components/HoverCard";
import { useQuery } from "@tanstack/react-query";
import { SortFeatures } from "./_components/SortFeatures";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { FetchArtists } from "./FetchArtists";

export type ArtistDataType = {
  artist: string;
  category: string;
  imgSrc: string;
  songs: string;
};

const ArtistsPage = () => {
  const [sortParams, setSortParams] = useState({
    category: "",
    artist: "",
    page: 1,
  });

  const artistsData: ArtistDataType[] | any = useQuery({
    queryKey: ["artists", sortParams],
    queryFn: () => FetchArtists({ sortParams }),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    gcTime: 10 * 60 * 1000, //10mins
    staleTime: 10 * 60 * 1000,
  });

  return (
    <div className="my-15 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-2xl font-bold">Artists</h1>
        <SortFeatures
          sortParams={sortParams}
          setSortParams={setSortParams}
          data={artistsData.isSuccess ? artistsData.data : []}
        />
      </div>
      <div className="flex flex-col gap-2">
        {artistsData.isLoading && (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex items-center space-x-4 p-4 border rounded-lg"
              >
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {artistsData.isSuccess && artistsData.data.length > 0
          ? artistsData.data.map((artist: ArtistDataType, id: number) => (
              <HoverCard
                key={id}
                artist={artist.artist}
                category={artist.category}
                imgSrc={artist.imgSrc}
                songs={artist.songs}
              />
            ))
          : !artistsData.isLoading && <p>No artists found</p>}
        {artistsData.isError && (
          <div className="flex items-center justify-center">
            <p className="text-red-500">Failed to fetch artists</p>
          </div>
        )}
        <div className="flex justify-center items-center mt-16 gap-4">
          <Button
            variant={"outline"}
            onClick={() =>
              setSortParams((p) => ({ ...p, page: Math.max(1, p.page - 1) }))
            }
            disabled={sortParams.page === 1 || artistsData?.isLoading}
          >
            Previous
          </Button>
          <span className="mx-2">
            {artistsData?.isLoading ? "Loading..." : `Page ${sortParams.page}`}
          </span>
          <Button
            variant={"outline"}
            onClick={() => setSortParams((p) => ({ ...p, page: p.page + 1 }))}
            disabled={artistsData?.isLoading || artistsData.data.length < 10}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ArtistsPage;
