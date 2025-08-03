"use client";
import { Twitter, Github, Youtube } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "./ui/separator";

export default function Footer() {
  return (
    <footer className="w-full border-t border-border text-muted-foreground">
      <Separator />
      <div className="mx-auto max-w-7xl px-6 py-10 space-y-8">
        {/* Top: Re-Songs branding & newsletter */}
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <h2 className="text-lg font-semibold text-foreground">
            Stay in the loop with Re-Songs
          </h2>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex w-full max-w-md items-center space-x-2"
          >
            <Input type="email" placeholder="Enter your email" required />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>

        {/* Middle: Links and Social Icons */}
        <div className="flex flex-col items-center justify-between gap-6 border-t border-border pt-6 sm:flex-row">
          <div className="flex space-x-4 text-sm">
            <a
              href="/privacy"
              className="hover:text-foreground transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="hover:text-foreground transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="mailto:contact@resongs.com"
              className="hover:text-foreground transition-colors"
            >
              Contact
            </a>
          </div>

          <div className="flex space-x-4">
            <a
              href="https://twitter.com/resongs"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5 hover:text-foreground transition-colors" />
            </a>
            <a
              href="https://github.com/resongs"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5 hover:text-foreground transition-colors" />
            </a>
            <a
              href="https://youtube.com/@resongs"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <Youtube className="h-5 w-5 hover:text-foreground transition-colors" />
            </a>
          </div>
        </div>

        {/* Bottom: Copyright */}
        <div className="border-t border-border pt-6 text-center text-sm">
          &copy; {new Date().getFullYear()} Re-Songs. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
