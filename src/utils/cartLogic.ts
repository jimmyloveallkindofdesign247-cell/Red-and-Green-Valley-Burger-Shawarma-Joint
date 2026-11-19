import type {
  CartItem,
  CustomizationOption,
  DeliveryZone,
  InquiryFormData,
} from '../types';
import { WHATSAPP_NUMBER } from '../data/restaurantData';

export function formatNaira(amount: number): string {
  const safe = Number.isFinite(amount) ? Math.max(0, Math.round(amount)) : 0;
  return `₦${safe.toLocaleString('en-NG')}`;
}

export function calculateCustomizedUnitPrice(
  basePrice: number,
  protein?: CustomizationOption,
  toppings: CustomizationOption[] = [],
  sauce?: CustomizationOption
): number {
  const proteinCost = protein ? protein.priceDelta : 0;
  const toppingsCost = toppings.reduce((sum, item) => sum + item.priceDelta, 0);
  const sauceCost = sauce ? sauce.priceDelta : 0;
  return basePrice + proteinCost + toppingsCost + sauceCost;
}

export function buildCartKey(
  itemId: string,
  protein?: CustomizationOption,
  toppings: CustomizationOption[] = [],
  sauce?: CustomizationOption
): string {
  const toppingIds = [...toppings]
    .map((t) => t.id)
    .sort()
    .join(',');
  return [
    itemId,
    protein?.id ?? 'default-protein',
    toppingIds || 'no-toppings',
    sauce?.id ?? 'default-sauce',
  ].join('|');
}

export function getCartItemUnitPrice(item: CartItem): number {
  return calculateCustomizedUnitPrice(
    item.basePrice,
    item.protein,
    item.toppings,
    item.sauce
  );
}

export function computeCartTotals(
  items: CartItem[],
  deliveryZone?: DeliveryZone | null
): {
  itemCount: number;
  subtotal: number;
  deliveryFee: number;
  grandTotal: number;
} {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + getCartItemUnitPrice(item) * item.quantity,
    0
  );
  const deliveryFee = itemCount > 0 && deliveryZone ? deliveryZone.feeNaira : 0;
  return {
    itemCount,
    subtotal,
    deliveryFee,
    grandTotal: subtotal + deliveryFee,
  };
}

export function buildWhatsAppOrderMessage(
  items: CartItem[],
  deliveryZone?: DeliveryZone | null,
  customerInfo?: { name?: string; address?: string; notes?: string }
): string {
  if (items.length === 0) {
    return 'Hello Red & Green Valley! I would like to place an order from your Port Harcourt kitchen.';
  }

  const lines: string[] = [
    'Hello Red & Green Valley! I would like to place an order:',
    '',
  ];

  items.forEach((item, index) => {
    const unit = getCartItemUnitPrice(item);
    const lineTotal = unit * item.quantity;
    lines.push(`${index + 1}. ${item.quantity}x ${item.name} — ${formatNaira(lineTotal)}`);
    const mods: string[] = [];
    if (item.protein) mods.push(`Protein: ${item.protein.label}`);
    if (item.toppings.length > 0) {
      mods.push(`Add-ons: ${item.toppings.map((t) => t.label).join(', ')}`);
    }
    if (item.sauce) mods.push(`Sauce: ${item.sauce.label}`);
    if (mods.length > 0) {
      lines.push(`   (${mods.join(' | ')})`);
    }
  });

  const totals = computeCartTotals(items, deliveryZone);
  lines.push('');
  lines.push(`Subtotal: ${formatNaira(totals.subtotal)}`);
  if (deliveryZone) {
    lines.push(
      `Delivery Zone: ${deliveryZone.name} (${deliveryZone.eta}) — ${formatNaira(totals.deliveryFee)}`
    );
  }
  lines.push(`Total Payable: ${formatNaira(totals.grandTotal)}`);

  if (customerInfo?.name?.trim()) {
    lines.push(`Customer Name: ${customerInfo.name.trim()}`);
  }
  if (customerInfo?.address?.trim()) {
    lines.push(`Delivery Street/Landmark: ${customerInfo.address.trim()}`);
  }
  if (customerInfo?.notes?.trim()) {
    lines.push(`Order Notes: ${customerInfo.notes.trim()}`);
  }

  return lines.join('\n');
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function getCountdownParts(
  targetTimestamp: number,
  nowTimestamp: number
): { hours: string; minutes: string; seconds: string; expired: boolean } {
  const diffMs = Math.max(0, targetTimestamp - nowTimestamp);
  const totalSeconds = Math.floor(diffMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return {
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
    expired: diffMs <= 0,
  };
}

export interface InquiryValidationErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  organizationOrCity?: string;
  guestCountOrCapital?: string;
  message?: string;
}

export function validateInquiryForm(
  data: InquiryFormData
): InquiryValidationErrors {
  const errors: InquiryValidationErrors = {};
  if (!data.fullName.trim() || data.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }
  const digitsOnly = data.phone.replace(/\D/g, '');
  if (digitsOnly.length < 7) {
    errors.phone = 'Please enter a valid phone or WhatsApp number.';
  }
  if (!data.organizationOrCity.trim()) {
    errors.organizationOrCity =
      data.type === 'catering'
        ? 'Please enter your company, event name, or venue.'
        : 'Please enter your target city or country.';
  }
  if (!data.guestCountOrCapital.trim()) {
    errors.guestCountOrCapital =
      data.type === 'catering'
        ? 'Please select or enter estimated guest count.'
        : 'Please select an investment range.';
  }
  if (!data.message.trim() || data.message.trim().length < 10) {
    errors.message = 'Please add brief details (at least 10 characters).';
  }
  return errors;
}
