export type UserRole = 'blue-collar' | 'white-collar' | 'employer';
export type JobCategory = 'Hands-On Work' | 'Computer / Office Work';
export type JobType = 'On-site' | 'Remote';
export type JobDuration = 'One-time' | 'Contract' | 'Full-time';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  profile?: WorkerProfile | EmployerProfile;
}

export interface WorkerProfile {
  name: string;
  skill: string;
  experience: string;
  location?: string;
  portfolioUrl?: string;
  skills?: string[];
  proofUrl?: string;
  bio: string;
}

export interface EmployerProfile {
  companyName: string;
  industry: string;
  location: string;
}

export interface Job {
  id: string;
  title: string;
  category: JobCategory;
  requiredSkill: string;
  description: string;
  location: string;
  jobType: JobType;
  salary: string;
  duration: JobDuration;
  employerId: string;
  employerName: string;
  createdAt: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  workerId: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  appliedAt: string;
}

export interface SkillVerification {
  id: string;
  userId: string;
  skillName: string;
  mediaUrl: string;
  type: 'video' | 'image' | 'portfolio';
  status: 'verified' | 'pending';
}

export interface Worker {
  id: string;
  name: string;
  role: 'blue-collar' | 'white-collar';
  skill: string;
  experience: string;
  location: string;
  bio: string;
  skills: string[];
  verifications?: SkillVerification[];
}
