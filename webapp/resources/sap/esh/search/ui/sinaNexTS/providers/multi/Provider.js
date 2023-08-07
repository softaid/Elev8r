/*! 
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	 
 */
(function(){sap.ui.define(["../AbstractProvider","./FacetMode","./FederationType","./ProviderHelper","../../sina/Sina","./FederationMethod","../../core/Log","../../sina/SinaConfiguration","../abap_odata/Provider","../hana_odata/Provider","../sample/Provider","../inav2/Provider","../dummy/Provider","../../core/errors"],function(e,t,r,a,i,o,n,u,c,s,l,d,f,p){function v(e,t){if(!(e instanceof t)){throw new TypeError("Cannot call a class as a function")}}function S(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||false;a.configurable=true;if("value"in a)a.writable=true;Object.defineProperty(e,a.key,a)}}function h(e,t,r){if(t)S(e.prototype,t);if(r)S(e,r);Object.defineProperty(e,"prototype",{writable:false});return e}function m(e,t){if(typeof t!=="function"&&t!==null){throw new TypeError("Super expression must either be null or a function")}e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:true,configurable:true}});Object.defineProperty(e,"prototype",{writable:false});if(t)y(e,t)}function y(e,t){y=Object.setPrototypeOf||function e(t,r){t.__proto__=r;return t};return y(e,t)}function b(e){var t=M();return function r(){var a=P(e),i;if(t){var o=P(this).constructor;i=Reflect.construct(a,arguments,o)}else{i=a.apply(this,arguments)}return g(this,i)}}function g(e,t){if(t&&(typeof t==="object"||typeof t==="function")){return t}else if(t!==void 0){throw new TypeError("Derived constructors may only return object or undefined")}return D(e)}function D(e){if(e===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return e}function M(){if(typeof Reflect==="undefined"||!Reflect.construct)return false;if(Reflect.construct.sham)return false;if(typeof Proxy==="function")return true;try{Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}));return true}catch(e){return false}}function P(e){P=Object.setPrototypeOf?Object.getPrototypeOf:function e(t){return t.__proto__||Object.getPrototypeOf(t)};return P(e)}function A(e,t,r){if(t in e){Object.defineProperty(e,t,{value:r,enumerable:true,configurable:true,writable:true})}else{e[t]=r}return e}
/*!
   * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	
   */var C=e["AbstractProvider"];var R=t["FacetMode"];var k=r["FederationType"];var w=a["ProviderHelper"];var O=i["Sina"];var _=n["Log"];var T=u["AvailableProviders"];var F=u["_normalizeConfiguration"];var H=c["Provider"];var j=s["Provider"];var I=l["Provider"];var E=d["Provider"];var U=f["Provider"];var z=p["NotImplementedError"];function B(e,t,r){if(r){return t?t(e):e}if(!e||!e.then){e=Promise.resolve(e)}return t?e.then(t):e}var V;function Q(e,t,r){if(r){return t?t(e()):e()}try{var a=Promise.resolve(e());return t?a.then(t):a}catch(e){return Promise.reject(e)}}(function(e){e["All"]="All";e["UserCategory"]="UserCategory";e["BusinessObject"]="BusinessObject";e["Category"]="Category"})(V||(V={}));var q=function(e){m(r,e);var t=b(r);function r(){var e;v(this,r);for(var a=arguments.length,i=new Array(a),o=0;o<a;o++){i[o]=arguments[o]}e=t.call.apply(t,[this].concat(i));A(D(e),"id","multi");return e}h(r,[{key:"initAsync",value:function e(t){var r=this;return Q(function(){r.log=new _("MultiProvider");r.sina=t.sina;r.facetMode=R[t.facetMode]||R.flat;r.federationType=k[t.federationType]||k.advanced_round_robin;r.multiSina=[];r.multiDataSourceMap={};r.sina.dataSourceMap[r.sina.allDataSource.id]=r.sina.allDataSource;r.providerHelper=new w(r);switch(r.federationType){case k.advanced_round_robin:{r.federationMethod=new o.AdvancedRoundRobin;break}case k.ranking:{r.federationMethod=new o.Ranking;break}case k.round_robin:{r.federationMethod=new o.RoundRobin;break}}r.sina.capabilities=r.sina._createCapabilities({fuzzy:false});var e=[];t.subProviders.forEach(function(t){var a=r.createAsync(t).then(function(e){r.providerHelper.updateProviderId(e);for(var t=0;t<e.dataSources.length;t++){var a=e.dataSources[t];var i=r.providerHelper.calculateMultiDataSourceId(a.id,e.provider.id);r.providerHelper.createMultiDataSource(i,a);r.multiDataSourceMap[i]=a}r.multiSina.push(e);return e});e.push(a)});var a=false;return B(Promise.allSettled(e),function(e){e.forEach(function(e){if(e.status==="rejected"){r.log.warn("Error during creation of subprovider: ".concat(e.reason.stack))}else if(e.status==="fulfilled"){a=true;if(e.value.capabilities.fuzzy){r.sina.capabilities.fuzzy=true}}});if(!a){r.log.error("Error during creation of multi provider: no valid subproviders");return Promise.reject()}r.sina.dataSources.sort(function(e,t){return e.labelPlural.localeCompare(t.labelPlural)});return r.sina})})}},{key:"createAsync",value:function e(t){var a=this;return Q(function(){a.log.debug("Creating new eshclient instance using provider ".concat(t.provider));return B(F(t),function(e){var a;switch(e.provider){case T.HANA_ODATA:{a=new j;break}case T.ABAP_ODATA:{a=new H;break}case T.INAV2:{a=new E;break}case T.MULTI:{a=new r;break}case T.SAMPLE:{a=new I;break}case T.DUMMY:{a=new U;break}default:{throw new Error("Unknown Provider: '".concat(t.provider,"' - Available Providers: ").concat(T.HANA_ODATA,", ").concat(T.ABAP_ODATA,", ").concat(T.INAV2,", ").concat(T.MULTI,", ").concat(T.SAMPLE,", ").concat(T.DUMMY,"."))}}var i=new O(a);return B(i.initAsync(e),function(){return i})})})}},{key:"getFilterDataSourceType",value:function e(t){if(t===this.sina.allDataSource){return V.All}if(t.type===this.sina.DataSourceType.UserCategory){return V.UserCategory}if(t.type===this.sina.DataSourceType.BusinessObject){return V.BusinessObject}if(t.type===this.sina.DataSourceType.Category){return V.Category}}},{key:"handleAllSearch",value:function e(t){var r=this;return Q(function(){var e;var a=[];var i=r.initializeSearchResultSet(t);var o=[];i.facets.push(r.sina._createDataSourceResultSet({title:t.filter.dataSource.label,items:[],query:t}));for(var n=0;n<r.multiSina.length;n++){e=r.multiSina[n].createSearchQuery({calculateFacets:t.calculateFacets,multiSelectFacets:t.multiSelectFacets,dataSource:r.multiSina[n].allDataSource,searchTerm:t.getSearchTerm(),top:t.top,skip:t.skip,sortOrder:t.sortOrder,sina:r.multiSina[n]});a.push(e.getResultSetAsync())}return Promise.all(a).then(function(e){for(var a=0;a<e.length;a++){var n=e[a];for(var u=0;u<n.items.length;u++){var c=n.items[u];var s=r.providerHelper.calculateMultiDataSourceId(c.dataSource.id,c.sina.provider.id);var l=r.sina.dataSourceMap[s];c.dataSource=l;c.sina=r.sina}i.totalCount+=n.totalCount;o.push(n.items);if(n.facets[0]){if(r.facetMode===R.tree){var d=r.sina.getDataSource(r.providerHelper.calculateMultiDataSourceId(n.query.filter.dataSource.id,n.sina.provider.id));i.facets[0].items.push(r.sina._createDataSourceResultSetItem({dataSource:d,dimensionValueFormatted:r.providerHelper.calculateMultiDataSourceLabel(n.query.filter.dataSource.label,n.sina.provider),measureValue:n.totalCount,measureValueFormatted:n.totalCount}))}else{var f=r.providerHelper.updateDataSourceFacets(n.facets);f[0].items.forEach(function(e){i.facets[0].items.push(e)})}}}i.items=r.federationMethod.sort(o);i.items=i.items.slice(t.skip,t.top);return i})})}},{key:"handleUserCategorySearch",value:function e(t){var r=this;return Q(function(){var e;var a=[];var i=r.initializeSearchResultSet(t);var o=[];var n=t.filter.dataSource;var u=[];r.multiSina.forEach(function(e){if(e.provider.id.startsWith("abap_odata")||e.provider.id.startsWith("sample")){var t=r.providerHelper.calculateMultiDataSourceId(n.id,e.provider.id);var a=r.multiDataSourceMap[t];if(!a){a=e.createDataSource({id:t,label:n.label,labelPlural:n.labelPlural,type:n.type,subDataSources:[],undefinedSubDataSourceIds:[]});r.multiDataSourceMap[t]=a}else{a.subDataSources=[]}}});n.subDataSources.forEach(function(e){var t=r.multiDataSourceMap[e.id];var a=t.sina;if(a.provider.id.startsWith("abap_odata")||a.provider.id.startsWith("sample")){var i=r.providerHelper.calculateMultiDataSourceId(n.id,a.provider.id);var o=r.multiDataSourceMap[i];if(o.subDataSources.length===0){u.push(o)}o.subDataSources.push(t)}else{u.push(t)}});u.forEach(function(r){e=r.sina.createSearchQuery({calculateFacets:t.calculateFacets,multiSelectFacets:t.multiSelectFacets,dataSource:r,searchTerm:t.getSearchTerm(),top:t.top,skip:t.skip,sortOrder:t.sortOrder,sina:r.sina});a.push(e.getResultSetAsync())});return Promise.all(a).then(function(e){i.facets.push(r.sina._createDataSourceResultSet({title:t.filter.dataSource.label,items:[],query:t}));for(var a=0;a<e.length;a++){var n=e[a];for(var u=0;u<n.items.length;u++){var c=n.items[u];var s=r.providerHelper.calculateMultiDataSourceId(c.dataSource.id,c.sina.provider.id);var l=r.sina.dataSourceMap[s];c.dataSource=l;c.sina=r.sina}i.totalCount+=n.totalCount;o.push(n.items);if(t.calculateFacets){var d=n.query.filter.dataSource;var f=n.sina._createDataSourceResultSet({title:d.label,items:[],query:n.query});if(n.facets.length===0&&n.items.length>0){f.items.push(n.sina._createDataSourceResultSetItem({dataSource:d.subDataSources[0],dimensionValueFormatted:d.subDataSources[0].label,measureValue:n.totalCount,measureValueFormatted:n.totalCount}));n.facets.push(f)}if(n.facets.length>0&&n.facets[0].type==="Chart"&&n.items.length>0){f.items.push(n.sina._createDataSourceResultSetItem({dataSource:d,dimensionValueFormatted:d.label,measureValue:n.totalCount,measureValueFormatted:n.totalCount}));n.facets=[f]}if(n.facets.length===1&&n.facets[0].type==="DataSource"){r.providerHelper.updateDataSourceFacets(n.facets);i.facets[0].items=i.facets[0].items.concat(n.facets[0].items)}}}i.items=r.federationMethod.sort(o);i.items=i.items.slice(t.skip,t.top);return i})})}},{key:"handleBusinessObjectSearch",value:function e(t){var r=this;return Q(function(){var e=r.multiDataSourceMap[t.filter.dataSource.id];var a=t.getRootCondition().clone();var i=r.initializeSearchResultSet(t);r.providerHelper.updateRootCondition(a,e.sina);var o=e.sina.createSearchQuery({calculateFacets:t.calculateFacets,multiSelectFacets:t.multiSelectFacets,dataSource:e,searchTerm:t.getSearchTerm(),rootCondition:t.getRootCondition(),top:t.top,skip:t.skip,sortOrder:t.sortOrder,sina:e.sina});return B(o.getResultSetAsync().then(function(e){i.items=e.items;i.totalCount=e.totalCount;for(var t=0;t<i.items.length;t++){var a=i.items[t];var o=r.providerHelper.calculateMultiDataSourceId(a.dataSource.id,a.sina.provider.id);r.providerHelper.updateAttributesMetadata(a.dataSource,r.sina.dataSourceMap[o]);a.dataSource=r.sina.dataSourceMap[o];a.sina=r.sina}var n;if(e.facets.length===1&&e.facets[0].items[0].dataSource){n=e.facets;n[0].title=r.providerHelper.calculateMultiDataSourceLabel(e.facets[0].title,e.facets[0].sina.provider);r.providerHelper.updateDataSourceFacets(n)}else{n=[];for(var u=0;u<e.facets.length;u++){var c=e.facets[u];n.push(r.providerHelper.createMultiChartResultSet(c))}}i.facets=n;return i}))})}},{key:"initializeSearchResultSet",value:function e(t){return this.sina._createSearchResultSet({title:"Search Multi Result List",query:t,items:[],totalCount:0,facets:[]})}},{key:"executeSearchQuery",value:function e(t){switch(this.getFilterDataSourceType(t.filter.dataSource)){case V.All:return this.handleAllSearch(t);case V.UserCategory:return this.handleUserCategorySearch(t);case V.BusinessObject:case V.Category:return this.handleBusinessObjectSearch(t)}}},{key:"executeChartQuery",value:function e(t){var r=this;var a=r.multiDataSourceMap[t.filter.dataSource.id];var i=t.getRootCondition().clone();r.providerHelper.updateRootCondition(i,a.sina);var o=a.sina.createChartQuery({dimension:t.dimension,dataSource:a,searchTerm:t.getSearchTerm(),rootCondition:i,top:t.top,skip:t.skip,sortOrder:t.sortOrder});return o.getResultSetAsync().then(function(e){return r.providerHelper.createMultiChartResultSet(e)})}},{key:"executeHierarchyQuery",value:function e(t){throw new z}},{key:"executeSuggestionQuery",value:function e(t){var r=this;var a;if(t.filter.dataSource===r.sina.allDataSource){var i=[];for(var n=0;n<r.multiSina.length;n++){a=r.multiSina[n].createSuggestionQuery({types:t.types,calculationModes:t.calculationModes,dataSource:r.multiSina[n].allDataSource,searchTerm:t.getSearchTerm(),top:t.top,skip:t.skip,sortOrder:t.sortOrder});i.push(a.getResultSetAsync())}return Promise.allSettled(i).then(function(e){var a=r.sina._createSuggestionResultSet({title:"Multi Suggestions",query:t,items:[]});for(var i=0;i<e.length;i++){var n=e[i];if(n.status==="fulfilled"){var u=r.providerHelper.updateSuggestionDataSource(n.value);a.items=(new o.RoundRobin).mergeMultiResults(a.items,u.items,i+1)}}return a})}var u=r.multiDataSourceMap[t.filter.dataSource.id];a=u.sina.createSuggestionQuery({types:t.types,calculationModes:t.calculationModes,dataSource:u,searchTerm:t.getSearchTerm(),top:t.top,skip:t.skip,sortOrder:t.sortOrder});return a.getResultSetAsync().then(function(e){return r.providerHelper.updateSuggestionDataSource(e)})}}]);return r}(C);var L={__esModule:true};L.MultiProvider=q;return L})})();