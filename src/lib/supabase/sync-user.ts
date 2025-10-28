import { generateUniqueUsername } from "../helpers";
import { createClient } from "./server";

export interface KindeUser {
  id: string;
  email?: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
}

async function checkUsernameExists(username: string): Promise<boolean> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("username")
    .eq("username", username)
    .single();

  return !!data && !error;
}

export async function syncUserProfile(kindeUser: KindeUser) {
  const supabase = await createClient();

  try {
    const { data: existingUser } = await supabase
      .from("profiles")
      .select("username")
      .eq("kinde_user_id", kindeUser.id)
      .single();

    let username = existingUser?.username;
    if (!username) {
      username = await generateUniqueUsername(checkUsernameExists, 8);
    }

    const { data, error } = await supabase
      .from("profiles")
      .upsert(
        {
          kinde_user_id: kindeUser.id,
          email: kindeUser.email,
          name:
            (kindeUser?.given_name || "") +
            " " +
            (kindeUser?.family_name || ""),
          picture: kindeUser.picture,
          username: username,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "kinde_user_id",
        }
      )
      .select();

    if (error) {
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
}

export async function getUserProfile(identifier: string) {
  const supabase = await createClient();

  try {
    /* const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("kinde_user_id", identifier)
      .single(); */

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .or(`kinde_user_id.eq.${identifier},username.eq.${identifier}`)
      .single();

    if (error && error.code !== "PGRST116") {
      // PGRST116 = no rows returned
      console.error("Error fetching user profile:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Unexpected error fetching user:", error);
    return { success: false, error };
  }
}

export async function isUsernameAvailable(username: string): Promise<boolean> {
  const exists = await checkUsernameExists(username);
  return !exists;
}
