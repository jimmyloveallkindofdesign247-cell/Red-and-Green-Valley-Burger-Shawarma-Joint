import React, { useEffect, useState } from 'react';
import { Minus, Plus, X } from 'lucide-react';
import {
  PROTEIN_OPTIONS,
  SAUCE_OPTIONS,
  TOPPING_OPTIONS,
} from '../data/restaurantData';
import type { CustomizationOption, MenuItem } from '../types';
import { calculateCustomizedUnitPrice, formatNaira } from '../utils/cartLogic';

interface MealBuilderModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddCustomized: (payload: {
    item: MenuItem;
    protein: CustomizationOption;
    toppings: CustomizationOption[];
    sauce: CustomizationOption;
    quantity: number;
  }) => void;
}

export const MealBuilderModal: React.FC<MealBuilderModalProps> = ({
  item,
  onClose,
  onAddCustomized,
}) => {
  const [selectedProtein, setSelectedProtein] = useState<CustomizationOption>(
    PROTEIN_OPTIONS[0]
  );
  const [selectedToppings, setSelectedToppings] = useState<CustomizationOption[]>([]);
  const [selectedSauce, setSelectedSauce] = useState<CustomizationOption>(
    SAUCE_OPTIONS[0]
  );
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!item) return;
    const isChickenDefault = item.name.toLowerCase().includes('chicken');
    setSelectedProtein(isChickenDefault ? PROTEIN_OPTIONS[1] : PROTEIN_OPTIONS[0]);
    setSelectedToppings([]);
    setSelectedSauce(SAUCE_OPTIONS[0]);
    setQuantity(1);
  }, [item]);

  useEffect(() => {
    if (!item) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [item, onClose]);

  if (!item) return null;

  const toggleTopping = (topping: CustomizationOption) => {
    setSelectedToppings((prev) =>
      prev.some((t) => t.id === topping.id)
        ? prev.filter((t) => t.id !== topping.id)
        : [...prev, topping]
    );
  };

  const unitPrice = calculateCustomizedUnitPrice(
    item.priceNaira,
    selectedProtein,
    selectedToppings,
    selectedSauce
  );
  const totalPrice = unitPrice * quantity;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddCustomized({
      item,
      protein: selectedProtein,
      toppings: selectedToppings,
      sauce: selectedSauce,
      quantity,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      role="presentation"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="meal-builder-title"
        className="w-full max-w-xl max-h-[90vh] overflow-y-auto bg-[#161616] border border-white/15 rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 p-5 bg-[#161616] border-b border-white/10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#F1C40F]">
              Interactive Meal Builder
            </p>
            <h3
              id="meal-builder-title"
              className="font-display text-2xl font-bold uppercase tracking-wide text-[#F5F5DC] mt-1"
            >
              {item.name}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close meal customizer"
            className="w-10 h-10 inline-flex items-center justify-center rounded-lg bg-[#0D0D0D] border border-white/15 text-[#F5F5DC] hover:border-[#D4212A] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F1C40F]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-6">
          {/* Protein selection */}
          <fieldset>
            <legend className="text-sm font-semibold uppercase tracking-wider text-[#F5F5DC] mb-3">
              1. Choose Your Protein
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {PROTEIN_OPTIONS.map((option) => {
                const checked = selectedProtein.id === option.id;
                return (
                  <label
                    key={option.id}
                    className={`flex items-center justify-between gap-2 p-3 rounded-xl border cursor-pointer transition-colors ${
                      checked
                        ? 'bg-[#D4212A]/15 border-[#D4212A] text-[#F5F5DC]'
                        : 'bg-[#0D0D0D] border-white/10 text-[#F5F5DC]/80 hover:border-white/25'
                    }`}
                  >
                    <span className="flex items-center gap-2.5 text-sm font-medium">
                      <input
                        type="radio"
                        name="protein"
                        value={option.id}
                        checked={checked}
                        onChange={() => setSelectedProtein(option)}
                        className="accent-[#D4212A] shrink-0"
                      />
                      <span>{option.label}</span>
                    </span>
                    <span className="text-xs font-semibold text-[#F1C40F] tabular-nums whitespace-nowrap shrink-0">
                      {option.priceDelta > 0 ? `+${formatNaira(option.priceDelta)}` : 'Included'}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          {/* Toppings selection */}
          <fieldset>
            <legend className="text-sm font-semibold uppercase tracking-wider text-[#F5F5DC] mb-3">
              2. Extra Toppings (Optional)
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {TOPPING_OPTIONS.map((topping) => {
                const checked = selectedToppings.some((t) => t.id === topping.id);
                return (
                  <label
                    key={topping.id}
                    className={`flex items-center justify-between gap-2 p-3 rounded-xl border cursor-pointer transition-colors ${
                      checked
                        ? 'bg-[#34A853]/15 border-[#34A853] text-[#F5F5DC]'
                        : 'bg-[#0D0D0D] border-white/10 text-[#F5F5DC]/80 hover:border-white/25'
                    }`}
                  >
                    <span className="flex items-center gap-2.5 text-sm font-medium">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleTopping(topping)}
                        className="accent-[#34A853] shrink-0"
                      />
                      <span>{topping.label}</span>
                    </span>
                    <span className="text-xs font-semibold text-[#F1C40F] tabular-nums whitespace-nowrap shrink-0">
                      +{formatNaira(topping.priceDelta)}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          {/* Sauce selection */}
          <fieldset>
            <legend className="text-sm font-semibold uppercase tracking-wider text-[#F5F5DC] mb-3">
              3. Signature Sauce
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {SAUCE_OPTIONS.map((sauce) => {
                const checked = selectedSauce.id === sauce.id;
                return (
                  <label
                    key={sauce.id}
                    className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-colors ${
                      checked
                        ? 'bg-[#F1C40F]/15 border-[#F1C40F] text-[#F5F5DC]'
                        : 'bg-[#0D0D0D] border-white/10 text-[#F5F5DC]/80 hover:border-white/25'
                    }`}
                  >
                    <input
                      type="radio"
                      name="sauce"
                      value={sauce.id}
                      checked={checked}
                      onChange={() => setSelectedSauce(sauce)}
                      className="accent-[#F1C40F]"
                    />
                    <span className="text-sm font-medium">{sauce.label}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          {/* Footer quantity & add button */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-sm text-[#F5F5DC]/75">Quantity</span>
              <div className="inline-flex items-center bg-[#0D0D0D] border border-white/15 rounded-lg">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease meal quantity"
                  className="w-10 h-10 inline-flex items-center justify-center text-[#F5F5DC] hover:text-[#F1C40F] cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span
                  className="w-9 text-center font-semibold tabular-nums text-[#F5F5DC]"
                  data-testid="builder-quantity"
                >
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                  aria-label="Increase meal quantity"
                  className="w-10 h-10 inline-flex items-center justify-center text-[#F5F5DC] hover:text-[#F1C40F] cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#D4212A] hover:bg-[#b51b23] text-sm sm:text-base font-semibold text-[#F5F5DC] transition-colors whitespace-nowrap min-h-[44px] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F1C40F]"
            >
              <span>Add Custom Meal to Cart</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums text-[#F1C40F]" data-testid="builder-total-price">
                {formatNaira(totalPrice)}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
