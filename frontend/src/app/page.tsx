"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React, {useRef} from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";


const page = () => {
  return (
    <>
      <Hero />
      <div className="w-full h-screen flex items-center justify-center p-4">
        <div className="absolute inset-0 -z-10 frosted-glass" />
        <div className="w-full max-w-2xl">
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
                This application will optimize file names of all your songs in
                the specified path, renaming them in a structured format for
                easier identification and selection. Get started by viewing your
                songs.
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
                🎵 This application runs locally and does not collect any
                information or data from your system. Your music stays private
                and secure on your device.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

const Hero = () => {
  const container = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Animate hero text lines with stagger
      tl.from(".hero-line", {
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: .8,
      });

      // Animate paragraph after text
      tl.from(
        ".hero-sub",
        {
          y: 20,
          opacity: 0,
          duration: .9,
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

export default page;
