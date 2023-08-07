/*!
 * SAPUI5
 * (c) Copyright 2009-2022 SAP SE. All rights reserved.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","./library","sap/m/library","sap/ui/core/Control","sap/ui/Device","sap/ui/events/KeyCodes","sap/suite/ui/microchart/MicroChartUtils","sap/ui/core/ResizeHandler","./HarveyBallMicroChartRenderer"],function(e,t,i,s,r,a,o,n){"use strict";var l=i.ValueColor;var p=i.Size;var h=s.extend("sap.suite.ui.microchart.HarveyBallMicroChart",{metadata:{library:"sap.suite.ui.microchart",properties:{total:{group:"Misc",type:"float",defaultValue:null},totalLabel:{group:"Misc",type:"string"},totalScale:{group:"Misc",type:"string"},formattedLabel:{group:"Misc",type:"boolean",defaultValue:false},showTotal:{group:"Misc",type:"boolean",defaultValue:true},showFractions:{group:"Misc",type:"boolean",defaultValue:true},size:{group:"Misc",type:"sap.m.Size",defaultValue:"Auto"},colorPalette:{type:"string[]",group:"Appearance",defaultValue:[]},width:{type:"sap.ui.core.CSSSize",group:"Misc"},height:{type:"sap.ui.core.CSSSize",group:"Misc"},alignContent:{group:"Misc",type:"sap.suite.ui.microchart.HorizontalAlignmentType",defaultValue:"Left"},isResponsive:{type:"boolean",group:"Appearance",defaultValue:false},hideOnNoData:{type:"boolean",group:"Appearance",defaultValue:false}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},defaultAggregation:"items",aggregations:{items:{multiple:true,type:"sap.suite.ui.microchart.HarveyBallMicroChartItem",bindable:"bindable"}},events:{press:{}}}});h.VALUE_TRUNCATION_DIGITS=5;h.THRESHOLD_LOOK_XS=1.125;h.THRESHOLD_LOOK_S=3.5;h.THRESHOLD_LOOK_M=4.5;h.THRESHOLD_LOOK_L=5.875;h.prototype._getAltHeaderText=function(e){var t=this._oRb.getText("HARVEYBALLMICROCHART");if(e){t+=" "+this._oRb.getText("IS_ACTIVE")}if(!this._hasData()){t+="\n"+this._oRb.getText("NO_DATA");return t}return t};h.prototype._getAltSubText=function(e){var t="";var i=this.getItems();i.forEach(function(i){var s=i.getColor(),r=i.getTooltip_AsString(),a="";if(!r){return}var o=this.getColorPalette().length===0&&l[s]?this._oRb.getText(("SEMANTIC_COLOR_"+s).toUpperCase()):"";var n=i.getFractionLabel();var p=i.getFractionScale();if(!n&&p){n=i.getFormattedLabel()?i.getFraction():i.getFraction()+i.getFractionScale().substring(0,3)}else if(!i.getFormattedLabel()&&i.getFractionLabel()&&p){n+=i.getFractionScale().substring(0,3)}a+=n+" "+o;a=r.split("((AltText))").join(a);if(a){t+="\n"+a;e=false}}.bind(this));if(this.getTotal()){var s=this.getTotalLabel();if(!s){s=this.getFormattedLabel()?this.getTotal():this.getTotal()+this.getTotalScale().substring(0,3)}else if(!this.getFormattedLabel()&&this.getTotalScale()){s+=this.getTotalScale().substring(0,3)}t+=(e?"":"\n")+this._oRb.getText("HARVEYBALLMICROCHART_TOTAL_TOOLTIP")+" "+s}return t};h.prototype.getTooltip_AsString=function(e){var t=s.prototype.getTooltip_AsString.apply(this,arguments),i=this._getAltHeaderText(e),r=false;if(t){i=t.split("((AltText))").join(i)}if(!t||!i){i="";r=true}i+=this._getAltSubText(r);return i};h.prototype._getAccessibilityControlType=function(){return this._oRb.getText("ACC_CTR_TYPE_HARVEYBALLMICROCHART")};h.prototype.init=function(){this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.suite.ui.microchart");this.setAggregation("tooltip","((AltText))",true);r.media.attachHandler(this.rerender,this,r.media.RANGESETS.SAP_STANDARD);this._sChartResizeHandlerId=null;this._bThemeApplied=true;if(!sap.ui.getCore().isInitialized()){this._bThemeApplied=false;sap.ui.getCore().attachInit(this._handleCoreInitialized.bind(this))}else{this._handleCoreInitialized()}};h.prototype.setSize=function(e){if(this.getSize()!==e){if(e===p.Responsive){this.setProperty("isResponsive",true)}else{this.setProperty("isResponsive",false)}this.setProperty("size",e,false)}return this};h.prototype.setIsResponsive=function(e){var t,i=this.getSize();this.setProperty("isResponsive",e);if(e){t=p.Responsive}else{t=i===p.Responsive?p.Auto:i}this.setProperty("size",t);return this};h.prototype._handleCoreInitialized=function(){this._bThemeApplied=sap.ui.getCore().isThemeApplied();if(!this._bThemeApplied){sap.ui.getCore().attachThemeChanged(this._handleThemeApplied,this)}};h.prototype._handleThemeApplied=function(){this._bThemeApplied=true;this.invalidate();sap.ui.getCore().detachThemeChanged(this._handleThemeApplied,this)};h.prototype.onBeforeRendering=function(){if(this._sChartResizeHandlerId){n.deregister(this._sChartResizeHandlerId)}this._unbindMouseEnterLeaveHandler()};h.prototype.onAfterRendering=function(){t._checkControlIsVisible(this,this._onControlIsVisible);this._bindMouseEnterLeaveHandler()};h.prototype._onControlIsVisible=function(){this._onResize();this._sChartResizeHandlerId=n.register(this,this._onResize.bind(this))};h.prototype._onResize=function(){var e=this.$(),t=e.height(),i=e.find(".sapSuiteHBMCChart").first(),s=e.find(".sapSuiteHBMCTextContainer").first(),r,a;e.removeClass("sapSuiteHBMCLookL sapSuiteHBMCLookM sapSuiteHBMCLookS sapSuiteHBMCLookXS");s.removeClass("sapSuiteHBMCTextContainerHide");i.css("width",i.css("height"));var o=e.find(".sapSuiteHBMCChartSvg")[0];if(o){o.setAttribute("viewBox","0 0 72 72")}if(t<this.convertRemToPixels(h.THRESHOLD_LOOK_S)){e.addClass("sapSuiteHBMCLookXS");if(o){o.setAttribute("viewBox","5 5 62 62")}}else if(t<this.convertRemToPixels(h.THRESHOLD_LOOK_M)){e.addClass("sapSuiteHBMCLookS")}else if(t<this.convertRemToPixels(h.THRESHOLD_LOOK_L)){e.addClass("sapSuiteHBMCLookM")}else{e.addClass("sapSuiteHBMCLookL")}r=e.width();a=i.width()+s.outerWidth();if(r<a){s.addClass("sapSuiteHBMCTextContainerHide")}};h.prototype._parseFormattedValue=function(e){return{scale:e.replace(/.*?([^+-.,\d]*)$/g,"$1").trim(),value:e.replace(/(.*?)[^+-.,\d]*$/g,"$1").trim()}};h.prototype.ontap=function(e){if(r.browser.msie){this.$().trigger("focus")}if(this.hasListeners("press")===true){e.setMarked();e.stopPropagation()}this.firePress()};h.prototype.onkeydown=function(e){if(e.which==a.SPACE){e.preventDefault()}};h.prototype.onkeyup=function(e){if(e.which===a.ENTER||e.which===a.SPACE){this.firePress();e.preventDefault()}};h.prototype.attachEvent=function(e,t,i,r){s.prototype.attachEvent.call(this,e,t,i,r);if(this.hasListeners("press")){this.$().attr("tabindex",0).addClass("sapSuiteUiMicroChartPointer")}return this};h.prototype.detachEvent=function(e,t,i){s.prototype.detachEvent.call(this,e,t,i);if(!this.hasListeners("press")){this.$().removeAttr("tabindex").removeClass("sapSuiteUiMicroChartPointer")}return this};h.prototype.exit=function(e){r.media.detachHandler(this.rerender,this,r.media.RANGESETS.SAP_STANDARD);n.deregister(this._sChartResizeHandlerId)};h.prototype._addTitleAttribute=function(){if(!this.$().attr("title")&&this._hasData()){this.$().attr("title",this.getTooltip_AsString())}};h.prototype._removeTitleAttribute=function(){if(this.$().attr("title")){this.$().removeAttr("title")}};h.prototype._bindMouseEnterLeaveHandler=function(){this.$().on("mouseenter.tooltip",this._addTitleAttribute.bind(this));this.$().on("mouseleave.tooltip",this._removeTitleAttribute.bind(this))};h.prototype._unbindMouseEnterLeaveHandler=function(){this.$().off("mouseenter.tooltip");this.$().off("mouseleave.tooltip")};h._truncateValue=function(e,t){var i=e.replace(String.fromCharCode(8206),"").replace(String.fromCharCode(8207),"");var s=i.replace(/[+-., \d]*(.*)$/g,"$1").trim().replace(/\.$/,"");e=i.replace(/([+-., \d]*).*$/g,"$1").trim();var r=e[t-1]==="."||e[t-1]===",";if(e.length>=t&&r){return e.substring(0,t-1)+s}else{return e.substring(0,t)+s}};h.prototype._hasData=function(){return this.getItems().length>0};h.prototype.firePress=function(){if(this._hasData()){s.prototype.fireEvent.call(this,"press",arguments)}};o.extendMicroChart(h);return h});