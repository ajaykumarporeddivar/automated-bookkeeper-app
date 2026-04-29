import { Router } from 'next/router';
import { z } from 'zod';

interface TransactionRequest {
  accountId: string;
  amount: number;
  date: Date;
}

interface TransactionResponse {
  id: string;
  accountId: string;
  amount: number;
  date: Date;
}

const post = z.object({
  accountId: z.string(),
  amount: z.number(),
  date: z.date(),
});

const get = z.object({
  id: z.string().uuid(),
});

const transactionsController = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const data = await post.parseAsync(req.body);
      const transaction = {
        id: data.id,
        accountId: data.accountId,
        amount: data.amount,
        date: data.date,
      };
      res.status(201).json(transaction);
    } catch (error) {
      res.status(400).json({ error: 'Invalid request' });
    }
  } else if (req.method === 'GET') {
    try {
      const transactionData = await get.parseAsync(req.query);
      const transaction = await fetch(`https://api.example.com/transactions/${transactionData.id}`)
        .then((response) => response.json())
        .then((data) => data);
      res.json(transaction);
    } catch (error) {
      res.status(404).json({ error: 'Transaction not found' });
    }
  }
};

export default transactionsController;