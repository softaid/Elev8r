/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/library","sap/base/Log","sap/ui/base/ManagedObject","sap/ui/integration/cards/actions/CustomAction","sap/ui/integration/cards/actions/DateChangeAction","sap/ui/integration/cards/actions/MonthChangeAction","sap/ui/integration/cards/actions/SubmitAction","sap/ui/integration/cards/actions/NavigationAction","sap/ui/integration/util/BindingHelper","sap/ui/integration/util/BindingResolver","sap/base/strings/capitalize","sap/base/util/deepClone","sap/ui/integration/cards/actions/ShowCardAction","sap/ui/integration/cards/actions/HideCardAction"],function(e,t,n,a,i,r,o,s,c,l,d,u,f,p){"use strict";function g(e){if(e&&typeof e==="object"){return e.name}return e}var h=e.CardActionArea,v=e.CardActionType;var b=n.extend("sap.ui.integration.cards.actions.CardActions",{metadata:{library:"sap.ui.integration",properties:{card:{type:"object"},bindingPathResolver:{type:"function"}}}});b.prototype.attach=function(e){var t=e.control,n=e.area;e.actionControl=e.actionControl||e.control;e.enabledPropertyValue=e.enabledPropertyValue!==undefined?e.enabledPropertyValue:true;e.disabledPropertyValue=e.disabledPropertyValue||false;e.eventName=e.eventName||"press";if(!e.actions){this._fireActionReady(t,n);return}var a=e.actions[0];if(a&&a.type){e.action=a;this._attachAction(e)}else{this._fireActionReady(t,n)}};b.prototype._attachAction=function(e){var t=e.action,n=e.area,a=e.control,i=e.enabledPropertyName,r=true,o=this._isSingleAction(n),s=true;if(i){r=false;if(t.service&&!o){this._setControlEnabledStateUsingService(e)}else{this._setControlEnabledState(e)}}if(t.service&&o){this._getSingleActionEnabledState(t,a).then(function(t){if(t){this._attachEventListener(e)}this._fireActionReady(a,n)}.bind(this));return}if(r){s=t.enabled!==false&&t.enabled!=="false"}if(s){this._attachEventListener(e)}this._fireActionReady(a,n)};b.prototype._setControlEnabledStateUsingService=function(e){var t=e.action,a=e.control,i=e.actionControl,r=e.enabledPropertyName,o=e.enabledPropertyValue,s=e.disabledPropertyValue,c=n.bindingParser("{path:''}");c.formatter=function(e){var n=this.getBindingContext(),i,r;if(n){i=n.getPath()}r=l.resolveValue(t.parameters,a,i);if(e.__resolved){if(!e.__enabled||e.__enabled==="false"){return s}return o}if(!e.__promise){e.__promise=true;a._oServiceManager.getService(g(t.service)).then(function(t){if(t){t.enabled({parameters:r}).then(function(t){e.__resolved=true;e.__enabled=t;a.getModel().checkUpdate(true)}).catch(function(){e.__resolved=true;e.__enabled=false})}else{e.__resolved=true;e.__enabled=false}})}return s};i.bindProperty(r,c)};b.prototype._setControlEnabledState=function(e){var t=e.action,n=e.actionControl,a=e.enabledPropertyName,i=e.enabledPropertyValue,r=e.disabledPropertyValue,o,s;if(typeof t.enabled==="object"){o=c.formattedProperty(t.enabled,function(e){if(!e||e==="false"){return r}return i})}if(o){n.bindProperty(a,o)}else{s=t.enabled===false||t.enabled==="false"?r:i;n.setProperty(a,s)}};b.prototype._getSingleActionEnabledState=function(e,t){var n=t.getBindingContext(),a,i;if(n){i=n.getPath()}a=l.resolveValue(e.parameters,t,i);return new Promise(function(n){t._oServiceManager.getService(g(e.service)).then(function(e){if(e){e.enabled({parameters:a}).then(function(e){n(e)}).catch(function(){n(false)})}else{n(false)}}).catch(function(){n(false)})})};b.prototype._fireActionReady=function(e,t){var n=t===h.Header;var a=n?"_actionHeaderReady":"_actionContentReady";e.fireEvent(a)};b.prototype._resolveBindingPath=function(e){var t=e.getSource().getBindingContext(),n;if(this.getBindingPathResolver()){n=this.getBindingPathResolver()(e)}else if(t){n=t.getPath()}return n};b.prototype._handleServiceAction=function(e,n,a){var i=e.getSource();var r=this._resolveBindingPath(e);a._oServiceManager.getService(g(n.service)).then(function(e){if(e){e.navigate({parameters:l.resolveValue(n.parameters,i,r)})}}).catch(function(e){t.error("Navigation service unavailable",e)}).finally(function(){this._processAction(i,n,r)}.bind(this))};b.prototype._attachEventListener=function(e){var t=e.action;e.actionControl["attach"+d(e.eventName)](function(n){var a=n.getSource();if(t.service){this._handleServiceAction(n,t,e.control)}else{this._processAction(a,t,this._resolveBindingPath(n))}}.bind(this))};b.prototype._processAction=function(e,t,n){var a=this._getHostInstance(),i=this.getCard();b.fireAction({card:i,host:a,action:t,parameters:l.resolveValue(t.parameters,e,n),source:e})};b.prototype._getHostInstance=function(){var e=this.getCard();if(e){return e.getHostInstance()}return null};b.prototype.fireAction=function(e,t,n){b.fireAction({card:this.getCard(),host:this._getHostInstance(),action:{type:t},parameters:n,source:e})};b.fireAction=function(e){var t=e.host,n=e.card,a=n.getAggregation("_extension"),i=e.action.type,r=u(e.parameters,100)||{},o={type:i,card:n,actionSource:e.source},s,c;if(i===v.Submit){r.data=n.getModel("form").getData()}o.parameters=r;s=Object.assign({},o,{manifestParameters:r});c=n.fireAction(s);if(!c){return false}if(t){c=t.fireAction(o)}if(!c){return false}if(a){c=a.fireAction(o)}if(c){var l=b._createHandler(e);if(l){l.execute();l.destroy()}}return c};b.prototype._isSingleAction=function(e){return[h.Header,h.Content,h.ContentItemDetail,h.ActionsStrip].indexOf(e)>-1};b._createHandler=function(e){var n=null;switch(e.action.type){case v.Custom:n=a;break;case v.DateChange:n=i;break;case v.HideCard:n=p;break;case v.MonthChange:n=r;break;case v.Navigation:n=s;break;case v.ShowCard:n=f;break;case v.Submit:n=o;break;default:t.error("Unknown action type '"+e.action.type+"'. Expected one of "+Object.values(v).join(", "),null,"sap.ui.integration.widgets.Card")}if(n){return new n({config:e.action,parameters:e.parameters,actionHandler:e.card.getManifestEntry("/sap.card/configuration/actionHandlers/"+e.action.type.toLowerCase()),card:e.card,source:e.source})}return null};return b});