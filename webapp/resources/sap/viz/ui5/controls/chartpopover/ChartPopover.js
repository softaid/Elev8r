/*!
 * SAPUI5
 * (c) Copyright 2009-2022 SAP SE. All rights reserved.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","./ContentPanel","./HeaderBar","./SubActionItemsPage","sap/ui/core/Control","sap/viz/ui5/format/ChartFormatter","../common/utils/FormatDataUtil","sap/m/library","sap/m/ActionListItem","sap/m/Bar","sap/m/Label","sap/m/List","sap/m/ResponsivePopover","sap/m/StandardListItem"],function(e,t,o,i,s,a,n,r,l,c,h,_,p,d){"use strict";var u=r.PlacementType;var f=s.extend("sap.viz.ui5.controls.chartpopover.ChartPopover",{metadata:{properties:{customDataControl:{type:"any"},actionItems:{type:"object[]"},formatString:{type:"any"},chartType:{type:"string"},showLine:{type:"boolean",defaultValue:true}}},renderer:null});f.prototype.init=function(){this._listItemHeight=3;this._isClosedByHeaderButton=false;this._isActionItemsChanged=true;this._options=null;this._oContentPanel=new t(this._createId("vizContentPanel"),{});this._oSelectedLabel=new h(this._createId("vizSelectedLabel"),{});this._oSelectedBar=new c(this._createId("vizSelectedBar"),{contentMiddle:[this._oSelectedLabel]}).addStyleClass("viz-controls-chartPopover-vizSelectedBar").addStyleClass("viz-controls-chartPopover-vizSelectedBarBorder");this._oCustomHeader=new o(this._createId("vizHeaderBar"),{title:sap.viz.extapi.env.Language.getResourceString("IDS_CURRENT_SELECTION"),showNavButton:false,closeButtonPress:e.proxy(this.close,this),navButtonPress:e.proxy(this._navigateBack,this)});this._oPopover=new p(this._createId("vizChartPopover"),{horizontalScrolling:false,placement:u.HorizontalPreferedRight,contentWidth:"18rem",customHeader:this._oCustomHeader,content:[this._oContentPanel]});this._oPopover.addStyleClass("viz-controls-chartPopover");this._oPopover.attachAfterClose(this._afterClose,this);this._oPopover.attachAfterOpen(this._afterOpen,this);this._setAriaLabelledBys();this._infoDiv=null;this._chartType=null};f.prototype._setAriaLabelledBys=function(){this._oPopover.removeAllAriaLabelledBy();this._oPopover.addAriaLabelledBy(this._oContentPanel);this._oPopover.addAriaLabelledBy(this._oSelectedLabel)};f.prototype._afterOpen=function(){this._oCustomHeader._oCloseButton.focus()};f.prototype._afterClose=function(){this._navigateBack();if(this._options&&this._options.selectedValues<1){this._oPopover.removeContent(this._oSelectedBar)}if(this._infoDiv&&this._isClosedByHeaderButton){this._isClosedByHeaderButton=false;this._infoDiv.focus()}};f.prototype.isOpen=function(){return this._oPopover.isOpen()};function v(e,t){if(!e||!e.getAttribute){return false}var o=e.getAttribute("class")||"";return(" "+o+" ").indexOf(" "+t+" ")>=0}f.prototype.openBy=function(e,t){if(e){this._oCustomHeader.setTitle(sap.viz.extapi.env.Language.getResourceString("IDS_CURRENT_SELECTION"));this._updateContent();this._updateActionItems();var o=this._updatePopoverSettings(e);var i=this._oPopover.getContent();if(i.length>0){this._oPopover.setInitialFocus(i[0].getId())}setTimeout(function(){this._oPopover.openBy(o,t)}.bind(this),0)}return this};f.prototype.close=function(e){if(e&&e.getSource&&this._oCustomHeader.getId()===e.getSource().getId()){this._isClosedByHeaderButton=true}this._oPopover.close();return this};f.prototype.exit=function(){if(this._oContentPanel){this._oContentPanel.destroy();this._oContentPanel=null}if(this._oSelectedBar){this._oSelectedBar.destroy();this._oSelectedBar=null}if(this._oSelectedLabel){this._oSelectedLabel.destroy();this._oSelectedLabel=null}if(this._oCustomHeader){this._oCustomHeader.destroy();this._oCustomHeader=null}if(this._oCustomPanel){this._oCustomPanel.destroy();this._oCustomPanel=null}if(this._oPopover){this._oPopover.destroy();this._oPopover=null}if(this._targetElement){this._targetElement.remove();this._targetElement=null}this._options=null;this._infoDiv=null;this._chartType=null};f.prototype.setOptions=function(e){var t={formatString:this.getFormatString(),chartType:this.getChartType(),mode:"popover"};var o=n.formatData(e,t);if(!this._infoDiv||this.getChartType()!=this._chartType){var i=e.target.parentNode;while(i&&!v(i,"v-info")){i=i.parentNode}this._infoDiv=i;this._chartType=this.getChartType()}if(this._infoDiv){var s=this._infoDiv.querySelector(".v-m-screenreader-container");if(s){var a=s.querySelector("li");if(a&&e.selectedValues){var r=e.selectedValues===1?" "+sap.viz.extapi.env.Language.getResourceString("IDS_ITEM_SELECTED"):" "+sap.viz.extapi.env.Language.getResourceString("IDS_ITEMS_SELECTED");a.innerText=e.selectedValues+r}}}this._options=e;this._oContentPanel.setShowLine(this.getShowLine()).setContentData(o);if(!o.val||e.selectedValues>1){this._oSelectedLabel.setText(e.selectedValues+" "+(e.selectedValues===1?sap.viz.extapi.env.Language.getResourceString("IDS_ITEM_SELECTED"):sap.viz.extapi.env.Language.getResourceString("IDS_ITEMS_SELECTED")));this._oPopover.insertContent(this._oSelectedBar,1);if(o.val===undefined){this._oSelectedBar.removeStyleClass("viz-controls-chartPopover-vizSelectedBarBorder")}}else{this._oPopover.removeContent(this._oSelectedBar)}return this};f.prototype.setActionItems=function(t){this._actionItems=[];this._actionItems=e.extend(true,this._actionItems,t);this._isActionItemsChanged=true;return this};f.prototype.getActionItems=function(e){return this._actionItems};f.prototype._updateContent=function(){var e=this.getCustomDataControl();if(e){if(this._oCustomPanel){this._oPopover.removeContent(this._oCustomPanel)}this._oCustomPanel=e(this._options);this._oPopover.removeContent(this._oContentPanel);this._oPopover.insertContent(this._oCustomPanel,0);this._oSelectedBar.addStyleClass("viz-controls-chartPopover-vizSelectedBarBorder")}else{this._oPopover.removeContent(this._oCustomPanel);this._oCustomPanel=null;if(this._oContentPanel.isMultiSelected()){this._oPopover.removeContent(this._oContentPanel)}else if(this._oPopover.indexOfContent(this._oContentPanel)===-1){this._oPopover.insertContent(this._oContentPanel,0);this._oSelectedBar.addStyleClass("viz-controls-chartPopover-vizSelectedBarBorder")}}return this};f.prototype._updateActionItems=function(){if(this._isActionItemsChanged){var t=this._actionItems;if(!this._oActionList){t=this.getActionItems();if(t&&t.length>0){this._actionItems=e.extend(true,this._actionItems,t);this._oActionList=new _({}).addStyleClass("viz-controls-chartPopover-actionList");this._oPopover.addContent(this._oActionList)}}if(t&&t.length>0){this._oActionList.removeAllItems();var o;var s=function(e){var t=this._oActionList.indexOfItem(e.getSource());var o=this._actionItems[t].children;if(o&&o.length>0){this._oSubActionItemsPage=new i;this._oPopover.insertContent(this._oSubActionItemsPage);this._oSubActionItemsPage.setItems(o);this._oCustomHeader.setTitle(this._actionItems[t].text);this._navigateTo()}};for(var a=0,n=t.length;a<n;a++){o=t[a];if(o.type==="action"){this._oActionList.addItem(new l({text:o.text,press:o.press?o.press:function(){},tooltip:o.text}))}else if(o.type==="navigation"){this._oActionList.addItem(new d({title:o.text,type:"Navigation",press:s.bind(this),tooltip:o.text}))}}}else if(this._oActionList){this._oActionList.destroy();this._oActionList=null}this._isActionItemsChanged=false}};f.prototype._navigateBack=function(){this._resetHeaderBar();if(this._oActionList){this._oActionList.removeStyleClass("hideActionList");this._oActionList.focus()}this._setAriaLabelledBys()};f.prototype._resetHeaderBar=function(){this._oPopover.removeContent(this._oSubActionItemsPage);this._oCustomHeader.setShowNavButton(false).setTitle(sap.viz.extapi.env.Language.getResourceString("IDS_CURRENT_SELECTION"))};f.prototype._navigateTo=function(e){this._oCustomHeader.setShowNavButton(true);if(this._oActionList){this._oActionList.addStyleClass("hideActionList")}this._oPopover.removeAriaLabelledBy(this._oContentPanel)};f.prototype._createId=function(e){return this.getId()+"-"+e};f.prototype._updatePopoverSettings=function(e){var t=this._options.data.val;var o=e.getBoundingClientRect(),i;var s=function(e){return parseInt(e)};var a=e.__data__;if(t!==undefined){for(var n=0,r=t.length;n<r;n++){if(t[n].type&&t[n].type.toLowerCase()==="measure"){i=t[n].value;break}}}else if(a&&a.measureNames){i=a[a.measureNames]}var l=this._options.data.type;var c=l&&l==="line";var h,_;switch(this.getChartType()){case"info/bar":case"info/dual_bar":if(i<0){this._oPopover.setPlacement(u.PreferredLeftOrFlip)}else{this._oPopover.setPlacement(u.PreferredRightOrFlip)}h=e.firstChild;break;case"info/column":case"info/dual_column":case"info/timeseries_column":if(i<0){this._oPopover.setPlacement(u.PreferredBottomOrFlip)}else{this._oPopover.setPlacement(u.PreferredTopOrFlip)}h=e.firstChild;break;case"info/pie":case"info/donut":_=s(o.width/2);this._oPopover.setOffsetX(-_);this._oPopover.setPlacement(u.PreferredRightOrFlip);h=e.firstChild;break;case"info/bullet":this._oPopover.setPlacement(u.PreferredRightOrFlip);h=e;break;case"info/vertical_bullet":case"info/timeseries_bullet":this._oPopover.setPlacement(u.PreferredTopOrFlip);h=e;break;case"info/line":case"info/timeseries_line":case"info/timeseries_scatter":case"info/timeseries_bubble":case"info/dual_line":case"info/bubble":case"info/time_bubble":case"info/scatter":case"info/stacked_bar":case"info/dual_stacked_bar":case"info/100_stacked_bar":case"info/100_dual_stacked_bar":case"info/waterfall":case"info/timeseries_waterfall":case"info/area":case"info/radar":this._oPopover.setPlacement(u.VerticalPreferredTop);h=e.firstChild;break;case"info/stacked_column":case"info/dual_stacked_column":case"info/100_stacked_column":case"info/100_dual_stacked_column":case"info/horizontal_waterfall":case"info/heatmap":case"info/treemap":case"info/timeseries_stacked_column":case"info/timeseries_100_stacked_column":this._oPopover.setPlacement(u.HorizontalPreferredRight);h=e.firstChild;break;case"info/combination":case"info/timeseries_combination":case"info/dual_timeseries_combination":if(c){this._oPopover.setPlacement(u.PreferredTopOrFlip)}else if(i<0){this._oPopover.setPlacement(u.PreferredBottomOrFlip)}else{this._oPopover.setPlacement(u.PreferredTopOrFlip)}h=e.firstChild;break;case"info/dual_combination":case"info/stacked_combination":case"info/dual_stacked_combination":case"info/timeseries_stacked_combination":if(c){this._oPopover.setPlacement(u.VerticalPreferedTop)}else{this._oPopover.setPlacement(u.HorizontalPreferedRight)}h=e.firstChild;break;case"info/dual_horizontal_combination":case"info/horizontal_stacked_combination":case"info/dual_horizontal_stacked_combination":if(c){this._oPopover.setPlacement(u.HorizontalPreferedRight)}else{this._oPopover.setPlacement(u.VerticalPreferedTop)}h=e.firstChild;break}return h};f.prototype.addStyleClass=function(){this._oPopover.addStyleClass.apply(this._oPopover,arguments)};f.prototype.removeStyleClass=function(){this._oPopover.removeStyleClass.apply(this._oPopover,arguments)};return f});