/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/designtime/baseEditor/util/hasTag","sap/base/util/restricted/_omit"],function(e,n){"use strict";var a={labelSpanXL:4,labelSpanL:4,labelSpanM:4,labelSpanS:12,adjustLabelSpan:false,columnsXL:1,columnsL:1,columnsM:1,singleContainerFullSize:false};function r(e){return{label:e.label,value:e.value,config:n(e,["label","value"])}}function i(n,a){var r=[];var i=0;while(i<n.length){var t=n[i];if(e(t,a)){r.push(t);n.splice(i,1)}else{i++}}return r}function t(e,n){var a=e.findIndex(function(e){return e.__propertyName===n});if(a>-1){return e.splice(a,1)[0]}}function l(e){return e.some(function(e){return typeof e.config.visible==="boolean"?e.config.visible:true})}function u(e,u){u=u||{};var s=e.slice();var o=u.groups||[];var c=u.responsiveGridLayout||a;var p=u.renderLabels!==false;var f={responsiveGridLayout:c};if(!p){s=s.map(function(e){return n(e,"label")})}if(o.length>0){f.groups=o.map(function(e){var n=[];e.items.forEach(function(e){switch(e.type){case"tag":n=n.concat(i(s,e.value).map(function(e){return r(e)}));break;case"propertyName":var a=t(s,e.value);if(a){n=n.concat(r(a))}break}});return{label:e.label,items:n,visible:l(n)}})}else{var v=s.splice(0,s.length).map(r);f.groups=[{items:v,visible:l(v)}]}f.groups=f.groups.filter(function(e){return e.items.length>0});f.count=e.length-s.length;return f}return{prepareData:u,updateDependencies:["visible","tags"]}});