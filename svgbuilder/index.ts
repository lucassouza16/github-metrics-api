import { Statistics } from "@/fetches";
import { uriToBase64 } from "@/utils";

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

export const githubLogoSVG = ({ size }: { size: number }) => `
<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="${size}" height="${size}" viewBox="0 0 64 64">
    <path d="M32 6C17.641 6 6 17.641 6 32c0 12.277 8.512 22.56 19.955 25.286-.592-.141-1.179-.299-1.755-.479V50.85c0 0-.975.325-2.275.325-3.637 0-5.148-3.245-5.525-4.875-.229-.993-.827-1.934-1.469-2.509-.767-.684-1.126-.686-1.131-.92-.01-.491.658-.471.975-.471 1.625 0 2.857 1.729 3.429 2.623 1.417 2.207 2.938 2.577 3.721 2.577.975 0 1.817-.146 2.397-.426.268-1.888 1.108-3.57 2.478-4.774-6.097-1.219-10.4-4.716-10.4-10.4 0-2.928 1.175-5.619 3.133-7.792C19.333 23.641 19 22.494 19 20.625c0-1.235.086-2.751.65-4.225 0 0 3.708.026 7.205 3.338C28.469 19.268 30.196 19 32 19s3.531.268 5.145.738c3.497-3.312 7.205-3.338 7.205-3.338.567 1.474.65 2.99.65 4.225 0 2.015-.268 3.19-.432 3.697C46.466 26.475 47.6 29.124 47.6 32c0 5.684-4.303 9.181-10.4 10.4 1.628 1.43 2.6 3.513 2.6 5.85v8.557c-.576.181-1.162.338-1.755.479C49.488 54.56 58 44.277 58 32 58 17.641 46.359 6 32 6zM33.813 57.93C33.214 57.972 32.61 58 32 58 32.61 58 33.213 57.971 33.813 57.93zM37.786 57.346c-1.164.265-2.357.451-3.575.554C35.429 57.797 36.622 57.61 37.786 57.346zM32 58c-.61 0-1.214-.028-1.813-.07C30.787 57.971 31.39 58 32 58zM29.788 57.9c-1.217-.103-2.411-.289-3.574-.554C27.378 57.61 28.571 57.797 29.788 57.9z"></path>
</svg>
`;

export const profileSVG = async (result: Statistics) => {

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
           fill: #50656f;
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
          ${githubLogoSVG({ size: 160 })}
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

