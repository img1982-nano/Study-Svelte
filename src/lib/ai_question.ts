import { ChatOpenAI } from "@langchain/openai";
import { SystemMessage, HumanMessage } from "@langchain/core/messages";
import { PUBLIC_OPEN_ROUTER_API } from "$env/static/public";

const chat = new ChatOpenAI({
  model: "gpt-4o-mini",
  temperature: 0.8,
  streaming: true,
  apiKey: PUBLIC_OPEN_ROUTER_API,
  configuration: {
    baseURL: "https://openrouter.ai/api/v1",
  },
});

export async function ai_question(systemPrompt: any, humanPrompt: any) {
  const response = await chat.invoke([
    new SystemMessage(systemPrompt),
    new HumanMessage(humanPrompt),
  ]);
  return response.content; // ここで返るのがAIの返答文字列
}
