import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArtistsPageSortParamsPropsType } from "./SortFeatures";

export const CategoriesSelect = ({
  sortParams,
  setSortParams,
}: ArtistsPageSortParamsPropsType) => {
  return (
    <>
      <Select
        value={sortParams.category}
        onValueChange={(val) =>
          setSortParams({ ...sortParams, category: val, page: 1 })
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Categories</SelectLabel>
            <SelectItem value="punjabi">Punjabi</SelectItem>
            <SelectItem value="haryanvi">Haryanvi</SelectItem>
            <SelectItem value="english">English</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};
