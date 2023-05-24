sap.ui.define([
	"sap/ui/model/json/JSONModel",
	'sap/ui/elev8rerp/componentcontainer/controller/BaseController',
	'sap/ui/model/Sorter',
	'sap/ui/elev8rerp/componentcontainer/services/LeadManagement/Lead.service',
	'sap/ui/elev8rerp/componentcontainer/services/LeadManagement/Quotation.service',
	'sap/m/MessageBox',
	'sap/m/MessageToast',
	'sap/ui/elev8rerp/componentcontainer/controller/Common/Common.function',
], function (JSONModel, BaseController, Sorter, leadService, quotationService, MessageBox, MessageToast, commonFunction) {
	"use strict";

	return BaseController.extend("sap.ui.elev8rerp.componentcontainer.controller.LeadManagement.QuotationsDetail", {
		onInit: function () {
			var currentContext = this;
			this.imagepath = null;
			this.toDataURL('../images/snehaelev8r.png', function (dataUrl) {
				currentContext.imagepath = dataUrl;
			});

			this.companyname = commonFunction.session("companyname");
			this.companycontact = commonFunction.session("companycontact");
			this.companyemail = commonFunction.session("companyemail");
			this.address = commonFunction.session("address");
			this.city = commonFunction.session("city");
			this.pincode = commonFunction.session("pincode");

			this.bus = sap.ui.getCore().getEventBus();
			this.bus.subscribe("qutationdetail", "handleQutationDetails", this.handleQutationDetails, this);
			this.bus.subscribe("qutationdetails", "newQutation", this.newQutation, this);
			this.bus.subscribe("loaddata", "loadData", this.loadData, this);
			this.bus.subscribe("converttoorder", "orderConversion", this.orderConversion, this);

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

			var quotePDFModel = new JSONModel();
			quotePDFModel.setData([]);
			this.getView().setModel(quotePDFModel, "quotePDFModel");

			var leadLiftPDFModel = new JSONModel();
			leadLiftPDFModel.setData([]);
			this.getView().setModel(leadLiftPDFModel, "leadLiftPDFModel");

			var saleManagrPDFModel = new JSONModel();
			saleManagrPDFModel.setData([]);
			this.getView().setModel(saleManagrPDFModel, "saleManagrPDFModel");


			let attachmentModel = new JSONModel();
			attachmentModel.setData({ modelData: [] });
			this.getView().setModel(attachmentModel, "attachmentModel");
		},

		toDataURL: function (url, callback) {
			var xhr = new XMLHttpRequest();
			xhr.onload = function () {
				var reader = new FileReader();
				reader.onloadend = function () {
					callback(reader.result);
				}
				reader.readAsDataURL(xhr.response);
			};
			xhr.open('GET', url);
			xhr.responseType = 'blob';
			xhr.send();
			//}
		},

		handleRouteMatched: function (evt) {
			// this.loadData();
		},

		handleQutationDetails: function (sChannel, sEvent, oData) {
			let selRow = oData.viewModel;
			let oThis = this;
			// this.loadPDFData();
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
						console.log("quotationModel", quotationModel);

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

		orderConversion : function (sChannel, sEvent, oData) {

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.bus = sap.ui.getCore().getEventBus();
			oRouter.getTargets().display(oData.pagekey, { viewModel: oData.viewModel });
			oRouter.navTo(oData.pagekey, true);
		},

		convertToOrder : function(){
			var viewModel = this.getView().getModel("quoteModel");
			var model = { "quoteid": viewModel.oData.id }
			this.bus = sap.ui.getCore().getEventBus();

			console.log(model);
			setTimeout(function () {
				this.bus = sap.ui.getCore().getEventBus();
				this.bus.publish("converttoorder", "orderConversion", { pagekey: "addorder", viewModel: model });
			}, 1000);

			this.bus.publish("converttoorder", "orderConversion", { pagekey: "addorder", viewModel: model });
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
			console.log("---------viewModel-----------", viewModel);
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

		/**
	   * Generate PDF for Purchase request Scrren
	   */
		onPdfExport: function () {
			var fullHtml = "";
			var headertable1 = "";
			headertable1 += "<!DOCTYPE html> <html> <head> <title>" + "Quotation" + "</title>" +
				"<script type='text/javascript' src='https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js'></script>" +
				"<script type='text/javascript' src='https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.22/pdfmake.min.js'></script>" +
				"<script type='text/javascript' src='https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.62/vfs_fonts.js'></script>" +
				"<script type='text/javascript' src='https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js'></script>" +
				"<style type='text/css'>" +
				"table {font-family: arial, sans-serif;border-collapse: collapse;width: 100%; } td, th {border: 1px solid #000;text-align: left;padding: 5px; } th, td {width: 100px;overflow: hidden; } img { width: 180px; height: 120px; text-align: center; } </style> </head>";

			headertable1 += "<body id='tblCustomers' class='amin-logo'>";
			headertable1 += "</body>";
			headertable1 += "<script>";

			// Add filters for purchase request
			// let requestno = this.getView().byId('txtrequestno').getValue();
			// let remark = this.getView().byId('remark').getValue();

			// let podate = this.getView().byId("txtpodate").getValue();
			// let duedate = this.getView().byId("txtduedate").getValue();
			// let shipfromadderss = this.getView().byId('txtshipfromaddress').getValue();
			// let delieryaddress = this.getView().byId('txtWarehouseAddress').getValue();

			// let moduletype = this.getView().byId("setmoduleType").getSelectedItem();
			// moduletype = moduletype.mProperties.text;

			// let transactiontype = this.getView().byId("selGSTInvType").getSelectedItem();
			// transactiontype = transactiontype.mProperties.text;

			// let pono = this.getView().byId('txtPurchaseOrderNo').getValue();
			// let poid = this.getView().byId('txtPurchaseOrderId').getValue();

			// let createdby = this.getView().byId('txtcreatedby').getValue();
			// let approvedby = this.getView().byId('txtapprovedby').getValue();

			// let vendor = this.getView().byId('txtVendor').getValue();
			// let totalcost = this.getView().byId('txtItemTotal').getValue();
			// let discount = this.getView().byId('txtDiscount').getValue();
			// let discountwithitemtotal = this.getView().byId('txtdicountwithitemToatl').getValue();
			// let grandtotal1 = '';
			// let grandtotal = this.getView().byId('txtGrandTotal').getValue();

			let requestno = "PR001";
			let remark = "Qutation";

			let podate = "11/05/2023";
			let duedate = "11/05/2023";
			let shipfromadderss = "Pune";
			let delieryaddress = "Mumbai";

			let moduletype = "MR"
			//moduletype = moduletype.mProperties.text;

			let transactiontype = "Quote";
			//transactiontype = transactiontype.mProperties.text;

			let pono = "PO5008";
			let poid = 4;

			let createdby = "Pooja";
			let approvedby = "Kamlakar";

			let vendor = "Sai";
			let totalcost = 2000;
			let discount = 4;
			let discountwithitemtotal = 2;
			let grandtotal1 = '';
			let grandtotal = 5000;



			// Add company details on PDF
			var companyname = this.companyname;
			var phone = this.companycontact;
			var email = this.companyemail;
			var city = this.city;
			var address = "Pune";
			var pincode = 413512;
			var quotePDFModel = this.getView().getModel("quotePDFModel");
			let leadLiftPDFModel = this.getView().getModel("leadLiftPDFModel");
			let saleManagrPDFModel = this.getView().getModel("saleManagrPDFModel");
			console.log("------------quotePDFModel------------", quotePDFModel);
			console.log("------------leadLiftPDFModel------------", leadLiftPDFModel);
			console.log("------------saleManagrPDFModel------------", saleManagrPDFModel);


			var array = [];

			// array.push({
			// 	TYPE: "RM Series",
			// 	CAPACITY: "6 Passenger",
			// 	SPEED: "0.63 M/s",
			// });


			array.push({
				name: "TYPE",
				value: leadLiftPDFModel.oData.model,
			}, {
				name: "CAPACITY",
				value: leadLiftPDFModel.oData.capacity,
			}, {
				name: "SPEED",
				value: leadLiftPDFModel.oData.speed,
			},
				{
					name: "RISE (M) (Approximately)",
					value: "19 mts",
				},
				{
					name: "STOPS",
					value: leadLiftPDFModel.oData.stop,// "7 Landings / 7 Openings (All Openings are same Side)",
				},
				{
					name: "CONTROLLER",
					value: leadLiftPDFModel.oData.control,
				},
				{
					name: "DRIVE",
					value: leadLiftPDFModel.oData.drive,
				},
				{
					name: "SHAFT SIZE",
					value: quotePDFModel.oData.shaftsize,
				},
				{
					name: "CAR SIZE",
					value: quotePDFModel.oData.carsize,
				},
				{
					name: "CLEAR OPENING",
					value: quotePDFModel.oData.clearopening,
				},
				{
					name: "PIT DEPTH",
					value: quotePDFModel.oData.pitdepth,
				},
				{
					name: "OVER HEAD",
					value: quotePDFModel.oData.overhead,
				},

				{
					name: "CAR PANEL",
					value: "S.S Car Panel",
				},
				{
					name: "CAR DOOR",
					value: leadLiftPDFModel.oData.cardoor,
				},
				{
					name: "LANDING DOOR",
					value: leadLiftPDFModel.oData.landingdoor,
				},
				{
					name: "FALSE CEILING",
					value: "S.S False Ceiling",
				},

				{
					name: "VENTILATION",
					value: "Cross Flow Fan",
				},
				{
					name: "FLOORING",
					value: "PVC Mat",
				},
				{
					name: "C.O.P",
					value: "S.S Push Buttons",
				},

				{
					name: "CAR POSITION INDICATOR",
					value: "Dot matrix (LED) Scrolling Display",
				},
				{
					name: "MACHINE",
					value: leadLiftPDFModel.oData.machine,
				},
				{
					name: "TRACTION MEDIA",
					value: "Usha Martin Rope",
				},
				{
					name: "TYPE OF OPERATION",
					value: "Full Collective",
				},
				{
					name: "MAIN POWER SYSTEM",
					value: "415 Volts ( 3 Phase, 50 Hz, AC Current)",
				},
				{
					name: "AUXILARY SUPPLY SYSTEM",
					value: "220/230 Volts, Single Phase 50 Hz, AC Current",
				},


			);

			var phone = (this.companycontact === null || this.companycontact == undefined) ? "-" : this.companycontact;
			var email = (this.companyemail === null || this.companyemail == undefined) ? "-" : this.companyemail;
			var address = (this.address === null || this.address == undefined) ? "-" : this.address;
			var city = (this.city === null || this.city == undefined) ? "-" : this.city;
			var pincode = (this.pincode === null || this.pincode == undefined) ? "-" : this.pincode;

			// Add PR grid on screen
			var quoteModel = this.getView().getModel("quoteModel");
			// var tbleModel = this.getView().getModel("tblModel").oData.modelData;

			var tbleModel = this.getView().getModel("quoteModel").oData;
			headertable1 += "html2canvas($('#tblCustomers')[0], {" +
				"onrendered: function (canvas) {" +
				"var data = canvas.toDataURL();" +
				"var width = canvas.width;" +
				"var height = canvas.height;" +
				"var docDefinition = {" +
				"pageMargins: [ 40, 20, 40, 60 ]," +
				"content: [";
			headertable1 += "{text: ' " + companyname + "', style: 'subheaderone'},";
			headertable1 += "{text: '" + address + "', style: 'subheaderone'},";
			headertable1 += "{text: '" + "Jubilee Gardens,Kondapur," + "', style: 'subheaderone'},";
			headertable1 += "{text: '" + city + "-" + pincode + "', style: 'subheaderone'},";
			headertable1 += "{text: 'Email ID: " + email + "', style: 'subheaderone'},";
			headertable1 += "{text: '" + "www.elev8r.in" + "', style: 'subheaderone'},";

			headertable1 += "{columns: [{image:'" + this.imagepath + "', width:160, height:35,margin: [0, -30, 0, 0]}]},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{columns: [{text:'Neg. No" + "ELE/HYD/MAR/PRS/NE001" + "', style: 'subheader'},{text:'Dt. " + "04/03/2023" + "', style: 'subheaderone'}]},";
			headertable1 += "{text: ' " + "M/s. Padmavati Construction" + "', style: 'subheader'},";
			headertable1 += "{text: '" + "Masjid Banda," + "', style: 'subheader'},";
			headertable1 += "{text: '" + "Hyderabad - 500084" + "', style: 'subheader'},";
			headertable1 += "{text: '" + "Contact No. 8886002959" + "', style: 'subheader'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ]},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: 'Dear Sir/Madam', style: 'title'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: 'Thank you for giving us an opportunity to provide a proposal for supply & installation of SnehaElevators at your prestigious project. We would like to give you a brief synopsis about our company, product & after sales service set up. ', style: 'title'},";
			headertable1 += "{text: 'SNEHA ELEVATORS:', style: 'titlewithbold'},";
			headertable1 += "{text: 'Sneha elevators LLP is a part of a diversified Sneha Group and is leading provider of vertical transport solutions and is active in the areas of Elevator production, installation, maintenance and modernization. ', style: 'title'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: 'Sneha Elevator has been bagging major landmark projects like Cyprus Palms, RajapushpaProperties Ltd., Radhey, Muppa Indraprastha, My Home, Lumbini SLN Springs, VamsiramBuilders, Hallmark County, Vesella Meadows, Oorjitha Villas, SSVC etc', style: 'title'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: 'Sneha Elevator Factory - Sneha Elevator Factory in Hyderabad, reaffirms a clear commitment tocustomer focus, sustainability & growth.This stage of art elevator manufacturing will enableSnehaElevator to serve its customer with cost effective and sustainable products recreating the genuinequality.', style: 'title'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: 'We are confident that you will find our proposal in line with your expectation. If you have any queries, please do not hesitate to contact us. The undersigned backed by the entire sneha Organization, will be responsible for all activities related to the project. Starting from submission of our offer tothesatisfactory handing over of the elevator. The undersigned will be your single point of contact.', style: 'title'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: 'We thank you once again for your interest shown in Sneha Elevator and look forward to receiveyour valued order. For more information, kindly visit our website www.snehaelevator.com', style: 'title'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: 'Yours Sincerely,', style: 'title'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: ' " + "For SNEHA ELEVATORS LLP" + "', style: 'subheader'},";
			headertable1 += "{text: '" + "T. Prashanth" + "', style: 'subheader'},";
			headertable1 += "{text: '" + "Assistant Manager - Sales" + "', style: 'subheader'},";
			headertable1 += "{text: '" + "Contact No. 7337331523" + "', style: 'subheader'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: '" + "Sneha Elevators LLP" + "', style: 'subheader'},";
			headertable1 += "{columns: [{text:'Receiver Signature:-" + " " + "', style: 'subheader'},{text:'Authorized Signatory:-" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: ' " + companyname + "', style: 'subheaderone'},";
			headertable1 += "{text: '" + address + "', style: 'subheaderone'},";
			headertable1 += "{text: '" + "Jubilee Gardens,Kondapur," + "', style: 'subheaderone'},";
			headertable1 += "{text: '" + city + "-" + pincode + "', style: 'subheaderone'},";
			headertable1 += "{text: 'Email ID: " + email + "', style: 'subheaderone'},";
			headertable1 += "{text: '" + "www.elev8r.in" + "', style: 'subheaderone'},";

			headertable1 += "{columns: [{image:'" + this.imagepath + "', width:160, height:35,margin: [0, -30, 0, 0]}]},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ]},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: 'AUTO DOOR SPECIFICATION SHEET', style: 'titleincenter'},";
			headertable1 += "{ style: 'tableExample2',";
			headertable1 += " table: {";
			headertable1 += "widths: ['50%','50%'],";
			headertable1 += " body: [";
			headertable1 += "[ { columns: [ ['M/s. Padmavati Construction','Masjid Banda,','Hyderabad - 500084','Contact No. 8886002959'] ] },{ columns: [ ['Neg No: ELE/HYD/MAR/PRS/NE001','Date: 04/03/2023','MODEL CODE: MR'] ] }],";

			headertable1 += "]";
			headertable1 += "}";
			headertable1 += "},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: ' " + "Technical Specification of (1) No’s. SNEHA ELEVATORS LLP for your Prestigious Project at Hyderabad. To be furnished and erected in accordance with the following details:" + "', style: 'title'},";

			headertable1 += "{ style: 'tableExample2',";
			headertable1 += " table: {";
			headertable1 += "widths: ['*','auto','*'],";
			headertable1 += " body: [";
			for (var i = 0; i < array.length; i++) {
				headertable1 += "[ {text: '" + array[i].name + "'},{text: '" + " " + "'},{text: '" + array[i].value + "'},],";
			}

			headertable1 += "]";
			headertable1 += "}";
			headertable1 += "},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: '" + "Sneha Elevators LLP" + "', style: 'subheader'},";
			headertable1 += "{columns: [{text:'Receiver Signature:-" + " " + "', style: 'subheader'},{text:'Authorized Signatory:-" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: ' " + companyname + "', style: 'subheaderone'},";
			headertable1 += "{text: '" + address + "', style: 'subheaderone'},";
			headertable1 += "{text: '" + "Jubilee Gardens,Kondapur," + "', style: 'subheaderone'},";
			headertable1 += "{text: '" + city + "-" + pincode + "', style: 'subheaderone'},";
			headertable1 += "{text: 'Email ID: " + email + "', style: 'subheaderone'},";
			headertable1 += "{text: '" + "www.elev8r.in" + "', style: 'subheaderone'},";

			headertable1 += "{columns: [{image:'" + this.imagepath + "', width:160, height:35,margin: [0, -30, 0, 0]}]},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ]},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: 'Standard Features(Auto)', style: 'titleincenter'},";
			headertable1 += "{ style: 'tableExample3',";
			headertable1 += " table: {";
			headertable1 += "widths: ['50%','50%'],";
			headertable1 += " body: [";
			headertable1 += "[ { columns: [ ['STANDARD FEATURES'] ]},{ columns: [ ['Manual Rescue Operation,','Auto Fan Cut Off,','Rear side SS Hand rail,','Automatic leveling with Ground Floor on Power Restoration,','Floor Position and Direction indicator in car and Landings,','Terminal approach slow down for safety,','Final Limit protection, ','Emergency alarm,','Door Open / Close Button, ','Door Time Protection,','Floor announcement,','Cancelling cop call on second press,','Parking floor,','Emergency electric break releaser,','Full curtain infrared door safety,'] ]}],";
			headertable1 += "[ { columns: [ ['Safety Features'] ]},{ columns: [ ['Automatic Rescue Device - ARD,','OSG ( Over Speed Governor)'] ]}],";

			headertable1 += "]";
			headertable1 += "}";
			headertable1 += "},";

			headertable1 += "{text: '" + "Sneha Elevators LLP" + "', style: 'subheader'},";
			headertable1 += "{columns: [{text:'Receiver Signature:-" + " " + "', style: 'subheader'},{text:'Authorized Signatory:-" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";

			headertable1 += "{text: ' " + companyname + "', style: 'subheaderone'},";
			headertable1 += "{text: '" + address + "', style: 'subheaderone'},";
			headertable1 += "{text: '" + "Jubilee Gardens,Kondapur," + "', style: 'subheaderone'},";
			headertable1 += "{text: '" + city + "-" + pincode + "', style: 'subheaderone'},";
			headertable1 += "{text: 'Email ID: " + email + "', style: 'subheaderone'},";
			headertable1 += "{text: '" + "www.elev8r.in" + "', style: 'subheaderone'},";

			headertable1 += "{columns: [{image:'" + this.imagepath + "', width:160, height:35,margin: [0, -30, 0, 0]}]},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ]},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{ style: 'tableExample2',";
			headertable1 += " table: {";
			headertable1 += "widths: ['50%','50%'],";
			headertable1 += " body: [";
			headertable1 += "[ { columns: [ ['M/s. Padmavati Construction','Masjid Banda,','Hyderabad - 500084','Contact No. 8886002959'] ] },{ columns: [ ['Neg No: ELE/HYD/MAR/PRS/NE001','Date: 04/03/2023','MODEL CODE: MR'] ] }],";

			headertable1 += "]";
			headertable1 += "}";
			headertable1 += "},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: 'PRICE SUMMARY: Our proposition for the Design and Manufacturing, supply andcompleteinstallation and testing of Elevators as described in the offer will be undertakenat thefollowing conditions. The Prices are in INR. ', style: 'title'},";
			headertable1 += "{ style: 'tableExample2',";
			headertable1 += " table: {";
			headertable1 += "widths: ['*','*','*'],";
			headertable1 += " body: [";
			headertable1 += "[ { columns: [ ['Lift Solution'] ] },{ columns: [ ['Unit'] ] },{ columns: [ ['Price'] ] }],";
			headertable1 += "[ { columns: [ ['6P – 7S (C+G+5) - MR - S.S Car Panel - S.S Center','Opening Auto Power Door'] ] },{ columns: [ ['2 Units'] ] },{columns: [{text:'     " + leadLiftPDFModel.oData.quotevalue + "(Per Unit) "  + "', style: 'subheader'}]}],";
			headertable1 += "[ { columns: [ ['Lift Solution']] },{columns:[]},{columns:[]}],";
			headertable1 += "]";
			headertable1 += "}";
			headertable1 += "},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: 'The price/s quoted herein is/are exclusive of all taxes, as currently applicable, whether levied by the Central Government or the State Government. In the event of any amendment or variation in the rate or methodology for charging the applicable taxes, and/or, should be any new levies imposed in respect of this contract, the entire burden of any additional levy shall be borne and payable by you on demand at any time, in addition to the price/s stated herein. ', style: 'title'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: 'GST Registration Number -------------------------------------------------------------------------------------------------------------------------------------------', style: 'titlebold'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: 'PAN Number ------------------------------------------------------------------------------------------------------------------------------------------------------------', style: 'titlebold'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: 'Aadhar Number -------------------------------------------------------------------------------------------------------------------------------------------------------', style: 'titlebold'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: 'E – Mail ------------------------------------------------------------------------------------------------------------------------------------------------------------------', style: 'titlebold'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{columns: [{text:'ACCEPTED:-" + " " + "', style: 'titlebold'}]},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{columns: [{text:'IN DUPLICATE ON:-" + " " + "', style: 'titlebold'},{text:'BY:-" + " " + "', style: 'subheaderbold'}]},";

			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";

			headertable1 += "{text: '" + "Sneha Elevators LLP" + "', style: 'subheader'},";
			headertable1 += "{columns: [{text:'Receiver Signature:-" + " " + "', style: 'subheader'},{text:'Authorized Signatory:-" + " " + "', style: 'subheaderone'}]},";

			headertable1 += "{text: ' " + companyname + "', style: 'subheaderone'},";
			headertable1 += "{text: '" + address + "', style: 'subheaderone'},";
			headertable1 += "{text: '" + "Jubilee Gardens,Kondapur," + "', style: 'subheaderone'},";
			headertable1 += "{text: '" + city + "-" + pincode + "', style: 'subheaderone'},";
			headertable1 += "{text: 'Email ID: " + email + "', style: 'subheaderone'},";
			headertable1 += "{text: '" + "www.elev8r.in" + "', style: 'subheaderone'},";

			headertable1 += "{columns: [{image:'" + this.imagepath + "', width:160, height:35,margin: [0, -30, 0, 0]}]},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ]},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: 'TERMS OF PAYMENT:', style: 'titleincenter'},";

			headertable1 += "{ style: 'tableExample4',";
			headertable1 += " table: {";
			headertable1 += "widths: ['50%','50%'],";
			headertable1 += " body: [";
			headertable1 += "[ { columns: [ ['Advance on order reception.',' ',' '] ] },{ columns: [ ['10%'] ] }],";
			headertable1 += "[ { columns: [ ['For request of mechanical material',' ',' '] ] },{ columns: [ ['60%'] ] }],";
			headertable1 += "[ { columns: [ ['For request of electrical material',' ',' '] ] },{ columns: [ ['25%'] ] }],";
			headertable1 += "[ { columns: [ ['On customer Handover',' ',' '] ] },{ columns: [ ['5%'] ] }],";

			headertable1 += "]";
			headertable1 += "}";
			headertable1 += "},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";

			headertable1 += "{text: 'Irrespective of any delay in building completion, availability of permanent power supply or by any cause beyond our control, the final payment will be due to us within 180 days from the date of our intimation that material is at ready at factory.', style: 'titlewithbold'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";

			headertable1 += "{text: 'BANK DETAILS:', style: 'titleboldheader'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: 'COMPANY NAME: SNEHA ELEVATORS LLP', style: 'titlebold' },";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: 'ACCOUNT NO.: 50200057329713', style: 'titlebold'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: 'IFSC CODE: HDFC0005176', style: 'titlebold'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: 'PEDDAMMATEMPLE, JUBILEE HILLS BRANCH', style: 'titlebold'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: 'HDFC BANK', style: 'titlebold'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";

			headertable1 += "{text: '" + "Sneha Elevators LLP" + "', style: 'subheader'},";
			headertable1 += "{columns: [{text:'Receiver Signature:-" + " " + "', style: 'subheader'},{text:'Authorized Signatory:-" + " " + "', style: 'subheaderone'}]},";

			headertable1 += "{text: ' " + companyname + "', style: 'subheaderone'},";
			headertable1 += "{text: '" + address + "', style: 'subheaderone'},";
			headertable1 += "{text: '" + "Jubilee Gardens,Kondapur," + "', style: 'subheaderone'},";
			headertable1 += "{text: '" + city + "-" + pincode + "', style: 'subheaderone'},";
			headertable1 += "{text: 'Email ID: " + email + "', style: 'subheaderone'},";
			headertable1 += "{text: '" + "www.elev8r.in" + "', style: 'subheaderone'},";

			headertable1 += "{columns: [{image:'" + this.imagepath + "', width:160, height:35,margin: [0, -30, 0, 0]}]},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ]},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";

			headertable1 += "{text: 'MAINTENANCE', style: 'titleincenter'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: 'Our quotation includes charges towards maintenance for (12) twelve months. The period of this maintenance shall commence from the date of completed installation and handing over of the lift. The date of commencement of this service shall remain firm irrespective of any delay in building completion, availability of permanent power supply, inspection, taking over or commencing use of the elevator.',style: 'title'},";

			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: 'Maintenance will consist of regular checkups and other necessary adjustment and lubrication of the equipment by trained and competent personnel under our direction and supervision. The required supplies and parts will be provided except such parts as may be necessary due to negligence, misuse or accidents not attributable to the manufacturing deficiencies of the product. Upon your request, special inspections will be carried out should trouble develop between regular inspections and you agree to notify us promptly of any such trouble.',style: 'title'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: 'All work will be performed during our regular working hours of our regular working days except for emergency and minor adjustment callback service which will be provided during regular working hours and also during any overtime hours. No work or service other than the specifically mentioned is included or intended under the terms and conditions of this contract.',style: 'title'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";

			headertable1 += "{text: 'It is agreed that you shall continue to be the exclusive owner of the equipment and there by the possession or control thereof.',style: 'title'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: 'We shall not be liable for any loss, damage, or delay due to any cause beyond our reasonable control including but not limited to acts of government, strikes, fire explosion,theft, floods, riots, civil commotion, war, malicious mischief or act of God. Under no circumstances shall we be liable for consequential damages.',style: 'title'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";

			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";

			headertable1 += "{text: '" + "Sneha Elevators LLP" + "', style: 'subheader'},";
			headertable1 += "{columns: [{text:'Receiver Signature:-" + " " + "', style: 'subheader'},{text:'Authorized Signatory:-" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: ' " + companyname + "', style: 'subheaderone'},";
			headertable1 += "{text: '" + address + "', style: 'subheaderone'},";
			headertable1 += "{text: '" + "Jubilee Gardens,Kondapur," + "', style: 'subheaderone'},";
			headertable1 += "{text: '" + city + "-" + pincode + "', style: 'subheaderone'},";
			headertable1 += "{text: 'Email ID: " + email + "', style: 'subheaderone'},";
			headertable1 += "{text: '" + "www.elev8r.in" + "', style: 'subheaderone'},";

			headertable1 += "{columns: [{image:'" + this.imagepath + "', width:160, height:35,margin: [0, -30, 0, 0]}]},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ]},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";

			headertable1 += "{text: 'CUSTOMERS SCOPE OF WORKS - SUMMARY', style: 'headertitleincenter'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: 'CIVIL WORKS', style: 'titleincenter'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: '1. MINOR CIVIL WORKS LIKE CHIPPING, ENTRANCE WALLS & SHAFT WHITE WASH.', style: 'titlebold'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: '2. SCAFFOLDING TO BE PROVIDED IN THE HOISTWAY.', style: 'titlebold'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: '3. PIT WATER PROOFING TO BE DONE.', style: 'titlebold'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: '4. STORAGE ROOM FOR MATERIAL STORAGE.', style: 'titlebold'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: '5. LADDER VENTILATION DOOR TO BE PROVIDED FOR MACHINE ROOM.', style: 'titlebold'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: 'ELECTRICAL WORKS', style: 'titleincenter'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: '6. POWER SUPPLY (SINGLE-PHASE) TO BE PROVIDED IN THE HOISTWAY.', style: 'titlebold'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: '7. BULKHEAD LIGHTING TO BE PROVIDED.', style: 'titlebold'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: '8. TWO SAPARATE EARTH PITS WITH COPPER WIRE OF 8 GUAGE TO BE PROVIDED.', style: 'titlebold'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: '9. MCB TO BE PROVIDED IN TOP FLOOR AS PER SNEHA SPCIFICATIONS.', style: 'titlebold'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: 'PREPARATORY WORK', style: 'titleincenter'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: 'Following are key points under Customer scope:', style: 'titlebold'},";
			headertable1 += "{text: '1.  TO FURNISH within two weeks (or sooner if required) from the date of acceptance of this proposal, all required data for the performance of this contract.',style: 'title'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: '2.  TO DESIGN AND FURNISH a properly framed and enclosed legal elevator hoistway/Structure which shall withstand the forces and loads resulting from use of the Elevator. The hoistway should be lighted and be treated and painted to minimize the accumulation and circulation of dust. And provide & install necessary hoistway,architraves, brick fascias /steel.',style: 'title'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: '3.  TO provide an elevator pit of appropriate depth below the lowest landing and, if required, suitable drains and waterproofing.',style: 'title'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: '" + "Sneha Elevators LLP" + "', style: 'subheader'},";
			headertable1 += "{columns: [{text:'Receiver Signature:-" + " " + "', style: 'subheader'},{text:'Authorized Signatory:-" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: ' " + companyname + "', style: 'subheaderone'},";
			headertable1 += "{text: '" + address + "', style: 'subheaderone'},";
			headertable1 += "{text: '" + "Jubilee Gardens,Kondapur," + "', style: 'subheaderone'},";
			headertable1 += "{text: '" + city + "-" + pincode + "', style: 'subheaderone'},";
			headertable1 += "{text: 'Email ID: " + email + "', style: 'subheaderone'},";
			headertable1 += "{text: '" + "www.elev8r.in" + "', style: 'subheaderone'},";

			headertable1 += "{columns: [{image:'" + this.imagepath + "', width:160, height:35,margin: [0, -30, 0, 0]}]},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ]},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: '4 TO provide white washing , plastering and adequate measures to prevent water from seeping in to the hoistway before start of installation .',style: 'title'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: '5 TO perform all cutting of walls, floors or partitions together with any repairs made necessary thereby, including grouting of all bolts, sills, members indicator and button boxes etc., in position',style: 'title'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: '6 TO provide required power at the top floor landing terminating in suitable main switches for power and light circuits with circuit breakers, suitable earthing leads to top floor landing (refer layout) and other electrical protective devices necessary to meet legal code requirements. Also Guard & protect the hoistway',style: 'title'},";

			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: '7 TO provide light outlet point at the middle of the hoistway and a light point in the pit.',style: 'title'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: '8 TO arrange, during the erection, electric power of the necessary characteristics to provide illumination and for operation of tools and hoists if required and current for starting, testing and adjusting the elevator.',style: 'title'},";

			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: '9 TO undertake the responsibility in whole or in part to pay and bear pro-rata expense of electric current, or expenses of any nature relating to the rest of the building and other contractor’s work (unless provided for herein).',style: 'title'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: '10 TO PAY all fees that may be required in connection with the erection or preparation of the structure in which the elevator equipment is to be erected, including any general permit/certificate fees, usually billed by Governmental agency directly to the owner also including license fees for the installation or inspection of the elevator equipment',style: 'title'},";

			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: '11 TO PROVIDE suitable weatherproof lockup storage accommodation of approximately 50 Sq. per elevator with electric lights for elevator materials at the ground floor level near the hoist way. This should be available well before the arrival of the materials.',style: 'title'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: '12 TO PROVIDE and maintain adequate safety and security measures as also retain ELEV8R safety infrastructure to prevent any injury to third party or damage, theft orpilferage of material during storage, erection period and until the elevator is handed over.',style: 'title'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: '13 To provide hoisting hooks in the ceiling as per the arrangements shown in the equipment layout that will support the loads indicated. These hooks must be certified for the loads indicated.',style: 'title'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: '14 Provide a niche at the top portion of hoist way as indicated in the GA drawing.',style: 'title'},";
			headertable1 += "{text: '15 TO PROVIDE acceptable living accommodation (complete with light, running water & sanitary facilities) for our erection crew at or near to site.',style: 'title'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: '16 TO INDEMNIFY and save us harmless against all liability arising out of your failure to carry out and comply with any of the Foregoing requirements.',style: 'title'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: '" + "Sneha Elevators LLP" + "', style: 'subheader'},";
			headertable1 += "{columns: [{text:'Receiver Signature:-" + " " + "', style: 'subheader'},{text:'Authorized Signatory:-" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: ' " + companyname + "', style: 'subheaderone'},";
			headertable1 += "{text: '" + address + "', style: 'subheaderone'},";
			headertable1 += "{text: '" + "Jubilee Gardens,Kondapur," + "', style: 'subheaderone'},";
			headertable1 += "{text: '" + city + "-" + pincode + "', style: 'subheaderone'},";
			headertable1 += "{text: 'Email ID: " + email + "', style: 'subheaderone'},";
			headertable1 += "{text: '" + "www.elev8r.in" + "', style: 'subheaderone'},";

			headertable1 += "{columns: [{image:'" + this.imagepath + "', width:160, height:35,margin: [0, -30, 0, 0]}]},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ]},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: 'CONDITIONS OF CONTRACT', style: 'titleincenter'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";

			headertable1 += "{text: '1. This Quotations shall remain valid and effective for 30 days from the date of proposal and there after shall be subject to change without notice.',style: 'title'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: '2. Price Validity: The agreed contract price shall be valid for 26 weeks (6 months) from the date of your acceptance of this proposal. Should the said period be extended beyond this stipulated time due to (i) non- payment of the agreed amount and / or (ii) due to non-submission of data or approved drawings required for the manufacture of the elevator and / or (iii) delay in completion of the hoist way and machine room. Price shall be renegotiated with minimum escalation of 2% for each quarter for such delayed period. In addition, the delivery timeliness shall be renegotiated. If no Agreement is reached in 90 days, Termination clause as per the contract shall be applicable',style: 'title'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";

			headertable1 += "{text: '3. Delivery: We shall delivery the elevator after 4 Weeks (stage wise) from the date of receipt of order, agreed payment terms, layout approval and settlement of all technical details site readiness whichever is later.',style: 'title'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: '4. Installation: Installation of each unit shall be completed in 4 Weeks (stage wise) from the date of start of installation work at site, provided all our requests mentioned in the preparatory work are adhered to and contractual terms complied.',style: 'title'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: '5. If during the inspection of site, we observe that there is a delay in completion of the hoist way structure or availability of power supply, we may at our option delay the final assembly of materials and shipment to site so as to synchronize with the hoist way and machine room completion date. In such an event, a fresh completion date will be established depending upon minimum installation time indicated in above.',style: 'title'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: '6. Warranty & Real estate Regulation Act (RERA): The contract is not subject to provision of RERA. The Warranty is for a period of 12 months from the intimation to the customer of the physical completion of installation.',style: 'title'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: '7. Variation in tax : The adjustment in price resulting from tax variation or imposition of fresh taxes included in this proposal may be claimed by us as soon as the amount thereof is as certainable and shall be payable on demand.',style: 'title'},";

			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: '8. You agree to furnish us, within two weeks from the date of this agreement, all required data for the performance of the contract. You agree that the hoist way structure along with preparatory work shall be ready and the proper electric power available in suitable place by the required date, after which we are to have their uninterrupted use for installation and adjustment of the elevator(s). If you cannot provide electric power by the required date and the installation of the equipment has been completed, you shall take over the elevator(s) and make payments as they fall due for payment. Any delay due to this shall result in automatically extending the contract completion period accordingly.',style: 'title'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: '" + "Sneha Elevators LLP" + "', style: 'subheader'},";
			headertable1 += "{columns: [{text:'Receiver Signature:-" + " " + "', style: 'subheader'},{text:'Authorized Signatory:-" + " " + "', style: 'subheaderone'}]},";

			headertable1 += "{text: ' " + companyname + "', style: 'subheaderone'},";
			headertable1 += "{text: '" + address + "', style: 'subheaderone'},";
			headertable1 += "{text: '" + "Jubilee Gardens,Kondapur," + "', style: 'subheaderone'},";
			headertable1 += "{text: '" + city + "-" + pincode + "', style: 'subheaderone'},";
			headertable1 += "{text: 'Email ID: " + email + "', style: 'subheaderone'},";
			headertable1 += "{text: '" + "www.elev8r.in" + "', style: 'subheaderone'},";
			headertable1 += "{columns: [{image:'" + this.imagepath + "', width:160, height:35,margin: [0, -30, 0, 0]}]},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ]},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: 'CONDITIONS OF CONTRACT', style: 'titleincenter'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: '9. The milestone based payment terms as agreed in the contract and duly signed and accepted jointly by customer and Sneha representative shall be considered “Immediate due” from the date of such milestone and or submission of invoice, whichever is earlier.Sneha shall be entitled to charge interest @18% per annum on all overdue invoices lying unpaid for greater than 15 days from the date of invoice.',style: 'title'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: '10. It is agreed that our workmen shall be given a safe place to work and we reserve the right to discontinue our work in the building whenever, in our opinion, this provision is being violated.',style: 'title'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: '11. Unless otherwise agreed, it is understood that the work will be performed during our regular working hours of our regular working days. If overtime work is mutually agreed upon and performed, an additional charge therefore, at our usual rate for such work, shall be added to the contract price.',style: 'title'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: '12. Ownership of Material; Till the final payment is made, the customer cannot claim right of ownership or lien over any materials. Sneha shall have the right to take back / reclaim the possession of the same or any part thereof at the customer’s cost. In case the payment is not made as per the terms of the contract. Sneha Elevators LLP have the right to dismantle its equipment and take the materials supplied back in its possession',style: 'title'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: '13. Right to Use: Neither the customer nor any third party shall be entitled to use the elevator for any purpose what so ever prior to: Any usage of Sneha Elevator, for any purpose whatever before the format written handover letter to customer. And or without the full or final payments, including any over dues because of variation in taxes, pending certificates.',style: 'title'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: '14. Force majeure: Under no circumstances shall either of us be liable for any loss, damage or delay due to any cause beyond your/our reasonable control, including but not limited to lack of shipping space, embargoes, acts of any Government, strikes, lockouts, fire, accident, explosion, flood, riots, civil commotion, war, malicious mischief, delays in supplies of raw materials and components at our Works due to any or all of the reasons, such as energy crisis, electricity cut, rail/road transporter’s strike, go slow, bands, nonavailability of essential raw materials ( iron and steel, pig iron, aluminum, copper, silver, brass, stainless steel, various alloys, electrical grade steel, etc.), act of God or of the State’s enemies, or act of third party. Delay resulting from any cause beyond your/our reasonable control shall extend the time for completion of the work and the commencement of the free maintenance period. If for any such reasons, we cannot supply the equipment covered by this contract within _13 weeks from the date of your acceptance of this proposal, we may, at our option, cancel the contract without being liable to pay any damages or compensation. Under no circumstances, shall either of us be liable for special, indirect or consequential loss or damages of any kind.',style: 'title'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: '15. This contract shall be deemed to be an indivisible works contract. Any packing cases, or left over materials or tools tackles, instruments, etc. brought to site are and shall remain our property. We reserve the right to sub-contract the work as and when we deem fit',style: 'title'},";

			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: '" + "Sneha Elevators LLP" + "', style: 'subheader'},";
			headertable1 += "{columns: [{text:'Receiver Signature:-" + " " + "', style: 'subheader'},{text:'Authorized Signatory:-" + " " + "', style: 'subheaderone'}]},";

			headertable1 += "{text: ' " + companyname + "', style: 'subheaderone'},";
			headertable1 += "{text: '" + address + "', style: 'subheaderone'},";
			headertable1 += "{text: '" + "Jubilee Gardens,Kondapur," + "', style: 'subheaderone'},";
			headertable1 += "{text: '" + city + "-" + pincode + "', style: 'subheaderone'},";
			headertable1 += "{text: 'Email ID: " + email + "', style: 'subheaderone'},";
			headertable1 += "{text: '" + "www.elev8r.in" + "', style: 'subheaderone'},";
			headertable1 += "{columns: [{image:'" + this.imagepath + "', width:160, height:35,margin: [0, -30, 0, 0]}]},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ]},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: 'CONDITIONS OF CONTRACT', style: 'titleincenter'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: '16. Defect liability period: We hereby guarantee the material supplied and the workmanship of the elevator(s) under this contract for a period of 18 months from the date of initial supply of materials or 12 months from the date of completion of each elevator,whichever is earlier, and we will rectify and make good any defects, not due to ordinary wear and tear, improper use, or lack of care, which may develop during this period. This guarantee (a) does not extend to consequential loss and/or damages and (b) is null and void in case of tampering and/or if maintenance, repairs and modifications are carried out by unauthorized persons.',style: 'title'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";

			headertable1 += "{text: '17. We shall not be required to install or alter any equipment requested by Government Authorities at their discretion and not specifically incorporated in the local codes. However, such changes as well as changes in local codes after the date of this proposal if feasible will be undertaken by us at extra cost.',style: 'title'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: '18. If there are any changes, modifications, additions, deletions or extras to the scope of work outlined in this proposal, which are agreed to by us in writing, then, in such event,the contract price and the delivery period will be adjusted accordingly on mutually agreed terms and conditions.',style: 'title'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: '19. If any descriptive matter, drawings or illustrations brochures are furnished with our proposal, they are approximate and submitted only to show the general style, arrangement and dimensions of the machinery offered.',style: 'title'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: '20. The equipment offered by us has been described in our attached specifications and complete equipment will be supplied and installed as per standard ELEV8R design,manufacture and practice. In case of any variation between your specifications, terms and conditions and our quotation/specifications/correspondence, the latter shall prevail.',style: 'title'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";

			headertable1 += "{text: '21. If materials supplied by us, whether installed or not, are required to be reconditioned/replaced at a later date due to delay on account of (i) non availability of power supply or other incomplete work by you, (ii) force majeure conditions, (iii) non –payment of dues, the related cost shall be payable by you on demand.',style: 'title'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: '22. Presently we have our manufacturing unit in Hyderabad. Based on the technical specifications of the said contract and depending on availability and feasibility of transport or material, ELEV8R at its sole discretion will source the material either from its factory and/or any other source anywhere in India and/or from overseas and hence we will not be in a position to furnish the duty payment details in respect of the bought out and imported materials.',style: 'title'},";

			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: '23. If you cancel the contract and/or commit a breach of contract and or contract remains dormant for 26weeks from signing the contract, we shall be entitled to claim damages and/or compensation, including the costs of the materials and loss of profits/administrative expenses actual or at the rate of 10% of the value of the contract, whichever is higher.',style: 'title'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: '" + "Sneha Elevators LLP" + "', style: 'subheader'},";
			headertable1 += "{columns: [{text:'Receiver Signature:-" + " " + "', style: 'subheader'},{text:'Authorized Signatory:-" + " " + "', style: 'subheaderone'}]},";

			headertable1 += "{text: ' " + companyname + "', style: 'subheaderone'},";
			headertable1 += "{text: '" + address + "', style: 'subheaderone'},";
			headertable1 += "{text: '" + "Jubilee Gardens,Kondapur," + "', style: 'subheaderone'},";
			headertable1 += "{text: '" + city + "-" + pincode + "', style: 'subheaderone'},";
			headertable1 += "{text: 'Email ID: " + email + "', style: 'subheaderone'},";
			headertable1 += "{text: '" + "www.elev8r.in" + "', style: 'subheaderone'},";
			headertable1 += "{columns: [{image:'" + this.imagepath + "', width:160, height:35,margin: [0, -30, 0, 0]}]},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ]},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: 'CONDITIONS OF CONTRACT', style: 'titleincenter'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: '24 All disputes, differences and claims whatsoever which shall at any time arise between the parties hereto or their respective representatives concerning this contract and all other documents in pursuance hereof as to the rights, duties, obligations or liabilities of the parties hereto respectively by virtue of this contract shall be:',style: 'title'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";

			headertable1 += "{text: 'a) Referred to senior managers of both the parties. If the parties fail to arrive at an amicable settlement and resolution of the issues then it.',style: 'title'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: 'b) Shall be referred to Arbitration in accordance with the provisions of the Arbitration and Conciliation Act 1996 as amended from time to time. Such arbitration proceedings will take place in Hyderabad* only, and shall be subject to jurisdiction of the Courts in Hyderabad*.',style: 'title'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: '25. The amount /advance paid as per the terms of contract will be subject to lien and apportionment over the expenses of the contract by ELEV8R, subject to condition that same has to be informed to the PARTY in writing. The PARTY agrees that the decision of ELEV8R will be final in this regard and the party agrees that the same will not be challenged on any legal grounds.',style: 'title'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: '26. This proposal when accepted by you and approved by our authorized official shall constitute the entire contract between us and all prior proposals, quotations, agreements, understandings, representations and arrangements not incorporated herein are superseded.',style: 'title'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";

			headertable1 += "{text: '27. It is agreed that the aggregate liability of ELEV8R, whether under law or contract (Including for third party claims) shall be limited to 25% of the Contract Value).',style: 'title'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: '28. If for reasons not attributable to ELEV8R, workmen have to be moved out of your site, in such cases you will have to pay the additional cost involved in re-deployment of the work force as & when demanded by ELEV8R.',style: 'title'},";

			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: '29. You shall exclusively be responsible for procuring permits/licenses from Statutory/Regulatory Authorities, including but not limited to Lift Inspectorate/ PWD Office and pay all necessary fees for such licenses/ permits and inspection fees. ELEV8R may however at your request provide necessary support towards technical documentation and respond to and clarify technical queries as may be raised by the statutory authorities.',style: 'title'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: '" + "Sneha Elevators LLP" + "', style: 'subheader'},";
			headertable1 += "{columns: [{text:'Receiver Signature:-" + " " + "', style: 'subheader'},{text:'Authorized Signatory:-" + " " + "', style: 'subheaderone'}]},";

			headertable1 += "]," +
				"footer: function (currentPage, pageCount) {" +
				"return {" +
				"style: 'Footer'," +
				"table: {" +
				"widths: ['*', 5]," +
				"body: [" +
				"[" +
				"{ text: 'Page ' + currentPage.toString() + ' of ' + pageCount, alignment: 'center', style: 'normalText' }" +
				"]," +
				"]" +
				"}," +
				// "layout: 'noBorders'" +
				"};" +
				"}," +
				"styles: {" +

				"todatecss: {" +
				"fontSize:9," +
				"bold: true," +
				"alignment:'right'" +
				"}," +

				"header: {" +
				"fontSize:8," +
				"bold: true," +
				"border: [false, true, false, false]," +
				"fillColor: '#eeeeee'," +
				"alignment: 'center'," +
				"margin: [0, 5, 0, 0]," +
				"}," +

				"title: {" +
				"fontSize:10," +
				"alignment: 'left'," +
				"}," +

				"titleboldheader: {" +
				"fontSize:11," +
				"bold: true," +
				"alignment: 'left'," +
				"}," +

				"titlebold: {" +
				"fontSize:9," +
				"bold: true," +
				"alignment: 'left'," +
				"}," +

				"titlewithbold: {" +
				"fontSize:10," +
				"bold: true," +
				"alignment: 'left'," +
				"}," +

				"titleincenter: {" +
				"fontSize:11," +
				"bold: true," +
				"alignment: 'center'," +
				"}," +

				"headertitleincenter: {" +
				"fontSize:12," +
				"bold: true," +
				"alignment: 'center'," +
				"}," +

				"titleheader: {" +
				"fontSize:16," +
				"bold: true," +
				"border: [false, true, false, false]," +
				"fillColor: '#eeeeee'," +
				"alignment: 'center'," +
				"margin: [0, 5, 0, 0]," +
				"}," +

				"Footer: {" +
				"fontSize: 7," +
				"margin: [19, 5, 5, 5]," +
				"}," +

				"subheader: {" +
				"fontSize:9," +
				"bold: true," +
				"margin: [0, 5, 0, 0]," +
				"}," +

				"tablecontent: {" +
				"fontSize:10," +
				"margin: [0, 5, 0, 0]," +
				"}," +

				"subheaderone: {" +
				"fontSize:9," +
				"bold: true," +
				"alignment:'right'," +
				"margin: [0, 05, 0, 4]," +
				"}," +

				"subheaderbold: {" +
				"fontSize:9," +
				"bold: true," +
				"alignment:'right'," +
				"margin: [0, 04, 0, 4]," +
				"}," +

				"subheaderleft: {" +
				"fontSize:9," +
				"bold: true," +
				"alignment:'left'," +
				"margin: [0, 05, 0, 4]," +
				"}," +

				"amtinwords: {" +
				"fontSize:12," +
				"bold: true," +
				"alignment:'left'," +
				"margin: [0,180, 0,0]," +
				"}," +

				"subheadercost: {" +
				"fontSize:12," +
				"bold: true," +
				"alignment:'right'," +
				"margin: [0,200, 0, 0]," +
				"}," +

				"subheaderremark4: {" +
				"fontSize:12," +
				"bold: true," +
				"alignment:'left'," +
				"margin: [0,200, 0, 0]," +
				"}," +

				"subheaderremark: {" +
				"fontSize:12," +
				"bold: true," +
				"alignment:'left'," +
				"margin: [0,200, 0, 0]," +
				"}," +

				"subheadercost1: {" +
				"fontSize:12," +
				"bold: true," +
				"alignment:'right'," +
				"margin: [0,15, 0, 0]," +
				"}," +

				"subheaderremark1: {" +
				"fontSize:12," +
				"bold: true," +
				"alignment:'left'," +
				"margin: [0,15, 0, 0]," +
				"}," +

				"tableExample: {" +
				"margin: [0, 50, 0, 0]," +
				"fontSize: 8," +
				"}," +

				"tableExample2: {" +
				"margin: [0, 15, 0, 0]," +
				"fontSize: 8," +
				"}," +

				"tableExample4: {" +
				"margin: [0, 15, 0, 0]," +
				"fontSize: 10," +
				"}," +

				"tableExample3: {" +
				"margin: [0, 15, 0, 350]," +
				"fontSize: 8," +
				"}," +


				"tableHeader: {" +
				"bold: true," +
				"fontSize: 8," +
				"color: 'black'," +
				"}," +
				"}," +

				"defaultStyle: {" +
				"fontSize: 8" +
				"}" +
				"};" +
				"pdfMake.createPdf(docDefinition).download('Quotation.pdf');" +
				"} });";
			headertable1 += "</script></html>";
			fullHtml += headertable1;
			var wind = window.open();
			wind.document.write(fullHtml);
			console.log("fullHtml", fullHtml);

			setTimeout(function () {
				wind.close();
			}, 3000);
		},

	});

}, true);
