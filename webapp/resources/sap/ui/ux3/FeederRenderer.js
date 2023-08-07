/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/theming/Parameters","sap/base/security/encodeXML"],function(e,t,r){"use strict";var i=e.FeederType;var a={};a.render=function(e,r){e.write("<div");e.writeControlData(r);e.addClass("sapUiFeeder");switch(r.getType()){case i.Medium:e.addClass("sapUiFeederMedium");break;case i.Comment:e.addClass("sapUiFeederComment");break;default:e.addClass("sapUiFeederLarge");break}e.writeClasses();e.write(">");e.write("<img id="+r.getId()+"-thumb");var a=r.getThumbnailSrc();if(!a){a=t._getThemeImage("_sap_ui_ux3_Feeder_PersonPlaceholder")}e.writeAttributeEscaped("src",a);e.writeClasses();e.write(">");e.write("<div id="+r.getId()+'-input contenteditable="true" class="sapUiFeederInput" >');if(r.getText()==""){e.write(this.getEmptyTextInfo(r))}else{e.writeEscaped(r.getText(),true)}e.write("</div>");r.initSendButton();e.renderControl(r.oSendButton);e.write("</div>")};a.getEmptyTextInfo=function(e){return"<span class='sapUiFeederEmptyText'>"+r(e.getPlaceholderText()||e.rb.getText("FEED_EMPTY_FEEDER"))+"</span>"};return a},true);