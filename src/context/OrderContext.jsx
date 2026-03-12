import { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export function useOrder() {
  return useContext(OrderContext);
}

export function OrderProvider({ children }) {
  // Initialize from localStorage if available
  const [orders, setOrders] = useState(() => {
    try {
      const storedOrders = localStorage.getItem('fendo_orders');
      return storedOrders ? JSON.parse(storedOrders) : [];
    } catch (error) {
      console.error('Failed to load orders from localStorage:', error);
      return [];
    }
  });

  // Save to localStorage whenever orders change
  useEffect(() => {
    try {
      localStorage.setItem('fendo_orders', JSON.stringify(orders));
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
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? { ...order, status: newStatus, updatedAt: new Date().toISOString() }
          : order
      )
    );
  };

  // Get order by ID
  const getOrder = (orderId) => {
    return orders.find((order) => order.id === orderId);
  };

  return (
    <OrderContext.Provider value={{ orders, createOrder, updateOrderStatus, getOrder }}>
      {children}
    </OrderContext.Provider>
  );
}
