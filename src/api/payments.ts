import client from './client';
import { PaymentMethod, PaymentRequest, PaymentResponse, PaymentHistory } from '../types/payment';

export const paymentsAPI = {
  // Process payment
  processPayment: async (paymentData: PaymentRequest): Promise<PaymentResponse> => {
    const response = await client.post('/payments/process', paymentData);
    return response.data;
  },

  // Get payment methods
  getPaymentMethods: async (): Promise<PaymentMethod[]> => {
    const response = await client.get('/payments/methods');
    return response.data;
  },

  // Add payment method
  addPaymentMethod: async (methodData: Omit<PaymentMethod, 'id'>): Promise<PaymentMethod> => {
    const response = await client.post('/payments/methods', methodData);
    return response.data;
  },

  // Remove payment method
  removePaymentMethod: async (methodId: string): Promise<void> => {
    await client.delete(`/payments/methods/${methodId}`);
  },

  // Set default payment method
  setDefaultPaymentMethod: async (methodId: string): Promise<void> => {
    await client.put(`/payments/methods/${methodId}/default`);
  },

  // Get payment history
  getPaymentHistory: async (page: number = 1, limit: number = 20): Promise<{
    payments: PaymentHistory[];
    total: number;
    page: number;
    limit: number;
  }> => {
    const response = await client.get('/payments/history', {
      params: { page, limit },
    });
    return response.data;
  },

  // Get payment details
  getPaymentDetails: async (paymentId: string): Promise<PaymentHistory> => {
    const response = await client.get(`/payments/${paymentId}`);
    return response.data;
  },

  // Refund payment
  refundPayment: async (paymentId: string, reason: string): Promise<PaymentResponse> => {
    const response = await client.post(`/payments/${paymentId}/refund`, { reason });
    return response.data;
  },

  // M-Pesa payment
  initiateMpesaPayment: async (phoneNumber: string, amount: number): Promise<{
    checkoutRequestId: string;
    merchantRequestId: string;
    responseCode: string;
    responseDescription: string;
  }> => {
    const response = await client.post('/payments/mpesa/initiate', {
      phoneNumber,
      amount,
    });
    return response.data;
  },

  // Check M-Pesa payment status
  checkMpesaPaymentStatus: async (checkoutRequestId: string): Promise<{
    status: 'pending' | 'completed' | 'failed';
    transactionId?: string;
    errorMessage?: string;
  }> => {
    const response = await client.get(`/payments/mpesa/status/${checkoutRequestId}`);
    return response.data;
  },

  // Get wallet balance
  getWalletBalance: async (): Promise<{
    balance: number;
    currency: string;
  }> => {
    const response = await client.get('/payments/wallet/balance');
    return response.data;
  },

  // Add wallet funds
  addWalletFunds: async (amount: number, paymentMethod: string): Promise<PaymentResponse> => {
    const response = await client.post('/payments/wallet/fund', {
      amount,
      paymentMethod,
    });
    return response.data;
  },
};

