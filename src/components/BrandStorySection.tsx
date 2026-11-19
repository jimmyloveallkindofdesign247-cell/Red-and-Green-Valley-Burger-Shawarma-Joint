import React from 'react';
import { Flame, Leaf } from 'lucide-react';

export const BrandStorySection: React.FC = () => {
  return (
    <section id="story" className="py-16 sm:py-20 bg-[#161616] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F1C40F] mb-2">
              Our Culinary Duality
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-[#F5F5DC] text-balance">
              Why Red &amp; Green Valley?
            </h2>
            <p className="mt-4 text-base text-[#F5F5DC]/80 leading-relaxed">
              Every plate and takeout box leaving our Port Harcourt grill carries two promises:
              unapologetic West African fire on the meat, and bright garden-fresh crispness in
              every wrap, bun, and fruit cup.
            </p>

            <div className="mt-8 space-y-5">
              <div className="p-5 rounded-xl bg-[#0D0D0D] border border-[#D4212A]/45">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-9 h-9 rounded-lg bg-[#D4212A]/20 text-[#D4212A] inline-flex items-center justify-center shrink-0">
                    <Flame className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-xl font-bold uppercase tracking-wide text-[#F5F5DC]">
                    The Red — Flame, Spice &amp; Sear
                  </h3>
                </div>
                <p className="text-sm text-[#F5F5DC]/80 leading-relaxed">
                  High-heat seared beef patties, slow-turning vertical shawarma spits basted with
                  ginger, garlic, and roasted peanut suya spice, plus signature house pepper sauces
                  made fresh every morning.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#0D0D0D] border border-[#34A853]/45">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-9 h-9 rounded-lg bg-[#34A853]/20 text-[#34A853] inline-flex items-center justify-center shrink-0">
                    <Leaf className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-xl font-bold uppercase tracking-wide text-[#F5F5DC]">
                    The Green — Freshness, Balance &amp; Care
                  </h3>
                </div>
                <p className="text-sm text-[#F5F5DC]/80 leading-relaxed">
                  Crisp butter lettuce, vine-ripened tomatoes, cold-washed cabbage slaw, daily
                  hand-diced mixed fruit salads, and strict commercial kitchen hygiene built to
                  international franchise standards.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="h-full min-h-[360px] max-h-[540px] rounded-2xl overflow-hidden border border-white/15 bg-[#0D0D0D] relative">
              <img
                src="/assets/aistudio/Red_and_Green_Valley_Brand_Reference_V3_c512bb16.jpg"
                alt="Red and Green Valley metallic circular emblem above flame-grilled double cheeseburger and loaded shawarma wrap"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
              <div
                className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/80 to-transparent"
                aria-hidden="true"
              />
              <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-xs text-[#F5F5DC]/90">
                <span className="font-semibold uppercase tracking-wider text-[#F1C40F]">
                  Signature Brand Emblem
                </span>
                <span>Port Harcourt Heritage</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
