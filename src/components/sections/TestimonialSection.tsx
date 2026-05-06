"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Heading";
import { cn } from "@/lib/utils";

const TESTIMONIALS = [
  {
    id: 1,
    quote: "The team at Gentle Care has been a godsend for our family. Not only do they provide incredible clinical support, but the way they treat my mother with such dignity makes all the difference.",
    author: "Sarah T.",
    role: "Daughter of client",
    rating: 5,
    location: "Inner West"
  },
  {
    id: 2,
    quote: "After my hospital discharge, I was overwhelmed. The nurses from Gentle Care stepped in and made everything calm and clear. They coordinated with my doctors and gave me back my confidence.",
    author: "David M.",
    role: "Post-Hospital Care Client",
    rating: 5,
    location: "North Shore"
  },
  {
    id: 3,
    quote: "Finding an NDIS provider that actually listens and sends the same consistent carers was our biggest challenge until we found Gentle Care. They are reliable, professional, and genuinely caring.",
    author: "Elena R.",
    role: "NDIS Participant",
    rating: 5,
    location: "Sydney CBD"
  }
];

export function TestimonialSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <Section id="testimonials" className="bg-pw-cream-warm overflow-hidden py-24 sm:py-32 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-pw-border to-transparent" />
      
      <div className="relative z-10" ref={containerRef}>
        <Container size="lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Header Content */}
            <div className="lg:col-span-4 lg:pr-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pw-sage/10 text-pw-sage-700 mb-6">
                  <Star className="w-4 h-4 fill-pw-sage-700" />
                  <span className="text-xs font-bold tracking-wider uppercase">Client Stories</span>
                </div>
                <Heading level="h2" className="text-3xl sm:text-4xl font-bold font-serif text-pw-charcoal mb-6">
                  Care that families trust
                </Heading>
                <p className="text-pw-muted-foreground text-lg mb-8 leading-relaxed">
                  Hear from the people and families we support across Sydney. We pride ourselves on building lasting, respectful relationships.
                </p>
                
                <div className="flex gap-4 hidden lg:flex">
                  <button
                    onClick={prevTestimonial}
                    className="w-12 h-12 rounded-full border border-pw-border flex items-center justify-center text-pw-charcoal hover:bg-pw-sage hover:text-white hover:border-pw-sage transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-pw-sage focus:ring-offset-2"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="w-12 h-12 rounded-full border border-pw-border flex items-center justify-center text-pw-charcoal hover:bg-pw-sage hover:text-white hover:border-pw-sage transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-pw-sage focus:ring-offset-2"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </motion.div>
            </div>
  
            {/* Testimonial Cards */}
            <div className="lg:col-span-8 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-pw-sage/5 rounded-full blur-[80px] pointer-events-none" />
              
              <div className="relative h-[380px] sm:h-[300px] w-full">
                {TESTIMONIALS.map((testimonial, idx) => {
                  const isActive = idx === activeIndex;
                  const isPrev = idx === (activeIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length;
                  const isNext = idx === (activeIndex + 1) % TESTIMONIALS.length;
                  
                  let transform = "translateX(100%) scale(0.8)";
                  let zIndex = 0;
                  let opacity = 0;
                  
                  if (isActive) {
                    transform = "translateX(0) scale(1)";
                    zIndex = 30;
                    opacity = 1;
                  } else if (isPrev) {
                    transform = "translateX(-20%) scale(0.9)";
                    zIndex = 20;
                    opacity = 0.4;
                  } else if (isNext) {
                    transform = "translateX(20%) scale(0.9)";
                    zIndex = 20;
                    opacity = 0.4;
                  }
  
                  return (
                    <motion.div
                      key={testimonial.id}
                      className="absolute top-0 left-0 w-full h-full transition-all duration-700 ease-in-out"
                      style={{
                        transform,
                        zIndex,
                        opacity,
                        pointerEvents: isActive ? "auto" : "none"
                      }}
                    >
                      <div className={cn(
                        "h-full rounded-[2rem] p-8 sm:p-10 flex flex-col justify-between shadow-pw-lg border border-white/50 backdrop-blur-sm",
                        "bg-white"
                      )}>
                        <div>
                          <div className="flex justify-between items-start mb-6">
                            <div className="flex gap-1">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-pw-amber text-pw-amber" />
                              ))}
                            </div>
                            <Quote className="w-10 h-10 text-pw-sage/20 rotate-180" />
                          </div>
                          <p className="text-pw-charcoal text-lg sm:text-xl font-medium leading-relaxed font-serif italic">
                            "{testimonial.quote}"
                          </p>
                        </div>
                        
                        <div className="mt-8 flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-pw-sage/10 flex items-center justify-center text-pw-sage-700 font-bold text-lg">
                            {testimonial.author.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-pw-charcoal">{testimonial.author}</div>
                            <div className="text-sm text-pw-muted-foreground flex items-center gap-2">
                              <span>{testimonial.role}</span>
                              <span className="w-1 h-1 rounded-full bg-pw-border"></span>
                              <span>{testimonial.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              
              {/* Mobile Controls */}
              <div className="flex gap-4 lg:hidden justify-center mt-8 relative z-40">
                <button
                  onClick={prevTestimonial}
                  className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-pw-charcoal hover:bg-pw-sage hover:text-white transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-pw-charcoal hover:bg-pw-sage hover:text-white transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
  
          </div>
        </Container>
      </div>
    </Section>
  );
}
