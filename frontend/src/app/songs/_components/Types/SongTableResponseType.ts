export type SongResponseData = {
  status: "success" | "error";
  categories_count: number;
  artists_count: number;
  songs_count: number;
  matched: { category: string; artist: string; song: string }[];
  unmatched: string[];
};