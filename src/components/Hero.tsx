import { Car, Shield, Clock, Star, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface HeroProps {
  onStartQuote: () => void
}

export function Hero({ onStartQuote }: HeroProps) {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6 py-12">
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin className="h-6 w-6 text-primary" />
            <span className="text-lg font-medium text-primary">Zambia's #1 Motor Insurance Platform</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground">
            Get Your Motor Insurance Quote in{' '}
            <span className="text-primary">Minutes</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Compare quotes from top Zambian insurers and save up to K2,000 on your motor insurance. 
            Quick, easy, and completely free.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            onClick={onStartQuote}
            className="text-lg px-8 py-6 h-auto bg-primary hover:bg-primary/90"
          >
            <Car className="mr-2 h-5 w-5" />
            Get My Quote Now
          </Button>
          <p className="text-sm text-muted-foreground">
            ✓ No hidden fees • ✓ Instant quotes • ✓ Save up to K2,000
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="text-center p-6 hover:shadow-lg transition-shadow border-l-4 border-l-primary">
          <CardContent className="space-y-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-card-foreground">Quick & Easy</h3>
            <p className="text-muted-foreground">
              Get quotes in under 5 minutes with our streamlined process designed for Zambian drivers
            </p>
          </CardContent>
        </Card>

        <Card className="text-center p-6 hover:shadow-lg transition-shadow border-l-4 border-l-accent">
          <CardContent className="space-y-4">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto">
              <Shield className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold text-card-foreground">Trusted Local Providers</h3>
            <p className="text-muted-foreground">
              Compare quotes from leading Zambian insurance companies like Madison, Professional, and ZSIC
            </p>
          </CardContent>
        </Card>

        <Card className="text-center p-6 hover:shadow-lg transition-shadow border-l-4 border-l-primary">
          <CardContent className="space-y-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
              <Star className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-card-foreground">Best Kwacha Rates</h3>
            <p className="text-muted-foreground">
              Find the most competitive rates in Zambian Kwacha tailored to local driving conditions
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Stats Section with Zambian context */}
      <Card className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border-primary/20">
        <CardContent className="py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary">50K+</div>
              <div className="text-sm text-muted-foreground">Zambian Drivers Served</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent">K2,000</div>
              <div className="text-sm text-muted-foreground">Average Annual Savings</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">15+</div>
              <div className="text-sm text-muted-foreground">Local Insurance Partners</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent">4.9★</div>
              <div className="text-sm text-muted-foreground">Customer Rating</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Zambian Context Banner */}
      <Card className="zambian-gradient text-white">
        <CardContent className="py-6 text-center">
          <h3 className="text-xl font-bold mb-2">Designed for Zambian Roads</h3>
          <p className="text-white/90">
            Our quotes consider local factors: rainy season conditions, urban traffic in Lusaka and Ndola, 
            and popular vehicle makes like Toyota, Nissan, and Mazda
          </p>
        </CardContent>
      </Card>
    </div>
  )
}