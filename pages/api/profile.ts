import { fetchRepoStatistics } from '@/fetches';
import { profileSVG } from '@/svgbuilder';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const result = await fetchRepoStatistics();

  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader("Cache-Control", `max-age=${6 * 60 * 1000}`);
  res.setHeader("Content-Security-Policy", "frame-src 'self'; frame-ancestors 'self'; object-src 'none'");
  res.status(200).send(await profileSVG(result));
}
