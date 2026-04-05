"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Bone, 
  ArrowLeft, 
  Mail, 
  User as UserIcon,
  Briefcase,
  Activity,
  Calendar,
  FileText,
  LogOut
} from "lucide-react"
import type { User } from "@/app/page"

interface ProfilePageProps {
  user: User
  onBack: () => void
  onLogout: () => void
}

export function ProfilePage({ user, onBack, onLogout }: ProfilePageProps) {
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
          <Button variant="ghost" size="sm" onClick={onLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 max-w-3xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        {/* Profile Header */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Avatar className="w-24 h-24">
                {user.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
                <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="text-center sm:text-left">
                <h1 className="text-2xl font-bold text-foreground">{user.name}</h1>
                <div className="inline-flex items-center gap-2 mt-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  <Briefcase className="w-3.5 h-3.5" />
                  {user.role}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Info Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <UserIcon className="w-5 h-5 text-primary" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 py-3 border-b">
              <UserIcon className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium text-foreground">{user.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 py-3 border-b">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium text-foreground">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 py-3">
              <Briefcase className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Role</p>
                <p className="font-medium text-foreground">{user.role}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-muted/50 text-center">
                <p className="text-3xl font-bold text-primary">{user.totalScans}</p>
                <p className="text-sm text-muted-foreground">Total Scans</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 text-center">
                <p className="text-sm font-semibold text-foreground">
                  {user.lastScanDate || "N/A"}
                </p>
                <p className="text-sm text-muted-foreground">Last Scan Date</p>
              </div>
            </div>

            {/* Recent Reports */}
            <div>
              <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-muted-foreground" />
                Recent Reports
              </h3>
              {user.recentReports.length > 0 ? (
                <div className="space-y-3">
                  {user.recentReports.map((report) => (
                    <div
                      key={report.id}
                      className="flex items-center justify-between p-3 rounded-lg border bg-card"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          <FileText className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm text-foreground">{report.type}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {report.date}
                          </p>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">{report.result}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No reports yet
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
