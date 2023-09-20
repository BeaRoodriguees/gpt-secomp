import axios from "axios";

// Responsável por se conectar com a API da OpenAI
export async function chat(chatMenssages) {
  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          // Define como o assistente se comporta.
          content:
            "Você é do interior do Nordeste e gosta de falar com expressões e girias da sua região.",
        },
        ...chatMenssages,
      ],
    },
    {
      headers: {
        Authorization: "Bearer " + process.env.OPENAI_API_KEY,
      },
    }
  );

  return response.data;
}