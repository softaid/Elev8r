sap.ui.define([
	"sap/ui/model/json/JSONModel",
	'sap/ui/elev8rerp/componentcontainer/controller/BaseController',
	'sap/ui/model/Sorter',
	'sap/ui/elev8rerp/componentcontainer/services/LeadManagement/Lead.service',
	'sap/ui/elev8rerp/componentcontainer/services/LeadManagement/Quotation.service',
	'sap/m/MessageBox',
	'sap/m/MessageToast'
], function (JSONModel, BaseController, Sorter, leadService, quotationService, MessageBox,MessageToast) {
	"use strict";

	return BaseController.extend("sap.ui.elev8rerp.componentcontainer.controller.LeadManagement.QuotationsDetail", {
		onInit: function () {

			this.bus = sap.ui.getCore().getEventBus();
			this.bus.subscribe("qutationdetail", "handleQutationDetails", this.handleQutationDetails, this);
			this.bus.subscribe("qutationdetails", "newQutation", this.newQutation, this);
			this.bus.subscribe("loaddata", "loadData", this.loadData, this);

			this.handleRouteMatched(null);

			var model = new JSONModel();
			model.setData([]);
			this.getView().setModel(model, "leadModel");

			let stageModel = new JSONModel();
			stageModel.setData({ modelData: [] });
			this.getView().setModel(stageModel, "stageModel");

			let activityModel = new JSONModel();
			activityModel.setData({ modelData: [] });
			this.getView().setModel(activityModel, "activityModel");

			let liftModel = new JSONModel();
			liftModel.setData({ modelData: [] });
			this.getView().setModel(liftModel, "liftModel");

			let quotationModel = new JSONModel();
			quotationModel.setData({ modelData: [] });
			this.getView().setModel(quotationModel, "quotationModel");

			var quoteModel = new JSONModel();
			quoteModel.setData([]);
			this.getView().setModel(quoteModel, "quoteModel");

			
			let attachmentModel = new JSONModel();
			attachmentModel.setData({ modelData: [] });
			this.getView().setModel(attachmentModel, "attachmentModel");
		},

		handleRouteMatched: function (evt) {
			// this.loadData();
		},

		handleQutationDetails: function (sChannel, sEvent, oData) {
			let selRow = oData.viewModel;
			let oThis = this;
			console.log(selRow);
			if (selRow != null) {
				oThis.loadData(selRow.id);
			}

			oThis.id = selRow.id;
		},

		loadData: function (id) {
			let oThis = this;
			leadService.getLeadDetails({ id: id }, function (data) {
				if (data.length) {
					if (data[4].length) {
						let aRowsCount = [];
						let quotationModel = oThis.getView().getModel("quotationModel");
						quotationModel.setData({ modelData: data[4] });
						oThis.getView().setModel(quotationModel, "quotationModel")
						console.log("quotationModel",quotationModel);

						aRowsCount.push({
							rowsCount: data[4].length
						});
	
						let oRowsCount = new JSONModel();
						oRowsCount.setData(aRowsCount[0]);
						console.log("oRowsCount", oRowsCount);
						oThis.getView().setModel(oRowsCount, "rowcount_model");
					}

					if (data[5].length) {
						let quoteModel = oThis.getView().getModel("quoteModel");
						quoteModel.setData(data[5][0]);
						oThis.getView().setModel(quoteModel, "quoteModel");
					}
				}
			})
		},

		addNewQutation: function () {
			this.bus = sap.ui.getCore().getEventBus();
			setTimeout(function () {
				this.bus = sap.ui.getCore().getEventBus();
				this.bus.publish("qutationdetails", "newQutation", { pagekey: "addqutation", viewModel: null });
			}, 1000);
			this.bus.publish("qutationdetails", "newQutation", { pagekey: "addqutation", viewModel: null });
		},

		newQutation: function (sChannel, sEvent, oData) {

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.bus = sap.ui.getCore().getEventBus();
			oRouter.getTargets().display(oData.pagekey, { viewModel: oData.viewModel });
			oRouter.navTo(oData.pagekey, true);
		},

		editQutation: function (oEvent) {
			var viewModel = this.getView().getModel("quoteModel");
			console.log("---------viewModel-----------",viewModel);
			var model = { "id": viewModel.oData.id }
			this.bus = sap.ui.getCore().getEventBus();
			setTimeout(function () {
				this.bus = sap.ui.getCore().getEventBus();
				this.bus.publish("qutationdetails", "newQutation", { pagekey: "addqutation", viewModel: model });
			}, 1000);

			this.bus.publish("qutationdetails", "newQutation", { pagekey: "addqutation", viewModel: model });
		},

		resourceBundle: function () {
			var currentContext = this;
			var oBundle = this.getModel("i18n").getResourceBundle()
			return oBundle
		},

		deleteQutation: function () {
			var currentContext = this;
			var confirmMsg = currentContext.resourceBundle().getText("deleteMsg");
			var deleteSucc = currentContext.resourceBundle().getText("quoteDeleteSucc");
			var model = this.getView().getModel("quoteModel").oData;
			// console.log(currentContext.model);
			if (model.id != undefined) {
				MessageBox.confirm(
					confirmMsg, {
					styleClass: "sapUiSizeCompact",
					onClose: function (sAction) {
						if (sAction == "OK") {
							quotationService.deleteQuotation({ id: model.id }, function (data) {
								if (data) {
									currentContext.onCancel();
									MessageToast.show(deleteSucc);
									currentContext.bus = sap.ui.getCore().getEventBus();
									currentContext.bus.publish("loaddata", "loadData");
								}
							});
						}
					}
				});
			}
		},

		onCancel: function () {
			this.oFlexibleColumnLayout = sap.ui.getCore().byId("componentcontainer---leads--fclLead");
		},
	});

}, true);
