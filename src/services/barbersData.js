import { supabase } from "./supabase";

export async function getBarbers() {
  const { data, error } = await supabase
    .from("barbers")
    .select("*");

  if (error) {
    console.error("Erro ao buscar barbeiros:", error);
    return [];
  }

  return data;
}
