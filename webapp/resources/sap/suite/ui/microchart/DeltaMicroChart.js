/*!
 * SAPUI5
 * (c) Copyright 2009-2022 SAP SE. All rights reserved.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","./library","sap/m/library","sap/m/FlexBox","sap/ui/core/Control","sap/ui/Device","sap/ui/core/ResizeHandler","sap/ui/events/KeyCodes","sap/suite/ui/microchart/MicroChartUtils","./DeltaMicroChartRenderer"],function(e,t,i,s,a,r,o,l,n){"use strict";var p=i.ValueColor;var h=i.Size;var u=t.DeltaMicroChartViewType;var d=a.extend("sap.suite.ui.microchart.DeltaMicroChart",{metadata:{library:"sap.suite.ui.microchart",properties:{value1:{type:"float",group:"Misc"},value2:{type:"float",group:"Misc"},title1:{type:"string",group:"Misc",defaultValue:null},title2:{type:"string",group:"Misc",defaultValue:null},displayValue1:{type:"string",group:"Misc",defaultValue:null},displayValue2:{type:"string",group:"Misc",defaultValue:null},deltaDisplayValue:{type:"string",group:"Misc",defaultValue:null},color:{type:"sap.m.ValueCSSColor",group:"Misc",defaultValue:"Neutral"},view:{type:"sap.suite.ui.microchart.DeltaMicroChartViewType",group:"Appearance",defaultValue:"Normal"},width:{type:"sap.ui.core.CSSSize",group:"Misc"},height:{group:"Misc",type:"sap.ui.core.CSSSize"},size:{type:"sap.m.Size",group:"Misc",defaultValue:"Auto"},isResponsive:{type:"boolean",group:"Appearance",defaultValue:false},hideOnNoData:{type:"boolean",group:"Appearance",defaultValue:false}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{press:{}}}});d.THRESHOLD_LOOK_XS=1.125;d.THRESHOLD_LOOK_S=3.5;d.THRESHOLD_LOOK_M=4.5;d.THRESHOLD_LOOK_L=5.875;d.THRESHOLD_WIDTH_NO_LABEL=6;d.THRESHOLD_WIDTH_WIDE_MODE=12;d.prototype.init=function(){this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.suite.ui.microchart");this.setAggregation("tooltip","((AltText))",true);this._bThemeApplied=true;if(!sap.ui.getCore().isInitialized()){this._bThemeApplied=false;sap.ui.getCore().attachInit(this._handleCoreInitialized.bind(this))}else{this._handleCoreInitialized()}};d.prototype.setSize=function(e){if(this.getSize()!==e){if(e===h.Responsive){this.setProperty("isResponsive",true,true)}else{this.setProperty("isResponsive",false,true)}this.setProperty("size",e,false)}return this};d.prototype.setIsResponsive=function(e){var t,i=this.getSize();this.setProperty("isResponsive",e);if(e){t=h.Responsive}else{t=i===h.Responsive?h.Auto:i}this.setProperty("size",t);return this};d.prototype._handleCoreInitialized=function(){this._bThemeApplied=sap.ui.getCore().isThemeApplied();if(!this._bThemeApplied){sap.ui.getCore().attachThemeChanged(this._handleThemeApplied,this)}};d.prototype._handleThemeApplied=function(){this._bThemeApplied=true;this.invalidate();sap.ui.getCore().detachThemeChanged(this._handleThemeApplied,this)};d.prototype._calcChartData=function(){var e=this.getValue1();var t=this.getValue2();var i=Math.min(e,t,0);var s=Math.max(e,t,0);var a=s-i;function r(e){return(a===0?0:Math.abs(e)/a*100).toFixed(2)}var o={};var l=e-t;o.delta={left:s===0,width:r(l),isFirstStripeUp:e<t,isMax:e<0&&t>=0||e>=0&&t<0,isZero:e===0&&t===0,isEqual:l===0};o.bar1={left:t>=0,width:r(e),isSmaller:Math.abs(e)<Math.abs(t)};o.bar2={left:e>=0,width:r(t),isSmaller:Math.abs(t)<Math.abs(e)};return o};d.prototype._getDeltaValue=function(){var e=this.getValue1(),t=this.getValue2();return Math.abs(e-t).toFixed(Math.max(this._digitsAfterDecimalPoint(e),this._digitsAfterDecimalPoint(t)))};d.prototype._getLocalizedColorMeaning=function(e){return p[e]?this._oRb.getText(("SEMANTIC_COLOR_"+e).toUpperCase()):""};d.prototype._getAltHeaderText=function(e){var t=this._oRb.getText("DELTAMICROCHART");if(e){t+=" "+this._oRb.getText("IS_ACTIVE")}t+="\n";if(!this._hasData()){t+=this._oRb.getText("NO_DATA");return t}var i=this.getDisplayValue1();var s=this.getDisplayValue2();var a=this.getDeltaDisplayValue();var r=this.getValue1();var o=this.getValue2();var l=i?i:""+r;var n=s?s:""+o;var p=a?a:""+Math.abs(r-o).toFixed(Math.max(this._digitsAfterDecimalPoint(r),this._digitsAfterDecimalPoint(o)));var h=this._getLocalizedColorMeaning(this.getColor());t+=this.getTitle1()+" "+l+"\n"+this.getTitle2()+" "+n+"\n"+this._oRb.getText("DELTAMICROCHART_DELTA_TOOLTIP",[p,h]);return t};d.prototype._getAccessibilityControlType=function(){return this._oRb.getText("ACC_CTR_TYPE_DELTAMICROCHART")};d.prototype.onBeforeRendering=function(){this._oChartData=this._calcChartData();if(this._sResizeHandlerId){o.deregister(this._sResizeHandlerId)}this.$().off("mouseenter");this.$().off("mouseleave")};d.prototype.onAfterRendering=function(){t._checkControlIsVisible(this,this._onControlIsVisible);this.$().on("mouseenter",this._addTitleAttribute.bind(this));this.$().on("mouseleave",this._removeTitleAttribute.bind(this))};d.prototype._onControlIsVisible=function(){if(this._hasData()){this._onResize();this._sResizeHandlerId=o.register(this,this._onResize.bind(this))}};d.prototype.exit=function(){o.deregister(this._sResizeHandlerId)};d.prototype._onResize=function(){var e=this.$(),t=parseInt(e.width()),i=parseInt(e.height()),s=e.find(".sapSuiteDMCLbls .sapSuiteDMCLabel"),a=this.getView();e.removeClass("sapSuiteDMCNoLabels sapSuiteDMCNoRightLabels sapSuiteDMCLookM sapSuiteDMCLookS sapSuiteDMCLookXS");if(a===u.Responsive){e.removeClass("sapSuiteDMCWideMode")}if(t<=this.convertRemToPixels(d.THRESHOLD_WIDTH_NO_LABEL)||i<=this.convertRemToPixels(d.THRESHOLD_LOOK_XS)){e.addClass("sapSuiteDMCNoLabels")}if(a===u.Responsive&&t>this.convertRemToPixels(d.THRESHOLD_WIDTH_WIDE_MODE)){e.addClass("sapSuiteDMCWideMode")}if(i<this.convertRemToPixels(d.THRESHOLD_LOOK_S)){e.addClass("sapSuiteDMCLookXS")}else if(i<this.convertRemToPixels(d.THRESHOLD_LOOK_M)){e.addClass("sapSuiteDMCLookS")}else if(i<this.convertRemToPixels(d.THRESHOLD_LOOK_L)){e.addClass("sapSuiteDMCLookM")}if(this._isAnyLabelTruncated(s)){e.addClass("sapSuiteDMCNoRightLabels")}};d.prototype.attachEvent=function(e,t,i,s){a.prototype.attachEvent.call(this,e,t,i,s);if(this.hasListeners("press")){this.$().attr("tabindex",0).addClass("sapSuiteUiMicroChartPointer")}return this};d.prototype.detachEvent=function(e,t,i){a.prototype.detachEvent.call(this,e,t,i);if(!this.hasListeners("press")){this.$().removeAttr("tabindex").removeClass("sapSuiteUiMicroChartPointer")}return this};d.prototype.ontap=function(e){if(r.browser.msie){this.$().trigger("focus")}this.firePress()};d.prototype.onkeydown=function(e){if(e.which===l.SPACE){e.preventDefault()}};d.prototype.onkeyup=function(e){if(e.which===l.ENTER||e.which===l.SPACE){this.firePress();e.preventDefault()}};d.prototype._addTitleAttribute=function(){if(!this.$().attr("title")&&this._hasData()){this.$().attr("title",this.getTooltip_AsString())}};d.prototype._removeTitleAttribute=function(){if(this.$().attr("title")){this.$().removeAttr("title")}};d.prototype._isActuallyANumber=function(e){return!isNaN(e)&&e!==null&&(e!=="Infinity"&&e!=="-Infinity")};d.prototype._hasData=function(){return this._isActuallyANumber(this.getValue1())||this._isActuallyANumber(this.getValue2())};d.prototype.firePress=function(){if(this._hasData()){a.prototype.fireEvent.call(this,"press",arguments)}};n.extendMicroChart(d);return d});