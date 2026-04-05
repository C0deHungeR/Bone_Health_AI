"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { 
  Upload, 
  ArrowLeft, 
  Calendar,
  Loader2,
  Download,
  RefreshCw
} from "lucide-react"

interface BoneAgeEstimationProps {
  onBack: () => void
}

type ViewState = "upload" | "analyzing" | "results"

export function BoneAgeEstimation({ onBack }: BoneAgeEstimationProps) {
  const [view, setView] = useState<ViewState>("upload")
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  // Simulated result
  const [result] = useState({
    estimatedAge: 12.4,
  })

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const handleAnalyze = () => {
    setView("analyzing")
    setTimeout(() => {
      setView("results")
    }, 2000)
  }

  const handleNewAnalysis = () => {
    setUploadedImage(null)
    setView("upload")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Bone Age Estimation</h1>
          <p className="text-muted-foreground">
            Upload a hand X-ray to estimate skeletal age
          </p>
        </div>
      </div>

      {/* Upload State */}
      {view === "upload" && (
        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>Upload X-ray Image</CardTitle>
            <CardDescription>
              For best results, use a left hand X-ray image
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!uploadedImage ? (
              <div
                className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
                  isDragging
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  Drag and drop your X-ray image
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  or click to browse files
                </p>
                <label>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileSelect}
                  />
                  <Button asChild>
                    <span>Select Image</span>
                  </Button>
                </label>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative aspect-square max-h-[400px] bg-muted rounded-xl overflow-hidden mx-auto">
                  <img
                    src={uploadedImage}
                    alt="Uploaded X-ray"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex gap-3 justify-center">
                  <Button variant="outline" onClick={() => setUploadedImage(null)}>
                    Remove Image
                  </Button>
                  <Button onClick={handleAnalyze}>
                    Estimate Bone Age
                  </Button>
                </div>
              </div>
            )}
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
                <Calendar className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Estimating Bone Age...
            </h2>
            <p className="text-muted-foreground">
              Analyzing skeletal maturity
            </p>
          </CardContent>
        </Card>
      )}

      {/* Results State */}
      {view === "results" && (
        <div className="space-y-6 max-w-lg">
          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleNewAnalysis}>
              <RefreshCw className="w-4 h-4 mr-2" />
              New Analysis
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
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Estimated Bone Age</CardTitle>
                  <CardDescription>Based on skeletal maturity analysis</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <div className="text-6xl font-bold text-foreground mb-2">
                  {result.estimatedAge}
                </div>
                <div className="text-xl text-muted-foreground">years</div>
              </div>

              {/* Disclaimer */}
              <div className="p-3 rounded-lg bg-muted/30 border border-border">
                <p className="text-xs text-muted-foreground text-center">
                  This estimation is for informational purposes only. Please consult a healthcare professional for clinical assessment.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
