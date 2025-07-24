'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AddProduct() {
  const [name, setName] = useState('');
  const [bought, setBought] = useState('');
  const [expires, setExpires] = useState('');
  const router = useRouter();

  const addProduct = () => {
    if (!name.trim() || !bought || !expires) {
      alert('Please fill in all fields.');
      return;
    }

    const newProduct = {
      name: name.trim(),
      bought,
      expires,
      priority: 1, // Default priority
      uid: `${name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}` // Generate unique ID
    };

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem('products') || '[]');
    existing.push(newProduct);
    localStorage.setItem('products', JSON.stringify(existing));

    // Redirect back to main page
    router.push('/');
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
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={addProduct}
            className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors font-medium"
          >
            Add
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
