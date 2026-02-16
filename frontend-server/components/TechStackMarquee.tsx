import { Code2, Database, Globe, Layout, Server, Terminal } from 'lucide-react';

export function TechStackMarquee() {
  const technologies = [
    { name: 'Next.js 15', icon: Globe },
    { name: 'React 19', icon: Code2 },
    { name: 'TypeScript', icon: Terminal },
    { name: 'Tailwind CSS', icon: Layout },
    { name: 'Prisma ORM', icon: Database },
    { name: 'PostgreSQL', icon: Server },
    { name: 'WebSocket', icon: Globe },
    { name: 'Express.js', icon: Server },
    {name : 'Shadcn UI', icon : Layout}
  ];

  return (
    <div className="w-full py-12 bg-transparent overflow-hidden">
      <div className="text-center mb-8">
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Powered by Modern Tech Stack
        </p>
      </div>
      
      <div className="relative flex overflow-x-hidden group">
        <div className="flex animate-infinite-scroll group-hover:[animation-play-state:paused] gap-12 whitespace-nowrap py-4">
          {/* First set */}
          {technologies.map((tech, index) => (
            <div key={`1-${index}`} className="flex items-center gap-2 text-xl font-semibold text-muted-foreground hover:text-primary transition-colors cursor-default">
              <tech.icon className="h-6 w-6" />
              <span>{tech.name}</span>
            </div>
          ))}
          {/* Duplicate set for seamless scrolling */}
          {technologies.map((tech, index) => (
            <div key={`2-${index}`} className="flex items-center gap-2 text-xl font-semibold text-muted-foreground hover:text-primary transition-colors cursor-default">
              <tech.icon className="h-6 w-6" />
              <span>{tech.name}</span>
            </div>
          ))}
          {/* Triplicate set for wide screens */}
          {technologies.map((tech, index) => (
            <div key={`3-${index}`} className="flex items-center gap-2 text-xl font-semibold text-muted-foreground hover:text-primary transition-colors cursor-default">
              <tech.icon className="h-6 w-6" />
              <span>{tech.name}</span>
            </div>
          ))}
          {/* Quadruplicate set for extra wide screens */}
          {technologies.map((tech, index) => (
            <div key={`4-${index}`} className="flex items-center gap-2 text-xl font-semibold text-muted-foreground hover:text-primary transition-colors cursor-default">
              <tech.icon className="h-6 w-6" />
              <span>{tech.name}</span>
            </div>
          ))}
        </div>
        
        {/* Gradient Masks for Fade Effect */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r from-background to-transparent"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l from-background to-transparent"></div>
      </div>
    </div>
  );
}
