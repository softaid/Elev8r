/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["sap/base/Log","../thirdparty/three"],function(e,r){"use strict";var a=function(){this._maskMaterial=new THREE.MeshBasicMaterial({side:THREE.DoubleSide,fog:false});this._depthMaterial=new THREE.ShaderMaterial({vertexShader:["#include <clipping_planes_pars_vertex>","void main() {","\t#include <begin_vertex>","\t#include <project_vertex>","\t#include <clipping_planes_vertex>","}"].join("\n"),fragmentShader:["#include <clipping_planes_pars_fragment>","void main() {","\t#include <clipping_planes_fragment>","\thighp vec4 value = vec4(fract(vec4(1.0, 255.0, 65025.0, 16581375.0) * gl_FragCoord.z));","\tvalue.xyz -= value.yzw * (1.0 / 255.0);","\tgl_FragColor  = value;","}"].join("\n"),side:THREE.DoubleSide,clipping:true});this._renderTarget=new THREE.WebGLRenderTarget(1,1,{minFilter:THREE.NearestFilter,magFilter:THREE.NearestFilter});this._renderTarget.texture.generateMipmaps=false;this._renderTarget.depthBuffer=true};var t;var i=new THREE.Matrix4;var n=new THREE.Frustum;var l=new THREE.Matrix4;var o=new THREE.Vector2;var s=new THREE.Raycaster;var u=new THREE.Ray;var c=new THREE.Sphere;var v=[];var f=new Uint8Array(4);var p=new THREE.Vector3;function h(e){var r=e.parent;while(r){if(r.userData.closed){e=r}r=r.parent}while(e.parent&&e.userData.skipIt){e=e.parent}return e}a.prototype.hitTest=function(e,r,a,d,g,m,E,T,x){if(!t||t.constructor!==E.constructor){t=new E.constructor}t.copy(E);var y=E.view;if(y){var M=y.width/a;var _=y.height/d;t.setViewOffset(y.fullWidth,y.fullHeight,y.offsetX+(e-.5)*M,y.offsetY+(r-.5)*_,M,_)}else{t.setViewOffset(a,d,e-.5,r-.5,1,1)}t.updateMatrixWorld();t.updateProjectionMatrix();i.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse);n.setFromProjectionMatrix(i);s.setFromCamera(o.set(0,0),t);var R=g.getContext();var w=Math.min(R.getParameter(R.RED_BITS),8);var b=Math.min(R.getParameter(R.GREEN_BITS),8);var C=Math.min(R.getParameter(R.BLUE_BITS),8);var H=w+b;var S=(1<<w)-1;var j=(1<<b)-1;var P=(1<<C)-1;var B=1/S;var F=1/j;var D=1/P;var I=this._maskMaterial;var O=g.getClearColor().clone();var W=g.getClearAlpha();var V=g.autoClear;g.setRenderTarget(this._renderTarget);g.clippingPlanes=T||[];g.autoClear=false;g.setClearColor(0,0);g.clear(true,true,false);var k=I.color;var z=0;v.length=0;var G=x&&x.ignoreUnderlay?null:[];var L=[];var N=x&&x.ignoreOverlay?null:[];function U(e,r){if(!e.visible){return}r=r||e.userData.renderStage;var a=e.geometry;if(a&&e.material&&n.intersectsObject(e)){var t=e.matrixWorld;if(a.boundingSphere==null){a.computeBoundingSphere()}c.copy(a.boundingSphere);c.applyMatrix4(t);if(s.ray.intersectsSphere(c)){l.getInverse(t);u.copy(s.ray).applyMatrix4(l);if(a.boundingBox==null||u.intersectsBox(a.boundingBox)){if(!r){L.push(e)}else if(r<0){if(G){G.push(e)}}else if(N){N.push(e)}}}}var i=e.children;for(var o=0,v=i.length;o<v;o++){U(i[o],r)}}U(m);function A(e){z+=1;v.push(e);k.setRGB((z&S)*B,(z>>w&j)*F,(z>>H&P)*D);var r=e.material;e.material=I;g.render(e,t);e.material=r}if(G!=null&&G.length>0){G.forEach(A);g.clearDepth()}L.forEach(A);if(N!=null&&N.length>0){g.clearDepth();N.forEach(A)}g.readRenderTargetPixels(this._renderTarget,0,0,1,1,f);z=(f[0]>>8-w)+(f[1]>>8-b<<w)+(f[2]>>8-C<<H);var X=z>0?v[z-1]:null;var Y;if(X){var q=X.material;X.material=this._depthMaterial;g.clear(true,true,false);g.render(X,t);X.material=q;g.readRenderTargetPixels(this._renderTarget,0,0,1,1,f);Y=(f[0]+(f[1]+(f[2]+f[3]/255)/255)/255)/255*2-1;p.set(0,0,Y).applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}g.setRenderTarget(null);g.clippingPlanes=[];g.setClearColor(O,W);g.autoClear=V;return X?{distance:s.ray.origin.distanceTo(p),point:p,object:h(X)}:null};a.prototype.hitTestPrecise=function(e,r,a,t,i,n,l){s.setFromCamera(o.set(e/a*2-1,r/t*-2+1),n);if(l&&l.length>0){for(var u in l){var c=l[u];var v=c.distanceToPoint(s.ray.origin),f=-v/c.normal.dot(s.ray.direction);if(f>0){if(v<0){s.near=Math.max(s.near,f)}else{s.far=Math.min(s.far,f)}}else if(v<0){return null}}}var p=s.intersectObjects(i.children,true);if(l&&l.length>0){s.near=0;s.far=Infinity}if(p){for(var d in p){var g=p[d];var m=h(g.object);if(m.visible&&!m.isBillboard&&!m.isDetailView){g.object=m;return g}}}return null};a.prototype.hitTestPoint=function(e,r,a,t,i,n,l){s.setFromCamera(o.set(e/a*2-1,r/t*-2+1),n);if(l&&l.length>0){for(var u in l){var c=l[u];var v=c.distanceToPoint(s.ray.origin),f=-v/c.normal.dot(s.ray.direction);if(f>0){if(v<0){s.near=Math.max(s.near,f)}else{s.far=Math.min(s.far,f)}}else if(v<0){return null}}}var p=s.intersectObjects(i.children,true);if(l&&l.length>0){s.near=0;s.far=Infinity}return p.length===1?p[0].point:null};return a});