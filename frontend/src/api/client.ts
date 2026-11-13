// basic pattern for api fetching https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#checking_response_status

const API_URL = import.meta.env.VITE_API_URL

export async function getMessage(): Promise<{ msg: string }> {
  const response = await fetch(`${API_URL}/`) // fetch sends GET request by default
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`)
  }
  return response.json()
}
