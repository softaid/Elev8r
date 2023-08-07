/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/IntervalTrigger","./Overlay","./library","./OverlayDialogRenderer","sap/base/Log","sap/ui/dom/jquery/Focusable"],function(t,e,i,s,o){"use strict";var n=e.extend("sap.ui.ux3.OverlayDialog",{metadata:{deprecated:true,library:"sap.ui.ux3",properties:{width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"auto"},height:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"auto"}},aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"}}}});n.prototype.init=function(){e.prototype.init.apply(this);this.setProperty("openButtonVisible",false);n.Trigger=new t(300)};n.prototype._setFocusLast=function(){var t=this.$("content").lastFocusableDomRef();if(!t&&this.getCloseButtonVisible()){t=this.getDomRef("close")}if(t){t.focus()}};n.prototype._setFocusFirst=function(){var t;if(this.getCloseButtonVisible()){t=this.getDomRef("close")}else{t=this.$("content").firstFocusableDomRef()}if(t){t.focus()}};n.prototype.setOpenButtonVisible=function(t){o.warning("OverlayDialog does not support an openButton.");return this};n.prototype.setWidth=function(t){if(t=="auto"||t=="inherit"){t="auto"}return this.setProperty("width",t)};n.prototype.setHeight=function(t){if(t=="auto"||t=="inherit"){t="auto"}return this.setProperty("height",t)};n.prototype.onBeforeRendering=function(){e.prototype.onBeforeRendering.apply(this,arguments);this._cleanup()};n.prototype.onAfterRendering=function(){e.prototype.onAfterRendering.apply(this,arguments);n.Trigger.addListener(this._checkChange,this)};n.prototype._cleanup=function(){n.Trigger.removeListener(this._checkChange,this);this.contentWidth=null;this.contentHeight=null;this.overlayWidth=null;this.overlayHeight=null};n.prototype.exit=function(){this._cleanup();e.prototype.exit.apply(this,arguments)};n.prototype._checkChange=function(){if(!this.getDomRef()){return}var t=this.$("content"),e=this.$(),i=this.getWidth()==="auto",s=this.getHeight()==="auto";var o=i?Math.round(e.width()/2):t.width(),n=s?Math.round(e.height()/2):t.height(),h=e.width(),r=e.height();if(o!=this.contentWidth||n!=this.contentHeight||h!=this.overlayWidth||r!=this.overlayHeight){t.css("left","0").css("right","auto").css("top","0").css("bottom","auto").css("width",this.getWidth()).css("height",this.getHeight());this.contentWidth=o;this.contentHeight=n;this.overlayWidth=h;this.overlayHeight=r;var a=this.$("close");if(this.contentWidth<this.overlayWidth){t.css("left","50%");t.css("right","auto");t.css("margin-left",Math.round(-1*this.contentWidth/2)+"px");t.css("width",s?this.contentWidth:this.getWidth());a.css("right","50%");a.css("margin-right",Math.round(-1*this.contentWidth/2-10)+"px")}else{t.css("left","0");t.css("right","10px");t.css("margin-left","0");t.css("width","auto");a.css("right","0");a.css("margin-right","0")}if(this.contentHeight<this.overlayHeight-30){t.css("top","50%");t.css("bottom","auto");t.css("margin-top",Math.round(-1*this.contentHeight/2)+"px");t.css("height",s?this.contentHeight:this.getHeight());a.css("top","50%");a.css("margin-top",Math.round(-1*this.contentHeight/2-10)+"px")}else{t.css("top","10px");t.css("bottom","30px");t.css("margin-top","0");t.css("height","auto");a.css("top","0");a.css("margin-top","0")}}};return n});