// Copyright (c) 2009-2022 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/library","sap/ushell/resources"],function(e,t){"use strict";var p=e.AppType;var r={};r.getDisplayName=function(e){switch(e){case p.OVP:return t.i18n.getText("Apptype.OVP");case p.SEARCH:return t.i18n.getText("Apptype.SEARCH");case p.FACTSHEET:return t.i18n.getText("Apptype.FACTSHEET");case p.COPILOT:return t.i18n.getText("Apptype.COPILOT");case p.URL:return t.i18n.getText("Apptype.URL");default:return t.i18n.getText("Apptype.APP")}};return r});