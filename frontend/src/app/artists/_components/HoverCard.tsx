"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { CapitalizeName } from "@/lib/utils";
import Image from "next/image";

const HoverCard = ({
  category,
  artist,
  imgSrc,
  songs,
}: {
  category: string;
  artist: string;
  imgSrc: string;
  songs: string;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.set(hoverRef.current, { scale: 0 });
  }, []);

  const handleMouseEnter = (e: React.MouseEvent) => {
    const card = cardRef.current;
    const hover = hoverRef.current;

    if (card && hover) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const xPct = (x / rect.width) * 100;
      const yPct = (y / rect.height) * 100;

      gsap.set(hover, {
        x: x - 50,
        opacity: 0,
        y: y - 50,

        transformOrigin: `${xPct}% ${yPct}%`,
      });

      gsap.to(hover, {
        scale: 1,
        duration: 0.3,

        opacity: 1,
        ease: "back.out(1.7)",
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    const hover = hoverRef.current;

    if (card && hover) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.to(hover, {
        x: x - 50,
        y: y - 50,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    const card = cardRef.current;
    const hover = hoverRef.current;

    if (card && hover) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const xPct = (x / rect.width) * 100;
      const yPct = (y / rect.height) * 100;

      gsap.set(hover, {
        transformOrigin: `${xPct}% ${yPct}%`,
      });

      gsap.to(hover, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "back.in(1.7)",
      });
    }
  };

  return (
    <div
      ref={cardRef}
      className="relative w-full"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Follower hover box */}
      <div
        ref={hoverRef}
        className="w-[100px] overflow-hidden h-[100px] rounded absolute pointer-events-none"
      >
        <Image
          src={imgSrc}
          alt={artist}
          fill
          className="object-cover"
          unoptimized={process.env.NODE_ENV !== "production"}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2NjYyIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPgo8cGF0aCBkPSJNMTkgM0g1YTIgMiAwIDAwLTIgMnYxNGMwIC4yMzcuMDg0LjQ2LjIzMy42MzdsNy4wODItOS41ODlhMSAxIDAgMDExLjM3IDBsNy4wODIgOS41ODljLjE0OS4xNzcuMjMzLjQuMjMzLjYzM1Y1YTIgMiAwIDAwLTItMnoiPjwvcGF0aD4KPHBhdGggZD0iTTE1LjUgMTBhMS41IDEuNSAwIDExLTMgMCAxLjUgMS41IDAgMDEzIDB6Ij48L3BhdGg+Cjwvc3ZnPg==';
            target.onerror = null;
          }}
        />
      </div>

      {/* Main card */}
      <div className="w-full py-6 px-4 bg-card/70 rounded shadow flex justify-between items-center">
        <div>
          <h1 className="font-semibold text-xl">{CapitalizeName(artist)}</h1>
          <p className="text-sm text-muted-foreground">
            {CapitalizeName(category)} Artist
          </p>
        </div>
        <div>Songs: {songs}</div>
      </div>
    </div>
  );
};

export default HoverCard;
