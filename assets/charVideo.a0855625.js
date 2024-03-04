const s={space:5,canvasElement:l("charVideoCanvas"),width:400,height:200};function h(t=s){var i,e,a,n;this.space=t.space||s.space,this.width=Math.ceil(((i=s.width)!=null?i:window.innerWidth)/this.space),this.height=Math.ceil(((e=s.height)!=null?e:window.innerHeight)/this.space),this.data={},this.cav={},this.ctx={},this.charVedio=t.canvasElement,this.charVedio.width=(a=s.width)!=null?a:window.innerWidth,this.charVedio.height=(n=s.height)!=null?n:window.innerHeight,this.textCtx=this.charVedio.getContext("2d"),this.init()}h.prototype.init=function(){this.initVideo(),this.initCanvas()};h.prototype.initVideo=function(t){this.video||(this.video=document.createElement("video")),t&&(this.video.src=t,this.video.loop=!0)};h.prototype.initCanvas=function(){this.cav=document.createElement("canvas"),this.ctx=this.cav.getContext("2d"),this.cav.width=this.width,this.cav.height=this.height};h.prototype.loadData=function(){return this.ctx.getImageData(0,0,this.width,this.height)};h.prototype.reDraw=function(t){for(var i=0,e=t.data.length;i<e;i+=4){var a=t.data[i],n=t.data[i+1],o=t.data[i+2];t.data[i]=t.data[i+1]=t.data[i+2]=255-(a+n+o)/3|0}this.data=t,this.ctx.putImageData(t,0,0,0,0,this.width,this.height)};h.prototype.drawText=function(){this.textCtx.clearRect(0,0,window.innerWidth,window.innerHeight);for(var t=this.data.data,i=' .,`"^:!?o+*wU$HB%@&#M'.split(""),e=0,a=t.length;e<a;e+=4){this.textCtx.fillStyle="#333";var n=(e/4|0)%this.width,o=Math.ceil(e/4/this.width),r=n*this.space,d=o*this.space,c=t[e]|0,v=Math.ceil(255/i.length),p=i[c/v|0];this.textCtx.font="12px courier",this.textCtx.fillText(p,r,d)}};h.prototype.interval=function(){var t=this;requestAnimationFrame(function(){if(!t.video.paused){t.ctx.drawImage(t.video,0,0,t.width,t.height);var i=t.loadData();t.reDraw(i),t.drawText()}t.interval()})};h.prototype.playFile=function(t){this.src=URL.createObjectURL(t),this.initVideo(this.src),this.interval(),this.video.play()};function l(t){return document.getElementById(t)}export{h as default};
