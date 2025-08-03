import { Button } from "@/components/ui/button";

export const ClearPreferences = ({
  setSortParams,
}: {
  setSortParams: (params: { category: string; artist: string }) => void;
}) => {
  return (
    <>
      <Button onClick={() => setSortParams({ artist: "", category: "" })}>
        Clear
      </Button>
    </>
  );
};
