// Copyright (c) 2009-2022 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/core/mvc/Controller","sap/ushell/components/tiles/utils","sap/ui/model/json/JSONModel","sap/ui/thirdparty/jquery","sap/base/Log"],function(t,e,i,n,o){"use strict";return t.extend("sap.ushell.components.tiles.action.ActionTile",{onInit:function(){var t=this.getView();var n=t.getViewData();var o=e.getResourceBundleModel();var r=n.chip;var a=e.getActionConfiguration(r);var g;var c=this;function s(t,e){var i=o.getResourceBundle(),n=i.getText("configuration.semantic_object")+":\n"+t+"\n\n"+i.getText("configuration.semantic_action")+":\n"+e;return n}t.setModel(o,"i18n");g=new i({config:a,displayText:s(a.semantic_object,a.semantic_action)});t.setModel(g);if(r.configurationUi.isEnabled()){r.configurationUi.setAsyncUiProvider(function(){return e.getConfigurationUi(c.getView(),"sap.ushell.components.tiles.action.Configuration").then(function(t){r.configurationUi.attachCancel(c.onCancelConfiguration.bind(null,t));r.configurationUi.attachSave(c.onSaveConfiguration.bind(null,t,s));return t})});t.byId("actionTile").setTooltip(o.getResourceBundle().getText("edit_configuration.tooltip"))}},onPress:function(t){var e=this.getView().getViewData().chip;if(e.configurationUi.isEnabled()){e.configurationUi.display()}},onSaveConfiguration:function(t,r){var a=n.Deferred(),g=t.getModel(),c=g.getProperty("/tileModel"),s=t.getViewData().chip;function l(t){o.warning(t,null,"sap.ushell.components.tiles.action.ActionTile.controller");a.reject(t)}var p=e.checkTMInputOnSaveConfig(t);if(p){a.reject("mandatory_fields_missing");return a.promise()}var u=e.getResourceBundleModel().getResourceBundle();if(e.tableHasDuplicateParameterNames(g.getProperty("/config/rows"))){a.reject(u.getText("configuration.signature.uniqueParamMessage.text"))}else if(!e.tableHasInvalidSapPrelaunchOperationValue(g.getProperty("/config/rows"))){var f=JSON.stringify([{type:"split",source:"p1",target:["p2","p3"]},{type:"merge",source:["p4","p5"],target:"p6"}]);a.reject(u.getText("configuration.signature.invalidSapPrelaunchOperationsMessage.text",[f]))}else{var d=g.getProperty("/config/formFactorConfigDefault")?undefined:e.buildFormFactorsObject(g);var _=e.getMappingSignatureString(g.getProperty("/config/rows"),g.getProperty("/config/isUnknownAllowed"));var y=e.getMappingSignature(g.getProperty("/config/rows"),g.getProperty("/config/isUnknownAllowed"));var m={semantic_object:n.trim(g.getProperty("/config/semantic_object"))||"",semantic_action:n.trim(g.getProperty("/config/semantic_action"))||"",display_title_text:n.trim(g.getProperty("/config/display_title_text"))||"",url:n.trim(g.getProperty("/config/url"))||"",ui5_component:n.trim(g.getProperty("/config/ui5_component"))||"",navigation_provider:n.trim(g.getProperty("/config/navigation_provider")),navigation_provider_role:n.trim(g.getProperty("/config/navigation_provider_role"))||"",navigation_provider_instance:n.trim(g.getProperty("/config/navigation_provider_instance"))||"",target_application_id:n.trim(g.getProperty("/config/target_application_id"))||"",target_application_alias:n.trim(g.getProperty("/config/target_application_alias"))||"",transaction:{code:n.trim(g.getProperty("/config/transaction/code"))},web_dynpro:{application:n.trim(g.getProperty("/config/web_dynpro/application")),configuration:n.trim(g.getProperty("/config/web_dynpro/configuration"))},target_system_alias:n.trim(g.getProperty("/config/target_system_alias")),display_info_text:n.trim(g.getProperty("/config/display_info_text")),form_factors:d,mapping_signature:_,signature:y};var v=s.bag.getBag("tileProperties");v.setText("display_title_text",m.display_title_text);s.writeConfiguration.setParameterValues({tileConfiguration:JSON.stringify(m)},function(){var n=e.getActionConfiguration(s,false);var p=e.getActionConfiguration(s,true);g=new i({config:n,tileModel:c});t.setModel(g);c.setData({config:p,displayText:r(p.semantic_object,p.semantic_action)},false);v.save(function(){o.debug("property bag 'tileProperties' saved successfully");a.resolve()},l)},l)}return a.promise()},onCancelConfiguration:function(t){var i=t.getViewData();var n=t.getModel();var o=n.getProperty("/tileModel");var r=i.chip;var a=e.getActionConfiguration(r,false);t.getModel().setData({config:a,tileModel:o},false)}})});