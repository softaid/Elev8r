sap.ui.define([
	"sap/ui/model/json/JSONModel",
	'sap/ui/elev8rerp/componentcontainer/controller/BaseController',
	'sap/ui/model/Sorter',
	'sap/ui/elev8rerp/componentcontainer/services/LeadManagement/Lead.service',
	'sap/ui/elev8rerp/componentcontainer/utility/xlsx',
	'sap/m/MessageToast'
], function (JSONModel, BaseController, Sorter, Lead, xlsx, MessageToast) {
	"use strict";

	return BaseController.extend("sap.ui.elev8rerp.componentcontainer.controller.LeadManagement.Leads", {

		onInit: function () {

			this.bus = sap.ui.getCore().getEventBus();
		//	this.bus.subscribe("partymaster", "setDetailPage", this.setDetailPage, this);

			//oThis.bus = sap.ui.getCore().getEventBus();
            this.bus.subscribe("leadscreen", "handleLeadList", this.handleLeadList, this);
			this.bus.subscribe("leaddetail", "handleLeadDetails", this.handleLeadDetails, this);
			this.bus.subscribe("loaddata", "loadData", this.loadData, this);
			//this.oFlexibleColumnLayout = this.byId("fclLead");

			this.handleRouteMatched(null);

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

		handleLeadDetails : function (sChannel, sEvent, oData) {
            console.log("oData",oData);
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
                this.bus.publish("leaddetail", "handleLeadDetails", { pagekey: "leadsdetail", viewModel:model });
            }, 1000);
            
            this.bus.publish("leaddetail", "handleLeadDetails", { pagekey: "leadsdetail", viewModel:model});
		},
		
		onAddNew: function() {

			this.bus = sap.ui.getCore().getEventBus();
			setTimeout(function () {
				this.bus = sap.ui.getCore().getEventBus();
				this.bus.publish("leadscreen", "handleLeadList", { pagekey: "leadsdetails", viewModel:null });
			}, 1000);
			this.bus.publish("leadscreen", "handleLeadList", { pagekey: "leadsdetails", viewModel:null});
		},

			 /**
         * Function to navigate to specified route.
         * @param {*} sChannel 
         * @param {*} sEvent 
         * @param {*} oData 
         */
			 handleLeadList : function (sChannel, sEvent, oData) {
				console.log("oData",oData);
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				this.bus = sap.ui.getCore().getEventBus();
				oRouter.getTargets().display(oData.pagekey, { viewModel: oData.viewModel });
				oRouter.navTo(oData.pagekey, true);
			},

		onSearch: function (oEvent) {
			var oTableSearchState = [],
				sQuery = oEvent.getParameter("query");
			var contains = sap.ui.model.FilterOperator.Contains;
			var columns = ['leadname','email','sourcename'];
			var filters = new sap.ui.model.Filter(columns.map(function (colName) {
				return new sap.ui.model.Filter(colName, contains, sQuery);
			}),
				false);
s
			if (sQuery && sQuery.length > 0) {
				oTableSearchState = [filters];
			}

			this.getView().byId("tblLeadMaster").getBinding("items").filter(oTableSearchState, "Application");
		},

	

		onSort: function (oEvent) {
			this._bDescendingSort = !this._bDescendingSort;
			var oView = this.getView(),
				oTable = oView.byId("tblLeadMaster"),
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

		onExit: function () {
			this.bus.unsubscribe("settermaster", "setDetailPage", this.setDetailPage, this);
		}
	});

}, true);
