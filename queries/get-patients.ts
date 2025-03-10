import { TypedSupabaseClient } from "@/types/supabase";

export function getPatients(client: TypedSupabaseClient, patientName: string) {
  return client
    .from("patients")
    .select(
      `
      id,
      name,
      date_of_birth,
      mrn,
      sessions(date, name)
    `
    )
    .ilike("name", `%${patientName}%`)
    .order("name", { ascending: true });
}
