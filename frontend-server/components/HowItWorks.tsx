import React from "react";
import { MousePointerClick, Rocket, Share2 } from "lucide-react";

function SectionHeading({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`text-3xl font-bold text-center tracking-tight text-gray-900 ${className}`}>
      {children}
    </h2>
  );
}

export const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Create a Room",
      description: "Start by creating a dedicated room for your poll. It's instant and requires no setup.",
      icon: MousePointerClick,
    },
    {
      id: 2,
      title: "Launch a Poll",
      description: "Ask your question and add options. Customize settings to fit your needs.",
      icon: Rocket,
    },
    {
      id: 3,
      title: "Share & Watch",
      description: "Share the unique link with your audience and watch results update in real-time.",
      icon: Share2,
    },
  ];

  return (
    <div className="py-4 px-4 bg-transparent">
      <SectionHeading className="mb-16">How It Works</SectionHeading>
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 relative">
        {/* Connector Line (Desktop) */}
        <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-linear-to-r from-transparent via-primary/20 to-transparent -z-10"></div>

        {steps.map((step) => (
          <div key={step.id} className="flex flex-col items-center text-center group">
            <div className="w-24 h-24 rounded-3xl bg-white shadow-xl shadow-primary/5 flex items-center justify-center mb-8 relative z-10 border border-primary/10 group-hover:scale-105 transition-transform duration-300 group-hover:shadow-primary/20">
              <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-md">
                {step.id}
              </div>
              <step.icon className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-primary transition-colors">{step.title}</h3>
            <p className="text-muted-foreground leading-relaxed max-w-sm mx-auto">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
