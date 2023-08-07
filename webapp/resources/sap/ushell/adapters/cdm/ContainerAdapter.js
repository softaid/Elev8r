// Copyright (c) 2009-2022 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/utils","sap/ushell/User","sap/ushell/System","sap/ui/thirdparty/URI","sap/base/Log","sap/base/util/ObjectPath","sap/ui/thirdparty/jquery"],function(e,t,r,i,o,s,n){"use strict";var a=o.getLogger("sap/ushell/adapters/cdm/ContainerAdapter",o.Level.INFO);var u=function(u,l,f){var c="/sap/public/bc/icf/logoff",d=P(f.config,c),m=s.get("systemProperties.logoutMethod",f.config)||"GET",p=s.get("systemProperties.csrfTokenUrl",f.config),g=v(f.config),h=b(u,f.config),y=w(f.config);function P(e,t){if(e.systemProperties&&e.systemProperties.logoutUrl){return e.systemProperties.logoutUrl}return t}function v(e){var r,i=e.userProfile;if(i){r=T(i.defaults,e.userProfilePersonalization,i.metadata)}return new t(r||R())}function b(e,t){var i=t.systemProperties,o=e.getAlias(),s=e.getPlatform(),n=e.getBaseUrl(),a,u,l,f,c,d,m;if(i){o=i.alias||o;s=i.platform||s;a=i.SID;u=i.client;l=i.productName;f=i.productVersion;c=i.systemName;d=i.systemRole;m=i.tenantRole}return new r({alias:o,platform:s,baseUrl:n,system:a,client:u,productName:l,productVersion:f,systemName:c,systemRole:d,tenantRole:m})}function T(e,t,r){var i=n.extend(R(),e,t);i.bootTheme=i.bootTheme||{theme:i.theme,root:""};delete i.theme;if(r){if(r.editablePropterties){i.setThemePermitted=r.editablePropterties.indexOf("theme")>-1;i.setAccessibilityPermitted=r.editablePropterties.indexOf("accessibility")>-1;i.setContentDensityPermitted=r.editablePropterties.indexOf("contentDensity")>-1}if(r.ranges){i.ranges=r.ranges}}return i}function R(){return{setThemePermitted:false,setAccessibilityPermitted:false,setContentDensityPermitted:false}}function w(e){var t=e&&e.systemProperties&&e.systemProperties.sessionKeepAlive;if(!t){return null}if(!t.url){a.error("Mandatory parameter 'url' missing in 'sessionKeepAlive' configuration.");return null}if(t.method!=="HEAD"&&t.method!=="GET"){t.method="HEAD"}return t}this._getLogoutUrl=function(){return d};this._setDocumentLocation=function(e){document.location=e};this._setWindowLocation=function(e){window.location.href=e};this.getSystem=function(){return h};this.getUser=function(){return g};this.load=function(){return n.when()};this.getCurrentUrl=function(){return window.location.href};this.logout=function(t){var r;if(!t){throw new Error("Not implemented")}if(e.hasNativeLogoutCapability()){r=new i(this._getLogoutUrl()).absoluteTo(this.getCurrentUrl()).search("").toString();e.getPrivateEpcm().doLogOff(r)}else{return this.logoutRedirect()}return n.when()};this.logoutRedirect=function(){var e=h.adjustUrl(this._getLogoutUrl()),t=new n.Deferred,r=this;if(m==="POST"){o.info("performing logout from system via POST",undefined,"sap.ushell.adapters.cdm.ContainerAdapter::logoutRedirect");n.ajax({type:"HEAD",url:p,headers:{"X-CSRF-Token":"Fetch"},success:function(i,s,a){n.ajax({type:"POST",url:e,headers:{"X-CSRF-Token":a.getResponseHeader("X-CSRF-Token")},success:function(e){r._setWindowLocation(e);t.resolve()},error:function(){o.error("Logging out via POST failed",undefined,"sap.ushell.adapters.cdm.ContainerAdapter::logoutRedirect");t.resolve()}})},error:function(){o.error("fetching X-CSRF-Token for logout via POST failed for system: "+h.getAlias(),undefined,"sap.ushell.adapters.cdm.ContainerAdapter::logoutRedirect");t.resolve()}})}else{o.info("performing logout from system via GET (redirect)",undefined,"sap.ushell.adapters.cdm.ContainerAdapter::logoutRedirect");this._setDocumentLocation(e);t.resolve()}return t.promise()};this.sessionKeepAlive=function(){if(!y){return}var e=new XMLHttpRequest;e.open(y.method,y.url,true);e.onreadystatechange=function(){if(this.readyState===4){a.debug("Server session was extended")}};e.send()};this._getSessionKeepAliveConfig=function(){return y}};return u},false);