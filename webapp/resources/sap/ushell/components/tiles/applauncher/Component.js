// Copyright (c) 2009-2022 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/core/mvc/View","sap/ui/core/UIComponent"],function(e,t){"use strict";return t.extend("sap.ushell.components.tiles.applauncher",{metadata:{interfaces:["sap.ui.core.IAsyncContentCreation"]},createContent:function(){var t=this.getComponentData();return e.create({viewName:"module:sap/ushell/components/tiles/applauncher/StaticTileTmp.view",viewData:t})}})});