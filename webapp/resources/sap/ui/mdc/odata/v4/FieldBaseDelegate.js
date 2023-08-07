/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/mdc/field/FieldBaseDelegate","sap/ui/mdc/odata/v4/TypeUtil"],function(e,t){"use strict";var a=Object.assign({},e);a.getDataTypeClass=function(e,a){return t.getDataTypeClassName(a)};a.getBaseType=function(e,a,i,n){return t.getBaseType(a,i,n)};a.initializeTypeFromBinding=function(e,t,a){var i={};if(t&&(t.isA("sap.ui.model.odata.type.Unit")||t.isA("sap.ui.model.odata.type.Currency"))&&Array.isArray(a)&&a.length>2&&a[2]!==undefined){t.formatValue(a,"string");i.bTypeInitialized=true;i.mCustomUnits=a[2]}return i};a.initializeInternalUnitType=function(e,t,a){if(a&&a.mCustomUnits!==undefined){t.formatValue([null,null,a.mCustomUnits],"string")}};a.enhanceValueForUnit=function(e,t,a){if(a&&a.bTypeInitialized&&t.length===2){t.push(a.mCustomUnits);return t}};a.getDefaultFieldValueHelpDelegate=function(e){return{name:"sap/ui/mdc/odata/v4/FieldValueHelpDelegate",payload:{}}};a.getDefaultValueHelpDelegate=function(e){return{name:"sap/ui/mdc/odata/v4/ValueHelpDelegate",payload:{}}};a.getTypeUtil=function(e){return t};return a});