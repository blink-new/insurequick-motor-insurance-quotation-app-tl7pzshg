import { useState } from 'react'
import { Header } from '@/components/Header'
import { QuoteForm } from '@/components/QuoteForm'
import { QuoteResults } from '@/components/QuoteResults'
import { Hero } from '@/components/Hero'

export interface QuoteData {
  vehicleType: string
  make: string
  model: string
  year: string
  driverAge: string
  location: string
  coverageType: string
  previousClaims: string
}

export interface Quote {
  provider: string
  monthlyPrice: number
  annualPrice: number
  coverage: string
  features: string[]
  rating: number
  logo?: string
}

export function InsuranceApp() {
  const [currentStep, setCurrentStep] = useState<'hero' | 'form' | 'results'>('hero')
  const [quoteData, setQuoteData] = useState<QuoteData | null>(null)
  const [quotes, setQuotes] = useState<Quote[]>([])

  const handleStartQuote = () => {
    setCurrentStep('form')
  }

  const handleQuoteSubmit = (data: QuoteData) => {
    setQuoteData(data)
    
    // Generate Zambian-specific mock quotes with Kwacha pricing
    const zambianQuotes: Quote[] = [
      {
        provider: 'Madison Insurance',
        monthlyPrice: 450,
        annualPrice: 5400,
        coverage: 'Comprehensive',
        features: ['24/7 Roadside Assistance', 'Windscreen Cover', 'Legal Protection', 'Courtesy Vehicle'],
        rating: 4.8
      },
      {
        provider: 'Professional Insurance Corporation Zambia (PICZ)',
        monthlyPrice: 380,
        annualPrice: 4560,
        coverage: 'Third Party Fire & Theft',
        features: ['Online Claims Portal', 'Mobile App', 'No Claims Bonus Protection', 'Emergency Towing'],
        rating: 4.6
      },
      {
        provider: 'Zambia State Insurance Corporation (ZSIC)',
        monthlyPrice: 520,
        annualPrice: 6240,
        coverage: 'Comprehensive Plus',
        features: ['Courtesy Car', 'Personal Accident Cover', 'Key Replacement', 'Flood Protection'],
        rating: 4.7
      },
      {
        provider: 'Hollard Insurance Zambia',
        monthlyPrice: 420,
        annualPrice: 5040,
        coverage: 'Comprehensive',
        features: ['Accident Forgiveness', 'Glass Cover', 'Theft Protection', 'Emergency Services'],
        rating: 4.5
      },
      {
        provider: 'Prudential General Insurance Zambia',
        monthlyPrice: 395,
        annualPrice: 4740,
        coverage: 'Third Party Fire & Theft',
        features: ['Quick Claims Processing', 'Nationwide Coverage', 'Rainy Season Protection'],
        rating: 4.4
      }
    ]
    
    // Apply location-based pricing adjustments
    const locationMultiplier = getLocationMultiplier(data.location)
    const ageMultiplier = getAgeMultiplier(data.driverAge)
    const claimsMultiplier = getClaimsMultiplier(data.previousClaims)
    
    const adjustedQuotes = zambianQuotes.map(quote => ({
      ...quote,
      monthlyPrice: Math.round(quote.monthlyPrice * locationMultiplier * ageMultiplier * claimsMultiplier),
      annualPrice: Math.round(quote.annualPrice * locationMultiplier * ageMultiplier * claimsMultiplier)
    })).sort((a, b) => a.annualPrice - b.annualPrice)
    
    setQuotes(adjustedQuotes)
    setCurrentStep('results')
  }

  const getLocationMultiplier = (location: string): number => {
    const highRiskCities = ['Lusaka', 'Kitwe', 'Ndola']
    const mediumRiskCities = ['Kabwe', 'Chingola', 'Livingstone']
    
    if (highRiskCities.includes(location)) return 1.2
    if (mediumRiskCities.includes(location)) return 1.1
    return 1.0
  }

  const getAgeMultiplier = (age: string): number => {
    switch (age) {
      case '18-25': return 1.4
      case '26-35': return 1.1
      case '36-45': return 1.0
      case '46-55': return 1.0
      case '56-65': return 1.1
      case '65+': return 1.2
      default: return 1.0
    }
  }

  const getClaimsMultiplier = (claims: string): number => {
    switch (claims) {
      case '0': return 0.9
      case '1': return 1.1
      case '2': return 1.3
      case '3+': return 1.5
      default: return 1.0
    }
  }

  const handleBackToForm = () => {
    setCurrentStep('form')
  }

  const handleNewQuote = () => {
    setCurrentStep('hero')
    setQuoteData(null)
    setQuotes([])
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onNewQuote={handleNewQuote} />
      
      <main className="container mx-auto px-4 py-8">
        {currentStep === 'hero' && (
          <Hero onStartQuote={handleStartQuote} />
        )}
        
        {currentStep === 'form' && (
          <QuoteForm onSubmit={handleQuoteSubmit} />
        )}
        
        {currentStep === 'results' && quoteData && (
          <QuoteResults 
            quotes={quotes} 
            quoteData={quoteData}
            onBackToForm={handleBackToForm}
            onNewQuote={handleNewQuote}
          />
        )}
      </main>
    </div>
  )
}