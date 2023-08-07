/*!
 * SAPUI5
 * (c) Copyright 2009-2022 SAP SE. All rights reserved.
 */
sap.ui.define(["sap/base/Log","sap/ui/support/library"],function(e,t){"use strict";var i={id:"smartLinkCalculationOfSemanticAttributes",audiences:[t.Audiences.Application],categories:[t.Categories.Usability],minversion:"1.56",async:true,title:"SmartLink: calculation of semantic attributes",description:"This check is for information purposes only providing information which might be helpful in case of intent navigation issues",resolution:"See explanation for a specific semantic attribute marked with 🔴 in the details section",resolutionurls:[{text:"API Reference: SmartLink",href:"https://ui5.sap.com/#/api/sap.ui.comp.navpopover.SmartLink"}],check:function(i,a,n,r){var o=e.getLevel();e.setLevel(e.Level.INFO);var s=[];var c=[];var l=[];n.getElementsByClassName("sap.ui.comp.navpopover.SmartLink").forEach(function(e){if(l.indexOf(e.getSemanticObject())>-1){return}l.push(e.getSemanticObject());var t=e.getNavigationPopoverHandler();c.push(t);s.push(t._initModel())});Promise.all(s).then(function(a){for(var n=0;n<a.length;n++){var s=c[n];var l=s._getLogFormattedText();if(l){i.addIssue({severity:t.Severity.Low,details:"Below you can see detailed information regarding semantic attributes which have been calculated for one or more semantic objects defined in a SmartLink control. Semantic attributes are used to create the URL parameters.\nAdditionally you can see all links containing the URL parameters.\n"+l,context:{id:s.getId()}})}}e.setLevel(o);r()})}};return[i]},true);