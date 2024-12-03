import type { NextApiRequest, NextApiResponse } from "next";
import { groq } from 'next-sanity';
import { Experience } from "../../../typings";
import { sanityClient } from "../../sanity";
import { cache } from '../../lib/cache';

const query = groq`
    *[_type == 'experience'] | order(order asc) {
        ...,
        technologies[]->
    }
`

type Data = {
    experiences: Experience[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const cacheKey = 'experiences';
    const cachedData = cache.get<Experience[]>(cacheKey);

    if (cachedData) {
      return res.status(200).json({ experiences: cachedData });
    }

    const experiences: Experience[] = await sanityClient.fetch(query);
    cache.set(cacheKey, experiences);

    res.status(200).json({ experiences });
  } catch (error) {
    console.error('Error fetching experiences:', error);
    res.status(500).json({ experiences: [] });
  }
}