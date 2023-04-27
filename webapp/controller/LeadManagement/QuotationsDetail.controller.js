sap.ui.define([
	"sap/ui/model/json/JSONModel",
	'sap/ui/elev8rerp/componentcontainer/controller/BaseController',
	'sap/ui/model/Sorter',
	'sap/ui/elev8rerp/componentcontainer/services/LeadManagement/Lead.service',
	'sap/m/MessageBox',
], function (JSONModel, BaseController, Sorter, leadService, MessageBox) {
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
					if (data[0].length) {
						let leadModel = oThis.getView().getModel("leadModel");
						leadModel.setData(data[0][0]);
						oThis.getView().setModel(leadModel, "leadModel");
					}

					if (data[1].length) {
						let stageModel = oThis.getView().getModel("stageModel");
						stageModel.setData({ modelData: data[1] });
						oThis.getView().setModel(stageModel, "stageModel");
					}

					if (data[2].length) {
						let activityModel = oThis.getView().getModel("activityModel");
						activityModel.setData({ modelData: data[2] });
						oThis.getView().setModel(activityModel, "activityModel")
					}
					console.log(data);
					if (data[3].length) {
						let liftModel = oThis.getView().getModel("liftModel");
						liftModel.setData(data[3][0]);
						oThis.getView().setModel(liftModel, "liftModel")
					}

					if (data[4].length) {
						let quotationModel = oThis.getView().getModel("quotationModel");
						// quotationModel.setData({ modelData: data[4] });
						// oThis.getView().setModel(quotationModel, "quotationModel")

						var arrary =[];
						arrary.push({
							"id": "id",
							"quotevalue": "quotevalue",
							"quotestageid": "quotestageid",
							"nooflifts": "nooflifts"
						})

						for(var i=0;i<data[4].length;i++){
							arrary.push({
								"id": data[4][i].id,
								"quotevalue": data[4][i].quotevalue,
								"quotestageid": data[4][i].quotestageid,
								"nooflifts": data[4][i].nooflifts,
							})
						}
						quotationModel.setData({ modelData: arrary });
						oThis.getView().setModel(quotationModel, "quotationModel")
						console.log("quotationModel",quotationModel);
					}
					

					console.group(oThis.getView().getModel("liftModel"));
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

		editLead: function (oEvent) {
			var viewModel = this.getView().getModel("leadModel");
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

		deleteLead: function () {
			var currentContext = this;

			var confirmMsg = currentContext.resourceBundle().getText("deleteMsg");
			var deleteSucc = currentContext.resourceBundle().getText("leadDeleteSucc");
			var model = this.getView().getModel("liftModel").oData;
			// console.log(currentContext.model);
			if (model.id != undefined) {
				MessageBox.confirm(
					confirmMsg, {
					styleClass: "sapUiSizeCompact",
					onClose: function (sAction) {
						if (sAction == "OK") {
							leadService.deleteLead({ id: model.id }, function (data) {
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
