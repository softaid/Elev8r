// Copyright (c) 2009-2022 SAP SE, All Rights Reserved
sap.ui.define(["sap/base/Log","sap/m/ButtonRenderer","sap/m/MessageBox","sap/ui/core/ElementMetadata","sap/ushell/resources","sap/ushell/ui/launchpad/ActionItem","sap/ushell/ui/launchpad/LoadingDialog"],function(e,t,n,i,o,s,a){"use strict";var l=n.Action;var u=n.Icon;var r=s.extend("sap.ushell.ui.footerbar.LogoutButton",{metadata:{library:"sap.ushell"},renderer:"sap.m.ButtonRenderer"});r.prototype.init=function(){if(s.prototype.init){s.prototype.init.apply(this,arguments)}this.setIcon("sap-icon://log");this.setTooltip(o.i18n.getText("signoutBtn_tooltip"));this.setText(o.i18n.getText("signoutBtn_title"));this.attachPress(this.logout);this.setEnabled()};r.prototype.logout=function(){var e=true,t=false,s=new a({text:""});sap.ushell.Container.getGlobalDirty().done(function(r){e=false;if(t===true){s.exit();s=new a({text:""})}var p=o.i18n,g;if(r===sap.ushell.Container.DirtyState.DIRTY){g={message:p.getText("unsaved_data_warning_popup_message"),icon:u.WARNING,messageTitle:p.getText("unsaved_data_warning_popup_title")}}else{g={message:p.getText("signoutConfirmationMsg"),icon:u.QUESTION,messageTitle:p.getText("signoutMsgTitle")}}n.show(g.message,g.icon,g.messageTitle,[l.OK,l.CANCEL],function(e){if(e===l.OK){s.openLoadingScreen();s.showAppInfo(o.i18n.getText("beforeLogoutMsg"),null);sap.ushell.Container.logout()}},i.uid("confirm"))});if(e===true){s.openLoadingScreen();t=true}};r.prototype.setEnabled=function(t){if(!sap.ushell.Container){if(this.getEnabled()){e.warning("Disabling 'Logout' button: unified shell container not initialized",null,"sap.ushell.ui.footerbar.LogoutButton")}t=false}s.prototype.setEnabled.call(this,t)};return r});