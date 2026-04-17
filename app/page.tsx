import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center max-w-4xl mx-auto">
      <div className="space-y-6">
        <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
          <Sparkles className="mr-2 h-4 w-4" />
          Powered by Gemini 1.5 Pro
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">
          Your AI Marketing <span className="text-primary">Assistant</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          The ultimate AI-powered marketing assistant for small businesses in Kerala. 
          Generate localized, engaging, and culturally relevant marketing campaigns in seconds.
        </p>
        <div className="pt-6">
          <Link href="/generate-campaign">
            <Button size="lg" className="h-14 px-10 text-lg rounded-xl saas-button-primary font-semibold">
              Get Started for Free
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
