import React from 'react';
import { motion } from 'motion/react';
import { User, MapPin, Briefcase, Link as LinkIcon, Upload, Check } from 'lucide-react';
import { UserRole, WorkerProfile } from '../types';

interface ProfileCreationPageProps {
  role: UserRole;
  onComplete: (profile: WorkerProfile) => void;
}

export const ProfileCreationPage: React.FC<ProfileCreationPageProps> = ({ role, onComplete }) => {
  const [formData, setFormData] = React.useState<Partial<WorkerProfile>>({
    name: '',
    skill: '',
    experience: '',
    location: '',
    portfolioUrl: '',
    bio: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(formData as WorkerProfile);
  };

  const isBlueCollar = role === 'blue-collar';

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-white p-8 shadow-xl shadow-zinc-200 ring-1 ring-zinc-200"
      >
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-zinc-900">Complete your profile</h2>
          <p className="mt-2 text-zinc-600">
            Tell us more about your skills and experience to help you find the best opportunities.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-zinc-900">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-zinc-400" size={18} />
                <input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-2.5 pl-10 pr-3 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-zinc-900">
                {isBlueCollar ? 'Primary Skill' : 'Profession'}
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-3 text-zinc-400" size={18} />
                <input
                  required
                  value={formData.skill}
                  onChange={(e) => setFormData({ ...formData, skill: e.target.value })}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-2.5 pl-10 pr-3 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20"
                  placeholder={isBlueCollar ? 'e.g. Electrician' : 'e.g. UI Designer'}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-zinc-900">Experience</label>
              <input
                required
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-2.5 px-3 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20"
                placeholder="e.g. 5 years"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-zinc-900">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-zinc-400" size={18} />
                <input
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-2.5 pl-10 pr-3 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="City, State"
                />
              </div>
            </div>
          </div>

          {!isBlueCollar && (
            <div className="space-y-2">
              <label className="text-sm font-semibold text-zinc-900">Portfolio Link</label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-3 text-zinc-400" size={18} />
                <input
                  value={formData.portfolioUrl}
                  onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-2.5 pl-10 pr-3 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="https://portfolio.com"
                />
              </div>
            </div>
          )}

          {isBlueCollar && (
            <div className="space-y-2">
              <label className="text-sm font-semibold text-zinc-900">Skill Proof (Photo/Video)</label>
              <div className="flex items-center justify-center rounded-2xl border-2 border-dashed border-zinc-200 bg-zinc-50 p-8 transition-colors hover:border-indigo-300">
                <div className="text-center">
                  <Upload className="mx-auto mb-2 text-zinc-400" size={32} />
                  <p className="text-sm font-medium text-zinc-600">Click to upload or drag and drop</p>
                  <p className="mt-1 text-xs text-zinc-400">PNG, JPG or MP4 (max. 10MB)</p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-semibold text-zinc-900">Short Bio</label>
            <textarea
              required
              rows={4}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-3 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20"
              placeholder="Tell us a bit about yourself and your work..."
            />
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-4 text-lg font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-700 active:scale-[0.98]"
          >
            Complete Profile
            <Check size={20} />
          </button>
        </form>
      </motion.div>
    </div>
  );
};
