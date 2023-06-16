sap.ui.define([
	"sap/ui/model/json/JSONModel",
	'sap/ui/elev8rerp/componentcontainer/controller/BaseController',
	'sap/ui/model/Sorter',
	'sap/ui/elev8rerp/componentcontainer/services/LeadManagement/Quotation.service',
	'sap/ui/elev8rerp/componentcontainer/utility/xlsx',
	'sap/m/MessageToast'
], function (JSONModel, BaseController, Sorter, quotationService, xlsx, MessageToast) {
	"use strict";

	return BaseController.extend("sap.ui.elev8rerp.componentcontainer.controller.LeadManagement.Quotations", {

		onInit: function () {

			this.bus = sap.ui.getCore().getEventBus();
			// this.bus.subscribe("quotationmaster", "setDetailPage", this.setDetailPage, this);
			this.bus.subscribe("qutationcreen", "handleQutationList", this.handleQutationList, this);
			this.bus.subscribe("qutationdetail", "handleQutationDetails", this.handleQutationDetails, this);
			this.bus.subscribe("loadQuotationData", "loadQuotationData", this.loadQuotationData, this);
			//this.oFlexibleColumnLayout = this.byId("fclQuotation");

			this.handleRouteMatched(null);

			var model = new JSONModel();
			var emptyModel = this.getModelDefault();
			model.setData(emptyModel);
			this.getView().setModel(model, "partyModel");

			var model = new JSONModel();
			model.setData(emptyModel);
			this.getView().setModel(model, "subledgerModel");
			jQuery.sap.delayedCall(1000, this, function () {
				this.getView().byId("onSearchId").focus();
			});
			this.fnShortCut();
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
			this.loadQuotationData();
		},


		handleQutationDetails: function (sChannel, sEvent, oData) {
			console.log("oData", oData);
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.bus = sap.ui.getCore().getEventBus();
			oRouter.getTargets().display(oData.pagekey, { viewModel: oData.viewModel });
			oRouter.navTo(oData.pagekey, true);
		},

		onListItemPress: function (oEvent) {
			var viewModel = oEvent.getSource().getBindingContext("QuotationMasterModel").getObject();
			console.log("---------------viewModel-----------------", viewModel);
			//var model = { "id": viewModel.getProperty("leadid") }
			var model = { "id": viewModel.leadid, "quotid": viewModel.id }
			this.bus = sap.ui.getCore().getEventBus();
			setTimeout(function () {
				this.bus = sap.ui.getCore().getEventBus();
				this.bus.publish("qutationdetail", "handleQutationDetails", { pagekey: "qutationdetail", viewModel: model });
			}, 1000);

			this.bus.publish("qutationdetail", "handleQutationDetails", { pagekey: "qutationdetail", viewModel: model });
		},

		onAddNew: function () {
			this.bus = sap.ui.getCore().getEventBus();
			setTimeout(function () {
				this.bus = sap.ui.getCore().getEventBus();
				this.bus.publish("qutationcreen", "handleQutationList", { pagekey: "addqutation", viewModel: null });
			}, 1000);
			this.bus.publish("qutationcreen", "handleQutationList", { pagekey: "addqutation", viewModel: null });
		},

		/**
	* Function to navigate to specified route.
	* @param {*} sChannel 
	* @param {*} sEvent 
	* @param {*} oData 
	*/
		handleQutationList: function (sChannel, sEvent, oData) {
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
			var columns = ['leadname', 'contactname'];
			var filters = new sap.ui.model.Filter(columns.map(function (colName) {
				return new sap.ui.model.Filter(colName, contains, sQuery);
			}),
				false);

			if (sQuery && sQuery.length > 0) {
				oTableSearchState = [filters];
			}

			this.getView().byId("tblQuotationMaster").getBinding("items").filter(oTableSearchState, "Application");
		},

		onSort: function (oEvent) {
			this._bDescendingSort = !this._bDescendingSort;
			var oView = this.getView(),
				oTable = oView.byId("tblQuotationMaster"),
				oBinding = oTable.getBinding("items"),
				oSorter = new Sorter("leadname", this._bDescendingSort);
			oBinding.sort(oSorter);
		},

		loadQuotationData: function () {
			var currentContext = this;
			quotationService.getAllQuotations(function (data) {
				var oModel = new sap.ui.model.json.JSONModel();
				if (data.length && data[0].length) {
					oModel.setData({ modelData: data[0] });
					currentContext.getView().setModel(oModel, "QuotationMasterModel");
				} else {
					oModel.setData({ modelData: [] });
					currentContext.getView().setModel(oModel, "QuotationMasterModel");
				}
				console.log("QuotationMasterModel", oModel);
			});
		},

		onExit: function () {
			this.bus.unsubscribe("quotationmaster", "setDetailPage", this.setDetailPage, this);
		}
	});

}, true);
