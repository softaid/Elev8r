/*!
 * SAPUI5
 * (c) Copyright 2009-2022 SAP SE. All rights reserved.
 */
sap.ui.define(["./ToolbarContentMoveHandler","sap/ui/core/Core"],function(e,a){"use strict";function t(e){var a=e;while(a){if(n(a)||a.isA("sap.m.Column")){return true}a=a.getParent()}return false}function n(e){return e.isA(["sap.m.Table","sap.ui.table.Table","sap.ui.table.TreeTable","sap.ui.table.AnalyticalTable"])}function o(e){return e.isA(["sap.m.Toolbar","sap.m.OverflowToolbar"])}function i(e){var a=e;while(a){if(a.isA(["sap.m.ColumnListItem","sap.ui.table.Row"])){return true}a=a.getParent()}return false}function l(e){return e.isA(["sap.ui.comp.navpopover.SmartLink","sap.m.ObjectIdentifier"])}function r(e){var a=null;if(e.isA("sap.m.Table")){a=["alternateRowColors","backgroundDesign","footerText","growing","growingDirection","growingScrollToLoad","growingThreshold","growingTriggerText","includeItemInSelection","mode","noDataText","popinLayout","showSeparators","sticky"]}else if(e.isA(["sap.ui.table.Table","sap.ui.table.TreeTable","sap.ui.table.AnalyticalTable"])){a=["rowHeight","columnHeaderHeight","visibleRowCount","selectionMode","selectionBehavior","threshold","visibleRowCountMode","minAutoRowCount","enableColumnFreeze","alternateRowColors"]}else if(e.isA(["sap.m.Column"])){a=["hAlign","width","autoPopinWidth"]}else if(e.isA(["sap.ui.table.Column"])){a=["hAlign","width","minWidth"]}if(!a){return undefined}var t={};var n=e.getMetadata().getAllProperties();for(var o in n){t[n[o].name]={ignore:a.indexOf(n[o].name)<0}}return t}return{name:"{name}",description:"{description}",actions:{compVariant:function(e){if(e.isA("sap.ui.comp.smarttable.SmartTable")&&e.getUseVariantManagement()&&e.getUseTablePersonalisation()&&e.getPersistencyKey()&&e.getVariantManagement()&&e.getVariantManagement().isA("sap.ui.comp.smartvariants.SmartVariantManagement")&&e.getVariantManagement().isVariantAdaptationEnabled()){return{name:"VIEWSETTINGS_TITLE",changeType:"variantContent",handler:function(e,a){return new Promise(function(t){var n=function(e){t(e)};e.openDialogForKeyUser(a.styleClass,n)})}}}},settings:{toolbarActionMove:{name:a.getLibraryResourceBundle("sap.ui.comp").getText("SMARTTABLE_RTA_REARRANGE_TOOLBAR_CONTENT_MENU"),changeType:"ToolbarContentMove",isEnabled:e.isEnabled,icon:"sap-icon://share",handler:e.handleToolbarSettings,CAUTION_variantIndependent:true}}},aggregations:{customToolbar:{ignore:true},semanticObjectController:{ignore:true},noData:{ignore:true},items:{propagateMetadata:function(e){if(o(e)){return{actions:{addXML:{jsOnly:true}},aggregations:{content:{actions:{move:null}}}}}else if(n(e)){return{properties:r(e),actionsEffectiveAfter:"RECREATE",actions:null,aggregations:{columns:{specialIndexHandling:true}}}}else if(e.isA("sap.m.ColumnListItem")){return{actionsEffectiveAfter:"RECREATE",actions:null,aggregations:{cells:{specialIndexHandling:true}}}}else if(!l(e)){if(e.isA(["sap.m.Title","sap.m.ColumnListItem","sap.ui.table.Row"])||i(e)){return{actions:"not-adaptable"}}else if(e.isA(["sap.m.Column","sap.ui.table.Column","sap.ui.table.AnalyticalColumn"])){return{properties:r(e),actions:null}}else if(e.getParent()&&o(e.getParent())){if(e.hasStyleClass("sapUiCompSmartTableToolbarContent")&&!e.hasStyleClass("sapUiCompSmartTableToolbarContentAllowAdaption")){return{actions:"not-adaptable"}}}else if(t(e)){return{actions:null}}}}}},annotations:{sortable:{namespace:"Org.OData.Capabilities.V1",annotation:"SortRestrictions",target:["EntitySet"],allowList:{properties:["NonSortableProperties"]},defaultValue:true,interpretation:"exclude",appliesTo:["columns/#"],group:["Behavior"],since:"1.28.1"},filterable:{namespace:"Org.OData.Capabilities.V1",annotation:"FilterRestrictions",target:["EntitySet"],allowList:{properties:["NonFilterableProperties"]},defaultValue:true,interpretation:"exclude",appliesTo:["columns/#"],group:["Behavior"],since:"1.28.1"},columnLabelOnProperty:{namespace:"com.sap.vocabularies.Common.v1",annotation:"Label",target:["Property","PropertyPath"],defaultValue:null,appliesTo:["columns/#/label"],group:["Appearance","Behavior"],since:"1.28.1"},columnVisible:{namespace:"com.sap.vocabularies.Common.v1",annotation:"FieldControlType",target:["Property"],allowList:{values:["Hidden"]},defaultValue:false,appliesTo:["columns/#/visible"],group:["Behavior"],since:"1.28.1"},columnCurrencyCode:{namespace:"Org.OData.Measures.V1",annotation:"ISOCurrency",target:["Property"],defaultValue:null,appliesTo:["columns/#/cellContent"],group:["Behavior"],since:"1.28.1"},columnUnitOfMeasure:{namespace:"Org.OData.Measures.V1",annotation:"Unit",target:["Property"],defaultValue:null,appliesTo:["columns/#/cellContent"],group:["Behavior"],since:"1.28.1"},columnUpperCase:{namespace:"com.sap.vocabularies.Common.v1",annotation:"IsUpperCase",target:["Property","Parameter"],defaultValue:true,appliesTo:["columns/#","columns/#/cellContent"],group:["Behavior"],since:"1.28.1"},columnCalendarDate:{namespace:"com.sap.vocabularies.Common.v1",annotation:"IsCalendarDate",target:["Property"],defaultValue:true,appliesTo:["columns/#/cellContent"],group:["Behavior"],since:"1.54"},lineItem:{namespace:"com.sap.vocabularies.UI.v1",annotation:"LineItem",target:["EntityType"],allowList:{types:["DataFieldWithUrl","DataField"]},defaultValue:null,appliesTo:["columns"],group:["Behavior"],since:"1.28.1"},dataFieldDefault:{namespace:"com.sap.vocabularies.UI.v1",annotation:"DataFieldDefault",target:["Property"],allowList:{types:["DataFieldWithUrl","DataField"]},defaultValue:null,appliesTo:["columns"],group:["Behavior"],since:"1.65"},presentationVariant:{namespace:"com.sap.vocabularies.UI.v1",annotation:"PresentationVariant",target:["EntitySet","EntityType"],defaultValue:null,appliesTo:["columns"],group:["Behavior"],since:"1.28.1"},columnImportance:{namespace:"com.sap.vocabularies.UI.v1",annotation:"Importance",target:["Record","Annotation"],defaultValue:null,appliesTo:["columns/#/visible"],group:["Behavior"],since:"1.28.1"},columnDataField:{namespace:"com.sap.vocabularies.UI.v1",annotation:"DataField",target:["LineItem/Record"],allowList:{properties:["Criticality","CriticalityRepresentation","Label","Value"]},defaultValue:null,appliesTo:["columns/cellContent"],group:["Behavior"],since:"1.28.1"},columnDataFieldWithUrl:{namespace:"com.sap.vocabularies.UI.v1",annotation:"DataFieldWithUrl",target:["LineItem/Record"],allowList:{properties:["Label","Url","Value"]},defaultValue:null,appliesTo:["columns/cellContent"],group:["Behavior"],since:"1.38.1"},columnCriticality:{namespace:"com.sap.vocabularies.UI.v1",annotation:"CriticalityType",target:["PropertyPath"],defaultValue:null,appliesTo:["columns/criticality"],group:["Behavior"],since:"1.38.1"},columnCriticalityRepresentationType:{namespace:"com.sap.vocabularies.UI.v1",annotation:"CriticalityRepresentationType",target:["Property"],allowList:{values:["WithoutIcon"]},interpretation:"excludeIcon",defaultValue:null,appliesTo:["columns/criticalityIcon"],group:["Behavior"],since:"1.38.1"},columnWidth:{namespace:"com.sap.vocabularies.HTML5.v1",annotation:"CssDefaults",target:["DataFieldAbstract"],allowList:{values:["width"]},defaultValue:null,appliesTo:["columns/width"],group:["Appearance"],since:"1.79"},semanticKey:{namespace:"com.sap.vocabularies.Common.v1",annotation:"SemanticKey",target:["EntityType"],defaultValue:null,appliesTo:["columns/cellContent"],group:["Behavior"],since:"1.38.1"},semanticObject:{namespace:"com.sap.vocabularies.Common.v1",annotation:"SemanticObject",target:["Property"],defaultValue:null,appliesTo:["columns/cellContent"],group:["Behavior"],since:"1.28.1"},columnIsImageURL:{namespace:"com.sap.vocabularies.UI.v1",annotation:"IsImageURL",target:["Property"],defaultValue:true,appliesTo:["columns/image"],group:["Behavior"],since:"1.38.1"},columnText:{namespace:"com.sap.vocabularies.Common.v1",annotation:"Text",target:["Property"],defaultValue:null,appliesTo:["column/cellContent"],group:["Behavior"],since:"1.28.1"},textArrangement:{namespace:"com.sap.vocabularies.UI.v1",annotation:"TextArrangement",target:["EntityType","com.sap.vocabularies.Common.v1.Text"],defaultValue:null,appliesTo:["column/cellContent"],group:["Appearance","Behavior"],since:"1.38"},emailAddress:{namespace:"com.sap.vocabularies.Communication.v1",annotation:"IsEmailAddress",target:["Property"],defaultValue:true,appliesTo:["column/cellContent"],group:["Behavior"],since:"1.60"},phoneNumber:{namespace:"com.sap.vocabularies.Communication.v1",annotation:"IsPhoneNumber",target:["Property"],defaultValue:true,appliesTo:["fieldItem/#/value"],group:["Behavior"],since:"1.60"},multiUnitBehaviorForSortingAndFiltering:{namespace:"com.sap.vocabularies.Common.v1",annotation:"ApplyMultiUnitBehaviorForSortingAndFiltering",target:["EntityContainer"],defaultValue:true,appliesTo:["column/cellContent"],group:["Behavior"],since:"1.69"},timezone:{namespace:"com.sap.vocabularies.Common.v1",annotation:"Timezone",target:["Property"],defaultValue:null,appliesTo:["column/cellContent"],group:["Behavior"],since:"1.99"}},customData:{useSmartField:{type:"boolean",defaultValue:false,group:["Appearance","Behavior"],since:"1.28.1"},useSmartToggle:{type:"boolean",defaultValue:false,group:["Appearance","Behavior"],since:"1.31.0"},dateFormatSettings:{type:"string",defaultValue:"{ UTC : true }",group:["Appearance"],since:"1.28.1"},useUTCDateTime:{type:"boolean",defaultValue:true,group:["Behavior"],appliesTo:["cellContent"],since:"1.72.0"},currencyFormatSettings:{type:"string",defaultValue:null,appliesTo:["cellContent"],since:"1.28.1"},defaultDropDownDisplayBehaviour:{type:"string",displayValue:"idAndDescription",appliesTo:["cellContent"],group:["Behavior"],since:"1.28.0"},skipAnnotationParse:{type:"boolean",displayValue:false,group:["Behavior"],since:"1.38.10"},lineItemQualifier:{type:"string",defaultValue:null,group:["Behavior"],since:"1.31.0"},presentationVariantQualifier:{type:"string",defaultValue:null,group:["Behavior"],since:"1.31.0"},enableInResultForLineItem:{type:"boolean",defaultValue:false,group:["Behavior"],since:"1.30.0"},p13nDialogSettings:{type:"string",defaultValue:null,group:["Behavior"],since:"1.26.0"},preserveDecimals:{type:"boolean",defaultValue:true,group:["Behavior"],appliesTo:["cellContent"],since:"1.90.10"},columnKey:{type:"string",defaultValue:null,group:["Behavior"],since:"1.28.1"},sortProperty:{type:"string",defaultValue:null,group:["Behavior"],since:"1.28.1"},filterProperty:{type:"string",defaultValue:null,group:["Behavior"],since:"1.28.1"},type:{type:"string",defaultValue:null,group:["Behavior"],since:"1.28.1"},maxLength:{type:"string",defaultValue:null,group:["Appearance"],since:"1.28.1"},precision:{type:"string",defaultValue:null,group:["Appearance"],since:"1.28.1"},scale:{type:"string",defaultValue:null,group:["Appearance"],since:"1.28.1"}},properties:{entitySet:{ignore:true},smartFilterId:{ignore:true},ignoredFields:{ignore:false},initiallyVisibleFields:{ignore:false},requestAtLeastFields:{ignore:true},ignoreFromPersonalisation:{ignore:false},tableType:{ignore:true},useVariantManagement:{ignore:true},showVariantManagement:{ignore:false},useExportToExcel:{ignore:false},enableExport:{ignore:false},exportType:{ignore:false},useTablePersonalisation:{ignore:true},showTablePersonalisation:{ignore:false},customizeConfig:{ignore:false},showRowCount:{ignore:false},header:{ignore:false},headerLevel:{ignore:false},toolbarStyleClass:{ignore:true},enableCustomFilter:{ignore:true},persistencyKey:{ignore:true},useOnlyOneSolidToolbar:{ignore:true},placeToolbarInTable:{ignore:false},currentVariantId:{ignore:true},editable:{ignore:false},enableAutoBinding:{ignore:false},tableBindingPath:{ignore:false},editTogglable:{ignore:true},demandPopin:{ignore:false},showFullScreenButton:{ignore:true},initialNoDataText:{ignore:true},useInfoToolbar:{ignore:false},showDetailsButton:{ignore:false},detailsButtonSetting:{ignore:false},enableAutoColumnWidth:{ignore:false},showPasteButton:{ignore:false},enablePaste:{ignore:true}}}});