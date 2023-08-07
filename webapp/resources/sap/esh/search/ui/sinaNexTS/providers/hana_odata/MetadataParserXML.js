/*! 
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	 
 */
(function(){sap.ui.define(["../../sina/DataSourceType","./MetadataParser","./HierarchyMetadataParser"],function(e,t,r){function n(e,t){if(!(e instanceof t)){throw new TypeError("Cannot call a class as a function")}}function a(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||false;n.configurable=true;if("value"in n)n.writable=true;Object.defineProperty(e,n.key,n)}}function i(e,t,r){if(t)a(e.prototype,t);if(r)a(e,r);Object.defineProperty(e,"prototype",{writable:false});return e}function o(e,t){if(typeof t!=="function"&&t!==null){throw new TypeError("Super expression must either be null or a function")}e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:true,configurable:true}});Object.defineProperty(e,"prototype",{writable:false});if(t)s(e,t)}function s(e,t){s=Object.setPrototypeOf||function e(t,r){t.__proto__=r;return t};return s(e,t)}function u(e){var t=l();return function r(){var n=E(e),a;if(t){var i=E(this).constructor;a=Reflect.construct(n,arguments,i)}else{a=n.apply(this,arguments)}return c(this,a)}}function c(e,t){if(t&&(typeof t==="object"||typeof t==="function")){return t}else if(t!==void 0){throw new TypeError("Derived constructors may only return object or undefined")}return f(e)}function f(e){if(e===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return e}function l(){if(typeof Reflect==="undefined"||!Reflect.construct)return false;if(Reflect.construct.sham)return false;if(typeof Proxy==="function")return true;try{Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}));return true}catch(e){return false}}function E(e){E=Object.setPrototypeOf?Object.getPrototypeOf:function e(t){return t.__proto__||Object.getPrototypeOf(t)};return E(e)}
/*!
   * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	
   */var d=e["DataSourceType"];var h=t["MetadataParser"];var p=r["HierarchyMetadataParser"];function y(e,t,r){if(r){return t?t(e):e}if(!e||!e.then){e=Promise.resolve(e)}return t?e.then(t):e}function R(e,t,r){if(r){return t?t(e()):e()}try{var n=Promise.resolve(e());return t?n.then(t):n}catch(e){return Promise.reject(e)}}var I=function(e){o(r,e);var t=u(r);function r(e){n(this,r);return t.call(this,e)}i(r,[{key:"_getWindow",value:function e(){var t=this;return R(function(){if(typeof window==="undefined"){if(typeof t.jsDOMWindow==="undefined"){var e=require("jsdom");var r=require("fs");var n=r.readFileSync("./node_modules/jquery/dist/jquery.js","utf-8");var a=new e.JSDOM("<html><script>"+n+"<\/script><body></body></html>",{runScripts:"dangerously"});t.jsDOMWindow=a.window;a.window.$=a.window.jQuery}return y(t.jsDOMWindow)}return y(window)})}},{key:"fireRequest",value:function e(t,r){return R(function(){return y(t.getXML(r))})}},{key:"parseResponse",value:function e(t){var r=this;return R(function(){var e=r;var n={businessObjectMap:{},businessObjectList:[],dataSourceMap:{},dataSourcesList:[]};return y(r._getWindow(),function(r){var a=r.$.parseXML(t);r.$(a).find("Schema").each(function(){var t=r.$(this);var a=e._parseEntityType(t,r);e._parseEntityContainer(t,a,n,r)});return n})})}},{key:"_parseEntityType",value:function e(t,r){var n=this;var a={};t=r.$(t);var i=new p(r.$);t.find("EntityType").each(function(){var e=r.$(this).attr("Name");var o={schema:t.attr("Namespace"),keys:[],attributeMap:{},resourceBundle:"",labelResourceBundle:"",label:"",labelPlural:"",annotations:{},hierarchyDefinitionsMap:{},icon:""};a[e]=o;r.$(this).find("Key>PropertyRef").each(function(){o.keys.push(r.$(this).attr("Name"))});r.$(this).find('>Annotation[Term="EnterpriseSearch.hierarchy.parentChild"]').each(function(){o.hierarchyDefinitionsMap=i.parse(e,this)});r.$(this).find('Annotation[Term="Search.searchable"]').each(function(){r.$(this).siblings("Annotation").each(function(){var t=r.$(this);var a=t.attr("Term");if(a!==undefined&&a.length>0){a=a.toUpperCase();var i=n._getValueFromElement(this,r);if(a==="ENTERPRISESEARCHHANA.UIRESOURCE.LABEL.BUNDLE"){var s=i;try{o.resourceBundle=r.jQuery.sap.resources({url:s,language:r.sap.ui.getCore().getConfiguration().getLanguage()})}catch(t){n.log.error("Resource bundle of "+e+" '"+s+"' can't be found:"+t.toString())}}else if(a==="ENTERPRISESEARCHHANA.UIRESOURCE.LABEL.KEY"){var u=i;if(u&&o.resourceBundle){var c=o.resourceBundle.getText(u);if(c){o.labelResourceBundle=c}}}else if(a==="UI.HEADERINFO.TYPENAME"){o.label=i}else if(a==="UI.HEADERINFO.TYPENAMEPLURAL"){o.labelPlural=i}else if(a==="UI.HEADERINFO.TITLE.TYPE"){n._setAnnotationValue(o.annotations,a,i)}else if(a==="UI.HEADERINFO.TITLE.VALUEQUALIFIER"){n._setAnnotationValue(o.annotations,a,i)}else if(a==="UI.HEADERINFO.TYPEIMAGEURL"){o.icon=i}else{n._setAnnotationValue(o.annotations,a,i)}}})});r.$(this).find("Property").each(function(e){var t=r.$(this).attr("Name");var a={labelRaw:t,label:null,type:r.$(this).attr("Type"),presentationUsage:[],isFacet:false,isSortable:false,supportsTextSearch:false,displayOrder:e,annotationsAttr:{},unknownAnnotation:[],hierarchyDefinition:o.hierarchyDefinitionsMap[t]};o.attributeMap[t]=a;r.$(this).find("Annotation").each(function(){var e=r.$(this).attr("Term");if(e!==undefined&&e.length>0){e=e.toUpperCase();var t=n._getValueFromElement(this,r);if(t==undefined){r.$(this).children("Collection").children("Record").each(function(){t=t||[];var e={};t.push(e);r.$(this).children("PropertyValue").each(function(){var t=r.$(this).attr("Property");if(t!==undefined&&t.length>0){t=t.toUpperCase();var a=n._getValueFromElement(this,r);if(a!==undefined){e[t]=a}}})})}if(t!==undefined){switch(e){case"SAP.COMMON.LABEL":if(!a.label){a.label=t}break;case"ENTERPRISESEARCHHANA.UIRESOURCE.LABEL.KEY":if(t&&o.resourceBundle){var i=o.resourceBundle.getText(t);if(i){a.label=i}}break;case"ENTERPRISESEARCH.KEY":a.isKey=t;break;case"ENTERPRISESEARCH.PRESENTATIONMODE":r.$(this).find("Collection>String").each(function(){var e=n._getValueFromElement(this,r);if(e){a.presentationUsage.push(e)}});break;case"ENTERPRISESEARCHHANA.ISSORTABLE":a.isSortable=t;break;case"ENTERPRISESEARCHHANA.SUPPORTSTEXTSEARCH":a.supportsTextSearch=t;break;case"ENTERPRISESEARCH.FILTERINGFACET.DEFAULT":a.isFacet=t;break;case"ENTERPRISESEARCH.FILTERINGFACET.DISPLAYPOSITION":a.facetPosition=t;break;case"ENTERPRISESEARCH.FILTERINGFACET.ICONURL":a.facetIconUrlAttributeName=t;break;case"ENTERPRISESEARCH.FILTERINGATTRIBUTE.DEFAULT":a.isFilteringAttribute=t;break;case"ENTERPRISESEARCH.FILTERINGATTRIBUTE.DISPLAYPOSITION":a.facetPosition=t;break;case"ENTERPRISESEARCH.FILTERINGATTRIBUTE.ICONURL":a.facetIconUrlAttributeName=t;break;case"ENTERPRISESEARCH.DISPLAYORDER":a.displayOrder=t;break;default:if(e.startsWith("UI")||e.startsWith("OBJECTMODEL")||e.startsWith("SEMANTICS")){n._setAnnotationValue(a.annotationsAttr,e,t)}else{a.unknownAnnotation.push(r.$(this))}}}}});var i=a.annotationsAttr.UI&&a.annotationsAttr.UI.IDENTIFICATION;if(i){if(i.POSITION!==undefined){a.displayOrder=i.POSITION}else if(Array.isArray(i)){for(var s=0;s<i.length;s++){if(i[s].TYPE==undefined&&i[s].POSITION!==undefined){a.displayOrder=i[s].POSITION;break}}}}})});return a}},{key:"_getValueFromElement",value:function e(t,r){var n=r.$(t);var a=n.text();if(!a||a.trim().length==0){a=undefined;if(n.attr("String")!==undefined){a=n.attr("String")}else if(n.attr("Decimal")!==undefined){try{a=Number.parseFloat(n.attr("Decimal"));if(isNaN(a)){a=undefined}}catch(e){a=undefined}}else if(n.attr("Int")!==undefined){try{a=Number.parseInt(n.attr("Int"),10);if(isNaN(a)){a=undefined}}catch(e){a=undefined}}else if(n.attr("Bool")!==undefined){a=n.attr("Bool")=="true"}}return a}},{key:"_parseEntityContainer",value:function e(t,r,n,a){var i=this;t.find("EntityContainer>EntitySet").each(function(){if(a.$(this).attr("Name")&&a.$(this).attr("EntityType")){var e=a.$(this).attr("Name");var t=a.$(this).attr("EntityType");var o=t.slice(t.lastIndexOf(".")+1);var s=r[o];if(s===undefined){throw"EntityType "+o+" has no corresponding meta data!"}var u=i.sina._createDataSource({id:e,label:s.labelResourceBundle||s.label||e,labelPlural:s.labelResourceBundle||s.labelPlural||s.label||e,icon:s.icon||"",type:d.BusinessObject,attributesMetadata:[{id:"dummy"}]});u.annotations=s.annotations;n.dataSourceMap[u.id]=u;n.dataSourcesList.push(u);s.name=e;s.dataSource=u;n.businessObjectMap[e]=s;n.businessObjectList.push(s)}})}}]);return r}(h);var T={__esModule:true};T.MetadataParserXML=I;return T})})();