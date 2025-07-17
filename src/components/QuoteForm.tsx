import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import { ArrowLeft, ArrowRight, Car, MapPin, Shield } from 'lucide-react'
import type { QuoteData } from '@/components/InsuranceApp'

interface QuoteFormProps {
  onSubmit: (data: QuoteData) => void
}

// Zambian-specific data
const zambianCities = [
  'Lusaka', 'Kitwe', 'Ndola', 'Kabwe', 'Chingola', 'Mufulira', 'Livingstone', 
  'Luanshya', 'Kasama', 'Chipata', 'Mazabuka', 'Choma', 'Mongu', 'Solwezi'
]

const popularVehicleMakes = [
  'Toyota', 'Nissan', 'Mazda', 'Honda', 'Mitsubishi', 'Isuzu', 'Ford', 
  'Volkswagen', 'Hyundai', 'Kia', 'Suzuki', 'Subaru', 'Mercedes-Benz', 'BMW'
]

const vehicleTypes = [
  { value: 'sedan', label: 'Sedan/Saloon' },
  { value: 'hatchback', label: 'Hatchback' },
  { value: 'suv', label: 'SUV/4x4' },
  { value: 'pickup', label: 'Pickup Truck' },
  { value: 'van', label: 'Van/Minibus' },
  { value: 'motorcycle', label: 'Motorcycle' }
]

export function QuoteForm({ onSubmit }: QuoteFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<Partial<QuoteData>>({})

  const totalSteps = 3
  const progress = (currentStep / totalSteps) * 100

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    if (isFormValid()) {
      onSubmit(formData as QuoteData)
    }
  }

  const isFormValid = () => {
    const required = ['vehicleType', 'make', 'model', 'year', 'driverAge', 'location', 'coverageType', 'previousClaims']
    return required.every(field => formData[field as keyof QuoteData])
  }

  const updateFormData = (field: keyof QuoteData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Progress Header */}
      <Card className="border-l-4 border-l-primary">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Car className="h-5 w-5 text-primary" />
                Get Your Zambian Motor Insurance Quote
              </CardTitle>
              <CardDescription>
                Step {currentStep} of {totalSteps} • Tailored for Zambian drivers
              </CardDescription>
            </div>
            <div className="text-sm text-muted-foreground">
              {Math.round(progress)}% Complete
            </div>
          </div>
          <Progress value={progress} className="mt-4" />
        </CardHeader>
      </Card>

      {/* Step 1: Vehicle Information */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="h-5 w-5 text-primary" />
              Vehicle Information
            </CardTitle>
            <CardDescription>Tell us about your vehicle</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="vehicleType">Vehicle Type</Label>
                <Select onValueChange={(value) => updateFormData('vehicleType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select vehicle type" />
                  </SelectTrigger>
                  <SelectContent>
                    {vehicleTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="year">Year of Manufacture</Label>
                <Select onValueChange={(value) => updateFormData('year', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 25 }, (_, i) => 2024 - i).map(year => (
                      <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="make">Vehicle Make</Label>
                <Select onValueChange={(value) => updateFormData('make', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select make" />
                  </SelectTrigger>
                  <SelectContent>
                    {popularVehicleMakes.map(make => (
                      <SelectItem key={make} value={make}>{make}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="model">Vehicle Model</Label>
                <Input 
                  id="model"
                  placeholder="e.g. Corolla, Vitz, Harrier"
                  value={formData.model || ''}
                  onChange={(e) => updateFormData('model', e.target.value)}
                />
              </div>
            </div>

            <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
              <h4 className="font-medium text-primary mb-2">Popular in Zambia</h4>
              <p className="text-sm text-muted-foreground">
                Most common vehicles: Toyota Corolla, Nissan March, Mazda Demio, Honda Fit, 
                and Toyota Hilux for commercial use.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Driver Information */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-accent" />
              Driver Information
            </CardTitle>
            <CardDescription>Tell us about yourself and your location</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="driverAge">Your Age</Label>
                <Select onValueChange={(value) => updateFormData('driverAge', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select age range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="18-25">18-25 years</SelectItem>
                    <SelectItem value="26-35">26-35 years</SelectItem>
                    <SelectItem value="36-45">36-45 years</SelectItem>
                    <SelectItem value="46-55">46-55 years</SelectItem>
                    <SelectItem value="56-65">56-65 years</SelectItem>
                    <SelectItem value="65+">65+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">City/Location</Label>
                <Select onValueChange={(value) => updateFormData('location', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your city" />
                  </SelectTrigger>
                  <SelectContent>
                    {zambianCities.map(city => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="previousClaims">Previous Claims (last 5 years)</Label>
              <Select onValueChange={(value) => updateFormData('previousClaims', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select number of claims" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">No claims (Clean record)</SelectItem>
                  <SelectItem value="1">1 claim</SelectItem>
                  <SelectItem value="2">2 claims</SelectItem>
                  <SelectItem value="3+">3 or more claims</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="bg-accent/5 p-4 rounded-lg border border-accent/20">
              <h4 className="font-medium text-accent mb-2">Local Driving Conditions</h4>
              <p className="text-sm text-muted-foreground">
                Our quotes consider Zambian road conditions, rainy season risks, and urban traffic patterns 
                in major cities like Lusaka and Kitwe.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Coverage Options */}
      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Coverage Options
            </CardTitle>
            <CardDescription>Choose your preferred coverage level</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="coverageType">Coverage Type</Label>
              <Select onValueChange={(value) => updateFormData('coverageType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select coverage type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="third-party">Third Party Only</SelectItem>
                  <SelectItem value="third-party-fire-theft">Third Party Fire & Theft</SelectItem>
                  <SelectItem value="comprehensive">Comprehensive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg space-y-3">
              <h4 className="font-medium text-card-foreground">Coverage Comparison (Zambian Context)</h4>
              <div className="text-sm text-muted-foreground space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <div>
                    <strong>Third Party:</strong> Legal minimum requirement in Zambia - covers damage to other vehicles and property
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  <div>
                    <strong>Fire & Theft:</strong> Third party + protection against fire and theft (important during dry season)
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <div>
                    <strong>Comprehensive:</strong> Full coverage including accidental damage, weather damage, and vandalism
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
              <h4 className="font-medium text-primary mb-2">Recommended for Zambian Roads</h4>
              <p className="text-sm text-muted-foreground">
                Given road conditions and weather patterns, we recommend Comprehensive coverage 
                for optimal protection during both dry and rainy seasons.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            
            {currentStep < totalSteps ? (
              <Button 
                onClick={handleNext}
                disabled={!formData.vehicleType && currentStep === 1 || 
                         !formData.driverAge && currentStep === 2}
                className="bg-primary hover:bg-primary/90"
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit}
                disabled={!isFormValid()}
                className="bg-primary hover:bg-primary/90"
              >
                Get My Zambian Quotes
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}