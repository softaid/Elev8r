// Copyright (c) 2009-2022 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/components/shell/Search/ESearch","sap/ui/core/UIComponent","sap/ui/core/Component","sap/ushell/utils","sap/base/util/ObjectPath"],function(e,a,t,s,n){"use strict";return a.extend("sap.ushell.components.shell.Search.Component",{metadata:{manifest:"json",library:"sap.ushell"},createContent:function(){var a=this;var l=n.get("sap-ushell-config.services.SearchCEP")!==undefined;var r=sap.ushell.Container.getRenderer("fiori2").getShellController(),o=r.getView(),i=(o.getViewData()?o.getViewData().config:{})||{};var c=i.enableSearch!==false;if(!c){sap.ui.getCore().getEventBus().publish("shell","searchCompLoaded",{delay:0});return}sap.ushell.Container.getFLPPlatform().then(function(n){if(n==="MYHOME"||n==="cFLP"&&l===true){t.create({manifest:false,name:"sap.ushell.components.shell.SearchCEP"})}else{e.createContent(a);sap.ui.getCore().getEventBus().publish("shell","searchCompLoaded",{delay:0})}s.setPerformanceMark("FLP -- search component is loaded")})},exit:function(){e.exit()}})});