"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";

export const Hero = () => {
  const container = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      // Animate hero text lines with stagger
      tl.from(".hero-line", {
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
      });

      // Animate paragraph after text
      tl.from(
        ".hero-sub",
        {
          y: 20,
          opacity: 0,
          duration: 0.9,
        },
        "-=0.3"
      );

      // Animate image fade in from bottom
      tl.from(
        ".hero-image",
        {
          y: 40,
          opacity: 0,
          duration: 1.2,
        },
        "-=0.5"
      );
    },
    { scope: container }
  );
  return (
    <>
      <div ref={container} className="min-h-[100vh] w-full relative">
        <div className="max-w-6xl mx-auto container">
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center w-full py-8 md:py-16 px-4">
              <div className="flex flex-col items-center text-center w-full max-w-4xl">
                <h1 className="hero-line text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-br tracking-tight from-gray-100 to-gray-700 bg-clip-text text-transparent mb-2">
                  Your Playlist
                </h1>
                <h1 className="hero-line text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-br tracking-tight from-gray-100 to-gray-700 bg-clip-text text-transparent mb-6 md:mb-8">
                  Refined Instantly
                </h1>
                <p className="hero-sub text-sm sm:text-base md:text-lg text-muted-foreground w-full max-w-2xl mb-8 md:mb-12">
                  Instantly apply consistent formatting to every track in your
                  collection, making your playlist easier to browse, manage,
                  share, and enjoy.
                </p>
              </div>
              <div className="relative w-full max-w-6xl h-[20rem] sm:h-[25rem] md:h-[30rem] lg:h-[35rem] mt-8 md:mt-0 rounded-lg overflow-hidden">
                <Image
                  src="/images/hero.jpg"
                  alt="hero"
                  fill
                  className="object-cover hero-image mask-fade-bottom"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
