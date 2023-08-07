/*! 
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	 
 */
(function(){sap.ui.define(["sap/esh/search/ui/i18n","sap/esh/search/ui/SearchShellHelper","sap/ui/core/Control","sap/ui/core/IconPool"],function(e,t,r,n){function o(e,t){var r=typeof Symbol!=="undefined"&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=s(e))||t&&e&&typeof e.length==="number"){if(r)e=r;var n=0;var o=function(){};return{s:o,n:function(){if(n>=e.length)return{done:true};return{done:false,value:e[n++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a=true,l=false,i;return{s:function(){r=r.call(e)},n:function(){var e=r.next();a=e.done;return e},e:function(e){l=true;i=e},f:function(){try{if(!a&&r.return!=null)r.return()}finally{if(l)throw i}}}}function s(e,t){if(!e)return;if(typeof e==="string")return a(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);if(r==="Object"&&e.constructor)r=e.constructor.name;if(r==="Map"||r==="Set")return Array.from(e);if(r==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return a(e,t)}function a(e,t){if(t==null||t>e.length)t=e.length;for(var r=0,n=new Array(t);r<t;r++){n[r]=e[r]}return n}var l=r.extend("sap.esh.search.ui.controls.SearchNoResultScreen",{renderer:{apiVersion:2,render:function r(o,s){var a=t.getSearchInput();var l;if(a){l=a.getAriaDescriptionIdForNoResults()}var i=s.getId();o.openStart("div",s);o["class"]("sapUshellSearch-no-result");o.openEnd();o.openStart("div",i+"no-result-icon");o["class"]("sapUshellSearch-no-result-icon");o.openEnd();o.icon(n.getIconURI("message-popup"));o.close("div");o.openStart("div",i+"no-result-text");o["class"]("sapUshellSearch-no-result-text");o.openEnd();o.openStart("div",l||i+"-no-result-info");if(l){o.attr("tabindex","0")}o["class"]("sapUshellSearch-no-result-info");o.openEnd();var u=s.getProperty("searchBoxTerm");o.text(e.getText("no_results_info_1",[u]));o.openStart("br",i+"-no-results-info-2");o.openEnd();o.close("br");o.text(e.getText("no_results_info_2"));o.close("div");o.openStart("div",i+"-no-result-tips");o.attr("id","searchFieldInShell-input-No-Results-Tips");o["class"]("sapUshellSearch-no-result-tips");o.attr("tabindex","0");o.openEnd();o.openStart("b",i+"-no-results-tips-title");o.openEnd();o.text(e.getText("no_results_tips_title"));o.close("b");o.openStart("ul",i+"-no-results-tips-list");o.openEnd();o.openStart("li",i+"-no-results-tip-1");o.openEnd();o.text(e.getText("no_results_tip_1"));o.close("li");o.openStart("li",i+"-no-results-tip-2");o.openEnd();o.text(e.getText("no_results_tip_2"));o.close("li");o.openStart("li",i+"-no-results-tip-3");o.openEnd();o.text(e.getText("no_results_tip_3"));o.close("li");o.close("ul");o.close("div");s.renderToolbar(o,s);o.close("div");o.close("div")}},metadata:{properties:{isUshell:"boolean",dataSource:"object",appSearchDataSource:"object",searchBoxTerm:"string"},aggregations:{toolbar:{type:"sap.ui.core.Control",multiple:true}}},constructor:function e(t,n){r.prototype.constructor.call(this,t,n)},renderToolbar:function e(t,r){var n=r.getAggregation("toolbar");var s=o(n),a;try{for(s.s();!(a=s.n()).done;){var l=a.value;t.renderControl(l)}}catch(e){s.e(e)}finally{s.f()}}});return l})})();