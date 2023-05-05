sap.ui.define([
	"sap/ui/model/json/JSONModel",
	'sap/ui/elev8rerp/componentcontainer/controller/BaseController',
	'sap/ui/Device',
	'sap/ui/model/Filter',
	'sap/ui/model/Sorter',
	'sap/ui/elev8rerp/componentcontainer/services/LeadManagement/Lead.service',
	'sap/ui/elev8rerp/componentcontainer/utility/xlsx',
	'sap/m/MessageToast',
	'sap/ui/core/Fragment'

], function (JSONModel, BaseController, Device,Filter, Sorter, Lead, xlsx, MessageToast, Fragment) {
	"use strict";

	return BaseController.extend("sap.ui.elev8rerp.componentcontainer.controller.LeadManagement.LeadsList", {

		onInit: function () {

			this.bus = sap.ui.getCore().getEventBus();
			//	this.bus.subscribe("partymaster", "setDetailPage", this.setDetailPage, this);

			//oThis.bus = sap.ui.getCore().getEventBus();
			this.bus.subscribe("leadscreen", "handleLeadList", this.handleLeadList, this);
			this.bus.subscribe("leaddetail", "handleLeadDetails", this.handleLeadDetails, this);
			this.bus.subscribe("loaddata", "loadData", this.loadData, this);
			//this.oFlexibleColumnLayout = this.byId("fclLead");

			this.handleRouteMatched(null);

			Fragment.load({
				id: this.getView().getId(),
				name: "sap.m.sample.TableViewSettingsDialog.ColumnMenu",
				controller: this
			}).then(function (oMenu) {
				oView.addDependent(oMenu);
				return oMenu;
			});


			// Keeps reference to any of the created sap.m.ViewSettingsDialog-s in this sample
			this._mViewSettingsDialogs = {};

			var model = new JSONModel();
			var emptyModel = this.getModelDefault();
			model.setData(emptyModel);
			this.getView().setModel(model, "partyModel");

			var model = new JSONModel();
			model.setData(emptyModel);
			this.getView().setModel(model, "subledgerModel");
			jQuery.sap.delayedCall(1000, this, function () {
				// this.getView().byId("onSearchId").focus();
			});
			this.fnShortCut();
		},

		resetFilterDialog: function(oEvent) {
			this.filterReset =  true;
		},

		getModelDefault: function () {
			return {

			}
		},

		fnShortCut: function () {
			var currentContext = this;
			$(document).keydown(function (evt) {
				if (evt.keyCode == 79 && evt.ctrlKey) {
					jQuery(document).ready(function ($) {
						evt.preventDefault();
						currentContext.onAddNew()

					})
				}
			});
		},

		handleRouteMatched: function (evt) {
			this.getView().byId("btnUploadData").setVisible(false);
			this.loadData();
		},

		handleLeadDetails: function (sChannel, sEvent, oData) {
			console.log("oData", oData);
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.bus = sap.ui.getCore().getEventBus();
			oRouter.getTargets().display(oData.pagekey, { viewModel: oData.viewModel });
			oRouter.navTo(oData.pagekey, true);
		},

		onListItemPress: function (oEvent) {
			var viewModel = oEvent.getSource().getBindingContext("LeadsMasterModel");
			var model = { "id": viewModel.getProperty("id") }
			this.bus = sap.ui.getCore().getEventBus();
			setTimeout(function () {
				this.bus = sap.ui.getCore().getEventBus();
				this.bus.publish("leaddetail", "handleLeadDetails", { pagekey: "leaddetail", viewModel: model });
			}, 1000);

			this.bus.publish("leaddetail", "handleLeadDetails", { pagekey: "leaddetail", viewModel: model });
		},

		onAddNew: function () {

			this.bus = sap.ui.getCore().getEventBus();
			setTimeout(function () {
				this.bus = sap.ui.getCore().getEventBus();
				this.bus.publish("leadscreen", "handleLeadList", { pagekey: "addlead", viewModel: null });
			}, 1000);
			this.bus.publish("leadscreen", "handleLeadList", { pagekey: "addlead", viewModel: null });
		},

		/**
	* Function to navigate to specified route.
	* @param {*} sChannel 
	* @param {*} sEvent 
	* @param {*} oData 
	*/
		handleLeadList: function (sChannel, sEvent, oData) {
			console.log("oData", oData);
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.bus = sap.ui.getCore().getEventBus();
			oRouter.getTargets().display(oData.pagekey, { viewModel: oData.viewModel });
			oRouter.navTo(oData.pagekey, true);
		},

		onSearch: function (oEvent) {
			var oTableSearchState = [],
				sQuery = oEvent.getParameter("query");
			var contains = sap.ui.model.FilterOperator.Contains;
			var columns = ['leadname', 'email', 'sourcename','leadtype','leadscategory','stagename'];
			var filters = new sap.ui.model.Filter(columns.map(function (colName) {
				return new sap.ui.model.Filter(colName, contains, sQuery);
			}),
				false);
			if (sQuery && sQuery.length > 0) {
				oTableSearchState = [filters];
			}

			this.getView().byId("tblPartyMaster").getBinding("items").filter(oTableSearchState, "Application");
		},

		getSelectedItems: function(){

			var oTable = this.getView().byId("tblPartyMaster");
			var aSelectedItems = oTable.getSelectedItems();
		    console.log("aSelectedItems",aSelectedItems);
			
			var aLeadIds = aSelectedItems.map(function(item){
				return item.getBindingContext('LeadsMasterModel').getObject().id;
			});
			console.log("aLeadIds",aLeadIds);
			var leadFinalTds = aLeadIds.toString();
			console.log("leadFinalTds",leadFinalTds);

			for(var i=0; i<aSelectedItems.length; i++){
				// console.log("aSelectedItems",aSelectedItems[i].oBindingContexts.LeadsMasterModel.sPath);
				// var path = aSelectedItems[i].oBindingContexts.LeadsMasterModel.sPath;
				// console.log("path",path);
				// var aProductIds = aSelectedItems.map(function(item){
                //     return item.getBindingContext('LeadsMasterModel').getObject().id;
                // });
				// console.log("aProductIds",aProductIds);
				oTable.removeItem(aSelectedItems[i])
			}

		},

		onSort: function (oEvent) {
			this._bDescendingSort = !this._bDescendingSort;
			var oView = this.getView(),
				oTable = oView.byId("tblPartyMaster"),
				oBinding = oTable.getBinding("items"),
				oSorter = new Sorter("partyname", this._bDescendingSort);
			oBinding.sort(oSorter);
		},

		loadData: function () {
			var currentContext = this;
			Lead.getAllLeads(function (data) {
				var oModel = new sap.ui.model.json.JSONModel();
				oModel.setData({ modelData: data[0] });
				currentContext.getView().setModel(oModel, "LeadsMasterModel");
				console.log("LeadsMasterModel", oModel);
			});
		},

		handleFilterButtonPressed: function () {
			this.getViewSettingsDialog("sap.ui.elev8rerp.componentcontainer.fragmentview.Common.FilterDialog")
				.then(function (oViewSettingsDialog) {
					oViewSettingsDialog.open();
				});
		},

		getViewSettingsDialog: function (sDialogFragmentName) {
			var pDialog = this._mViewSettingsDialogs[sDialogFragmentName];

			if (!pDialog) {
				pDialog = Fragment.load({
					id: this.getView().getId(),
					name: sDialogFragmentName,
					controller: this
				}).then(function (oDialog) {
					if (Device.system.desktop) {
						oDialog.addStyleClass("sapUiSizeCompact");
					}
					return oDialog;
				});
				this._mViewSettingsDialogs[sDialogFragmentName] = pDialog;
			}
			return pDialog;
		},

		handleFilterDialogConfirm: function (oEvent) {
			var oTable = this.byId("tblPartyMaster"),
				mParams = oEvent.getParameters(),
				oBinding = oTable.getBinding("items"),
				aFilters = [];

			if (mParams.filterItems) {	
			mParams.filterItems.forEach(function (oItem) {
				console.log("------oItem--------",oItem);
				console.log("------oItem2--------",oItem.getKey());

				var aSplit = oItem.getKey().split("___"),
					sPath = aSplit[0],
					sOperator = aSplit[1],
					sValue1 = aSplit[2],
					sValue2 = aSplit[3],
					// sPath = "stagename",
					// sOperator = "LT",
					// sValue1 = "Unqualified",
					// sValue2 = "Unqualified",

				oFilter = new Filter(sPath, sOperator,sValue1,sValue2);
				aFilters.push(oFilter);
			});

			// apply filter settings
			oBinding.filter(aFilters);

			// update filter bar
			this.byId("vsdFilterBar").setVisible(aFilters.length > 0);
			this.byId("vsdFilterLabel").setText(mParams.filterString);
		}
		else if (this.filterReset) {
			oBinding.sort();
			this.filterReset = false;
		}
		},

		onExit: function () {
			this.bus.unsubscribe("settermaster", "setDetailPage", this.setDetailPage, this);
		}
	});

}, true);
