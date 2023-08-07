/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["../thirdparty/three","sap/base/Log","./ThreeUtils"],function(e,t,a){"use strict";var r=function(e){this._outlineWidth=e;this._copyMaterial=new THREE.MeshBasicMaterial({transparent:true,fog:false});this._maskMaterial=new THREE.MeshBasicMaterial({side:THREE.DoubleSide,fog:false});this._outlineMaterial=new THREE.ShaderMaterial({uniforms:{mask:{value:null},offset:{value:new THREE.Vector2(1,0,0,1)}},vertexShader:["varying vec2 vTC;","void main() {","\tvTC = uv;","\tgl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);","}"].join("\n"),fragmentShader:["varying vec2 vTC;","uniform sampler2D mask;","uniform vec4 offset;","float delta(vec3 c1,  vec3 c2) {","\tvec3 dc = c1 - c2;","\treturn dot(dc, dc);","}","void main() {","\tvec3 c = texture2D(mask, vTC).rgb;","\tvec3 c1 = texture2D(mask, vTC + offset.xy).rgb;","\tvec3 c2 = texture2D(mask, vTC - offset.xy).rgb;","\tvec3 c3 = texture2D(mask, vTC + offset.zw).rgb;","\tvec3 c4 = texture2D(mask, vTC - offset.yw).rgb;","\tvec4 a = vec4(delta(c, c1), delta(c, c2), delta(c, c3), delta(c, c4));","\tgl_FragColor = vec4(1.0, 1.0, 1.0, sign(dot(a, a)));","}"].join("\n")});this._expandMaterial=new THREE.ShaderMaterial({uniforms:{mask:{value:null},offset:{value:new THREE.Vector2(1,0,0,1)}},vertexShader:["varying vec2 vTC;","void main() {","\tvTC = uv;","\tgl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);","}"].join("\n"),fragmentShader:["varying vec2 vTC;","uniform sampler2D mask;","uniform vec4 offset;","void main() {","\tfloat a = texture2D(mask, vTC).a;","\ta += texture2D(mask, vTC + offset.xy).a;","\ta += texture2D(mask, vTC - offset.xy).a;","\ta += texture2D(mask, vTC + offset.zw).a;","\ta += texture2D(mask, vTC - offset.yw).a;","\tgl_FragColor = vec4(1.0, 1.0, 1.0, a * 0.5);","}"].join("\n")});this._screenCamera=new THREE.OrthographicCamera(-1,1,1,-1,0,1);this._screenMesh=new THREE.Mesh(new THREE.PlaneBufferGeometry(2,2))};r.prototype.setOutlineWidth=function(e){this._outlineWidth=e};r.prototype.render=function(e,t,a,r,i,s){if(!r||!r.length){return}var n=e.getSize(new THREE.Vector2);var o=2;var l=n.width*o;var h=n.height*o;if(!this._renderTarget1||this._renderTarget1.width!==l||this._renderTarget1.height!==h){var v={minFilter:THREE.NearestFilter,magFilter:THREE.NearestFilter};this._renderTarget1=new THREE.WebGLRenderTarget(l,h,v);this._renderTarget1.texture.generateMipmaps=false;this._renderTarget2=new THREE.WebGLRenderTarget(l,h,v);this._renderTarget2.texture.generateMipmaps=false}var c;var u;if(s){c=new Map;u=new Map;s.forEach(function(e){if(!e.node||!e.parent){return}c.set(e.node,e);if(e.parent){var t=u.get(e.parent)||[];t.push(e);u.set(e.parent,t)}})}var f;var d=new Set;var m=function(e){if(e.isMesh){d.add({mesh:e,color:f})}};var _;for(_=0;_<r.length;_++){var M=r[_];f=new THREE.Color((_+1&255)/255,(_+1>>8&255)/255,(_+1>>16&255)/255);M._vkTraverseNodes(m,c,u)}if(d.size===0){return}var T=e.getClearColor().clone();var g=e.getClearAlpha();var p=e.autoClear;e.autoClear=false;e.setClearColor(0,0);var E;var C=this._renderTarget1;var x=this._renderTarget2;e.setRenderTarget(C);e.clear(true,true,false);var w=d.values();var k=w.next();while(!k.done){var R=k.value.mesh;this._maskMaterial.color=k.value.color;k=w.next();E=R.material;R.material=this._maskMaterial;e.render(R,a);R.material=E}var y=new THREE.Vector4(1/l,0,0,1/h);E=this._outlineMaterial;E.uniforms.mask.value=C.texture;E.uniforms.offset.value=y;this._screenMesh.material=E;e.setRenderTarget(x);e.render(this._screenMesh,this._screenCamera);if(this._outlineWidth>1){E=this._expandMaterial;E.uniforms.offset.value=y;this._screenMesh.material=E;for(_=1;_<this._outlineWidth;_++){var H=C;C=x;x=H;E.uniforms.mask.value=C.texture;e.setRenderTarget(x);e.render(this._screenMesh,this._screenCamera)}}E=this._copyMaterial;E.map=x.texture;E.color=i;this._screenMesh.material=E;e.setRenderTarget(null);e.render(this._screenMesh,this._screenCamera);e.setClearColor(T,g);e.autoClear=p};r.prototype.dispose=function(){if(this._copyMaterial){a.disposeMaterial(this._copyMaterial);this._copyMaterial=null}if(this._maskMaterial){a.disposeMaterial(this._maskMaterial);this._maskMaterial=null}if(this._outlineMaterial){a.disposeMaterial(this._outlineMaterial);this._outlineMaterial=null}if(this._expandMaterial){a.disposeMaterial(this._expandMaterial);this._expandMaterial=null}if(this._screenMesh){a.disposeObject(this._screenMesh);this._screenMesh=null}};return r});