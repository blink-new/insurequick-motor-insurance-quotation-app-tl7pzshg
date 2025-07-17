import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, Star, Check, Phone, Globe, RefreshCw, MapPin, Banknote } from 'lucide-react'
import type { Quote, QuoteData } from '@/components/InsuranceApp'

interface QuoteResultsProps {
  quotes: Quote[]
  quoteData: QuoteData
  onBackToForm: () => void
  onNewQuote: () => void
}

export function QuoteResults({ quotes, quoteData, onBackToForm, onNewQuote }: QuoteResultsProps) {
  const formatPrice = (price: number) => `K${price.toLocaleString()}`

  const getBestValueBadge = (index: number) => {
    if (index === 0) return <Badge className="bg-accent text-accent-foreground">Best Value</Badge>
    if (index === 1) return <Badge variant="secondary">Popular Choice</Badge>
    return null
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card className="border-l-4 border-l-primary">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Banknote className="h-5 w-5 text-primary" />
                Your Zambian Motor Insurance Quotes
              </CardTitle>
              <CardDescription>
                Found {quotes.length} competitive quotes for your {quoteData.year} {quoteData.make} {quoteData.model} in {quoteData.location}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onBackToForm}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Edit Details
              </Button>
              <Button variant="outline" onClick={onNewQuote}>
                <RefreshCw className="mr-2 h-4 w-4" />
                New Quote
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Quote Summary */}
      <Card className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-sm text-muted-foreground">Vehicle</div>
              <div className="font-medium text-card-foreground">{quoteData.year} {quoteData.make} {quoteData.model}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Driver Age</div>
              <div className="font-medium text-card-foreground">{quoteData.driverAge} years</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                <MapPin className="h-3 w-3" />
                Location
              </div>
              <div className="font-medium text-card-foreground">{quoteData.location}, Zambia</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Coverage</div>
              <div className="font-medium text-card-foreground capitalize">{quoteData.coverageType.replace('-', ' ')}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Savings Banner */}
      <Card className="bg-accent/10 border-accent/30">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-accent mb-2">
              💰 You could save up to K{(quotes[quotes.length - 1]?.annualPrice - quotes[0]?.annualPrice).toLocaleString()} per year!
            </h3>
            <p className="text-sm text-muted-foreground">
              Comparing quotes from multiple Zambian insurers helps you find the best deal
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Quotes Grid */}
      <div className="grid gap-6">
        {quotes.map((quote, index) => (
          <Card key={index} className={`hover:shadow-lg transition-shadow ${index === 0 ? 'border-accent/50 shadow-md' : ''}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-xl">{quote.provider}</CardTitle>
                    {getBestValueBadge(index)}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 text-sm font-medium">{quote.rating}</span>
                    </div>
                    <Badge variant="secondary">{quote.coverage}</Badge>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary">
                    {formatPrice(quote.monthlyPrice)}
                  </div>
                  <div className="text-sm text-muted-foreground">per month</div>
                  <div className="text-sm font-medium text-accent">
                    {formatPrice(quote.annualPrice)} annually
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <Separator />
              
              <div>
                <h4 className="font-medium mb-3 text-card-foreground">What's Included:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {quote.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="flex-1 bg-primary hover:bg-primary/90">
                  <Phone className="mr-2 h-4 w-4" />
                  Call to Purchase
                </Button>
                <Button variant="outline" className="flex-1">
                  <Globe className="mr-2 h-4 w-4" />
                  View Full Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Zambian Context Footer */}
      <Card className="zambian-gradient text-white">
        <CardContent className="pt-6">
          <div className="text-center space-y-3">
            <h3 className="font-semibold text-lg">Need Help Choosing Your Policy?</h3>
            <p className="text-white/90 text-sm">
              Our Zambian insurance experts understand local driving conditions and can help you 
              choose the right coverage for Lusaka traffic, rainy season risks, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Button variant="secondary" size="sm">
                <Phone className="mr-2 h-4 w-4" />
                Call +260 211 123 456
              </Button>
              <span className="text-white/80 text-sm">Available 24/7 • English & Local Languages</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Local Payment Methods */}
      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <h4 className="font-medium text-card-foreground">Convenient Payment Options</h4>
            <p className="text-sm text-muted-foreground">
              Pay with Mobile Money (MTN, Airtel), Bank Transfer, or visit our offices in Lusaka, Kitwe, and Ndola
            </p>
            <div className="flex justify-center gap-4 text-xs text-muted-foreground">
              <span>📱 Mobile Money</span>
              <span>🏦 Bank Transfer</span>
              <span>🏢 Office Visits</span>
              <span>💳 Debit Cards</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}