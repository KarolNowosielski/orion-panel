export function templateSamples(data,width,rect){
 const samples=[];let ink=0;
 const step=Math.max(1,Math.floor(Math.min(rect.w,rect.h)/14));
 for(let y=1;y<rect.h-1;y+=step)for(let x=1;x<rect.w-1;x+=step){const dark=data[(rect.y+y)*width+rect.x+x]<170;samples.push({x,y,dark});if(dark)ink++;}
 if(ink<4||ink/samples.length>.85)throw Error('Wzorzec jest pusty lub zbyt ciemny. Zaznacz sam symbol z niewielkim marginesem.');
 const positives=samples.filter(p=>p.dark),negatives=samples.filter(p=>!p.dark);
 return {positives,negatives};
}
export async function matchTemplate(data,width,height,rect,threshold=.88,onProgress=()=>{}){
 const {positives,negatives}=templateSamples(data,width,rect),candidates=[];
 const stride=1;
 function score(x,y){let pos=0,neg=0;for(const p of positives)if(data[(y+p.y)*width+x+p.x]<170)pos++;if(pos/positives.length<threshold-.15)return 0;for(const p of negatives)if(data[(y+p.y)*width+x+p.x]>=170)neg++;return .7*pos/positives.length+.3*neg/negatives.length;}
 for(let y=0;y<=height-rect.h;y+=stride){for(let x=0;x<=width-rect.w;x+=stride){let s=score(x,y);if(s>=threshold-.15){let best={x,y,w:rect.w,h:rect.h,score:s};for(let dy=-stride+1;dy<stride;dy++)for(let dx=-stride+1;dx<stride;dx++){const xx=x+dx,yy=y+dy;if(xx<0||yy<0||xx+rect.w>width||yy+rect.h>height)continue;s=score(xx,yy);if(s>best.score)best={...best,x:xx,y:yy,score:s};}if(best.score>=threshold)candidates.push(best);}}
 if(y%45<stride){onProgress(y/height);await new Promise(r=>setTimeout(r,0));}}
 const kept=[];candidates.sort((a,b)=>b.score-a.score);for(const c of candidates){if(!kept.some(k=>Math.abs(k.x-c.x)<rect.w*.65&&Math.abs(k.y-c.y)<rect.h*.65))kept.push(c);if(kept.length>=300)break;}
 return kept.sort((a,b)=>a.y-b.y||a.x-b.x);
}


