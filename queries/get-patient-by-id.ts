import { TypedSupabaseClient } from "@/types/supabase";

export function getPatientById(client: TypedSupabaseClient, pacientId: string) {
  return client
    .from("patients")
    .select(`*, sessions(*, session_notes(*, user_id(name)))`)
    .eq("id", pacientId)
    .single();
}
