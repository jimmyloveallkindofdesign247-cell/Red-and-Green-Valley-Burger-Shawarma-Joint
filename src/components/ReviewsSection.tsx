import React from 'react';
import { Facebook, Instagram, Star } from 'lucide-react';
import { CUSTOMER_REVIEWS, SOCIAL_HANDLE } from '../data/restaurantData';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-16 sm:py-20 bg-[#0D0D0D] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F1C40F] mb-2">
              Port Harcourt Social Proof
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-[#F5F5DC] text-balance">
              Trusted Across GRA, Odili Road &amp; Woji
            </h2>
          </div>

          <div className="inline-flex items-center gap-2 text-sm text-[#F5F5DC]/85">
            <div className="flex items-center gap-0.5 text-[#F1C40F]" aria-label="4.9 out of 5 stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#F1C40F]" aria-hidden="true" />
              ))}
            </div>
            <span className="font-semibold tabular-nums">4.9 / 5.0</span>
            <span className="text-[#F5F5DC]/50" aria-hidden="true">
              ·
            </span>
            <span className="text-[#F5F5DC]/70">420+ Verified Local Orders</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CUSTOMER_REVIEWS.map((review) => (
            <article
              key={review.id}
              className="bg-[#161616] border border-white/10 rounded-xl p-6 flex flex-col justify-between"
            >
              <div>
                <div
                  className="flex items-center gap-1 text-[#F1C40F] mb-4"
                  aria-label={`${review.rating} out of 5 stars`}
                >
                  {Array.from({ length: review.rating }).map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-[#F1C40F]" aria-hidden="true" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-[#F5F5DC]/90 leading-relaxed">
                  &ldquo;{review.quote}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10">
                <p className="text-sm font-semibold text-[#F5F5DC]">{review.name}</p>
                <p className="text-xs text-[#F5F5DC]/65 mt-0.5">
                  {review.role} · {review.neighborhood}
                </p>
                <p className="text-xs text-[#34A853] font-medium mt-1.5">
                  Ordered: {review.orderedItem}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Social Showcase Bar */}
        <div className="mt-8 p-5 rounded-xl bg-[#161616] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="font-display text-lg font-bold uppercase tracking-wide text-[#F5F5DC]">
              Fresh Off the Grill on Social: <span className="text-[#F1C40F]">{SOCIAL_HANDLE}</span>
            </p>
            <p className="text-xs sm:text-sm text-[#F5F5DC]/70 mt-0.5">
              Tag your Port Harcourt takeout boxes and weekend combos for weekly grill drops.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://instagram.com/redandgreenvalley"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0D0D0D] border border-white/15 hover:border-[#D4212A] text-sm font-medium text-[#F5F5DC] transition-colors whitespace-nowrap"
            >
              <Instagram className="w-4 h-4 text-[#D4212A]" aria-hidden="true" />
              <span>Instagram</span>
            </a>
            <a
              href="https://facebook.com/redandgreenvalley"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0D0D0D] border border-white/15 hover:border-[#34A853] text-sm font-medium text-[#F5F5DC] transition-colors whitespace-nowrap"
            >
              <Facebook className="w-4 h-4 text-[#34A853]" aria-hidden="true" />
              <span>Facebook</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
