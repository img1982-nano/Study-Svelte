import axios from "axios";

export async function load({ params }) {
  const slug = Number(params.slug);
  const get_data = await axios.get(
    `http://127.0.0.1:8000/get/Mondai/id/${slug}`,
  );
  console.log("load関数が実行されました。"); // このログが表示されるか確認
  console.log(get_data.data[0]);
  return {
    Mondai: get_data.data[0],
    slug: params.slug,
  };
}
