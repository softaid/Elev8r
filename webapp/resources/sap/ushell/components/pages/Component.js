//Copyright (c) 2009-2022 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/core/InvisibleMessage","sap/ui/core/UIComponent","sap/ushell/components/SharedComponentUtils","sap/ushell/resources"],function(e,t,n,i){"use strict";return t.extend("sap.ushell.components.pages.Component",{metadata:{manifest:"json",library:"sap.ushell"},init:function(){t.prototype.init.apply(this,arguments);n.toggleUserActivityLog();n.getEffectiveHomepageSetting("/core/home/sizeBehavior","/core/home/sizeBehaviorConfigurable");this.setModel(i.i18nModel,"i18n");this._oPagesService=sap.ushell.Container.getServiceAsync("Pages");this._oInvisibleMessageInstance=e.getInstance()},getNavigationDisabled:function(){var e=this.getComponentData()||{};return!!e.navigationDisabled},getPagesService:function(){return this._oPagesService},getInvisibleMessageInstance:function(){return this._oInvisibleMessageInstance},hideRuntime:function(){this.getRootControl().getController().hideRuntime()},onRouteMatched:function(){this.getRootControl().getController().onRouteMatched()}})});