/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/Select","sap/ui/Device","sap/ui/thirdparty/jquery","./library","./HierarchicalSelectRenderer","sap/ui/thirdparty/jqueryui/jquery-ui-position"],function(e,t,r,i,o){"use strict";var a=e.extend("sap.uxap.HierarchicalSelect",{metadata:{library:"sap.uxap",properties:{upperCase:{type:"boolean",group:"Appearance",defaultValue:false}}},renderer:o});a.POPOVER_MIN_WIDTH_REM=11;a.prototype.onAfterRendering=function(){e.prototype.onAfterRendering.apply(this,arguments)};a.prototype.onAfterRenderingPicker=function(){e.prototype.onAfterRenderingPicker.call(this);this._applyHierarchyLevelClasses()};a.prototype.onAfterRenderingList=function(){e.prototype.onAfterRenderingList.call(this);this._applyHierarchyLevelClasses()};a.prototype._applyHierarchyLevelClasses=function(){var e=this.getItems()||[];e.forEach(function(e){var t=e.data("secondLevel")===true?"sapUxAPHierarchicalSelectSecondLevel":"sapUxAPHierarchicalSelectFirstLevel";e.$().addClass(t)},this)};a.prototype.setUpperCase=function(e,t){this.setProperty("upperCase",e,t);this.toggleStyleClass("sapUxAPHierarchicalSelectUpperCase",e);var r=this.getAggregation("picker");if(r){r.toggleStyleClass("sapMSltPickerFirstLevelUpperCase",e);if(!t){r.invalidate()}}return this};a.prototype.onsapenter=e.prototype.onsapspace;["onsapup","onsappageup","onsappagedown","onsaphome","onsapend"].forEach(function(t){a.prototype[t]=function(r){e.prototype[t].call(this,r);r.stopPropagation()}});a.prototype._createDialog=function(){var t=e.prototype._createDialog.call(this),r=t.getCustomHeader();if(r){r.addStyleClass("sapUxAPHierarchicalSelect")}return t};a.prototype._decoratePopover=function(i){e.prototype._decoratePopover.call(this,i);i._adaptPositionParams=function(){this._marginTop=0;this._marginLeft=0;this._marginRight=0;this._marginBottom=0;this._arrowOffset=0;this._offsets=["0 0","0 0","0 0","0 0"];this._myPositions=["end bottom","end center","end top","begin center"];this._atPositions=["end top","end center","end bottom","begin center"]};if(t.system.tablet||t.system.desktop){var o=r.position.scrollbarWidth();if(o>0){i.setOffsetX(o)}}};a.prototype._onAfterRenderingPopover=function(){var e=this.getPicker(),t=e.getDomRef("cont"),r=t.style.minWidth;if(r.endsWith("rem")){r=r.substring(0,r.length-3);var i=parseFloat(r);if(i<a.POPOVER_MIN_WIDTH_REM&&t){t.style.minWidth=a.POPOVER_MIN_WIDTH_REM+"rem"}}};return a});