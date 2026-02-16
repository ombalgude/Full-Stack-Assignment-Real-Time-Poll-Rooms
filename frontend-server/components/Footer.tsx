import { Github, Twitter, Heart } from 'lucide-react';


export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Copyright */}
        <div className="text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} itsmyscreen. All rights reserved.</p>
        </div>

        {/* Socials & Credits */}
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <span>Built with</span>
            <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500 animate-pulse" />
            <span>by </span>
            <a 
              href="https://github.com/ombalgude" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-medium text-foreground hover:text-primary transition-colors hover:underline underline-offset-4"
            >
              Om Balgude
            </a>
          </div>

          <div className="w-px h-4 bg-border"></div>

          <div className="flex items-center gap-3">
            <a 
              href="https://github.com/ombalgude" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-accent rounded-full"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a 
              href="https://x.com/omm_0405" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-accent rounded-full"
              aria-label="Twitter"
            >
              <Twitter className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
