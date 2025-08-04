'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from './contexts/AuthContext';
import { InventoryItem } from './lib/types';

export default function Home() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const [inventoryData, setInventoryData] = useState<InventoryItem[]>([]);
  const [sortBy, setSortBy] = useState<string>('');
  const [isLoadingInventory, setIsLoadingInventory] = useState(true);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth');
    }
  }, [user, isLoading, router]);

  // Load inventory data from database
  useEffect(() => {
    if (user) {
      loadInventory();
    }
  }, [user]);

  const loadInventory = async () => {
    try {
      setIsLoadingInventory(true);
      const response = await fetch('/api/inventory');
      if (response.ok) {
        const data = await response.json();
        setInventoryData(data.inventory);
      } else {
        console.error('Failed to load inventory');
      }
    } catch (error) {
      console.error('Error loading inventory:', error);
    } finally {
      setIsLoadingInventory(false);
    }
  };

  const deleteItem = async (uuid: string) => {
    try {
      const response = await fetch(`/api/inventory/${uuid}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setInventoryData(inventoryData.filter(item => item.uuid !== uuid));
      } else {
        console.error('Failed to delete item');
        alert('Failed to delete item. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete item. Please try again.');
    }
  };

  const sortItems = (sortType: string) => {
    const sortedData = [...inventoryData];
    
    switch (sortType) {
      case 'expiration':
        sortedData.sort((a, b) => new Date(a.expires).getTime() - new Date(b.expires).getTime());
        break;
      case 'bought':
        sortedData.sort((a, b) => new Date(a.bought).getTime() - new Date(b.bought).getTime());
        break;
      case 'priority':
        sortedData.sort((a, b) => a.priority - b.priority);
        break;
      default:
        break;
    }
    
    setInventoryData(sortedData);
    setSortBy(sortType);
  };

  const isExpired = (expirationDate: Date) => {
    return new Date(expirationDate).getTime() < new Date().setHours(0, 0, 0, 0);
  };

  if (isLoading || isLoadingInventory) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to auth page
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-16 bg-white flex flex-col items-center py-5 gap-5 border-r border-gray-300">

        <a href="https://www.flaticon.com/free-icons/glass-jar" title="glass jar icons" target="_blank" rel="noopener noreferrer">
          <Image src="/images/glass-jar.png" alt="Glass jar icons created by Iconjam - Flaticon" width={30} height={30} className="opacity-60" />
        </a>

        <a href="https://www.flaticon.com/free-icons/jam" title="jam icons" target="_blank" rel="noopener noreferrer">
          <Image src="/images/jam.png" alt="Jam icons created by Freepik - Flaticon" width={30} height={30} className="opacity-60" />
        </a>

        <a href="https://www.flaticon.com/free-icons/milk" title="milk icons" target="_blank" rel="noopener noreferrer">
          <Image src="/images/milk.png" alt="Milk icons created by Freepik - Flaticon" width={30} height={30} className="opacity-60" />
        </a>

        <a href="https://www.flaticon.com/free-icons/market" title="market icons" target="_blank" rel="noopener noreferrer">
          <Image src="/images/market.png" alt="Market icons created by mynamepong - Flaticon" width={30} height={30} className="opacity-60" />
        </a>

      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <div>
            <h1 className="text-2xl font-bold">Xspire</h1>
            <p className="text-gray-600">Welcome back, {user.name}!</p>
          </div>
          <div className="flex gap-2">
            <Link href="/add">
              <button className="px-4 py-2 text-sm bg-green-600 text-white border-none rounded-lg cursor-pointer hover:bg-green-700 transition-colors">
                Add Item
              </button>
            </Link>
            <button
              onClick={logout}
              className="px-4 py-2 text-sm bg-gray-600 text-white border-none rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Inventory Grid */}
        <div className="grid gap-4 mb-8">
          {inventoryData.map((item) => (
            <div
              key={item.uuid}
              className={`bg-white p-4 rounded-lg shadow-sm border flex justify-between items-center ${
                isExpired(item.expires) ? 'border-red-500 bg-red-50' : 'border-gray-200'
              }`}
            >
              <div>
                <div className="font-semibold text-lg">{item.name}</div>
                <div className="text-gray-600 text-sm">
                  Bought: {new Date(item.bought).toDateString()} | Expires: {new Date(item.expires).toDateString()}
                </div>
              </div>
              <div>
                <button
                  onClick={() => deleteItem(item.uuid)}
                  className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Sort Box */}
        <div className="bg-white p-4 rounded-lg shadow-sm max-w-xs">
          <h4 className="font-semibold mb-3">Sort</h4>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => sortItems('expiration')}
              className={`p-2 text-left rounded hover:bg-gray-100 transition-colors ${
                sortBy === 'expiration' ? 'bg-gray-100' : ''
              }`}
            >
              Expiration
            </button>
            <button
              onClick={() => sortItems('bought')}
              className={`p-2 text-left rounded hover:bg-gray-100 transition-colors ${
                sortBy === 'bought' ? 'bg-gray-100' : ''
              }`}
            >
              Bought
            </button>
            <button
              onClick={() => sortItems('priority')}
              className={`p-2 text-left rounded hover:bg-gray-100 transition-colors ${
                sortBy === 'priority' ? 'bg-gray-100' : ''
              }`}
            >
              Priority
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
