import React from 'react';
import { MapPin, Clock, DollarSign, Building2, ArrowRight, Monitor, Hammer } from 'lucide-react';
import { Job } from '../types';

interface JobCardProps {
  job: Job;
  onClick: (job: Job) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onClick }) => {
  const isHandsOn = job.category === 'Hands-On Work';

  return (
    <div 
      onClick={() => onClick(job)}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 transition-all hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-50 text-zinc-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
            {isHandsOn ? <Hammer size={24} /> : <Monitor size={24} />}
          </div>
          <div>
            <h3 className="text-lg font-bold text-zinc-900">{job.title}</h3>
            <p className="text-sm font-medium text-zinc-500">{job.employerName}</p>
          </div>
        </div>
        <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
          !isHandsOn 
            ? 'bg-blue-50 text-blue-600' 
            : 'bg-emerald-50 text-emerald-600'
        }`}>
          {job.category}
        </span>
      </div>

      <div className="mt-4">
        <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">Required Skill</p>
        <p className="mt-1 text-sm font-medium text-zinc-700">{job.requiredSkill}</p>
      </div>

      <div className="mt-6 flex flex-wrap gap-4">
        <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-500">
          <MapPin size={14} />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-500">
          <DollarSign size={14} />
          <span>{job.salary}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-500">
          <Clock size={14} />
          <span>{job.jobType}</span>
        </div>
      </div>

      <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 py-3 text-sm font-semibold text-white transition-all group-hover:bg-indigo-600 active:scale-[0.98]">
        View Details
        <ArrowRight size={16} />
      </button>
    </div>
  );
};
