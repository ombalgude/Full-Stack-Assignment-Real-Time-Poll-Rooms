import { Progress } from "@/components/ui/progress";

export function PollResults({ options, getPercentage }: any) {
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Live Results</h2>
        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
          {options.reduce((acc: number, curr: any) => acc + curr.votes, 0)} Total Votes
        </span>
      </div>
      
      <div className="space-y-6">
        {options.map((option: any) => {
          const percentage = getPercentage(option.votes);
          const maxVotes = Math.max(...options.map((o: any) => o.votes));
          const isWinner = option.votes === maxVotes && maxVotes > 0;
          
          return (
            <div key={option.id} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className={`font-medium text-base flex items-center gap-2 ${isWinner ? 'text-primary' : ''}`}>
                  {option.text}
                  {isWinner && <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">Leads</span>}
                </span>
                <span className="text-muted-foreground">
                  {option.votes} ({percentage}%)
                </span>
              </div>
              <Progress 
                value={percentage} 
                className={`h-3 ${isWinner ? '[&>div]:bg-primary' : '[&>div]:bg-muted-foreground/30'}`} 
              />
            </div>
          );
        })}
      </div>
      
      <div className="bg-muted/50 border border-border rounded-lg p-4 text-center">
        <p className="text-muted-foreground font-medium flex items-center justify-center gap-2">
           <span>✨</span> Results update in real-time!
        </p>
      </div>
    </div>
  );
}
