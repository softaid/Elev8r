/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/library","sap/ui/core/Configuration"],function(e,a){"use strict";var t=e.ValueState;var s={apiVersion:2};s.render=function(e,i){var n=i.getPercentValue(),r=i.getWidth(),l=i.getHeight(),o=i._getCSSClassByPercentValue(n),c=i.getDisplayValue(),p=i.getShowValue(),g=i.getState(),d=i.getTextDirection().toLowerCase(),u=i.getId(),f=i.getEnabled(),y=a.getAnimationMode(),P=y!==a.AnimationMode.none&&y!==a.AnimationMode.minimal&&i.getDisplayAnimation();e.openStart("div",i);e.class("sapMPI");e.style("width",r);o.forEach(function(a){e.class(a)});e.style("height",l);if(i.getEnabled()){e.attr("tabindex","-1")}else{e.class("sapMPIBarDisabled")}if(i.getDisplayOnly()){e.class("sapMPIDisplayOnly")}e.accessibilityState(i,{role:"progressbar",valuemin:0,valuenow:n,valuemax:100,valuetext:i._getAriaValueText({sText:c,fPercent:n})});if(i.getTooltip_AsString()){e.attr("title",i.getTooltip_AsString())}e.openEnd();e.openStart("div",u+"-bar");e.class("sapMPIBar");if(f){switch(g){case t.Warning:e.class("sapMPIBarCritical");break;case t.Error:e.class("sapMPIBarNegative");break;case t.Success:e.class("sapMPIBarPositive");break;case t.Information:e.class("sapMPIBarInformation");break;default:e.class("sapMPIBarNeutral");break}}else{e.class("sapMPIBarNeutral")}if(P){e.style("transition-property","flex-basis");e.style("transition-duration",Math.abs(i._fPercentValueDiff)*20+"ms");e.style("transition-timing-function","linear")}e.style("flex-basis",n+"%");e.openEnd();s._renderDisplayText(e,d,"Left",u);if(p){e.text(c)}e.close("span");e.close("div");e.openStart("div",u+"-remainingBar");e.class("sapMPIBarRemaining");e.openEnd();s._renderDisplayText(e,d,"Right",u);if(p){e.text(c)}e.close("span");e.close("div");e.close("div")};s._renderDisplayText=function(e,a,t,s){e.openStart("span",s+"-text"+t);e.class("sapMPIText");e.class("sapMPIText"+t);if(a!=="inherit"){e.attr("dir",a)}e.openEnd()};return s},true);