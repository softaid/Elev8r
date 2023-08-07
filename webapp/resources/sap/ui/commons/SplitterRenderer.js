/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/library"],function(e){"use strict";var t=e.Orientation;var i={};i.render=function(e,i){var r=i.getSplitterOrientation();var a=i.getSplitterPosition();var d;var l;var s;var n;a=a.substring(0,a.length-1);d=100-a;e.write("<div ");e.writeControlData(i);e.addClass("sapUiSplitter");e.addStyle("width",i.getWidth());e.addStyle("height",i.getHeight());e.writeStyles();e.writeClasses();e.write(">");e.write('<div id="'+i.getId()+'_firstPane" ');if(i.getShowScrollBars()){e.addStyle("overflow","auto")}else{e.addStyle("overflow","hidden")}if(r==t.Vertical){e.addClass("sapUiVSplitterFirstPane");e.addStyle("width",a+"%")}else if(r==t.Horizontal){e.addClass("sapUiHSplitterFirstPane");e.addStyle("height",a+"%")}e.writeClasses();e.writeStyles();e.write(">");l=i.getFirstPaneContent();s=l.length;for(n=0;n<s;n++){e.renderControl(l[n])}e.write("</div>");e.write('<div  id="'+i.getId()+'_SB" tabIndex="0" role="separator" title="'+i.getText("SPLITTER_MOVE")+'"');if(r==t.Vertical){if(i.getSplitterBarVisible()){e.addClass("sapUiVerticalSplitterBar")}else{e.addClass("sapUiVerticalSplitterBarHidden")}e.addStyle("width",0+"%")}else if(r==t.Horizontal){if(i.getSplitterBarVisible()){e.addClass("sapUiHorizontalSplitterBar")}else{e.addClass("sapUiHorizontalSplitterBarHidden")}e.addStyle("height",0+"%")}e.writeClasses();e.writeStyles();e.write(">");e.write("</div>");e.write('<div id="'+i.getId()+'_secondPane" ');if(i.getShowScrollBars()){e.addStyle("overflow","auto")}else{e.addStyle("overflow","hidden")}if(r==t.Vertical){e.addClass("sapUiVSplitterSecondPane");e.addStyle("width",d+"%")}else if(r==t.Horizontal){e.addClass("sapUiHSplitterSecondPane");e.addStyle("height",d+"%")}e.writeClasses();e.writeStyles();e.write(">");l=i.getSecondPaneContent();s=l.length;for(n=0;n<s;n++){e.renderControl(l[n])}e.write("</div>");e.write("</div>")};return i},true);