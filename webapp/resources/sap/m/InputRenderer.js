/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/InvisibleText","sap/ui/core/Renderer","./InputBaseRenderer","sap/m/library","sap/ui/core/Configuration"],function(e,t,i,s,a){"use strict";var n=s.InputType;var r=t.extend(i);r.apiVersion=2;r.addOuterClasses=function(e,t){e.class("sapMInput");if(t.getDescription()){e.class("sapMInputWithDescription")}};r.writeInnerAttributes=function(e,t){var i=t.getShowSuggestion();e.attr("type",t.getType().toLowerCase());if(t.getType()==n.Number){e.attr("step","any")}if(t.getType()==n.Number&&a.getRTL()){e.attr("dir","ltr").style("text-align","right")}if(i||t.getShowValueStateMessage()){e.attr("autocomplete","off")}if(!t.getEnabled()&&t.getType()=="Password"||t.getShowSuggestion()&&t.isMobileDevice()||t.getValueHelpOnly()&&t.getEnabled()&&t.getEditable()&&t.getShowValueHelp()){e.attr("readonly","readonly")}};r.writeOuterAttributes=function(e,t){e.attr("data-ui5-accesskey",t.getProperty("accesskey"))};r.addInnerClasses=function(e,t){};r.writeDescription=function(e,t){e.openStart("div").class("sapMInputDescriptionWrapper").style("width","calc(100% - "+t.getFieldWidth()+")").openEnd();e.openStart("span",t.getId()+"-descr").class("sapMInputDescriptionText").openEnd().text(t.getDescription()).close("span");e.close("div")};r.writeDecorations=function(e,t){if(t.getDescription()){this.writeDescription(e,t)}if(a.getAccessibility()){if(t.getShowSuggestion()&&t.getEnabled()&&t.getEditable()){e.openStart("span",t.getId()+"-SuggDescr").class("sapUiPseudoInvisibleText").attr("role","status").attr("aria-live","polite").openEnd().close("span")}}};r.addWrapperStyles=function(e,t){e.style("width",t.getDescription()?t.getFieldWidth():"100%")};r.getAriaDescribedBy=function(t){var s=i.getAriaDescribedBy.apply(this,arguments);function a(e){s=s?s+" "+e:e}if(t.getDescription()){a(t.getId()+"-descr")}if(t.getShowValueHelp()&&t.getEnabled()&&t.getEditable()){a(e.getStaticId("sap.m","INPUT_VALUEHELP"));if(t.getValueHelpOnly()){a(e.getStaticId("sap.m","INPUT_DISABLED"))}}return s};r.getAriaRole=function(e){return""};r.getAccessibilityState=function(e){var t=e.getShowSuggestion();var s=i.getAccessibilityState.apply(this,arguments);if(t){s["haspopup"]="listbox"}return s};return r},true);