import axios from "axios";

export async function load({ params }) {
  const get_data = await axios.get(`http://127.0.0.1:8000/get/point`);
  console.log("load関数が実行されました。"); // このログが表示されるか確認
  console.log(get_data.data);
  return {
    point: get_data.data,
  };
}
