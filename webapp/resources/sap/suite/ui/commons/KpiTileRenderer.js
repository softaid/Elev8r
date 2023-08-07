/*!
 * 
		SAP UI development toolkit for HTML5 (SAPUI5)
		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(function(){"use strict";var e={};e.render=function(e,t){var i=t.getTooltip_AsString();e.write("<div");e.writeControlData(t);if(i){e.writeAttributeEscaped("title",i)}e.addClass("sapSuiteKTile");e.writeClasses();e.write(">");e.write("<div");e.addClass("sapSuiteKTileBorder");e.writeClasses();e.write(">");e.write("</div>");e.write("<div");e.writeAttribute("id",t.getId()+"-value");e.addClass("sapSuiteKTileValue");e.addClass("sapSuiteKTileStatus"+t.getValueStatus());if(t.getDoubleFontSize()){e.addClass("sapSuiteKTileValueLargeText")}else{e.addClass("sapSuiteKTileValueSmallText")}e.writeClasses();if(!i){e.writeAttributeEscaped("title",t.getValueScale()?t.getValue()+", "+t.getValueScale():t.getValue())}e.write(">");e.writeEscaped(t.getValue());if(t.getValueScale()){e.write("<span");e.writeAttribute("id",t.getId()+"-value-scale");e.addClass("sapSuiteKTileScale");e.writeClasses();e.write(">");e.writeEscaped(t.getValueScale());e.write("</span>")}e.write("</div>");e.write("<div");e.writeAttribute("id",t.getId()+"-desc");e.addClass("sapSuiteKTileDesc");e.writeClasses();var a="";if(t.getValueUnit()){a+=t.getValueUnit()+", "}a+=t.getDescription();if(!i){e.writeAttributeEscaped("title",a)}e.write(">");e.writeEscaped(a);e.write("</div>");e.write("</div>")};return e},true);