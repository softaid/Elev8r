/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5) (c) Copyright 2009-2012 SAP AG. All rights reserved
 */
sap.ui.define(["./VoAbstract","sap/ui/unified/Menu","jquery.sap.global","sap/base/Log","./library"],function(e,t,i,r,n){"use strict";var a=e.extend("sap.ui.vbm.VoAggregation",{metadata:{library:"sap.ui.vbm",properties:{minSel:{type:"string",group:"Misc",defaultValue:"0"},maxSel:{type:"string",group:"Misc",defaultValue:"n"},customProperties:{type:"string[]",group:"Misc"}},events:{handleMoved:{parameters:{instance:{type:"sap.ui.vbm.VoBase"},handle:{type:"int"}}},handleContextMenu:{parameters:{instance:{type:"sap.ui.vbm.VoBase"},menu:{type:"sap.ui.unified.Menu"},handle:{type:"int"}}},handleClick:{parameters:{instance:{type:"sap.ui.vbm.VoBase"},handle:{type:"int"}}},select:{parameters:{selected:{type:"array"}}},deselect:{parameters:{deselected:{type:"array"}}},click:{parameters:{instance:{type:"sap.ui.vbm.VoBase"}}},contextMenu:{parameters:{instance:{type:"sap.ui.vbm.VoBase"},menu:{type:"sap.ui.unified.Menu"}}},drop:{parameters:{instance:{type:"sap.ui.vbm.Spot"},dragSource:{type:"sap.ui.vbm.VoBase"}}}}}});a.prototype.init=function(){this.aDiff=[];this.aUniqueIdx=[];this.currentIdx=1e3;this.setProperty("customProperties",[],true);this.bUseExtendedChangeDetection=true};a.prototype.handleSelectEvent=function(e){var t=[];var i=[];for(var r=0;r<e.length;++r){var n=e[r];var a=this.getItems();if(a){for(var s=0,o=a.length;s<o;++s){if(a[s].UniqueId==n.K){var l=n["VB:s"]=="true"?true:false;var p=a[s].getSelect();if(l!=p){if(l){a[s].setProperty("select",true,true);if(this.mEventRegistry["select"]){t.push(a[s])}}else{a[s].setProperty("select",false,true);if(this.mEventRegistry["deselect"]){i.push(a[s])}}}}}}}if(i.length){this.fireDeselect({deselected:i})}if(t.length){this.fireSelect({selected:t})}};a.prototype.isEventRegistered=function(e){var t=this.getItems();if(!t){return false}for(var i=0,r=t.length;i<r;++i){var n=t[i];if(n.mEventRegistry[e]){return true}}return false};a.prototype.findSelected=function(e,t){var r=this.getItems();if(!r){return null}var n=[];if(i.type(t)=="object"){if(t["VB:s"]==(e?"true":"false")){for(var a=0;a<r.length;++a){if(r[a].UniqueId==t["K"]){n.push(r[a])}}}}else if(i.type(t)=="array"){for(var s=0;s<t.length;++s){if(t[s]["VB:s"]==(e?"true":"false")){for(var o=0;o<r.length;++o){if(r[o].UniqueId==t[s]["K"]){n.push(r[o])}}}}}return n};a.prototype.findInstance=function(e){var t=this.getItems();if(!t){return false}var i=e.indexOf(".")!==-1?e.split(".")[1]:e;for(var r=0,n=this.aUniqueIdx.length;r<n;++r){if(this.aUniqueIdx[r]===i){return t[r]}}return null};a.prototype.findInstanceByKey=function(e){var t=this.getItems();if(!t){return false}var i=e.indexOf(".")!==-1?e.split(".")[1]:e;for(var r=0,n=t.length;r<n;++r){if(t[r].getKey()===i){return t[r]}}return null};a.prototype.getActionArray=function(){var e=this.getId();var t=[];if(this.mEventRegistry["handleMoved"]||this.isEventRegistered("handleMoved")){t.push({id:e+"4",name:"handleMoved",refScene:"MainScene",refVO:e,refEvent:"HandleMoved"})}if(this.mEventRegistry["handleContextMenu"]||this.isEventRegistered("handleContextMenu")){t.push({id:e+"5",name:"handleContextMenu",refScene:"MainScene",refVO:e,refEvent:"HandleContextMenu"})}if(this.mEventRegistry["handleClick"]||this.isEventRegistered("handleClick")){t.push({id:e+"6",name:"handleClick",refScene:"MainScene",refVO:e,refEvent:"HandleClick"})}var i;var r=(i=this.getTemplateBindingInfo())?i.hasOwnProperty("select"):false;if((this.mEventRegistry["select"]||this.mEventRegistry["deselect"]||r)&&!this.isEventRegistered("click")){t.push({id:e+"9",name:"click",refScene:"MainScene",refVO:e,refEvent:"Click"})}return t};a.prototype.getBindInfo=function(){var t=e.prototype.getBindInfo.apply(this,arguments);var i=this.getTemplateBindingInfo();t.HS=i?i.hasOwnProperty("hotScale"):true;t.HDC=i?i.hasOwnProperty("hotDeltaColor"):true;t.SC=i?i.hasOwnProperty("selectColor"):true;t.FS=i?i.hasOwnProperty("fxsize"):true;t.FD=i?i.hasOwnProperty("fxdir"):true;t.ET=i?i.hasOwnProperty("entity"):true;t.LT=i?i.hasOwnProperty("labelText"):true;t.LBC=i?i.hasOwnProperty("labelBgColor"):true;t.LBBC=i?i.hasOwnProperty("labelBorderColor"):true;t.AR=i?i.hasOwnProperty("labelArrow"):true;t.LP=i?i.hasOwnProperty("labelPos"):true;t.TT=i?i.hasOwnProperty("tooltip"):true;t.DD=i?i.hasOwnProperty("dragData"):true;t.M=i?i.hasOwnProperty("changeable"):true;t.DS=i?i.hasOwnProperty("dragSource"):true;t.DT=i?i.hasOwnProperty("dropTarget"):true;t.LabelType=i?i.hasOwnProperty("labelType"):true;return t};a.prototype.getTemplateObject=function(){var t=e.prototype.getTemplateObject.apply(this,arguments);var i=this.mBindInfo=this.getBindInfo();var r=i.hasTemplate?this.getBindingInfo("items").template:null;this.bHasType=i.LabelType||r.mProperties["labelType"]!==sap.ui.vbm.SemanticType.None;if(i.HS){t["hotScale.bind"]=t.id+".HS"}else{t.hotScale=r.getHotScale()}if(i.HDC){t["hotDeltaColor.bind"]=t.id+".HDC"}else{t.hotDeltaColor=r.getHotDeltaColor()}if(i.SC){t["selectColor.bind"]=t.id+".SC"}else{t.selectColor=r.getSelectColor()}if(i.FS){t["fxsize.bind"]=t.id+".FS"}else{t.fxsize=r.getFxsize()}if(i.FD){t["fxdir.bind"]=t.id+".FD"}else{t.fxdir=r.getFxdir()}if(i.ET){t["entity.bind"]=t.id+".ET"}else{t.entity=r.getEntity()}if(i.LT){t["labelText.bind"]=t.id+".LT"}else{t.labelText=r.getLabelText()}if(this.bHasType){t["labelIcon.bind"]=t.id+".LIC";t["labelIconBgrdCol.bind"]=t.id+".LICC";t["labelIconTextCol.bind"]=t.id+".LICTC";t["labelBgColor.bind"]=t.id+".LBC";t["labelBorderColor.bind"]=t.id+".LBBC"}else{if(i.LBC){t["labelBgColor.bind"]=t.id+".LBC"}else{t.labelBgColor=r.getLabelBgColor()}if(i.LBBC){t["labelBorderColor.bind"]=t.id+".LBBC"}else{t.labelBorderColor=r.getLabelBorderColor()}}if(i.AR){t["labelArrow.bind"]=t.id+".AR"}else{t.labelArrow=r.getLabelArrow()}if(i.LP){t["labelPos.bind"]=t.id+".LP"}else{t.labelPos=r.getLabelPos()}if(i.TT){t["tooltip.bind"]=t.id+".TT"}else{t.tooltip=r.getTooltip()}if(i.DD){t["dragdata.bind"]=t.id+".DD"}else{t.dragdata=r.getDragData()}if(!i.M){t["VB:c"]=r.getChangeable()}t.altBorderDeltaColor="#676767";return t};a.prototype.getTypeObject=function(){var t=e.prototype.getTypeObject.apply(this,arguments);var i=this.getMinSel();if(i!="0"&&i!="1"){i="0"}var r=this.getMaxSel();if(r!="0"&&r!="1"&&r!="n"||r=="n"){r="-1"}t["minSel"]=i;t["maxSel"]=r;var n=this.mBindInfo;if(n.HS){t.A.push({name:"HS",alias:"HS",type:"vector"})}if(n.HDC){t.A.push({name:"HDC",alias:"HDC",type:"string"})}if(n.SC){t.A.push({name:"SC",alias:"SC",type:"string"})}if(n.FS){t.A.push({name:"FS",alias:"FS",type:"boolean"})}if(n.ET){t.A.push({name:"ET",alias:"ET",type:"string"})}if(n.LT){t.A.push({name:"LT",alias:"LT",type:"string"})}if(this.bHasType){t.A.push({name:"LBC",alias:"LBC",type:"color"});t.A.push({name:"LBBC",alias:"LBBC",type:"color"});t.A.push({name:"LIC",alias:"LIC",type:"string"});t.A.push({name:"LICC",alias:"LICC",type:"color"});t.A.push({name:"LICTC",alias:"LICTC",type:"color"})}else{if(n.LBC){t.A.push({name:"LBC",alias:"LBC",type:"color"})}if(n.LBBC){t.A.push({name:"LBBC",alias:"LBBC",type:"color"})}}if(n.AR){t.A.push({name:"AR",alias:"AR",type:"boolean"})}if(n.LIC){t.A.push({name:"LIC",alias:"LIC",type:"string"})}if(n.LP){t.A.push({name:"LP",alias:"LP",type:"long"})}if(n.TT){t.A.push({name:"TT",alias:"TT",type:"string"})}if(n.DD){t.A.push({name:"DD",alias:"DD",type:"string"})}if(n.DS||n.DT){t.N=[];if(n.DS){t.N.push({name:"DS",A:{name:"DGT",alias:"A",type:"string"}})}if(n.DT){t.N.push({name:"DT",A:{name:"DPT",alias:"A",type:"string"}})}}var a=this.getCustomProperties();for(var s=0;s<a.length;++s){t.A.push({name:a[s],alias:a[s],type:"string"})}return t};a.prototype.getDragItemTemplate=function(e){var t=this.mBindInfo;var i=this.getDragSource();var r=[];for(var n=0,a=i.length;n<a;++n){r.push({type:i[n].getType()})}if(t.DS){r.push({datasource:e+".DS","type.bind":e+".DS.DGT"})}return r};a.prototype.getDropItemTemplate=function(e){var t=this.mBindInfo;var i=this.getDropTarget();var r=[];for(var n=0,a=i.length;n<a;++n){r.push({type:i[n].getType()})}if(t.DT){r.push({datasource:e+".DT","type.bind":e+".DT.DPT"})}return r};a.prototype.openDetailWindow=function(e,t,i){var r=this.getParent();r.mDTWindowCxt.bUseClickPos=i;r.mDTWindowCxt.open=true;r.mDTWindowCxt.src=e;r.mDTWindowCxt.key=e.getKey();r.mDTWindowCxt.params=t;r.m_bWindowsDirty=true;r.invalidate(this)};a.prototype.handleChangedData=function(e){if(e&&e.length){for(var t=0,i,r;t<e.length;++t){i=e[t];r=this.findInstance(i.K);if(r){r.handleChangedData(i)}}}};a.prototype.handleEvent=function(e){var i=e.Action.name;var n="fire"+i[0].toUpperCase()+i.slice(1);var a;if(a=this.findInstance(e.Action.instance)){var s={data:e};if(i.indexOf("handle")===0){s.handle=e.Action.Params.Param[2]["#"]}switch(i){case"click":if(e.Action.AddActionProperties&&e.Action.AddActionProperties.AddActionProperty.length&&e.Action.AddActionProperties.AddActionProperty[0].name=="pos"){a.mClickGeoPos=e.Action.AddActionProperties.AddActionProperty[0]["#"]}break;case"contextMenu":case"handleContextMenu":a.mClickPos=[e.Action.Params.Param[0]["#"],e.Action.Params.Param[1]["#"]];if(this.oParent.mVBIContext.m_Menus){this.oParent.mVBIContext.m_Menus.deleteMenu("DynContextMenu")}var o=new t;o.vbi_data={};o.vbi_data.menuRef="CTM";o.vbi_data.VBIName="DynContextMenu";s.menu=o;break;case"drop":var l=e.Action.Params.Param[0]["#"].split("|");var p=l[1];var f=l[2].split(".")[1];var u=this.getParent().getAggregatorContainer(p).findInstanceByKey(f);s.oDragSource=u;break;default:break}if(a.mEventRegistry[i]){if(n in a){a[n](s)}else{a.fireEvent(i,s)}}if(this.mEventRegistry[i]){s.instance=a;this[n](s)}}else{r.error("Instance for event not found","","sap.ui.vbm.VoAggregation")}};a.prototype.getChangeType=function(e){var t=0;var i=0;var r=0;var n=this.getItems().length;var a=[];var s,o;for(s=0;s<n;++s){a.push(2)}var l,p,f;for(o=0;o<e.length;++o){if(e[o].type=="delete"){f=false;p=0;l=0;while(!f){if(p==e[o].index&&a[l]!=0){a[l]=0;t++;break}else if(a[l]!=0){p++}l++}}else if(e[o].type=="insert"){if(e[o].index>=n){i++}else{f=false;p=0;l=0;while(!f){if(p==e[o].index&&a[l]==0){a[l]=2;r++;break}else if(a[l]!=0){p++}l++}}}}if(e.length&&r==t&&t==e.length/2){return 1}if(t==e.length){return 2}if(i==e.length){return 3}return 0};a.prototype.unbindAggregation=function(t){if(t==="items"){this.m_bAggRenew=true}e.prototype.unbindAggregation.apply(this,arguments)};a.prototype.updateAggregation=function(t){var i=this.mBindingInfos["items"],r=i&&i.binding||null;e.prototype.updateAggregation.apply(this,arguments);if(t==="items"&&r){var n=this.getItems();var a=this.sId;var s="0";var o=r.getCurrentContexts();if(o.diff&&!this.m_bAggChange&&!this.m_bAggRenew){var l=this.getChangeType(o.diff);if(l==2){for(var p=0;p<o.diff.length;++p){var f=o.diff[p].index;s=this.aUniqueIdx[f];var u={K:s};var h={name:a,E:u};var d={name:a,type:"E",N:h};this.aDiff.push({type:"delete",object:d});this.aUniqueIdx.splice(f,1);for(var g=0;g<n.length-1;++g){n[g].UniqueId=this.aUniqueIdx[g]}}this.m_bAggChange=true}else if(l==3||l==1){for(var y=0;y<o.diff.length;++y){if(o.diff[y].type=="insert"){this.aDiff.push({type:"insert",idx:o.diff[y].index})}}this.m_bAggChange=true}else{this.m_bAggRenew=true}}}};a.prototype.invalidate=function(e){var t;if(!this.m_bAggRenew){this.m_bAggRenew=true;if(e&&this.getParent()){t=this.aUniqueIdx.indexOf(e.UniqueId);if(t>-1){var i=false;for(var r=0;r<this.aDiff.length&&!i;++r){if(this.aDiff[r].type=="insert"&&this.aDiff[r].idx==t){i=true}}if(!i){this.aDiff.push({type:"insert",idx:t})}this.m_bAggChange=true;this.m_bAggRenew=false}}}sap.ui.core.Control.prototype.invalidate.apply(this,arguments)};a.prototype.resetIndices=function(){var e=this.getItems();for(var t=0;t<e.length;++t){e[t].UniqueId=undefined}};a.prototype.getUniqueIdx=function(){return this.currentIdx++};a.prototype.updateIdxArray=function(){this.aUniqueIdx=[];var e=this.getItems();for(var t=0;t<e.length;++t){this.aUniqueIdx.push(e[t].UniqueId)}};a.prototype.addUnique=function(e){this.aUniqueIdx.push(e)};a.prototype.setCustomProperties=function(e){this._oCPMap=null;return this.setProperty("customProperties",e)};a.prototype.getCustomPropertiesMap=function(){if(!this._oCPMap){this._oCPMap={};var e=this.getCustomProperties();for(var t=0;t<e.length;++t){this._oCPMap[e[t]]=true}}return this._oCPMap};a.prototype.isSelectable=function(){return this.getMaxSel()!=="0"};a.prototype.isSubscribed=function(e,t){if(this.hasListeners(e)){return true}if(t){var i=this.getItems()[t];return i&&i.hasListeners(e)}return false};return a});