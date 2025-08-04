'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';

export default function AddProduct() {
  const [name, setName] = useState('');
  const [bought, setBought] = useState('');
  const [expires, setExpires] = useState('');
  const [priority, setPriority] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  const addProduct = async () => {
    if (!name.trim() || !bought || !expires) {
      alert('Please fill in all fields.');
      return;
    }

    if (!user) {
      alert('You must be logged in to add items.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/inventory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          bought,
          expires,
          priority
        }),
      });

      if (response.ok) {
        router.push('/');
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to add product. Please try again.');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Add a New Product</h2>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Product Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Butter"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="bought" className="block text-sm font-medium text-gray-700 mb-2">
              Bought On:
            </label>
            <input
              type="date"
              id="bought"
              value={bought}
              onChange={(e) => setBought(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="expires" className="block text-sm font-medium text-gray-700 mb-2">
              Expires On:
            </label>
            <input
              type="date"
              id="expires"
              value={expires}
              onChange={(e) => setExpires(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
              Priority (1-5):
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value={1}>1 - Very High</option>
              <option value={2}>2 - High</option>
              <option value={3}>3 - Medium</option>
              <option value={4}>4 - Low</option>
              <option value={5}>5 - Very Low</option>
            </select>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={addProduct}
            disabled={isLoading}
            className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors font-medium disabled:opacity-50"
          >
            {isLoading ? 'Adding...' : 'Add'}
          </button>
          <Link href="/" className="flex-1">
            <button className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors font-medium">
              Cancel
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
