/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/editor/fields/BaseField","sap/m/Panel","sap/m/IconTabBar","sap/m/IconTabFilter","sap/m/MessageStrip","sap/ui/core/Core"],function(e,t,r,n,i,s){"use strict";var a=e.extend("sap.ui.integration.editor.fields.GroupField",{metadata:{library:"sap.ui.integration"},renderer:e.getMetadata().getRenderer()});a.prototype.initVisualization=function(e){var n=e.visualization;if(!n||n.type==="Panel"){n={type:t,settings:{headerText:e.label,visible:e.visible,expandable:e.expandable!==false,expanded:"{currentSettings>expanded}",width:"auto",backgroundDesign:"Transparent",objectBindings:{currentSettings:{path:"currentSettings>"+(e._settingspath||"/form/items")},items:{path:"items>/form/items"},context:{path:"context>/"}},expand:function(e){var t=e.getParameter("expand");if(t){var r=e.getSource();var n=this.getConfiguration();if(!r._level){r._level=n.level||0}var i=r._level==="1"&&this.getParent().getParent()?this.getParent().getParent().getAggregation("_messageStrip"):this.getParent().getAggregation("_messageStrip");if(i===null){i=s.byId(this.getAssociation("_messageStrip"))}r.addContent(i);r.focus()}}.bind(this)}}}else if(n.type==="Tab"){n={type:r,settings:{expandable:e.expandable!==false,visible:e.visible,expanded:"{currentSettings>expanded}",objectBindings:{currentSettings:{path:"currentSettings>"+(e._settingspath||"/form/items")},items:{path:"items>/form/items"},context:{path:"context>/"}},select:this.checkErrorsInIconTabBar.bind(this)}}}this._visualization=n;this.attachAfterInit(this._afterInit)};a.prototype._afterInit=function(){var e=this.getConfiguration();var s=this.getAggregation("_field");if(s instanceof t){if(this.getMode()!=="translation"){var a=this.getResourceBundle();var o=new i({id:s.getId()+"_strip",showIcon:false,visible:"{= !${currentSettings>expanded} && ${currentSettings>hasError} === true}",text:{path:"currentSettings>errorType",formatter:function(e){var t="";switch(e){case"Error":t=a.getText("EDITOR_GROUP_ERRORS");break;case"Warning":t=a.getText("EDITOR_GROUP_WARNINGS");break;default:}return t}},type:"{currentSettings>errorType}",objectBindings:{currentSettings:{path:"currentSettings>"+(e._settingspath||"/form/items")}}});if(e.level!=="1"){o.setModel(this._settingsModel,"currentSettings")}o.addStyleClass("sapUiIntegrationEditorPanelMessageStrip");s._messageStrip=o}s._cols=e.cols||2;s._level=e.level||0;var g={onAfterRendering:function(n){var i=n.srcControl;var s=document.getElementById(i.getId());s.setAttribute("aria-label",e.label);if(i._subItems&&i._subItems.length>0){this.checkErrorsInSubItems(this._settingsModel,i)}var a=i._messageStrip;if(i._level!=="1"&&a){a.rerender()}if(i.getExpanded()){var o=i.getContent();o.forEach(function(e){if(e.isA("sap.ui.integration.editor.fields.GroupField")){var n=e.getAggregation("_field");if(n instanceof t&&n._subItems&&n._subItems.length>0){e.checkErrorsInSubItems(e._settingsModel,n)}else if(n instanceof r&&n.getItems().length>0){e.checkErrorsInIconTabBar()}}})}}.bind(this)};s.addEventDelegate(g)}else if(s instanceof r){var l=new n({text:e.label,visible:e.visible,objectBindings:{currentSettings:{path:"currentSettings>"+(e._settingspath||"/form/items")},items:{path:"items>/form/items"},context:{path:"context>/"}}});s.addItem(l);s.setBackgroundDesign("Transparent");s.setHeaderBackgroundDesign("Transparent");s.addStyleClass("sapUiIntegrationEditorSubGroup");if(this.getMode()!=="translation"){var d=new i({id:s.getId()+"_strip",showIcon:false,visible:false,objectBindings:{currentSettings:{path:"currentSettings>"+(e._settingspath||"/form/items")}}});d.addStyleClass("sapUiIntegrationEditorTabMessageStrip");s._messageStrip=d}s._level=e.level||0}};a.prototype.checkErrorsInIconTabBar=function(e){var t=this.getAggregation("_field"),r=t.getSelectedKey(),i=t.getItems(),a=t.getExpanded(),o=false;for(var g=0;g<i.length;g++){if(!a){o=true}else if(i[g].getId()!==r){o=true}else if(i[g].getId()===r){o=false}if(o){var l=false,d="None";if(i[g]._subItems&&i[g]._subItems.length>0){var u=i[g].getModel("currentSettings");var p=this.checkErrorsInSubItems(u,i[g]);l=p.hasError;d=p.errorType}if(l){var c=new n,f=i[g];if(f.getItems().length>0){f.removeAllItems()}f.addItem(c);this._handleITBValidation(f,d);if(f._oExpandButton===undefined){this._delayHandleITBValidation(f,d)}else{this._handleITBValidation(f,d)}}}else if(i[g].getItems().length>0){i[g].removeItem(i[g].getItems()[0]);if(i[g]._oExpandButton){i[g]._oExpandButton.visible=false}var h=this.getParent().getParent().getAggregation("_messageStrip");if(h===null){h=s.byId(this.getAssociation("_messageStrip"))}i[g].addContent(h)}}};a.prototype.checkErrorsInSubItems=function(e,t){var r=false;var n="None";for(var i=0;i<t._subItems.length;i++){var a=t._subItems[i].settingspath;var o=s.byId(t._subItems[i].itemId);if(e.getProperty(a+"/hasError")===true&&o.getVisible()){r=true;var g=e.getProperty(a+"/errorType");if(g==="Error"){n="Error";break}else if(g==="Warning"&&n!=="Error"){n="Warning"}}}e.setProperty("hasError",r,this.getBindingContext("currentSettings"));e.setProperty("errorType",n,this.getBindingContext("currentSettings"));return{hasError:r,errorType:n}};a.prototype._handleITBValidation=function(e,t){var r=this.getResourceBundle();if(e.getItems().length>0&&e._oExpandButton){var n=e._oExpandButton;var i=null;if(t==="Error"){i=r.getText("EDITOR_GROUP_ERRORS");n.setIcon("sap-icon://message-error");n.addStyleClass("errorBTNImage")}else if(t==="Warning"){i=r.getText("EDITOR_GROUP_WARNINGS");n.setIcon("sap-icon://message-warning");n.addStyleClass("warningBTNImage")}n.setTooltip(null);n.addEventDelegate({onAfterRendering:function(e){var t=document.getElementById(n.getId());t.setAttribute("aria-label","With validation errors");t.setAttribute("title","")}});n.setEnabled(false);n.addStyleClass("errorBTN").addStyleClass("errorBTNDisabled");var a=n.getParent().getParent().getParent();var o=s.byId(a.getId()+"_strip");n.addEventDelegate({onmouseover:function(){o.setVisible(true);o.setType(t);o.setText(i)},onmouseout:function(){o.setVisible(false)}},this)}};a.prototype._delayHandleITBValidation=function(e,t){var r=this;var n=setInterval(function(){if(e._oExpandButton){r._handleITBValidation(e,t);clearInterval(n)}},50)};return a});