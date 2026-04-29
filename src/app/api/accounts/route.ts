import { Router } from 'next/router';
import { z } from 'zod';

interface AccountRequest {
  name: string;
  type: 'Business' | 'Freelance';
}

interface AccountResponse {
  id: string;
  name: string;
  type: 'Business' | 'Freelance';
}

const post = z.object({
  name: z.string(),
  type: z.string().oneOf(['Business', 'Freelance']),
});

const get = z.object({
  id: z.string().uuid(),
});

const accountsController = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const data = await post.parseAsync(req.body);
      const account = { id: data.id, name: data.name, type: data.type };
      res.status(201).json(account);
    } catch (error) {
      res.status(400).json({ error: 'Invalid request' });
    }
  } else if (req.method === 'GET') {
    try {
      const accountData = await get.parseAsync(req.query);
      const account = await fetch(`https://api.example.com/accounts/${accountData.id}`)
        .then((response) => response.json())
        .then((data) => data);
      res.json(account);
    } catch (error) {
      res.status(404).json({ error: 'Account not found' });
    }
  }
};

export default accountsController;