sap.ui.define([
	"sap/ui/model/json/JSONModel",
	'sap/ui/elev8rerp/componentcontainer/controller/BaseController',
	'sap/m/MessageToast',
	'sap/m/MessageBox',
	'sap/ui/elev8rerp/componentcontainer/formatter/common.formatter',
	'sap/ui/elev8rerp/componentcontainer/services/LeadManagement/Quotation.service',
	'sap/ui/elev8rerp/componentcontainer/services/Masters/Contact.service',
	'sap/ui/elev8rerp/componentcontainer/services/Common.service',
	'sap/ui/elev8rerp/componentcontainer/controller/Common/Common.function',

], function (JSONModel, BaseController, MessageToast, MessageBox, commonFormatter, quotationService, contactService, commonService, commonFunction) {

	"use strict";

	return BaseController.extend("sap.ui.elev8rerp.componentcontainer.controller.LeadManagement.QuotationsDetail", {

		commonFormatter: commonFormatter,

		onInit: function () {

			this.counter = 1;
			this.counter1 = 1;

			// bind lift type dropdown
			commonFunction.getReferenceByType("LftTyp", "liftTypeModel", this);

			// bind lead dropdown
			commonFunction.getAllLeads("leadModel", this);

			// bind quotation stage dropdown
			commonFunction.getReferenceByType("quoteStg", "quoteStageModel", this);

			// bind contact dropdown
			commonFunction.getAllContacts("contactModel", this);
		},

        onBeforeRendering: function () {

			var currentContext = this;
			this.model = this.getView().getModel("viewModel");
			console.log("this.model", this.model);
			var oModel = new JSONModel();

			if (this.model != undefined) {

				quotationService.getQuotation({ id: this.model.id }, function (data) {
                    if(data.length && data[0].length){
					    oModel.setData(data[0][0]);
                    }else{
                        oModel.setData([]);
                    }
				});
				this.getView().byId("btnSave").setText("Update");

			} else {
				this.getView().byId("btnDelete").setVisible(false);
			}

			this.getView().setModel(oModel, "editQuotationModel");
			var oModel = this.getView().getModel("editQuotationModel");
			oModel.refresh();
		},

        resourceBundle: function () {
			var currentContext = this;
			var oBundle = this.getModel("i18n").getResourceBundle()
			return oBundle
		},

		onSave: function () {
			if (this.validateForm()) {
				var currentContext = this;
				var model = this.getView().getModel("editQuotationModel").oData;
				
				model["companyid"] = commonService.session("companyId");
				model["userid"] = commonService.session("userId");

                let saveMsg = currentContext.resourceBundle().getText("contactSaveMsg");
                let updateMsg = currentContext.resourceBundle().getText("contactUpdateMsg");
				
				quotationService.saveQuotation(model, function (data) {

					if (data.id > 0) {
						var message = model.id == null ? saveMsg : updateMsg;
                        currentContext.onCancel();
                        MessageToast.show(message);
                        currentContext.bus = sap.ui.getCore().getEventBus();
                        currentContext.bus.publish("loaddata", "loadData");
					}

				});
			}
		},

		validateForm: function () {
			var isValid = true;
				
			return isValid;
		},

		onDelete: function () {
            var currentContext = this;
			let deleteMsg = currentContext.resourceBundle().getText("deleteMsg");
			let contactDeleteMsg = currentContext.resourceBundle().getText("contactDeleteMsg");
			if (this.model != undefined) {
				MessageBox.confirm(
					deleteMsg, {
					styleClass: "sapUiSizeCompact",
					onClose: function (sAction) {
						if (sAction == "OK") {
							contactService.deleteContact(currentContext.model, function (data) {
								if (data) {
									currentContext.onCancel();
									MessageToast.show(contactDeleteMsg);
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
			this.oFlexibleColumnLayout = sap.ui.getCore().byId("componentcontainer---quotations--fclQuotation");
			this.oFlexibleColumnLayout.setLayout(sap.f.LayoutType.OneColumn);
		},
	});
}, true);
