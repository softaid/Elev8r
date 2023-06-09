sap.ui.define([
	"sap/ui/model/json/JSONModel",
	'sap/ui/elev8rerp/componentcontainer/controller/BaseController',
	'sap/ui/model/Sorter',
    'sap/ui/elev8rerp/componentcontainer/services/projectManagement/Project.service',
	'sap/ui/elev8rerp/componentcontainer/services/ProjectManagement/ProjectTracking.service',
	'sap/ui/elev8rerp/componentcontainer/utility/xlsx',
	'sap/m/MessageToast'
], function (JSONModel, BaseController, Sorter,projectService,ProjectTracking, xlsx,MessageToast) {
	"use strict";

	return BaseController.extend("sap.ui.elev8rerp.componentcontainer.controller.ProjectManagement.ProjectManagementFile", {

		onInit: function () {

			this.bus = sap.ui.getCore().getEventBus();
			this.bus.subscribe("activitymaster", "setDetailPage", this.setDetailPage, this);
			this.bus.subscribe("loaddata", "loadData", this.loadData, this);
			this.oFlexibleColumnLayout = this.byId("fclProjecttracking");

			this.handleRouteMatched(null);

			var model = new JSONModel();
			var emptyModel = this.getModelDefault();
			model.setData(emptyModel);
			this.getView().setModel(model, "partyModel");

			let rowcount_model = new JSONModel();
			rowcount_model.setData([]);
			this.getView().setModel(rowcount_model, "rowcount_model");

			let rowModel = new JSONModel();
			rowModel.setData({modelData : []});
			this.getView().setModel(rowModel, "rowModel");

            var projectMgntModel = new JSONModel();
			projectMgntModel.setData({ modelData: [] });
			this.getView().setModel(projectMgntModel, "projectMgntModel");

			this.getProjectCount();
			this.getAllProjectsDetail();

			var model = new JSONModel();
			model.setData(emptyModel);
			this.fnShortCut();
		},

		getProjectCount : async function(){
			let oThis = this;
			// let rowModel = oThis.getView().getModel("rowModel");
			let oRowsCount = oThis.getView().getModel("rowcount_model");
			await projectService.getAllProjects(function (data) {
				if (data.length) {
					if (data[0].length) {

						console.log(data[0].length);
						let aRowsCount = [];

						aRowsCount.push({
							rowsCount: data[0].length
						});
	
						oRowsCount.setData(aRowsCount[0]);
						oThis.getView().setModel(oRowsCount, "rowcount_model");

						// rowModel.setData({modelData : data[0]});
						// oThis.getView().setModel(rowModel, "rowModel");
					}
				}
			});
		},

        getAllProjectsDetail: async function () {
			
			let oThis = this;
			// var pnlPrjMgnttable = oThis.getView().byId("pnlPrjMgnttable");
            // pnlPrjMgnttable.destroyContent();

			let rowcount_model = this.getView().getModel("rowcount_model");

			await projectService.getAllProjectsDetail(function (data) {
				if (data.length) {
					if (data[0].length) {
						console.log(data[0]);
						// let projectMgntModel = oThis.getView().getModel("projectMgntModel");
						// projectMgntModel.setData({ modelData: data[0] });
						// oThis.getView().setModel(projectMgntModel, "projectMgntModel")
						// console.log("projectMgntModel",projectMgntModel);

						// oThis.setTable();

						var keys = [];

						Object.keys(data[0][0]).forEach(function (key) {
							keys.push(key);
						});

						var arr = [];
						for (var i = 0; i < keys.length; i++) {
							arr.push({ columnId: keys[i] })
						}

						var oModel = new JSONModel();

						oModel.setData({
							columns: arr,
							rows: data[0]
						});

						var oTable = new sap.ui.table.Table({
							showNoData: true,
							columnHeaderHeight: 10,
							visibleRowCount: data[0].length,
							selectionMode: sap.ui.table.SelectionMode.None

						});
						oTable.setModel(oModel);
						oTable.bindColumns("/columns", function (index, context) {
							console.log("context : ",context);
							var sColumnId = context.getObject().columnId;
							
							return new sap.ui.table.Column({
								id: sColumnId,
								label: sColumnId,
								template: sColumnId,
							});
						});
						oTable.bindRows("/rows");

						var pnlPrjMgnttable = oThis.getView().byId("pnlPrjMgnttable");
						pnlPrjMgnttable.addContent(oTable);

					}
				}
			})
		},

		setTable : function(){

			var pnlPrjMgnttable = this.getView().byId("pnlPrjMgnttable");
            pnlPrjMgnttable.destroyContent();

			let columnModel = this.getView().getModel("projectMgntModel");
			let rowModel = this.getView().getModel("rowModel");
			let rowcount_model = this.getView().getModel("rowcount_model");

			let columnData = [];
			let rowData = [];

			// columnData.push({
			// 	// "Department" : "No. of Jobs",
			// 	Stage : "No. of Jobs"
			// })

			for(let i = 0; i < columnModel.oData.modelData.length; i++){
				columnData.push({
					// "Department" : "Finance",
					Stage : columnModel.oData.modelData[i].stagename
				});
			}


			// for(let j = 0; j < rowModel.oData.modelData.length; j++){
			// 	rowData.push({
			// 		OrderNo : rowModel.oData.modelData[j].id,
			// 		OrderName : rowModel.oData.modelData[j].quotename,
			// 		Model : rowModel.oData.modelData[j].model
			// 	})
			// }

			let tblModel = new JSONModel();
			console.log("columnModel : ",columnModel);
			tblModel.setData({
				columns : columnData,
				rows : columnModel
			});

			let oTable = new sap.ui.table.Table({
				showNoData: true,
				columnHeaderHeight: 10,
				visibleRowCount: rowcount_model.oData.rowsCount,
				selectionMode: sap.ui.table.SelectionMode.None
			})

			oTable.setModel(tblModel);

			oTable.bindColumns("/columns", function(sId, oContext){
				let columnName = oContext.getObject().Stage;
				return new sap.ui.table.Column({
					label : columnName,
					template : columnName
				});
			});

			oTable.bindRows("/rows");

			console.log("oTable : ", oTable);

			var pnlPrjMgnttable = this.getView().byId("pnlPrjMgnttable");
            pnlPrjMgnttable.addContent(oTable);
			
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
			this.loadData();
		},

		setDetailPage: function (channel, event, data) {
			this.detailView = sap.ui.view({
				viewName: "sap.ui.elev8rerp.componentcontainer.view.ProjectManagement." + data.viewName,
				type: "XML"
			});

			this.detailView.setModel(data.viewModel, "viewModel");
			this.oFlexibleColumnLayout.removeAllMidColumnPages();
			this.oFlexibleColumnLayout.addMidColumnPage(this.detailView);
			this.oFlexibleColumnLayout.setLayout(sap.f.LayoutType.TwoColumnsBeginExpanded);
		},

		onListItemPress: function (oEvent) {
			var viewModel = oEvent.getSource().getBindingContext("PActivityMasterModel");
			var model = { "id": viewModel.getProperty("id") }
			this.bus = sap.ui.getCore().getEventBus();
			this.bus.publish("activitymaster", "setDetailPage", { viewName: "ProjectDetail", viewModel: model });
		},

		onAddNew: function (oEvent) {
			this.bus = sap.ui.getCore().getEventBus();
			this.bus.publish("activitymaster", "setDetailPage", { viewName: "ProjectDetail" });
		},

		onSearch: function (oEvent) {
			var oTableSearchState = [],
				sQuery = oEvent.getParameter("query");
			var contains = sap.ui.model.FilterOperator.Contains;
			var columns = ['projectname', 'milestone', 'status','startdate'];
			var filters = new sap.ui.model.Filter(columns.map(function (colName) {
				return new sap.ui.model.Filter(colName, contains, sQuery);
			}),
				false);

			if (sQuery && sQuery.length > 0) {
				oTableSearchState = [filters];
			}

			this.getView().byId("tblProjectMaster").getBinding("items").filter(oTableSearchState, "Application");
		},

		onSort: function (oEvent) {
			this._bDescendingSort = !this._bDescendingSort;
			var oView = this.getView(),
				oTable = oView.byId("tblProjectMaster"),
				oBinding = oTable.getBinding("items"),
				oSorter = new Sorter("partyname", this._bDescendingSort);
			oBinding.sort(oSorter);
		},

		loadData: function () {
			var currentContext = this;
			ProjectTracking.getAllProjectTracking(function (data) {
				var oModel = new sap.ui.model.json.JSONModel();
				oModel.setData({ modelData: data[0] });
				currentContext.getView().setModel(oModel, "PActivityMasterModel");
                console.log("PActivityMasterModel",oModel);
			});
		},

		onExit: function () {
			this.bus.unsubscribe("settermaster", "setDetailPage", this.setDetailPage, this);
		}
	});

}, true);
