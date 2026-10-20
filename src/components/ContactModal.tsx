import React, { useState, useEffect } from 'react';
import { X, Send, Globe, Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: 'full-system',
    budget: '$50k - $150k',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `BRY-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketId(id);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      company: '',
      projectType: 'full-system',
      budget: '$50k - $150k',
      message: '',
    });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-[#F7F6F8] border border-[#0fa3c2]/40 shadow-2xl p-6 sm:p-10 max-h-[92vh] overflow-y-auto chamfer-cta"
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
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#15BCDF]/15 text-[#0fa3c2] text-xs uppercase tracking-widest font-bold mb-3 border border-[#0fa3c2]/30">
            <Globe className="w-3.5 h-3.5" />
            Global Engineering Dispatch
          </div>
          <h2 id="contact-modal-title" className="text-3xl sm:text-4xl font-bold tracking-tight text-[#2b3033] uppercase">
            CONNECT WITH <span className="text-[#15BCDF]">BRYTECH</span>
          </h2>
          <p className="text-[#6b6f72] text-sm sm:text-base mt-2">
            We partner with ambitious enterprises and startups worldwide to deliver ultra-fast websites and mission-critical systems.
          </p>
        </div>

        {submitted ? (
          <div className="py-12 text-center">
            <div className="w-16 h-16 bg-[#15BCDF]/20 border border-[#0fa3c2] text-[#0fa3c2] mx-auto flex items-center justify-center rounded-full mb-6">
              <CheckCircle2 className="w-8 h-8 text-[#15BCDF]" />
            </div>
            <h3 className="text-2xl font-bold uppercase text-[#2b3033] mb-2">Inquiry Dispatched</h3>
            <p className="text-[#6b6f72] text-sm max-w-md mx-auto mb-4">
              Your inquiry has been logged in our engineering queue under reference:
            </p>
            <div className="inline-block px-4 py-2 bg-[#2b3033] text-[#15BCDF] font-mono font-bold tracking-widest text-lg mb-6">
              {ticketId}
            </div>
            <p className="text-xs text-[#6b6f72] max-w-sm mx-auto mb-8">
              A BryTech Technical Solutions Architect will review your system requirements and reach out within 1 business day.
            </p>
            <button
              onClick={handleReset}
              className="px-8 py-3 bg-[#15BCDF] hover:bg-[#3fd0ef] text-[#1a1c1e] font-bold uppercase tracking-widest chamfer-cta border border-[#0fa3c2] transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* Form */}
            <form onSubmit={handleSubmit} className="md:col-span-3 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#2b3033] mb-1">
                  Your Name *
                </label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Morgan"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#2b3033]/20 focus:border-[#15BCDF] focus:outline-none text-[#2b3033] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#2b3033] mb-1">
                  Work Email *
                </label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@enterprise.com"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#2b3033]/20 focus:border-[#15BCDF] focus:outline-none text-[#2b3033] text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#2b3033] mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Company Ltd."
                    className="w-full px-3.5 py-2.5 bg-white border border-[#2b3033]/20 focus:border-[#15BCDF] focus:outline-none text-[#2b3033] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#2b3033] mb-1">
                    System Type
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#2b3033]/20 focus:border-[#15BCDF] focus:outline-none text-[#2b3033] text-sm"
                  >
                    <option value="full-system">Full Business System / ERP</option>
                    <option value="global-website">High-Performance Global Website</option>
                    <option value="cloud-platform">Cloud Platform & APIs</option>
                    <option value="qa-infrastructure">Testing & QA Infrastructure</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#2b3033] mb-1">
                  Estimated Scope / Budget
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#2b3033]/20 focus:border-[#15BCDF] focus:outline-none text-[#2b3033] text-sm"
                >
                  <option value="$25k - $50k">$25,000 - $50,000</option>
                  <option value="$50k - $150k">$50,000 - $150,000</option>
                  <option value="$150k - $500k">$150,000 - $500,000</option>
                  <option value="$500k+">$500,000+ (Multi-Region / Custom)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#2b3033] mb-1">
                  Project Brief & Requirements
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Outline your target features, expected load, deadlines or current bottlenecks..."
                  className="w-full px-3.5 py-2.5 bg-white border border-[#2b3033]/20 focus:border-[#15BCDF] focus:outline-none text-[#2b3033] text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 px-6 bg-[#15BCDF] hover:bg-[#3fd0ef] text-[#1a1c1e] font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2 chamfer-cta border border-[#0fa3c2] shadow-[0_0_0_1px_rgba(21,188,223,0.35),0_10px_30px_-12px_rgba(15,163,194,0.6)] cursor-pointer transition-all"
              >
                <span>Dispatch Inquiry</span>
                <Send className="w-4 h-4" />
              </button>
            </form>

            {/* Sidebar / Hubs */}
            <div className="md:col-span-2 border-t md:border-t-0 md:border-l border-[#2b3033]/15 pt-6 md:pt-0 md:pl-6 flex flex-col justify-between space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#2b3033] mb-3">
                  Direct Inquiries
                </h4>
                <div className="space-y-2 text-xs text-[#6b6f72]">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#15BCDF]" />
                    <span className="font-mono text-[#2b3033]">contact@brytech.global</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#15BCDF]" />
                    <span className="font-mono text-[#2b3033]">+1 (800) 279-8324</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#2b3033] mb-3">
                  Global Hubs
                </h4>
                <div className="space-y-2.5 text-xs text-[#6b6f72]">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#15BCDF] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-[#2b3033]">New York (Global HQ)</p>
                      <p>540 Madison Ave, Fl 18</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#15BCDF] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-[#2b3033]">London</p>
                      <p>25 Bank Street, Canary Wharf</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#15BCDF] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-[#2b3033]">Tel Aviv</p>
                      <p>132 Menachem Begin Rd</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#15BCDF] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-[#2b3033]">Tokyo</p>
                      <p>Shibuya Stream Tower 14F</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-[#2b3033] text-white chamfer-contact text-[11px] leading-relaxed">
                <span className="text-[#15BCDF] font-bold uppercase block mb-1">
                  Guaranteed SLA:
                </span>
                Every production website and system delivered comes with 99.99% availability guarantees and 24/7 dedicated tier-1 engineering support.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
