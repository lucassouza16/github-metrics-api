import { fetchRepoStatistics } from '@/fetches'
import { chartCircleSVG, profileSVG } from '@/svgbuilder';
import { htmlEncode } from '@/utils';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {

  const result = await fetchRepoStatistics();

  res.setHeader('Content-Type', 'image/svg+xml');
  res.status(200).send(profileSVG(result));
}
