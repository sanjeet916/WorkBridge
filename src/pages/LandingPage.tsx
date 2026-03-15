import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Globe, Shield, Zap } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white py-20 lg:py-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_45%_at_50%_50%,#EEF2FF_0%,#FFFFFF_100%)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-600 ring-1 ring-inset ring-indigo-600/10">
                The Future of Work is Here
              </span>
              <h1 className="mt-6 text-5xl font-extrabold tracking-tight text-zinc-900 sm:text-7xl">
                Bridging the Gap Between <br />
                <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  Skills and Opportunity
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
                WorkBridge is the unified platform connecting skilled blue-collar workers and white-collar professionals with top employers. Find your next gig or your next star hire.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <button
                  onClick={onStart}
                  className="rounded-full bg-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-indigo-500/20 transition-all hover:bg-indigo-700 hover:shadow-indigo-500/40 active:scale-95"
                >
                  Get Started
                </button>
                <button className="flex items-center gap-2 text-lg font-semibold text-zinc-900 hover:text-indigo-600">
                  Learn more <ArrowRight size={20} />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-zinc-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {[
              {
                icon: <Zap className="text-amber-500" />,
                title: "Fast Matching",
                description: "Our platform ensures you find the right job or worker in record time."
              },
              {
                icon: <Shield className="text-emerald-500" />,
                title: "Verified Profiles",
                description: "Every worker on WorkBridge undergoes a verification process for peace of mind."
              },
              {
                icon: <Globe className="text-blue-500" />,
                title: "Global & Local",
                description: "Whether it's a remote coding gig or a local plumbing job, we've got you covered."
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-zinc-200 transition-all hover:shadow-md"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-50">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-zinc-900">{feature.title}</h3>
                <p className="mt-2 text-zinc-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-12 lg:flex-row">
            <div className="max-w-xl">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
                Trusted by thousands of workers and employers worldwide.
              </h2>
              <p className="mt-4 text-lg text-zinc-600">
                We've built a community where skills are valued and opportunities are accessible to everyone, regardless of their collar color.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  "Secure payment systems",
                  "24/7 dedicated support",
                  "Comprehensive skill verification",
                  "Transparent rating system"
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-zinc-700">
                    <CheckCircle2 size={20} className="text-indigo-600" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-[400px] w-full max-w-md overflow-hidden rounded-3xl bg-indigo-100 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=800" 
                alt="Team working"
                className="h-full w-full object-cover opacity-90"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
