import { supabase } from "$lib/supabaseClient";

export async function load({ params }) {
  const slug = Number(params.slug);
  console.log("load関数が実行されました。"); // このログが表示されるか確認
  const { data, error } = await supabase
    .from("Mondai")
    .select("*")
    .eq("id", slug)
    .single();

  if (error) {
    console.error("Supabaseからのデータ取得エラー:", error);
  }
  return {
    Mondai: data ?? [],
    slug: params.slug,
  };
}
