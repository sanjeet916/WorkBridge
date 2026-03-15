import React from 'react';
import { motion } from 'motion/react';
import { Search, Filter, MapPin, Briefcase, Users, LayoutGrid, Plus, Hammer, Monitor, Globe } from 'lucide-react';
import { JobCard } from '../components/JobCard';
import { WorkerCard } from '../components/WorkerCard';
import { JobPostingModal } from '../components/JobPostingModal';
import { JobDetailsView } from '../components/JobDetailsView';
import { MOCK_JOBS, MOCK_WORKERS } from '../mockData';
import { User, Job, JobCategory, JobType } from '../types';

interface DashboardPageProps {
  user: User;
  jobs: Job[];
  onPostJob: (job: Omit<Job, 'id' | 'employerId' | 'employerName' | 'createdAt'>) => void;
  onApply: (jobId: string) => void;
  appliedJobIds: string[];
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ 
  user, 
  jobs, 
  onPostJob, 
  onApply,
  appliedJobIds 
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [categoryFilter, setCategoryFilter] = React.useState<JobCategory | 'All'>('All');
  const [typeFilter, setTypeFilter] = React.useState<JobType | 'All'>('All');
  const [locationFilter, setLocationFilter] = React.useState('');
  
  const [isPostingModalOpen, setIsPostingModalOpen] = React.useState(false);
  const [selectedJob, setSelectedJob] = React.useState<Job | null>(null);

  const isEmployer = user.role === 'employer';

  const filteredJobs = jobs.filter(job => 
    (categoryFilter === 'All' || job.category === categoryFilter) &&
    (typeFilter === 'All' || job.jobType === typeFilter) &&
    (locationFilter === '' || job.location.toLowerCase().includes(locationFilter.toLowerCase())) &&
    (job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     job.employerName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredWorkers = MOCK_WORKERS.filter(worker =>
    (searchTerm === '' || 
     worker.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     worker.skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (selectedJob) {
    return (
      <JobDetailsView 
        job={selectedJob} 
        onBack={() => setSelectedJob(null)} 
        onApply={(id) => {
          onApply(id);
        }}
        isApplied={appliedJobIds.includes(selectedJob.id)}
      />
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-zinc-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">
              {isEmployer ? 'Employer Dashboard' : 'Job Marketplace'}
            </h1>
            <p className="mt-1 text-zinc-600">
              {isEmployer 
                ? 'Manage your job postings and find the best talent.' 
                : 'Discover available work opportunities that match your skills.'}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            {isEmployer && (
              <button 
                onClick={() => setIsPostingModalOpen(true)}
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 active:scale-95"
              >
                <Plus size={20} />
                Post a Job
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="mt-8 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-2.5 pl-10 pr-4 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <input
                type="text"
                placeholder="Location..."
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-2.5 pl-10 pr-4 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as any)}
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-2.5 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="All">All Work Types</option>
              <option value="Hands-On Work">Hands-On Work</option>
              <option value="Computer / Office Work">Computer / Office Work</option>
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as any)}
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-2.5 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="All">All Job Types</option>
              <option value="On-site">On-site</option>
              <option value="Remote">Remote</option>
            </select>
          </div>
        </div>

        {/* Content Grid */}
        <div className="mt-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-zinc-900">
              {isEmployer ? 'Available Workers' : `Available Jobs (${filteredJobs.length})`}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {isEmployer ? (
              filteredWorkers.map((worker) => (
                <motion.div
                  key={worker.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <WorkerCard worker={worker} />
                </motion.div>
              ))
            ) : (
              filteredJobs.map((job) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <JobCard job={job} onClick={setSelectedJob} />
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Empty State */}
        {((isEmployer && filteredWorkers.length === 0) || (!isEmployer && filteredJobs.length === 0)) && (
          <div className="mt-20 flex flex-col items-center justify-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-zinc-100 text-zinc-400">
              <Search size={40} />
            </div>
            <h3 className="mt-4 text-xl font-bold text-zinc-900">No results found</h3>
            <p className="mt-2 text-zinc-600">Try adjusting your search or filters to find what you're looking for.</p>
          </div>
        )}
      </div>

      <JobPostingModal 
        isOpen={isPostingModalOpen} 
        onClose={() => setIsPostingModalOpen(false)}
        onPost={onPostJob}
      />
    </div>
  );
};
