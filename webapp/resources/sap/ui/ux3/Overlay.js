/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/core/Control","sap/ui/core/Popup","./library","./OverlayRenderer","sap/ui/core/library","sap/ui/dom/jquery/control","sap/ui/dom/jquery/Focusable"],function(t,e,o,i,s,n){"use strict";var r=n.OpenState;var u=e.extend("sap.ui.ux3.Overlay",{metadata:{deprecated:true,interfaces:["sap.ui.core.PopupInterface"],library:"sap.ui.ux3",properties:{openButtonVisible:{type:"boolean",group:"Misc",defaultValue:true},closeButtonVisible:{type:"boolean",group:"Misc",defaultValue:true}},events:{close:{allowPreventDefault:true,parameters:{id:{type:"string"}}},closed:{allowPreventDefault:true,parameters:{id:{type:"string"}}},openNew:{parameters:{id:{type:"string"}}},open:{parameters:{id:{type:"string"}}}}}});u.prototype.init=function(){var e=this;this._oPopup=new o(this,false,true);this._oPopup.attachOpened(function(o){var i=t(document.getElementById(e._initialFocusId))[0];if(!i&&e._getShell()&&e.getOpenButtonVisible()){i=document.getElementById(e._getOpenButtonId())}else if(!i&&e._getShell()&&e.getCloseButtonVisible()){i=document.getElementById(e._getCloseButtonId())}else if(!i){i=e.$("content").firstFocusableDomRef()}if(!i){i=e.$().firstFocusableDomRef()}if(i){i.focus()}});this._oPopup.attachClosed(function(t){e.fireClosed({id:e.getId()})});this._overridePopupEventing()};u.prototype._overridePopupEventing=function(){this._oPopup.onmousedown=function(t){return}};u.prototype._getShell=function(){var e=t(".sapUiUx3Shell").control();if(e.length>0&&!this._oShell){this._oShell=e.length?e[0]:null}return this._oShell};u.prototype._getCloseButtonId=function(){return this.getId()+"-close"};u.prototype._getOpenButtonId=function(){return this.getId()+"-openNew"};u.prototype._initDom=function(e,o,i){var s=t(".sapUiUx3Shell").control();this._oShell=s.length?s[0]:null;s=this._oShell;this.$().css("position","fixed");if(s){this._bFocusEventsRegistered=true;s.syncWithCanvasSize(this.getId(),true,e,o,i);this.$("firstFocusDummyPaneFw").attr("tabindex","0").on("focusin",t.proxy(s.focusFirstHdr,s));this.$("firstFocusDummyPaneBw").attr("tabindex","0").on("focusin",t.proxy(s.focusLastTool,s));this.$("LastFocusDummyPane").attr("tabindex","0").on("focusin",t.proxy(s.focusPaneStart,s))}else{this.$().css("bottom","0").css("top","0").css("left","0").css("right","0")}};u.prototype._cleanupDom=function(){if(this._oShell){this._oShell.syncWithCanvasSize(this.getId(),false)}if(this._bFocusEventsRegistered){this._bFocusEventsRegistered=false;this.$("firstFocusDummyPaneFw").removeAttr("tabindex").off("focusin");this.$("firstFocusDummyPaneBw").removeAttr("tabindex").off("focusin");this.$("LastFocusDummyPane").removeAttr("tabindex").off("focusin")}};u.prototype.onAfterRendering=function(){var e=this._oPopup.getOpenState();if(e===r.OPEN||e===r.OPENING){this._initDom(t.proxy(this._setFocusFirst,this),t.proxy(this._setFocusLast,this),t.proxy(this._applyChanges,this))}};u.prototype.onBeforeRendering=function(){};u.prototype.exit=function(){this.close();this._oPopup.destroy();this._oPopup=null;this._oShell=null};u.prototype.open=function(e){this._initialFocusId=e;if(this._oPopup.isOpen()){return}if(e){this._oPopup.setInitialFocusId(e)}this._oPreviousFocus=o.getCurrentFocusInfo();this._oPopup.open(400);this._initDom(t.proxy(this._setFocusFirst,this),t.proxy(this._setFocusLast,this),t.proxy(this._applyChanges,this));this.fireOpen({id:this.getId()})};u.prototype.close=function(){if(!this._oPopup.isOpen()){return}this._oPopup.close(400);setTimeout(this.restorePreviousFocus.bind(this),400);this._cleanupDom()};u.prototype.onclick=function(t){this._handleButtonEvent(t)};u.prototype.onsapselect=function(t){this._handleButtonEvent(t)};u.prototype._handleButtonEvent=function(t){var e=t.target.id;if(e===this._getCloseButtonId()){if(this.fireClose({id:this.getId()})){this.close()}}else if(e===this._getOpenButtonId()){this.fireOpenNew({id:this.getId()})}};u.prototype._getText=function(t,e){var o=sap.ui.getCore().getLibraryResourceBundle("sap.ui.ux3");var i;if(o){i=o.getText(t)}if(i&&e){for(var s=0;s<e.length;s++){i=i.replace("{"+s+"}",e[s])}}return i?i:t};u.prototype._setFocusFirst=function(){var t=document.getElementById(this._getOpenButtonId());if(t){t.focus()}};u.prototype._setFocusLast=function(){var t=document.getElementById(this._getCloseButtonId());if(t){t.focus()}};u.prototype._applyChanges=function(t){return this};u.prototype.isOpen=function(){return this._oPopup.isOpen()};u.prototype.restorePreviousFocus=function(){o.applyFocusInfo(this._oPreviousFocus)};return u});