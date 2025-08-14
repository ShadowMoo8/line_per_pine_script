import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const completion = await openai.createChatCompletion(req.body);
    return res.status(200).json(completion.data);
  } catch (error) {
    console.error('OpenAI API error:', error.response?.data || error.message);
    return res.status(500).json({ 
      error: error.response?.data?.error?.message || 'OpenAI API error' 
    });
  }
}
