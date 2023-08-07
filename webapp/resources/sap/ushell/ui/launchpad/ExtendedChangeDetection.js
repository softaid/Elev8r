// Copyright (c) 2009-2022 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/base/ManagedObject","sap/ushell/Config"],function(e,t){"use strict";var i=e.extend("sap.ushell.ui.launchpad.ExtendedChangeDetection",{metadata:{library:"sap.ushell",events:{itemDeleted:{},itemAdded:{},itemsReordered:{}}},constructor:function(i,n,r){e.call(this);this._oAggregation=n.getMetadata().getAggregation(i);this._oControl=n;this._sAggregationName=i;this._aSiblingAggregationNames=r;var a=t.last("/core/spaces/extendedChangeDetection/enabled");if(a){this._oControl[this._oAggregation._sUpdater]=this._updateAggregation.bind(this);this._oControl.bUseExtendedChangeDetection=true}}});i.oUpdateFromSiblingCache={};i.prototype._updateAggregation=function(){var e=this._oControl.getBindingInfo(this._sAggregationName);var t=e.binding;var i=this._isUpdateFromSibiling();var n=t.aLastContextData||[];var r=n.map(function(t){try{var i=JSON.parse(t);return i[e.key]}catch(e){return t}});var a=t.getContexts();var o=a.map(function(t){return t.getProperty(e.key)});var g=a.diff;var s;var d;var h=[];var l=[];var f={};var u=false;var _=false;if(g){for(d=0;d<g.length;d++){s=g[d];if(s.type==="insert"){h.push({item:o[s.index],index:s.index})}if(s.type==="delete"){l.push({item:r[s.index-h.length],index:s.index-h.length});r.splice(s.index-h.length,1)}}for(d=0;d<l.length;d++){f[l[d].item]=this._oControl.removeAggregation(this._sAggregationName,l[d].index,true)}var p;var m;for(d=0;d<h.length;d++){p=h[d];m=f[p.item];if(m&&!(g.length>=2&&g[0].index===g[1].index)){this._oControl.insertAggregation(this._sAggregationName,m,p.index,true);delete f[p.item]}else{this._createAndInsertItem(a[p.index],e,p.index);_=true}}u=!!Object.keys(f).length;for(var c in f){f[c].destroy();delete f[c]}}else if(!(i&&o.length===0&&r.length===0)){this._createAndInsertItems(a,e);_=true}else{return}this._updateBindingContexts(a);if(a.length===0){this._oControl.invalidate()}if(u){this.fireItemDeleted()}if(_){this.fireItemAdded()}if(!u&&!_&&g){this.fireItemsReordered()}if(g&&g.length&&!i){this._refreshSiblingBindings()}};i.prototype._isUpdateFromSibiling=function(){var e=this._oControl.getId()+":"+this._sAggregationName;if(i.oUpdateFromSiblingCache[e]){delete i.oUpdateFromSiblingCache[e];return true}return false};i.prototype._refreshSiblingBindings=function(){if(this._aSiblingAggregationNames){for(var e=0;e<this._aSiblingAggregationNames.length;++e){var t=this._aSiblingAggregationNames[e];var n=this._oControl.getId()+":"+t;var r=this._oControl.getBinding(t);i.oUpdateFromSiblingCache[n]=true;r.refresh(true)}}};i.prototype._createAndInsertItems=function(e,t){this._oAggregation.destroy(this._oControl);for(var i=0;i<e.length;i++){this._createAndInsertItem(e[i],t,i)}};i.prototype._createAndInsertItem=function(e,t,i){var n=t.factory(null,e);this._oControl.insertAggregation(this._sAggregationName,n,i,true)};i.prototype._updateBindingContexts=function(e){var t=this._oAggregation.get(this._oControl);for(var i=0;i<t.length;i++){t[i].setBindingContext(e[i])}};return i});