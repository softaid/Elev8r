sap.ui.define([
	"sap/ui/model/json/JSONModel",
	'sap/ui/elev8rerp/componentcontainer/controller/BaseController',
	'sap/m/MessageToast',
	'sap/m/MessageBox',
	'sap/ui/elev8rerp/componentcontainer/formatter/common.formatter',
	'sap/ui/elev8rerp/componentcontainer/services/LeadManagement/Lead.service',
	'sap/ui/elev8rerp/componentcontainer/services/Common.service',
	'sap/ui/elev8rerp/componentcontainer/controller/Common/Common.function',

], function (JSONModel, BaseController, MessageToast, MessageBox, commonFormatter, Leadservice, commonService, commonFunction) {

    //function (JSONModel, BaseController, MessageToast, MessageBox, commonFormatter, partyService, commonService, commonFunction) {
	"use strict";

	return BaseController.extend("sap.ui.elev8rerp.componentcontainer.controller.LeadManagement.LeadsDetail", {

		commonFormatter: commonFormatter,

		onInit: function () {

			var currentContext = this;
			this.counter = 1;
			this.counter1 = 1;

			// bind Source dropdown
			commonFunction.getReferenceByType("LeadSrc", "leadSourceModel", this);

            // bind Pipeline dropdown
			commonFunction.getReferenceByType("Pipeline", "pipeLineModel", this);


		
			// get docseries for suploer
			//commonFunction.getNewDocSeriesforParty("BPS", 31, this);

			this.getRolewisePartyGroups(31);

			//commonFunction.getReference("AddrTyp", "addressTypeModel", this);
			//commonFunction.getReference("GSTTyp", "gstTypeModel", this);

			// TDS list
			//commonFunction.getTdsList(this);

			//bind country dropdown
			commonService.getAllCountries(function (data) {
				var oModel = new sap.ui.model.json.JSONModel();
				oModel.setData({ modelData: data[0] });

				currentContext.getView().setModel(oModel, "partyCountryModel");
			});

			var period = [{ key: 7, period: 7 },
			{ key: 14, period: 14 },
			{ key: 30, period: 30 },
			{ key: 45, period: 45 },
			{ key: 90, period: 60 },
			{ key: 60, period: 90 }];

			var cModel = new sap.ui.model.json.JSONModel();
			cModel.setData({ modelData: period });
			currentContext.getView().setModel(cModel, "creditPeriodModel");

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

			// bind supplier ledger dropdown
			// commonService.getCategorywiseLedgers({ categoryid: 1 }, function (data) {
			// 	var oModel = new sap.ui.model.json.JSONModel();
			// 	oModel.setData({ modelData: data[0] });
			// 	currentContext.getView().setModel(oModel, "customerLedgerModel");
			// });

			// bind customer ledger dropdown
			// commonService.getCategorywiseLedgers({ categoryid: 2 }, function (data) {
			// 	var oModel = new sap.ui.model.json.JSONModel();
			// 	oModel.setData({ modelData: data[0] });
			// 	currentContext.getView().setModel(oModel, "supplierLedgerModel");
			// });

			var typeCode = "AccountType";

			// commonService.getReference({ typecode: typeCode }, function (data) {
			// 	var accountTypeModel = new sap.ui.model.json.JSONModel();
			// 	accountTypeModel.setData({ modelData: data[0] });
			// 	currentContext.getView().setModel(accountTypeModel, "accountTypeModel");
			// });

			this.fnShortCut();
		},
		fnShortCut: function () {
			var currentContext = this;
			$(document).keydown(function (evt) {
				// 	if (evt.keyCode == 83 && (evt.altKey)) {
				// 		evt.preventDefault();
				// 		jQuery(document).ready(function ($) {
				// 			currentContext.onSave();
				// 		})
				// 	}
				if (evt.keyCode == 69 && (evt.altKey)) {
					evt.preventDefault();
					jQuery(document).ready(function ($) {
						currentContext.onCancel();
					})
				}
			});
		},
		onBeforeRendering: function () {

			var currentContext = this;
			this.model = this.getView().getModel("viewModel");
            console.log("this.model",this.model);
			var oModel = new JSONModel();

			if (this.model != undefined) {

				Leadservice.getLeads({id: this.model.id}, function (data) {
                    console.log("-----------------data----------------------",data);
					oModel.setData(data[0][0]);
					var addresses = data[1];
					
					//currentContext.getRolewisePartyGroups(roles);
					if (addresses.length > 0) {

						currentContext.counter = addresses.length;

						for (var i = 0; i < addresses.length; i++) {
							var cnt = i + 1;
							//currentContext.getView().byId("ddlAddrType" + cnt).setSelectedKey(addresses[i].addresstypeid);
							currentContext.getView().byId("txtAddress" + cnt).setValue(addresses[i].address);
							currentContext.getView().byId("ddlCity" + cnt).setSelectedKey(addresses[i].cityid);
							currentContext.getView().byId("ddlState" + cnt).setSelectedKey(addresses[i].stateid);
							currentContext.getView().byId("ddlCountry" + cnt).setSelectedKey(addresses[i].countryid);
							//currentContext.getView().byId("ddlContact" + cnt).setSelectedKey(addresses[i].locationcontactno);
							//currentContext.getView().byId("ddlContact" + cnt).setValue(addresses[i].locationcontactno);
							//currentContext.getView().byId("txtGSTNo" + cnt).setValue(addresses[i].gstno);
							//currentContext.getView().byId("ddlGSTType" + cnt).setSelectedKey(addresses[i].gsttypeid);
							currentContext.getView().byId("txtPinCode" + cnt).setValue(addresses[i].pincode);

							if (cnt > 1) {
								currentContext.getView().byId("containerCity" + cnt).setVisible(true);
								currentContext.getView().byId("containerState" + cnt).setVisible(true);
							}
						}
					}

					// if (contacts.length > 0) {
					// 	for (var i = 0; i < contacts.length; i++) {
					// 		var cnt1 = i + 1;
					// 		currentContext.getView().byId("txtMobileNo" + cnt1).setValue(contacts[i].mobileno);
					// 		currentContext.getView().byId("txtFAXNo" + cnt1).setValue(contacts[i].faxno);

					// 		if (cnt1 > 1) {
					// 			currentContext.getView().byId("containerMobile" + cnt1).setVisible(true);
					// 			currentContext.getView().byId("containerPincode" + cnt1).setVisible(true);
					// 		}
					// 	}
					// }

					// if (roles.includes("31")) {
					// 	currentContext.getView().byId("textTds").setVisible(true);
					// } else {
					// 	currentContext.getView().byId("textTds").setVisible(false);
					// }


				});
				this.getView().byId("btnSave").setText("Update");

			} else {
				this.getView().byId("btnDelete").setVisible(false);
			}
            
			//commonFunction.getReference("ModName", "moduleList", this);

			this.getView().setModel(oModel, "editPartyModel");

			var oModel = this.getView().getModel("editPartyModel");
            console.log("ONBEFORERENDERING editPartyModel",oModel);
			oModel.oData.partyroleids = 31;
            console.log("ONBEFORERENDERING editPartyModel",oModel);
			oModel.refresh();
		},

		// TDS
		handleTdsValueHelp: function (oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputId = oEvent.getSource().getId();
			// create value help dialog
			// if (!this._valueHelpDialog) {
			this._valueHelpDialog = sap.ui.xmlfragment(
				"sap.ui.poultryerp.componentcontainer.fragmentview.Accounts.Master.TdsDialog",
				this
			);
			this.getView().addDependent(this._valueHelpDialog);
			// }
			this._valueHelpDialog.open(sInputValue);

		},

		handleTdsSearch: function (oEvent) {
			var sValue = oEvent.getParameter("value");
			var columns = ['section', 'description'];
			var oFilter = new sap.ui.model.Filter(columns.map(function (colName) {
				return new sap.ui.model.Filter(colName, sap.ui.model.FilterOperator.Contains, sValue);
			}),
				false);  // false for OR condition
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter([oFilter]);
		},

		onTdsDialogClose: function (oEvent) {
			var inputId = this.byId(this.inputId).sId;
			var currentContext = this;
			var aContexts = oEvent.getParameter("selectedContexts");

			inputId = inputId.substring(inputId.lastIndexOf('-') + 1);

			if (aContexts != undefined) {
				var selRow = aContexts.map(function (oContext) { return oContext.getObject(); });
				var oModel = currentContext.getView().getModel("editPartyModel");
				oModel.oData.tdsid = selRow[0].id;
				oModel.oData.section = selRow[0].section;
				oModel.oData.rate = selRow[0].rate;

				oModel.refresh();
			}
		},

		onAddContact: function () {

			if (this.counter < 10) {
				var cnt = this.counter + 1;
				this.getView().byId("containerCity" + cnt).setVisible(true);
				this.getView().byId("containerState" + cnt).setVisible(true);

				this.counter++;
			}
			else {
				MessageBox.warning("Maximum 10 addresses are allowed.");
			}
		},
		oncopyadress: function () {
			var address = this.getView().byId("txtAddress1").getValue();
			var city = this.getView().byId("ddlCity1").getSelectedKey();
			var contact = this.getView().byId("ddlContact1").getValue();
			var GStNo = this.getView().byId("txtGSTNo1").getValue()
			var GstType = this.getView().byId("ddlGSTType1").getSelectedKey();
			var state = this.getView().byId("ddlState1").getSelectedKey();
			var country = this.getView().byId("ddlCountry1").getSelectedKey();
			var pincode = this.getView().byId("txtPinCode1").getValue();
			for (var i = 1; i <= this.counter; i++) {
				this.getView().byId("txtAddress" + i).setValue(address);
				this.getView().byId("ddlCity" + i).setSelectedKey(city);
				this.getView().byId("ddlContact" + i).setValue(contact);
				this.getView().byId("txtGSTNo" + i).setValue(GStNo)
				this.getView().byId("ddlGSTType" + i).setSelectedKey(GstType);
				this.getView().byId("ddlState" + i).setSelectedKey(state);
				this.getView().byId("ddlCountry" + i).setSelectedKey(country);
				this.getView().byId("txtPinCode" + i).setValue(pincode);
			}

		},

		onRemoveContact: function () {

			var cnt = this.counter;

			this.getView().byId("containerCity" + cnt).setVisible(false);
			this.getView().byId("containerState" + cnt).setVisible(false);

			// clear inputs
			this.getView().byId("txtAddress" + cnt).setValue("");

			this.counter--;
		},

		//contact details add and remove
		onAddContactInfo: function () {

			if (this.counter1 < 5) {

				var cnt = this.counter1 + 1;

				this.getView().byId("containerMobile" + cnt).setVisible(true);
				this.getView().byId("containerPincode" + cnt).setVisible(true);

				this.counter1++;
			}
			else {
				MessageBox.warning("Maximum 5 contact details are allowed.");
			}
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

		onRemoveContactInfo: function () {

			var cnt = this.counter1;

			this.getView().byId("containerMobile" + cnt).setVisible(false);
			this.getView().byId("containerPincode" + cnt).setVisible(false);

			// clear inputs
			this.getView().byId("txtMobileNo" + cnt).setValue("");

			this.counter1--;
		},

		onSave: function () {
			//if (this.validateForm()) {
				var currentContext = this;
				var model = this.getView().getModel("editPartyModel").oData;
                console.log("editPartyModel",model);
				model["companyid"] = commonService.session("companyId");
				model["userid"] = commonService.session("userId");
				//model["partycode"] = this.getView().byId('txtpartycode').getValue();
				var partyAddressModel = [];
				//var partyContactModel = [];
				Leadservice.saveLead(model, function (data) {
                    console.log("Lead save succcessfully with data",data);

					if (data.id > 0) {

						for (var i = 1; i <= currentContext.counter; i++) {
							// var gsttypeid = currentContext.getView().byId("ddlGSTType" + i).getSelectedItem() != null ? currentContext.getView().byId("ddlGSTType" + i).getSelectedItem().mProperties.key : 1427;
							
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
								//locationcontactno: currentContext.getView().byId("ddlContact" + i).getValue(),
								//gstno: currentContext.getView().byId("txtGSTNo" + i).getValue(),
								//gsttypeid: gsttypeid,
							});
						}

                        console.log("-----------Inside-save-partyAddressModel-------------",partyAddressModel);

						// for (var i = 1; i <= currentContext.counter1; i++) {

						// 	if (currentContext.getView().byId("txtMobileNo" + i) != undefined) {
						// 		partyContactModel.push({
						// 			id: null,
						// 			partyid: data.id,
						// 			mobileno: currentContext.getView().byId("txtMobileNo" + i).getValue(),
						// 			faxno: currentContext.getView().byId("txtFAXNo" + i).getValue(),
						// 			companyid: commonService.session("companyId"),
						// 			userid: commonService.session("userId"),

						// 		});
						// 	}
						// }

						// partyService.savePartyContact({ contact: JSON.stringify(partyContactModel) }, function (data) {

						// });

						//for (var i = 0; i < partyAddressModel.length; i++) {
						//var gstNum = partyAddressModel[i].gstno;

						Leadservice.saveLeadAddress({ address: JSON.stringify(partyAddressModel) }, function (data) {
							//if (data.id > 0) {

							var message = model.id == null ? "Party created successfully!" : "Party edited successfully!";
							currentContext.onCancel();
							MessageToast.show(message);
							currentContext.bus = sap.ui.getCore().getEventBus();
							currentContext.bus.publish("loaddata", "loadData");
							// } else {
							// 	MessageBox.error("");
							// }
						});
						//}
					} else if (data.id == -1) {
						MessageBox.error("PAN no. should be unique..");
					}
					else if (data.id == -2) {
						MessageBox.error("Party name should be unique..");
					}
					else if (data.id == -3) {
						MessageBox.error("First set common setting.");
					}
				});
			//}
		},

		validateForm: function () {
			var isValid = true;
			var roles = this.getView().byId("cmbPartyRole").getSelectedKey();
			var emailId = this.getView().byId("txtEmailId").getValue();
			var phoneNo = this.getView().byId("txtPhoneNo").getValue();
			var creditLimit = this.getView().byId("txtCreditLimit").getValue();
			var creditPeriod = this.getView().byId("txtCreditPeriod").getSelectedKey();
			var shippingContactNo = this.getView().byId("txtShippingContactNo").getValue();
			var pan = this.getView().byId("txtPANNo").getValue();

			if (!commonFunction.ismultiComRequired(this, "ddlMtxtModuleNameodule", "Please select atleast one module."))
				isValid = false;
				
			if (!commonFunction.isRequired(this, "txtPartyName", "Please enter party name."))
				isValid = false;
			
			if(!commonFunction.isRequired(this, "txtPartyGroup", "Please select party group."))
				isValid = false;

			if (emailId != "") {
				if (!commonFunction.isEmail(this, "txtEmailId"))
					isValid = false;
			}else if (!commonFunction.isRequired(this, "txtEmailId", "Please enter email ID."))
				isValid = false;
			
			else {
				this.getView().byId("txtEmailId").setValueState(sap.ui.core.ValueState.None);
			}

			if (pan != "") {
				var panPat = /^([a-zA-Z]{5})(\d{4})([a-zA-Z]{1})$/;
				if (pan.search(panPat) == -1) {
					MessageBox.error("Invalid Pan No");
					isValid = false;
				}
			}else if (!commonFunction.isRequired(this, "txtPANNo", "Please enter PAN no."))
				isValid = false;

			if (phoneNo != "") {
				if (!commonFunction.isNumber(this, "txtPhoneNo"))
					isValid = false;
			}else if (!commonFunction.isRequired(this, "txtPhoneNo", "Please enter phone no."))
				isValid = false;
			else {
				this.getView().byId("txtPhoneNo").setValueState(sap.ui.core.ValueState.None);
			}

			if (creditLimit != "") {
				if (!commonFunction.isDecimal(this, "txtCreditLimit"))
					isValid = false;
			}else if (!commonFunction.isRequired(this, "txtCreditLimit", "Please enter credit limit."))
				isValid = false;
			else {
				this.getView().byId("txtCreditLimit").setValueState(sap.ui.core.ValueState.None);
			}

			if (shippingContactNo != "") {
				if (!commonFunction.isNumber(this, "txtShippingContactNo"))
					isValid = false;
			}else if (!commonFunction.isRequired(this, "txtShippingContactNo", "Please enter shipping contact no."))
				isValid = false;
			else {
				this.getView().byId("txtShippingContactNo").setValueState(sap.ui.core.ValueState.None);
			}

			// check atleast one role is selected
			if (roles.length == 0) {
				this.getView().byId("cmbPartyRole").setValueState(sap.ui.core.ValueState.Error)
					.setValueStateText("Please select atleast one role.");

				isValid = false;
			}
			else {
				this.getView().byId("cmbPartyRole").setValueState(sap.ui.core.ValueState.None);
				if (roles.includes("31")) {
					if (!commonFunction.isRequired(this, "tds", "Please select TDS."))
						isValid = false;
				}
			}

			return isValid;
		},

		onLedgerChange: function (oEvent) {
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

	

		// partyRoleSelectionFinish: function (oEvent) {

		// 	var selectedItems = oEvent.getParameter("selectedItems");
		// 	var roleids = "";

		// 	var currentContext = this;

		// 	if (selectedItems.length > 0) {

		// 		for (var i = 0; i < selectedItems.length; i++) {

		// 			var roleId = selectedItems[i].getKey();

		// 			roleids += roleId;

		// 			if (i != selectedItems.length - 1) {
		// 				roleids += ",";
		// 			}
		// 		}

		// 		if (roleids == 31) {
		// 			commonService.getCategorywiseLedgers({ categoryid: 2 }, function (data) {
		// 				var oModel = new sap.ui.model.json.JSONModel();
		// 				oModel.setSizeLimit(500);
		// 				oModel.setData({ modelData: data[0] });
		// 				currentContext.getView().setModel(oModel, "supplierLedgerModel");
		// 			});
		// 		} else if (roleids == 32) {
		// 			commonService.getCategorywiseLedgers({ categoryid: 1 }, function (data) {
		// 				var oModel = new sap.ui.model.json.JSONModel();

		// 				oModel.setSizeLimit(500);

		// 				oModel.setData({ modelData: data[0] });
		// 				currentContext.getView().setModel(oModel, "customerLedgerModel");
		// 			});
		// 		} else if (roleids == "31,32" || roleids == "32,31") {
		// 			commonService.getCategorywiseLedgers({ categoryid: 2 }, function (data) {
		// 				var oModel = new sap.ui.model.json.JSONModel();
		// 				oModel.setSizeLimit(500);
		// 				oModel.setData({ modelData: data[0] });
		// 				currentContext.getView().setModel(oModel, "supplierLedgerModel");
		// 			});

		// 			commonService.getCategorywiseLedgers({ categoryid: 1 }, function (data) {
		// 				var oModel = new sap.ui.model.json.JSONModel();
		// 				oModel.setData({ modelData: data[0] });
		// 				currentContext.getView().setModel(oModel, "customerLedgerModel");
		// 			});

		// 		}

		// 		var oModel = this.getView().getModel("editPartyModel");
		// 		oModel.oData.partyroleids = roleids;
		// 		oModel.refresh();
		// 		this.getRolewisePartyGroups(roleids);

		// 		this.getView().byId("cmbPartyRole").setValueState(sap.ui.core.ValueState.None)
		// 	}
		// 	else {
		// 		this.getView().byId("cmbPartyRole").setValueState(sap.ui.core.ValueState.Error)
		// 	}
		// },
		getRolewisePartyGroups: function (roleids) {
			var currentContext = this;
			// partyService.getRolewisePartyGroups({ partyroleids: roleids }, function (data) {
			// 	var oModel = new sap.ui.model.json.JSONModel();
			// 	oModel.setData({ modelData: data[0] });
			// 	currentContext.getView().setModel(oModel, "partyGroupModel");
			// });
		},

		handleSelectPartyGroupList: function (oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputId = oEvent.getSource().getId();
			this._valueHelpDialog = sap.ui.xmlfragment(
				"sap.ui.poultryerp.componentcontainer.fragmentview.Accounts.Master.PartyGroupDialog",
				this
			);
			this.getView().addDependent(this._valueHelpDialog);
			this._valueHelpDialog.open(sInputValue);

		},

		handlePartyGroupSearch: function (oEvent) {
			var sValue = oEvent.getParameter("value");
			var columns = ['partygroupname'];
			var oFilter = new sap.ui.model.Filter(columns.map(function (colName) {
				return new sap.ui.model.Filter(colName, sap.ui.model.FilterOperator.Contains, sValue);
			}),
				false);  // false for OR condition
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter([oFilter]);
		},

		handlePartyGroupClose: function (oEvent) {

			var currentContext = this;
			var aContexts = oEvent.getParameter("selectedContexts");

			if (aContexts != undefined) {
				var selRow = aContexts.map(function (oContext) { return oContext.getObject(); });
				var oModel = currentContext.getView().getModel("editPartyModel");
				oModel.oData.partygroupid = selRow[0].id;
				oModel.oData.partygroupname = selRow[0].partygroupname;

				oModel.refresh();
			}
		},

		onCancel: function () {
			this.oFlexibleColumnLayout = sap.ui.getCore().byId("componentcontainer---leads--fclPartyMaster");
			this.oFlexibleColumnLayout.setLayout(sap.f.LayoutType.OneColumn);
		},
	});
}, true);
