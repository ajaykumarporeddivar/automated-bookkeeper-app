import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

interface UserRequest {
  _id: string;
}

interface UserResponse {
  id: string;
  name: string;
  email: string;
}

const get = z.object({
  _id: z.string(),
});

const usersController = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const user = {
        id: req._id,
        name: 'John Doe',
        email: 'johndoe@example.com',
      };
      res.json(user);
    } catch (error) {
      res.status(404).json({ error: 'User not found' });
    }
  }
};

export default usersController;