'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container } from '@/components/Container';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { authAPI } from '@/lib/api';
import Link from 'next/link';

export default function SignUpPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Signup
      await authAPI.signup(username, password);
      
      // Auto signin
      const { data } = await authAPI.signin(username, password);
      localStorage.setItem('token', data.token);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold mb-2">Create Account</h1>
          <p className="text-gray-600 mb-6">Join itsmyscreen to create polls</p>
          
          <form onSubmit={handleSubmit}>
            <Input
              label="Username"
              value={username}
              onChange={(e: any) => setUsername(e.target.value)}
              placeholder="Choose a username"
              required
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
              placeholder="Create a password"
              required
            />
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}
            
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? 'Creating account...' : 'Sign Up'}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/signin" className="text-blue-600 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </Container>
  );
}
