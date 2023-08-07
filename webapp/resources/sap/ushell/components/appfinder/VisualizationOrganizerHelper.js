// Copyright (c) 2009-2022 SAP SE, All Rights Reserved
sap.ui.define(["sap/m/library","sap/ushell/Config","sap/ushell/EventHub","sap/ushell/resources"],function(t,n,e,i){"use strict";var o=t.ButtonType;var r;function u(){return sap.ui.getCore().byId("catalogView")}function s(){return sap.ui.getCore().byId("appFinderView")}function a(){var t,r,a=null;function l(){return n.last("/core/spaces/enabled")}function f(){if(t){return Promise.resolve(t)}r=r||new Promise(function(n){sap.ui.require(["sap/ushell/components/visualizationOrganizer/Component"],function(e){t=new e;n(t)})});return r}function c(){var n=u();if(!n){return}n.setBusy(true);return f().then(function(t){return t.requestData()}).then(function(){if(this.oModel){this.oModel.updateBindings(true)}var n=s();if(n&&t.getPersonalizablePages().length===1){var e=i.i18n.getText("VisualizationOrganizer.PageContextTitle",t.getPersonalizablePages()[0].title);n.getController()._updateShellHeader(e)}}.bind(this)).finally(function(){n.setBusy(false)})}if(l()){this.oDoable=e.on("trackHashChange").do(function(t){if(l()&&t==="Shell-appFinder"){c.call(this)}}.bind(this))}this.setModel=function(t){this.oModel=t};this.loadAndUpdate=function(){return c.call(this)};this.formatPinButtonTooltip=function(n,e,i){if(!l()){return this.formatPinButtonTooltip(n,e)}return t.formatPinButtonTooltip(i,a)};this.formatPinButtonSelectState=function(){if(!l()){return this.formatPinButtonSelectState.apply(this,arguments)}return false};this.formatPinButtonIcon=function(n){if(!l()){return"sap-icon://pushpin-off"}return t.formatPinButtonIcon(n,!!a)};this.formatPinButtonType=function(n){if(!l()){return o.Default}return t.formatPinButtonType(n,!!a)};this.onTilePinButtonClick=function(n){if(!l()){this.getController().onTilePinButtonClick(n);return}t.onTilePinButtonClick(n,a)};this.getNavigationContext=function(){if(!l()){return this.getGroupContext.apply(this,arguments)}if(a){return{pageID:encodeURIComponent(a.pageID),sectionID:encodeURIComponent(a.sectionID)}}return null};this.getNavigationContextAsText=function(){if(!l()){return this.getGroupNavigationContext.apply(this,arguments)}if(a){return JSON.stringify({pageID:encodeURIComponent(a.pageID),sectionID:encodeURIComponent(a.sectionID)})}return null};this.updateModelWithContext=function(n){if(!l()){this._updateModelWithGroupContext.apply(this,arguments);return Promise.resolve()}return f().then(function(){return t.loadSectionContext(n)}).then(function(t){a=t;this.oView.getModel().updateBindings(true);if(a){var n=a.sectionTitle?i.i18n.getText("VisualizationOrganizer.AppFinderSectionContextTitle",a.sectionTitle):i.i18n.getText("VisualizationOrganizer.AppFinderSectionContextTitle",a.pageTitle);this.oView.oPage.setTitle(n);if(this._updateShellHeader){return new Promise(function(t){setTimeout(function(){this._updateShellHeader(n);t()}.bind(this),0)}.bind(this))}}return Promise.resolve()}.bind(this))};this._loadVisualizationOrganizer=f;this._setSectionContext=function(t){a=t};this.exit=function(){if(this.oDoable){this.oDoable.off();this.oDoable=null}};this.onHierarchyAppsPinButtonClick=function(n){if(!l()){this.showGroupListPopover(n);return Promise.resolve(false)}return t.onHierarchyAppsPinButtonClick(n,a)};this.formatBookmarkPinButtonTooltip=function(n,e,i,o,r){if(!l()){return this.formatPinButtonTooltip(n,e,i,o,r)}return t.formatBookmarkPinButtonTooltip(e,a)};this.formatBookmarkPinButtonSelectState=function(t){if(!l()){return!!t}return false};this.formatBookmarkPinButtonIcon=function(t){if(!l()){return"sap-icon://pushpin-off"}return t>0?"sap-icon://accept":"sap-icon://add"};this.formatBookmarkPinButtonType=function(t){if(!l()){return o.Default}return t>0?o.Emphasized:o.Default};this.updateBookmarkCount=function(n){if(!l()){return this.updateBookmarkCount(n)}return t.updateBookmarkCount(n,a)};this.shouldPinButtonBeVisible=function(){return new Promise(function(t){var e=n.last("/core/shell/enablePersonalization");if(!l()||e){t(e)}else if(!n.last("/core/spaces/myHome/enabled")){t(false)}else{sap.ushell.Container.getServiceAsync("UserInfo").then(function(n){t(n.getUser().getShowMyHome())})}})}}return{getInstance:function(){if(!r){r=new a}return r},_getConstructor:function(){return a},destroy:function(){if(r){r.exit()}r=null}}});