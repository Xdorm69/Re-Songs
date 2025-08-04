"use client";
import React, { forwardRef, useRef, useImperativeHandle } from "react";
import { SongResponseData } from "./Types/SongTableResponseType";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

interface MatchRateCompProps {
  data: SongResponseData;
}

const MatchRateComp = forwardRef<HTMLDivElement, MatchRateCompProps>(
  ({ data }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);

    // Forward the ref to the container div
    useImperativeHandle(ref, () => containerRef.current!);

    useGSAP(() => {
      if (!progressRef.current) return;

      gsap.to(progressRef.current, {
        width: `${((data.matched.length / data.songs_count) * 100).toFixed(
          1
        )}%`,
        duration: 2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "top 20%",
          markers: process.env.NODE_ENV === "development",
        },
      });
    }, [data]);

    return (
      <div ref={containerRef} className="mt-3">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            ref={progressRef}
            className="bg-emerald-500 line h-2 rounded-full w-0"
          />
        </div>
      </div>
    );
  }
);

MatchRateComp.displayName = "MatchRateComp";

export default MatchRateComp;
