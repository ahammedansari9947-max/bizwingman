"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  BarChart3, 
  Layers, 
  Smartphone, 
  TrendingUp,
  Plus,
  ArrowRight,
  Clock,
  Loader2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

export default function Home() {
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

  // Compute stats
  const totalCampaigns = campaigns.length;
  const totalPosts = campaigns.reduce((acc, curr) => acc + (curr.data?.captions?.length || 0), 0);
  const platforms = Array.from(new Set(campaigns.flatMap(c => c.data?.calendar?.map((i: any) => i.platform) || [])));
  const totalPlatforms = platforms.length;

  const stats = [
    {
      label: "Campaigns Generated",
      value: totalCampaigns.toString(),
      subtext: "Total stored in database",
      icon: Layers,
      color: "text-blue-400"
    },
    {
      label: "Total Posts Created",
      value: totalPosts.toString(),
      subtext: "Ready for social media",
      icon: BarChart3,
      color: "text-[#2dbc94]"
    },
    {
      label: "Platforms Used",
      value: totalPlatforms.toString(),
      subtext: platforms.slice(0, 3).join(", ") || "No data yet",
      icon: Smartphone,
      color: "text-purple-400"
    },
    {
      label: "Engagement Score",
      value: totalCampaigns > 0 ? "92%" : "0%",
      subtext: totalCampaigns > 0 ? "Projected efficiency" : "Start generating",
      icon: TrendingUp,
      color: "text-orange-400"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 space-y-10">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Overview of your brand's marketing performance.</p>
        </div>
        <Link href="/generate-campaign">
          <Button className="saas-button-primary h-10 px-6 rounded-lg font-bold">
            <Plus className="w-4 h-4 mr-2" />
            Generate New Campaign
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="h-[400px] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary opacity-20" />
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <Card key={stat.label} className="saas-card bg-gradient-to-b from-[#111827] to-[#0f172a] border-white/10">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Live</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-400 font-medium">{stat.label}</p>
                    <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                  </div>
                  <p className="text-xs text-gray-400">{stat.subtext}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Activity */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-lg font-bold text-foreground">Recent Activity</h3>
              {campaigns.length > 0 ? (
                <div className="saas-card border-white/10 overflow-hidden bg-white/5 dark:bg-black/20">
                  <div className="divide-y divide-white/10">
                    {campaigns.slice(0, 5).map((activity) => (
                      <div key={activity.id} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer group">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Clock className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{activity.business_name}</p>
                            <p className="text-xs text-muted-foreground">
                              {activity.data?.calendar?.length || 0} days strategy • {formatDistanceToNow(new Date(activity.created_at))} ago
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter bg-blue-500/10 text-blue-500">
                            Stored
                          </span>
                          <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-primary transition-all group-hover:translate-x-1" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="saas-card border-dashed border-white/10 p-12 text-center space-y-4 bg-white/5">
                  <p className="text-sm text-muted-foreground">No campaigns generated yet.</p>
                  <Link href="/generate-campaign">
                    <Button variant="outline" size="sm" className="rounded-lg h-9">
                      Create Your First Campaign
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Quick CTA Card */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-foreground">Get Started</h3>
              <Card className="saas-card bg-primary/5 border-primary/20 p-8 flex flex-col items-center text-center space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-foreground">Scale Your Brand</h4>
                  <p className="text-sm text-muted-foreground px-4">Ready to automate your next 7 days of marketing?</p>
                </div>
                <Link href="/generate-campaign" className="w-full">
                  <Button className="w-full saas-button-primary h-11 font-bold">
                    Generate Campaign
                  </Button>
                </Link>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
