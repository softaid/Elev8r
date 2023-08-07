/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./CardRenderer","../cards/Footer","../controls/ActionsToolbar","sap/ui/base/Interface","sap/ui/thirdparty/jquery","sap/ui/core/Core","sap/ui/integration/util/Manifest","sap/ui/integration/util/ServiceManager","sap/base/Log","sap/base/util/merge","sap/base/util/deepEqual","sap/base/util/each","sap/ui/integration/util/DataProviderFactory","sap/ui/model/json/JSONModel","sap/ui/integration/model/ObservableModel","sap/ui/model/resource/ResourceModel","sap/ui/integration/model/ContextModel","sap/base/util/LoaderExtensions","sap/f/CardBase","sap/f/library","sap/ui/integration/library","sap/ui/integration/util/Destinations","sap/ui/integration/util/LoadingProvider","sap/ui/integration/util/HeaderFactory","sap/ui/integration/util/ContentFactory","sap/ui/integration/util/BindingResolver","sap/ui/integration/formatters/IconFormatter","sap/ui/integration/cards/filters/FilterBarFactory","sap/ui/integration/cards/actions/CardActions","sap/ui/integration/util/CardObserver","sap/m/IllustratedMessage","sap/m/IllustratedMessageType","sap/m/IllustratedMessageSize","sap/ui/integration/util/Utils","sap/ui/integration/util/ParameterMap","sap/ui/performance/Measurement","sap/m/HBox","sap/m/library"],function(t,e,i,a,r,n,s,o,d,h,f,g,p,l,c,u,_,y,C,v,m,M,P,R,A,b,D,E,S,T,I,w,F,x,O,L,H,B){"use strict";var N={TYPE:"/sap.card/type",DATA:"/sap.card/data",HEADER:"/sap.card/header",HEADER_POSITION:"/sap.card/headerPosition",CONTENT:"/sap.card/content",FOOTER:"/sap.card/footer",SERVICES:"/sap.ui5/services",APP_TYPE:"/sap.app/type",PARAMS:"/sap.card/configuration/parameters",DESTINATIONS:"/sap.card/configuration/destinations",CSRF_TOKENS:"/sap.card/configuration/csrfTokens",FILTERS:"/sap.card/configuration/filters",ERROR_MESSAGES:"/sap.card/configuration/messages"};var k=["parameters","filters","paginator","form","messages","context","i18n"];var U=["visibleItems","allItems"];var V=v.cards.HeaderPosition;var W=m.CardArea;var j=m.CardDataMode;var q=m.CardDesign;var z="Card is destroyed!";var J=B.FlexRendertype;var Y=B.FlexJustifyContent;var K=B.FlexAlignItems;var G="module:";function $(){if(performance&&performance.now){return"Start since page load: "+performance.now()}return""}var Q=C.extend("sap.ui.integration.widgets.Card",{metadata:{library:"sap.ui.integration",properties:{referenceId:{type:"string",defaultValue:""},manifest:{type:"any",defaultValue:""},parameters:{type:"object",defaultValue:null},dataMode:{type:"sap.ui.integration.CardDataMode",group:"Behavior",defaultValue:j.Auto},baseUrl:{type:"sap.ui.core.URI",defaultValue:null},manifestChanges:{type:"object[]"},useMockData:{type:"boolean",defaultValue:false,visibility:"hidden"},design:{type:"sap.ui.integration.CardDesign",group:"Appearance",defaultValue:q.Solid}},aggregations:{actionDefinitions:{type:"sap.ui.integration.ActionDefinition",multiple:true,forwarding:{getter:"_getActionsToolbar",aggregation:"actionDefinitions"}},_header:{type:"sap.f.cards.IHeader",multiple:false,visibility:"hidden"},_filterBar:{type:"sap.ui.integration.cards.filters.FilterBar",multiple:false,visibility:"hidden"},_content:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},_footer:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},_extension:{type:"sap.ui.integration.Extension",multiple:false,visibility:"hidden"},_loadingProvider:{type:"sap.ui.core.Element",multiple:false,visibility:"hidden"}},events:{action:{allowPreventDefault:true,parameters:{actionSource:{type:"sap.ui.core.Control"},manifestParameters:{type:"object"},parameters:{type:"object"},type:{type:"sap.ui.integration.CardActionType"}}},configurationChange:{parameters:{changes:{type:"object"}}},manifestReady:{},manifestApplied:{},stateChanged:{}},associations:{host:{},openerReference:{visibility:"hidden"}}},renderer:t});Q.prototype.init=function(){C.prototype.init.call(this);this.setAggregation("_loadingProvider",new P);this._oIntegrationRb=n.getLibraryResourceBundle("sap.ui.integration");this._initModels();this._oContentFactory=new A(this);this._oCardObserver=new T(this);this._aSevereErrors=[];this._sPerformanceId="UI5 Integration Cards - "+this.getId()+"---";this._aActiveLoadingProviders=[];this._fnOnDataReady=function(){this._bDataReady=true}.bind(this);this._oLimitedInterface=new a(this,["getDomRef","setVisible","getParameters","getCombinedParameters","getManifestEntry","resolveDestination","request","refresh","refreshData","showMessage","getBaseUrl","getRuntimeUrl","getTranslatedText","getModel","triggerAction","addActionDefinition","removeActionDefinition","insertActionDefinition","getActionDefinition","indexOfActionDefinition","destroyActionDefinition","showLoadingPlaceholders","hideLoadingPlaceholders","showCard","hide","getOpener","validateControls"])};Q.prototype._initModels=function(){this.setModel(new l);k.forEach(function(t){var e;switch(t){case"context":e=new _;break;case"i18n":e=new u({bundle:this._oIntegrationRb});break;case"parameters":e=new l(O.getParamsForModel());break;case"messages":e=new l({hasErrors:false,hasWarnings:false,records:[]});break;default:e=new l;break}this.setModel(e,t)}.bind(this))};Q.prototype.clone=function(){var t=C.prototype.clone.apply(this,arguments);t._initModels();return t};Q.prototype._initReadyState=function(){this._aReadyPromises=[];this._awaitEvent("_dataReady");this._awaitEvent("_dataPassedToContent");this._awaitEvent("_headerReady");this._awaitEvent("_filterBarReady");this._awaitEvent("_contentReady");Promise.all(this._aReadyPromises).then(function(){this._onReady()}.bind(this));this.attachEventOnce("_dataReady",this._fnOnDataReady)};Q.prototype._clearReadyState=function(){this._bReady=false;this._bDataReady=false;this._aReadyPromises=[];this.detachEvent("_dataReady",this._fnOnDataReady)};Q.prototype.onBeforeRendering=function(){var t=this.getCardContent();if(t&&t.isA("sap.ui.integration.cards.BaseContent")){t.setDesign(this.getDesign())}if(this.getDataMode()!==j.Active){return}this.startManifestProcessing()};Q.prototype.onAfterRendering=function(){if(L.getActive()&&this._isManifestReady){if(!L.getMeasurement(this._sPerformanceId+"firstRenderingWithStaticData").end){L.end(this._sPerformanceId+"firstRenderingWithStaticData")}if(this._bDataReady&&!L.getMeasurement(this._sPerformanceId+"firstRenderingWithDynamicData").end){L.end(this._sPerformanceId+"firstRenderingWithDynamicData")}}var t=this.getDomRef();if(this.getDataMode()===j.Auto){this._oCardObserver.observe(t)}else{this._oCardObserver.unobserve(t)}};Q.prototype.startManifestProcessing=function(){if(!x.isBindingSyntaxComplex()){this._logSevereError("Cannot parse manifest. Complex binding syntax is not enabled - "+"To enable it, set the 'compatVersion' configuration option to 'edge', e.g.: data-sap-ui-compatVersion='edge' - "+"sap.ui.integration.widgets.Card")}if(this._bApplyManifest||this._bApplyParameters){this._clearReadyState();this._initReadyState()}var t=this.getManifest();if(t&&this._bApplyManifest){this._cleanupOldManifest();this.createManifest(t,this.getBaseUrl())}if(!this._bApplyManifest&&this._bApplyParameters){this._oCardManifest.processParameters(this._getContextAndRuntimeParams());this._applyManifestSettings()}this._bApplyManifest=false;this._bApplyParameters=false;this._refreshActionsMenu()};Q.prototype.setManifest=function(t){if(!f(this.getProperty("manifest"),t)){this.destroyActionDefinitions()}if(!t){this._destroyManifest()}this._bApplyManifest=true;this.setProperty("manifest",t);return this};Q.prototype.setManifestChanges=function(t){this.setProperty("manifestChanges",t);this._bApplyManifest=true;return this};Q.prototype.setParameters=function(t){this.setProperty("parameters",t);this._bApplyParameters=true;return this};Q.prototype.setParameter=function(t,e){var i=this.getParameters()||{};i[t]=e;this.setParameters(i);return this};Q.prototype.setHost=function(t){this.setAssociation("host",t);var e=this.getHostInstance();if(t&&!e){d.error("Host with id '"+t+"' is not available during card initialization. It must be available for host specific features to work.","Make sure that the host already exists, before assigning it to the card.","sap.ui.integration.widgets.Card");return this}this.getModel("context").setHost(e);if(this._oDestinations){this._oDestinations.setHost(e)}if(this._oDataProviderFactory){this._oDataProviderFactory.setHost(e)}if(e&&e.bUseExperimentalCaching){this.addStyleClass("sapFCardExperimentalCaching")}else{this.removeStyleClass("sapFCardExperimentalCaching")}return this};Q.prototype.createManifest=function(t,e){var i={};this._isManifestReady=false;if(typeof t==="string"){i.manifestUrl=t;t=null}if(this._oCardManifest){this._oCardManifest.destroy()}L.start(this._sPerformanceId+"initManifest","Load and initialize manifest. "+$());L.start(this._sPerformanceId+"firstRenderingWithStaticData","First rendering with static data (includes initManifest). "+$());L.start(this._sPerformanceId+"firstRenderingWithDynamicData","First rendering with dynamic card level data (includes firstRenderingWithStaticData). "+$());this._oCardManifest=new s("sap.card",t,e,this.getManifestChanges());this._oCardManifest.load(i).then(function(){if(this.isDestroyed()){throw new Error(z)}L.end(this._sPerformanceId+"initManifest");this._registerManifestModulePath();this._isManifestReady=true;this.fireManifestReady();return this._loadExtension()}.bind(this)).then(this._applyManifest.bind(this)).catch(function(t){if(t.message===z){return}this._logSevereError(t.message);this._applyManifest()}.bind(this))};Q.prototype._loadExtension=function(){var t=this._oCardManifest.get("/sap.card/extension"),e;if(!t){return null}if(t.startsWith(G)){e=t.replace(G,"")}else{e=this._oCardManifest.get("/sap.app/id").replace(/\./g,"/")+"/"+t}return new Promise(function(t,i){sap.ui.require([e],function(e){var i=new e;i._setCard(this,this._oLimitedInterface);this.setAggregation("_extension",i);t()}.bind(this),function(t){this._logSevereError("Failed to load "+e+". Check if the path is correct. Reason: "+t);i(t)}.bind(this))}.bind(this))};Q.prototype._logSevereError=function(t){d.error(t);this._aSevereErrors.push(t)};Q.prototype.getSevereErrors=function(){return this._aSevereErrors};Q.prototype.validateControls=function(){var t=this.getCardContent();if(t){t.validateControls()}return!this.getModel("messages").getProperty("/hasErrors")};Q.prototype._applyManifest=function(){var t=this._oCardManifest;if(!t.get("/sap.card")){this._logSevereError("There must be a 'sap.card' section in the manifest.")}if(t&&t.getResourceBundle()){this._enhanceI18nModel(t.getResourceBundle())}this.getModel("context").resetHostProperties();if(this._hasContextParams()){this._resolveContextParams().then(function(t){this._oContextParameters=t;this._applyManifestWithParams()}.bind(this));return}this._applyManifestWithParams()};Q.prototype._applyManifestWithParams=function(){var t=this._oCardManifest,e=this._getContextAndRuntimeParams();t.processParameters(e);this._prepareToApplyManifestSettings().then(function(){this._applyManifestSettings()}.bind(this))};Q.prototype._enhanceI18nModel=function(t){var e=this.getModel("i18n"),i;i=new u({bundle:t,enhanceWith:[this._oIntegrationRb]});this.setModel(i,"i18n");e.destroy()};Q.prototype._hasContextParams=function(){var t=this._oCardManifest.get(N.PARAMS),e,i;for(e in t){i=t[e].value;if(typeof i==="string"&&i.indexOf("{context>")!==-1){return true}}return false};Q.prototype._resolveContextParams=function(){var t=this.getModel("context"),e=this._oCardManifest.get(N.PARAMS),i={},a,r;for(a in e){r=e[a].value;if(typeof r==="string"&&r.indexOf("{context>")!==-1){i[a]=r}}b.resolveValue(i,this,"/");return t.waitForPendingProperties().then(function(){return b.resolveValue(i,this,"/")}.bind(this))};Q.prototype._getContextAndRuntimeParams=function(){var t=this._oContextParameters||{},e=this.getParameters()||{};return h(t,e)};Q.prototype._awaitEvent=function(t){this._aReadyPromises.push(new Promise(function(e){this.attachEventOnce(t,function(){e()})}.bind(this)))};Q.prototype.isReady=function(){return this._bReady};Q.prototype.refresh=function(){if(this.getDataMode()===j.Active){this._bApplyManifest=true;this.invalidate()}};Q.prototype.setFilterValue=function(t,e){var i=this._oCardManifest.get(N.FILTERS);if(!i.hasOwnProperty(t)){d.error("Filter with key '"+t+"' does not exist in the manifest section 'filters'.","sap.ui.integration.widgets.Card");return}var a=this.getAggregation("_filterBar");if(!a){return}var r=a._getFilters().find(function(e){return e.getKey()===t});r.setValueFromOutside(e)};Q.prototype.refreshData=function(){if(!this.isReady()){return}var t=this.getCardHeader(),e=this.getCardContent(),i=this.getAggregation("_filterBar");if(this._oDataProvider){this._oDataProvider.triggerDataUpdate()}if(t){t.refreshData()}if(e&&e.isA("sap.ui.integration.cards.BaseContent")){e.refreshData()}else{this._applyContentManifestSettings()}if(i){i.refreshData()}this.resetPaginator()};Q.prototype._refreshActionsMenu=function(){var t=this.getCardHeader(),e=this.getHostInstance(),i=this.getAggregation("_extension"),a=[];if(!t){return}if(e){a=a.concat(e.getActions()||[])}if(i){a=a.concat(i.getActions()||[])}if(f(a,this._getActionsToolbar()._aActions)){return}this._getActionsToolbar().initializeContent(this)};Q.prototype.exit=function(){C.prototype.exit.call(this);this._destroyManifest();this._oCardObserver.destroy();this._oCardObserver=null;this._oContentFactory=null;this._oIntegrationRb=null;this._aActiveLoadingProviders=null;this._oContentMessage=null;if(this._oActionsToolbar){this._oActionsToolbar.destroy();this._oActionsToolbar=null}};Q.prototype._destroyManifest=function(){if(this._oCardManifest){this._oCardManifest.destroy();this._oCardManifest=null}if(this._oServiceManager){this._oServiceManager.destroy();this._oServiceManager=null}if(this._oDestinations){this._oDestinations.destroy();this._oDestinations=null}if(this._oIconFormatter){this._oIconFormatter.destroy();this._oIconFormatter=null}if(this._oActionsToolbar){this._oActionsToolbar.destroy();this._oActionsToolbar=null}this.destroyAggregation("_header");this.destroyAggregation("_content");this.destroyAggregation("_filterBar");this.destroyAggregation("_footer");this._cleanupOldManifest()};Q.prototype._cleanupOldManifest=function(){this._aReadyPromises=null;this.getModel("filters").setData({});this.getModel("parameters").setData({});this.getModel("paginator").setData({});this._oContextParameters=null;this._deregisterCustomModels();this.destroyAggregation("_extension");if(this._oDataProviderFactory){this._oDataProviderFactory.destroy();this._oDataProviderFactory=null;this._oDataProvider=null}};Q.prototype._registerManifestModulePath=function(){if(!this._oCardManifest){return}this._sAppId=this._oCardManifest.get("/sap.app/id");if(this._sAppId){y.registerResourcePath(this._sAppId.replace(/\./g,"/"),this._oCardManifest.getUrl()||"/")}else{this._logSevereError("Card sap.app/id entry in the manifest is mandatory")}};Q.prototype.getManifest=function(){var t=this.getProperty("manifest");if(t&&typeof t==="object"){return r.extend(true,{},t)}return t};Q.prototype.getParameters=function(){var t=this.getProperty("parameters");if(t&&typeof t==="object"){return r.extend(true,{},t)}return t};Q.prototype.getCombinedParameters=function(){if(!this._isManifestReady){d.error("The manifest is not ready. Consider using the 'manifestReady' event.","sap.ui.integration.widgets.Card");return null}var t=this._oCardManifest.getProcessedParameters(this._getContextAndRuntimeParams()),e={},i;for(i in t){e[i]=t[i].value}return e};Q.prototype.getManifestEntry=function(t){if(!this._isManifestReady){d.error("The manifest is not ready. Consider using the 'manifestReady' event.","sap.ui.integration.widgets.Card");return null}return this._oCardManifest.get(t)};Q.prototype.getManifestRawJson=function(){if(!this._oCardManifest||!this._oCardManifest){d.error("The manifest is not ready. Consider using the 'manifestReady' event.","sap.ui.integration.widgets.Card");return{}}return this._oCardManifest.getInitialJson()};Q.prototype.getManifestWithMergedChanges=function(){if(!this._oCardManifest||!this._oCardManifest._oManifest){d.error("The manifest is not ready. Consider using the 'manifestReady' event.","sap.ui.integration.widgets.Card");return{}}return r.extend(true,{},this._oCardManifest._oManifest.getRawJson())};Q.prototype.resolveDestination=function(t){return this._oDestinations.getUrl(t)};Q.prototype.processDestinations=function(t){return this._oDestinations.process(t)};Q.prototype.showMessage=function(t,e){var i=this.getCardContent();if(i&&i.isA("sap.ui.integration.cards.BaseContent")){i.showMessage(t,e)}else{d.error("'showMessage' cannot be used before the card instance is ready. Consider using the event 'manifestApplied' event.","sap.ui.integration.widgets.Card")}};Q.prototype.getTranslatedText=function(t,e,i){var a=this.getModel("i18n"),r;if(!a){d.warning("There are no translations available. Either the i18n configuration is missing or the method is called too early.");return null}r=a.getResourceBundle();return r.getText(t,e,i)};Q.prototype.getDataProviderFactory=function(){if(!this._oDataProviderFactory){d.error("The DataProviderFactory instance is not ready yet. Consider using the event 'manifestApplied'.","sap.ui.integration.widgets.Card");return null}return this._oDataProviderFactory};Q.prototype.getRuntimeUrl=function(t){var e=this._sAppId,i,a=t&&t.trim().replace(/^\//,"");if(e===null){d.error("The manifest is not ready so the URL can not be resolved. Consider using the 'manifestReady' event.","sap.ui.integration.widgets.Card");return null}if(!e||t.startsWith("http://")||t.startsWith("https://")||t.startsWith("//")){return t}i=e.replace(/\./g,"/");return sap.ui.require.toUrl(i)+"/"+a};Q.prototype._prepareToApplyManifestSettings=function(){var t=this._oCardManifest.get(N.APP_TYPE),e=this.getAggregation("_extension");if(t&&t!=="card"){d.error("sap.app/type entry in manifest is not 'card'")}if(this._oDataProviderFactory){this._oDataProviderFactory.destroy()}this._oDestinations=new M({host:this.getHostInstance(),card:this,manifestConfig:this._oCardManifest.get(N.DESTINATIONS)});this._oIconFormatter=new D({card:this});return this.processDestinations(this._oCardManifest.getJson()).then(function(t){this._oCardManifest.setJson(t);this._oDataProviderFactory=new p({host:this.getHostInstance(),extension:e,csrfTokensConfig:this._oCardManifest.get(N.CSRF_TOKENS),card:this});this._registerCustomModels();if(e){e.onCardReady()}}.bind(this))};Q.prototype._applyManifestSettings=function(){this._setParametersModelData();this._applyServiceManifestSettings();this._applyFilterBarManifestSettings();this._applyDataManifestSettings();this._applyHeaderManifestSettings();this._applyContentManifestSettings();this._applyFooterManifestSettings();this.fireManifestApplied()};Q.prototype._setParametersModelData=function(){var t=O.getParamsForModel(),e={},i=this.getCombinedParameters(),a;for(a in i){if(U.indexOf(a)>=0){d.warning("The parameter name '"+a+"' is reserved for cards. Can not be used for creating custom parameter.")}else{e[a]={value:i[a]}}}this.getModel("parameters").setData(h(t,e))};Q.prototype._applyDataManifestSettings=function(){var t=this._oCardManifest.get(N.DATA),e;if(!t){this.fireEvent("_dataReady");this.fireEvent("_dataPassedToContent");return}this.bindObject(b.resolveValue(t.path||"/",this));if(this._oDataProvider){this._oDataProvider.destroy()}this._oDataProvider=this._oDataProviderFactory.create(t,this._oServiceManager);this.getAggregation("_loadingProvider").setDataProvider(this._oDataProvider);if(t.name){e=this.getModel(t.name)}else if(this._oDataProvider){e=new c;this.setModel(e)}if(!e){this.fireEvent("_dataReady");this.fireEvent("_dataPassedToContent");return}e.attachEvent("change",function(){var t=this.getCardContent();if(t&&!t.isA("sap.ui.integration.cards.BaseContent")){this._applyContentManifestSettings()}if(t&&t.isA("sap.ui.integration.cards.BaseContent")){t.onCardDataChanged()}this.fireEvent("_dataPassedToContent");this.onDataRequestComplete()}.bind(this));if(this._oDataProvider){this._oDataProvider.attachDataRequested(function(){this._setLoadingProviderState(true)}.bind(this));this._oDataProvider.attachDataChanged(function(t){this.fireEvent("_dataReady");e.setData(t.getParameter("data"))}.bind(this));this._oDataProvider.attachError(function(t){this.fireEvent("_dataReady");this.fireEvent("_dataPassedToContent");this._handleError("Data service unavailable. "+t.getParameter("message"));this.onDataRequestComplete()}.bind(this));this._oDataProvider.triggerDataUpdate()}else{this.fireEvent("_dataReady");this.fireEvent("_dataPassedToContent")}};Q.prototype._applyServiceManifestSettings=function(){var t=this._oCardManifest.get(N.SERVICES);if(!t){return}if(!this._oServiceManager){this._oServiceManager=new o(t,this)}};Q.prototype.getCardHeader=function(){return this.getAggregation("_header")};Q.prototype.getCardHeaderPosition=function(){if(!this._oCardManifest){return"Top"}return this._oCardManifest.get(N.HEADER_POSITION)||V.Top};Q.prototype.getCardContent=function(){return this.getAggregation("_content")};Q.prototype.getCardFooter=function(){return this.getAggregation("_footer")};Q.prototype._getActionsToolbar=function(){if(!this._oActionsToolbar){this._oActionsToolbar=new i;this._oActionsToolbar.setCard(this);this._oActionsToolbar.setEnabled(false)}return this._oActionsToolbar};Q.prototype._applyHeaderManifestSettings=function(){var t=this.getAggregation("_header");var e=this.createHeader();if(t){t.setToolbar(null);this.destroyAggregation("_header")}if(!e){this.fireEvent("_headerReady");return}e.attachEvent("_error",function(t){this._handleError(t.getParameter("message"))}.bind(this));this.setAggregation("_header",e);if(e.isReady()){this.fireEvent("_headerReady")}else{e.attachEvent("_ready",function(){this.fireEvent("_headerReady")}.bind(this))}};Q.prototype._applyFilterBarManifestSettings=function(){var t=this.createFilterBar();this.destroyAggregation("_filterBar");if(!t){this.fireEvent("_filterBarReady");return}t.attachEventOnce("_filterBarDataReady",function(){this.fireEvent("_filterBarReady")}.bind(this));this.setAggregation("_filterBar",t)};Q.prototype._applyFooterManifestSettings=function(){var t=this.createFooter();this.destroyAggregation("_footer");if(t){this.setAggregation("_footer",t)}this.fireEvent("_footerReady")};Q.prototype.getHostInstance=function(){var t=this.getHost();if(!t){return null}return n.byId(t)};Q.prototype._applyContentManifestSettings=function(){var t=this._oCardManifest.get(N.TYPE),e=this.getContentManifest(),i=t+" "+this._oRb.getText("ARIA_ROLEDESCRIPTION_CARD"),a;this.destroyAggregation("_content");this._ariaText.setText(i);if(!e){this.fireEvent("_contentReady");return}if(this._bIsPreviewMode){this.setAggregation("_content",this._getTemporaryContent(t,e));this.fireEvent("_contentReady");return}try{a=this.createContent({cardType:t,contentManifest:e,serviceManager:this._oServiceManager,dataProviderFactory:this._oDataProviderFactory,iconFormatter:this._oIconFormatter,appId:this._sAppId})}catch(t){this._handleError(t.message);return}this._setCardContent(a)};Q.prototype.createHeader=function(){var t=this._oCardManifest.get(N.HEADER),e=new R(this);return e.create(t,this._getActionsToolbar())};Q.prototype.createFilterBar=function(){var t=this._oCardManifest.get(N.FILTERS),e=new E(this);return e.create(t,this.getModel("filters"))};Q.prototype.createFooter=function(){var t=this._oCardManifest.get(N.FOOTER);if(!t){return null}return e.create(this,t)};Q.prototype.getContentManifest=function(){var t=this._oCardManifest.get(N.TYPE),e=t&&t.toLowerCase()==="component",i=this._oCardManifest.get(N.CONTENT),a=!!i;if(a&&!t){this._logSevereError("Card type property is mandatory!");return null}if(!a&&!e){return null}if(e){i=h(i,{componentManifest:this._oCardManifest.getJson()})}return i};Q.prototype.createContent=function(t){t.cardManifest=this._oCardManifest;return this._oContentFactory.create(t)};Q.prototype._setCardContent=function(t){t.attachEvent("_error",function(t){this._handleError(t.getParameter("logMessage"))}.bind(this));this.setAggregation("_content",t);if(t.isReady()){this.fireEvent("_contentReady")}else{t.attachReady(function(){this.fireEvent("_contentReady")}.bind(this))}};Q.prototype._preserveMinHeightInContent=function(t){t.addEventDelegate({onAfterRendering:function(){if(!this._oCardManifest){return}var e=this._oCardManifest.get(N.TYPE),i=this._oCardManifest.get(N.CONTENT),a=this._oContentFactory.getClass(e),r;if(!a){return}r=a.getMetadata().getRenderer().getMinHeight(i,t,this);if(this.getHeight()==="auto"){t.$().css({"min-height":r})}}},this)};Q.prototype._destroyPreviousContent=function(t){if(t&&!t.hasStyleClass("sapFCardErrorContent")){t.destroy()}};Q.prototype._handleError=function(t,e){if(!e){d.error(t,null,"sap.ui.integration.widgets.Card");this.fireEvent("_error",{message:t})}var i=this._oCardManifest.get(N.ERROR_MESSAGES),a=this._getIllustratedMessage(i,e),r=this._oCardManifest.get(N.CONTENT);if(r){this._destroyPreviousContent(this.getCardContent());this._preserveMinHeightInContent(a);this.setAggregation("_content",a);this.fireEvent("_contentReady")}else{this.getCardHeader().setAggregation("_error",a)}};Q.prototype._getIllustratedMessage=function(t,e){var i=w.UnableToLoad,a=F.Auto,r="",n=this._oIntegrationRb.getText("CARD_DATA_LOAD_ERROR"),s;if(e&&!t){switch(this._oCardManifest.get(N.TYPE)){case"List":case"Timeline":i=w.NoData;n=this._oIntegrationRb.getText("CARD_NO_ITEMS_ERROR_LISTS");break;case"Table":i=w.NoEntries;n=this._oIntegrationRb.getText("CARD_NO_ITEMS_ERROR_LISTS");break;case"Analytical":i=w.NoEntries;n=this._oIntegrationRb.getText("CARD_NO_ITEMS_ERROR_CHART");break;case"Object":i=w.NoData;n=this._oIntegrationRb.getText("CARD_NO_ITEMS_ERROR_CHART");break}}if(t&&t.noData&&e){var o=t.noData;i=w[o.type];a=F[o.size];n=o.title;s=o.description}this._oContentMessage={type:e?"noData":"error",illustrationType:i,illustrationSize:a,title:n,description:s};var d=new I({illustrationType:i,illustrationSize:a,title:n,enableVerticalResponsiveness:true,description:s?s:" "});if(this.getCardContent()&&this.getCardContent().getDomRef()){r=this.getCardContent().getDomRef().offsetHeight+"px"}var h=new H({renderType:J.Bare,justifyContent:Y.Center,alignItems:K.Center,width:"100%",height:r,items:[d]}).addStyleClass("sapFCardErrorContent");return h};Q.prototype.getContentMessage=function(){return this._oContentMessage};Q.prototype._getTemporaryContent=function(t,e){var i=this.getAggregation("_loadingProvider");var a;if(i){a=i.createContentPlaceholder(e,t,this);a.addEventDelegate({onAfterRendering:function(){if(!this._oCardManifest){return}var i=this._oContentFactory.getClass(t).getMetadata().getRenderer().getMinHeight(e,a,this);if(this.getHeight()==="auto"){a.$().css({"min-height":i})}}},this)}return a};Q.prototype.setDataMode=function(t){if(this._oDataProviderFactory&&t===j.Inactive){this._oDataProviderFactory.destroy();this._oDataProviderFactory=null}this.setProperty("dataMode",t);if(this.getProperty("dataMode")===j.Active){this.refresh()}return this};Q.prototype.loadDesigntime=function(){if(this._oDesigntime){return Promise.resolve(this._oDesigntime)}if(!this._oCardManifest){return new Promise(function(t,e){this.attachManifestReady(function(){this.loadDesigntime().then(t,e)}.bind(this))}.bind(this))}var t=this._oCardManifest.get("/sap.app/id");if(!t){return Promise.reject("App id not maintained")}return new Promise(function(t,e){var i=this._oCardManifest.get("/sap.card/configuration/editor");if(i===undefined){i=this._oCardManifest.get("/sap.card/designtime")}var a=this._oCardManifest.get("/sap.app/id").replace(/\./g,"/")+"/"+i;if(a){sap.ui.require([a],function(e){e=new e;e._readyPromise(this._oLimitedInterface,this).then(function(){this._oDesigntime=e;t(e)}.bind(this))}.bind(this),function(){e({error:a+" not found"})})}else{e()}}.bind(this))};Q.prototype.showLoadingPlaceholders=function(t){var e;switch(t){case W.Header:e=this.getCardHeader();if(e){e.showLoadingPlaceholders()}break;case W.Filters:e=this.getAggregation("_filterBar");if(e){e.showLoadingPlaceholders()}break;case W.Content:e=this.getCardContent();if(e&&e.isA("sap.ui.integration.cards.BaseContent")){e.showLoadingPlaceholders()}break;default:this.showLoadingPlaceholders(W.Header);this.showLoadingPlaceholders(W.Filters);this.showLoadingPlaceholders(W.Content);this._setLoadingProviderState(true)}return this};Q.prototype.hideLoadingPlaceholders=function(t){var e;switch(t){case W.Header:e=this.getCardHeader();if(e){e.hideLoadingPlaceholders()}break;case W.Filters:e=this.getAggregation("_filterBar");if(e){e.hideLoadingPlaceholders()}break;case W.Content:e=this.getCardContent();if(e&&e.isA("sap.ui.integration.cards.BaseContent")){e.hideLoadingPlaceholders()}break;default:this.hideLoadingPlaceholders(W.Header);this.hideLoadingPlaceholders(W.Filters);this.hideLoadingPlaceholders(W.Content);this._setLoadingProviderState(false)}return this};Q.prototype.isLoading=function(){var t=this.getAggregation("_loadingProvider");return t?t.getLoading():false};Q.prototype.getFocusDomRef=function(){var t=this.getCardHeader();if(t&&t.getFocusDomRef()){return t.getFocusDomRef()}return this.getDomRef()};Q.prototype.onDataRequestComplete=function(){var t=this.getCardContent();this.hideLoadingPlaceholders(W.Header);this.hideLoadingPlaceholders(W.Filters);if(t&&t.isA("sap.ui.integration.cards.BaseContent")&&t.isReady()){this.hideLoadingPlaceholders(W.Content)}this._setLoadingProviderState(false);this._fireContentDataChange()};Q.prototype.request=function(t){return this.processDestinations(t).then(function(t){return this._oDataProviderFactory.create({request:t}).setAllowCustomDataType(true).getData()}.bind(this))};Q.prototype.triggerAction=function(t){S.fireAction({card:this,host:this.getHostInstance(),action:t,parameters:t.parameters,source:this})};Q.prototype._setPreviewMode=function(t){this._bIsPreviewMode=t;if(t){this.addStyleClass("sapFCardPreview")}else{this.removeStyleClass("sapFCardPreview")}this._bApplyManifest=true;this.invalidate()};Q.prototype.getBindingNamespaces=function(){var t={},e=this.getAggregation("_extension");if(e){t.extension={formatters:e.getFormatters()}}return t};Q.prototype._registerCustomModels=function(){var t=this._oCardManifest.findDataSections();if(!this._aCustomModels){this._aCustomModels=[]}this._deregisterCustomModels();t.forEach(function(t){var e=t&&t.name;if(!e){return}if(k.indexOf(e)>-1){d.error("The model name (data section name) '"+e+"' is reserved for cards. Can not be used for creating a custom model.");return}if(this._aCustomModels.indexOf(e)>-1){d.error("The model name (data section name) '"+e+"' is already used.");return}this.setModel(new c,e);this._aCustomModels.push(e)}.bind(this))};Q.prototype._deregisterCustomModels=function(){if(!this._aCustomModels){return}this._aCustomModels.forEach(function(t){this.getModel(t).destroy();this.setModel(null,t)}.bind(this));this._aCustomModels=[]};Q.prototype._fireConfigurationChange=function(t){var e=this.getHostInstance();if(!this.isReady()){return}this.fireConfigurationChange({changes:t});if(e){e.fireCardConfigurationChange({card:this,changes:t})}};Q.prototype._fireStateChanged=function(){var t=this.getHostInstance();if(!this.isReady()){return}this.fireStateChanged();if(t){t.fireCardStateChanged({card:this})}};Q.prototype._fireDataChange=function(){this.fireEvent("_dataChange");this._fireStateChanged()};Q.prototype._fireContentDataChange=function(){this.fireEvent("_contentDataChange");this._fireDataChange()};Q.prototype._onReady=function(){this._bReady=true;this._setActionButtonsEnabled(true);this.fireEvent("_ready");this._fireStateChanged()};Q.prototype._setLoadingProviderState=function(t){var e=this.getAggregation("_loadingProvider");if(!e){return}e.setLoading(t);if(t){this.addActiveLoadingProvider(e)}else{this.removeActiveLoadingProvider(e)}};Q.prototype.addActiveLoadingProvider=function(t){if(!this.isReady()){return}if(!this.hasActiveLoadingProvider()){this._setActionButtonsEnabled(false)}if(this._aActiveLoadingProviders.indexOf(t)===-1){this._aActiveLoadingProviders.push(t)}};Q.prototype.removeActiveLoadingProvider=function(t){if(!this.isReady()){return}var e=this._aActiveLoadingProviders,i=e.indexOf(t);e.splice(i,1);if(!this.hasActiveLoadingProvider()){this._setActionButtonsEnabled(true)}};Q.prototype._setActionButtonsEnabled=function(t){var e=this.getAggregation("_footer");if(e){e.setEnabled(t)}if(this._oActionsToolbar){this._oActionsToolbar.setEnabled(t)}};Q.prototype.hasActiveLoadingProvider=function(){return this._aActiveLoadingProviders.length>0};Q.prototype.isSkeleton=function(){return false};Q.prototype.getContentPageSize=function(t){var e,i,a=this.getCardFooter();if(a&&a.getPaginator()){return a.getPaginator().getPageSize()}e=b.resolveValue(t.maxItems,this);if(e==null){return null}i=parseInt(e);if(isNaN(i)){d.error("Value for maxItems must be integer.");return null}return i};Q.prototype.getContentMinItems=function(t){var e=b.resolveValue(t.minItems,this),i;if(e==null){return this.getContentPageSize(t)}i=parseInt(e);if(isNaN(i)){d.error("Value for minItems must be integer.");return null}return i};Q.prototype.hasPaginator=function(){var t=this._oCardManifest.get(N.FOOTER);return t&&t.paginator};Q.prototype.resetPaginator=function(){if(this.hasPaginator()){this.getCardFooter().getPaginator().reset()}};Q.prototype.showCard=function(t){var e=this._createChildCard(t);t._cardId=e.getId();this.triggerAction({type:"ShowCard",parameters:t});return Promise.resolve(e)};Q.prototype.hide=function(){this.triggerAction({type:"HideCard"})};Q.prototype.getOpener=function(){var t=n.byId(this.getAssociation("openerReference"));if(!t){return null}return t._oLimitedInterface};Q.prototype._createChildCard=function(t){var e=t.manifest,i=t.baseUrl,a=t.data,r=this._createCard({width:t.width,host:this.getHostInstance(),parameters:t.parameters,referenceId:this.getReferenceId()});r.setAssociation("openerReference",this);if(a){g(a,function(t,e){var i=new l(e);r.setModel(i,t)})}if(typeof e==="string"){r.setManifest(this.getRuntimeUrl(e));if(i){r.setBaseUrl(i)}}else{r.setManifest(e);r.setBaseUrl(i||this.getRuntimeUrl("/"))}return r};Q.prototype._createCard=function(t){return new Q(t)};return Q});