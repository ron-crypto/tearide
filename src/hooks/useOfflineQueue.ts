import { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { getItem, setItem } from '../utils/storage';

interface QueuedRequest {
  id: string;
  method: string;
  url: string;
  data?: any;
  timestamp: number;
  retries: number;
}

interface UseOfflineQueueReturn {
  isOnline: boolean;
  queueLength: number;
  addToQueue: (request: Omit<QueuedRequest, 'id' | 'timestamp' | 'retries'>) => void;
  processQueue: () => Promise<void>;
  clearQueue: () => void;
}

const QUEUE_KEY = 'offline_queue';
const MAX_RETRIES = 3;

export const useOfflineQueue = (): UseOfflineQueueReturn => {
  const [isOnline, setIsOnline] = useState(true);
  const [queue, setQueue] = useState<QueuedRequest[]>([]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOnline(state.isConnected ?? false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    loadQueue();
  }, []);

  useEffect(() => {
    if (isOnline && queue.length > 0) {
      processQueue();
    }
  }, [isOnline, queue.length]);

  const loadQueue = async () => {
    try {
      const savedQueue = await getItem(QUEUE_KEY);
      if (savedQueue) {
        setQueue(JSON.parse(savedQueue));
      }
    } catch (error) {
      console.error('Failed to load offline queue:', error);
    }
  };

  const saveQueue = async (newQueue: QueuedRequest[]) => {
    try {
      await setItem(QUEUE_KEY, JSON.stringify(newQueue));
      setQueue(newQueue);
    } catch (error) {
      console.error('Failed to save offline queue:', error);
    }
  };

  const addToQueue = (request: Omit<QueuedRequest, 'id' | 'timestamp' | 'retries'>) => {
    const queuedRequest: QueuedRequest = {
      ...request,
      id: Date.now().toString(),
      timestamp: Date.now(),
      retries: 0,
    };

    const newQueue = [...queue, queuedRequest];
    saveQueue(newQueue);
  };

  const processQueue = async () => {
    if (!isOnline || queue.length === 0) return;

    const requestsToProcess = [...queue];
    const processedRequests: QueuedRequest[] = [];
    const failedRequests: QueuedRequest[] = [];

    for (const request of requestsToProcess) {
      try {
        // Simulate API call
        await simulateApiCall(request);
        // Request succeeded, don't add to processed requests
      } catch (error) {
        if (request.retries < MAX_RETRIES) {
          // Retry later
          failedRequests.push({
            ...request,
            retries: request.retries + 1,
          });
        } else {
          // Max retries reached, remove from queue
          console.error('Request failed after max retries:', request);
        }
      }
    }

    // Update queue with failed requests
    saveQueue(failedRequests);
  };

  const simulateApiCall = async (request: QueuedRequest): Promise<void> => {
    // This would be replaced with actual API calls
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.3) {
          resolve();
        } else {
          reject(new Error('Simulated API failure'));
        }
      }, 1000);
    });
  };

  const clearQueue = async () => {
    try {
      await setItem(QUEUE_KEY, JSON.stringify([]));
      setQueue([]);
    } catch (error) {
      console.error('Failed to clear offline queue:', error);
    }
  };

  return {
    isOnline,
    queueLength: queue.length,
    addToQueue,
    processQueue,
    clearQueue,
  };
};

