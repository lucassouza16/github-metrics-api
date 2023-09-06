import { LanguageStatistics, fetchRepoStatistics } from '@/fetches'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {

  const result = await fetchRepoStatistics();

  const width = 400;
  const height = 400;
  const margin = 10;
  const circleStrokeWidth = 10;
  const circleRadius = 70;
  const username = "Lucas Souza";

  const svg = `
  <svg fill="none" width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
     <style type="text/css">@import url("https://fonts.googleapis.com/css2?family=Roboto");</style>
    </defs>
    <rect width="${width}" height="${height}" stroke="gray" rx="10" />
    <circle cx="${width / 2 - circleStrokeWidth / 2}" cy="${margin + circleRadius}" r="${circleRadius}" stroke="black" stroke-width="${circleStrokeWidth}" />
    <text fill="black" x="${width / 2 + (username.length * 9) / 2}" y="180" style="direction:rtl;font-family:'Roboto',sans-serif;font-size:20;font-weight:bold;">${username}</text>
  </svg>
  `;
  
  res.setHeader('Content-Type', 'image/svg+xml');
  res.status(200).send(`
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="500">
    <foreignObject width="100%" height="100%">
       <style>
        @import url('https://fonts.googleapis.com/css2?family=Roboto');
        * {
           font-family: 'Roboto', sans-serif;
           box-sizing: border-box;
        }
        #main {
           width: 100%;
           background: gray;
           display: flex;
           flex-direction: column;
           align-items: center;
           padding: 10px;
        }
        .chart {
           width: 160px;
           height: 160px;
           background: red;
        }
        .languages{
           width:100%;
           display: grid;
           grid-template-columns: 1fr 1fr;
           gap: 10px;
        }
        .languages > *{
           height:50px;
           background:blue;
        }
      </style>
      <div id="main" xmlns="http://www.w3.org/1999/xhtml">
        <div class="chart"></div>
        <h3>${username}</h3>
        <div class="languages">
           <div></div>
           <div></div>
           <div></div>
           <div></div>
           <div></div>
           <div></div>
           <div></div>
        </div>
      </div>
    </foreignObject>
  </svg>
`);
}
