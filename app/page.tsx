    "use client"

    import { useState } from "react"
    import { LandingPage } from "@/components/landing-page"
    import { GuestFlow } from "@/components/guest-flow"
    import { Dashboard } from "@/components/dashboard"
    import { ProfilePage } from "@/components/profile-page"

    type View = "landing" | "guest" | "dashboard" | "profile"

    export interface User {
      name: string
      email: string
      role: "Doctor" | "Patient"
      avatar?: string
      totalScans: number
      lastScanDate: string | null
      recentReports: {
        id: string
        type: string
        date: string
        result: string
      }[]
    }

    export default function Home() {
      const [currentView, setCurrentView] = useState<View>("landing")
      const [user, setUser] = useState<User | null>(null)

      const handleGuestAccess = () => setCurrentView("guest")
      
      const handleLogin = () => {
        // Simulate login with mock user data
        setUser({
          name: "Dr. Smith",
          email: "dr.smith@hospital.com",
          role: "Doctor",
          totalScans: 47,
          lastScanDate: "March 15, 2026",
          recentReports: [
            { id: "1", type: "Fracture Detection", date: "March 15, 2026", result: "No fracture detected" },
            { id: "2", type: "BMD Risk", date: "March 12, 2026", result: "Low Risk" },
            { id: "3", type: "Bone Age", date: "March 10, 2026", result: "12.5 years" },
          ]
        })
        setCurrentView("dashboard")
      }

      const handleLogout = () => {
        setUser(null)
        setCurrentView("landing")
      }

      const handleViewProfile = () => setCurrentView("profile")
      const handleViewReports = () => setCurrentView("dashboard")
      const handleBackToDashboard = () => setCurrentView("dashboard")
      const handleBackToLanding = () => setCurrentView("landing")

      return (
        <main className="min-h-screen bg-background">
          {currentView === "landing" && (
            <LandingPage
              onGuestAccess={handleGuestAccess}
              onLogin={handleLogin}
              user={user}
              onLogout={handleLogout}
              onViewProfile={handleViewProfile}
              onViewReports={handleViewReports}
            />
          )}
          {currentView === "guest" && (
            <GuestFlow 
              onBack={handleBackToLanding} 
              onLogin={handleLogin}
            />
          )}
          {currentView === "dashboard" && user && (
            <Dashboard 
              user={user}
              onLogout={handleLogout}
              onViewProfile={handleViewProfile}
            />
          )}
          {currentView === "profile" && user && (
            <ProfilePage
              user={user}
              onBack={handleBackToDashboard}
              onLogout={handleLogout}
            />
          )}
        </main>
      )
    }
