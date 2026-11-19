import React, { useEffect, useState } from 'react';
import { Check, Copy, MessageCircle, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { DELIVERY_ZONES } from '../data/restaurantData';
import type { CartItem, DeliveryZone } from '../types';
import {
  buildWhatsAppOrderMessage,
  buildWhatsAppUrl,
  computeCartTotals,
  formatNaira,
  getCartItemUnitPrice,
} from '../utils/cartLogic';

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  selectedZone: DeliveryZone;
  onSelectZone: (zone: DeliveryZone) => void;
  onClose: () => void;
  onUpdateQuantity: (cartKey: string, delta: number) => void;
  onRemoveItem: (cartKey: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  items,
  selectedZone,
  onSelectZone,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const totals = computeCartTotals(items, selectedZone);
  const whatsappMessage = buildWhatsAppOrderMessage(items, selectedZone, {
    name: customerName,
    address: streetAddress,
  });
  const whatsappUrl = buildWhatsAppUrl(whatsappMessage);

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(whatsappMessage);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm"
      role="presentation"
      onClick={onClose}
    >
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
        className="w-full max-w-md h-full bg-[#0D0D0D] border-l border-white/15 flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 px-5 py-4 bg-[#161616] border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#F1C40F]" aria-hidden="true" />
            <h2
              id="cart-drawer-title"
              className="font-display text-xl font-bold uppercase tracking-wide text-[#F5F5DC]"
            >
              Your Order ({totals.itemCount})
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close order cart"
            className="w-10 h-10 inline-flex items-center justify-center rounded-lg bg-[#0D0D0D] border border-white/15 text-[#F5F5DC] hover:border-[#D4212A] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="py-16 text-center">
              <ShoppingBag
                className="w-10 h-10 text-[#F5F5DC]/30 mx-auto mb-3"
                aria-hidden="true"
              />
              <p className="font-display text-xl uppercase text-[#F5F5DC]">
                Your Takeout Box Is Empty
              </p>
              <p className="mt-2 text-sm text-[#F5F5DC]/65">
                Add flame-grilled burgers, shawarma wraps, or a Valley Deal combo to start your
                WhatsApp order.
              </p>
              <a
                href="#menu"
                onClick={onClose}
                className="mt-5 inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[#D4212A] text-sm font-semibold text-[#F5F5DC]"
              >
                Browse Signature Menu
              </a>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between text-xs text-[#F5F5DC]/65">
                <span>Itemized Kitchen Ticket</span>
                <button
                  type="button"
                  onClick={onClearCart}
                  className="text-[#D4212A] hover:underline cursor-pointer"
                >
                  Clear all
                </button>
              </div>

              <ul className="space-y-3" data-testid="cart-items-list">
                {items.map((item) => {
                  const unitPrice = getCartItemUnitPrice(item);
                  const lineTotal = unitPrice * item.quantity;
                  return (
                    <li
                      key={item.cartKey}
                      className="p-4 rounded-xl bg-[#161616] border border-white/10"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-display text-base font-bold uppercase text-[#F5F5DC]">
                            {item.name}
                          </p>
                          {(item.protein || item.toppings.length > 0 || item.sauce) && (
                            <p className="mt-1 text-xs text-[#F5F5DC]/70 leading-relaxed">
                              {[
                                item.protein?.label,
                                ...item.toppings.map((t) => t.label),
                                item.sauce?.label,
                              ]
                                .filter(Boolean)
                                .join(' · ')}
                            </p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.cartKey)}
                          aria-label={`Remove ${item.name} from cart`}
                          className="p-1.5 rounded-md text-[#F5F5DC]/50 hover:text-[#D4212A] cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
                        <div className="inline-flex items-center bg-[#0D0D0D] border border-white/15 rounded-lg">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.cartKey, -1)}
                            aria-label={`Decrease quantity of ${item.name}`}
                            className="w-8 h-8 inline-flex items-center justify-center text-[#F5F5DC] hover:text-[#F1C40F] cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm font-semibold tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.cartKey, 1)}
                            aria-label={`Increase quantity of ${item.name}`}
                            className="w-8 h-8 inline-flex items-center justify-center text-[#F5F5DC] hover:text-[#F1C40F] cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <span className="font-display text-lg font-bold text-[#F1C40F] tabular-nums">
                          {formatNaira(lineTotal)}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="p-4 rounded-xl bg-[#161616] border border-white/10 space-y-3">
                <div>
                  <label
                    htmlFor="cart-delivery-zone"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#F5F5DC]/80 mb-1.5"
                  >
                    Port Harcourt Delivery Zone
                  </label>
                  <select
                    id="cart-delivery-zone"
                    value={selectedZone.id}
                    onChange={(e) => {
                      const next = DELIVERY_ZONES.find((z) => z.id === e.target.value);
                      if (next) onSelectZone(next);
                    }}
                    className="w-full px-3 py-2 rounded-lg bg-[#0D0D0D] border border-white/15 text-sm text-[#F5F5DC] focus:outline-none focus:border-[#F1C40F]"
                  >
                    {DELIVERY_ZONES.map((zone) => (
                      <option key={zone.id} value={zone.id}>
                        {zone.name} ({zone.eta}) — {formatNaira(zone.feeNaira)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  <div>
                    <label htmlFor="cart-customer-name" className="sr-only">
                      Your Name
                    </label>
                    <input
                      id="cart-customer-name"
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Your name (optional)"
                      className="w-full px-3 py-2 rounded-lg bg-[#0D0D0D] border border-white/15 text-sm text-[#F5F5DC] placeholder:text-[#F5F5DC]/40 focus:outline-none focus:border-[#F1C40F]"
                    />
                  </div>
                  <div>
                    <label htmlFor="cart-street-address" className="sr-only">
                      Delivery street or landmark
                    </label>
                    <input
                      id="cart-street-address"
                      type="text"
                      value={streetAddress}
                      onChange={(e) => setStreetAddress(e.target.value)}
                      placeholder="Street / Landmark in Port Harcourt"
                      className="w-full px-3 py-2 rounded-lg bg-[#0D0D0D] border border-white/15 text-sm text-[#F5F5DC] placeholder:text-[#F5F5DC]/40 focus:outline-none focus:border-[#F1C40F]"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-5 bg-[#161616] border-t border-white/10 space-y-3">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-[#F5F5DC]/75">
                <span>Subtotal</span>
                <span className="tabular-nums font-medium">{formatNaira(totals.subtotal)}</span>
              </div>
              <div className="flex justify-between text-[#F5F5DC]/75">
                <span>Delivery ({selectedZone.name})</span>
                <span className="tabular-nums font-medium">
                  {formatNaira(totals.deliveryFee)}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-white/10 text-base font-bold text-[#F5F5DC]">
                <span>Total Payable</span>
                <span
                  className="font-display text-xl text-[#F1C40F] tabular-nums"
                  data-testid="cart-grand-total"
                >
                  {formatNaira(totals.grandTotal)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="whatsapp-checkout-link"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#34A853] hover:bg-[#2b8d45] text-sm font-bold text-[#0D0D0D] transition-colors min-h-[44px]"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>Checkout via WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={handleCopySummary}
                aria-label="Copy formatted order summary"
                title="Copy order text"
                className="w-11 h-11 inline-flex items-center justify-center rounded-lg bg-[#0D0D0D] border border-white/15 hover:border-[#F1C40F] text-[#F5F5DC] shrink-0 cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-[#34A853]" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
};
