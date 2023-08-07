/*! 
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	 
 */
(function(){sap.ui.define(["sap/esh/search/ui/SearchHelper","sap/ui/core/CustomData","sap/m/library","sap/m/StandardListItem"],function(e,t,r,a){var n=r["ListType"];var i=a.extend("sap.esh.search.ui.controls.SearchFacetItem",{renderer:{apiVersion:2},metadata:{properties:{isDataSource:{type:"boolean",defaultValue:false}}},constructor:function r(i,o){var s=this;a.prototype.constructor.call(this,i,o);this.setType(n.Active);this.bindProperty("title",{path:"label"});this.bindProperty("tooltip",{parts:[{path:"label"},{path:"valueLabel"}],formatter:function e(t,r){return r?"".concat(t,": ").concat(r):""}});if(!o.isDataSource){this.bindProperty("icon",{path:"icon"})}this.bindProperty("info",{parts:[{path:"value"},{path:"valueLabel"}],formatter:function t(r,a){if(typeof r==="number"){return e.formatInteger(r)}else if(typeof r==="string"){return r}else if(typeof a!=="undefined"&&a!==""){return a}else{return""}}});this.bindProperty("selected",{path:"selected"});this.insertCustomData(new t({key:"test-id-facet-dimension-value",value:{parts:[{path:"facetTitle"},{path:"label"}],formatter:function e(t,r){return"".concat(t,"-").concat(r)}},writeToDom:true}),0);this.addStyleClass("sapUshellSearchFacetItem");this.addEventDelegate({onAfterRendering:function e(){var t;if(s!==null&&s!==void 0&&(t=s.getBindingContext())!==null&&t!==void 0&&t.getObject()){var r=s.getBindingContext().getObject().level;if(jQuery("html").attr("dir")==="rtl"){jQuery(s.getDomRef()).children(".sapMLIBContent").css("padding-right",r+"rem")}else{jQuery(s.getDomRef()).children(".sapMLIBContent").css("padding-left",r+"rem")}}}})}});return i})})();