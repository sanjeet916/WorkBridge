import React from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, ArrowRight, User, Briefcase, Building2 } from 'lucide-react';
import { UserRole } from '../types';

interface SignupPageProps {
  onSignup: (email: string, role: UserRole) => void;
  onSwitchToLogin: () => void;
}

export const SignupPage: React.FC<SignupPageProps> = ({ onSignup, onSwitchToLogin }) => {
  const [email, setEmail] = React.useState('');
  const [role, setRole] = React.useState<UserRole>('blue-collar');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) onSignup(email, role);
  };

  const roles = [
    {
      id: 'blue-collar' as UserRole,
      title: 'Blue Collar',
      description: 'Electrician, Plumber, Technician...',
      icon: <Briefcase size={24} />,
    },
    {
      id: 'white-collar' as UserRole,
      title: 'White Collar',
      description: 'Developer, Designer, Marketer...',
      icon: <User size={24} />,
    },
    {
      id: 'employer' as UserRole,
      title: 'Employer',
      description: 'Hiring for my company or project',
      icon: <Building2 size={24} />,
    },
  ];

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-zinc-50 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl rounded-3xl bg-white p-8 shadow-xl shadow-zinc-200 ring-1 ring-zinc-200"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900">Create your account</h2>
          <p className="mt-2 text-sm text-zinc-600">Join WorkBridge and start your journey today</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-8">
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-zinc-900">Choose your role</label>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {roles.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRole(r.id)}
                  className={`flex flex-col items-center gap-3 rounded-2xl border-2 p-4 text-center transition-all ${
                    role === r.id
                      ? 'border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600'
                      : 'border-zinc-100 bg-zinc-50 hover:border-zinc-200'
                  }`}
                >
                  <div className={`${role === r.id ? 'text-indigo-600' : 'text-zinc-400'}`}>
                    {r.icon}
                  </div>
                  <div>
                    <p className={`text-sm font-bold ${role === r.id ? 'text-indigo-900' : 'text-zinc-900'}`}>
                      {r.title}
                    </p>
                    <p className="mt-1 text-[10px] text-zinc-500">{r.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-700">
                Email address
              </label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
                  <Mail size={18} />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-xl border border-zinc-200 bg-zinc-50 py-3 pl-10 pr-3 text-zinc-900 placeholder-zinc-400 transition-all focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-zinc-700">
                Create Password
              </label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
                  <Lock size={18} />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  className="block w-full rounded-xl border border-zinc-200 bg-zinc-50 py-3 pl-10 pr-3 text-zinc-900 placeholder-zinc-400 transition-all focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-4 text-base font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-700 active:scale-[0.98]"
          >
            Create Account
            <ArrowRight size={20} />
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-zinc-600">
          Already have an account?{' '}
          <button
            onClick={onSwitchToLogin}
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Log in
          </button>
        </p>
      </motion.div>
    </div>
  );
};
