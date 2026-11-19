import React, { useState } from 'react';
import { Check, Facebook, Instagram, MapPin, MessageCircle, Phone } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { FOOTER_PHONE, SOCIAL_HANDLE } from '../data/restaurantData';
import { buildWhatsAppUrl } from '../utils/cartLogic';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterError, setNewsletterError] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail.trim());
    if (!valid) {
      setNewsletterError('Enter a valid email address to join the grill list.');
      return;
    }
    setNewsletterError('');
    setSubscribed(true);
    setNewsletterEmail('');
  };

  const floatingWhatsAppUrl = buildWhatsAppUrl(
    'Hello Red & Green Valley! I would like to place a quick order or ask about delivery in Port Harcourt.'
  );

  return (
    <>
      <footer className="bg-[#0D0D0D] text-[#F5F5DC]">
        {/* Signature Red-to-Gold Accent Bar */}
        <div className="valley-gradient text-[#0D0D0D]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-center sm:justify-between gap-4 text-xs sm:text-sm font-bold uppercase tracking-wider">
            <span className="font-display text-base sm:text-lg tracking-wider text-[#F5F5DC]">
              BURGER AND SHAWARMA JOINT
            </span>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[#F5F5DC] sm:text-[#0D0D0D]">
              <a
                href="tel:+2348166882753"
                className="inline-flex items-center gap-1.5 hover:underline tabular-nums"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                <span>{FOOTER_PHONE}</span>
              </a>
              <span className="inline-flex items-center gap-1.5">
                <Instagram className="w-4 h-4" aria-hidden="true" />
                <Facebook className="w-4 h-4" aria-hidden="true" />
                <span>{SOCIAL_HANDLE}</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-4 h-4" aria-hidden="true" />
                <span>PORT HARCOURT, NIGERIA</span>
              </span>
            </div>
          </div>
        </div>

        {/* Main Dark Footer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4 flex flex-col items-start">
            <BrandLogo variant="full" />
            <p className="mt-4 text-sm text-[#F5F5DC]/70 leading-relaxed max-w-xs">
              Flame-seared burgers, slow-roasted shawarma spits, and fresh-cut fruit salads
              crafted daily in Port Harcourt for dine-in, takeout, and fast local delivery.
            </p>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-[#F1C40F] mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm text-[#F5F5DC]/80">
              <li>
                <a href="#menu" className="hover:text-[#F1C40F] transition-colors">
                  Signature Menu
                </a>
              </li>
              <li>
                <a href="#deals" className="hover:text-[#F1C40F] transition-colors">
                  Valley Deals
                </a>
              </li>
              <li>
                <a href="#locations" className="hover:text-[#F1C40F] transition-colors">
                  Delivery Zones
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-[#F1C40F] transition-colors">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#inquiry" className="hover:text-[#F1C40F] transition-colors">
                  Franchise &amp; Catering
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-[#F1C40F] mb-4">
              Opening Hours
            </h3>
            <ul className="space-y-2 text-sm text-[#F5F5DC]/80">
              <li className="flex justify-between gap-4">
                <span>Monday – Thursday</span>
                <span className="tabular-nums text-[#F5F5DC]">10:00 AM – 10:30 PM</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Friday – Saturday</span>
                <span className="tabular-nums text-[#F5F5DC]">10:00 AM – 11:30 PM</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Sunday</span>
                <span className="tabular-nums text-[#F5F5DC]">12:00 PM – 11:00 PM</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-[#F1C40F] mb-4">
              Grill Drops &amp; New Branches
            </h3>
            <p className="text-xs text-[#F5F5DC]/70 mb-3">
              Get Port Harcourt weekend combo alerts and Abuja/Lagos launch invitations.
            </p>
            {subscribed ? (
              <div className="p-3 rounded-lg bg-[#161616] border border-[#34A853]/60 flex items-center gap-2 text-xs text-[#34A853]">
                <Check className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>You&apos;re on the Valley VIP list.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} noValidate className="space-y-2">
                <div className="flex gap-2">
                  <label htmlFor="footer-newsletter" className="sr-only">
                    Newsletter email address
                  </label>
                  <input
                    id="footer-newsletter"
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="flex-1 min-w-0 px-3 py-2 rounded-lg bg-[#161616] border border-white/15 text-sm text-[#F5F5DC] placeholder:text-[#F5F5DC]/40 focus:outline-none focus:border-[#F1C40F]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-[#D4212A] hover:bg-[#b51b23] text-sm font-semibold text-[#F5F5DC] shrink-0 cursor-pointer"
                  >
                    Join
                  </button>
                </div>
                {newsletterError && (
                  <p className="text-xs text-[#D4212A]" role="alert">
                    {newsletterError}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>

        <div className="border-t border-white/10 py-5 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#F5F5DC]/55">
            <p>
              &copy; {new Date().getFullYear()} Red &amp; Green Valley Burger &amp; Shawarma Joint.
              All rights reserved.
            </p>
            <p>Crafted in Port Harcourt, Rivers State, Nigeria.</p>
          </div>
        </div>
      </footer>

      {/* Persistent Bottom-Right Floating Brand Green WhatsApp Quick-Order Button */}
      <a
        href={floatingWhatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Order immediately via WhatsApp"
        className="fixed bottom-5 right-5 z-30 inline-flex items-center gap-2 px-4 py-3 rounded-full bg-[#34A853] hover:bg-[#2b8d45] text-[#0D0D0D] font-bold text-sm shadow-xl shadow-black/50 transition-transform hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F1C40F]"
      >
        <MessageCircle className="w-5 h-5" aria-hidden="true" />
        <span className="hidden sm:inline">WhatsApp Order</span>
      </a>
    </>
  );
};
