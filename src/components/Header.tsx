import { Shield, MapPin } from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Button } from '@/components/ui/button'

interface HeaderProps {
  onNewQuote: () => void
}

export function Header({ onNewQuote }: HeaderProps) {
  return (
    <header className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-lg">
              <Shield className="h-7 w-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">InsureQuick Zambia</h1>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span>Motor Insurance for Zambian Drivers</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={onNewQuote}
              className="text-foreground hover:text-foreground hover:bg-primary/10"
            >
              New Quote
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}