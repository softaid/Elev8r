/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/changeHandler/BaseAddViaDelegate","sap/base/util/ObjectPath"],function(e,t){"use strict";var n="columns";var r="cells";var a="items";function i(e,t,n,r,a,i){var o=i&&i.entityType;if(o){return Promise.resolve().then(n.createControl.bind(n,"sap.m.Text",a,r,e.newFieldSelector.id+"--column",{text:"{/#"+o+"/"+e.bindingPath+"/@sap:label}"}))}return Promise.resolve(t.label)}var o=e.createAddViaDelegateChangeHandler({aggregationName:n,parentAlias:"targetTable",fieldSuffix:"--field",skipCreateLabel:function(e){return!!(e&&e.entityType)},skipCreateLayout:true,supportsDefault:true,addProperty:function(e){var t=e.innerControls;if(t.valueHelp){return Promise.reject(new Error("Adding properties with value helps is not yet supported by addTableColumn change handler"))}var o=e.control;var l=e.modifier;var u=e.view;var d=e.appComponent;var s=e.change;var g=s.getRevertData();var v=s.getContent();var c=s.getSupportInformation().oDataInformation;var p=v.newFieldIndex;var f=v.newFieldSelector;return Promise.resolve().then(l.getBindingTemplate.bind(l,o,a,u)).then(function(e){if(e){var n=t.control;return Promise.resolve().then(l.insertAggregation.bind(l,e,r,n,p,u)).then(l.updateAggregation.bind(l,o,a)).then(function(){g.newCellSelector=l.getSelector(n,d);s.setRevertData(g)})}return undefined}).then(l.createControl.bind(l,"sap.m.Column",d,u,f)).then(function(e){return i(v,t,l,u,d,c).then(function(t){return Promise.resolve().then(l.insertAggregation.bind(l,e,"header",t,0,u)).then(l.insertAggregation.bind(l,o,n,e,p,u))})})},revertAdditionalControls:function(e){var t=e.control;var n=e.change;var i=n.getRevertData();var o=e.modifier;var l=e.appComponent;var u,d;return Promise.resolve().then(o.getBindingTemplate.bind(o,t,a)).then(function(e){u=e;if(u){return Promise.resolve().then(o.bySelector.bind(o,i.newCellSelector,l)).then(function(e){d=e;return o.removeAggregation(u,r,d)}).then(function(){return o.destroy(d)}).then(o.updateAggregation.bind(o,t,a))}return undefined})}});return o},true);