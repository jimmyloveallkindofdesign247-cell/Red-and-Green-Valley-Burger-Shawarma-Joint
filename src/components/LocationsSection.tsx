import React from 'react';
import { Clock, Globe2, MapPin, Phone, Truck } from 'lucide-react';
import {
  DELIVERY_ZONES,
  DISPLAY_PHONE,
  EXPANSION_ROADMAP,
} from '../data/restaurantData';
import type { DeliveryZone } from '../types';
import { formatNaira } from '../utils/cartLogic';

interface LocationsSectionProps {
  selectedZone: DeliveryZone;
  onSelectZone: (zone: DeliveryZone) => void;
}

export const LocationsSection: React.FC<LocationsSectionProps> = ({
  selectedZone,
  onSelectZone,
}) => {
  return (
    <section id="locations" className="py-16 sm:py-20 bg-[#0D0D0D] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F1C40F] mb-2">
            Locations &amp; Delivery Coverage
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-[#F5F5DC] text-balance">
            Born in Port Harcourt. Built for Multinational Tables.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Port Harcourt Flagship Hub & Interactive Zone Checker */}
          <div className="lg:col-span-7 bg-[#161616] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-white/10">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#34A853]">
                    Flagship Kitchen Active
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-[#F5F5DC] mt-1">
                    Port Harcourt, Rivers State
                  </h3>
                </div>
                <span className="text-xs font-medium text-[#F1C40F] uppercase tracking-wider">
                  Takeout &amp; Dispatch
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-5 border-b border-white/10 text-sm">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#D4212A] mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-[#F5F5DC]">Flagship Hub</p>
                    <p className="text-[#F5F5DC]/75">New GRA, Port Harcourt, Nigeria</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#F1C40F] mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-[#F5F5DC]">Daily Hours</p>
                    <p className="text-[#F5F5DC]/75">10:00 AM – 11:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-[#34A853] mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-[#F5F5DC]">Order Line</p>
                    <a
                      href="tel:+2348166882753"
                      className="text-[#F5F5DC]/75 hover:text-[#F1C40F] transition-colors tabular-nums"
                    >
                      {DISPLAY_PHONE}
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-sm font-semibold text-[#F5F5DC] mb-3">
                  Check Port Harcourt Delivery Zone (Applies to Your Cart):
                </p>
                <div
                  className="flex flex-wrap gap-2"
                  role="radiogroup"
                  aria-label="Port Harcourt delivery zones"
                >
                  {DELIVERY_ZONES.map((zone) => {
                    const active = selectedZone.id === zone.id;
                    return (
                      <button
                        key={zone.id}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        onClick={() => onSelectZone(zone)}
                        className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium border transition-colors whitespace-nowrap shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F1C40F] ${
                          active
                            ? 'bg-[#34A853] border-[#34A853] text-[#0D0D0D] font-semibold'
                            : 'bg-[#0D0D0D] border-white/15 text-[#F5F5DC]/85 hover:border-[#F1C40F]/70'
                        }`}
                      >
                        {zone.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div
              className="mt-6 p-4 rounded-xl bg-[#0D0D0D] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              data-testid="selected-zone-summary"
            >
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-[#34A853] mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-[#F5F5DC]">
                    {selectedZone.name} · {selectedZone.eta}
                  </p>
                  <p className="text-xs text-[#F5F5DC]/70 mt-0.5">
                    {selectedZone.coverageNote}
                  </p>
                </div>
              </div>
              <div className="sm:text-right shrink-0">
                <span className="block text-[11px] uppercase tracking-wider text-[#F5F5DC]/60">
                  Dispatch Fee
                </span>
                <span className="font-display text-xl font-bold text-[#F1C40F] tabular-nums">
                  {formatNaira(selectedZone.feeNaira)}
                </span>
              </div>
            </div>
          </div>

          {/* Global Expansion Roadmap */}
          <div className="lg:col-span-5 bg-[#161616] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <Globe2 className="w-5 h-5 text-[#F1C40F]" aria-hidden="true" />
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#F1C40F]">
                  Global Expansion Roadmap
                </span>
              </div>
              <h3 className="font-display text-2xl font-bold uppercase text-[#F5F5DC]">
                From the Niger Delta to Major Capitals
              </h3>
              <p className="mt-2 text-sm text-[#F5F5DC]/75">
                Standardized flame-grill kitchens, halal-certified spice supply chains, and
                takeout-first footprints scaling internationally.
              </p>

              <ol className="mt-6 space-y-3">
                {EXPANSION_ROADMAP.map((branch, idx) => {
                  const isOpen = branch.status === 'Flagship Open';
                  return (
                    <li
                      key={branch.city}
                      className="flex items-center justify-between gap-4 p-3.5 rounded-xl bg-[#0D0D0D] border border-white/10"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-7 h-7 rounded-md font-display text-sm font-bold inline-flex items-center justify-center shrink-0 tabular-nums ${
                            isOpen
                              ? 'bg-[#34A853] text-[#0D0D0D]'
                              : 'bg-[#161616] text-[#F1C40F] border border-white/10'
                          }`}
                        >
                          0{idx + 1}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-[#F5F5DC]">
                            {branch.city}, {branch.country}
                          </p>
                          <p className="text-xs text-[#F5F5DC]/65">{branch.district}</p>
                        </div>
                      </div>
                      <span
                        className={`text-xs font-semibold whitespace-nowrap ${
                          isOpen ? 'text-[#34A853]' : 'text-[#F1C40F]'
                        }`}
                      >
                        {branch.status}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-4 text-xs text-[#F5F5DC]/75">
              <span>Multi-unit territorial rights open</span>
              <a
                href="#inquiry"
                className="font-semibold text-[#F1C40F] hover:underline whitespace-nowrap"
              >
                Partner With Us →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
