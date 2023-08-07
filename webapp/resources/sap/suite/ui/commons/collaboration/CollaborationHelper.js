/*!
 * 
		SAP UI development toolkit for HTML5 (SAPUI5)
		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/base/Log","sap/ui/core/routing/HashChanger","sap/ui/base/Object"],function(e,t,r){"use strict";var n="sap-url-hash";var a="transient";var i=e.getLogger("sap.suite.ui.commons.collaboration.CollaborationHelper");var s=r.extend("sap.suite.ui.commons.collaboration.CollaborationHelper");s.compactHash=function(e){var t=sap.ushell&&sap.ushell.Container;if(!t){return{url:e}}return t.getServiceAsync("AppState").then(function(t){var r=t.createEmptyAppState(undefined,false);var a=this._getNextKey(r);if(!this._isEligibleForBackendPersistency(t)){i.warning("Transient flag is true. URL will not be shortened");return{url:e}}var s=this._extractURLBeforeHash(e);var o=this._extractSemanticObjectAndAction(e);if(!o){return{url:e}}return this._storeUrl(e,r).then(function(){return{url:s+"#"+o+"&/"+n+"="+a}}).catch(function(t){i.warning("URL is not shortened due to an error."+t.toString());return{url:e}})}.bind(this))};s._getCurrentUrl=function(){var e=sap.ushell&&sap.ushell.Container;return e?new Promise(function(t){e.getFLPUrlAsync(true).done(function(e){t(e)})}):Promise.resolve(document.URL)};s.processAndExpandHash=function(){this._hideAvatarFromShellbar();return this._getCurrentUrl().then(function(e){if(e.indexOf(n)>-1){var t=e.split("#")[1].split("=")[1];return this._retrieveURL(t).then(function(e){window.location.replace(e.getData());return Promise.resolve()})}return Promise.resolve()}.bind(this))};s._hideAvatarFromShellbar=function(){this.isTeamsModeActive().then(function(e){if(e){var t=sap.ui.getCore().byId("meAreaHeaderButton");if(t){t.setVisible(false)}}})};s.isTeamsModeActive=function(){var e=false;var t=sap.ushell&&sap.ushell.Container;var r=t&&t.getService("URLParsing");return this._getCurrentUrl().then(function(t){var n=t.split("#")[0];if(n.indexOf("?")!==-1){var a=r&&r.parseParameters(n.substring(n.indexOf("?")));if(a&&a["sap-collaboration-teams"]&&a["sap-collaboration-teams"][0]&&a["sap-collaboration-teams"][0]==="true"){e=true}var i=false;if(a&&a["appState"]&&a["appState"][0]&&a["appState"][0]==="lean"){i=true}return Promise.resolve(e&&i)}else{return Promise.resolve(false)}})};s._retrieveURL=function(e){if(sap.ushell&&sap.ushell.Container){return sap.ushell.Container.getServiceAsync("AppState").then(function(t){return t.getAppState(e)})}};s._isEligibleForBackendPersistency=function(e){return e&&e._oConfig&&a in e._oConfig&&!e._oConfig[a]};s._getNextKey=function(e){return e.getKey()};s._extractSemanticObjectAndAction=function(e){var t=sap.ushell&&sap.ushell.services&&new sap.ushell.services.URLParsing;if(t){var r=t.parseShellHash(this._extractURLHash(e));if(r){return r.contextRaw?r.semanticObject+"-"+r.action+"~"+r.contextRaw:r.semanticObject+"-"+r.action}}return undefined};s._extractURLBeforeHash=function(e){var t=e.split("#")[0];return t};s._extractURLHash=function(e){var t=e.substring(e.indexOf("#"));return t};s._storeUrl=function(e,t){t.setData(e);return t.save()};return s});