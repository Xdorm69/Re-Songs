import { Hero } from "@/components/HeroAnim";
import { CardViewSongs } from "@/components/HeroCardViewSongs";
import React from "react";

const page = () => {
  return (
    <>
      <Hero />
      <div className="w-full h-screen flex items-center justify-center p-4">
        <div className="absolute inset-0 -z-10 frosted-glass" />
        <div className="w-full max-w-2xl">
          <CardViewSongs />
        </div>
      </div>
    </>
  );
};

export default page;
