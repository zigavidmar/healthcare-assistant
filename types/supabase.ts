// types/supabase.ts
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "./database";

export type TypedSupabaseClient = SupabaseClient<Database>;

// Create a helper type to extract query result types
export type PatientRow = Database["public"]["Tables"]["patients"]["Row"];

// Define the return type of the getPatients query
export type PatientsQueryResult = {
  data: PatientRow[] | null;
  error: any;
};

export type SessionRow = Database["public"]["Tables"]["sessions"]["Row"];
