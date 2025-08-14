import { Configuration, OpenAIApi } from 'openai';

export default async function handler(req, res) {
  const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
  });
  
  const openai = new OpenAIApi(config);

  try {
    const completion = await openai.createChatCompletion(req.body);
    res.status(200).json(completion.data);
  } catch (error) {
    console.error('OpenAI API error:', error.response?.data || error.message);
    res.status(500).json({ error: 'OpenAI API error' });
  }
}
