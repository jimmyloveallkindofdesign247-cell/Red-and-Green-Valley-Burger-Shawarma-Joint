import type {
  ComboDeal,
  CustomerReview,
  CustomizationOption,
  DeliveryZone,
  ExpansionCity,
  MenuCategory,
  MenuItem,
} from '../types';

export const WHATSAPP_NUMBER = '2348166882753';
export const DISPLAY_PHONE = '+234 816 688 2753';
export const FOOTER_PHONE = '+08166882753';
export const SOCIAL_HANDLE = '@redandgreenvalley';

export const MENU_CATEGORIES: MenuCategory[] = [
  'All',
  'Signature Burgers',
  'Loaded Shawarma',
  'Sides & Fruit Salads',
  'Chilled Drinks',
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'burger-valley-double',
    name: 'Valley Flame Double Cheeseburger',
    category: 'Signature Burgers',
    description:
      'Two charred prime beef patties, double aged cheddar, crisp butter lettuce, vine-ripened tomato, pickled cucumbers, red onion, and Valley garlic sauce on a toasted sesame brioche.',
    priceNaira: 7800,
    spiceLevel: 'Medium Flame',
    prepMinutes: 14,
    customizable: true,
    featuredTag: 'House Favorite',
  },
  {
    id: 'burger-suya-smash',
    name: 'Port Harcourt Suya Smash Burger',
    category: 'Signature Burgers',
    description:
      'Seared beef patty dusted in roasted peanut suya spice, caramelized onions, smoky pepper relish, and melted gouda on warm craft brioche.',
    priceNaira: 7200,
    spiceLevel: 'Suya Hot',
    prepMinutes: 12,
    customizable: true,
    featuredTag: 'Local Legend',
  },
  {
    id: 'burger-crispy-bird',
    name: 'Crunchy Valley Chicken Burger',
    category: 'Signature Burgers',
    description:
      'Buttermilk-brined chicken breast fried golden crisp, topped with tangy garden coleslaw, dill pickles, and creamy honey-mustard glaze.',
    priceNaira: 6800,
    spiceLevel: 'Mild',
    prepMinutes: 12,
    customizable: true,
  },
  {
    id: 'shawarma-loaded-chicken',
    name: 'Loaded Grilled Chicken Shawarma',
    category: 'Loaded Shawarma',
    description:
      'Slow-roasted marinated chicken shaved off the vertical spit, double beef sausage, sweet cabbage slaw, crisp cucumber, and rich Valley garlic cream wrapped in char-marked flatbread.',
    priceNaira: 5500,
    spiceLevel: 'Medium Flame',
    prepMinutes: 10,
    customizable: true,
    featuredTag: 'Best Seller',
  },
  {
    id: 'shawarma-mixed-valley',
    name: 'Red & Green Mixed Grill Shawarma',
    category: 'Loaded Shawarma',
    description:
      'Our signature dual-spit wrap combining flame-charred beef strips and herb-grilled chicken, double sausage, jalapeños, and dual garlic-pepper drizzle.',
    priceNaira: 6400,
    spiceLevel: 'Suya Hot',
    prepMinutes: 11,
    customizable: true,
  },
  {
    id: 'shawarma-beef-classic',
    name: 'Smoky Beef Pit Shawarma',
    category: 'Loaded Shawarma',
    description:
      'Tender spiced flank beef seared with bell peppers, crisp lettuce, diced tomatoes, and toasted flatbread finished on the flat grill.',
    priceNaira: 5800,
    spiceLevel: 'Medium Flame',
    prepMinutes: 10,
    customizable: true,
  },
  {
    id: 'side-fruit-salad',
    name: 'Garden Mixed Fruit Salad Cup',
    category: 'Sides & Fruit Salads',
    description:
      'Daily hand-cut sweet watermelon, ripe pineapple, pawpaw, kiwi, strawberries, and blueberries chilled with a hint of fresh mint.',
    priceNaira: 3200,
    spiceLevel: 'Fresh & Cool',
    prepMinutes: 5,
    customizable: false,
    featuredTag: 'Picked Fresh Daily',
  },
  {
    id: 'side-spiced-fries',
    name: 'Valley Spice Loaded Fries',
    category: 'Sides & Fruit Salads',
    description:
      'Skin-on crinkle fries tossed in smoked paprika sea salt, drizzled with warm cheddar melt and fiery pepper sauce.',
    priceNaira: 2900,
    spiceLevel: 'Medium Flame',
    prepMinutes: 8,
    customizable: false,
  },
  {
    id: 'side-garlic-coleslaw',
    name: 'Creamy Valley Slaw & Grill Corn',
    category: 'Sides & Fruit Salads',
    description:
      'Crisp shredded green cabbage, sweet carrots, and charred buttered corn kernels tossed in light house dressing.',
    priceNaira: 2400,
    spiceLevel: 'Mild',
    prepMinutes: 5,
    customizable: false,
  },
  {
    id: 'drink-iced-cola',
    name: 'Chilled Iced Soft Drink (500ml)',
    category: 'Chilled Drinks',
    description:
      'Ice-cold fountain cola or citrus soda packed over crystal-clear cubed ice in our sealed takeout cup.',
    priceNaira: 1500,
    spiceLevel: 'Fresh & Cool',
    prepMinutes: 2,
    customizable: false,
  },
  {
    id: 'drink-zobo-pineapple',
    name: 'Spiced Hibiscus & Pineapple Cooler',
    category: 'Chilled Drinks',
    description:
      'Slow-brewed chilled zobo infused with fresh Port Harcourt pineapple juice, ginger root, and crushed mint.',
    priceNaira: 2200,
    spiceLevel: 'Fresh & Cool',
    prepMinutes: 3,
    customizable: false,
    featuredTag: 'House Brewed',
  },
  {
    id: 'drink-chapman-valley',
    name: 'Valley Sunset Citrus Chapman',
    category: 'Chilled Drinks',
    description:
      'Classic Nigerian citrus cooler layered with cucumber ribbons, lime zest, orange slices, and crisp ice.',
    priceNaira: 2600,
    spiceLevel: 'Fresh & Cool',
    prepMinutes: 3,
    customizable: false,
  },
];

