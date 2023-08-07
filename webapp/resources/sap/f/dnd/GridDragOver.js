/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/ui/thirdparty/jquery","sap/base/Log","sap/ui/core/Configuration","sap/ui/core/Element"],function(t,i,e,o,r){"use strict";var n=t.extend("sap.f.dnd.GridDragOver",{_iTimeoutBeforeDrop:200,_$indicator:i("<div class='sapUiDnDGridIndicator'></div>"),constructor:function(){this._oDragControlDelegate={ondragend:this.scheduleEndDrag};this._oDropContainerDelegate={ondragleave:this._onDragLeave,onBeforeRendering:this._onDropContainerBeforeRendering,onAfterRendering:this._onDropContainerAfterRendering}},destroy:function(){this._oDragEndDelegate=null}});n.prototype.setCurrentContext=function(t,i,e,o){if(this._oDragControl===t&&this._oDropContainer===i&&this._sTargetAggregation===e){return this}if(this._oDragControl&&this._oDragControl!==t){this.endDrag()}this._oDragControl=t;this._oDragContainer=t.getParent();this._oDropContainer=i;this._sTargetAggregation=e;this._oCoreDragSession=o;this._mDragItemDimensions=this._getDimensions(t);this._bIsInSameContainer=this._oDragContainer===this._oDropContainer;if(this._bIsInSameContainer){this._iDragFromIndex=i.indexOfAggregation(e,t)}else{this._iDragFromIndex=null}i.getAggregation(e).forEach(function(t){t.addStyleClass("sapUiDnDGridControl")});this._attachEventDelegates();this._hideCoreDefaultIndicator();return this};n.prototype.handleDragOver=function(t){if(this._shouldFreeze(t.pageX,t.pageY)){return}this._hideCoreDefaultIndicator();var i=this._calculateDropPosition(t);if(!i){return}if(this._timeoutOnSamePosition(i)){if(i.targetControl===this._oDragControl){return}this._hideDraggedItem();this._showIndicator(i,t);this._freezeCurrentPosition(t.pageX,t.pageY)}};n.prototype.getSuggestedDropPosition=function(){return this._mLastDropPosition};n.prototype.setDropIndicatorSize=function(t){if(!t){this._mDropIndicatorSize=null;return}if(!t.rows||!t.columns){e.error("Custom indicator size for grid drag and drop is not valid. It must be an object with rows and columns properties: '{rows: <int>, columns: <int>}'.");this._mDropIndicatorSize=null;return}this._mDropIndicatorSize=t};n.prototype.scheduleEndDrag=function(){if(!this._isDragActive()){return}var t=this._oDropContainer.getBindingInfo(this._sTargetAggregation);if(t&&t.template){setTimeout(this.endDrag.bind(this),0)}else{this.endDrag()}};n.prototype.endDrag=function(){if(!this._isDragActive()){return}this._hideIndicator();this._showDraggedItem();this._removeEventDelegates();this._resetCoreDefaultIndicator();this._mDropIndicatorSize=null;this._oDragControl=null;this._oDropContainer=null;this._sTargetAggregation=null;this._iDragFromIndex=null;this._iDropPositionHoldStart=null;this._mLastDropPosition=null;this._mFreezePosition=null;this._oCoreDragSession=null};n.prototype._isDragActive=function(){return this._oDragControl&&this._oDropContainer};n.prototype._showIndicator=function(t,i){var e=this._oDropContainer,o=e.getDomRefForSetting(this._sTargetAggregation)||e.getDomRef(),r=t.targetControl,n=e.indexOfAggregation(this._sTargetAggregation,r),s,a,g;if(r){s=this._findContainingGridItem(r);a=s||r.$()}if(this._mDropIndicatorSize){g={"grid-row-start":"span "+this._mDropIndicatorSize.rows,"grid-column-start":"span "+this._mDropIndicatorSize.columns}}else{g={"grid-column-start":this._mDragItemDimensions.columnsSpan,"grid-row-start":this._mDragItemDimensions.rowsSpan}}if(g){this._$indicator.css(g)}if(a&&t.position=="Before"){this._$indicator.insertBefore(a)}else if(a){this._$indicator.insertAfter(a);n+=1}else{o.appendChild(this._$indicator[0])}this._$indicator.show();this._iDragFromIndex=n};n.prototype._hideIndicator=function(){this._$indicator.detach();this._$indicator.attr("style","")};n.prototype._hideDraggedItem=function(){this._oDragControl.$().hide();var t=this._findContainingGridItem(this._oDragControl);if(t&&this._bIsInSameContainer){t.hide()}};n.prototype._showDraggedItem=function(){if(this._oDragControl.getDomRef()){this._oDragControl.$().show()}var t=this._findContainingGridItem(this._oDragControl);if(t){t.show()}};n.prototype._hideCoreDefaultIndicator=function(){var t=this._oCoreDragSession.getIndicator(),e={visibility:"hidden",position:"relative"};this._oCoreDragSession.setIndicatorConfig(e);if(t){i(t).css(e)}};n.prototype._resetCoreDefaultIndicator=function(){var t=this._oCoreDragSession.getIndicator(),e={visibility:"visible",position:"absolute"};this._oCoreDragSession.setIndicatorConfig(e);if(t){i(t).css(e)}};n.prototype._timeoutOnSamePosition=function(t){if(!this._mLastDropPosition||t.targetControl!==this._mLastDropPosition.targetControl||t.position!=this._mLastDropPosition.position){this._iDropPositionHoldStart=Date.now();this._mLastDropPosition=t;return false}return Date.now()-this._iDropPositionHoldStart>this._iTimeoutBeforeDrop};n.prototype._shouldFreeze=function(t,i){var e=20;return this._mFreezePosition&&Math.abs(this._mFreezePosition.pageX-t)<e&&Math.abs(this._mFreezePosition.pageY-i)<e};n.prototype._freezeCurrentPosition=function(t,i){this._mFreezePosition={pageX:t,pageY:i}};n.prototype._calculateDropPosition=function(t){var i=this._findItemFromPoint(t.pageX,t.pageY),e,o,n;if(!i){e=this._findClosestItem(t.pageX,t.pageY)}if(e){i=e.target}if(e&&e.direction==="Left"){n="After"}if(!i){i=this._getLastItem();n="After"}if(!i){return{targetControl:null,position:"After"}}if(i.hasClass("sapUiDnDGridIndicator")){return null}o=r.closestTo(i[0],true);if(!n){n=this._calculateDropBeforeOrAfter(o,t)}return{targetControl:o,position:n}};n.prototype._calculateDropBeforeOrAfter=function(t,i){var e=this._getDimensions(t),o=e.rect;if(this._oDragControl===t){return"Before"}if(this._mDragItemDimensions.rect.width*1.5<o.width){var r=window.pageXOffset,n={left:o.left+r,width:o.width},s=i.pageX-n.left;return s<n.width*.5?"Before":"After"}if(this._iDragFromIndex===null){return"Before"}var a=this._oDropContainer.indexOfAggregation(this._sTargetAggregation,t);if(this._iDragFromIndex>a){return"Before"}return"After"};n.prototype._getDimensions=function(t){var i=this._findContainingGridItem(t);if(i){return{rect:i[0].getBoundingClientRect(),columnsSpan:i.css("grid-column-start"),rowsSpan:i.css("grid-row-start")}}return{rect:t.getDomRef().getBoundingClientRect(),columnsSpan:"span 1",rowsSpan:"span 1"}};n.prototype._findContainingGridItem=function(t){var i=t.$(),e=i.parent().css("display");if(e==="grid"||e==="inline-grid"){return i}e=i.parent().parent().css("display");if(e==="grid"||e==="inline-grid"){return i.parent()}return null};n.prototype._getLastItem=function(){var t=this._oDropContainer.getAggregation(this._sTargetAggregation),i;if(t&&t.length){i=t[t.length-1].$()}return i};n.prototype._findItemFromPoint=function(t,e){var o=document.elementFromPoint(t-window.pageXOffset,e-window.pageYOffset),r=i(o).closest(".sapUiDnDGridControl, .sapUiDnDGridIndicator");if(r.hasClass("sapUiDnDGridIndicator")){return r}if(r.hasClass("sapUiDnDGridControl")){return r}return null};n.prototype._findClosestItem=function(t,i){var e=o.getRTL(),r=e?-1:1,n=80*r,s=20,a,g,h=0,d=t-n;while(!a&&d>0&&h<4){a=this._findItemFromPoint(d,i);d-=n;h++}if(a){g="Left"}if(!a&&i-s>0){a=this._findItemFromPoint(t,i-20);g="Top"}return{target:a,direction:g}};n.prototype._removeEventDelegates=function(){if(this._oDropContainer){this._oDropContainer.removeEventDelegate(this._oDropContainerDelegate)}if(this._oDragControl){this._oDragControl.removeEventDelegate(this._oDragControlDelegate)}};n.prototype._attachEventDelegates=function(){this._removeEventDelegates();this._oDragControl.addEventDelegate(this._oDragControlDelegate,this);this._oDropContainer.addEventDelegate(this._oDropContainerDelegate,this)};n.prototype._onDragLeave=function(t){var i=document.elementFromPoint(t.pageX-window.pageXOffset,t.pageY-window.pageYOffset),e=this._oDropContainer.getDomRef().contains(i);if(!e){this.scheduleEndDrag()}};n.prototype._onDropContainerBeforeRendering=function(){if(!this._isDragActive()){return}this._hideIndicator()};n.prototype._onDropContainerAfterRendering=function(){if(!this._isDragActive()){return}this._hideDraggedItem();if(this._mLastDropPosition){this._showIndicator(this._mLastDropPosition)}};var s;n.getInstance=function(){if(!s){s=new n}return s};return n});