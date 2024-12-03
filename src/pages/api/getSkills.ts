import type { NextApiRequest, NextApiResponse } from "next";
import { groq } from 'next-sanity';
import { Skill } from "../../../typings";
import { sanityClient } from "../../sanity";
import { cache } from '../../lib/cache';

const query = groq`
    *[_type == 'skill']
`
type Data = {
    skills: Skill[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const cacheKey = 'skills';
    const cachedData = cache.get<Skill[]>(cacheKey);

    if (cachedData) {
      return res.status(200).json({ skills: cachedData });
    }

    const skills: Skill[] = await sanityClient.fetch(query);
    cache.set(cacheKey, skills);

    res.status(200).json({ skills });
  } catch (error) {
    console.error('Error fetching skills:', error);
    res.status(500).json({ skills: [] });
  }
}