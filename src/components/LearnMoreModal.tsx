import React, { useState, useEffect } from 'react';
import { X, Check, Shield, Zap, Layers, Server, ArrowRight } from 'lucide-react';

interface LearnMoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenGetStarted: () => void;
}

export const LearnMoreModal: React.FC<LearnMoreModalProps> = ({
  isOpen,
  onClose,
  onOpenGetStarted,
}) => {
  const [activeTab, setActiveTab] = useState<'systems' | 'websites' | 'testing'>('systems');

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

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="learn-more-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#F7F6F8] border border-[#0fa3c2]/40 shadow-2xl p-6 sm:p-10 max-h-[92vh] overflow-y-auto chamfer-cta"
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
            SYSTEM ARCHITECTURE & CAPABILITIES
          </span>
          <h2 id="learn-more-title" className="text-3xl sm:text-4xl font-bold tracking-tight text-[#2b3033] uppercase">
            ENGINEERING AT <span className="text-[#15BCDF]">BRYTECH</span>
          </h2>
          <p className="text-[#6b6f72] text-sm sm:text-base mt-2 max-w-2xl">
            We architect and deploy custom digital operating systems and high-throughput websites that empower companies to outpace competitors globally.
          </p>
        </div>

        {/* Quick Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-y border-[#2b3033]/15 mb-8">
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-[#15BCDF]">340+</div>
            <div className="text-xs uppercase tracking-wider text-[#6b6f72]">Platforms Shipped</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-[#2b3033]">99.99%</div>
            <div className="text-xs uppercase tracking-wider text-[#6b6f72]">Production Uptime</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-[#15BCDF]">48</div>
            <div className="text-xs uppercase tracking-wider text-[#6b6f72]">Countries Deployed</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-[#2b3033]">0</div>
            <div className="text-xs uppercase tracking-wider text-[#6b6f72]">Unplanned Surprises</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-[#2b3033]/15 pb-2 mb-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('systems')}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-bold transition-all cursor-pointer ${
              activeTab === 'systems'
                ? 'bg-[#2b3033] text-[#15BCDF]'
                : 'text-[#6b6f72] hover:text-[#2b3033]'
            }`}
          >
            Custom Full Systems
          </button>
          <button
            onClick={() => setActiveTab('websites')}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-bold transition-all cursor-pointer ${
              activeTab === 'websites'
                ? 'bg-[#2b3033] text-[#15BCDF]'
                : 'text-[#6b6f72] hover:text-[#2b3033]'
            }`}
          >
            Global High-Scale Websites
          </button>
          <button
            onClick={() => setActiveTab('testing')}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-bold transition-all cursor-pointer ${
              activeTab === 'testing'
                ? 'bg-[#2b3033] text-[#15BCDF]'
                : 'text-[#6b6f72] hover:text-[#2b3033]'
            }`}
          >
            Testing & QA Infrastructure
          </button>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'systems' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <h3 className="text-xl font-bold uppercase text-[#2b3033] flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#15BCDF]" />
                Full-Scale Business Infrastructure & ERP
              </h3>
              <p className="text-sm text-[#6b6f72] leading-relaxed">
                Off-the-shelf software bottlenecks hyper-growth companies. BryTech designs bespoke business platforms tailored to your exact workflows, unifying CRM, dispatch, billing, employee roles, and analytical intelligence.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="p-4 bg-white border border-[#2b3033]/10">
                  <h4 className="text-sm font-bold uppercase text-[#2b3033] mb-1.5 flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#15BCDF]" /> Multi-Tenant Role Isolation
                  </h4>
                  <p className="text-xs text-[#6b6f72]">
                    Granular RBAC with audit logs, multi-factor authorization, and zero-trust tenant separation.
                  </p>
                </div>
                <div className="p-4 bg-white border border-[#2b3033]/10">
                  <h4 className="text-sm font-bold uppercase text-[#2b3033] mb-1.5 flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#15BCDF]" /> Automated Operations & Workflows
                  </h4>
                  <p className="text-xs text-[#6b6f72]">
                    Event-driven async workers handling millions of tasks, invoices, notifications, and webhooks per day.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'websites' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <h3 className="text-xl font-bold uppercase text-[#2b3033] flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#15BCDF]" />
                Edge-Rendered Global Web Platforms
              </h3>
              <p className="text-sm text-[#6b6f72] leading-relaxed">
                When milliseconds dictate conversion rates, BryTech deploys websites powered by distributed Edge networks. Sub-100ms first-contentful-paint across North America, Europe, Asia, and Latin America.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="p-4 bg-white border border-[#2b3033]/10">
                  <h4 className="text-sm font-bold uppercase text-[#2b3033] mb-1.5 flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#15BCDF]" /> Flawless Lighthouse Scores
                  </h4>
                  <p className="text-xs text-[#6b6f72]">
                    100/100 performance, accessibility, SEO, and best practices. Instant hydration with minimal bundle footprint.
                  </p>
                </div>
                <div className="p-4 bg-white border border-[#2b3033]/10">
                  <h4 className="text-sm font-bold uppercase text-[#2b3033] mb-1.5 flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#15BCDF]" /> Global Localization & Dynamic CMS
                  </h4>
                  <p className="text-xs text-[#6b6f72]">
                    Geo-targeted currency, language routing, and intuitive content administration for global marketing squads.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'testing' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <h3 className="text-xl font-bold uppercase text-[#2b3033] flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#15BCDF]" />
                Automated Pipelines & Auditing
              </h3>
              <p className="text-sm text-[#6b6f72] leading-relaxed">
                No deployment goes live without rigorous automated verification. BryTech establishes CI/CD pipelines with comprehensive unit, integration, visual regression, and penetration audits.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="p-4 bg-white border border-[#2b3033]/10">
                  <h4 className="text-sm font-bold uppercase text-[#2b3033] mb-1.5 flex items-center gap-2">
                    <Server className="w-4 h-4 text-[#15BCDF]" /> Stress & Concurrency Testing
                  </h4>
                  <p className="text-xs text-[#6b6f72]">
                    Simulating 50,000+ simultaneous transactions prior to release to guarantee zero degradation under viral load.
                  </p>
                </div>
                <div className="p-4 bg-white border border-[#2b3033]/10">
                  <h4 className="text-sm font-bold uppercase text-[#2b3033] mb-1.5 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#15BCDF]" /> Zero-Downtime Blue/Green Rollouts
                  </h4>
                  <p className="text-xs text-[#6b6f72]">
                    Continuous canary deployments with instant automated rollback if any health anomaly occurs.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="mt-8 pt-6 border-t border-[#2b3033]/15 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#6b6f72]">
            Ready to explore a custom build for your business?
          </p>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onOpenGetStarted();
              }}
              className="w-full sm:w-auto py-3 px-6 bg-[#15BCDF] hover:bg-[#3fd0ef] text-[#1a1c1e] font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 chamfer-cta border border-[#0fa3c2] cursor-pointer transition-all shadow-[0_0_0_1px_rgba(21,188,223,0.35),0_10px_30px_-12px_rgba(15,163,194,0.6)]"
            >
              <span>Build With BryTech</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
