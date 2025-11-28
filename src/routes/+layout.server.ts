import { supabase } from "$lib/supabaseClient";

export async function load() {
  console.log("load関数が実行されました。"); // このログが表示されるか確認
  const { data, error } = await supabase.from("point").select();
  const edit = () => edit_function();
  if (error) {
    console.error("Supabaseからのデータ取得エラー:", error);
  }

  return {
    point: data ?? [],
  };
}
