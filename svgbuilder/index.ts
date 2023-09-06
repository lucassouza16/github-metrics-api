import { Statistics } from "@/fetches";
import { htmlEncode } from "@/utils";

export const chartCircleSVG = ({
    size, percentages
}: {
    size: number,
    percentages: {
        value: number,
        color: string
    }[]
}) => {
    const circ = 2 * Math.PI * 46;

    let svgGen = '';
    let percPass = 0;

    for (let i = 0; i < percentages.length; i++) {
        const element = percentages[i];

        svgGen += `<circle 
           r="46" 
           stroke-width="8" 
           fill="none" 
           stroke="${element.color}" 
           transform-origin="center" 
           transform='rotate(${percPass * 360 - 90})'
           cx="50" cy="50" 
           stroke-dasharray="${element.value * circ},${circ}" 
        />
        `;
        percPass += element.value;
    }

    return `
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" width="${size}" height="${size}">
         ${svgGen}
      </svg>
   `;
};

export const profileSVG = (result: Statistics) => {

    const languages = result.languages.slice(0, 9);

    const totalSize = languages.reduce((prev, l) => prev + l.size, 0);
    const percentages = languages.map(({ color, name, size }) => ({ color, name, value: size / totalSize }));

    return `
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="800" height="300">
    <foreignObject width="100%" height="100%">
       <style>
        @import url('https://fonts.googleapis.com/css2?family=Roboto');
        * {
           font-family: 'Roboto', sans-serif;
           box-sizing: border-box;
           margin: 0;
           padding: 0;
        }
        #main {
           height: 100%;
           display: flex;
           padding: 10px;
           gap: 10px;
           background: #fff;
        }
        .profile {
           display: flex;
           flex-direction: column;
           align-items: center;
           gap: 10px;
           justify-content: space-between;
        }
        .chart {
           width: 160px;
           height: 160px;
           position: relative;
           border-radius: 100%;
           overflow: hidden;
        }
        .chart svg {
           position: absolute; 
        }
        .chart img {
           position: absolute;
           top: 0;
           right: 0;
           bottom: 0;
           left: 0;
           margin: auto;
           width: 90%;
           height: 90%;
        }
        .languages{
           width: 100%;
           display: grid;
           grid-template-columns: 1fr 1fr 1fr;
           gap: 10px;
        }
        .language{
           display: flex;
           flex-direction: column;
        }
        .language>div{
           flex: 1;
           padding: 10px;
        }
        .language:after{
          content: ' ';
          display: block;
          height: 10px;
          background: var(--color);
        }
        .bordered{
          border: 1px solid #d0d7de;
          border-radius: 6px;
          overflow: hidden;
        }
        .followers-following{
          display: flex;
          width: 100%;
          gap: 10px;
        }
        .followers-following>div{
           text-align: center;
           flex: 1;
        }
        .followers-following>div span{
           font-size: 10pt;
        }
        .profile .data{
           text-align: center;
        }
        .profile .data p {
          font-size: 10pt;
        }
      </style>
      <div id="main" class="bordered" xmlns="http://www.w3.org/1999/xhtml">
        <div class="profile">
          <div class="chart">
          <img src="${htmlEncode(result.avatar)}" />
          ${chartCircleSVG({ size: 160, percentages })}
          </div>
          <div class="data">
            <h3>${result.name}</h3>
            <p>@${result.user}</p>
          </div>
          <div class="followers-following">
             <div class="bordered">
               <h4>${result.followers}</h4>
               <span>followers</span>
             </div>
             <div class="bordered">
               <h4>${result.following}</h4>
               <span>following</span>
             </div>
          </div>
        </div>
        <div class="languages">
           ${percentages.map(p => `
                 <div class="language bordered" style="--color:${p.color}">
                    <div>
                      <h4>${p.name}</h4>
                      <p>${(p.value * 100).toFixed(2)}%</p>
                    </div>
                 </div>
              `).join('')
        }
        </div>
      </div>
    </foreignObject>
  </svg>
`};

