import { Database } from "../../supabase/generated";
import { supabase } from "./user.server";

export type DistributionRecord =
  Database["public"]["Tables"]["items_distributed"]["Row"];

// Take a distribution record and add it to supabase, return the distribution record as well.
export async function createDistributionRecord(
  record: Omit<DistributionRecord, "id" | "created_at" | "updated_at">,
) {
  const { data, error } = await supabase
    .from("items_distributed")
    .insert(record)
    .select("*")
    .single();

  if (!error) {
    return data;
  }

  return null;
}

// Get all distribution records for a fuzzy match of first_name and last_name combination from supabase.
export async function getDistributionRecords({
  first_name,
  last_name,
}: DistributionRecord) {
  const { data } = await supabase
    .from("items_distributed")
    .select("*")
    .ilike("first_name", `%${first_name}%`)
    .ilike("last_name", `%${last_name}%`);

  return data;
}

// Get latest 25 distribution records from supabase.
export async function getLatestDistributionRecords(limit: number = 25) {
  const { data } = await supabase
    .from("items_distributed")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  return data;
}

// Given an entryId, get the distribution record from supabase.
export async function getDistributionRecordById(id: string) {
  const { data } = await supabase
    .from("items_distributed")
    .select("*")
    .eq("id", id)
    .single();

  return data;
}

// Edit a distribution record in supabase.
export async function editDistributionRecord(
  record: Omit<DistributionRecord, "created_at" | "updated_at">,
) {
  const { data, error } = await supabase
    .from("items_distributed")
    .update(record)
    .eq("id", record.id)
    .select("*")
    .single();

  if (!error) {
    return data;
  }

  return null;
}
