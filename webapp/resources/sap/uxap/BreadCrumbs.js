/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/Link","sap/m/Select","sap/ui/core/Control","sap/ui/core/ResizeHandler","sap/ui/core/delegate/ItemNavigation","sap/ui/core/Item","sap/ui/core/Icon","sap/ui/Device","./library","sap/ui/core/InvisibleText","sap/ui/util/openWindow","./BreadCrumbsRenderer","sap/ui/thirdparty/jquery"],function(e,t,i,s,r,o,n,a,l,u,h,g,c){"use strict";var p=i.extend("sap.uxap.BreadCrumbs",{metadata:{library:"sap.uxap",properties:{showCurrentLocation:{type:"boolean",group:"Behavior",defaultValue:true}},defaultAggregation:"links",aggregations:{links:{type:"sap.m.Link",multiple:true,singularName:"link"},currentLocation:{type:"sap.m.Text",multiple:false},_tubeIcon:{type:"sap.ui.core.Icon",multiple:false,visibility:"hidden"},_overflowSelect:{type:"sap.m.Select",multiple:false,visibility:"hidden"}}},renderer:g});p.PAGEUP_AND_PAGEDOWN_JUMP_SIZE=5;p.prototype.init=function(){this._iREMSize=parseInt(c("body").css("font-size"));this._iContainerMaxHeight=this._iREMSize*2};p.prototype.onBeforeRendering=function(){this._bOnPhone=a.system.phone;this._resetControl()};p.prototype.onAfterRendering=function(){this._handleInitialModeSelection()};p.prototype._handleInitialModeSelection=function(){if(this._bOnPhone){this._setSelectVisible(true);return this}this._configureKeyboardHandling();if(!this._iContainerHeight){this._iContainerHeight=this.$().outerHeight()}if(this._iContainerHeight>this._iContainerMaxHeight){this._toggleOverflowMode(true);return this}this._sResizeListenerId=s.register(this,this._handleScreenResize.bind(this));return this};p.prototype._toggleOverflowMode=function(e){if(this._sResizeListenerId){s.deregister(this._sResizeListenerId)}this._setSelectVisible(e);this._setBreadcrumbsVisible(!e);this._sResizeListenerId=s.register(this,this._handleScreenResize.bind(this));return this};p.prototype._getTubeIcon=function(){if(!this.getAggregation("_tubeIcon")){this.setAggregation("_tubeIcon",new n({src:"sap-icon://slim-arrow-right",color:"#bfbfbf",size:"1rem",useIconTooltip:false}).addStyleClass("sapUxAPTubeIcon"))}return this.getAggregation("_tubeIcon")};p.prototype._getOverflowSelect=function(){var e,i;if(!this.getAggregation("_overflowSelect")){i=this.getLinks().reverse()||[];i.unshift(this.getCurrentLocation());e=new t({items:i.map(this._createSelectItem),autoAdjustWidth:true});e.attachChange(this._overflowSelectChangeHandler);this.setAggregation("_overflowSelect",e)}return this.getAggregation("_overflowSelect")};p.prototype._createSelectItem=function(e){return new o({key:e.getId(),text:e.getText()})};p.prototype._overflowSelectChangeHandler=function(t){var i=t.getParameter("selectedItem").getKey(),s=sap.ui.getCore().byId(i),r,o;if(s instanceof e){r=s.getHref();s.firePress();if(r){o=s.getTarget();if(o){h(r,o)}else{window.location.href=r}}}return this};p.prototype._handleScreenResize=function(e){var t=this._shouldOverflow(),i=this._getUsingOverflowSelect();if(t&&!i){this._toggleOverflowMode(true)}else if(!t&&i){this._toggleOverflowMode(false)}return this};p.prototype._shouldOverflow=function(){var e=this._getBreadcrumbsAsJQueryObject(),t,i=this._getUsingOverflowSelect();if(i){this._setBreadcrumbsVisible(true)}e.addClass("sapUxAPInvisible");t=e.outerHeight()>this._iContainerMaxHeight;e.removeClass("sapUxAPInvisible");if(i){this._setBreadcrumbsVisible(false)}return t};p.prototype._getBreadcrumbsAsJQueryObject=function(){if(!this._$breadcrumbs){this._$breadcurmbs=this.$("breadcrumbs")}return this._$breadcurmbs};p.prototype._getOverflowSelectAsJQueryObject=function(){if(!this._$select){this._$select=this.$("select")}return this._$select};p.prototype._setBreadcrumbsVisible=function(e){var t=this.$(),i=this._getBreadcrumbsAsJQueryObject(),s="sapUxAPFullWidth",r="sapUiHidden";if(e){i.removeClass(r);t.removeClass(s)}else{i.addClass(r);t.addClass(s)}return t};p.prototype._setSelectVisible=function(e){var t=this._getOverflowSelectAsJQueryObject(),i="sapUiHidden";if(e){t.removeClass(i)}else{t.addClass(i)}return this};p.prototype._resetControl=function(){this._iContainerHeight=null;this._$select=null;this._$breadcrumbs=null;this.setAggregation("_overflowSelect",null,true);if(this._sResizeListenerId){s.deregister(this._sResizeListenerId)}return this};p.prototype._getAriaLabelledBy=function(){if(!this._oAriaLabelledBy){p.prototype._oAriaLabelledBy=new u({text:sap.ui.getCore().getLibraryResourceBundle("sap.uxap").getText("BREADCRUMB_TRAIL_LABEL")}).toStatic()}return this._oAriaLabelledBy};p.prototype._getItemNavigation=function(){if(!this._ItemNavigation){this._ItemNavigation=new r}return this._ItemNavigation};p.prototype._getItemsToNavigate=function(){var e=this.getLinks(),t=this.getCurrentLocation(),i=this.getShowCurrentLocation();if(i&&t){e.push(t)}return e};p.prototype._configureKeyboardHandling=function(){var e=this._getItemNavigation(),t=this._getBreadcrumbsAsJQueryObject()[0],i=-1,s=this._getItemsToNavigate(),r=[];s.forEach(function(e){e.$().attr("tabindex","-1");r.push(e.getDomRef())});this.addDelegate(e);e.setCycling(false);e.setRootDomRef(t);e.setItemDomRefs(r);e.setSelectedIndex(i);this._getBreadcrumbsAsJQueryObject().attr("tabindex","-1");s[0].$().attr("tabindex","0");return this};p.prototype.onsappageup=function(e){this._handlePageKeys(e,false)};p.prototype.onsappagedown=function(e){this._handlePageKeys(e,true)};p.prototype._handlePageKeys=function(e,t){var i,s=this._getItemsToNavigate(),r=0,o=t?s.length-1:0;e.preventDefault();s.some(function(t,i){if(t.getId()===e.target.id){r=i;return true}});if(t){i=r+p.PAGEUP_AND_PAGEDOWN_JUMP_SIZE}else{i=r-p.PAGEUP_AND_PAGEDOWN_JUMP_SIZE}if(i&&s[i]){s[i].focus()}else if(s[o]){s[o].focus()}};p.prototype._getUsingOverflowSelect=function(){return!this._getOverflowSelectAsJQueryObject().hasClass("sapUiHidden")};p.prototype.exit=function(){if(this._ItemNavigation){this.removeDelegate(this._ItemNavigation);this._ItemNavigation.destroy();this._ItemNavigation=null}this._resetControl()};return p});