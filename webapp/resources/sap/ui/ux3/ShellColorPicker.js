/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/base/EventProvider","sap/ui/commons/Button","sap/ui/core/Popup","sap/ui/commons/Slider","sap/ui/Device"],function(e,t,o,i,r,s){"use strict";var n=t.extend("sap.ui.ux3.ShellColorPicker",{constructor:function(e){t.apply(this);this.id=e}});n.M_EVENTS={liveChange:"liveChange"};n.prototype.attachLiveChange=function(e,t){this.attachEvent(n.M_EVENTS.liveChange,e,t)};n.prototype.detachLiveChange=function(e,t){this.detachEvent(n.M_EVENTS.liveChange,e,t)};n.prototype.fireLiveChange=function(e){var t={cssColor:n.hslToCss(e)};this.fireEvent(n.M_EVENTS.liveChange,t)};n.prototype.isOpen=function(){return this.oPopup&&this.oPopup.isOpen()};n.prototype.open=function(t,s,n,a,h,l,u){if(this.oPopup&&this.oPopup.isOpen()){return}this.oSlider=new r({width:"225px",liveChange:[this.handleSlider,this]});this.oOkBtn=new o({text:"OK",press:[this.handleOk,this]});this.oCancelBtn=new o({text:"Cancel",press:[this.handleCancel,this]});this.oInitialColor=t;this.oCurrentColor=Object.assign({},this.oInitialColor);this.oSlider.setValue(this.oCurrentColor.l);var d=sap.ui.getCore().createRenderManager();var p=document.createElement("div");var c=sap.ui.getCore().getStaticAreaRef();c.appendChild(p);this.renderHtml(d);d.flush(p);d.destroy;this.oPopup=new i(p.firstChild,false,true,true).attachClosed(this.handleClose,this);this.oPopup.setAutoCloseAreas([p.firstChild]);this.oPopup.open(s,n,a,h,l,u);c.removeChild(p);p=null;e(document.getElementById(this.id)).on("mousedown",e.proxy(this.handleGeneralMouseDown,this));e(document.getElementById(this.id+"-img")).on("mousedown",e.proxy(this.handleMouseDown,this));e(document.getElementById(this.id+"-marker")).on("mousedown",e.proxy(this.handleMouseDown,this));this._imgOffset=e(document.getElementById(this.id+"-img")).offset();this.adaptSliderBar(this.oCurrentColor);this.markColorOnImage(this.oCurrentColor);this.adaptPreview(this.oCurrentColor)};n.parseCssRgbString=function(e){e=e.replace(/rgb\(/,"").replace(/\)/,"").trim();var t=e.split(",");var o={r:parseInt(t[0]),g:parseInt(t[1]),b:parseInt(t[2])};return n.rgbToHsl(o)};n.prototype.renderHtml=function(e){e.write("<div id='"+this.id+"' class='sapUiUx3ShellColorPicker'>");e.write("<img id='"+this.id+"-img' src='"+sap.ui.resource("sap.ui.ux3","img/colors-h.png")+"'>");e.renderControl(this.oSlider);e.write("<div id='"+this.id+"-grad' class='sapUiUx3ShellColorPickerGradient'></div>");e.write("<div id='"+this.id+"-marker' class='sapUiUx3ShellColorPickerMarker'></div>");e.write("<div id='"+this.id+"-preview' class='sapUiUx3ShellColorPickerPreview'></div>");e.renderControl(this.oOkBtn);e.renderControl(this.oCancelBtn);e.write("</div>")};n.prototype.markColorOnImage=function(t){var o=t.h*225;var i=(1-t.s)*75;e(document.getElementById(this.id+"-marker")).css("left",o+10).css("top",i+10)};n.prototype.markColorOnSlider=function(e){this.oSlider.setValue(e.l)};n.prototype.adaptSliderBar=function(t){var o="";var i=Object.assign({},t);i.l=50;var r=n.hslToCss(i);if(s.browser.firefox){o="-moz-linear-gradient(left, black, "+r+", white)"}else if(s.browser.webkit){o="-webkit-gradient(linear, left center, right center, from(#000), color-stop(0.5, "+r+"), to(#FFF))"}e(document.getElementById(this.id+"-grad")).css("background-image",o)};n.prototype.adaptPreview=function(t){e(document.getElementById(this.id+"-preview")).css("background-color",n.hslToCss(t))};n.prototype.handleSlider=function(e){var t=e.getParameter("value");this.oCurrentColor.l=t;this.adaptPreview(this.oCurrentColor);this.fireLiveChange(this.oCurrentColor)};n.prototype.handleGeneralMouseDown=function(e){e.preventDefault()};n.prototype.handleMouseDown=function(t){this.handleMousePos(t);t.preventDefault();e(document).on("mousemove",e.proxy(this.handleMousePos,this)).on("mouseup",e.proxy(this.handleMouseUp,this))};n.prototype.handleMouseUp=function(t){this.handleMousePos(t);e(document).off("mousemove",this.handleMousePos).off("mouseup",this.handleMouseUp)};n.prototype.handleMousePos=function(e){var t=e.pageX-this._imgOffset.left;var o=e.pageY-this._imgOffset.top;t=Math.min(Math.max(t,0),225);o=Math.min(Math.max(o,0),75);var i=t/225;var r=1-o/75;this.oCurrentColor.h=i;this.oCurrentColor.s=r;this.adaptSliderBar(this.oCurrentColor);this.markColorOnImage(this.oCurrentColor);this.adaptPreview(this.oCurrentColor);this.fireLiveChange(this.oCurrentColor)};n.prototype.handleOk=function(){this.fireLiveChange(this.oCurrentColor);this.oPopup.close()};n.prototype.handleCancel=function(){this.fireLiveChange(this.oInitialColor);this.oPopup.close()};n.prototype.handleClose=function(){e(document.getElementById(this.id+"-img")).off("mousedown",this.handleMouseDown);e(document.getElementById(this.id+"-marker")).off("mousedown",this.handleMouseDown);e(document).off("mousemove",this.handleMousePos).off("mouseup",this.handleMouseUp);e(document.getElementById(this.id)).off("mousedown",this.handleGeneralMouseDown);this.oSlider.destroy();this.oSlider=null;this.oOkBtn.destroy();this.oOkBtn=null;this.oCancelBtn.destroy();this.oCancelBtn=null;var t=document.getElementById(this.id);t.parentNode.removeChild(t);this.oPopup.destroy();this.oPopup=null};n.rgbToHsl=function(e){var t=e.r/255,o=e.g/255,i=e.b/255;var r=Math.max(t,o,i);var s=Math.min(t,o,i);var n,a,h=(r+s)/2;if(r==s){n=a=0}else{var l=r-s;a=h>.5?l/(2-r-s):l/(r+s);switch(r){case t:n=(o-i)/l+(o<i?6:0);break;case o:n=(i-t)/l+2;break;case i:n=(t-o)/l+4;break}n/=6}return{h:n,s:a,l:h*100}};n.hslToRgb=function(e){var t,o,i;var r=e.l/100;if(e.s==0){t=o=i=r}else{var s=r<.5?r*(1+e.s):r+e.s-r*e.s;var a=2*r-s;t=n.hueToRgb(a,s,e.h+1/3);o=n.hueToRgb(a,s,e.h);i=n.hueToRgb(a,s,e.h-1/3)}return[t*255,o*255,i*255]};n.hueToRgb=function(e,t,o){if(o<0){o+=1}if(o>1){o-=1}if(o<1/6){return e+(t-e)*6*o}if(o<1/2){return t}if(o<2/3){return e+(t-e)*(2/3-o)*6}return e};n.hslToCss=function(e){var t=n.hslToRgb(e);return"rgb("+Math.round(t[0])+","+Math.round(t[1])+","+Math.round(t[2])+")"};return n});