import React, { useState } from 'react';
import ConfessionForm from '../components/ConfessionForm';
import ConfessionList from '../components/ConfessionList';

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-200 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-900 text-center">
        Anonymous Confession Wall
      </h1>
      <ConfessionForm onPost={() => setRefreshKey(k => k + 1)} />
      <ConfessionList key={refreshKey} />
    </div>
  );
}
