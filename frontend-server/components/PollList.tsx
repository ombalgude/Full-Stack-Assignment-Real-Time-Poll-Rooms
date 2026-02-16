import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function PollList({ polls, onPollClick }: any) {
  if (polls.length === 0) {
    return (
      <div className="text-center py-16 bg-muted/30 rounded-lg border border-dashed text-muted-foreground">
        <h3 className="text-xl font-semibold mb-2">No polls yet</h3>
        <p>Create the first poll to get started</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {polls.map((poll: any) => (
        <Card 
          key={poll.id}
          className="cursor-pointer hover:shadow-md transition-all hover:border-primary/50"
          onClick={() => onPollClick(poll.id)}
        >
          <CardHeader>
            <CardTitle className="text-lg line-clamp-2">{poll.question}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                📝 {poll.options.length} options
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                🗳️ {poll.options.reduce((sum: number, o: any) => sum + (o._count?.votes || 0), 0)} votes
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
