"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Heart, Activity, Home, Users, Shield, Clock, PlusCircle } from "lucide-react";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/animations/Reveal";
import { SERVICES } from "@/content/services";
import { cn } from "@/lib/utils";

const ICONS = {
  "personal-care": Heart,
  "nursing-care": Activity,
  "daily-living": Home,
  "community-participation": Users,
  "complex-care": Shield,
  "overnight-support": Clock,
  "post-hospital-care": PlusCircle,
} as const;

export function BentoServiceGrid() {
  const mainService = SERVICES.find(s => s.slug === "nursing-care")!;
  const otherServices = SERVICES.filter(s => s.slug !== "nursing-care");

  return (
    <section className="py-24 sm:py-32 lg:py-40 bg-white overflow-hidden relative">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[60%] h-[40%] rounded-full bg-accent/[0.03] blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[50%] h-[50%] rounded-full bg-primary/[0.02] blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-2xl text-center mb-20 lg:mb-28">
          <Reveal delay={0.1}>
            <span className="mb-6 inline-block text-[10px] font-bold uppercase tracking-[0.3em] text-primary/60">
              Clinical Excellence
            </span>
          </Reveal>
          <Reveal delay={0.2}>
            <Heading level="h2" className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground font-[family-name:var(--font-serif)]">
              Boutique Care & Support
            </Heading>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-8 text-xl leading-relaxed text-muted-foreground font-medium">
              A private health nursing service dedicated to quality over volume, 
              providing hyper-personalized clinical care that honors your independence.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:auto-rows-[18rem]">
          {/* Featured Hero Card - Occupies 2x2 on desktop */}
          <BentoCard
            index={0}
            className="md:col-span-2 lg:row-span-2 bg-primary group ring-1 ring-primary/20 shadow-2xl shadow-primary/10"
            service={mainService}
            dark
            isFeatured
          />

          {/* Dynamic Grid of Services */}
          {otherServices.map((service, idx) => (
            <BentoCard
              key={service.slug}
              index={idx + 1}
              className={cn(
                "group transition-all duration-700 h-full min-h-[18rem]",
                // Alternating styles for a generic but premium feel
                idx % 4 === 0 ? "bg-accent/10 border border-accent/20" : 
                idx % 4 === 1 ? "bg-white border border-border/80 shadow-sm" :
                idx % 4 === 2 ? "bg-muted/40 border border-border/50" : 
                "bg-accent/5 border border-accent/10"
              )}
              service={service}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface BentoCardProps {
  service: typeof SERVICES[number];
  className?: string;
  dark?: boolean;
  index: number;
  isFeatured?: boolean;
}

function BentoCard({ service, className, dark, index, isFeatured }: BentoCardProps) {
  const Icon = ICONS[service.slug as keyof typeof ICONS] || Activity;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1, 
        ease: [0.21, 1, 0.44, 1] 
      }}
      className={cn(
        "relative rounded-[2.5rem] p-8 sm:p-10 flex flex-col justify-between overflow-hidden cursor-pointer",
        className
      )}
    >
      <Link href={service.href} className="absolute inset-0 z-30 focus:outline-none" aria-label={`View details for ${service.title}`} />
      
      {/* Premium Overlays */}
      <div className={cn(
        "absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none",
        dark 
          ? "bg-gradient-to-br from-white/10 via-transparent to-transparent" 
          : "bg-gradient-to-br from-primary/5 via-transparent to-transparent"
      )} />

      {isFeatured && (
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/10 rounded-full blur-[100px] transition-all duration-1000 group-hover:bg-white/20 pointer-events-none z-0" />
      )}

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col">
        <div className={cn(
          "h-14 w-14 rounded-2xl flex items-center justify-center mb-8 sm:mb-10 shadow-lg transition-all duration-700 group-hover:scale-110 group-hover:rotate-[8deg]",
          dark 
            ? "bg-white/15 text-white ring-1 ring-white/30 backdrop-blur-md" 
            : "bg-white text-primary ring-1 ring-primary/10 shadow-primary/5"
        )}>
          <Icon className="h-7 w-7" strokeWidth={1.5} />
        </div>
        
        <div className="space-y-4">
          <h3 className={cn(
            "text-2xl font-bold tracking-tight transition-colors duration-500 font-[family-name:var(--font-serif)]",
            isFeatured ? "sm:text-3xl lg:text-4xl" : "sm:text-2xl",
            dark ? "text-white" : "text-foreground group-hover:text-primary"
          )}>
            {service.title}
          </h3>
          
          <p className={cn(
            "text-base sm:text-lg font-medium leading-relaxed max-w-[400px]",
            dark ? "text-white/80" : "text-muted-foreground",
            // More intelligent clamping
            isFeatured ? "line-clamp-4 lg:line-clamp-6" : "line-clamp-3 sm:line-clamp-4"
          )}>
            {service.benefitLine}
          </p>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-8 flex items-center justify-between">
          <span className={cn(
            "text-[10px] font-bold tracking-[0.3em] uppercase transition-all duration-700 transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100",
            dark ? "text-white/90" : "text-primary"
          )}>
            Service Details
          </span>
          <div className={cn(
            "h-12 w-12 rounded-full flex items-center justify-center transition-all duration-700 shadow-md",
            dark 
              ? "bg-white/15 text-white ring-1 ring-white/30 group-hover:bg-white group-hover:text-primary group-hover:rotate-45" 
              : "bg-primary text-white shadow-primary/20 group-hover:bg-primary-dark group-hover:rotate-45"
          )}>
            <ArrowUpRight className="h-5 w-5" strokeWidth={2.5} />
          </div>
        </div>
      </div>
      
      {/* Dynamic Background Pattern */}
      <div className={cn(
        "absolute -bottom-24 -right-24 w-72 h-72 rounded-full opacity-[0.05] pointer-events-none transition-transform duration-1000 group-hover:scale-150 rotate-12",
        dark ? "bg-white" : "bg-primary"
      )} />
    </motion.div>
  );
}
