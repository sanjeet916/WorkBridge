import React from 'react';
import { X, Briefcase, MapPin, DollarSign, Clock, FileText } from 'lucide-react';
import { Job, JobCategory, JobType, JobDuration } from '../types';

interface JobPostingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPost: (job: Omit<Job, 'id' | 'employerId' | 'employerName' | 'createdAt'>) => void;
}

export const JobPostingModal: React.FC<JobPostingModalProps> = ({ isOpen, onClose, onPost }) => {
  const [formData, setFormData] = React.useState({
    title: '',
    category: 'Hands-On Work' as JobCategory,
    requiredSkill: '',
    description: '',
    location: '',
    jobType: 'On-site' as JobType,
    salary: '',
    duration: 'Full-time' as JobDuration,
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPost(formData);
    onClose();
    setFormData({
      title: '',
      category: 'Hands-On Work',
      requiredSkill: '',
      description: '',
      location: '',
      jobType: 'On-site',
      salary: '',
      duration: 'Full-time',
    });
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-zinc-100 p-6">
          <h2 className="text-2xl font-bold text-zinc-900">Post a New Job</h2>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-zinc-100">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="max-h-[80vh] overflow-y-auto p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-zinc-900">Job Title</label>
              <input
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-3 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20"
                placeholder="e.g. Senior Frontend Developer"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-zinc-900">Job Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as JobCategory })}
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-3 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="Hands-On Work">Hands-On Work</option>
                <option value="Computer / Office Work">Computer / Office Work</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-zinc-900">Required Skill</label>
              <input
                required
                value={formData.requiredSkill}
                onChange={(e) => setFormData({ ...formData, requiredSkill: e.target.value })}
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-3 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20"
                placeholder="e.g. React, TypeScript"
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
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-3 pl-10 pr-3 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="City or Area"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-zinc-900">Job Type</label>
              <select
                value={formData.jobType}
                onChange={(e) => setFormData({ ...formData, jobType: e.target.value as JobType })}
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-3 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="On-site">On-site</option>
                <option value="Remote">Remote</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-zinc-900">Budget / Salary</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 text-zinc-400" size={18} />
                <input
                  required
                  value={formData.salary}
                  onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-3 pl-10 pr-3 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="e.g. $50/hr or $100k/yr"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-zinc-900">Duration</label>
              <select
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value as JobDuration })}
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-3 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="One-time">One-time</option>
                <option value="Contract">Contract</option>
                <option value="Full-time">Full-time</option>
              </select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-zinc-900">Job Description</label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-3 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20"
                placeholder="Describe the role and responsibilities..."
              />
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-zinc-200 py-3 font-semibold text-zinc-600 hover:bg-zinc-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-xl bg-indigo-600 py-3 font-semibold text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-700"
            >
              Post Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
