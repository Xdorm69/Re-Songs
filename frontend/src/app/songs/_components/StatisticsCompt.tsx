import { responseData } from "./SongTable";

export default function StatisticsCompt({data}: {data: responseData}) {
  return (
    <>
      <h2 className="text-xl py-2 text-emerald-400 font-semibold">
        Statistics
      </h2>
      <div className="text-sm  flex items-center gap-2">
        <p className="text-muted-foreground">Categories Count: </p>
        <span className="font-semibold">{data.categories_count}</span>
      </div>
      <div className="text-sm  flex items-center gap-2">
        <p className="text-muted-foreground">Artists Count: </p>
        <span className="font-semibold">{data.artists_count}</span>
      </div>
      <div className="text-sm  flex items-center gap-2">
        <p className="text-muted-foreground">Songs Count: </p>
        <span className="font-semibold">{data.songs_count}</span>
      </div>
      <div className="text-sm  flex items-center gap-2">
        <p className="text-muted-foreground">Matched Songs Count: </p>
        <span className="font-semibold">{data.matched.length}</span>
      </div>
      <div className="text-sm  flex items-center gap-2">
        <p className="text-muted-foreground">Unmatched Songs Count: </p>
        <span className="font-semibold text-red-500/70">
          {data.unmatched.length}
        </span>
      </div>
    </>
  );
}
