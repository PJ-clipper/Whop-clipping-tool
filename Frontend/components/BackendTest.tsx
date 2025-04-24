'use client';

import { useEffect, useState } from 'react';
import { api, ServerStatus } from '@/lib/api';

export function BackendTest() {
  const [message, setMessage] = useState<string>('Loading...');
  const [status, setStatus] = useState<ServerStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [helloResponse, statusResponse] = await Promise.all([
          api.getHello(),
          api.getStatus()
        ]);
        setMessage(helloResponse);
        setStatus(statusResponse);
        setError(null);
      } catch (err) {
        setError('Failed to connect to backend');
        setMessage('Error');
        setStatus(null);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Backend Connection Status</h2>
      
      {error ? (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="text-green-700 dark:text-green-400 font-medium">Connected</p>
            </div>
            <p className="mt-2 text-green-600 dark:text-green-300">Message: {message}</p>
          </div>

          {status && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">Server Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                  <p className="font-medium text-gray-900 dark:text-white">{status.status}</p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Version</p>
                  <p className="font-medium text-gray-900 dark:text-white">{status.version}</p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg col-span-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Last Updated</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {new Date(status.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Available Endpoints</h4>
                <div className="space-y-2">
                  {status.endpoints.map((endpoint: string, index: number) => (
                    <div 
                      key={index} 
                      className="p-2 bg-gray-50 dark:bg-gray-800 rounded-md text-sm text-gray-600 dark:text-gray-300"
                    >
                      {endpoint}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 