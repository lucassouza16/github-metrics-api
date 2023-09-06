import { fetchRepoStatistics } from '@/fetches'
import { profileSVG } from '@/svgbuilder';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {

  const result = await fetchRepoStatistics();

  res.setHeader('Content-Type', 'image/svg+xml');
  res.status(200).send(await profileSVG(result));
}
