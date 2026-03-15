import React from 'react';
import { MapPin, Star, Briefcase, ExternalLink, BadgeCheck, Play, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';
import { Worker } from '../types';

interface WorkerCardProps {
  worker: Worker;
}

export const WorkerCard: React.FC<WorkerCardProps> = ({ worker }) => {
  const isVerified = worker.verifications && worker.verifications.length > 0;
  const verification = worker.verifications?.[0];

  return (
    <div className="group rounded-2xl border border-zinc-200 bg-white p-6 transition-all hover:border-indigo-200 hover:shadow-xl">
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <div className="h-16 w-16 overflow-hidden rounded-full bg-zinc-100 ring-2 ring-zinc-50 group-hover:ring-indigo-100 transition-all">
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${worker.name}`} 
              alt={worker.name}
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-lg font-bold text-zinc-900">{worker.name}</h3>
              {isVerified && (
                <div className="flex items-center gap-0.5 rounded-full bg-indigo-50 px-1.5 py-0.5 text-[10px] font-bold text-indigo-600 ring-1 ring-indigo-600/20">
                  <BadgeCheck size={12} />
                  <span>VERIFIED</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-1 text-sm font-medium text-indigo-600">
              <Briefcase size={14} />
              <span>{worker.skill}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-amber-600">
          <Star size={14} fill="currentColor" />
          <span className="text-xs font-bold">4.9</span>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-zinc-600">
        {worker.bio}
      </p>

      {isVerified && verification && (
        <div className="mt-4 overflow-hidden rounded-xl border border-zinc-100 bg-zinc-50">
          <div className="flex items-center gap-2 border-b border-zinc-100 bg-white px-3 py-2">
            {verification.type === 'video' && <Play size={14} className="text-indigo-600" />}
            {verification.type === 'image' && <ImageIcon size={14} className="text-indigo-600" />}
            {verification.type === 'portfolio' && <LinkIcon size={14} className="text-indigo-600" />}
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
              Skill Proof: {verification.type}
            </span>
          </div>
          <div className="relative aspect-video w-full overflow-hidden bg-zinc-200">
            {verification.type === 'image' ? (
              <img 
                src={verification.mediaUrl} 
                alt="Skill proof" 
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-4 text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-indigo-600 shadow-sm">
                  {verification.type === 'video' ? <Play size={20} /> : <LinkIcon size={20} />}
                </div>
                <p className="text-xs font-medium text-zinc-600">
                  {verification.type === 'video' ? 'Watch verification video' : 'View portfolio link'}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {worker.skills.map((s) => (
          <span key={s} className="rounded-lg bg-zinc-50 px-2 py-1 text-[10px] font-semibold text-zinc-600">
            {s}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-4">
        <div className="flex items-center gap-1 text-xs font-medium text-zinc-500">
          <MapPin size={14} />
          <span>{worker.location}</span>
        </div>
        <button className="flex items-center gap-1 text-sm font-bold text-indigo-600 hover:text-indigo-700">
          Hire Worker
          <ExternalLink size={14} />
        </button>
      </div>
    </div>
  );
};
