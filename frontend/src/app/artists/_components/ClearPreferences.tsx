import { Button } from "@/components/ui/button";
import { ArtistsPageSortParamsPropsType } from "./SortFeatures";

export const ClearPreferences = ({
  sortParams,
  setSortParams,
}: ArtistsPageSortParamsPropsType) => {
  return (
    <>
      <Button
        onClick={() =>
          setSortParams({ ...sortParams, artist: "", category: "", page: 1 })
        }
      >
        Clear
      </Button>
    </>
  );
};
