import React, { useState } from 'react';
import { Check, Plus, SlidersHorizontal } from 'lucide-react';
import { MENU_CATEGORIES, MENU_ITEMS } from '../data/restaurantData';
import type { MenuCategory, MenuItem } from '../types';
import { formatNaira } from '../utils/cartLogic';

interface MenuSectionProps {
  onQuickAdd: (item: MenuItem) => void;
  onCustomize: (item: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onQuickAdd,
  onCustomize,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('All');
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const visibleItems =
    selectedCategory === 'All'
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => item.category === selectedCategory);

  const handleQuickAdd = (item: MenuItem) => {
    onQuickAdd(item);
    setRecentlyAddedId(item.id);
    window.setTimeout(() => {
      setRecentlyAddedId((current) => (current === item.id ? null : current));
    }, 1200);
  };

  return (
    <section id="menu" className="py-16 sm:py-20 bg-[#0D0D0D] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F1C40F] mb-2">
              Signature Kitchen
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-[#F5F5DC] text-balance">
              Flame-Seared Burgers, Loaded Shawarma &amp; Fresh Sides
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Menu categories"
            className="flex flex-wrap items-center gap-2 bg-[#161616] p-1.5 rounded-xl border border-white/10"
          >
            {MENU_CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F1C40F] ${
                    active
                      ? 'bg-[#D4212A] text-[#F5F5DC]'
                      : 'text-[#F5F5DC]/75 hover:text-[#F5F5DC] hover:bg-white/5'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          data-testid="menu-grid"
        >
          {visibleItems.map((item) => {
            const justAdded = recentlyAddedId === item.id;
            return (
              <article
                key={item.id}
                className="flex flex-col justify-between bg-[#161616] border border-white/10 hover:border-[#D4212A]/75 rounded-xl p-6 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs text-[#F5F5DC]/65 mb-2">
                    <span>
                      {item.category} · {item.spiceLevel}
                    </span>
                    <span className="tabular-nums">~{item.prepMinutes} mins</span>
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-xl font-bold uppercase tracking-wide text-[#F5F5DC]">
                      {item.name}
                    </h3>
                    <span className="font-display text-xl font-bold text-[#F1C40F] tabular-nums shrink-0">
                      {formatNaira(item.priceNaira)}
                    </span>
                  </div>

                  <p className="mt-3 text-sm text-[#F5F5DC]/80 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleQuickAdd(item)}
                    aria-label={`Quick add ${item.name} to cart`}
                    className={`flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap min-h-[42px] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F1C40F] ${
                      justAdded
                        ? 'bg-[#34A853] text-[#0D0D0D]'
                        : 'bg-[#D4212A] hover:bg-[#b51b23] text-[#F5F5DC]'
                    }`}
                  >
                    {justAdded ? (
                      <>
                        <Check className="w-4 h-4" aria-hidden="true" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" aria-hidden="true" />
                        <span>Quick Add</span>
                      </>
                    )}
                  </button>

                  {item.customizable && (
                    <button
                      type="button"
                      onClick={() => onCustomize(item)}
                      aria-label={`Customize ${item.name}`}
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#0D0D0D] border border-white/15 hover:border-[#F1C40F] text-sm font-medium text-[#F5F5DC] transition-colors whitespace-nowrap shrink-0 min-h-[42px] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F1C40F]"
                    >
                      <SlidersHorizontal className="w-4 h-4 text-[#F1C40F]" aria-hidden="true" />
                      <span>Customize</span>
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
