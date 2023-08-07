// Copyright (c) 2009-2022 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/utils/UrlParsing","sap/ushell/utils","sap/ushell/EventHub","sap/base/Log","sap/ui/util/Mobile","sap/ui/thirdparty/jquery","sap/base/util/ObjectPath","sap/base/i18n/ResourceBundle","sap/ushell/resources","sap/ui/core/IconPool","sap/m/library"],function(e,t,n,i,a,r,s,o,u,p,c){"use strict";var l=c.ButtonType;function f(){var c={},f=true,h=null,g=[],m=[];n.on("AppRendered").do(d.bind(this));function d(){f=false;while(m.length>0){m.shift()()}}this.addActivity=function(e){var t=new r.Deferred;sap.ushell.Container.getServiceAsync("UserRecents").then(function(n){n.addActivity(e).done(t.resolve).fail(t.reject)}).catch(t.reject);return t.promise()};this.setApplicationInInitMode=function(){f=true};this.getApplicationRequestQueue=function(){return m};this.getCurrentApplication=function(){return h};this.getCurrentAppliction=this.getCurrentApplication;this.getMetadata=function(e){if(!e){e=h}if(e){var t=hasher&&hasher.getHash?hasher.getHash():"";var n=this._getMemoizationKey(t);return this._getMetadata(e,n)}return{}};this._getMemoizationKey=function(t){var n=t.split("?");var i=n[0];var a=n[1];a=this._processParams(a);if(a){return i+a}var r=e.parseShellHash(t);i=r?r.semanticObject+"-"+r.action:"";return i};this._processParams=function(e){if(e){var t="";var n={};e.split("&").forEach(function(e){var t=e.split("=");n[t[0]]=t[1]});var i=Object.keys(n).sort();var a="";i.forEach(function(e,i){t=i?"&":"?";a+=t+e+"="+n[e]});return a}return""};this._getMetadata=function(e,t){if(!c.hasOwnProperty(t)||!c[t].complete){this.addMetadata(e,t)}if(!c[t]){c[t]={complete:false}}if(!c[t].title){c[t].title=e.text||u.i18n.getText("default_app_title")}return c[t]};this.setCurrentApplication=function(e){h=e;m.splice(0)};this.setHeaderHiding=function(){i.warning("Application configuration headerHiding property is deprecated and has no effect")};this.addApplicationSettingsButtons=function(e){if(f){m.push(function(){y(e)})}else{y(e)}};function y(e){var t,n=[],i=sap.ushell.Container.getRenderer("fiori2");for(t=0;t<e.length;t++){var a=e[t];n.push(a.getId());a.setIcon(a.getIcon()||p.getIconURI("customize"));if(u.i18n.getText("userSettings")===a.getProperty("text")){a.setProperty("text",u.i18n.getText("userAppSettings"))}a.setType(l.Unstyled)}if(sap.ushell.Container&&i){if(g.length){i.hideActionButton(g,true)}g=n;i.showActionButton(n,true,undefined,true)}}this.setWindowTitle=function(e){window.document.title=e};this.setIcons=function(e){a.setIcons(e)};this.setApplicationFullWidth=function(e){n.emit("setApplicationFullWidth",{bValue:e,date:Date.now()})};this.getSettingsControlAsync=function(){var e=new r.Deferred;sap.ui.require(["sap/ushell/ui/footerbar/SettingsButton"],function(t){e.resolve(new t)});return e.promise()};this.getSettingsControl=function(){var e="sap/ushell/ui/footerbar/SettingsButton",t=sap.ui.require(e);if(t){return new t}i.warning("sap.ushell.services.AppConfiguration.getSettingsControl is deprecated. Use getSettingsControlasync instead.");i.error("sap.ushell.services.AppConfiguration.getSettingsControl: sap.ushell.ui.footerbar.SettingsButton must be loaded before use.");return undefined};this.getApplicationName=function(e){var t,n=e&&e.additionalInformation||null;if(n){t=/^SAPUI5\.Component=(.+)$/i.exec(n);if(t){return t[1]}}return null};this.getApplicationUrl=function(e){var t=e&&e.url||null,n="P_TCODE",i;if(t){if(e.applicationType==="NWBC"&&t.indexOf(n)){return t}i=t.indexOf("?");if(i>=0){t=t.slice(0,i)}if(t.slice(-1)!=="/"){t+="/"}}return t};this.getPropertyValueFromConfig=function(e,t,n){var i;if(n&&e.hasOwnProperty(t+"Resource")){i=n.getText(e[t+"Resource"])}else if(e.hasOwnProperty(t)){i=e[t]}return i};this.getPropertyValueFromManifest=function(e,t,n){var i=t[n].manifestEntryKey,a=t[n].path,r=e.getManifestEntry(i);return s.get(a||"",r)};this.addMetadata=function(e,n){try{var a=this.getApplicationName(e),r=this.getApplicationUrl(e),s,u,p={fullWidth:{manifestEntryKey:"sap.ui",path:"fullWidth"},hideLightBackground:{manifestEntryKey:"sap.ui",path:"hideLightBackground"},title:{manifestEntryKey:"sap.app",path:"title"},icon:{manifestEntryKey:"sap.ui",path:"icons.icon"},favIcon:{manifestEntryKey:"sap.ui",path:"icons.favIcon"},homeScreenIconPhone:{manifestEntryKey:"sap.ui",path:"icons.phone"},"homeScreenIconPhone@2":{manifestEntryKey:"sap.ui",path:"icons.phone@2"},homeScreenIconTablet:{manifestEntryKey:"sap.ui",path:"icons.tablet"},"homeScreenIconTablet@2":{manifestEntryKey:"sap.ui",path:"icons.tablet@2"},startupImage320x460:{manifestEntryKey:"sap.ui",path:"icons.startupImage640x920"},startupImage640x920:{manifestEntryKey:"sap.ui",path:"icons.startupImage640x920"},startupImage640x1096:{manifestEntryKey:"sap.ui",path:"icons.startupImage640x1096"},startupImage768x1004:{manifestEntryKey:"sap.ui",path:"icons.startupImage768x1004"},startupImage748x1024:{manifestEntryKey:"sap.ui",path:"icons.startupImage748x1024"},startupImage1536x2008:{manifestEntryKey:"sap.ui",path:"icons.startupImage1536x2008"},startupImage1496x2048:{manifestEntryKey:"sap.ui",path:"icons.startupImage1496x2048"},compactContentDensity:{manifestEntryKey:"sap.ui5",path:"contentDensities.compact"},cozyContentDensity:{manifestEntryKey:"sap.ui5",path:"contentDensities.cozy"}},l,f,h,g,m,d,y,I=e&&e.componentHandle;if(n){if(!c.hasOwnProperty(n)){c[n]={complete:false}}if(!c[n].complete){if(I){s=I.getMetadata()}else if(a){i.warning("No component handle available for '"+a+"'; SAPUI5 component metadata is incomplete",null,"sap.ushell.services.AppConfiguration");return}if(s){u=s.getConfig();g=s.getManifest()!==undefined;c[n].complete=true;if(u){d=u.resourceBundle||"";if(d){if(d.slice(0,1)!=="/"){d=r+d}y=o.create({url:d,locale:sap.ui.getCore().getConfiguration().getLanguage()})}}for(m in p){if(p.hasOwnProperty(m)){if(g){c[n][m]=this.getPropertyValueFromManifest(s,p,m)}if(u&&c[n][m]===undefined){c[n][m]=this.getPropertyValueFromConfig(u,m,y)}}}c[n].version=s.getVersion();c[n].technicalName=s.getComponentName()}else if(t.isApplicationTypeEmbeddedInIframe(e.applicationType)){var v="/~canvas;window=app/wda/",x=e.url.indexOf(v),b="/sap/bc/webdynpro/sap/",A="/bc/gui/sap/its/webgui",C=e.url.indexOf(A);if(x>=0){c[n].technicalName=e.url.substring(x+v.length,e.url.indexOf("/",x+v.length))}if(e.url.indexOf(b)>=0){c[n].technicalName=new RegExp(b+"(.*)[?]").exec(e.url)[1]}c[n].complete=true;if(C>=0){var E="etransaction=",w=e.url.indexOf(E,C+A.length),P=e.url.indexOf("&",w),S=P>=0?P:e.url.length;c[n].technicalName=decodeURIComponent(e.url.substring(w+E.length,S))+" (TCODE)"}}else{i.warning("No technical information for the given application could be determined",null,"sap.ushell.services.AppConfiguration")}}l=["favIcon","homeScreenIconPhone","homeScreenIconPhone@2","homeScreenIconTablet","homeScreenIconTablet@2","startupImage320x460","startupImage640x920","startupImage640x1096","startupImage768x1004","startupImage748x1024","startupImage1536x2008","startupImage1496x2048"];f=r&&r[r.length-1]==="/"?r.substring(0,r.length-1):r;h=function(e){if(e.match(/^https?:\/\/.*/)){return false}return e&&e[0]!=="/"};l.forEach(function(e){var t=c[n][e],i=null;if(t){i=h(t)?f+"/"+t:t}c[n][e]=i})}}catch(e){i.warning("Application configuration could not be parsed")}}}return new f},true);