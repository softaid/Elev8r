// Copyright (c) 2009-2022 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/appRuntime/ui5/renderers/fiori2/Renderer","sap/m/Button","sap/base/util/ObjectPath"],function(e,t,n){"use strict";function s(){n.set("sap.ushell.ui.shell.ShellHeadItem",function(t){var n=this;Object.keys(t).forEach(function(e){n[e]=t[e];n["get"+e[0].toUpperCase()+e.slice(1)]=function(){return t[e]}});e.createShellHeadItem(t)})}return new s});