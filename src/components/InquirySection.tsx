import React, { useState } from 'react';
import { Briefcase, CheckCircle2, PartyPopper } from 'lucide-react';
import type { InquiryFormData, InquiryType } from '../types';
import {
  validateInquiryForm,
  type InquiryValidationErrors,
} from '../utils/cartLogic';

const INITIAL_FORM = (type: InquiryType): InquiryFormData => ({
  type,
  fullName: '',
  email: '',
  phone: '',
  organizationOrCity: '',
  guestCountOrCapital: '',
  message: '',
});

export const InquirySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<InquiryType>('catering');
  const [formData, setFormData] = useState<InquiryFormData>(() => INITIAL_FORM('catering'));
  const [errors, setErrors] = useState<InquiryValidationErrors>({});
  const [submittedRecord, setSubmittedRecord] = useState<InquiryFormData | null>(null);

  const handleTabSwitch = (tab: InquiryType) => {
    setActiveTab(tab);
    setFormData(INITIAL_FORM(tab));
    setErrors({});
    setSubmittedRecord(null);
  };

  const handleChange = (field: keyof InquiryFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof InquiryValidationErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validateInquiryForm(formData);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    setErrors({});
    setSubmittedRecord(formData);
  };

  return (
    <section id="inquiry" className="py-16 sm:py-20 bg-[#161616] border-b border-white/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F1C40F] mb-2">
            Scale With Us
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-[#F5F5DC] text-balance">
            Event Catering &amp; Multinational Franchise Inquiries
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#F5F5DC]/75">
            Feeding a Port Harcourt corporate team of 500 or bringing Red &amp; Green Valley to
            Abuja, Lagos, London, or Houston? Send your brief directly to our leadership desk.
          </p>
        </div>

        <div className="bg-[#0D0D0D] border border-white/15 rounded-2xl p-6 sm:p-8">
          <div
            role="tablist"
            aria-label="Inquiry type"
            className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-1.5 rounded-xl bg-[#161616] border border-white/10 mb-8"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'catering'}
              onClick={() => handleTabSwitch('catering')}
              className={`inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F1C40F] ${
                activeTab === 'catering'
                  ? 'bg-[#D4212A] text-[#F5F5DC]'
                  : 'text-[#F5F5DC]/75 hover:text-[#F5F5DC]'
              }`}
            >
              <PartyPopper className="w-4 h-4" aria-hidden="true" />
              <span>Event &amp; Corporate Catering</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'franchise'}
              onClick={() => handleTabSwitch('franchise')}
              className={`inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F1C40F] ${
                activeTab === 'franchise'
                  ? 'bg-[#34A853] text-[#0D0D0D]'
                  : 'text-[#F5F5DC]/75 hover:text-[#F5F5DC]'
              }`}
            >
              <Briefcase className="w-4 h-4" aria-hidden="true" />
              <span>Franchise &amp; Global Partnership</span>
            </button>
          </div>

          {submittedRecord ? (
            <div
              className="p-6 sm:p-8 rounded-xl bg-[#161616] border border-[#34A853]/60 text-center"
              data-testid="inquiry-confirmation"
            >
              <CheckCircle2
                className="w-12 h-12 text-[#34A853] mx-auto mb-3"
                aria-hidden="true"
              />
              <h3 className="font-display text-2xl font-bold uppercase text-[#F5F5DC]">
                {submittedRecord.type === 'catering'
                  ? 'Catering Request Received'
                  : 'Franchise Inquiry Logged'}
              </h3>
              <p className="mt-2 text-sm text-[#F5F5DC]/80 max-w-lg mx-auto">
                Thank you, <strong className="text-[#F1C40F]">{submittedRecord.fullName}</strong>.
                Our Port Harcourt desk has received your{' '}
                {submittedRecord.type === 'catering' ? 'event catering' : 'franchise partnership'}{' '}
                brief for{' '}
                <span className="text-[#F5F5DC] font-medium">
                  {submittedRecord.organizationOrCity}
                </span>{' '}
                and will respond to {submittedRecord.email} within 24 hours.
              </p>
              <button
                type="button"
                onClick={() => handleTabSwitch(activeTab)}
                className="mt-6 inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[#D4212A] hover:bg-[#b51b23] text-sm font-semibold text-[#F5F5DC] transition-colors cursor-pointer"
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="inquiry-name"
                    className="block text-sm font-medium text-[#F5F5DC] mb-1.5"
                  >
                    Full Name
                  </label>
                  <input
                    id="inquiry-name"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    placeholder="e.g. Daminabo Briggs"
                    aria-invalid={Boolean(errors.fullName)}
                    className="w-full px-4 py-2.5 rounded-lg bg-[#161616] border border-white/15 text-sm text-[#F5F5DC] placeholder:text-[#F5F5DC]/40 focus:outline-none focus:border-[#F1C40F]"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-xs text-[#D4212A]" role="alert">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="inquiry-email"
                    className="block text-sm font-medium text-[#F5F5DC] mb-1.5"
                  >
                    Email Address
                  </label>
                  <input
                    id="inquiry-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="you@company.com"
                    aria-invalid={Boolean(errors.email)}
                    className="w-full px-4 py-2.5 rounded-lg bg-[#161616] border border-white/15 text-sm text-[#F5F5DC] placeholder:text-[#F5F5DC]/40 focus:outline-none focus:border-[#F1C40F]"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-[#D4212A]" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="inquiry-phone"
                    className="block text-sm font-medium text-[#F5F5DC] mb-1.5"
                  >
                    Phone / WhatsApp Number
                  </label>
                  <input
                    id="inquiry-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="+234 816 688 2753"
                    aria-invalid={Boolean(errors.phone)}
                    className="w-full px-4 py-2.5 rounded-lg bg-[#161616] border border-white/15 text-sm text-[#F5F5DC] placeholder:text-[#F5F5DC]/40 focus:outline-none focus:border-[#F1C40F]"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-[#D4212A]" role="alert">
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="inquiry-org-city"
                    className="block text-sm font-medium text-[#F5F5DC] mb-1.5"
                  >
                    {activeTab === 'catering'
                      ? 'Company / Event Venue'
                      : 'Target City & Country'}
                  </label>
                  <input
                    id="inquiry-org-city"
                    type="text"
                    value={formData.organizationOrCity}
                    onChange={(e) => handleChange('organizationOrCity', e.target.value)}
                    placeholder={
                      activeTab === 'catering'
                        ? 'e.g. Shell Industrial Estate / Wedding'
                        : 'e.g. Abuja, Nigeria or London, UK'
                    }
                    aria-invalid={Boolean(errors.organizationOrCity)}
                    className="w-full px-4 py-2.5 rounded-lg bg-[#161616] border border-white/15 text-sm text-[#F5F5DC] placeholder:text-[#F5F5DC]/40 focus:outline-none focus:border-[#F1C40F]"
                  />
                  {errors.organizationOrCity && (
                    <p className="mt-1 text-xs text-[#D4212A]" role="alert">
                      {errors.organizationOrCity}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="inquiry-scale"
                  className="block text-sm font-medium text-[#F5F5DC] mb-1.5"
                >
                  {activeTab === 'catering'
                    ? 'Estimated Guest Count'
                    : 'Planned Franchise Investment Tier'}
                </label>
                <select
                  id="inquiry-scale"
                  value={formData.guestCountOrCapital}
                  onChange={(e) => handleChange('guestCountOrCapital', e.target.value)}
                  aria-invalid={Boolean(errors.guestCountOrCapital)}
                  className="w-full px-4 py-2.5 rounded-lg bg-[#161616] border border-white/15 text-sm text-[#F5F5DC] focus:outline-none focus:border-[#F1C40F]"
                >
                  <option value="">
                    {activeTab === 'catering'
                      ? 'Select guest count range'
                      : 'Select capital readiness'}
                  </option>
                  {activeTab === 'catering' ? (
                    <>
                      <option value="20–50 Guests">20–50 Guests (Team Lunch / Party)</option>
                      <option value="51–150 Guests">51–150 Guests (Corporate / Celebration)</option>
                      <option value="150+ Guests">150+ Guests (Festival / Conference)</option>
                    </>
                  ) : (
                    <>
                      <option value="Single Express Kiosk ($75k–$120k)">
                        Single Express Kiosk ($75k–$120k)
                      </option>
                      <option value="Flagship Dine-In & Takeout ($150k–$300k)">
                        Flagship Dine-In &amp; Takeout ($150k–$300k)
                      </option>
                      <option value="Regional Multi-Unit Territory ($400k+)">
                        Regional Multi-Unit Territory ($400k+)
                      </option>
                    </>
                  )}
                </select>
                {errors.guestCountOrCapital && (
                  <p className="mt-1 text-xs text-[#D4212A]" role="alert">
                    {errors.guestCountOrCapital}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="inquiry-message"
                  className="block text-sm font-medium text-[#F5F5DC] mb-1.5"
                >
                  {activeTab === 'catering'
                    ? 'Menu Preferences & Event Date'
                    : 'Hospitality Background & Site Details'}
                </label>
                <textarea
                  id="inquiry-message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  placeholder={
                    activeTab === 'catering'
                      ? 'Tell us your preferred burger/shawarma boxes, fruit salad cups, and delivery date...'
                      : 'Share your target district, hospitality experience, and timeline...'
                  }
                  aria-invalid={Boolean(errors.message)}
                  className="w-full px-4 py-2.5 rounded-lg bg-[#161616] border border-white/15 text-sm text-[#F5F5DC] placeholder:text-[#F5F5DC]/40 focus:outline-none focus:border-[#F1C40F]"
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-[#D4212A]" role="alert">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-lg bg-[#D4212A] hover:bg-[#b51b23] text-sm sm:text-base font-semibold text-[#F5F5DC] transition-colors min-h-[44px] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F1C40F]"
              >
                {activeTab === 'catering'
                  ? 'Request Catering Quote'
                  : 'Submit Franchise Application'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
