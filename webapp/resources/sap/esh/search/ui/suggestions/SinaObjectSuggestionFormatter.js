/*! 
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	 
 */
(function(){sap.ui.define(["sap/esh/search/ui/SearchNavigationObjectForSinaNavTarget"],function(e){function t(e,t){if(!(e instanceof t)){throw new TypeError("Cannot call a class as a function")}}function a(e,t){for(var a=0;a<t.length;a++){var i=t[a];i.enumerable=i.enumerable||false;i.configurable=true;if("value"in i)i.writable=true;Object.defineProperty(e,i.key,i)}}function i(e,t,i){if(t)a(e.prototype,t);if(i)a(e,i);Object.defineProperty(e,"prototype",{writable:false});return e}var r=function(){function a(){t(this,a)}i(a,[{key:"assembleLabel1",value:function e(t){var a=[];var i=false;var r;var n=t.object.titleAttributes;for(var l=0;l<n.length;++l){r=n[l];a.push(r.valueHighlighted);if(r.isHighlighted){i=true}}return{label:a.join(" "),isHighlighted:i}}},{key:"assembleLabel2",value:function e(t,a){var i=a.object.detailAttributes;var r;if(i.length===0){return""}if(!t){r=this.getFirstHighlightedAttribute(i);if(r){return r.valueHighlighted}}r=this.getFirstStringAttribute(i);if(r){return r.label+": "+r.valueHighlighted}return""}},{key:"getFirstHighlightedAttribute",value:function e(t){for(var a=0;a<t.length;++a){var i=t[a];if(i.isHighlighted){return i}}}},{key:"getFirstStringAttribute",value:function e(t){var a={Date:40,Double:70,GeoJson:130,ImageBlob:120,ImageUrl:110,Integer:60,String:10,Time:50,Timestamp:30};if(t.length===0){return null}t=t.slice();t.sort(function(e,t){return a[e.metadata.type]-a[t.metadata.type]});var i=t[0];if(a[i.metadata.type]>100){return null}return i}},{key:"assembleNavigation",value:function t(a,i){if(!a.object.defaultNavigationTarget){return null}var r=new e(a.object.defaultNavigationTarget,i);r.setLoggingType("OBJECT_SUGGESTION_NAVIGATE");return r}},{key:"assembleImageUrl",value:function e(t){var a=t.object.detailAttributes.concat(t.object.titleAttributes);for(var i=0;i<a.length;++i){var r=a[i];if(r.metadata.type===r.sina.AttributeType.ImageUrl){return{imageUrl:r.value,imageExists:true,imageIsCircular:r.metadata.format&&r.metadata.format===t.sina.AttributeFormatType.Round}}}return{exists:false}}},{key:"format",value:function e(t,a){var i=a;var r=this.assembleLabel1(a);i.label1=r.label;i.label2=this.assembleLabel2(r.isHighlighted,a);i.titleNavigation=this.assembleNavigation(a,t.model);var n=this.assembleImageUrl(a);a.sina.core.extend(i,n);i.position=a.position;t.addSuggestion(i)}}]);return a}();return r})})();