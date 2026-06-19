"use client";

import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoPlayerProps {
  src?: string;
  poster?: string;
  title?: string;
  aspectRatio?: "video" | "square" | "vertical";
}

export function VideoPlayer({ src, poster, title, aspectRatio = "video" }: VideoPlayerProps) {
  const aspectClass = {
    video: "aspect-video",
    square: "aspect-square",
    vertical: "aspect-[9/16]",
  }[aspectRatio];

  return (
    <div className={cn("relative w-full overflow-hidden rounded-xl bg-neutral-900", aspectClass)}>
      {/* Placeholder Fallback if no src */}
      {!src && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-900 text-neutral-600">
          <div className="text-center">
            <Play className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm font-medium">{title || "Video Placeholder"}</p>
          </div>
        </div>
      )}

      {src && (
        <video
          src={src}
          poster={poster}
          className="object-cover w-full h-full"
          loop
          playsInline
          controls
        />
      )}
    </div>
  );
}

