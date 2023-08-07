/*! 
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	 
 */
(function(){sap.ui.define(["sap/base/Log","../i18n","./AppSuggestionProvider","./RecentlyUsedSuggestionProvider","./SinaSuggestionProvider","./SuggestionType","./TimeMerger","./TransactionSuggestionProvider","sap/esh/search/ui/SearchHelper","../sinaNexTS/providers/abap_odata/UserEventLogger"],function(e,t,r,i,n,s,o,a,u,g){function l(e){return e&&e.__esModule&&typeof e.default!=="undefined"?e.default:e}function c(e){return h(e)||d(e)||S(e)||f()}function f(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function d(e){if(typeof Symbol!=="undefined"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function h(e){if(Array.isArray(e))return v(e)}function p(e,t){var r=typeof Symbol!=="undefined"&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=S(e))||t&&e&&typeof e.length==="number"){if(r)e=r;var i=0;var n=function(){};return{s:n,n:function(){if(i>=e.length)return{done:true};return{done:false,value:e[i++]}},e:function(e){throw e},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s=true,o=false,a;return{s:function(){r=r.call(e)},n:function(){var e=r.next();s=e.done;return e},e:function(e){o=true;a=e},f:function(){try{if(!s&&r.return!=null)r.return()}finally{if(o)throw a}}}}function S(e,t){if(!e)return;if(typeof e==="string")return v(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);if(r==="Object"&&e.constructor)r=e.constructor.name;if(r==="Map"||r==="Set")return Array.from(e);if(r==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return v(e,t)}function v(e,t){if(t==null||t>e.length)t=e.length;for(var r=0,i=new Array(t);r<t;r++)i[r]=e[r];return i}function m(e,t){if(!(e instanceof t)){throw new TypeError("Cannot call a class as a function")}}function y(e,t){for(var r=0;r<t.length;r++){var i=t[r];i.enumerable=i.enumerable||false;i.configurable=true;if("value"in i)i.writable=true;Object.defineProperty(e,i.key,i)}}function b(e,t,r){if(t)y(e.prototype,t);if(r)y(e,r);Object.defineProperty(e,"prototype",{writable:false});return e}function T(e,t,r){if(t in e){Object.defineProperty(e,t,{value:r,enumerable:true,configurable:true,writable:true})}else{e[t]=r}return e}var P=l(t);var I=l(r);var k=l(i);var w=l(n);var x=s["Type"];var L=s["SuggestionType"];var H=l(o);var R=l(a);var M=g["UserEventType"];var D=function(){function t(r){m(this,t);T(this,"uiUpdateInterval",500);T(this,"uiClearOldSuggestionsTimeOut",1e3);this._oLogger=e.getLogger("sap.esh.search.ui.suggestions.SuggestionHandler");this.model=r.model;this.suggestionProviders=[];this.keyboardRelaxationTime=this.model.config.suggestionKeyboardRelaxationTime;if(this.supportsRecentlyUsedSuggestions()){this.recentlyUsedSuggestionProvider=new k({model:this.model,suggestionHandler:this})}this.appSuggestionProvider=new I({model:this.model,suggestionHandler:this});this.doSuggestionInternalDelayed=u.delayedExecution(this.doSuggestionInternal.bind(this),this.keyboardRelaxationTime);this.timeMerger=new H;this.performanceLoggerSuggestionMethods=[]}b(t,[{key:"supportsRecentlyUsedSuggestions",value:function e(){if(!this.model.config.bRecentSearches)return false;return true}},{key:"supportsTransactionSuggestions",value:function e(){return false;if(window.sap.cf)return false;if(!this.model.config.isUshell)return false;if(this.model.sinaNext.provider.serverInfo&&this.model.sinaNext.provider.serverInfo.Services&&this.model.sinaNext.provider.serverInfo.Services.results&&this.model.sinaNext.provider.serverInfo.Services.results.length>0){var t=p(this.model.sinaNext.provider.serverInfo.Services.results),r;try{for(t.s();!(r=t.n()).done;){var i=r.value;if(i.Id==="TransactionSuggestions")return true}}catch(e){t.e(e)}finally{t.f()}}return false}},{key:"abortSuggestions",value:function e(t){var r=this;if(t===undefined||t===true){this.model.setProperty("/suggestions",[])}if(this.clearSuggestionTimer){clearTimeout(this.clearSuggestionTimer);this.clearSuggestionTimer=null}this.doSuggestionInternalDelayed.abort();this.getSuggestionProviders().then(function(e){for(var t=0;t<e.length;++t){var i=e[t];i.abortSuggestions()}r.timeMerger.abort();var n=p(r.performanceLoggerSuggestionMethods),s;try{for(n.s();!(s=n.n()).done;){var o=s.value;r.model.config.performanceLogger.leaveMethod({name:o})}}catch(e){n.e(e)}finally{n.f()}r.performanceLoggerSuggestionMethods=[]})}},{key:"getSuggestionProviders",value:function e(){var t=this;if(this.suggestionProvidersPromise){return this.suggestionProvidersPromise}this.suggestionProvidersPromise=this.model.initBusinessObjSearch().then(function(){t.sinaNext=t.model.sinaNext;var e=[];if(t.model.config.isUshell){e.push(t.appSuggestionProvider)}if(t.supportsRecentlyUsedSuggestions()){e.push(t.recentlyUsedSuggestionProvider)}if(!t.model.config.searchBusinessObjects){return Promise.resolve(e)}e.push.apply(e,c(t.createSinaSuggestionProviders()));if(t.supportsTransactionSuggestions()){t.transactionSuggestionProvider=new R({model:t.model,suggestionHandler:t});e.push(t.transactionSuggestionProvider)}return Promise.resolve(e)});return this.suggestionProvidersPromise}},{key:"createSinaSuggestionProviders",value:function e(){var t=[{suggestionTypes:[x.SearchTermHistory]},{suggestionTypes:[x.SearchTermData]},{suggestionTypes:[x.DataSource]}];if(this.model.config.boSuggestions){t.push({suggestionTypes:[x.Object]})}var r=[];for(var i=0;i<t.length;++i){var n=t[i];r.push(new w({model:this.model,sinaNext:this.sinaNext,suggestionTypes:n.suggestionTypes,suggestionHandler:this}))}return r}},{key:"isSuggestionPopupVisible",value:function e(){return jQuery(".searchSuggestion").filter(":visible").length>0}},{key:"doSuggestion",value:function e(t){this.abortSuggestions(false);this.doSuggestionInternalDelayed(t)}},{key:"autoSelectAppSuggestion",value:function e(t){return this.appSuggestionProvider.getSuggestions(t).then(function(e){return e[0]})}},{key:"autoSelectTransactionSuggestion",value:function e(){var t;var r=arguments.length>0&&arguments[0]!==undefined?arguments[0]:"";r=r.toUpperCase();return(t=this.transactionSuggestionProvider)===null||t===void 0?void 0:t.transactionSuggestions.find(function(e){return e.key===r})}},{key:"doSuggestionInternal",value:function e(t){var r=this;this.firstInsertion=true;this.busyIndicator=false;var i=this.model.getProperty("/uiFilter/searchTerm");if(i.length===0){if(this.supportsRecentlyUsedSuggestions()){this.recentlyUsedSuggestionProvider.getSuggestions().then(function(e){r.insertSuggestions(e,0)})}return}if(i.trim()===""||i.trim()==="*"){this.insertSuggestions([],0);return}var n="Suggestions for term ".concat(i);this.performanceLoggerSuggestionMethods.push(n);this.model.config.performanceLogger.enterMethod({name:n},{isSearch:true,comments:"suggestion term: ".concat(i)});this.model.eventLogger.logEvent({type:M.SUGGESTION_REQUEST,suggestionTerm:this.model.getProperty("/uiFilter/searchTerm"),dataSourceKey:this.model.getProperty("/uiFilter/dataSource").id});this.getSuggestionProviders().then(function(e){var i=[];var n=e.length;for(var s=0;s<e.length;++s){var o=e[s];i.push(o.getSuggestions(t))}if(r.isSuggestionPopupVisible()){if(r.clearSuggestionTimer){clearTimeout(r.clearSuggestionTimer)}r.clearSuggestionTimer=window.setTimeout(function(){r.clearSuggestionTimer=null;r.insertSuggestions([],n)},r.uiClearOldSuggestionsTimeOut)}else{r.insertSuggestions([],n)}r.timeMerger.abort();r.timeMerger=new H(i,r.uiUpdateInterval);r.timeMerger.process(function(e){n-=e.length;var i=[];for(var s=0;s<e.length;++s){var o=e[s];if(o&&o instanceof Error){r._oLogger.error("A suggestion provider reported an error while getting suggestions for term '"+t.searchTerm+"'\n"+o.stack||o+"");continue}i.push.apply(i,c(o))}if(n>0&&i.length===0){return}if(r.clearSuggestionTimer){clearTimeout(r.clearSuggestionTimer);r.clearSuggestionTimer=null}r.insertSuggestions(i,n);if(n===0){var a=p(r.performanceLoggerSuggestionMethods),u;try{for(a.s();!(u=a.n()).done;){var g=u.value;r.model.config.performanceLogger.leaveMethod({name:g})}}catch(e){a.e(e)}finally{a.f()}r.performanceLoggerSuggestionMethods=[]}})})["catch"](function(){var e=p(r.performanceLoggerSuggestionMethods),t;try{for(e.s();!(t=e.n()).done;){var i=t.value;r.model.config.performanceLogger.leaveMethod({name:i})}}catch(t){e.e(t)}finally{e.f()}r.performanceLoggerSuggestionMethods=[]})}},{key:"generateSuggestionHeader",value:function e(t){var r={};switch(t.uiSuggestionType){case x.Transaction:r.label=P.getText("label_transactions");break;case x.Recent:r.label=P.getText("label_recently_used");break;case x.App:r.label=P.getText("label_apps");break;case x.DataSource:r.label=P.getText("searchIn");break;case x.SearchTermData:case x.SearchTermHistory:r.label=P.getText("searchFor");break;case x.Object:r.label=t.dataSource.labelPlural;r.dataSource=t.dataSource;break}r.position=L.properties[t.uiSuggestionType].position;r.suggestionResultSetCounter=this.suggestionResultSetCounter;r.uiSuggestionType=x.Header;return r}},{key:"enableBusyIndicator",value:function e(t,r){if(r){t.push({position:L.properties[x.BusyIndicator].position,uiSuggestionType:x.BusyIndicator});return}for(var i=0;i<t.length;++i){var n=t[i];if(n.uiSuggestionType===x.BusyIndicator){t.splice(i,1);return}}}},{key:"checkDuplicate",value:function e(t,r){var i=function e(t){return t.uiSuggestionType===x.SearchTermHistory||t.uiSuggestionType===x.SearchTermData&&!t.dataSource};if(!i(r)){return{action:"append"}}for(var n=0;n<t.length;++n){var s=t[n];if(!i(s)){continue}if(r.searchTerm===s.searchTerm){if(r.grouped&&r.uiSuggestionType===x.SearchTermData&&s.uiSuggestionType===x.SearchTermHistory){return{action:"replace",index:n}}return{action:"skip"}}}return{action:"append"}}},{key:"insertSuggestions",value:function e(t,r){var i=this.model.getProperty("/suggestions").slice();i=this.insertIntoSuggestionList(t,i);if(!this.busyIndicator&&r>0){this.enableBusyIndicator(i,true);this.busyIndicator=true}if(this.busyIndicator&&r===0){this.enableBusyIndicator(i,false);this.busyIndicator=false}this.sortSuggestions(i);this.limitSuggestions(i);this.updateSuggestions(i)}},{key:"insertIntoSuggestionList",value:function e(t,r){var i=false;if(this.firstInsertion){this.firstInsertion=false;i=true}if(i){r=[];this.suggestionHeaders={};this.suggestionResultSetCounter=0;this.generatedPositions={maxPosition:L.properties[x.Object].position,position:{}}}this.suggestionResultSetCounter+=1;for(var n=0;n<t.length;++n){var s=t[n];if(s.uiSuggestionType===x.Object){var o=this.generatedPositions.position[s.dataSource.id];if(!o){this.generatedPositions.maxPosition+=1;o=this.generatedPositions.maxPosition;this.generatedPositions.position[s.dataSource.id]=o}s.position=o}s.suggestionResultSetCounter=this.suggestionResultSetCounter;s.resultSetPosition=n;var a=this.checkDuplicate(r,s);switch(a.action){case"append":r.push(s);break;case"skip":continue;case"replace":r.splice(a.index,1,s);break}if(this.isHeaderGenerationEnabled()&&!this.suggestionHeaders[s.position]){r.push(this.generateSuggestionHeader(s));this.suggestionHeaders[s.position]=true}}return r}},{key:"isHeaderGenerationEnabled",value:function e(){if(this.model.getDataSource()===this.model.appDataSource){return false}if(!this.model.config.boSuggestions&&this.model.getDataSource().type===this.sinaNext.DataSourceType.BusinessObject){return false}return true}},{key:"sortSuggestions",value:function e(t){t.sort(function(e,t){var r=e.position-t.position;if(r!==0){return r}if(e.uiSuggestionType===x.Header){return-1}if(t.uiSuggestionType===x.Header){return 1}if(e.grouped&&!t.grouped){return-1}if(!e.grouped&&t.grouped){return 1}r=e.suggestionResultSetCounter-t.suggestionResultSetCounter;if(r!==0){return r}r=e.resultSetPosition-t.resultSetPosition;return r})}},{key:"getSuggestionLimit",value:function e(t){var r=L.properties[t];if(typeof r==="undefined"){return Infinity}var i;if(this.model.getDataSource()===this.model.sinaNext.allDataSource){i=r.limitDsAll}else{i=r.limit}return i}},{key:"limitSuggestions",value:function e(t){var r={};for(var i=0;i<t.length;++i){var n=t[i];var s=n.uiSuggestionType;if(s===x.SearchTermHistory){s=x.SearchTermData}var o=this.getSuggestionLimit(s);var a=r[s];if(typeof a==="undefined"){a=0;r[s]=a}if(a>=o){t.splice(i,1);--i;continue}r[s]=a+1}}},{key:"updateSuggestions",value:function e(t){var r="searchFieldInShell-input";var i=sap.ui.getCore().byId(r);if(!i){i=this.model.getProperty("/inputHelp")}var n=i.getSuggestionRows();var s;for(var o=0;o<n.length;++o){var a=n[o];var u=a.getBindingContext().getObject();if(a.getSelected()){s=u.key}}this.model.setProperty("/suggestions",t);if(this.supportsRecentlyUsedSuggestions()){i.showItems()}if(!s){return}window.setTimeout(function(){var e=i.getSuggestionRows();for(var t=0;t<e.length;++t){var r=e[t];var n=r.getBindingContext().getObject();if(n.key===s){i._oSuggPopover._iPopupListSelectedIndex=t;r.setSelected(true);r.rerender()}}},100)}}]);return t}();return D})})();