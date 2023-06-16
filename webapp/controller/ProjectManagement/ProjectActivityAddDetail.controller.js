sap.ui.define([
	"sap/ui/model/json/JSONModel",
	'sap/ui/elev8rerp/componentcontainer/controller/BaseController',
	'sap/ui/model/Sorter',
	'sap/ui/elev8rerp/componentcontainer/services/ProjectManagement/Project.service',
	'sap/ui/elev8rerp/componentcontainer/utility/xlsx',
	'sap/ui/elev8rerp/componentcontainer/services/Common.service',
	'sap/ui/elev8rerp/componentcontainer/controller/Common/Common.function',
	'sap/m/MessageToast'
], function (JSONModel, BaseController, Sorter, Projectservice, xlsx, commonService, commonFunction, MessageToast) {
	"use strict";

	return BaseController.extend("sap.ui.elev8rerp.componentcontainer.controller.ProjectManagement.ProjectActivityAddDetail", {
		onInit: function () {

			//this.handleRouteMatched(null);

		},

		onBeforeRendering: function () {

			this.model = this.getView().getModel("ProjectDetailModel");
			
			// convert Date to required formate
			// this.model.oData.actualstartdate = this.model.oData.actualstartdate == null ? null:this.dateFormatter( this.model.oData.actualstartdate);

				// convert Date to required formate
			// this.model.oData.actualenddate = this.model.oData.actualenddate == null ? null:this.dateFormatter( this.model.oData.actualenddate);

			var oModel = new JSONModel();

			if (this.model != undefined) {

				this.getView().setModel(this.model, "DetailModel");

			}

			let DetailModeldata = this.getView().getModel("DetailModel").oData;
			// enable disable fields on the basis of condition
			this.getView().byId("isstart").setEnabled(DetailModeldata.actualstartdate == null);
			DetailModeldata.isstarted = DetailModeldata.actualstartdate != null ? true : false;
			this.getView().byId("inpWarningLevel").setEnabled(DetailModeldata.isstarted == true);
			this.getView().byId("inpWarningLevel").setEnabled(DetailModeldata.completionper !=100 );

			this.getView().getModel("DetailModel").refresh()
		},



		onSave: function () {
			// if (this.validateForm()) {
			let currentContext = this;
			let oModel = this.getView().getModel("DetailModel").oData;
			oModel["companyid"] = commonService.session("companyId");
			oModel["userid"] = commonService.session("userId");

			oModel.startdate = (oModel.startdate != null) ? commonFunction.getDate(oModel.startdate) : oModel.startdate;
			oModel.enddate = (oModel.enddate != null) ? commonFunction.getDate(oModel.enddate) : oModel.enddate;
			oModel.isactive = oModel.isactive === true ? 1 : 0;
			oModel.isstd = oModel.isstd === true ? 1 : 0;

			Projectservice.saveProjectActivityDetail(oModel, function (data) {

				Projectservice.getProjectdetail({ id: oModel.projectid }, function (data) {
					console.log("data", data);
					data[0].map(function (value, index) {
						data[0][index].activestatus = value.isactive == 1 ? "Active" : "InActive";
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
         
		// function call select stage starting toggle yes
		isstartchange: function () {
			let DetailModeldata = this.getView().getModel("DetailModel");
			console.log(DetailModeldata.oData.isstarted);
			this.getView().byId("inpWarningLevel").setEnabled(DetailModeldata.oData.isstarted == true);
			console.log(DetailModeldata);

			DetailModeldata.oData.isstarted == true ? DetailModeldata.oData.completionper = 0 : "null";
			console.log(DetailModeldata);


			DetailModeldata.oData.actualstartdate = this.dateFormatter(null);
			DetailModeldata.refresh();

			console.log(DetailModeldata);

		},

		dateFormatter:function( date){


			const inputDateTime= date == null? new Date():new Date(date);
			const options = {
				year: 'numeric',
				month: '2-digit',
				day: '2-digit',
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
				hour12: false,
				timeZone: 'Asia/Kolkata'
			};
			const indianTime = inputDateTime.toLocaleString('en-IN', options).replace(/\//g, '-').replace(',', '');

			const [datePart, timePart] = indianTime.split(' ');

			// Split the date and time parts
			const [day, month, year] = datePart.split('-');
			const [hour, minute, second] = timePart.split(':');

			// Reformat the date
			const formattedDate = `${year}-${month}-${day}`;

			// Reformat the time
			const formattedTime = `${hour}:${minute}:${second}`;

			// Combine the date and time
			const formattedDateTime = `${formattedDate} ${formattedTime}`;

		return formattedDateTime;


		},

		// function call on stage percentage change
		onsliderchange: function () {
			let currentContext = this;
			let oModel = this.getView().getModel("DetailModel").oData;
			oModel.actualenddate = null;
			oModel.Actualcompletiondays = null;

			if (oModel.completionper == 100) {
				
				oModel.actualenddate = this.dateFormatter(null);

				const date1 = new Date(oModel.actualenddate);
				const date2 = new Date('2023-06-10 23:23:38');

				const diffTime = Math.abs(date2 - date1);

				// Convert the time difference to days
				oModel.actualcompletiondays = (diffTime / (1000 * 60 * 60 * 24)).toFixed(1);

			}

			this.getView().getModel("DetailModel").refresh();

		},

		// function for calculate end date or completion day
		dayCalculation: async function (oEvent) {

			let oThis = this;
			let DetailModel = oThis.getView().getModel("DetailModel");
			let ItemConsumptiondata = DetailModel.oData;
			if (oEvent.mParameters.id.match("endDate") != null) {
				var parts = ItemConsumptiondata.startdate.split('/');
				let startdate = Date.parse(new Date(parts[2], parts[1], parts[0]));

				parts = ItemConsumptiondata.enddate.split('/');
				let enddate = Date.parse(new Date(parts[2], parts[1], parts[0]));// get  difference in start date and end date in millseconds

				ItemConsumptiondata.completiondays = parseInt((enddate - startdate) / (86400 * 1000));// Days
			}
			else {
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
