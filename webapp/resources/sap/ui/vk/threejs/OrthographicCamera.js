/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["../OrthographicCamera","../thirdparty/three"],function(t,e){"use strict";var a=t.extend("sap.ui.vk.threejs.OrthographicCamera",{metadata:{library:"sap.ui.vk"}});var i=t.getMetadata().getParent().getClass().prototype;a.prototype.init=function(){if(i.init){i.init.call(this)}var t=1;var e=2e5;this._nativeCamera=new THREE.OrthographicCamera(-1,1,1,-1,t,e);this._nativeCamera.position.set(0,0,1e4);this._nativeCamera.zoom=-1;this.setUsingDefaultClipPlanes(true)};a.prototype.update=function(t,e){var a=1/Math.min(t,e);this.setLeft(t*-a);this.setRight(t*a);this.setTop(e*a);this.setBottom(e*-a);var i=this._nativeCamera.view;if(i&&i.enabled){var r=i.fullWidth/i.fullHeight;var n=t/e;var o=Math.min(n,1)/Math.min(r,1);var s=o*r/n;var p=t/i.fullWidth;var u=e/i.fullHeight;i.offsetX=(i.offsetX*s+(i.fullWidth-i.width)*(1-s)*.5)*p;i.offsetY=(i.offsetY*o+(i.fullHeight-i.height)*(1-o)*.5)*u;i.width*=p;i.height*=u;i.fullWidth=t;i.fullHeight=e}this._nativeCamera.updateProjectionMatrix()};a.prototype.exit=function(){if(i.exit){i.exit.call(this)}this._nativeCamera=null};a.prototype.getLeft=function(){return this._nativeCamera.left};a.prototype.setLeft=function(t){this._nativeCamera.left=t;return this};a.prototype.getRight=function(){return this._nativeCamera.right};a.prototype.setRight=function(t){this._nativeCamera.right=t;return this};a.prototype.getTop=function(){return this._nativeCamera.top};a.prototype.setTop=function(t){this._nativeCamera.top=t;return this};a.prototype.getBottom=function(){return this._nativeCamera.bottom};a.prototype.setBottom=function(t){this._nativeCamera.bottom=t;return this};a.prototype.getZoomFactor=function(){return this._nativeCamera.zoom};a.prototype.setZoomFactor=function(t){this._nativeCamera.zoom=t;return this};a.prototype.getCameraRef=function(){return this._nativeCamera};a.prototype.setCameraRef=function(t){this._nativeCamera=t;return this};a.prototype.getNearClipPlane=function(){return this._nativeCamera.near};a.prototype.setNearClipPlane=function(t){this._nativeCamera.near=t;this.setUsingDefaultClipPlanes(false);this._nativeCamera.updateProjectionMatrix();this.setIsModified(true);return this};a.prototype.getFarClipPlane=function(){return this._nativeCamera.far};a.prototype.setFarClipPlane=function(t){this._nativeCamera.far=t;this.setUsingDefaultClipPlanes(false);this._nativeCamera.updateProjectionMatrix();this.setIsModified(true);return this};a.prototype.getPosition=function(){return this._nativeCamera.position.toArray()};a.prototype.setPosition=function(t){this._nativeCamera.position.fromArray(t);this._nativeCamera.updateMatrixWorld();return this};a.prototype.getUpDirection=function(){return this._nativeCamera.up.toArray()};a.prototype.setUpDirection=function(t){this._nativeCamera.up.fromArray(t);this._nativeCamera.updateMatrixWorld();return this};a.prototype.getTargetDirection=function(){var t=new THREE.Vector3;this._nativeCamera.getWorldDirection(t);return t.toArray()};a.prototype.setTargetDirection=function(t){var e=(new THREE.Vector3).fromArray(t);e.add(this._nativeCamera.position);this._nativeCamera.lookAt(e);return this};a.prototype.setUsingDefaultClipPlanes=function(t){this._nativeCamera.userData.usingDefaultClipPlanes=t;return this};a.prototype.getUsingDefaultClipPlanes=function(){return this._nativeCamera.userData.usingDefaultClipPlanes};a.prototype.adjustClipPlanes=function(t){var e=this._nativeCamera;e.updateMatrixWorld();t=t.clone().applyMatrix4(e.matrixWorldInverse);e.near=-t.max.z;e.far=-t.min.z;var a=Math.max((e.far-e.near)*.0025,.001);e.near-=a;e.far+=a;if(e.near<0){var i=new THREE.Vector3(0,0,-1).transformDirection(e.matrixWorld).multiplyScalar(e.near);e.position.add(i);e.far-=e.near;e.near=0;e.updateMatrixWorld()}e.updateProjectionMatrix();return this};a.prototype.adjustZoom=function(t){var e=this._nativeCamera;e.updateMatrixWorld();t=t.clone().applyMatrix4(e.matrixWorldInverse);e.zoom=1/Math.max(t.min.x/e.left,t.max.y/e.top,t.max.x/e.right,t.min.y/e.bottom);e.updateProjectionMatrix();return this};return a});