import type { NextApiRequest, NextApiResponse } from "next";
import { groq } from 'next-sanity';
import { sanityClient } from "../../sanity";

const query = groq`
  *[_type == "blog"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    body[] {
      ...,
      // Handles code blocks
      _type == "code" => {
        ...,
        language,
        filename,
        code
      },
      // Handles images in the body
      _type == "image" => {
        ...,
        "url": asset->url,
        "dimensions": asset->metadata.dimensions
      }
    }
  }
`

type Data = {
  posts: any[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const posts = await sanityClient.fetch(query)
  res.status(200).json({ posts })
}