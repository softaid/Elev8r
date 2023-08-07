/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/core/Core","sap/ui/core/InvisibleText","sap/base/Log","sap/ui/core/Icon","sap/m/HBox","sap/m/Text","sap/ui/integration/model/ObservableModel","sap/ui/integration/util/LoadingProvider"],function(t,e,a,i,r,o,n,s,d){"use strict";var l=t.extend("sap.ui.integration.cards.filters.BaseFilter",{metadata:{abstract:true,library:"sap.ui.integration",properties:{key:{type:"string",defaultValue:""},config:{type:"object",defaultValue:"null"},value:{type:"object",defaultValue:null}},aggregations:{_loadingProvider:{type:"sap.ui.core.Element",multiple:false,visibility:"hidden"},_label:{type:"sap.ui.core.InvisibleText",multiple:false,visibility:"hidden"}},associations:{card:{type:"sap.ui.integration.widgets.Card",multiple:false}}},renderer:{apiVersion:2,render:function(t,e){var a=e.isLoading();t.openStart("div",e).class("sapFCardFilter");if(a){t.class("sapFCardFilterLoading")}t.openEnd();if(e._hasError()){t.renderControl(e._getErrorMessage())}else{t.renderControl(e.getField())}t.close("div")}}});l.prototype.init=function(){this.setAggregation("_loadingProvider",new d);this.attachEventOnce("_dataReady",function(){this.fireEvent("_ready")})};l.prototype.exit=function(){if(this._oDataProvider){this._oDataProvider.destroy();this._oDataProvider=null}};l.prototype.isLoading=function(){var t=this.getAggregation("_loadingProvider");return!t.isDataProviderJson()&&t.getLoading()};l.prototype.getField=function(){return null};l.prototype.createLabel=function(t){if(t.label){this.setAggregation("_label",new a({text:t.label}).toStatic());return this.getAggregation("_label")}return null};l.prototype.showLoadingPlaceholders=function(){this.getAggregation("_loadingProvider").setLoading(true)};l.prototype.hideLoadingPlaceholders=function(){this.getAggregation("_loadingProvider").setLoading(false)};l.prototype.onDataChanged=function(){};l.prototype.setValueFromOutside=function(t){};l.prototype.getValueForModel=function(){};l.prototype.refreshData=function(){if(this._oDataProvider){this._oDataProvider.triggerDataUpdate()}};l.prototype.getCardInstance=function(){return e.byId(this.getCard())};l.prototype._hasError=function(){return!!this._bError};l.prototype._getErrorMessage=function(){var t=e.getLibraryResourceBundle("sap.ui.integration").getText("CARD_FILTER_DATA_LOAD_ERROR");return new o({justifyContent:"Center",alignItems:"Center",items:[new r({src:"sap-icon://message-error",size:"1rem"}).addStyleClass("sapUiTinyMargin"),new n({text:t})]})};l.prototype._handleError=function(t){i.error(t);this._bError=true;this.invalidate()};l.prototype._onDataRequestComplete=function(){this.fireEvent("_dataReady");this.hideLoadingPlaceholders()};l.prototype._setDataConfiguration=function(t){var e=this.getCardInstance(),a;if(!t){this.fireEvent("_dataReady");return}if(this._oDataProvider){this._oDataProvider.destroy()}this._oDataProvider=e.getDataProviderFactory().create(t,null,true);this.getAggregation("_loadingProvider").setDataProvider(this._oDataProvider);if(t.name){a=e.getModel(t.name)}else if(this._oDataProvider){a=new s;this.setModel(a)}a.attachEvent("change",function(){this.onDataChanged()}.bind(this));this._oDataProvider.attachDataRequested(function(){this.showLoadingPlaceholders()}.bind(this));this._oDataProvider.attachDataChanged(function(t){a.setData(t.getParameter("data"));this._onDataRequestComplete()}.bind(this));this._oDataProvider.attachError(function(t){this._handleError(t.getParameter("message"));this._onDataRequestComplete()}.bind(this));this._oDataProvider.triggerDataUpdate()};l.prototype._syncValue=function(){var t=this.getValueForModel(),e=this.getCardInstance(),a={},i;this.setValue(t);if(e){i="/sap.card/configuration/filters/"+this.getKey()+"/value";a[i]=t.value;e._fireConfigurationChange(a);e.resetPaginator()}};return l});