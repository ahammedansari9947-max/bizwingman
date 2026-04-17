"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, MessageSquare, Sparkles, ChevronRight, Share2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export interface CampaignData {
  calendar: {
    day: string;
    platform: string;
    theme: string;
    preview: string;
  }[];
  captions: {
    day: string;
    caption: string;
    imagePrompt: string;
  }[];
}

export function CampaignResults({ data }: { data: CampaignData }) {
  const handleCopy = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    toast.success(message);
  };

  const handleCopyAll = () => {
    const allText = data.captions.map((c) => `--- ${c.day} ---\n\nCaption:\n${c.caption}\n\nImage Prompt:\n${c.imagePrompt}\n`).join("\n");
    handleCopy(allText, "Full campaign strategy copied!");
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex items-center justify-between pb-4 border-b">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Marketing Blueprint</h2>
          <p className="text-sm text-muted-foreground mt-1">Sequential 7-day strategy optimized for your brand goal.</p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleCopyAll}
          className="saas-button-secondary rounded-lg font-semibold"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Copy Full Strategy
        </Button>
      </div>

      <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
        {data.captions.map((item) => {
          const calendar = data.calendar.find((c) => c.day === item.day);
          const cleanPrompt = item.imagePrompt.replace(/[\r\n]+/g, " ").trim();
          const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(cleanPrompt)}?width=800&height=800&nologo=true`;

          return (
            <Card key={item.day} className="saas-card group">
              <div className="flex flex-col h-full">
                {/* Visual Header */}
                <div className="relative aspect-video bg-secondary/30 overflow-hidden border-b">
                  <img
                    src={imageUrl}
                    alt={`Visual for ${item.day}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1604050936284-88db09a96ea0?auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <div className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white uppercase tracking-wider">
                      {item.day}
                    </div>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 flex flex-col flex-1 space-y-5">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary">{calendar?.platform || "Social"}</span>
                        <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{calendar?.theme || "Engagement"}</span>
                      </div>
                      <h3 className="text-lg font-bold text-foreground leading-tight">
                        {calendar?.preview || "Campaign Asset"}
                      </h3>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleCopy(`${item.caption}\n\nImage Prompt: ${item.imagePrompt}`, `${item.day} caption copied!`)}
                      className="h-9 w-9 hover:bg-secondary rounded-lg"
                    >
                      <Copy className="w-4 h-4 text-muted-foreground" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                      <MessageSquare className="w-3 h-3" />
                      Social Copy
                    </div>
                    <div className="p-4 bg-secondary/30 rounded-xl border border-border/50">
                      <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap">
                        {item.caption}
                      </p>
                    </div>
                  </div>

                  <div className="mt-auto pt-4 border-t border-border/50">
                    <div className="flex items-center justify-between text-[10px]">
                      <div className="flex items-center gap-2 text-muted-foreground font-medium italic truncate max-w-[200px]">
                        <Sparkles className="w-3 h-3 text-primary/60 shrink-0" />
                        "{item.imagePrompt}"
                      </div>
                      <div className="flex items-center gap-1 text-primary font-bold">
                        <ChevronRight className="w-3 h-3" />
                        Ready to Post
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
