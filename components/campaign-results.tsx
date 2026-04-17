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
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex items-center justify-between pb-6 border-b border-border">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold text-white tracking-tight">Marketing Blueprint</h2>
          <p className="text-muted-foreground">Sequential 7-day strategy optimized for your brand goal.</p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleCopyAll}
          className="saas-button-secondary rounded-lg font-semibold h-10 px-4 hover:bg-[#bfffe6]/5"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Copy Full Strategy
        </Button>
      </div>

      <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
        {data.captions.map((item) => {
          const calendar = data.calendar.find((c) => c.day === item.day);
          const cleanPrompt = item.imagePrompt.replace(/[\r\n]+/g, " ").trim();
          const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(cleanPrompt)}?width=1000&height=1000&nologo=true`;

          return (
            <Card key={item.day} className="saas-card group">
              <div className="flex flex-col h-full">
                {/* Visual Header */}
                <div className="relative aspect-video bg-[#0b1120] overflow-hidden border-b border-border">
                  <img
                    src={imageUrl}
                    alt={`Visual for ${item.day}`}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1604050936284-88db09a96ea0?auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
                  <div className="absolute top-4 left-4">
                    <div className="px-3 py-1.5 rounded-full bg-[#bcd382] border border-white/20 text-[11px] font-bold text-[#1a2e05] uppercase tracking-wider shadow-lg">
                      {item.day}
                    </div>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-8 flex flex-col flex-1 space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold uppercase tracking-widest text-[#96bfe6]">{calendar?.platform || "Social"}</span>
                        <span className="w-1 h-1 rounded-full bg-border" />
                        <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">{calendar?.theme || "Engagement"}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-white leading-tight">
                        {calendar?.preview || "Campaign Asset"}
                      </h3>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleCopy(`${item.caption}\n\nImage Prompt: ${item.imagePrompt}`, `${item.day} caption copied!`)}
                      className="h-10 w-10 hover:bg-[#bfffe6]/10 rounded-lg transition-all duration-200"
                    >
                      <Copy className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                      <MessageSquare className="w-3.5 h-3.5" />
                      Social Copy
                    </div>
                    <div className="p-5 bg-black/20 rounded-xl border border-border">
                      <p className="text-base text-muted-foreground font-normal leading-relaxed whitespace-pre-wrap">
                        {item.caption}
                      </p>
                    </div>
                  </div>

                  <div className="mt-auto pt-6 border-t border-border">
                    <div className="flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-2 text-muted-foreground font-medium italic truncate max-w-[250px]">
                        <Sparkles className="w-3.5 h-3.5 text-[#bcd382] shrink-0" />
                        <span className="truncate">"{item.imagePrompt}"</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-primary font-bold">
                        <ChevronRight className="w-3.5 h-3.5" />
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
