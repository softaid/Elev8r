// Copyright (c) 2009-2022 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/thirdparty/jquery"],function(e){"use strict";function t(){var e=document.activeElement?document.activeElement.tagName:"";return e==="INPUT"||e==="TEXTAREA"}var l=function(l){if(!l||!l.rootSelector||!l.containerSelector||!l.draggableSelector){throw new Error("No configuration object to initialize User Interaction module.")}this.captureStart=null;this.captureMove=null;this.captureEnd=null;this.clickCallback=null;this.clickEvent=null;this.clickHandler=null;this.clone=null;this.cloneClass=null;this.container=null;this.contextMenuEvent=null;this.debug=null;this.defaultDragStartEvent=null;this.defaultMouseMoveEvent=null;this.deltaTop=0;this.disabledDraggableSelector=null;this.dragAndScrollCallback=null;this.dragAndScrollDuration=null;this.dragAndScrollTimer=null;this.draggable=null;this.placeHolderClass=null;this.draggableSelector=null;this.draggableSelectorExclude=null;this.doubleTapCallback=null;this.doubleTapDelay=null;this.element=null;this.endDragAndScrollCallback=null;this.endX=null;this.endY=null;this.isLayoutEngine=null;this.isTouch=null;this.isCombi=null;this.lastElement=null;this.lastTapTime=null;this.lockMode=null;this.log=null;this.mode=null;this.mouseDownEvent=null;this.mouseMoveEvent=null;this.mouseUpEvent=null;this.moveTolerance=null;this.moveX=null;this.moveY=null;this.noop=null;this.onDragStartUIHandler=null;this.onDragEndUIHandler=null;this.preventClickFlag=null;this.preventClickTimeoutId=null;this.scrollContainer=null;this.scrollContainerSelector=null;this.scrollEvent=null;this.scrollTimer=null;this.startX=null;this.startY=null;this.switchModeDelay=null;this.tapsNumber=null;this.timer=null;this.scrollHandler=null;this.touchCancelEvent=null;this.dragCallback=null;this.onBeforeCreateClone=null;this.endCallback=null;this.touchEndEvent=null;this.touchMoveEvent=null;this.startCallback=null;this.touchStartEvent=null;this.wrapper=null;this.wrapperRect=null;this.scrollCallback=null;this.draggableElement=null;this.offsetLeft=0;this.elementsToCapture=null;this.init=function(l){this.startX=-1;this.startY=-1;this.moveX=-1;this.moveY=-1;this.endX=-1;this.endY=-1;this.noop=function(){};this.isLayoutEngine=l.isLayoutEngine||false;if(this.isLayoutEngine){this.moveDraggable=this.noop}this.isTouch=l.isTouch?!!l.isTouch:false;this.isCombi=l.isCombi?!!l.isCombi:false;this.container=document.querySelector(l.containerSelector);this.scrollContainerSelector=l.scrollContainerSelector||l.containerSelector;this.switchModeDelay=l.switchModeDelay||1500;this.dragAndScrollDuration=l.dragAndScrollDuration||160;this.moveTolerance=l.moveTolerance===0?0:l.moveTolerance||16;this.draggableSelector=l.draggableSelector;this.draggableSelectorBlocker=l.draggableSelectorBlocker||l.rootSelector;this.draggableSelectorExclude=l.draggableSelectorExclude;this.mode="normal";this.debug=l.debug||false;this.root=document.querySelector(l.rootSelector)||document.querySelector("#canvas");this.tapsNumber=0;this.lastTapTime=0;this.log=this.debug?this.logToConsole:this.noop;this.lockMode=false;this.placeHolderClass=l.placeHolderClass||"";this.cloneClass=l.cloneClass||"";this.deltaTop=l.deltaTop||0;this.wrapper=l.wrapperSelector?document.querySelector(l.wrapperSelector):this.container.parentNode;this.clickCallback=typeof l.clickCallback==="function"?l.clickCallback:this.noop;this.startCallback=typeof l.startCallback==="function"?l.startCallback:this.noop;this.doubleTapCallback=typeof l.doubleTapCallback==="function"?l.doubleTapCallback:this.noop;this.endCallback=typeof l.endCallback==="function"?l.endCallback:this.noop;this.dragCallback=typeof l.dragCallback==="function"?l.dragCallback:this.noop;this.onBeforeCreateClone=typeof l.onBeforeCreateClone==="function"?l.onBeforeCreateClone:this.noop;this.dragAndScrollCallback=typeof l.dragAndScrollCallback==="function"?l.dragAndScrollCallback:this.noop;this.endDragAndScrollCallback=typeof l.endDragAndScrollCallback==="function"?l.endDragAndScrollCallback:this.noop;this.scrollCallback=typeof l.scrollCallback==="function"?l.scrollCallback:this.noop;this.doubleTapDelay=l.doubleTapDelay||500;this.wrapperRect=this.wrapper.getBoundingClientRect();this.scrollEvent="scroll";this.touchStartEvent="touchstart";this.touchMoveEvent="touchmove";this.touchEndEvent="touchend";this.mouseDownEvent="mousedown";this.mouseMoveEvent="mousemove";this.mouseUpEvent="mouseup";this.contextMenuEvent="contextmenu";this.touchCancelEvent="touchcancel";this.defaultDragStartEvent="dragstart";this.defaultMouseMoveEvent="mousemove";this.clickEvent="click";this.isVerticalDragOnly=l.isVerticalDragOnly||false;this.draggableElement=l.draggableElement;this.offsetLeft=l.offsetLeft;this.elementsToCapture=l.elementToCapture?e(l.elementToCapture):this.root;this.disabledDraggableSelector=l.disabledDraggableSelector;this.onDragStartUIHandler=typeof l.onDragStartUIHandler==="function"?l.onDragStartUIHandler:this.noop;this.onDragEndUIHandler=typeof l.onDragEndUIHandler==="function"?l.onDragEndUIHandler:this.noop;this.defaultMouseMoveHandler=l.defaultMouseMoveHandler||function(e){if(t()){return}e.preventDefault()}};this.forEach=function(e,t){return Array.prototype.forEach.call(e,t)};this.indexOf=function(e,t){return Array.prototype.indexOf.call(e,t)};this.insertBefore=function(e,t,l){var i,s,n;n=Array.prototype.splice;i=this.indexOf(e,t);s=this.indexOf(e,l);n.call(e,s-(i<s?1:0),0,n.call(e,i,1)[0])};this.logToConsole=function(){window.console.log.apply(console,arguments)};this.getDraggableElement=function(t){var l,i=false,s=false;this.draggable=e(this.draggableSelector,this.container);while(typeof l==="undefined"&&t!==this.root&&!e(t).is(this.draggableSelectorBlocker)){i=i||e(t).is(this.draggableElement)||this.draggableElement===undefined;if(!(e(t).not(this.draggableSelectorExclude).length>0)){s=true}if(!s&&i&&this.indexOf(this.draggable,t)>=0){l=t}t=t.parentNode}return l};this.captureStart=function(e){var t;if(e.type==="touchstart"&&e.touches.length===1){t=e.touches[0]}else if(e.type==="mousedown"){t=e;if(e.which!==1){return}}if(t){this.element=this.getDraggableElement(t.target);this.startX=this.moveX=t.pageX;this.startY=this.moveY=t.pageY;this.lastMoveX=0;this.lastMoveY=0;if(this.lastTapTime&&this.lastElement&&this.element&&this.lastElement===this.element&&Math.abs(Date.now()-this.lastTapTime)<this.doubleTapDelay){this.lastTapTime=0;this.tapsNumber=2}else{this.lastTapTime=Date.now();this.tapsNumber=1;this.lastElement=this.element}this.log("captureStart("+this.startX+", "+this.startY+")")}};this.startHandler=function(t){this.log("startHandler");if(this.isCombi&&!(t instanceof MouseEvent)){this.isTouchEvent=true}clearTimeout(this.timer);delete this.timer;this.captureStart(t);if(this.element){this.startCallback(t,this.element);if(this.lockMode===false){if(this.tapsNumber===2){this.mode="double-tap";return}if(this.isTouch||this.isTouchEvent){this.timer=setTimeout(function(){if(!e(this.element).hasClass(this.disabledDraggableSelector)){this.log("mode switched to drag");this.mode="drag";this.onBeforeCreateClone(t,this.element);this.createClone();this.dragCallback(t,this.element)}else{this.onDragStartUIHandler()}this.isTouchEvent=false}.bind(this),this.switchModeDelay)}}}}.bind(this);this.captureMove=function(e){var t;if(e.type==="touchmove"&&e.touches.length===1){t=e.touches[0]}else if(e.type==="mousemove"){t=e}if(t){this.moveX=t.pageX;this.moveY=t.pageY;this.log("captureMove("+this.moveX+", "+this.moveY+")")}};this.moveHandler=function(l){if(t()){return}var i;this.log("moveHandler");this.captureMove(l);if(this.element&&l.type==="mousemove"&&l.buttons===0){return this.endHandler(l)}switch(this.mode){case"normal":if(Math.abs(this.startX-this.moveX)>this.moveTolerance||Math.abs(this.startY-this.moveY)>this.moveTolerance){if(this.isTouch||this.isTouchEvent){this.log("-> normal");clearTimeout(this.timer);delete this.timer}else if(this.element){this.onDragStartUIHandler();if(!e(this.element).hasClass(this.disabledDraggableSelector)){this.log("mode switched to drag");this.mode="drag";this.onBeforeCreateClone(l,this.element);this.createClone()}else{this.preventClick();this.element=null}}}break;case"drag":l.preventDefault();this.onDragStartUIHandler();this.log("-> drag");if(this.isVerticalDragOnly){this.mode="vertical-drag"}else{this.mode="drag-and-scroll"}window.addEventListener(this.mouseUpEvent,this.endHandler,true);this.translateClone();this.scrollContainer=document.querySelector(this.scrollContainerSelector);this.dragAndScroll();if(!this.isTouch){this.dragCallback(l,this.element)}break;case"drag-and-scroll":l.stopPropagation();l.preventDefault();this.log("-> drag-and-scroll");i=this.dragAndScroll();this.translateClone();if(!i){this.moveDraggable()}this.dragAndScrollCallback({evt:l,clone:this.clone,isScrolling:i,moveX:this.moveX,moveY:this.moveY});break;case"vertical-drag":l.stopPropagation();l.preventDefault();i=this.dragAndScroll();this.translateClone();if(!i){this.moveDraggableVerticalOnly(this.moveX,this.moveY)}this.dragAndScrollCallback({evt:l,clone:this.clone,isScrolling:i,moveX:this.moveX,moveY:this.moveY});break;default:break}}.bind(this);this.captureEnd=function(e){var t;if((e.type==="touchend"||e.type==="touchcancel")&&e.changedTouches.length===1){t=e.changedTouches[0]}else if(e.type==="mouseup"){t=e}if(t){this.endX=t.pageX;this.endY=t.pageY;this.log("captureEnd("+this.endX+", "+this.endY+")")}};this.contextMenuHandler=function(e){if(this.isTouch){e.preventDefault()}}.bind(this);this.clickHandler=function(e){if(this.preventClickFlag){this.preventClickFlag=false;e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();clearTimeout(this.preventClickTimeoutId)}this.clickCallback()}.bind(this);this.preventClick=function(){this.preventClickFlag=true;this.preventClickTimeoutId=setTimeout(function(){this.preventClickFlag=false}.bind(this),100)};this.endCallbackAdapter=function(t,l,i){var s=this.endCallback.apply(null,arguments);e.when(s).then(function(){this.removeClone(l,i.clone);this.onDragEndUIHandler(t)}.bind(this));this.preventClick()};this.endHandler=function(e){this.log("endHandler");this.captureEnd(e);switch(this.mode){case"normal":this.onDragEndUIHandler(e);this.log("-> normal");break;case"drag":this.log("-> drag");this.endCallbackAdapter(e,this.element,{clone:this.clone});break;case"drag-and-scroll":this.log("-> drag-and-scroll");window.removeEventListener(this.mouseUpEvent,this.endHandler,true);this.endCallbackAdapter(e,this.element,{deltaX:this.moveX-this.startX,deltaY:this.moveY-this.startY,clone:this.clone});e.stopPropagation();e.preventDefault();break;case"vertical-drag":this.log("-> vertical-drag");window.removeEventListener(this.mouseUpEvent,this.endHandler,true);this.endCallbackAdapter(e,this.element,{clone:this.clone});e.stopPropagation();e.preventDefault();break;case"double-tap":this.log("-> double-tap");this.doubleTapCallback(e,this.element);break;default:break}clearTimeout(this.timer);delete this.timer;this.lastMoveX=0;this.lastMoveY=0;this.element=null;this.clone=null;this.mode="normal"}.bind(this);this.defaultDragStartHandler=function(e){e.preventDefault()};this.scrollHandler=function(){clearTimeout(this.scrollTimer);this.lockMode=true;this.scrollTimer=setTimeout(function(){this.lockMode=false}.bind(this),500)}.bind(this);this.createClone=function(){var e,t;this.preventClickFlag=true;if(sap.ui.getCore().byId(this.element.id)&&sap.ui.getCore().byId(this.element.id).getBoundingRects){t=sap.ui.getCore().byId(this.element.id).getBoundingRects()[0];t.top=t.offset.y;t.left=t.offset.x;t.width+=5}else{t=this.element.getBoundingClientRect()}this.clone=this.element.cloneNode(true);this.clone.removeAttribute("id");this.clone.removeAttribute("data-sap-ui");this.clone.className+=" "+this.cloneClass;this.element.className+=" "+this.placeHolderClass;e=this.clone.style;e.position="fixed";e.display="block";e.top=t.top+this.deltaTop+"px";e.left=t.left+"px";e.width=t.width+"px";e.zIndex="100";this.root.appendChild(this.clone);this.log("createClone")};this.removeClone=function(e,t){this.preventClick();e.className=e.className.split(" "+this.placeHolderClass).join("");t.parentElement.removeChild(t);this.log("removeClone")};this.translateClone=function(){var e,t;e=this.moveX-this.startX;t=this.moveY-this.startY;this.clone.style.webkitTransform="translate3d("+e+"px, "+t+"px, 0px)";this.clone.style.mozTransform="translate3d("+e+"px, "+t+"px, 0px)";this.clone.style.msTransform="translate("+e+"px, "+t+"px)";this.clone.style.transform="translate3d("+e+"px, "+t+"px, 0px)";this.log("translateClone ("+e+", "+t+")")};this.dragAndScroll=function(){var e,t,l=this;function i(){var e,t;if(l.clone){e=l.clone.getBoundingClientRect();t=l.wrapperRect.top-e.top;if(t>0){return t}t=l.wrapper.offsetTop+l.wrapper.offsetHeight-(e.top+l.clone.offsetHeight);if(t<0){return t}}return 0}function s(){if(l.endDragAndScrollCallback(l.moveY)){return false}if(e<0){return l.wrapper.getBoundingClientRect().top-(l.container.getBoundingClientRect().top+l.container.offsetHeight)+l.wrapper.offsetHeight<0}return l.container.getBoundingClientRect().top-(l.wrapper.getBoundingClientRect().top+l.container.offsetTop)<0}function n(){l.dragAndScrollTimer=setTimeout(function(){l.wrapper.scrollTop-=e;l.dragAndScrollTimer=undefined;if((e=i())!==0&&s()){n()}l.scrollCallback()},t)}e=i();if(e!==0&&!this.dragAndScrollTimer&&s()){t=this.dragAndScrollDuration;this.scrollContainer=this.scrollContainer||document.querySelector(this.scrollContainerSelector);n()}this.log("dragAndScroll ("+e+")");return e!=0&&s()};this.moveDraggableVerticalOnly=function(){var e,t,l,i=true;this.forEach(this.draggable,function(s,n){if(!e){l=s.getBoundingClientRect();t=!(l.bottom<this.moveY||l.top>this.moveY);if(t){e=s;if(l.top+l.height/2<this.moveY){i=false}}}}.bind(this));if(e&&this.element!==e){if(i){this.insertBefore(this.draggable,this.element,e);e.parentNode.insertBefore(this.element,e)}else{this.insertBefore(this.draggable,this.element,e.nextSibling);e.parentNode.insertBefore(this.element,e.nextSibling)}this.lastMoveX=this.moveX;this.lastMoveY=this.moveY}this.log("moveDraggableVerticalonly")};this.moveDraggable=function(e,t){var l,i,s,n,a,o;this.forEach(this.draggable,function(e,t){if(!i){o=e.getBoundingClientRect();n=!(o.right<this.moveX||o.left>this.moveX);a=!(o.bottom<this.moveY||o.top>this.moveY);if(n&&a){i=e;s=t}}}.bind(this));if(i&&this.element!==i){l=this.indexOf(this.draggable,this.element);if(Math.abs(this.lastMoveX-this.moveX)>=this.moveTolerance||Math.abs(this.lastMoveY-this.moveY)>=this.moveTolerance){if(s<=l){i.parentNode.insertBefore(this.element,i);this.insertBefore(this.draggable,this.element,i)}else if(s>l){i.parentNode.insertBefore(this.element,i.nextSibling);this.insertBefore(this.draggable,this.element,this.draggable[s+1])}this.lastMoveX=this.moveX;this.lastMoveY=this.moveY}}this.log("moveDraggable")};this.enable=function(){this.log("enable");this.root.addEventListener(this.touchMoveEvent,this.moveHandler,true);this.root.addEventListener(this.mouseMoveEvent,this.moveHandler,true);this.root.addEventListener(this.contextMenuEvent,this.contextMenuHandler,false);this.root.addEventListener(this.clickEvent,this.clickHandler,true);this.root.addEventListener(this.defaultDragStartEvent,this.defaultDragStartHandler,true);this.root.addEventListener(this.defaultMouseMoveEvent,this.defaultMouseMoveHandler,true);this.wrapper.addEventListener(this.scrollEvent,this.scrollHandler,false);if(this.elementsToCapture.length){var e=this;this.elementsToCapture.each(function(){this.addEventListener(e.touchStartEvent,e.startHandler,false);this.addEventListener(e.touchEndEvent,e.endHandler,false);this.addEventListener(e.touchCancelEvent,e.endHandler,false);this.addEventListener(e.mouseDownEvent,e.startHandler,false);this.addEventListener(e.mouseUpEvent,e.endHandler,false)})}else{this.elementsToCapture.addEventListener(this.touchStartEvent,this.startHandler,false);this.elementsToCapture.addEventListener(this.touchEndEvent,this.endHandler,false);this.elementsToCapture.addEventListener(this.touchCancelEvent,this.endHandler,false);this.elementsToCapture.addEventListener(this.mouseDownEvent,this.startHandler,false);this.elementsToCapture.addEventListener(this.mouseUpEvent,this.endHandler,false)}return this};this.delete=function(){this.log("delete");this.disable();this.dragCallback=null;this.onBeforeCreateClone=null;this.endCallback=null;this.startCallback=null;this.scrollCallback=null;this.doubleTapCallback=null;this.clickCallback=null;this.dragAndScrollCallback=null;delete this};this.disable=function(){this.log("disable");if(this.elementsToCapture.length){var e=this;this.elementsToCapture.each(function(){this.removeEventListener(e.touchStartEvent,e.startHandler,false);this.removeEventListener(e.touchEndEvent,e.endHandler,false);this.removeEventListener(e.touchCancelEvent,e.endHandler,false);this.removeEventListener(e.mouseDownEvent,e.startHandler,false);this.removeEventListener(e.mouseUpEvent,e.endHandler,false)})}else{this.elementsToCapture.removeEventListener(this.touchStartEvent,this.startHandler,false);this.elementsToCapture.removeEventListener(this.touchEndEvent,this.endHandler,false);this.elementsToCapture.removeEventListener(this.touchCancelEvent,this.endHandler,false);this.elementsToCapture.removeEventListener(this.mouseDownEvent,this.startHandler,false);this.elementsToCapture.removeEventListener(this.mouseUpEvent,this.endHandler,false)}this.root.removeEventListener(this.touchMoveEvent,this.moveHandler,true);this.root.removeEventListener(this.mouseMoveEvent,this.moveHandler,true);this.root.removeEventListener(this.contextMenuEvent,this.contextMenuHandler,false);this.root.removeEventListener(this.clickEvent,this.clickHandler,true);this.root.removeEventListener(this.defaultDragStartEvent,this.defaultDragStartHandler,true);this.root.removeEventListener(this.defaultMouseMoveEvent,this.defaultMouseMoveHandler,true);this.wrapper.removeEventListener(this.scrollEvent,this.scrollHandler,false);return this};this.init(l);this.getMove=function(){return{x:this.moveX,y:this.moveY}}};return l},false);