// Copyright (c) 2009-2022 SAP SE, All Rights Reserved
sap.ui.define(["sap/m/Button","sap/ushell/library","sap/ushell/ui/appfinder/PinButtonRenderer"],function(e,t,n){"use strict";var r=e.extend("sap.ushell.ui.appfinder.PinButton",{metadata:{library:"sap.ushell",properties:{selected:{type:"boolean",group:"Appearance",defaultValue:false}}},renderer:n});r.prototype.onAfterRendering=function(){this.$("inner").toggleClass("sapUshellPinSelected",this.getSelected())};return r});