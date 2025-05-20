import type { NextApiRequest, NextApiResponse } from "next";
import { groq } from 'next-sanity';
import { Project } from "../../../typings";
import { sanityClient } from "../../sanity";
import { cache } from '../../lib/cache';

const query = groq`
    *[_type == 'project'] | order(order asc) {
        ...,
        technologies[]->,
        "screenshots": screenshots[] {
            _type,
            asset-> {
                _id,
                url
            }
        }
    }
`
type Data = {
    projects: Project[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const cacheKey = 'projects';
    const cachedData = cache.get<Project[]>(cacheKey);

    if (cachedData) {
      return res.status(200).json({ projects: cachedData });
    }

    const projects: Project[] = await sanityClient.fetch(query);
    cache.set(cacheKey, projects);

    res.status(200).json({ projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ projects: [] });
  }
}