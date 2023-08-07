/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/util/openWindow","sap/ui/fl/registry/Settings","sap/ui/fl/apply/_internal/flexState/ManifestUtils","sap/ui/fl/write/_internal/fieldExtensibility/ABAPExtensibilityVariantFactory","sap/ui/fl/write/_internal/fieldExtensibility/ServiceValidation"],function(e,n,t,i,r){"use strict";var u=null;var a=null;function l(){if(!a){return i.getInstance(u).then(function(e){a=e;return e})}return Promise.resolve(a)}var o={};o.getTexts=function(){return l(u).then(function(e){return e.getTexts().then(function(e){return e})})};o.isExtensibilityEnabled=function(e){var i=t.getFlexReferenceForControl(e);if(!i){return Promise.resolve(false)}return n.getInstance(i).then(function(e){return e.isModelS()})};o.getExtensionData=function(){return l(u).then(function(e){return e.getExtensionData().then(function(e){return e})})};o.onControlSelected=function(e){if(e!==u){u=e;a=null}};o.onTriggerCreateExtensionData=function(){return l().then(function(n){return n.getNavigationUri().then(function(n){if(n){e(n,"_blank")}})})};o.isServiceOutdated=function(e){return r.isServiceOutdated(e)};o.setServiceValid=function(e){r.setServiceValid(e)};o.setServiceInvalid=function(e){r.setServiceInvalid(e)};return o},true);