/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/mdc/valuehelp/base/ListContent","sap/ui/mdc/util/loadModules","sap/ui/mdc/enum/ConditionValidated","sap/ui/mdc/enum/SelectType","sap/ui/model/ParseException"],function(e,t,i,a,s){"use strict";var r=e.extend("sap.ui.mdc.valuehelp.content.FixedList",{metadata:{library:"sap.ui.mdc",interfaces:["sap.ui.mdc.valuehelp.ITypeaheadContent","sap.ui.mdc.valuehelp.IDialogContent"],properties:{groupable:{type:"boolean",group:"Appearance",defaultValue:false},filterList:{type:"boolean",group:"Appearance",defaultValue:true}},aggregations:{items:{type:"sap.ui.mdc.field.ListFieldHelpItem",multiple:true,singularName:"item"}},defaultAggregation:"items",events:{}}});r.prototype.init=function(){e.prototype.init.apply(this,arguments);this._oResourceBundle=sap.ui.getCore().getLibraryResourceBundle("sap.ui.mdc");this._iNavigateIndex=-1};r.prototype.exit=function(){if(this._oManagedObjectModel){this._oManagedObjectModel.destroy();delete this._oManagedObjectModel}e.prototype.exit.apply(this,arguments)};r.prototype.getContent=function(){return this._retrievePromise("content",function(){return t(["sap/m/List","sap/m/DisplayListItem","sap/m/library","sap/ui/model/Filter","sap/ui/model/Sorter","sap/ui/model/base/ManagedObjectModel","sap/base/strings/whitespaceReplacer"]).then(function(e){var t=e[0];var i=e[1];var a=e[2];var s=e[3];var r=e[4];var n=e[5];var l=e[6];this._oManagedObjectModel=new n(this);var p=new i(this.getId()+"-item",{type:a.ListType.Active,label:{path:"$help>text",formatter:l},value:{path:"$help>additionalText",formatter:l},valueTextDirection:"{$help>textDirection}"}).addStyleClass("sapMComboBoxNonInteractiveItem");var d=new s({path:"text",test:u.bind(this),caseSensitive:true});var g;if(this.getGroupable()){g=new r("groupKey",false,c.bind(this))}var f=new t(this.getId()+"-List",{width:"100%",showNoData:false,mode:a.ListMode.SingleSelectMaster,rememberSelections:false,items:{path:"$help>/items",template:p,filters:d,sorter:g,templateShareable:false},itemPress:o.bind(this)}).addStyleClass("sapMComboBoxBaseList").addStyleClass("sapMComboBoxList");f.applyAriaRole("listbox");f.setModel(this._oManagedObjectModel,"$help");this.setAggregation("displayContent",f,true);h.call(this);return f}.bind(this))}.bind(this))};function n(){return this.getAggregation("displayContent")}function o(e){var t=e.getParameter("listItem");var i=t.getSelected();if(i){var s=g.call(this,t);var r=f.call(this,s);l.call(this,r,t.getLabel());this.fireSelect({type:a.Set,conditions:this.getConditions()});this.fireConfirm()}}function l(e,t){var i=this._createCondition(e,t);this.setProperty("conditions",[i],true);return i}function u(e){var t=this.getFilterList();return!t||p.call(this,e,this.getFilterValue())}function p(e,t){return!t||typeof t==="string"&&(this.getCaseSensitive()?e.startsWith(t):e.toLowerCase().startsWith(t.toLowerCase()))}function d(){if(this._iNavigateIndex>=0){this.setProperty("conditions",[],true);this._iNavigateIndex=-1}var e=n.call(this);if(e){var t=e.getBinding("items");t.update();e.updateItems();e.invalidate();h.call(this)}}function c(e){var t=e.getProperty("groupKey");var i=e.getProperty("groupText");return{key:t,text:i}}function h(){var e=n.call(this);if(e){var t=this.getConditions();var a;var s=this.getFilterValue();var r=this.getUseFirstMatch();var o=false;if(t.length>0&&(t[0].validated===i.Validated||t[0].operator==="EQ")){a=t[0].values[0]}var l=e.getItems();for(var u=0;u<l.length;u++){var d=l[u];if(u===this._iNavigateIndex){d.addStyleClass("sapMLIBFocused").addStyleClass("sapMListFocus")}else{d.removeStyleClass("sapMLIBFocused").removeStyleClass("sapMListFocus")}if(d.isA("sap.m.DisplayListItem")){var c=g.call(this,d);if(t.length>0&&f.call(this,c)===a){d.setSelected(true)}else if(t.length===0&&this._iNavigateIndex<0&&r&&s&&!o&&p.call(this,d.getLabel(),s)){d.setSelected(true);o=true}else{d.setSelected(false)}}}}}function g(e){var t=e.getBindingContextPath();return this._oManagedObjectModel.getProperty(t)}function f(e){var t=e.getBinding("key");if(t){return t.getInternalValue()}else{return e.getKey()}}r.prototype.getItemForValue=function(e){return Promise.resolve().then(function(){if(e.value===null||e.value===undefined){return null}else if(!e.value&&e.checkDescription){return null}var t=this.getItems();var i;var a=0;var r;var n;for(a=0;a<t.length;a++){i=t[a];r=f.call(this,i);n=i.getText();if(e.checkKey&&r===e.parsedValue||e.checkDescription&&(n===e.value||r==e.value)){return{key:r,description:i.getText()}}}if(e.checkKey&&e.value===""){return null}if(this.getUseFirstMatch()){for(a=0;a<t.length;a++){i=t[a];n=e.checkDescription?i.getText():i.getKey();if(p.call(this,n,e.value)){r=f.call(this,i);return{key:r,description:i.getText()}}}}var o=this._oResourceBundle.getText("valuehelp.VALUE_NOT_EXIST",[e.value]);var l=e.exception||s;throw new l(o)}.bind(this))};r.prototype.isValidationSupported=function(e){return true};r.prototype.isSearchSupported=function(){return true};r.prototype._handleConditionsUpdate=function(e){h.call(this)};r.prototype._handleFilterValueUpdate=function(e){d.call(this)};r.prototype.removeFocus=function(){var e=n.call(this);if(e){e.removeStyleClass("sapMListFocus")}};r.prototype.navigate=function(e){var t=n.call(this);if(!t){return}t.addStyleClass("sapMListFocus");var i=t.getItems();var a=i.length;var s=this._iNavigateIndex>=0?i[this._iNavigateIndex]:t.getSelectedItem();var r=0;var o=this.getFilterList();var u=this.getFilterValue();var d=false;var c=this.getParent().isOpen();if(!o&&!s){var h=0;if(e>=0){for(h=0;h<i.length;h++){if(!i[h].isA("sap.m.GroupHeaderListItem")&&p.call(this,i[h].getLabel(),u)){r=h;break}}}else{for(h=i.length-1;h>=0;h--){if(!i[h].isA("sap.m.GroupHeaderListItem")&&p.call(this,i[h].getLabel(),u)){r=h;break}}}}else if(s){r=t.indexOfItem(s);r=r+e}else if(e>=0){r=e-1}else{r=a+e}if(e===9999){r=a-1}if(e===-9999){r=0}var v;if(r<0){r=0;v=true;d=true}else if(r>=a-1){r=a-1;v=false}else{v=e>=0}var m=function(){while(i[r]&&i[r].isA("sap.m.GroupHeaderListItem")){if(v){r++}else{r--}}};if(!c){m();if(r<0||r>a-1){v=!v;d=r<0;r=r<0?0:a-1;m()}}var y=i[r];if(y){var I=this.getUseFirstMatch();if(y!==s||I&&!d){var b,x,S;this._iNavigateIndex=r;y.setSelected(true);if(c){t.scrollToIndex(r);y.$().trigger("focusin")}if(y.isA("sap.m.GroupHeaderListItem")){this.setProperty("conditions",[],true);this.fireNavigated({condition:undefined,itemId:y.getId(),leaveFocus:false})}else{b=g.call(this,y);x=f.call(this,b);S=b.getText();var L=l.call(this,x,S);this.fireNavigated({condition:L,itemId:y.getId(),leaveFocus:false})}}else if(d){this.fireNavigated({condition:undefined,itemId:undefined,leaveFocus:d})}}};r.prototype.onShow=function(){e.prototype.onShow.apply(this,arguments);var t=n.call(this);if(!t){return}var i=t.getSelectedItem();if(i){var a=t.indexOfItem(i);t.scrollToIndex(a)}};r.prototype.onHide=function(){this.removeFocus();this._iNavigateIndex=-1};r.prototype.getValueHelpIcon=function(){if(this.getUseAsValueHelp()){return"sap-icon://slim-arrow-down"}else{return null}};r.prototype.getAriaAttributes=function(e){return{contentId:this.getId()+"-List",ariaHasPopup:"listbox",roleDescription:null}};r.prototype.shouldOpenOnClick=function(){return!this.getFilterList()};r.prototype.isFocusInHelp=function(){return false};r.prototype._isSingleSelect=function(e){return true};r.prototype.shouldOpenOnNavigate=function(){return!e.prototype._isSingleSelect.apply(this)};r.prototype.isNavigationEnabled=function(e){return this.getItems().length>0};r.prototype.onConnectionChange=function(){this._iNavigateIndex=-1};return r});