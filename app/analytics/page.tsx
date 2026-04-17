"use client";

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
  ArrowUpRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const metrics = [
  {
    label: "Total Reach",
    value: "24.5k",
    change: "+12.5%",
    icon: Users,
    color: "text-blue-400"
  },
  {
    label: "Engagement Rate",
    value: "4.8%",
    change: "+2.1%",
    icon: TrendingUp,
    color: "text-[#2dbc94]"
  },
  {
    label: "Click-through Rate",
    value: "2.4%",
    change: "+0.8%",
    icon: MousePointer2,
    color: "text-purple-400"
  }
];

const platformStats = [
  { name: "Instagram", posts: 45, percentage: 75, icon: Camera, color: "bg-pink-500" },
  { name: "Facebook", posts: 32, percentage: 55, icon: Globe, color: "bg-blue-600" },
  { name: "WhatsApp", posts: 18, percentage: 35, icon: MessageCircle, color: "bg-green-500" }
];

const insights = [
  { text: "Instagram performs best for engagement with a 6.2% average rate.", type: "success" },
  { text: "Evening posts (6PM - 9PM) show 40% higher interaction in Kerala.", type: "info" },
  { text: "Visual content increases reach by 30% compared to text-only posts.", type: "success" },
  { text: "Your audience is most active on weekends.", type: "info" }
];

export default function AnalyticsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 space-y-10">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Analytics</h1>
        <p className="text-sm text-muted-foreground">Detailed insights into your campaign performance.</p>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric) => (
          <Card key={metric.label} className="saas-card bg-gradient-to-b from-[#111827] to-[#0f172a] border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={cn("p-2 rounded-lg bg-white/5", metric.color)}>
                  <metric.icon className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-1 text-[10px] font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
                  <ArrowUpRight className="w-3 h-3" />
                  {metric.change}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-400 font-medium">{metric.label}</p>
                <h3 className="text-2xl font-bold text-white">{metric.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts & Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Posts per Platform */}
        <Card className="saas-card border-white/10 bg-[#0b1120]">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Platform Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {platformStats.map((platform) => (
              <div key={platform.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-300">
                    <platform.icon className="w-4 h-4" />
                    {platform.name}
                  </div>
                  <span className="font-bold text-white">{platform.posts} posts</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
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
        <Card className="saas-card border-white/10 bg-[#0b1120]">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-400" />
              AI Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {insights.map((insight, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 flex gap-4 group hover:border-primary/20 transition-all">
                <div className="w-1.5 h-full rounded-full bg-primary/20 shrink-0" />
                <p className="text-sm text-gray-300 leading-relaxed group-hover:text-white transition-colors">
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
              Based on your current activity, we project a 25% increase in brand awareness by next month. Keep generating consistent content!
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center p-4 bg-white/5 rounded-2xl border border-white/10 min-w-[120px]">
              <p className="text-[10px] font-bold text-gray-500 uppercase">Estimated Reach</p>
              <p className="text-2xl font-bold text-primary">30k+</p>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-2xl border border-white/10 min-w-[120px]">
              <p className="text-[10px] font-bold text-gray-500 uppercase">New Leads</p>
              <p className="text-2xl font-bold text-[#bcd382]">150</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
