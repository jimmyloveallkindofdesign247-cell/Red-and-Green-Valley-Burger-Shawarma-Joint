import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { MealBuilderModal } from './components/MealBuilderModal';
import { ValleyDealsSection } from './components/ValleyDealsSection';
import { LocationsSection } from './components/LocationsSection';
import { BrandStorySection } from './components/BrandStorySection';
import { ReviewsSection } from './components/ReviewsSection';
import { InquirySection } from './components/InquirySection';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { DELIVERY_ZONES } from './data/restaurantData';
import type {
  CartItem,
  ComboDeal,
  CustomizationOption,
  DeliveryZone,
  MenuItem,
} from './types';
import { buildCartKey, computeCartTotals } from './utils/cartLogic';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [builderItem, setBuilderItem] = useState<MenuItem | null>(null);
  const [selectedZone, setSelectedZone] = useState<DeliveryZone>(DELIVERY_ZONES[0]);

  const upsertCartItem = (incoming: CartItem) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.cartKey === incoming.cartKey);
      if (existingIndex >= 0) {
        return prev.map((item, idx) =>
          idx === existingIndex
            ? { ...item, quantity: item.quantity + incoming.quantity }
            : item
        );
      }
      return [...prev, incoming];
    });
  };

  const handleQuickAdd = (item: MenuItem) => {
    const cartKey = buildCartKey(item.id);
    upsertCartItem({
      cartKey,
      itemId: item.id,
      name: item.name,
      basePrice: item.priceNaira,
      quantity: 1,
      toppings: [],
    });
  };

  const handleAddCustomized = ({
    item,
    protein,
    toppings,
    sauce,
    quantity,
  }: {
    item: MenuItem;
    protein: CustomizationOption;
    toppings: CustomizationOption[];
    sauce: CustomizationOption;
    quantity: number;
  }) => {
    const cartKey = buildCartKey(item.id, protein, toppings, sauce);
    upsertCartItem({
      cartKey,
      itemId: item.id,
      name: item.name,
      basePrice: item.priceNaira,
      quantity,
      protein,
      toppings,
      sauce,
    });
  };

  const handleAddCombo = (deal: ComboDeal) => {
    const cartKey = buildCartKey(deal.id);
    upsertCartItem({
      cartKey,
      itemId: deal.id,
      name: deal.title,
      basePrice: deal.dealPrice,
      quantity: 1,
      isCombo: true,
      toppings: [],
    });
  };

  const handleUpdateQuantity = (cartKey: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.cartKey === cartKey
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (cartKey: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartKey !== cartKey));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totals = computeCartTotals(cartItems, selectedZone);

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#F5F5DC]">
      <Navbar
        itemCount={totals.itemCount}
        subtotal={totals.subtotal}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main>
        <Hero />
        <MenuSection
          onQuickAdd={handleQuickAdd}
          onCustomize={(item) => setBuilderItem(item)}
        />
        <ValleyDealsSection onAddCombo={handleAddCombo} />
        <LocationsSection
          selectedZone={selectedZone}
          onSelectZone={setSelectedZone}
        />
        <BrandStorySection />
        <ReviewsSection />
        <InquirySection />
      </main>

      <Footer />

      <MealBuilderModal
        item={builderItem}
        onClose={() => setBuilderItem(null)}
        onAddCustomized={handleAddCustomized}
      />

      <CartDrawer
        isOpen={isCartOpen}
        items={cartItems}
        selectedZone={selectedZone}
        onSelectZone={setSelectedZone}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
