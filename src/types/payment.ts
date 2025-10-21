export type PaymentMethod = 'mpesa' | 'cash' | 'card' | 'wallet';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'cancelled' | 'refunded';

export interface PaymentMethod {
  id: string;
  type: PaymentMethod;
  name: string;
  isDefault: boolean;
  details: {
    // For M-Pesa
    phoneNumber?: string;
    // For Card
    lastFour?: string;
    brand?: string;
    expiryMonth?: number;
    expiryYear?: number;
    // For Wallet
    balance?: number;
  };
  createdAt: string;
}

export interface PaymentRequest {
  amount: number;
  method: PaymentMethod;
  rideId?: string;
  phoneNumber?: string; // For M-Pesa
  cardId?: string; // For card payments
  description?: string;
}

export interface PaymentResponse {
  id: string;
  status: PaymentStatus;
  amount: number;
  method: PaymentMethod;
  transactionId?: string;
  checkoutRequestId?: string; // For M-Pesa
  merchantRequestId?: string; // For M-Pesa
  responseCode?: string; // For M-Pesa
  responseDescription?: string; // For M-Pesa
  createdAt: string;
  completedAt?: string;
  failureReason?: string;
}

export interface PaymentHistory {
  id: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  description: string;
  rideId?: string;
  transactionId?: string;
  createdAt: string;
  completedAt?: string;
  failureReason?: string;
}

export interface MpesaPayment {
  phoneNumber: string;
  amount: number;
  checkoutRequestId: string;
  merchantRequestId: string;
  responseCode: string;
  responseDescription: string;
  status: 'pending' | 'completed' | 'failed';
  transactionId?: string;
  createdAt: string;
  completedAt?: string;
}

export interface Wallet {
  balance: number;
  currency: string;
  transactions: Array<{
    id: string;
    type: 'credit' | 'debit';
    amount: number;
    description: string;
    createdAt: string;
  }>;
}

export interface RefundRequest {
  paymentId: string;
  amount: number;
  reason: string;
}

export interface RefundResponse {
  id: string;
  paymentId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  reason: string;
  createdAt: string;
  completedAt?: string;
  failureReason?: string;
}

