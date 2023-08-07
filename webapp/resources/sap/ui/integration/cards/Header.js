/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Core","sap/ui/model/json/JSONModel","sap/base/util/merge","sap/f/cards/Header","sap/f/cards/HeaderRenderer","sap/m/library","sap/ui/integration/util/BindingHelper","sap/ui/integration/util/BindingResolver","sap/ui/integration/util/LoadingProvider","sap/ui/integration/util/Utils"],function(t,i,e,a,o,r,n,s,d,c){"use strict";var l=r.AvatarColor;var h=a.extend("sap.ui.integration.cards.Header",{constructor:function(t,i,e){t=t||{};var o={title:t.title,titleMaxLines:t.titleMaxLines,subtitle:t.subTitle,subtitleMaxLines:t.subTitleMaxLines,dataTimestamp:t.dataTimestamp,visible:t.visible};if(t.status&&t.status.text&&!t.status.text.format){o.statusText=t.status.text}if(t.icon){var r=t.icon.initials||t.icon.text;var s=t.icon.backgroundColor||(r?l.Accent6:l.Transparent);o.iconSrc=t.icon.src;o.iconDisplayShape=t.icon.shape;o.iconInitials=r;o.iconAlt=t.icon.alt;o.iconBackgroundColor=s;o.iconVisible=t.icon.visible}if(o.iconSrc){o.iconSrc=n.formattedProperty(o.iconSrc,function(t){return e.formatSrc(t)})}o.toolbar=i;a.call(this,o);this._oConfiguration=t},metadata:{library:"sap.ui.integration",properties:{interactive:{type:"boolean",defaultValue:false}},aggregations:{_loadingProvider:{type:"sap.ui.core.Element",multiple:false,visibility:"hidden"}},associations:{card:{type:"sap.ui.integration.widgets.Card",multiple:false}}},renderer:o});h.prototype.init=function(){a.prototype.init.call(this);this._bReady=false;this.setAggregation("_loadingProvider",new d);this._aReadyPromises=[];this._awaitEvent("_dataReady");this._awaitEvent("_actionHeaderReady");Promise.all(this._aReadyPromises).then(function(){this._bReady=true;this.fireEvent("_ready")}.bind(this))};h.prototype.exit=function(){a.prototype.exit.call(this);this._oServiceManager=null;this._oDataProviderFactory=null;if(this._oDataProvider){this._oDataProvider.destroy();this._oDataProvider=null}if(this._oActions){this._oActions.destroy();this._oActions=null}};h.prototype._isInteractive=function(){return this.getInteractive()};h.prototype.isReady=function(){return this._bReady};h.prototype.isLoading=function(){var t=this.getAggregation("_loadingProvider"),i=this.getCardInstance(),e=i&&i.isA("sap.ui.integration.widgets.Card")?i.isLoading():false;return!t.isDataProviderJson()&&(t.getLoading()||e)};h.prototype._handleError=function(t){this.fireEvent("_error",{logMessage:t})};h.prototype._awaitEvent=function(t){this._aReadyPromises.push(new Promise(function(i){this.attachEventOnce(t,function(){i()})}.bind(this)))};h.prototype.setServiceManager=function(t){this._oServiceManager=t;return this};h.prototype.setDataProviderFactory=function(t){this._oDataProviderFactory=t;return this};h.prototype.getStaticConfiguration=function(){var t=e({},this._oConfiguration),i=c.getNestedPropertyValue(t,"/status/text/format"),a;if(i){a=c.getStatusTextBindingInfo(i)}if(a){t.status.text=a}return t};h.prototype._setDataConfiguration=function(t){var e=this.getCardInstance(),a="/",o;if(t&&t.path){a=s.resolveValue(t.path,this.getCardInstance())}this.bindObject(a);if(this._oDataProvider){this._oDataProvider.destroy()}this._oDataProvider=e.getDataProviderFactory().create(t,this._oServiceManager);this.getAggregation("_loadingProvider").setDataProvider(this._oDataProvider);if(t&&t.name){o=e.getModel(t.name)}else if(this._oDataProvider){o=new i;this.setModel(o)}if(this._oDataProvider){this._oDataProvider.attachDataRequested(function(){this.showLoadingPlaceholders()}.bind(this));this._oDataProvider.attachDataChanged(function(t){o.setData(t.getParameter("data"));this.onDataRequestComplete()}.bind(this));this._oDataProvider.attachError(function(t){this._handleError(t.getParameter("message"));this.onDataRequestComplete()}.bind(this));this._oDataProvider.triggerDataUpdate()}else{this.fireEvent("_dataReady")}};h.prototype.refreshData=function(){if(this._oDataProvider){this._oDataProvider.triggerDataUpdate()}};h.prototype.showLoadingPlaceholders=function(){this.getAggregation("_loadingProvider").setLoading(true)};h.prototype.hideLoadingPlaceholders=function(){this.getAggregation("_loadingProvider").setLoading(false)};h.prototype.onDataRequestComplete=function(){var t=this.getCardInstance();if(t){t._fireDataChange()}this.fireEvent("_dataReady");this.hideLoadingPlaceholders()};h.prototype.getCardInstance=function(){return t.byId(this.getCard())};return h});