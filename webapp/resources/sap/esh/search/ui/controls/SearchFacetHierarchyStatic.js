/*! 
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	 
 */
(function(){sap.ui.define(["sap/m/List","sap/m/GroupHeaderListItem","sap/m/CustomListItem","./SearchFacetHierarchyStaticTreeItem","sap/m/Label","sap/m/library","sap/ui/core/Icon","sap/m/FlexBox","../tree/TreeView","sap/m/FlexItemData"],function(e,t,r,n,o,a,i,c,u,f){function l(e){return e&&e.__esModule&&typeof e.default!=="undefined"?e.default:e}function s(e,t){if(!(e instanceof t)){throw new TypeError("Cannot call a class as a function")}}function p(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||false;n.configurable=true;if("value"in n)n.writable=true;Object.defineProperty(e,n.key,n)}}function y(e,t,r){if(t)p(e.prototype,t);if(r)p(e,r);Object.defineProperty(e,"prototype",{writable:false});return e}function d(e,t){if(typeof t!=="function"&&t!==null){throw new TypeError("Super expression must either be null or a function")}e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:true,configurable:true}});Object.defineProperty(e,"prototype",{writable:false});if(t)h(e,t)}function h(e,t){h=Object.setPrototypeOf||function e(t,r){t.__proto__=r;return t};return h(e,t)}function b(e){var t=m();return function r(){var n=O(e),o;if(t){var a=O(this).constructor;o=Reflect.construct(n,arguments,a)}else{o=n.apply(this,arguments)}return w(this,o)}}function w(e,t){if(t&&(typeof t==="object"||typeof t==="function")){return t}else if(t!==void 0){throw new TypeError("Derived constructors may only return object or undefined")}return v(e)}function v(e){if(e===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return e}function m(){if(typeof Reflect==="undefined"||!Reflect.construct)return false;if(Reflect.construct.sham)return false;if(typeof Proxy==="function")return true;try{Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}));return true}catch(e){return false}}function O(e){O=Object.setPrototypeOf?Object.getPrototypeOf:function e(t){return t.__proto__||Object.getPrototypeOf(t)};return O(e)}function g(e,t,r){if(t in e){Object.defineProperty(e,t,{value:r,enumerable:true,configurable:true,writable:true})}else{e[t]=r}return e}var j=l(n);var F=a["ListSeparators"];var I=a["ListMode"];var S=l(u);var L=function(e){d(a,e);var n=b(a);function a(e,o){var i;s(this,a);i=n.call(this,e,o);i.setShowSeparators(F.None);i.setMode(I.SingleSelectMaster);i.addItem(new t("",{title:"{title}"}));var c=new S("",{treeNodeFactory:"{treeNodeFactory}",items:{path:"rootTreeNode/childTreeNodes",factory:i.createTreeItem.bind(v(i))}});i.addItem(new r({content:c}));return i}y(a,[{key:"createTreeItem",value:function e(t,r){var n=new o({text:"{label}",width:"100%"});n.setLayoutData(new f({growFactor:1}));n.addStyleClass("sapUshellSearchHierarchyFacetItemLabel");var a=r.getObject();n.attachBrowserEvent("click",function(){a.toggleFilter()});var u=new i("",{src:"{icon}"});u.addStyleClass("sapUshellSearchHierarchyFacetItemIcon");u.setLayoutData(new f({growFactor:0}));u.attachBrowserEvent("click",function(){a.toggleFilter()});var l=new c("",{items:[u,n],width:"100%"});var s=new j("",{content:l,selectLine:"{hasFilter}"});return s}}]);return a}(e);g(L,"renderer",{apiVersion:2});return L})})();