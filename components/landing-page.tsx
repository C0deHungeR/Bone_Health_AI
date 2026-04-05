"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bone, Shield, Brain, Activity, User, FileText, LogOut } from "lucide-react"
import type { User as UserType } from "@/app/page"

interface LandingPageProps {
  onGuestAccess: () => void
  onLogin: () => void
  user: UserType | null
  onLogout: () => void
  onViewProfile: () => void
  onViewReports: () => void
}

export function LandingPage({ 
  onGuestAccess, 
  onLogin, 
  user, 
  onLogout, 
  onViewProfile, 
  onViewReports 
}: LandingPageProps) {
  const initials = user?.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Bone className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg text-foreground">Bone Health AI</span>
          </div>
          
          {/* Conditional Profile/Login */}
          <div className="flex items-center gap-2">
            {user ? (
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
                  <DropdownMenuItem onClick={onViewReports}>
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
            ) : (
              <Button variant="outline" size="sm" onClick={onLogin}>
                Login
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Activity className="w-4 h-4" />
              AI-Powered Diagnostics
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight text-balance">
            Bone Health AI
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed text-pretty">
            AI-powered analysis of bone X-ray images for fracture detection, 
            bone age estimation, and BMD risk assessment
          </p>

          {/* Action Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-xl mx-auto">
            <Card className="hover:shadow-md transition-shadow cursor-pointer group" onClick={onGuestAccess}>
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Continue as Guest</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  No login required. Results won't be saved.
                </p>
                <Button className="w-full" size="lg">
                  Start Analysis
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer group" onClick={onLogin}>
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/80 transition-colors">
                  <Shield className="w-6 h-6 text-secondary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Login / Sign Up</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Save reports and access history
                </p>
                <Button variant="outline" className="w-full" size="lg">
                  Login
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t bg-card/30 py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureItem
              icon={<Activity className="w-5 h-5" />}
              title="Fracture Detection"
              description="AI-powered detection of bone fractures with highlighted regions and confidence scores"
            />
            <FeatureItem
              icon={<Brain className="w-5 h-5" />}
              title="Bone Age Estimation"
              description="Accurate estimation of bone age using advanced machine learning models"
            />
            <FeatureItem
              icon={<Shield className="w-5 h-5" />}
              title="BMD Risk Assessment"
              description="Comprehensive bone mineral density risk evaluation with clear indicators"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 px-4">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>For demonstration purposes only. Not for clinical use.</p>
        </div>
      </footer>
    </div>
  )
}

function FeatureItem({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="text-center">
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3 text-primary">
        {icon}
      </div>
      <h3 className="font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  )
}
