sap.ui.define([
	"sap/ui/model/json/JSONModel",
	'sap/ui/elev8rerp/componentcontainer/controller/BaseController',
	'sap/m/MessageToast',
	'sap/m/MessageBox',
	'sap/ui/elev8rerp/componentcontainer/controller/Common/Common.function',
	'sap/ui/elev8rerp/componentcontainer/services/Common.service',
	'sap/ui/elev8rerp/componentcontainer/services/Masters/Location.service',
	'sap/ui/elev8rerp/componentcontainer/services/LeadManagement/Lead.service',
	'sap/ui/elev8rerp/componentcontainer/services/Masters/Contact.service'
], function (JSONModel, BaseController, MessageToast, MessageBox, commonFunction, commonService, locationService, leadService,contactService) {
	"use strict";

	return BaseController.extend("sap.ui.elev8rerp.componentcontainer.controller.LeadManagement.AddContact", {
		onInit: function () {
			var currentContext = this;

			// currentContext.reset();
			this.bus = sap.ui.getCore().getEventBus();
			this.bus.subscribe("contactdetails", "newContact", this.contactdetail, this);
			this.bus.subscribe("converttolead", "leadConversion", this.leadConversion, this);
            this.bus.subscribe("contactscreen", "handleContactList", this.handleContactList, this);

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

			// bind Pipeline dropdown
			commonFunction.getReferenceByType("LeadStatus", "leadStatusModel", this);

			// bind standaredFloorHeightModel dropdown
			commonFunction.getReferenceByType("StdFlrHt", "standaredFloorHeightModel", this);

			// bind Stage dropdown
			commonFunction.getReferenceByType("Stage", "stageModel", this);

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
			this.getView().setModel(model, "editContactModel");

		},

		getModelDefault: function () {
			return {
				id: null,
                contacttypeid : null,
                date : null,
                contactcompanyid : null, 
                companyname : null, 
                buisnesscardone : null, 
                buisnesscardtwo : null, 
                buisnesscardthree : null, 
                contactcategoryid : null, 
                contactsubcategoryid : null, 
                waddress : null,
                wcityid : null,
                wstateid : null, 
                wcountryid : null, 
                wpincode : null,
                residentialaddress : null, 
                rcityid : null,
                rstateid : null, 
                rcountryid : null, 
                rpincode : null,
                phoneno : null, 
                email : null, 
                contactperson : null, 
                linkedtocompany : null, 
                buscard : null,
                branch : null, 
                gstno : null, 
                panno : null, 
                linkfacebook : null, 
                limkinstagram : null, 
                linkyoutube : null, 
                linklinkedin : null, 
                remark : null,
                contactsourceone : null, 
                contactsourcetwo : null, 
                salecontact : null,
                nicontact : null,
                eicontact : null, 
                contact : null,
                mobilep : null, 
                mobilew : null, 
                designation : null, 
                emailp : null,
                emailw : null, 
                DOB : null,
                DOM : null,
                sociallink1 : null, 
                sociallink2 : null, 
                sociallink3 : null, 
                contactreference : null, 
                companyid : null,
                contactname : null
			}
		},

		onBeforeRendering: function () {
			var currentContext = this;
			this.model = currentContext.getView().getModel("viewModel");
		},

        handleContactList: function (sChannel, sEvent, oData) {

			let selRow = oData.viewModel;
			let oThis = this;
			console.log(selRow);
			if (selRow != null) {
				oThis.bindContactDetails(selRow.id);
			}

			oThis.id = selRow.id;
		},

		leadConversion : function (sChannel, sEvent, oData) {

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.bus = sap.ui.getCore().getEventBus();
			oRouter.getTargets().display(oData.pagekey, { viewModel: oData.viewModel });
			oRouter.navTo(oData.pagekey, true);
		},

		convertToLead : function(){
			var viewModel = this.getView().getModel("editContactModel");
			var model = { "id": viewModel.oData.id }
			this.bus = sap.ui.getCore().getEventBus();

			console.log(model);
			setTimeout(function () {
				this.bus = sap.ui.getCore().getEventBus();
				this.bus.publish("converttolead", "leadConversion", { pagekey: "addlead", viewModel: model });
			}, 1000);

			this.bus.publish("converttolead", "leadConversion", { pagekey: "addlead", viewModel: model });
		},

		contactdetail: function (sChannel, sEvent, oData) {
			let selRow = oData.viewModel;
			let oThis = this;

			if (selRow != null) {

				if (selRow.action == "view") {
					oThis.getView().byId("btnSave").setEnabled(false);
				} else {
					oThis.getView().byId("btnSave").setEnabled(true);
				}

				oThis.bindContactDetails(selRow.id);

			}

			else {
				var oModel = new JSONModel();
				this.getView().setModel(oModel, "editContactModel");
			}

		},

		bindContactDetails: function (id) {
			var currentContext = this;
			var oModel = new JSONModel();
			if (id != undefined) {

				contactService.getContact({ id: id }, function (data) {
					oModel.setData(data[0][0]);
				});
				this.getView().byId("btnSave").setText("Update");

			} 

			this.getView().setModel(oModel, "editContactModel");
			var oModel = this.getView().getModel("editContactModel");
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

		onSave: function () {
			//if (this.validateForm()) {
				var currentContext = this;
				var model = this.getView().getModel("editContactModel").oData;
				console.log("editContactModel", model);
				model["companyid"] = commonService.session("companyId");
				model["date"] = commonFunction.getDate(model.date);
				model["userid"] = commonService.session("userId");

				contactService.saveContact(model, function (data) {

					if (data.id > 0) {
							var message = model.id == null ? "Contact created successfully!" : "Contact edited successfully!";
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
			var model = oThis.getView().getModel("editContactModel");
			model.setData([]);
			oThis.getView().setModel(model, "editContactModel");
		},

		onCancel: function () {
			this.reset();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("contacts");
		}
	});
}, true);
