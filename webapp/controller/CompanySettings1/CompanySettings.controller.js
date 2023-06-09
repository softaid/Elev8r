sap.ui.define([
	'sap/ui/elev8rerp/componentcontainer/controller/BaseController',
	'sap/m/MessageToast',
	'sap/ui/model/json/JSONModel'
], function (BaseController, MessageToast, JSONModel) {
	"use strict";
	return BaseController.extend("sap.ui.elev8rerp.componentcontainer.controller.CompanySettings.CompanySettings", {

		onInit: function () {
			var oViewModel = new JSONModel({
					currentUser: "Administrator",
					lastLogin: new Date(Date.now() - 86400000)
				});

			this.setModel(oViewModel, "view");			
		},

		onMasterPressed: function (oEvent) {
			var oContext = oEvent.getParameter("listItem").getBindingContext("side");
			var sPath = oContext.getPath() + "/selected";
			oContext.getModel().setProperty(sPath, true);
			var sSelectedMasterElement = oContext.getProperty("title");
			var sKey = oContext.getProperty("key");
			// switch (sSelectedMasterElement) {
			// 	case "System Settings": {
			// 		this.getRouter().navTo(sKey);
			// 		break;
			// 	}
			// 	default: {
			// 		MessageToast.show(sSelectedMasterElement + " was pressed");
			// 		break;
			// 	}
			// }

			this.getRouter().getTargets().display(sKey, {});
			this.getRouter().navTo(sKey);
		},

		onSavePressed: function () {
			MessageToast.show("Save was pressed");
		},

		onCancelPressed: function () {
			MessageToast.show("Cancel was pressed");
		},
		onNavButtonPress: function  () {
			this.getOwnerComponent().myNavBack();
		}
	});
});