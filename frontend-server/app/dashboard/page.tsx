'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container } from '@/components/Container';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { roomAPI } from '@/lib/api';

export default function DashboardPage() {
  const router = useRouter();
  const [roomName, setRoomName] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.push('/signin');
    }
  }, [router]);

  const createRoom = async () => {
    setLoading(true);
    try {
      const { data } = await roomAPI.create(roomName || 'Untitled Room');
      router.push(`/room/${data.roomId}`);
    } catch (err) {
      alert('Failed to create room');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
        
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Your Rooms</h2>
            <Button onClick={() => setShowCreate(!showCreate)}>
              {showCreate ? 'Cancel' : '+ Create Room'}
            </Button>
          </div>

          {showCreate && (
            <div className="mb-6 p-6 bg-gray-50 rounded-lg">
              <Input
                label="Room Name (optional)"
                placeholder="e.g., Team Meeting, Class Poll"
                value={roomName}
                onChange={(e: any) => setRoomName(e.target.value)}
              />
              <Button onClick={createRoom} disabled={loading}>
                {loading ? 'Creating...' : 'Create Room'}
              </Button>
            </div>
          )}

          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No rooms yet
            </h3>
            <p className="text-gray-600">
              Create your first room to start organizing polls
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
