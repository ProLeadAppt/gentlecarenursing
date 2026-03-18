"use client";

import { motion } from "framer-motion";
import { MessageSquare, PhoneCall, UserPlus, CheckCircle2 } from "lucide-react";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/animations/Reveal";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    title: "Enquiry",
    description: "Submit a simple form or call us. We acknowledge every enquiry immediately.",
    icon: MessageSquare,
    time: "Instant",
  },
  {
    title: "Response",
    description: "Our clinical team contacts you within 24 hours to discuss your specific needs.",
    icon: PhoneCall,
    time: "< 24 Hours",
  },
  {
    title: "Care Match",
    description: "We match you with the right nurse or carer who fits your personality and goals.",
    icon: UserPlus,
    time: "Ongoing",
  },
  {
    title: "Care Begins",
    description: "Experience premium, boutique support that prioritises your dignity and choice.",
    icon: CheckCircle2,
    time: "Ready",
  },
];

export function ProcessTimeline() {
  return (
    <section className="py-24 sm:py-32 bg-muted/30 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-20">
          <Reveal delay={0.1} y={20}>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary/80 mb-4">The Journey</p>
          </Reveal>
          <Reveal delay={0.2} y={20}>
            <Heading level="h2" className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
              Simple Steps to Better Care
            </Heading>
          </Reveal>
          <Reveal delay={0.3} y={15}>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              We've refined our process to be as fast, clear, and reassuring as possible. 
              No waiting in limbo: just clinical excellence and personal connection.
            </p>
          </Reveal>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-[2.75rem] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-border/50 to-transparent z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="relative z-10 flex flex-col items-center text-center group">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.15 }}
                    className="h-20 w-20 rounded-3xl bg-white shadow-xl shadow-primary/5 border border-border flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500 transform group-hover:rotate-3"
                  >
                    <Icon className="h-8 w-8 text-primary group-hover:text-white transition-colors duration-500" />
                    
                    {/* Step Number Badge */}
                    <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-accent text-white text-xs font-bold flex items-center justify-center border-4 border-muted/30 shadow-lg">
                      {i + 1}
                    </div>
                  </motion.div>

                  <Reveal delay={0.4 + i * 0.1} y={15}>
                    <div className="mb-2">
                       <span className="inline-block px-3 py-1 bg-white border border-border/60 rounded-full text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3 group-hover:border-primary/30 transition-colors">
                        {step.time}
                      </span>
                      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-sm lg:text-base px-4">
                      {step.description}
                    </p>
                  </Reveal>
                  
                  {/* Divider for Mobile/Tablet */}
                  {i < STEPS.length - 1 && (
                    <div className="lg:hidden w-px h-12 bg-border/50 my-4" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        <Reveal delay={0.8} y={20} className="mt-20 flex justify-center">
          <div className="bg-white/80 backdrop-blur-sm px-6 py-4 rounded-2xl border border-border/50 shadow-sm flex items-center gap-4">
            <div className="flex -space-x-2">
              {[1,2,3].map(n => (
                <div key={n} className="h-8 w-8 rounded-full border-2 border-white bg-muted flex items-center justify-center overflow-hidden">
                   <div className="h-full w-full bg-accent/20 flex items-center justify-center text-[10px] font-bold text-accent">CN</div>
                </div>
              ))}
            </div>
            <p className="text-sm font-medium text-muted-foreground">
              Our clinical team is ready to respond <span className="text-primary font-bold">within 24 hours</span>.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
