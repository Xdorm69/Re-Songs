"use client";
import React, { useEffect, useState } from "react";
import HoverCard from "./_components/HoverCard";
import { getBackendUrl } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { SortFeatures } from "./_components/SortFeatures";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import ArtistDialog from "./_components/ArtistDialog";

export type ArtistDataType = {
  artist: string;
  category: string;
  imgSrc: string;
  songs: string[];
};

const ArtistsPage = () => {
  const [sortParams, setSortParams] = useState({
    category: "",
    artist: "",
  });
  const [page, setPage] = useState(1);

  const artistsData: ArtistDataType[] | any = useQuery({
    queryKey: ["artists"],
    queryFn: async () => {
      try {
        const res = await fetch(
          getBackendUrl() +
            "/api/artists?category=" +
            sortParams.category +
            "&artist=" +
            sortParams.artist +
            "&page=" +
            page +
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
    },
    refetchOnWindowFocus: false,
    gcTime: 10 * 60 * 1000, //10mins
    staleTime: 10 * 60 * 1000,
  });

  useEffect(() => {
    setPage(1);
    artistsData.refetch();
  }, [sortParams]);

  useEffect(() => {
    artistsData.refetch();
  }, [page]);

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
        {artistsData?.isSuccess &&
          artistsData.data.map((artist: ArtistDataType, id: number) => (
            <HoverCard
              key={id}
              artist={artist.artist}
              category={artist.category}
              imgSrc={artist.imgSrc}
              songs={artist.songs}
            />
          ))}
        <div className="flex justify-center items-center mt-16 gap-4">
          <Button
            variant={"outline"}
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Previous
          </Button>
          <span className="mx-2">Page {page}</span>
          <Button
            variant={"outline"}
            onClick={() => setPage(page + 1)}
            disabled={artistsData?.data?.length < 10}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ArtistsPage;
