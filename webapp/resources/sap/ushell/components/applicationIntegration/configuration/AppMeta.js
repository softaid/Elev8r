// Copyright (c) 2009-2022 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/services/AppConfiguration","sap/ushell/components/applicationIntegration/elements/model","sap/ui/Device","sap/ushell/Config","sap/ushell/utils","sap/ushell/resources","sap/ushell/EventHub","sap/ushell/components/applicationIntegration/relatedShellElements/RelatedShellElements","sap/ui/thirdparty/jquery","sap/ui/performance/Measurement","sap/ui/util/Mobile"],function(e,t,n,i,a,s,o,r,l,c,u){"use strict";function p(){var p,h=this,f,m,g;this.getIsTitleChanged=function(){return p};this.getIsRelatedAppsChanged=function(){return g};this.getHierarchyDefaultValue=function(){var e=[];var t=i.last("/core/shell/model/currentState/stateName");if(t&&(t==="app"||t==="embedded")){e=[{icon:"sap-icon://home",title:s.i18n.getText("actionHomePage"),intent:m?"#"+m:"#"}];var n=i.last("/core/shell/model/currentSpaceAndPage");if(n!==undefined){e.splice(0,0,{icon:"sap-icon://circle-task-2",title:n.pageTitle,subtitle:n.pageTitle!==n.spaceTitle?n.spaceTitle:undefined,intent:"#"+n.hash})}}return e};this.init=function(e){m=e};this.getIsHierarchyChanged=function(){return f};this.onHierarchyChange=function(e){f=true;var n=e.getParameters().data,a=[],s=i.last("/core/shell/model/currentState/stateName");if(!n){n=[]}var o=h.getHierarchyDefaultValue();n.forEach(function(e,t){a[t]=l.extend({},e)});a=a.concat(o);if(s==="home"){t.updateStateProperty("application/hierarchy",a,false,["home"])}t.updateStateProperty("application/hierarchy",a,true)};this.onRelatedAppsChange=function(e){g=true;var n=e.getParameters().data,a=i.last("/core/shell/model/currentState/stateName");if(!n){n=[]}if(a==="home"){t.updateStateProperty("application/relatedApps",n,false,["home"])}t.updateStateProperty("application/relatedApps",n,true)};this.resetShellUIServiceHandlers=function(){g=false;f=false;p=false};this.onTitleChange=function(e){p=true;var n=e.getParameters().data;if(!n){n=this.getAppMeta().getTitleDefaultValue()}var s=i.last("/core/shell/model/currentState/stateName");if(s==="home"){t.updateStateProperty("application/title",n,false,["home"])}t.updateStateProperty("application/title",n,true);r.genericSetItem("application/title",n);window.document.title=n;a.setPerformanceMark("FLP -- title change");o.emit("TitleChanged",n)};this._getDefaultFavIcon=function(e){var t=e.get("sapUiShellFavicon");if(t){var n=/url[\s]*\('?"?([^'")]*)'?"?\)/.exec(t);if(n){t=n[1]}else if(t==="''"||t==="none"){t=null}}if(!t){var i=sap.ui.require.toUrl("sap/ushell");return i+"/themes/base/img/launchpad_favicon.ico"}return t};this.getFavIconHref=function(){return l("link").filter('[rel="shortcut icon"]').attr("href")||""};this.getAppIcon=function(){var t="sap-icon://folder",n=e.getMetadata();if(n&&n.icon){t=n.icon}return t};this.setAppIcons=function(e){c.start("FLP:ShellController.setAppIcons","setValues","FLP");sap.ui.require(["sap/ui/core/theming/Parameters"],function(t){if(sap.ui.getCore().isThemeApplied()){this.setValues(e,t)}else{sap.ui.getCore().attachThemeChanged(function(){this.setValues(e,t)}.bind(this))}}.bind(this));c.end("FLP:ShellController.setAppIcons")};this.setValues=function(e,t){var i=sap.ui.require.toUrl("sap/ushell"),a=e&&e.homeScreenIconPhone||i+"/themes/base/img/launchicons/57_iPhone_Desktop_Launch.png",s=e&&e["homeScreenIconPhone@2"]||i+"/themes/base/img/launchicons/114_iPhone-Retina_Web_Clip.png",o=e&&e.homeScreenIconTablet||i+"/themes/base/img/launchicons/72_iPad_Desktop_Launch.png",r=e&&e["homeScreenIconTablet@2"]||i+"/themes/base/img/launchicons/144_iPad_Retina_Web_Clip.png",l=e&&e.favIcon||this._getDefaultFavIcon(t),c=this.getFavIconHref();if(n.os.ios){u.setIcons({phone:a,"phone@2":s,tablet:o,"tablet@2":r,favicon:l,precomposed:false})}else if(c!==l){u.setIcons({phone:"","phone@2":"",tablet:"","tablet@2":"",favicon:l,precomposed:true})}};this._applyContentDensityByPriority=function(t,i){var a=this;return new Promise(function(s){sap.ushell.Container.getServiceAsync("UserInfo").then(function(o){var r;if(t===undefined){if(n.system.combi){var l=o.getUser(),c="autoDetect";if(l){c=l.getContentDensity()}switch(c){case"cozy":t=false;break;case"compact":t=true;break;default:r=e.getMetadata();if(r.compactContentDensity&&!r.cozyContentDensity){t=true}else{t=false}}}else{r=e.getMetadata();if(r.compactContentDensity&&!r.cozyContentDensity){t=true}else if(!r.compactContentDensity&&r.cozyContentDensity){t=false}else{t=a._isCompactContentDensityByDevice()}}}a._applyContentDensityClass(t,i).then(s)})})};this._applyContentDensityClass=function(e,t){return new Promise(function(n,i){function a(e){l("body").toggleClass("sapUiSizeCompact",e).toggleClass("sapUiSizeCozy",!e);if(t===true){sap.ui.require(["sap/ushell/components/applicationIntegration/AppLifeCycle"],function(t){t.postMessageToIframeApp("sap.ushell.appRuntime","uiDensityChange",{isTouch:e?"0":"1"})})}n()}if(e===undefined){sap.ushell.Container.getServiceAsync("UserInfo").then(function(e){var t=e.getUser?e.getUser():undefined;var n;if(t&&t.getContentDensity()==="compact"){n=true}else if(t&&t.getContentDensity()==="cozy"){n=false}else{n=h._isCompactContentDensityByDevice()}a(n)})}else{a(!!e)}})};this._isCompactContentDensityByDevice=function(){return!n.support.touch||n.system.combi};this.getTitleDefaultValue=function(){var t="",n=e.getMetadata();if(n&&n.title){t=n.title}return t};this.create=function(){};this.restore=function(e){this._applyContentDensityByPriority();this.setAppIcons(e)};this.store=function(e){};this.destroy=function(e){}}return new p},true);