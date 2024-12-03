import type { NextApiRequest, NextApiResponse } from "next";
import { cache } from '../../lib/cache';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (process.env.NODE_ENV === 'development') {
    cache.flushAll();
    res.status(200).json({ message: 'Cache cleared' });
  } else {
    res.status(403).json({ message: 'Forbidden' });
  }
}