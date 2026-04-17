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
  Clock
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  {
    label: "Campaigns Generated",
    value: "12",
    subtext: "+2 this week",
    icon: Layers,
    color: "text-blue-400"
  },
  {
    label: "Total Posts Created",
    value: "84",
    subtext: "7-day average",
    icon: BarChart3,
    color: "text-[#2dbc94]"
  },
  {
    label: "Platforms Used",
    value: "3",
    subtext: "Insta, FB, WhatsApp",
    icon: Smartphone,
    color: "text-purple-400"
  },
  {
    label: "Engagement Score",
    value: "92%",
    subtext: "+5% from last month",
    icon: TrendingUp,
    color: "text-orange-400"
  }
];

const recentActivity = [
  {
    id: 1,
    business: "Malabar Spice Co.",
    date: "2 hours ago",
    platform: "Instagram",
    status: "Active"
  },
  {
    id: 2,
    business: "Kochi Coffee House",
    date: "1 day ago",
    platform: "Facebook",
    status: "Draft"
  },
  {
    id: 3,
    business: "Green Valley Resort",
    date: "3 days ago",
    platform: "WhatsApp",
    status: "Completed"
  }
];

export default function Home() {
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
          <div className="saas-card border-white/10 overflow-hidden bg-white/5 dark:bg-black/20">
            <div className="divide-y divide-white/10">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{activity.business}</p>
                      <p className="text-xs text-muted-foreground">{activity.platform} • {activity.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={cn(
                      "text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter",
                      activity.status === "Active" ? "bg-green-500/10 text-green-500" :
                      activity.status === "Draft" ? "bg-yellow-500/10 text-yellow-500" :
                      "bg-blue-500/10 text-blue-500"
                    )}>
                      {activity.status}
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-primary transition-all group-hover:translate-x-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>
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
    </div>
  );
}

// Helper to handle class merging since I don't have utils import in the ReplacementContent directly
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
