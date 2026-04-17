"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { CampaignResults, type CampaignData } from "@/components/campaign-results";

export default function GenerateCampaignPage() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<CampaignData | null>(null);

  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "",
    campaignGoal: "",
    targetAudience: "",
    tone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.businessName || !formData.businessType || !formData.campaignGoal || !formData.targetAudience || !formData.tone) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setResults(null);
    try {
      const response = await fetch("/api/generate-campaign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to generate campaign.");
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      setResults(data);
      toast.success("Campaign generated successfully!");
    } catch (error) {
      const err = error as Error;
      toast.error(err.message || "An error occurred while generating the campaign.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 space-y-10 overflow-hidden">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">Campaign Generator</h1>
        <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
          Enter your business details below. Our AI will craft a high-converting 7-day marketing strategy tailored specifically for your brand.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-8 items-start">
        <div className="lg:sticky lg:top-8">
          <Card className="saas-card">
            <CardHeader className="border-b border-border bg-secondary/30 dark:bg-white/5 p-6">
              <CardTitle className="text-lg font-semibold text-foreground dark:text-white">Strategy Inputs</CardTitle>
              <CardDescription className="text-xs text-muted-foreground">Refine your campaign parameters.</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <Label htmlFor="businessName" className="text-xs font-semibold text-muted-foreground dark:text-gray-300">Business Name</Label>
                  <Input id="businessName" name="businessName" placeholder="e.g. Malabar Spice Co." value={formData.businessName} onChange={handleChange} className="saas-input h-10 text-sm" required />
                </div>
                
                <div className="space-y-1.5">
                  <Label htmlFor="businessType" className="text-sm font-semibold text-muted-foreground dark:text-gray-300">Industry</Label>
                  <Input id="businessType" name="businessType" placeholder="e.g. Spices Export, Restaurant" value={formData.businessType} onChange={handleChange} className="saas-input h-10 text-sm" required />
                </div>
                
                <div className="space-y-1.5">
                  <Label htmlFor="campaignGoal" className="text-sm font-semibold text-muted-foreground dark:text-gray-300">Campaign Goal</Label>
                  <Input id="campaignGoal" name="campaignGoal" placeholder="e.g. Increase Onam sales" value={formData.campaignGoal} onChange={handleChange} className="saas-input h-10 text-sm" required />
                </div>
                
                <div className="space-y-1.5">
                  <Label htmlFor="targetAudience" className="text-sm font-semibold text-muted-foreground dark:text-gray-300">Target Audience</Label>
                  <Input id="targetAudience" name="targetAudience" placeholder="e.g. Local families in Kochi" value={formData.targetAudience} onChange={handleChange} className="saas-input h-10 text-sm" required />
                </div>
                
                <div className="space-y-1.5">
                  <Label htmlFor="tone" className="text-sm font-semibold text-muted-foreground dark:text-gray-300">Brand Voice</Label>
                  <Select onValueChange={(value: any) => { if (typeof value === "string") setFormData({ ...formData, tone: value }) }}>
                    <SelectTrigger className="saas-input h-10 text-sm">
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-[#0f172a] border-border">
                      <SelectItem value="Friendly">Friendly</SelectItem>
                      <SelectItem value="Professional">Professional</SelectItem>
                      <SelectItem value="Playful">Playful</SelectItem>
                      <SelectItem value="Inspirational">Inspirational</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" className="w-full mt-2 h-10 text-sm font-bold saas-button-primary" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Crafting Strategy...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Blueprint
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="w-full max-w-full overflow-hidden">
          {loading ? (
            <div className="h-[500px] flex flex-col items-center justify-center space-y-6 saas-card bg-secondary/10 border-border transition-all duration-700">
              <div className="p-4 bg-primary/10 rounded-2xl relative">
                <div className="absolute inset-0 bg-primary/10 blur-xl rounded-full animate-pulse" />
                <Loader2 className="h-8 w-8 animate-spin text-primary relative z-10" />
              </div>
              <div className="text-center space-y-2 px-6">
                <p className="text-xl font-semibold text-foreground dark:text-white">Generating your campaign...</p>
                <p className="text-sm text-muted-foreground max-w-sm">Our AI is analyzing your brand and market trends to build the perfect strategy.</p>
              </div>
            </div>
          ) : results ? (
            <CampaignResults data={results} />
          ) : (
            <div className="h-[500px] flex flex-col items-center justify-center saas-card bg-white dark:bg-white/[0.02] border-border text-muted-foreground p-8">
              <div className="p-6 bg-primary/5 rounded-full mb-6 group-hover:bg-primary/10 transition-colors">
                <Sparkles className="h-10 w-10 opacity-40 text-primary" />
              </div>
              <div className="text-center space-y-2">
                <p className="text-xl font-semibold text-foreground dark:text-white">Ready to scale your brand?</p>
                <p className="text-sm max-w-xs">Complete the form to unlock your tailored 7-day marketing blueprint.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
