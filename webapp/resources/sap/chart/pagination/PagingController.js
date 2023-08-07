/*!
 * SAPUI5
 * (c) Copyright 2009-2022 SAP SE. All rights reserved.
 */
sap.ui.define(["sap/ui/model/Sorter","sap/ui/thirdparty/jquery"],function(e,t){"use strict";var i=500;function a(e,t,i){var a=e.getContexts(t,i),r;if(a.length===0||a.dataRequested){r=true}else{r=a.some(function(e){return e===undefined})}return!r}var r=function(e){this._mMeasureRange={};this._iRenderedPageNo=-1;this._bUnderPaging=false;this._iMaxPageNo=-1;this._iRemainingRecords=-1;this._iOffset=null;this._oChart=e;this._bInitialized=false;this._aPagingSorters=null;this._bMinMaxQueried=false;this._oColorTracker=e._oColorTracker;var t=this._oChart._getDataset();if(t){t.setRange(0,i*2)}var a=this._oChart._getVizFrame();a.attachEvent("_scroll",r.prototype._scrollHandler.bind(this))};r.prototype.bindingChanged=function(){if(!this._bInitialized||!this._bMinMaxQueried){this.init(true)}else if(this.isUnderPaging()){this.paging(this._scrollRatio)}};r.prototype.reset=function(){this._bInitialized=false;this._iRenderedPageNo=0;this._mMeasureRange={};this._bMinMaxQueried=false;this._oColorTracker.clear();var t=this._oChart.getBinding("data");var a=this._oChart._getDataset();if(!a||!t){return}var r=this._oChart._prepareFeeds();r._order=r._order.filter(function(e){return e!=="MND"&&this._oChart.getDimensions().map(function(e){return e.getName()}).indexOf(e)>-1}.bind(this));this._aPagingSorters=null;this._oChart._getVizFrame()._runtimeScales(this._oColorTracker.get(),true);this._oChart._getVizFrame()._readyToRender(false);var n;if(this._oChart.getBindingInfo("data").length){n=Math.min(i*2,this._oChart.getBindingInfo("data").length)}else{n=i*2}a.setRange(0,n);var s=sap.ui.require("sap/ui/model/odata/v4/ODataModel");if(r._order.length){var o=this._oChart._aFeeds._order.map(function(t){return new e(t)});t.sort(o);this._aPagingSorters=o}else if(s&&t.getModel()instanceof s){t.sort([])}a.setPagingOption({bEnabled:false})};r.prototype.getPagingSorters=function(){return this._aPagingSorters};r.prototype.isUnderPaging=function(){return!!this._bUnderPaging};r.prototype.init=function(e){this._bInitialized=true;this._bUnderPaging=false;var t=this._oChart._getVizFrame();var r=t.getDataset();var n=r.getBinding("data");if(!n){return}var s=n.isA("sap.ui.model.analytics.AnalyticalBinding")?n.getTotalSize():n.getLength();var o;if(s>=0){if(this._oChart.getBindingInfo("data").length){this._iTotalSize=Math.min(this._oChart.getBindingInfo("data").length,s)}else{this._iTotalSize=s}if(this._iTotalSize>i*2){this._bUnderPaging=true;this._iMaxPageNo=Math.floor(this._iTotalSize/i)-1;this._iRemainingRecords=this._iTotalSize%i;this._iOffset=null;this._iRenderedPageNo=0;var h=i/this._iTotalSize;o={bEnabled:true,sMode:"reset",thumbRatio:h};r.setRange(0,i);if(e){this._bMinMaxQueried=true;var g=this._oChart._oMeasureRangePromise||this._queryMinMax(this._oChart,n);g.then(function(e){this._mMeasureRange=e;this._oChart._invalidateBy({source:this._oChart,keys:{vizFrame:true}});this._oChart.setBusy(false);t._readyToRender(a(n,0,i))}.bind(this))}else{t._readyToRender(a(n,0,i))}this._bUnderPaging=true}else{this._mMeasureRange={};o={bEnabled:false};this._bUnderPaging=false;r.setRange(0,this._iTotalSize);t._readyToRender(a(n,0,this._iTotalSize))}r.setPagingOption(o)}};r.prototype.paging=function(e){var t=Math.floor(this._iTotalSize*e/i);var r=this._oChart._getVizFrame();t=Math.min(t,this._iMaxPageNo);this._iOffset=null;var n=Math.max((t-1)*i,0);var s,o;if(t===0){s=i;o=i}else if(t===this._iMaxPageNo){s=i*2+this._iRemainingRecords;o=i+this._iRemainingRecords}else{s=i*2;o=i}this._iOffset=(this._iTotalSize*e-t*i)/o;if(this._iRenderedPageNo===t){var h={plot:{transform:{translate:{translateByPage:{context:this._middleCtx,offset:this._iOffset}}}}};r._states(h)}else{if(this._pagingTimer){clearTimeout(this._pagingTimer)}var g=r.getDataset();var _=g.getBinding("data");this._pagingTimer=setTimeout(function(){g.setRange(n,s);g.setPagingOption({bEnabled:true,sMode:"update",thumbRatio:null});var e=a(_,n,s);if(e){this._iRenderedPageNo=t;g.invalidate();r._readyToRender(true);r.invalidate();this._oColorTracker.add(r._runtimeScales());r._runtimeScales(this._oColorTracker.get(),true)}else{r._readyToRender(false)}}.bind(this),50);this._sLoadingTimer=this._sLoadingTimer||setTimeout(function(){this._oChart._showLoading(true)}.bind(this),200)}};r.prototype.vizFrameRenderCompleted=function(){if(this._sLoadingTimer){clearTimeout(this._sLoadingTimer);this._sLoadingTimer=null}this._oChart._showLoading(false);if(!this._bUnderPaging){return}var e=this._oChart._getVizFrame();var t=e.getDataset();var a=t.getBinding("data");var r=this._iRenderedPageNo;if(r!==0){var n=r*i-1;this._middleCtx=a.getContexts(n,1)[0].getObject()}else{this._middleCtx=null}if(this._middleCtx||this._iOffset){var s={plot:{transform:{translate:{translateByPage:{context:this._middleCtx,offset:this._iOffset}}}}};e._states(s)}};r.prototype._scrollHandler=function(e){if(this._oChart._isEnablePaging()){this._scrollRatio=e.getParameters().position;this.paging(this._scrollRatio)}};r.prototype._queryMinMax=function(e,i){var a=e._getRequiredDimensions().map(function(e){return e.getName()}),r=e._getRequiredMeasures().map(function(e){return e.getName()});var n=r.reduce(function(e,t){e[t]={min:{},max:{}};return e},{});return new Promise(function(e,t){function s(){var t=r.every(function(e){return n[e].min.requested&&n[e].max.requested});if(t){e(n)}}function o(e,t,i){n[e][t].requested=true;n[e][t].value=parseFloat(i&&i.results[0][e]);s()}function h(e,t,i){n[e][t].requested=true;n[e][t].error=i;s()}var g=r.reduce(function(e,t){return e.concat({urlParameters:{$select:a.concat(t).join(","),$top:1,$orderby:t+" asc"},success:o.bind(null,t,"min"),error:h.bind(null,t,"min")},{urlParameters:{$select:a.concat(t).join(","),$top:1,$orderby:t+" desc"},success:o.bind(null,t,"max"),error:h.bind(null,t,"max")})},[]);var _=i.getPath(),d=i.getModel();g.forEach(function(e){d.read(_,e)})}).then(function(e){var i={};t.each(e,function(e,t){i[e]={min:t.min.value,max:t.max.value}});return i})};r.prototype.getMeasureRange=function(){return this._mMeasureRange};return r});