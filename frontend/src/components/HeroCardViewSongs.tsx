import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";
import { Button } from "./ui/button";

export const CardViewSongs = () => {
  return (
    <Card className="overflow-hidden bg-card/50 backdrop-blur-2xl border-border/30 shadow-2xl">
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">
              Welcome to Re-Songs
            </h2>
            <CardTitle className="text-2xl">
              Optimize Your Music Collection
            </CardTitle>
          </div>
          <div className="flex-1 ml-10 bg-secondary-animation-gradient h-[70px] rounded-full shadow-xl" />
        </div>
        <CardDescription className="text-base">
          This application will optimize file names of all your songs in the
          specified path, renaming them in a structured format for easier
          identification and selection. Get started by viewing your songs.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Link href="/songs" className="block">
          <Button className="w-full h-12 text-lg" size="lg">
            View Songs
          </Button>
        </Link>
      </CardContent>
      <CardFooter className="bg-foreground/5 p-4">
        <p className="text-xs text-muted-foreground text-center">
          🎵 This application runs locally and does not collect any information
          or data from your system. Your music stays private and secure on your
          device.
        </p>
      </CardFooter>
    </Card>
  );
};
