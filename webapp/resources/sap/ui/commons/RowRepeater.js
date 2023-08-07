/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","./library","sap/ui/core/Control","./RowRepeaterRenderer","./Toolbar","./Paginator","./Button","sap/ui/model/FilterType","sap/ui/core/Configuration"],function(t,e,i,r,s,o,n,a,g){"use strict";var h=e.PaginatorEvent;var u=e.ToolbarDesign;var p=e.RowRepeaterDesign;var l=i.extend("sap.ui.commons.RowRepeater",{metadata:{library:"sap.ui.commons",deprecated:true,properties:{numberOfRows:{type:"int",group:"Dimension",defaultValue:5},currentPage:{type:"int",group:"Data",defaultValue:1},showMoreSteps:{type:"int",group:"Behavior",defaultValue:0},fixedRowHeight:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:""},design:{type:"sap.ui.commons.RowRepeaterDesign",group:"Appearance",defaultValue:p.Standard},threshold:{type:"int",defaultValue:null}},defaultAggregation:"rows",aggregations:{rows:{type:"sap.ui.core.Control",multiple:true,singularName:"row",bindable:"bindable"},title:{type:"sap.ui.core.Title",multiple:false},filters:{type:"sap.ui.commons.RowRepeaterFilter",multiple:true,singularName:"filter"},sorters:{type:"sap.ui.commons.RowRepeaterSorter",multiple:true,singularName:"sorter"},noData:{type:"sap.ui.core.Control",multiple:false},filterToolbar:{type:"sap.ui.commons.Toolbar",multiple:false,visibility:"hidden"},sorterToolbar:{type:"sap.ui.commons.Toolbar",multiple:false,visibility:"hidden"},headerShowMoreButton:{type:"sap.ui.commons.Button",multiple:false,visibility:"hidden"},footerShowMoreButton:{type:"sap.ui.commons.Button",multiple:false,visibility:"hidden"},footerPager:{type:"sap.ui.commons.Paginator",multiple:false,visibility:"hidden"}},events:{filter:{parameters:{filterId:{type:"string"}}},sort:{parameters:{sorterId:{type:"string"}}},page:{parameters:{currentPage:{type:"int"},previousPage:{type:"int"}}},resize:{parameters:{numberOfRows:{type:"int"},previousNumberOfRows:{type:"int"}}}}}});l.prototype.bPagingMode=true;l.prototype.bShowAnimation=true;l.SHOW_MORE="show_more";l.RESIZE="resize";l.FIRST_PAGE="first_page";l.LAST_PAGE="last_page";l.PREVIOUS_PAGE="previous_page";l.NEXT_PAGE="next_page";l.GOTO_PAGE="goto_page";l.prototype.init=function(){var t=this.getId();this.oResourceBundle=sap.ui.getCore().getLibraryResourceBundle("sap.ui.commons");this.sCurrentAnimation=null;this.aAnimationQueue=[];this.aRemoveBuffer=[];this.iPreviousPage=this.getCurrentPage();this.iPreviousNumberOfRows=this.getNumberOfRows();this.setAggregation("filterToolbar",new s(t+"-ftb",{standalone:false,design:u.Transparent}));this.setAggregation("sorterToolbar",new s(t+"-stb",{standalone:false}));var e=new o(t+"-fp",{page:[this.paging,this]});this.setAggregation("footerPager",e);var i=this.oResourceBundle.getText("SHOW_MORE");this.setAggregation("headerShowMoreButton",new n(t+"-hsm",{text:i,tooltip:i,press:[this.triggerShowMore,this]}));this.setAggregation("footerShowMoreButton",new n(t+"-fsm",{text:i,tooltip:i,press:[this.triggerShowMore,this]}));this._bSecondPage=false};l.prototype.triggerShowMore=function(){if(this.getShowMoreSteps()<=0){return this}var t=this.getShowMoreSteps();var e=this.getNumberOfRows();var i=Math.min(this._getRowCount(),e+t);if(e===i){return this}if(this.getDomRef()&&this.bShowAnimation){if(this.sCurrentAnimation!==null){this.aAnimationQueue.push({name:l.SHOW_MORE,animationFunction:this.triggerShowMore,args:arguments});return this}else{this.sCurrentAnimation=l.SHOW_MORE}this.iPreviousNumberOfRows=e;this.setProperty("numberOfRows",i,true);this.startResizeAnimation()}else{this.setNumberOfRows(i)}this.fireResize({numberOfRows:i,previousNumberOfRows:e});return this};l.prototype.resize=function(t){if(this.getShowMoreSteps()<=0){return this}var e=this.getNumberOfRows();if(t<=0||t>this._getRowCount()||t===e){return this}if(this.getDomRef()&&this.bShowAnimation){if(this.sCurrentAnimation!==null){this.aAnimationQueue.push({name:l.RESIZE,animationFunction:this.resize,args:arguments});return this}else{this.sCurrentAnimation=l.RESIZE}this.iPreviousNumberOfRows=e;this.setProperty("numberOfRows",t,true);this.startResizeAnimation()}else{this.setNumberOfRows(t)}this.fireResize({numberOfRows:t,previousNumberOfRows:e});return this};l.prototype.applyFilter=function(t){var e=this.getFilters();var i=this.getBinding("rows");var r,s;if(e.length===0||i===null){return this}for(s=0;s<e.length;s++){if(e[s].getId()===t){r=e[s];break}}if(r){i.filter(r.getFilters(),a.Control);this.fireFilter({filterId:t});this.firstPage()}return this};l.prototype.triggerSort=function(t){var e=this.getSorters();var i=this.getBinding("rows");var r,s;if(e.length===0||i===null){return this}for(s=0;s<e.length;s++){if(e[s].getId()===t){r=e[s];break}}if(r){i.sort(r.getSorter());this.fireSort({sorterId:t});this.firstPage()}return this};l.prototype.firstPage=function(){if(this.getShowMoreSteps()>0){return this}var t=this.getCurrentPage();if(t===1){return this}this.getAggregation("footerPager").setCurrentPage(1);if(this.getDomRef()&&this.bShowAnimation){if(this.sCurrentAnimation!==null){this.aAnimationQueue.push({name:l.FIRST_PAGE,animationFunction:this.firstPage,args:arguments});return this}else{this.sCurrentAnimation=l.FIRST_PAGE}this.iPreviousPage=t;this.setProperty("currentPage",1,true);this.startPagingAnimation()}else{this.setCurrentPage(1)}this.firePage({currentPage:1,previousPage:t});return this};l.prototype.lastPage=function(){if(this.getShowMoreSteps()>0){return this}var t=this.getCurrentPage();var e=Math.ceil(this._getRowCount()/this.getNumberOfRows());if(t===e){return this}this.getAggregation("footerPager").setCurrentPage(e);if(this.getDomRef()&&this.bShowAnimation){if(this.sCurrentAnimation!==null){this.aAnimationQueue.push({name:l.LAST_PAGE,animationFunction:this.lastPage,args:arguments});return this}else{this.sCurrentAnimation=l.LAST_PAGE}this.iPreviousPage=t;this.setProperty("currentPage",e,true);this.startPagingAnimation()}else{this.setCurrentPage(e)}this.firePage({currentPage:e,previousPage:t});return this};l.prototype.previousPage=function(){if(this.getShowMoreSteps()>0){return this}var t=this.getCurrentPage();if(t<=1){return this}this.getAggregation("footerPager").setCurrentPage(t-1);if(this.getDomRef()&&this.bShowAnimation){if(this.sCurrentAnimation!==null){this.aAnimationQueue.push({name:l.PREVIOUS_PAGE,animationFunction:this.previousPage,args:arguments});return this}else{this.sCurrentAnimation=l.PREVIOUS_PAGE}this.iPreviousPage=t;this.setProperty("currentPage",t-1,true);this.startPagingAnimation()}else{this.setCurrentPage(t-1)}this.firePage({currentPage:t-1,previousPage:t});return this};l.prototype.nextPage=function(){if(this.getShowMoreSteps()>0){return this}var t=this.getCurrentPage();var e=Math.ceil(this._getRowCount()/this.getNumberOfRows());if(t>=e){return this}this.getAggregation("footerPager").setCurrentPage(t+1);if(this.getDomRef()&&this.bShowAnimation){if(this.sCurrentAnimation!==null){this.aAnimationQueue.push({name:l.NEXT_PAGE,animationFunction:this.nextPage,args:arguments});return this}else{this.sCurrentAnimation=l.NEXT_PAGE}this.iPreviousPage=t;this.setProperty("currentPage",t+1,true);this.startPagingAnimation()}else{this.setCurrentPage(t+1)}this.firePage({currentPage:t+1,previousPage:t});return this};l.prototype.gotoPage=function(t){if(this.getShowMoreSteps()>0){return this}var e=this.getCurrentPage();var i=Math.ceil(this._getRowCount()/this.getNumberOfRows());if(t<1||t>i||e===t){return this}this.getAggregation("footerPager").setCurrentPage(t);if(this.getDomRef()&&this.bShowAnimation){if(this.sCurrentAnimation!==null){this.aAnimationQueue.push({name:l.GOTO_PAGE,animationFunction:this.gotoPage,args:arguments});return this}else{this.sCurrentAnimation=l.GOTO_PAGE}this.iPreviousPage=e;this.setProperty("currentPage",t,true);this.startPagingAnimation()}else{this.setCurrentPage(t)}this.firePage({currentPage:t,previousPage:e});return this};l.prototype.setNumberOfRows=function(t){this.setProperty("numberOfRows",t);if(this.getBinding("rows")){this.updateRows(true)}this.updateChildControls();return this};l.prototype.setCurrentPage=function(t){if(this.getCurrentPage()!=t){this.setProperty("currentPage",t);if(this.getBinding("rows")){this.updateRows(true)}this.updateChildControls()}return this};l.prototype.setShowMoreSteps=function(t){var e=t>0?false:true,i=this.getBinding("rows");if(e!==this.bPagingMode){this.bPagingMode=e;this.setCurrentPage(1)}this.setProperty("showMoreSteps",t);if(i){this._bSecondPage=false;this.updateRows(true)}return this};l.prototype.insertRow=function(t,e){this.insertAggregation("rows",t,e);this.updateChildControls();return this};l.prototype.addRow=function(t){this.addAggregation("rows",t);this.updateChildControls();return this};l.prototype.removeRow=function(t){this.removeAggregation("rows",t);this.updateChildControls();return this};l.prototype.removeAllRows=function(){this.removeAllAggregation("rows");this.updateChildControls();return this};l.prototype.destroyRows=function(){this.destroyAggregation("rows");this.updateChildControls();return this};l.prototype.setThreshhold=function(t){this.setProperty("threshold",t,true);return this};l.prototype.insertFilter=function(t,e){var i=this.getAggregation("filterToolbar");var r=t.getId();var s=new n({text:t.getText(),icon:t.getIcon(),tooltip:t.getTooltip(),press:[function(){this.applyFilter(r)},this]});i.insertItem(s,e);this.insertAggregation("filters",t,e);return this};l.prototype.addFilter=function(t){var e=this.getAggregation("filterToolbar");var i=t.getId();var r=new n({text:t.getText(),icon:t.getIcon(),tooltip:t.getTooltip(),press:[function(){this.applyFilter(i)},this]});e.addItem(r);this.addAggregation("filters",t);return this};l.prototype.removeFilter=function(t){var e=this.getAggregation("filterToolbar");e.removeItem(t);return this.removeAggregation("filters",t)};l.prototype.removeAllFilters=function(){var t=this.getAggregation("filterToolbar");t.removeAllItems();return this.removeAllAggregation("filters")};l.prototype.destroyFilters=function(){var t=this.getAggregation("filterToolbar");t.removeAllItems();this.destroyAggregation("filters");return this};l.prototype.insertSorter=function(t,e){var i=this.getAggregation("sorterToolbar");var r=t.getId();var s=new n({text:t.getText(),icon:t.getIcon(),tooltip:t.getTooltip(),press:[function(){this.triggerSort(r)},this]});i.insertItem(s,e);this.insertAggregation("sorters",t,e);return this};l.prototype.addSorter=function(t){var e=this.getAggregation("sorterToolbar");var i=t.getId();var r=new n({text:t.getText(),icon:t.getIcon(),tooltip:t.getTooltip(),press:[function(){this.triggerSort(i)},this]});e.addItem(r);this.addAggregation("sorters",t);return this};l.prototype.removeSorter=function(t){var e=this.getAggregation("sorterToolbar");e.removeItem(t);return this.removeAggregation("sorters",t)};l.prototype.removeAllSorters=function(){var t=this.getAggregation("sorterToolbar");t.removeAllItems();return this.removeAllAggregation("sorters")};l.prototype.destroySorters=function(){var t=this.getAggregation("sorterToolbar");t.removeAllItems();this.destroyAggregation("sorters");return this};l.prototype.startPagingAnimation=function(){var e=sap.ui.getCore(),i=e.getRenderManager(),r=this.getId(),s=this.iPreviousPage,o=this.getCurrentPage(),n=this.getNumberOfRows(),a=(o-1)*n,h=this.getRows(),u=this._getRowCount()>n*o?n:this._getRowCount()-n*(o-1),p,l=this.getBinding("rows");var f,m=this.$("page_"+s),d=this.getDomRef("body"),P=t(d);P.css("height",P.outerHeight());var w;if(sap.ui.getCore()&&g&&g.getRTL()){w=o<s?"left":"right"}else{w=o<s?"right":"left"}if(l){this._bSecondPage=!this._bSecondPage;this.updateRows(true);h=this.getRows();a=(this._bSecondPage?1:0)*n}var c='"top:-'+m.outerHeight(true)+"px;"+w+":"+m.outerWidth(true)+'px;"';t('<ul id="'+r+"-page_"+o+'" class="sapUiRrPage" style='+c+"></ul>").appendTo(d);var v=d.lastChild;var R=t(v);for(p=a;p<a+u;p++){t('<li id="'+r+"-row_"+p+'" class="sapUiRrRow"></li>').appendTo(v);f=v.lastChild;i.render(h[p],f)}if(w==="right"){m.animate({right:-m.outerWidth(true)},"slow");R.animate({right:0},"slow")}else{m.animate({left:-m.outerWidth(true)},"slow");R.animate({left:0},"slow")}P.animate({height:R.outerHeight(true)},"slow",t.proxy(this.endPagingAnimation,this))};l.prototype.endPagingAnimation=function(){var e=this.getDomRef("body");var i=this.getDomRef("page_"+this.iPreviousPage);var r=this.getDomRef("page_"+this.getCurrentPage());var s=t(r);t(e).css("height","");t(i).remove();var o;if(sap.ui.getCore()&&g&&g.getRTL()){o=this.getCurrentPage()<this.iPreviousPage?"left":"right"}else{o=this.getCurrentPage()<this.iPreviousPage?"right":"left"}s.css("top","");s.css(o,"");this.sCurrentAnimation=null;this.nextQueuedAnimation()};l.prototype.startResizeAnimation=function(){var e=sap.ui.getCore().getRenderManager(),i=this.getNumberOfRows(),r=this.iPreviousNumberOfRows,s=this.getId(),o=0,n,a=this.getBinding("rows");var g,h=this.getDomRef("body"),u=t(h),p=this.getDomRef("page_"+this.getCurrentPage());u.css("height",u.outerHeight());if(a){this.updateRows(true)}n=this.getRows();if(i>r){for(var l=r;l<i;l++){t('<li id="'+s+"-row_"+l+'" class="sapUiRrRow"></li>').appendTo(p);g=p.lastChild;e.render(n[l],g)}}else{for(var l=i;l<r;l++){g=this.getDomRef("row_"+l);o-=t(g).outerHeight(true);this.aRemoveBuffer.push(g)}}u.animate({height:t(p).outerHeight(true)+o},"slow",t.proxy(this.endResizeAnimation,this))};l.prototype.endResizeAnimation=function(){var e=this.getDomRef("body");while(this.aRemoveBuffer.length>0){t(this.aRemoveBuffer.pop()).remove()}t(e).css("height","");this.sCurrentAnimation=null;this.nextQueuedAnimation()};l.prototype.nextQueuedAnimation=function(){var t,e;var i=1;var r=this.aAnimationQueue;var s,o;if(r.length>0){t=r.shift()}if(t&&r.length>0){while(r[0]&&r[0].name===t.name){i++;e=r.shift()}if(i>0){switch(t.name){case l.SHOW_MORE:o=Math.min(this._getRowCount(),this.getNumberOfRows()+this.getShowMoreSteps()*i);t={name:l.RESIZE,animationFunction:this.resize,args:[o]};break;case l.RESIZE:t=e;break;case l.FIRST_PAGE:break;case l.LAST_PAGE:break;case l.PREVIOUS_PAGE:s=Math.max(1,this.getCurrentPage()-i);t={name:l.GOTO_PAGE,animationFunction:this.gotoPage,args:[s]};break;case l.NEXT_PAGE:s=Math.min(Math.ceil(this._getRowCount()/this.getNumberOfRows()),this.getCurrentPage()+i);t={name:l.GOTO_PAGE,animationFunction:this.gotoPage,args:[s]};break;case l.GOTO_PAGE:t=e;break}}}if(t){t.animationFunction.apply(this,t.args)}};l.prototype.paging=function(t){switch(t.getParameter("type")){case h.First:this.firstPage();break;case h.Last:this.lastPage();break;case h.Previous:this.previousPage();break;case h.Next:this.nextPage();break;case h.Goto:this.gotoPage(t.getParameter("targetPage"));break}};l.prototype.updateChildControls=function(){var t,e;var i;if(this.bPagingMode){var r=this.getCurrentPage();var s=Math.ceil(this._getRowCount()/this.getNumberOfRows());if(this._getRowCount()==0){s=1}e=this.getAggregation("footerPager");if(e){e.setCurrentPage(r);e.setNumberOfPages(s)}}else{i=this._getRowCount()>this.getNumberOfRows();t=this.getAggregation("headerShowMoreButton");if(t){t.setEnabled(i)}t=this.getAggregation("footerShowMoreButton");if(t){t.setEnabled(i)}}};l.prototype.isBound=function(t){return i.prototype.isBound.call(this,t||"rows")};l.prototype._getRowCount=function(){var t=this.getBinding("rows");if(t){return t.getLength()}else{return this.getRows().length}};l.prototype.unbindAggregation=function(t){i.prototype.unbindAggregation.apply(this,arguments);if(t==="rows"){this.destroyRows()}return this};l.prototype.refreshRows=function(){var t=this.getBindingInfo("rows"),e=t.binding,i=this._getRowCount(),r=this.getNumberOfRows(),s=Math.min(i,r),o=this.getThreshold();this.setProperty("currentPage",1,true);e.getContexts(0,s,o)};l.prototype.updateRows=function(t){var e=this.getBindingInfo("rows"),i=e.factory,r=e.binding,s=this.getShowMoreSteps(),o=s>0,n=this.getCurrentPage(),a=this._getRowCount(),g=this.getNumberOfRows(),h=Math.min(a,g),u=Math.ceil(a/g)||1;if(n>u){n=u;this.setProperty("currentPage",n);this._bSecondPage=false}var p=o?0:(n-1)*h,l=(this._bSecondPage?1:0)*h,f=this.getThreshold(),m=r?r.getContexts(p,h,f):[];if(t!==true){this._bSecondPage=false;this.destroyRows();for(var d=0,P=h;d<P;d++){var w=this.getId()+"-"+d,c=i(w,m[d]);c.setBindingContext(m[d],e.model);this.addRow(c)}}else{this._bSuppressInvalidate=true;for(var d=0,P=h;d<P;d++){var v=l+d;var R=this.getRows()[v];if(!o){if(R){this.removeAggregation("rows",R,true);R.destroy()}R=undefined}if(!R){var w=this.getId()+"-"+v;R=i(w,m[d]);R.setBindingContext(m[d],e.model);this.insertAggregation("rows",R,v,true)}else{R.setBindingContext(m[d],e.model)}}this._bSuppressInvalidate=false}this.updateChildControls()};l.prototype.invalidate=function(t){if(this._bSuppressInvalidate){return}i.prototype.invalidate.apply(this,arguments)};return l});