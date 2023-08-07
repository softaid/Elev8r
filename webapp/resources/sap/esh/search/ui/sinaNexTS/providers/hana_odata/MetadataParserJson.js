/*! 
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	 
 */
(function(){sap.ui.define(["../../sina/DataSourceType","./MetadataParser"],function(t,e){function n(t){"@babel/helpers - typeof";return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n(t)}function r(t,e){if(!(t instanceof e)){throw new TypeError("Cannot call a class as a function")}}function a(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||false;r.configurable=true;if("value"in r)r.writable=true;Object.defineProperty(t,r.key,r)}}function o(t,e,n){if(e)a(t.prototype,e);if(n)a(t,n);Object.defineProperty(t,"prototype",{writable:false});return t}function i(t,e){if(typeof e!=="function"&&e!==null){throw new TypeError("Super expression must either be null or a function")}t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:true,configurable:true}});Object.defineProperty(t,"prototype",{writable:false});if(e)s(t,e)}function s(t,e){s=Object.setPrototypeOf||function t(e,n){e.__proto__=n;return e};return s(t,e)}function u(t){var e=f();return function n(){var r=E(t),a;if(e){var o=E(this).constructor;a=Reflect.construct(r,arguments,o)}else{a=r.apply(this,arguments)}return c(this,a)}}function c(t,e){if(e&&(typeof e==="object"||typeof e==="function")){return e}else if(e!==void 0){throw new TypeError("Derived constructors may only return object or undefined")}return l(t)}function l(t){if(t===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return t}function f(){if(typeof Reflect==="undefined"||!Reflect.construct)return false;if(Reflect.construct.sham)return false;if(typeof Proxy==="function")return true;try{Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}));return true}catch(t){return false}}function E(t){E=Object.setPrototypeOf?Object.getPrototypeOf:function t(e){return e.__proto__||Object.getPrototypeOf(e)};return E(t)}
/*!
   * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	
   */var p=t["DataSourceType"];var b=e["MetadataParser"];function y(t,e,n){if(n){return e?e(t):t}if(!t||!t.then){t=Promise.resolve(t)}return e?t.then(e):t}function A(t,e,n){if(n){return e?e(t()):t()}try{var r=Promise.resolve(t());return e?r.then(e):r}catch(t){return Promise.reject(t)}}var R=function(t){i(a,t);var e=u(a);function a(t){r(this,a);return e.call(this,t)}o(a,[{key:"fireRequest",value:function t(e,n){return A(function(){return y(e.getJson(n))})}},{key:"parseResponse",value:function t(e){var n=this;return A(function(){var t={businessObjectMap:{},businessObjectList:[],dataSourceMap:{},dataSourcesList:[]};var r=e.data&&e.data.metadata||e.data||e;var a=r["$EntityContainer"];if(typeof a!=="string"||a.length<1){throw"Meta data contains invalid EntityContainer!"}var o=a.split(".");var i=o[0];var s=o[1];var u=r[i];var c=u[s];var l=n._parseEntityType(i,u,s,c);n._parseEntityContainer(c,l,t);return y(t)})}},{key:"_parseEntityType",value:function t(e,n,r,a){var o={};for(var i in n){if(i===r){continue}var s=n[i];if(s["@EnterpriseSearch.enabled"]!==true){continue}i=i.substring(0,i.length-4);var u={schema:e,keys:[],attributeMap:{},label:a[i]["@SAP.Common.Label"]||"",labelPlural:a[i]["@SAP.Common.Label"]||"",annotations:{}};o[i]=u;var c=0;for(var l in s){var f=s[l];if(l==="$Key"){u.keys=f;continue}if(l.startsWith("@")){this._parseEntityTypeAnnotations(l,f,u);continue}this._parseAttribute(l,f,u,c);c++}}return o}},{key:"_parseEntityTypeAnnotations",value:function t(e,n,r){e=e.substring(1).toUpperCase();switch(e){case"UI.HEADERINFO.TYPENAME":r.label=n;break;case"UI.HEADERINFO.TYPENAMEPLURAL":r.label=n;break;case"UI.HEADERINFO.TITLE.TYPE":this._setAnnotationValue(r.annotations,e,n);break;case"UI.HEADERINFO.TITLE.VALUEQUALIFIER":this._setAnnotationValue(r.annotations,e,n);break;case"UI.HEADERINFO.TYPEIMAGEURL":r.icon=n;break;default:this._setAnnotationValue(r.annotations,e,n)}}},{key:"_parseAttribute",value:function t(e,r,a,o){if(n(r)!=="object"){return}var i={labelRaw:e,label:null,type:"",presentationUsage:[],isFacet:false,isSortable:false,supportsTextSearch:false,displayOrder:o,annotationsAttr:{},unknownAnnotation:[]};a.attributeMap[e]=i;for(var s in r){var u=r[s];if(s==="$Type"||s==="Type"){i["type"]=u;continue}if(s.startsWith("@")){this._parseAttributeAnnotations(s,u,i)}}}},{key:"_parseAttributeAnnotations",value:function t(e,n,r){e=e.substring(1).toUpperCase();if(n!==undefined){this._normalizeAnnotationValueOfArrayOrObject(n);switch(e){case"SAP.COMMON.LABEL":if(!r.label){r.label=n}break;case"ENTERPRISESEARCH.KEY":r.isKey=n;break;case"ENTERPRISESEARCH.PRESENTATIONMODE":r.presentationUsage=n;break;case"ENTERPRISESEARCHHANA.ISSORTABLE":r.isSortable=n;break;case"ENTERPRISESEARCHHANA.SUPPORTSTEXTSEARCH":r.supportsTextSearch=n;break;case"ENTERPRISESEARCH.FILTERINGFACET.DEFAULT":r.isFacet=n;break;case"ENTERPRISESEARCH.FILTERINGFACET.DISPLAYPOSITION":r.facetPosition=n;break;case"ENTERPRISESEARCH.FILTERINGFACET.ICONURL":r.facetIconUrlAttributeName=n;break;case"ENTERPRISESEARCH.FILTERINGATTRIBUTE.DEFAULT":r.isFilteringAttribute=n;break;case"ENTERPRISESEARCH.FILTERINGATTRIBUTE.DISPLAYPOSITION":r.facetPosition=n;break;case"ENTERPRISESEARCH.FILTERINGATTRIBUTE.ICONURL":r.facetIconUrlAttributeName=n;break;case"ENTERPRISESEARCH.DISPLAYORDER":r.displayOrder=n;break;default:if(e.startsWith("UI")||e.startsWith("OBJECTMODEL")||e.startsWith("SEMANTICS")){this._setAnnotationValue(r.annotationsAttr,e,n)}else{r.unknownAnnotation.push(e)}}}}},{key:"_normalizeAnnotationValueOfArrayOrObject",value:function t(e){if(Array.isArray(e)){for(var n=0;n<e.length;n++){this._normalizeAnnotationValueOfObject(e[n])}}else this._normalizeAnnotationValueOfObject(e);return e}},{key:"_normalizeAnnotationValueOfObject",value:function t(e){if(n(e)==="object"){for(var r in e){var a=r.toUpperCase();e[a]=e[r];delete e[r]}}return e}},{key:"_getValueFromArrayWithSingleEntry",value:function t(e){if(Array.isArray(e)&&e.length===1){return e[0]}return e}},{key:"_parseEntityContainer",value:function t(e,n,r){for(var a in e){var o=n[a];if(a==="$Kind"){continue}if(o===undefined){throw"EntityType "+a+" has no corresponding meta data!"}var i=this.sina._createDataSource({id:a,label:o.label||a,labelPlural:o.labelPlural||o.label||a,icon:o.icon||"",type:p.BusinessObject,attributesMetadata:[{id:"dummy"}]});i.annotations=o.annotations;r.dataSourceMap[i.id]=i;r.dataSourcesList.push(i);o.name=a;o.dataSource=i;r.businessObjectMap[a]=o;r.businessObjectList.push(o)}}}]);return a}(b);var T={__esModule:true};T.MetadataParserJson=R;return T})})();