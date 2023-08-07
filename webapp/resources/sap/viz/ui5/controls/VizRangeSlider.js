/*!
 * SAPUI5
 * (c) Copyright 2009-2022 SAP SE. All rights reserved.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","./VizSliderBasic","./VizRangeSliderRenderer","sap/m/ResponsiveScale","sap/ui/core/InvisibleText","sap/viz/library","sap/base/Log"],function(t,e,i,a,n,s,o){"use strict";var l=e.extend("sap.viz.ui5.controls.VizRangeSlider",{metadata:{library:"sap.viz",properties:{value2:{type:"float",group:"Data",defaultValue:100},range:{type:"float[]",group:"Data",defaultValue:[0,100]},left:{type:"string",group:"Data",defaultValue:"0px"},top:{type:"string",group:"Data",defaultValue:"0px"},height:{type:"string",group:"Data",defaultValue:"0px"},showPercentageLabel:{type:"boolean",group:"Appearance",defaultValue:true},showStartEndLabel:{type:"boolean",group:"Appearance",defaultValue:true}}},renderer:i});var r={RANGE_MOVEMENT_THRESHOLD:32,CHARACTER_WIDTH_PX:8,INPUT_STATE_NONE:"None",INPUT_STATE_ERROR:"Error"};l.prototype.init=function(){var t,i;e.prototype.init.call(this,arguments);this._bInitialRangeChecks=true;this._bRTL=sap.ui.getCore().getConfiguration().getRTL();this._aInitialFocusRange=this.getRange();this._iLongestRangeTextWidth=0;this._fTooltipHalfWidthPercent=0;this._oResourceBundle=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._ariaUpdateDelay=[];t=new n({text:this._oResourceBundle.getText("RANGE_SLIDER_LEFT_HANDLE")});i=new n({text:this._oResourceBundle.getText("RANGE_SLIDER_RIGHT_HANDLE")});this._mHandleTooltip={start:{handle:null,tooltip:null,label:t},end:{handle:null,tooltip:null,label:i}}};l.prototype.exit=function(){this._oResourceBundle=null;this._aInitialFocusRange=null;this._liveChangeLastValue=null;if(this._oRangeLabel){this._oRangeLabel.destroy()}this._oRangeLabel=null;if(this.getInputsAsTooltips()){if(this._mHandleTooltip.start.tooltip){this._mHandleTooltip.start.tooltip.destroy()}if(this._mHandleTooltip.end.tooltip){this._mHandleTooltip.end.tooltip.destroy()}}if(this._mHandleTooltip.start.label){this._mHandleTooltip.start.label.destroy()}if(this._mHandleTooltip.end.label){this._mHandleTooltip.end.label.destroy()}this._mHandleTooltip.start.handle=null;this._mHandleTooltip.start.tooltip=null;this._mHandleTooltip.start.label=null;this._mHandleTooltip.end.handle=null;this._mHandleTooltip.end.tooltip=null;this._mHandleTooltip.end.label=null;this._ariaUpdateDelay=null;this._iDecimalPrecision=null};l.prototype.onBeforeRendering=function(){var t=[Math.abs(this.getMin()),Math.abs(this.getMax())],e=t[0]>t[1]?0:1,i=!!this.getInputsAsTooltips(),s=this.getRange();this._bInitialRangeChecks=false;this.setRange(s);if(!this._oRangeLabel){this._oRangeLabel=new n({text:this._oResourceBundle.getText("RANGE_SLIDER_RANGE_HANDLE")})}this._validateProperties();this._iLongestRangeTextWidth=(t[e].toString().length+this.getDecimalPrecisionOfNumber(this.getStep())+1)*r.CHARACTER_WIDTH_PX;if(!this._mHandleTooltip.start.tooltip){this._mHandleTooltip.start.tooltip=i?this._createInputField("LeftTooltip",this._mHandleTooltip.start.label):null}if(!this._mHandleTooltip.end.tooltip){this._mHandleTooltip.end.tooltip=i?this._createInputField("RightTooltip",this._mHandleTooltip.end.label):null}this._mHandleTooltip.bTooltipsSwapped=false;this._iDecimalPrecision=this.getDecimalPrecisionOfNumber(this.getStep());if(this.getEnableTickmarks()&&!this.getAggregation("scale")){this.setAggregation("scale",new a)}};l.prototype.onAfterRendering=function(){e.prototype.onAfterRendering.apply(this,arguments);var t=this.getRange(),i=this.getMin(),a=this.getMax(),n=t.reduce(function(t,e){return t||e<i||e>a},false);this._mHandleTooltip.start.handle=this.getDomRef("handle1");this._mHandleTooltip.end.handle=this.getDomRef("handle2");if(!this.getInputsAsTooltips()){this._mHandleTooltip.start.tooltip=this.$("LeftTooltip");this._mHandleTooltip.end.tooltip=this.$("RightTooltip")}this._recalculateStyles();if(n){o.warning("Warning: "+"Property wrong range: ["+t+"] not in the range: ["+i+","+a+"]",this)}this.$("TooltipsContainer").css("min-width",this._fTooltipHalfWidthPercent*4+"%");this._updateHandle(this._mHandleTooltip.start.handle,t[0]);this._updateHandle(this._mHandleTooltip.end.handle,t[1]);if(t[0]>t[1]){this._swapTooltips(t)}};l.prototype._recalculateRange=function(){var t,e,i,a,n=this._bRTL?"right":"left";t=[parseFloat(this._mHandleTooltip.start.handle.style[n]),parseFloat(this._mHandleTooltip.end.handle.style[n])];e=Math.min.apply(Math,t)+"%";i=100-Math.max.apply(Math,t)+"%";a=this.getDomRef("progress");if(this._bRTL){a.style.left=i;a.style.right=e}else{a.style.left=e;a.style.right=i}var s=this.getDomRef("leftMock");var o=this.getDomRef("rightMock");var l=this.getDomRef("label");var r=this.getRange();var h=Math.min(r[0],r[1]);var p=Math.max(r[0],r[1]);s.style.right=(this.getMax()-h)/(this.getMax()-this.getMin())*100+"%";o.style.left=(p-this.getMin())/(this.getMax()-this.getMin())*100+"%";l.style.left=(p+h)/(this.getMax()-this.getMin())*50+"%";l.innerHTML=((p-h)/(this.getMax()-this.getMin())*100).toFixed(0)+"%";return this};l.prototype.getClosestHandleDomRef=function(t){var e=this._mHandleTooltip.start.handle,i=this._mHandleTooltip.end.handle,a=Math.abs(t.pageX-e.offsetLeft-this._fSliderPaddingLeft-this._fSliderOffsetLeft),n=Math.abs(t.clientX-i.offsetLeft-this._fSliderPaddingLeft-this._fSliderOffsetLeft);return a>n?i:e};l.prototype._getIndexOfHandle=function(t){if(t&&t.getAttribute&&t.getAttribute("data-range-val")==="start"){return 0}else if(t&&t.getAttribute&&t.getAttribute("data-range-val")==="end"){return 1}else{return-1}};l.prototype._updateHandle=function(t,e){var i=this._mHandleTooltip.start.handle===t?this._mHandleTooltip.start.tooltip:this._mHandleTooltip.end.tooltip,a=this.getRange(),n=this._getIndexOfHandle(t),s=this._getPercentOfValue(e);a[n]=e;this._updateRangePropertyDependencies(a);this._updateHandleDom(t,a,n,e,s);this._updateTooltipContent(i,e);this._adjustTooltipsContainer(s);this._recalculateRange()};l.prototype._updateHandleDom=function(t,e,i,a,n){var s,o=this.getRenderer().CSS_CLASS,l=this.getDomRef("input");if(this.getName()){l.setAttribute(t.getAttribute("data-range-val"),e[i]);l.setAttribute("value",this.getValue())}if(this._bRTL){t.style.right=n+"%"}else{t.style.left=n+"%"}if(this.getShowHandleTooltip()){t.title=a}s=e[0]===e[1];this.$("handle1").toggleClass(o+"HandleOverlap",s);this.$("handle2").toggleClass(o+"HandleOverlap",s);clearTimeout(this._ariaUpdateDelay[i]);this._ariaUpdateDelay[i]=setTimeout(this["_updateHandleAria"].bind(this,t,a),100)};l.prototype._updateHandleAria=function(t,e){var i=this.getRange(),a=this.getDomRef("progress"),n=this._mHandleTooltip.start,s=this._mHandleTooltip.end,o=this.getShowStartEndLabel(),l=this.getShowPercentageLabel(),r=i[1]-i[0];this._updateHandlesAriaLabels();if(n.tooltip&&s.tooltip){var h=[n.tooltip.getEncodedText(),s.tooltip.getEncodedText()];var p=l?". Range Width is "+r+"%":" ";var d=o?h:["",""];var g=o?this._oResourceBundle.getText("RANGE_SLIDER_RANGE_ANNOUNCEMENT",h):"";t.setAttribute("aria-valuenow",e);n.handle.setAttribute("aria-valuetext",d[0]+p);s.handle.setAttribute("aria-valuetext",d[1]+p);if(a){a.setAttribute("aria-valuenow",i.join("-"));a.setAttribute("aria-valuetext",g+p)}}};l.prototype._updateHandlesAriaLabels=function(){var t=this.getRange(),e=this._mHandleTooltip.start.label;if(t[0]>t[1]&&!this._mHandleTooltip.bAriaHandlesSwapped||t[0]<t[1]&&this._mHandleTooltip.bAriaHandlesSwapped){this._mHandleTooltip.start.label=this._mHandleTooltip.end.label;this._mHandleTooltip.end.label=e;if(this._mHandleTooltip.start.handle){this._mHandleTooltip.start.handle.setAttribute("aria-labelledby",this._mHandleTooltip.start.label.getId())}if(this._mHandleTooltip.end.handle){this._mHandleTooltip.end.handle.setAttribute("aria-labelledby",this._mHandleTooltip.end.label.getId())}this._mHandleTooltip.bAriaHandlesSwapped=!this._mHandleTooltip.bAriaHandlesSwapped}};l.CHARACTER_WIDTH_PX=12;l.prototype._updateTooltipContent=function(t,e){var i=this.getRange();var a=Math.max(i[0],i[1]);var n=Math.min(i[0],i[1]);a=a>this.getMax()?this.getMax():a;n=n<this.getMin()?this.getMin():n;var s=this._mHandleTooltip.start.tooltip;var o=t===s?"start":"end";if(n===a){if(n===0){a++}if(n===100){n--}}var r=t===s?n:a;if(this._parentFrame){r=this._parentFrame._getTooltipContent(n,a,o)}t.text(r);var h=this.getDomRef("LeftTooltip");var p=this.getDomRef("RightTooltip");var d=Math.max(h.innerHTML.length,p.innerHTML.length);d=d*l.CHARACTER_WIDTH_PX;this._iLongestRangeTextWidth=d;h.style.width=this._iLongestRangeTextWidth+"px";p.style.width=this._iLongestRangeTextWidth+"px";this._recalculateStyles();this.$("TooltipsContainer").css("min-width",this._fTooltipHalfWidthPercent*4+"%")};l.prototype._swapTooltips=function(t){var e=this._mHandleTooltip.start.tooltip;if(t[0]>=t[1]&&!this._mHandleTooltip.bTooltipsSwapped||t[0]<=t[1]&&this._mHandleTooltip.bTooltipsSwapped){this._mHandleTooltip.start.tooltip=this._mHandleTooltip.end.tooltip;this._mHandleTooltip.end.tooltip=e;this._updateTooltipContent(this._mHandleTooltip.start.tooltip,t[0]);this._updateTooltipContent(this._mHandleTooltip.end.tooltip,t[1]);if(this.getInputsAsTooltips()){this._mHandleTooltip.start.handle.setAttribute("aria-controls",this._mHandleTooltip.start.tooltip.getId());this._mHandleTooltip.end.handle.setAttribute("aria-controls",this._mHandleTooltip.end.tooltip.getId())}this._mHandleTooltip.bTooltipsSwapped=!this._mHandleTooltip.bTooltipsSwapped}};l.prototype._adjustTooltipsContainer=function(){var t,e=this.getDomRef("TooltipsContainer"),i=this._bRTL?"right":"left",a=this._bRTL?"left":"right",n=this.getRange(),s=this._getPercentOfValue(n[0]>n[1]?n[1]:n[0]),o=this._getPercentOfValue(n[0]>n[1]?n[0]:n[1]),l=this._fHandleWidthPercent/2,r=(o-s)/2>this._fTooltipHalfWidthPercent?this._fTooltipHalfWidthPercent:(o-s)/2,h=Math.floor(100-2*this._fTooltipHalfWidthPercent-r+this._fHandleWidthPercent),p=parseFloat(e.style[i]),d=parseFloat(e.style[a]);if(s-this._fTooltipHalfWidthPercent<=l){p=-1*this._fHandleWidthPercent}else if(s>=h){p=100-4*this._fTooltipHalfWidthPercent+this._fHandleWidthPercent}else if(o-s>this._fTooltipHalfWidthPercent*2&&s>-1*this._fTooltipHalfWidthPercent){p=s-this._fTooltipHalfWidthPercent}else{t=s-this._fTooltipHalfWidthPercent-(this._fTooltipHalfWidthPercent*2-(o-s))/2;if(t<=-1*this._fHandleWidthPercent){p=-1*this._fHandleWidthPercent}else{p=t}}if(o>=100-l||100-o-this._fTooltipHalfWidthPercent<-this._fHandleWidthPercent){d=-1*this._fHandleWidthPercent}else{d=100-o-this._fTooltipHalfWidthPercent}e.style[i]=p+"%";e.style[a]=d+"%";this._swapTooltips(n)};l.prototype._handleInputChange=function(t,e){var i,a,n=this._mHandleTooltip.bTooltipsSwapped,s=Number(e.getParameter("value"));if(e.getParameter("value")===""||isNaN(s)||s<this.getMin()||s>this.getMax()){t.setValueState(r.INPUT_STATE_ERROR);return}s=this._adjustRangeValue(s);t.setValueState(r.INPUT_STATE_NONE);i=this._mHandleTooltip.start.tooltip===t?this._mHandleTooltip.start.handle:this._mHandleTooltip.end.handle;this._updateHandle(i,s);if(n!==this._mHandleTooltip.bTooltipsSwapped){a=this._mHandleTooltip.start.tooltip!==t?this._mHandleTooltip.start.tooltip:this._mHandleTooltip.end.tooltip;a.focus()}this._fireChangeAndLiveChange({range:this.getRange()})};l.prototype._updateDOMAfterSetters=function(t,e,i){var a,n;if(this.getDomRef()){a=this._getPercentOfValue(t);n=i===1?this._mHandleTooltip.end:this._mHandleTooltip.start;this._updateHandleDom(n.handle,e,i,t,a);this._updateTooltipContent(n.tooltip,t);return true}return false};l.prototype.setRange=function(t){t=t.map(this._adjustRangeValue,this);this._updateRangePropertyDependencies(t);if(this._updateDOMAfterSetters(t[0],t,0)&&this._updateDOMAfterSetters(t[1],t,1)){this._recalculateRange()}return this};l.prototype.setValue=function(t){var e=this.getRange();if(typeof t!=="number"||!isFinite(t)){return this}t=this._adjustRangeValue(t);e[0]=t;this._updateRangePropertyDependencies(e);if(this._updateDOMAfterSetters(e[0],e,0)){this._recalculateRange()}return this};l.prototype.setValue2=function(t){var e=this.getRange();t=this._adjustRangeValue(t);e[1]=t;this._updateRangePropertyDependencies(e);if(this._updateDOMAfterSetters(e[1],e,1)){this._recalculateRange()}return this};l.prototype._updateRangePropertyDependencies=function(t){var e=Array.isArray(t)?t.slice():[];if(this.getProperty("value")!==e[0]){this.setProperty("value",e[0],true)}if(this.getProperty("value2")!==e[1]){this.setProperty("value2",e[1],true)}this.setProperty("range",e,true)};l.prototype._calculateHandlePosition=function(t,e){var i=this.getMax(),a=this.getMin(),n=e||0,s;s=(t-this._fSliderPaddingLeft-this._fSliderOffsetLeft)/this._fSliderWidth*(i-a)+a;if(this._bRTL){s=this._convertValueToRtlMode(s)}return this._adjustRangeValue(s,n)};l.prototype._adjustRangeValue=function(t,e){var i=this.getMax(),a=this.getMin(),n=this.getStep(),s=e||0,o;if(this._bInitialRangeChecks){return t}o=Math.abs((t-a)%n);if(o!==0){t=o*2>=n?t+n-o:t-o}var l=s<0?s:0;var r=s>0?s:0;if(t<a+l){t=a+l}else if(t>i+r){t=i+r}return t};l.prototype.ontouchstart=function(e){var i=e.targetTouches[0],a=this.getRenderer().CSS_CLASS,n="."+a,s,o,l,r,h;if(!this.getEnabled()){return}e.setMarked();if(e.target.className.indexOf("sapMInput")===-1){e.preventDefault()}this._recalculateStyles();if(["number","text"].indexOf(e.target.type)>-1){return}s=this._calculateHandlePosition(i.pageX);l=this.getRange();o=[this._mHandleTooltip.start.handle,this._mHandleTooltip.end.handle];r=this._getIndexOfHandle(e.target);var p=0;if(r!==-1){o=[this.getDomRef(r===0?"handle1":"handle2")];p=s-l[r]}else if(s<Math.min.apply(Math,l)||s>Math.max.apply(Math,l)){o=[s<Math.min.apply(Math,l)?this._mHandleTooltip.start.handle:this._mHandleTooltip.end.handle];this._updateHandle(o[0],s);this._fireChangeAndLiveChange({range:this.getRange()})}t(document).on("touchend"+n+" touchcancel"+n+" mouseup"+n,this._ontouchend.bind(this,o)).on("touchmove"+n+(e.originalEvent.type!=="touchstart"?" mousemove"+n:""),this._ontouchmove.bind(this,s,this.getRange(),o,p));o.map(function(t){if(t.className.indexOf(a+"HandlePressed")===-1){t.className+=" "+a+"HandlePressed"}});var d=this.getDomRef("progress");if(o.length===1){h=o[0];if(d.className.indexOf(a+"ProgressResized")===-1){d.className+=" "+a+"ProgressResized"}}else{h=d}setTimeout(h["focus"].bind(h),0)};l.prototype._ontouchmove=function(t,e,i,a,n){var s,o,l,r,h=n.targetTouches?n.targetTouches[0].pageX:n.pageX,p=this.getMax(),d=this.getMin(),g=[],u=[];n.preventDefault();n.setMarked();if(n.isMarked("delayedMouseEvent")||!this.getEnabled()||n.button){return}s=this._calculateHandlePosition(h,a)-t;for(var f=0;f<e.length;f++){g[f]=e[f]+s}u=this._getNormalizedRange(this.getRange(),e,i);o=g.every(function(t,e){return t===u[e]});l=g.every(function(t){return t>=d&&t<=p});r=u.indexOf(d)>-1||u.indexOf(p)>-1;if(!o){if(i.length===1||l||!r){if(i.length===1){this._positionCheck(i,s,e)}else{i.map(function(t){this._updateHandle(t,e[this._getIndexOfHandle(t)]+s)},this)}}this._adjustTooltipsContainer();u=this._getNormalizedRange(this.getRange(),e,i)}this.setRange(u)};l.prototype._positionCheck=function(t,e,i){var a=this._getIndexOfHandle(t[0]);var n=this.getRange();var s=i[a]+e;var o=[];for(var l=0;l<n.length;l++){o[l]=n[l]}o[a]=s;if(o[0]>=o[1]-1){s=n[1-a]+(a===1?1:-1)}this._updateHandle(t[0],s)};l.prototype._triggerLiveChange=function(){var t,e=this.getRange();this._liveChangeLastValue=this._liveChangeLastValue||[];t=e.some(function(t,e){return t!==this._liveChangeLastValue[e]},this);if(t){this._liveChangeLastValue=e.slice();this.fireLiveChange({range:e})}};l.prototype._getNormalizedRange=function(t,e,i){var a=this.getMax(),n=this.getMin(),s=Math.abs(e[0]-e[1]),o=[],l,r;for(l=0;l<t.length;l++){o[l]=t[l]<n?n:t[l];o[l]=t[l]>a?a:o[l];if(i.length===2){if(o[0]==n){o[1]=o[0]+s}else{r=Math.abs(l-1);o[r]=o[l]<=n?o[l]+s:o[r];o[r]=o[l]>=a?o[l]-s:o[r]}}}return o};l.prototype._ontouchend=function(e,i){var a=this.getRange(),n=this.getRenderer().CSS_CLASS,s=this.getDomRef("progress");i.setMarked();s.className=s.className.replace(new RegExp(" ?"+n+"ProgressResized","gi"),"");e&&e.map(function(t){t.className=t.className.replace(new RegExp(" ?"+n+"HandlePressed","gi"),"")});t(document).off("."+n);this._recalculateRange();if(this._aInitialFocusRange[0]!==a[0]||this._aInitialFocusRange[1]!==a[1]){this._aInitialFocusRange=Array.prototype.slice.call(a);this.fireChange({range:a})}this._updateTooltipContent(this._mHandleTooltip.start.tooltip,a[0]);this._updateTooltipContent(this._mHandleTooltip.end.tooltip,a[1])};l.prototype.onfocusin=function(t){var e=this.getRenderer().CSS_CLASS;this.$("progress").addClass("focus");this.$("TooltipsContainer").addClass(e+"HandleTooltipsShow");if(!this._hasFocus()){this._aInitialFocusRange=this.getRange()}};l.prototype._updateSliderValues=function(t,e){var i=this.getRange(),a=this.getMax(),n=this.getMin(),s=Math.max.apply(null,i),o=Math.min.apply(null,i),l=this._getIndexOfHandle(e),r=t<0?-1:1,h=l>-1?[e]:[this._mHandleTooltip.start.handle,this._mHandleTooltip.end.handle];if(h.length===1){var p=Math.abs(s-o);if(p<=Math.abs(t)&&(l===1&&r===-1||l===0&&r===1)){t=r*(p-1)}o=s=i[l]}if(s+t>a){t=r*(Math.abs(a)-Math.abs(s))}else if(o+t<n){t=r*(Math.abs(o)-Math.abs(n))}h.map(function(e){this._updateHandle(e,i[this._getIndexOfHandle(e)]+t)},this)};l.prototype.onsapincrease=function(t){if(["number","text"].indexOf(t.target.type)>-1){return}t.preventDefault();t.setMarked();if(this.getEnabled()){this._updateSliderValues(this.getStep(),t.target);this._fireChangeAndLiveChange({range:this.getRange()})}};l.prototype.onsapplus=l.prototype.onsapincrease;l.prototype.onsapincreasemodifiers=function(t){if(["number","text"].indexOf(t.target.type)>-1||t.altKey){return}t.preventDefault();t.stopPropagation();t.setMarked();if(this.getEnabled()){this._updateSliderValues(this._getLongStep(),t.target);this._fireChangeAndLiveChange({range:this.getRange()})}};l.prototype.onsappageup=l.prototype.onsapincreasemodifiers;l.prototype.onsapdecrease=function(t){if(["number","text"].indexOf(t.target.type)>-1){return}t.preventDefault();t.setMarked();if(this.getEnabled()){this._updateSliderValues(-1*this.getStep(),t.target);this._fireChangeAndLiveChange({range:this.getRange()})}};l.prototype.onsapminus=l.prototype.onsapdecrease;l.prototype.onsapdecreasemodifiers=function(t){if(["number","text"].indexOf(t.target.type)>-1||t.altKey){return}t.preventDefault();t.stopPropagation();t.setMarked();if(this.getEnabled()){this._updateSliderValues(-1*this._getLongStep(),t.target);this._fireChangeAndLiveChange({range:this.getRange()})}};l.prototype.onsappagedown=l.prototype.onsapdecreasemodifiers;l.prototype.onsaphome=function(t){if(["number","text"].indexOf(t.target.type)>-1){return}t.setMarked();t.preventDefault();if(this.getEnabled()){this._updateSliderValues(-1*this.getMax(),t.target);this._fireChangeAndLiveChange({range:this.getRange()})}};l.prototype.onsapend=function(t){if(["number","text"].indexOf(t.target.type)>-1){return}t.setMarked();t.preventDefault();if(this.getEnabled()){this._updateSliderValues(this.getMax(),t.target);this._fireChangeAndLiveChange({range:this.getRange()})}};l.prototype.onsapescape=function(){this.setRange(this._aInitialFocusRange);this._fireChangeAndLiveChange({range:this.getRange()})};l.prototype.setParentFrame=function(t){this._parentFrame=t};return l});