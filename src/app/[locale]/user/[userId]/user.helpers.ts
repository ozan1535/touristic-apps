import { supabase } from "@/lib/supabase/client";

export async function fetchUserPosts(kindeUserId: string) {
  return supabase
    .from("posts")
    .select("*")
    .eq("user_id", kindeUserId)
    .order("created_at", { ascending: false });
}

export async function fetchUserTrips(kindeUserId: string) {
  return supabase
    .from("trips")
    .select(
      `
        *,
        profiles:user_id (
          username,
          name,
          picture
        )
      `
    )
    .eq("user_id", kindeUserId)
    .order("created_at", { ascending: false });
}
