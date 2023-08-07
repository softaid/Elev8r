/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["./glMatrix"],function(r){"use strict";var a={centerOfNodes:function(a,e){function u(a,e){var u=a.min.x;var m=a.min.y;var N=a.min.z;var t=a.max.x;var I=a.max.y;var v=a.max.z;var n=[];n.push(r.vec3.fromValues(u,m,N));n.push(r.vec3.fromValues(u,m,v));n.push(r.vec3.fromValues(u,I,N));n.push(r.vec3.fromValues(u,I,v));n.push(r.vec3.fromValues(t,m,N));n.push(r.vec3.fromValues(t,m,v));n.push(r.vec3.fromValues(t,I,N));n.push(r.vec3.fromValues(t,I,v));var f=Number.MAX_SAFE_INTEGER;var E=Number.MAX_SAFE_INTEGER;var i=Number.MAX_SAFE_INTEGER;var s=-Number.MAX_SAFE_INTEGER;var o=-Number.MAX_SAFE_INTEGER;var c=-Number.MAX_SAFE_INTEGER;var x=r.vec3.create();n.forEach(function(a){r.vec3.transformMat4(x,a,e);if(x[0]<f){f=x[0]}if(x[1]<E){E=x[1]}if(x[2]<i){i=x[2]}if(x[0]>s){s=x[0]}if(x[1]>o){o=x[1]}if(x[2]>c){c=x[2]}});return[f,E,i,s,o,c]}var m={x:Number.NEGATIVE_INFINITY,y:Number.NEGATIVE_INFINITY,z:Number.NEGATIVE_INFINITY};var N={x:Number.POSITIVE_INFINITY,y:Number.POSITIVE_INFINITY,z:Number.POSITIVE_INFINITY};var t=false;a.forEach(function(r){r.traverse(function(r){var a=r.userData.boundingBox;if(!a&&r.geometry){a=r.geometry.boundingBox}if(a){var e=u(a,r.matrixWorld.elements);N.x=Math.min(N.x,e[0]);N.y=Math.min(N.y,e[1]);N.z=Math.min(N.z,e[2]);m.x=Math.max(m.x,e[3]);m.y=Math.max(m.y,e[4]);m.z=Math.max(m.z,e[5]);t=true}})});if(!t){return[0,0,0]}return[Math.abs(m.x-N.x)/2+N.x,Math.abs(m.y-N.y)/2+N.y,Math.abs(m.z-N.z)/2+N.z]}};return a});