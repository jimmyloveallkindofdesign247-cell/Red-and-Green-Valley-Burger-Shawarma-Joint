export type MenuCategory =
  | 'All'
  | 'Signature Burgers'
  | 'Loaded Shawarma'
  | 'Sides & Fruit Salads'
  | 'Chilled Drinks';

export type SpiceLevel = 'Mild' | 'Medium Flame' | 'Suya Hot' | 'Fresh & Cool';

export interface MenuItem {
  id: string;
  name: string;
  category: Exclude<MenuCategory, 'All'>;
  description: string;
  priceNaira: number;
  spiceLevel: SpiceLevel;
  prepMinutes: number;
  customizable: boolean;
  featuredTag?: string;
  image?: string;
}

export interface CustomizationOption {
  id: string;
  label: string;
  priceDelta: number;
}

export interface CartItem {
  cartKey: string;
  itemId: string;
  name: string;
  basePrice: number;
  quantity: number;
  isCombo?: boolean;
  protein?: CustomizationOption;
  toppings: CustomizationOption[];
  sauce?: CustomizationOption;
}

export interface ComboDeal {
  id: string;
  title: string;
  subtitle: string;
  includes: string[];
  originalPrice: number;
  dealPrice: number;
  badgeText: string;
  servings: string;
}

export interface DeliveryZone {
  id: string;
  name: string;
  eta: string;
  feeNaira: number;
  coverageNote: string;
}

export interface ExpansionCity {
  city: string;
  country: string;
  status: 'Flagship Open' | 'Opening Q2 2027' | 'Site Secured' | 'Global Roadmap';
  district: string;
}

export interface CustomerReview {
  id: string;
  name: string;
  role: string;
  neighborhood: string;
  rating: number;
  quote: string;
  orderedItem: string;
}

export type InquiryType = 'catering' | 'franchise';

export interface InquiryFormData {
  type: InquiryType;
  fullName: string;
  email: string;
  phone: string;
  organizationOrCity: string;
  guestCountOrCapital: string;
  message: string;
}
