import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_SUPABASE_URL) ||
  (typeof process !== "undefined" && process.env?.VITE_SUPABASE_URL) ||
  "https://kyaxuixxhznjbhwbfhzc.supabase.co";

const supabaseAnonKey =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_SUPABASE_ANON_KEY) ||
  (typeof process !== "undefined" && process.env?.VITE_SUPABASE_ANON_KEY) ||
  "sb_publishable_esXZfjkjDk1VGlOoRxYYSA_pp8Ggoyv";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type LeadInsert = {
  name: string;
  email: string;
  company?: string;
  services: string[];
  budget?: string;
  message: string;
  referral?: string;
};

export async function submitLead(data: LeadInsert) {
  const { error } = await supabase.from("leads").insert([data]);
  if (error) throw error;
}

// ─── Reviews ─────────────────────────────────────────────────────────────────

export type ReviewInsert = {
  name: string;
  company?: string;
  rating: number;
  service: string;
  review: string;
  project_url?: string;
};

export type Review = ReviewInsert & {
  id: string;
  approved: boolean;
  created_at: string;
};

export async function submitReview(data: ReviewInsert) {
  const { error } = await supabase.from("reviews").insert([
    {
      ...data,
      approved: true,
    },
  ]);
  if (error) throw error;
}

export async function fetchReviews(): Promise<Review[]> {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("fetchReviews error:", error);
    throw error;
  }
  return data as Review[];
}
