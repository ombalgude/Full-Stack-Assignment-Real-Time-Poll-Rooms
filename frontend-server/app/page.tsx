import { Container } from '@/components/Container';
import Link from 'next/link';

export default function Home() {
  return (
    <Container>
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-20">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Real-Time Poll Rooms
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Create polls, share links, and watch results update in real-time.
            Simple, fast, and free.
          </p>
          
          <div className="flex gap-4 justify-center">
            <Link 
              href="/signup" 
              className="px-8 py-3 bg-blue-600 text-white rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Get Started Free
            </Link>
            <Link 
              href="/signin" 
              className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg text-lg font-medium hover:bg-blue-50 transition-colors"
            >
              Sign In
            </Link>
          </div>

          <p className="mt-6 text-sm text-gray-500">
            Sign up required to create polls
          </p>
        </div>

        <div className="mt-20 bg-white p-12 rounded-xl shadow-md">
          <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-bold mb-2">Create a Room</h3>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-bold mb-2">Launch a Poll</h3>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-bold mb-2">Share & Watch Results Real-Time</h3>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
