"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { 
  ArrowLeft, 
  Shield,
  Loader2,
  Download,
  RefreshCw
} from "lucide-react"

interface BMDRiskAssessmentProps {
  onBack: () => void
}

type ViewState = "form" | "analyzing" | "results"
type RiskLevel = "low" | "medium" | "high"

interface FormData {
  age: string
  gender: string
  weight: string
  height: string
}

export function BMDRiskAssessment({ onBack }: BMDRiskAssessmentProps) {
  const [view, setView] = useState<ViewState>("form")
  const [formData, setFormData] = useState<FormData>({
    age: "",
    gender: "",
    weight: "",
    height: "",
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})

  // Simulated result
  const [result] = useState({
    riskLevel: "medium" as RiskLevel,
    tScore: -1.2,
  })

  const validateForm = () => {
    const newErrors: Partial<FormData> = {}
    
    if (!formData.age || isNaN(Number(formData.age)) || Number(formData.age) <= 0) {
      newErrors.age = "Please enter a valid age"
    }
    if (!formData.gender) {
      newErrors.gender = "Please select gender"
    }
    if (!formData.weight || isNaN(Number(formData.weight)) || Number(formData.weight) <= 0) {
      newErrors.weight = "Please enter a valid weight"
    }
    if (!formData.height || isNaN(Number(formData.height)) || Number(formData.height) <= 0) {
      newErrors.height = "Please enter a valid height"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAssess = () => {
    if (!validateForm()) return
    
    setView("analyzing")
    setTimeout(() => {
      setView("results")
    }, 2000)
  }

  const handleNewAssessment = () => {
    setFormData({ age: "", gender: "", weight: "", height: "" })
    setErrors({})
    setView("form")
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const riskConfig = {
    low: {
      label: "Low Risk",
      color: "text-success",
      bgColor: "bg-success",
      description: "Normal bone density. Continue regular health monitoring and maintain a healthy lifestyle.",
    },
    medium: {
      label: "Medium Risk", 
      color: "text-warning-foreground",
      bgColor: "bg-warning",
      description: "Moderate risk detected. Consider lifestyle modifications and consult with your healthcare provider.",
    },
    high: {
      label: "High Risk",
      color: "text-destructive",
      bgColor: "bg-destructive",
      description: "Elevated risk. Please consult with a healthcare professional for further evaluation and treatment options.",
    },
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">BMD Risk Assessment</h1>
          <p className="text-muted-foreground">
            Evaluate bone mineral density risk based on patient data
          </p>
        </div>
      </div>

      {/* Form State */}
      {view === "form" && (
        <Card className="max-w-lg">
          <CardHeader>
            <CardTitle>Patient Information</CardTitle>
            <CardDescription>
              Enter the patient details to assess BMD risk
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Age */}
            <div className="space-y-2">
              <label htmlFor="age" className="text-sm font-medium text-foreground">
                Age
              </label>
              <input
                id="age"
                type="number"
                placeholder="Enter age"
                value={formData.age}
                onChange={(e) => handleInputChange("age", e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary ${
                  errors.age ? "border-destructive" : "border-input"
                }`}
              />
              {errors.age && (
                <p className="text-xs text-destructive">{errors.age}</p>
              )}
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <label htmlFor="gender" className="text-sm font-medium text-foreground">
                Gender
              </label>
              <select
                id="gender"
                value={formData.gender}
                onChange={(e) => handleInputChange("gender", e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary ${
                  errors.gender ? "border-destructive" : "border-input"
                }`}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errors.gender && (
                <p className="text-xs text-destructive">{errors.gender}</p>
              )}
            </div>

            {/* Weight */}
            <div className="space-y-2">
              <label htmlFor="weight" className="text-sm font-medium text-foreground">
                Weight (kg)
              </label>
              <input
                id="weight"
                type="number"
                placeholder="Enter weight in kg"
                value={formData.weight}
                onChange={(e) => handleInputChange("weight", e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary ${
                  errors.weight ? "border-destructive" : "border-input"
                }`}
              />
              {errors.weight && (
                <p className="text-xs text-destructive">{errors.weight}</p>
              )}
            </div>

            {/* Height */}
            <div className="space-y-2">
              <label htmlFor="height" className="text-sm font-medium text-foreground">
                Height (cm)
              </label>
              <input
                id="height"
                type="number"
                placeholder="Enter height in cm"
                value={formData.height}
                onChange={(e) => handleInputChange("height", e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary ${
                  errors.height ? "border-destructive" : "border-input"
                }`}
              />
              {errors.height && (
                <p className="text-xs text-destructive">{errors.height}</p>
              )}
            </div>

            <Button className="w-full mt-6" onClick={handleAssess}>
              Assess BMD Risk
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Analyzing State */}
      {view === "analyzing" && (
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-12 pb-12 text-center">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full border-4 border-muted" />
              <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Shield className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Calculating Risk...
            </h2>
            <p className="text-muted-foreground">
              Analyzing bone mineral density risk factors
            </p>
          </CardContent>
        </Card>
      )}

      {/* Results State */}
      {view === "results" && (
        <div className="space-y-6 max-w-lg">
          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleNewAssessment}>
              <RefreshCw className="w-4 h-4 mr-2" />
              New Assessment
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download Report
            </Button>
          </div>

          {/* Result Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle>BMD Risk Assessment Result</CardTitle>
                  <CardDescription>Based on provided patient data</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Risk Level Badge */}
              <div className="text-center py-6">
                <div className={`inline-flex items-center px-6 py-3 rounded-full text-xl font-bold ${riskConfig[result.riskLevel].bgColor} text-white`}>
                  {riskConfig[result.riskLevel].label}
                </div>
              </div>

              {/* T-Score */}
              <div className="p-4 rounded-xl bg-muted/50 text-center">
                <div className="text-sm text-muted-foreground mb-1">T-Score</div>
                <div className="text-3xl font-bold text-foreground">{result.tScore}</div>
              </div>

              {/* Risk Scale */}
              <div className="space-y-3">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Low Risk</span>
                  <span>Medium Risk</span>
                  <span>High Risk</span>
                </div>
                <div className="h-3 rounded-full overflow-hidden flex">
                  <div className="flex-1 bg-success" />
                  <div className="flex-1 bg-warning" />
                  <div className="flex-1 bg-destructive" />
                </div>
                <div className="relative h-4">
                  <div
                    className="absolute top-0 w-4 h-4 bg-foreground rounded-full -translate-x-1/2 border-2 border-background"
                    style={{
                      left: result.riskLevel === "low" 
                        ? "16.67%" 
                        : result.riskLevel === "medium" 
                          ? "50%" 
                          : "83.33%",
                    }}
                  />
                </div>
              </div>

              {/* Description */}
              <div className="p-4 rounded-xl bg-muted/50">
                <p className="text-sm text-muted-foreground text-center">
                  {riskConfig[result.riskLevel].description}
                </p>
              </div>

              {/* Disclaimer */}
              <div className="p-3 rounded-lg bg-muted/30 border border-border">
                <p className="text-xs text-muted-foreground text-center">
                  This assessment is for informational purposes only. Please consult a healthcare professional for clinical diagnosis and treatment.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
