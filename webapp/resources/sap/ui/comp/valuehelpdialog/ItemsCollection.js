/*!
 * SAPUI5
 * (c) Copyright 2009-2022 SAP SE. All rights reserved.
 */
sap.ui.define(["sap/ui/comp/util/FormatUtil","sap/ui/base/ManagedObject","sap/m/Token"],function(t,e,i){"use strict";var s=function(){this.items={}};s.prototype.add=function(t,e){this.items[t]=e};s.prototype.remove=function(t){delete this.items[t]};s.prototype.removeAll=function(){this.items={}};s.prototype.getItem=function(t){return this.items[t]};s.prototype.getItems=function(){var t=[];for(var e in this.items){t.push(e)}return t};s.prototype.getSelectedItemsTokenArray=function(s,r,o){var n=[];for(var a in this.items){var p=this.items[a];var u,f;if(typeof p==="string"){f=a;u=p}else{f=p[s];u=p[r];if(u===undefined){u=this.items[a]}else{if(!o){o="descriptionAndId"}u=t.getFormattedExpressionFromDisplayBehaviour(o,f,u)}}var m=new i({key:e.escapeSettingsValue(f)});m.setText(u);m.setTooltip(typeof u==="string"?u:"");if(typeof p!=="string"){m.data("row",p);m.data("longKey",e.escapeSettingsValue(a))}n.push(m)}return n};s.prototype.getModelData=function(){var t=[];for(var e in this.items){var i=this.items[e];if(typeof i==="string"){i={missing:e}}t.push(i)}return t};return s},true);