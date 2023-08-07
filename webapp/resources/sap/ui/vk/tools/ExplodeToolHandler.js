/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["sap/ui/base/EventProvider","./ExplodeToolGizmo","../thirdparty/three"],function(t,e,i){"use strict";var s=t.extend("sap.ui.vk.tools.ExplodeToolHandler",{metadata:{library:"sap.ui.vk"},constructor:function(t){this._priority=13;this._tool=t;this._gizmo=t.getGizmo();this._rect=null;this._rayCaster=new THREE.Raycaster;this._handleIndex=-1;this._handleAxis=new THREE.Vector3;this._gizmoOrigin=new THREE.Vector3;this._mouse=new THREE.Vector2}});s.prototype._updateMouse=function(t){var e=this.getViewport().getRenderer().getSize(new THREE.Vector2);this._mouse.x=(t.x-this._rect.x)/e.width*2-1;this._mouse.y=(t.y-this._rect.y)/e.height*-2+1;this._rayCaster.setFromCamera(this._mouse,this.getViewport().getCamera().getCameraRef());this._rayCaster.far=Infinity};s.prototype._updateHandles=function(t,e){var i=this._handleIndex;this._handleIndex=-1;if(t.n===1||t.event&&t.event.type==="contextmenu"){this._rayCaster.layers.mask=this._gizmo._getCameraLayersMask();for(var s=0,r=this._gizmo.getGizmoCount();s<r;s++){var n=this._gizmo.getTouchObject(s);var o=this._rayCaster.intersectObject(n,true);if(o.length>0){this._handleIndex=n.children.indexOf(o[0].object);if(this._handleIndex>=0){this._rayCaster.far=o[0].distance;this._gizmoOrigin.setFromMatrixPosition(n.matrixWorld);if(s===0){this._handleAxis.setFromMatrixColumn(n.matrixWorld,this._handleIndex%3).normalize().multiplyScalar(this._handleIndex<3?1:-1)}else{this._handleAxis.copy(this._gizmo._axisDirection);this._handleIndex+=6}}}}}this._gizmo.highlightHandle(this._handleIndex,e||this._handleIndex===-1);if(i!==this._handleIndex){this.getViewport().setShouldRenderFrame()}};s.prototype.hover=function(t){if(this._inside(t)&&!this._gesture){this._updateMouse(t);this._updateHandles(t,true);t.handled|=this._handleIndex>=0}};s.prototype.click=function(t){if(this._inside(t)&&!this._gesture){if(this._handleIndex<0){var e=this.getViewport().hitTest(t.x-this._rect.x,t.y-this._rect.y);if(!e){this._tool.setSelectedItem(null);return}var i=e.object;var s=this._tool.getGizmo()._groupsMap;var r=null;while(i){r=s.get(i);if(r){this._tool.setSelectedItem(r);t.handled=true;break}i=i.parent}}else{t.handled=this._handleIndex>=0}}};var r=new THREE.Vector3;s.prototype._getAxisOffset=function(){var t=this._rayCaster.ray;var e=this._handleAxis.clone().cross(t.direction).cross(t.direction).normalize();r.copy(t.origin).sub(this._gizmoOrigin);return e.dot(r)/e.dot(this._handleAxis)};s.prototype._getPlaneOffset=function(){var t=this._rayCaster.ray;r.copy(this._gizmoOrigin).sub(t.origin);var e=this._handleAxis.dot(r)/this._handleAxis.dot(t.direction);return t.direction.clone().multiplyScalar(e).sub(r)};s.prototype.beginGesture=function(t){if(this._inside(t)&&!this._gesture){this._updateMouse(t);this._updateHandles(t,false);if(this._handleIndex>=0){this._gesture=true;t.handled=true;this._gizmo._beginGesture(this._handleIndex);this._dragOrigin=this._getAxisOffset()}}};s.prototype.move=function(t){if(this._gesture){t.handled=true;this._updateMouse(t);var e=this._getAxisOffset()-this._dragOrigin;if(isFinite(e)){this._gizmo._setOffset(e)}}};s.prototype.endGesture=function(t){if(this._gesture){this._gesture=false;t.handled=true;this._updateMouse(t);this._gizmo._endGesture();this._dragOrigin=undefined;this._updateHandles(t,true);this.getViewport().setShouldRenderFrame()}};s.prototype.contextMenu=function(t){};s.prototype.getViewport=function(){return this._tool._viewport};s.prototype._getOffset=function(t){var e=t.getBoundingClientRect();var i={x:e.left+window.pageXOffset,y:e.top+window.pageYOffset};return i};s.prototype._inside=function(t){if(this._rect===null||true){var e=this._tool._viewport.getIdForLabel();var i=document.getElementById(e);if(i===null){return false}var s=this._getOffset(i);this._rect={x:s.x,y:s.y,w:i.offsetWidth,h:i.offsetHeight}}return t.x>=this._rect.x&&t.x<=this._rect.x+this._rect.w&&t.y>=this._rect.y&&t.y<=this._rect.y+this._rect.h};return s});