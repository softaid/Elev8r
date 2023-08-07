/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/mdc/Element","sap/ui/mdc/condition/FilterOperatorUtil","sap/ui/mdc/condition/Operator","sap/ui/mdc/condition/Condition","sap/ui/mdc/enum/ConditionValidated","sap/base/Log","sap/base/util/merge","sap/ui/base/SyncPromise","sap/ui/model/FormatException","sap/ui/model/ParseException"],function(e,t,i,o,n,r,s,a,p,l){"use strict";var u;var f;var h=e.extend("sap.ui.mdc.field.FieldHelpBase",{metadata:{interfaces:["sap.ui.core.PopupInterface"],library:"sap.ui.mdc",properties:{conditions:{type:"object[]",defaultValue:[],byValue:true},delegate:{type:"object",group:"Data",defaultValue:{name:"sap/ui/mdc/field/FieldHelpBaseDelegate"}},filterValue:{type:"string",defaultValue:""},validateInput:{type:"boolean",defaultValue:true}},aggregations:{_popover:{type:"sap.m.Popover",multiple:false,visibility:"hidden"}},events:{select:{parameters:{conditions:{type:"object[]"},add:{type:"boolean"},close:{type:"boolean"}}},navigate:{parameters:{value:{type:"any"},key:{type:"any"},condition:{type:"object"},itemId:{type:"string"},leaveFocus:{type:"boolean"}}},dataUpdate:{},disconnect:{},open:{suggestion:{type:"boolean"}},afterClose:{},switchToValueHelp:{}},defaultProperty:"filterValue"}});h._init=function(){u=undefined;f=undefined};h.prototype.init=function(){e.prototype.init.apply(this,arguments);this._oTextOrKeyPromises={}};h.prototype.invalidate=function(e){if(e){var t=this.getAggregation("_popover");if(t&&e===t){if(e.bOutput&&!this._bIsBeingDestroyed){var i=this.getParent();if(i){i.invalidate(this)}}return}}};h.prototype.setFilterValue=function(e){this.setProperty("filterValue",e,true);return this};h.prototype.connect=function(e){if(this._oField&&this._oField!==e){var t=this.getAggregation("_popover");if(t){t._oPreviousFocus=null}this.close();this.setFilterValue("");this.setConditions([]);this.fireDisconnect()}this._oField=e;O.call(this,e);return this};h.prototype._getField=function(){if(this._oField){return this._oField}else{return this.getParent()}};h.prototype._getOperator=function(){if(!this._oOperator){this._oOperator=t.getEQOperator()}return this._oOperator};h.prototype._createCondition=function(e,t,r,s){var a=this._getOperator();var p=[e];if(a.valueTypes.length>1&&a.valueTypes[1]!==i.ValueType.Static&&t!==null&&t!==undefined){p.push(t)}return o.createCondition(a.name,p,r,s,n.Validated)};h.prototype._getControlForSuggestion=function(){var e=this._getField();if(e.getControlForSuggestion){return e.getControlForSuggestion()}else{return e}};h.prototype.getFieldPath=function(){var e="";if(this._oField&&this._oField.getFieldPath){e=this._oField.getFieldPath()}return e||"Help"};h.prototype.getDomRef=function(){var t=this.getAggregation("_popover");if(t){return t.getDomRef()}else{return e.prototype.getDomRef.apply(this,arguments)}};h.prototype.getContentId=function(){var e=this.getAggregation("_popover");if(e){var t=e._getAllContent();if(t.length===1){return t[0].getId()}}};h.prototype.getAriaHasPopup=function(){return"listbox"};h.prototype.getRoleDescription=function(e){return null};h.prototype.getValueHelpEnabled=function(){return true};h.prototype.open=function(e){var t=this._getField();if(t){var i=this._getPopover();if(i&&!this._bOpenAfterPromise){delete this._bOpen;delete this._bSuggestion;if(!i.isOpen()){if(!this.isFocusInHelp()){i.setInitialFocus(this._getControlForSuggestion())}i.setFieldGroupIds(t.getFieldGroupIds());var o=function(){if(this._bOpenAfterPromise){delete this._bOpenAfterPromise;this.open(e)}}.bind(this);var n=this._fireOpen(!!e,o);if(n){if(i._getAllContent().length>0){i.openBy(this._getControlForSuggestion())}else{this._bOpenIfContent=true}}else{this._bOpenAfterPromise=true}}}else{this._bOpen=true;this._bSuggestion=e}}else{r.warning("FieldHelp not assigned to field -> can not be opened.",this)}};h.prototype.close=function(){var e=this.getAggregation("_popover");if(e&&e.isOpen()){var t=e.oPopup.getOpenState();if(t!=="CLOSED"&&t!=="CLOSING"){this._bClosing=true;e.close()}}else{delete this._bOpen;delete this._bSuggestion;delete this._bOpenIfContent;delete this._bOpenAfterPromise}this._bReopen=false};h.prototype.toggleOpen=function(e){var t=this.getAggregation("_popover");if(t){if(t.isOpen()){var i=t.oPopup.getOpenState();if(i!=="CLOSED"&&i!=="CLOSING"){this.close()}else{this._bReopen=true}}else{this.open(e)}}else if(this._bOpen||this._bOpenIfContent||this._bOpenAfterPromise){delete this._bOpen;delete this._bSuggestion;delete this._bOpenIfContent;delete this._bOpenAfterPromise}else{this.open(e)}};h.prototype.isOpen=function(e){if(e&&this._bClosing){return false}var t=false;var i=this.getAggregation("_popover");if(i){t=i.isOpen()}return t};h.prototype.skipOpening=function(){if(this._bOpenIfContent){delete this._bOpenIfContent}if(this._bOpenAfterPromise){delete this._bOpenAfterPromise}};h.prototype.initBeforeOpen=function(e){if(this._bOpenAfterPromise){return}var t=function(){this._bBeforeOpenPending=false;if(this._bOpenAfterPromise){delete this._bOpenAfterPromise;this.open(e)}}.bind(this);var i=this._callContentRequest(e,t);if(!i){this._bBeforeOpenPending=true}};h.prototype._createPopover=function(){var e;if((!u||!f)&&!this._bPopoverRequested){u=sap.ui.require("sap/m/Popover");f=sap.ui.require("sap/m/library");if(!u||!f){sap.ui.require(["sap/m/Popover","sap/m/library"],d.bind(this));this._bPopoverRequested=true}}if(u&&f&&!this._bPopoverRequested){e=new u(this.getId()+"-pop",{contentHeight:"auto",placement:f.PlacementType.VerticalPreferredBottom,showHeader:false,showArrow:false,afterOpen:this._handleAfterOpen.bind(this),afterClose:this._handleAfterClose.bind(this)}).addStyleClass("sapMComboBoxBasePicker").addStyleClass("sapMComboBoxBasePicker-CTX");e.isPopupAdaptationAllowed=function(){return false};this.setAggregation("_popover",e,true);if(this._oContent){this._setContent(this._oContent)}}return e};function d(e,t){u=e;f=t;this._bPopoverRequested=false;if(!this._bIsBeingDestroyed){this._createPopover();if(this._bOpen){this.open(this._bSuggestion)}}}h.prototype._getPopover=function(){var e=this.getAggregation("_popover");if(!e){e=this._createPopover()}return e};h.prototype._handleAfterOpen=function(e){};h.prototype._handleAfterClose=function(e){this._bClosing=false;if(this._bReopen){this._bReopen=false;this.open()}this.fireAfterClose()};h.prototype.openByTyping=function(){return false};h.prototype.openByClick=function(){return false};h.prototype.isFocusInHelp=function(){return!this.openByTyping()};h.prototype.removeFocus=function(){};h.prototype.navigate=function(e){};h.prototype.getTextForKey=function(e,t,i,o,n,r){return c.call(this,e,o,t,i,false,n,r,true)};function c(e,t,i,o,n,r,s,a){return _.call(this,true,e,t,i,o,n,r,s,undefined,false,a)}h.prototype.getKeyForText=function(e,t,i,o){return g.call(this,e,t,false,i,o,true)};function g(e,t,i,o,n,r){return _.call(this,false,e,t,undefined,undefined,i,o,n,undefined,false,r)}h.prototype._getTextOrKey=function(e,t,i,o,n,r,s,a,p,l,u){if(t){return""}else{return undefined}};h.prototype._isTextOrKeyRequestSupported=function(){return false};h.prototype.isValidationSupported=function(){return this.isUsableForValidation()};h.prototype.getItemForValue=function(e,t,i,o,n,r,s,a,p){if(typeof e!=="object"||!e.hasOwnProperty("value")){e={value:e,parsedValue:t,inParameters:i,outParameters:o,bindingContext:n,checkKey:r,checkDescription:s,conditionModel:a,conditionModelName:p}}if(e&&typeof e==="object"&&e.hasOwnProperty("value")){return y.call(this,e.value,e.parsedValue,e.inParameters,e.outParameters,e.bindingContext,e.checkKey,e.checkDescription,e.conditionModel,e.conditionModelName)}else{return y.call(this,e,t,i,o,n,r,s,a,p)}};function y(e,t,i,o,n,r,s,p,l){return a.resolve().then(function(){if(r&&s){return _.call(this,true,e,n,i,o,false,p,l,t,true,false)}else if(r){return c.call(this,t,n,i,o,false,p,l,false)}else if(s){return g.call(this,e,n,false,p,l,false)}}.bind(this)).then(function(i){if(i){if(typeof i==="object"){return i}else if(r){return{key:t,description:i}}else{return{key:i,description:e}}}else{return undefined}}).catch(function(e){throw e}).unwrap()}h.prototype.isUsableForValidation=function(){return true};h.prototype.onFieldChange=function(){};h.prototype._setContent=function(e){var t=this.getAggregation("_popover");if(t){t.removeAllContent();t.addContent(e);this._oContent=undefined;if(this._bOpenIfContent){var i=this._getField();if(i){t.openBy(this._getControlForSuggestion())}this._bOpenIfContent=false}}else{this._oContent=e}return this};h.prototype.getIcon=function(){return"sap-icon://slim-arrow-down"};h.prototype.getUIArea=function(){var t=e.prototype.getUIArea.apply(this,arguments);if(!t){if(this._oField){t=this._oField.getUIArea()}}return t};h.prototype.getScrollDelegate=function(){var e=this.getAggregation("_popover");if(e){return e.getScrollDelegate()}else{return undefined}};h.prototype._fireOpen=function(e,t){if(this._bBeforeOpenPending){return false}var i=this._callContentRequest(e,t);if(i){this.fireOpen({suggestion:e})}return i};h.prototype._callContentRequest=function(e,t){if(!this._bNoContentRequest){if(this._oContentRequestPromise){this._oContentRequestPromise.then(function(){this._bNoContentRequest=true;t();this._bNoContentRequest=false}.bind(this));return false}if(!this.bDelegateInitialized&&!this.bDelegateLoading){this.initControlDelegate()}if(this.bDelegateInitialized){var i=this._getContenRequestProperties(e);var o=this.getControlDelegate().contentRequest(this.getPayload(),this,e,i);if(o instanceof Promise){this._oContentRequestPromise=o;o.then(function(){this._oContentRequestPromise=undefined;this._bNoContentRequest=true;t();this._bNoContentRequest=false}.bind(this));return false}}else{this.awaitControlDelegate().then(function(){if(this._callContentRequest(e,t)){t()}}.bind(this));return false}}return true};h.prototype._getContenRequestProperties=function(e){return null};function _(e,t,i,o,n,r,a,p,l,u,f){var h=JSON.stringify(o);var d=i&&i.getPath();if(this._oTextOrKeyPromises[e]&&this._oTextOrKeyPromises[e][t]&&this._oTextOrKeyPromises[e][t][h]&&this._oTextOrKeyPromises[e][t][h][d]){return this._oTextOrKeyPromises[e][t][h][d].promise}var c=function(){v.call(this)}.bind(this);var g=this._callContentRequest(true,c);if(!g){if(!this._oTextOrKeyPromises[e]){this._oTextOrKeyPromises[e]={}}if(!this._oTextOrKeyPromises[e][t]){this._oTextOrKeyPromises[e][t]={}}if(!this._oTextOrKeyPromises[e][t][h]){this._oTextOrKeyPromises[e][t][h]={}}if(!this._oTextOrKeyPromises[e][t][h][d]){this._oTextOrKeyPromises[e][t][h][d]={}}this._oTextOrKeyPromises[e][t][h][d].promise=new Promise(function(c,g){this._oTextOrKeyPromises[e][t][h][d].resolve=c;this._oTextOrKeyPromises[e][t][h][d].reject=g;this._oTextOrKeyPromises[e][t][h][d].key=e;this._oTextOrKeyPromises[e][t][h][d].value=t;this._oTextOrKeyPromises[e][t][h][d].inParameters=o?s({},o):undefined;this._oTextOrKeyPromises[e][t][h][d].outParameters=n?s({},n):undefined;this._oTextOrKeyPromises[e][t][h][d].bindingContext=i;this._oTextOrKeyPromises[e][t][h][d].noRequest=r;this._oTextOrKeyPromises[e][t][h][d].conditionModel=a;this._oTextOrKeyPromises[e][t][h][d].conditionModelName=p;this._oTextOrKeyPromises[e][t][h][d].parsedValue=l;this._oTextOrKeyPromises[e][t][h][d].keyAndDescription=u;this._oTextOrKeyPromises[e][t][h][d].caseSensitive=f}.bind(this));return this._oTextOrKeyPromises[e][t][h][d].promise}return this._getTextOrKey(t,e,i,o,n,r,a,p,l,u,f)}function v(){for(var e in this._oTextOrKeyPromises){for(var t in this._oTextOrKeyPromises[e]){for(var i in this._oTextOrKeyPromises[e][t]){for(var o in this._oTextOrKeyPromises[e][t][i]){m.call(this,this._oTextOrKeyPromises[e][t][i][o]);delete this._oTextOrKeyPromises[e][t][i][o]}}}}}function m(e){var t=e.value;var i=e.key;var o=e.inParameters;var n=e.outParameters;var r=e.bindingContext;var s=e.noRequest;var p=e.resolve;var l=e.reject;var u=e.conditionModel;var f=e.conditionModelName;var h=e.parsedValue;var d=e.keyAndDescription;var c=e.caseSensitive;a.resolve().then(function(){return this._getTextOrKey(t,i,r,o,n,s,u,f,h,d,c)}.bind(this)).then(function(e){p(e)}).catch(function(e){l(e)}).unwrap()}function O(e){this._oOperator=undefined;if(e&&e._getOperators){this._oOperator=t.getEQOperator(e._getOperators())}}h.prototype.isTypeaheadSupported=function(){return this.openByTyping()};h.prototype.shouldOpenOnClick=function(){return this.openByClick()};h.prototype.onControlChange=function(){return this.onFieldChange()};h.prototype.getAriaAttributes=function(e){return{contentId:this.getContentId(),ariaHasPopup:this.getAriaHasPopup(),role:"combobox",roleDescription:this.getRoleDescription(e),valueHelpEnabled:this.getValueHelpEnabled()}};h.prototype.attachEvent=function(t,i,o,n){if(t==="navigated"){return e.prototype.attachEvent.apply(this,["navigate",i,o,n])}else{return e.prototype.attachEvent.apply(this,arguments)}};h.prototype.detachEvent=function(t,i,o){if(t==="navigated"){return e.prototype.detachEvent.apply(this,["navigate",i,o])}else{return e.prototype.detachEvent.apply(this,arguments)}};h.prototype.isNavigationEnabled=function(){return true};return h});