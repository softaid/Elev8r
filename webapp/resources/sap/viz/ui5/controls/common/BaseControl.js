/*!
 * SAPUI5
 * (c) Copyright 2009-2022 SAP SE. All rights reserved.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/core/RenderManager","sap/ui/core/ResizeHandler","sap/viz/library","sap/ui/thirdparty/jquery","./BaseControlRenderer"],function(e,t,i,r,n){"use strict";var s=e.extend("sap.viz.ui5.controls.common.BaseControl",{metadata:{library:"sap.viz",properties:{uiConfig:{type:"object",group:"Misc",defaultValue:null},width:{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:"640px"},height:{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:"480px"}}}});s.prototype.init=function(){this._app$=null;this._controls={};this._handlers={resize:null};this._locale=null;this._pendingRerendering=false;this._resourceLoaded=false;sap.viz._initializeVIZControls(this.isA("sap.viz.ui5.VizContainer"),function(e){this._resourceLoaded=e;this.invalidate();setTimeout(function(){if(!this.getUIArea()){this._render()}}.bind(this),0)}.bind(this))};s.prototype.exit=function(){this._app$=null;this._deregister();for(var e in this._controls){this._controls[e].destroy()}};s.prototype.onBeforeRendering=function(){var e=this._app$&&this._app$[0];if(e&&!t.isPreservedContent(e)){t.preserveContent(e,true,false)}this._deregister()};s.prototype.onAfterRendering=function(){this._render()};s.prototype.onThemeChanged=function(){if(this.getDomRef()){this.invalidate();if(!this._pendingRerendering){this._render()}}};s.prototype.onLocalizationChanged=function(){if(this._locale!==sap.ui.getCore().getConfiguration().getLocale()){this._render()}};s.prototype._render=function(){if(this._resourceLoaded&&this.getDomRef()){this._pendingRerendering=false;this._locale=sap.ui.getCore().getConfiguration().getLocale();if(!this._app$){this._app$=n(document.createElement("div")).appendTo(this.getDomRef()).addClass("ui5-viz-controls-app");n(this._app$).attr("data-sap-ui-preserve",this.getId());this._validateSize();this._createChildren()}else{this._app$.appendTo(this.getDomRef());this._validateSize();this._updateChildren()}this._register()}};s.prototype._createChildren=function(){};s.prototype._updateChildren=function(){};s.prototype._deregister=function(){if(this._handlers.resize){i.deregister(this._handlers.resize)}this._handlers.resize=null};s.prototype._register=function(){this._deregister();this._handlers.resize=i.register(this.getDomRef(),n.proxy(this._validateSize,this))};s.prototype._validateSize=function(){};s.prototype.invalidate=function(){e.prototype.invalidate.apply(this,arguments);if(this.getUIArea()){this._pendingRerendering=true}};return s});