// Copyright (c) 2009-2022 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/services/CommonDataModel","sap/ushell/appRuntime/ui5/AppRuntimeService"],function(e,s){"use strict";function t(t,o,n,a){e.call(this,t,o,n,a);this.getAllPages=function(){return new Promise(function(e){s.sendMessageToOuterShell("sap.ushell.services.CommonDataModel.getAllPages").done(e)})}}t.prototype=e.prototype;t.hasNoAdapter=e.hasNoAdapter;return t});