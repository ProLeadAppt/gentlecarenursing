"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Heart, Award, Star, CheckCircle2, BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const TRUST_ITEMS = [
  { label: "Registered NDIS Provider", icon: ShieldCheck },
  { label: "DVA Contracted Provider", icon: BadgeCheck },
  { label: "10+ Yrs Clinician Experience", icon: Award },
  { label: "Quick Response Window", icon: Star },
  { label: "Clinical Excellence", icon: CheckCircle2 },
  { label: "Personalised Care Model", icon: Heart },
];

export function TrustMarquee() {
  // Triple the items to ensure seamless loop
  const displayItems = [...TRUST_ITEMS, ...TRUST_ITEMS, ...TRUST_ITEMS];

  return (
    <div className="relative py-12 bg-white border-y border-border/50 overflow-hidden select-none">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
      
      <motion.div
        className="flex gap-12 whitespace-nowrap items-center"
        animate={{
          x: [0, -1035], // Approximate overlap distance
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {displayItems.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={`${item.label}-${i}`}
              className="flex items-center gap-3 text-muted-foreground/80 hover:text-primary transition-colors duration-300"
            >
              <div className="h-6 w-6 rounded-full bg-primary/5 flex items-center justify-center">
                <Icon className="h-3.5 w-3.5 text-primary/70" strokeWidth={2.5} />
              </div>
              <span className="text-sm font-bold uppercase tracking-[0.2em]">{item.label}</span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
