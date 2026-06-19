"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { VideoPlayer } from "./VideoPlayer";
import { Image } from "lucide-react";

export type ProjectLayout = "2-column" | "wide-video" | "standard-video" | "css-grid" | "square-video";

interface MixedMediaCardProps {
  title: string;
  role: string;
  description?: string;
  layout: ProjectLayout;
  videoSrc?: string;
  images?: string[];
}

export function MixedMediaCard({ title, role, description, layout, videoSrc, images = [] }: MixedMediaCardProps) {
  
  const renderMedia = () => {
    switch (layout) {
      case "2-column":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 h-64 md:h-80">
            <VideoPlayer aspectRatio="vertical" title="IG Reels/Ads" src={videoSrc} />
            <div className="grid grid-rows-2 gap-4 h-full">
              <div className="bg-white/5 rounded-xl flex items-center justify-center border border-white/10 h-full overflow-hidden relative">
                {images[0] ? <img src={images[0]} className="object-cover w-full h-full" alt="Poster 1" /> : <Image className="opacity-30" size={32} />}
              </div>
              <div className="bg-white/5 rounded-xl flex items-center justify-center border border-white/10 h-full overflow-hidden relative">
                {images[1] ? <img src={images[1]} className="object-cover w-full h-full" alt="Poster 2" /> : <Image className="opacity-30" size={32} />}
              </div>
            </div>
          </div>
        );
      case "wide-video":
        return (
          <div className="mt-4">
            <VideoPlayer aspectRatio="video" title="Cinematic 16:9" src={videoSrc} />
          </div>
        );
      case "standard-video":
        return (
          <div className="mt-4 max-w-sm mx-auto">
            <VideoPlayer aspectRatio="vertical" title="Vertical Video" src={videoSrc} />
          </div>
        );
      case "css-grid":
        return (
          <div className="grid grid-cols-2 gap-4 mt-4 h-64 md:h-80">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="bg-white/5 rounded-xl flex items-center justify-center border border-white/10 h-full overflow-hidden relative">
                {images[i] ? (
                  <img src={images[i]} className="object-cover w-full h-full" alt={`Poster ${i+1}`} />
                ) : (
                  <div className="text-center">
                    <Image className="opacity-30 mx-auto mb-2" size={24} />
                    <span className="text-xs text-muted-foreground">Poster {i+1}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      case "square-video":
        return (
          <div className="mt-4 max-w-sm mx-auto">
            <VideoPlayer aspectRatio="square" title="Motion Graphic" src={videoSrc} />
          </div>
        );
    }
  };

  return (
    <Card className="h-full flex flex-col group hover:shadow-[0_0_30px_-5px_rgba(123,44,191,0.3)] transition-all duration-500">
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight">{title}</CardTitle>
        <div className="flex items-center gap-2 mt-2">
          <span className="px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full border border-primary/20">
            {role}
          </span>
        </div>
        {description && <CardDescription className="mt-4 text-base">{description}</CardDescription>}
      </CardHeader>
      <CardContent className="flex-grow">
        {renderMedia()}
      </CardContent>
    </Card>
  );
}
