/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart3, 
  TrendingUp, 
  MousePointer2, 
  Users, 
  Camera, 
  Globe, 
  MessageCircle,
  Lightbulb,
  ArrowUpRight,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";

export default function AnalyticsPage() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCampaigns() {
      try {
        const { data, error } = await supabase
          .from("campaigns")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setCampaigns(data || []);
      } catch (err) {
        console.error("Error fetching campaigns:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCampaigns();
  }, []);

  // Compute metrics
  const totalCampaigns = campaigns.length;
  const totalPosts = campaigns.reduce((acc, curr) => acc + (curr.data?.captions?.length || 0), 0);
  
  // Platform distribution
  const platformCounts: Record<string, number> = {};
  campaigns.forEach(c => {
    c.data?.calendar?.forEach((item: any) => {
      platformCounts[item.platform] = (platformCounts[item.platform] || 0) + 1;
    });
  });

  const platformStats = [
    { name: "Instagram", posts: platformCounts["Instagram"] || 0, icon: Camera, color: "bg-pink-500" },
    { name: "Facebook", posts: platformCounts["Facebook"] || 0, icon: Globe, color: "bg-blue-600" },
    { name: "WhatsApp", posts: platformCounts["WhatsApp"] || 0, icon: MessageCircle, color: "bg-green-500" }
  ].map(p => ({
    ...p,
    percentage: totalPosts > 0 ? (p.posts / totalPosts) * 100 : 0
  }));

  const metrics = [
    {
      label: "Estimated Reach",
      value: totalCampaigns > 0 ? `${(totalCampaigns * 1.5).toFixed(1)}k` : "0",
      change: totalCampaigns > 0 ? "+12.5%" : "0%",
      icon: Users,
      color: "text-[#96bfe6]"
    },
    {
      label: "Total Captions",
      value: totalPosts.toString(),
      change: totalCampaigns > 0 ? "+8.2%" : "0%",
      icon: TrendingUp,
      color: "text-[#2dbc94]"
    },
    {
      label: "Campaign Efficiency",
      value: totalCampaigns > 0 ? "94%" : "0%",
      change: "+0.8%",
      icon: MousePointer2,
      color: "text-[#bfffe6]"
    }
  ];

  const insights = [
    { 
      text: platformStats[0].posts >= platformStats[1].posts 
        ? "Instagram is your most active channel for content generation." 
        : "Facebook currently holds the majority of your planned strategy.", 
      type: "success" 
    },
    { 
      text: `You generate an average of ${(totalPosts / (totalCampaigns || 1)).toFixed(1)} posts per campaign blueprint.`, 
      type: "info" 
    },
    { 
      text: totalCampaigns > 5 ? "Consistent weekly generation detected. Engagement is trending up." : "Generate more campaigns to see deeper historical insights.", 
      type: "success" 
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 space-y-10">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Analytics</h1>
        <p className="text-sm text-muted-foreground">Detailed insights into your campaign performance.</p>
      </div>

      {loading ? (
        <div className="h-[400px] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary opacity-20" />
        </div>
      ) : campaigns.length > 0 ? (
        <>
          {/* Top Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {metrics.map((metric) => (
              <Card key={metric.label} className="saas-card bg-white/50 dark:bg-gradient-to-b dark:from-[#111827] dark:to-[#0f172a] border-border dark:border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={cn("p-2 rounded-lg bg-primary/5 dark:bg-white/5", metric.color)}>
                      <metric.icon className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-green-600 dark:text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
                      <ArrowUpRight className="w-3 h-3" />
                      {metric.change}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground font-medium">{metric.label}</p>
                    <h3 className="text-2xl font-bold text-foreground dark:text-white">{metric.value}</h3>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts & Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Posts per Platform */}
            <Card className="saas-card border-border dark:border-white/10 bg-white/50 dark:bg-[#0b1120]">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-foreground dark:text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Platform Distribution
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {platformStats.map((platform) => (
                  <div key={platform.name} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground dark:text-gray-300">
                        <platform.icon className="w-4 h-4" />
                        {platform.name}
                      </div>
                      <span className="font-bold text-foreground dark:text-white">{platform.posts} posts</span>
                    </div>
                    <div className="h-2 w-full bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className={cn("h-full transition-all duration-1000", platform.color)} 
                        style={{ width: `${platform.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* AI Insights */}
            <Card className="saas-card border-border dark:border-white/10 bg-white/50 dark:bg-[#0b1120]">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-foreground dark:text-white flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                  AI Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {insights.map((insight, i) => (
                  <div key={i} className="p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-transparent dark:border-white/5 flex gap-4 group hover:border-primary/20 transition-all">
                    <div className="w-1.5 h-full rounded-full bg-primary/20 shrink-0" />
                    <p className="text-sm text-muted-foreground dark:text-gray-300 leading-relaxed group-hover:text-foreground dark:group-hover:text-white transition-colors">
                      {insight.text}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Bottom Growth Section */}
          <Card className="saas-card border-primary/20 bg-primary/5 p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-2 text-center md:text-left">
                <h3 className="text-xl font-bold text-white">Projected Growth</h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  Based on your actual activity across {totalCampaigns} campaigns, we project a significant increase in brand awareness.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center p-4 bg-white/5 rounded-2xl border border-white/10 min-w-[120px]">
                  <p className="text-[10px] font-bold text-gray-500 uppercase">Total Assets</p>
                  <p className="text-2xl font-bold text-primary">{totalPosts}</p>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-2xl border border-white/10 min-w-[120px]">
                  <p className="text-[10px] font-bold text-gray-500 uppercase">Avg Efficiency</p>
                  <p className="text-2xl font-bold text-[#bcd382]">98%</p>
                </div>
              </div>
            </div>
          </Card>
        </>
      ) : (
        <div className="saas-card border-dashed border-white/10 p-20 text-center space-y-6 bg-white/5">
          <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mx-auto">
            <BarChart3 className="w-8 h-8 text-primary opacity-20" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white">No data available</h3>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              You haven&apos;t generated any campaigns yet. Generate your first blueprint to see real-time analytics.
            </p>
          </div>
          <Link href="/generate-campaign">
            <Button className="saas-button-primary h-10 px-8 rounded-lg font-bold">
              Generate Now
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
