/*!
 * 
		SAP UI development toolkit for HTML5 (SAPUI5)
		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/base/Log","sap/ui/core/Core","sap/base/security/URLListValidator","./CollaborationHelper","sap/suite/ui/commons/collaboration/BaseHelperService","sap/ui/performance/trace/FESRHelper","sap/ui/core/Element"],function(e,t,a,s,r,n,i){"use strict";var o=r.extend("sap.suite.ui.commons.collaboration.TeamsHelperService");var l="7e4759cc-15a7-4f18-8de5-19d1273e6ca3";var p=e.getLogger("sap.suite.ui.commons.collaboration.TeamsHelperService");var u=t.getLibraryResourceBundle("sap.suite.ui.commons");var c=new i;o.prototype.getOptions=function(e){var t={isShareAsLinkEnabled:true,isShareAsTabEnabled:true};var a=e||t;var s=[];var r=[];if(a.isShareAsLinkEnabled){if(this._providerConfig.isShareAsLinkEnabled){s.push({text:u.getText("COLLABORATION_MSTEAMS_CHAT"),key:"COLLABORATION_MSTEAMS_CHAT",icon:"sap-icon://post"})}else{p.info("Share as Chat option is not enabled in the tenant")}}else{p.info("Consumer disable Share as Chat option")}if(a.isShareAsTabEnabled){if(this._isShareAsTabEnabled()){s.push({text:u.getText("COLLABORATION_MSTEAMS_TAB"),key:"COLLABORATION_MSTEAMS_TAB",icon:"sap-icon://image-viewer"})}else{p.info("Share as Tab option is not enabled in the tenant")}}else{p.info("Consumer disable Share as Tab option")}if(s.length===1){r=s;if(r[0].key==="COLLABORATION_MSTEAMS_CHAT"){r[0].text=u.getText("COLLABORATION_MSTEAMS_CHAT_SINGLE")}else if(r[0].key==="COLLABORATION_MSTEAMS_TAB"){r[0].text=u.getText("COLLABORATION_MSTEAMS_TAB_SINGLE")}return r}if(s.length>1){r.push({type:"microsoft",text:u.getText("COLLABORATION_MSTEAMS_SHARE"),icon:"sap-icon://collaborate",subOptions:s})}return r};o.prototype.share=function(e,t){if(!t.url){p.error("url is not supplied in object so terminating Click");return}if(!a.validate(t.url)){p.error("Invalid URL supplied");return}if(e.key==="COLLABORATION_MSTEAMS_CHAT"){this._shareAsChat(t);return}if(e.key==="COLLABORATION_MSTEAMS_TAB"){this._shareAsTab(t);return}};o.prototype._shareAsChat=function(e){n.setSemanticStepname(c,"press","fe:ShareAsLink");var t=window.open("","ms-teams-share-popup","width=700,height=600");var a=e.appTitle;if(e.subTitle.length>0){a+=": "+e.subTitle}t.opener=null;if(e.minifyUrlForChat){s.compactHash(e.url,[]).then(function(e){t.location="https://teams.microsoft.com/share?msgText="+encodeURIComponent(a)+"&href="+encodeURIComponent(e.url)})}else{t.location="https://teams.microsoft.com/share?msgText="+encodeURIComponent(a)+"&href="+encodeURIComponent(e.url)}};o.prototype._shareAsTab=function(e){n.setSemanticStepname(c,"press","fe:ShareAsTab");var t=sap.ushell&&sap.ushell.Container;var a=t&&t.getService("URLParsing");var s=e.url;var r=s.indexOf("#");if(r!==-1){var i=s.substring(0,r);var o=i.indexOf("?",0);var p="appState=lean&sap-collaboration-teams=true";if(o!==-1){i=i.substring(0,o+1)+p+"&"+i.substring(o+1)}else{i+="?"+p}s=i+s.substring(r);r=s.indexOf("#");var u=a.parseShellHash(s.substring(r));u.params["sap-ushell-navmode"]="explace";u.params["sap-ushell-next-navmode"]="explace";var h=a.constructShellHash(u);s=s.substring(0,r)+"#"+h}var f={subEntityId:{url:s,appTitle:e.appTitle,subTitle:e.subTitle,mode:"tab"}};var A="https://teams.microsoft.com/l/entity/"+l+"/home?&context="+encodeURIComponent(JSON.stringify(f));sap.m.URLHelper.redirect(A,true)};o.prototype._isShareAsTabEnabled=function(){if(window["sap-ushell-config"]&&window["sap-ushell-config"].renderers&&window["sap-ushell-config"].renderers.fiori2&&window["sap-ushell-config"].renderers.fiori2.componentData&&window["sap-ushell-config"].renderers.fiori2.componentData.config&&window["sap-ushell-config"].renderers.fiori2.componentData.config.sapHorizonEnabled){return true}return false};return o});