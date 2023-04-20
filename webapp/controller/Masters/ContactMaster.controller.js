sap.ui.define([
	"sap/ui/model/json/JSONModel",
	'sap/ui/elev8rerp/componentcontainer/controller/BaseController',
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	'sap/ui/model/Sorter',
	'sap/ui/elev8rerp/componentcontainer/services/Masters/Contact.service',
	'sap/ui/elev8rerp/componentcontainer/controller/Common/Common.function',

], function (JSONModel, BaseController, Filter, FilterOperator, Sorter, contactService,commonFunction) {
	"use strict";

	return BaseController.extend("sap.ui.elev8rerp.componentcontainer.controller.Masters.ContactMaster", {

		onInit: function () {
			this.bus = sap.ui.getCore().getEventBus();
			this.bus.subscribe("contactmaster", "setDetailPage", this.setDetailPage, this);
			this.oFlexibleColumnLayout = this.byId("fclContactMaster");

			this.bus = sap.ui.getCore().getEventBus();
			this.bus.subscribe("loaddata", "loadData", this.loadData, this);
			this.loadData();
			this.fnShortCut();
		},

		onAfterRendering: function () {
			jQuery.sap.delayedCall(1000, this, function () {
				this.getView().byId("search").focus();
			});

		},

		onListItemPress: function (oEvent) {
			var viewModel = oEvent.getSource().getBindingContext("contactModel");
			var model = {
				"contactid": viewModel.getProperty("id"),
				"contactModel": viewModel.oModel.oData.modelData
			}
			this.bus = sap.ui.getCore().getEventBus();
			this.bus.publish("contactmaster", "setDetailPage", { viewName: "ContactMasterDetail", viewModel: model });
		},

		setDetailPage: function (channel, event, data) {
			this.detailView = sap.ui.view({
				viewName: "sap.ui.elev8rerp.componentcontainer.view.Masters." + data.viewName,
				type: "XML"
			});

			this.detailView.setModel(data.viewModel, "viewModel");
			this.oFlexibleColumnLayout.removeAllMidColumnPages();
			this.oFlexibleColumnLayout.addMidColumnPage(this.detailView);
			this.oFlexibleColumnLayout.setLayout(sap.f.LayoutType.TwoColumnsBeginExpanded);
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

		onSearch: function (oEvent) {
			var oTableSearchState = [],
				sQuery = oEvent.getParameter("query");
			var contains = sap.ui.model.FilterOperator.Contains;
			var columns = ['contactname','contacttype','companyname','contactreference','designation'];
			var filters = new sap.ui.model.Filter(columns.map(function (colName) {
				return new sap.ui.model.Filter(colName, contains, sQuery);
			}),
				false);  // false for OR condition

			if (sQuery && sQuery.length > 0) {
				oTableSearchState = [filters];
			}

			this.getView().byId("tblContact").getBinding("items").filter(oTableSearchState, "Application");
		},



		onAddNew: function () {

			var viewModel = this.getView().getModel("contactModel").oData;
			var model = { "contactModel": viewModel.modelData };
			this.bus = sap.ui.getCore().getEventBus();
			this.bus.publish("contactmaster", "setDetailPage", { viewName: "ContactMasterDetail", viewModel: model });
		},


		onSort: function (oEvent) {
			this._bDescendingSort = !this._bDescendingSort;
			var oView = this.getView(),
				oTable = oView.byId("tblContact"),
				oBinding = oTable.getBinding("items"),
				oSorter = new Sorter("contactname", this._bDescendingSort);
			oBinding.sort(oSorter);
		},

		loadData: function () {
			var currentContext = this;

			contactService.getAllContacts(function (data) {
				var oModel = new sap.ui.model.json.JSONModel();
				oModel.setData({ modelData: data[0] });
				currentContext.getView().setModel(oModel, "contactModel");
			});
		}

	});
}, true);
