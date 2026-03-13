import { createContext, useContext, useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';

const OrderContext = createContext();

const STORAGE_KEY = 'fendo_orders';
const CHANNEL_NAME = 'fendo_orders_channel';

export function useOrder() {
  return useContext(OrderContext);
}

export function OrderProvider({ children }) {
  const channelRef = useRef(null);
  const skipSyncRef = useRef(false);
  const emailInitRef = useRef(false);

  const normalizeOrderId = (value) => String(value ?? '').trim().toUpperCase();

  const emailConfig = {
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    adminTemplateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ADMIN,
    receiptTemplateId: import.meta.env.VITE_EMAILJS_TEMPLATE_RECEIPT,
    adminEmail: import.meta.env.VITE_ADMIN_EMAIL,
  };

  const canSendEmail = Boolean(
    emailConfig.publicKey &&
      emailConfig.serviceId &&
      emailConfig.adminTemplateId &&
      emailConfig.receiptTemplateId &&
      emailConfig.adminEmail
  );

  const ensureEmailInit = () => {
    if (!canSendEmail) return false;
    if (emailInitRef.current) return true;
    emailjs.init({ publicKey: emailConfig.publicKey });
    emailInitRef.current = true;
    return true;
  };

  const formatItems = (items) => {
    if (!Array.isArray(items)) return '';
    return items.map((item) => `${item.quantity}x ${item.name} (₦${Number(item.price || 0).toLocaleString()})`).join(', ');
  };

  const sendAdminOrderEmail = async (order) => {
    if (!ensureEmailInit()) return;
    try {
      await emailjs.send(emailConfig.serviceId, emailConfig.adminTemplateId, {
        admin_email: emailConfig.adminEmail,
        order_id: order.id,
        customer_name: order.customerDetails?.name || '',
        customer_phone: order.customerDetails?.phone || '',
        customer_email: order.customerDetails?.email || '',
        delivery_address: order.customerDetails?.address || '',
        total_amount: `₦${Number(order.total || 0).toLocaleString()}`,
        items: formatItems(order.items),
        created_at: new Date(order.createdAt).toLocaleString(),
        status: order.status,
      });
    } catch {
      return;
    }
  };

  const sendDeliveryReceiptEmail = async (order) => {
    if (!ensureEmailInit()) return;
    const recipientEmail = order.customerDetails?.email;
    if (!recipientEmail) return;

    try {
      await emailjs.send(emailConfig.serviceId, emailConfig.receiptTemplateId, {
        to_email: recipientEmail,
        order_id: order.id,
        customer_name: order.customerDetails?.name || '',
        total_amount: `₦${Number(order.total || 0).toLocaleString()}`,
        items: formatItems(order.items),
        delivered_at: new Date(order.updatedAt || new Date().toISOString()).toLocaleString(),
        status: order.status,
      });
    } catch {
      return;
    }
  };

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
      customerDetails: {
        ...customerDetails,
        email: String(customerDetails?.email ?? '').trim(),
      },
      status: 'payment_review', // Initial status after user clicks "Payment Made"
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setOrders((prev) => [newOrder, ...prev]);
    sendAdminOrderEmail(newOrder);
    return newOrder.id;
  };

  // Update order status (Admin action)
  const updateOrderStatus = (orderId, newStatus) => {
    const normalizedOrderId = normalizeOrderId(orderId);
    const existingOrder = orders.find((order) => normalizeOrderId(order.id) === normalizedOrderId);
    const nextUpdatedAt = new Date().toISOString();
    const receiptCandidate =
      newStatus === 'delivered' && existingOrder
        ? { ...existingOrder, status: newStatus, updatedAt: nextUpdatedAt }
        : null;

    setOrders((prev) =>
      prev.map((order) =>
        normalizeOrderId(order.id) === normalizedOrderId
          ? { ...order, status: newStatus, updatedAt: nextUpdatedAt }
          : order
      )
    );

    if (receiptCandidate) {
      sendDeliveryReceiptEmail(receiptCandidate);
    }
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
