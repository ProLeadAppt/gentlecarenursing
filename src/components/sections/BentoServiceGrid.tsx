"use client";

import { useRef } from "react";
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
  return (
    <section className="py-24 sm:py-32 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <Reveal delay={0.1} y={20}>
            <p className="text-sm font-bold uppercase tracking-widest text-primary/80 mb-4">Our Expertise</p>
          </Reveal>
          <Reveal delay={0.2} y={20}>
            <Heading level="h2" className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
              Boutique Clinical Care & Support
            </Heading>
          </Reveal>
          <Reveal delay={0.3} y={15}>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              We focus on quality over volume, providing dedicated nursing and disability support 
              tailored to your unique life goals and health needs.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 auto-rows-[12rem] sm:auto-rows-[16rem]">
          {/* Main Large Card: Nursing Care */}
          <BentoCard
            index={0}
            className="md:col-span-2 md:row-span-2 lg:col-span-3 lg:row-span-2 bg-primary group"
            service={SERVICES.find(s => s.slug === "nursing-care")!}
            dark
          />

          {/* Medium Card: Personal Care */}
          <BentoCard
            index={1}
            className="md:col-span-2 md:row-span-1 lg:col-span-3 lg:row-span-1 bg-accent/10 border border-accent/20"
            service={SERVICES.find(s => s.slug === "personal-care")!}
          />

          {/* Smaller Cards */}
          <BentoCard
            index={2}
            className="md:col-span-2 md:row-span-1 lg:col-span-2 lg:row-span-1 bg-muted/30 border border-border/50"
            service={SERVICES.find(s => s.slug === "daily-living")!}
          />

          <BentoCard
            index={3}
            className="md:col-span-2 md:row-span-1 lg:col-span-2 lg:row-span-1 bg-white border border-border shadow-sm"
            service={SERVICES.find(s => s.slug === "community-participation")!}
          />

          <BentoCard
            index={4}
            className="md:col-span-2 md:row-span-1 lg:col-span-2 lg:row-span-1 bg-accent/5 border border-accent/10"
            service={SERVICES.find(s => s.slug === "complex-care")!}
          />

          <BentoCard
            index={5}
            className="md:col-span-2 md:row-span-1 lg:col-span-3 lg:row-span-1 bg-muted/50 border border-border"
            service={SERVICES.find(s => s.slug === "overnight-support")!}
          />

          <BentoCard
            index={6}
            className="md:col-span-2 md:row-span-1 lg:col-span-3 lg:row-span-1 bg-primary/5 border border-primary/20"
            service={SERVICES.find(s => s.slug === "post-hospital-care")!}
          />
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
}

function BentoCard({ service, className, dark, index }: BentoCardProps) {
  const Icon = ICONS[service.slug as keyof typeof ICONS] || Activity;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.1 * index, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "relative rounded-[2rem] p-8 flex flex-col justify-between overflow-hidden transition-all duration-500 group cursor-pointer",
        className
      )}
    >
      <Link href={service.href} className="absolute inset-0 z-10" />
      
      {/* Decorative Blur for dark card */}
      {dark && (
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:bg-white/15 transition-colors" />
      )}

      <div className="relative z-20">
        <div className={cn(
          "h-12 w-12 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3",
          dark ? "bg-white/20 text-white" : "bg-primary/10 text-primary"
        )}>
          <Icon className="h-6 w-6" strokeWidth={2.5} />
        </div>
        
        <h3 className={cn(
          "text-2xl font-bold tracking-tight mb-3 lg:text-3xl",
          dark ? "text-white" : "text-foreground"
        )}>
          {service.title}
        </h3>
        
        <p className={cn(
          "line-clamp-2 font-medium leading-relaxed",
          dark ? "text-white/80" : "text-muted-foreground"
        )}>
          {service.benefitLine}
        </p>
      </div>

      <div className="relative z-20 flex items-center justify-between mt-8">
        <span className={cn(
          "text-sm font-bold tracking-wider uppercase",
          dark ? "text-white/60" : "text-primary/70"
        )}>
          Explore Service
        </span>
        <div className={cn(
          "h-10 w-10 rounded-full flex items-center justify-center border transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1",
          dark ? "border-white/20 bg-white/10 text-white" : "border-primary/20 bg-primary/5 text-primary"
        )}>
          <ArrowUpRight className="h-5 w-5" />
        </div>
      </div>
      
      {/* Subtle Background Pattern */}
      <div className={cn(
        "absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full opacity-[0.03] pointer-events-none",
        dark ? "bg-white" : "bg-primary"
      )} />
    </motion.div>
  );
}
