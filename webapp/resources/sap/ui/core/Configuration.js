/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["../Device","../base/Object","./CalendarType","./Locale","./format/TimezoneUtil","sap/ui/thirdparty/URI","sap/ui/core/_ConfigurationProvider","sap/base/util/UriParameters","sap/base/util/deepEqual","sap/base/util/Version","sap/base/Log","sap/base/assert","sap/base/util/deepClone","sap/base/util/extend","sap/base/util/isEmptyObject"],function(e,t,a,i,n,r,o,s,u,l,g,c,f,d,h){"use strict";var p;var m;var y="1.109.0";function b(){function t(){if(e.os.android){var t=navigator.userAgent.match(/\s([a-z]{2}-[a-z]{2})[;)]/i);if(t){return t[1]}}return navigator.language}return _(navigator.languages&&navigator.languages[0]||t()||navigator.userLanguage||navigator.browserLanguage)||new i("en")}function x(e,t,a){if(t==null){return}a[e]=C(e,t)}function C(e,t){if(t==null){return}switch(m[e].type){case"boolean":if(typeof t==="string"){if(m[e].defaultValue){return t.toLowerCase()!="false"}else{return t.toLowerCase()==="true"||t.toLowerCase()==="x"}}else{return!!t}case"string":return""+t;case"code":return typeof t==="function"?t:String(t);case"function":if(typeof t!=="function"){throw new Error("unsupported value")}return t;case"function[]":t.forEach(function(e){if(typeof e!=="function"){throw new Error("Not a function: "+e)}});return t.slice();case"string[]":if(Array.isArray(t)){return t}else if(typeof t==="string"){return t.split(/[ ,;]/).map(function(e){return e.trim()})}else{throw new Error("unsupported value")}case"object":if(typeof t!=="object"){throw new Error("unsupported value")}return t;case"Locale":var a=_(t);if(a||m[e].defaultValue==null){return a}else{throw new Error("unsupported value")}default:var i=m[e].type;if(typeof i==="object"){D(i,t,e);return t}else{throw new Error("illegal state")}}}function v(e){var t=document.querySelector("META[name='"+e+"']"),a=t&&t.getAttribute("content");if(a){return a}}function V(e){var t=v("sap-allowedThemeOrigins");return!!t&&t.split(",").some(function(t){return t==="*"||e===t.trim()})}function S(e){var t,a;try{t=new r(e).search("");var i=t.origin();if(i&&V(i)){a=t.toString()}else{a=t.absoluteTo(window.location.href).origin(window.location.origin).normalize().toString()}return a+(a.endsWith("/")?"":"/")+"UI5/"}catch(e){}}var L={full:"full",basic:"basic",minimal:"minimal",none:"none"};var m={theme:{type:"string",defaultValue:"base"},language:{type:"Locale",defaultValue:b()},timezone:{type:"string",defaultValue:n.getLocalTimezone()},formatLocale:{type:"Locale",defaultValue:null},calendarType:{type:"string",defaultValue:null},trailingCurrencyCode:{type:"boolean",defaultValue:true},accessibility:{type:"boolean",defaultValue:true},autoAriaBodyRole:{type:"boolean",defaultValue:false,noUrl:true},animation:{type:"boolean",defaultValue:true},animationMode:{type:L,defaultValue:undefined},rtl:{type:"boolean",defaultValue:null},debug:{type:"boolean",defaultValue:false},inspect:{type:"boolean",defaultValue:false},originInfo:{type:"boolean",defaultValue:false},noConflict:{type:"boolean",defaultValue:false,noUrl:true},noDuplicateIds:{type:"boolean",defaultValue:true},trace:{type:"boolean",defaultValue:false,noUrl:true},modules:{type:"string[]",defaultValue:[],noUrl:true},areas:{type:"string[]",defaultValue:null,noUrl:true},onInit:{type:"code",defaultValue:undefined,noUrl:true},uidPrefix:{type:"string",defaultValue:"__",noUrl:true},ignoreUrlParams:{type:"boolean",defaultValue:false,noUrl:true},preload:{type:"string",defaultValue:"auto"},rootComponent:{type:"string",defaultValue:"",noUrl:true},preloadLibCss:{type:"string[]",defaultValue:[]},application:{type:"string",defaultValue:""},appCacheBuster:{type:"string[]",defaultValue:[]},bindingSyntax:{type:"string",defaultValue:"default",noUrl:true},versionedLibCss:{type:"boolean",defaultValue:false},manifestFirst:{type:"boolean",defaultValue:false},flexibilityServices:{type:"string",defaultValue:"/sap/bc/lrep"},whitelistService:{type:"string",defaultValue:null,noUrl:true},allowlistService:{type:"string",defaultValue:null,noUrl:true},frameOptions:{type:"string",defaultValue:"default",noUrl:true},frameOptionsConfig:{type:"object",defaultValue:undefined,noUrl:true},support:{type:"string[]",defaultValue:null},testRecorder:{type:"string[]",defaultValue:null},activeTerminologies:{type:"string[]",defaultValue:undefined},fileShareSupport:{type:"string",defaultValue:undefined,noUrl:true},securityTokenHandlers:{type:"function[]",defaultValue:[],noUrl:true},productive:{type:"boolean",defaultValue:false,noUrl:true},themeRoots:{type:"object",defaultValue:{},noUrl:true},"xx-placeholder":{type:"boolean",defaultValue:true},"xx-rootComponentNode":{type:"string",defaultValue:"",noUrl:true},"xx-appCacheBusterMode":{type:"string",defaultValue:"sync"},"xx-appCacheBusterHooks":{type:"object",defaultValue:undefined,noUrl:true},"xx-disableCustomizing":{type:"boolean",defaultValue:false,noUrl:true},"xx-viewCache":{type:"boolean",defaultValue:true},"xx-depCache":{type:"boolean",defaultValue:false},"xx-libraryPreloadFiles":{type:"string[]",defaultValue:[]},"xx-componentPreload":{type:"string",defaultValue:""},"xx-designMode":{type:"boolean",defaultValue:false},"xx-supportedLanguages":{type:"string[]",defaultValue:[]},"xx-bootTask":{type:"function",defaultValue:undefined,noUrl:true},"xx-suppressDeactivationOfControllerCode":{type:"boolean",defaultValue:false},"xx-lesssupport":{type:"boolean",defaultValue:false},"xx-handleValidation":{type:"boolean",defaultValue:false},"xx-fiori2Adaptation":{type:"string[]",defaultValue:[]},"xx-cache-use":{type:"boolean",defaultValue:true},"xx-cache-excludedKeys":{type:"string[]",defaultValue:[]},"xx-cache-serialization":{type:"boolean",defaultValue:false},"xx-nosync":{type:"string",defaultValue:""},"xx-waitForTheme":{type:"string",defaultValue:""},"xx-hyphenation":{type:"string",defaultValue:""},"xx-flexBundleRequestForced":{type:"boolean",defaultValue:false},"xx-cssVariables":{type:"string",defaultValue:"false"},"xx-debugModuleLoading":{type:"boolean",defaultValue:false},statistics:{type:"boolean",defaultValue:false},"xx-acc-keys":{type:"boolean",defaultValue:false}};var w={"xx-test":"1.15",flexBoxPolyfill:"1.14",sapMeTabContainer:"1.14",sapMeProgessIndicator:"1.14",sapMGrowingList:"1.14",sapMListAsTable:"1.14",sapMDialogWithPadding:"1.14",sapCoreBindingSyntax:"1.24"};var T=t.extend("sap.ui.core.Configuration",{constructor:function(){if(p){g.error("Configuration is designed as a singleton and should not be created manually! "+"Please require 'sap/ui/core/Configuration' instead and use the module export directly without using 'new'.");return p}},init:function(){this.bInitialized=true;this.oFormatSettings=new T.FormatSettings(this);var e=this;var t=window["sap-ui-config"]||{};t.oninit=t.oninit||t["evt-oninit"];for(var a in m){e[a]=Array.isArray(m[a].defaultValue)?[]:m[a].defaultValue;if(t.hasOwnProperty(a.toLowerCase())){x(a,t[a.toLowerCase()],this)}else if(!/^xx-/.test(a)&&t.hasOwnProperty("xx-"+a.toLowerCase())){x(a,t["xx-"+a.toLowerCase()],this)}}if(t.libs){e.modules=t.libs.split(",").map(function(e){return e.trim()+".library"}).concat(e.modules)}var n="compatversion";var r=t[n];var o=l("1.14");this._compatversion={};function u(e){var a=!e?r||o.toString():t[n+"-"+e.toLowerCase()]||r||w[e]||o.toString();a=l(a.toLowerCase()==="edge"?y:a);return l(a.getMajor(),a.getMinor())}this._compatversion._default=u();for(var a in w){this._compatversion[a]=u(a)}if(!e.ignoreUrlParams){var c="sap-ui-";var f=s.fromQuery(window.location.search);if(f.has("sap-language")){var d=e.sapLogonLanguage=f.get("sap-language");var h=i.fromSAPLogonLanguage(d);if(h){e.language=h}else if(d&&!f.get("sap-locale")&&!f.get("sap-ui-language")){g.warning("sap-language '"+d+"' is not a valid BCP47 language tag and will only be used as SAP logon language")}}if(f.has("sap-locale")){x("language",f.get("sap-locale"),this)}if(f.has("sap-rtl")){var d=f.get("sap-rtl");if(d==="X"||d==="x"){x("rtl",true,this)}else{x("rtl",false,this)}}if(f.has("sap-timezone")){g.warning("Timezone configuration cannot be changed at the moment");var p=f.get("sap-timezone");if(O(p)){}}if(f.has("sap-theme")){var d=f.get("sap-theme");if(d===""){e["theme"]=m["theme"].defaultValue}else{x("theme",d,this)}}if(f.has("sap-statistics")){var d=f.get("sap-statistics");x("statistics",d,this)}for(var a in m){if(m[a].noUrl){continue}var d=f.get(c+a);if(d==null&&!/^xx-/.test(a)){d=f.get(c+"xx-"+a)}if(d===""){e[a]=m[a].defaultValue}else{x(a,d,this)}}if(f.has("sap-ui-legacy-date-format")){this.oFormatSettings.setLegacyDateFormat(f.get("sap-ui-legacy-date-format"))}if(f.has("sap-ui-legacy-time-format")){this.oFormatSettings.setLegacyTimeFormat(f.get("sap-ui-legacy-time-format"))}if(f.has("sap-ui-legacy-number-format")){this.oFormatSettings.setLegacyNumberFormat(f.get("sap-ui-legacy-number-format"))}}e.sapparams=e.sapparams||{};e.sapparams["sap-language"]=this.getSAPLogonLanguage();["sap-client","sap-server","sap-system"].forEach(function(t){if(!e.ignoreUrlParams&&f.get(t)){e.sapparams[t]=f.get(t)}else{e.sapparams[t]=v(t)}});this.derivedRTL=i._impliesRTL(e.language);var b=e.theme;var C;var V=b.indexOf("@");if(V>=0){C=S(b.slice(V+1));if(C){e.theme=b.slice(0,V);e.themeRoot=C;e.themeRoots[e.theme]=C}else{e.theme=t.theme&&t.theme!==b?t.theme:"base";V=-1}}e.theme=this.normalizeTheme(e.theme,C);var L=e["languagesDeliveredWithCore"]=i._coreI18nLocales;var _=e["xx-supportedLanguages"];if(_.length===0||_.length===1&&_[0]==="*"){_=[]}else if(_.length===1&&_[0]==="default"){_=L||[]}e["xx-supportedLanguages"]=_;var M=e["xx-fiori2Adaptation"];if(M.length===0||M.length===1&&M[0]==="false"){M=false}else if(M.length===1&&M[0]==="true"){M=true}e["xx-fiori2Adaptation"]=M;if(e["bindingSyntax"]==="default"){e["bindingSyntax"]=e.getCompatibilityVersion("sapCoreBindingSyntax").compareTo("1.26")<0?"simple":"complex"}e["allowlistService"]=e["allowlistService"]||e["whitelistService"];if(!e["allowlistService"]){var P=v("sap.allowlistService")||v("sap.whitelistService");if(P){e["allowlistService"]=P;if(e["frameOptions"]==="default"){e["frameOptions"]="trusted"}}}if(e["frameOptions"]==="default"||e["frameOptions"]!=="allow"&&e["frameOptions"]!=="deny"&&e["frameOptions"]!=="trusted"){e["frameOptions"]="allow"}var A=e["frameOptionsConfig"];if(A){A.allowlist=A.allowlist||A.whitelist}if(e.flexibilityServices&&e.flexibilityServices!==m.flexibilityServices.defaultValue&&e.modules.indexOf("sap.ui.fl.library")==-1){e.modules.push("sap.ui.fl.library")}var F=e["preloadLibCss"];if(F.length>0){if(F[0].startsWith("!")){F[0]=F[0].slice(1)}if(F[0]==="*"){F.shift();e.modules.forEach(function(e){var t=e.match(/^(.*)\.library$/);if(t){F.unshift(t[1])}})}}if(e["xx-waitForTheme"]==="true"){e["xx-waitForTheme"]="rendering"}if(e["xx-waitForTheme"]!=="rendering"&&e["xx-waitForTheme"]!=="init"){e["xx-waitForTheme"]=undefined}for(var a in m){if(e[a]!==m[a].defaultValue){g.info("  "+a+" = "+e[a])}}if(this.getAnimationMode()===undefined){if(this.animation){this.setAnimationMode(T.AnimationMode.full)}else{this.setAnimationMode(T.AnimationMode.minimal)}}else{this.setAnimationMode(this.getAnimationMode())}var U=this.getSyncCallBehavior();sap.ui.loader.config({reportSyncCalls:U});if(U&&t.__loaded){var D="[nosync]: configuration loaded via sync XHR";if(U===1){g.warning(D)}else{g.error(D)}}},getVersion:function(){if(this._version){return this._version}this._version=new l(y);return this._version},getCompatibilityVersion:function(e){if(typeof e==="string"&&this._compatversion[e]){return this._compatversion[e]}return this._compatversion._default},getTheme:function(){return this.getValue("theme")},getThemeRoot:function(){return this.themeRoot},getPlaceholder:function(){return this.getValue("xx-placeholder")},setTheme:function(e){this.theme=e;return this},normalizeTheme:function(e,t){if(e&&t==null&&e.match(/^sap_corbu$/i)){return"sap_fiori_3"}return e},getLanguage:function(){return this.getValue("language").sLocaleId},getLanguageTag:function(){return this.getValue("language").toLanguageTag()},getSAPLogonLanguage:function(){return this.sapLogonLanguage&&this.sapLogonLanguage.toUpperCase()||this.getValue("language")._getSAPLogonLanguage()},getTimezone:function(){return n.getLocalTimezone()},setLanguage:function(e,t){var a=_(e),n=this.getRTL(),r;U(a,"Configuration.setLanguage: sLanguage must be a valid BCP47 language tag");U(t==null||typeof t==="string"&&/[A-Z0-9]{2,2}/i.test(t),"Configuration.setLanguage: sSAPLogonLanguage must be null or be a string of length 2, consisting of digits and latin characters only",true);if(a.toString()!=this.getLanguageTag()||t!==this.sapLogonLanguage){this.language=a;this.sapLogonLanguage=t||undefined;this.sapparams["sap-language"]=this.getSAPLogonLanguage();r=this._collect();r.language=this.getLanguageTag();this.derivedRTL=i._impliesRTL(a);if(n!=this.getRTL()){r.rtl=this.getRTL()}this._endCollect()}return this},setTimezone:function(e){U(e==null||typeof e==="string","Configuration.setTimezone: sTimezone must be null or be a string",true);g.warning("Timezone configuration cannot be changed at the moment");e!=null&&O(e);return this},getLocale:function(){return this.getValue("language")},getSAPParam:function(e){return this.sapparams&&this.sapparams[e]},isUI5CacheOn:function(){return this.getValue("xx-cache-use")},setUI5CacheOn:function(e){this["xx-cache-use"]=e;return this},isUI5CacheSerializationSupportOn:function(){return this.getValue("xx-cache-serialization")},setUI5CacheSerializationSupport:function(e){this["xx-cache-serialization"]=e;return this},getUI5CacheExcludedKeys:function(){return this.getValue("xx-cache-excludedKeys")},getCalendarType:function(){var e,t=this.getValue("calendarType");if(t){for(e in a){if(e.toLowerCase()===t.toLowerCase()){this.calendarType=e;return this.calendarType}}g.warning("Parameter 'calendarType' is set to "+t+" which isn't a valid value and therefore ignored. The calendar type is determined from format setting and current locale")}var i=this.oFormatSettings.getLegacyDateFormat();switch(i){case"1":case"2":case"3":case"4":case"5":case"6":return a.Gregorian;case"7":case"8":case"9":return a.Japanese;case"A":case"B":return a.Islamic;case"C":return a.Persian;default:return this.getLocale().getPreferredCalendarType()}},setCalendarType:function(e){var t;if(this.calendarType!==e){t=this._collect();this.calendarType=t.calendarType=e;this._endCollect()}return this},getFormatLocale:function(){return(this.getValue("formatLocale")||this.getValue("language")).toString()},setFormatLocale:function(e){var t=_(e),a;U(e==null||typeof e==="string"&&t,"sFormatLocale must be a BCP47 language tag or Java Locale id or null");if(M(t)!==M(this.getValue("formatLocale"))){this.formatLocale=t;a=this._collect();a.formatLocale=M(t);this._endCollect()}return this},getLanguagesDeliveredWithCore:function(){return this["languagesDeliveredWithCore"]},getSupportedLanguages:function(){return this.getValue("xx-supportedLanguages")},getAccessibility:function(){return this.getValue("accessibility")},getAutoAriaBodyRole:function(){return this.getValue("autoAriaBodyRole")},getAnimation:function(){return this.getValue("animation")},getAnimationMode:function(){return this.getValue("animationMode")},setAnimationMode:function(e){D(T.AnimationMode,e,"animationMode");this.animation=e!==T.AnimationMode.minimal&&e!==T.AnimationMode.none;this.animationMode=e;if(this._oCore&&this._oCore._setupAnimation){this._oCore._setupAnimation()}},getRTL:function(){return this.getValue("rtl")===null?this.derivedRTL:this.getValue("rtl")},getFiori2Adaptation:function(){return this.getValue("xx-fiori2Adaptation")},setRTL:function(e){U(e===null||typeof e==="boolean","bRTL must be null or a boolean");var t=this.getRTL(),a;this.rtl=e;if(t!=this.getRTL()){a=this._collect();a.rtl=this.getRTL();this._endCollect()}return this},getDebug:function(){return window["sap-ui-debug"]===true||this.getValue("debug")},getInspect:function(){return this.getValue("inspect")},getOriginInfo:function(){return this.getValue("originInfo")},getNoDuplicateIds:function(){return this.getValue("noDuplicateIds")},getTrace:function(){return this.getValue("trace")},getUIDPrefix:function(){return this.getValue("uidPrefix")},getDesignMode:function(){return this.getValue("xx-designMode")},getSuppressDeactivationOfControllerCode:function(){return this.getValue("xx-suppressDeactivationOfControllerCode")},getControllerCodeDeactivated:function(){return this.getDesignMode()&&!this.getSuppressDeactivationOfControllerCode()},getApplication:function(){return this.getValue("application")},getRootComponent:function(){return this.getValue("rootComponent")},getAppCacheBuster:function(){return this.getValue("appCacheBuster")},getAppCacheBusterMode:function(){return this.getValue("xx-appCacheBusterMode")},getAppCacheBusterHooks:function(){return this.getValue("xx-appCacheBusterHooks")},getDisableCustomizing:function(){return this.getValue("xx-disableCustomizing")},getViewCache:function(){return this.getValue("xx-viewCache")},getPreload:function(){var e=this.getValue("preload");if(this.getDebug()===true){e=""}if(e==="auto"){if(window["sap-ui-optimized"]){e=sap.ui.loader.config().async?"async":"sync"}else{e=""}}return e},getSyncCallBehavior:function(){var e=0;if(this.getValue("xx-nosync")==="warn"||/(?:\?|&)sap-ui-xx-nosync=(?:warn)/.exec(window.location.search)){e=1}if(this.getValue("xx-nosync")===true||this.getValue("xx-nosync")==="true"||/(?:\?|&)sap-ui-xx-nosync=(?:x|X|true)/.exec(window.location.search)){e=2}return e},getDepCache:function(){return this.getValue("xx-depCache")},getManifestFirst:function(){return this.getValue("manifestFirst")},getFlexibilityServices:function(){var e=this.getValue("flexibilityServices")||[];if(typeof e==="string"){if(e[0]==="/"){e=[{url:e,layers:["ALL"],connector:"LrepConnector"}]}else{e=JSON.parse(e)}}this.flexibilityServices=e;return this.flexibilityServices},setFlexibilityServices:function(e){this.flexibilityServices=e.slice()},getComponentPreload:function(){return this.getValue("xx-componentPreload")||this.getPreload()},getFormatSettings:function(){return this.oFormatSettings},getFrameOptions:function(){return this.getValue("frameOptions")},getWhitelistService:function(){return this.getAllowlistService()},getAllowlistService:function(){return this.getValue("allowlistService")},getFileShareSupport:function(){return this.getValue("fileShareSupport")||undefined},getSupportMode:function(){return this.getValue("support")},getTestRecorderMode:function(){return this.getValue("testRecorder")},_collect:function(){var e=this.mChanges||(this.mChanges={__count:0});e.__count++;return e},_endCollect:function(){var e=this.mChanges;if(e&&--e.__count===0){delete e.__count;delete this.mChanges;this._oCore&&this._oCore.fireLocalizationChanged(e)}},getStatistics:function(){return this.getStatisticsEnabled()},getStatisticsEnabled:function(){var e=this.getValue("statistics");try{e=e||window.localStorage.getItem("sap-ui-statistics")=="X"}catch(e){}return e},getNoNativeScroll:function(){return false},getHandleValidation:function(){return this.getValue("xx-handleValidation")},getHyphenation:function(){return this.getValue("xx-hyphenation")},getAccKeys:function(){return this.getValue("xx-acc-keys")},getActiveTerminologies:function(){return this.getValue("activeTerminologies")},getSecurityTokenHandlers:function(){return this.getValue("securityTokenHandlers").slice()},setSecurityTokenHandlers:function(e){e.forEach(function(e){U(typeof e==="function","Not a function: "+e)});this.securityTokenHandlers=e.slice()},applySettings:function(e){function t(e,a){var i,n;for(i in a){n="set"+i.slice(0,1).toUpperCase()+i.slice(1);if(i==="formatSettings"&&e.oFormatSettings){t(e.oFormatSettings,a[i])}else if(typeof e[n]==="function"){e[n](a[i])}else{g.warning("Configuration.applySettings: unknown setting '"+i+"' ignored")}}}c(typeof e==="object","mSettings must be an object");this._collect();t(this,e);this._endCollect();return this},setCore:function(e){this._oCore=e;this.init()},getValue:function(e){var t;if(typeof e!=="string"||!Object.prototype.hasOwnProperty.call(m,e)){throw new TypeError("Parameter 'sName' must be the name of a valid configuration option (one of "+Object.keys(m).map(function(e){return"'"+e+"'"}).sort().join(", ")+")")}if(this.bInitialized||this.hasOwnProperty(e)){t=this[e]}else{if(!this.ignoreUrlParams&&!m[e].noUrl){var a=s.fromQuery(window.location.search);t=a.get("sap-ui-"+e)||a.get("sap-"+e)}t=t?t:window["sap-ui-config"][e]||window["sap-ui-config"][e.toLowerCase()];try{t=t===undefined?m[e].defaultValue:C(e,t)}catch(a){t=m[e].defaultValue}}if(typeof m[e].type==="string"&&(m[e].type.endsWith("[]")||m[e].type==="object")){t=f(t)}return t}});T.AnimationMode=L;function _(e){try{if(e&&typeof e==="string"){return new i(e)}}catch(e){}}function M(e){return e?e.toString():null}var P={"":{pattern:null},1:{pattern:"dd.MM.yyyy"},2:{pattern:"MM/dd/yyyy"},3:{pattern:"MM-dd-yyyy"},4:{pattern:"yyyy.MM.dd"},5:{pattern:"yyyy/MM/dd"},6:{pattern:"yyyy-MM-dd"},7:{pattern:"Gyy.MM.dd"},8:{pattern:"Gyy/MM/dd"},9:{pattern:"Gyy-MM-dd"},A:{pattern:"yyyy/MM/dd"},B:{pattern:"yyyy/MM/dd"},C:{pattern:"yyyy/MM/dd"}};var A={"":{short:null,medium:null,dayPeriods:null},0:{short:"HH:mm",medium:"HH:mm:ss",dayPeriods:null},1:{short:"hh:mm a",medium:"hh:mm:ss a",dayPeriods:["AM","PM"]},2:{short:"hh:mm a",medium:"hh:mm:ss a",dayPeriods:["am","pm"]},3:{short:"KK:mm a",medium:"KK:mm:ss a",dayPeriods:["AM","PM"]},4:{short:"KK:mm a",medium:"KK:mm:ss a",dayPeriods:["am","pm"]}};var F={"":{groupingSeparator:null,decimalSeparator:null}," ":{groupingSeparator:".",decimalSeparator:","},X:{groupingSeparator:",",decimalSeparator:"."},Y:{groupingSeparator:" ",decimalSeparator:","}};function U(e,t){if(!e){throw new Error(t)}}function D(e,t,a){var i=[];for(var n in e){if(e.hasOwnProperty(n)){if(e[n]===t){return}i.push(e[n])}}throw new Error("Unsupported Enumeration value for "+a+", valid values are: "+i.join(", "))}function O(e){var t=n.isValidTimezone(e);if(!t){g.error("The provided timezone '"+e+"' is not a valid IANA timezone ID."+" Falling back to browser's local timezone '"+n.getLocalTimezone()+"'.")}return t}t.extend("sap.ui.core.Configuration.FormatSettings",{constructor:function(e){this.oConfiguration=e;this.mSettings={};this.sLegacyDateFormat=undefined;this.sLegacyTimeFormat=undefined;this.sLegacyNumberFormatSymbolSet=undefined},getFormatLocale:function(){function e(e){var t=e.oConfiguration.getValue("language");if(!h(e.mSettings)){var a=t.toString();if(a.indexOf("-x-")<0){a=a+"-x-sapufmt"}else if(a.indexOf("-sapufmt")<=a.indexOf("-x-")){a=a+"-sapufmt"}t=new i(a)}return t}return this.oConfiguration.getValue("formatLocale")||e(this)},_set:function(e,t){var a=this.mSettings[e];if(t!=null){this.mSettings[e]=t}else{delete this.mSettings[e]}if((a!=null||t!=null)&&!u(a,t)){var i=this.oConfiguration._collect();i[e]=t;this.oConfiguration._endCollect()}},getCustomUnits:function(){return this.mSettings["units"]?this.mSettings["units"]["short"]:undefined},setCustomUnits:function(e){var t=null;if(e){t={short:e}}this._set("units",t);return this},addCustomUnits:function(e){var t=this.getCustomUnits();if(t){e=d({},t,e)}this.setCustomUnits(e);return this},setUnitMappings:function(e){this._set("unitMappings",e);return this},addUnitMappings:function(e){var t=this.getUnitMappings();if(t){e=d({},t,e)}this.setUnitMappings(e);return this},getUnitMappings:function(){return this.mSettings["unitMappings"]},getDatePattern:function(e){c(e=="short"||e=="medium"||e=="long"||e=="full","sStyle must be short, medium, long or full");return this.mSettings["dateFormats-"+e]},setDatePattern:function(e,t){U(e=="short"||e=="medium"||e=="long"||e=="full","sStyle must be short, medium, long or full");this._set("dateFormats-"+e,t);return this},getTimePattern:function(e){c(e=="short"||e=="medium"||e=="long"||e=="full","sStyle must be short, medium, long or full");return this.mSettings["timeFormats-"+e]},setTimePattern:function(e,t){U(e=="short"||e=="medium"||e=="long"||e=="full","sStyle must be short, medium, long or full");this._set("timeFormats-"+e,t);return this},getNumberSymbol:function(e){c(["group","decimal","plusSign","minusSign"].includes(e),"sType must be decimal, group, plusSign or minusSign");return this.mSettings["symbols-latn-"+e]},setNumberSymbol:function(e,t){U(["group","decimal","plusSign","minusSign"].includes(e),"sType must be decimal, group, plusSign or minusSign");this._set("symbols-latn-"+e,t);return this},getCustomCurrencies:function(){return this.mSettings["currency"]},setCustomCurrencies:function(e){U(typeof e==="object"||e==null,"mCurrencyDigits must be an object");Object.keys(e||{}).forEach(function(t){U(typeof t==="string");U(typeof e[t]==="object")});this._set("currency",e);return this},addCustomCurrencies:function(e){var t=this.getCustomCurrencies();if(t){e=d({},t,e)}this.setCustomCurrencies(e);return this},setFirstDayOfWeek:function(e){U(typeof e=="number"&&e>=0&&e<=6,"iValue must be an integer value between 0 and 6");this._set("weekData-firstDay",e);return this},_setDayPeriods:function(e,t){c(e=="narrow"||e=="abbreviated"||e=="wide","sWidth must be narrow, abbreviated or wide");this._set("dayPeriods-format-"+e,t);return this},getLegacyDateFormat:function(){return this.sLegacyDateFormat||undefined},setLegacyDateFormat:function(e){e=e?String(e).toUpperCase():"";U(P.hasOwnProperty(e),"sFormatId must be one of ['1','2','3','4','5','6','7','8','9','A','B','C'] or empty");var t=this.oConfiguration._collect();this.sLegacyDateFormat=t.legacyDateFormat=e;this.setDatePattern("short",P[e].pattern);this.setDatePattern("medium",P[e].pattern);this.oConfiguration._endCollect();return this},getLegacyTimeFormat:function(){return this.sLegacyTimeFormat||undefined},setLegacyTimeFormat:function(e){e=e||"";U(A.hasOwnProperty(e),"sFormatId must be one of ['0','1','2','3','4'] or empty");var t=this.oConfiguration._collect();this.sLegacyTimeFormat=t.legacyTimeFormat=e;this.setTimePattern("short",A[e]["short"]);this.setTimePattern("medium",A[e]["medium"]);this._setDayPeriods("abbreviated",A[e].dayPeriods);this.oConfiguration._endCollect();return this},getLegacyNumberFormat:function(){return this.sLegacyNumberFormat||undefined},setLegacyNumberFormat:function(e){e=e?e.toUpperCase():"";U(F.hasOwnProperty(e),"sFormatId must be one of [' ','X','Y'] or empty");var t=this.oConfiguration._collect();this.sLegacyNumberFormat=t.legacyNumberFormat=e;this.setNumberSymbol("group",F[e].groupingSeparator);this.setNumberSymbol("decimal",F[e].decimalSeparator);this.oConfiguration._endCollect();return this},setLegacyDateCalendarCustomizing:function(e){U(Array.isArray(e),"aMappings must be an Array");var t=this.oConfiguration._collect();this.aLegacyDateCalendarCustomizing=t.legacyDateCalendarCustomizing=e.slice();this.oConfiguration._endCollect();return this},getLegacyDateCalendarCustomizing:function(){var e=this.aLegacyDateCalendarCustomizing;if(e){e=e.slice()}return e},setTrailingCurrencyCode:function(e){U(typeof e==="boolean","bTrailingCurrencyCode must be a boolean");this.oConfiguration.trailingCurrencyCode=e;return this},getTrailingCurrencyCode:function(){return this.oConfiguration.getValue("trailingCurrencyCode")},getCustomLocaleData:function(){return this.mSettings}});p=new T;Object.assign(T,p.getInterface());return T});