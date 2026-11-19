import React from 'react';
import { ArrowDownRight, MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl } from '../utils/cartLogic';
import { DISPLAY_PHONE } from '../data/restaurantData';

export const Hero: React.FC = () => {
  const quickWhatsAppUrl = buildWhatsAppUrl(
    'Hello Red & Green Valley! I would like to place an express takeout or delivery order in Port Harcourt.'
  );

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-[#0D0D0D] border-b border-white/10"
    >
      {/* Full-bleed atmospheric takeout showcase background */}
      <div className="absolute inset-0">
        <img
          src="/assets/aistudio/Red_and_Green_Valley_Hero_Section_Background_33c2b6fe.png"
          alt="Flame-grilled double cheeseburger in craft takeout box, loaded chicken shawarma wraps, mixed fruit salad cup, and iced soft drink on a rustic wooden counter"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-[62%_center] lg:object-center opacity-85"
        />
        {/* Measured scrim: dark left panel for 4.5:1+ headline legibility, opening onto the burger & shawarma spread */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D] via-[#0D0D0D]/90 lg:via-[#0D0D0D]/72 to-[#0D0D0D]/30"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-[#0D0D0D]/55"
          aria-hidden="true"
        />
      </div>

      {/* Subtle ambient embers & herbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <span className="animate-ember absolute top-16 right-[18%] w-2 h-2 rounded-full bg-[#F1C40F]/60 blur-[1px]" />
        <span className="animate-ember-slow absolute bottom-28 right-[36%] w-1.5 h-1.5 rounded-full bg-[#D4212A]/75" />
        <span className="animate-ember absolute top-1/3 right-[8%] w-2.5 h-1.5 rounded-full bg-[#34A853]/50 rotate-45" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">
        <div className="max-w-2xl">
          <p className="text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-[#F1C40F] mb-4">
            New GRA, Port Harcourt · Daily 10:00 AM – 11:00 PM
          </p>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-[1.03] text-[#F5F5DC] text-balance">
            Flame-Grilled Burgers &amp; Loaded Shawarma —{' '}
            <span className="text-[#F1C40F]">
              Crafted in Port Harcourt, Built for the World.
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-[#F5F5DC]/85 leading-relaxed max-w-xl">
            Charred prime beef patties, slow-roasted shawarma spits spiced with West African heat,
            daily hand-cut fruit salads, and ice-cold coolers—boxed hot for takeout and rapid
            delivery across Rivers State.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#menu"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#D4212A] hover:bg-[#b51b23] text-base font-semibold text-[#F5F5DC] transition-colors whitespace-nowrap shrink-0 min-h-[44px] shadow-lg shadow-[#D4212A]/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F1C40F]"
            >
              <span>Explore Signature Menu</span>
              <ArrowDownRight className="w-4 h-4" aria-hidden="true" />
            </a>

            <a
              href={quickWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#34A853] hover:bg-[#2b8d45] text-base font-semibold text-[#0D0D0D] transition-colors whitespace-nowrap shrink-0 min-h-[44px] shadow-lg shadow-[#34A853]/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F1C40F]"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              <span>Instant WhatsApp Order</span>
            </a>
          </div>

          <div className="mt-8 pt-6 border-t border-white/15 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-x-3 gap-y-1.5 text-xs sm:text-sm text-[#F5F5DC]/80">
            <span className="whitespace-nowrap">25–45 Min Port Harcourt Delivery</span>
            <span className="hidden sm:inline text-[#F5F5DC]/40" aria-hidden="true">
              ·
            </span>
            <span className="whitespace-nowrap">Hotline: {DISPLAY_PHONE}</span>
            <span className="hidden sm:inline text-[#F5F5DC]/40" aria-hidden="true">
              ·
            </span>
            <span className="whitespace-nowrap">Takeout &amp; Event Catering</span>
          </div>
        </div>
      </div>
    </section>
  );
};
