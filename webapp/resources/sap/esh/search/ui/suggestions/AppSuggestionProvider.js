/*! 
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	 
 */
(function(){sap.ui.define(["../i18n","sap/esh/search/ui/SearchHelper","./SuggestionType"],function(e,t,r){function n(e){return e&&e.__esModule&&typeof e.default!=="undefined"?e.default:e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach(function(t){a(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function a(e,t,r){if(t in e){Object.defineProperty(e,t,{value:r,enumerable:true,configurable:true,writable:true})}else{e[t]=r}return e}function u(e,t){var r=typeof Symbol!=="undefined"&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=s(e))||t&&e&&typeof e.length==="number"){if(r)e=r;var n=0;var i=function(){};return{s:i,n:function(){if(n>=e.length)return{done:true};return{done:false,value:e[n++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o=true,a=false,u;return{s:function(){r=r.call(e)},n:function(){var e=r.next();o=e.done;return e},e:function(e){a=true;u=e},f:function(){try{if(!o&&r.return!=null)r.return()}finally{if(a)throw u}}}}function s(e,t){if(!e)return;if(typeof e==="string")return l(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);if(r==="Object"&&e.constructor)r=e.constructor.name;if(r==="Map"||r==="Set")return Array.from(e);if(r==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return l(e,t)}function l(e,t){if(t==null||t>e.length)t=e.length;for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function c(e,t){if(!(e instanceof t)){throw new TypeError("Cannot call a class as a function")}}function p(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||false;n.configurable=true;if("value"in n)n.writable=true;Object.defineProperty(e,n.key,n)}}function f(e,t,r){if(t)p(e.prototype,t);if(r)p(e,r);Object.defineProperty(e,"prototype",{writable:false});return e}var g=n(e);var d=r["Type"];var v=r["SuggestionType"];function h(e,t,r){if(r){return t?t(e):e}if(!e||!e.then){e=Promise.resolve(e)}return t?e.then(t):e}function y(e,t,r){if(r){return t?t(e()):e()}try{var n=Promise.resolve(e());return t?n.then(t):n}catch(e){return Promise.reject(e)}}var m=function(){function e(r){c(this,e);this.model=r.model;this.suggestionHandler=r.suggestionHandler;this.suggestApplications=t.refuseOutdatedRequests(this.suggestApplicationsNotDecorated)}f(e,[{key:"abortSuggestions",value:function e(){this.suggestApplications.abort()}},{key:"combineSuggestionsWithIdenticalTitle",value:function e(t){var r;var n={};for(var i=0;i<t.length;i++){r=t[i];var o=n[r.title+r.subtitle];if(o){if(!o.combinedSuggestionExists){var a={title:"combinedAppSuggestion"+i,subtitle:r.subtitle,sortIndex:o.sortIndex,url:this.model.searchUrlParser.renderFromParameters(this.model.appTopDefault,this.model.sinaNext.createFilter({dataSource:this.model.appDataSource,searchTerm:r.title}),false),label:g.getText("suggestion_in_apps",r.label),icon:"sap-icon://none",keywords:"",uiSuggestionType:d.App};var u=g.getText("suggestion_in_apps",[""]);a.label=a.label.replace(u,"<i>"+u+"</i>");n[a.title+a.subtitle]=a;o.combinedSuggestionExists=true}}else{r.sortIndex=i;n[r.title+r.subtitle]=r}}t=[];for(var s in n){if(Object.prototype.hasOwnProperty.call(n,s)){r=n[s];if(!r.combinedSuggestionExists){t.push(r)}}}t.sort(function(e,t){return e.sortIndex-t.sortIndex});return t}},{key:"addAsterisk4ShowAllApps",value:function e(t){var r=t.match(/\S+/g);if(r.length>0){var n;var i=[];for(var o=0;o<r.length;o++){n=r[o];if(n&&n.lastIndexOf("*")!==n.length-1){i.push(n+"*")}else{i.push(n)}}t=i.join(" ")}return t}},{key:"createShowMoreSuggestion",value:function e(t){var r=g.getText("showAllNApps",[t]);r=r.replace(/"/g,"");var n=r;var i="<i>"+r+"</i>";return{title:r,tooltip:n,label:i,dataSource:this.model.appDataSource,labelRaw:this.model.getProperty("/uiFilter/searchTerm"),uiSuggestionType:d.SearchTermData,searchTerm:this.model.getProperty("/uiFilter/searchTerm")||""}}},{key:"getSuggestions",value:function e(t){var r=this;return y(function(){var e;var t=r.model.getDataSource();var n=r.model.userCategoryManager;var i=(n===null||n===void 0?void 0:n.isFavActive())&&(n===null||n===void 0?void 0:(e=n.getCategory("MyFavorites"))===null||e===void 0?void 0:e.includeApps);if(t!==r.model.allDataSource&&t!==r.model.appDataSource&&!(t===r.model.favDataSource&&i)){return Promise.resolve([])}var a=r.model.getProperty("/uiFilter/searchTerm");return h(r.suggestApplications(a),function(e){var n=e.getElements();n=r.combineSuggestionsWithIdenticalTitle(n);var i=[];var a=u(n),s;try{for(a.s();!(s=a.n()).done;){var l=s.value;var c=o(o({},l),{},{uiSuggestionType:d.App,dataSource:r.model.appDataSource,position:v.properties.App.position,key:v.App+l.url+l.icon});i.push(c)}}catch(e){a.e(e)}finally{a.f()}var p=r.suggestionHandler.getSuggestionLimit(d.App);i=i.slice(0,p);if(e.totalResults>p&&t===r.model.appDataSource){i.push(r.createShowMoreSuggestion(e.totalResults))}return i})})}},{key:"suggestApplicationsNotDecorated",value:function e(t){return sap.ushell.Container.getServiceAsync("Search").then(function(e){return e.queryApplications({searchTerm:t,suggestion:true})})}}]);return e}();return m})})();