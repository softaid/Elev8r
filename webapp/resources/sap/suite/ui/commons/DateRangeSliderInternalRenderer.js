/*!
 * 
		SAP UI development toolkit for HTML5 (SAPUI5)
		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/ui/commons/library","sap/ui/commons/RangeSliderRenderer","sap/ui/core/Renderer"],function(e,i,t){"use strict";var r=t.extend(i);r.renderBufferDivForBubbles=function(e,i){if(i.getShowBubbles()){e.write('<DIV id="'+i.getId()+'-bubbleBuffer"');e.addStyle("height","40px");e.writeStyles();e.write(">");e.write("</DIV>")}};r.renderEnclosingDiv=function(e,i){e.write("<DIV");e.writeControlData(i);e.addClass("sapUiSli");this.controlAdditionalCode(e,i);if(i.getTooltip_AsString()){e.writeAttributeEscaped("title",i.getTooltip_AsString())}if(!i.getVertical()&&i.getWidth()){e.writeAttribute("style","width:"+i.getWidth()+";")}if(!i.getEnabled()){e.addClass("sapUiSliDsbl")}else if(!i.getEditable()){e.addClass("sapUiSliRo")}else{e.addClass("sapUiSliStd")}if(!i.getVertical()){e.addClass("sapUiSliHori")}if(i.getShowBubbles()){e.addClass("sapUiSuiteDRSliBub")}e.writeClasses();e.write(">")};r.renderEnclosingDivEnd=function(e,i){e.write("</DIV>")};r.renderAriaGripTooltip=function(e,i){if(i.getTooltip_AsString()){e.write('<SPAN id="'+i.getId()+'-Descr"');e.addStyle("visibility","hidden");e.addStyle("display","none");e.writeStyles();e.write(">");e.writeEscaped(i.getTooltip_AsString());e.write("</SPAN>")}};r.renderBubbles=function(e,i){if(!i.getShowBubbles()){return}e.write('<div id="'+i.getId()+'-bubble"');e.addClass("sapSuiteUiCommonsDateRangeSliderBubble");e.writeClasses();e.write(">");e.write("<div");e.addClass("sapSuiteUiCommonsDateRangeSliderBubbleLbl");e.writeClasses();e.write(">");e.renderControl(i._oBubble);e.write("</div>");e.write("</div>");e.write('<div id="'+i.getId()+'-bubble2"');e.addClass("sapSuiteUiCommonsDateRangeSliderBubble");e.writeClasses();e.write(">");e.write("<div");e.addClass("sapSuiteUiCommonsDateRangeSliderBubbleLbl");e.writeClasses();e.write(">");e.renderControl(i._oBubble2);e.write("</div>");e.write("</div>")};r.renderSliderBar=function(e,i){e.write("<DIV");e.writeAttribute("id",i.getId()+"-right");e.write('class="sapUiSliR"> <DIV');e.writeAttribute("id",i.getId()+"-left");e.write('class="sapUiSliL"> <DIV');e.writeAttribute("id",i.getId()+"-bar");e.write('class="sapUiSliBar">')};r.renderSliderBarEnd=function(e,i){e.write("</DIV></DIV></DIV>")};r.renderTicksAndLabels=function(e,i){var t=false;if(i.getLabels()&&i.getLabels().length>0){t=true}if(i.getTotalUnits()>0||t){var r=i.getTotalUnits();if(t){r=i.getLabels().length-1}for(var s=0;s<=r;s++){e.write("<DIV");e.writeAttribute("id",i.getId()+"-tick"+s);e.write('class="sapUiSliTick" ');e.write("></DIV>");if(i.getStepLabels()){e.write("<DIV");e.writeAttribute("id",i.getId()+"-text"+s);switch(s){case 0:e.write('class="sapUiSliText sapUiSliTextLeft" >');break;case r:e.write('class="sapUiSliText sapUiSliTextRight" >');break;default:e.write('class="sapUiSliText" >');break}if(t){e.write(i.getLabels()[s])}else{var a=(i.getMax()-i.getMin())/r;e.write(i.getMin()+s*a)}e.write("</DIV>")}}}};r.renderHighlightBar=function(e,i){e.write("<DIV");e.writeAttribute("id",i.getId()+"-hili");e.write('class="sapUiSliHiLi"></DIV>')};r.renderGrip=function(e,i){e.write("<DIV");e.writeAttribute("id",i.getId()+"-grip");if(i.getEnabled()){e.writeAttribute("tabIndex","0")}else{e.writeAttribute("tabIndex","-1")}if(i.getPinGrip()){e.write('class="sapUiSliGrip sapUiSliGripPin"')}else{e.write('class="sapUiSliGrip"')}e.writeAccessibilityState(i,{role:"slider",controls:i.getId()+"-grip",orientation:"horizontal",valuemin:i.getFormattedDate(i.getMinDate()),valuemax:i.getFormattedDate(i.getValue2Date()),valuenow:i.getValue(),valuetext:i.getFormattedDate(i.getValueDate()),disabled:!i.getEditable()||!i.getEnabled(),describedby:i.getTooltip_AsString()?i.getId()+"-Descr "+i.getAriaDescribedBy().join(" "):undefined,live:"assertive"});e.write(">&#9650;</DIV>")};r.renderGrip2=function(e,i){e.write("<DIV");e.writeAttribute("id",i.getId()+"-grip2");if(i.getEnabled()){e.writeAttribute("tabIndex","0")}else{e.writeAttribute("tabIndex","-1")}if(i.getPinGrip2()){e.write('class="sapUiSliGrip sapUiSliGripPin"')}else{e.write('class="sapUiSliGrip"')}e.writeAttribute("title",i.getValue2());e.writeAccessibilityState(i,{role:"slider",controls:i.getId()+"-grip2",orientation:"horizontal",valuemin:i.getFormattedDate(i.getValueDate()),valuemax:i.getFormattedDate(i.getMaxDate()),valuenow:i.getValue2(),valuetext:i.getFormattedDate(i.getValue2Date()),disabled:!i.getEditable()||!i.getEnabled(),describedby:i.getTooltip_AsString()?i.getId()+"-Descr "+i.getAriaDescribedBy().join(" "):undefined,live:"assertive"});e.write(">&#9650;</DIV>")};r.render=function(e,i){if(!i.getVisible()){return}this.renderEnclosingDiv(e,i);this.renderBufferDivForBubbles(e,i);this.renderAriaGripTooltip(e,i);this.renderBubbles(e,i);this.renderSliderBar(e,i);this.renderTicksAndLabels(e,i);this.renderHighlightBar(e,i);if(i.getPinGrip()||i.getPinGrip()&&i.getPinGrip2()||!i.getPinGrip()&&!i.getPinGrip2()){this.renderGrip(e,i);this.renderGrip2(e,i)}else if(i.getPinGrip2()){this.renderGrip2(e,i);this.renderGrip(e,i)}this.renderSliderBarEnd(e,i);this.renderEnclosingDivEnd(e,i)};return r},true);