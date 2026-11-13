import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { getMessage } from '@/api/client'
// used shadcn preset: --preset b2LDN85BXW

function App() {
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState<string | null>(null)

  // check backend connection once https://react.dev/reference/react/useEffect#fetching-data-with-effects
  useEffect(() => {
    let ignore = false
    getMessage() // GET /api/
      .then((data) => { // .then records the API answer
        if (!ignore) setMessage(data.msg)
      })
      .catch(() => { // .catch catches the failed request
        if (!ignore) setMessage('Backend not reachable')
      })
    return () => {
      ignore = true // stop late answer if component disappears before annswer arrives
    }
  }, []) // [] = only run once when component first appears

  return (
    <main className="flex flex-col items-center pt-10 gap-4">
      <h1 className="text-3xl font-semibold">VNify</h1>
      <p>Backend: {message ?? 'loading…'}</p>
      <Button onClick={() => setCount((c) => c + 1)}>Count is {count}</Button>
    </main>
  )
}

export default App
