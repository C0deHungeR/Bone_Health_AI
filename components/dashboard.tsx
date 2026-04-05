"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Bone,
  Activity,
  Calendar,
  Shield,
  User,
  ChevronRight,
  FileText,
  LogOut,
} from "lucide-react"
import { FractureDetection } from "@/components/fracture-detection"
import { BoneAgeEstimation } from "@/components/bone-age-estimation"
import { BMDRiskAssessment } from "@/components/bmd-risk-assessment"
import type { User as UserType } from "@/app/page"

interface DashboardProps {
  user: UserType
  onLogout: () => void
  onViewProfile: () => void
}

type DashboardView = "overview" | "fracture" | "bone-age" | "bmd"

export function Dashboard({ user, onLogout, onViewProfile }: DashboardProps) {
  const [view, setView] = useState<DashboardView>("overview")

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navbar */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Bone className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg text-foreground">Bone Health AI</span>
          </div>
          
          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-accent transition-colors">
                <Avatar className="w-8 h-8">
                  {user.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
                  <AvatarFallback className="text-xs bg-primary/10 text-primary">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-foreground hidden sm:block">
                  {user.name}
                </span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={onViewProfile}>
                <User className="w-4 h-4 mr-2" />
                View Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setView("overview")}>
                <FileText className="w-4 h-4 mr-2" />
                My Reports
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout} variant="destructive">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {view === "overview" && (
          <div className="space-y-8">
            {/* Welcome Section */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                Welcome back, {user.name}
              </h1>
              <p className="text-muted-foreground mt-1">
                Select an analysis type to get started
              </p>
            </div>

            {/* Analysis Options */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Fracture Detection */}
              <Card 
                className="cursor-pointer transition-all hover:shadow-lg hover:border-primary/50"
                onClick={() => setView("fracture")}
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
                    Upload an X-ray image to detect bone fractures using AI analysis
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
                onClick={() => setView("bone-age")}
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
                    Estimate skeletal maturity age from hand X-ray images
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
                onClick={() => setView("bmd")}
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
                    Evaluate bone mineral density risk based on patient data
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

            {/* Info Section */}
            <Card className="bg-muted/30">
              <CardContent className="py-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4 text-center md:text-left">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">
                      Professional Medical AI Analysis
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Our AI models are designed to assist healthcare professionals with bone health assessments. 
                      All results should be verified by qualified medical personnel.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {view === "fracture" && (
          <FractureDetection onBack={() => setView("overview")} />
        )}

        {view === "bone-age" && (
          <BoneAgeEstimation onBack={() => setView("overview")} />
        )}

        {view === "bmd" && (
          <BMDRiskAssessment onBack={() => setView("overview")} />
        )}
      </main>
    </div>
  )
}
