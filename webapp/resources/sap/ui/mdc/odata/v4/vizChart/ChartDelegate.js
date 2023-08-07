/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/mdc/odata/v4/ChartDelegate","sap/ui/core/Core","sap/m/Text","sap/ui/mdc/library","sap/base/Log","sap/ui/mdc/util/FilterUtil","sap/ui/mdc/odata/v4/util/DelegateUtil","sap/ui/mdc/chart/ChartTypeButton","sap/ui/mdc/chart/Item","sap/ui/model/Sorter","sap/ui/mdc/chart/ChartImplementationContainer","sap/ui/base/ManagedObjectObserver","sap/ui/mdc/p13n/panels/ChartItemPanel","sap/m/MessageStrip","sap/ui/mdc/odata/v4/TypeUtil","sap/ui/mdc/FilterBarDelegate","sap/ui/model/Filter","sap/ui/mdc/chart/PropertyHelper","sap/ui/thirdparty/jquery","sap/m/IllustratedMessage"],function(e,t,a,r,i,n,o,s,l,u,g,h,d,c,p,f,m,y,C,_){"use strict";var b=Object.assign({},e);var I=new window.WeakMap;var v;var S;var T;var D;b._getState=function(e){if(I.has(e)){return I.get(e)}if(e){i.info("Couldn't get state for "+e.getId())}};b._setState=function(e,t){I.set(e,t)};b.getTypeUtil=function(){return p};b.getFilterDelegate=function(){return f};b.addCondition=function(e,t,a){return Promise.resolve()};b.removeCondition=function(e,t,a){return Promise.resolve()};b._deleteState=function(e){if(this._getState(e)){if(this._getState(e).vizTooltip){this._getState(e).vizTooltip.destroy()}if(this._getState(e).observer){this._getState(e).observer.disconnect();this._getState(e).observer=null}}return I.delete(e)};b._getChart=function(e){if(I.has(e)){return I.get(e).innerChart}if(e){i.info("Couldn't get state for "+e.getId())}return undefined};b._setChart=function(e,t){if(I.has(e)){I.get(e).innerChart=t}else{I.set(e,{innerChart:t})}};b._getInnerStructure=function(e){if(I.has(e)){return I.get(e).innerStructure}if(e){i.info("Couldn't get state for "+e.getId())}return undefined};b._setInnerStructure=function(e,t){if(I.has(e)){I.get(e).innerStructure=t}else{I.set(e,{innerStructure:t})}};b._getBindingInfoFromState=function(e){if(I.has(e)){return I.get(e).bindingInfo}if(e){i.info("Couldn't get state for "+e.getId())}return undefined};b._setBindingInfoForState=function(e,t){if(I.has(e)){I.get(e).bindingInfo=t}else{I.set(e,{bindingInfo:t})}};b._setUpChartObserver=function(e){var t=this._getState(e);if(!t.observer){t.observer=new h(function(e){if(e.type==="destroy"){this.exit(e.object)}}.bind(this))}t.observer.observe(e,{destroy:true})};b.exit=function(e){if(this._getInnerStructure(e)){this._getInnerStructure(e).destroy()}this._deleteState(e)};b.zoomIn=function(e,t){var a=this._getChart(e);if(a){a.zoom({direction:"in"})}};b.zoomOut=function(e,t){var a=this._getChart(e);if(a){a.zoom({direction:"out"})}};b.getZoomState=function(e){if(this._getChart(e)){return this._getChart(e).getZoomInfo(this)}};b.getInnerChartSelectionHandler=function(e){return{eventId:"_selectionDetails",listener:this._getChart(e)}};b.getChartTypeLayoutConfig=function(){if(this._aChartTypeLayout){return this._aChartTypeLayout}var e=[r.ChartItemRoleType.axis1,r.ChartItemRoleType.category,r.ChartItemRoleType.series];var t=[r.ChartItemRoleType.axis1,r.ChartItemRoleType.axis2,r.ChartItemRoleType.category,r.ChartItemRoleType.series];var a=[r.ChartItemRoleType.axis1,r.ChartItemRoleType.category,r.ChartItemRoleType.category2];var i=[r.ChartItemRoleType.axis1,r.ChartItemRoleType.axis2,r.ChartItemRoleType.axis3,r.ChartItemRoleType.category,r.ChartItemRoleType.series];this._aChartTypeLayout=[{key:"column",allowedLayoutOptions:e},{key:"bar",allowedLayoutOptions:e},{key:"line",allowedLayoutOptions:e},{key:"combination",allowedLayoutOptions:e},{key:"pie",allowedLayoutOptions:e},{key:"donut",allowedLayoutOptions:e},{key:"dual_column",allowedLayoutOptions:t},{key:"dual_bar",allowedLayoutOptions:t},{key:"dual_line",allowedLayoutOptions:t},{key:"stacked_bar",allowedLayoutOptions:e},{key:"scatter",allowedLayoutOptions:t},{key:"bubble",allowedLayoutOptions:i},{key:"heatmap",allowedLayoutOptions:a},{key:"bullet",allowedLayoutOptions:e},{key:"vertical_bullet",allowedLayoutOptions:e},{key:"dual_stacked_bar",allowedLayoutOptions:t},{key:"100_stacked_bar",allowedLayoutOptions:e},{key:"stacked_column",allowedLayoutOptions:e},{key:"dual_stacked_column",allowedLayoutOptions:t},{key:"100_stacked_column",allowedLayoutOptions:e},{key:"dual_combination",allowedLayoutOptions:t},{key:"dual_horizontal_combination",allowedLayoutOptions:t},{key:"dual_horizontal_combination",allowedLayoutOptions:t},{key:"dual_stacked_combination",allowedLayoutOptions:t},{key:"dual_horizontal_stacked_combination",allowedLayoutOptions:t},{key:"stacked_combination",allowedLayoutOptions:e},{key:"100_dual_stacked_bar",allowedLayoutOptions:e},{key:"100_dual_stacked_column",allowedLayoutOptions:e},{key:"horizontal_stacked_combination",allowedLayoutOptions:e},{key:"waterfall",allowedLayoutOptions:a},{key:"horizontal_waterfall",allowedLayoutOptions:a}];return this._aChartTypeLayout};b.getAdaptionUI=function(e){return Promise.resolve(this._setupAdaptionUI(e))};b._setupAdaptionUI=function(e){var t=this.getChartTypeLayoutConfig().find(function(t){return t.key===e.getChartType()});if(!t){var a=[r.ChartItemRoleType.axis1,r.ChartItemRoleType.axis2,r.ChartItemRoleType.axis3,r.ChartItemRoleType.category,r.ChartItemRoleType.category2,r.ChartItemRoleType.series];t={key:e.getChartType(),allowedLayoutOptions:a}}var i=[{kind:"Groupable"},{kind:"Aggregatable"}];t.templateConfig=i;var n={panelConfig:t};var o=new d(n);if(e.getChartType()==="heatmap"){var s=sap.ui.getCore().getLibraryResourceBundle("sap.ui.mdc");o.setMessageStrip(new c({text:s.getText("chart.PERSONALIZATION_DIALOG_MEASURE_WARNING"),type:"Warning"}))}return o};b.setLegendVisible=function(e,t){if(this._getChart(e)){this._getChart(e).setVizProperties({legend:{visible:t},sizeLegend:{visible:t}})}else{i.error("Could not set legend visibility since inner chart is not yet initialized!")}};b.getSorterForItem=function(e,t){if(e.getType()==="aggregatable"){return new u(this._getAggregatedMeasureNameForMDCItem(e),t.descending)}else if(e.getType()==="groupable"){return new u(this.getInternalChartNameFromPropertyNameAndKind(t.name,"groupable",e.getParent()),t.descending)}};b.insertItemToInnerChart=function(e,t,a){if(t.getType()==="groupable"){var r=this.getInternalChartNameFromPropertyNameAndKind(t.getName(),"groupable",e);var i=this._getChart(e).getDimensionByName(r);if(!i){this.createInnerDimension(e,t)}else{i.setLabel(t.getLabel());i.setRole(t.getRole()?t.getRole():"category")}var n=this._getChart(e).getVisibleDimensions();n.splice(a,0,r);this._getChart(e).setVisibleDimensions(n)}else if(t.getType()==="aggregatable"){this.createInnerMeasure(e,t);var o=this._getChart(e).getVisibleMeasures();o.splice(a,0,this._getAggregatedMeasureNameForMDCItem(t));this._getChart(e).setVisibleMeasures(o)}this._prepareColoringForItem(t).then(function(){this._updateColoring(e,this._getChart(e).getVisibleDimensions(),this._getChart(e).getVisibleMeasures())}.bind(this));this._updateSemanticalPattern(e)};b.removeItemFromInnerChart=function(e,t){if(t.getType()==="groupable"&&this._getChart(e).getVisibleDimensions().includes(this.getInternalChartNameFromPropertyNameAndKind(t.getName(),"groupable",e))){var a=this.getInternalChartNameFromPropertyNameAndKind(t.getName(),"groupable",e);var r=this._getChart(e).getVisibleDimensions().filter(function(e){return e!==a});if(this._getState(e).inResultDimensions.length>0){this._getChart(e).setInResultDimensions(this._getState(e).inResultDimensions)}this._getChart(e).setVisibleDimensions(r)}else if(t.getType()==="aggregatable"&&this._getChart(e).getVisibleMeasures().includes(this._getAggregatedMeasureNameForMDCItem(t))){var i=[];e.getItems().filter(function(e){return e.getType()==="aggregatable"}).filter(function(e){return e!==t}).forEach(function(e){i.push(this._getAggregatedMeasureNameForMDCItem(e))}.bind(this));this._getChart(e).setVisibleMeasures(i);this._getChart(e).removeMeasure(this._getChart(e).getMeasureByName(this._getAggregatedMeasureNameForMDCItem(t)))}this._updateColoring(e,this._getChart(e).getVisibleDimensions(),this._getChart(e).getVisibleMeasures());this._updateSemanticalPattern(e)};b.addItem=function(e,t,a,r){if(t.getModel){return Promise.resolve(this._createMDCChartItem(e,t,r))}};b.removeItem=function(e,t){return Promise.resolve(true)};b.checkAndUpdateMDCItems=function(e){return new Promise(function(t,a){var r=[];e.getItems().forEach(function(t){var a=t.getName()&&t.getLabel()&&t.getType()&&t.getRole();if(!a){r.push(this._getPropertyInfosByName(t.getName(),e).then(function(e){t.setLabel(e.label);if(e.groupable){t.setType("groupable");t.setRole(t.getRole()?t.getRole():"category")}else if(e.aggregatable){t.setType("aggregatable");t.setRole(t.getRole()?t.getRole():"axis1")}}))}}.bind(this));Promise.all(r).then(function(){t()})}.bind(this))};b._createMDCChartItem=function(e,t,a){return this._getPropertyInfosByName(e,t).then(function(e){if(!e){return null}return this._createMDCItemFromProperty(e,t.getId(),a)}.bind(this))};b._createMDCItemFromProperty=function(e,t,a){if(e.groupable){return new l(t+"--GroupableItem--"+e.name,{name:e.name,label:e.label,type:"groupable",role:a?a:"category"})}if(e.aggregatable){return new l(t+"--AggregatableItem--"+e.name,{name:e.name,label:e.label,type:"aggregatable",role:a?a:"axis1"})}return null};b.initializeInnerChart=function(e){return new Promise(function(t,r){this._loadChart().then(function(r){var i;this._setInnerStructure(e,new g(e.getId()+"--implementationContainer",{}));e.addStyleClass("sapUiMDCChartTempTextOuter");if(e.getNoData()){this._getInnerStructure(e).setChartNoDataContent(e.getNoData())}else{i=new a({text:e.getNoDataText()});this._getInnerStructure(e).addStyleClass("sapUiMDCChartTempText");this._getInnerStructure(e).setNoDataContent(i)}this._setUpChartObserver(e);t(this._getInnerStructure(e))}.bind(this))}.bind(this))};b.createInitialChartContent=function(e){};b.changedNoDataStruct=function(e){if(this._getInnerStructure(e)){this._getInnerStructure(e).setChartNoDataContent(e.getNoData());this._getInnerStructure(e).invalidate()}};b._createContentFromItems=function(e){return new Promise(function(t,a){var r=[];var n=[];var o=[];var s=[];e.getItems().forEach(function(t,a){n.push(this._getPropertyInfosByName(t.getName(),e).then(function(a){if(!a){i.error("sap.ui.mdc.Chart: Item "+t.getName()+" has no property info representing it in the metadata. Make sure the name is correct and the metadata is defined correctly. Skipping the item!");return}switch(t.getType()){case"groupable":o.push(this.getInternalChartNameFromPropertyNameAndKind(t.getName(),"groupable",e));this._addInnerDimension(e,t,a);break;case"aggregatable":s.push(this._getAggregatedMeasureNameForMDCItem(t));this._addInnerMeasure(e,t,a);break;default:i.error("MDC Chart Item "+t.getId()+" with label "+t.getLabel()+' has no known type. Supported typed are: "groupable" & "aggregatable"')}r.push(this._prepareColoringForItem(t))}.bind(this)))}.bind(this));Promise.all(n).then(function(){this._getState(e).aColMeasures.forEach(function(t){if(this._getState(e).aInSettings.indexOf(t)==-1){r.push(new Promise(function(a,r){e._getPropertyByNameAsync(t).then(function(r){var i=r.aggregationMethod;var n=r.propertyPath;var o=this.getInternalChartNameFromPropertyNameAndKind(t,"aggregatable",e);var l={name:o,label:r.label,role:"axis1"};if(i&&n){l.analyticalInfo={propertyPath:n,with:i}}var u=new T(l);s.push(u);this._getChart(e).addMeasure(u);a()})}))}}.bind(this));Promise.all(r).then(function(){this._getChart(e).setVisibleDimensions(o);this._getChart(e).setVisibleMeasures(s);var a=e.getDelegate().inResultDimensions;if(a&&a instanceof Array&&a.length!=0){var r=[];a.forEach(function(t){r.push(this._getPropertyInfosByName(t,e).then(function(t){var a=this.getInternalChartNameFromPropertyNameAndKind(t.name,"groupable",e);var r=new S({name:a,label:t.label});this._getState(e).inResultDimensions.push(a);this._getChart(e).addDimension(r)}.bind(this)))}.bind(this));Promise.all(r).then(function(){this._getChart(e).setInResultDimensions(this._getState(e).inResultDimensions)}.bind(this))}this._updateColoring(e,o,s);this._updateSemanticalPattern(e);t()}.bind(this))}.bind(this))}.bind(this))};b.getInnerChart=function(e){return this._getChart(e)};b._prepareColoringForItem=function(e){return this._addCriticality(e).then(function(){this._getState(e.getParent()).aInSettings.push(e.getName());if(e.getType()==="aggregatable"){this._getPropertyInfosByName(e.getName(),e.getParent()).then(function(t){this._getAdditionalColoringMeasuresForItem(t).forEach(function(t){if(this._getState(e.getParent()).aColMeasures&&this._getState(e.getParent()).aColMeasures.indexOf(t)==-1){this._getState(e.getParent()).aColMeasures.push(t)}}.bind(this))}.bind(this))}}.bind(this))};b._getAdditionalColoringMeasuresForItem=function(e){var t=[];var a=e.datapoint?e.datapoint.criticality:null;if(a&&a.DynamicThresholds){t=a.DynamicThresholds.usedMeasures}return t};b._addCriticality=function(e){return this._getPropertyInfosByName(e.getName(),e.getParent()).then(function(t){if(t.criticality||t.datapoint&&t.datapoint.criticality){var a=this._getState(e.getParent()).oColorings||{Criticality:{DimensionValues:{},MeasureValues:{}}};var r={};if(e.getType()=="groupable"){var i=t.criticality?t.criticality:[];for(var n in i){r[n]={Values:i[n]}}var o=this.getInternalChartNameFromPropertyNameAndKind(e.getName(),"groupable",e.getParent());a.Criticality.DimensionValues[o]=r}else{var i=t.datapoint&&t.datapoint.criticality?t.datapoint.criticality:[];for(var n in i){r[n]=i[n]}var s=this.getInternalChartNameFromPropertyNameAndKind(e.getName(),"aggregatable",e.getParent());a.Criticality.MeasureValues[s]=r}var l=this._getState(e.getParent());l.oColorings=a;this._setState(e.getParent(),l)}}.bind(this))};b._updateColoring=function(e,t,a){var r=C.extend(true,{},this._getState(e).oColorings),i;if(r&&r.Criticality){var n;for(i=0;i<t.length;i++){if(this._getState(e).oColorings.Criticality.DimensionValues[t[i]]){n={coloring:"Criticality",parameters:{dimension:t[i]}};delete r.Criticality.MeasureValues;break}}if(!n){delete r.Criticality.DimensionValues;for(var o in r.Criticality.MeasureValues){if(a.indexOf(o)==-1){delete r.Criticality.MeasureValues[o]}}n={coloring:"Criticality",parameters:{measure:a}}}if(n){this._getChart(e).setColorings(r);this._getChart(e).setActiveColoring(n)}}};b._updateSemanticalPattern=function(e){var t=this._getChart(e).getVisibleMeasures();t.forEach(function(t){var a=this.getPropertyFromNameAndKind(t,"aggregatable",e);if(!a){return}var r=a.datapoint;if(r){if(r.targetValue||r.foreCastValue){var n=this._getChart(e).getMeasureByName(t);n.setSemantics("actual");if(r.targetValue!=null){var o=this._getChart(e).getMeasureByName(r.targetValue);if(o){o.setSemantics("reference")}else{i.error("sap.ui.mdc.Chart: "+r.targetValue+" is not a valid measure")}}if(r.foreCastValue){var s=this._getChart(e).getMeasureByName(r.foreCastValue);if(s){s.setSemantics("projected")}else{i.error("sap.ui.comp.SmartChart: "+r.ForecastValue.Path+" is not a valid measure")}}n.setSemanticallyRelatedMeasures({referenceValueMeasure:r.targetValue,projectedValueMeasure:r.foreCastValue})}}}.bind(this))};b.getChartTypeInfo=function(e){if(!this._getChart(e)){throw"inner chart is not bound"}var a=e.getChartType(),r=t.getLibraryResourceBundle("sap.ui.mdc"),i=t.getLibraryResourceBundle("sap.chart.messages");var n={icon:s.mMatchingIcon[a],text:r.getText("chart.CHART_TYPE_TOOLTIP",[i.getText("info/"+a)])};return n};b.getAvailableChartTypes=function(e){var a=[];if(this._getChart(e)){var r=this._getChart(e).getAvailableChartTypes().available;if(a){var i=t.getLibraryResourceBundle("sap.chart.messages");for(var n=0;n<r.length;n++){var o=r[n].chart;a.push({key:o,icon:s.mMatchingIcon[o],text:i.getText("info/"+o),selected:o==e.getChartType()})}}}return a};b.getDrillStack=function(e){var t=[];t=Object.assign(t,this._getChart(e).getDrillStack());t.forEach(function(t){t.dimension=t.dimension.map(function(t){var a=this.getPropertyFromNameAndKind(t,"groupable",e);if(a){return a.name}else{i.error("MDC Chart Delegate: Couldn't map chart dimension to groupable property: "+t);return t}}.bind(this))}.bind(this));return t};b.getSortedDimensions=function(e){return new Promise(function(t,a){if(e.isPropertyHelperFinal()){t(this._sortPropertyDimensions(e.getPropertyHelper().getProperties()))}else{e.finalizePropertyHelper().then(function(){t(this._sortPropertyDimensions(e.getPropertyHelper().getProperties()))}.bind(this))}}.bind(this))};b._sortPropertyDimensions=function(e){var t=e.filter(function(e){return e.groupable});if(t){t.sort(function(e,t){if(e.label&&t.label){return e.label.localeCompare(t.label)}})}return t};b.getDrillableItems=function(e){var t=e.getItems().filter(function(e){return e.getType()==="groupable"});return t};b.setChartType=function(e,t){this._getChart(e).setChartType(t)};b.createInnerChartContent=function(e,t){return new Promise(function(a,r){this._setChart(e,new v({id:e.getId()+"--innerChart",chartType:"column",height:"100%",width:"100%",isAnalytical:true}));this._getChart(e).setCustomMessages({NO_DATA:e.getNoDataText()});this._getState(e).inResultDimensions=[];this._getInnerStructure(e).removeStyleClass("sapUiMDCChartTempText");e.removeStyleClass("sapUiMDCChartTempTextOuter");e.addStyleClass("sapUiMDCChartGrid");var i=this._getState(e);i.aColMeasures=[];i.aInSettings=[];this._setState(e,i);this._createContentFromItems(e).then(function(){this._getChart(e).attachRenderComplete(function(){if(this._getState(e).toolbarUpdateRequested){e._updateToolbar();this._getState(e).toolbarUpdateRequested=false}}.bind(this));this._getInnerStructure(e).setContent(this._getChart(e));this._getInnerStructure(e).setShowNoDataStruct(false);i.dataLoadedCallback=t;this._setState(e,i);var r=this._getBindingInfo(e);this.updateBindingInfo(e,r);this._performInitialBind(e,r);a()}.bind(this))}.bind(this))};b._performInitialBind=function(e,t){if(e&&t&&this._getChart(e)){this._addBindingListener(t,"dataReceived",this._onDataLoadComplete.bind(e));this._getChart(e).bindData(t);this._setBindingInfoForState(e,t);var a=this._getState(e);a.innerChartBound=true;this._checkForMeasureWarning(e)}};b.requestToolbarUpdate=function(e){if(e.getItems().length===0){e._updateToolbar();return}this._getState(e).toolbarUpdateRequested=true};b.createInnerDimension=function(e,t){this._getPropertyInfosByName(t.getName(),e).then(function(a){this._addInnerDimension(e,t,a)}.bind(this))};b.createInnerMeasure=function(e,t){this._getPropertyInfosByName(t.getName(),e).then(function(a){this._addInnerMeasure(e,t,a)}.bind(this))};b._addInnerDimension=function(e,t,a){var r=this.innerDimensionFactory(e,t,a);this._getChart(e).addDimension(r)};b.innerDimensionFactory=function(e,t,a){var r=new S({name:this.getInternalChartNameFromPropertyNameAndKind(t.getName(),"groupable",e),role:t.getRole()?t.getRole():"category",label:t.getLabel()});if(a.textProperty){r.setTextProperty(a.textProperty);r.setDisplayText(true)}if(a.textFormatter){r.setTextFormatter(this.formatText.bind(a))}return r};b._addInnerMeasure=function(e,t,a){var r=this.innerMeasureFactory(e,t,a);this._getChart(e).addMeasure(r)};b.innerMeasureFactory=function(e,t,a){var r=a.aggregationMethod;var i=a.propertyPath;var n={name:this._getAggregatedMeasureNameForMDCItem(t),label:t.getLabel(),role:t.getRole()?t.getRole():"axis1"};if(r&&i){n.analyticalInfo={propertyPath:i,with:r}}return new T(n)};b._getAggregatedMeasureNameForProperty=function(e){return e.aggregationMethod+e.name};b.rebindChart=function(e,t){this.rebind(e,t)};b.rebind=function(e,t){if(e&&t&&this._getChart(e)){this._addBindingListener(t,"dataReceived",this._onDataLoadComplete.bind(e));this._getInnerStructure(e).setShowNoDataStruct(false);if(t.binding){t.binding.bHasAnalyticalInfo=true}this._getChart(e).bindData(t);this._setBindingInfoForState(e,t);var a=this._getState(e);a.innerChartBound=true}};b._checkForMeasureWarning=function(e){if(!e.getNoData()){return}var t=e.getItems().filter(function(e){return e.getType()==="aggregatable"});if(t.length===0){this._getInnerStructure(e).setShowNoDataStruct(true);e.setBusy(false)}else{this._getInnerStructure(e).setShowNoDataStruct(false)}};b._getBindingInfo=function(e){if(this._getBindingInfoFromState(e)){return this._getBindingInfoFromState(e)}var t=e.getDelegate().payload;var a="/"+t.collectionName;var r={path:a};return r};b.getInnerChartBound=function(e){var t=this._getState(e);if(!t){return false}return t.innerChartBound?true:false};b.updateBindingInfo=function(e,t){var a=N.call(this,e).concat(P.call(this,e));M(e,t);t.filters=new m(a,true);t.sorter=this.getSorters(e)};function N(e){var t=e.getP13nMode().indexOf("Filter")>-1;var a=[];if(t){var r=e.getPropertyHelper().getProperties();var i=n.getFilterInfo(this.getTypeUtil(),e.getConditions(),r);if(i.filters){a.push(i.filters)}}return a}function P(e){var a=t.byId(e.getFilter());var r=[];if(!a){return r}var i=a.getConditions();if(i){var s=a.getPropertyInfoSet?a.getPropertyInfoSet():null;var l=o.getParameterNames(a);var u=n.getFilterInfo(this.getTypeUtil(),i,s,l);if(u.filters){r.push(u.filters)}}return r}function M(e,a){var r=t.byId(e.getFilter());if(!r){return}var i=r.getConditions();var n=r.getSearch instanceof Function?r.getSearch():"";if(i){var s=o.getParametersInfo(r,i);if(s){a.path=s}}if(!a.parameters){a.parameters={}}a.parameters["$search"]=n||undefined}b.getSorters=function(e){var t;var a=e.getSortConditions()?e.getSortConditions().sorters:[];a.forEach(function(a){var r=e.getItems().find(function(e){return e.getName()===a.name});if(!r){return}var i=this.getSorterForItem(r,a);if(t){t.push(i)}else{t=[i]}}.bind(this));return t};b._getAggregatedMeasureNameForMDCItem=function(e){return this.getInternalChartNameFromPropertyNameAndKind(e.getName(),"aggregatable",e.getParent())};b.getInternalChartNameFromPropertyNameAndKind=function(e,t,a){return e};b.getPropertyFromNameAndKind=function(e,t,a){return a.getPropertyHelper().getProperty(e)};b.setChartTooltipVisibility=function(e,t){if(this._getChart(e)){if(t){if(!this._getState(e).vizTooltip){var a=this._getState(e);a.vizTooltip=new D;this._setState(e,a)}this._getState(e).vizTooltip.connect(this._getChart(e).getVizUid())}else if(this._getState(e).vizTooltip){this._getState(e).vizTooltip.destroy()}}else{i.error("Trying to set chart tooltip while inner chart was not yet initialized")}};b._loadChart=function(){return new Promise(function(e){var t=["sap/chart/library","sap/chart/Chart","sap/chart/data/Dimension","sap/chart/data/HierarchyDimension","sap/chart/data/TimeDimension","sap/chart/data/Measure","sap/viz/ui5/controls/VizTooltip"];function a(t,a,r,i,n,o,s){v=a;S=r;T=o;D=s;e()}sap.ui.require(t,a)})};b.getPropertyHelperClass=function(){return y};b.formatText=function(e,t){return e};b.setNoDataText=function(e,t){this._getChart(e).setCustomMessages({NO_DATA:t})};b.showOverlay=function(e,t){if(this._getInnerStructure(e)){this._getInnerStructure(e).showOverlay(t)}};b._getPropertyInfosByName=function(e,t){return t._getPropertyByNameAsync(e)};b._getModel=function(e){var t=e.getDelegate().payload;return e.getModel(t.model)};b._addBindingListener=function(e,t,a){if(!e.events){e.events={}}if(!e.events[t]){e.events[t]=a}else{var r=e.events[t];e.events[t]=function(){a.apply(this,arguments);r.apply(this,arguments)}}};b._onDataLoadComplete=function(e){var t=this.getControlDelegate()._getInnerStructure(this);if(this.getNoData()){if(e.getSource()&&e.getSource().getCurrentContexts().length===0){t.setShowNoDataStruct(true)}else{t.setShowNoDataStruct(false)}}this._innerChartDataLoadComplete(e)};return b});