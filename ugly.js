a.width=a.height=640;c.scale(2,2);k=n=[];s=u=v=w=x=z=0;o=1;y=240;S=((a,x,y,w,s,f)=>{[...a.replace(/(\w)(\d)/g,(_,q,r)=>q.repeat(r))].map((j,i)=>{q=i%w;h="000fed00ff75fd5533976".match(/.../g)[j.charCodeAt(0)-97];c.fillStyle="#"+h;h&&c.fillRect(~~(x+(f?w-q-1:q)*s),~~(y+~~(i/w)*s),s,s)})});T=(e=>{l=(e-t)/1e3;u+=l;z+=(e-t)/100;t=e;if(u>=1){n.push({x:(0|Math.random()*8)*40,y:0,t:0|Math.random()*2,d:[-1,1][0|Math.random()*2]});u=0}if(o&&k[32]&&y==240){w=-120}v=o&&(k[37]||k[39])?k[37]?-80:80:0;w+=160*l;y+=w*l;x+=v*l;x>290?x=290:x<0?x=0:x;if(y>=240){y=240;w=0}S("f",0,0,1,320);f=[];n.map(e=>{e.y+=160*l;if(e.y>=260){e.y=260;e.x+=60*l*e.d}x<e.x+20&&x+30>e.x&&y<e.y+20&&30+y>e.y&&o?e.t?(f.push(e),o=0):s++:f.push(e);S(e.t?"g5eg4eg5":"xe2xeb2e2b2exe2",e.x,e.y,4,5)});n=f;S(["x2d3x3dbx4b3x3bcx4bcx4c2x3ac2x4a2","x2d3x3dbx4b3x3bcx4cbx4c2xaxc3ax2a2","x3dx4d2x4dbx4b3x3bcx4bcx3c4xa2x2a2","x2d3x3dbx4b3x3bcx3bc2x4c2x2ac4xax2a2","x3dx4d2x4dbx4b3x3bcx4bcx3c4xa2x2a2","x2d3x3b2x4b2x3bc2bx3bcbx3c2x4c2x4a2","x2b2x4b2x2b9b3x2b2x4b2x4b2x4b2"][o?w?4:v?~~z%4:5:6],x,y,6,5,k[37]);S("d",0,280,1,320);c.font="2em monospace";c.fillText(s,10,30);requestAnimationFrame(T)});T(t=0);onkeyup=onkeydown=(e=>k[e.which]=e.type[5]);