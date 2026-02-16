'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Container } from '@/components/Container';
import { Button } from '@/components/Button';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { PageHeader } from '@/components/PageHeader';
import { CreatePollForm } from '@/components/CreatePollForm';
import { PollList } from '@/components/PollList';
import { roomAPI, pollAPI } from '@/lib/api';

const WS_URL = 'ws://localhost:8080';

export default function RoomPage() {
  const params = useParams();
  const router = useRouter();
  const roomId = parseInt(params.id as string);
  
  const [room, setRoom] = useState<any>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadRoom();
    
    // WebSocket for real-time updates
    const ws = new WebSocket(WS_URL);
    ws.onopen = () => {
      ws.send(JSON.stringify({ type: 'join_room', roomId }));
    };
    ws.onmessage = () => loadRoom();
    
    return () => ws.close();
  }, [roomId]);

  const loadRoom = async () => {
    try {
      const { data } = await roomAPI.get(roomId);
      setRoom(data);
    } catch (err) {
      alert('Failed to load room');
    }
  };

  const handleCreatePoll = async (question: string, options: string[]) => {
    setLoading(true);
    try {
      await pollAPI.create(question, roomId, options);
      setShowCreate(false);
      loadRoom();
    } catch (err) {
      alert('Failed to create poll');
    } finally {
      setLoading(false);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('✓ Link copied to clipboard!');
  };

  if (!room) {
    return (
      <Container>
        <LoadingSpinner message="Loading room..." />
      </Container>
    );
  }

  return (
    <Container>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <PageHeader 
          title={room.name}
          subtitle={`Created by ${room.creator.username}`}
          onShare={copyLink}
        />

        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Polls</h2>
            <Button onClick={() => setShowCreate(!showCreate)}>
              {showCreate ? 'Cancel' : '+ Create Poll'}
            </Button>
          </div>

          {showCreate && (
            <CreatePollForm onSubmit={handleCreatePoll} loading={loading} />
          )}

          <PollList 
            polls={room.polls} 
            onPollClick={(id: number) => router.push(`/poll/${id}`)} 
          />
        </div>
      </div>
    </Container>
  );
}
