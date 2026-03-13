import { createContext, useContext, useState, useEffect, useRef } from 'react';

const OrderContext = createContext();

const STORAGE_KEY = 'fendo_orders';
const CHANNEL_NAME = 'fendo_orders_channel';

export function useOrder() {
  return useContext(OrderContext);
}

export function OrderProvider({ children }) {
  const channelRef = useRef(null);
  const skipSyncRef = useRef(false);

  const normalizeOrderId = (value) => String(value ?? '').trim().toUpperCase();

  // Initialize from localStorage if available
  const [orders, setOrders] = useState(() => {
    try {
      const storedOrders = localStorage.getItem(STORAGE_KEY);
      return storedOrders ? JSON.parse(storedOrders) : [];
    } catch (error) {
      console.error('Failed to load orders from localStorage:', error);
      return [];
    }
  });

  useEffect(() => {
    if (typeof BroadcastChannel === 'undefined') return;
    const channel = new BroadcastChannel(CHANNEL_NAME);
    channelRef.current = channel;

    const handleMessage = (event) => {
      const message = event?.data;
      if (!message || message.type !== 'orders_updated') return;

      skipSyncRef.current = true;
      setOrders(Array.isArray(message.orders) ? message.orders : []);
    };

    channel.addEventListener('message', handleMessage);
    return () => {
      channel.removeEventListener('message', handleMessage);
      channel.close();
      if (channelRef.current === channel) channelRef.current = null;
    };
  }, []);

  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key !== STORAGE_KEY) return;
      if (event.newValue == null) return;

      try {
        const nextOrders = JSON.parse(event.newValue);
        if (!Array.isArray(nextOrders)) return;
        skipSyncRef.current = true;
        setOrders(nextOrders);
      } catch {
        return;
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  useEffect(() => {
    if (skipSyncRef.current) {
      skipSyncRef.current = false;
      return;
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
      channelRef.current?.postMessage({ type: 'orders_updated', orders });
    } catch (error) {
      console.error('Failed to save orders to localStorage:', error);
    }
  }, [orders]);

  // Create a new order
  const createOrder = (items, total, customerDetails) => {
    const newOrder = {
      id: 'ORD-' + Math.floor(100000 + Math.random() * 900000), // Random 6-digit ID
      items,
      total,
      customerDetails,
      status: 'payment_review', // Initial status after user clicks "Payment Made"
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder.id;
  };

  // Update order status (Admin action)
  const updateOrderStatus = (orderId, newStatus) => {
    const normalizedOrderId = normalizeOrderId(orderId);
    setOrders((prev) =>
      prev.map((order) =>
        normalizeOrderId(order.id) === normalizedOrderId
          ? { ...order, status: newStatus, updatedAt: new Date().toISOString() }
          : order
      )
    );
  };

  // Get order by ID
  const getOrder = (orderId) => {
    const normalizedOrderId = normalizeOrderId(orderId);
    return orders.find((order) => normalizeOrderId(order.id) === normalizedOrderId);
  };

  return (
    <OrderContext.Provider value={{ orders, createOrder, updateOrderStatus, getOrder }}>
      {children}
    </OrderContext.Provider>
  );
}
