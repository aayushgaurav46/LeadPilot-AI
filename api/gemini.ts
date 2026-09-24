import type { VercelRequest, VercelResponse } from '@vercel/node'

const SYSTEM_PROMPT = `You are LeadPilot AI, an expert real-estate lead qualification assistant.
Your job is to qualify the incoming lead by naturally asking about:
1. Their timeline to buy/move
2. Budget and financing status (pre-approved, cash, or not yet)
3. Specific property requirements (bedrooms, location preferences)
4. Their motivation for moving

Rules:
- Be friendly, concise, and professional
- Ask ONE question at a time
- After 4-5 exchanges, provide a qualification summary in this exact JSON format wrapped in <RESULT> tags:
<RESULT>{"score": <0-100>, "intent": "<High|Medium|Low>", "budgetStatus": "<Qualified|Unqualified|Unknown>", "timeline": "<string>", "recommendedAction": "<string>"}</RESULT>
- Only output the <RESULT> tag when you have enough info to qualify the lead`

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const { history, message } = req.body as {
      history: { role: 'user' | 'assistant'; content: string }[]
      message: string
    }

    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...history,
      { role: 'user', content: message },
    ]

    const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.VITE_NVIDIA_API_KEY ?? ''}`,
      },
      body: JSON.stringify({
        model: 'meta/llama-3.1-8b-instruct',
        messages,
        max_tokens: 300,
        temperature: 0.7,
      }),
    })

    const data = await response.json() as {
      choices?: { message: { content: string } }[]
      error?: { message: string }
    }

    if (data.error) return res.status(500).json({ error: data.error.message })

    const text = data.choices?.[0]?.message?.content ?? ''
    res.status(200).json({ text })
  } catch (err: unknown) {
    res.status(500).json({ error: err instanceof Error ? err.message : String(err) })
  }
}
