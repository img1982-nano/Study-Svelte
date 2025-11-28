import { supabase } from "$lib/supabaseClient";

export async function load() {
  console.log("load関数が実行されました。"); // このログが表示されるか確認
  const { data, error } = await supabase.from("Mondai").select();

  if (error) {
    console.error("Supabaseからのデータ取得エラー:", error);
  }

  return {
    Mondai: data ?? [],
  };
}
