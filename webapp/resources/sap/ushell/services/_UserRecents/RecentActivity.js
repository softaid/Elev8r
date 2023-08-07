// Copyright (c) 2009-2022 SAP SE, All Rights Reserved
sap.ui.define(["./UserRecentsBase","sap/ushell/library","sap/ushell/EventHub","sap/ui/Device","sap/base/Log"],function(e,t,i,r,n){"use strict";var s=t.AppType;var a=e.extend("sap.ushell.services.RecentActivity",{constructor:function(t){e.call(this,"RecentActivity",t,a._compareItems)}});a.MAX_DAYS=30;a.ITEM_COUNT=30;a._compareItems=function(e,t){if(e.appType===t.appType){if(e.appType!==s.APP){return e.url===t.url}return e.appId===t.appId}else if(e.appType===s.APP||t.appType===s.APP){return e.appId===t.appId&&e.url===t.url}return false};a.prototype._updateIfAlreadyIn=function(t,i){return this.oRecentActivities.recentUsageArray.some(function(r){var n;if(a._compareItems(r.oItem,t)){if(t.appType===r.oItem.appType||t.appType!==s.APP){jQuery.extend(r.oItem,t);r.iTimestamp=i;r.oItem.timestamp=i;r.mobile=undefined;r.tablet=undefined;r.desktop=undefined;if(t.appType===r.oItem.appType||t.appType!==s.APP&&r.oItem.appType!==s.APP){r.aUsageArray[r.aUsageArray.length-1]+=1;r.iCount+=1}this.oRecentActivities.recentUsageArray.sort(e._itemSorter)}n=true}else{n=false}return n}.bind(this))};a.prototype._insertNew=function(e,t,i){e.timestamp=t;if(i){e.icon=i}var r={oItem:e,iTimestamp:t,aUsageArray:[1],iCount:1,mobile:undefined,tablet:undefined,desktop:undefined};if(this.oRecentActivities.recentUsageArray.length===this.iMaxItems){this.oRecentActivities.recentUsageArray.pop()}this.oRecentActivities.recentUsageArray.unshift(r)};a.prototype.newItem=function(e){var t=new jQuery.Deferred;var r=Date.now();var n=this.getActivityIcon(e.appType,e.icon);var s;var a=this.getDayFromDateObj(new Date);this._load().done(function(o){this.oRecentActivities=this.getRecentActivitiesFromLoadedData(o);if(a!==this.oRecentActivities.recentDay){this.addNewDay();this.oRecentActivities.recentDay=a}s=this._updateIfAlreadyIn(e,r);if(!s){this._insertNew(e,r,n)}this._save(this.oRecentActivities).done(function(){i.emit("newUserRecentsItem",this.oRecentActivities);t.resolve()}.bind(this)).fail(function(){t.reject()})}.bind(this));return t.promise()};a.prototype.getActivityIcon=function(e,t){switch(e){case s.SEARCH:return t||"sap-icon://search";case s.COPILOT:return t||"sap-icon://co";case s.URL:return t||"sap-icon://internet-browser";default:return t||"sap-icon://product"}};a.prototype.clearAllActivities=function(){var e=new jQuery.Deferred;this._save([]).done(function(){i.emit("userRecentsCleared",Date.now());e.resolve()}).fail(function(){e.reject()});return e.promise()};a.prototype.getRecentItemsHelper=function(e){var t=new jQuery.Deferred;var i;var n;var s;var a=false;var o=[];var c=[];var u=this.getDayFromDateObj(new Date);if(r.system.desktop){s="desktop"}else if(r.system.tablet){s="tablet"}else{s="mobile"}this._load().done(function(r){this.oRecentActivities=this.getRecentActivitiesFromLoadedData(r);var p=false;var f;if(u!==this.oRecentActivities.recentDay){this.addNewDay();this.oRecentActivities.recentDay=u;p=true}for(i=0;i<this.oRecentActivities.recentUsageArray.length&&!a;i++){n=this.oRecentActivities.recentUsageArray[i];if(n[s]===undefined){if(!(n.oItem.url[0]==="#")){c.push(n.oItem.url)}else if(n.oItem.url.indexOf("?")>-1){f=n.oItem.url.substring(n.oItem.url.indexOf("?"));if(f.indexOf("&/")>-1){f=f.substring(0,f.indexOf("&/"))}o.push(n.oItem.appId+f)}else{o.push(n.oItem.appId)}}else{a=true}}if(c.length>0){var v;for(i=0;i<this.oRecentActivities.recentUsageArray.length;i++){if(!(this.oRecentActivities.recentUsageArray[i].oItem.url[0]==="#")){v=this.oRecentActivities.recentUsageArray[i];v[s]=true}}if(o.length<=0){this._save(this.oRecentActivities).done(function(){var i=this._getRecentItemsForDevice(s,this.oRecentActivities,e);t.resolve(i)}.bind(this)).fail(function(){t.reject()})}}if(o.length>0){sap.ushell.Container.getServiceAsync("CrossApplicationNavigation").then(function(r){r.isIntentSupported(o).done(function(r){a=false;for(i=0;i<this.oRecentActivities.recentUsageArray.length&&!a;i++){n=this.oRecentActivities.recentUsageArray[i];if(n[s]===undefined){f="";if(n.oItem.url.indexOf("?")>-1){f=n.oItem.url.substring(n.oItem.url.indexOf("?"));if(f.indexOf("&/")>-1){f=f.substring(0,f.indexOf("&/"))}}var o=r[n.oItem.appId+f];n[s]=!!(o&&o.supported)}else if(n.oItem.url[0]==="#"){a=true}}this._save(this.oRecentActivities).done(function(){var i=this._getRecentItemsForDevice(s,this.oRecentActivities,e);t.resolve(i)}.bind(this)).fail(function(){t.reject()})}.bind(this)).fail(function(e){t.reject(e)})}.bind(this))}else if(o.length<=0&&c.length<=0){if(p){this._save(this.oRecentActivities).done(function(){var i=this._getRecentItemsForDevice(s,this.oRecentActivities,e);t.resolve(i)}.bind(this)).fail(function(){t.reject()})}else{var l=this._getRecentItemsForDevice(s,this.oRecentActivities,e);t.resolve(l)}}}.bind(this)).fail(function(){t.reject()});return t.promise()};a.prototype._getRecentItemsForDevice=function(e,t,i){var r=[];var n=0;var s;for(var a=0;a<t.recentUsageArray.length&&(!i||n<i);a++){s=t.recentUsageArray[a];if(s[e]){r.push(s);n++}}return r};a.prototype.getRecentItems=function(){var e=new jQuery.Deferred;this.getRecentItemsHelper(a.ITEM_COUNT).done(function(t){e.resolve(jQuery.map(t,function(e){return e.oItem}))}).fail(function(){e.reject()});return e.promise()};a.prototype.getFrequentItems=function(){var e=new jQuery.Deferred;this.getRecentItemsHelper().done(function(t){var i;var r=0;var n=[];var s;var o=t[0]?new Date(t[0].iTimestamp):undefined;var c;for(i=0;i<t.length&&r<a.MAX_DAYS;i++){s=t[i];if(s.iCount>1){n.push(s)}c=new Date(s.iTimestamp);if(o.toDateString()!==c.toDateString()){r++;o=c}}n.sort(function(e,t){return t.iCount-e.iCount});n=n.slice(0,a.ITEM_COUNT);e.resolve(jQuery.map(n,function(e){return e.oItem}))}).fail(function(){e.reject()});return e.promise()};a.prototype.addNewDay=function(){var e,t;for(e=0;e<this.oRecentActivities.recentUsageArray.length;e++){if(this.oRecentActivities.recentUsageArray[e].aUsageArray){t=this.oRecentActivities.recentUsageArray[e].aUsageArray}else{t=[];this.oRecentActivities.recentUsageArray[e].aUsageArray=t;this.oRecentActivities.recentUsageArray[e].iCount=0}t[t.length]=0;if(t.length>a.MAX_DAYS){this.oRecentActivities.recentUsageArray[e].iCount-=t[0];t.shift()}}};a.prototype.getDayFromDateObj=function(e){return e.getUTCFullYear()+"/"+(e.getUTCMonth()+1)+"/"+e.getUTCDate()};a.prototype.getRecentActivitiesFromLoadedData=function(e){var t;if(Array.isArray(e)){t={recentDay:null,recentUsageArray:e}}else{t=e||{recentDay:null,recentUsageArray:[]}}t.recentUsageArray=(t.recentUsageArray||[]).filter(function(e){var t=e&&e.oItem&&e.oItem.url;if(!t){n.error("FLP Recent Activity",e,"is not valid. The activity is removed from the list.")}return t});return t};return a});