import { ThemeProvider } from '@/contexts/ThemeContext'
import { InsuranceApp } from '@/components/InsuranceApp'
import { Toaster } from '@/components/ui/toaster'

function App() {
  return (
    <ThemeProvider>
      <InsuranceApp />
      <Toaster />
    </ThemeProvider>
  )
}

export default App