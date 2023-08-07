/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/commons/ListBox","sap/ui/core/Control","sap/ui/core/Popup","sap/ui/core/theming/Parameters","./library","./ExactListRenderer","sap/ui/core/delegate/ItemNavigation","sap/ui/ux3/ExactAttribute","sap/ui/core/ListItem","sap/ui/dom/getScrollbarSize","sap/ui/events/KeyCodes","sap/ui/dom/containsOrEquals","sap/ui/events/ControlEvents","sap/ui/Device","sap/base/security/encodeXML","sap/ui/core/Configuration"],function(t,e,i,s,r,a,o,n,l,u,h,p,f,d,c,g,_){"use strict";var v=a.ExactOrder;var x=i.extend("sap.ui.ux3.ExactList",{metadata:{deprecated:true,library:"sap.ui.ux3",properties:{showClose:{type:"boolean",group:"Misc",defaultValue:false},topTitle:{type:"string",group:"Misc",defaultValue:null},topHeight:{type:"int",group:"Appearance",defaultValue:290}},aggregations:{subLists:{type:"sap.ui.ux3.ExactList",multiple:true,singularName:"subList"},controls:{type:"sap.ui.commons.ListBox",multiple:true,singularName:"control",visibility:"hidden"}},associations:{data:{type:"sap.ui.ux3.ExactAttribute",multiple:false}},events:{attributeSelected:{parameters:{attribute:{type:"sap.ui.ux3.ExactAttribute"},allAttributes:{type:"object"}}}}}});e.extend("sap.ui.ux3.ExactList.LB",{metadata:{library:"sap.ui.ux3"},init:function(){e.prototype.init.apply(this,arguments);this.setAllowMultiSelect(true);this.setDisplayIcons(true);this.addStyleClass("sapUiUx3ExactLstLb")},invalidate:function(){e.prototype.invalidate.apply(this,arguments);if(!this.bInvalidated&&this.getParent()){this.getParent().invalidate()}this.bInvalidated=true},_handleUserActivation:function(t){t.metaKey=true;e.prototype._handleUserActivation.apply(this,[t])},onclick:function(t){e.prototype.onclick.apply(this,arguments);this.getParent().onclick(t)},onAfterRendering:function(){e.prototype.onAfterRendering.apply(this,arguments);this.bInvalidated=false;var i=this.getParent();var s=this.getItems();var r=i._isTop();var a=false;for(var o=0;o<s.length;o++){var l=s[o];var u=sap.ui.getCore().byId(l.getKey());var f=l.$();a=false;if(r||(!u||!u.getShowSubAttributesIndicator_Computed())){f.addClass("sapUiUx3ExactLstNoIco");a=r}else{a=true}if(a&&!r){f.attr("aria-label",i._rb.getText(f.hasClass("sapUiLbxISel")?"EXACT_LST_LIST_ITEM_SEL_ARIA_LABEL":"EXACT_LST_LIST_ITEM_ARIA_LABEL",[l.getText()]))}}var d=i._bRTL?"left":"right";t(".sapUiLbxITxt",this.getDomRef()).css("margin-"+d,20+h().width+"px");t(".sapUiLbxIIco",this.getDomRef()).css(d,5+h().width+"px");t(this.getDomRef()).attr("tabindex","-1");var c;if(r){c=i.getTopTitle()}else{c=i._rb.getText("EXACT_LST_LIST_ARIA_LABEL",[i._iLevel,i._getAtt().getText()])}t(this.getFocusDomRef()).attr("aria-label",c).attr("aria-expanded","true");this.oItemNavigation.iActiveTabIndex=-1;this.oItemNavigation.setSelectedIndex(-1);this.oItemNavigation.onsapnext=function(t){if(t.keyCode!=p.ARROW_DOWN){return}n.prototype.onsapnext.apply(this,arguments)};this.oItemNavigation.onsapprevious=function(t){if(t.keyCode!=p.ARROW_UP){return}n.prototype.onsapprevious.apply(this,arguments)}},renderer:"sap.ui.commons.ListBoxRenderer"});x.prototype.init=function(){var e=this;this._iLevel=0;this._bCollapsed=false;this._bIsFirstRendering=true;this._rb=sap.ui.getCore().getLibraryResourceBundle("sap.ui.ux3");this._lb=new x.LB(this.getId()+"-lb",{select:function(t){D(e);var i=t.getParameter("selectedItem").getKey();var s=sap.ui.getCore().byId(i);var r=t.getParameter("selectedIndex");if(e._lb.isIndexSelected(r)){s.setProperty("selected",true,true);var a=O(e,s);if(a){var o=T(e,s);if(o<0){e.addSubList(a)}else{e.insertSubList(a,o)}}}else{H(e,s,r)}N(e)._selectionChanged(s)}});this.addAggregation("controls",this._lb);this._closeHandle=t.proxy(this.onForceVerticalClose,this)};x.prototype.exit=function(){if(this.bIsDestroyed){return}B(this);this._lb.removeAllItems();this._lb=null;this._closeHandle=null;this._scrollCheckHandle=null;this._rb={getText:function(){return""}};this._oTopList=null;if(this._dirtyListsCleanupTimer){clearTimeout(this._dirtyListsCleanupTimer);this._dirtyListsCleanupTimer=null;this._dirtyLists=null}};x.prototype.getFocusDomRef=function(){if(this._isTop()&&this.$().hasClass("sapUiUx3ExactLstTopHidden")){return this.getDomRef("foc")}return this._bCollapsed?this.getDomRef("head"):this._lb.getFocusDomRef()};x.prototype.onBeforeRendering=function(){this._oTopList=null;if(!this._bIsFirstRendering){return}this._bRTL=_.getRTL();if(!this._isTop()){this._bCollapsed=true;this._oCollapseStyles={cntnt:"margin-"+(this._bRTL?"right":"left")+":"+r.get("sapUiUx3ExactLstCollapseWidth")+";border-top-width:0px;",lst:"width:0px;"}}else{this._bIsFirstRendering=false}};x.prototype.onAfterRendering=function(){var t=this;var e=this._isTop();if(!this._iCurrentWidth){this._iCurrentWidth=this._getAtt().getWidth()}if(e){this._iScrollWidthDiff=-1;this.onCheckScrollbar();this.$("lst").css("bottom",h().height+"px");this.$("cntnt").on("scroll",function(e){if(e.target.id===t.getId()+"-cntnt"&&e.target.scrollTop!=0){e.target.scrollTop=0}})}if(!this._bCollapsed){U(this,this._iCurrentWidth)}D(this);if(this._bIsFirstRendering){this._bIsFirstRendering=false;w(this,false,null,true)}else{I(this);W(this)}if(this._bRefreshList){this._bRefreshList=false;setTimeout(function(){t._lb.invalidate()},0)}};x.prototype.onfocusin=function(t){if(t.target===this.getDomRef()){this.getFocusDomRef().focus()}var e=this.$("head");if(this._isTop()){e.attr("tabindex","-1");this.$("foc").attr("tabindex","-1");if(!m(this)&&t.target===e[0]){this.getFocusDomRef().focus()}if(this.$().hasClass("sapUiUx3ExactLstTopHidden")&&t.target===this.getDomRef("foc")){var i=this.getSubLists();if(i.length>0){i[0].getFocusDomRef().focus()}}}if(!t.__exactHandled){e.addClass("sapUiUx3ExactLstHeadFocus");t.__exactHandled=true}};x.prototype.onfocusout=function(t){var e=this.$("head");if(this._isTop()){e.attr("tabindex","0");this.$("foc").attr("tabindex","0")}e.removeClass("sapUiUx3ExactLstHeadFocus")};x.prototype.onclick=function(e){var i=this._lb.getScrollTop();if(t(e.target).attr("id")==this.getId()+"-exp"){k(this);this.focus();e.stopPropagation()}else if(t(e.target).attr("id")==this.getId()+"-close"){F(this)}else if(t(e.target).attr("id")==this.getId()+"-hide"){w(this,!this._bCollapsed,e)}else if(this._isTop()&&m(this)&&f(this.$("head")[0],e.target)){y(this,e,false);return}else if(!f(this.$("cntnt")[0],e.target)){this.focus()}this._lb.setScrollTop(i)};x.prototype.onkeydown=function(e){function i(e,i){if(t(i).hasClass("sapUiUx3ExactLstFoc")){return}if(i){i.focus()}e.preventDefault();e.stopPropagation()}switch(e.keyCode){case p.ENTER:case p.SPACE:if(this._isTop()&&m(this)&&f(this.$("head")[0],e.target)){y(this,e,true)}break;case p.DELETE:if(!this._isTop()&&this.getShowClose()){F(this);i(e,this.getParent().getFocusDomRef())}break;case p.NUMPAD_MINUS:if(e.shiftKey){if(!this._bCollapsed){U(this,this._iCurrentWidth-10);i(e)}}else if(!this._bCollapsed){w(this,true,e)}break;case p.NUMPAD_PLUS:if(e.shiftKey){if(!this._bCollapsed){U(this,this._iCurrentWidth+10);i(e)}}else if(this._bCollapsed){w(this,false,e)}break;case p.TAB:if(this._iLevel==0){var s=m(this);if(!e.shiftKey&&s&&f(this.$("head")[0],e.target)){i(e,this.getFocusDomRef())}else if(f(this.getFocusDomRef(),e.target)){if(e.shiftKey&&s){i(e,this.$("head")[0])}else if(!e.shiftKey){var r=L(this);if(r){i(e,r.getFocusDomRef())}}}return}if(this._iLevel==1){var r=null;if(e.shiftKey){if(f(this.$("cntnt")[0],e.target)){r=this}else{r=b(this)}}else{r=L(this)}if(r){i(e,r.getFocusDomRef())}e.stopPropagation()}break;case p.ARROW_LEFT:case p.ARROW_RIGHT:var r=null;if(this._iLevel>=1){if(this._bRTL&&e.keyCode===p.ARROW_LEFT||!this._bRTL&&e.keyCode===p.ARROW_RIGHT){r=L(this,true)}else{r=b(this,true)}if(r){i(e,r.getFocusDomRef())}e.stopPropagation()}break}};x.prototype.onmousedown=function(e){if(e.target.id===this.getId()+"-rsz"){t(document.body).append('<div id="'+this.getId()+'-ghost" class="sapUiUx3ExactLstRSzGhost" style =" z-index:'+s.getNextZIndex()+'" ></div>');t(document.body).on("selectstart."+this.getId(),A);var i=c.browser.msie?t(document.body):this.$("ghost");i.on("mouseup."+this.getId(),t.proxy(R,this)).on("mousemove."+this.getId(),t.proxy(E,this));this._iStartDragX=e.pageX;this._iStartWidth=this.$("lst").width();this.$("rsz").addClass("sapUiUx3ExactLstRSzDrag")}};x.prototype.onForceVerticalClose=function(t){if(t.type=="mousedown"||t.type=="click"||t.type=="dblclick"||t.type=="focusin"||t.type=="focusout"||t.type=="keydown"||t.type=="keypress"||t.type=="keyup"||t.type=="mousedown"||t.type=="mouseup"){var e=this.$("lst");if(!f(e[0],t.target)||t.target.tagName=="BODY"){if(e.hasClass("sapUiUx3ExactLstExpanded")){this._oPopup.close(true)}}}};x.prototype.onCheckScrollbar=function(t){this._scrollCheckTimer=null;var e=this.$("cntnt");var i=e[0];if(i){var s=i.scrollWidth-i.clientWidth;if(this._iScrollWidthDiff!=s){this._iScrollWidthDiff=s;if(s<=0){e.css({"overflow-x":"hidden",bottom:h().height+"px"})}else{e.css({"overflow-x":"scroll",bottom:"0px"})}}this._scrollCheckTimer=setTimeout(this.onCheckScrollbar.bind(this),300)}};x.prototype.insertSubList=function(t,e){this.insertAggregation("subLists",t,e);if(t){P(t,this._iLevel+1)}return this};x.prototype.addSubList=function(t){this.addAggregation("subLists",t);if(t){P(t,this._iLevel+1)}return this};x.prototype.setData=function(e){if(e!=null&&typeof e!="string"){e=e.getId()}if(e){this.setAssociation("data",e);e=this._getAtt();this._lb.removeAllItems();if(!e){return this}var i=e.getAttributesInternal(true);var s=[];var r=[];for(var a=0;a<i.length;a++){var o=X(i[a]);this._lb.addItem(o);if(i[a].getSelected()){var n=O(this,i[a]);if(n){r.push(n)}s.push(o.getKey())}}this._lb.setSelectedKeys(s);var l=this.getSubLists();for(var a=0;a<l.length;a++){var u=r.indexOf(l[a]);if(u>=0){if(e.getListOrder()!=v.Fixed){r.splice(u,1)}}else{l[a]._lb.removeAllItems();l[a].destroy()}}if(e.getListOrder()===v.Fixed){this.removeAllSubLists()}for(var a=0;a<r.length;a++){this.addSubList(r[a])}var h=this;e.setChangeListener({id:h.getId(),_notifyOnChange:function(e,i){if(e==="width"){if(h._getAtt()===i&&h.getDomRef()){U(h,i.getWidth())}return}var s=N(h);if(!s._dirtyLists){s._dirtyLists={}}if(!s._dirtyLists[h.getId()]){s._dirtyLists[h.getId()]=h}if(!s._dirtyListsCleanupTimer){s._dirtyListsCleanupTimer=setTimeout(function(){this._dirtyListsCleanupTimer=null;t.each(this._dirtyLists,function(t,e){if(e._lb&&e.getParent()){if(!e._isTop()){e.getParent().setData(e.getParent().getData())}else{e.setData(e.getData())}}});this._dirtyLists=null}.bind(s),0)}}})}return this};x.prototype.setShowClose=function(t){if(this._isTop()){this.setProperty("showClose",t)}return this};x.prototype.getShowClose=function(){return N(this).getProperty("showClose")};x.prototype.getTopTitle=function(){var t=this.getProperty("topTitle");return t?t:this._rb.getText("EXACT_BRWSR_LST_TITLE")};x.prototype._getAtt=function(){return sap.ui.getCore().byId(this.getData())};x.prototype._isTop=function(){return!(this.getParent()instanceof x)};x.prototype._selectionChanged=function(t){if(!this._isTop()){return}t=sap.ui.getCore().byId(t.getId());var e=function(t,i){if(!t.getSelected()){return}i.push(t);var s=t.getAttributesInternal();for(var r=0;r<s.length;r++){e(s[r],i)}};var i=[];var s=this._getAtt().getAttributesInternal();for(var r=0;r<s.length;r++){e(s[r],i)}this.fireAttributeSelected({attribute:t,allAttributes:i})};x.prototype._closeAll=function(){if(!this._isTop()){return}var t=this;var e=function(){t._getAtt()._clearSelection();t._lb.clearSelection();t.fireAttributeSelected({attribute:undefined,allAttributes:[]})};var i=this.getSubLists();if(i.length>0){for(var s=0;s<i.length;s++){F(i[s],true,s==i.length-1?e:null)}}else{e()}};var b=function(t,e){function i(t){var e=t.getParent();var i=e.getSubLists();var s=e.indexOfSubList(t)-1;if(s>=0){return i[s]}return null}function s(t){var e=t.getSubLists();if(e.length>0){return s(e[e.length-1])}return t}if(t._iLevel==0){return null}else if(t._iLevel==1){if(e){return null}var r=i(t);if(r){return r}return t.getParent()}else if(t._iLevel>1){var r=i(t);if(r){return s(r)}var a=t.getParent();if(a._iLevel>=1){return a}}return null};var L=function(t,e){function i(t){var e=t.getParent();var i=e.getSubLists();var s=e.indexOfSubList(t)+1;if(s<i.length){return i[s]}return null}function s(t){var e=t.getSubLists();if(e.length>0){return e[0]}return null}function r(t){var s=i(t);if(s){return s}var a=t.getParent();if(a._iLevel>(e?1:0)){return r(a)}else{return null}}if(t._iLevel==0){return s(t)}else if(t._iLevel==1){return e?s(t):i(t)}else if(t._iLevel>1){var a=s(t);if(a){return a}return r(t)}return null};var y=function(t,e,i){t.fireEvent("_headerPress",{kexboard:i,domRef:t.$("head")});e.stopPropagation()};var m=function(t){return!C(t)&&t.$().hasClass("sapUiUx3ExactLstTopActive")};var C=function(t){return t.$().hasClass("sapUiUx3ExactLstTopHidden")};var T=function(t,e){if(t._getAtt().getListOrder()!=v.Fixed){return-1}var i=t._getAtt().getAttributes();var s=0;for(var r=0;r<i.length;r++){if(i[r]===e){break}if(i[r].getChangeListener()){s++}}return s};var I=function(e){if($(e)){e.$("lst").addClass("sapUiUx3ExactLstLstExp");if(!e._oPopup){var i=function(t){e._handleEvent(t)};e._oPopup=new s;if(!c.browser.firefox){e._oPopup._fixPositioning=function(e,i){s.prototype._fixPositioning.apply(this,arguments);if(i){var r=this._$();var a=t(e.of);var o=0;if(e.offset){o=parseInt(e.offset.split(" ")[0])}r.css("right",t(window).width()-a.outerWidth()-a.offset().left+o+"px")}}}e._oPopup.open=function(){var a=e.$("lst");S(a,false,-1,function(i){a.addClass("sapUiUx3ExactLstExpanded");e.$("exp").html(o.getExpanderSymbol(true,false));e.__sOldHeight=a.css("height");a.css("height",e.__sOldHeight);var n=e.$("head");var l=t(e._lb.getDomRef());var u=l[0].scrollHeight+e.$("exp").height()+l.outerHeight()-l.height()+1;var h=t(window).height()-parseInt(l.offset().top)+t(window).scrollTop()-n.outerHeight();var p=Math.min(u,h);e._oPopup.setContent(a[0]);var f=r.get()["sapUiUx3ExactLst"+(e._isTop()?"Root":"")+"ExpandOffset"]||"0 0";s.prototype.open.apply(e._oPopup,[0,s.Dock.BeginTop,s.Dock.BeginBottom,n[0],f,"none none"]);e._bPopupOpened=true;return p},function(t){a.addClass("sapUiUx3ExactLstExpandedBL");$(e);e.getFocusDomRef().focus();d.bindAnyEvent(e._closeHandle);t.on(d.events.join(" "),i)})};e._oPopup.close=function(r){var a=e.$("lst");a.removeClass("sapUiUx3ExactLstExpandedBL");S(a,false,e.__sOldHeight,function(t){d.unbindAnyEvent(e._closeHandle);t.off(d.events.join(" "),i);a.removeClass("sapUiUx3ExactLstExpanded");e.$("exp").html(o.getExpanderSymbol(false,false))},function(i){i.detach();a.removeClass("sapUiShd");i.attr("style","width:"+e._iCurrentWidth+"px;");t(e.getDomRef()).prepend(i);e._oPopup.setContent(null);e._bPopupOpened=undefined;e.__sOldHeight=null;if(e._isTop()){i.css("bottom",h().height+"px")}$(e);s.prototype.close.apply(e._oPopup,[0]);if(!r){e.getFocusDomRef().focus()}})}}}};var S=function(e,i,s,r,a){if(r){var o=r(e);if(o!=undefined){s=o}}var n=a?function(){a(e)}:function(){};if(t.fx.off){if(i){e.width(s)}else{e.height(s)}n()}else{var l=i?{width:s}:{height:s};e.stop(true,true).animate(l,200,"linear",n)}};var A=function(t){t.preventDefault();t.stopPropagation();return false};var E=function(t){var e=t.pageX;var i=this._bRTL?this._iStartDragX-e:e-this._iStartDragX;U(this,this._iStartWidth+i)};var R=function(e){t(document.body).off("selectstart."+this.getId()).off("mouseup."+this.getId()).off("mousemove."+this.getId());this.$("ghost").remove();this.$("rsz").removeClass("sapUiUx3ExactLstRSzDrag");this._iStartWidth=undefined;this._iStartDragX=undefined;this.focus()};var U=function(t,e){e=l._checkWidth(e);var i=t._bRTL?"right":"left";t._iCurrentWidth=e;t._getAtt()._setWidth(t._iCurrentWidth);t.$("lst").css("width",e+"px");t.$("rsz").css(i,e-4+"px");if(t._isTop()){if(!C(t)){t.$("head").css("width",e+"px");t.$("cntnt").css(i,e+8+"px");t.$("scroll").css(i,e+8+"px")}}else{if(!t.$().hasClass("sapUiUx3ExactLstCollapsed")){t.$("cntnt").css("margin-"+i,e+"px")}}};var D=function(t){var e=t._getAtt();if(e&&!t._isTop()){t.$("head-txt").html(g(e.getText())+'<span class="sapUiUx3ExactLstHeadInfo">&nbsp;('+t._lb.getSelectedIndices().length+"/"+t._lb.getItems().length+")</span>")}};var P=function(t,e){t._iLevel=e;var i=t.getSubLists();for(var s=0;s<i.length;s++){P(i[s],e+1)}};var $=function(e){if(e._lb){var i=t(e._lb.getDomRef());e.$("lst").removeClass("sapUiUx3ExactLstScroll");if(i.length>0&&i.outerHeight()<i[0].scrollHeight){e.$("lst").addClass("sapUiUx3ExactLstScroll");return true}}return false};var w=function(e,i,s,a){if(s){s.preventDefault();s.stopPropagation()}if(e._isTop()){return}if(e._bCollapsed!=i){var n=!!s;var l={};l["margin-"+(e._bRTL?"right":"left")]=e._bCollapsed?e._iCurrentWidth+"px":r.get("sapUiUx3ExactLstCollapseWidth");l["border-top-width"]=e._bCollapsed?r.get("sapUiUx3ExactLstContentTop"):"0px";var u=e.$("cntnt");if(t.fx.off){for(var h in l){u.css(h,l[h])}}else{u.stop(true,true).animate(l,200,"linear")}if(e._bCollapsed){S(e.$("lst"),true,e._iCurrentWidth+"px",function(){t(e.getDomRef()).removeClass("sapUiUx3ExactLstCollapsed");e.$("head").css("overflow","hidden")},function(t){e.$("hide").html(o.getExpanderSymbol(true,true)).attr("title",e._rb.getText("EXACT_LST_LIST_COLLAPSE"));if(n){e.focus()}var i=e.$("head");e.$("head-txt").removeAttr("style");i.removeAttr("style");t.removeAttr("style");I(e);U(e,e._iCurrentWidth);W(e);i.removeAttr("role");i.removeAttr("aria-label");i.removeAttr("aria-expanded");var s=e._getAtt();if(s&&s._scrollToAttributeId){s.scrollTo(sap.ui.getCore().byId(s._scrollToAttributeId))}});e._oCollapseStyles=undefined}else{e._oCollapseStyles={};S(e.$("lst"),true,0,null,function(){t(e.getDomRef()).addClass("sapUiUx3ExactLstCollapsed");e.$("hide").html(o.getExpanderSymbol(false,true)).attr("title",e._rb.getText("EXACT_LST_LIST_EXPAND"));if(n){e.focus()}W(e);var i=e.$("head");i.attr("role","region");i.attr("aria-label",e._rb.getText("EXACT_LST_LIST_COLL_ARIA_LABEL",[e._iLevel,e._getAtt().getText()]));i.attr("aria-expanded","false")});var p=[];for(var h in l){p.push(h,":",l[h],";")}e._oCollapseStyles["cntnt"]=p.join("");e._oCollapseStyles["lst"]="width:0px;"}e._bCollapsed=!e._bCollapsed}if(a){return}var f=e.getParent();if(!e._isTop()&&f&&f._isTop&&!f._isTop()){w(f,i)}};var W=function(t){if(t._bCollapsed){var e=t.$("cntnt").height()-50;var i=t.$("head-txt");i.css("width",e+"px")}var s=t.getSubLists();for(var r=0;r<s.length;r++){W(s[r])}};var k=function(t){var e=t.$("lst");if(e.hasClass("sapUiUx3ExactLstExpanded")){t._oPopup.close()}else{t._oPopup.open()}};var F=function(e,i,s){var r=function(t){if(!i){var r=e._getAtt();var a=r.getParent().indexOfAttribute(r);H(e.getParent(),r,a,true);D(e.getParent());N(e)._selectionChanged(r)}e.destroy();if(s){s()}};var a=e.getDomRef();if(a){S(t(a),true,0,function(t){t.css("overflow","hidden")},r)}else{r()}};var O=function(t,e){if(e.getSelected()){var i=e.getAttributesInternal(true);if(i.length>0){var s;if(e.getChangeListener()){s=sap.ui.getCore().byId(e.getChangeListener().id)}else{s=new x}s.setData(e);return s}}return null};var H=function(t,e,i,s){t._lb.removeSelectedIndex(i);e._clearSelection();if(!s){var r=t.getSubLists();for(var a=0;a<r.length;a++){if(r[a].getData()===e.getId()){F(r[a],true)}}}};var B=function(t){var e=t._getAtt();if(e&&e.getChangeListener()&&e.getChangeListener().id===t.getId()){e.setChangeListener(null)}};var N=function(t){if(t._isTop()){return t}if(!t._oTopList){t._oTopList=N(t.getParent())}return t._oTopList};var X=function(t){var e;if(t.__oItem){e=t.__oItem;if(e.getText()!=t.getText()){e.setText(t.getText())}if(e.getKey()!=t.getId()){e.setKey(t.getId())}}else{e=new u({text:t.getText(),key:t.getId()});t.exit=function(){if(l.prototype.exit){l.prototype.exit.apply(t,[])}this.__oItem.destroy();this.__oItem=null};t.__oItem=e}return e};return x});