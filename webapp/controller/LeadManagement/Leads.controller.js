sap.ui.define([
	"sap/ui/model/json/JSONModel",
	'sap/ui/elev8rerp/componentcontainer/controller/BaseController',
	'sap/ui/model/Sorter',
	'sap/ui/elev8rerp/componentcontainer/services/LeadManagement/Lead.service',
	//'sap/ui/elev8rerp/componentcontainer/controller/Common/Common.function',
	//'sap/ui/elev8rerp/componentcontainer/services/Common.service',
	'sap/ui/elev8rerp/componentcontainer/utility/xlsx',
	'sap/m/MessageToast'
], function (JSONModel, BaseController, Sorter,Lead, xlsx,MessageToast) {

    //function (JSONModel, BaseController, Sorter, partyService, commonFunction, commonService, xlsx,MessageToast) {
	"use strict";

	return BaseController.extend("sap.ui.elev8rerp.componentcontainer.controller.LeadManagement.Leads", {

		onInit: function () {

			this.bus = sap.ui.getCore().getEventBus();
			this.bus.subscribe("partymaster", "setDetailPage", this.setDetailPage, this);
			this.bus.subscribe("loaddata", "loadData", this.loadData, this);
			this.oFlexibleColumnLayout = this.byId("fclPartyMaster");

			this.handleRouteMatched(null);

			var model = new JSONModel();
			var emptyModel = this.getModelDefault();
			model.setData(emptyModel);
			this.getView().setModel(model, "partyModel");
			//commonFunction.getReference("PrtRole", "roleForPaymentModel", this);

			var model = new JSONModel();
			model.setData(emptyModel);
			this.getView().setModel(model, "subledgerModel");



		//	var currRouteName = this.getOwnerComponent().getModel("applicationModel").getProperty("/routeName");
		//	this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		//    this._oRouter.getRoute(currRouteName).attachMatched(this.handleRouteMatched, this);
			jQuery.sap.delayedCall(1000, this, function () {
				this.getView().byId("onSearchId").focus();
			});
			this.fnShortCut();
		},

		getModelDefault: function () {
			return {

			}
		},

		fnShortCut: function () {
			var currentContext = this;
			$(document).keydown(function (evt) {
				if (evt.keyCode == 79 && evt.ctrlKey) {
					jQuery(document).ready(function ($) {
						evt.preventDefault();
						currentContext.onAddNew()

					})
				}
			});
		},

		handleRouteMatched: function (evt) {
			this.getView().byId("btnUploadData").setVisible(false);
			this.loadData();
		},

		setDetailPage: function (channel, event, data) {
			this.detailView = sap.ui.view({
				viewName: "sap.ui.elev8rerp.componentcontainer.view.LeadManagement." + data.viewName,
				type: "XML"
			});

			this.detailView.setModel(data.viewModel, "viewModel");
			this.oFlexibleColumnLayout.removeAllMidColumnPages();
			this.oFlexibleColumnLayout.addMidColumnPage(this.detailView);
			this.oFlexibleColumnLayout.setLayout(sap.f.LayoutType.TwoColumnsBeginExpanded);
		},

		onListItemPress: function (oEvent) {
			var viewModel = oEvent.getSource().getBindingContext("LeadsMasterModel");
			var model = { "id": viewModel.getProperty("id") }
			this.bus = sap.ui.getCore().getEventBus();
			this.bus.publish("partymaster", "setDetailPage", { viewName: "LeadsDetail", viewModel: model });
		},

		onAddNew: function (oEvent) {
			this.bus = sap.ui.getCore().getEventBus();
			this.bus.publish("partymaster", "setDetailPage", { viewName: "LeadsDetail" });
		},

		onSearch: function (oEvent) {
			var oTableSearchState = [],
				sQuery = oEvent.getParameter("query");
			var contains = sap.ui.model.FilterOperator.Contains;
			var columns = ['partyname', 'partyroles', 'emailid', 'mobileno', 'contactperson'];
			var filters = new sap.ui.model.Filter(columns.map(function (colName) {
				return new sap.ui.model.Filter(colName, contains, sQuery);
			}),
				false);

			if (sQuery && sQuery.length > 0) {
				oTableSearchState = [filters];
			}

			this.getView().byId("tblPartyMaster").getBinding("items").filter(oTableSearchState, "Application");
		},

		onSort: function (oEvent) {
			this._bDescendingSort = !this._bDescendingSort;
			var oView = this.getView(),
				oTable = oView.byId("tblPartyMaster"),
				oBinding = oTable.getBinding("items"),
				oSorter = new Sorter("partyname", this._bDescendingSort);
			oBinding.sort(oSorter);
		},

		loadData: function () {
			var currentContext = this;
			Lead.getAllLeads(function (data) {
				var oModel = new sap.ui.model.json.JSONModel();
				oModel.setData({ modelData: data[0] });
				currentContext.getView().setModel(oModel, "LeadsMasterModel");
                console.log("LeadsMasterModel",oModel);
			});
		},

		// roleSelect: function () {
		// 	var roleid = this.getView().byId("roletype").getSelectedItem().mProperties.key;
		// 	var currentContext = this;

		// 	if (roleid == 31) {
		// 		commonService.getRolewiseParties({ roleid: 31 }, function (data) {

		// 			var rolewisePartyListModel = new sap.ui.model.json.JSONModel();
		// 			var partyModel = [];
		// 			for (var i = 0; i < data[0].length; i++) {
		// 				partyModel.push({
		// 					supplierledgerid: data[0][i].supplierledgerid,
		// 					contactperson: data[0][i].contactperson,
		// 					emailid: data[0][i].emailid,
		// 					partycode: data[0][i].partycode,
		// 					partygroupname: data[0][i].partygroupname,
		// 					partyroles: data[0][i].partyroles,
		// 					phoneno: data[0][i].phoneno,
		// 					id: data[0][i].id,
		// 					partyname: data[0][i].partyname
		// 				})
		// 				if (i == data[0].length - 1) {

		// 					rolewisePartyListModel.setData({ modelData: partyModel });
		// 					currentContext.getView().setModel(rolewisePartyListModel, "LeadsMasterModel");

		// 				}
		// 			}

		// 		});
		// 	} else if (roleid == 32) {
		// 		// get all customers
		// 		commonService.getRolewiseParties({ roleid: 32 }, function (data) {

		// 			var rolewisePartyListModel = new sap.ui.model.json.JSONModel();
		// 			var partyModel = [];
		// 			for (var i = 0; i < data[0].length; i++) {
		// 				partyModel.push({
		// 					customerledgerid: data[0][i].customerledgerid,
		// 					contactperson: data[0][i].contactperson,
		// 					emailid: data[0][i].emailid,
		// 					partycode: data[0][i].partycode,
		// 					partygroupname: data[0][i].partygroupname,
		// 					partyroles: data[0][i].partyroles,
		// 					phoneno: data[0][i].phoneno,
		// 					id: data[0][i].id,
		// 					partyname: data[0][i].partyname
		// 				})
		// 				if (i == data[0].length - 1) {
		// 					rolewisePartyListModel.setData({ modelData: partyModel });

		// 					currentContext.getView().setModel(rolewisePartyListModel, "LeadsMasterModel");

		// 				}
		// 			}
		// 			rolewisePartyListModel.setData({ modelData: partyModel });
		// 			currentContext.getView().setModel(rolewisePartyListModel, "partyModel");


		// 		});
		// 	} else if (roleid == 34) {
		// 		// get all Farmers
		// 		commonService.getRolewiseParties({ roleid: 34 }, function (data) {

		// 			var rolewisePartyListModel = new sap.ui.model.json.JSONModel();
		// 			var partyModel = [];
		// 			for (var i = 0; i < data[0].length; i++) {
		// 				partyModel.push({
		// 					customerledgerid: data[0][i].customerledgerid,
		// 					contactperson: data[0][i].contactperson,
		// 					emailid: data[0][i].emailid,
		// 					partycode: data[0][i].partycode,
		// 					partygroupname: data[0][i].partygroupname,
		// 					partyroles: data[0][i].partyroles,
		// 					phoneno: data[0][i].phoneno,
		// 					id: data[0][i].id,
		// 					partyname: data[0][i].partyname
		// 				})
		// 				if (i == data[0].length - 1) {
		// 					rolewisePartyListModel.setData({ modelData: partyModel });

		// 					currentContext.getView().setModel(rolewisePartyListModel, "LeadsMasterModel");

		// 				}
		// 			}
		// 			rolewisePartyListModel.setData({ modelData: partyModel });
		// 			currentContext.getView().setModel(rolewisePartyListModel, "partyModel");

		// 		});
		// 	}
		// },



		onExit: function () {
			this.bus.unsubscribe("settermaster", "setDetailPage", this.setDetailPage, this);
		},

		// create export function for party in xlsx format
		onDataExport: function () {
			var ReportTitle = "Party Detail";
			// get model for ledger list
			var JSONData = this.getView().getModel("LeadsMasterModel").oData.modelData;
			var aData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
			if (aData.length) {
				var aFinalXlsxData,
					aXlsxHeaderData;

				// Array variable to store header data in XLSX file
				aXlsxHeaderData = [];
				aFinalXlsxData = [];

				// Below array for  header data
				aXlsxHeaderData.push("Party Id", "Party Group", "Party Role id", "Party Code", "Party Name", "Party Role", "Phone", "Email", "Customer Ledger", "Customer Ledger Id", "Supplier Ledger", "Supplier Ledger Id")

				// Adding column header data in final XLSX data
				aFinalXlsxData.push(aXlsxHeaderData);

				// Below loop to extract data
				for (var i = 0; i < aData.length; i++) {
					// Array variable to store content data in XLSX file
					var aXlsxContentData = [];
					aXlsxContentData.push(aData[i].id, aData[i].partygroupname, aData[i].partyroleids, aData[i].partycode, aData[i].partyname, aData[i].partyroles, aData[i].phoneno, aData[i].emailid, aData[i].customerledgerid, aData[i].customerledgername, aData[i].supplierledgername, aData[i].supplierledgerid);

					// Adding content data in final XLSX data
					aFinalXlsxData.push(aXlsxContentData);
				}

				var Workbook = function Workbook() {
					if (!(this instanceof Workbook)) return new Workbook();
					this.SheetNames = [];
					this.Sheets = {};
				}
				var wb = Workbook();
				wb.SheetNames.push(ReportTitle);

				var sheet_from_array_of_arrays = function sheet_from_array_of_arrays(data, opts) {
					var ws = {};
					var range = { s: { c: 10000000, r: 10000000 }, e: { c: 0, r: 0 } };
					for (var R = 0; R != data.length; ++R) {
						for (var C = 0; C != data[R].length; ++C) {
							if (range.s.r > R) range.s.r = R;
							if (range.s.c > C) range.s.c = C;
							if (range.e.r < R) range.e.r = R;
							if (range.e.c < C) range.e.c = C;
							var cell = { v: data[R][C] };
							if (cell.v == null) continue;
							var cell_ref = XLSX.utils.encode_cell({ c: C, r: R });

							if (typeof cell.v === 'number') cell.t = 'n';
							else if (typeof cell.v === 'boolean') cell.t = 'b';
							else if (cell.v instanceof Date) {
								cell.t = 'n'; cell.z = XLSX.SSF._table[14];
								cell.v = datenum(cell.v);
							}
							else cell.t = 's';

							ws[cell_ref] = cell;
						}
					}
					if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
					return ws;
				}

				var ws = sheet_from_array_of_arrays(aFinalXlsxData);

				// Setting up Excel column width
				ws['!cols'] = [
					{ wch: 14 },
					{ wch: 12 }
				];
				wb.Sheets[ReportTitle] = ws;        // wb.Sheets[ReportTitle] -> To set sheet name

				var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
				var s2ab = function s2ab(s) {
					var buf = new ArrayBuffer(s.length);
					var view = new Uint8Array(buf);
					for (var i = 0; i != s.length; ++i) {
						view[i] = s.charCodeAt(i) & 0xFF;
					}
					return buf;
				};
				saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), ReportTitle + ".xlsx");
			}
		},
		
		// for party opening sheet in xml format
		onDownloadTemplate: function () {
			var ReportTitle = "partyopeningbalance";
			// get model for ledger list
			var JSONData = this.getView().getModel("LeadsMasterModel").oData.modelData;
			var aData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
			if (aData.length) {
				var aFinalXlsxData,
					aXlsxHeaderData;

				// Array variable to store header data in XLSX file
				aXlsxHeaderData = [];
				aFinalXlsxData = [];
				var des_aFinalXlsxData = [];
				// Below array for  header data
				aXlsxHeaderData.push("acledgerid", "subledgerid", "subledgertypeids", "partyname", "openingbalance", "transactiontypeid", "postingdate","branchid")
				// des_aXlsxHeaderData.push("Column Name","Description");
				des_aFinalXlsxData.push(["Column Name", "Description"], ["subledgerid", "Identification Number of Party ID"], ["subledgertypeids", "Identification Number of Party Type ID"], ["", "31 - Supplier, 32 - Customer"], ["openingbalance", "Amount"], ["transactiontypeid", "1321 - Credit, 1322 - Debit"], ["postingdate", "Date"], ["partyname", "partyname"]);

				console.log(aXlsxHeaderData)
				// Adding column header data in final XLSX data
				aFinalXlsxData.push(aXlsxHeaderData);

				// Below loop to extract data
				for (var i = 0; i < aData.length; i++) {
					// Array variable to store content data in XLSX file
					var aXlsxContentData = [];
					var acledgerid = '';
					if (aData[i].customerledgerid != null) {
						acledgerid = aData[i].customerledgerid
					} else {
						acledgerid = aData[i].supplierledgerid
					} 
					aXlsxContentData.push(acledgerid, aData[i].id,aData[i].partyroleids, aData[i].partyname);

					// Adding content data in final XLSX data
					aFinalXlsxData.push(aXlsxContentData);
				}

				var Workbook = function Workbook() {
					if (!(this instanceof Workbook)) return new Workbook();
					this.SheetNames = [];
					this.Sheets = {};
				}
				var wb = Workbook();
				wb.SheetNames.push("Party Opening Description");
				wb.SheetNames.push(ReportTitle);


				var sheet_from_array_of_arrays = function sheet_from_array_of_arrays(data, opts) {
					var ws = {};
					var range = { s: { c: 10000000, r: 10000000 }, e: { c: 0, r: 0 } };
					for (var R = 0; R != data.length; ++R) {
						for (var C = 0; C != data[R].length; ++C) {
							if (range.s.r > R) range.s.r = R;
							if (range.s.c > C) range.s.c = C;
							if (range.e.r < R) range.e.r = R;
							if (range.e.c < C) range.e.c = C;
							var cell = { v: data[R][C] };
							if (cell.v == null) continue;
							var cell_ref = XLSX.utils.encode_cell({ c: C, r: R });

							if (typeof cell.v === 'number') cell.t = 'n';
							else if (typeof cell.v === 'boolean') cell.t = 'b';
							else if (cell.v instanceof Date) {
								cell.t = 'n'; cell.z = XLSX.SSF._table[14];
								cell.v = datenum(cell.v);
							}
							else cell.t = 's';

							ws[cell_ref] = cell;
						}
					}
					if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
					return ws;
				}
				for (var i = 0; wb.SheetNames.length > i; i++) {
					var ReportTitle1 = wb.SheetNames[i];
					if (wb.SheetNames[i] == 'Party Opening Description') {
						var detaildata = des_aFinalXlsxData;

					} else {
						var detaildata = aFinalXlsxData;
					}
					var ws = sheet_from_array_of_arrays(detaildata);

					// Setting up Excel column width
					ws['!cols'] = [
						{ wch: 14 },
						{ wch: 12 }
					];
					wb.Sheets[ReportTitle1] = ws;        // wb.Sheets[ReportTitle] -> To set sheet name

					var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
					var s2ab = function s2ab(s) {
						var buf = new ArrayBuffer(s.length);
						var view = new Uint8Array(buf);
						for (var i = 0; i != s.length; ++i) {
							view[i] = s.charCodeAt(i) & 0xFF;
						}
						return buf;
					};
				}
				saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), ReportTitle + ".xlsx");

				// } 
			}
		},

		onpartyTemplate:function(){
			var ReportTitle = "party";
		
				var aFinalXlsxData,
					aXlsxHeaderData;

				// Array variable to store header data in XLSX file
				aXlsxHeaderData = [];
				aFinalXlsxData = [];
				var des_aFinalXlsxData = [];
				// Below array for  header data
				aXlsxHeaderData.push("partyname", "partyroleids", "phoneno", "contactperson", "cstno","gstin","panno", "postalcode", "emailid","shippingcontactperson","shippingcontactno","creditlimit","creditperiod","servicetaxno","partygroupid","partycode","tdsid","moduleid","bankname","accounttype","bankbranch","ifsccode","accountno")
				// des_aXlsxHeaderData.push("Column Name","Description");
				des_aFinalXlsxData.push(["Column Name", "Description"], ["partyname", "Name of the party"], ["moduleid", "Identification Number of Party role ID"], ["", "721 - Breeder, 722 - Hatchery","723 - CBF","724 - Processing","725 - Commercial Laye","726-Feedmill","727-Purchase","728-Sales","729-Accounts"], ["partyroleids", "Identification Number of  module ID"],["", "31 - Supplier, 32 - Customer","33 - Agent","34 - Farmer" ],["Branch id","get branch id from branch master"],["Party Group", "get party group id from branch master"],["Tds_id", "get from tds master"]);

				console.log(aXlsxHeaderData)
				// Adding column header data in final XLSX data
				aFinalXlsxData.push(aXlsxHeaderData);

				
				var Workbook = function Workbook() {
					if (!(this instanceof Workbook)) return new Workbook();
					this.SheetNames = [];
					this.Sheets = {};
				}
				var wb = Workbook();
				wb.SheetNames.push("Party Description");
				wb.SheetNames.push(ReportTitle);


				var sheet_from_array_of_arrays = function sheet_from_array_of_arrays(data, opts) {
					var ws = {};
					var range = { s: { c: 10000000, r: 10000000 }, e: { c: 0, r: 0 } };
					for (var R = 0; R != data.length; ++R) {
						for (var C = 0; C != data[R].length; ++C) {
							if (range.s.r > R) range.s.r = R;
							if (range.s.c > C) range.s.c = C;
							if (range.e.r < R) range.e.r = R;
							if (range.e.c < C) range.e.c = C;
							var cell = { v: data[R][C] };
							if (cell.v == null) continue;
							var cell_ref = XLSX.utils.encode_cell({ c: C, r: R });

							if (typeof cell.v === 'number') cell.t = 'n';
							else if (typeof cell.v === 'boolean') cell.t = 'b';
							else if (cell.v instanceof Date) {
								cell.t = 'n'; cell.z = XLSX.SSF._table[14];
								cell.v = datenum(cell.v);
							}
							else cell.t = 's';

							ws[cell_ref] = cell;
						}
					}
					if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
					return ws;
				}
				for (var i = 0; wb.SheetNames.length > i; i++) {
					var ReportTitle1 = wb.SheetNames[i];
					if (wb.SheetNames[i] == 'Party Description') {
						var detaildata = des_aFinalXlsxData;

					} else {
						var detaildata = aFinalXlsxData;
					}
					var ws = sheet_from_array_of_arrays(detaildata);

					// Setting up Excel column width
					ws['!cols'] = [
						{ wch: 14 },
						{ wch: 12 }
					];
					wb.Sheets[ReportTitle1] = ws;        // wb.Sheets[ReportTitle] -> To set sheet name

					var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
					var s2ab = function s2ab(s) {
						var buf = new ArrayBuffer(s.length);
						var view = new Uint8Array(buf);
						for (var i = 0; i != s.length; ++i) {
							view[i] = s.charCodeAt(i) & 0xFF;
						}
						return buf;
					};
				}
				saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), ReportTitle + ".xlsx");

				// } 
			
		},
		//upload xm
		handleExcelUpload: function (e) {
			var currentContext = this;
			var fileInput = this.getView().byId("fileUploader").getValue();
			var allowedExtensions = /(\.xlsx)$/i;

			if (allowedExtensions.exec(fileInput)) {
				// Excluded ExcelSheets from Showing and importing data
				var excludedSheets = ["foryourreference", "fyr", "for your reference"];


				// Remove previous error messages
				var pnlError = currentContext.getView().byId("pnlErrMessage");
				pnlError.setVisible(false);
				pnlError.removeAllItems();
				// Add Tabs using tabname
				var oHBox = currentContext.getView().byId("pnlDataTabs");
				oHBox.setVisible(true);
				oHBox.destroyItems();

				var file = e.getParameter("files") && e.getParameter("files")[0];
				// if (file.type == "xlsx") {
				// Upload button visible
				currentContext.getView().byId("btnUploadData").setVisible(true);
				if (file && window.FileReader) {
					var reader = new FileReader();
					//that = this;
					var result = {};
					//var data;
					reader.onload = function (evt) {
						var data = evt.target.result;
						//var xlsx = XLSX.read(data, {type: 'binary'});
						var arr = String.fromCharCode.apply(null, new Uint8Array(data));
						var xlsx = XLSX.read(btoa(arr), { type: 'base64', cellDates: true, dateNF: 'yyyy/mm/dd;@' });
						result = xlsx.Strings;
						result = {};
						var arrSheets = [];
						var sheetname = "";
						xlsx.SheetNames.forEach(function (sheetName) {
							sheetname = sheetName
							if (sheetName == "partyopeningbalance" || sheetName == "party" || sheetName == "partyaddress") {
								var rObjArr = XLSX.utils.sheet_to_row_object_array(xlsx.Sheets[sheetName]);
								if (excludedSheets.indexOf(sheetName.toLowerCase()) < 0) {
									result[sheetName] = rObjArr;
									arrSheets.push(rObjArr);
									
								}
							}
						});
						console.log(result);
						if (sheetname == "partyopeningbalance"){
						// check validation for upload sheet
						for (var i = 0; result.partyopeningbalance.length > i; i++) {
							var parray = result.partyopeningbalance[i];
							result.partyopeningbalance[i].subledgertypeids == parseInt(parray.subledgertypeids);
							parray.subledgertypeids = parseInt(parray.subledgertypeids);

							if (typeof (parray.acledgerid) == "number" && typeof (parray.subledgerid) == "number" && typeof (parray.subledgertypeids) == "number" && typeof (parray.openingbalance) == "number" && typeof ((parray.transactiontypeid)) == "number" && typeof new Date(parray.postingdate) == "object" && (((parray.transactiontypeid) == 1321) || ((parray.transactiontypeid) == 1322))) {
							} else {
								if (typeof ((parray.acledgerid)) != "number") {
									result.partyopeningbalance[i].acledgerid = "Invalid Ledger Id"
								} else if (typeof ((parray.subledgerid)) != "number") {
									result.partyopeningbalance[i].subledgerid = "Invalid Sub Ledger Id"
								} else if (typeof ((parray.subledgertypeids)) != "number") {
									result.partyopeningbalance[i].subledgertypeids = "Invalid Sub Ledger Type Id"
								} else if (typeof ((parray.openingbalance)) != "number") {
									result.partyopeningbalance[i].openingbalance = "Invalid Opening Balance"
								} else if (typeof ((parray.transactiontypeid)) != "number") {
									result.partyopeningbalance[i].transactiontypeid = "Invalid Transaction Type ID"
								} else if (typeof (new Date(parray.postingdate)) != "object") {
									result.partyopeningbalance[i].postingdate = "Invalid Date"
								}
								else if ((((parray.transactiontypeid) != 1321) && ((parray.transactiontypeid) != 1322))) {
									result.partyopeningbalance[i].transactiontypeid = "Please insert valid transaction type id for CR-111 and DR-112"
								}
								MessageToast.show("Please insert valid sheet.");
								currentContext.getView().byId("btnUploadData").setVisible(false);
							}
						}
					}

					if (sheetname == "party"){
						// check validation for upload sheet
						for (var i = 0; result.party.length > i; i++) {
							var party = result.party[i];

							if ( (party.partyroleids) == 32 && (party.tdsid) != null && (party.tdsid) != undefined ) {
							} else {
						
								MessageToast.show("Please insert valid sheet.");
								currentContext.getView().byId("btnUploadData").setVisible(true);
							}
							currentContext.getView().byId("btnUploadData").setVisible(true);
						}
					}
					// if (sheetname == "partyaddress"){
					// 	// check validation for upload sheet
					// 	for (var i = 0; result.party.length > i; i++) {
					// 		var party = result.party[i];

						
					// 	}
					// }
						if (result != null) {
							var oModel = new JSONModel();
							oModel.setData({ modelData: result });
							oModel.setSizeLimit(result.length);
							currentContext.getView().setModel(oModel, "xlsxDocModel");
							var tabName = [];
							for (var key in result) {
								tabName.push(key);
							}
							if (tabName.length > 0) {
								currentContext.previewMeterSlab();
							}

						}
						return result;
						//that.b64toBlob(xlsx, "binary");
					};
					reader.readAsArrayBuffer(file);
				};
			} else {
				MessageToast.show("In-correct file format!");
				currentContext.getView().byId("btnUploadData").setVisible(false);
				currentContext.getView().byId("fileUploader").setValue("");

			}
		},

		// fill the data in uploded sheet
		fillSheetData: function (name, currentContext) {
			var oData = currentContext.getView().getModel("xlsxDocModel").oData.modelData;
			// Upload button visible
			if (oData[name].length > 0)
				// currentContext.getView().byId("btnUploadData").setVisible(true);

				var dt1 = oData[name][0];
			var aColumnData = [];

			// Create table columns
			for (var key in dt1) {
				aColumnData.push({ columnName: key });
			}

			// Create Table data model
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData({
				columns: aColumnData,
				rows: oData[name]
			});
			var oTable = new sap.ui.table.Table({
				visibleRowCount: 5,
				selectionMode: "None"
			});

			oTable.setModel(oModel);

			oTable.bindColumns("/columns", function (sId, oContext) {
				var columnName = oContext.getObject().columnName;
				return new sap.ui.table.Column({
					label: columnName,
					template: columnName,
				});
			});

			oTable.bindRows("/rows");

			// Add Table in HBox container
			var oHBox = currentContext.getView().byId("pnlMasterData");
			oHBox.destroyItems();
			oHBox.addItem(new sap.m.HBox());
			oHBox.addItem(oTable);
		},
		// preview for sheet
		previewMeterSlab: function () {
			// this.getView().byId("fileUploader").setValue("");
			var currentContext = this;
			var oHBox = currentContext.getView().byId("pnlMasterData");
			oHBox.destroyItems();

			// Remove previous error messages
			var pnlError = currentContext.getView().byId("pnlErrMessage");
			pnlError.setVisible(false);
			pnlError.removeAllItems();


			// Add Tabs using tabname
			var oHBox = currentContext.getView().byId("pnlDataTabs");
			oHBox.setVisible(false);
			oHBox.destroyItems();
			var result = this.getView().getModel("xlsxDocModel").oData.modelData;
			var tabName = [];
			for (var key in result) {
				tabName.push(key);
			}
			for (var i = 1; i <= tabName.length; i++) {
				var oTemplate = new sap.m.TabContainerItem({
					name: tabName[i - 1],
					content: []
				});
				oHBox.addItem(oTemplate);
			}
			oHBox.setVisible(true);
			oHBox.attachItemSelect(null, function (evt) {
				var tabtitle = evt.getParameter("item").getName();
				currentContext.fillSheetData(tabtitle, currentContext);
			}, null);

		},
		// for upload master data
		onUploadMasterData: function () {
			var currentContext = this;
			var oData = this.getView().getModel("xlsxDocModel").oData.modelData;
			// Remove previous errors messages and hide
			var pnlError = this.getView().byId("pnlErrMessage");
			pnlError.setVisible(false);
			pnlError.removeAllItems();
			pnlError.addItem(new sap.m.Label({ text: "ERROR :" }));
			for (var key in oData) {
				// No error in another tab data
				this.tabName = key.toLowerCase();
				var tabData = oData[key];


				var dt1 = tabData[0];
				var columns = [];

				// Column excluded by bracket headers by regular expression
				var regExp = /\[.*?\]/;      //--- same result -  /\[([^)]+)\]/;

				for (var t in dt1) {
					(regExp.test(t)) ? "" : columns.push(t);
				}

				var colNames = columns.join();
				var strQuery = "";

				this.tabName = this.tabName;
				//=========================================


			}

			var tblname = this.tabName;
			var arr = oData[this.tabName];
			var model = {
				jsondata: JSON.stringify(oData[this.tabName]),
				table: this.tabName
				// company_id:commonService.session("companyId"),
				// user_id:commonService.session("userId")
			}
			var array = [];

			var currentContext = this;
			// commonService.importMaster(model, function (data) {
			// 	setTimeout(function () {

			// 		var oModel = new JSONModel();
			// 		oModel.setData({ modelData: [] });
			// 		currentContext.getView().setModel(oModel, "xlsxDocModel");
			// 		currentContext.getView().byId("fileUploader").setValue("");
			// 		var oHBox = currentContext.getView().byId("pnlMasterData");
			// 		oHBox.destroyItems();
			// 		MessageToast.show(tblname + " - master data successfully imported!", {
			// 			animationTimingFunction: 'ease-in-out'
			// 		});
			// 		currentContext.loadData();

			// 	}, 400);
			// })

			// this.getView().byId("pnlMasterData2").setVisible(true);


		},
		// dowload countrys
		// onDownloadCountry : function(){
		// 	var currentContext = this;
		// 	commonService.getAllCountries(function (data) {
		// 		console.log("getAllCountries",data);
		// 		// var oModel = new sap.ui.model.json.JSONModel();
		// 		// oModel.setData({ modelData: data[0] });
			
		// 	var ReportTitle = "Country List";
		// 	// get model for ledger list
		// 	var JSONData = data[0]
		// 	var aData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
		// 	if (aData.length) {
		// 		var aFinalXlsxData,
		// 			aXlsxHeaderData;

		// 		// Array variable to store header data in XLSX file
		// 		aXlsxHeaderData = [];
		// 		aFinalXlsxData = [];

		// 		// Below array for  header data
		// 		aXlsxHeaderData.push("Id", "Country Name")

		// 		// Adding column header data in final XLSX data
		// 		aFinalXlsxData.push(aXlsxHeaderData);

		// 		// Below loop to extract data
		// 		for (var i = 0; i < aData.length; i++) {
		// 			// Array variable to store content data in XLSX file
		// 			var aXlsxContentData = [];
		// 			aXlsxContentData.push(aData[i].id, aData[i].countryname);

		// 			// Adding content data in final XLSX data
		// 			aFinalXlsxData.push(aXlsxContentData);
		// 		}

		// 		var Workbook = function Workbook() {
		// 			if (!(this instanceof Workbook)) return new Workbook();
		// 			this.SheetNames = [];
		// 			this.Sheets = {};
		// 		}
		// 		var wb = Workbook();
		// 		wb.SheetNames.push(ReportTitle);

		// 		var sheet_from_array_of_arrays = function sheet_from_array_of_arrays(data, opts) {
		// 			var ws = {};
		// 			var range = { s: { c: 10000000, r: 10000000 }, e: { c: 0, r: 0 } };
		// 			for (var R = 0; R != data.length; ++R) {
		// 				for (var C = 0; C != data[R].length; ++C) {
		// 					if (range.s.r > R) range.s.r = R;
		// 					if (range.s.c > C) range.s.c = C;
		// 					if (range.e.r < R) range.e.r = R;
		// 					if (range.e.c < C) range.e.c = C;
		// 					var cell = { v: data[R][C] };
		// 					if (cell.v == null) continue;
		// 					var cell_ref = XLSX.utils.encode_cell({ c: C, r: R });

		// 					if (typeof cell.v === 'number') cell.t = 'n';
		// 					else if (typeof cell.v === 'boolean') cell.t = 'b';
		// 					else if (cell.v instanceof Date) {
		// 						cell.t = 'n'; cell.z = XLSX.SSF._table[14];
		// 						cell.v = datenum(cell.v);
		// 					}
		// 					else cell.t = 's';

		// 					ws[cell_ref] = cell;
		// 				}
		// 			}
		// 			if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
		// 			return ws;
		// 		}

		// 		var ws = sheet_from_array_of_arrays(aFinalXlsxData);

		// 		// Setting up Excel column width
		// 		ws['!cols'] = [
		// 			{ wch: 14 },
		// 			{ wch: 12 }
		// 		];
		// 		wb.Sheets[ReportTitle] = ws;        // wb.Sheets[ReportTitle] -> To set sheet name

		// 		var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
		// 		var s2ab = function s2ab(s) {
		// 			var buf = new ArrayBuffer(s.length);
		// 			var view = new Uint8Array(buf);
		// 			for (var i = 0; i != s.length; ++i) {
		// 				view[i] = s.charCodeAt(i) & 0xFF;
		// 			}
		// 			return buf;
		// 		};
		// 		saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), ReportTitle + ".xlsx");
		// 	}
		// });
		// },


		// dowload states
		// onDownloadState : function(){

		// 	var currentContext = this;

		// 	commonService.getAllStates(function (data) {
		// 		console.log("getAllStates",data);
		// 		// var oModel = new sap.ui.model.json.JSONModel();
		// 		// oModel.setData({ modelData: data[0] });
			
		// 	var ReportTitle = "State List";
		// 	// get model for ledger list
		// 	var JSONData = data[0]
		// 	var aData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
		// 	if (aData.length) {
		// 		var aFinalXlsxData,
		// 			aXlsxHeaderData;

		// 		// Array variable to store header data in XLSX file
		// 		aXlsxHeaderData = [];
		// 		aFinalXlsxData = [];

		// 		// Below array for  header data
		// 		aXlsxHeaderData.push("Id","Country Id","State Name")

		// 		// Adding column header data in final XLSX data
		// 		aFinalXlsxData.push(aXlsxHeaderData);

		// 		// Below loop to extract data
		// 		for (var i = 0; i < aData.length; i++) {
		// 			// Array variable to store content data in XLSX file
		// 			var aXlsxContentData = [];
		// 			aXlsxContentData.push(aData[i].id,aData[i].countryid, aData[i].statename);

		// 			// Adding content data in final XLSX data
		// 			aFinalXlsxData.push(aXlsxContentData);
		// 		}

		// 		var Workbook = function Workbook() {
		// 			if (!(this instanceof Workbook)) return new Workbook();
		// 			this.SheetNames = [];
		// 			this.Sheets = {};
		// 		}
		// 		var wb = Workbook();
		// 		wb.SheetNames.push(ReportTitle);

		// 		var sheet_from_array_of_arrays = function sheet_from_array_of_arrays(data, opts) {
		// 			var ws = {};
		// 			var range = { s: { c: 10000000, r: 10000000 }, e: { c: 0, r: 0 } };
		// 			for (var R = 0; R != data.length; ++R) {
		// 				for (var C = 0; C != data[R].length; ++C) {
		// 					if (range.s.r > R) range.s.r = R;
		// 					if (range.s.c > C) range.s.c = C;
		// 					if (range.e.r < R) range.e.r = R;
		// 					if (range.e.c < C) range.e.c = C;
		// 					var cell = { v: data[R][C] };
		// 					if (cell.v == null) continue;
		// 					var cell_ref = XLSX.utils.encode_cell({ c: C, r: R });

		// 					if (typeof cell.v === 'number') cell.t = 'n';
		// 					else if (typeof cell.v === 'boolean') cell.t = 'b';
		// 					else if (cell.v instanceof Date) {
		// 						cell.t = 'n'; cell.z = XLSX.SSF._table[14];
		// 						cell.v = datenum(cell.v);
		// 					}
		// 					else cell.t = 's';

		// 					ws[cell_ref] = cell;
		// 				}
		// 			}
		// 			if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
		// 			return ws;
		// 		}

		// 		var ws = sheet_from_array_of_arrays(aFinalXlsxData);

		// 		// Setting up Excel column width
		// 		ws['!cols'] = [
		// 			{ wch: 14 },
		// 			{ wch: 12 }
		// 		];
		// 		wb.Sheets[ReportTitle] = ws;        // wb.Sheets[ReportTitle] -> To set sheet name

		// 		var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
		// 		var s2ab = function s2ab(s) {
		// 			var buf = new ArrayBuffer(s.length);
		// 			var view = new Uint8Array(buf);
		// 			for (var i = 0; i != s.length; ++i) {
		// 				view[i] = s.charCodeAt(i) & 0xFF;
		// 			}
		// 			return buf;
		// 		};
		// 		saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), ReportTitle + ".xlsx");
		// 	}
		// });
		// },
		// dowload city
		// onDownloadCity : function(){

		// 	var currentContext = this;

		// 	commonService.getAllCities(function (data) {
		// 		console.log("getAllCities",data);
		// 		// var oModel = new sap.ui.model.json.JSONModel();
		// 		// oModel.setData({ modelData: data[0] });
			
		// 	var ReportTitle = "City List";
		// 	// get model for ledger list
		// 	var JSONData = data[0]
		// 	var aData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
		// 	if (aData.length) {
		// 		var aFinalXlsxData,
		// 			aXlsxHeaderData;

		// 		// Array variable to store header data in XLSX file
		// 		aXlsxHeaderData = [];
		// 		aFinalXlsxData = [];

		// 		// Below array for  header data
		// 		aXlsxHeaderData.push("Id","State Id", "City Name")

		// 		// Adding column header data in final XLSX data
		// 		aFinalXlsxData.push(aXlsxHeaderData);

		// 		// Below loop to extract data
		// 		for (var i = 0; i < aData.length; i++) {
		// 			// Array variable to store content data in XLSX file
		// 			var aXlsxContentData = [];
		// 			aXlsxContentData.push(aData[i].id,aData[i].stateid, aData[i].cityname);

		// 			// Adding content data in final XLSX data
		// 			aFinalXlsxData.push(aXlsxContentData);
		// 		}

		// 		var Workbook = function Workbook() {
		// 			if (!(this instanceof Workbook)) return new Workbook();
		// 			this.SheetNames = [];
		// 			this.Sheets = {};
		// 		}
		// 		var wb = Workbook();
		// 		wb.SheetNames.push(ReportTitle);

		// 		var sheet_from_array_of_arrays = function sheet_from_array_of_arrays(data, opts) {
		// 			var ws = {};
		// 			var range = { s: { c: 10000000, r: 10000000 }, e: { c: 0, r: 0 } };
		// 			for (var R = 0; R != data.length; ++R) {
		// 				for (var C = 0; C != data[R].length; ++C) {
		// 					if (range.s.r > R) range.s.r = R;
		// 					if (range.s.c > C) range.s.c = C;
		// 					if (range.e.r < R) range.e.r = R;
		// 					if (range.e.c < C) range.e.c = C;
		// 					var cell = { v: data[R][C] };
		// 					if (cell.v == null) continue;
		// 					var cell_ref = XLSX.utils.encode_cell({ c: C, r: R });

		// 					if (typeof cell.v === 'number') cell.t = 'n';
		// 					else if (typeof cell.v === 'boolean') cell.t = 'b';
		// 					else if (cell.v instanceof Date) {
		// 						cell.t = 'n'; cell.z = XLSX.SSF._table[14];
		// 						cell.v = datenum(cell.v);
		// 					}
		// 					else cell.t = 's';

		// 					ws[cell_ref] = cell;
		// 				}
		// 			}
		// 			if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
		// 			return ws;
		// 		}

		// 		var ws = sheet_from_array_of_arrays(aFinalXlsxData);

		// 		// Setting up Excel column width
		// 		ws['!cols'] = [
		// 			{ wch: 14 },
		// 			{ wch: 12 }
		// 		];
		// 		wb.Sheets[ReportTitle] = ws;        // wb.Sheets[ReportTitle] -> To set sheet name

		// 		var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
		// 		var s2ab = function s2ab(s) {
		// 			var buf = new ArrayBuffer(s.length);
		// 			var view = new Uint8Array(buf);
		// 			for (var i = 0; i != s.length; ++i) {
		// 				view[i] = s.charCodeAt(i) & 0xFF;
		// 			}
		// 			return buf;
		// 		};
		// 		saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), ReportTitle + ".xlsx");
		// 	}
		// });
		// },

		onpartyAddressTemplate: function () {
			var ReportTitle = "partyaddress";
			// get model for ledger list
			var JSONData = this.getView().getModel("LeadsMasterModel").oData.modelData;
			var aData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
			if (aData.length) {
				var aFinalXlsxData,
					aXlsxHeaderData;

				// Array variable to store header data in XLSX file
				aXlsxHeaderData = [];
				aFinalXlsxData = [];
				var des_aFinalXlsxData = [];
				// Below array for  header data
				aXlsxHeaderData.push("partyid","partyname", "addresstypeid", "address", "cityid", "stateid","countryid","locationcontactno", "postalcode", "pincode","gstno","gsttypeid")
				// des_aXlsxHeaderData.push("Column Name","Description");
				des_aFinalXlsxData.push(["Column Name", "Description"], ["partyid", "Identification Number of Party ID"], ["addresstypeid", "Identification Number of address type"], ["", "1401 - Billing From,1402 - Billing To ,1403 -Delivery From,1404- Delivery To"], ["cityid", "Identification Number of city"], ["state id", "Identification Number of state"], ["locationcontactno", "Contact Number"], ["postalcode", "Pincode"],["gstno", "Gst Number"],["gsttypeid", "Identification Number of Gst type"],[" ", "1421-Casual Taxable Person,1422-Composition Levy,1423-Government Department or PSU,1424-Non Resident Taxable Person,1425-Regular/TDS/ISD,1426-UN Agency or Embassy,1427-None"]);

				console.log(aXlsxHeaderData)
				// Adding column header data in final XLSX data
				aFinalXlsxData.push(aXlsxHeaderData);

				// Below loop to extract data
				for (var i = 0; i < aData.length; i++) {
					// Array variable to store content data in XLSX file
					var aXlsxContentData = [];
					var acledgerid = '';
					if (aData[i].customerledgerid != null) {
						acledgerid = aData[i].customerledgerid
					} else {
						acledgerid = aData[i].supplierledgerid
					} 
					aXlsxContentData.push(aData[i].id,aData[i].partyname);

					// Adding content data in final XLSX data
					aFinalXlsxData.push(aXlsxContentData);
				}

				var Workbook = function Workbook() {
					if (!(this instanceof Workbook)) return new Workbook();
					this.SheetNames = [];
					this.Sheets = {};
				}
				var wb = Workbook();
				wb.SheetNames.push("Party Address Description");
				wb.SheetNames.push(ReportTitle);


				var sheet_from_array_of_arrays = function sheet_from_array_of_arrays(data, opts) {
					var ws = {};
					var range = { s: { c: 10000000, r: 10000000 }, e: { c: 0, r: 0 } };
					for (var R = 0; R != data.length; ++R) {
						for (var C = 0; C != data[R].length; ++C) {
							if (range.s.r > R) range.s.r = R;
							if (range.s.c > C) range.s.c = C;
							if (range.e.r < R) range.e.r = R;
							if (range.e.c < C) range.e.c = C;
							var cell = { v: data[R][C] };
							if (cell.v == null) continue;
							var cell_ref = XLSX.utils.encode_cell({ c: C, r: R });

							if (typeof cell.v === 'number') cell.t = 'n';
							else if (typeof cell.v === 'boolean') cell.t = 'b';
							else if (cell.v instanceof Date) {
								cell.t = 'n'; cell.z = XLSX.SSF._table[14];
								cell.v = datenum(cell.v);
							}
							else cell.t = 's';

							ws[cell_ref] = cell;
						}
					}
					if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
					return ws;
				}
				for (var i = 0; wb.SheetNames.length > i; i++) {
					var ReportTitle1 = wb.SheetNames[i];
					if (wb.SheetNames[i] == 'Party Address Description') {
						var detaildata = des_aFinalXlsxData;

					} else {
						var detaildata = aFinalXlsxData;
					}
					var ws = sheet_from_array_of_arrays(detaildata);

					// Setting up Excel column width
					ws['!cols'] = [
						{ wch: 14 },
						{ wch: 12 }
					];
					wb.Sheets[ReportTitle1] = ws;        // wb.Sheets[ReportTitle] -> To set sheet name

					var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
					var s2ab = function s2ab(s) {
						var buf = new ArrayBuffer(s.length);
						var view = new Uint8Array(buf);
						for (var i = 0; i != s.length; ++i) {
							view[i] = s.charCodeAt(i) & 0xFF;
						}
						return buf;
					};
				}
				saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), ReportTitle + ".xlsx");

				
			}
		},

	});

}, true);
