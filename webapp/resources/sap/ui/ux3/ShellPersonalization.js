/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/base/EventProvider","sap/ui/commons/Button","sap/ui/commons/Dialog","sap/ui/core/theming/Parameters","./ShellColorPicker","sap/ui/commons/library","sap/ui/core/HTML","sap/ui/core/Popup","sap/ui/commons/Tab","sap/ui/core/Item","sap/ui/Device","sap/base/security/encodeXML","sap/ui/core/Configuration"],function(e,t,i,o,s,n,a,r,g,l,h,d,p,c){"use strict";var m=g.Dock;var u=t.extend("sap.ui.ux3.ShellPersonalization",{constructor:function(e){t.apply(this);this.shell=e;this.oSettings={}}});u.prototype.initializeSettings=function(e){this.oSettings=Object.assign({},e);if(this.shell.getDomRef()){this.applySettings(e)}};u.M_EVENTS={personalizationChange:"personalizationChange"};u.prototype.attachPersonalizationChange=function(e,t){this.attachEvent(u.M_EVENTS.personalizationChange,e,t)};u.prototype.detachPersonalizationChange=function(e,t){this.detachEvent(u.M_EVENTS.personalizationChange,e,t)};u.prototype.firePersonalizationChange=function(e){this.fireEvent(u.M_EVENTS.personalizationChange,e)};u.ORIGINAL_SETTINGS={bByDStyle:false,sBgColor:"rgb(17,17,17)",sBgCssImg:null,sBgImgSrc:null,sBgImgPos:"tile",fBgImgOpacity:1,fSidebarOpacity:1,sLineColor:"rgb(239,170,0)",sLogoImageSrc:null,sLogoAlign:"left",bUseLogoSize:false};u.TRANSPARENT_1x1=sap.ui.resource("sap.ui.core","themes/base/img/1x1.gif");u.IMAGE_FOLDER_PATH=sap.ui.require.toUrl("sap/ui/ux3/themes/"+c.getTheme()+"/img/shell/");u.getOriginalSettings=function(){if(!u._bOriginalSettingsInitialized){u._bOriginalSettingsInitialized=true;var e,t,i=Object.assign({sapUiUx3ShellGradientTop:"#000000",sapUiUx3ShellGradientBottom:"#000000"},s.get({name:["sapUiUx3ShellGradientTop","sapUiUx3ShellGradientBottom"],callback:function(e){this._calcGradient(e["sapUiUx3ShellGradientTop"],e["sapUiUx3ShellGradientBottom"]);this.invalidate()}.bind(this)}));e=i["sapUiUx3ShellGradientTop"];t=i["sapUiUx3ShellGradientBottom"];this._calcGradient(e,t)}return u.ORIGINAL_SETTINGS};u.prototype._calcGradient=function(e,t){if(d.browser.firefox){u.ORIGINAL_SETTINGS.sBgCssImg="-moz-linear-gradient(top, "+e+" 0, "+t+" 108px, "+t+")"}else if(d.browser.webkit){u.ORIGINAL_SETTINGS.sBgCssImg="-webkit-linear-gradient(top, "+e+" 0, "+t+" 108px, "+t+")"}};u.prototype.hasChanges=function(){var e=0;for(var t in this.oSettings){e++}return e>0};u.prototype.applySettings=function(e){var t=Object.assign({},u.getOriginalSettings(),e);this.applyByDStyle(t.bByDStyle);this.applyBgColor(t.sBgColor);this.applyBgImage(t.sBgCssImg,t.sBgImgSrc);this.applyBgImageOpacity(t.fBgImgOpacity);if(t.sHeaderImageSrc){this.applyHeaderImage(t.sHeaderImageSrc)}else{this.shell.getDomRef("hdr").style.backgroundImage=""}this.applySidebarOpacity(t.fSidebarOpacity);this.applyBgColor(t.sBgColor);this.applyLineColor(t.sLineColor);this.applyLogoImage(t.sLogoImageSrc);this.applyLogoAlign(t.sLogoAlign);this.applyUseLogoSize(t.bUseLogoSize)};u.prototype.openDialog=function(){if(this.oDialog&&this._getDialog().isOpen()){return}this.oTransientSettings=Object.assign({},this.oSettings);this._getDialog().open();this._bindDragAndDrop("bg");this._bindDragAndDrop("hdr");this._bindDragAndDrop("logo")};u.prototype.getTransientSettingsWithDefaults=function(){return Object.assign({},u.getOriginalSettings(),this.oTransientSettings)};u.prototype._bindDragAndDrop=function(t){if(window.FileReader){var i=this.shell.getId()+"-p13n_";e(document.getElementById(i+t+"ImageImg")).on("dragover",e.proxy(this._handleDragover,this)).on("dragend",e.proxy(this._handleDragend,this)).on("drop",e.proxy(this._handleDrop,this));e(document.getElementById(i+t+"ImageHolder")).on("dragover",e.proxy(this._handleDragover,this)).on("dragend",e.proxy(this._handleDragend,this)).on("drop",e.proxy(this._handleDrop,this))}};u.prototype._unbindDragAndDrop=function(t){if(window.FileReader){var i=this.shell.getId()+"-p13n_";e(document.getElementById(i+"hdrImageImg")).off("dragover",this._handleDragover).off("dragend",this._handleDragend).off("drop",this._handleDrop);e(document.getElementById(i+"hdrImageHolder")).off("dragover",this._handleDragover).off("dragend",this._handleDragend).off("drop",this._handleDrop)}};u.prototype._getDialog=function(){if(!this.oDialog){var t=this.shell.getId()+"-p13n_";var i=Object.assign({},u.getOriginalSettings(),this.oSettings);var o=sap.ui.commons;var s=this;var a=new o.Dialog({title:"Shell Personalization",width:"544px",height:"560px",showCloseButton:false,resizable:false,closed:[function(){this._unbindDragAndDrop("bg");this._unbindDragAndDrop("hdr");this._unbindDragAndDrop("logo");this.oTransientSettings=null},this]}).addStyleClass("sapUiUx3ShellP13n");var g=new o.TabStrip({width:"100%",height:"100%",select:e.proxy(function(t){var i=sap.ui.getCore().byId(t.getParameter("id"));if(i){var o=t.getParameter("index");i.setSelectedIndex(o);var s=this;if(o==0){window.setTimeout(function(){s.shell.$("bgColor").css("background-color",s.getTransientSettingsWithDefaults().sBgColor)},1);window.setTimeout(e.proxy(function(){this._bindDragAndDrop("bg")},this),0)}else if(o==1){window.setTimeout(function(){s.shell.$("lineColor").css("background-color",s.getTransientSettingsWithDefaults().sLineColor)},1);window.setTimeout(e.proxy(function(){this._bindDragAndDrop("hdr")},this),0)}else if(o==2){window.setTimeout(e.proxy(function(){this._bindDragAndDrop("logo")},this),0)}}},this)});this.oBgImgHtml=new r(t+"bgImageHolder",{preferDOM:true,content:"<div id='"+t+"bgImageHolder' class='sapUiUx3ShellP13nImgHolder'><img id='"+t+"bgImageImg' src='"+(this.oTransientSettings.sBackgroundImageSrc?p(this.oTransientSettings.sBackgroundImageSrc):sap.ui.resource("sap.ui.core","themes/base/img/1x1.gif"))+"'></div>"});this.oBgImgOpacitySlider=new o.Slider({value:this.oTransientSettings.fBgImgOpacity!==undefined?100-this.oTransientSettings.fBgImgOpacity*100:100-u.getOriginalSettings().fBgImgOpacity*100,liveChange:e.proxy(this._handleBgImageOpacitySliderChange,this)});this.oSidebarOpacitySlider=new o.Slider({value:this.oTransientSettings.fSidebarOpacity!==undefined?100-this.oTransientSettings.fSidebarOpacity*100:100-u.getOriginalSettings().fSidebarOpacity*100,liveChange:e.proxy(this._handleSidebarOpacitySliderChange,this)});this.oBgColorPicker=new n(t+"bgColorPicker");this.oBgColorPicker.attachLiveChange(function(e){s._handleBgColorChange(e)});var d=new o.Button({text:"Change..."});var s=this;d.attachPress(function(){if(!s.oBgColorPicker.isOpen()){s.oBgColorPicker.open(n.parseCssRgbString(s.getTransientSettingsWithDefaults().sBgColor),m.BeginTop,m.BeginBottom,s.shell.getDomRef("bgColor"))}});this.oBgPreviewHtml=new r({preferDom:true,content:"<div id='"+this.shell.getId()+"-bgColor' style='background-color:"+p(i.sBgColor)+"' class='sapUiUx3ShellColorPickerPreview'></div>"});var c=(new l).setText("Background").addContent(new o.layout.MatrixLayout({layoutFixed:false}).createRow(new o.Label({text:"Background Image:"}),this.oBgImgHtml).createRow(new o.Label({text:"Image Transparency:"}),this.oBgImgOpacitySlider).createRow(new o.Label({text:"Background Color:"}),(new o.layout.MatrixLayoutCell).addContent(this.oBgPreviewHtml).addContent(d)).createRow(null).createRow(new o.Label({text:"Sidebar Transparency:"}),this.oSidebarOpacitySlider));g.addTab(c);this.oByDStyleCb=new o.CheckBox({text:"ByDesign-style Header Bar",checked:this.oTransientSettings.bByDStyle,change:e.proxy(this._handleByDStyleChange,this)});this.oHdrImgHtml=new r(t+"hdrImageHolder",{preferDOM:true,content:"<div id='"+t+"hdrImageHolder' class='sapUiUx3ShellP13nImgHolder'><img id='"+t+"hdrImageImg' src='"+(this.oTransientSettings.sHeaderImageSrc?p(this.oTransientSettings.sHeaderImageSrc):sap.ui.resource("sap.ui.core","themes/base/img/1x1.gif"))+"'></div>"});this.oLineColorPicker=new n(t+"lineColorPicker");this.oLineColorPicker.attachLiveChange(function(e){s._handleLineColorChange(e)});var S=new o.Button({text:"Change..."});var s=this;S.attachPress(function(){if(!s.oLineColorPicker.isOpen()){s.oLineColorPicker.open(n.parseCssRgbString(s.getTransientSettingsWithDefaults().sLineColor),m.BeginTop,m.BeginBottom,s.shell.getDomRef("lineColor"))}});this.oLinePreviewHtml=new r({preferDom:true,content:"<div id='"+this.shell.getId()+"-lineColor' style='background-color:"+p(i.sLineColor)+"' class='sapUiUx3ShellColorPickerPreview'></div>"});var y=(new l).setText("Header Bar").addContent(new o.layout.MatrixLayout({layoutFixed:false}).createRow(new o.Label({text:"Line Color (ByD-style only):"}),(new o.layout.MatrixLayoutCell).addContent(this.oLinePreviewHtml).addContent(S)).createRow(null).createRow(new o.Label({text:"Header Image:"}),this.oHdrImgHtml));g.addTab(y);this.oLogoImgHtml=new r(t+"logoImageHolder",{preferDOM:true,content:"<div id='"+t+"logoImageHolder' class='sapUiUx3ShellP13nImgHolder'><img id='"+t+"logoImageImg' src='"+(this.oTransientSettings.sLogoImageSrc?p(this.oTransientSettings.sLogoImageSrc):sap.ui.resource("sap.ui.core","themes/base/img/1x1.gif"))+"'></div>"});this.oLogoRbg=(new o.RadioButtonGroup).addItem(new h({text:"Left",key:"left"})).addItem(new h({text:"Center",key:"center"})).attachSelect(this._handleLogoAlignChange,this);this.oUseLogoSizeCb=new o.CheckBox({text:"Use original image size",checked:this.oTransientSettings.bUseLogoSize,change:e.proxy(this._handleUseLogoSizeChange,this)});var I=(new l).setText("Logo").addContent(new o.layout.MatrixLayout({layoutFixed:false}).createRow(new o.Label({text:"Logo Image:"}),this.oLogoImgHtml).createRow(new o.Label({text:"Position:"}),this.oLogoRbg).createRow(this.oUseLogoSizeCb));g.addTab(I);a.addContent(g);var s=this;a.addButton(new o.Button({text:"Reset All",press:function(){s.applySettings(Object.assign({},u.getOriginalSettings()));s.oSettings={};s.oTransientSettings={};s.updateDialog();s._bindDragAndDrop("bg");s._bindDragAndDrop("hdr");s._bindDragAndDrop("logo");s.firePersonalizationChange({settings:{}})}}));a.addButton(new o.Button({text:"OK",press:function(){s.oSettings=Object.assign({},s.oTransientSettings);s.firePersonalizationChange({settings:s.oSettings});a.close()}}));a.addButton(new o.Button({text:"Cancel",press:function(){a.close()}}));this.oDialog=a}return this.oDialog};u.prototype.updateDialog=function(){var e=Object.assign({},u.getOriginalSettings(),this.oSettings);var t=this.shell.getId()+"-p13n_";this.oBgImgHtml.setContent("<div id='"+t+"bgImageHolder' class='sapUiUx3ShellP13nImgHolder'><img id='"+t+"bgImageImg' src='"+(e.sBackgroundImageSrc?p(e.sBackgroundImageSrc):sap.ui.resource("sap.ui.core","themes/base/img/1x1.gif"))+"'></div>");this.oBgImgOpacitySlider.setValue(100-e.fBgImgOpacity*100);this.oSidebarOpacitySlider.setValue(100-e.fSidebarOpacity*100);this.oByDStyleCb.setChecked(e.bByDStyle);this.oHdrImgHtml.setContent("<div id='"+t+"hdrImageHolder' class='sapUiUx3ShellP13nImgHolder'><img id='"+t+"hdrImageImg' src='"+(e.sHeaderImageSrc?p(e.sHeaderImageSrc):sap.ui.resource("sap.ui.core","themes/base/img/1x1.gif"))+"'></div>");this.oLogoRbg.setSelectedIndex(e.sLogoAlign=="center"?1:0);this.oUseLogoSizeCb.setChecked(e.bUseLogoSize);this.oLogoImgHtml.setContent("<div id='"+t+"logoImageHolder' class='sapUiUx3ShellP13nImgHolder'><img id='"+t+"logoImageImg' src='"+(e.sLogoImageSrc?p(e.sLogoImageSrc):sap.ui.resource("sap.ui.core","themes/base/img/1x1.gif"))+"'></div>")};u.prototype._handleByDStyleChange=function(e){var t=e.getParameter("checked");this.oTransientSettings.bByDStyle=t;this.applyByDStyle(t)};u.prototype.applyByDStyle=function(e){this.shell.$().toggleClass("sapUiUx3ShellByD",e)};u.prototype._handleBgColorChange=function(e){var t=e.getParameter("cssColor");this.oTransientSettings.sBgColor=t;this.applyBgColor(t)};u.prototype.applyBgColor=function(e){this.shell.$("bg").css("background-color",e);this.shell.$("bgColor").css("background-color",e)};u.prototype._handleBackgroundImageChange=function(e,t){var i=true;if(t){if(i){this.oSettings.sBgCssImg="url("+e+")";this.oSettings.sBgImgSrc=null}else{this.oSettings.sBgCssImg=null;this.oSettings.sBgImgSrc=e}this.applyBgImage(this.oSettings.sBgCssImg,this.oSettings.sBgImgSrc);this.firePersonalizationChange({settings:this.oSettings})}else{if(i){this.oTransientSettings.sBgCssImg="url("+e+")";this.oTransientSettings.sBgImgSrc=null}else{this.oTransientSettings.sBgCssImg=null;this.oTransientSettings.sBgImgSrc=e}this.applyBgImage(this.oTransientSettings.sBgCssImg,this.oTransientSettings.sBgImgSrc)}};u.prototype.applyBgImage=function(e,t){e=e?e:"";t=t?t:u.TRANSPARENT_1x1;var i=this.shell.getDomRef("bgImg");i.style.backgroundImage=e;i.src=t};u.prototype._handleHeaderImageChange=function(e,t){if(t){this.oSettings.sHeaderImageSrc=e;this.firePersonalizationChange({settings:this.oSettings})}else{this.oTransientSettings.sHeaderImageSrc=e}this.applyHeaderImage(e)};u.prototype.applyHeaderImage=function(e){this.shell.$("hdr").css("background-image","url("+e+")");if(this.oDialog&&this.oDialog.isOpen()){this.shell.$("p13n_hdrImageImg").attr("src",e)}};u.prototype._handleLineColorChange=function(e){var t=e.getParameter("cssColor");this.oTransientSettings.sLineColor=t;this.applyLineColor(t)};u.prototype.applyLineColor=function(e){this.shell.$("hdr").find("hr").css("background-color",e);this.shell.$("lineColor").css("background-color",e)};u.prototype._handleBgImageOpacitySliderChange=function(e){var t=(100-e.getParameter("value"))/100;this.oTransientSettings.fBgImgOpacity=t;this.applyBgImageOpacity(t)};u.prototype.applyBgImageOpacity=function(e){this.shell.$("bgImg").css("opacity",e)};u.prototype._handleSidebarOpacitySliderChange=function(e){var t=(100-e.getParameter("value"))/100;this.oTransientSettings.fSidebarOpacity=t;this.applySidebarOpacity(t)};u.prototype.applySidebarOpacity=function(e){this.shell.$("tp").css("opacity",e);this.shell.$("paneBar").children(":nth-child(2)").css("opacity",e)};u.prototype._handleLogoImageChange=function(e,t){if(t){this.oSettings.sLogoImageSrc=e;this.firePersonalizationChange({settings:this.oSettings})}else{this.oTransientSettings.sLogoImageSrc=e}this.applyLogoImage(e)};u.prototype.applyLogoImage=function(e){if(!e){e=this.shell.getAppIcon();if(!e){e=u.TRANSPARENT_1x1}}this.shell.$("logoImg").attr("src",e);this.shell.$("p13n_logoImageImg").attr("src",e)};u.prototype._handleLogoAlignChange=function(e){var t=e.getParameter("selectedIndex");var i=["left","center"][t];this.oTransientSettings.sLogoAlign=i;this.applyLogoAlign(i)};u.prototype.applyLogoAlign=function(e){var t=e;if(c.getRTL()&&t=="right"){t="left"}this.shell.$("hdr").css("text-align",t)};u.prototype._handleUseLogoSizeChange=function(e){var t=e.getParameter("checked");this.oTransientSettings.bUseLogoSize=t;this.applyUseLogoSize(t)};u.prototype.applyUseLogoSize=function(e){this.shell.$("hdr").toggleClass("sapUiUx3ShellHeaderFlex",e);this.shell.$("hdrImg").toggleClass("sapUiUx3ShellHeaderImgFlex",e)};u.prototype._handleDragover=function(t){var i=t.target.id;if(!this._dragOverBlinking){var o=e(document.getElementById(i));o.css("opacity","0.5");this._dragOverBlinking=true;var s=this;window.setTimeout(function(){o.css("opacity","1");window.setTimeout(function(){s._dragOverBlinking=null},250)},250)}return false};u.prototype._handleDragend=function(e){return false};u.prototype._handleDrop=function(t){var i=t.target.id;t.preventDefault();var o=t.originalEvent;var s=o.dataTransfer.files[0];if(s){var n=new window.FileReader;n.onload=e.proxy(function(e){var t=e.target.result;if(i==this.shell.getId()+"-p13n_bgImageImg"||i==this.shell.getId()+"-p13n_bgImageHolder"){this._handleBackgroundImageChange(t)}else if(i==this.shell.getId()+"-p13n_hdrImageImg"||i==this.shell.getId()+"-p13n_hdrImageHolder"){this._handleHeaderImageChange(t)}else if(i==this.shell.getId()+"-p13n_logoImageImg"||i==this.shell.getId()+"-p13n_logoImageHolder"){this._handleLogoImageChange(t)}n=null},this);n.readAsDataURL(s)}};return u});