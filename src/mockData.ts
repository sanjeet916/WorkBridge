import { Job, Worker } from './types';

export const MOCK_JOBS: Job[] = [
  {
    id: '1',
    title: 'Senior React Developer',
    category: 'Computer / Office Work',
    requiredSkill: 'React, TypeScript',
    description: 'Looking for an experienced React developer to lead our frontend team. You will be responsible for architecting scalable solutions and mentoring junior developers.',
    location: 'Remote',
    jobType: 'Remote',
    salary: '$120k - $150k',
    duration: 'Full-time',
    employerId: 'e1',
    employerName: 'TechFlow Solutions',
    createdAt: '2026-03-15T10:00:00Z',
  },
  {
    id: '2',
    title: 'Lead Electrician',
    category: 'Hands-On Work',
    requiredSkill: 'Electrical Wiring, Safety',
    description: 'Experienced electrician needed for large-scale commercial projects. Must have valid certification and 5+ years of experience in industrial settings.',
    location: 'Chicago, IL',
    jobType: 'On-site',
    salary: '$35 - $50 / hr',
    duration: 'Contract',
    employerId: 'e2',
    employerName: 'City Power & Light',
    createdAt: '2026-03-15T08:00:00Z',
  },
  {
    id: '3',
    title: 'UX/UI Designer',
    category: 'Computer / Office Work',
    requiredSkill: 'Figma, User Research',
    description: 'Join our design team to create beautiful and intuitive user experiences. You will work closely with product managers and developers.',
    location: 'Remote',
    jobType: 'Remote',
    salary: '$90k - $110k',
    duration: 'Full-time',
    employerId: 'e3',
    employerName: 'Creative Pulse',
    createdAt: '2026-03-14T15:00:00Z',
  },
  {
    id: '4',
    title: 'Professional Plumber',
    category: 'Hands-On Work',
    requiredSkill: 'Pipe Fitting, Repair',
    description: 'Residential plumbing expert needed for emergency repairs and installations. Must be available for on-call shifts during weekends.',
    location: 'Austin, TX',
    jobType: 'On-site',
    salary: '$40 - $60 / hr',
    duration: 'One-time',
    employerId: 'e4',
    employerName: 'QuickFix Plumbing',
    createdAt: '2026-03-15T12:00:00Z',
  },
];

export const MOCK_WORKERS: Worker[] = [
  {
    id: 'w1',
    name: 'John Smith',
    role: 'blue-collar',
    skill: 'Master Electrician',
    experience: '12 years',
    location: 'Chicago, IL',
    bio: 'Specializing in commercial electrical systems and smart home installations.',
    skills: ['Wiring', 'Troubleshooting', 'Solar Panels', 'Safety Compliance'],
    verifications: [
      {
        id: 'v1',
        userId: 'w1',
        skillName: 'Master Electrician',
        mediaUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=400',
        type: 'image',
        status: 'verified'
      }
    ]
  },
  {
    id: 'w2',
    name: 'Sarah Chen',
    role: 'white-collar',
    skill: 'Full Stack Developer',
    experience: '6 years',
    location: 'San Francisco, CA',
    bio: 'Passionate about building scalable web applications with React and Node.js.',
    skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    verifications: [
      {
        id: 'v2',
        userId: 'w2',
        skillName: 'Full Stack Developer',
        mediaUrl: 'https://github.com/sarahchen',
        type: 'portfolio',
        status: 'verified'
      }
    ]
  },
  {
    id: 'w3',
    name: 'Mike Johnson',
    role: 'blue-collar',
    skill: 'Carpenter',
    experience: '8 years',
    location: 'Denver, CO',
    bio: 'Expert in custom cabinetry and high-end residential framing.',
    skills: ['Framing', 'Cabinetry', 'Blueprint Reading', 'Power Tools'],
  },
  {
    id: 'w4',
    name: 'Elena Rodriguez',
    role: 'white-collar',
    skill: 'Digital Marketer',
    experience: '4 years',
    location: 'Miami, FL',
    bio: 'SEO and PPC specialist with a focus on e-commerce growth.',
    skills: ['SEO', 'Google Ads', 'Content Strategy', 'Analytics'],
  },
];
