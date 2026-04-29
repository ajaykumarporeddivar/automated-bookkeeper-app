import type { NextApiRequest, NextApiResponse } from '@next/server';
import { Account, User } from '@/lib/automated-bookkeeper.schema';
import { GET, POST, OPTIONS } from 'next-server/api-router';
import { z } from 'zod';

/**
 * User role management API
 */
export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const roleSchema = z.object({
    user_id: z.string().uuid(),
    role: z.string().oneOf(['admin', 'manager', 'user']),
  });
  const decoded = roleSchema.parse(await req.body());

  if (!decoded) {
    return res.status(400).json({ message: 'Invalid request' });
  }

  const userRole = {
    user_id: decoded.user_id,
    role: decoded.role,
  };

  await saveUserRole(userRole); // TO DO: implement saveUserRole function

  return res.status(201).json({ message: 'User role created successfully' });
}

async function saveUserRole(userRole: User) {
  // TO DO: implement saveUserRole function logic
  return Promise.resolve();
}

export async function OPTIONS(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).header('Access-Control-Allow-Origin', '*');
  return res;
}

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const roles = await getRoles();

  res.status(200).header('Access-Control-Allow-Origin', '*');
  res.json({ ok: true, data: roles });
}

async function getRoles() {
  // TO DO: implement getRoles logic
  return Promise.resolve<User[]>([]);
}