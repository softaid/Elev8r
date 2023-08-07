/*!
 * SAPUI5
 * (c) Copyright 2009-2022 SAP SE. All rights reserved.
 */
sap.ui.define(["sap/ui/core/library","sap/m/library","sap/m/Dialog","sap/m/Button","sap/m/ProgressIndicator","sap/m/Text","sap/m/MessageBox","sap/ui/core/format/NumberFormat"],function(e,t,n,a,s,i,r,o){"use strict";var u=e.ValueState;var f=t.DialogType;var g=t.ButtonType;var l=sap.ui.getCore().getLibraryResourceBundle("sap.ui.export",true);function T(){return new Promise(function(e,t){var r;l.then(function(t){var o=new a({text:t.getText("CANCEL_BUTTON"),press:function(){if(r&&r.oncancel){r.oncancel()}r.finish()}});var g=new s({displayAnimation:false,displayValue:"0 / 0",showValue:true,height:"0.75rem",state:u.Information});g.addStyleClass("sapUiMediumMarginTop");var l=new i({text:t.getText("PROGRESS_FETCHING_MSG")});r=new n({title:t.getText("PROGRESS_TITLE"),type:f.Message,contentWidth:"500px",content:[l,g],endButton:o,ariaLabelledBy:[l]});r.updateStatus=function(e,n,a){var s;if(typeof e==="string"&&e){a=e;l.setText(a)}if(!isNaN(e)&!isNaN(n)){s=e/n*100}if(s>=100){g.setState(u.Success);o.setEnabled(false);l.setText(a||t.getText("PROGRESS_BUNDLE_MSG"))}g.setPercentValue(s);if(isNaN(n)||n<=0||n>=1048575){n="∞"}if(!isNaN(e)){g.setDisplayValue(""+e+" / "+n)}};r.finish=function(){r.close();r.destroy()};e(r)})})}function c(e){return new Promise(function(t,s){l.then(function(r){var l,T,c,p,R,x;R=o.getIntegerInstance({groupingEnabled:true});l=false;p="";if(!e.rows){p=r.getText("NO_COUNT_WARNING_MSG")}else{x=R.format(e.rows);if(e.sizeLimit){p=r.getText("SIZE_WARNING_MSG",[x,e.columns])}if(e.cutOff){p+=p===""?"":"\n\n";p+=r.getText("MSG_WARNING_CUT_OFF",[x])}}c=new i({text:p});T=new n({title:r.getText("PROGRESS_TITLE"),type:f.Message,state:u.Warning,content:c,ariaLabelledBy:c,endButton:new a({type:g.Transparent,text:r.getText("CANCEL_BUTTON"),press:function(){T.close()}}),beginButton:new a({type:g.Emphasized,text:r.getText("EXPORT_BUTTON"),press:function(){l=true;T.close()}}),afterClose:function(){T.destroy();l?t():s()}});T.open()})})}function p(e){if(!e){return}if(e instanceof Error){e=e.message}l.then(function(t){var n=e||t.getText("PROGRESS_ERROR_DEFAULT");if(e.toLowerCase().indexOf("invalid string length")>-1){n=t.getText("MSG_ERROR_OUT_OF_MEMORY")}r.error(n,{title:t.getText("PROGRESS_ERROR_TITLE")})})}return{getProgressDialog:T,showErrorMessage:p,showWarningDialog:c}},true);