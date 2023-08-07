/*!
 * Copyright (c) 2009-2022 SAP SE, All Rights Reserved
 */
sap.ui.define(["sap/ui/core/Control"],function(e){"use strict";var o=e.extend("sap.ushell.components.workPageBuilder.controls.WorkPageColumnResizer",{metadata:{library:"sap.ushell",event:{resizerMoved:{parameters:{posXDiff:{type:"float"}}}}},renderer:{apiVersion:2,render:function(e,o){e.openStart("div",o);e.class("sapCepDivider");e.attr("tabindex","0");e.openEnd();e.openStart("div");e.class("sapCepDividerInner");e.openEnd();e.close("div");e.close("div")}}});o.prototype.init=function(){this._fnMouseMove=this.mouseMove.bind(this);this._fnMouseUp=this.mouseUp.bind(this)};o.prototype.exit=function(){window.document.removeEventListener("mousemove",this._fnMouseMove);window.document.removeEventListener("mouseup",this._fnMouseUp)};o.prototype.mouseUp=function(){window.document.removeEventListener("mouseup",this._fnMouseUp);window.document.removeEventListener("mousemove",this._fnMouseMove)};o.prototype.mouseMove=function(e){this.fireEvent("resizerMoved",{posXDiff:e.pageX-this.getXOrigin()})};o.prototype.onmousedown=function(){window.document.addEventListener("mousemove",this._fnMouseMove);window.document.addEventListener("mouseup",this._fnMouseUp)};o.prototype.getXOrigin=function(){var e=this.$().get(0).getBoundingClientRect();return e.x+e.width/2};return o});