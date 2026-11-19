import React, { useEffect, useState } from 'react';
import { Check, Clock, Flame, ShoppingBag } from 'lucide-react';
import { COMBO_DEALS } from '../data/restaurantData';
import type { ComboDeal } from '../types';
import { formatNaira, getCountdownParts } from '../utils/cartLogic';

interface ValleyDealsSectionProps {
  onAddCombo: (deal: ComboDeal) => void;
}

export const ValleyDealsSection: React.FC<ValleyDealsSectionProps> = ({
  onAddCombo,
}) => {
  const [targetTimestamp] = useState(() => Date.now() + (4 * 3600 + 38 * 60 + 19) * 1000);
  const [nowTimestamp, setNowTimestamp] = useState(() => Date.now());
  const [addedDealId, setAddedDealId] = useState<string | null>(null);

  useEffect(() => {
    const id = window.setInterval(() => {
      setNowTimestamp(Date.now());
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  const countdown = getCountdownParts(targetTimestamp, nowTimestamp);

  const handleAdd = (deal: ComboDeal) => {
    onAddCombo(deal);
    setAddedDealId(deal.id);
    window.setTimeout(() => {
      setAddedDealId((current) => (current === deal.id ? null : current));
    }, 1200);
  };

  return (
    <section id="deals" className="bg-[#161616] border-b border-white/10">
      {/* Signature Red-to-Gold accent strip */}
      <div className="valley-gradient h-1.5 w-full" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F1C40F] mb-2">
              Valley Deals &amp; Combo Spotlight
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-[#F5F5DC] text-balance">
              Daily Grill Combos Crafted for Sharing or Solo Feasts
            </h2>
          </div>

          <div
            className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#0D0D0D] border border-[#F1C40F]/40 shrink-0"
            aria-label="Daily combo special countdown timer"
          >
            <Clock className="w-4 h-4 text-[#F1C40F]" aria-hidden="true" />
            <span className="text-xs uppercase tracking-wider text-[#F5F5DC]/75">
              Daily Specials Window
            </span>
            <span className="font-display text-lg font-bold text-[#F1C40F] tabular-nums">
              {countdown.hours}:{countdown.minutes}:{countdown.seconds}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {COMBO_DEALS.map((deal, idx) => {
            const isHeroCombo = idx === 0;
            const justAdded = addedDealId === deal.id;
            return (
              <article
                key={deal.id}
                className={`flex flex-col justify-between rounded-xl p-6 bg-[#0D0D0D] border transition-colors ${
                  isHeroCombo
                    ? 'border-[#F1C40F]/70'
                    : 'border-white/10 hover:border-[#D4212A]/70'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs font-semibold uppercase tracking-wider mb-3">
                    <span className="text-[#F1C40F] inline-flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-[#D4212A]" aria-hidden="true" />
                      {deal.badgeText}
                    </span>
                    <span className="text-[#F5F5DC]/60">{deal.servings}</span>
                  </div>

                  <h3 className="font-display text-2xl font-bold uppercase tracking-wide text-[#F5F5DC]">
                    {deal.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#F5F5DC]/75">{deal.subtitle}</p>

                  <ul className="mt-5 space-y-2 border-t border-white/10 pt-4">
                    {deal.includes.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-[#F5F5DC]/90"
                      >
                        <span
                          className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#34A853] shrink-0"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between gap-4">
                  <div>
                    <span className="block text-xs text-[#F5F5DC]/50 line-through tabular-nums">
                      {formatNaira(deal.originalPrice)}
                    </span>
                    <span className="font-display text-2xl font-bold text-[#F1C40F] tabular-nums">
                      {formatNaira(deal.dealPrice)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAdd(deal)}
                    aria-label={`Add ${deal.title} combo to cart`}
                    className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap min-h-[42px] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F1C40F] ${
                      justAdded
                        ? 'bg-[#34A853] text-[#0D0D0D]'
                        : 'bg-[#D4212A] hover:bg-[#b51b23] text-[#F5F5DC]'
                    }`}
                  >
                    {justAdded ? (
                      <>
                        <Check className="w-4 h-4" aria-hidden="true" />
                        <span>Combo Added</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" aria-hidden="true" />
                        <span>Add Combo to Cart</span>
                      </>
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