export const PROTEIN_OPTIONS: CustomizationOption[] = [
  { id: 'protein-beef', label: 'Flame-Seared Beef', priceDelta: 0 },
  { id: 'protein-chicken', label: 'Spit-Grilled Chicken', priceDelta: 0 },
  { id: 'protein-double', label: 'Double Patty / Extra Meat', priceDelta: 1800 },
  { id: 'protein-suya', label: 'Suya-Spiced Peppered Cut', priceDelta: 900 },
];

export const TOPPING_OPTIONS: CustomizationOption[] = [
  { id: 'top-cheese', label: 'Extra Cheddar Cheese', priceDelta: 700 },
  { id: 'top-sausage', label: 'Grilled Beef Sausage', priceDelta: 800 },
  { id: 'top-jalapenos', label: 'Pickled Jalapeños', priceDelta: 450 },
  { id: 'top-coleslaw', label: 'Fresh Valley Coleslaw', priceDelta: 500 },
];

export const SAUCE_OPTIONS: CustomizationOption[] = [
  { id: 'sauce-garlic', label: 'Valley Garlic Sauce', priceDelta: 0 },
  { id: 'sauce-pepper', label: 'Fiery Pepper Sauce', priceDelta: 0 },
  { id: 'sauce-bbq', label: 'Smokey BBQ Glaze', priceDelta: 0 },
];

export const COMBO_DEALS: ComboDeal[] = [
  {
    id: 'combo-ph-feast',
    title: 'The Port Harcourt Takeout Feast',
    subtitle: 'Our signature restaurant-to-table box built for maximum satisfaction.',
    includes: [
      'Valley Flame Double Cheeseburger',
      'Loaded Grilled Chicken Shawarma',
      'Garden Mixed Fruit Salad Cup',
      'Chilled Iced Soft Drink (500ml)',
    ],
    originalPrice: 18000,
    dealPrice: 14900,
    badgeText: 'Save ₦3,100 Today',
    servings: 'Serves 1–2',
  },
  {
    id: 'combo-weekend-duo',
    title: 'Weekend Duo Box',
    subtitle: 'Two hearty favorites paired with spice-dusted fries and twin coolers.',
    includes: [
      '2x Loaded Grilled Chicken or Beef Shawarma',
      'Valley Spice Loaded Fries (Share Size)',
      '2x Spiced Hibiscus & Pineapple Coolers',
    ],
    originalPrice: 18300,
    dealPrice: 15500,
    badgeText: 'Weekend Favorite',
    servings: 'Serves 2',
  },
  {
    id: 'combo-lunch-express',
    title: 'Lunch Express Solo',
    subtitle: 'Fast midday fuel crafted for offices across Trans-Amadi and GRA.',
    includes: [
      'Crunchy Valley Chicken Burger or Classic Shawarma',
      'Creamy Valley Slaw',
      'Chilled Iced Soft Drink (500ml)',
    ],
    originalPrice: 10700,
    dealPrice: 8900,
    badgeText: 'Weekday Express',
    servings: 'Serves 1',
  },
];

