// Copyright (c) 2009-2022 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/library","sap/m/Bar","sap/m/Button","sap/m/Label","sap/m/library","sap/m/Popover","sap/m/ResponsivePopover","sap/m/ToggleButton","sap/ui/core/IconPool","sap/ui/Device","sap/ushell/Config","sap/ushell/ui/launchpad/AccessibilityCustomData","sap/ushell/resources","sap/ui/performance/Measurement","sap/ushell/services/AllMyApps"],function(e,t,o,l,s,p,i,n,a,r,h,u,c,v){"use strict";var A=e.AppTitleState;var y=e.AllMyAppsState;var d=s.PlacementType;var g=o.extend("sap.ushell.ui.shell.ShellAppTitle",{metadata:{library:"sap.ushell",associations:{navigationMenu:{type:"sap.ushell.ui.shell.ShellNavigationMenu"},allMyApps:{type:"sap.ui.core.mvc.View"}},events:{textChanged:{deprecated:true}}},renderer:{apiVersion:2,render:function(e,t){var o=t._getControlVisibilityAndState(),l=t.getText(),s=t.getModel();e.openStart("h1",t);e.class("sapUshellHeadTitle");if(o||r.system.phone){e.class("sapUshellAppTitleClickable")}e.attr("aria-level","1");e.openEnd();e.openStart("div",t.getId()+"-button");e.class("sapUshellAppTitle");if(o||r.system.phone){e.attr("tabindex","0")}if(t.getTooltip_AsString()){e.attr("title",t.getTooltip_AsString())}if(o){e.attr("role","button");e.attr("aria-haspopup","dialog");if(s&&g._getCurrentState()===A.AllMyAppsOnly){e.attr("aria-label",c.i18n.getText("ShowAllMyApps_AriaLabel",[l]))}else{e.attr("aria-label",c.i18n.getText("ShellNavigationMenu_AriaLabel",[l]))}}e.openEnd();if(r.media.getCurrentRange(r.media.RANGESETS.SAP_STANDARD).name!=="Phone"){e.openStart("span");e.class("sapUshellAppTitleText");e.openEnd();e.text(l||"");e.close("span")}if(o&&l){e.openStart("span");e.class("sapUshellShellHeadAction");e.openEnd();e.renderControl(t.oIcon);e.close("span")}e.close("div");e.close("h1")}}});g.prototype.init=function(){o.prototype.init.apply(this,arguments);this.oIcon=a.createControlByURI(a.getIconURI("slim-arrow-down"));this.oIcon.addStyleClass("sapUshellAppTitleMenuIcon");if(r.system.desktop){this.addEventDelegate({onkeydown:function(e){if(e.altKey&&e.keyCode===40){this.onclick(e)}}.bind(this)})}};g.prototype.getFocusDomRef=function(){return this.getDomRef("button")};g._getCurrentState=function(){return h.last("/core/shellHeader/ShellAppTitleState")};g.prototype.onclick=function(e){e.preventDefault();this.firePress();if(!this._getControlVisibilityAndState()){if(r.system.phone){window.hasher.setHash(h.last("/core/shellHeader/rootIntent"))}return}if(g._getCurrentState()===A.AllMyAppsOnly){v.start("FLP:ShellAppTitle.onClick","Click ShellAppTitle in HOME state, Launching AllMyApps","FLP");this._openCloseAllMyAppsPopover();return}this._openCloseNavMenuPopover()};g.prototype._openCloseAllMyAppsPopover=function(){if(!this.oAllMyAppsPopover){this.oAllMyAppsPopover=this._createAllMyAppsPopover()}if(this.oAllMyAppsPopover){if(this.oAllMyAppsPopover.isOpen()){this.oAllMyAppsPopover.close()}else{this.oAllMyAppsPopover.openBy(this)}}};g.prototype._openCloseNavMenuPopover=function(){if(!this.oNavMenuPopover){this.oNavMenuPopover=this._createNavMenuPopover()}this.getModel().setProperty("/ShellAppTitleState",A.ShellNavMenu);if(this.oNavMenuPopover.isOpen()){this.oNavMenuPopover.close()}else{this.oNavMenuPopover.openBy(this)}if(this.oNavMenuPopover.getFooter()){var e=h.last("/core/shell/model/currentState/stateName");this.oNavMenuPopover.getFooter().setVisible(e==="home"||e==="app")}};g.prototype._getControlVisibilityAndState=function(){v.start("FLP:ShellAppTitle.getControlVisibilityAndState","Check AllMyApps and NavShellMenu visibility","FLP");var e=this.getModel(),t=h.last("/core/shell/model/currentState/stateName"),o=this._isNavMenuEnabled(),l=o;if(!e){return false}if(t==="app"||t==="home"){var s=h.last("/core/services/allMyApps/enabled");l=s||o;if(s&&o){e.setProperty("/ShellAppTitleState",A.ShellNavMenu)}else if(!s&&o){e.setProperty("/ShellAppTitleState",A.ShellNavMenuOnly)}else if(s&&!o){e.setProperty("/ShellAppTitleState",A.AllMyAppsOnly)}}else{e.setProperty("/ShellAppTitleState",A.ShellNavMenuOnly)}v.end("FLP:ShellAppTitle.getControlVisibilityAndState");return l};g.prototype._createAllMyAppsPopover=function(){var e=sap.ui.getCore().byId(this.getAllMyApps());if(!e){return null}var t=new i("sapUshellAllMyAppsPopover",{placement:d.Bottom,title:"",showArrow:true,customHeader:this._getPopoverHeader(),verticalScrolling:false,showHeader:{path:"/ShellAppTitleState",formatter:function(e){return e!==A.ShellNavMenu}},content:[e],contentHeight:"28rem",contentWidth:"56rem"}).addStyleClass("sapContrastPlus");t.setModel(this.getModel());t.attachAfterOpen(function(){e.getController()._afterOpen();var o=t.getCustomHeader(),l=o.getContentLeft()[0],s=o.getContentLeft()[1];if(s.getVisible()){s.firePress();s.setPressed(true)}l.focus()});t.attachAfterClose(function(){this._bPressedSpace=false;if(!r.system.phone&&!(this.oNavMenuPopover&&this.oNavMenuPopover.isOpen())){this.focus()}}.bind(this));return t};g.prototype._createNavMenuPopover=function(){var e=sap.ui.getCore().byId(this.getNavigationMenu());var t=new p("sapUshellAppTitlePopover",{placement:d.Bottom,title:"",showArrow:true,showHeader:{path:"/ShellAppTitleState",formatter:function(e){return e!==A.ShellNavMenu}},contentWidth:"20rem",content:e}).addStyleClass("sapContrastPlus");if(h.last("/core/services/allMyApps/enabled")){t.setFooter(this._getPopoverFooterContent())}t.addStyleClass("sapUshellAppTitleNavigationMenuPopover");t.setModel(this.getModel());h.emit("/core/shell/model/allMyAppsMasterLevel",y.FirstLevel);t.attachBeforeOpen(function(){e._beforeOpen()});t.attachAfterOpen(function(){e.$().on("touchmove.scrollFix",function(e){e.stopPropagation()});e._afterOpen()});t.attachAfterClose(function(){this._bPressedSpace=false;if(!r.system.phone&&!(this.oAllMyAppsPopover&&this.oAllMyAppsPopover.isOpen())){this.focus()}}.bind(this));return t};g.prototype._getPopoverHeader=function(){var e=new l({text:c.i18n.getText("allMyApps_headerTitle")});this.addCustomData(e,"role","heading");this.addCustomData(e,"aria-level","2");var o=new t("sapUshellShellAppPopoverHeader",{contentLeft:[this._createPopoverBackButton(),this._createPopoverToggleButton()],contentMiddle:[e]});return o};g.prototype.onAfterRendering=function(){var e=sap.ui.getCore().byId("shell-header");if(e){e.refreshLayout()}};g.prototype._createPopoverBackButton=function(){var e=new o("sapUshellAppTitleBackButton",{icon:a.getIconURI("nav-back"),press:[this._popoverBackButtonPressHandler,this],tooltip:c.i18n.getText("backBtn_tooltip"),visible:this.getAllMyAppsController().getBackButtonVisible()});e.addStyleClass("sapUshellCatalogNewGroupBackButton");return e};g.prototype._popoverBackButtonPressHandler=function(){var e=this.getAllMyAppsController(),t=e.getCurrentState();if(t===y.FirstLevel||t===y.FirstLevelSpread){if(g._getCurrentState()!==A.AllMyAppsOnly){this.getModel().setProperty("/ShellAppTitleState",A.ShellNavMenu);this.oAllMyAppsPopover.close();this.oNavMenuPopover.openBy(this)}}else if(t===y.SecondLevel){e.switchToInitialState()}else{e.handleSwitchToMasterAreaOnPhone()}e.updateHeaderButtonsState()};g.prototype._createPopoverToggleButton=function(){var e=this.getAllMyAppsController();var t=new n("sapUshellAllMyAppsToggleListButton",{icon:a.getIconURI("sap-icon://menu2"),press:function(t){e.switchToInitialState();this.setTooltip(t.getParameter("pressed")?c.i18n.getText("ToggleButtonHide"):c.i18n.getText("ToggleButtonShow"))},tooltip:c.i18n.getText("ToggleButtonShow"),visible:e.getToggleListButtonVisible()});r.media.attachHandler(function(){t.setVisible(e.getToggleListButtonVisible())},this,r.media.RANGESETS.SAP_STANDARD);t.addStyleClass("sapUshellAllMyAppsToggleListButton");return t};g.prototype._getPopoverFooterContent=function(){var e=this,l;l=new o("allMyAppsButton",{text:c.i18n.getText("allMyApps_launchingButtonTitle"),press:function(){e._openCloseAllMyAppsPopover();if(e.oAllMyAppsPopover){v.start("FLP:ShellNavMenu.footerClick","Click the footer of ShellNavMenu, Launching AllMyApps","FLP");e.getModel().setProperty("/ShellAppTitleState",A.AllMyApps);e.oNavMenuPopover.close()}},visible:{path:"/ShellAppTitleState",formatter:function(e){return e===A.ShellNavMenu}}});var s=new t("shellpopoverFooter",{contentMiddle:[l]});this.addCustomData(l,"role","button");this.addCustomData(l,"aria-label",c.i18n.getText("allMyApps_launchingButtonTitle"));return s};g.prototype._isNavMenuEnabled=function(){var e=sap.ui.getCore().byId(this.getNavigationMenu());return e?e.getItems()&&e.getItems().length>0:false};g.prototype.addCustomData=function(e,t,o){e.addCustomData(new u({key:t,value:o,writeToDom:true}))};g.prototype.close=function(){if(this.oNavMenuPopover&&this.oNavMenuPopover.isOpen()){this.oNavMenuPopover.close()}if(this.oAllMyAppsPopover&&this.oAllMyAppsPopover.isOpen()){this.oAllMyAppsPopover.close()}};g.prototype.setTooltip=function(e){this.setAggregation("tooltip",e);this.oIcon.setTooltip(e)};g.prototype.getAllMyAppsController=function(){var e=sap.ui.getCore().byId(this.getAllMyApps());return e.getController()};g.prototype.onkeyup=function(e){if(e.keyCode===32){this.onclick(e)}};g.prototype.onsapenter=g.prototype.onclick;g.prototype.exit=function(){var e=sap.ui.getCore().byId(this.getNavigationMenu()),t=sap.ui.getCore().byId(this.getAllMyApps());if(e){e.destroy()}if(t){t.destroy()}if(this.oAllMyAppsPopover){this.oAllMyAppsPopover.destroy()}if(this.oNavMenuPopover){this.oNavMenuPopover.destroy()}if(this.oIcon){this.oIcon.destroy()}};return g},true);