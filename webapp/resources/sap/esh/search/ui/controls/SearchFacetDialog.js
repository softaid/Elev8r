/*! 
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	 
 */
(function(){sap.ui.define(["../i18n","sap/esh/search/ui/SearchHelper","sap/esh/search/ui/SearchFacetDialogHelper","sap/esh/search/ui/SearchFacetDialogHelper_SearchAdvancedCondition_ModuleLoader","sap/esh/search/ui/SearchFacetDialogHelperCharts","sap/esh/search/ui/controls/SearchAdvancedCondition","sap/esh/search/ui/FacetItem","sap/m/library","sap/m/Page","sap/m/Dialog","sap/m/Select","sap/m/CheckBox","sap/m/SearchField","sap/m/ToggleButton","sap/m/Button","sap/m/StandardListItem","sap/m/SplitContainer","sap/ui/core/Item","sap/m/List","sap/m/HBox","sap/m/VBox","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/m/ScrollContainer","sap/m/Toolbar","sap/m/IconTabBar","sap/m/IconTabFilter","sap/ui/model/json/JSONModel","../sinaNexTS/providers/abap_odata/UserEventLogger","../hierarchydynamic/SearchHierarchyDynamicFacet","./SearchFacetHierarchyDynamic"],function(e,t,a,r,i,n,s,l,o,c,d,g,h,f,p,u,v,C,y,S,m,b,P,D,I,F,x,O,T,B,w){function A(e){return e&&e.__esModule&&typeof e.default!=="undefined"?e.default:e}function M(e){"@babel/helpers - typeof";return M="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},M(e)}var E=A(e);var L=l["ButtonType"];var _=l["ListMode"];var H=l["ListSeparators"];var U=l["FlexAlignItems"];var N=l["FlexJustifyContent"];var R=l["BackgroundDesign"];var k=T["UserEventType"];var j=A(B);var V=A(w);var z=c.extend("sap.esh.search.ui.controls.SearchFacetDialog",{renderer:{apiVersion:2},metadata:{properties:{tabBarItems:{type:"object"},selectedAttribute:{type:"string"},selectedTabBarIndex:{type:"int"}}},constructor:function e(n,s){var l=this;var o=new r;c.prototype.constructor.call(this,n,s);var d=M(n)==="object"?n:s;this.bConditionValidateError=false;this.bShowCharts=true;this.bOldPieChart=true;if(jQuery["sap"].getUriParameters().mParams.newpie&&jQuery["sap"].getUriParameters().mParams.newpie!=="false"){this.bOldPieChart=false}this.chartOnDisplayIndex=d.selectedTabBarIndex;this.facetOnDisplayIndex=0;this.chartOnDisplayIndexByFilterArray=[];this.aItemsForBarChart=[];this.SearchFacetDialogHelperCharts=new i(this);if(!this.getProperty("tabBarItems")){i.setDummyTabBarItems(this)}this.setShowHeader(true);this.setTitle(E.getText("dialogTitle"));this.setHorizontalScrolling(false);this.setVerticalScrolling(false);this.setContentHeight("35rem");this.setBeginButton(new p({text:E.getText("okDialogBtn"),type:L.Emphasized,press:function e(t){l.onOkClick();l.close();l.getModel().destroy();l.destroy()}}));this.setEndButton(new p({text:E.getText("cancelDialogBtn"),press:function e(t){l.onCancelClick();l.close();l.getModel().destroy();l.destroy()}}));this.addContent(this.createContainer());a.init(this);this.addStyleClass("sapUshellSearchFacetDialog");this.onSearchFieldLiveChangeDelayed=t.delayedExecution(this.onSearchFieldLiveChange,1e3)},createContainer:function e(){var t=this;this.oSplitContainer=new v({masterPages:this.createMasterPages()});this.oSplitContainer.bindAggregation("detailPages",{path:"/facetDialog",factory:function e(a,r){return t.createDetailPage(a,r)}});this.oSplitContainer.addStyleClass("sapUshellSearchFacetDialogContainer");return this.oSplitContainer},createMasterPages:function e(){var t=this;var r=new y({mode:"SingleSelectMaster",selectionChange:function e(a){t.onMasterPageSelectionChange(a)}});r.addStyleClass("sapUshellSearchFacetDialogFacetList");r.bindItems({path:"/facetDialog",factory:function e(t,a){var r=a.getObject();if(r instanceof j){var i=new u({title:{path:"title"},counter:{path:"filterCount"},visible:{path:"visible"}});return i}else{var n=new u({title:{path:"title"},counter:{path:"count"},visible:{path:"visible"}});return n}}});var i=new p({icon:"sap-icon://clear-filter",tooltip:E.getText("resetFilterButton_tooltip"),type:"Transparent",enabled:{path:"/facetDialogOverallCounter"},press:function e(a){t.resetAllFilters()}});i.addStyleClass("sapUshellSearchFacetDialogFilterResetButton");var n=new o({title:E.getText("filters"),headerContent:i,content:[r]}).addStyleClass("sapUshellSearchFacetDialogMasterContainer");n.addEventDelegate({onAfterRendering:function e(){if(t.getProperty("selectedAttribute")){for(var i=0;i<r.getItems().length;i++){var n=r.getItems()[i];var s=n.getBindingContext().getObject();if(t.getProperty("selectedAttribute")===s.dimension){r.setSelectedItem(n);t.facetOnDisplayIndex=i;t.chartOnDisplayIndexByFilterArray.push(t.chartOnDisplayIndex)}else{var l=0;var o=n.getBindingContext().getModel().getData().facets;for(var c=0;c<o.length;c++){if(o[c].chartIndex&&o[c].dimension===s.dimension&&!isNaN(o[c].chartIndex)){l=o[c].chartIndex}}t.chartOnDisplayIndexByFilterArray.push(l)}}}if(!r.getSelectedItem()){r.setSelectedItem(r.getItems()[0])}var d=r.getSelectedItem();a.updateDetailPage(d,null,true);t.resetEnabledForFilterResetButton()}});return[n]},resetAllFilters:function e(){var t=$(".sapUshellSearchFacetDialogSettingsContainer").find(".sapMCbBg.sapMCbHoverable.sapMCbMark");if(t.length===1){var r=t[0].parentNode["id"];var i=sap.ui.getCore().byId(r);i.setSelected(false);i.setEnabled(false)}var n=this.getModel();n.aFilters=[];a.bResetFilterIsActive=true;var s=a.getFacetList();var l=s.getItems();for(var o=0;o<l.length;o++){l[o].setCounter(0)}this.resetAdvancedConditionFilters();a.resetChartQueryFilters();a.updateDetailPage(s.getSelectedItem());this.resetEnabledForFilterResetButton();a.bResetFilterIsActive=false},resetAdvancedConditionFilters:function e(){var t,r,i,n,s,l;var o=this.oSplitContainer.getDetailPages();for(var c=0;c<o.length;c++){var d=o[c];var g=d.getBindingContext().getObject();if(g instanceof j){continue}i=a.POS_ATTRIBUTE_LIST_CONTAINER;t=d.getContent()[i];if(t){for(var h=t.getContent().length-2;h>0;h--){r=t.getContent()[h];s=r.getParent();l=r;s.removeContent(l)}}else{i=a.POS_ICONTABBAR;n=a.POS_TABBAR_CONDITION;t=d.getContent()[i].getItems()[n].getContent()[0];if(t){for(var f=t.getContent().length-1;f>-1;f--){r=t.getContent()[f];if(r.getContent&&r.getContent()[1]){var p=r.getContent()[1].getContent()[1];var u=p.getValue();if(u&&(""+u).length>0){s=r.getParent();l=r;s.removeContent(l)}}}}}}},resetEnabledForFilterResetButton:function e(t){var r=false;var i=0;var n=a.getFacetList();var s=n.getItems();for(var l=0;l<s.length;l++){i+=s[l].getCounter()}var o=this.getModel();if(o.aFilters&&o.aFilters.length>0||t||i>0){r=true}o.setProperty("/facetDialogOverallCounter",r)},onMasterPageSelectionChange:function e(t){var r=t.getParameter("listItem");this.facetOnDisplayIndex=r.getParent().indexOfItem(r.getParent().getSelectedItem());this.setChartOnDisplayIndexForFacetListItem(this.facetOnDisplayIndex);var i=r.getParent().getModel();var n=r.getBindingContext().sPath;this.resetIcons(i,n,this);a.updateDetailPage(r);if(this.oSplitContainer.getMode()==="ShowHideMode"){this.oSplitContainer.hideMaster()}this.controlChartVisibility(this,this.chartOnDisplayIndex)},createDetailPage:function e(t,a){var r=a.getObject();switch(r.facetType){case"attribute":return this.createAttributeDetailPage(t,a);case"hierarchy":return this.createDynamicHierarchyAttributeDetailPage(t,a)}},createDynamicHierarchyAttributeDetailPage:function e(t,a){var r=new V("",{showTitle:false});var i=a.getObject();var n=new o({title:i.title,showHeader:true,content:[r]}).addStyleClass("sapUshellSearchFacetDialogDetailPage").addStyleClass("sapUshellSearchFacetDialogHierarchyTreeDetailPage");return n},createAttributeDetailPage:function e(t,a){var r=this;var s=a.getModel().getProperty(a.getPath()).facetType;var l=a.getModel()["getAttributeDataType"](a.getModel().getProperty(a.getPath()));var c=new d({items:[new C({text:E.getText("notSorted"),key:"notSorted"}),new C({text:E.getText("sortByCount"),key:"sortCount"}),new C({text:E.getText("sortByName"),key:"sortName"})],selectedKey:l==="string"||l==="text"?"sortCount":"notSorted",change:function e(t){r.onSelectChange(t)}}).addStyleClass("sapUshellSearchFacetDialogSettingsSelect");var v=new S({alignItems:U.End,justifyContent:N.End,items:[c]});var O=new g({text:E.getText("showSelectedOnTop"),enabled:false,select:function e(t){r.onCheckBoxSelect(t)}});var T=new m({items:[v,O]}).addStyleClass("sapUshellSearchFacetDialogSettingsContainer");T.setVisible(false);var B=new y({backgroundDesign:R.Transparent,includeItemInSelection:true,showNoData:false,showSeparators:H.None,selectionChange:function e(t){r.onDetailPageSelectionChange(t)}});B.addStyleClass("sapUshellSearchFacetDialogDetailPageList");B.addStyleClass("largeChart0");if(s==="attribute"){B.setMode(_.MultiSelect)}var w={path:"items",factory:function e(t,a){var r=a.oModel.getProperty(a.sPath);var i=new u({title:{path:"label"},tooltip:E.getText("facetListTooltip",[r.label,r.valueLabel]),info:{path:"valueLabel"},selected:{path:"selected"}});if(r.selected){a.oModel.addFilter(r)}return i}};if(l==="number"||l==="integer"){c.removeItem(2)}w["filters"]=new b("advanced",P.NE,true);B.bindAggregation("items",w);B.data("dataType",l);if(this.bShowCharts){B.addEventDelegate({onAfterRendering:function e(t){r.hideSelectively(t,r,0)}})}var A,M;var k=i.getBarChartPlaceholder();k.addEventDelegate({onAfterRendering:function e(t){r.hideSelectively(t,r,1)}});k.data("dataType",l);if(this.bOldPieChart){M=i.getPieChartPlaceholder()}else{M={}}M.addEventDelegate({onAfterRendering:function e(t){r.hideSelectively(t,r,2)}});if(this.bShowCharts&&(l==="string"||l==="text")){A=new D({height:"67.2%",horizontal:false,vertical:true,content:[B,k,M]})}else{A=new D({height:"calc(100% - 0.25rem)",horizontal:false,vertical:true,content:[B]});if(l==="number"||l==="integer"){A.addStyleClass("sapUshellSearchFacetDialogDetailPageListContainerNumber")}else{A.addStyleClass("sapUshellSearchFacetDialogDetailPageListContainerDate")}}A.addStyleClass("sapUshellSearchFacetDialogDetailPageListContainer");A.addStyleClass("searchFacetLargeChartContainer");A.setBusyIndicatorDelay(0);var j=new n("",{type:l});var V;if(l==="string"||l==="text"){var z=new D({horizontal:false,vertical:true,content:[j]});z.addStyleClass("sapUshellSearchFacetDialogDetailPageAdvancedContainer");var Q=new p({icon:"sap-icon://add",type:L.Transparent,press:function e(t){r.onPlusButtonPress(t,l)}});Q.addStyleClass("sapUshellSearchFacetDialogDetailPageAdvancedContainerPlusButton");z.addContent(Q);z.data("dataType",l);z.data("initial",true);A.setHeight("calc(100% - 0.25rem)");z.setHeight("100%");var G=i.getDropDownButton(this);var K=new I({content:[new h({placeholder:E.getText("filterPlaceholder"),liveChange:function e(t){r.onSearchFieldLiveChangeDelayed(t["oSource"].getValue())}}),new f({icon:"sap-icon://sort",press:function e(t){r.onSettingButtonPress(t)}}).addStyleClass("sapUshellSearchFacetDialogSortButton")]}).addStyleClass("sapUshellSearchFacetDialogSubheaderToolbar");K.addEventDelegate({onAfterRendering:function e(){$(".sapUshellSearchFacetDialogSubheaderToolbar").removeClass("sapContrastPlus")}});if(this.bShowCharts){K.addContent(G)}var W=new o({showHeader:false,subHeader:K,content:[T,A]}).addStyleClass("sapUshellSearchFacetDialogDetailPage");var J=new F({expandable:false,stretchContentHeight:true,backgroundDesign:"Transparent",applyContentPadding:false,select:function e(){r.controlChartVisibility(r,r.chartOnDisplayIndex)},items:[new x({text:E.getText("selectFromList"),content:[W]}),new x({text:E.getText("defineCondition"),content:[z]})]});J.addStyleClass("sapUshellSearchFacetDialogIconTabBar");V=new o({showHeader:true,title:a.getModel().getProperty(a.getPath()).title,content:[J]});V.addStyleClass("sapUshellSearchFacetDialogDetailPageString")}else{A.addContent(j);A.data("dataType",l);A.data("initial",true);if(this.bShowCharts){var X=a.getModel().getProperty(a.getPath()).title;V=new o({title:X,showHeader:true,content:[T,A]})}else{V=new o({showHeader:true,title:a.getModel().getProperty(a.getPath()).title,content:[T,A]})}V.addStyleClass("sapUshellSearchFacetDialogDetailPage")}V.addEventDelegate({onAfterRendering:function e(){r.controlChartVisibility(r,r.chartOnDisplayIndex)}});return V},onDetailPageSelectionChange:function e(t){var r=t.getParameter("listItem");var i=r.getBindingContext().getObject();var n=this.getModel();if(r.getSelected()){i.listed=true;n.addFilter(i)}else{i.listed=false;n.removeFilter(i)}var s=t.getSource();var l;if(s.data("dataType")==="string"||s.data("dataType")==="text"){l=s.getParent().getParent().getParent().getParent().getParent().getParent()}else{l=s.getParent().getParent()}a.updateCountInfo(l);var o=s.getParent().getParent().getContent()[a.POS_SETTING_CONTAINER];var c=o.getItems()[a.POS_SHOWONTOP_CHECKBOX];var d=o.getItems()[a.POS_SORTING_SELECT].getItems()[0];if(c.getSelected()){c.setSelected(false);d.setSelectedKey("notSorted")}if(s.getSelectedContexts().length>0){c.setEnabled(true)}else{c.setEnabled(false)}},onSearchFieldLiveChange:function e(t){var r=a.getFacetList().getSelectedItem();a.updateDetailPage(r,t)},onSettingButtonPress:function e(t){var r=t.getSource();var i=r.getPressed();var n=r.getParent().getParent()["getContent"]()[a.POS_SETTING_CONTAINER];var s=r.getParent().getParent()["getContent"]()[a.POS_ATTRIBUTE_LIST_CONTAINER];if(i){n.setVisible(true);s.setHeight("calc(100% - 4.25rem)")}else{n.setVisible(false);s.setHeight("calc(100% - 0.25rem)")}},onSelectChange:function e(t){var r=t.getSource();a.sortingAttributeList(r.getParent().getParent().getParent())},onCheckBoxSelect:function e(t){var r=t.getSource();a.sortingAttributeList(r.getParent().getParent())},onPlusButtonPress:function e(t,a){var r=t.getSource();var i=r.getParent();var s=new n("",{type:a});var l=i.getContent().length-1;i.insertContent(s,l)},onOkClick:function e(){var t=this.getModel();var r=this.getModel("searchModel");r.resetFilterByFilterConditions(false);var i=this.oSplitContainer.getDetailPages();for(var n=0;n<t.aFilters.length;n++){var s=t.aFilters[n];if(!s.advanced||s.listed){r.addFilterCondition(s.filterCondition,false)}}for(var l=0;l<i.length;l++){var o=i[l];var c=o.getBindingContext().getObject();if(c instanceof j){continue}if(a.getFacetList().getItems()[l]){a.applyAdvancedCondition(o,a.getFacetList().getItems()[l].getBindingContext().getObject(),r)}}if(!this.bConditionValidateError){r.filterChanged=true;r.invalidateQuery();r._firePerspectiveQuery()}r.eventLogger.logEvent({type:k.FACET_SHOW_MORE_CLOSE})},onCancelClick:function e(){var t=this.getModel("searchModel");t.eventLogger.logEvent({type:k.FACET_SHOW_MORE_CLOSE})},setChartOnDisplayIndexForFacetListItem:function e(t){var a=0;try{a=this.chartOnDisplayIndexByFilterArray[t]}catch(e){a=0}if(a===undefined){a=0}this.chartOnDisplayIndex=a},resetIcons:function e(t,a,r){var i=false;var n=t.getAttributeDataType(t.getProperty(a));if(this.bShowCharts&&(n==="string"||n==="text")){i=true}var s=$(".sapUshellSearchFacetDialogTabBarButton");if(i){s.css("display","block");for(var l=0;l<s.length;l++){var o=s[l].id;var c=sap.ui.getCore().byId(o);var d=r.getProperty("tabBarItems")[r.chartOnDisplayIndex].getIcon();c.setIcon(d);var g=r.getProperty("tabBarItems")[r.chartOnDisplayIndex].getText();var h=E.getText("displayAs",[g]);c.setTooltip(h)}}else{s.css("display","none")}},onDetailPageSelectionChangeCharts:function e(t){var r=0;var i,n,l,o,c,d,g,h,f;var p,u,v,C;if(t.getSource&&t.getId()==="press"){i=t.getSource().getBindingContext();n=i.getModel();l=i.getObject();o=l.selected;c=!o;d=t.getSource();g=d.getBindingContext().sPath+"/selected";n.setProperty(g,c);h=d.getBindingContext().getObject();if(c){n.addFilter(h)}else{n.removeFilter(h)}f=g.replace(/\/items.+/,"");f+="/items";u=n.getProperty(f);r=0;for(var y=0;y<u.length;y++){v=u[y];if(v.selected===true){r++}}}else if(t.getSource&&(t.getId()==="selectData"||t.getId()==="deselectData")){i=t.getSource().getBindingContext();n=i.getModel();l=i.getObject();c=t.getId()==="selectData";d=t.getSource();g=d.getBindingContext().sPath+"/items/";for(var S=0;S<t.getParameter("data").length;S++){p=t.getParameter("data")[S].data._context_row_number;g+=p+"/selected";n.setProperty(g,c);h=d.getBindingContext().getObject().items[p];if(c){n.addFilter(h)}else{n.removeFilter(h)}}f=g.replace(/\/items.+/,"");f+="/items";u=n.getProperty(f);r=0;for(var m=0;m<u.length;m++){if(u[m].selected===true){r++}}var b=t.getParameter("data").length;if(!c&&b>1){r=0;for(var P=0;P<u.length;P++){u[P].selected=false}}}else{l=t["dataObject"];o=l.selected;c=!o;r=t["cnt"];n=t["model"];h=new s;h.facetAttribute=l.dimension;h.filterCondition=l.filterCondition;h.label=l.label;h.selected=l.selected;h.listed=l.selected;h.value=l.value;h.valueLabel=l.valueLabel;for(var D=0;D<this.aItemsForBarChart.length;D++){var I=this.aItemsForBarChart[D];if(I.label===l.label){I.selected=l.selected}}var F=this.getModel();if(o){F.addFilter(h)}else{F.removeFilter(h)}}var x=a.getFacetList();C=x.getSelectedItem();if(!C){C=x.getItems()[0]}C.setCounter(r);this.resetEnabledForFilterResetButton()},updateDetailPageCharts:function e(t){if(this.bShowCharts===false){return}this.aItemsForBarChart=t;var a=i.getListContainersForDetailPage();var r=a[1];if(!r){return}var n=r.getContent();if(n&&this.chartOnDisplayIndex===2){var s=n[2];var l=a[5];var o=a[2];o=.9*o;if(s.directUpdate){var c={relevantContainerHeight:o,oSearchFacetDialog:this};var d=new O;d.setData(t);$("#"+l.id).empty();s.directUpdate(t,l,d,c)}}if(n&&this.chartOnDisplayIndex===1){var g=n[2].getDomRef();if(g){var h=$("#"+g.id);h.css("display","none")}}if(n&&this.chartOnDisplayIndex===2){var f=n[1].getDomRef();if(f){var p=$("#"+f.id);p.css("display","none")}}},controlChartVisibility:function e(t,a,r){var n,s,l,o;if(this.bShowCharts===false)return;var c=i.getListContainersForDetailPage();var d=c[1];if(!d||!d.getContent)return;var g=d.getContent();for(var h=0;h<g.length;h++){n=g[h].getDomRef();if(!n)return;l=n.className;o=false;if(l.indexOf("largeChart")>-1){o=true}s=$("#"+n.id);if(o&&h!==a){s.css("display","none")}else{s.css("display","block")}}if(t.bOldPieChart){if(o&&a===2&&r){var f=this.aItemsForBarChart;this.updateDetailPageCharts(f)}if(o&&a===2){d.setVertical(false)}else{d.setVertical(true)}}var p=c[6];var u=c[7];if(p){if(a===0){p.css("display","block");u.css("visibility","visible")}else{p.css("display","none");u.css("visibility","hidden")}}},hideSelectively:function e(t,a,r){var n=$("#"+t["srcControl"].sId);var s=a.chartOnDisplayIndex;var l=i.getListContainersForDetailPage();var o=l[1];if(l[0].firstChild.children.length!=3)return;if(s!==undefined){if(a.chartOnDisplayIndex!==r){n.css("display","none")}else{n.css("display","block")}}else{n.css("display","block")}if(s===2){if(!l[0].firstChild.children[2]||!l[0].firstChild.children[2].firstChild){a.controlChartVisibility(a,a.chartOnDisplayIndex,true)}if(a.bOldPieChart){o.setVertical(false)}}else{o.setVertical(true)}var c=l[6];if(c){var d=$("#"+c.sId);if(s===0){d.css("display","block")}else{d.css("display","none")}}}});return z})})();