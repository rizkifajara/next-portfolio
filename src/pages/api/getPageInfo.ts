import type { NextApiRequest, NextApiResponse } from "next";
import { groq } from 'next-sanity';
import { PageInfo } from "../../../typings";
import { sanityClient } from "../../sanity";
import { cache } from '../../lib/cache';

const query = groq`
    *[_type == 'pageInfo'][0]
`
type Data = {
    pageInfo: PageInfo[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const cacheKey = 'pageInfo';
    const cachedData = cache.get<PageInfo[]>(cacheKey);

    if (cachedData) {
      return res.status(200).json({ pageInfo: cachedData });
    }

    const pageInfo: PageInfo[] = await sanityClient.fetch(query);
    cache.set(cacheKey, pageInfo);

    res.status(200).json({ pageInfo });
  } catch (error) {
    console.error('Error fetching pageInfo:', error);
    res.status(500).json({ pageInfo: [] });
  }
}