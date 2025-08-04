"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";

export const Hero = () => {
  const container = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

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
      <div ref={container} className="h-[137vh] w-full relative">
        <div className="max-w-6xl mx-auto container">
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center w-full py-16">
              <div className="flex flex-col items-center mt-10 ">
                <h1 className="hero-line text-7xl p-4 md:text-8xl font-bold bg-gradient-to-br tracking-tight from-gray-100 to-gray-700 bg-clip-text text-transparent ">
                  Your Playlist
                </h1>
                <h1 className="hero-line text-7xl p-4 relative -top-10 md:text-8xl font-bold bg-gradient-to-br tracking-tight from-gray-100 to-gray-700 bg-clip-text text-transparent">
                  Refined Instantly
                </h1>
                <p className="hero-sub text-center text-base md:text-lg text-muted-foreground w-5/6 bottom-5 relative md:w-2/3">
                  Instantly apply consistent formatting to every track in your
                  collection, making your playlist easier to browse, manage,
                  share, and enjoy.
                </p>
              </div>
              <div className="w-6xl h-[35rem] absolute bottom-0 overflow-hidden rounded-lg">
                <Image
                  src="/images/hero.jpg"
                  alt="hero"
                  fill
                  className=" object-cover hero-image mask-fade-bottom"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
