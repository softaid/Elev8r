/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Renderer","./InputRenderer","sap/ui/Device","sap/ui/core/LabelEnablement","sap/ui/core/Configuration"],function(e,t,i,n,a){"use strict";var r=e.extend(t);r.apiVersion=2;r.writeInnerAttributes=function(e,t){var n=t.getParent(),s=this.getAccessibilityState(t);e.attr("type",i.system.desktop?"text":"number");if(a.getRTL()){e.attr("dir","ltr")}s.disabled=null;if(r._isStepInput(n)){e.accessibilityState(n,s)}};r.getAriaRole=function(e){return"spinbutton"};r.getAccessibilityState=function(e){var a=t.getAccessibilityState.apply(this,arguments),s,u,p,l,c,o,f,g,b,d=e.getParent(),y=e.getValue();if(!r._isStepInput(d)){return a}s=d._getMin();u=d._getMax();p=d.getValue();l=d.getDescription();o=d.getAriaLabelledBy();f=n.getReferencingLabels(d);g=d.getAriaDescribedBy().join(" ");a.valuenow=p;if(i.system.desktop&&y){a.valuetext=y}if(l){c=d._getInput().getId()+"-descr";if(o.indexOf(c)===-1){o.push(c)}}b=f.concat(o).join(" ");if(typeof s==="number"){a.valuemin=s}if(typeof u==="number"){a.valuemax=u}if(!d.getEditable()){a.readonly=true}if(g){a.describedby=g}if(b){a.labelledby=b}return a};r._isStepInput=function(e){return e&&e.getMetadata().getName()==="sap.m.StepInput"};return r});