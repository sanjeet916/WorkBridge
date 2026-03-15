import React from 'react';
import { motion } from 'motion/react';
import { BadgeCheck, Upload, Video, Image as ImageIcon, Link as LinkIcon, CheckCircle2, AlertCircle } from 'lucide-react';
import { User, SkillVerification } from '../types';

interface ProfilePageProps {
  user: User;
  onVerify: (verification: Omit<SkillVerification, 'id' | 'userId' | 'status'>) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ user, onVerify }) => {
  const [selectedSkill, setSelectedSkill] = React.useState('');
  const [verificationType, setVerificationType] = React.useState<'video' | 'image' | 'portfolio'>('image');
  const [mediaUrl, setMediaUrl] = React.useState('');
  const [isSuccess, setIsSuccess] = React.useState(false);

  const workerProfile = user.profile;
  const verifications = (user as any).verifications || [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSkill || !mediaUrl) return;

    onVerify({
      skillName: selectedSkill,
      mediaUrl,
      type: verificationType,
    });

    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
    
    setSelectedSkill('');
    setMediaUrl('');
  };

  if (user.role === 'employer') {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-zinc-200">
          <h2 className="text-2xl font-bold text-zinc-900">Employer Profile</h2>
          <p className="mt-2 text-zinc-600">Manage your company details and job postings.</p>
          <div className="mt-8 rounded-2xl bg-zinc-50 p-6">
            <p className="text-sm font-medium text-zinc-500">Email: {user.email}</p>
            <p className="text-sm font-medium text-zinc-500">Role: Employer</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Profile Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <div className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-zinc-200">
              <div className="h-24 bg-indigo-600" />
              <div className="px-6 pb-6">
                <div className="-mt-12 flex justify-center">
                  <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-white bg-zinc-100 shadow-lg">
                    <img 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${workerProfile?.name || user.email}`} 
                      alt="Avatar"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <h2 className="text-xl font-bold text-zinc-900">{workerProfile?.name || 'User'}</h2>
                  <p className="text-sm font-medium text-indigo-600">{workerProfile?.skill || 'Worker'}</p>
                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    {verifications.length > 0 && (
                      <div className="flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-[10px] font-bold text-indigo-600 ring-1 ring-indigo-600/20">
                        <BadgeCheck size={12} />
                        <span>VERIFIED</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-zinc-200">
              <h3 className="font-bold text-zinc-900">Stats</h3>
              <div className="mt-4 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Jobs Completed</span>
                  <span className="font-bold text-zinc-900">0</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Rating</span>
                  <span className="font-bold text-zinc-900">N/A</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Response Rate</span>
                  <span className="font-bold text-zinc-900">100%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Verification Section */}
          <section className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-zinc-200">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <BadgeCheck size={24} />
              </div>
              <h2 className="text-2xl font-bold text-zinc-900">Verify Your Skills</h2>
            </div>
            <p className="mt-2 text-zinc-600">
              Prove your abilities by uploading media evidence. Verified skills get 3x more job offers.
            </p>

            {isSuccess && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 flex items-center gap-2 rounded-xl bg-emerald-50 p-4 text-emerald-700 ring-1 ring-emerald-600/20"
              >
                <CheckCircle2 size={20} />
                <span className="text-sm font-medium">Verification submitted successfully!</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-900">Select Skill to Verify</label>
                <select 
                  required
                  value={selectedSkill}
                  onChange={(e) => setSelectedSkill(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-3 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20"
                >
                  <option value="">Choose a skill...</option>
                  <option value={workerProfile?.skill}>{workerProfile?.skill}</option>
                  <option value="Electrician">Electrician</option>
                  <option value="Plumber">Plumber</option>
                  <option value="Graphic Designer">Graphic Designer</option>
                  <option value="Web Developer">Web Developer</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-900">Verification Type</label>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { id: 'image', icon: <ImageIcon size={20} />, label: 'Photo' },
                    { id: 'video', icon: <Video size={20} />, label: 'Video' },
                    { id: 'portfolio', icon: <LinkIcon size={20} />, label: 'Link' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setVerificationType(t.id as any)}
                      className={`flex flex-col items-center gap-2 rounded-2xl border-2 p-4 transition-all ${
                        verificationType === t.id 
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-600' 
                          : 'border-zinc-100 bg-zinc-50 text-zinc-500 hover:border-zinc-200'
                      }`}
                    >
                      {t.icon}
                      <span className="text-xs font-bold">{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-900">
                  {verificationType === 'portfolio' ? 'Portfolio URL' : 'Media URL (Mock)'}
                </label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-3 text-zinc-400" size={18} />
                  <input
                    required
                    value={mediaUrl}
                    onChange={(e) => setMediaUrl(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-3 pl-10 pr-3 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20"
                    placeholder={verificationType === 'portfolio' ? "https://github.com/..." : "Paste image/video URL..."}
                  />
                </div>
                <p className="text-[10px] text-zinc-400">
                  <AlertCircle size={10} className="inline mr-1" />
                  In a real app, you would upload a file here. For this prototype, please provide a URL.
                </p>
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-4 text-lg font-bold text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-700 active:scale-[0.98]"
              >
                <Upload size={20} />
                Submit for Verification
              </button>
            </form>
          </section>

          {/* Verified Skills List */}
          <section className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-zinc-200">
            <h3 className="text-xl font-bold text-zinc-900">Your Verified Skills</h3>
            <div className="mt-6 space-y-4">
              {verifications.length === 0 ? (
                <div className="rounded-2xl border-2 border-dashed border-zinc-100 p-8 text-center">
                  <p className="text-sm text-zinc-500">No skills verified yet. Upload proof to earn your first badge!</p>
                </div>
              ) : (
                verifications.map((v: any) => (
                  <div key={v.id} className="flex items-center justify-between rounded-2xl border border-zinc-100 bg-zinc-50 p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                        <BadgeCheck size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-zinc-900">{v.skillName}</p>
                        <p className="text-xs text-zinc-500 uppercase tracking-wider">{v.type} Proof • Verified</p>
                      </div>
                    </div>
                    <a 
                      href={v.mediaUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-indigo-600 hover:underline"
                    >
                      View Proof
                    </a>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
