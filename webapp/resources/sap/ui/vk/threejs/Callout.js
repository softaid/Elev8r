/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["../thirdparty/three","sap/ui/base/ManagedObject","./Billboard","../thirdparty/html2canvas","./PolylineGeometry","./PolylineMaterial","./PolylineMesh","../BillboardStyle","../LeaderLineMarkStyle","./ThreeUtils"],function(e,t,a,r,i,l,s,n,o,h){"use strict";var p=a.extend("sap.ui.vk.threejs.Callout",{metadata:{library:"sap.ui.vk",properties:{anchorNode:{type:"any",defaultValue:null},depthTest:{type:"boolean",defaultValue:true}}}});p.prototype.init=function(){if(a.prototype.init){a.prototype.init.call(this)}this._lines=[];this._heads=[]};p.prototype.exit=function(){if(a.prototype.exit){a.prototype.exit.call(this)}this._lines.forEach(function(e){h.disposeObject(e)});this._lines=null;this._heads.forEach(function(e){h.disposeObject(e)});this._heads=null};p.prototype._traverse=function(e){a.prototype._traverse.call(this,e);this._lines.forEach(e);this._heads.forEach(e)};p.prototype.setDepthTest=function(e){this.setProperty("depthTest",e,true);this._traverse(function(t){t.material.depthTest=e});return this};var d=new THREE.Vector4,u=new THREE.Vector4,y=new THREE.Vector4,c=new THREE.Vector2,x=new THREE.Vector2,f=new THREE.Vector2,m=new THREE.Quaternion,v=new THREE.Matrix4,g=new THREE.Vector2,M=new THREE.Vector3,w=new THREE.Vector3,E=new THREE.Vector3(0,0,1),T=new THREE.Matrix4,b=new THREE.Matrix4;p.prototype._update=function(e,t,a){var r=this.getNode();if(!r||!r.visible){return}if(this._needUpdateTexture){this._needUpdateTexture=false;this._updateTexture()}r.matrix.getInverse(r.parent.matrixWorld);r.matrix.decompose(r.position,r.quaternion,r.scale);r.matrixWorld.identity();var i=this.getPosition(),l=this._billboard.position;if(i){l.copy(i)}else{l.setScalar(0)}var s=this.getAnchorNode();if(s){l.applyMatrix4(s.matrixWorld)}this._billboard.quaternion.copy(t.quaternion);T.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse);d.copy(l).applyMatrix4(T);c.copy(d).multiplyScalar(1/d.w).multiply(a);var o=d.w*2/(a.x*t.projectionMatrix.elements[0]);this._billboard.scale.set(o*this._width,o*this._height,1);M.setFromMatrixColumn(t.matrixWorld,0).multiplyScalar(o*(Math.round(c.x*.5)-c.x*.5));w.setFromMatrixColumn(t.matrixWorld,1).multiplyScalar(o*(Math.round(c.y*.5)-c.y*.5));l.add(M).add(w);this._billboard.updateMatrix();this._billboard.updateMatrixWorld();var h=this.getStyle()===n.CircularShape;var p=t.near;function _(e,t,a){if(e<t){return e-t}else if(e>a){return e-a}return 0}this._lines.forEach(function(e){if(e.userData.targetNode){e.matrix.copy(e.userData.targetNode.matrixWorld)}else{e.matrix.identity()}e.matrixWorld.copy(e.matrix);if(e.isPolylineMesh){e.material.resolution.copy(a)}if(e.isHaloMesh){return}var r=e.geometry.vertices;var i=r[0];var l=r[r.length-2];var s=r[r.length-1];var n=e.userData.startPointMesh;var o=false;var M=[0,r.length-1];if(n!==undefined){i.copy(n.userData.targetVertex)}b.multiplyMatrices(T,e.matrixWorld);if(e.userData.extensionLength>0&&r.length>2){M.push(r.length-2);d.copy(r[r.length-3]).applyMatrix4(b);x.copy(d).multiplyScalar(1/d.w).multiply(a);l.set(Math.sign(x.x-c.x)*.5*(1+e.userData.extensionLength/this._width),0,0);l.applyMatrix4(this._billboard.matrixWorld).applyMatrix4(v.getInverse(e.matrixWorld))}d.copy(l).applyMatrix4(b);x.copy(d).multiplyScalar(1/d.w).multiply(a);if(h){var w=g.copy(x).sub(c).length();o=w<this._width;g.multiplyScalar(.5/w);s.set(g.x,g.y,0)}else{var S=_(x.x,c.x-this._width,c.x+this._width),D=_(x.y,c.y-this._height,c.y+this._height);o=S===0&&D===0;if(Math.abs(S)>Math.abs(D)){s.set(Math.sign(S)*.5,0,0)}else{s.set(0,Math.sign(D)*.5,0)}}if(o){s.copy(l)}else{s.applyMatrix4(this._billboard.matrixWorld).applyMatrix4(v.getInverse(e.matrixWorld))}e.geometry.verticesNeedUpdate=true;if(n!==undefined){n.position.copy(n.userData.targetVertex).applyMatrix4(e.matrixWorld);d.copy(n.position).applyMatrix4(T);var R=d.w/(a.x*t.projectionMatrix.elements[0]);n.scale.setScalar(R);n.visible=false;var H=false;if(d.w>=p){u.copy(d);y.copy(r[1]).applyMatrix4(b);if(y.w<p){var P=(u.w-p)/(u.w-y.w);y.sub(u).multiplyScalar(P).add(u)}f.copy(u).multiplyScalar(1/u.w);x.copy(y).multiplyScalar(1/y.w);g.copy(x).sub(f).multiply(a);H=g.length()<n.userData.lineOffset;m.setFromAxisAngle(E,Math.atan2(g.y,g.x));n.quaternion.copy(t.quaternion).multiply(m);n.updateMatrix();n.matrixWorld.copy(n.matrix);n.matrixWorldNeedsUpdate=false;f.multiply(a).sub(c);n.visible=h?f.length()>this._width:Math.abs(f.x)>this._width||Math.abs(f.y)>this._height;if(H||!n.visible){i.copy(r[1])}else{i.set(n.userData.lineOffset,0,0).applyMatrix4(n.matrixWorld).applyMatrix4(v.getInverse(e.matrixWorld))}}}e.geometry._updateVertices(M);e.computeLineDistances(b,a,t instanceof THREE.PerspectiveCamera?p:undefined);if(e.userData.haloMesh){e.userData.haloMesh.material.lineLength=e.material.lineLength}}.bind(this))};p.prototype._createMarkMesh=function(e,t,a,r){var i=a===o.Arrow;var l=window.devicePixelRatio;var s=t.width;var n=s*t.haloWidth;r=(Array.isArray(r)||r instanceof Float32Array)&&r.length===2?r:[1,1];var h,p;if(i){h=Math.max(35*r[0],s*5);p=Math.max(15*r[1],s*2)}else{h=p=Math.max(2*r[0],s*2)}h=Math.ceil(h+n*2);p=Math.ceil(p+n*2);var d=document.createElement("canvas");d.width=THREE.Math.ceilPowerOfTwo(h*l);d.height=THREE.Math.ceilPowerOfTwo(p*l);var u=d.getContext("2d");var y=h/2,c=p/2;u.fillStyle="#FFF";u.scale(l,l);if(i){u.beginPath();u.moveTo(0,c);u.lineTo(h,0);u.lineTo(h,p);u.closePath();u.fill();var x=h*c/Math.sqrt(h*h+c*c),f=(x-n)/x;var m=h-h*f,v=c*(h*f-n)/h;u.fillStyle=e.getStyle();u.beginPath();u.moveTo(m,c);u.lineTo(h-n,c-v);u.lineTo(h-n,c+v);u.closePath();u.fill()}else{var g=h*.5,M=g-n;u.beginPath();u.ellipse(y,c,g,g,0,0,Math.PI*2);u.fill();u.fillStyle=e.getStyle();u.beginPath();u.ellipse(y,c,M,M,0,0,Math.PI*2);u.fill()}u.fillRect(h-n,c-s*.5,n,s);var w=new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(d),flatShading:true,transparent:true,alphaTest:.05,premultipliedAlpha:true,side:THREE.DoubleSide,depthTest:this.getDepthTest()});var E=new THREE.PlaneBufferGeometry(h*2,p*2);if(i){E.translate(h,0,0)}var T=new THREE.Mesh(E,w);T.userData.skipIt=true;T.userData.lineOffset=i?h*2-1:h-n*2;var b=new THREE.Vector2(h*l/d.width,p*l/d.height);var _=T.geometry.attributes.uv.array;for(var S=0,D=_.length;S<D;S+=2){_[S]*=b.x;_[S+1]=1-(1-_[S+1])*b.y}return T};p.prototype.addLeaderLine=function(e,t,a,r,n,h,p){var d=this.getNode();if(p>0&&e.length<3){e.push(e[e.length-1].clone())}var u=a.userData.lineStyle||{};u.width=u.width||1;u.haloWidth=u.haloWidth||0;u.endCapStyle=u.endCapStyle||0;var y=u.endCapStyle||e.length>2?1:0;var c=(y&&(r!==o.None||u.endCapStyle===0)?1:0)|(y&&(n!==o.None||u.endCapStyle===0)?2:0);var x=new i;x.setVertices(e);var f;if(u.haloWidth>0){var m=new l({color:16777215,lineColor:16777215,linewidth:u.width*(u.haloWidth*2+1),dashCapStyle:u.endCapStyle,segmentCapStyle:y,trimStyle:c,transparent:true,depthTest:this.getDepthTest()});f=new s(x,m);f.userData.skipIt=true;f.userData.targetNode=t;f.matrixAutoUpdate=false;f.renderOrder=this.getRenderOrder();f.isHaloMesh=true;d.add(f);this._lines.push(f)}var v=new l({color:16777215,lineColor:a.color,linewidth:u.width,dashCapStyle:u.endCapStyle,segmentCapStyle:y,trimStyle:c,dashPattern:u.dashPattern||[],dashScale:u.dashPatternScale||1,transparent:true,depthTest:this.getDepthTest()});var g=new s(x,v);g.userData.skipIt=true;g.userData.targetNode=t;g.userData.extensionLength=p;g.userData.haloMesh=f;g.matrixAutoUpdate=false;g.renderOrder=this.getRenderOrder();d.add(g);this._lines.push(g);if(r!==o.None){var M=this._createMarkMesh(a.color,u,r,h);M.userData.targetVertex=x.vertices[0].clone();M.matrixAutoUpdate=false;M.renderOrder=this.getRenderOrder();g.userData.startPointMesh=M;d.add(M);this._heads.push(M)}return g};return p});