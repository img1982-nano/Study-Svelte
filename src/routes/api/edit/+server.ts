import { supabase } from "$lib/supabaseClient";

async function POST(anyInput?: number) {
  const { error } = await supabase
    .from("point")
    .update({ name: "point" })
    .eq("point", anyInput);
}
