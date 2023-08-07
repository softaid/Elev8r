// Copyright (c) 2009-2022 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/core/UIComponent","sap/ushell/components/applicationIntegration/AppLifeCycle","sap/ushell/Config","sap/ushell/components/shell/MeArea/MeArea.controller"],function(e,o,n,t){"use strict";var s;function i(){if(!s){s=sap.ushell.Container.getRenderer("fiori2")}return s}return e.extend("sap.ushell.components.shell.MeArea.Component",{metadata:{version:"1.109.2",library:"sap.ushell",dependencies:{libs:["sap.m"]}},createContent:function(){this._bIsMeAreaCreated=false;this.oMeAreaController=new t;this.oMeAreaController.onInit();var e=this;o.getElementsModel().createTriggers([{fnRegister:function(){if(!e.oActionsDoable){e.oActionsDoable=n.on("/core/shell/model/currentState/actions").do(function(e){if(e&&e.length>0){i().showHeaderEndItem(["meAreaHeaderButton"],true)}else{i().hideHeaderEndItem(["meAreaHeaderButton"],true)}})}},fnUnRegister:function(){if(!e.oActionsDoable){e.oActionsDoable.off();e.oActionsDoable=null}}}],false,["blank-home","blank"]);sap.ui.getCore().getEventBus().publish("shell","meAreaCompLoaded",{delay:0})},exit:function(){if(this.oActionsDoable){this.oActionsDoable.off()}this.oEventListener.off();this.oMeAreaController.onExit()}})});