import type { NextApiRequest, NextApiResponse } from "next";
import { groq } from 'next-sanity';
import { Social } from "../../../typings";
import { sanityClient } from "../../sanity";
import { cache } from '../../lib/cache';

const query = groq`
    *[_type == 'social']
`
type Data = {
    socials: Social[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const cacheKey = 'socials';
    const cachedData = cache.get<Social[]>(cacheKey);

    if (cachedData) {
      return res.status(200).json({ socials: cachedData });
    }

    const socials: Social[] = await sanityClient.fetch(query);
    cache.set(cacheKey, socials);

    res.status(200).json({ socials });
  } catch (error) {
    console.error('Error fetching socials:', error);
    res.status(500).json({ socials: [] });
  }
}