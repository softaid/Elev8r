/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/apply/_internal/flexState/FlexState","sap/ui/fl/write/_internal/connectors/LrepConnector"],function(e,n){"use strict";var r={};r.getPersonalization=function(n,r,t){var i=e.getUI2Personalization(n);if(!i||!i[r]){return t?undefined:[]}if(!t){return i[r]}return i[r].filter(function(e){return e.itemName===t})[0]};r.setPersonalization=function(r){if(!r||!r.reference||!r.containerKey||!r.itemName||!r.content){return Promise.reject("not all mandatory properties were provided for the storage of the personalization")}return n.ui2Personalization.create({flexObjects:r}).then(function(n){var r=e.getUI2Personalization(n.response.reference);r[n.response.containerKey]=r[n.response.containerKey]||[];r[n.response.containerKey].push(n.response)})};r.deletePersonalization=function(e,t,i){if(!e||!t||!i){return Promise.reject("not all mandatory properties were provided for the storage of the personalization")}return n.ui2Personalization.remove({reference:e,containerKey:t,itemName:i}).then(function(){var n=r.getPersonalization(e,t);var o=r.getPersonalization(e,t,i);var a=n.indexOf(o);n.splice(a,1)})};return r});