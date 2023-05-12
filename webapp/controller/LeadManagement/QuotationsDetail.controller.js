sap.ui.define([
	"sap/ui/model/json/JSONModel",
	'sap/ui/elev8rerp/componentcontainer/controller/BaseController',
	'sap/ui/model/Sorter',
	'sap/ui/elev8rerp/componentcontainer/services/LeadManagement/Lead.service',
	'sap/ui/elev8rerp/componentcontainer/services/LeadManagement/Quotation.service',
	'sap/m/MessageBox',
	'sap/m/MessageToast',
	'sap/ui/elev8rerp/componentcontainer/controller/Common/Common.function',
], function (JSONModel, BaseController, Sorter, leadService, quotationService, MessageBox,MessageToast,commonFunction) {
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
						console.log("quotationModel",quotationModel);

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
			console.log("---------viewModel-----------",viewModel);
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
			var quoteModel = this.getView().getModel("quoteModel");
			console.log("------------quoteModel------------",quoteModel);

			var array=[];

			// array.push({
			// 	TYPE: "RM Series",
			// 	CAPACITY: "6 Passenger",
			// 	SPEED: "0.63 M/s",
			// });


			array.push({
				name: "TYPE",
				value: "RM Series"
			},{
				name: "CAPACITY",
				value: "6 Passenger"
			},{
				name: "SPEED",
				value: "0.63 M/s",
			},
			{
				name: "RISE (M) (Approximately)",
				value: "19 mts",
			},
			{
				name: "STOPS",
				value: "7 Landings / 7 Openings (All Openings are same Side)",
			},
			{
				name: "CONTROLLER",
				value: "Sneha Integrated Controller",
			},
			{
				name: "DRIVE",
				value: "VVVF Drive",
			},
			{
				name: "SHAFT SIZE",
				value: "1700mm (W) x 1600mm (D) (Without Plastering)",
			},
			{
				name: "CAR SIZE",
				value: "1000mm (W) x 1100mm (D) x 2100mm (H) (Approximately)",
			},
			{
				name: "CLEAR OPENING",
				value: "700mm Open x 2000mm Height",
			},
			{
				name: "PIT DEPTH",
				value: "1400mm",
			},
			{
				name: "OVER HEAD",
				value: "4200mm",
			},

			{
				name: "CAR PANEL",
				value: "S.S Car Panel",
			},
			{
				name: "CAR DOOR",
				value: "S.S Center Opening Auto Power Doors",
			},
			{
				name: "LANDING DOOR",
				value: "S.S Center Opening Auto Power Doors",
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
				value: "Sneha Standard Geared Motor",
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
			headertable1 += "{text: '" +  "Contact No. 8886002959" + "', style: 'subheader'},";
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
			headertable1 += "{text: '" +  "Contact No. 7337331523" + "', style: 'subheader'},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: '" +  "Sneha Elevators LLP" + "', style: 'subheader'},";
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
			headertable1 += "[ { columns: [ ['M/s. Padmavati Construction','Masjid Banda,','Hyderabad - 500084','Contact No. 8886002959'] ] },{ columns: [ ['Neg No: ELE/HYD/MAR/PRS/NE001','Date: 04/03/2023','Date: MODEL CODE: MR'] ] }],";

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
				headertable1 += "[ {text: '" + array[i].name + "', style: 'tableHeader'},{text: '" + " " + "', style: 'tableHeader'},{text: '" + array[i].value + "', style: 'tableHeader'},],";
			}

			headertable1 += "]";
            headertable1 += "}";
            headertable1 += "},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{columns: [{text:'" + " " + "', style: 'subheader'},{text:'" + " " + "', style: 'subheaderone'}]},";
			headertable1 += "{text: '" +  "Sneha Elevators LLP" + "', style: 'subheader'},";
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

				"titlewithbold: {" +
                "fontSize:10," +
				"bold: true," +
                "alignment: 'left'," +
                "}," +

				"titleincenter: {" +
                "fontSize:10," +
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

                "subheaderone: {" +
                "fontSize:9," +
                "bold: true," +
                "alignment:'right'," +
                "margin: [0, 05, 0, 4]," +
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
                "pdfMake.createPdf(docDefinition).download('Purchase_Order.pdf');" +
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
