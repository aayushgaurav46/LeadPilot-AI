import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const { history, message } = req.body as {
      history: { role: string; parts: { text: string }[] }[]
      message: string
    }

    const apiKey = process.env.VITE_GEMINI_API_KEY ?? ''
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`

    const contents = [
      ...history,
      { role: 'user', parts: [{ text: message }] },
    ]

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents, generationConfig: { maxOutputTokens: 300 } }),
    })

    const data = await response.json() as { candidates?: { content: { parts: { text: string }[] } }[]; error?: { message: string } }

    if (data.error) return res.status(500).json({ error: data.error.message })

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? ''
    res.status(200).json({ text })
  } catch (err: unknown) {
    res.status(500).json({ error: err instanceof Error ? err.message : String(err) })
  }
}
