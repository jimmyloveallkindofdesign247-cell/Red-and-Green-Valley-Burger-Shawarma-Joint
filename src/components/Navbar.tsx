import React, { useState } from 'react';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { formatNaira } from '../utils/cartLogic';

interface NavbarProps {
  itemCount: number;
  subtotal: number;
  onOpenCart: () => void;
}

const NAV_LINKS = [
  { label: 'Menu', href: '#menu' },
  { label: 'Valley Deals', href: '#deals' },
  { label: 'Locations', href: '#locations' },
  { label: 'Our Story', href: '#story' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Franchise & Catering', href: '#inquiry' },
];

export const Navbar: React.FC<NavbarProps> = ({
  itemCount,
  subtotal,
  onOpenCart,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 h-16 backdrop-blur-md bg-[#0D0D0D]/90 border-b border-white/10">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">
        <a
          href="#top"
          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F1C40F] rounded-md shrink-0"
          aria-label="Red and Green Valley Home"
        >
          <BrandLogo variant="navbar" />
        </a>

        <nav
          className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#F5F5DC]/85"
          aria-label="Primary navigation"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-[#F1C40F] hover:text-[#F1C40F] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F1C40F] rounded-sm"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Open order cart, ${itemCount} items, subtotal ${formatNaira(subtotal)}`}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#161616] border border-white/15 hover:border-[#F1C40F]/70 text-sm font-medium text-[#F5F5DC] transition-colors whitespace-nowrap shrink-0 min-h-[40px] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F1C40F]"
          >
            <ShoppingBag className="w-4 h-4 text-[#F1C40F]" aria-hidden="true" />
            <span className="tabular-nums font-semibold" data-testid="nav-cart-count">
              {itemCount}
            </span>
            <span className="hidden sm:inline text-[#F5F5DC]/50" aria-hidden="true">
              ·
            </span>
            <span className="hidden sm:inline tabular-nums text-[#F1C40F] font-semibold">
              {formatNaira(subtotal)}
            </span>
          </button>

          <a
            href="#menu"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-lg bg-[#D4212A] hover:bg-[#b51b23] text-sm font-semibold text-[#F5F5DC] transition-colors whitespace-nowrap shrink-0 min-h-[40px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F1C40F]"
          >
            Order Now
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#161616] border border-white/15 text-[#F5F5DC] hover:border-[#F1C40F] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F1C40F]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          id="mobile-nav-drawer"
          className="lg:hidden bg-[#0D0D0D]/98 border-b border-white/10 px-4 py-4 space-y-2 shadow-2xl"
        >
          <nav className="flex flex-col space-y-1" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2.5 rounded-lg text-base font-medium text-[#F5F5DC] hover:bg-[#161616] hover:text-[#F1C40F] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-2 border-t border-white/10">
            <a
              href="#menu"
              onClick={() => setMobileOpen(false)}
              className="w-full inline-flex items-center justify-center px-4 py-3 rounded-lg bg-[#D4212A] text-sm font-semibold text-[#F5F5DC]"
            >
              Order Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
