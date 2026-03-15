import React from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { ProfileCreationPage } from './pages/ProfileCreationPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProfilePage } from './pages/ProfilePage';
import { User, UserRole, WorkerProfile, Job, JobApplication, SkillVerification } from './types';
import { MOCK_JOBS } from './mockData';

export default function App() {
  const [currentPage, setCurrentPage] = React.useState<string>('landing');
  const [user, setUser] = React.useState<User | null>(null);
  const [jobs, setJobs] = React.useState<Job[]>(MOCK_JOBS);
  const [applications, setApplications] = React.useState<JobApplication[]>([]);

  const handleLogin = (email: string) => {
    // Mock login
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      role: 'white-collar', // Default for mock login
    };
    setUser(mockUser);
    setCurrentPage('dashboard');
  };

  const handleSignup = (email: string, role: UserRole) => {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      role,
    };
    setUser(newUser);
    if (role === 'employer') {
      setCurrentPage('dashboard');
    } else {
      setCurrentPage('profile-creation');
    }
  };

  const handleProfileComplete = (profile: WorkerProfile) => {
    if (user) {
      setUser({ ...user, profile });
      setCurrentPage('dashboard');
    }
  };

  const handlePostJob = (jobData: Omit<Job, 'id' | 'employerId' | 'employerName' | 'createdAt'>) => {
    if (!user) return;
    const newJob: Job = {
      ...jobData,
      id: Math.random().toString(36).substr(2, 9),
      employerId: user.id,
      employerName: user.profile?.name || user.email.split('@')[0],
      createdAt: new Date().toISOString(),
    };
    setJobs([newJob, ...jobs]);
  };

  const handleApply = (jobId: string) => {
    if (!user) return;
    const newApplication: JobApplication = {
      id: Math.random().toString(36).substr(2, 9),
      jobId,
      workerId: user.id,
      status: 'pending',
      appliedAt: new Date().toISOString(),
    };
    setApplications([...applications, newApplication]);
  };

  const handleVerify = (verificationData: Omit<SkillVerification, 'id' | 'userId' | 'status'>) => {
    if (!user) return;
    const newVerification: SkillVerification = {
      ...verificationData,
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
      status: 'verified',
    };
    
    setUser({
      ...user,
      verifications: [...((user as any).verifications || []), newVerification]
    } as any);
  };

  const appliedJobIds = applications
    .filter(app => app.workerId === user?.id)
    .map(app => app.jobId);

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('landing');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onStart={() => setCurrentPage('signup')} />;
      case 'login':
        return <LoginPage onLogin={handleLogin} onSwitchToSignup={() => setCurrentPage('signup')} />;
      case 'signup':
        return <SignupPage onSignup={handleSignup} onSwitchToLogin={() => setCurrentPage('login')} />;
      case 'profile-creation':
        return user ? (
          <ProfileCreationPage role={user.role} onComplete={handleProfileComplete} />
        ) : (
          <LoginPage onLogin={handleLogin} onSwitchToSignup={() => setCurrentPage('signup')} />
        );
      case 'dashboard':
        return user ? (
          <DashboardPage 
            user={user} 
            jobs={jobs}
            onPostJob={handlePostJob}
            onApply={handleApply}
            appliedJobIds={appliedJobIds}
          />
        ) : (
          <LoginPage onLogin={handleLogin} onSwitchToSignup={() => setCurrentPage('signup')} />
        );
      case 'profile':
        return user ? (
          <ProfilePage user={user} onVerify={handleVerify} />
        ) : (
          <LoginPage onLogin={handleLogin} onSwitchToSignup={() => setCurrentPage('signup')} />
        );
      default:
        return <LandingPage onStart={() => setCurrentPage('signup')} />;
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-zinc-900 antialiased">
      <Navbar 
        user={user} 
        onLogout={handleLogout} 
        onNavigate={setCurrentPage} 
        currentPage={currentPage} 
      />
      <main>
        {renderPage()}
      </main>
      
      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-zinc-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-indigo-600 text-white">
                <span className="text-xs font-bold">W</span>
              </div>
              <span className="text-lg font-bold tracking-tight text-zinc-900">WorkBridge</span>
            </div>
            <p className="text-sm text-zinc-500">
              © 2026 WorkBridge Inc. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-zinc-500 hover:text-indigo-600">Privacy</a>
              <a href="#" className="text-sm text-zinc-500 hover:text-indigo-600">Terms</a>
              <a href="#" className="text-sm text-zinc-500 hover:text-indigo-600">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
