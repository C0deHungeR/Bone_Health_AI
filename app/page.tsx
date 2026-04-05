"use client";

import { useState, useEffect } from "react";
import { LandingPage } from "@/components/landing-page";
import { GuestFlow } from "@/components/guest-flow";
import { Dashboard } from "@/components/dashboard";
import { ProfilePage } from "@/components/profile-page";
import { AuthModal } from "@/components/auth-modal"; // new — see step 4
import { api } from "@/lib/api";
import { tokenStore } from "@/lib/token";

type View = "landing" | "guest" | "dashboard" | "profile";

export interface User {
  name: string;
  email: string;
  role: "Doctor" | "Patient";
  avatar?: string;
  totalScans: number;
  lastScanDate: string | null;
  recentReports: {
    id: string;
    type: string;
    date: string;
    result: string;
  }[];
}

export default function Home() {
  const [currentView, setCurrentView] = useState<View>("landing");
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Restore session if token exists
  useEffect(() => {
    const token = tokenStore.get();
    if (!token) return;
    api
      .getProfile(token)
      .then((profile) => {
        setUser(buildUser(profile));
        setCurrentView("dashboard");
      })
      .catch(() => tokenStore.clear());
  }, []);

  // Map backend profile → frontend User shape
  const buildUser = (profile: {
    name: string;
    email: string;
    role: string;
  }): User => ({
    name: profile.name,
    email: profile.email,
    role: profile.role === "DOCTOR" ? "Doctor" : "Patient",
    totalScans: 0,
    lastScanDate: null,
    recentReports: [],
  });

  const handleLoginSubmit = async (email: string, password: string) => {
    setAuthError(null);
    try {
      const res = await api.login({ email, password });
      tokenStore.set(res.token);
      setUser(buildUser(res));
      setShowAuthModal(false);
      setCurrentView("dashboard");
    } catch (e: any) {
      setAuthError(e.message);
    }
  };

  const handleSignupSubmit = async (
    name: string,
    email: string,
    password: string,
    role: "PATIENT" | "DOCTOR",
  ) => {
    setAuthError(null);
    try {
      const res = await api.signup({ name, email, password, role });
      tokenStore.set(res.token);
      setUser(buildUser(res));
      setShowAuthModal(false);
      setCurrentView("dashboard");
    } catch (e: any) {
      setAuthError(e.message);
    }
  };

  const handleLogout = () => {
    tokenStore.clear();
    setUser(null);
    setCurrentView("landing");
  };

  return (
    <main className="min-h-screen bg-background">
      {currentView === "landing" && (
        <LandingPage
          onGuestAccess={() => setCurrentView("guest")}
          onLogin={() => setShowAuthModal(true)}
          user={user}
          onLogout={handleLogout}
          onViewProfile={() => setCurrentView("profile")}
          onViewReports={() => setCurrentView("dashboard")}
        />
      )}
      {currentView === "guest" && (
        <GuestFlow
          onBack={() => setCurrentView("landing")}
          onLogin={() => setShowAuthModal(true)}
        />
      )}
      {currentView === "dashboard" && user && (
        <Dashboard
          user={user}
          onLogout={handleLogout}
          onViewProfile={() => setCurrentView("profile")}
        />
      )}
      {currentView === "profile" && user && (
        <ProfilePage
          user={user}
          onBack={() => setCurrentView("dashboard")}
          onLogout={handleLogout}
        />
      )}

      {showAuthModal && (
        <AuthModal
          onClose={() => {
            setShowAuthModal(false);
            setAuthError(null);
          }}
          onLogin={handleLoginSubmit}
          onSignup={handleSignupSubmit}
          error={authError}
        />
      )}
    </main>
  );
}
