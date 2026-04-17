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
    <div className="container mx-auto p-6 md:p-10 max-w-6xl space-y-10">
      <div className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">Campaign Generator</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Enter your business details below. Our AI will craft a high-converting 7-day marketing strategy tailored specifically for your brand.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-4 lg:sticky lg:top-10">
          <Card className="saas-card">
            <CardHeader className="border-b border-border/50 bg-secondary/20">
              <CardTitle className="text-xl">Strategy Inputs</CardTitle>
              <CardDescription>Refine your campaign parameters.</CardDescription>
            </CardHeader>
            <CardContent className="pt-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="businessName" className="text-sm font-semibold">Business Name</Label>
                  <Input id="businessName" name="businessName" placeholder="e.g. Malabar Spice Co." value={formData.businessName} onChange={handleChange} className="saas-input" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="businessType" className="text-sm font-semibold">Industry</Label>
                  <Input id="businessType" name="businessType" placeholder="e.g. Spices Export, Restaurant" value={formData.businessType} onChange={handleChange} className="saas-input" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="campaignGoal" className="text-sm font-semibold">Campaign Goal</Label>
                  <Input id="campaignGoal" name="campaignGoal" placeholder="e.g. Increase Onam sales" value={formData.campaignGoal} onChange={handleChange} className="saas-input" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="targetAudience" className="text-sm font-semibold">Target Audience</Label>
                  <Input id="targetAudience" name="targetAudience" placeholder="e.g. Local families in Kochi" value={formData.targetAudience} onChange={handleChange} className="saas-input" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tone" className="text-sm font-semibold">Brand Voice</Label>
                  <Select onValueChange={(value: any) => { if (typeof value === "string") setFormData({ ...formData, tone: value }) }}>
                    <SelectTrigger className="saas-input">
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Friendly">Friendly</SelectItem>
                      <SelectItem value="Professional">Professional</SelectItem>
                      <SelectItem value="Playful">Playful</SelectItem>
                      <SelectItem value="Inspirational">Inspirational</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" className="w-full mt-4 h-12 text-base font-bold saas-button-primary" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Crafting Strategy...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-5 w-5" />
                      Generate 7-Day Blueprint
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-8">
          {loading ? (
            <div className="h-[500px] flex flex-col items-center justify-center space-y-6 saas-card bg-secondary/10 border-dashed border-2 animate-pulse">
              <div className="p-4 bg-primary/10 rounded-full">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
              </div>
              <div className="text-center space-y-2">
                <p className="text-xl font-bold">Generating your campaign...</p>
                <p className="text-muted-foreground">Our AI is analyzing your brand and market trends.</p>
              </div>
            </div>
          ) : results ? (
            <CampaignResults data={results} />
          ) : (
            <div className="h-[500px] flex flex-col items-center justify-center saas-card bg-secondary/5 border-dashed border-2 text-muted-foreground">
              <div className="p-6 bg-secondary/50 rounded-full mb-6">
                <Sparkles className="h-12 w-12 opacity-30 text-primary" />
              </div>
              <div className="text-center space-y-1">
                <p className="text-xl font-bold text-foreground/80">Ready to scale?</p>
                <p>Complete the form to see your tailored 7-day marketing strategy.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
