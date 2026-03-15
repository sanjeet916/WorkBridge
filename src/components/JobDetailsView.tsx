import React from 'react';
import { ArrowLeft, MapPin, DollarSign, Clock, Building2, Briefcase, Calendar, CheckCircle2 } from 'lucide-react';
import { Job } from '../types';
import { motion } from 'motion/react';

interface JobDetailsViewProps {
  job: Job;
  onBack: () => void;
  onApply: (jobId: string) => void;
  isApplied: boolean;
}

export const JobDetailsView: React.FC<JobDetailsViewProps> = ({ job, onBack, onApply, isApplied }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="mx-auto max-w-4xl px-4 py-8"
    >
      <button 
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-indigo-600"
      >
        <ArrowLeft size={18} />
        Back to Dashboard
      </button>

      <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-xl shadow-zinc-200/50">
        {/* Header */}
        <div className="border-b border-zinc-100 bg-zinc-50/50 p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="flex gap-6">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-zinc-200">
                <Building2 size={32} className="text-indigo-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-zinc-900">{job.title}</h1>
                <div className="mt-2 flex flex-wrap items-center gap-4">
                  <span className="text-lg font-medium text-zinc-600">{job.employerName}</span>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                    job.category === 'Computer / Office Work' 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'bg-emerald-50 text-emerald-600'
                  }`}>
                    {job.category}
                  </span>
                </div>
              </div>
            </div>
            
            <button
              disabled={isApplied}
              onClick={() => onApply(job.id)}
              className={`flex items-center gap-2 rounded-xl px-8 py-4 text-lg font-bold transition-all active:scale-95 ${
                isApplied 
                  ? 'bg-emerald-50 text-emerald-600 cursor-default' 
                  : 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-700'
              }`}
            >
              {isApplied ? (
                <>
                  <CheckCircle2 size={24} />
                  Applied
                </>
              ) : (
                'Apply Now'
              )}
            </button>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-100">
              <MapPin size={20} className="text-zinc-400" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Location</p>
                <p className="text-sm font-semibold text-zinc-900">{job.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-100">
              <DollarSign size={20} className="text-zinc-400" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Salary</p>
                <p className="text-sm font-semibold text-zinc-900">{job.salary}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-100">
              <Clock size={20} className="text-zinc-400" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Type</p>
                <p className="text-sm font-semibold text-zinc-900">{job.jobType}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-100">
              <Calendar size={20} className="text-zinc-400" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Duration</p>
                <p className="text-sm font-semibold text-zinc-900">{job.duration}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <section>
                <h2 className="text-xl font-bold text-zinc-900">Job Description</h2>
                <div className="mt-4 space-y-4 text-zinc-600 leading-relaxed">
                  {job.description.split('\n').map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </section>

              <section className="mt-12">
                <h2 className="text-xl font-bold text-zinc-900">Required Skills</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {job.requiredSkill.split(',').map((skill) => (
                    <span 
                      key={skill} 
                      className="rounded-full bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-700"
                    >
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </section>
            </div>

            <div className="space-y-8">
              <div className="rounded-2xl bg-indigo-50 p-6">
                <h3 className="font-bold text-indigo-900">About the Employer</h3>
                <p className="mt-2 text-sm text-indigo-700">
                  {job.employerName} is a verified employer on WorkBridge. They have posted 12 jobs and hired 8 workers.
                </p>
                <button className="mt-4 text-sm font-bold text-indigo-600 hover:underline">
                  View Company Profile
                </button>
              </div>

              <div className="rounded-2xl border border-zinc-100 p-6">
                <h3 className="font-bold text-zinc-900">Safety & Trust</h3>
                <ul className="mt-4 space-y-3">
                  <li className="flex items-center gap-2 text-sm text-zinc-600">
                    <CheckCircle2 size={16} className="text-emerald-500" />
                    Verified Payment
                  </li>
                  <li className="flex items-center gap-2 text-sm text-zinc-600">
                    <CheckCircle2 size={16} className="text-emerald-500" />
                    Secure Contract
                  </li>
                  <li className="flex items-center gap-2 text-sm text-zinc-600">
                    <CheckCircle2 size={16} className="text-emerald-500" />
                    24/7 Support
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
