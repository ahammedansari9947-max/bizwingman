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
  const [selectedDay, setSelectedDay] = useState("Day 1");
  const [imageLoading, setImageLoading] = useState(true);

  const handleCopy = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    toast.success(message);
  };

  const handleCopyAll = () => {
    const allText = data.captions.map((c) => `--- ${c.day} ---\n\nCaption:\n${c.caption}\n\nImage Prompt:\n${c.imagePrompt}\n`).join("\n");
    handleCopy(allText, "Full campaign strategy copied!");
  };

  const activeCaption = data.captions.find((c) => c.day === selectedDay) || data.captions[0];
  const activeCalendar = data.calendar.find((c) => c.day === selectedDay) || data.calendar[0];
  const cleanPrompt = activeCaption.imagePrompt.replace(/[\r\n]+/g, " ").trim();
  const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(cleanPrompt)}?width=1000&height=1000&nologo=true`;

  const days = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold text-foreground tracking-tight">Marketing Blueprint</h2>
          <p className="text-muted-foreground text-sm">Interactive 7-day strategy roadmap.</p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleCopyAll}
          className="saas-button-secondary rounded-lg font-semibold h-10 px-4 hover:bg-primary/5 shrink-0"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Copy Full Strategy
        </Button>
      </div>

      {/* Day Selector Pilled Buttons */}
      <div className="flex flex-wrap gap-2 py-2">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => {
              setSelectedDay(day);
              setImageLoading(true);
            }}
            className={cn(
              "rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300",
              selectedDay === day 
                ? "bg-[#2dbc94] text-white shadow-lg shadow-[#2dbc94]/20 scale-105" 
                : "bg-black/5 dark:bg-white/5 text-muted-foreground hover:bg-black/10 dark:hover:bg-white/10"
            )}
          >
            {day}
          </button>
        ))}
      </div>

      <div key={selectedDay} className="animate-in fade-in slide-in-from-right-4 duration-500">
        <Card className="overflow-hidden bg-gradient-to-b from-[#111827] to-[#0f172a] border border-white/10 rounded-2xl shadow-2xl">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Visual Header */}
            <div className="relative aspect-square md:aspect-auto h-full min-h-[400px] bg-[#0b1120] overflow-hidden">
              {imageLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse">
                  <Sparkles className="w-10 h-10 text-primary opacity-20" />
                </div>
              )}
              <img
                src={imageUrl}
                alt={`Visual for ${selectedDay}`}
                onLoad={() => setImageLoading(false)}
                className={cn(
                  "w-full h-full object-cover transition-all duration-1000",
                  imageLoading ? "opacity-0 scale-110" : "opacity-100 scale-100"
                )}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1604050936284-88db09a96ea0?auto=format&fit=crop&w=800&q=80";
                  setImageLoading(false);
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent pointer-events-none" />
              <div className="absolute top-6 left-6">
                <div className="px-4 py-2 rounded-full bg-[#bcd382] border border-white/20 text-[12px] font-black text-[#1a2e05] uppercase tracking-widest shadow-xl">
                  {selectedDay}
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-8 md:p-12 flex flex-col justify-center space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-[12px] font-black uppercase tracking-[0.2em] text-[#2dbc94]">{activeCalendar?.platform || "Social"}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
                  <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-gray-400">{activeCalendar?.theme || "Engagement"}</span>
                </div>
                <h3 className="text-3xl font-bold text-white leading-tight tracking-tight">
                  {activeCalendar?.preview || "Campaign Asset"}
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[12px] font-bold text-gray-400 uppercase tracking-widest">
                    <MessageSquare className="w-4 h-4 text-primary" />
                    Social Copy
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleCopy(`${activeCaption.caption}\n\nImage Prompt: ${activeCaption.imagePrompt}`, `${selectedDay} caption copied!`)}
                    className="h-10 w-10 hover:bg-white/10 rounded-xl text-white transition-all"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                  <p className="text-lg text-gray-300 font-normal leading-relaxed whitespace-pre-wrap">
                    {activeCaption.caption}
                  </p>
                </div>
              </div>

              <div className="pt-8 border-t border-white/10">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 text-[12px] font-semibold text-gray-500 italic">
                    <Sparkles className="w-4 h-4 text-[#bcd382] shrink-0" />
                    <span className="line-clamp-2">"{activeCaption.imagePrompt}"</span>
                  </div>
                  <div className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest">
                    <ChevronRight className="w-4 h-4" />
                    Ready for Deployment
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
}
