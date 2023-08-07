/*!
 * SAPUI5
 * (c) Copyright 2009-2022 SAP SE. All rights reserved.
 */
sap.ui.define(["sap/chart/coloring/ColoringUtils","sap/chart/coloring/criticality/measureValues/ThresholdsUtils","sap/chart/ChartLog","sap/chart/coloring/CriticalityType","sap/chart/data/MeasureSemantics","sap/ui/thirdparty/jquery"],function(e,t,a,r,i,n){"use strict";var l={Static:{},Calculated:{},DynamicThresholds:{},ConstantThresholds:{},Unmentioned:{}};var s=["Maximize","Minimize","Target"];l.Static.validate=function(e,t,r,l,s){var o=e[t].Static;var c=function(e,r){if(d[r]===t){u=true;if(d.staticType){if(d.staticType!==o){var n="";Object.keys(i).forEach(function(e,t,a){var r=i[e];if(d[r]){if(t!==a.length-1){n+=d[r]+", "}else{n+=d[r]}}});throw new a("error","Colorings.Criticality.Static","When "+n+" have semantic relationship, they must use the same Criticality type.")}}else{d.staticType=o;if(s[o]){throw new a("error","Colorings.Criticality.Static","Measures, "+s[o]+" and "+t+", which use Static Criticality must have different types.")}else{s[o]=t}}return false}};var u=false;for(var g=0;g<l.length;++g){var d=l[g];n.each(i,c);if(u){break}}return{supportMultiMsr:true}};l.Static.parse=function(e,t,a){var r=e.msr?e.msr.getName():undefined;var i=e.settings[e.type];a.callbacks=l.Static.getCallbacks(i,r);var n=e.msr.getLabel()||e.msr.getName();var s=e.settings.Legend||{};a.legend[i]=s[i]!=null?s[i]:n};l.Static.getCallbacks=function(e,t){var a={};a[e]=[function(e){return e.hasOwnProperty(t)}];return a};l.Calculated.validate=function(e,t,r){var i=e[t].Calculated;var n=r.allDim.filter(function(e){return e===i})[0];var l=r.allMsr.filter(function(e){return e===i})[0];if(n){e[t].type="dimension"}else if(l){e[t].type="measure";if(r.aMsr.find(function(e){return e.getName()===l})){throw new a("error","Colorings.Criticality.Calculated","Calculated property, "+i+", could not be available measure.")}}if(!e[t].type){throw new a("error","Colorings.Criticality.Calculated","Calculated property, "+i+", does not exist in data model.")}};l.Calculated.parse=function(t,a,r,i,n){var s=t.settings[t.type];var o=t.settings.type;if(o==="dimension"&&!e.find(s,a.aDims)){r.additionalDimensions.push(s)}else if(o==="measure"){if(!a.aMsrs.find(function(e){return e.getName()===s})){r.additionalMeasures.push(s)}a.oStatus.legend=l.getLegend(t,n)}r.status=a.oStatus};l.Calculated.getCallbacks=function(e,t,a){var r=function(r){return(r[e]===t||l.Calculated.getCriticalityType(r[e])===t)&&r.hasOwnProperty(a)};return[r]};l.Calculated.getContextHandler=function(e,t,a){var i=e[0];var n=i.settings[i.type];var s=i.settings.type;delete i.settings.type;delete i.parsed.status.callbacks;return function(t){var o=i.parsed.status;o.legend=o.legend||{};o.callbacks=o.callbacks||{};i.parsed.legend=o.legend;i.parsed.callbacks=o.callbacks;var c=t.getProperty(n);if(s==="measure"){c=l.Calculated.getCriticalityType(c)}if(r[c]){if(s==="dimension"){var u=this.getDimensionByName(n);var g=this.getDimensionByName(n).getDisplayText();e.legendTitle=e.legendTitle||u.getLabel();var d=u.getTextProperty();if(d&&g){var h=t.getProperty(d);i.parsed.legend[c]=h}else if(c){i.parsed.legend[c]=a.getText("COLORING_TYPE_"+c.toUpperCase())}}var v=i.msr.getName();var m=l.Calculated.getCallbacks(n,c,v);i.parsed.callbacks[c]=m}}};l.Calculated.getCriticalityType=function(e){var t;switch(e){case 0:t=r.Neutral;break;case 1:t=r.Negative;break;case 2:t=r.Critical;break;case 3:t=r.Positive;break;default:t=undefined;break}return t};l.DynamicThresholds.validate=function(t,r,i){var n=i.allMsr;var l=[],o=t[r].DynamicThresholds,c;if(s.indexOf(o.ImprovementDirection)>-1){c=o.ImprovementDirection}else{throw new a("error","Colorings.Criticality.DynamicThresholds","ImprovementDirection should be one of 'Maximize', 'Minimize' and 'Target'.")}var u=[o.ToleranceRangeLowValue,o.DeviationRangeLowValue,o.AcceptanceRangeLowValue];var g=[o.ToleranceRangeHighValue,o.DeviationRangeHighValue,o.AcceptanceRangeHighValue];switch(c){case"Maximize":l=u;break;case"Minimize":l=g;break;case"Target":l=u.concat(g);break;default:}if(e.isNumber.apply(null,l)){throw new a("error","Colorings.Criticality.DynamicThresholds","Invalid Thresholds settings.")}l=l.filter(function(e){return typeof e=="string"});e.notIn(l,n,"Colorings.Criticality.DynamicThresholds","Thresholds measure, ",", does not exist in data model.")};l.DynamicThresholds.parse=function(e,a,r,i,n){var s=e.settings[e.type];var o=e.msr?e.msr.getName():undefined;var c=s.ImprovementDirection.toLowerCase();var u={lo:s.ToleranceRangeLowValue,hi:s.ToleranceRangeHighValue};var g={lo:s.DeviationRangeLowValue,hi:s.DeviationRangeHighValue};var d={lo:s.AcceptanceRangeLowValue,hi:s.AcceptanceRangeHighValue};t.fillOmit(d,u,g);r.additionalMeasures=[d.lo,d.hi,u.lo,u.hi,g.lo,g.hi].filter(function(e){return typeof e==="string"&&a.aMsrs.filter(function(t){return t.getName()===e}).length==0});r.callbacks=t.improvement(c,o,d,u,g);r.legend=l.getLegend(e,n)};l.DynamicThresholds.getContextHandler=function(e,a,r){var i=e[0],n=i.settings[i.type],l=n.ImprovementDirection.toLowerCase();function s(e,t){var a;if(typeof t==="number"){a=t}else{a=t?e.getProperty(t):null;if(typeof a==="string"){a=Number.parseFloat(a)}}return a}return function(e){var a={};a.lo=s(e,n.ToleranceRangeLowValue);a.hi=s(e,n.ToleranceRangeHighValue);var r={};r.lo=s(e,n.DeviationRangeLowValue);r.hi=s(e,n.DeviationRangeHighValue);var i={};i.lo=s(e,n.AcceptanceRangeLowValue);i.hi=s(e,n.AcceptanceRangeHighValue);t.fillOmit(i,a,r);t.checkThreshold(l,i,a,r)}};l.ConstantThresholds.validate=function(e,t){var r=e[t].ConstantThresholds;if(s.indexOf(r.ImprovementDirection)===-1){throw new a("error","Colorings.Criticality.ConstantThresholds","ImprovementDirection should be one of 'Maximize', 'Minimize' and 'Target'.")}return{supportHeatMap:true}};l.ConstantThresholds.parse=function(e,a,r,i,n){var s=e.settings[e.type];var o=e.msr?e.msr.getName():undefined;var c=e.msr?e.msr.getLabel()||e.msr.getName():undefined;var u=s.ImprovementDirection.toLowerCase();var g={lo:e.byAggregation.ToleranceRangeLowValue,hi:e.byAggregation.ToleranceRangeHighValue};var d={lo:e.byAggregation.DeviationRangeLowValue,hi:e.byAggregation.DeviationRangeHighValue};var h={lo:e.byAggregation.AcceptanceRangeLowValue,hi:e.byAggregation.AcceptanceRangeHighValue};t.fillOmit(h,g,d);t.checkThreshold(u,h,g,d,true);if(i){r.legend=t.MBCimprovement(u,h,g,d)}else{r.callbacks=t.improvement(u,o,h,g,d);r.legend=l.ConstantThresholds.getLegend(u,c,h,g,d,n)}};var o="≥";var c="<";var u="≤";var g=">";var d={"<":">",">":"<","≥":"≤","≤":"≥"};l.ConstantThresholds.getLegend=function(t,a,r,i,n,l){var s={};var h=n.hi;var v=n.lo;var m=i.hi;var f=i.lo;var p=r.hi;var y=r.lo;function T(t,a,r){var i=t.length;var n=t[0]===Number.POSITIVE_INFINITY;var s=t[0]===Number.NEGATIVE_INFINITY;var o=t[i-1]===Number.POSITIVE_INFINITY;var c=t[i-1]===Number.NEGATIVE_INFINITY;if(r&&t[0]===t[i-1]){return""}if(a){if(i===5&&!(s&&o)){if(o||c){t=t.slice(0,3)}if(n||s){t=t.slice(2)}if(t.length<=1){return""}}else if(i===3&&(n||s||o||c)){return""}}t=t.map(function(e){if(e===Number.POSITIVE_INFINITY){return l.getText("POSITIVE_INFINITY")}else if(e===Number.NEGATIVE_INFINITY){return l.getText("NEGATIVE_INFINITY")}return e});if(t.length===3&&e.isNumber(t[0])){var u=d[t[1]];t=[t[2],u,t[0]]}return t.join(" ")}var C=function(e){return e&&e.length>0};var N=function(e){return e.filter(C).join(" , ")};switch(t){case"maximize":s={Positive:T([a,o,y]),Critical:T([v,u,a,c,f],true),Neutral:T([f,u,a,c,y],true),Negative:T([a,c,v])};break;case"minimize":s={Positive:T([a,u,p]),Critical:T([m,c,a,u,h],true),Neutral:T([p,c,a,u,m],true),Negative:T([a,g,h])};break;case"target":s={Positive:T([y,u,a,u,p],true),Critical:N([T([v,u,a,c,f],true,true),T([m,c,a,u,h],true,true)]),Neutral:N([T([f,u,a,c,y],true,true),T([p,c,a,u,m],true,true)]),Negative:N([T([a,c,v],true),T([a,g,h],true)])};break;default:}return s};l.ConstantThresholds.getContextHandler=function(e,t){if(t){var a=e[0];var r=a.msr.getName();var i=a.parsed.legend;return function(e){var t=e.getProperty(r);i.min=Math.min(i.min,t);i.max=Math.max(i.max,t)}}else{return null}};l.getLegend=function(e,t){var a={};n.each(r,function(e,r){a[r]=t.getText("COLORING_TYPE_"+r.toUpperCase())});return n.extend(true,{},a,e.settings.Legend)};return l});