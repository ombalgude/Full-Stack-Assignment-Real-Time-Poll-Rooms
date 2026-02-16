'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Container } from '@/components/Container';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { PageHeader } from '@/components/PageHeader';
import { VotingForm } from '@/components/VotingForm';
import { PollResults } from '@/components/PollResults';
import { pollAPI } from '@/lib/api';

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3000';

export default function PollPage() {
  const params = useParams();
  const router = useRouter();
  const pollId = parseInt(params.id as string);
  
  const [poll, setPoll] = useState<any>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadPoll = useCallback(async () => {
    try {
      const { data } = await pollAPI.get(pollId);
      setPoll(data);
    } catch {
      alert('Failed to load poll');
    }
  }, [pollId]);

  useEffect(() => {
    loadPoll();
    
    // WebSocket for real-time updates
    const ws = new WebSocket(WS_URL);
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'poll_updated' && data.payload.pollId === pollId) {
        setPoll((prev: any) => {
          if (!prev) return prev;
          return {
            ...prev,
            options: prev.options.map((opt: any) => {
              const updated = data.payload.options.find((o: any) => o.id === opt.id);
              return updated ? { ...opt, votes: updated.votes } : opt;
            }),
          };
        });
      }
    };
    
    return () => ws.close();
  }, [pollId, loadPoll]);

  const handleVote = async () => {
    if (!selected) return;
    
    if (!localStorage.getItem('token')) {
      router.push(`/signin?redirect=/poll/${pollId}`);
      return;
    }

    setLoading(true);
    try {
      await pollAPI.vote(pollId, selected);
      setHasVoted(true);
      loadPoll();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to vote. You may have already voted.');
    } finally {
      setLoading(false);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('✓ Poll link copied to clipboard!');
  };

  const getTotalVotes = () => {
    return poll?.options.reduce((sum: number, o: any) => sum + o.votes, 0) || 0;
  };

  const getPercentage = (votes: number) => {
    const total = getTotalVotes();
    return total === 0 ? 0 : Math.round((votes / total) * 100);
  };

  if (!poll) {
    return (
      <Container>
        <LoadingSpinner message="Loading poll..." />
      </Container>
    );
  }

  const totalVotes = getTotalVotes();

  return (
    <Container>
      <div className="relative min-h-[calc(100vh-80px)] flex flex-col items-center justify-center py-12 px-4">
        {/* Background Gradients */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_right,var(--tw-gradient-stops))] from-blue-500/10 via-background to-background"></div>

        <div className="w-full max-w-3xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="text-center space-y-4">
            <PageHeader
              title={poll.question}
              subtitle={poll.description || `Created by ${poll.creator}`}
              onShare={copyLink}
            />
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 border border-border text-sm font-medium text-muted-foreground">

              <span className='px-2'>{totalVotes} {totalVotes === 1 ? 'vote' : 'votes'} cast</span>
            </div>
          </div>

          <div className="bg-card/50 backdrop-blur-sm border border-border/60 p-6 md:p-8 rounded-2xl shadow-2xl shadow-primary/5 ring-1 ring-border/50">
            {!hasVoted ? (
              <VotingForm
                question={poll.question}
                options={poll.options}
                selected={selected}
                onSelect={setSelected}
                onSubmit={handleVote}
                loading={loading}
                isLoggedIn={!!localStorage.getItem('token')}
              />
            ) : (
              <PollResults
                options={poll.options}
                getPercentage={getPercentage}
              />
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
