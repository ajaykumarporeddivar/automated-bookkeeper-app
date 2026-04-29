import { z } from 'zod';

// Account represents a user's account information
export interface Account {
  id: string;
  userId: string;
  name: string;
  type: 'Business' | 'Freelance';
}

// Transaction represents a financial transaction
export interface Transaction {
  id: string;
  accountId: string;
  amount: z.number;
  date: z.date;
}