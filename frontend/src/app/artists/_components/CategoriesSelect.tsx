import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const CategoriesSelect = ({
  sortParams,
  setSortParams,
}: {
  sortParams: { category: string; artist: string };
  setSortParams: (params: { category: string; artist: string }) => void;
}) => {
  return (
    <>
      <Select
        value={sortParams.category}
        onValueChange={(val) => setSortParams({ ...sortParams, category: val })}
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
