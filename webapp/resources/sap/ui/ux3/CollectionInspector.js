/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/core/Control","sap/ui/core/delegate/ItemNavigation","./library","./CollectionInspectorRenderer","sap/ui/commons/ToggleButton","sap/ui/commons/SegmentedButton","sap/ui/commons/Button"],function(t,e,o,i,n,s,r,l){"use strict";var a=e.extend("sap.ui.ux3.CollectionInspector",{metadata:{deprecated:true,library:"sap.ui.ux3",properties:{sidebarVisible:{type:"boolean",group:"Appearance",defaultValue:true},fitParent:{type:"boolean",group:"Appearance",defaultValue:true}},aggregations:{collections:{type:"sap.ui.ux3.Collection",multiple:true,singularName:"collection"},content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"}},associations:{selectedCollection:{type:"sap.ui.ux3.Collection",multiple:false}},events:{collectionSelected:{},itemSelectionChanged:{},editCollection:{}}}});a.prototype.init=function(){var t=this;if(!this._oItemNavigation){this._oItemNavigation=new o;this._oItemNavigation.setCycling(false);this.addDelegate(this._oItemNavigation)}var e=new s(this.getId()+"-toggleButton");e.setParent(this);e.setTooltip("This button opens and closes the sidebar");e.attachPress(function(){if(e.getPressed()){t.openSidebar()}else{t.closeSidebar()}});this._oToggleButton=e;var i=new r(this.getId()+"-selector");i.attachSelect(function(e){var o=this.indexOfButton(sap.ui.getCore().byId(this.getSelectedButton()));var i=t.getCollections()[o];t.setSelectedCollection(i);t.fireCollectionSelected({collection:i});t.openSidebar()});this._oCollectionSelector=i;var n=new l;n.addStyleClass("sapUiUx3EditCollectionButton");n.setText("Collection");n.setTooltip("This button opens an edit dialog for the current collection");n.attachPress(function(){t.fireEditCollection()});this._oEditButton=n};a.prototype.exit=function(){this._oToggleButton.destroy();this._oToggleButton=null;this._oEditButton.destroy();this._oEditButton=null;this._oCollectionSelector.destroy();this._oCollectionSelector=null;if(this._oItemNavigation){this.removeDelegate(this._oItemNavigation);this._oItemNavigation.destroy();delete this._oItemNavigation}};a.prototype.onBeforeRendering=function(){this._oToggleButton.setPressed(this.getSidebarVisible())};a.prototype.onAfterRendering=function(){if(!this.getSelectedCollection()){if(this.getCollections().length>0){this.setSelectedCollection(this.getCollections()[0])}}else{var t=sap.ui.getCore().byId(this.getSelectedCollection());if(t.getSelectedItems().length==0&&t.getItems().length>0){t.addSelectedItem(t.getItems()[0])}}this.setElementsHeight();this.updateItemNavigation();this.refreshSelectionHighlighting()};a.prototype.onclick=function(e){var o=e.target;if(t(o).hasClass("sapUiUx3CICollectionListItem")){var i=sap.ui.getCore().byId(this.getSelectedCollection());if(i.getSelectedItems().indexOf(o.id)>=0){i.removeSelectedItem(o.id)}else{i.addSelectedItem(o.id)}this.refreshSelectionHighlighting();this.fireItemSelectionChanged({selectedItems:i.getSelectedItems()})}};a.prototype.getToggleButton=function(){return this._oToggleButton};a.prototype.getCollectionSelector=function(){return this._oCollectionSelector};a.prototype.rerenderSidebar=function(){var t=sap.ui.getCore().byId(this.getSelectedCollection());if(t&&t.getEditable()){this._oEditButton.setVisible(true)}else{this._oEditButton.setVisible(false)}var e=this.$("sidebar");if(e.length>0){var o=sap.ui.getCore().createRenderManager();this.getRenderer().renderSidebar(o,this);o.flush(e[0]);o.destroy()}if(t&&t.getEditable()){this.$("sidebar").addClass("sapUiUx3CIWithEditButton")}else{this.$("sidebar").removeClass("sapUiUx3CIWithEditButton")}this.updateItemNavigation();this.refreshSelectionHighlighting()};a.prototype.updateItemNavigation=function(){var e=[];var o=this.$("sidebar").find("li");t.each(o,function(t,o){e.push(o)});this._oItemNavigation.setItemDomRefs(e);this._oItemNavigation.setRootDomRef(this.$("sidebar ul")[0])};a.prototype.rerenderContent=function(){var t=this.$("content");if(t.length>0){var e=sap.ui.getCore().createRenderManager();this.getRenderer().renderContent(e,this);e.flush(t[0]);e.destroy()}this.setElementsHeight()};a.prototype.setElementsHeight=function(){if(this.getFitParent()){return}var t=this.$("sidebar");var e=this.$("content");var o=e.outerHeight(true);var i=e.outerHeight(true)-e.height();var n=t.outerHeight(true)-t.height();t.height(Math.max(200,o)-n);e.height(Math.max(200,o)-i)};a.prototype.openSidebar=function(){var t=this.$();var e=this.$("sidebar");var o=this.$("content");e.stop(true,true).animate({width:150},300,function(){e.css("width","")});o.stop(true,true).animate({left:150},300,function(){o.css("left","")});t.removeClass("sapUiUx3CISidebarClosed");t.addClass("sapUiUx3CISidebarOpened");this._oToggleButton.setPressed(true)};a.prototype.closeSidebar=function(){var t=this.$();var e=this.$("sidebar");var o=this.$("content");e.stop(true,true).animate({width:0},300,function(){e.css("width","")});o.stop(true,true).animate({left:0},300,function(){o.css("left","")});t.removeClass("sapUiUx3CISidebarOpened");t.addClass("sapUiUx3CISidebarClosed");this._oToggleButton.setPressed(false)};a.prototype.insertCollection=function(t,e){var o=new l;o.setText(t.getTitle());t.attachEvent("_titleChanged",function(t){o.setText(t.getParameter("newTitle"))});var i=this;t.attachSelectionChanged(function(){i.refreshSelectionHighlighting()});t.attachPropertyChanged(function(){i.rerenderSidebar()});this._oCollectionSelector.insertButton(o,e);return this.insertAggregation("collections",t,e)};a.prototype.addCollection=function(t){var e=new l;e.setText(t.getTitle());t.attachEvent("_titleChanged",function(t){e.setText(t.getParameter("newTitle"))});var o=this;t.attachSelectionChanged(function(){o.refreshSelectionHighlighting()});t.attachPropertyChanged(function(){o.rerenderSidebar()});this._oCollectionSelector.addButton(e);return this.addAggregation("collections",t)};a.prototype.removeCollection=function(t){var e;if(typeof t=="object"){e=this.indexOfCollection(t)}else{e=this.indexOfCollection(sap.ui.getCore().byId(t))}var o=this._oCollectionSelector.getButtons()[e];this._oCollectionSelector.removeButton(o);var i=this.removeAggregation("collections",t);if(i&&this.getSelectedCollection()==i.getId()){this.setSelectedCollection(null)}return i};a.prototype.removeAllCollections=function(){this._oCollectionSelector.removeAllButtons();this.setSelectedCollection(null);return this.removeAllAggregation("collections")};a.prototype.destroyCollections=function(){this._oCollectionSelector.destroyButtons();this.setSelectedCollection(null);return this.destroyAggregation("collections")};a.prototype.setSelectedCollection=function(t){this.setAssociation("selectedCollection",t,true);if(!t){this._oEditButton.setVisible(false)}else{this._oCollectionSelector.setSelectedButton(this._oCollectionSelector.getButtons()[this.indexOfCollection(t)]);var e=sap.ui.getCore().byId(this.getSelectedCollection());if(e.getSelectedItems().length==0&&e.getItems().length>0){e.addSelectedItem(e.getItems()[0])}}this.rerenderSidebar();this.refreshSelectionHighlighting();return this};a.prototype.insertContent=function(t,e){this.insertAggregation("content",t,e,true);this.rerenderContent();return this};a.prototype.addContent=function(t){this.addAggregation("content",t,true);this.rerenderContent();return this};a.prototype.removeContent=function(t){var e=this.removeAggregation("content",t,true);this.rerenderContent();return e};a.prototype.removeAllContent=function(){var t=this.removeAllAggregation("content",true);this.rerenderContent();return t};a.prototype.destroyContent=function(){this.destroyAggregation("content",true);this.rerenderContent();return this};a.prototype.onfocusout=function(e){var o=t(e.target);if(o.hasClass("sapUiUx3CICollectionListItem")){o.removeClass("sapUiUx3CISidebarFoc")}};a.prototype.onfocusin=function(e){var o=t(e.target);if(o.hasClass("sapUiUx3CICollectionListItem")){o.addClass("sapUiUx3CISidebarFoc")}};a.prototype.onsapenter=function(e){var o=t(e.target);if(o.hasClass("sapUiUx3CISidebarFoc")){this.onclick(e)}e.stopPropagation()};a.prototype.onsapspace=function(e){var o=t(e.target);if(o.hasClass("sapUiUx3CISidebarFoc")){this.onclick(e)}e.stopPropagation()};a.prototype.refreshSelectionHighlighting=function(){var e=this.$("sidebar").find(".sapUiUx3CICollectionListItem");var o;if(this.getSelectedCollection()){o=sap.ui.getCore().byId(this.getSelectedCollection()).getSelectedItems()}else{o=[]}e.each(function(e,i){if(o.indexOf(i.id)>=0){t(i).addClass("sapUiUx3CICollectionListItemSelected");t(i).attr("aria-selected",true)}else{t(i).removeClass("sapUiUx3CICollectionListItemSelected");t(i).attr("aria-selected",false)}})};a.prototype.getEditButton=function(){return this._oEditButton};return a});