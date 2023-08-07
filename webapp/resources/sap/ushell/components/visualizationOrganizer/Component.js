// Copyright (c) 2009-2022 SAP SE, All Rights Reserved
sap.ui.define(["sap/m/library","sap/m/GroupHeaderListItem","sap/ushell/library","sap/ui/core/UIComponent","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/ui/model/json/JSONModel","sap/base/Log","sap/ushell/Config","sap/ushell/resources","sap/m/MessageBox"],function(e,t,i,n,a,s,o,r,l,u,g){"use strict";var c=e.ButtonType;var d=i.ContentNodeType;return n.extend("sap.ushell.components.visualizationOrganizer.Component",{metadata:{version:"1.109.2",library:"sap.ushell",dependencies:{libs:["sap.m"]},properties:{pressed:{type:"boolean",group:"Misc",defaultValue:false}}},init:function(){n.prototype.init.apply(this,arguments);this.aPersonalizablePages=[];this.mVizIdInPages=new Map;this.stVizIdInSection=new Set},requestData:function(){var e=!l.last("/core/shell/enablePersonalization")&&l.last("/core/spaces/myHome/enabled");var t=l.last("/core/spaces/myHome/myHomePageId");return sap.ushell.Container.getServiceAsync("CommonDataModel").then(function(e){return e.getAllPages()}).then(function(i){if(e){i=i.filter(function(e){return e.identification.id===t})}this.aPersonalizablePages=i.map(function(e){return{id:e.identification.id,title:e.identification.title}});this._fillVizIdMaps(i);return this.aPersonalizablePages}.bind(this))},_fillVizIdMaps:function(e){this.mVizIdInPages=new Map;e.forEach(function(e){Object.keys(e.payload.sections).forEach(function(t){Object.keys(e.payload.sections[t].viz).forEach(function(i){var n=e.payload.sections[t].viz[i].vizId;if(this.mVizIdInPages.has(n)){this.mVizIdInPages.get(n).add(e.identification.id)}else{this.mVizIdInPages.set(n,new Set([e.identification.id]))}}.bind(this))}.bind(this))}.bind(this))},isVizIdPresent:function(e,t){if(t){return this.stVizIdInSection.has(e)}var i=this.mVizIdInPages.get(e);return!!(i&&i.size)},formatPinButtonIcon:function(e,t){return this.isVizIdPresent(decodeURIComponent(e),t)?"sap-icon://accept":"sap-icon://add"},formatPinButtonType:function(e,t){return this.isVizIdPresent(decodeURIComponent(e),t)?c.Emphasized:c.Default},formatPinButtonTooltip:function(e,t){var i=this.isVizIdPresent(decodeURIComponent(e),!!t);if(!t&&i){return u.i18n.getText("EasyAccessMenu_PinButton_Toggled_Tooltip")}if(!t&&!i){return u.i18n.getText("EasyAccessMenu_PinButton_UnToggled_Tooltip")}if(t.sectionID&&i){return u.i18n.getText("VisualizationOrganizer.Button.Tooltip.RemoveFromSection",t.sectionTitle)}if(t.sectionID&&!i){return u.i18n.getText("VisualizationOrganizer.Button.Tooltip.AddToSection",t.sectionTitle)}if(!t.sectionID&&i){return u.i18n.getText("VisualizationOrganizer.Button.Tooltip.RemoveFromPage",t.pageTitle)}return u.i18n.getText("VisualizationOrganizer.Button.Tooltip.AddToPage",t.pageTitle)},onTilePinButtonClick:function(e,t){var i=e.getSource();var n=i.getBindingContext().getProperty();if(i.getBusy()){return Promise.resolve()}if(t){i.setBusy(true);return this._applyOrganizationChangeToSection(i,n,t).then(function(){i.setBusy(false)})}if(this.aPersonalizablePages.length===1){i.setBusy(true);return this._applyChangeToPage(i,n,this.aPersonalizablePages[0]).then(function(){i.setBusy(false)})}return this.toggle(i,n)},open:function(e,t){var i=sap.ui.getCore().byId("sapUshellVisualizationOrganizerPopover"),n=Promise.resolve();if(!i){n=new Promise(function(e,t){sap.ui.require(["sap/ui/core/Fragment"],function(i){i.load({name:"sap.ushell.components.visualizationOrganizer.VisualizationOrganizerPopover",type:"XML",controller:this}).then(e).catch(t)}.bind(this))}.bind(this)).then(function(e){i=e;i.setModel(new o({pages:[],searchTerm:""}));i.setModel(u.i18nModel,"i18n")})}return n.then(function(){this.oOpenBy=e;this.sVisualizationId=decodeURIComponent(t.id);this.sVisualizationTitle=t.title;this.oVizInfo=t;this.fnResetPopup=this._resetPopup.bind(this);i.attachAfterClose(this.fnResetPopup);return Promise.all([sap.ushell.Container.getServiceAsync("Menu"),sap.ushell.Container.getServiceAsync("Pages")]).then(function(e){var i;var n=e[0];var a=e[1];if(t.isBookmark){i=a._findBookmarks({url:t.url}).then(function(e){var t=e.map(function(e){return e.pageId});return Promise.resolve(new Set(t))})}else{i=this.mVizIdInPages.get(this.sVisualizationId)}return Promise.all([n.getContentNodes([d.Space,d.Page]),i])}.bind(this)).then(function(t){var n=t[0];var a=t[1];var s=!l.last("/core/shell/enablePersonalization")&&l.last("/core/spaces/myHome/enabled");var o=l.last("/core/spaces/myHome/myHomeSpaceId");var r=[];n=this._filterPersonalizableContentNodes(n);n.forEach(function(e){if(s&&e.id!==o){return}e.children.forEach(function(t){if(!this._isPersonalizablePage(t.id)){return}r.push({id:t.id,title:t.label,space:e.label,spaceId:e.id,selected:a&&a.has(t.id)})}.bind(this))}.bind(this));var u=i.getModel();u.setProperty("/pages",r);u.setProperty("/pinnedPages",a);this._updatePagesList();i.openBy(e)}.bind(this))}.bind(this))},_filterPersonalizableContentNodes:function(e){if(!Array.isArray(e)){return[]}return e.reduce(function(e,t){t.children=this._filterPersonalizableContentNodes(t.children);if(t.type===d.HomepageGroup||t.type===d.Space||t.type===d.Page&&t.isContainer){e.push(t)}return e}.bind(this),[])},cancel:function(){var e=sap.ui.getCore().byId("sapUshellVisualizationOrganizerPopover"),t=this._retrieveChangedPageIds();if(e&&t.deleteFromPageIds.length===0&&t.addToPageIds.length===0){e.close()}else{g.show(u.i18n.getText("VisualizationOrganizer.MessageBox.Description"),{id:"sapUshellVisualizationOrganizerDiscardDialog",title:u.i18n.getText("VisualizationOrganizer.MessageBox.Title"),actions:[u.i18n.getText("VisualizationOrganizer.MessageBox.ActionDiscard"),g.Action.CANCEL],emphasizedAction:u.i18n.getText("VisualizationOrganizer.MessageBox.ActionDiscard"),onClose:function(t){if(t===u.i18n.getText("VisualizationOrganizer.MessageBox.ActionDiscard")){e.close()}}})}},toggle:function(e,t){var i=sap.ui.getCore().byId("sapUshellVisualizationOrganizerPopover");if(i&&i.isOpen()&&i._oOpenBy&&i._oOpenBy.getId()===e.getId()){this.cancel();return Promise.resolve()}return this.open(e,t)},_applyOrganizationChangeToSection:function(e,t,i){return sap.ushell.Container.getServiceAsync("Pages").then(function(n){var a;var s=decodeURIComponent(t.id);var o=t.title;var r=i.pageID;var l=i.sectionID;var u=this._getTextMsgSectionContext(i,s,o);if(this.stVizIdInSection.has(s)){a=n.findVisualization(r,l,s).then(function(e){if(e.length===0){return Promise.resolve()}var t;var i=n.getPageIndex(r);var a=e.sort(function(e,t){return t.sectionIndex-e.sectionIndex});a.forEach(function(e){e.vizIndexes.sort(function(e,t){return t-e})});a.forEach(function(e){var a=e.sectionIndex;e.vizIndexes.forEach(function(e){if(!t){t=n.deleteVisualization(i,a,e)}else{t=t.then(function(){return n.deleteVisualization(i,a,e)})}})});return t}).then(function(){this.stVizIdInSection.delete(s)}.bind(this))}else{a=n.addVisualization(r,l,s).then(function(){this.stVizIdInSection.add(s)}.bind(this))}return a.then(function(){e.getBinding("icon").refresh(true);e.getBinding("type").refresh(true);e.getBinding("tooltip").refresh(true);sap.ui.require(["sap/m/MessageToast"],function(e){e.show(u,{offset:"0 -50"})})})}.bind(this))},_getTextMsgSectionContext:function(e,t,i){var n=e.sectionID;var a=e.sectionTitle;var s=e.pageTitle;if(n&&this.stVizIdInSection.has(t)){return u.i18n.getText("VisualizationOrganizer.MessageToastSectionContextRemove",[i||t,a,s])}if(n&&!this.stVizIdInSection.has(t)){return u.i18n.getText("VisualizationOrganizer.MessageToastSectionContextAdd",[i||t,a,s])}if(!n&&this.stVizIdInSection.has(t)){return u.i18n.getText("VisualizationOrganizer.MessageToastPageRemove",[i||t,s])}if(!n&&!this.stVizIdInSection.has(t)){return u.i18n.getText("VisualizationOrganizer.MessageToastPageAdd",[i||t,s])}},_organizeVisualizations:function(){var e=this._retrieveChangedPageIds();if(this.oVizInfo.isBookmark){return this._applyBookmarkOrganizationChange(e,true)}return this._applyOrganizationChange(e,true)},_applyOrganizationChange:function(e,t){var i=e.addToPageIds.length+e.deleteFromPageIds.length;if(!i){return Promise.resolve()}var n=this.sVisualizationId;var a=this.oOpenBy;var s=new Set;var o;var r=sap.ushell.Container.getServiceAsync("Pages").then(function(e){o=e});e.deleteFromPageIds.forEach(function(e){if(!s.has(e)){s.add(e);r=r.then(function(){return o.findVisualization(e,null,n).then(function(e){var t=[],i,n,a;for(var s=e.length-1;s>=0;s--){n=e[s];i=o.getPageIndex(n.pageId);for(var r=n.vizIndexes.length-1;r>=0;r--){a=n.vizIndexes[r];t.push(o.deleteVisualization(i,n.sectionIndex,a))}}return Promise.all(t)})})}this.mVizIdInPages.get(n).delete(e)}.bind(this));e.addToPageIds.forEach(function(e){r=r.then(function(){return o.addVisualization(e,null,n)});if(this.mVizIdInPages.has(n)){this.mVizIdInPages.get(n).add(e)}else{this.mVizIdInPages.set(n,new Set([e]))}}.bind(this));return r.then(function(){if(a){a.getBinding("icon").refresh(true);a.getBinding("type").refresh(true);a.getBinding("tooltip").refresh(true)}if(t){sap.ui.require(["sap/m/MessageToast"],function(e){e.show(u.i18n.getText("VisualizationOrganizer.MessageToast"))})}})},_resetPopup:function(e){var t=sap.ui.getCore().byId("sapUshellVisualizationOrganizerPopover"),i=sap.ui.getCore().byId("sapUshellVisualizationOrganizerSpacesList"),n=sap.ui.getCore().byId("sapUshellVisualizationOrganizerSearch"),a=sap.ui.getCore().byId("sapUshellVisualizationOrganizerSelectedPages");t.detachAfterClose(this.fnResetPopup);n.setValue("");a.setType(c.Default);i.getBinding("items").filter(null);i.removeSelections();delete this.fnResetPopup;delete this.sVisualizationId;delete this.sVisualizationTitle},pagePressed:function(e){this._changeSelectionForAllPagesWithTheSamePageId(e.getSource())},onSelectionChange:function(e){var t=e.getParameter("listItem"),i=e.getParameter("selected");this._changeSelectionForAllPagesWithTheSamePageId(t,i)},_changeSelectionForAllPagesWithTheSamePageId:function(e,t){var i=e.getModel(),n=e.getBindingContext(),a=n.getProperty("id"),s=t!==undefined?t:!n.getProperty("selected");var o=i.getProperty("/pages");for(var r=0;r<o.length;r++){var l=o[r];if(l.id===a){l.selected=s}}i.setProperty("/pages",o)},_onSearch:function(e){var t=sap.ui.getCore().byId("sapUshellVisualizationOrganizerSelectedPages");var i=this.getPressed();if(e.sId==="press"){i=!i;this.setPressed(i);t.setPressed(i)}this._updatePagesList()},_updatePagesList:function(){var e=sap.ui.getCore().byId("sapUshellVisualizationOrganizerSpacesList");var t=sap.ui.getCore().byId("sapUshellVisualizationOrganizerSearch");var i=e.getBinding("items");var n=t.getValue();var o=this.getPressed();if(o){i.filter(new a({filters:[new a({filters:[new a({path:"title",operator:s.Contains,value1:n}),new a({path:"selected",operator:s.EQ,value1:o})],and:true}),new a({filters:[new a({path:"space",operator:s.Contains,value1:n}),new a({path:"selected",operator:s.EQ,value1:o})],and:true})],and:false}))}else{i.filter(new a({filters:[new a({path:"title",operator:s.Contains,value1:n}),new a({path:"space",operator:s.Contains,value1:n})],and:false}))}if(i.getLength()===0){e.setNoDataText(u.i18n.getText(n?"VisualizationOrganizer.PagesList.NoResultsText":"VisualizationOrganizer.PagesList.NoDataText"))}},loadSectionContext:function(e){this.stVizIdInSection.clear();if(!e||!e.pageID){return Promise.resolve(null)}return sap.ushell.Container.getServiceAsync("Pages").then(function(t){var i=decodeURIComponent(e.pageID);var n=e.sectionID?decodeURIComponent(e.sectionID):"";return t.loadPage(i).then(function(e){var i=t.getModel().getProperty(e);var a=this._createSectionContext(i,n);return a}.bind(this)).catch(function(){r.warning(i+" cannot be loaded. Please, check the id of the page.");return Promise.resolve(null)})}.bind(this))},_createSectionContext:function(e,t){var i=e.sections;var n;if(t){n=i.find(function(e){return e.id===t});this._initVizIdsInSection(n);return{pageID:e.id,sectionID:t,pageTitle:e.title,sectionTitle:n.title}}i.forEach(function(e){this._initVizIdsInSection(e)}.bind(this));return{pageID:e.id,sectionID:t,pageTitle:e.title}},_initVizIdsInSection:function(e){e.visualizations.forEach(function(e){this.stVizIdInSection.add(e.vizId)}.bind(this))},getPersonalizablePages:function(){return this.aPersonalizablePages},_isPersonalizablePage:function(e){var t=this.aPersonalizablePages.findIndex(function(t){return t.id===e});return t>-1},_retrieveChangedPageIds:function(){var e=sap.ui.getCore().byId("sapUshellVisualizationOrganizerSpacesList"),t=sap.ui.getCore().byId("sapUshellVisualizationOrganizerSearch"),i=e.getModel(),n=i.getProperty("/pinnedPages")||new Set;e.getBinding("items").filter(null);var a=e.getItems().filter(function(e){return e.isA("sap.m.StandardListItem")});t.fireSearch();var s={},o=[],r=[];a.forEach(function(e){var t=e.getBindingContext().getProperty("id");if(!s[t]){s[t]=true;if(e.getSelected()&&!n.has(t)){o.push(t)}else if(!e.getSelected()&&n.has(t)){r.push(t)}}});return{addToPageIds:o,deleteFromPageIds:r}},okay:function(){var e=sap.ui.getCore().byId("sapUshellVisualizationOrganizerPopover");if(e.getBusy()){return}e.setBusy(true);this._organizeVisualizations().then(function(){e.setBusy(false);e.close()}).catch(function(e){r.error("Could not save the selected pages on the VisualizationOrganizerPopover",e)})},onHierarchyAppsPinButtonClick:function(e,t){var i=e.getSource();var n=i.getParent().getBinding("title").getContext().getObject();if(i.getBusy()){return Promise.resolve(false)}n.isBookmark=true;n.title=n.text;if(t){i.setBusy(true);return this._applyBookmarkTileChangeToSection(n,t).then(function(){i.setBusy(false);return Promise.resolve(true)})}if(this.aPersonalizablePages.length===1){i.setBusy(true);return this._applyChangeToPage(i,n,this.aPersonalizablePages[0]).then(function(){i.setBusy(false);return Promise.resolve(true)})}return new Promise(function(e){this.toggle(i,n).then(function(){var t=sap.ui.getCore().byId("sapUshellVisualizationOrganizerPopover");if(t&&t.isOpen()){t.attachEventOnce("afterClose",function(){e(true)})}else{e(false)}})}.bind(this))},_applyBookmarkOrganizationChange:function(e,t){var n=e.addToPageIds.length+e.deleteFromPageIds.length;if(!n){return Promise.resolve()}var a=this.oVizInfo;var s=new Set;var o,r;var l=Promise.all([sap.ushell.Container.getServiceAsync("Bookmark"),sap.ushell.Container.getServiceAsync("Pages")]).then(function(e){o=e[0];r=e[1];return Promise.resolve()});e.deleteFromPageIds.forEach(function(e){if(!s.has(e)){s.add(e);l=l.then(function(){return r.deleteBookmarks({url:a.url},e)})}});e.addToPageIds.forEach(function(e){l=l.then(function(){return new Promise(function(t,n){var s={url:a.url,title:a.text,subtitle:a.subtitle,icon:a.icon};var r={type:i.ContentNodeType.Page,id:e,isContainer:true};o.addBookmark(s,r).done(t).fail(n)})})});return l.then(function(){if(t){sap.ui.require(["sap/m/MessageToast"],function(e){e.show(u.i18n.getText("VisualizationOrganizer.MessageToast"))})}})},_applyBookmarkTileChangeToSection:function(e,t){return sap.ushell.Container.getServiceAsync("Pages").then(function(i){var n,a;var s=e.url;var o=e.title;var r=t.pageID;var l=t.sectionID;if(e.bookmarkCount>0){a=u.i18n.getText("VisualizationOrganizer.MessageToastSectionContextRemove",[o,t.sectionTitle,t.pageTitle]);n=i.deleteBookmarks({url:s},r,l)}else{var g={url:s,title:e.text,subtitle:e.subtitle,icon:e.icon};a=u.i18n.getText("VisualizationOrganizer.MessageToastSectionContextAdd",[o,t.sectionTitle,t.pageTitle]);n=i.addBookmarkToPage(r,g,l)}return n.then(function(){sap.ui.require(["sap/m/MessageToast"],function(e){e.show(a,{offset:"0 -50"})})})})},updateBookmarkCount:function(e,t){return sap.ushell.Container.getServiceAsync("Pages").then(function(i){var n=e.map(function(e){return i._findBookmarks({url:e.url}).then(function(i){if(t){i=i.filter(function(e){return t.pageID===e.pageId&&t.sectionID===e.sectionId})}e.bookmarkCount=i.length;return e})});return Promise.all(n)})},formatBookmarkPinButtonTooltip:function(e,t){var i,n;if(t){n=t.sectionTitle;if(e>0){i="VisualizationOrganizer.Button.Tooltip.RemoveFromSection"}else{i="VisualizationOrganizer.Button.Tooltip.AddToSection"}}else if(e>0){i="EasyAccessMenu_PinButton_Toggled_Tooltip"}else{i="EasyAccessMenu_PinButton_UnToggled_Tooltip"}return u.i18n.getText(i,n)},_applyChangeToPage:function(e,t,i){var n=decodeURIComponent(t.id);var a=t.title;var s=i.id;var o=t.isBookmark?t.bookmarkCount>0:this.isVizIdPresent(n);var r={addToPageIds:o?[]:[s],deleteFromPageIds:o?[s]:[]};var l=u.i18n.getText(o?"VisualizationOrganizer.MessageToastPageRemove":"VisualizationOrganizer.MessageToastPageAdd",[a||n,i.title]);this.oVizInfo=t;this.sVisualizationId=n;var g;if(t.isBookmark){g=this._applyBookmarkOrganizationChange(r,false)}else{g=this._applyOrganizationChange(r,false)}return g.then(function(){e.getBinding("icon").refresh(true);e.getBinding("type").refresh(true);e.getBinding("tooltip").refresh(true);sap.ui.require(["sap/m/MessageToast"],function(e){e.show(l,{offset:"0 -50"})})})},groupBySpace:function(e){return{key:e.getProperty("spaceId"),title:e.getProperty("space")}},getGroupHeader:function(e){return new t({title:e.title})},exit:function(){var e=sap.ui.getCore().byId("sapUshellVisualizationOrganizerPopover");if(e){e.destroy()}}})});