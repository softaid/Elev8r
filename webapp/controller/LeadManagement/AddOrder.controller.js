sap.ui.define([
	"sap/ui/model/json/JSONModel",
	'sap/ui/elev8rerp/componentcontainer/controller/BaseController',
	'sap/m/MessageToast',
	'sap/m/MessageBox',
	'sap/ui/elev8rerp/componentcontainer/controller/Common/Common.function',
	'sap/ui/elev8rerp/componentcontainer/services/Common.service',
	'sap/ui/elev8rerp/componentcontainer/services/Masters/Location.service',
	'sap/ui/elev8rerp/componentcontainer/services/LeadManagement/Lead.service',
	'sap/ui/elev8rerp/componentcontainer/services/LeadManagement/Order.service',
	'sap/ui/elev8rerp/componentcontainer/services/LeadManagement/Quotation.service'
], function (JSONModel, BaseController, MessageToast, MessageBox, commonFunction, commonService, locationService, leadService,orderService, quotationService) {
	"use strict";

	return BaseController.extend("sap.ui.elev8rerp.componentcontainer.controller.LeadManagement.AddOrder", {
		onInit: function () {
			var currentContext = this;

			// currentContext.reset();
			this.bus = sap.ui.getCore().getEventBus();
			this.bus.subscribe("orderscreen", "newOrder", this.orderDetail, this);
			this.bus.subscribe("orderdetail", "handleOrderDetails", this.handleOrderDetails, this);
			this.bus.subscribe("converttoorder", "orderConversion", this.orderConversion, this);

			// bind Source dropdown
			commonFunction.getReferenceByType("LeadSrc", "leadSourceModel", this);

			// bind Lead dropdown
			commonFunction.getReferenceByType("LeadCtgry", "leadCategoryModel", this);

			// bind Source dropdown
			commonFunction.getReferenceByType("QuoteType", "quoteTypeModel", this);

			// bind Pipeline dropdown
			commonFunction.getReferenceByType("QuoteStatus", "QuoteStatusModel", this);

			// bind Pipeline dropdown
			commonFunction.getReferenceByType("QuoteCategory", "QuoteCategoryModel", this);

			// bind Lead dropdown
			commonFunction.getReferenceByType("QuoteSubCategory", "QuoteSubCategoryModel", this);

			// bind CntCtgry dropdown
			commonFunction.getReferenceByType("CntCtgry", "leadCntCategoryModel", this);

			// bind CntType dropdown
			commonFunction.getReferenceByType("CntType", "leadCntTypeModel", this);

			// bind LiftType dropdown
			commonFunction.getReferenceByType("LftTyp", "liftTypeModel", this);

			// bind capacity dropdown
			commonFunction.getReferenceByType("LftCpcty", "leadCapacityModel", this);

			// bind Machine dropdown
			commonFunction.getReferenceByType("LftMchn", "MachineModel", this);

			// bind Model dropdown
			commonFunction.getReferenceByType("LftMdl", "leadmodelModel", this);

			// bind Drive dropdown
			commonFunction.getReferenceByType("LftDrv", "leadDriveModel", this);

			// bind Control dropdown
			commonFunction.getReferenceByType("LftCtrl", "leadControlModel", this);

			// bind Operation dropdown
			commonFunction.getReferenceByType("LftOprn", "leadOperationModel", this);

			// bind Speed dropdown
			commonFunction.getReferenceByType("LftSpd", "leadSpeedModel", this);

			// bind Door dropdown
			commonFunction.getReferenceByType("DrTyp", "leadDoorTypeModel", this);

			// bind landingDoorModel dropdown
			commonFunction.getReferenceByType("LdnDr", "landingDoorModel", this);

			// bind CarDoorModel dropdown
			commonFunction.getReferenceByType("CarDr", "CarDoorModel", this);

			// bind LowestFloorModel dropdown
			commonFunction.getReferenceByType("LwstFlrMking", "LowestFloorModel", this);

			// bind CWTPositionModel dropdown
			commonFunction.getReferenceByType("CWTPstn", "CWTPositionModel", this);

			// bind Pipeline dropdown
			commonFunction.getReferenceByType("LeadStatus", "leadStatusModel", this);

			// bind standaredFloorHeightModel dropdown
			commonFunction.getReferenceByType("StdFlrHt", "standaredFloorHeightModel", this);

			// bind Stage dropdown
			commonFunction.getReferenceByType("Stage", "stageModel", this);

			// bind AllOpeningSameSide dropdown
			commonFunction.getReferenceByType("AllOpeningSameSide", "openingSameSideModel", this);

			// bind front Opening dropdown
			commonFunction.getReferenceByType("FrontOpening", "frontOpeningModel", this);

			// bind back opening dropdown
			commonFunction.getReferenceByType("BackOpening", "backOpeningModel", this);

			// bind left opening dropdown
			commonFunction.getReferenceByType("LeftOpening", "leftOpeningModel", this);

			// bind right opening dropdown
			commonFunction.getReferenceByType("RightOpening", "rightOpeningModel", this);

			// bind order status dropdown
			commonFunction.getReferenceByType("OrdSts", "statusModel", this);

			//bind all Leads
			leadService.getAllLeads(function (data) {
				var oModel = new sap.ui.model.json.JSONModel();
				oModel.setData({ modelData: data[0] });
				currentContext.getView().setModel(oModel, "LeadsMasterModel");
				console.log("LeadsMasterModel", oModel);
			});

			//bind all locations
			locationService.getAllLocations(function (data) {
				var oModel = new sap.ui.model.json.JSONModel();
				oModel.setData({ modelData: data[0] });
				currentContext.getView().setModel(oModel, "locationModel");
			});


			//bind country dropdown
			commonService.getAllCountries(function (data) {
				var oModel = new sap.ui.model.json.JSONModel();
				oModel.setData({ modelData: data[0] });

				currentContext.getView().setModel(oModel, "partyCountryModel");
			});

			//bind state dropdown
			commonService.getAllStates(function (data) {
				var oModel = new sap.ui.model.json.JSONModel();
				oModel.setData({ modelData: data[0] });
				currentContext.getView().setModel(oModel, "partyStateModel");
			});

			//bind city dropdown
			commonService.getAllCities(function (data) {
				var oModel = new sap.ui.model.json.JSONModel();
				oModel.setData({ modelData: data[0] });
				oModel.setSizeLimit(data[0].length);
				currentContext.getView().setModel(oModel, "partyCityModel");

			});

			var emptyModel = this.getModelDefault();
			var model = new JSONModel();
			model.setData(emptyModel);
			this.getView().setModel(model, "editOrderModel");

			this.getAllOrders();
		},

		getModelDefault: function () {
			return {
				id: null,
				leadname: null,
				companyname: null,
				orderdate: commonFunction.getDateFromDB(new Date()),
				sourceid: null,
				leadscategory: null,
				stageid: null,
				email: null,
				phoneno: null,
				mobileno: null,
				contactperson: null,
				salesrep: null,
				leadvalue: null,
				leadscore: null,
				leadstatus: null,
				leaddescription: null,
				locationid: null,
				typeoflift: null,
				capacityid: null,
				modelid: null,
				driveid: null,
				machineid: null,
				controlid: null,
				operationid: null,
				speedid: null,
				typeofdoorid: null,
				landingdoorid: null,
				cardoorid: null,
				cwtpositionid: null,
				floorheaightid: null,
				architectidid: null,
				leadconsaltantid: null,
				nooflifts: null,
				cityid: null,
				stateid: null,
				countryid: null,
				pincode: null
			}
		},

		onBeforeRendering: function () {
			var currentContext = this;
			this.model = currentContext.getView().getModel("viewModel");
			currentContext.getAllOrders();
		},

		getAllOrders : function(){
			let editOrderModel = this.getView().getModel("editOrderModel");
			orderService.getAllOrders(function (data) {
                if(data.length && data[0].length){
                    let lastid = (data[0].length) - 1;
					let nextid = (data[0][lastid].id) + 1;
					editOrderModel.oData.orderid = nextid;
					editOrderModel.refresh();
                }else{
                    editOrderModel.oData.orderid = 1;
					editOrderModel.refresh();
                }
			});
		},	

		orderConversion: function (sChannel, sEvent, oData) {
			let selRow = oData.viewModel;
			let oThis = this;
			oThis.getAllOrders();
			console.log(selRow);

			if (selRow != null) {

				oThis.convertToOrder(selRow.quoteid);

			}

			else {
				var oModel = new JSONModel();
				this.getView().setModel(oModel, "editOrderModel");
			}
		},

		convertToOrder: function (id) {
			console.log(id);
			var oModel = new JSONModel();
			if (id != undefined) {

				quotationService.convertToOrder({ id: id }, function (data) {
					if(data.length && data[0].length){
						data[0][0].orderid = parseInt(data[0][0].lastorderid) + 1;
						oModel.setData(data[0][0]);
					}
				});

			}

			this.getView().setModel(oModel, "editOrderModel");
			var oModel = this.getView().getModel("editOrderModel");
		},

		handleOrderDetails: function (sChannel, sEvent, oData) {
			let selRow = oData.viewModel;
			let oThis = this;

			if (selRow != null) {

				if (selRow.action == "view") {
					oThis.getView().byId("btnSave").setEnabled(false);
				} else {
					oThis.getView().byId("btnSave").setEnabled(true);
				}

				oThis.bindOrderDetails(selRow.id);

			}

			else {
				var oModel = new JSONModel();
				this.getView().setModel(oModel, "editOrderModel");
			}

		},

		bindOrderDetails: function (id) {
			var currentContext = this;
			var oModel = new JSONModel();
			if (id != undefined) {

				orderService.getOrder({ id: id }, function (data) {
					oModel.setData(data[0][0]);
				});
				this.getView().byId("btnSave").setText("Update");

			} 

			this.getView().setModel(oModel, "editOrderModel");
			var oModel = this.getView().getModel("editOrderModel");
		},

		handleSelectionFinish: function (oEvent) {
			var inputId = oEvent.mParameters.id;
			var id = inputId.substring(inputId.lastIndexOf('-') + 1);

			var selectedItems = oEvent.getParameter("selectedItems");
			var moduleids = "";

			for (var i = 0; i < selectedItems.length; i++) {

				moduleids += selectedItems[i].getKey();

				if (i != selectedItems.length - 1) {
					moduleids += ",";
				}
			}
			var model = this.getView().getModel("editOrderModel")
			model.oData.moduleid = moduleids;
		},

		handleSelectionChange: function () {
			this.getView().byId("ddlMtxtModuleNameodule").setValueState(sap.ui.core.ValueState.None);
		},

		fnShortCut: function () {
			var currentContext = this;
			$(document).keydown(function (event) {
				if (event.keyCode == 83 && (event.altKey)) {
					event.preventDefault();
					jQuery(document).ready(function ($) {
						currentContext.onSave()
					})
				}

				if (event.keyCode == 69 && (event.altKey)) {
					event.preventDefault();
					jQuery(document).ready(function ($) {
						currentContext.onCancel()
					})
				}

			});
		},


		//Dialog for item
		handleItemValueHelp: function (oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputId = oEvent.getSource().getId();
			// create value help dialog
			// if (!this._valueHelpDialog) {
			this._valueHelpDialog = sap.ui.xmlfragment(
				"sap.ui.elev8rerp.componentcontainer.fragmentview.Common.ItemDialog",
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

		onSave: function () {
			//if (this.validateForm()) {
				var currentContext = this;
				var model = this.getView().getModel("editOrderModel").oData;
				console.log("editOrderModel", model);
				model["companyid"] = commonService.session("companyId");
				model["orderdate"] = commonFunction.getDate(model.orderdate);
				model["userid"] = commonService.session("userId");
				model["status"] = currentContext.getView().byId("statusid").getSelectedItem().mProperties.text;

				orderService.saveOrder(model, function (data) {

					if (data.id > 0) {
							var message = model.id == null ? "Order created successfully!" : "Order edited successfully!";
							currentContext.onCancel();
							MessageToast.show(message);
							currentContext.bus = sap.ui.getCore().getEventBus();
							currentContext.bus.publish("loaddata", "loadData");
					}

				});
			//}
			this.reset();

		},

		validateForm: function () {
			var isValid = true;
			var source = this.getView().byId("sourceid").getSelectedKey();
			var pipeline = this.getView().byId("txtStageid").getSelectedKey();

			var location = this.getView().byId("leadlocationid").getSelectedKey();
			var status = this.getView().byId("leadstatusid").getSelectedKey();

			var category = this.getView().byId("categoryid").getSelectedKey();

			var typeoflift = this.getView().byId("typeofliftid").getSelectedKey();

			var emailId = this.getView().byId("txtEmailId").getValue();
			var phoneNo = this.getView().byId("txtPhoneNo").getValue();

			if (!commonFunction.isRequired(this, "txtPartyName", "Please enter lead name."))
				isValid = false;

			if (!commonFunction.isRequired(this, "contactPerson", "Please enter contact person name."))
				isValid = false;

			if (emailId != "") {
				if (!commonFunction.isEmail(this, "txtEmailId"))
					isValid = false;
			} else if (!commonFunction.isRequired(this, "txtEmailId", "Please enter email ID."))
				isValid = false;

			else {
				this.getView().byId("txtEmailId").setValueState(sap.ui.core.ValueState.None);
			}


			if (phoneNo != "") {
				if (!commonFunction.isNumber(this, "txtPhoneNo"))
					isValid = false;
			}
			else if (!commonFunction.isRequired(this, "txtPhoneNo", "Please enter phone no."))
				isValid = false;

			else {
				this.getView().byId("txtPhoneNo").setValueState(sap.ui.core.ValueState.None);
			}


			// check atleast one source is selected

			if (pipeline.length == 0) {
				this.getView().byId("txtStageid").setValueState(sap.ui.core.ValueState.Error)
					.setValueStateText("Please select atleast one Stage.");

				isValid = false;
			}

			if (source.length == 0) {
				this.getView().byId("sourceid").setValueState(sap.ui.core.ValueState.Error)
					.setValueStateText("Please select atleast one source.");

				isValid = false;
			}

			if (typeoflift.length == 0) {
				this.getView().byId("typeofliftid").setValueState(sap.ui.core.ValueState.Error)
					.setValueStateText("Please select atleast one lift Type.");

				isValid = false;
			}

			if (location.length == 0) {
				this.getView().byId("leadlocationid").setValueState(sap.ui.core.ValueState.Error)
					.setValueStateText("Please select atleast one location.");

				isValid = false;
			}
			if (status.length == 0) {
				this.getView().byId("leadstatusid").setValueState(sap.ui.core.ValueState.Error)
					.setValueStateText("Please select atleast one status.");

				isValid = false;
			}
			if (category.length == 0) {
				this.getView().byId("categoryid").setValueState(sap.ui.core.ValueState.Error)
					.setValueStateText("Please select atleast one category.");

				isValid = false;
			}

			return isValid;
		},

		onEmailChange: function (oEvent) {

			var emailId = oEvent.mParameters.value

			if (emailId != "") {
				commonFunction.isEmail(this, "txtEmailId")
			}
			else {
				this.getView().byId("txtEmailId").setValueState(sap.ui.core.ValueState.None)
			}
		},

		onNumberInputChange: function (oEvent) {

			var inputId = oEvent.mParameters.id;
			var inputValue = oEvent.mParameters.value;

			inputId = inputId.substring(inputId.lastIndexOf('-') + 1);

			if (inputId == "txtMobileNo") {

				if (inputValue != "")
					commonFunction.isNumber(this, "txtMobileNo")
				else
					this.getView().byId("txtMobileNo").setValueState(sap.ui.core.ValueState.None);

			}
			else if (inputId == "txtPinCode") {

				if (inputValue != "")
					commonFunction.isNumber(this, "txtPinCode")
				else
					this.getView().byId("txtPinCode").setValueState(sap.ui.core.ValueState.None);
			}
			else if (inputId == "txtCreditPeriod") {

				if (inputValue != "")
					commonFunction.isNumber(this, "txtCreditPeriod")
				else
					this.getView().byId("txtCreditPeriod").setValueState(sap.ui.core.ValueState.None);
			}
		},

		resourcebundle: function () {
			var currentContext = this;
			var oBundle = this.getModel("i18n").getResourceBundle()
			return oBundle
		},

		onDelete: function () {

			var currentContext = this;

			if (this.model.id != undefined) {

				var model = {
					id: this.model.id,
					companyid: commonFunction.session("companyId"),
					userid: commonFunction.session("userId")
				};

				MessageBox.confirm(
					"Are you sure you want to delete?", {

					styleClass: "sapUiSizeCompact",
					onClose: function (sAction) {
						if (sAction == "OK") {
						}
					}
				}
				);

			}
		},


		reset: function () {
			let oThis = this;
			var model = oThis.getView().getModel("editOrderModel");
			model.setData([]);
			oThis.getView().setModel(model, "editOrderModel");

			// let oQutationModel = oThis.getView().getModel("editOrderModel");
			// console.log("---------------After Save oLeadDetailnModel---------------",oQutationModel);
			
			//     oQutationModel.oData.leadname = "",
			// 	oQutationModel.oData.companyname = "",
			// 	oQutationModel.oData.quotedate = "",
			// 	oQutationModel.oData.sourceid = "4",
			// 	oQutationModel.oData.leadscategory = "49",
			// 	oQutationModel.oData.stageid = "14",
			// 	oQutationModel.oData.email = "",
			// 	oQutationModel.oData.phoneno = "",
			// 	oQutationModel.oData.mobileno = "",
			// 	oQutationModel.oData.contactperson = "",
			// 	oQutationModel.oData.salesrep = "",
			// 	oQutationModel.oData.leadvalue = "",
			// 	oQutationModel.oData.leadscore = "",
			// 	oQutationModel.oData.leadstatus = "46",
			// 	oQutationModel.oData.leaddescription = "",
			// 	oQutationModel.oData.locationid = "1",
			// 	oQutationModel.oData.typeoflift = "67",
			// 	oQutationModel.oData.capacityid = "68",
			// 	oQutationModel.oData.modelid = "71",
			// 	oQutationModel.oData.driveid = "72",
			// 	oQutationModel.oData.machineid = "83",
			// 	oQutationModel.oData.controlid = "73",
			// 	oQutationModel.oData.operationid = "74",
			// 	oQutationModel.oData.speedid = "75",
			// 	oQutationModel.oData.typeofdoorid = "76",
			// 	oQutationModel.oData.landingdoorid = "77",
			// 	oQutationModel.oData.cardoorid = "78",
			// 	oQutationModel.oData.lowestfloorid = "79",
			// 	oQutationModel.oData.cwtpositionid = "80",
			// 	oQutationModel.oData.floorheaightid = "82",
			// 	oQutationModel.oData.architectidid = "58",
			// 	oQutationModel.oData.leadconsaltantid = "51",
			// 	oQutationModel.oData.nooflifts = "",
			// 	oQutationModel.oData.cityid = "1",
			// 	oQutationModel.oData.stateid = "1",
			// 	oQutationModel.oData.countryid = "1",
			// 	oQutationModel.oData.pincode = "",
			// 	oQutationModel.oData.stopsid = "2",
			// 	oQutationModel.oData.floormarking = "",
			// 	oQutationModel.oData.allopeningsameside = "111",
			// 	oQutationModel.oData.frontopening = "113",
			// 	oQutationModel.oData.backopening = "116",
			// 	oQutationModel.oData.leftopening = "118",
			// 	oQutationModel.oData.rightopening = "120",
			// 	oQutationModel.oData.shaftwidth = "",
			// 	oQutationModel.oData.shaftdepth = "",
			// 	oQutationModel.oData.cardepth = "2",
			// 	oQutationModel.oData.carwidth = "82",
			// 	oQutationModel.oData.carheight = "58",
			// 	oQutationModel.oData.doorwidth = "51",
			// 	oQutationModel.oData.doorheight = "0",
			// 	oQutationModel.oData.travel = "",
			// 	oQutationModel.oData.pitdepth = "0",
			// 	oQutationModel.oData.overhead = "0",
			// 	oQutationModel.oData.mrwidth = "0",
			// 	oQutationModel.oData.mrdepth = "0",
			// 	oQutationModel.oData.mrheight = "0",
			// 	oQutationModel.oData.companyname = "",
			

			// oQutationModel.refresh();
		},

		onCancel: function () {
			this.reset();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("orders");
		}
	});
}, true);
