// Copyright (c) 2009-2022 SAP SE, All Rights Reserved
sap.ui.define([],function(){"use strict";function e(e,t){this.init.apply(this,arguments)}e.prototype={init:function(e,t,r,i){this.oAdapter=e;this.oContainerInterface=t;this.appSearchDeferred=null},getAppSearch:function(){if(this.appSearchPromise){return this.appSearchPromise}this.appSearchPromise=new Promise(function(e){sap.ui.getCore().loadLibrary("sap.esh.search.ui",{async:true}).then(function(){sap.ui.require(["sap/esh/search/ui/appsearch/AppSearch"],function(t){e(new t({}))})})});return this.appSearchPromise},isSearchAvailable:function(){return this.oAdapter.isSearchAvailable()},prefetch:function(){return this.getAppSearch().then(function(e){return e.prefetch()})},queryApplications:function(e){e.top=e.top||10;e.skip=e.skip||0;return this.getAppSearch().then(function(t){return t.search(e).then(function(t){return{totalResults:t.totalCount,searchTerm:e.searchTerm,getElements:function(){return t.tiles}}})})}};e.hasNoAdapter=false;return e},true);