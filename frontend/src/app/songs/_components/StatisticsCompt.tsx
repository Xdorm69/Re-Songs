import { SongResponseData } from "./Types/SongTableResponseType";
import {
  LayoutGrid,
  Music,
  Users,
  ListMusic,
  CheckCircle,
  XCircle,
  Percent,
} from "lucide-react";
import React, { useRef } from "react";
import MatchRateComp from "./MatchRateComp";

export default function StatisticsCompt({ data }: { data: SongResponseData }) {
  const stats: {
    label: string;
    value: number | string;
    icon: React.ReactNode;
    color: string;
  }[] = [
    {
      label: "Categories",
      value: data.categories_count,
      icon: <LayoutGrid className="h-5 w-5 text-emerald-500" />,
      color: "text-emerald-500",
    },
    {
      label: "Artists",
      value: data.artists_count,
      icon: <Users className="h-5 w-5 text-blue-500" />,
      color: "text-blue-500",
    },
    {
      label: "Total Songs",
      value: data.songs_count,
      icon: <Music className="h-5 w-5 text-purple-500" />,
      color: "text-purple-500",
    },
    {
      label: "Matched",
      value: data.matched.length,
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      color: "text-green-500",
    },
    {
      label: "Unmatched",
      value: data.unmatched.length,
      icon: <XCircle className="h-5 w-5 text-red-500" />,
      color: "text-red-500",
    },
    {
      label: "Match Rate",
      value: `${((data.matched.length / data.songs_count) * 100).toFixed(1)}%`,
      icon: <Percent className="h-5 w-5 text-amber-500" />,
      color: "text-amber-500",
    },
  ];

  const matchRateRef = useRef<HTMLDivElement>(null);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
        <ListMusic className="h-6 w-6 text-emerald-500" />
        Library Statistics
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-card/80 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {stat.label}
                </p>
                <p className={`text-2xl font-semibold ${stat.color}`}>
                  {stat.value}
                </p>
              </div>
              <div
                className={`p-2 rounded-full bg-opacity-10 ${stat.color} bg-${
                  stat.color.split("-")[1]
                }-100 dark:bg-opacity-20`}
              >
                {stat.icon}
              </div>
            </div>
            {stat.label === "Match Rate" && (
              <MatchRateComp data={data} ref={matchRateRef} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
