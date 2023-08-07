/*! 
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	 
 */
(function(){sap.ui.define([],function(){function e(e,a){if(!(e instanceof a)){throw new TypeError("Cannot call a class as a function")}}function a(e,a){for(var t=0;t<a.length;t++){var i=a[t];i.enumerable=i.enumerable||false;i.configurable=true;if("value"in i)i.writable=true;Object.defineProperty(e,i.key,i)}}function t(e,t,i){if(t)a(e.prototype,t);if(i)a(e,i);Object.defineProperty(e,"prototype",{writable:false});return e}
/*!
   * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	
   */var i=function(){function a(t){e(this,a);this.provider=t;this.sina=t.sina}t(a,[{key:"calculateMultiDataSourceLabel",value:function e(a,t){if(t.label){var i=t.label||t.id;return a+" - "+i}return a}},{key:"calculateMultiDataSourceId",value:function e(a,t){return t+"_"+a}},{key:"updateProviderId",value:function e(a){var t=0;for(;;){if(t!==0){a.provider.id=a.provider.id+"_"+t}var i=this.findSinaById(a.provider.id);if(i){t++;continue}else{break}}}},{key:"createMultiDataSource",value:function e(a,t){return this.sina._createDataSource({id:a,label:this.calculateMultiDataSourceLabel(t.label,t.sina.provider),labelPlural:this.calculateMultiDataSourceLabel(t.labelPlural,t.sina.provider),type:t.type,hidden:t.hidden,attributesMetadata:t.attributesMetadata})}},{key:"findSinaById",value:function e(a){for(var t=0;t<this.provider.multiSina.length;t++){var i=this.provider.multiSina[t];if(a===i.provider.id){return i}}return undefined}},{key:"updateAttributesMetadata",value:function e(a,t){t.attributesMetadata=a.attributesMetadata;t.attributeMetadataMap=a.attributeMetadataMap}},{key:"updateSuggestionDataSource",value:function e(a){for(var t=0;t<a.items.length;t++){var i=a.items[t];if(i.childSuggestions){for(var r=0;r<i.childSuggestions.length;r++){var u=i.childSuggestions[r];var n=this.calculateMultiDataSourceId(u.dataSource.id,u.sina.provider.id);u.dataSource=this.sina.dataSourceMap[n];u.filter.dataSource=this.sina.dataSourceMap[n]}}if(i.dataSource){i.label=this.calculateMultiDataSourceLabel(i.label,i.sina.provider);var o=this.calculateMultiDataSourceId(i.dataSource.id,i.sina.provider.id);var l=this.sina.dataSourceMap[o];i.dataSource=l;i.sina=this.sina}}return a}},{key:"createMultiChartResultSet",value:function e(a){var t=this;var i=t.sina._createChartResultSet({id:a.id,items:[],query:a.query,title:a.title});for(var r=0;r<a.items.length;r++){var u=a.items[r];var n=t.sina.parseConditionFromJson(u.filterCondition.toJson());i.items.push(t.sina._createChartResultSetItem({filterCondition:n,dimensionValueFormatted:u.dimensionValueFormatted,measureValue:u.measureValue,measureValueFormatted:u.measureValueFormatted}))}return i}},{key:"updateDataSourceFacets",value:function e(a){for(var t=0;t<a[0].items.length;t++){var i=a[0].items[t];if(i.dataSource){var r=this.calculateMultiDataSourceId(i.dataSource.id,i.sina.provider.id);if(!this.provider.multiDataSourceMap[r]){this.createMultiDataSource(r,i.dataSource);this.provider.multiDataSourceMap[r]=i.dataSource}i.dataSource=this.sina.dataSourceMap[r]}}return a}},{key:"updateRootCondition",value:function e(a,t){a.sina=t;if(a.conditions&&a.conditions.length>0){for(var i=0;i<a.conditions.length;i++){this.updateRootCondition(a.conditions[i],t)}}}}]);return a}();var r={__esModule:true};r.ProviderHelper=i;return r})})();