import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";

export function PollResults({ options, getPercentage }: any) {
  // Sort options by votes desc for better visualization? Or keep original order?
  // Keeping original order as per previous implementation is usually better to match options list.
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Live Results</h2>
      <div className="space-y-6">
        {options.map((option: any) => {
          const percentage = getPercentage(option.votes);
          return (
            <div key={option.id} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-base">{option.text}</span>
                <span className="text-muted-foreground">
                  {option.votes} ({percentage}%)
                </span>
              </div>
              <Progress value={percentage} className="h-3" />
            </div>
          );
        })}
      </div>
      
      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-center">
        <p className="text-primary font-medium">
          ✓ Your vote has been recorded. Results update in real-time!
        </p>
      </div>
    </div>
  );
}
