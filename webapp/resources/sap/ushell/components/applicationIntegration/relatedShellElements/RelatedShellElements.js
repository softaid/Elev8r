// Copyright (c) 2009-2022 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/thirdparty/jquery","sap/base/Log"],function(e,t){"use strict";function n(){var n=[],a,i,s={},o,l=false,r={},d,h=[],c={home:{actions:[]},app:{actions:["aboutBtn"]},minimal:{actions:["aboutBtn"]},standalone:{actions:["aboutBtn"]},embedded:{actions:["aboutBtn"]},"embedded-home":{actions:["aboutBtn"]},lean:{actions:["aboutBtn"]}},u={home:{NWBC:{headerless:"headerless",default:"minimal"},TR:{headerless:"minimal",default:"minimal"},default:{default:"home"}},app:{NWBC:{headerless:"headerless",default:"minimal"},TR:{headerless:"minimal",default:"minimal"},default:{default:"app"}}};this.init=function(e,t){a=e;if(t&&t.length>0){Object.keys(c).forEach(function(e){c[e].actions=t.concat(c[e].actions)})}};this.processDangling=function(){var e,t;for(e=0;e<n.length;e++){t=n.pop();t.func.apply(this,t.args)}};this.setDangling=function(e){l=e};this.calculateElementsState=function(e,t,n,a){var i=u[e]?u[e]:u.default,s=i[a?undefined:t]?i[t]:i.default,o=s[n]?s[n]:s.default;return o};this.createCustomShellState=function(t){var n={currentState:{stateName:t,headEndItems:[],paneContent:[],headItems:[],actions:[],floatingActions:[],subHeader:[],toolAreaItems:[],RightFloatingContainerItems:[],application:{},showRightFloatingContainer:undefined,headerHeading:undefined}},a=c[t];if(a){e.extend(n.currentState,a)}return n};this.createExtendedShellState=function(e,t){var n,a=this.createCustomShellState(e);n=i.extendedShellStates;if(n[e]){return false}o=a;t();if(n[e]){n[e].customState=a}else{n[e]={managedObjects:[],customState:a}}o=i.customShellState;return true};this.assignNew=function(e){s=this.createCustomShellState(e);i.customShellState=s;i.aTriggers=[];i.extendedShellStates={};i.oCheckPoints={};this._updateModel();o=i.customShellState};this._genericSetItem=function(e,t){var n=e.split("/");var i=n.pop();var s=n.reduce(function(e,t){return e[t]},o.currentState);s[i]=t;a._renderShellState()};this._genericAddItems=function(e,t){var n=o.currentState[e];o.currentState[e]=n.concat(t);a._renderShellState()};this.genericSetItem=function(e,t){if(l){n.push({func:this._genericSetItem,args:arguments})}else{this._genericSetItem(e,t)}};this.genericAddItems=function(e,t){if(l){n.push({func:this.genericAddItems,args:arguments})}else{this._genericAddItems(e,t)}};this.setShellModelForApplications=function(e,n){var a=["paneContent","headItems","RightFloatingContainerItems","toolAreaItems","floatingActions","showRightFloatingContainer","headEndItems","headerVisible","subHeader","actions"];if(a.indexOf(e)>-1){this.genericSetItem(e,n)}else{t.error("Not a valid attribute:"+e)}};this.addShellModelForApplications=function(e,n){var a=["paneContent","headItems","RightFloatingContainerItems","toolAreaItems","floatingActions","showRightFloatingContainer","headEndItems","headerVisible","subHeader","actions"];if(a.indexOf(e)>-1){this.genericAddItems(e,n)}else{t.error("Not a valid attribute:"+e)}};this.setStateModelToUpdate=function(e){o=e};this.getStateModelToUpdate=function(){return o};this.model=function(){if(!i){this.create()}d={customShellState:i.customShellState,aTriggers:i.aTriggers,extendedShellStates:i.extendedShellStates,oCheckPoints:i.oCheckPoints};return d};this._updateModel=function(){if(d){d.customShellState=i.customShellState;d.aTriggers=i.aTriggers;d.extendedShellStates=i.extendedShellStates;d.oCheckPoints=i.oCheckPoints}};this.getAppRelatedElement=function(){return{customShellState:i.customShellState,aTriggers:i.aTriggers,extendedShellStates:i.extendedShellStates,oCheckPoints:i.oCheckPoints}};this.create=function(){i={extendedShellStates:{},oCheckPoints:r,aTriggers:h,customShellState:{currentState:{stateName:"app",headEndItems:[],paneContent:[],headItems:[],actions:["aboutBtn"],floatingActions:[],subHeader:[],toolAreaItems:[],RightFloatingContainerItems:[],application:{},showRightFloatingContainer:undefined,headerHeading:undefined}}};o=i.customShellState;this._updateModel();return i};this.restore=function(e){if(e&&e.appRelatedElements){var t=e.appRelatedElements;i.aTriggers=t.aTriggers;i.extendedShellStates=t.extendedShellStates;i.oCheckPoints=t.oCheckPoints;i.customShellState=t.customShellState}this._updateModel();o=i.customShellState};this.store=function(e){};this.clean=function(){i=undefined};this.destroy=function(e){}}return new n},true);