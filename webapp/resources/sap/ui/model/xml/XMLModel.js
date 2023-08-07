/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/model/ClientModel","sap/ui/model/Context","./XMLListBinding","./XMLPropertyBinding","./XMLTreeBinding","sap/ui/util/XMLHelper","sap/base/Log","sap/base/util/each"],function(e,t,r,s,i,a,o,n){"use strict";var u=e.extend("sap.ui.model.xml.XMLModel",{constructor:function(t){e.apply(this,arguments);this.oNameSpaces=null;if(t&&t.documentElement){this.setData(t)}},metadata:{publicMethods:["setXML","getXML","setNameSpace"]}});u.prototype.setXML=function(e){var t=a.parse(e);if(t.parseError.errorCode!=0){var r=t.parseError;o.fatal("The following problem occurred: XML parse Error for "+r.url+" code: "+r.errorCode+" reason: "+r.reason+" src: "+r.srcText+" line: "+r.line+" linepos: "+r.linepos+" filepos: "+r.filepos);this.fireParseError({url:r.url,errorCode:r.errorCode,reason:r.reason,srcText:r.srcText,line:r.line,linepos:r.linepos,filepos:r.filepos})}this.setData(t)};u.prototype.getXML=function(){return a.serialize(this.oData)};u.prototype.setData=function(e){this.oData=e;this.checkUpdate()};u.prototype.loadData=function(e,t,r,s,i,a){var n=this;r=r!==false;s=s||"GET";i=i===undefined?this.bCache:i;this.fireRequestSent({url:e,type:s,async:r,headers:a,info:"cache="+i,infoObject:{cache:i}});this._ajax({url:e,async:r,cache:i,dataType:"xml",data:t,headers:a,type:s,success:function(t){if(!t){o.fatal("The following problem occurred: No data was retrieved by service: "+e)}n.setData(t);n.fireRequestCompleted({url:e,type:s,async:r,headers:a,info:"cache="+i,infoObject:{cache:i},success:true})},error:function(t,u,c){var p={message:u,statusCode:t.status,statusText:t.statusText,responseText:t.responseText};o.fatal("The following problem occurred: "+u,t.responseText+","+t.status+","+t.statusText);n.fireRequestCompleted({url:e,type:s,async:r,headers:a,info:"cache="+i,infoObject:{cache:i},success:false,errorobject:p});n.fireRequestFailed(p)}})};u.prototype.setNameSpace=function(e,t){if(!t){t=""}if(!this.oNameSpaces){this.oNameSpaces={}}this.oNameSpaces[t]=e};u.prototype.bindProperty=function(e,t,r){var i=new s(this,e,t,r);return i};u.prototype.bindList=function(e,t,s,i,a){var o=new r(this,e,t,s,i,a);return o};u.prototype.bindTree=function(e,t,r,s,a){var o=new i(this,e,t,r,s,a);return o};u.prototype.setProperty=function(e,t,r,s){var i=e.substring(0,e.lastIndexOf("/")+1),a=e.substr(e.lastIndexOf("/")+1);if(!this.resolve(e,r)){return false}if(!this.oData.documentElement){o.warning("Trying to set property "+e+", but no document exists.");return false}var n;if(a.indexOf("@")==0){n=this._getObject(i,r);if(n[0]){n[0].setAttribute(a.substr(1),t);this.checkUpdate(false,s);return true}}else{n=this._getObject(e,r);if(n[0]){n[0].textContent=t;this.checkUpdate(false,s);return true}}return false};u.prototype.getProperty=function(e,t){var r=this._getObject(e,t);if(r&&typeof r!="string"){r=r[0]?r[0].textContent:""}return r};u.prototype.getObject=function(e,t){var r=this._getObject(e,t);if(Array.isArray(r)){r=r[0]}return r};u.prototype._getObject=function(e,r){var s=this.oData.documentElement;if(!s){return null}var i=this.isLegacySyntax()?[s]:[];if(r instanceof t){i=this._getObject(r.getPath())}else if(r){i=[r]}if(!e){return i}var a=e.split("/"),o,n=0;if(!a[0]){i=s;n++}i=i.length==undefined?[i]:i;i=i[0]?i:null;while(i&&i.length>0&&a[n]){o=a[n];if(o.indexOf("@")==0){i=this._getAttribute(i[0],o.substr(1))}else if(o=="text()"){i=i[0]?i[0].textContent:""}else if(isNaN(o)){i=this._getChildElementsByTagName(i[0],o)}else{i=[i[o]]}n++}return i};u.prototype._getAttribute=function(e,t){if(!this.oNameSpaces||t.indexOf(":")==-1){return e.getAttribute(t)}var r=this._getNameSpace(t),s=this._getLocalName(t);return e.getAttributeNS(r,s)};u.prototype._getChildElementsByTagName=function(e,t){var r=e.childNodes,s=[];if(this.oNameSpaces){var i=this._getNameSpace(t),a=this._getLocalName(t),o;n(r,function(e,t){o=t.localName||t.baseName;if(t.nodeType==1&&o==a&&t.namespaceURI==i){s.push(t)}})}else{n(r,function(e,r){if(r.nodeType==1&&r.nodeName==t){s.push(r)}})}return s};u.prototype._getNameSpace=function(e){var t=e.indexOf(":"),r="";if(t>0){r=e.substr(0,t)}return this.oNameSpaces[r]};u.prototype._getLocalName=function(e){var t=e.indexOf(":"),r=e;if(t>0){r=e.substr(t+1)}return r};u.prototype._getDocNSPrefixes=function(){var e={},t=this.oData&&this.oData.documentElement;if(!t){return e}var r=t.attributes;n(r,function(t,r){var s=r.name,i=r.value;if(s=="xmlns"){e[i]=""}else if(s.indexOf("xmlns")==0){e[i]=s.substr(6)}});return e};u.prototype._resolve=function(e,t){var r=!e.startsWith("/"),s=e;if(r){if(t){s=t.getPath()+"/"+e}else{s=this.isLegacySyntax()?"/"+e:undefined}}return s};u.prototype.isList=function(e,t){return false};u.prototype._setMetaModel=function(e){this._oMetaModel=e};u.prototype.getMetaModel=function(){return this._oMetaModel};return u});