"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { 
  Bone, 
  ArrowLeft, 
  Activity, 
  Calendar, 
  Shield,
  ChevronRight
} from "lucide-react"
import { FractureDetection } from "@/components/fracture-detection"
import { BoneAgeEstimation } from "@/components/bone-age-estimation"
import { BMDRiskAssessment } from "@/components/bmd-risk-assessment"

interface GuestFlowProps {
  onBack: () => void
  onLogin: () => void
}

type FlowState = "select" | "fracture" | "bone-age" | "bmd"

export function GuestFlow({ onBack, onLogin }: GuestFlowProps) {
  const [flowState, setFlowState] = useState<FlowState>("select")

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={flowState === "select" ? onBack : () => setFlowState("select")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Bone className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-lg text-foreground">Bone Health AI</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground font-medium">
              Guest Mode
            </span>
            <Button variant="outline" size="sm" onClick={onLogin}>
              Login to Save
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 container mx-auto px-4 py-8">
        {flowState === "select" && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Select Analysis Type
              </h1>
              <p className="text-muted-foreground">
                Choose an analysis to get started
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Fracture Detection */}
              <Card 
                className="cursor-pointer transition-all hover:shadow-lg hover:border-primary/50"
                onClick={() => setFlowState("fracture")}
              >
                <CardHeader>
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                    <Activity className="w-7 h-7 text-primary" />
                  </div>
                  <CardTitle className="flex items-center justify-between">
                    Fracture Detection
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </CardTitle>
                  <CardDescription>
                    Upload an X-ray to detect bone fractures
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-success" />
                    Image-based analysis
                  </div>
                </CardContent>
              </Card>

              {/* Bone Age Estimation */}
              <Card 
                className="cursor-pointer transition-all hover:shadow-lg hover:border-primary/50"
                onClick={() => setFlowState("bone-age")}
              >
                <CardHeader>
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                    <Calendar className="w-7 h-7 text-primary" />
                  </div>
                  <CardTitle className="flex items-center justify-between">
                    Bone Age Estimation
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </CardTitle>
                  <CardDescription>
                    Estimate skeletal maturity from hand X-ray
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-success" />
                    Image-based analysis
                  </div>
                </CardContent>
              </Card>

              {/* BMD Risk Assessment */}
              <Card 
                className="cursor-pointer transition-all hover:shadow-lg hover:border-primary/50"
                onClick={() => setFlowState("bmd")}
              >
                <CardHeader>
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                    <Shield className="w-7 h-7 text-primary" />
                  </div>
                  <CardTitle className="flex items-center justify-between">
                    BMD Risk Assessment
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </CardTitle>
                  <CardDescription>
                    Evaluate BMD risk based on patient data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    Form-based assessment
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Guest Mode Notice */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="py-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <p className="text-sm text-foreground">
                    Login to save your analysis results and access them later
                  </p>
                  <Button size="sm" onClick={onLogin}>
                    Login to Save
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {flowState === "fracture" && (
          <FractureDetection onBack={() => setFlowState("select")} />
        )}

        {flowState === "bone-age" && (
          <BoneAgeEstimation onBack={() => setFlowState("select")} />
        )}

        {flowState === "bmd" && (
          <BMDRiskAssessment onBack={() => setFlowState("select")} />
        )}
      </div>
    </div>
  )
}
