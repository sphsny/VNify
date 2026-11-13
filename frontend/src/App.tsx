import { useState } from 'react'
import { Button } from '@/components/ui/button'
// used shadcn preset: --preset b2LDN85BXW

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="flex flex-col items-center pt-10 gap-4">
      <h1 className="text-3xl font-semibold">VNify</h1>
      <Button onClick={() => setCount((c) => c + 1)}>Count is {count}</Button>
    </main>
  )
}

export default App
