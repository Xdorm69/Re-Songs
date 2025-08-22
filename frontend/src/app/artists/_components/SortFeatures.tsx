import { ArtistDataType } from "../page";
import { ArtistsCombobox } from "./ArtistsComboBox";
import { CategoriesSelect } from "./CategoriesSelect";
import { ClearPreferences } from "./ClearPreferences";

export type ArtistsPageSortParamsPropsType = {
  sortParams: { category: string; artist: string; page: number };
  setSortParams: (params: {
    category: string;
    artist: string;
    page: number;
  }) => void;
};

export const SortFeatures = ({
  sortParams,
  setSortParams,
  data,
}: ArtistsPageSortParamsPropsType & { data: ArtistDataType[] | any }) => {
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
          <ClearPreferences
            sortParams={sortParams}
            setSortParams={setSortParams}
          />
        </div>
      </div>
    </>
  );
};
