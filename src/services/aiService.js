const endpoint = import.meta.env.VITE_AI_ENDPOINT

export async function generateResumeContent({ action, text, role, resume }) {
  if (!endpoint) {
    throw new Error('AI is not connected yet. Configure VITE_AI_ENDPOINT to point to your secure server-side AI endpoint.')
  }

  let response
  try {
    response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, text, role, resume }),
    })
  } catch (error) {
    throw new Error(`Could not reach the AI service: ${error.message}`)
  }

  if (!response.ok) {
    const detail = await response.text()
    throw new Error(detail || `AI service returned an error (${response.status}).`)
  }
  const result = await response.json()
  if (typeof result.content !== 'string' || !result.content.trim()) {
    throw new Error('The AI service returned an empty response. Please try again.')
  }
  return result.content.trim()
}
