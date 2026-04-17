import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { businessName, data } = await req.json();

    if (!businessName || !data) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const { data: campaign, error } = await supabase
      .from("campaigns")
      .insert([
        { 
          business_name: businessName, 
          data: data 
        }
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase Error:", error);
      return NextResponse.json(
        { error: "Failed to save campaign to database." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, campaign });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
