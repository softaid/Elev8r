//Copyright (c) 2009-2022 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/core/mvc/Controller","sap/ushell/components/cepsearchresult/util/SearchResultManager"],function(e,t){"use strict";return e.extend("sap.ushell.components.cepsearchresult.app.Main",{onInit:function(){this.oSearchResultManager=new t(this.getOwnerComponent().getSearchConfig());this.getView().setModel(this.oSearchResultManager.getModel(),"manager");this.getView().setVisible(true);this.setCategory(this.getOwnerComponent().getCategory());this.byId("searchResultWidget").setManifest(sap.ui.require.toUrl("sap/ushell/components/cepsearchresult/cards/searchresultwidget/manifest.json"))},onExit:function(){t._resetGlobals()},tabSelectionChange:function(e){this.setCategory(e.getParameters().item.getKey())},setCategory:function(e){this.byId("searchCategoriesTabs").setSelectedKey(e);this.byId("searchResultWidget").setParameters({categories:e,searchTerm:this.getOwnerComponent().getSearchTerm(),edition:this.getOwnerComponent().getSearchConfig()})}})});