export const DELIVERY_ZONES: DeliveryZone[] = [
  {
    id: 'zone-gra',
    name: 'GRA Phase 1–3',
    eta: '25–30 mins',
    feeNaira: 1000,
    coverageNote: 'Priority express dispatch from New GRA kitchen',
  },
  {
    id: 'zone-odili',
    name: 'Peter Odili Road',
    eta: '25–35 mins',
    feeNaira: 1200,
    coverageNote: 'Direct thermal-bag courier along Odili corridor',
  },
  {
    id: 'zone-trans-amadi',
    name: 'Trans-Amadi',
    eta: '30–35 mins',
    feeNaira: 1200,
    coverageNote: 'Corporate & industrial estate lunch-hour dispatch',
  },
  {
    id: 'zone-woji',
    name: 'Woji',
    eta: '30–35 mins',
    feeNaira: 1500,
    coverageNote: 'Dedicated evening & weekend residential riders',
  },
  {
    id: 'zone-rumuokoro',
    name: 'Rumuokoro',
    eta: '35–45 mins',
    feeNaira: 1800,
    coverageNote: 'Scheduled insulated batch dispatch every 20 mins',
  },
  {
    id: 'zone-ada-george',
    name: 'Ada George',
    eta: '35–45 mins',
    feeNaira: 1600,
    coverageNote: 'Full route coverage from Agip Junction to Location',
  },
];

export const EXPANSION_ROADMAP: ExpansionCity[] = [
  {
    city: 'Port Harcourt',
    country: 'Nigeria',
    status: 'Flagship Open',
    district: 'New GRA Flagship Hub',
  },
  {
    city: 'Abuja',
    country: 'Nigeria',
    status: 'Opening Q2 2027',
    district: 'Wuse II Corridor',
  },
  {
    city: 'Lagos',
    country: 'Nigeria',
    status: 'Site Secured',
    district: 'Lekki Phase 1',
  },
  {
    city: 'London',
    country: 'United Kingdom',
    status: 'Global Roadmap',
    district: 'Peckham / Southbank Pop-Up',
  },
  {
    city: 'Houston',
    country: 'United States',
    status: 'Global Roadmap',
    district: 'Westheimer Galleria District',
  },
];

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    name: 'Chinedu Okafor',
    role: 'Energy Project Lead',
    neighborhood: 'New GRA, Port Harcourt',
    rating: 5,
    quote:
      'Ordered the Port Harcourt Takeout Feast for a late-evening office wrap-up. The double burger arrived steaming in its craft box, and the fruit salad tasted genuinely crisp—not soggy.',
    orderedItem: 'The Port Harcourt Takeout Feast',
  },
  {
    id: 'rev-2',
    name: 'Tamunoibi Briggs',
    role: 'Architectural Designer',
    neighborhood: 'Peter Odili Road',
    rating: 5,
    quote:
      'The Suya Smash Burger and Fiery Pepper Sauce hit a balance most fast-casual spots miss. Real char on the patties, zero grease overload, and rider reached Odili in 28 minutes.',
    orderedItem: 'Port Harcourt Suya Smash Burger',
  },
  {
    id: 'rev-3',
    name: 'Amaka Nwosu',
    role: 'Hospitality Coordinator',
    neighborhood: 'Woji Estate',
    rating: 5,
    quote:
      'We booked Red & Green Valley for a 45-person bridal shower lunch. Every shawarma wrap was labeled cleanly, warm off the grill, and the hibiscus pineapple coolers vanished first.',
    orderedItem: 'Loaded Grilled Chicken Shawarma',
  },
];
