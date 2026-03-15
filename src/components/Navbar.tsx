import React from 'react';
import { Briefcase, User, LogOut, Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';

interface NavbarProps {
  user: any;
  onLogout: () => void;
  onNavigate: (page: string) => void;
  currentPage: string;
}

export const Navbar: React.FC<NavbarProps> = ({ user, onLogout, onNavigate, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navLinks = [
    { name: 'Home', id: 'landing', show: !user },
    { name: 'Dashboard', id: 'dashboard', show: !!user },
    { name: 'Profile', id: 'profile', show: !!user && user.role !== 'employer' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('landing')}>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
              <Briefcase size={20} />
            </div>
            <span className="text-xl font-bold tracking-tight text-zinc-900">WorkBridge</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:block">
            <div className="flex items-center gap-8">
              {navLinks.filter(link => link.show).map((link) => (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-indigo-600",
                    currentPage === link.id ? "text-indigo-600" : "text-zinc-600"
                  )}
                >
                  {link.name}
                </button>
              ))}
              
              {!user ? (
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => onNavigate('login')}
                    className="text-sm font-medium text-zinc-600 hover:text-indigo-600"
                  >
                    Log in
                  </button>
                  <button 
                    onClick={() => onNavigate('signup')}
                    className="rounded-full bg-indigo-600 px-5 py-2 text-sm font-medium text-white transition-all hover:bg-indigo-700 hover:shadow-lg active:scale-95"
                  >
                    Sign up
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1">
                    <User size={16} className="text-zinc-500" />
                    <span className="text-xs font-medium text-zinc-700">{user.email}</span>
                  </div>
                  <button 
                    onClick={onLogout}
                    className="flex items-center gap-1 text-sm font-medium text-zinc-600 hover:text-red-600"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-lg p-2 text-zinc-600 hover:bg-zinc-100"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="border-t border-zinc-200 bg-white p-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.filter(link => link.show).map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setIsMenuOpen(false);
                }}
                className={cn(
                  "text-left text-base font-medium",
                  currentPage === link.id ? "text-indigo-600" : "text-zinc-600"
                )}
              >
                {link.name}
              </button>
            ))}
            {!user ? (
              <>
                <button 
                  onClick={() => { onNavigate('login'); setIsMenuOpen(false); }}
                  className="text-left text-base font-medium text-zinc-600"
                >
                  Log in
                </button>
                <button 
                  onClick={() => { onNavigate('signup'); setIsMenuOpen(false); }}
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-center text-base font-medium text-white"
                >
                  Sign up
                </button>
              </>
            ) : (
              <button 
                onClick={() => { onLogout(); setIsMenuOpen(false); }}
                className="flex items-center gap-2 text-left text-base font-medium text-red-600"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
