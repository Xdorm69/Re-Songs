"use client"

import { useState } from "react";
import { ArtistDataType } from "../page";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ArtistsCombobox({
  sortParams,
  data,
  setSortParams,
}: {
  sortParams: { category: string; artist: string };
  data: ArtistDataType[];
  setSortParams: (params: { category: string; artist: string }) => void;
}) {
  const [open, setOpen] = useState(false);
  const selectedArtist = sortParams.artist;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[220px] justify-between"
        >
          {selectedArtist
            ? selectedArtist
                .split(" ")
                .map((w) => w[0].toUpperCase() + w.slice(1))
                .join(" ")
            : "Select artist"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[220px] p-0">
        <Command>
          <CommandInput placeholder="Search artists..." />
          <CommandEmpty>No artist found.</CommandEmpty>
          <CommandGroup>
            {data?.map((a) => (
              <CommandItem
                key={a.artist}
                value={a.artist}
                onSelect={() => {
                  const isSelected = selectedArtist === a.artist;
                  setSortParams({
                    ...sortParams,
                    artist: isSelected ? "" : a.artist,
                  });
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedArtist === a.artist ? "opacity-100" : "opacity-0"
                  )}
                />
                {a.artist
                  .split(" ")
                  .map((w) => w[0].toUpperCase() + w.slice(1))
                  .join(" ")}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
