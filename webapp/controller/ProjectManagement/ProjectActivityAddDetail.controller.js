sap.ui.define([
	"sap/ui/model/json/JSONModel",
	'sap/ui/elev8rerp/componentcontainer/controller/BaseController',
	'sap/ui/model/Sorter',
	'sap/ui/elev8rerp/componentcontainer/services/ProjectManagement/Project.service',
	'sap/ui/elev8rerp/componentcontainer/utility/xlsx',
	'sap/ui/elev8rerp/componentcontainer/services/Common.service',
	'sap/ui/elev8rerp/componentcontainer/controller/Common/Common.function',
	'sap/m/MessageToast'
], function (JSONModel, BaseController, Sorter, Projectservice, xlsx, commonService ,commonFunction,MessageToast) {
	"use strict";

	return BaseController.extend("sap.ui.elev8rerp.componentcontainer.controller.ProjectManagement.ProjectActivityAddDetail", {
		onInit: function () {

			// this.bus.subscribe("billofmaterial", "setDetailPage", this.setDetailPage, this);

			// commonFunction.getItemList(this);
			// commonFunction.getReference("BOMType", "materialTypeList", this);
			// this.fnShortCut();
			// commonFunction.getFeedMillSettingData(this, 726);

		},

		//Dialog for item
		handleItemValueHelp: function (oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputId = oEvent.getSource().getId();
			// create value help dialog
			// if (!this._valueHelpDialog) {
			this._valueHelpDialog = sap.ui.xmlfragment(
				"sap.ui.poultryerp.componentcontainer.fragmentview.Common.ItemDialog",
				this
			);
			this.getView().addDependent(this._valueHelpDialog);
			// }
			this._valueHelpDialog.open(sInputValue);
		},

		_handleItemSearch: function (oEvent) {
			var sValue = oEvent.getParameter("value");
			var columns = ['itemcode', 'itemname'];
			var oFilter = new sap.ui.model.Filter(columns.map(function (colName) {
				return new sap.ui.model.Filter(colName, sap.ui.model.FilterOperator.Contains, sValue);
			}),
				false);  // false for OR condition
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter([oFilter]);
		},

		onItemDialogClose: function (oEvent) {
			var inputId = this.byId(this.inputId).sId;
			inputId = inputId.substring(inputId.lastIndexOf('-') + 1);
			var currentContext = this;
			var aContexts = oEvent.getParameter("selectedContexts");

			// if(aContexts != undefined){
			var selRow = aContexts.map(function (oContext) { return oContext.getObject(); });
			var oModel = currentContext.getView().getModel("editbillofmaterialModel");


			oModel.refresh();

			if (inputId == "txtitemname") {
				this.getLastPurchaseCost(selRow[0].id, selRow[0].unitcost);
				oModel.oData.itemid = selRow[0].id;
				oModel.oData.itemname = selRow[0].itemname;
				// oModel.oData.unitcost = selRow[0].unitcost;
				oModel.oData.itemunitname = selRow[0].unitname;
				oModel.oData.unitid = selRow[0].itemunitid;
			}

			oModel.refresh();
		},


		getLastPurchaseCost: function (itemid, unitcost) {
			var currentContext = this;
			billofMaterialService.getItemLastPucrchaseCost({ itemid: itemid }, function (data) {
				var oModel = currentContext.getView().getModel("editbillofmaterialModel");
				if (data.length > 0) {
					if (data[0].length > 0) {
						oModel.oData.unitcost = data[0][0].lastpurchaseprice;

					} else {
						oModel.oData.unitcost = unitcost;
					}
				}

				oModel.refresh();
			});


		},


		onSave: function () {
			// if (this.validateForm()) {
			let currentContext = this;
			let oModel = this.getView().getModel("DetailModel").oData;
			oModel["companyid"] = commonService.session("companyId");
			oModel["userid"] = commonService.session("userId");
		
			oModel.startdate=(oModel.startdate != null)?commonFunction.getDate(oModel.startdate):oModel.startdate;
			oModel.enddate=(oModel.enddate!=null)?commonFunction.getDate(oModel.enddate):oModel.enddate;
			oModel.isactive = oModel.isactive===true?1:0;
			oModel.isstd = oModel.isstd===true?1:0;

			Projectservice.saveProjectActivityDetail(oModel, function (data) {

				Projectservice.getProjectdetail({ id: oModel.projectid }, function (data) {
					console.log("data",data);
					data[0].map(function(value,index){
						data[0][index].activestatus=value.isactive==1?"Active":"InActive";
					});
					let tblModel = currentContext.getView().getModel("tblModel");
					tblModel.setData(data[0]);
					tblModel.refresh();
					currentContext.onCancel();

				})
			});
      
		},

		validateForm: function () {
			var isValid = true;
			var ItemNameMsg = this.resourcebundle().getText("feedMillBOMvalidMsgItem");
			var qtyMsg = this.resourcebundle().getText("feedMillBOMvalidMsgQty");
			var unitcostMsg = this.resourcebundle().getText("feedMillBOMvalidMsgUnitCost");
			var matTypeMsg = "Material type is required"

			if (!commonFunction.isRequired(this, "txtitemname", ItemNameMsg))
				isValid = false;


			if (!commonFunction.isRequired(this, "textqty", qtyMsg))
				isValid = false;

			if (!commonFunction.isRequired(this, "textunitcost", unitcostMsg))
				isValid = false;

			if (!commonFunction.isSelectRequired(this, "txtMaterialType", matTypeMsg))
				isValid = false;
			if (!commonFunction.isDecimal(this, "textqty"))
				isValid = false;


			return isValid;
		},
		resourcebundle: function () {
			var currentContext = this;
			var oBundle = this.getModel("i18n").getResourceBundle()
			return oBundle
		},


		onDelete: function () {
			var currentContext = this;
			var oModel = this.getView().getModel("DetailModel").oData;
			oModel["companyid"] = commonService.session("companyId");
			oModel["userid"] = commonService.session("userId");
			Projectservice.deleteProjectActivityDetail(params, function (data) {
				var oModel = currentContext.getView().getModel("projectList");
				oModel.setData(data[0]);
				oModel.refresh();
			});
		
		},



		// function for calculate end date or completion day
		dayCalculation: async function (oEvent) {

			let oThis = this;
			let DetailModel = oThis.getView().getModel("DetailModel");
			let ItemConsumptiondata = DetailModel.oData;
			if (oEvent.mParameters.id.match("endDate")!=null) {
				var parts = ItemConsumptiondata.startdate.split('/');
				let startdate = Date.parse(new Date(parts[2], parts[1], parts[0]));

				parts = ItemConsumptiondata.enddate.split('/');
				let enddate = Date.parse(new Date(parts[2], parts[1], parts[0]));// get  difference in start date and end date in millseconds

				ItemConsumptiondata.completiondays = parseInt((enddate - startdate) / (86400 * 1000));// Days
			}
			else{
				var endDate = new Date(commonFunction.getDate(ItemConsumptiondata.startdate));
			    endDate.setDate(endDate.getDate() + parseInt(ItemConsumptiondata.completiondays));

			 let originalDate = new Date(endDate);
             let dateFormatter = sap.ui.core.format.DateFormat.getInstance({ pattern: "dd/MM/yyyy" });
             let enddate = dateFormatter.format(originalDate);

			ItemConsumptiondata.enddate = enddate;

			}

			DetailModel.refresh();

		},

		

		onCancel: function () {
			this.oFlexibleColumnLayout = sap.ui.getCore().byId("componentcontainer---projectactivitiesAdd--fclBillOfMaterial");
			//("it  is fixed"---" name of  main control in manifest.json file in pattern"---"id of view in that particular view code")
			this.oFlexibleColumnLayout.setLayout(sap.f.LayoutType.OneColumn);
		}
	});
}, true);
