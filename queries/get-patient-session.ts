import { TypedSupabaseClient } from "@/types/supabase";

export function getPatientSession(
  client: TypedSupabaseClient,
  pacientId: string,
  sessionId: string
) {
  return client
    .from("sessions")
    .select(`*, session_notes(*, user_id(name))`)
    .eq("id", sessionId)
    .eq("patient_id", pacientId)
    .single();
}
