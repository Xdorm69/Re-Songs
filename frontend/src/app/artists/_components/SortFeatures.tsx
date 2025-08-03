import { ArtistDataType } from "../page";
import { ArtistsCombobox } from "./ArtistsComboBox";
import { CategoriesSelect } from "./CategoriesSelect";
import { ClearPreferences } from "./ClearPreferences";

export const SortFeatures = ({
  sortParams,
  setSortParams,
  data,
}: {
  sortParams: { category: string; artist: string };
  setSortParams: (params: { category: string; artist: string }) => void;
  data: ArtistDataType[] | any;
}) => {
  return (
    <>
      <div className="flex gap-4">
        <div>
          <CategoriesSelect
            sortParams={sortParams}
            setSortParams={setSortParams}
          />
        </div>
        <div>
          <ArtistsCombobox
            sortParams={sortParams}
            setSortParams={setSortParams}
            data={data}
          />
        </div>
        <div>
          <ClearPreferences setSortParams={setSortParams} />
        </div>
      </div>
    </>
  );
};
