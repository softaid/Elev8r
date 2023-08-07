/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/core/Control","sap/ui/core/delegate/ItemNavigation","./SegmentedButtonRenderer"],function(t,e,o,i){"use strict";var n=e.extend("sap.ui.commons.SegmentedButton",{metadata:{interfaces:["sap.ui.commons.ToolbarItem","sap.ui.core.IFormContent"],library:"sap.ui.commons",deprecated:true,properties:{enabled:{type:"boolean",group:"Misc",defaultValue:true}},aggregations:{buttons:{type:"sap.ui.commons.Button",multiple:true,singularName:"button"}},associations:{selectedButton:{type:"sap.ui.commons.Button",multiple:false}},events:{select:{parameters:{selectedButtonId:{type:"string"}}}}}});n.prototype.init=function(){if(!this._oItemNavigation){this._oItemNavigation=new o;this._oItemNavigation.setCycling(true);this.addDelegate(this._oItemNavigation)}this._oButtonDelegate={oSegmentedButton:this,onAfterRendering:this._buttonOnAfterRendering}};n.prototype.exit=function(){if(this._oItemNavigation){this.removeDelegate(this._oItemNavigation);this._oItemNavigation.destroy();delete this._oItemNavigation}};n.prototype.onAfterRendering=function(){this._setItemNavigation(true)};n.prototype._buttonSelected=function(t){var e=sap.ui.getCore().byId(this.getSelectedButton()),o=t.getSource();if(o!==e){this.setSelectedButton(o);this.fireSelect({selectedButtonId:o.getId()})}};n.prototype._setItemNavigation=function(t){var e,o,i=[];if(!this.getEnabled()){return}if(this.getDomRef()){this._oItemNavigation.setRootDomRef(this.getDomRef("radiogroup"));o=this.getButtons();for(var n=0;n<o.length;n++){e=o[n];i.push(e.getDomRef());this._setAriaInfo(e,n+1);if(t){e.removeDelegate(this._oButtonDelegate);e.addDelegate(this._oButtonDelegate)}}this._oItemNavigation.setItemDomRefs(i)}};n.prototype._setAriaInfo=function(e,o){var i=t(e.getDomRef()),n=this.getButtons().length;i.attr("aria-posinset",o);i.attr("aria-setsize",n);i.attr("role","radio");if(e.getId()===this.getSelectedButton()){i.attr("aria-checked","true");i.removeAttr("aria-describedby")}else{i.removeAttr("aria-checked");i.attr("aria-describedby",this.getId()+"-label")}};n.prototype._buttonOnAfterRendering=function(){this.oSegmentedButton._setItemNavigation()};n.prototype._rerenderButtons=function(){var t=this.$();if(t.length>0){var e=sap.ui.getCore().createRenderManager();i.renderButtons(e,this);e.flush(t[0]);e.destroy()}};n.prototype.addButton=function(t){this.addAggregation("buttons",t,true);t.attachPress(this._buttonSelected,this);this._rerenderButtons();return this};n.prototype.insertButton=function(t,e){this.insertAggregation("buttons",t,e,true);t.attachPress(this._buttonSelected,this);this._rerenderButtons();return this};n.prototype.removeButton=function(t){var e=this.removeAggregation("buttons",t,true);if(e){e.detachPress(this._buttonSelected,this);e.removeDelegate(this._oButtonDelegate);this._rerenderButtons()}return e};n.prototype.removeAllButtons=function(){var e=this.removeAllAggregation("buttons",true);t.each(e,function(t,e){e.detachPress(this._buttonSelected,this);e.removeDelegate(this._oButtonDelegate)});this._rerenderButtons();return e};n.prototype.setSelectedButton=function(t){var e,o=sap.ui.getCore().byId(this.getSelectedButton());this.setAssociation("selectedButton",t,true);e=sap.ui.getCore().byId(this.getSelectedButton());this._setItemNavigation();var i=this.getButtons();for(var n=0;n<i.length;n++){if(i[n]===e){this._oItemNavigation.setFocusedIndex(n);break}}if(o){o.removeStyleClass("sapUiSegButtonSelected");o.$().trigger("blur")}if(o&&o._icon){o.setIcon(o._icon);o._icon=null}if(e){if(e.getIconHovered()){e._icon=e.getIcon();e.setIcon(e.getIconHovered())}e.addStyleClass("sapUiSegButtonSelected")}return this};n.prototype.setEnabled=function(e){t.each(this.getButtons(),function(t,o){o.setEnabled(e)});if(this._oItemNavigation&&!e){this.removeDelegate(this._oItemNavigation)}else{this.addDelegate(this._oItemNavigation)}this.setProperty("enabled",e);return this};n.prototype.clone=function(t){var o=this.getButtons(),i,n=0;for(;n<o.length;n++){i=o[n];i.detachPress(this._buttonSelected,this)}var s=e.prototype.clone.apply(this,arguments);for(n=0;n<o.length;n++){i=o[n];i.attachPress(this._buttonSelected,this)}return s};n.prototype.getFocusDomRef=function(){return this.getDomRef("radiogroup")||null};return n});