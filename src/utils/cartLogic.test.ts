import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildCartKey,
  buildWhatsAppOrderMessage,
  buildWhatsAppUrl,
  calculateCustomizedUnitPrice,
  computeCartTotals,
  formatNaira,
  getCountdownParts,
  validateInquiryForm,
} from './cartLogic';
import type { CartItem, DeliveryZone } from '../types';

test('formatNaira formats Nigerian Naira cleanly with thousands separators', () => {
  assert.equal(formatNaira(7800), '₦7,800');
  assert.equal(formatNaira(14900), '₦14,900');
  assert.equal(formatNaira(-50), '₦0');
});

test('calculateCustomizedUnitPrice adds protein and toppings accurately', () => {
  const unit = calculateCustomizedUnitPrice(
    7800,
    { id: 'protein-suya', label: 'Suya-Spiced Peppered Cut', priceDelta: 900 },
    [
      { id: 'top-cheese', label: 'Extra Cheddar Cheese', priceDelta: 700 },
      { id: 'top-sausage', label: 'Grilled Beef Sausage', priceDelta: 800 },
    ],
    { id: 'sauce-pepper', label: 'Fiery Pepper Sauce', priceDelta: 0 }
  );
  assert.equal(unit, 10200);
});

test('buildCartKey normalizes topping order so identical customizations merge', () => {
  const keyA = buildCartKey(
    'burger-1',
    { id: 'p1', label: 'Beef', priceDelta: 0 },
    [
      { id: 't2', label: 'Sausage', priceDelta: 800 },
      { id: 't1', label: 'Cheese', priceDelta: 700 },
    ],
    { id: 's1', label: 'Garlic', priceDelta: 0 }
  );
  const keyB = buildCartKey(
    'burger-1',
    { id: 'p1', label: 'Beef', priceDelta: 0 },
    [
      { id: 't1', label: 'Cheese', priceDelta: 700 },
      { id: 't2', label: 'Sausage', priceDelta: 800 },
    ],
    { id: 's1', label: 'Garlic', priceDelta: 0 }
  );
  assert.equal(keyA, keyB);
});

test('computeCartTotals computes itemCount, subtotal, deliveryFee, and grandTotal', () => {
  const items: CartItem[] = [
    {
      cartKey: 'a',
      itemId: 'burger-valley-double',
      name: 'Valley Flame Double Cheeseburger',
      basePrice: 7800,
      quantity: 2,
      protein: { id: 'p', label: 'Suya-Spiced Peppered Cut', priceDelta: 900 },
      toppings: [{ id: 't', label: 'Extra Cheddar Cheese', priceDelta: 700 }],
      sauce: { id: 's', label: 'Fiery Pepper Sauce', priceDelta: 0 },
    },
    {
      cartKey: 'b',
      itemId: 'combo-ph-feast',
      name: 'The Port Harcourt Takeout Feast',
      basePrice: 14900,
      quantity: 1,
      isCombo: true,
      toppings: [],
    },
  ];
  const zone: DeliveryZone = {
    id: 'zone-woji',
    name: 'Woji',
    eta: '30–35 mins',
    feeNaira: 1500,
    coverageNote: 'Dedicated riders',
  };

  const totals = computeCartTotals(items, zone);
  // (7800 + 900 + 700) * 2 = 18800; + 14900 = 33700; + 1500 = 35200
  assert.equal(totals.itemCount, 3);
  assert.equal(totals.subtotal, 33700);
  assert.equal(totals.deliveryFee, 1500);
  assert.equal(totals.grandTotal, 35200);

  const emptyTotals = computeCartTotals([], zone);
  assert.equal(emptyTotals.deliveryFee, 0);
  assert.equal(emptyTotals.grandTotal, 0);
});

test('buildWhatsAppOrderMessage includes items, customizations, delivery zone, and encoded URL', () => {
  const items: CartItem[] = [
    {
      cartKey: 'a',
      itemId: 'shawarma-loaded-chicken',
      name: 'Loaded Grilled Chicken Shawarma',
      basePrice: 5500,
      quantity: 1,
      toppings: [{ id: 'top-sausage', label: 'Grilled Beef Sausage', priceDelta: 800 }],
      sauce: { id: 'sauce-garlic', label: 'Valley Garlic Sauce', priceDelta: 0 },
    },
  ];
  const zone: DeliveryZone = {
    id: 'zone-gra',
    name: 'GRA Phase 1–3',
    eta: '25–30 mins',
    feeNaira: 1000,
    coverageNote: 'Express',
  };

  const msg = buildWhatsAppOrderMessage(items, zone, {
    name: 'Kelechi',
    address: '14 Evo Road, New GRA',
  });
  assert.match(msg, /1x Loaded Grilled Chicken Shawarma/);
  assert.match(msg, /Grilled Beef Sausage/);
  assert.match(msg, /GRA Phase 1–3/);
  assert.match(msg, /₦7,300/);

  const url = buildWhatsAppUrl(msg);
  assert.match(url, /^https:\/\/wa\.me\/2348166882753\?text=/);
});

test('getCountdownParts formats padded hours, minutes, seconds', () => {
  const now = 1_700_000_000_000;
  const target = now + (2 * 3600 + 5 * 60 + 9) * 1000;
  const parts = getCountdownParts(target, now);
  assert.deepEqual(parts, {
    hours: '02',
    minutes: '05',
    seconds: '09',
    expired: false,
  });
});

test('validateInquiryForm catches invalid inputs and passes valid submissions', () => {
  const invalidErrors = validateInquiryForm({
    type: 'catering',
    fullName: 'A',
    email: 'not-an-email',
    phone: '123',
    organizationOrCity: '',
    guestCountOrCapital: '',
    message: 'Hi',
  });
  assert.ok(invalidErrors.fullName);
  assert.ok(invalidErrors.email);
  assert.ok(invalidErrors.phone);
  assert.ok(invalidErrors.organizationOrCity);
  assert.ok(invalidErrors.guestCountOrCapital);
  assert.ok(invalidErrors.message);

  const validErrors = validateInquiryForm({
    type: 'franchise',
    fullName: 'Boma Pepple',
    email: 'boma@example.com',
    phone: '+234 803 555 0192',
    organizationOrCity: 'Abuja, Nigeria',
    guestCountOrCapital: '$150k - $300k',
    message: 'Interested in opening a flagship branch in Wuse II Abuja.',
  });
  assert.deepEqual(validErrors, {});
});
