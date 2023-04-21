sap.ui.define([
	"sap/ui/model/json/JSONModel",
	'sap/ui/elev8rerp/componentcontainer/controller/BaseController',
	'sap/m/MessageToast',
	'sap/m/MessageBox',
	'sap/ui/elev8rerp/componentcontainer/controller/Common/Common.function',
	'sap/ui/elev8rerp/componentcontainer/services/Common.service',
	'sap/ui/elev8rerp/componentcontainer/services/Masters/Location.service',
	'sap/ui/elev8rerp/componentcontainer/services/LeadManagement/Lead.service'
], function (JSONModel, BaseController, MessageToast, MessageBox, commonFunction, commonService,locationService,Leadservice) {
	"use strict";

	return BaseController.extend("sap.ui.elev8rerp.componentcontainer.controller.LeadManagement.AddLead", {
		onInit: function () {
			var currentContext = this;

			// currentContext.reset();
            this.bus = sap.ui.getCore().getEventBus();
            this.bus.subscribe("leaddetails", "newLead", this.leaddetails, this);
			

			// bind Source dropdown
			commonFunction.getReferenceByType("LeadSrc", "leadSourceModel", this);

			// bind Pipeline dropdown
			commonFunction.getReferenceByType("Pipeline", "pipeLineModel", this);

			// bind Pipeline dropdown
			commonFunction.getReferenceByType("LeadStatus", "leadStatusModel", this);

			// bind Lead dropdown
			commonFunction.getReferenceByType("LeadCtgry", "leadCategoryModel", this);

			// bind CntCtgry dropdown
			commonFunction.getReferenceByType("CntCtgry", "leadCntCategoryModel", this);

			// bind CntType dropdown
			commonFunction.getReferenceByType("CntType", "leadCntTypeModel", this);

			// bind LiftType dropdown
			commonFunction.getReferenceByType("LftTyp", "liftTypeModel", this);

			// bind capacity dropdown
			commonFunction.getReferenceByType("LftCpcty", "leadCapacityModel", this);

			// bind Machine dropdown
			commonFunction.getReferenceByType("LftMachine", "MachineModel", this);

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

			// bind standaredFloorHeightModel dropdown
			commonFunction.getReferenceByType("StdFlrHt", "standaredFloorHeightModel", this);

			// bind Stage dropdown
			commonFunction.getReferenceByType("Stage", "stageModel", this);

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

		},

		onBeforeRendering: function () {

			var currentContext = this;
			this.model = this.getView().getModel("viewModel");
		},


        leaddetails: function(sChannel, sEvent, oData) {

			let selRow = oData.viewModel;
			let oThis = this;

			if(selRow != null)  {

				if (selRow.action == "view") {
					oThis.getView().byId("btnSave").setEnabled(false);
				} else {
					oThis.getView().byId("btnSave").setEnabled(true);
				}

				oThis.bindLeadDetails(selRow.id);

			}

		},

		bindLeadDetails: function (id) {
			var currentContext = this;
			var oModel = new JSONModel();
			if (id != undefined) {

				Leadservice.getLeads({ id: id }, function (data) {
					console.log("-----------------data----------------------", data);
					oModel.setData(data[0][0]);
					var addresses = data[1];

					if (addresses.length > 0) {

						currentContext.counter = addresses.length;

						for (var i = 0; i < addresses.length; i++) {
							var cnt = i + 1;
							currentContext.getView().byId("txtAddress" + cnt).setValue(addresses[i].address);
							currentContext.getView().byId("ddlCity" + cnt).setSelectedKey(addresses[i].cityid);
							currentContext.getView().byId("ddlState" + cnt).setSelectedKey(addresses[i].stateid);
							currentContext.getView().byId("ddlCountry" + cnt).setSelectedKey(addresses[i].countryid);
							currentContext.getView().byId("txtPinCode" + cnt).setValue(addresses[i].pincode);

							if (cnt > 1) {
								currentContext.getView().byId("containerCity" + cnt).setVisible(true);
								currentContext.getView().byId("containerState" + cnt).setVisible(true);
							}
						}
					}

				});
				this.getView().byId("btnSave").setText("Update");

			} else {
				this.getView().byId("btnDelete").setVisible(false);
			}

			this.getView().setModel(oModel, "editPartyModel");
			var oModel = this.getView().getModel("editPartyModel");
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
			var model = this.getView().getModel("editPartyModel")
			model.oData.moduleid = moduleids;
		},

		handleSelectionChange: function () {
			this.getView().byId("ddlMtxtModuleNameodule").setValueState(sap.ui.core.ValueState.None);
		},

		

		fnShortCut:function(){
			var currentContext = this;
			$(document).keydown(function(event){
				if (event.keyCode== 83 && (event.altKey)){
					event.preventDefault();
					jQuery(document).ready(function($) {
						currentContext.onSave()
					})
				}

				if (event.keyCode== 69 && (event.altKey)){
					event.preventDefault();
					jQuery(document).ready(function($) {
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
			// billofMaterialService.getItemLastPucrchaseCost({ itemid: itemid }, function (data) {
			// 	var oModel = currentContext.getView().getModel("editbillofmaterialModel");
			// 	if (data.length > 0) {
			// 		if (data[0].length > 0) {
			// 			oModel.oData.unitcost = data[0][0].lastpurchaseprice;
						
			// 		}else {
			// 			oModel.oData.unitcost = unitcost;
			// 		}
			// 	}
				
			// 	oModel.refresh();
			// });


		},


		onSave: function () {
			if (this.validateForm()) {
				var currentContext = this;
				var model = this.getView().getModel("editPartyModel").oData;
				console.log("editPartyModel", model);
				model["companyid"] = commonService.session("companyId");
				model["leaddate"] = commonFunction.getDate(model.leaddate);
				model["userid"] = commonService.session("userId");
				var partyAddressModel = [];
				Leadservice.saveLead(model, function (data) {

					if (data.id > 0) {
						for (var i = 1; i <= currentContext.counter; i++) {

							var cityid = currentContext.getView().byId("ddlCity" + i).getSelectedItem() != null ? currentContext.getView().byId("ddlCity" + i).getSelectedItem().mProperties.key : null;

							var stateid = currentContext.getView().byId("ddlState" + i).getSelectedItem() != null ? currentContext.getView().byId("ddlState" + i).getSelectedItem().mProperties.key : null;

							var countryid = currentContext.getView().byId("ddlCountry" + i).getSelectedItem() != null ? currentContext.getView().byId("ddlCountry" + i).getSelectedItem().mProperties.key : null;
							partyAddressModel.push({
								id: null,
								leadid: data.id,
								//addresstypeid: currentContext.getView().byId("ddlAddrType" + i).getSelectedItem().mProperties.key,
								address: currentContext.getView().byId("txtAddress" + i).getValue(),
								countryid: parseInt(countryid),
								stateid: parseInt(stateid),
								cityid: parseInt(cityid),
								pincode: parseInt(currentContext.getView().byId("txtPinCode" + i).getValue()),
								companyid: commonService.session("companyId"),
								userid: commonService.session("userId"),
							});
						}

						console.log("-----------Inside-save-partyAddressModel-------------", partyAddressModel);

						//for (var i = 0; i < partyAddressModel.length; i++) {
						//var gstNum = partyAddressModel[i].gstno;

						Leadservice.saveLeadAddress({ address: JSON.stringify(partyAddressModel) }, function (data) {
							var message = model.id == null ? "Party created successfully!" : "Party edited successfully!";
							currentContext.onCancel();
							MessageToast.show(message);
							
							currentContext.bus = sap.ui.getCore().getEventBus();
							currentContext.bus.publish("loaddata", "loadData");
						});
						//}
					}

				});
			}
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

		onPartyNameChange: function (oEvent) {
			var inputValue = oEvent.mParameters.value;
			if (inputValue != "")
				this.getView().byId("txtPartyName").setValueState(sap.ui.core.ValueState.None);

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

		onDecimalInputChange: function (oEvent) {
			var inputValue = oEvent.mParameters.value;

			if (inputValue != "")
				commonFunction.isDecimal(this, "txtCreditLimit")
			else
				this.getView().byId("txtCreditLimit").setValueState(sap.ui.core.ValueState.None);
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
							// partyService.deleteParty(model, function (data) {
							// 	if (data) {
							// 		currentContext.onCancel();
							// 		MessageToast.show("Party deleted successfully!");
							// 		currentContext.bus = sap.ui.getCore().getEventBus();
							// 		currentContext.bus.publish("loaddata", "loadData");
							// 	}
							// });
						}
					}
				}
				);

			}
		},


		reset: function () {

            let oThis = this;
            let oLeadDetailnModel = oThis.getView().getModel("editPartyModel");
            let oLeadDetailData = oLeadDetailnModel.getData();

           
			oLeadDetailData.leadname = "",
            oLeadDetailData.companyname= "",
            oLeadDetailData.leaddate=  "",
            oLeadDetailData.sourceid = "4",
            oLeadDetailData.leadscategory = "49",
            oLeadDetailData.stageid = "14",
            oLeadDetailData.email = "",
            oLeadDetailData.phoneno = "",
            oLeadDetailData.mobileno =  "",
            oLeadDetailData.contactperson =  "",
            oLeadDetailData.salesrep =  "",
            oLeadDetailData.leadvalue = "",
            oLeadDetailData.leadscore= "",
            oLeadDetailData.leadstatus=  "46",
            oLeadDetailData.leaddescription = "",
            oLeadDetailData.locationid = "1",
            oLeadDetailData.typeoflift = "67",
            oLeadDetailData.capacityid = "68",
            oLeadDetailData.modelid = "71",
            oLeadDetailData.driveid =  "72",
            oLeadDetailData.machineid =  "83",
            oLeadDetailData.controlid =  "73",
            oLeadDetailData.operationid = "74",
            oLeadDetailData.speedid= "75",
            oLeadDetailData.typeofdoorid=  "76",
            oLeadDetailData.landingdoorid = "77",
            oLeadDetailData.cardoorid = "78",
            oLeadDetailData.lowestfloorid = "79",
            oLeadDetailData.cwtpositionid = "80",
            oLeadDetailData.floorheaightid = "82",
            oLeadDetailData.architectidid =  "58",
            oLeadDetailData.leadconsaltantid =  "51",
            oLeadDetailData.nooflifts =  "",
            oLeadDetailData.cityid = "1",
            oLeadDetailData.stateid = "1",
            oLeadDetailData.countryid = "1",
            oLeadDetailData.pincode =  ""
           
            oLeadDetailnModel.refresh();
        },
	

		onCancel: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("leads");
		}	
	});
}, true);
