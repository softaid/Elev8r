/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/commons/Button","sap/ui/core/Control","sap/ui/core/theming/Parameters","./library","./FeederRenderer","sap/ui/commons/library","sap/ui/Device"],function(e,t,n,o,r,i,s,u){"use strict";var a=s.ButtonStyle;var p=r.FeederType;var d=n.extend("sap.ui.ux3.Feeder",{metadata:{deprecated:true,library:"sap.ui.ux3",properties:{thumbnailSrc:{type:"sap.ui.core.URI",group:"Data",defaultValue:null},text:{type:"string",group:"Data",defaultValue:null},type:{type:"sap.ui.ux3.FeederType",group:"Appearance",defaultValue:p.Large},placeholderText:{type:"string",group:"Appearance",defaultValue:null}},events:{submit:{parameters:{text:{type:"string"}}}}}});d.prototype.init=function(){this.rb=sap.ui.getCore().getLibraryResourceBundle("sap.ui.ux3");this.oSendButton=new t(this.getId()+"-send",{style:a.Emph,icon:"sap-icon://feeder-arrow"}).setParent(this);this.oSendButton.attachEvent("press",this.handleSendButtonPress,this)};d.prototype.initSendButton=function(){if(this.getText()==""){this.oSendButton.setProperty("enabled",false,true)}};d.prototype.exit=function(){this.rb=undefined;this.oInput=undefined;if(this.oSendButton){this.oSendButton.destroy();delete this.oSendButton}};d.prototype.onAfterRendering=function(){this.oInput=this.$("input")};d.prototype.onclick=function(e){var t=e.target.getAttribute("ID");switch(t){case this.getId()+"-send":break;case this.getId()+"-input":break;default:break}};d.prototype.onfocusin=function(e){this.oInput.find(".sapUiFeederEmptyText").remove()};d.prototype.onfocusout=function(e){var t=this.oInput.text();if(t==""){this.oInput.empty();this.oInput.append(i.getEmptyTextInfo(this))}this.setProperty("text",t,true)};d.prototype.getFocusDomRef=function(){return this.getDomRef("input")};d.prototype.onkeyup=function(e){if(this.oInput.text()==""){this.oSendButton.setEnabled(false)}else{this.oSendButton.setEnabled(true)}};d.prototype.handleSendButtonPress=function(e){var t=this.getMultilineText(this.oInput);this.setProperty("text",t,true);this.fireSubmit({text:t});this.setText("")};d.prototype.getMultilineText=function(t){function n(t){var o;var r="";for(var i=0;i<t.length;i++){o=t[i];if(o.nodeType===3||o.nodeType===4){if(!((u.browser.msie||u.browser.edge)&&o.nodeValue===" ")){r+=o.nodeValue.replace(/\n/g,"")}}if(o.nodeName==="DIV"||o.nodeName==="P"||o.nodeName==="BR"&&!u.browser.webkit){if(o.nodeName==="BR"&&u.browser.firefox&&i===t.length-1&&e(o).attr("type")==="_moz"){continue}if(!((u.browser.msie||u.browser.edge)&&r==="")&&!((u.browser.firefox||u.browser.webkit)&&r===""&&o.nodeName==="P")&&!(u.browser.webkit&&o.nodeName==="P"&&o.textContent.match(/^(\n)*$/))){r+="\n"}}if(o.nodeType!==8){r+=n(o.childNodes)}}return r}return n(t.get(0).childNodes)};d.prototype.getThumbnailSrc=function(){var e=this.getProperty("thumbnailSrc");if(!e||e==""){var t=this.getParent();if(t&&(t instanceof sap.ui.ux3.Feed||t instanceof sap.ui.ux3.FeedChunk)){e=t.getFeederThumbnailSrc()}}return e};d.prototype.onpaste=function(e){if(u.browser.firefox){setTimeout(this.onAfterPaste.bind(this),10)}};d.prototype.onAfterPaste=function(){var t=this.oInput.get(0).childNodes;for(var n=0;n<t.length;n++){var o=t[n];if(o.nodeName=="PRE"){e(o).css("overflow","hidden")}}};return d});