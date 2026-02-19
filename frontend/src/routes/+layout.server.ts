// src/routes/+layout.server.ts
export const load = async () => {
    // return await axios.get(...) // ← ここが犯人！一旦消す！
    return {}; 
};