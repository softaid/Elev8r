/*!
 * Copyright (c) 2009-2022 SAP SE, All Rights Reserved
 */
sap.ui.define(["sap/ui/core/Control","sap/f/GridContainer","sap/f/GridContainerSettings","sap/ushell/services/_VisualizationInstantiation/VizInstanceCdm","sap/ushell/services/_VisualizationInstantiation/VizInstance","sap/ushell/services/_VisualizationInstantiation/VizInstanceLink","sap/ushell/adapters/cdm/v3/_LaunchPage/readUtils","sap/ushell/adapters/cdm/v3/utilsCdm","sap/f/GridContainerItemLayoutData","sap/ushell/adapters/cdm/v3/_LaunchPage/readVisualizations","sap/base/util/ObjectPath","sap/m/VBox","sap/m/Button","sap/m/library","sap/ushell/library","sap/ushell/EventHub"],function(t,e,i,a,n,o,s,r,p,l,c,u,d,g,m,f){"use strict";var v=g.TileSizeBehavior;var z=m.DisplayFormat;var h=g.LoadState;var y=t.extend("sap.ushell.components.workPageBuilder.controls.WorkPageSection",{metadata:{library:"sap.ushell",properties:{sizeBehavior:{type:"sap.m.TileSizeBehavior",group:"Misc",defaultValue:v.Responsive},editMode:{type:"boolean",group:"Misc",defaultValue:false}},aggregations:{visualizations:{type:"sap.ushell.services._VisualizationInstantiation.VizInstance",multiple:true,singularName:"visualization"},_sectionVbox:{type:"sap.m.VBox",multiple:false,visibility:"hidden"},_addVizInstanceButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"}},events:{deleteVisualization:{}}},renderer:{apiVersion:2,render:function(t,e){var i=e.getEditMode();var a=e.getAggregation("_sectionVbox");t.openStart("div",e);t.class("sapCepWorkPageSection");t.openEnd();t.renderControl(a);var n=a.getItems()[0].getItems();n.forEach(function(t){t.setEditable(i)});if(i){t.openStart("div");t.class("sapCepColumnToolbar");t.openEnd();t.renderControl(e.getAddVizInstanceButton());t.close("div")}t.close("div")}}});y.prototype.init=function(){t.prototype.init.apply(this,arguments);this.setAggregation("_sectionVbox",this._createSectionVbox())};y.prototype._createSectionVbox=function(){return new u(this.getId()+"--sapCepWorkPageSectionVBox",{items:[this._createGridContainer()]})};y.prototype._createAddVizInstanceButton=function(){return new d({text:this.getModel("i18n").getResourceBundle().getText("WorkPage.Section.AddVizInstanceButtonText"),visible:true,press:function(){this.fireEvent("addApplications")}.bind(this)})};y.prototype.getAddVizInstanceButton=function(){if(!this.getAggregation("_addVizInstanceButton")){this.setAggregation("_addVizInstanceButton",this._createAddVizInstanceButton())}return this.getAggregation("_addVizInstanceButton")};y.prototype.onAfterRendering=function(){this.getAggregation("_sectionVbox").getItems()[0]._resize()};y.prototype.bindAggregation=function(e,i){if(e==="visualizations"){i.factory=this.visualizationFactory.bind(this);this.getAggregation("_sectionVbox").getItems()[0].bindAggregation("items",i);return this}t.prototype.bindAggregation.call(this,e,i);return this};y.prototype.visualizationFactory=function(t,e){var i=e.getObject();var a=e.getModel().getProperty("/data/Visualizations/"+i.Visualization.Id);var n=this._instantiateVisualization(a);n.attachPress(this.onVisualizationPress,this);return n};y.prototype.onVisualizationPress=function(t){var e=t.getParameter("scope");var i=t.getParameter("action");if(e==="Actions"&&i==="Remove"){this.fireEvent("deleteVisualization",t)}};y.prototype._createGridContainer=function(){var t=this.getSizeBehavior()===v.Small?"4.375rem":"5rem";return new e(this.getId()+"--sapCepWorkPageSectionGridContainer",{containerQuery:true,minHeight:"0",visible:true,layout:new i({gap:"1rem",rowSize:t,columnSize:t}),layoutXS:new i({gap:"1rem",columns:2,rowSize:"5rem",columnSize:"5rem"}),layoutS:new i({gap:"1rem",columns:4,rowSize:t,columnSize:t}),layoutM:new i({gap:"1rem",columns:0,rowSize:t,columnSize:t}),layoutL:new i({gap:"1rem",columns:12,rowSize:t,columnSize:t}),layoutXL:new i({gap:"1rem",columns:12,rowSize:t,columnSize:t})})};y.prototype._instantiateVisualization=function(t){var e;var i="CDM";var u=c.get(["Descriptor","sap.flp","indicatorDataSource"],t);var d={};var g=c.get(["Descriptor","sap.flp","target","appId"],t);var m;var v;if(u){v=c.get(["Descriptor","sap.app","dataSources"],t);if(v){m=v[u.dataSource]}}if(c.get("BusinessApp",t)){d[g]=c.get("BusinessApp",t)}var y={vizRefId:t.Id,title:c.get(["Descriptor","sap.app","title"],t),subtitle:c.get(["Descriptor","sap.app","subTitle"],t),info:c.get(["Descriptor","sap.app","info"],t),icon:c.get(["Descriptor","sap.ui","icons","icon"],t),keywords:c.get(["Descriptor","sap.app","tags","keywords"],t)||[],instantiationData:{platform:"CDM",vizType:t.VizType},indicatorDataSource:u,dataSource:m,contentProviderId:c.get("BusinessApp","sap.app","contentProviderId",t),vizConfig:c.get(["Descriptor"],t),supportedDisplayFormats:c.get(["Descriptor","sap.flp","vizOptions","displayFormats","supported"],t||{}),displayFormat:c.get(["Descriptor","sap.flp","vizOptions","displayFormats","default"],t||{}),numberUnit:c.get(["Descriptor","sap.flp","numberUnit"],t||{}),dataHelpId:t.Id};if(y.indicatorDataSource){y.indicatorDataSource.ui5object=true}if(y.displayFormat===z.Compact){this._cleanInstantiationDataForLink(y);i="LINK"}switch(i){case"CDM":e=new a(y);e.setLayoutData(new p(e.getLayout()));break;case"LINK":e=new o(y);break;default:return new n({state:h.Failed})}e.setTitle(c.get(["Descriptor","sap.app","title"],t));e.setSubtitle(c.get(["Descriptor","sap.app","subTitle"],t));e.setActive(true);var S=c.get(["Descriptor","sap.flp"],t);if(S){y.target=s.harmonizeTarget(c.get(["Descriptor","sap.flp"],t));y.targetURL=r.toHashFromVizData(c.get(["Descriptor","sap.flp"],t),d);e.setTargetURL(y.targetURL)}if(i!=="LINK"){e.setInfo(y.info)}if(l.isStandardVizType(t.Type)){try{e.load().then(function(){f.emit("VizInstanceLoaded",t.Id)})}catch(i){e.setState(h.Failed);f.emit("VizInstanceLoaded",t.Id)}}else{e.setState(h.Loading);f.once("CoreResourcesComplementLoaded").do(function(){try{e.load(true).then(function(){e.setState(h.Loaded)})}catch(t){e.setState(h.Failed)}})}return e};y.prototype._cleanInstantiationDataForLink=function(t){delete t.info;delete t.icon;delete t.keywords;delete t.instantiationData;delete t.dataSource;delete t.contentProviderId;delete t.vizConfig;delete t.numberUnit;delete t.indicatorDataSource;delete t.preview};return y});