import Link from "next/link";
import React from "react";
import { Separator } from "./ui/separator";
import { Music } from "lucide-react";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="">
      <div className="flex items-center justify-between py-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between">
            <div>
              <Link
                href={"/"}
                className="flex gap-2 items-center text-xl text-foreground"
              >
                <Music />
                <h1 className="font-semibold ">Re-Songs</h1>
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Link href={"/songs"}>
                <Button variant={"ghost"} size={"sm"}>
                  Songs
                </Button>
              </Link>
              <Link href={"/artists"}>
                <Button variant={"ghost"} size={"sm"}>
                  Artists
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Separator />
    </nav>
  );
};

export default Navbar;
