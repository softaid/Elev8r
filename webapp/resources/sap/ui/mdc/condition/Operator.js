/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
*/
sap.ui.define(["sap/ui/base/Object","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/ui/model/ParseException","sap/base/Log","sap/base/util/ObjectPath","sap/base/util/merge","sap/base/util/deepEqual","./Condition","sap/ui/mdc/enum/ConditionValidated","sap/base/strings/escapeRegExp"],function(e,t,a,r,i,s,o,n,l,p,u){"use strict";var f=sap.ui.getCore().getLibraryResourceBundle("sap.ui.mdc");sap.ui.getCore().attachLocalizationChanged(function(){f=sap.ui.getCore().getLibraryResourceBundle("sap.ui.mdc")});var h=e.extend("sap.ui.mdc.condition.Operator",{constructor:function(t){e.apply(this,arguments);if(!t){throw new Error("Operator configuration missing")}if(!t.name){i.warning("Operator configuration expects a name property")}if(!t.filterOperator&&!t.getModelFilter){throw new Error("Operator configuration for "+t.name+" needs a default filter operator from sap.ui.model.FilterOperator or the function getModelFilter")}this.name=t.name;if(t.alias){this.alias=t.alias}this.filterOperator=t.filterOperator;this.valueTypes=t.valueTypes;this.paramTypes=t.paramTypes;this.displayFormats=t.displayFormats;var a="operators."+this.name;var r=a+".longText";var s=a+".tokenText";this.longText=t.longText||d(r)||"";this.tokenText=t.tokenText||d(s)||"";if(this.longText===r){this.longText=this.tokenText.replace(/\{0\}/g,"X").replace(/\{1\}/g,"Y")}if(this.tokenText===s){this.tokenText=this.longText}if(this.tokenText){var o;var n;if(t.tokenParse){n=u(this.tokenText);this.tokenParse=t.tokenParse.replace(/#tokenText#/g,n);for(var l=0;l<this.valueTypes.length;l++){var p=this.paramTypes?this.paramTypes[l]:this.valueTypes[l];this.tokenParse=this.tokenParse.replace(new RegExp("\\\\\\$"+l+"|"+l+"\\\\\\$"+"|"+"\\\\\\{"+l+"\\\\\\}","g"),p)}o=this.tokenParse}else{o=u(this.tokenText)}this.tokenParseRegExp=new RegExp(o,"i");if(t.tokenFormat){n=this.tokenText;this.tokenFormat=t.tokenFormat.replace(/\#tokenText\#/g,n)}else{this.tokenFormat=this.tokenText}}if(t.format){this.format=t.format}if(t.parse){this.parse=t.parse}if(t.validate){this.validate=t.validate}if(t.getModelFilter){this.getModelFilter=t.getModelFilter}if(t.isEmpty){this.isEmpty=t.isEmpty}if(t.createControl){this.createControl=t.createControl}if(t.getCheckValue){this.getCheckValue=t.getCheckValue}if(t.getValues){this.getValues=t.getValues}if(t.checkValidated){this.checkValidated=t.checkValidated}if(t.additionalInfo!==undefined){this.additionalInfo=t.additionalInfo}this.exclude=!!t.exclude;this.validateInput=!!t.validateInput;if(t.group){this.group=t.group}else{this.group={id:!this.exclude?"1":"2"};if(!this.group.text){this.group.text=f.getText("VALUEHELP.OPERATOR.GROUP"+this.group.id)}}}});h.ValueType={Self:"self",Static:"static",SelfNoParse:"selfNoParse"};function d(e,t){var a=e+(t?"."+t:""),r;r=f.getText(a,undefined,true);if(r===a||r===undefined){if(t){r=f.getText(e,undefined,true);if(r===a||r===undefined){r=e}}else{r=a}}return r}h.prototype.getTypeText=function(e,t){return d(e,t)};h.prototype.getModelFilter=function(e,r,i,s,o){var n=e.values[0];var l;var u;var f=r.split(",");if(Array.isArray(n)&&f.length>1){n=n[0];r=f[0];u=new t({path:f[1],operator:a.EQ,value1:e.values[0][1]})}if(u&&n===undefined){l=u;u=undefined}else if(!this.valueTypes[1]){if(!s&&e.validated===p.Validated){s=true}l=new t({path:r,operator:this.filterOperator,value1:n,caseSensitive:s===false?false:undefined})}else{var h=e.values[1];if(Array.isArray(h)&&f.length>1){h=h[0]}l=new t({path:r,operator:this.filterOperator,value1:n,value2:h,caseSensitive:s===false?false:undefined})}if(u){l=new t({filters:[l,u],and:true})}if(e.inParameters){var d=[l];for(var v in e.inParameters){if(v.startsWith("conditions/")){d.push(new t({path:v.slice(11),operator:a.EQ,value1:e.inParameters[v]}))}}if(d.length>1){l=new t({filters:d,and:true})}}return l};h.prototype.isEmpty=function(e,t){var a=false;if(e){for(var r=0;r<this.valueTypes.length;r++){if(this.valueTypes[r]!==h.ValueType.Static){var i=e.values[r];if(i===null||i===undefined||i===""){a=true;break}}}}return a};h.prototype.format=function(e,t,a,r,i){var s=e.values;var o=this.valueTypes.length;var n=r&&o===1?"{0}":this.tokenFormat;for(var l=0;l<o;l++){if(this.valueTypes[l]!==h.ValueType.Static){if(this.valueTypes[l]!==h.ValueType.Self){t=this._createLocalType(this.valueTypes[l],t)}var p=s[l];if(p===undefined||p===null){p=t?t.parseValue("","string"):""}var u=this._formatValue(p,t,i);n=n.replace(new RegExp("\\$"+l+"|"+l+"\\$"+"|"+"\\{"+l+"\\}","g"),u)}}return n};h.prototype._formatValue=function(e,t,a){var r;if(t){if(t.isA("sap.ui.model.CompositeType")&&t.getUseInternalValues()&&Array.isArray(e)&&a){e=o([],e);for(var i=0;i<e.length;i++){if(a[i]){var s=a[i].getModelFormat();if(s&&typeof s.parse==="function"){e[i]=s.parse(e[i])}}}}r=t.formatValue(e,"string")}else{r=e}return r};h.prototype.parse=function(e,t,a,r,s){var o=this.getValues(e,a,r);var n;if(o){n=[];for(var l=0;l<this.valueTypes.length;l++){if(this.valueTypes[l]&&[h.ValueType.Self,h.ValueType.Static].indexOf(this.valueTypes[l])===-1){t=this._createLocalType(this.valueTypes[l],t)}try{if(this.valueTypes[l]!==h.ValueType.Static){var p;if(this.valueTypes[l]){p=this._parseValue(o[l],t,s)}else{p=o[l]}n.push(p)}}catch(e){i.warning(e.message);throw e}}}return n};h.prototype._parseValue=function(e,t,a){if(e===undefined){return e}var r;if(t&&t.isA("sap.ui.model.CompositeType")&&t._aCurrentValue&&t.getParseWithValues()){r=t._aCurrentValue}var i=t?t.parseValue(e,"string",r):e;if(t&&t.isA("sap.ui.model.CompositeType")&&Array.isArray(i)&&(t._aCurrentValue||t.getUseInternalValues()&&a)){for(var s=0;s<i.length;s++){if(i[s]===undefined&&t._aCurrentValue){i[s]=t._aCurrentValue[s]===undefined?null:t._aCurrentValue[s]}else if(t.getUseInternalValues()&&a&&a[s]){var o=a[s].getModelFormat();if(o&&typeof o.format==="function"){i[s]=o.format(i[s])}}}}return i};h.prototype.validate=function(e,t,a,r){var i=this.valueTypes.length;for(var s=0;s<i;s++){if(this.valueTypes[s]&&this.valueTypes[s]!==h.ValueType.Static){if([h.ValueType.Self,h.ValueType.Static].indexOf(this.valueTypes[s])===-1){t=this._createLocalType(this.valueTypes[s],t)}if(e.length<s+1){throw new Error("value "+s+" for operator "+this.getName()+" missing")}if(t){var n=e[s];if(n===undefined||n===null){n=t?t.parseValue("","string"):""}if(t.isA("sap.ui.model.CompositeType")&&Array.isArray(n)&&a){n=o([],n);for(var l=0;l<n.length;l++){if(a[l]){if(r===undefined||l===r){a[l].validateValue(n[l])}if(t.getUseInternalValues()){var p=a[l].getModelFormat();if(p&&typeof p.parse==="function"){n[l]=p.parse(n[l])}}}}}t.validateValue(n)}}}};h.prototype._createLocalType=function(e,t){if(!this._aTypes){this._aTypes=[]}var a;var r;var i;var l;if(e===h.ValueType.SelfNoParse){a=t.getMetadata().getName();r=o({},t.getFormatOptions());i=o(t.getConstraints())}else if(typeof e==="string"){a=e}else if(e&&typeof e==="object"){a=e.name;r=e.formatOptions;i=e.constraints}for(var p=0;p<this._aTypes.length;p++){var u=this._aTypes[p];if(u.name===a&&n(u.formatOptions,r)&&n(u.constraints,i)){l=u.type;break}}if(!l){var f=s.get(a||"");l=new f(r,i);l._bCreatedByOperator=true;if(e===h.ValueType.SelfNoParse){l.parseValue=function(e,t){f.prototype.parseValue.apply(this,arguments);return e};l.validateValue=function(e){var t=f.prototype.parseValue.apply(this,[e,"string"]);f.prototype.validateValue.apply(this,[t])};l.formatValue=function(e,t){f.prototype.formatValue.apply(this,arguments);return e}}this._aTypes.push({name:a,formatOptions:r,constraints:i,type:l})}return l};h.prototype.test=function(e){return this.tokenParseRegExp.test(e)};h.prototype.getValues=function(e,t,a){var r=e.match(this.tokenParseRegExp);var i;if(r||a&&e){i=[];for(var s=0;s<this.valueTypes.length;s++){var o;if(r){o=r[s+1]}else if(a){if(s>0){break}o=e}i.push(o)}}return i};h.prototype.getCondition=function(e,t,a,i,s){if(this.test(e)||i&&e&&this.hasRequiredValues()){var o=this.parse(e,t,a,i,s);if(o.length==this.valueTypes.length||this.valueTypes[0]===h.ValueType.Static||o.length===1&&this.valueTypes.length===2&&!this.valueTypes[1]){var n=l.createCondition(this.name,o);this.checkValidated(n);return n}else{throw new r("Parsed value don't meet operator")}}return null};h.prototype.isSingleValue=function(){if(this.valueTypes.length>1&&this.valueTypes[1]){return false}return true};h.prototype.getCheckValue=function(e){if(this.valueTypes[0]&&this.valueTypes[0]===h.ValueType.Static){return{}}else{return{values:e.values}}};h.prototype.hasRequiredValues=function(){if(this.valueTypes[0]&&this.valueTypes[0]!==h.ValueType.Static){return true}else{return false}};h.prototype.compareConditions=function(e,t){var a=false;if(e.operator===this.name&&e.operator===t.operator){var r=this.getCheckValue(e);var i=this.getCheckValue(t);if(e.inParameters&&t.inParameters){r.inParameters=e.inParameters;i.inParameters=t.inParameters}if(e.outParameters&&t.outParameters){r.outParameters=e.outParameters;i.outParameters=t.outParameters}if(e.payload||t.payload){r.payload=e.payload;i.payload=t.payload}if(e.validated&&t.validated){r.validated=e.validated;i.validated=t.validated}var s=JSON.stringify(r);var o=JSON.stringify(i);if(s===o){a=true}}return a};h.prototype.checkValidated=function(e){e.validated=p.NotValidated};return h});