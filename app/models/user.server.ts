import { Database } from "../../supabase/generated";
import { createClient } from "@supabase/supabase-js";
import invariant from "tiny-invariant";

export type User = Database['public']['Tables']['profiles']['Row'];

// Abstract this away
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

invariant(
  supabaseUrl,
  "SUPABASE_URL must be set in your environment variables."
);
invariant(
  supabaseAnonKey,
  "SUPABASE_ANON_KEY must be set in your environment variables."
);

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export async function createUser(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if(error) 
    throw error;

  // get the user profile after created
  const profile = await getProfileByEmail(data.user?.email);

  return profile;
}

export async function getProfileById(id: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("email, id")
    .eq("id", id)
    .single();

  if (error)
    throw error;
  if (data) return { id: data.id, email: data.email };
}

export async function getProfileByEmail(email?: string) {
  if(!email) return null;
  const { data, error } = await supabase
    .from("profiles")
    .select("email, id")
    .eq("email", email)
    .single();

  if (error) return null;
  if (data) return data;
}

export async function verifyLogin(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return undefined;
  const profile = await getProfileByEmail(data.user?.email);

  return profile;
}
