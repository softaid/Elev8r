// Copyright (c) 2009-2022 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/adapters/cdm/util/AppForInbound","sap/base/Log","sap/ushell/adapters/cdm/v3/utilsCdm"],function(i,e,t){"use strict";var a={_VISUALIZATION_TYPES:{STATIC_TILE:"sap.ushell.StaticAppLauncher",DYNAMIC_TILE:"sap.ushell.DynamicAppLauncher"}};a.getVisualizations=function(i,e){var a={};Object.keys(i).forEach(function(n){var s=i[n];var r;if(s.isCustomTile){r=s.vizType}else if(s.indicatorDataSource){r=this._VISUALIZATION_TYPES.DYNAMIC_TILE}else{r=this._VISUALIZATION_TYPES.STATIC_TILE}var p={vizType:r,vizConfig:{"sap.app":{title:s.title,subTitle:s.subTitle,info:s.info,tags:{keywords:s.keywords}},"sap.ui":{icons:{icon:s.icon}},"sap.flp":{tileSize:s.size,indicatorDataSource:s.indicatorDataSource,numberUnit:s.numberUnit,target:t.toTargetFromHash(s.url,e)}}};if(s.isCustomTile){p.vizConfig["sap.flp"]._instantiationData=s._instantiationData}a[n]=p}.bind(this));return a};a.getApplications=function(t){return Object.keys(t).reduce(function(a,n){var s=t[n],r=s.permanentKey||s.id;try{a[r]=i.get(n,s)}catch(i){e.error("Unable to dereference app '"+n+"' of CDM page.");a[n]={}}return a},{})};a.getVizTypes=function(i){return Object.keys(i).reduce(function(e,t){var a=i[t].id;if(!e[a]){e[a]={"sap.app":{id:a,type:"chipVizType"},"sap.flp":{vizOptions:i[t].vizOptions,tileSize:i[t].tileSize}}}return e},{})};return a});