import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, ArrowRight, ArrowLeft, Terminal, Cpu, Globe2, ShieldCheck } from 'lucide-react';

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact: () => void;
}

export const GetStartedModal: React.FC<GetStartedModalProps> = ({
  isOpen,
  onClose,
  onOpenContact,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedType, setSelectedType] = useState('full-system');
  const [selectedScale, setSelectedScale] = useState('global');
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    notes: '',
  });
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    setCompleted(true);
  };

  const handleReset = () => {
    setCompleted(false);
    setStep(1);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="get-started-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#F7F6F8] border border-[#0fa3c2]/40 shadow-2xl p-6 sm:p-10 max-h-[92vh] overflow-y-auto chamfer-cta"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: '0 25px 60px -15px rgba(21, 188, 223, 0.25), 0 0 0 1px rgba(21, 188, 223, 0.3)',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-none bg-[#2b3033] text-white hover:bg-[#15BCDF] hover:text-[#111] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <span className="inline-block px-2.5 py-1 bg-[#15BCDF]/15 text-[#0fa3c2] text-xs uppercase tracking-widest font-bold mb-3 border border-[#0fa3c2]/30">
            SYSTEM DISCOVERY & SCOPING
          </span>
          <h2 id="get-started-title" className="text-3xl sm:text-4xl font-bold tracking-tight text-[#2b3033] uppercase">
            LAUNCH YOUR <span className="text-[#15BCDF]">PROJECT</span>
          </h2>
          <p className="text-[#6b6f72] text-sm mt-1">
            Configure your technical scope to receive a tailored engineering proposal from BryTech.
          </p>
        </div>

        {/* Step indicator */}
        {!completed && (
          <div className="flex items-center gap-2 mb-6">
            <div
              className={`h-1.5 flex-1 transition-all ${
                step >= 1 ? 'bg-[#15BCDF]' : 'bg-[#2b3033]/20'
              }`}
            />
            <div
              className={`h-1.5 flex-1 transition-all ${
                step >= 2 ? 'bg-[#15BCDF]' : 'bg-[#2b3033]/20'
              }`}
            />
            <div
              className={`h-1.5 flex-1 transition-all ${
                step >= 3 ? 'bg-[#15BCDF]' : 'bg-[#2b3033]/20'
              }`}
            />
          </div>
        )}

        {completed ? (
          <div className="py-10 text-center">
            <div className="w-16 h-16 bg-[#15BCDF]/20 border border-[#0fa3c2] text-[#0fa3c2] mx-auto flex items-center justify-center rounded-full mb-6">
              <CheckCircle2 className="w-8 h-8 text-[#15BCDF]" />
            </div>
            <h3 className="text-2xl font-bold uppercase text-[#2b3033] mb-2">Scope Submitted</h3>
            <p className="text-[#6b6f72] text-sm max-w-md mx-auto mb-6">
              Our engineering lead has received your target architecture specifications. We will schedule a 30-minute discovery session with your team.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-8 py-3 bg-[#15BCDF] hover:bg-[#3fd0ef] text-[#1a1c1e] font-bold uppercase tracking-widest text-xs chamfer-cta border border-[#0fa3c2] transition-colors cursor-pointer"
              >
                Close Window
              </button>
              <button
                onClick={() => {
                  onClose();
                  onOpenContact();
                }}
                className="w-full sm:w-auto px-6 py-3 bg-[#2b3033] hover:bg-black text-white font-bold uppercase tracking-widest text-xs chamfer-cta transition-colors cursor-pointer"
              >
                Direct Message Us
              </button>
            </div>
          </div>
        ) : (
          <div>
            {step === 1 && (
              <div className="space-y-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#2b3033]">
                  1. What does your business need built?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    {
                      id: 'full-system',
                      title: 'Full Business System',
                      desc: 'Custom ERP, internal CRM, operations portal & automated pipelines.',
                      icon: Cpu,
                    },
                    {
                      id: 'global-website',
                      title: 'Global Website Platform',
                      desc: 'Ultra-fast marketing & commerce site with worldwide CDN delivery.',
                      icon: Globe2,
                    },
                    {
                      id: 'cloud-api',
                      title: 'API & Microservices',
                      desc: 'High-throughput backend engines, database architecture & queues.',
                      icon: Terminal,
                    },
                    {
                      id: 'testing-audit',
                      title: 'Testing & QA Audit',
                      desc: 'Automated CI/CD integration, stress testing, and security hardening.',
                      icon: ShieldCheck,
                    },
                  ].map((item) => {
                    const Icon = item.icon;
                    const isSelected = selectedType === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setSelectedType(item.id)}
                        className={`p-4 text-left border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-white border-[#15BCDF] shadow-[0_0_0_1px_rgba(21,188,223,0.5)]'
                            : 'bg-white/60 border-[#2b3033]/15 hover:border-[#2b3033]/40'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1.5">
                          <Icon className={`w-4 h-4 ${isSelected ? 'text-[#15BCDF]' : 'text-[#2b3033]'}`} />
                          <span className="font-bold text-sm uppercase text-[#2b3033]">{item.title}</span>
                        </div>
                        <p className="text-xs text-[#6b6f72]">{item.desc}</p>
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => setStep(2)}
                    className="py-3 px-6 bg-[#15BCDF] hover:bg-[#3fd0ef] text-[#1a1c1e] font-bold uppercase tracking-widest text-xs flex items-center gap-2 chamfer-cta border border-[#0fa3c2] cursor-pointer"
                  >
                    <span>Next: Scale & Load</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#2b3033]">
                  2. Select Target Scale & Traffic Concurrency
                </label>
                <div className="space-y-3">
                  {[
                    {
                      id: 'regional',
                      title: 'Regional / Single Region',
                      desc: 'Up to 25,000 monthly active users, single-region high-availability failover.',
                    },
                    {
                      id: 'multi-region',
                      title: 'Multi-Region High Concurrency',
                      desc: 'Up to 500,000 active users, geo-distributed database replication and Edge workers.',
                    },
                    {
                      id: 'global',
                      title: 'Global Enterprise Scale',
                      desc: 'Worldwide deployment across Americas, EMEA, and APAC with 99.999% SLA.',
                    },
                  ].map((tier) => {
                    const isSelected = selectedScale === tier.id;
                    return (
                      <button
                        key={tier.id}
                        type="button"
                        onClick={() => setSelectedScale(tier.id)}
                        className={`w-full p-4 text-left border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-white border-[#15BCDF] shadow-[0_0_0_1px_rgba(21,188,223,0.5)]'
                            : 'bg-white/60 border-[#2b3033]/15 hover:border-[#2b3033]/40'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm uppercase text-[#2b3033]">{tier.title}</span>
                          {isSelected && <span className="text-xs font-bold text-[#15BCDF]">SELECTED</span>}
                        </div>
                        <p className="text-xs text-[#6b6f72] mt-1">{tier.desc}</p>
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between pt-4">
                  <button
                    onClick={() => setStep(1)}
                    className="py-3 px-5 text-[#2b3033] hover:text-black font-bold uppercase tracking-widest text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="py-3 px-6 bg-[#15BCDF] hover:bg-[#3fd0ef] text-[#1a1c1e] font-bold uppercase tracking-widest text-xs flex items-center gap-2 chamfer-cta border border-[#0fa3c2] cursor-pointer"
                  >
                    <span>Next: Contact Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <form onSubmit={handleFinish} className="space-y-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#2b3033]">
                  3. Contact Information & Target Timeline
                </label>
                <div>
                  <input
                    required
                    type="text"
                    placeholder="Your Full Name"
                    value={contactInfo.name}
                    onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#2b3033]/20 focus:border-[#15BCDF] focus:outline-none text-[#2b3033] text-sm"
                  />
                </div>
                <div>
                  <input
                    required
                    type="email"
                    placeholder="Work Email (e.g. name@company.com)"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#2b3033]/20 focus:border-[#15BCDF] focus:outline-none text-[#2b3033] text-sm"
                  />
                </div>
                <div>
                  <textarea
                    rows={2}
                    placeholder="Any specific frameworks, timeline goals (e.g. Q3 launch), or notes..."
                    value={contactInfo.notes}
                    onChange={(e) => setContactInfo({ ...contactInfo, notes: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#2b3033]/20 focus:border-[#15BCDF] focus:outline-none text-[#2b3033] text-sm resize-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="py-3 px-5 text-[#2b3033] hover:text-black font-bold uppercase tracking-widest text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    type="submit"
                    className="py-3 px-6 bg-[#15BCDF] hover:bg-[#3fd0ef] text-[#1a1c1e] font-bold uppercase tracking-widest text-xs flex items-center gap-2 chamfer-cta border border-[#0fa3c2] cursor-pointer shadow-[0_0_0_1px_rgba(21,188,223,0.35),0_10px_30px_-12px_rgba(15,163,194,0.6)]"
                  >
                    <span>Submit & Request Architecture Review</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
