import type { NextApiRequest, NextApiResponse } from '@next/server';
import { Account, User } from '@/lib/automated-bookkeeper.schema';
import { GET, POST, OPTIONS } from 'next-server/api-router';
import { z } from 'zod';

/**
 * User management API
 */
export async function POST(req: NextApiRequest, res:ApiResponse) {
  const userSchema = z.object({
    email: z().email(),
    password: z.string().min(6).max128),
  });
  const decoded = userSchema.parse(await req.body());

  if (!decoded) {
    return res.status(400).json({ message: 'Invalid request' });
  }

  const user = {
    email: decoded.email,
    password: decoded.password,
  };

  await saveUser(user); // TO DO: implement saveUser function

  return res.status(201).json({ message 'User created successfully' });
}

async function saveUser(user: User) {
  // TO DO: implement saveUser function logic
  return Promise.resolve();
}

export async function OPTIONS(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).header('Access-Control-Allow-Origin', '*');
  return res;
}

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const accounts = await getAccounts();

  res.status(200).header('Access-Control-Allow-Origin', '*');
  res.json({ ok: true, data: accounts });
}

async function getAccounts() {
  // TO DO: implement getAccounts logic
  return Promise.resolve<Account[]>([]);
}